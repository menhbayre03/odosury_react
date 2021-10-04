import React, { Component } from "react";
import {
	Form,
	Input,
	Button,
	Card,
	Drawer,
	Select,
	Popconfirm,
	Table
} from "antd";
import {
	fetchPartners,
	fetchBatches,
	fetchCodes,
	deletePartner,
	deleteBatch,
	submitPartner,
	submitBatch
} from "../../actions/partner_actions";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Batch from "./Batch";
import { togglePartnerDrawer } from "../../actions/partner_actions";

const reducer = ({ partner }) => ({ partner });

class Partner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPartner: ""
		};
	}
	componentDidMount() {
		this.props.dispatch(fetchPartners());
	}
	toggleDrawer(data) {
		const { dispatch } = this.props;
		this.setState({ currentPartner: data }, () => {
			dispatch(togglePartnerDrawer());
		});
	}
	render() {
		const columns = [
			{
				key: "_id",
				title: "№",
				render: (txt, record, idx) => idx + 1
			},
			{
				title: "Нэр",
				dataIndex: "name",
				key: "name"
			},
			{
				title: "slug",
				dataIndex: "slug",
				key: "age"
			},
			{
				title: "Дэлгэрэнгүй",
				key: "more",
				render: (txt, record, idx) => {
					console.log("what are thooose", txt, record, idx);
					return (
						<Button onClick={() => this.toggleDrawer(record._id)}>
							Дэлгэрэнгүй
						</Button>
					);
				}
			}
		];
		const {
			partner: { partners, fetchingPartners }
		} = this.props;
		console.log("state is ", this.state.currentPartner);
		return (
			<>
				<Card
					title={"Масс Промо"}
					bordered={true}
					// extra={
					// 	<Button
					// 		onClick={this.toggleDrawer.bind(this)}
					// 		type={"primary"}
					// 		icon={<PlusOutlined />}
					// 	>
					// 		Yo wtf
					// 	</Button>
					// }
					loading={fetchingPartners}
				>
					<div className="partner-body">
						<Table dataSource={partners} columns={columns} />
					</div>
				</Card>
				{this.state.currentPartner !== "" ? (
					<Batch partnerId={this.state.currentPartner} self={this} />
				) : null}
			</>
		);
	}
}

export default connect(reducer)(Partner);
