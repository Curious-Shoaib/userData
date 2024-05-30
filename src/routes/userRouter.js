const express=require('express');
const userRouter=express.Router();
const userService=require('../service/userService');
const autService=require('../service/authService');
userRouter.route('/signup')
.post(async(req,res,next)=>{
    try{
        await userService.saveUser(req.body);
        res.render('loginPage');
    }
    catch (err)
    {
        if(err.type)
        {
            res.render('signUp',{err});
        }
        next(err);
    }
   
})
.get(async(req,res,next)=>{
    try{
        res.render('signUp');
    }
    catch (err)
    {
        if(err.type)
            res.render('signUp',{err});
        next(err);
    }
   
});

userRouter.route('/login')                  //grouping of same route http methods
.post(async(req,res,next)=>{
    try{
        const user= await userService.getUser(req.body.email,req.body.password);
        if(user)
        {
            const uId=autService.generateTokenForUser(user);
            res.cookie("uid" , uId);
            res.redirect('/user/login');               // users sent to URL page after login
        }
     
    }
    catch(err)
    {
        if(err.type)
            res.render('loginPage',{err});
        next(err);
    }
   
})
.get(async(req,res,next)=>{
    try{
        res.render('loginPage');
    }
    catch (err)
    {
        if(err.type)
            res.render('loginPage',{err});
        next(err);
    }
});

module.exports=userRouter;