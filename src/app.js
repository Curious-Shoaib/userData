require('dotenv').config();         
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const {resolve,join}=require('path');
const errorLogger=require('./utility/errorLogger').errorLoger;
const requestLogger=require('./utility/requestLogger').requestLogger;
const {getMongoDBconnecttion}=require('./utility/connection');

const userRouter=require('./routes/userRouter');
const homepageRouter=require('./routes/homepageRouter');
const {authenticate : checkAuthentication,preLoginAuth,restrictTo}=require('./middleware/userAuthentication');
const mongoLocalURL='mongodb://localhost:27017/userDataDownload';
app.set("view engine","ejs");
app.set("views",resolve(join(__dirname,"/views")));        // set the src/views folder as default to resolve view path

const PORT=process.env.PORT || 3000;
const mongoURL=process.env.MONGO_REMOTE_URL || mongoLocalURL;

getMongoDBconnecttion(mongoURL).then(()=>{
    console.log("mongoDB connected with :- ",mongoURL);
})
app.use(bodyParser.json());  // to accept json data
app.use(bodyParser.urlencoded({extended : false}));  // to accept form data
app.use(cookieParser());                // middleware to parse cookies

app.use(requestLogger);
app.use('/user',preLoginAuth,userRouter);           // user signIn & signUp router.
app.use(checkAuthentication);
app.use('/',restrictTo(["Normal","Admin"]),homepageRouter);          //authorization, change array value here to control access


app.use('*',(req,res,next) => {
    res.status(404).json({message : "This web page does not exist"});
});

app.use(errorLogger);

app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
});