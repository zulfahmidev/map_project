const graphs = [];

const Graph = function(from_node_id, path = [], to_node_id = null, id = null) {
    let points = [];

    let graph = new google.maps.Polyline({
        path,
        map: map.getMap(),
        strokeColor: "#1abc9c",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    this.addPoint = (position) => {
        path.push(position);
        
        points.push(new google.maps.Marker({
            position,
            map: map.getMap(),
            icon: pointDefaultIcon,
        }))

        graph.setPath(path);
    }

    this.getGraph = () => {
        return graph;
    }

    this.getId = () => {
        return id;
    }

    this.getFrom = () => {
        return Nodes.getNode(from_node_id);
    }
    
    this.getTo = () => {
        return Nodes.getNode(to_node_id);
    }

    this.setTo = (id) => {
        to_node_id = id;
    }

    this.save = () => {
        if (this.getId() == null) {
            return axios.post('http://localhost:8080/api/graph', {
                from_node_id, path, to_node_id
            }).then(({data}) => {
                if (data.status == 200) {
                    id = data.body._id;
                    graphs.push(this);
                }
            })
        }else {
            return axios.post('http://localhost:8080/api/graph/'+this.getId(), {
                from_node_id, path, to_node_id
            })
        }
    }
    
    path.forEach(position => {
        points.push(new google.maps.Marker({
            position,
            map: map.getMap(),
            icon: pointDefaultIcon,
        }))
    })
    return this;
}