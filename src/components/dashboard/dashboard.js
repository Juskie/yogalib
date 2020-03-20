import React, {Component} from 'react';
import Notifications from "./notifications";
import {connect} from 'react-redux';


class Dashboard extends Component {

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                    </div>
                    <div className="">
                        <Notifications/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Dashboard);