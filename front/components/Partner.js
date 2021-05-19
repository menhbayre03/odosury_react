import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";
import * as actions from "../actions/lessonEish_actions";

const reducer = ({ main, home }) => ({ main, home });

class Partner extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		config.get("ga").pageview(window.location.pathname);
		window.scroll(0, 0);
	}

	render() {
		return (
			<React.Fragment>
				<Header location={this.props.location} />
				<div
					className="partner"
					style={{ minHeight: "calc(100vh - 185px)" }}
				>
					<div className="partnertitlebackground">
						<div className="partnertitle">
							<Container>
								<h3>
									Байгууллагынхаа ажилчдын сурах хэрэгцээг
									тодорхойлж, тэдний төлөө санаа зовнидог
									байгууллагатай бид тусгай нөхцөл болон үнийн
									дүнгээр хамтран ажиллах боломжтой
								</h3>
							</Container>
						</div>
					</div>

					<div className="partnercontacts">
						<Container>
							<div className="partnericons">
								<div
									className="partnericon"
									onClick={() => {
										window.open("tel:+97688445020");
									}}
								>
									+976 8844-5020
								</div>
								<div
									className="partnericon"
									onClick={() => {
										window.open(
											"https://www.instagram.com/odosury/"
										);
									}}
								>
									<ion-icon name="logo-instagram" />
								</div>
								<div
									className="partnericon"
									onClick={() => {
										window.open(
											"https://www.facebook.com/OdoSury"
										);
									}}
								>
									<ion-icon name="logo-facebook" />
								</div>
								<div
									className="partnericon"
									onClick={() => {
										window.open("mailto:info@odosury.com");
									}}
								>
									info@odosury.com
								</div>
								<div className="partnericon">
									<h3>Та бидэнтэй яг одоо холбогдоорой</h3>
								</div>
							</div>
						</Container>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(Partner);
