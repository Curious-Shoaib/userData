const jwt=require('jsonwebtoken');
const secret= process.env.JWT_SECRET_KEY || 'shoaibCodes@14';                  // must be kept in secure place, anyone can sign and verify token with it

const authService={
};
authService.generateTokenForUser=(userObj)=>{
        const payload={
            firstName : userObj.firstName,
            lastName : userObj.lastName,
            email : userObj.email,
            role : userObj.role
            };
    const uid=jwt.sign(payload,secret);
    return uid;
}

authService.verifyToken=(uid)=>{

    if(!uid)
        return null;
    try{
        const ans=jwt.verify(uid,secret);   //return claims if token valid, throw error if uid has different signed key than the current key we have
        return ans;
    } 
    catch(error)
    {
        return null;
    }
}

module.exports=authService;
