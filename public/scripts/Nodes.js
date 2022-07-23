const Nodes = new function() {
    let nodes = [];

    this.getNodes = () => {
        return nodes;
    }

    this.createNode = (position) => {
        axios.post('http://localhost:8080/api/node', {
            position
        }).then(({data}) => {
            if (data.status == 200) {
                nodes.push(new Node(data.body._id, data.body.position));
            }
        })
    }

    this.removeNode = (id) => {
        axios.delete('http://localhost:8080/api/node/'+id).then(({data}) => {
            if (data.status == 200) {
                nodes.filter(v => {
                    if (v.getId() == id) {
                        v.getGraphs().forEach(g => {
                            Graphs.removeGraph(g.getId());
                        })
                        v.getNode().setMap(null);
                        return false;
                    }
                    return true;
                })
            }
        })
    }

    this.getNearNode = (position) => {
        let nearNode = null;
        let distance = 0;
        nodes.forEach(node => {
            let newDistance = Utils.distanceTo(node.getPosition().lat, node.getPosition().lng, position.lat, position.lng);
            if (newDistance <= distance || distance == 0) {
                distance = newDistance;
                nearNode = node;
            }
        })
        return nearNode;
    }

    this.setVisible = (visible) => {
        nodes.forEach(node => {
            node.getNode().setVisible(visible);
        });
    }

    this.initNodes = () => {
        nodes = [];
        axios.get('http://localhost:8080/api/node').then(({data}) => {
            if (data.status == 200) {
                // console.log(data);
                data.body.forEach(node => {
                    nodes.push(new Node(node._id, node.position));
                });
            }
        });
    }

    this.getNode = (id) => {
        let result = null;
        nodes.forEach(node => {
            if (node.getId() == id) result = node;
        });
        return result;
    }

    this.initNodes();
    return this;
}