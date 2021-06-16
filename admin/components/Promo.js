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
	submitPromoCode,
	getPromoCode,
	deletePromoCode
} from "../actions/promo_actions";

const reducer = ({ PromoCode }) => ({ PromoCode });

class PromoCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	componentDidMount() {
		
	}
	
	render() {
		const {
			
		} = this.props;
		
		return (
			<Card
				title={"Promo Code"}
				bordered={true}
			>
				<div>Hi</div>
			</Card>
		);
	}
}

export default connect(reducer)(PromoCode);
