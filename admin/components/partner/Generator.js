import React, { Component } from "react";
import {
	Form,
	Input,
	InputNumber,
	Button,
	Card,
	Drawer,
	Select,
	Popconfirm,
	Collapse,
	DatePicker
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import { submitBatch } from "../../actions/partner_actions";

const reducer = ({ partner }) => ({ partner });

class Generator extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	submit(e) {
		console.log("E", e);
		const { dispatch } = this.props;
		dispatch(submitBatch({ partnerBatch: e }));
	}

	componentDidMount() {}
	toggleDrawer() {}
	render() {
		const {
			partner: { drawerOpen, batches, submittingBatch, successBatch },
			partnerId
		} = this.props;
		console.log("successbatch", successBatch);
		return (
			<div className="partner-drawer">
				{successBatch ? (
					<div>
						<div class="success-checkmark">
							<div class="check-icon">
								<span class="icon-line line-tip"></span>
								<span class="icon-line line-long"></span>
								<div class="icon-circle"></div>
								<div class="icon-fix"></div>
							</div>
						</div>
						<div style={{ textAlign: "center" }}>
							Коднууд амжилттай үүслээ
						</div>
					</div>
				) : (
					<Form
						name="Код үүсгэх"
						labelCol={{ span: 12 }}
						wrapperCol={{ span: 12 }}
						// initialValues={{ remember: true }}
						onFinish={this.submit.bind(this)}
						// onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Нэр"
							name="name"
							rules={[
								{
									required: true,
									message: "Нэр оруулна уу!"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Үүсгэх ширхэг"
							name="generatedAmount"
							help="Үүсгэх тоо"
							rules={[
								{
									required: true,
									message: "Үүсгэх тоо оруулна уу!"
								}
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item
							label="Нэг кодыг ашиглах тоо"
							name="useCountPerCode"
							help="Нэг ширхэг кодыг хэдэн удаа ашиглах вэ?"
							rules={[
								{
									required: true,
									message: "Нэг кодыг ашиглах тоо оруулна уу!"
								}
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item
							label="Худалдан авалтийн дээд үнэ"
							name="applicable"
							help="Хэдээс дээш үнэтэй юм худалдаж авахдаа ашиглаж болохгүй вэ?"
							rules={[
								{
									required: true,
									message: "Ашиглах нөхцөл оруулна уу!"
								}
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item
							label="Хямдраx хувь"
							name="discount"
							help="Худалдан авж буй зүйлээс хэдэн хувь хасаж хямдруулах вэ?"
							rules={[
								{
									required: true,
									message: "Хямдраx хувь оруулна уу!"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Дуусах хугацаа"
							name="expirationDate"
							help="Хэзээ хүртэл хүчинтэй вэ?"
							rules={[
								{
									required: true,
									message: "Үргэлжлэх хугацаа оруулна уу!"
								}
							]}
						>
							<DatePicker />
						</Form.Item>
						<Form.Item
							label="Таних тэмдэг"
							name="slug"
							help="odosury-***, bagsh-***, гэх мэтчилэн кодны урд хэсэгт байх үг"
							rules={[
								{
									required: true,
									message: "Таних тэмдэг оруулна уу!"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Даршилах давс"
							name="salt"
							help="Дурын зүйл бичнэ үү"
							rules={[
								{
									required: true,
									message: "Нууцлал оруулна уу!"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item wrapperCol={{ span: 24 }}>
							<Button
								htmlType="submit"
								onClick={this.submit.bind(this)}
							>
								Үүсгэх
							</Button>
						</Form.Item>
					</Form>
				)}
			</div>
		);
	}
}

export default connect(reducer)(Generator);
