const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
    
    {
        name: {
            type: String,
            default: "md aaryan", // Provide the default value here
        },
        email:{ type: String,
            default:'admin@kaif@gmail.com',},
        password: {type: String,
            default:'1234',}
    },
{colletion: 'admin-data'}

)

const model = mongoose.model('AdminData', Admin);
module.exports = model;