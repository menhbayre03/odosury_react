import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Table,
	Spinner
} from "react-bootstrap";
import { validatePromoCode } from "../../actions/promo_actions";
const reducer = ({ requests }) => ({ requests });

class PromoInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: "",
			hash: "",
			step: 1
		};
	}
	componentDidUpdate(prevProps) {
		const {
			requests: { promoError }
		} = this.props;
		if (
			this.props.requests.promoError &&
			this.props.requests.promoError !== prevProps.requests.promoError
		) {
			this.setState({ step: 1, code: "", hash: "" });
		} else {
		}
	}
	validatePromoCode(e) {
		console.log("validatepromocode method hit");
		e.preventDefault();

		if (this.state.step === 1) {
			this.setState({ step: 2 });
		} else {
			let data = {
				code: this.state.code,
				hash: this.state.hash
			};
			this.props.dispatch(validatePromoCode(data));
		}
	}
	render() {
		const {
			requests: {
				promoIsValid,
				promocode,
				validatingPromoCode,
				appliedCode,
				appliedDiscount
			}
		} = this.props;
		const { step } = this.state;
		return (
			<div className="promo-container">
				<div>
					{promoIsValid ? (
						<div className="coupon-valid">
							Промо Код <b>{appliedCode}</b> амжилттай идэвxжлээ
						</div>
					) : step === 1 ? (
						<p>Та Промо Код оруулж хөнгөлөлт эдлэх боломжтой</p>
					) : (
						<p>Нууцлал оруулна уу</p>
					)}
				</div>
				<Form
					className="promo-form"
					onSubmit={this.validatePromoCode.bind(this)}
				>
					<Row>
						{step === 1 ? (
							<Col sm={6}>
								<Form.Control
									size="sm"
									type="text"
									placeholder="Код"
									onChange={(e) =>
										this.setState({
											code: e.target.value
										})
									}
									value={this.state.code}
								/>
							</Col>
						) : step === 2 ? (
							<Col sm={6}>
								<Form.Control
									size="sm"
									type="text"
									placeholder="Нууцлал"
									onChange={(e) =>
										this.setState({
											hash: e.target.value
										})
									}
									value={this.state.hash}
								/>
							</Col>
						) : null}

						{/* <Col sm={4}>
							<Form.Control
								size="sm"
								type="text"
								placeholder="Нууцлал"
								onChange={(e) =>
									this.setState({
										hash: e.target.value
									})
								}
								value={this.state.hash}
							/>
						</Col> */}
						<Col sm={6}>
							<Button
								size="xs"
								type="submit"
								className="promo-submit-button"
							>
								{/* <span>Промо</span> */}
								{step === 1 ? (
									<span>Промо Код ашиглах</span>
								) : (
									<span>Нууцлал оруулах</span>
								)}
								{validatingPromoCode ? (
									<Spinner
										animation="grow"
										role="status"
										size="xs"
										className="promo-submit-spinner"
									></Spinner>
								) : null}
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default connect(reducer)(PromoInput);
