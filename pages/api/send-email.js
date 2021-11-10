import dotenv from 'dotenv'
import {createTransport} from 'nodemailer'

dotenv.config()

export default function (req, res) {

    const transporter = createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: '',
            pass: process.env.password,
        },
        secure: true,
    });

    const mailData = {
        from: 'quiz',
        to: '',
        subject: `Quiz: answers from ${req.body.name} ${req.body.surname}`,
        text: "Имя :" + req.body.name + "Фамилия:" + req.body.surname + "Телефон:" + req.body.phone + "Как связаться:" + req.body.communication,
        html: `
<div>Имя: ${req.body.name}</div>
<div>Фамилия: ${req.body.surname}</div>
<div>Телефон: ${req.body.phone}</div>
<div>Как связаться: ${req.body.communication}</div>
${req.body.answers.map(answer => `<div>${answer.q}: ${answer.a.sort().join(', ')}</div>`).join('')}
<div>Примерная стоймость: ${req.body.sliderValue}</div>
`
    }

    console.log(`trying to send email to ${mailData.to}`)

    // this is async action
    transporter.sendMail(mailData, function (err, info) {
        console.log(err || info)
    })

    console.log(req.body)
    res.send('success')
}
