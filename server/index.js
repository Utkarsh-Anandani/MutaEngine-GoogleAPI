const express = require('express');
const cors = require('cors');
const { generateToken } = require('./utils/jwt');
const bcrypt = require('bcryptjs');
const { signupSchema, loginSchema } = require('./utils/zod');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('./models/User');
const { verifyCaptcha } = require('./middlewares/verifyCaptcha');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: 'https://muta-engine-frontend.vercel.app'}));
const port = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;
const salt = bcrypt.genSaltSync(10);
const googleClient = new OAuth2Client("690137169343-ags8105pdld6tpdstq6mg278tmh880jd.apps.googleusercontent.com");

const razorpay = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})



app.get('/', (req, res) => {
    res.send(`running on port ${port}`)
})


// API for account registeration
app.post('/signup', verifyCaptcha, async (req, res) => {
    const { username, email, password } = req.body;

    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json(validation.error.errors);
    }

    try {
        await mongoose.connect(URI);

        const user = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, salt)
        })

        const token = generateToken(user);
        res.status(201).cookie('token', token).json({ 'message': 'Token Generated' });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    } finally {
        mongoose.disconnect();
    }
})


// API for logging in to your account
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json(validation.error.errors);
    }

    try {
        await mongoose.connect(URI);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 'message': 'Invalid email' });
        }
        else {
            console.log(user);

            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) return res.status(400).json({ 'message': 'Invalid password' });

            const token = generateToken(user);
            res.status(201).cookie('token', token).json({ 'message': 'Token Generated' })
        }
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    } finally {
        mongoose.disconnect();
    }
})


// API for OTP generation and sending mail
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        await mongoose.connect(URI)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const _otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = bcrypt.hashSync(_otp, salt);

        await user.updateOne({
            otp: hashedOtp
        })

        const mailOptions = {
            from: '"Password Reset" <noreply@gmail.com>',
            to: email,
            subject: 'Your Password Reset OTP',
            text: `Your OTP for password reset is: ${_otp}. It is valid for 10 minutes.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'OTP sent to email' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    } finally {
        mongoose.disconnect();
    }
});


// API to verify otp and update password
app.put('/reset-password/:email', async (req, res) => {
    const { otp, password } = req.body;
    const { email } = req.params;
    const emailID = email.toString();
    console.log(emailID)

    try {
        await mongoose.connect(URI);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verification = bcrypt.compareSync(otp, user.otp);
        console.log(verification)

        if (!verification) return res.status(400).json({ message: 'Incorrect or Expired OTP' })

        await user.updateOne({
            password: bcrypt.hashSync(password, salt)
        })

        res.status(200).json({ message: 'Password Changed Successfully' })
    } catch (error) {
        console.log(error, error.message)
        res.status(500).json({ 'message': error.message })
    } finally {
        mongoose.disconnect();
    }
})


// Google login API
app.post('/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        await mongoose.connect(URI);
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: "690137169343-ags8105pdld6tpdstq6mg278tmh880jd.apps.googleusercontent.com"
        });

        const { sub, name, email } = ticket.getPayload();

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            user = await User.create({
                googleId: sub,
                username: name,
                email: email,
                password: await bcrypt.hash('defaultPassword', 10) // Default password
            });
        }

        const token = generateToken(user);
        res.status(201).cookie('token', token).json({ 'message': 'Token Generated' })

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error logging in with Google" });
    }
});


// Placing order using Razorpay payment gateway
app.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;
  
    const options = {
      amount: amount * 100,
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json({ orderId: order.id });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
});


// Verifying Payment API before invoice generation
app.post('/verify-payment', (req, res) => {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  
    const secret = process.env.PAYMENT_KEY_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
  
    shasum.update(razorpayOrderId + '|' + razorpayPaymentId);
    const digest = shasum.digest('hex');
  
    if (digest === razorpaySignature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
  


app.listen(port, () => {
    console.log(`server running on port ${port}`);
}); 
