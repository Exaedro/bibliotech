import nodemailer from 'nodemailer'

class Email {
    constructor({ email }) {
        this.email = email

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.email,
                clientId: process.env.CLIENT_ID,    
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFREST_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });

        this.options = {
            from: process.env.EMAIL_ACCOUNT,
        };
    }
    
    async send({ to, subject, text }) {
        this.options.to = to
        this.options.subject = subject
        this.options.text = text

        try {
            const result = await this.transporter.sendMail(this.options)
            return result
        } catch(err) {
            console.error(err)
        }
    }
}

export default Email