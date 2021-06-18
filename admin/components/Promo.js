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
	Collapse,
	Tag
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
	submitPromoCode,
	getPromoCode,
	deletePromoCode,
	restorePromoCode
} from "../actions/promo_actions";

const reducer = ({ promo }) => ({ promo });

class PromoCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: "",
			discount: ""
		};
	}

	componentDidMount() {
		this.props.dispatch(getPromoCode());
	}
	submitPromoCode(vals) {
		this.props.dispatch(submitPromoCode({ ...vals }));
	}
	deletePromoCode(data) {
		console.log(data);
		this.props.dispatch(deletePromoCode({ ...data }));
	}
	restorePromoCode(data) {
		this.props.dispatch(restorePromoCode({ ...data }));
	}

	render() {
		const {
			promo: {
				promocodes,
				successPromoCode,
				submittingPromoCode,
				loadingPromoCode,
				deletingPromoCode
			}
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
				title: "Промо код",
				key: Math.random(),
				width: "100px",
				render: (record) => record.code
			},
			{
				title: "Хямдарсан хувь",
				key: Math.random(),
				width: "100px",
				render: (record) => record.discount
			},
			{
				title: "Ашигласан тоо",
				key: Math.random(),
				width: "100px",
				render: (record) => record.used.length
			},
			{
				title: "Нийтлэсэн он, сар",
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
				width: "50px",
				render: (record) =>
					record.status === "active" ? (
						<Tag color="#2db7f5">Идэвхитэй</Tag>
					) : (
						<Tag color="gray">Идэвхигүй</Tag>
					)
			},
			{
				title: "action",
				key: Math.random(),
				fixed: "right",
				render: (record) => (
					<Fragment>
						{record.status === "active" ? (
							<Popconfirm
								title={`Та устгах гэж байна!`}
								onConfirm={this.deletePromoCode.bind(
									this,
									record
								)}
								okText="Устгах"
								placement="left"
								cancelText="Болих"
							>
								<Button type={"primary"} danger size={"small"}>
									<DeleteFilled />
									Зогсоох
								</Button>
							</Popconfirm>
						) : (
							<Button
								onClick={this.restorePromoCode.bind(
									this,
									record
								)}
								type="primary"
								size="small"
								style={{ margin: "5px" }}
							>
								Сэргээx
							</Button>
						)}
					</Fragment>
				)
			}
		];
		return (
			<Card
				title={"Promo Code"}
				bordered={true}
				loading={loadingPromoCode}
			>
				<div className="PCcontainer">
					{/* {(promocodes || []).map((promo) => {
						return (
							<div className="PCsingle">
								<p>Промо код: {promo.code}</p>
								<p>Хямдарсан хувь: {promo.discount}</p>
								<p>Ашигласан тоо: {promo.used.length}</p>
							</div>
						);
					})} */}
					<Table
						// rowClassName={(record, index) =>
						// 	record.status === "active"
						// 		? "FBactive"
						// 		: record.status === "pending"
						// 		? "FBpending"
						// 		: ""
						// }
						columns={columns}
						dataSource={promocodes}
						loading={loadingPromoCode}
						// scroll={{ x: 1300 }}
					/>
				</div>
				<Form
					onFinish={this.submitPromoCode.bind(this)}
					className="PCform"
				>
					<Form.Item name="code" label="Код">
						<Input
							type="text"
							placeholder="АМЖИЛТ2021, БАТЛАГА22, г.м."
							value={this.state.code}
							onChange={(e) => {
								this.setState({
									code: [e.target.value, ...this.state.code]
								});
							}}
							allowClear
							autoComplete="off"
							className="PCinput"
						/>
					</Form.Item>
					<Form.Item name="discount" label="Хямдрал %">
						<Input
							type="number"
							placeholder="0-100 хооронд, % бичихгүй"
							value={this.state.discount}
							onChange={(e) => {
								this.setState({
									discount: [
										e.target.value,
										...this.state.discount
									]
								});
							}}
							allowClear
							autoComplete="off"
							className="PCinput"
						/>
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
			</Card>
		);
	}
}

export default connect(reducer)(PromoCode);
