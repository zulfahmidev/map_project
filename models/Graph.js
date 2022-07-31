const mongoose = require('mongoose');

exports.Graph = mongoose.model('graphs', {
    from_node_id: {
        type: mongoose.Schema.Types.ObjectId || null
    },
    to_node_id: {
        type: mongoose.Schema.Types.ObjectId || null
    },
    path: {
        type: Array
    },
})