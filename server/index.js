const express = require('express');
const app = express()

 app.use(express.json());

app.use('/auth',require("./routes/auth"))
app.use("/post",require("./routes/posts"));

const PORT= 5050;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})