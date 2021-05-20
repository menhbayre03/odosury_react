import React, { Component, Fragment } from "react";
import { Form, Input, Button, Card, Table, Drawer } from "antd";
import { connect } from "react-redux";
import config from "../config";
import {
	submitJobPost,
	getJobPost,
	openJobSubmitDrawer,
	closeJobSubmitDrawer
} from "../actions/jobPost_actions";

const reducer = ({ jobPost }) => ({ jobPost });

class JobPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opening: "",
			requirements: "",
			salary: "",
			misc: ""
		};
	}

	componentDidMount() {
		let self = this;
		this.props.dispatch(getJobPost());
		this.fuckaa = config
			.get("emitter")
			.addListener("submitJobDone", function () {
				console.log("aw");
				self.setState({
					opening: "",
					requirements: "",
					salary: "",
					misc: ""
				});
			});
	}
	componentWillUnmount() {
		this.fuckaa && this.fuckaa.remove();
	}
	submitJobPost(vals) {
		this.props.dispatch(submitJobPost({ ...vals }));
	}
	openDrawer() {
		this.props.dispatch(openJobSubmitDrawer());
	}
	closeDrawer() {
		this.setState(this.props.resetFields(), () =>
			this.props.dispatch(closeJobSubmitDrawer())
		);
	}

	render() {
		const {
			jobPost: { jobposts, loadingJobPosts, drawerOpen }
		} = this.props;
		console.log(this.state);
		return (
			<Fragment>
				<div
					className="jobPostContainer"
					style={{
						background: "white",
						padding: "20px"
					}}
				></div>
				<Button onClick={this.openDrawer.bind(this)}>Зар нэмэх</Button>
				<Drawer
					visible={drawerOpen}
					onClose={this.closeDrawer.bind(this)}
				>
					<Form onFinish={this.submitJobPost.bind(this)}>
						<Form.Item name="opening">
							<Input
								type="text"
								placeholder={"opening"}
								value={this.state.opening}
								onChange={(e) =>
									this.setState({
										opening: e.target.value
									})
								}
								allowClear
							/>
						</Form.Item>
						<Form.Item name="requirements">
							<Input
								type="text"
								placeholder={"requirements"}
								value={this.state.requirements || ""}
								onChange={(e) =>
									this.setState({
										requirements: e.target.value
									})
								}
								allowClear
							/>
						</Form.Item>
						<Form.Item name="salary">
							<Input
								type="text"
								placeholder={"salary"}
								value={this.state.salary}
								onChange={(e) =>
									this.setState({
										salary: e.target.value
									})
								}
								allowClear
							/>
						</Form.Item>
						<Form.Item name="misc">
							<Input
								type="text"
								placeholder={"misc"}
								value={this.state.misc}
								onChange={(e) =>
									this.setState({ misc: e.target.value })
								}
								allowClear
							/>
						</Form.Item>
						<Button htmlType="submit">submitla</Button>
					</Form>
				</Drawer>
				<Card>
					<Table
						columns={[
							{
								title: "№",
								key: Math.random(),
								render: (text, record, idx) => idx + 1
							},
							{
								title: "opening",
								key: Math.random(),
								render: (record) => record.opening
							},
							{
								title: "requirements",
								key: Math.random(),
								render: (record) => record.requirements
							},
							{
								title: "salary",
								key: Math.random(),
								render: (record) => record.salary
							},
							{
								title: "misc",
								key: Math.random(),
								render: (record) => record.misc
							}
							// {
							// 	title: "dateo",
							// 	key: Math.random(),
							// 	render: (record) =>
							// 		moment(record.created).format(
							// 			"YYYY-MM-DD h:mm:ss a"
							// 		)
							// }
						]}
						dataSource={jobposts}
						loading={loadingJobPosts}
					/>
				</Card>
			</Fragment>
		);
	}
}

export default connect(reducer)(JobPost);
