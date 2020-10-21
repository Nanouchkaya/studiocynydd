import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export default (req, res) => {
  const callback = (err, data) => {
    if (err) {
      console.log(err);
      res.status(err.status).send("error" + JSON.stringify(err));
    } else {
      console.log("mail send");
      res.status(200).json({data}).send("success");
    }
  };

  const options = {
    from: `${req.body.email}`,
    to: `${process.env.EMAIL}`,
    subject: `${req.body.object ?? 'Contact site'}`,
    text: `${req.body.name} vous a envoyé le message suivant : ${req.body.message}`,
  };

  transporter.sendMail(options, callback);  
};