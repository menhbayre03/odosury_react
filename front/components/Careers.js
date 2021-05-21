import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Container,
	Row,
	Col,
	Table,
	Card,
	ListGroup,
	ListGroupItem
} from "react-bootstrap";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";
import { getJobPost } from "../actions/jobPost_actions";

const reducer = ({ jobPost }) => ({ jobPost });

class Careers extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(getJobPost());
		config.get("ga").pageview(window.location.pathname);
		window.scroll(0, 0);
	}

	render() {
		const {
			jobPost: { jobposts, loadingJobPosts }
		} = this.props;
		console.log(jobposts);
		const renderJobs = (jobposts) => {
			return (
				<tr>
					<td>{jobposts.opening}</td>
					<td>{jobposts.requirements}</td>
					<td>{jobposts.salary}</td>
					<td>{jobposts.misc}</td>
				</tr>
			);
		};
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
							{loadingJobPosts ? (
								<div>Loading</div>
							) : (
								<div className="CareersCards">
									{jobposts.map((job) => {
										return (
											<div className="CareersCard">
												<h2>{job.opening}</h2>
												<h3>Шаардлага</h3>
												<ul>
													{job.requirements.map(
														(rqr) => {
															return <li>{rqr}</li>
														}
													)}
												</ul>
												<h3>Цалин</h3>
												<p>{job.salary}</p>
												<h3>Гүйцэтгэx үүрэг</h3>
												<ul>{job.misc.map((msc)=>{
													return <li>{msc}</li>
												})}</ul>
											</div>
										);
									})}
								</div>
							)}
						</Container>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(Careers);
