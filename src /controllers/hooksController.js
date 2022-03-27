const axios = require('axios')
const nodemailer = require('nodemailer');


const sampleHookController = async(request, response) => {
    console.log(request.body)
    
    const secondServerRequest = await axios.post('http://localhost:3009/api/v1/samplePOST', {
        data: {
            value: request.body
        }
    });
    const content = request.body.message
    const avatarUrl = request.body.avatar
    try {
         const discordUrl = process.env.DISCORD_URL
         const discordHook = await axios.post(discordUrl, {
        content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    sendEmail(content)
    } catch(err) {
        console.log(err)
    }
   
    response.status(200).send("received")
}

const sendEmail = async (message) => {
    let testAccount = await nodemailer.createTestAccount();
    let mailTransporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});
  
let mailDetails = {
    from: 'timodie.addai@gmail.com',
    to: 'mickey.addai@gmail.com, timodie.addai@gmail.com',
    subject: 'Test mail',
    text: `Node.js testing mail for GeeksforGeeks ${message}` 
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully', data);
    }
});
}
  

module.exports = {
    sampleHookController
}