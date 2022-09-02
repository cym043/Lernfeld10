const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const regsiterFunctions = require('./registerNewUser')

app.use(express.static(path.join(__dirname , '..')));



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'..','/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('register/newUser', function(req, res){
    console.log(res);
    return regsiterFunctions.registerNewUser();
})

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname, '..','/register.html'));
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname, '..','/login.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');