import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
	getFeedback,
	deleteFeedback,
	completedFeedback
} from "../actions/teacher_actions";

import { Card, Table, Popconfirm, Button, Tag } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const reducer = ({ feedBack }) => ({ feedBack });

class Feedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.dispatch(getFeedback());
	}
	deleteFeedback(data) {
		this.props.dispatch(deleteFeedback(data));
		console.log(data);
	}
	completedFeedback(data) {
		this.props.dispatch(completedFeedback(data));
	}

	render() {
		const {
			feedBack: { requests, gettingRequests }
		} = this.props;
		const columns = [
			{
				title: "№",
				width: "50px",
				key: Math.random(),
				fixed: "left",
				render: (text, record, idx) => idx + 1
			},
			{
				title: "Хүсэлт",
				key: Math.random(),
				width: '50%',
				render: (record) => record.feedback
			},
			{
				title: "Утасны дугаар",
				key: Math.random(),
				width: "100px",
				render: (record) => record.feedbackPhone
			},
			{
				title: "Илгээсэн он, сар",
				key: Math.random(),
				width: "200px",
				render: (record) =>
					moment(record.created).format("YYYY-MM-DD h:mm:ss a")
				// render: record => record.created
			},
			{
				title: "Статус",
				key: Math.random(),
				fixed: "right",
				width: "100px",
				render: (record) => (record.status === 'active' ? <Tag color="#2db7f5">Харсан</Tag> : record.status === 'pending' ? <Tag color="#87d068">Хараагүй</Tag> : <Tag color="#fbfbfb">Бусад</Tag>)
			},
			{
				title: "action",
				key: Math.random(),
				fixed: "right",
				render: (record) => (
					<Fragment>
						{record.status === "active" ? null : (
							<Button
								onClick={this.completedFeedback.bind(
									this,
									record
								)}
								type="primary"
								size="small"
                                style={{margin: "5px"}}
							>
								Харсан
							</Button>
						)}
						<Popconfirm
							title={`Та устгах гэж байна!`}
							onConfirm={this.deleteFeedback.bind(this, record)}
							okText="Устгах"
							placement="left"
							cancelText="Болих"
						>
							<Button type={"primary"} danger size={"small"}>
								<DeleteFilled />
								Устгаx
							</Button>
						</Popconfirm>
					</Fragment>
				)
			}
		];
		return (
			<Fragment>
				<Card
					title={"Хичээл нэмүүлэх санал хүсэлтүүд"}
					bordered={true}
					loading={gettingRequests}
				>
					<Table
						rowClassName={(record, index) =>
							record.status === "active"
								? "FBactive"
								: record.status === "pending"
								? "FBpending"
								: ""
						}
						columns={columns}
						dataSource={requests}
						loading={gettingRequests}
						scroll={{ x: 1300 }}
					/>
				</Card>
			</Fragment>
		);
	}
}

export default connect(reducer)(Feedback);
