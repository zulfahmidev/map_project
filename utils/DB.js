const mongoose = require('mongoose');

const uri = `mongodb://127.0.0.1:27017`;
const dbname = "TEST_PROJECT";

mongoose.connect(`${uri}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
