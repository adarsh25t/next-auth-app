import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

interface props {
    email: string,
    emailType: string,
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: props) => {
    try {

        const hashedToken: any = await bcryptjs.hash(userId, 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "49788150ee8138",
                pass: "25d7ad8cddae14"
            }
        });

        const mailOptions = {
            from: "adarshoffice25t@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>
                Click <a href="http://localhost:3000/${ emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}"> here </a> to 
                ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
            </p>`
        }
        
        const response = await transport.sendMail(mailOptions);
        return response;

    } catch (error: any) {
        throw new Error(error.message)
    }
}

