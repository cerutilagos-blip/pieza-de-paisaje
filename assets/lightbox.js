(function(){
  "use strict";
  var imgs = Array.prototype.slice.call(document.querySelectorAll(".col-imagen figure img"));
  if(!imgs.length) return;

  var overlay = document.createElement("div");
  overlay.className = "visor";
  overlay.setAttribute("role","dialog");
  overlay.setAttribute("aria-modal","true");
  overlay.setAttribute("aria-hidden","true");
  overlay.innerHTML =
    '<button type="button" class="visor-cerrar" aria-label="Cerrar">×</button>' +
    '<button type="button" class="visor-prev" aria-label="Foto anterior">‹</button>' +
    '<figure class="visor-figura"><img class="visor-img" alt=""><figcaption class="visor-cap"></figcaption></figure>' +
    '<button type="button" class="visor-next" aria-label="Foto siguiente">›</button>' +
    '<p class="visor-contador"></p>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector(".visor-img");
  var capEl = overlay.querySelector(".visor-cap");
  var contadorEl = overlay.querySelector(".visor-contador");
  var btnCerrar = overlay.querySelector(".visor-cerrar");
  var btnPrev = overlay.querySelector(".visor-prev");
  var btnNext = overlay.querySelector(".visor-next");
  var indice = 0;
  var ultimoFoco = null;

  function datos(img){
    var fig = img.closest("figure");
    var cap = fig ? fig.querySelector("figcaption") : null;
    return {
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || "",
      cap: cap ? cap.innerHTML : ""
    };
  }

  function mostrar(i){
    indice = (i + imgs.length) % imgs.length;
    var d = datos(imgs[indice]);
    imgEl.src = d.src;
    imgEl.alt = d.alt;
    capEl.innerHTML = d.cap;
    var multiple = imgs.length > 1;
    contadorEl.textContent = multiple ? (indice+1)+" / "+imgs.length : "";
    btnPrev.style.display = multiple ? "" : "none";
    btnNext.style.display = multiple ? "" : "none";
  }

  function abrir(i){
    ultimoFoco = document.activeElement;
    mostrar(i);
    overlay.classList.add("activo");
    overlay.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    btnCerrar.focus();
  }

  function cerrar(){
    overlay.classList.remove("activo");
    overlay.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    imgEl.src = "";
    if(ultimoFoco && typeof ultimoFoco.focus === "function") ultimoFoco.focus();
  }

  imgs.forEach(function(img, i){
    img.tabIndex = 0;
    img.setAttribute("role","button");
    img.setAttribute("aria-label","Ampliar fotografía");
    img.addEventListener("click", function(){ abrir(i); });
    img.addEventListener("keydown", function(e){
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); abrir(i); }
    });
  });

  btnCerrar.addEventListener("click", cerrar);
  btnPrev.addEventListener("click", function(){ mostrar(indice-1); });
  btnNext.addEventListener("click", function(){ mostrar(indice+1); });
  overlay.addEventListener("click", function(e){ if(e.target === overlay) cerrar(); });
  document.addEventListener("keydown", function(e){
    if(!overlay.classList.contains("activo")) return;
    if(e.key === "Escape") cerrar();
    else if(e.key === "ArrowLeft") mostrar(indice-1);
    else if(e.key === "ArrowRight") mostrar(indice+1);
  });
})();
