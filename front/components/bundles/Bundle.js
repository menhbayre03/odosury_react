import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchBundles } from "../../actions/bundle_actions";
import Header from "../include/Header";
import Footer from "../include/Footer";
import ActiveBanner from "./ActiveBanner";
const posters = [
	"poster1.jpg",
	"poster2.jpg",
	"poster3.png",
	"poster4.jpg",
	"poster5.jpg",
	"poster6.jpg",
	"poster7.jpg",
	"poster8.jpg",
	"poster9.jpg"
];
const reducer = ({ bundle }) => ({ bundle });

class Bundle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePoster: "poster5.jpg",
			scrollPosition: 0
		};
	}
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchBundles());
		// document.addEventListener("wheel", this.listenToScroll, {
		// 	passive: false
		// });
		// .querySelector(".bundles-container")
	}
	componentWillUnmount() {
		document
			.querySelector(".bundles-container")
			.removeEventListener("scroll", this.listenToScroll);
	}
	listenToScroll(e) {
		e.stopPropagation();
		e.preventDefault();
		// this.listenToScroll
		let elem = document.querySelector(".bundles-container");
		let winScroll = elem.scrollTop;
		// console.log("winscroll", winScroll);
		// const bottom = elem.scrollHeight - elem.clientHeight;

		// const scrolled = winScroll / bottom;
		const imageHeight = document.querySelector(".bundle-image").height;
		// function gg(e){

		// }

		// elem.scrollTop += imageHeight;

		// console.log("scrolled", winScroll, elem.scrollHeight,elem.clientHeight);
		// this.setState({
		// 	theposition: scrolled
		// });
	}
	scrollDown() {}
	render() {
		const {
			bundle: { fetchingBundles, boughtBundles, notBoughtBundles },
			router
		} = this.props;
		// console.log("notbought", notBoughtBundles);
		const { activePoster } = this.state;
		// console.log("active", activePoster);
		return (
			<>
				<Header location={this.props.location}></Header>
				<ActiveBanner
					leBundle={activePoster || "poster5.jpg"}
					query={
						activePoster && activePoster.levels
							? activePoster.levels[0].lessons
							: null
					}
				></ActiveBanner>
				<Container
					style={{
						position: "relative",
						top: -40,
						marginBottom: -64
					}}
					className="bundles-outer"
				>
					{/* <div className="scroll-indicator">
						<div class="chevron-up"></div>
						<div class="chevron-up"></div>
						<div class="chevron-up"></div>
					</div> */}
					<div className="bundles-container">
						{notBoughtBundles && notBoughtBundles.length > 0
							? notBoughtBundles.map((poster, index) => {
									{
										/* console.log("poster", poster); */
									}
									return (
										<div
											key={index}
											className="bundle"
											onClick={() =>
												this.setState({
													activePoster: poster
												})
											}
											// onClick={() => router.push("/bundle/doge")}
										>
											<img
												src={`http://cdn.odosury.mn${poster.thumbnail.path}`}
												alt="movie poster"
												className="bundle-image"
											/>
										</div>
									);
							  })
							: null}
					</div>
					<div className="scroll-indicator">
						<div className="chevron"></div>
						<div className="chevron"></div>
						<div className="chevron"></div>
					</div>
				</Container>
				{/* <Footer></Footer> */}
			</>
		);
	}
}

export default connect(reducer)(Bundle);
