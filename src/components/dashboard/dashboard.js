import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardProf from "./dashboardProf";
import DashboardStudio from "./dashboardStudio";
import "./dashboard.scss";

class Dashboard extends Component {
	render() {
		const Dashboard =
			this.props.profile.role === "teacher" ? (
				<DashboardProf profile={this.props.profile} />
			) : (
				<DashboardStudio profile={this.props.profile} />
			);

		return <div className="">{Dashboard}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps)(Dashboard);
