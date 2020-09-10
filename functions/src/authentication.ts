import * as functions from 'firebase-functions';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';

admin.initializeApp();

const sha1 = (email: string) => {
    return crypto.createHash('sha1').update(email).digest('hex');
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: functions.config().auth.user,
        pass: functions.config().auth.password
    }
});

export const sendMailInvitation = functions.https.onCall((data: {email: string}) => {

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

        return new Promise( (resolve, reject) => {
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        }).catch(error => {
            throw new functions.https.HttpsError(
                'failed-precondition',
                `${error}`
            );
        })

    })
});

export const sendMailConfirmation = functions.https.onCall((data: {email: string}) => {

    const mailOptions = {
        from: `camille.maisonobe@gmail.com`,
        to: data.email,
        subject: 'Confirmation de votre inscription sur Yogalib',
        html: `<h1>Merci pour votre inscription !</h1>
                            <p>
                               <b>Trop cool !</a><br>
                            </p>`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {return;}
        console.log("Sent!")
    });
    return;
});

export const newUserSignUp = functions.https.onCall(async (data: {email: string, password: string, firstName: string, lastName: string, phone: number}) => {

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
            'Aucun mail d\'invitation n\'a été trouvé avec ce mail.'
        );
    }

    const promises: Promise<object>[] = [];

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

export const checkUserEmail = functions.https.onCall(async (data: {email: string}) => {

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