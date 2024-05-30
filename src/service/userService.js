const userRepo=require('../repos/userRepo');
const userService={};

userService.saveUser=async (userObject)=>{

    const email=userObject.email;
    const emailRegex=new RegExp('[0-9A-Za-z]{1,12}[.]?[0-9A-Za-z]{1,10}@[0-9A-Za-z]+.com');
    if(!emailRegex.test(email))
    {
        const error=new Error("Email must be type of @gmail.com");
        error.status=400;
        error.type="custom";
        throw error;
    }
    const fNameCheck=new RegExp('[A-Za-z]+');
    const lNameCheck=new RegExp('[A-Za-z]+');
    if(!fNameCheck.test(userObject.firstName))
        {
            const error=new Error("First name is not valid");
            error.status=400;
            error.type="custom";
            throw error;
        }
        if(!lNameCheck.test(userObject.lastName))
        {
            const error=new Error("Last name is not valid");
            error.status=400;
            error.type="custom";
            throw error;
        }
    await userRepo.saveUser(userObject);
}

userService.getUser=async (email,password)=>{

    const result=await userRepo.getUser(email,password);
    if(result)
    {
        return result;
    }
    else
    {
        const error=new Error("Incorrect emailId or password");
       error.status=400;
       error.type='custom';
       throw error;
    }
}

module.exports=userService;