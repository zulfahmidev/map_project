const graphs = [];

const Graph = function(from_node_id, path = [], to_node_id = null, id = null) {
    let points = [];

    let isShow = false;

    let graph = new google.maps.Polyline({
        path,
        map: map.getMap(),
        strokeColor: "#1abc9c",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    this.setVisible = (visible) => {
        visible = (visible) ? map.getMap() : null;
        if (!isShow || visible == true) {
            graph.setMap(visible);
        }
        points.forEach(p => {
            p.setMap(visible)
        })
    }
    
    this.show = () => {
        graph.setOptions({strokeColor: 'red'});
        graph.setMap(map.getMap());
        isShow = true;
    }

    this.hide = () => {
        graph.setOptions({strokeColor: '#1abc9c'});
        if (mode.has('show_graph')) {
            graph.setVisible(true);
        }
        isShow = true;
    }

    this.getPoints = () => {
        return points;
    }

    this.getNodes = () => {
        return [Nodes.getNode(from_node_id), Nodes.getNode(to_node_id)];
    }

    this.getNearPoint = (position) => {
        let nearPoint = null;
        let distance = 0;
        points.forEach((point, index) => {
            // console.log(point)
            let newDistance = Utils.distanceTo(point.position.lat(), point.position.lng(), position.lat, position.lng);
            if (newDistance <= distance || distance == 0) {
                distance = newDistance;
                nearPoint = {
                    graph: this, index, distance, position: point.getPosition()
                };
            }
        })
        return nearPoint;
    }

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

    this.hasNode = (node_id) => {
        return (from_node_id == node_id || to_node_id == node_id);
    }
    
    this.getTo = (node_id) => {
        return (node_id == from_node_id) ? Nodes.getNode(to_node_id) : Nodes.getNode(from_node_id);
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
    
    this.getDistance = () => {
        let n1 = Nodes.getNode(from_node_id).getPosition();
        let n2 = Nodes.getNode(to_node_id).getPosition();
        return Utils.distanceTo(n1.lat, n1.lng, n2.lat, n2.lng);
    }
    
    path.forEach(position => {
        points.push(new google.maps.Marker({
            position,
            map: map.getMap(),
            icon: pointDefaultIcon,
        }))
    })
    
    if (mode.has('show_graph')) {
        this.setVisible(true);
    }else {
        this.setVisible(false);
    }
    return this;
}