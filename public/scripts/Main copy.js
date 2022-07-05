let nodeSelected = null;
let pointSelected = null;
let poly = [];
let graphs = [];

// New


function myMap() {

    let demo = document.querySelector("#demo");

    let position = new google.maps.LatLng(5.176745235, 97.13243756);
    
    let props = {
        center: position,
        zoom: 15,
        disableDefaultUI: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [{
            featureType: "poi",
            elementType: "labels",
        
            stylers: [{
              visibility: "off"
            }]
        }]
    }

    let map = new google.maps.Map(demo, props);

    map.addListener('click', (e) => {
        
        if (nodeSelected) {

            poly.push(e.latLng);

            let index = poly.length - 1;
            
            graph = graphs[graphs.length - 1];
            if (graph != null ) graph.setMap(null);
    
            graph = new google.maps.Polyline({
                path: poly,
                strokeColor: "#9b59b6",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map,
            });
    
            let circle = {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 0.5,
                fillColor: "#1abc9c",
                strokeOpacity: 1.0,
                strokeColor: "#1abc9c",
                strokeWeight: 1.0,
                scale: 5.0
            }
    
            let marker = new google.maps.Marker({
                position: e.latLng,
                icon: circle,
                map,
            })

            marker.addListener('dblclick', (e) => {
                if (pointSelected == null &&  nodeSelected == null) {
                    pointSelected = {
                        pointIndex: index, marker, graphIndex: graphs.length - 1,
                    };  
                }
            })
            
            marker.addListener('click', (e) => {  
                pointSelected = null;  
            })
            graphs[graphs.length - 1] = graph;
        }

    })
    
    google.maps.event.addListener(map, 'mousemove', function(e) {
        if (pointSelected) {
            console.log(graphs[pointSelected.graphIndex])
            graphs[pointSelected.graphIndex].setMap(null);
            graphs[pointSelected.graphIndex].latLngs.Ld[0].Ld[pointSelected.pointIndex] = e.latLng;
            pointSelected.marker.setPosition(e.latLng);
            graphs[pointSelected.graphIndex] = new google.maps.Polyline({
                path: graphs[pointSelected.graphIndex].latLngs.Ld[0].Ld,
                strokeColor: "#9b59b6",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map,
            });
            
        }
    });

}

function setMarker(map, data) {
    let circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.5,
        fillColor: "#c0392b",
        strokeOpacity: 1.0,
        strokeColor: "#c0392b",
        strokeWeight: 2.0,
        scale: 10.0
    }
    let position = new google.maps.LatLng(data[4], data[5]);
    let marker = new google.maps.Marker({
        position,
        icon: circle,
    });
    marker.setMap(map);

    marker.addListener('click', (e) => {
        poly.push(e.latLng);
        if (nodeSelected == null && pointSelected == null) {
            nodeSelected = marker;
            graphs.push(new google.maps.Polyline({
                path: poly,
                strokeColor: "#9b59b6",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map,
            }));
        } else {
            if (nodeSelected.label.text != marker.label.text) {
                nodeSelected = null;
                graphs[graphs.length - 1].setMap(null);
                graphs[graphs.length - 1]  = new google.maps.Polyline({
                    path: poly,
                    strokeColor: "#9b59b6",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map,
                })
                poly = [];
            }
        }
    })
}

$('#create_node').click(() => {
    $('#create_node').addClass('active');
    $('#create_node').html('Cancel');
})