import * as functions from 'firebase-functions';
import * as express from 'express';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: process.env.WHITELISTED_ORIGINS?.split(', '),
}));

dotenv.config();

const PORT = 5555;

app.post('/send-email', (req, res) => {
    (async () => {
        const { EMAIL, EMAIL_PASS } = process.env;
        const { senderEmail, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: EMAIL,
                pass: EMAIL_PASS,
            },
        });

        const formattedMessage = message.replaceAll('\n', '<br>');

        const info = await transporter.sendMail({
            from: senderEmail,
            to: EMAIL,
            subject: `[contact form] ${subject}`,
            text: message,
            html: `<div><strong>original sender:</strong><div>${senderEmail}</div></div><br><div><strong>message:</strong><div>${formattedMessage}</div></div>`,
        });

        if (info.response.toLowerCase().includes('ok')) {
            res.status(200).json({ message: 'successfully sent email' });
            return;
        }

        res.status(500).json({ message: 'error sending email' });
        console.log({ error: info });
        return;
    })();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

exports.nodemailerApi = functions.https.onRequest(app);
