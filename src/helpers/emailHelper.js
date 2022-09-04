import nodemailer from "nodemailer";

const emailProcessor = async (emailBody) => {
  try {
    //1.
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail(emailBody);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export const verificationEmail = (emailData) => {
  // send mail with defined transport object
  const emailBody = {
    from: '"Subin 👻" <myemail@subinStore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Emial verification instruction", // Subject line
    text: `Hi ${emailData.fName} Follow the link below to verify your email ${emailData.url}`, // plain text body
    html: ` 
    <p> Hi ${emailData.fName} </p>
    <br />
    <br />
    <p>Follow the link below to verify your email.</p>
    <br />
    <br />
    <p><a href = "${emailData.url}">Verify Email</a></p>
    <p>
    Kind Regards, <br/>
    Subin Basnet
    </p>
    `, // html body
  };
  emailProcessor(emailBody);
};
