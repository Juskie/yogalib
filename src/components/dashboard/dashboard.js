import React, {Component} from 'react';
import Notifications from "./notifications";
import PlanningList from "../planning/planningList";


class Dashboard extends Component {
    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                        <PlanningList />
                    </div>
                    <div className="">
                        <Notifications/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;