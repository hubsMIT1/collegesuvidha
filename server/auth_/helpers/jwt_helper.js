const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken:(userId)=>{
        return new Promise((resovle,reject)=>{
            const payload={}
            const secret = "some super secret"
            const options = {
                expiresIn:'1h',
                issuer:"collegesuvidha.in",
                audience:userId
            }
            JWT.sign(payload,secret,options,(err,token)=>{
                console.log(token);
                if(err)reject(err);
                resovle(token);
            })
        })
    }
}