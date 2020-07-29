import {storage} from '../../config/base';
import React, {Component} from 'react';
import {addUserImage} from "../../store/actions/userInformationsActions";
import {connect} from "react-redux";

class ImageUpload extends Component {

    state = {
        image: null,
        url: "",
        progress: 0
    };

    handleChange = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
    };

    handleUpload = () => {
        const { image } = this.state;
        const { profile } = this.props;

        const imageName = `${profile.firstName}${profile.lastName}`;
        const uploadTask = storage.ref(`${this.props.path}/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({
                    progress: progress
                })
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref(`${this.props.path}`)
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.props.addUserImage({profilePicture: url})
                        this.setState({
                            url: url
                        })
                    });
            }
        );
    };
    render() {
        const { progress } = this.state;
        const { profile } = this.props;

        return (
            <>
                <progress value={progress} max="100" />
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <img src={profile.profilePicture || " "} alt="firebase" />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUserImage: (informations) => dispatch(addUserImage(informations))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);