import React, { Component, Fragment } from "react";
import { Form, Input, Button, Card, Table } from "antd";
import { connect } from "react-redux";
import { submitJobPost, getJobPost } from "../actions/jobPost_actions";

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
		this.props.dispatch(getJobPost());
	}
	submitJobPost(vals) {
		this.props.dispatch(submitJobPost({ ...vals }));
	}
	successClose(){
		this.setState({
			successJobPosts: false,
			opening: '',
			requirements: '',
			salary: '',
			misc: '',
		})
	}

	render() {
		const {
			jobPost: { jobposts, loadingJobPosts, successJobPosts }
		} = this.props;
		return (
			<Fragment>
				<div
					className="jobPostContainer"
					style={{
						background: "white",
						padding: "20px"
					}}
				>
					{successJobPosts ? (
						<Card>
							<h3>Зар тавигдлаа</h3>
							<Button onClick={this.successClose.bind}>Хаах</Button>
						</Card>
					) : (
						<Form onFinish={this.submitJobPost.bind(this)}>
							<Form.Item name="opening">
								<Input
									type="text"
									placeholder={`opening`}
									onChange={(e) =>
										this.setState({
											opening: e.target.value
										})
									}
								/>
							</Form.Item>
							<Form.Item name="requirements">
								<Input
									type="text"
									placeholder={`requirements`}
									onChange={(e) =>
										this.setState({
											requirements: e.target.value
										})
									}
								/>
							</Form.Item>
							<Form.Item name="salary">
								<Input
									type="text"
									placeholder={`salary`}
									onChange={(e) =>
										this.setState({
											salary: e.target.value
										})
									}
								/>
							</Form.Item>
							<Form.Item name="misc">
								<Input
									type="text"
									placeholder={`misc`}
									onChange={(e) =>
										this.setState({ misc: e.target.value })
									}
								/>
							</Form.Item>
							<Button htmlType="submit">submitla</Button>
						</Form>
					)}
				</div>
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
								key: Math.random,
								render: (record) => record.opening
							},
							{
								title: "requirements",
								key: Math.random,
								render: (record) => record.requirements
							},
							{
								title: "salary",
								key: Math.random,
								render: (record) => record.salary
							},
							{
								title: "misc",
								key: Math.random,
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
