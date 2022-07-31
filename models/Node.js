const mongoose = require('mongoose');

exports.Node = mongoose.model('nodes', {
    position: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        },
    }
})