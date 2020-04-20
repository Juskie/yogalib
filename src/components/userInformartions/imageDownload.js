import React from 'react'
import { useFirebase } from 'react-redux-firebase'

export default function Uploader() {
    const firebase = useFirebase();

    function addTestFile() {
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child('test.txt')
        return fileRef.putString('Some File Contents')
            .then(snap => console.log('upload successful', snap))
            .catch(err => console.error('error uploading file', err))
    }

    return (
        <div>
            <h1>Example Upload</h1>
            <button onClick={addTestFile}>
                Upload Example File
            </button>
        </div>
    )
}