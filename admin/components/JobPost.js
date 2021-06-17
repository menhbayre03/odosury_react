import React, { Component, Fragment } from "react";
import {
	Form,
	Input,
	Button,
	Card,
	Table,
	Drawer,
	Select,
	Popconfirm,
	Collapse
} from "antd";
import {
	DeleteFilled,
	PlusOutlined,
	CheckCircleFilled
} from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import config from "../config";
import {
	submitJobPost,
	getJobPost,
	openJobSubmitDrawer,
	closeJobSubmitDrawer,
	deleteJobPost
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
		// let self = this;
		this.props.dispatch(getJobPost());
		// this.fuckaa = config
		// 	.get("emitter")
		// 	.addListener("submitJobDone", function () {
		// 		console.log("aw");
		// 		self.setState({
		// 			opening: "",
		// 			requirements: "",
		// 			salary: "",
		// 			misc: ""
		// 		});
		// 	});
	}
	componentWillUnmount() {
		// this.fuckaa && this.fuckaa.remove();
		this.closeDrawer();
	}
	submitJobPost(vals) {
		this.props.dispatch(submitJobPost({ ...vals }));
	}
	openDrawer() {
		this.props.dispatch(openJobSubmitDrawer());
	}
	closeDrawer() {
		this.props.dispatch(closeJobSubmitDrawer());
	}
	deleteJobPost(data) {
		this.props.dispatch(deleteJobPost(data));
	}
	render() {
		const {
			jobPost: { jobposts, loadingJobPosts, drawerOpen }
		} = this.props;
		console.log(jobposts)
		const children = [];
		return (
			<Card
				title={"Ажлын зар"}
				bordered={true}
				extra={
					<Button
						onClick={this.openDrawer.bind(this)}
						// style={{ display: "inline", float: "right" }}
						type={"primary"}
						icon={<PlusOutlined />}
					>
						Зар нэмэх
					</Button>
				}
				loading={loadingJobPosts}
			>
				<Fragment>
					<div
						className="jobPostContainer"
						style={{
							background: "white",
							padding: "20px"
						}}
					>
						{jobposts.map((job) => {
							return (
								<Collapse accordion>
									<Collapse.Panel header={job.opening} key={job._id} style={{padding: "20px"}}>
										<h4 className="JPdesc">Шаардлага:</h4>
										<ul>
											{job.requirements.map((rqr) => {
												return (
													<li className="JPcontent">
														{rqr}
													</li>
												);
											})}
										</ul>
										<h4 className="JPdesc">Цалин:</h4>
										<p className="JPcontent">{job.salary}</p>
										<h4 className="JPdesc">Ажлын тайлбар:</h4>
										<ul>
											{job.misc.map((msc) => {
												return (
													<li className="JPcontent">
														{msc}
													</li>
												);
											})}
										</ul>
										<h4 className="JPdesc">
											Нийтлэсэн он сар:
										</h4>
										<p className="JPcontent">
											{moment(job.created).format(
												"YYYY-MM-DD h:mm:ss a"
											)}
										</p>
										<Popconfirm
											title={`Та устгах гэж байна!`}
											onConfirm={this.deleteJobPost.bind(
												this,
												job
											)}
											okText="Устгах"
											placement="left"
											cancelText="Болих"
										>
											<Button
												style={{ float: "right" }}
												type={"primary"}
												danger
												size={"small"}
											>
												<DeleteFilled />
												Устгаx
											</Button>
										</Popconfirm>
									</Collapse.Panel>
								</Collapse>
							);
						})}
					</div>
					<Drawer
						visible={drawerOpen}
						onClose={this.closeDrawer.bind(this)}
						placement="right"
						width={600}
						closable={false}
					>
						<Form
							onFinish={this.submitJobPost.bind(this)}
							className="JPform"
						>
							<Form.Item name="opening" label="Албан тушаал">
								<Input
									type="text"
									placeholder={
										"Хөгжүүлэгч, дизайнер, менежер, г.м."
									}
									value={this.state.opening}
									onChange={(e) =>
										this.setState({
											opening: [
												e.target.value,
												...this.state.opening
											]
										})
									}
									allowClear
									autoComplete="off"
									className="JPinput"
									style={{ width: "350px" }}
								/>
							</Form.Item>
							<Form.Item
								name="requirements"
								label="Тавигдаx шаардлагууд"
							>
								<Select
									mode="tags"
									tokenSeparators="&"
									placeholder="20 жилийн туршлагатай, Физикийн Доктор, г.м."
									className="JPinput"
									autoComplete="off"
									style={{ width: "350px" }}
								>
									{children}
								</Select>
							</Form.Item>
							<Form.Item name="salary" label="Цалин">
								<Input
									type="text"
									placeholder={"300,000,000.00₮"}
									value={this.state.salary}
									onChange={(e) =>
										this.setState({
											salary: e.target.value
										})
									}
									allowClear
									autoComplete="off"
									className="JPinput"
									style={{ width: "350px" }}
								/>
							</Form.Item>
							<Form.Item name="misc" label="Биелүүлэх үүрэг">
								<Select
									mode="tags"
									tokenSeparators="&"
									placeholder="Аппликэйшн хөгжүүлэх, дизайн гаргах, санхүүгийн тайлан гаргах, г.м."
									className="JPinput"
									autoComplete="off"
									style={{ width: "350px" }}
								>
									{children}
								</Select>
							</Form.Item>
							<Button
								htmlType="submit"
								type="primary"
								className="JPsubmit"
							>
								<CheckCircleFilled />
								Нийтлэx
							</Button>
						</Form>
					</Drawer>
				</Fragment>
			</Card>
		);
	}
}

export default connect(reducer)(JobPost);
