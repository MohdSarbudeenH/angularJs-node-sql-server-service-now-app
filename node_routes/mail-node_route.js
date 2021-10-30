var nodemailer = require('nodemailer');


module.exports = function(app) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'sarbudeenofficial@gmail.com', // generated ethereal user
            pass: 'sarbu@gmail' // generated ethereal password
        }
    });

    app.post('/ServicePortal/SendEmail', function (req, res) {
            
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'ServicePortalClient@gmail.com',
                to: 'mohammed.sarbudeen@ingrammicro.com',
                subject: 'Sending Email using Node.js',
                text: req.body.mailcontent
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send({ message: "${error}"})
                }
                else
                {
                    res.setHeader('Access-Control-Allow-Origin', '*')
		            res.status(200).send({ message: 'It is working fine' });
                }
            });
        });
};