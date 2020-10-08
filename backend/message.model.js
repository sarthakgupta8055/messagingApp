const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Message = new schema({
    message :{
        type :  String
    },
    SenderName :{
        type : String
    },
    PostDate :{
        type : String
    }
})
module.exports = mongoose.model('Messages', Message);
