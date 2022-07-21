const { Node } = require('../../models/Node.js');

exports.NodeController = {
    index: async (req, res)  => {
        let data = await Node.find({});
        res.json({
            message: "Success",
            status: 200,
            body: data
        });
    },

    insert: (req, res) => {
        let node = new Node(req.body);
        node.save().then((data) => {
            res.json({
                message: "Success",
                status: 200,
                body: data
            });
        })
    },
    
    reset: (req, res) => {
        // DB.collection("nodes").deleteMany();
    }
}