const functions = require('firebase-functions');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

admin.initializeApp();
require('dotenv').config();

const sha1 = (email) => {
    return crypto.createHash('sha1').update(email).digest('hex');
}

const {AUTH_USER, AUTH_PASSWORD} = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: AUTH_USER,
        pass: AUTH_PASSWORD
    }
});

exports.sendMailInvitation = functions.https.onCall((data, context) => {

    return admin.firestore().collection('invitations').doc(data.email).set({
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

exports.sendMailConfirmation = functions.https.onCall((data, context) => {

        const mailOptions = {
            from: `camille.maisonobe@gmail.com`,
            to: data.email,
            subject: 'Confirmation de votre inscription sur Yogalib',
            html: `<h1>Merci pour votre inscription !</h1>
                            <p>
                               <b>Trop cool !</a><br>
                            </p>`
        };

        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return;
            }
            console.log("Sent!")
        });
});

exports.newUserSignUp = functions.https.onCall(async (data, context) => {

    const checkEmail = await admin.firestore().collection("users").doc(data.email).get();

    if (checkEmail.exists) {
        throw new functions.https.HttpsError(
            'already-exists',
            'Le mail possède déjà un compte sur la plateforme.'
        );
    }

    const email = admin.firestore().collection('invitations').where('email', '==', data.email).limit(1);

    const snapshot = await email.get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Aucun mail d\'invitation trouvé avec ce mail.'
        );
    }

    const promises = [];

    snapshot.forEach(doc => {
        const token = sha1(data.email);
        const newUserInvitation = doc.data();

        if (newUserInvitation.hash === token) {
            promises.push(admin.auth().createUser({
                uid: doc.id,
                email: data.email,
                password: data.password
            }))
            promises.push(admin.firestore().collection('users').doc(doc.id).set({
                firstName: data.firstName,
                lastName: data.lastName,
                role: 'teacher',
                phone: data.phone
            }))
        }
    })

    await Promise.all(promises);
});

exports.checkUserEmail = functions.https.onCall(async (data, context) => {

    const checkEmail = await admin.firestore().collection("invitations").doc(data.email).get();

    if (checkEmail.exists) {
        throw new functions.https.HttpsError(
            'already-exists',
            'Le mail utilisé a déjà reçu une invitation.'
        );
    } else {
        return data.email;
    }

});