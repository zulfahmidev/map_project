let nodeId = 1;

const Node = function(id, position) {

    // console.log(id);
    let node = new google.maps.Marker({
        position,
        icon: nodeDefaultIcon,
        map: map.getMap(),
        tag: { id }
    });

    this.getNode = () => {
        return node;
    }

    this.getPosition = () => {
        return position;
    }

    this.getId = () => {
        return id;
    }

    this.onClick = (callback) => {
        return node.addListener('click', callback);
    }

    this.onClick((e) => {
        if (mode.has("connect_node")) {            
            if (nodeSelected == null) {
                Toast.fire({
                    icon: 'success',
                    title: 'Node Selected'
                })
                
                node.setIcon(nodeSelectedIcon)
                let graph = Graphs.createGraph(this.getId());
                graph.addPoint(this.getPosition())
                nodeSelected = {
                    node: this, graph
                };

            } else if (nodeSelected.node.getId() != this.getId()) {
                Toast.fire({
                    icon: 'success',
                    title: 'Node Connected'
                })

                
                nodeSelected.graph.addPoint(e.latLng)
                nodeSelected.graph.setTo(this.getId())
                nodeSelected.graph.save()

                nodeSelected.node.getNode().setIcon(nodeDefaultIcon)
                nodeSelected = null;
                
                mode.selectMode();
                
            }

        }
    })
    return this;
}