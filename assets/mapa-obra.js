(function(){
  "use strict";
  function iniciar(el){
    if(typeof L === "undefined") return;
    var lat = parseFloat(el.dataset.lat);
    var lng = parseFloat(el.dataset.lng);
    var zoom = parseInt(el.dataset.zoom || "13", 10);
    if(isNaN(lat) || isNaN(lng)) return;
    var mapa = L.map(el, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      tap: false,
      attributionControl: true
    });
    L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      subdomains: "abc",
      attribution: '&copy; OpenStreetMap · SRTM · <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
    }).addTo(mapa);
    var icono = L.divIcon({
      className: "marca-obra-leaflet",
      html:
        '<span class="marca-obra-sombra"></span>' +
        '<svg class="marca-obra-pin" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">' +
          '<path d="M12 1.5C6.98 1.5 3 5.5 3 10.44c0 6.66 9 12.06 9 12.06s9-5.4 9-12.06C21 5.5 17.02 1.5 12 1.5z"/>' +
          '<circle class="marca-obra-pin-nucleo" cx="12" cy="10.2" r="3.4"/>' +
        '</svg>',
      iconSize: [34, 34],
      iconAnchor: [17, 32]
    });
    L.marker([lat, lng], { icon: icono, interactive: false, keyboard: false, zIndexOffset: 1000 }).addTo(mapa);
  }
  document.querySelectorAll(".mapa-obra-mapa[data-lat]").forEach(iniciar);
})();
