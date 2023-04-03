const express = require('express');
const path = require('path')
const nm = require('nodemailer');
const fs = require('node:fs');
const { createReadStream } = require('node:fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

const transporter = nm.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'flossie.mante1@ethereal.email',
        pass: 'B73P3Dayb32BWJwV8Y'
    }
})

transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    const accessToken = userToken[user];
    if (!accessToken) {
        callback(new Error('No user'))
    } else {
        callback(null, accessToken)
    }
})

const messageOptions = {
    from: "'flossie' flossie.mante1@ethereal.email",
    to: "foo@example.com, bar@example.com",
    subject: "image attachment",
    text: 'Sending iamges',
    html: './mail.html',
    // attachments: [
    //     {
    //         filename: 'user.png',
    //         path: './public/user.png',
    //         cid: 'localhost:5000'
    //     }
    // ]
    // alternatives: [
    //     {
    //         contentType: 'text/x-web-markdown',
    //         content: '**Hello world!**',
    //     }
    // ]
}

const mailInfo = transporter.sendMail(messageOptions);

console.log('mailInfo', mailInfo)

mailInfo.then(result => {
    console.log('message sent')
    console.log('result', result)
}).catch(err => {
    console.log(err)
})

app.listen(5000, () => console.log('5000'))