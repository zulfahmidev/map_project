const Graphs = new function() {
    let graphs = [];

    this.getGraphs = (array = false) => {
        return graphs;
    }

    this.createGraph = (from_node_id, path = [], to_node_id = null) => {
        let graph = new Graph(from_node_id, path, to_node_id);
        graphs.push(graph);
        return graph;
    }

    this.removeGraph = (id) => {
        axios.delete('http://localhost:8080/api/graph/' + id).then(({data}) => {
            if (data.status == 200) {
                graphs.filter(v => {
                    if (v.getId() == id) {
                        v.setVisible(false);
                        return false;
                    }
                    return true;
                })
            }
        })
    }

    this.initGraphs = () => {
        graphs = [];
        axios.get('http://localhost:8080/api/graph').then(({data}) => {
            if (data.status == 200) {
                data.body.forEach(graph => {
                    let g = new Graph(graph.from_node_id, graph.path, graph.to_node_id, graph._id);
                    graphs.push(g);
                });
            }
        });
    }
    
    this.setVisible = (visible) => {
        graphs.forEach(graph => {
            graph.setVisible(visible);
        });
    }

    this.getGraph = (id) => {
        let result = null;
        graphs.forEach(graph => {
            if (graph.getId() == id) result = graph;
        });
        return result;
    }

    this.getGraphsByNode = (node_id) => {
        let result = [];
        graphs.forEach(graph => {
            if (graph.hasNode(node_id)) result.push(graph);
        });
        return result;
    }

    this.initGraphs();
    this.setVisible(false);
    return this;
}