// importing jwt
const jwt = require('jsonwebtoken');




// checking if auth is present in cookies
const loginAuth = (req, res, next)=>{

    const auth = req.cookies.auth;
    if(!auth) return res.json({"message": "Invalid token"}).status(401);

    try {

        const verified = jwt.verify(auth, process.env.SECRET_KEY);
        req.name = verified;
        next();
        
    } catch (error) {
        res.send(error)
        
    }

    
}

module.exports = loginAuth;
