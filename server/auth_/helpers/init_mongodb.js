const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{dbName: "collegesuvidha_auth",
    // useNewUrlParser:true,
})
.then(()=>{
    console.log('mongodb connected');
})
.catch((err) => console.log(err.message));

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected');
}) 
mongoose.connection.on('error',(err)=>{
    console.log(err.message);
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose is disconnected'); 
})

process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0);
})