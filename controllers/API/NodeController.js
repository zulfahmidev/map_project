const { Node } = require('../../models/Node.js');

exports.NodeController = new function() {
    this.index = async (req, res) => {
        let data = await Node.find({});
        res.json({
            message: "Success",
            status: 200,
            body: data
        });
    }

    this.insert = (req, res) => {
        let node = new Node(req.body);
        node.save().then((data) => {
            res.json({
                message: "Success",
                status: 200,
                body: data
            });
        })
    }

    this.destroy = (req, res) => {
        Node.deleteOne({_id: req.params.id}).then((data) => {
            res.json({
                message: "Success",
                status: 200,
                body: data
            });
        })
    }
    
    // reset: (req, res) => {
        // DB.collection("nodes").deleteMany();
    // }
}