import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";
import * as actions from "../actions/lessonEish_actions";

const reducer = ({ main, home }) => ({ main, home });

class Faq extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		config.get("ga").pageview(window.location.pathname);
		window.scroll(0, 0);
	}

	render() {
		return (
			<React.Fragment>
				<Header location={this.props.location} />
				<Container>
					<div className="faq">
						<h1 className="faqh1">Түгээмэл асуултууд</h1>
						<div className="faqquestion">
							<h3 className="faqh3">• Хэрхэн бүртгүүлэх вэ?</h3>
							<div className="howto">
								<div className="howto1">
									<strong>Вэб сайтаар :</strong>
									<p className="faqp">
										Нэвтрэх/бүртгүүлэх товчин дээр дарж
										бүртгэлээ үүсгэнэ
									</p>
									<figure style={{ margin: "10px auto" }}>
										<figcaption
											style={{ textAlign: "center" }}
										>
											<cite>/доор зургаар үзүүлэв/</cite>
										</figcaption>
										<img
											src="/images/web_screenshot.png"
											alt="web demo"
											className="faqimg faqimg1"
										/>
									</figure>{" "}
								</div>
								<div className="howto2">
									<strong>Гар утсаар :</strong>
									<p>
										Нэвтрэх/бүртгүүлэх товчин дээр дарж
										бүртгэлээ үүсгэнэ
									</p>
									<figure style={{ margin: "10px auto" }}>
										<figcaption
											style={{ textAlign: "center" }}
										>
											<cite>/доор зургаар үзүүлэв/</cite>
										</figcaption>
										<img
											src="/images/app_screenshot.jpg"
											alt="app demo"
											className="faqimg faqimg2"
										/>
									</figure>
								</div>
							</div>
						</div>
						<div className="faqquestion">
							<h3 className="faqh3">
								• Хэрхэн төлбөрөө төлж баталгаажуулах вэ?{" "}
							</h3>
							<p className="faqp">
								Та өөрийн бүртгэлтэй хаягаараа нэвтрэн сонирхож
								буй сургалт эсвэл PREMIUM эрх дээр дараад
								төлбөрийн нөхцөлөө сонгон төлбөр төлөх товч дээр
								дарна. Хаан банк: Том-Амжилт ХХК Дансны дугаар: 
								<b>5069 405 809</b> Гүйлгээний утга: дээр өөрийн
								утасны дугаар болон нэрээ оруулж төлбөрийг
								шилжүүлнэ.
							</p>
						</div>
						<div className="faqquestion">
							<h3 className="faqh3">
								• Хэрхэн хичээлээ үзэх вэ?{" "}
							</h3>
							<p className="faqp">
								Таны төлбөр төлөгдөөд баталгаажмагц сургалт
								руугаа орон “Үзэх” цэсэн дээр дарж сургалтаа
								үзнэ
							</p>
						</div>
						<div className="faqquestion">
							<h3 className="faqh3">
								• Хичээлийн үргэлжлэх хугацаа хэд байх вэ?
							</h3>
							<p className="faqp">
								Нэг хичээлийн үргэлжлэх хугацаа дунджаар 15-40
								мин байна
							</p>
						</div>
						<div className="faqquestion">
							<h3 className="faqh3">
								• Нэг худалдаж авсан хичээл хэдий хугацаанд
								хүчинтэй байх вэ?
							</h3>
							<p className="faqp">
								Нэг худалдаж авсан хичээл авснаас хойш 1 жилийн
								турш хүчинтэй байна
							</p>
						</div>
					</div>
				</Container>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(Faq);
