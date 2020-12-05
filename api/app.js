const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const nodemailer = require('nodemailer');

require('./models/Budget');
const Budget = mongoose.model('Budget');

const app = express();

app.use(express.json());

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});


mongoose.connect('mongodb://localhost/zm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> { 
    console.log("connected to DB")
}).catch((err)=>{
    console.log("not connected to DB: " + err)
})

app.post('/budget', async (req, res)=> {
    await Budget.create(req.body, (err)=> {
        if(err) return res.status(400).json({
            error: true, 
            message: "Error: quote request failed!"
        });
    });

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b39fba2bcada44", 
          pass: "949c55440927e1", 
        },
      });

      var emailHtml = "Hello!<br><br> Your request was received and soon will be answered. ";
      var emailTxt = "Hello!\n\n Your request was received and soon will be answered.";

      var emailInfo = {
        from: '085f118ace-9a27f7@inbox.mailtrap.io',
        to: req.body.email,
        subject: "Quote request received!",
        text: emailTxt,
        html: emailHtml,
      }
      
      await transport.sendMail(emailInfo, function(err){
        if(err) return res.status(400).json({
            error: true, 
            message: "Error: quote request failed!"
        });
        return res.json({
            error: false,
            message: "Quote request successfully sent!"
        });    
      });

});

app.listen(8080, () => {
    console.log("server is up")
});