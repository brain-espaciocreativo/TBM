const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

router.post('/', (req, res) => {

    const { to, subject, html } = req.body;
  
    const CLIENT_ID = '1090339452314-a0cmi0ghmef7smtcp3ksnst6od3gv40s.apps.googleusercontent.com';
    const SECRET = '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';
    const REFRESH = '1//04sSMyD3-V0fiCgYIARAAGAQSNwF-L9IrFsKu6vXN6KQuXmLhNCoJjtgFa5rhPpXdkbIJET1t0--88I01vPInpGJ_C1IXMFJW0G0';
    const URI = 'https://developers.google.com/oauthplayground';
  
  
    async function sendEmail() {
      const oAuthClient = new google.auth.OAuth2(
        CLIENT_ID,
        SECRET,
        URI
      );
  
      contentHtml = `
              <h1>Hola Brayan</h1>
              <ul>
                  <li>adidas</li>
                  <li>rebook</li>
                  <li>nike</li>
                  <li>pumas</li>
              </ul>
              `
  
      try {
  
        oAuthClient.setCredentials({ refresh_token: REFRESH });
  
        const accessToken = await oAuthClient.getAccessToken()
        const tranporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'henrycourse22@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: SECRET,
            refreshToken: REFRESH,
            accessToken: accessToken
          }
        })
        const mailOptions = {
          from: "Pagina web",
          to: to,
          subject: subject,
          html: contentHtml
        };
  
        const result = await tranporter.sendMail(mailOptions)
  
        res.send(result)
  
      } catch (error) {
        console.log(error)
      }
    }
    sendEmail()
  });


module.exports = router;