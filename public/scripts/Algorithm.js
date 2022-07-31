const Algorithm = new function() {
    let userPosition = null;
    let destinationPosition = null;

    this.setUserPosition = (position) => {
        if (userPosition) userPosition.setMap(null);
        userPosition = new google.maps.Marker({
            position,
            label: 'U',
            map: map.getMap(),
        });
    }
    
    this.setDestinationPosition = (position) => {
        if (destinationPosition) destinationPosition.setMap(null);
        destinationPosition =  new google.maps.Marker({
            position,
            label: 'D',
            map: map.getMap(),
        });
    }

    this.getUserPosition = () => {
        return userPosition;
    }

    this.getDestinationPosition = () => {
        return destinationPosition;
    }

    this.startFindPath = () => {
        let up = {
            lat: this.getUserPosition().position.lat(),
            lng: this.getUserPosition().position.lng(),
        };
        let dp = {
            lat: this.getDestinationPosition().position.lat(),
            lng: this.getDestinationPosition().position.lng(),
        };

        up = Utils.splitGraph(up);
        dp = Utils.splitGraph(dp);
        Dijkstra(up, dp)

    }

    this.reset = () => {
        if (userPosition) userPosition.setMap(null)
        if (destinationPosition) destinationPosition.setMap(null)
        userPosition = null;
        destinationPosition = null;
        Nodes.initNodes();
        Graphs.initGraphs();
    }
}