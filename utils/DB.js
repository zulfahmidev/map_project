const mongoose = require('mongoose');

const uri = `mongodb://127.0.0.1:27017`;
const dbname = "hopefield_prod";

mongoose.connect(`${uri}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
