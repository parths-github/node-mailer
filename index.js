const express = require('express');
const res = require('express/lib/response');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer')
require('dotenv').config()

app.use(bodyParser.urlencoded({exteded: false}));
app.get("/", (req, res) => {
    res.sendfile(__dirname + '/index.html');
})

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });
// added post
// 
 


  app.post("/", (req, res) => {
    let email = req.body.email;
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'Nodemailer Project',
        text: 'Hi from your nodemailer project'
      };

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
      res.sendfile(__dirname + '/index.html')

  })

app.listen(port, () => console.log(`Listening on port ${port}...`));







