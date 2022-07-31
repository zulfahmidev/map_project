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
            lat: userPosition.getPosition().lat(),
            lng: userPosition.getPosition().lng(),
        };
        let dp = {
            lat: destinationPosition.getPosition().lat(),
            lng: destinationPosition.getPosition().lng(),
        };

        // let graphup_points.splice()
        

        // Dijkstra({
        //     lat: userPosition.getPosition().lat(),
        //     lng: userPosition.getPosition().lng(),
        // }, {
        //     lat: destinationPosition.getPosition().lat(),
        //     lng: destinationPosition.getPosition().lng(),
        // });
    }

    this.reset = () => {
        
    }
}