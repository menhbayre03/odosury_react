import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/bundle_actions";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Container } from "react-bootstrap";

const reducer = ({ bundle }) => ({ bundle });

class BundleSingle extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { match, dispatch } = this.props;
		console.log("wtf is props", this.props);
		dispatch(actions.fetchBundleSingle(match.params.slug));
	}
	render() {
		console.log("bundlesingle render", this.props.bundle.bundleSingle);
		return (
			<>
				<Header></Header>
				<Container>
					<div>hello</div>
				</Container>
				<Footer></Footer>
			</>
		);
	}
}

export default connect(reducer)(BundleSingle);
