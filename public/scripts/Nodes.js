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