import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";
import * as actions from "../actions/lessonEish_actions";

const reducer = ({ main, home }) => ({ main, home });

class Careers extends Component {
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
					className="careers"
					style={{ minHeight: "calc(100vh - 185px)" }}
				>
					<div className="careerstitlebackground">
						<div className="careerstitle">
							<Container>
								<h3>
									Бид салбартаа манлайлагч залуус та бүхнийг
									угтан авахдаа үргэлж баяртай байх болно.
								</h3>
							</Container>
						</div>
					</div>
					<div className="careersposts">
						<Container>
							<div className="empty-data">
								<div className="emtry-picture">
									<img src="/images/empty.svg" />
								</div>
								<div className="emtry-text">Тун удахгүй</div>
							</div>
						</Container>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(Careers);
