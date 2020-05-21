const functions = require('firebase-functions');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

const passwordEmail = process.env.PASSWORD_EMAIL;

admin.initializeApp();


const sha1 = (email) => {
    return crypto.createHash('sha1').update(email).digest('hex');
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'camille.maisonobe@gmail.com',
        pass: passwordEmail
    }
});

exports.sendMailInvitation = functions.https.onCall((data, context) => {

    return admin.firestore().collection('invitations').add({
        email: data.email,
        hash: sha1(data.email)
    }).then(() => {
        const mailOptions = {
            from: `camille.maisonobe@gmail.com`,
            to: data.email,
            subject: 'Invitation à rejoindre Yogalib',
            html: `<h1>Salut ! Rejoins Yogalib c'est trop cool!</h1>
                            <p>
                               <b>Inscris-toi à <a href="http://localhost:3000/signup">cette adresse !</a><br>
                            </p>`
        };

        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    })
});

exports.newUserSignUp = functions.https.onCall(async (data, context) => {

    const email = admin.firestore().collection('invitations').where('email', '==', data.email);

    const snapshot = await email.get();
    // if (snapshot.empty) {
    //     console.log('No matching documents.');
    // }
    for await (const doc of snapshot) {
        const token = sha1(data.email);
        const newUserInvitation = doc.data();

        if (newUserInvitation.hash === token) {
            await admin.auth().createUser({
                uid: doc.id,
                email: data.email,
                password: data.password
            })
            await admin.firestore().collection('users').doc(doc.id).set({
                firstName: data.firstName,
                lastName: data.lastName,
                role: 'teacher',
                phone: data.phone
            })
        }
    }
    // return snapshot.forEach(doc => {
    //
    //     const token = sha1(data.email);
    //     const newUserInvitation = doc.data();
    //     const userInformations = admin.firestore().collection('users').doc(doc.id);
    //
    //     if (newUserInvitation.hash === token) {
    //         return admin.auth().createUser({
    //             uid: doc.id,
    //             email: data.email,
    //             password: data.password
    //         }).then(() => {
    //             return userInformations.set({
    //                 firstName: data.firstName,
    //                 lastName: data.lastName,
    //                 role: 'teacher',
    //                 phone: data.phone
    //             })
    //         })
    //     }
    // });
});