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
			hash: ""
		};
	}
	validatePromoCode(e) {
		console.log("validatepromocode method hit");
		e.preventDefault();
		let data = {
			code: this.state.code
		};
		this.props.dispatch(validatePromoCode(data));
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
		return (
			<div className="promo-container">
				<div>
					{promoIsValid ? (
						<div className="coupon-valid">
							Промо Код <b>{appliedCode}</b> амжилттай идэвxжлээ
						</div>
					) : (
						<p>Та Промо Код оруулж хөнгөлөлт эдлэх боломжтой</p>
					)}
				</div>
				<Form
					className="promo-form"
					onSubmit={this.validatePromoCode.bind(this)}
				>
					<Row>
						<Col sm={5}>
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
						<Col sm={5}>
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
					</Row>
					<Row>
						<Col>
							<Button
								size="sm"
								type="submit"
								className="promo-submit-button"
							>
								<span>Промо Код ашиглах</span>
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

// function kek(props) {
// 	const {
// 		requests: { promoIsValid, validatingPromoCode, appliedCode }
// 	} = props;
// 	const [code, setcode] = useState("");
// 	const [isValid, setisValid] = useState(null);
// 	const [loading, setLoading] = useState(null);
// 	const [appliedCode, setappliedCode] = useState(null);
// 	// useEffect(() => {
// 	// 	const delayDebounceFn = setTimeout(() => {
// 	// 		console.log("wassup dawg");
// 	// 	}, 1000);
// 	// 	return () => clearTimeout(delayDebounceFn);
// 	// }, [code]);
// 	useEffect(() => {
// 		setisValid(promoIsValid);
// 	}, [promoIsValid]);
// 	function validatePromoCode() {
// 		console.log("validatepromocode method hit");
// 		const { dispatch } = props;
// 		// e.preventDefault();
// 		let data = {
// 			code: code
// 		};
// 		dispatch(validatePromoCode(data));
// 	}
// 	const {
// 		requests: { promoIsValid, validatingPromoCode, appliedCode }
// 	} = props;
// 	return (
// 		<div className="promo-container">
// 			<div>
// 				{isValid && isValid.length > 0 ? (
// 					<div className="coupon-valid">
// 						Промо Код <b>{appliedCode}</b> амжилттай идэвxжлээ
// 					</div>
// 				) : (
// 					<p>Та Промо Код оруулж хөнгөлөлт эдлэх боломжтой</p>
// 				)}
// 			</div>
// 			<Form
// 				className="promo-form"
// 				onSubmit={(event) => {
// 					event.stopPropagation();
// 					validatePromoCode();
// 				}}
// 				onSubmit={(event) => {
// 					event.stopPropagation();
// 					validatePromoCode();
// 				}}
// 			>
// 				<Row>
// 					<Col>
// 						<Form.Control
// 							size="sm"
// 							type="text"
// 							placeholder="Таны хөнгөлөлт энд"
// 							onChange={(event) => setcode(event.target.value)}
// 							value={code}
// 						/>
// 					</Col>
// 					<Col>
// 						<Button
// 							size="sm"
// 							type="submit"
// 							className="promo-submit-button"
// 						>
// 							<span>Промо Код ашиглах</span>
// 							{loading ? (
// 								<Spinner
// 									animation="grow"
// 									role="status"
// 									size="xs"
// 									className="promo-submit-spinner"
// 								></Spinner>
// 							) : null}
// 						</Button>
// 					</Col>
// 				</Row>
// 			</Form>
// 		</div>
// 	);
// }
