const {userModel}=require('../models/userModel');
const userRepo={};

userRepo.saveUser= async (userObject) => {
  
    try{
        await userModel.create(userObject);
    }
    catch(error)
    {
        error.message='This email is Already in use, please sign in to continue.'
        error.type='custom';
        throw error;
    }
    return true;
}

userRepo.getUser= async (email,password) => {
    const user=await userModel.findOne({email,password});
    return user;
}

module.exports=userRepo;