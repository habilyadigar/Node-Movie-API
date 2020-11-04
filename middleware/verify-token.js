const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const token = req.headers['x-acces-token'] || req.body.token || req.query.token

    if(token){
        jwt.verify(token, req.app.get('api_secret_key'),(err,decode)=>{
            if(err){
                res.json({
                    status: 0,
                    message:'Failed to authenticate token.'
                })
            }else{
                req.decode = decode;
                //console.log('Token info:'+decode)
                next();
            }
        });
    }else{
        res.json({
            status: 0,
            message: 'No token provided.'
        })
    }
};


