const Enrollment = require('../modals/Enrollement');
const nodemailer = require('nodemailer');
const services = [
    'English Speaking',
    'IELTS/PTE',
    'Frontend Development',
    'Backend Development',
    'JEE Preparation',
    'UPSC Preparation',
    'Assignment Help',
    'Essay Writing',
    'Data structure and algoritham',
     'Content writting skills',
     ' Interview prepartion',
     ' Machine and learning  '
  ];
   //  storage for verification codes of email
const verificationCodes = {};

 // here i did nodemailer 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// here i am fatching servies 
exports.getServices = (req, res) => {
  res.json({ services });
};

// Send verification code via email
exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send({ success: false, message: 'Email is mandtory ,caanot be unfilled' });

  const code = Math.floor(100000 + Math.random() * 900000);  // here i am generating six
  // digit code for email verufiaction 
  verificationCodes[email] = code;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is ${code}.`,
    });
    res.status(200).send({ success: true, message: 'Verification code sent to email.' });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//  here i am doing verification of code 
exports.verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] && verificationCodes[email] === parseInt(code, 10)) {
    delete verificationCodes[email];
    res.status(200).send({ success: true, message: 'Verification is successful.' });
  } else {
    res.status(400).send({ success: false, message: 'Invalid verification code.' });
  }
};

// here it is create to submit enrollement
exports.enroll = async (req, res) => {
  const { name, email, phone, selectedService } = req.body;

  if (!name || (!email && !phone) || !selectedService) {
    return res.status(400).send({ success: false, message: 'All fields are required to selected.' });
  }

  if (!services.includes(selectedService)) {
    return res.status(400).send({ success: false, message: 'Invalid service selected.' });
  }

  try {
    const enrollment = new Enrollment({ name, email, phone, selectedService });
    await enrollment.save();

    res.status(201).send({
      success: true,
      message: `Enrollment successful for ${selectedService}.`,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error in saving enrollment.', error: error.message });
  }
};
