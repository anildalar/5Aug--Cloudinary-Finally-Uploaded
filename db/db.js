//Import Area
const mongoose = require('mongoose');

//Here i will connect to mongodb
//mongoose.connect() return PO
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.dgmru.mongodb.net/?retryWrites=true&w=majority`).then(d=>{
    console.log('Connected');
}).catch(e=>{
    console.log('Not Connected',e);
});