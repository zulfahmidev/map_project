const { Graph } = require('../../models/Graph.js');

exports.GraphController = new function() {
    this.index = async (req, res)  => {
        let data = await Graph.find({});
        res.json({
            message: "Success",
            status: 200,
            body: data
        });
    }

    this.insert = (req, res) => {
        let graph = new Graph(req.body);
        graph.save().then(data => {
            res.json({
                message: "Success",
                status: 200,
                body: data
            });
        })
    }

    this.destroy = (req, res) => {
        Graph.deleteOne({_id: req.params.id}).then((data) => {
            res.json({
                message: "Success",
                status: 200,
                body: data
            });
        })
    }
    
    this.update = (req, res) => {
        console.log(req.body)
        Graph.updateOne({_id: req.params.id}, {$set: req.body}).then(data => {
            res.json({
                message: "Success",
                status: 200,
                body: data
            });  
        })
    }
    
    this.reset = (req, res) => {
        // DB.collection("graphs").deleteMany();
    }
}