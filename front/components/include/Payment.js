import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config";
import Loader from "../include/Loader";
import QRCode from "react-qr-code";
import { isMobile } from "react-device-detect";
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Table,
	Spinner
} from "react-bootstrap";
import * as actions from "../../actions/payment_actions";
import {
	validatePromoCode,
	clearPromoCode,
} from "../../actions/promo_actions";
import { Link } from "react-router-dom";
import { validate } from "../../../../odosury_api/models/Teacher";
import TestPayment from "./testPayment";
const reducer = ({ main, payment, requests }) => ({ main, payment, requests });

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ""
		};
	}

	componentDidMount() {
		let self = this;
		this.paymentModal = config
			.get("emitter")
			.addListener("paymentModal", function (data) {
				self.doIT(data);
			});
		this.closedPayment = config
			.get("emitter")
			.addListener("closedPayment", function () {
				const scrollY =
					document.getElementsByClassName("main-main")[0].style.top;
				document.getElementsByClassName("main-main")[0].style.position =
					"";
				document.getElementsByClassName("main-main")[0].style.top = "";
				document.getElementsByClassName("main-main")[0].style.width =
					"unset";
				document.getElementsByClassName(
					"main-main"
				)[0].style.paddingRight = `unset`;
				window.scrollTo(0, parseInt(scrollY || "0") * -1);
			});
	}
	componentWillUnmount() {
		this.paymentModal && this.paymentModal.remove();
		this.closedPayment && this.closedPayment.remove();
	}

	doIT(data) {
		console.log("payment Doit", data);
		const {
			main: { pendingTransactions }
		} = this.props;
		if (data.type === "premium") {
			let transes = pendingTransactions.filter(
				(item) => item.type === "premium"
			);
			if (transes.length > 0) {
				this.setPaymentOld(transes[0], data);
			} else {
				this.open(data);
			}
		} else if (data.type === "eish") {
			let transes = pendingTransactions.filter(
				(item) => item.type === "eish"
			);
			if (transes.length > 0) {
				this.setPaymentOld(transes[0], data);
			} else {
				this.open(data);
			}
		} else if (data.type === "test") {
			console.log("elif data test block");
			let transes = pendingTransactions.filter(
				(item) => item.type === "test"
			);
			if (transes.length > 0) {
				this.setPaymentOld(transes[0], data);
			} else {
				this.open(data);
			}
		} else {
			let transes = pendingTransactions.filter(
				(item) =>
					item.type === "lesson" &&
					item.lesson.toString() === data.lesson._id.toString()
			);
			if (transes.length > 0) {
				this.setPaymentOld(transes[0], data);
			} else {
				this.open(data);
			}
		}
	}

	open(data) {
		console.log("payemnt", data);
		const { dispatch } = this.props;
		document.getElementsByClassName(
			"main-main"
		)[0].style.top = `-${window.scrollY}px`;
		document.getElementsByClassName(
			"main-main"
		)[0].style.paddingRight = `8px`;
		document.getElementsByClassName("main-main")[0].style.position =
			"fixed";
		document.getElementsByClassName("main-main")[0].style.width = "100%";
		dispatch(
			actions.openPayment({
				type: data.type,
				lesson: data.lesson || {},
				test: data.test || {},
				duration: data.duration
			})
		);
	}

	setStep(step) {
		const { dispatch } = this.props;
		dispatch(actions.setStepPayment({ step: step }));
	}

	checkBank() {
		const {
			dispatch,
			payment: { transaction = {} }
		} = this.props;
		if (transaction._id) {
			if (transaction.method === "bank") {
				dispatch(
					actions.checkBankPayment({
						transaction_id: transaction._id
					})
				);
			} else {
				dispatch(
					actions.checkQpayPayment({
						payment_id: (transaction.qpay || {}).payment_id,
						transaction_id: transaction._id
					})
				);
			}
		} else {
			config
				.get("emitter")
				.emit("warning", "Төлбөрийн мэдээлэл олдсонгүй");
		}
	}

	setPayment() {
		const {
			dispatch,
			payment: { type, lesson = {}, test = {}, method, duration },
			requests: { promocode }
		} = this.props;
		if (method === "qpay" || method === "bank") {
			dispatch(
				actions.setPayment({
					type: type,
					method: method,
					duration: duration,
					lesson_id: lesson._id,
					test_id: test._id,
					promo_id: promocode ? promocode._id : null
				})
			);
		} else {
			config
				.get("emitter")
				.emit("warning", "Төлбөрийн нөхцөл сонгоно уу !");
		}
	}
	validatePromoCode(e) {
		console.log("validatepromocode method hit");
		e.preventDefault();
		let data = {
			code: this.state.code
		};
		this.props.dispatch(validatePromoCode(data));
	}

	setPaymentOld(trans, data) {
		const { dispatch } = this.props;
		document.getElementsByClassName(
			"main-main"
		)[0].style.top = `-${window.scrollY}px`;
		document.getElementsByClassName("main-main")[0].style.position =
			"fixed";
		document.getElementsByClassName(
			"main-main"
		)[0].style.paddingRight = `8px`;
		document.getElementsByClassName("main-main")[0].style.width = "100%";
		dispatch(
			actions.setPaymentOld({
				type: trans.type,
				method: trans.method,
				duration: trans.duration,
				lesson_id: trans.lesson,
				test_id: trans.test,
				lesson: data.lesson
			})
		);
	}

	setMethod(method) {
		const { dispatch } = this.props;
		dispatch(actions.setMethodPayment({ method: method }));
	}

	close() {
		const { dispatch } = this.props;
		const scrollY =
			document.getElementsByClassName("main-main")[0].style.top;
		document.getElementsByClassName("main-main")[0].style.position = "";
		document.getElementsByClassName("main-main")[0].style.top = "";
		document.getElementsByClassName("main-main")[0].style.width = "unset";
		document.getElementsByClassName(
			"main-main"
		)[0].style.paddingRight = `unset`;
		window.scrollTo(0, parseInt(scrollY || "0") * -1);
		dispatch(actions.closePayment());
		dispatch(clearPromoCode());
		this.setState({
			code: ""
		});
	}

	render() {
		const {
			main: { eishPrice },
			payment: {
				visible,
				type,
				lesson = {},
				test,
				duration,
				step,
				method,
				paymentLaoding,
				transaction,
			},
			requests: {
				promoIsValid,
				promocode,
				validatingPromoCode,
				appliedCode,
				appliedDiscount
			}
		} = this.props;
		let {
			main: { premiumPrice }
		} = this.props;
		premiumPrice = duration
			? premiumPrice[duration]
			: (premiumPrice || [])[3];
		const colorPicker = (color1, color2, stepsNum) => {
			const helperFunc = (c1, c2, stepLen) => {
				let c = c1 + stepLen * (c2 - c1);
				return Math.floor(c);
			};
			const stepLen = 1 / (1 + stepsNum);
			const red1 = parseInt(color1.slice(1, 3), 16);
			const red2 = parseInt(color2.slice(1, 3), 16);
			const green1 = parseInt(color1.slice(3, 5), 16);
			const green2 = parseInt(color2.slice(3, 5), 16);
			const blue1 = parseInt(color1.slice(5, 7), 16);
			const blue2 = parseInt(color2.slice(5, 7), 16);
			let final = [];
			for (let i = 1; i < stepsNum + 1; i++) {
				let stepLenActual = stepLen * i;
				final.push(
					[
						helperFunc(red1, red2, stepLenActual),
						helperFunc(green1, green2, stepLenActual),
						helperFunc(blue1, blue2, stepLenActual)
					].join(", ")
				);
			}
			return final;
		};
		const colors = colorPicker("#02A1FE", "#F400B0", 4);
		const useDiscount = (price, discount) => {
			// return (price - price * discount / 100)
			return (
				<>
					{config.formatMoney(price - (price * discount) / 100)}₮{" "}
					{/*<div className="coupon-after">{" "}- {config.formatMoney(price * discount / 100)}₮ {appliedCode ? appliedCode : null}</div>*/}
				</>
			);
		};
		return (
			<React.Fragment>
				{test && test.questionQuantity ? (
					TestPayment(this, this.props)
				) : (
					<div
						className="paymentModal"
						style={{
							right: visible ? "0" : isMobile ? "-100%" : "-480px"
						}}
					>
						<div className="inner-payment">
							<div className="payment-header">
								<h4>Худалдан авалт</h4>
								<div
									className="close"
									onClick={() => this.close()}
								>
									<ion-icon name="close" />
								</div>
							</div>
							<div className="payment-body">
								<Container>
									<div className="detail">
										<p>
											<span className="rigthT">
												Бүтээгдэхүүн:{" "}
											</span>
											<span className="leftT">
												{type === "premium"
													? "Premium багц"
													: type === "eish"
													? "ЭЕШ багц"
													: lesson.title}
											</span>
										</p>
										{appliedDiscount ||
										(type === "lesson" &&
											lesson.sale > 0) ? (
											<p>
												<span className="rigthT">
													Үнэ:{" "}
												</span>
												<span className="leftT trough">
													{type === "premium"
														? `${config.formatMoney(
																premiumPrice
														  )}₮`
														: type === "eish"
														? `149'000₮`
														: `${config.formatMoney(
																lesson.price
														  )}₮`}
												</span>
											</p>
										) : null}
										{appliedDiscount > 0 ? (
											<p>
												<span className="rightT coupon-discounted">
													Промо код:{" "}
												</span>
												<span className="leftT coupon-discounted">
													-
													{type === "premium"
														? `${config.formatMoney(
																(premiumPrice *
																	appliedDiscount) /
																	100
														  )}₮ (${appliedDiscount}%)`
														: type === "eish"
														? `${config.formatMoney(
																(eishPrice *
																	appliedDiscount) /
																	100
														  )}₮ (${appliedDiscount}%)`
														: lesson.sale > 0
														? `${config.formatMoney(
																(lesson.sale *
																	appliedDiscount) /
																	100
														  )}₮ (${appliedDiscount}%)`
														: `${config.formatMoney(
																(lesson.price *
																	appliedDiscount) /
																	100
														  )}₮ (-${appliedDiscount}%)`}
												</span>
											</p>
										) : null}
										<p>
											<span className="rigthT">
												{appliedDiscount ||
												(type === "lesson") &
													(lesson.sale > 0)
													? "Хямдарсан үнэ: "
													: "Үнэ: "}
											</span>
											<span className="leftT">
												{appliedDiscount > 0
													? type === "premium"
														? useDiscount(
																premiumPrice,
																appliedDiscount
														  )
														: type === "eish"
														? useDiscount(
																eishPrice,
																appliedDiscount
														  )
														: lesson.sale > 0
														? useDiscount(
																lesson.sale,
																appliedDiscount
														  )
														: useDiscount(
																lesson.price,
																appliedDiscount
														  )
													: type === "premium"
													? `${config.formatMoney(
															premiumPrice
													  )}₮`
													: type === "eish"
													? `${config.formatMoney(
															eishPrice
													  )}₮`
													: lesson.sale > 0
													? `${config.formatMoney(
															lesson.sale
													  )}₮`
													: `${config.formatMoney(
															lesson.price
													  )}₮`}
											</span>
										</p>
										<p>
											<span className="rigthT">
												Хугацаа:{" "}
											</span>
											<span className="leftT">
												{type === "premium"
													? duration
														? `${duration} сар`
														: "1 жил"
													: type === "eish"
													? "1 жил"
													: "1 жил"}
											</span>
										</p>
									</div>
									<div className="h4Container">
										<div className="step-indicator">
											<div
												className="leStep"
												style={{
													backgroundColor: `rgba(${colors[0]})`
												}}
											></div>
											<div className="leDot"></div>
											<div
												className={
													step === 1
														? "leStepCurrent leStep"
														: step > 1
														? "leStep"
														: "leStepGray"
												}
												style={{
													backgroundColor: `rgba(${colors[1]})`
												}}
											></div>
											<div className="leDot"></div>
											<div
												className={
													step === 2
														? "leStepCurrent leStep"
														: step > 2
														? "leStep"
														: "leStepGray"
												}
												style={{
													backgroundColor: `rgba(${colors[2]})`
												}}
											></div>
											<div className="leDot"></div>
											<div
												className={
													step === 3
														? "leStepCurrent leStep"
														: step > 3
														? "leStep"
														: "leStepGray"
												}
												style={{
													backgroundColor: `rgba(${colors[3]})`
												}}
											></div>
										</div>
										{step === 1 ? (
											<h4>Бүтээгдэхүүний тухай</h4>
										) : step === 2 ? (
											<h4>Төлбөрийн нөхцөл сонгоно уу</h4>
										) : (
											<h4>Төлбөрийн мэлээлэл</h4>
										)}
									</div>

									{step === 1 ? (
										type === "premium" ? (
											<div className="premium-payment">
												<div className="pre">
													<span>
														Хичээл зүтгэл дуусаагүй
														цагт хүний амжилт
														дундрахгүй. Odosury
														PREMIUM багцын
														хэрэглэгчид бүх түвшний
														курс хичээлүүдийг үзэх
														боломжтой
													</span>
												</div>
												<div className="dawuu-taluud">
													<p>
														<ion-icon name="heart" />
														<span>
															Үргэлж нэмэгдэх
															хичээлүүд
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															100% практикт
															суурилсан
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															Багштайгаа холбогдох
															боломж
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															Эх хэл дээрх тусламж
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															Супер хямд{" "}
															<span className="sl">
																{config.formatMoney(
																	premiumPrice
																)}
																₮
															</span>
														</span>
													</p>
												</div>
											</div>
										) : type === "eish" ? (
											<div className="eish-payment">
												<div className="pre">
													<span>
														Хичээл зүтгэл дуусаагүй
														цагт хүний амжилт
														дундрахгүй. Odosury ЭЕШ
														багцын хэрэглэгчид бүх
														ЭЕШ хичээлүүдийг үзэх
														боломжтой
													</span>
												</div>
												<div className="dawuu-taluud">
													<p>
														<ion-icon name="heart" />
														<span>
															Үргэлж нэмэгдэх
															хичээлүүд
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															100% практикт
															суурилсан
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															Эх хэл дээрх тусламж
														</span>
													</p>
													<p>
														<ion-icon name="heart" />
														<span>
															Супер хямд{" "}
															<span className="sl">
																<span className="sale">
																	149k
																</span>{" "}
																-{" "}
																{config.formatMoney(
																	eishPrice
																)}
																₮
															</span>
														</span>
													</p>
												</div>
											</div>
										) : (
											<div className="lesson-payment">
												<img
													src={
														(
															lesson.thumbnailSmall ||
															{}
														).path
															? `${
																	(
																		lesson.thumbnailSmall ||
																		{}
																	).url
															  }${
																	lesson
																		.thumbnailSmall
																		.path
															  }`
															: "/images/default-lesson.jpg"
													}
													onError={(e) =>
														(e.target.src = `/images/default-lesson.jpg`)
													}
												/>
												<p>{lesson.description}</p>
											</div>
										)
									) : step === 2 ? (
										<div>
											<div className="paymentMethod">
												<div
													className={`bank method ${
														method === "bank"
															? "active"
															: ""
													}`}
													onClick={() =>
														this.setMethod("bank")
													}
												>
													<span>₮</span>Дансны
													шилжүүлэг
												</div>
												<div
													className={`qpay method ${
														method === "qpay"
															? "active"
															: ""
													}`}
													onClick={() =>
														this.setMethod("qpay")
													}
												>
													<img
														src="/images/qpay1.png"
														alt="qpay_logo"
													/>
													QPAY үйлчилгээ ашиглан
													шилжүүлэх.
												</div>
											</div>
										</div>
									) : (
										<Loader status={paymentLaoding}>
											{(transaction || {})._id ? (
												transaction.method ===
												"qpay" ? (
													<div className="qrPayment">
														{(
															transaction.qpay ||
															{}
														).qPay_QRcode ? (
															<QRCode
																size={180}
																value={
																	(
																		transaction.qpay ||
																		{}
																	)
																		.qPay_QRcode
																}
															/>
														) : (
															"QR код авхад алдаа гарлаа."
														)}
														{transaction.status ===
														"success" ? (
															<p
																className="status"
																style={{
																	textAlign:
																		"center",
																	color: "green",
																	fontWeight: 700,
																	marginTop:
																		-10,
																	marginBottom:
																		-10
																}}
															>
																Төлбөр төлөгдсөн
															</p>
														) : (
															<p
																className="status"
																style={{
																	textAlign:
																		"center",
																	color: "red",
																	fontWeight: 700,
																	marginTop:
																		-10,
																	marginBottom:
																		-10
																}}
															>
																Төлбөр хүлээгдэж
																байна
															</p>
														)}
														<div className="paymentMethodDet bankdetail">
															<p>
																<span>
																	ШИЛЖҮҮЛЭХ
																	ДҮН:
																</span>
																<span>
																	{config.formatMoney(
																		transaction.amount
																	)}
																	₮
																</span>
															</p>
															<p>
																<span>
																	ГҮЙЛГЭЭНИЙ
																	УТГА:
																</span>
																<span>
																	{
																		transaction.description
																	}
																</span>
															</p>
															<p>
																Хаан банкны
																болон бусад
																банкны
																аппликейшнээр QR
																кодыг уншуулан
																төлбөрийг төлнө
																үү. Төлбөр{" "}
																<strong>
																	төлөгдсөний
																</strong>{" "}
																дараа таны
																худалдан авалт
																баталгаажиж,
																үзэх боломжтой
																болно.
															</p>
														</div>
													</div>
												) : (
													<div className="bankPayment">
														<div className="paymentMethodDet">
															<p
																style={{
																	color: "rgb(206, 94, 94)"
																}}
															>
																Суралцагч
																худалдан авсан
																контент хичээлээ
																буцаах эрхгүй
																учир сонголт
																хийхээсээ өмнө
																жишээ контентоо
																сайтар үзэж
																үйлчилгээний
																нөхцөлтэй уншиж
																танилцаарай.
															</p>
														</div>
														{transaction.status ===
														"success" ? (
															<p
																className="status"
																style={{
																	textAlign:
																		"center",
																	color: "green",
																	fontWeight: 700,
																	marginTop:
																		-10,
																	marginBottom:
																		-10
																}}
															>
																Төлбөр төлөгдсөн
															</p>
														) : (
															<p
																className="status"
																style={{
																	textAlign:
																		"center",
																	color: "red",
																	fontWeight: 700,
																	marginTop:
																		-10,
																	marginBottom:
																		-10
																}}
															>
																Төлбөр хүлээгдэж
																байна
															</p>
														)}
														<div className="paymentMethodDet bankdetail">
															<p>
																<span>
																	БАНК:
																</span>
																<span>
																	Хаан банк
																</span>
															</p>
															<p>
																<span>
																	ДАНСНЫ
																	ДУГААР:
																</span>
																<span>
																	5069405809
																</span>
															</p>
															<p>
																<span>
																	ДАНС
																	ЭЗЭМШИГЧ:
																</span>
																<span>
																	Том-Амжилт
																	ХХК
																</span>
															</p>
															<p>
																<span>
																	МӨНГӨН ДҮН:
																</span>
																<span>
																	{config.formatMoney(
																		transaction.amount
																	)}
																	₮
																</span>
															</p>
															<p>
																<span>
																	ГҮЙЛГЭЭНИЙ
																	УТГА:
																</span>
																<span>
																	{
																		transaction.description
																	}
																</span>
															</p>
															<p>
																<span>
																	ХОЛБОГДОХ
																	УТАС:
																</span>
																<span>
																	8844-5020
																</span>
															</p>
														</div>
													</div>
												)
											) : null}
										</Loader>
									)}
								</Container>
							</div>
						</div>
						<div className="footer-payment">
							{step === 1 ? (
								<div className="promo-container">
									<div>
										{promoIsValid ? (
											<div className="coupon-valid">
												Промо Код <b>{appliedCode}</b>{" "}
												амжилттай идэвxжлээ
											</div>
										) : (
											<p>
												Та Промо Код оруулж хөнгөлөлт
												эдлэх боломжтой
											</p>
										)}
									</div>
									<Form
										className="promo-form"
										onSubmit={this.validatePromoCode.bind(
											this
										)}
									>
										<Row>
											<Col>
												<Form.Control
													size="sm"
													type="text"
													placeholder="Таны хөнгөлөлт энд"
													onChange={(e) =>
														this.setState({
															code: e.target.value
														})
													}
													value={this.state.code}
												/>
											</Col>
											<Col>
												<Button
													size="sm"
													type="submit"
													className="promo-submit-button"
												>
													<span>
														Промо Код ашиглах
													</span>
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
							) : null}
							{step === 1 ? (
								<Button
									className="payment-button"
									onClick={() => this.setStep(2)}
								>
									Худалдан авах
								</Button>
							) : step === 2 ? (
								<div>
									<Button
										className="payment-button2"
										onClick={() => this.setStep(1)}
									>
										Буцах
									</Button>
									<Button
										className="payment-button"
										onClick={() => {
											this.setPayment();
										}}
									>
										Төлбөр төлөх
									</Button>
								</div>
							) : (
								<div>
									<Button
										className="payment-button2"
										onClick={() => this.setStep(2)}
									>
										Төлбөр нөхцөл солих
									</Button>
									<Button
										className="payment-button"
										onClick={() => this.checkBank()}
										disabled={paymentLaoding}
									>
										Төлбөр шалгах
									</Button>
								</div>
							)}
						</div>
					</div>
				)}

				<div
					className="paymentMask"
					style={{
						visibility: visible ? "visible" : "hidden",
						opacity: visible ? 1 : 0
					}}
					onClick={() => this.close()}
				/>
			</React.Fragment>
		);
	}
}

export default connect(reducer)(Payment);
