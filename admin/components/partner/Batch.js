import React, { Component } from "react";
import {
	Form,
	Input,
	Button,
	Card,
	Drawer,
	Select,
	Popconfirm,
	Collapse
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import {
	fetchBatches,
	togglePartnerDrawer
} from "../../actions/partner_actions";
import Generator from "./Generator";

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
	render() {
		const {
			partner: { drawerOpen, batches },
			partnerId
		} = this.props;
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
							type={"primary"}
							icon={<PlusOutlined />}
						>
							Hi
						</Button>
					)
				}
				footerStyle={{ textAlign: "center" }}
			>
				{currentPage === "view" ? (
					<div className="partner-drawer">
						{batches && batches.length > 0 ? (
							batches.map((batch) => {
								return (
									<div className="batch">{batch.name}</div>
								);
							})
						) : (
							<div>Промо коднууд алга байна</div>
						)}
					</div>
				) : (
					<Generator />
				)}
			</Drawer>
		);
	}
}

export default connect(reducer)(Batch);
