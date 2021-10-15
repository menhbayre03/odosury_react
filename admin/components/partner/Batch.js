import React, { Component } from "react";
import { Button, Drawer, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
	fetchBatches,
	togglePartnerDrawer,
	fetchCodes
} from "../../actions/partner_actions";
import Generator from "./Generator";
import moment from "moment";
const xls = require("xlsx");
const utils = xls.utils;

const reducer = ({ partner }) => ({ partner });

class Batch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: "view"
		};
	}

	componentDidMount() {
		const { dispatch, partnerId } = this.props;
		console.log("batch didmount", partnerId);
		dispatch(fetchBatches({ partnerId: partnerId }));
	}
	toggleDrawer() {
		const { dispatch, self } = this.props;
		dispatch(togglePartnerDrawer());
		self.setState({ currentPartner: "" });
	}
	togglePage() {
		if (this.state.currentPage === "view") {
			this.setState({ currentPage: "generate" });
		} else {
			this.setState({ currentPage: "view" });
		}
	}
	async print(id) {
		const {
			dispatch,
			partner: { codes },
			partnerId
		} = this.props;
		dispatch(fetchCodes({ batchID: id })).then(
			setTimeout(() => {
				if (codes && codes.length > 0) {
					let data = [];
					for (const code of codes) {
						data.push({
							Код: code.generatedCode,
							"Баталгаажуулах код": code.hash.slice(-8)
						});
					}
					const ws = xls.utils.json_to_sheet(data);
					const wb = xls.utils.book_new();
					xls.utils.book_append_sheet(wb, ws, "Коднууд");
					let asd = xls.writeFile(wb, `${partnerId}.xlsx`);
					return asd;
				}
			}, 2000)
		);
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
				title: "Тоо, ширхэг",
				dataIndex: "generatedAmount",
				key: "generatedAmount"
			},
			{
				title: "Нэг кодыг ашиглах тоо",
				dataIndex: "useCountPerCode",
				key: "useCountPerCode"
			},
			{
				title: "Дээд үнэ",
				dataIndex: "applicable",
				key: "applicable"
			},
			{
				title: "Хямдрал",
				dataIndex: "applicable",
				key: "applicable"
			},
			{
				title: "Дуусах",
				// dataIndex: "expirationDate",
				key: "expirationDate",
				render: (txt, record, idx) => {
					return moment(record.expirationDate).format(
						"DD/MM/YY-HH:MM"
					);
				}
			},
			{
				title: "Үүсгэсэн",
				// dataIndex: "created",
				key: "created",
				render: (txt, record, idx) => {
					return moment(record.created).format("DD/MM/YY-HH:MM");
				}
			},
			{
				title: "Татах",
				key: Math.random(),
				render: (txt, record, idx) => {
					return (
						<Button onClick={() => this.print(record._id)}>
							Татах
						</Button>
					);
				}
			}
		];
		const {
			partner: { drawerOpen, batches, codes },
			partnerId
		} = this.props;
		console.log("codesrender", codes);
		const { currentPage } = this.state;
		return (
			<Drawer
				title="Промо коднууд"
				visible={drawerOpen}
				onClose={this.toggleDrawer.bind(this)}
				width={600}
				footer={
					currentPage === "view" ? (
						<Button
							onClick={this.togglePage.bind(this)}
							type={"primary"}
							icon={<PlusOutlined />}
						>
							Шинэ код үүсгэх
						</Button>
					) : (
						<Button
							onClick={() => console.log("howdy")}
							icon={<PlusOutlined />}
						>
							Хаах
						</Button>
					)
				}
				footerStyle={{ textAlign: "center" }}
			>
				{currentPage === "view" ? (
					<div className="partner-drawer">
						{batches && batches.length > 0 ? (
							<Table dataSource={batches} columns={columns} />
						) : (
							<div>Промо коднууд алга байна</div>
						)}
					</div>
				) : (
					<Generator partnerId={partnerId} />
				)}
			</Drawer>
		);
	}
}

export default connect(reducer)(Batch);
