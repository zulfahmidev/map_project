let tempnode_id = 1;
let Utils = {
    distanceTo: (lat1, lon1, lat2, lon2) => {
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    },

    splitGraph: (position) => {

        let point = Graphs.getNearPoint(position);
        
        if (point) {
            let pp = point.position;
            let np = point.node.getPosition();
            if (pp.lat() == np.lat && pp.lng() == np.lng) {
                return point.node.getId();
            } else {
                let nodes = [...Nodes.getNodes()];
                let new_node = new Node('tempnode_'+tempnode_id, {lat: point.position.lat(), lng: point.position.lng()});
                nodes.push(new_node);
                Nodes.setTempNodes(nodes);
    
                let graph = point.graph;
                graph.setVisible(false);
                let graphs = [...Graphs.getGraphs()].filter((v) => {
                    return v.getId() != graph.getId();
                });
                let ftf = graph.getPoints().map(v => {
                    return {lat: v.getPosition().lat(), lng: v.getPosition().lng()}
                });
                let ftd = ftf.splice(0, point.index+1);
                graphs.push(new Graph('tempnode_'+tempnode_id, ftf, graph.getNodes()[1].getId()));
                graphs.push(new Graph('tempnode_'+tempnode_id, ftd, graph.getNodes()[0].getId()));
                Graphs.setTempGraphs(graphs);
                tempnode_id++;

                return new_node.getId();
            }

        }
        return null;
    }
}