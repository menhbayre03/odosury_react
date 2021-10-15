import React, { Component } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
	togglePartnerModal,
	submitPartner
} from "../../actions/partner_actions";

const reducer = ({ partner }) => ({ partner });

class PartnerModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}
	toggleModal() {
		console.log("toggleModal");
		const { dispatch, self } = this.props;
		self.setState({ modalPartner: "" }, () =>
			dispatch(togglePartnerModal())
		);
	}
	submit(e) {
		console.log("e", e);
		const { dispatch } = this.props;
		dispatch(submitPartner({ partner: e }));
	}
	render() {
		console.log("hi");
		const {
			partner: { modalOpen }
		} = this.props;
		const { currentPage } = this.state;
		return (
			<Modal
				title="Хамтрагч байгууллага нэмэх"
				visible={modalOpen}
				onCancel={this.toggleModal.bind(this)}
				destroyOnClose={true}
				footer={null}
				footerStyle={{ textAlign: "center" }}
			>
				<div className="partner-drawer">
					{
						<Form
							name="Байгууллага нэмэх"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 12 }}
							initialValues={{ remember: false }}
							onFinish={this.submit.bind(this)}
							autoComplete="off"
							preserve={false}
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
								label="Таних тэмдэг"
								name="slug"
								help="odosury, bagsh, гэх мэтчилэн үг"
								rules={[
									{
										required: true,
										message: "Таних тэмдэг оруулна уу!"
									}
								]}
							>
								<Input />
							</Form.Item>
							<div style={{ textAlign: "right", marginTop: 10 }}>
								<Button onClick={this.toggleModal.bind(this)} style={{marginRight: 10}}>
									Хаах
								</Button>
								<Button htmlType="submit" type="primary">
									Үүсгэх
								</Button>
							</div>
						</Form>
					}
				</div>
			</Modal>
		);
	}
}

export default connect(reducer)(PartnerModal);
