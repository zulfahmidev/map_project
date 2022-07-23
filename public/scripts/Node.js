let nodeId = 1;

const Node = function(id, position) {

    // console.log(id);
    let node = new google.maps.Marker({
        position,
        icon: nodeDefaultIcon,
        map: map.getMap(),
        title: id,
        tag: { id }
    });

    if (mode.has('show_graph')) {
        node.setVisible(true);
    }else {
        node.setVisible(false);
    }

    this.showInfo = () => {
        let content = `ID: ${id}`;
        let infowindow = new google.maps.InfoWindow({content});
        infowindow.open(map.getMap(),node);
    }

    this.getNode = () => {
        return node;
    }

    this.getPosition = () => {
        return position;
    }

    this.getId = () => {
        return id;
    }

    this.getGraphs = () => {
        return Graphs.getGraphsByNode(this.getId());
    }

    this.onClick = (callback) => {
        return node.addListener('mousedown', callback);
    }

    this.onClick((e) => {
        if (e.domEvent.button == 2) {
            this.showInfo();
        }

        if (mode.has('remove_node')) {
            if (confirm('Apakah anda yakin ingin menghapus node dengan id: ' + this.getId())) {
                Nodes.removeNode(this.getId());
                Toast.fire({
                    icon: 'success',
                    title: 'Node id "' + this.getId() + '" berhasil di hapus'
                })
                mode.deactivateMode('remove_node');
                btnRemoveNode.deactivated();
                return this;
            }
        }

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
                
                mode.deactivateMode('connect_node');
                btnConnectNode.deactivated();
                
            }

        }
    })

    // Dijkstra Data
    this.f = 0;
    this.g= 0;
    this.h = 0;
    this.previous = undefined;
    return this;
}