import React, {Component} from 'react';

class DashboardProf extends Component {

    render() {

        const {profile} = this.props;

        return (
            <div>
                <section>
                    <h2>Bienvenue,</h2>
                    <h1>{profile.firstName}</h1>
                </section>
                <section>

                </section>
            </div>
        );
    }
}

export default DashboardProf;