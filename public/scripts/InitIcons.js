// Icons
let nodeDefaultIcon = null;
let nodeSelectedIcon = null;
let pointDefaultIcon = null;

function initIcons() {
    nodeDefaultIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.5,
        fillColor: "royalblue",
        strokeOpacity: 1.0,
        strokeColor: "royalblue",
        strokeWeight: 2.0,
        scale: 10.0
    }
    
    nodeSelectedIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.5,
        fillColor: "red",
        strokeOpacity: 1.0,
        strokeColor: "red",
        strokeWeight: 2.0,
        scale: 10.0
    }

    pointDefaultIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.5,
        fillColor: "#1abc9c",
        strokeOpacity: 1.0,
        strokeColor: "#1abc9c",
        strokeWeight: 1.0,
        scale: 5.0
    }
}