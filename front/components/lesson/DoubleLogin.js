import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../include/Header";
import Footer from "../include/Footer";
import config from "../../config";

const reducer = ({ main }) => ({ main });

class DoubleLogin extends Component {
	constructor(props) {
		super(props);
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
					className="doubleLogin"
					style={{ minHeight: "calc(100vh - 185px)" }}
				>
					<h2 className="doubleLoginSad">{":("}</h2>
					<h3 className="doubleLoginTitle">
						Таны аккаунтаар өөр газраас нэвтэрсэн байна.
					</h3>
					<p className="doubleLoginText">
						Хэрэв та нууц үгээ алдсан бол{" "}
						<span
							className="doubleLoginLink"
							onClick={() =>
								config.get("emitter").emit("openLogin", {type: 'reset'})
							}
						>
							энд дарж{" "}
						</span>
						нууц үгээ сэргээнэ үү. Эсвэл та манай ажилтантай доорх
						утсаар холбогдоорой.
					</p>
					<p
						className="doubleLoginPhone"
						onClick={() => {
							window.open("tel:+97688445020");
						}}
					>
						+976 8844-5020
					</p>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(DoubleLogin);
