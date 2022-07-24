let map = null;

const GMap = function(selector, dlat, dlng) {
    
    let elMap = document.querySelector(selector);

    let map = new google.maps.Map(elMap, {
        center: new google.maps.LatLng(dlat, dlng),
        zoom: 18,
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
    });

    this.getMap = () => {
        return map
    }

    this.on = (eventName, callback) => {
        map.addListener(eventName, callback);
    }

    this.init = () => {

        this.on('click', (e) => {
            
            if (mode.has('create_node')) {
                Nodes.createNode(e.latLng);
                Toast.fire({
                    icon: 'success',
                    title: 'Node Created'
                })
                mode.deactivateMode('create_node');
                btnCreateNode.deactivated();
            }
    
            if (mode.has('connect_node') && nodeSelected) {
                let graph = nodeSelected.graph;
                graph.addPoint(e.latLng);
            }

            if (mode.has('set_position')) {
                Algorithm.setUserPosition(e.latLng);
                mode.deactivateMode('set_position');
                btnSetPosition.deactivated();
            }
            
            if (mode.has('set_destination')) {
                Algorithm.setDestinationPosition(e.latLng);
                mode.deactivateMode('set_destination');
                btnSetDestination.deactivated();
            }
    
        })
    }


}