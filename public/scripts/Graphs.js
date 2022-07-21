const Graphs = new function() {
    let graphs = [];

    this.getGraphs = () => {
        return graphs;
    }

    this.createGraph = (from_node_id, path = [], to_node_id = null) => {
        return new Graph(from_node_id, path, to_node_id);
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

    this.getGraph = (id) => {
        let result = null;
        graphs.forEach(graph => {
            if (graph.getId() == id) result = graph;
        });
        return result;
    }

    this.initGraphs();
    return this;
}