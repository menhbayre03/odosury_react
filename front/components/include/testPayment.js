import React from "react";
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
import config from "../../config";
import Loader from "../include/Loader";
import QRCode from "react-qr-code";

export default function TestPayment(self, props) {
	console.log('testpayment componenthit',);
	const {
		main: { eishPrice },
		payment: {
			visible,
			type,
			lesson = {},
			test = {},
			duration,
			step,
			method,
			paymentLaoding,
			transaction
		},
		requests: {
			promoIsValid,
			promocode,
			validatingPromoCode,
			appliedCode,
			appliedDiscount
		}
	} = props;
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
		<div
			className="paymentModal"
			style={{ right: visible ? "0" : isMobile ? "-100%" : "-480px" }}
		>
			<div className="inner-payment">
				<div className="payment-header">
					<h4>Худалдан авалт</h4>
					<div className="close" onClick={() => self.close()}>
						<ion-icon name="close" />
					</div>
				</div>
				<div className="payment-body">
					<Container>
						<div className="detail">
							<p>
								<span className="rigthT">Бүтээгдэхүүн: </span>
								<span className="leftT">Тест</span>
							</p>
							{appliedDiscount ||
								(type === "test" && test.sale > 0) ? (
								<p>
									<span className="rigthT">Үнэ: </span>
									<span className="leftT trough">
										{config.formatMoney(test.price)}₮
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
										{test.sale > 0
											? `${config.formatMoney(
												(test.sale *
													appliedDiscount) /
												100
											)}₮ (${appliedDiscount}%)`
											: `${config.formatMoney(
												(test.price *
													appliedDiscount) /
												100
											)}₮ (-${appliedDiscount}%)`}
									</span>
								</p>
							) : null}
							<p>
								<span className="rigthT">
									{appliedDiscount ||
										(type === "test") & (test.sale > 0)
										? "Хямдарсан үнэ: "
										: "Үнэ: "}
								</span>
								<span className="leftT">
									{appliedDiscount > 0
										? test.sale > 0
											? useDiscount(
												test.sale,
												appliedDiscount
											)
											: useDiscount(
												test.price,
												appliedDiscount
											)
										: test.sale > 0
											? `${config.formatMoney(test.sale)}₮`
											: `${config.formatMoney(test.price)}₮`}
								</span>
							</p>
							<p>
								<span className="rigthT">Оролдлогын тоо: </span>
								<span className="leftT">
									{test.oneTime
										? 1
										: "Хэдэн ч удаа өгсөн болно оо"}
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
							<div className="lesson-payment">
								<img
									src={
										(test.thumbnailSmall || {}).path
											? `${(test.thumbnailSmall || {})
												.url
											}${test.thumbnailSmall.path}`
											: "/images/defaultTestCard1.png"
									}
									onError={(e) =>
										(e.target.src = `/images/defaultTestCard1.png`)
									}
								/>
								<p>
									Нэр:{" "}
									<span className="inner-span">
										{test.title}
									</span>
								</p>
								<p>
									Тестийн үргэлжлэх хугацаа:{" "}
									<span className="inner-span">
										{test.duration} минут
									</span>
								</p>
								<p>
									Асуултын тоо:{" "}
									<span className="inner-span">
										{test.questionQuantity}
									</span>
								</p>
								<p>
									Сертификат олгогдох эсэх:{" "}
									<span className="inner-span">
										{test.hasCertificate
											? "Тийм"
											: "Үгүй"}
									</span>
								</p>
								{test.oneTime ? (
									<p className="test-warning">
										Энэ нь тус тестийг зөвхөн <b>НЭГ</b> удаа өгөх
										эрх бөгөөд дахин оролдох нөхцөлд энэ эрхийг
										дахин худалдан авах шаардлагатай.
									</p>
								) : null}
							</div>
						) : step === 2 ? (
							<div>
								<div className="paymentMethod">
									<div
										className={`bank method ${method === "bank" ? "active" : ""
											}`}
										onClick={() => self.setMethod("bank")}
									>
										<span>₮</span>Дансны шилжүүлэг
									</div>
									<div
										className={`qpay method ${method === "qpay" ? "active" : ""
											}`}
										onClick={() => self.setMethod("qpay")}
									>
										<img
											src="/images/qpay1.png"
											alt="qpay_logo"
										/>
										QPAY үйлчилгээ ашиглан шилжүүлэх.
									</div>
								</div>
							</div>
						) : (
							<Loader status={paymentLaoding}>
								{(transaction || {})._id ? (
									transaction.method === "qpay" ? (
										<div className="qrPayment">
											{(transaction.qpay || {})
												.qPay_QRcode ? (
												<QRCode
													size={180}
													value={
														(transaction.qpay || {})
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
														textAlign: "center",
														color: "green",
														fontWeight: 700,
														marginTop: -10,
														marginBottom: -10
													}}
												>
													Төлбөр төлөгдсөн
												</p>
											) : (
												<p
													className="status"
													style={{
														textAlign: "center",
														color: "red",
														fontWeight: 700,
														marginTop: -10,
														marginBottom: -10
													}}
												>
													Төлбөр хүлээгдэж байна
												</p>
											)}
											<div className="paymentMethodDet bankdetail">
												<p>
													<span>ШИЛЖҮҮЛЭХ ДҮН:</span>
													<span>
														{config.formatMoney(
															transaction.amount
														)}
														₮
													</span>
												</p>
												<p>
													<span>
														ГҮЙЛГЭЭНИЙ УТГА:
													</span>
													<span>
														{
															transaction.description
														}
													</span>
												</p>
												<p>
													Хаан банкны болон бусад
													банкны аппликейшнээр QR
													кодыг уншуулан төлбөрийг
													төлнө үү. Төлбөр{" "}
													<strong>төлөгдсөний</strong>{" "}
													дараа таны худалдан авалт
													баталгаажиж, үзэх боломжтой
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
													Суралцагч худалдан авсан
													контент хичээлээ буцаах
													эрхгүй учир сонголт
													хийхээсээ өмнө жишээ
													контентоо сайтар үзэж
													үйлчилгээний нөхцөлтэй уншиж
													танилцаарай.
												</p>
											</div>
											{transaction.status ===
												"success" ? (
												<p
													className="status"
													style={{
														textAlign: "center",
														color: "green",
														fontWeight: 700,
														marginTop: -10,
														marginBottom: -10
													}}
												>
													Төлбөр төлөгдсөн
												</p>
											) : (
												<p
													className="status"
													style={{
														textAlign: "center",
														color: "red",
														fontWeight: 700,
														marginTop: -10,
														marginBottom: -10
													}}
												>
													Төлбөр хүлээгдэж байна
												</p>
											)}
											<div className="paymentMethodDet bankdetail">
												<p>
													<span>БАНК:</span>
													<span>Хаан банк</span>
												</p>
												<p>
													<span>ДАНСНЫ ДУГААР:</span>
													{/* <span>5069405796</span> */}
													<span>5069405809</span>

												</p>
												<p>
													<span>ДАНС ЭЗЭМШИГЧ:</span>
													<span>Том-Амжилт ХХК</span>
												</p>
												<p>
													<span>МӨНГӨН ДҮН:</span>
													<span>
														{config.formatMoney(
															transaction.amount
														)}
														₮
													</span>
												</p>
												<p>
													<span>
														ГҮЙЛГЭЭНИЙ УТГА:
													</span>
													<span>
														{
															transaction.description
														}
													</span>
												</p>
												<p>
													<span>ХОЛБОГДОХ УТАС:</span>
													<span>8080-1779</span>
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
				{step === 1 && type !== "eish" ? (
					<div className="promo-container">
						<div>
							{promoIsValid ? (
								<div className="coupon-valid">
									Промо Код <b>{appliedCode}</b> амжилттай
									идэвxжлээ
								</div>
							) : (
								<p>
									Та Промо Код оруулж хөнгөлөлт эдлэх
									боломжтой
								</p>
							)}
						</div>
						<Form
							className="promo-form"
							onSubmit={self.validatePromoCode.bind(self)}
						>
							<Row>
								<Col>
									<Form.Control
										size="sm"
										type="text"
										placeholder="Таны хөнгөлөлт энд"
										onChange={(e) =>
											self.setState({
												code: e.target.value
											})
										}
										value={self.state.code}
									/>
								</Col>
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
				) : null}
				{step === 1 ? (
					<Button
						className="payment-button"
						onClick={() => self.setStep(2)}
					>
						Худалдан авах
					</Button>
				) : step === 2 ? (
					<div>
						<Button
							className="payment-button2"
							onClick={() => self.setStep(1)}
						>
							Буцах
						</Button>
						<Button
							className="payment-button"
							onClick={() => {
								self.setPayment();
							}}
						>
							Төлбөр төлөх
						</Button>
					</div>
				) : (
					<div>
						<Button
							className="payment-button2"
							onClick={() => self.setStep(2)}
						>
							Төлбөр нөхцөл солих
						</Button>
						<Button
							className="payment-button"
							onClick={() => self.checkBank()}
							disabled={paymentLaoding}
						>
							Төлбөр шалгах
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
