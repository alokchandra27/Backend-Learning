const mongoose = require("mongoose")


function ConnectedToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected TO DB");
        
    })
    .catch((error)=>{
        console.log("Error connected to DB:" + error);
        
    })
}

module.exports = ConnectedToDB;