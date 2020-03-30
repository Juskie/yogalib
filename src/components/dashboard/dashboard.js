import React, {Component} from 'react';
import DashboardProf from "./dashboardProf";
import './dashboard.scss';
import {connect} from 'react-redux';


class Dashboard extends Component {

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                        <DashboardProf profile={this.props.profile}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
    }
};

export default connect(mapStateToProps)(Dashboard);