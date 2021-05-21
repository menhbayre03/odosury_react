import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
	getTeacherRequests,
	deleteTeacherRequests,
	completedTeacherRequests
} from "../actions/teacher_actions";
import { DeleteFilled } from "@ant-design/icons";
import { Card, Table, Button, Popconfirm } from "antd";

const reducer = ({ teacherRequest }) => ({ teacherRequest });

class TeacherRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.dispatch(getTeacherRequests());
	}
	deleteTeacherRequests(data) {
		this.props.dispatch(deleteTeacherRequests(data));
	}
	completedTeacherRequests(data) {
		this.props.dispatch(completedTeacherRequests(data));
	}

	render() {
		const {
			teacherRequest: { requests, gettingRequests }
		} = this.props;
		const columns = [
			{
				title: "№",
				key: Math.random(),
				render: (text, record, idx) => idx + 1
			},
			{
				title: "Нэр",
				key: Math.random(),
				render: (record) => record.name
			},
			{
				title: "Утас",
				key: Math.random(),
				render: (record) => record.phone
			},
			{
				title: "Цахим шуудан",
				key: Math.random(),
				render: (record) => record.email
			},
			{
				title: "Хичээл",
				key: Math.random(),
				render: (record) => record.lesson
			},
			{
				title: "Ажлын туршлага",
				key: Math.random(),
				render: (record) => record.experience
			},
			{
				title: "Статус",
				key: Math.random(),
				fixed: "right",
				render: (record) =>
					record.status === "active"
						? "Харсан"
						: record.status === "pending"
						? "Хараагүй"
						: "Бусад"
			},
			{
				title: "Control",
				key: Math.random(),
				fixed: "right",
				render: (record) => (
					<Fragment>
						{record.status === "active" ? null : (
							<Button
								onClick={this.completedTeacherRequests.bind(
									this,
									record
								)}
								type="primary"
								size="small"
								style={{ margin: "5px" }}
							>
								Харсан
							</Button>
						)}
						<Popconfirm
							title={`Та устгах гэж байна!`}
							onConfirm={this.deleteTeacherRequests.bind(
								this,
								record
							)}
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
			},
			{
				title: "Илгээсэн он, сар",
				key: Math.random(),
				render: (record) =>
					moment(record.created).format("YYYY-MM-DD h:mm:ss a")
			}
		];
		return (
			<Fragment>
				<Card title={"Багш болох санал хүсэлтүүд"}
                bordered={true}
                loading={gettingRequests}>
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
					/>
				</Card>
			</Fragment>
		);
	}
}

export default connect(reducer)(TeacherRequest);
