import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";
import * as actions from "../actions/lessonEish_actions";

const reducer = ({ main, home }) => ({ main, home });

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		config.get('ga').pageview(window.location.pathname);
		window.scroll(0, 0);
	}

	render() {
		return (
			<React.Fragment>
				<Header location={this.props.location} />

				{/* BANNER */}

				<div className="abouttitle">
					<div className="abouttext2">
						<Container>
							<h3>
								БИД ӨӨРӨӨ ӨӨРТЭЙГӨӨ АЖИЛЛАЖ БУСДААС ДУТУУ БИШ ИЛҮҮ
								МЭДЛЭГТЭЙ НЬ БАЙХ ЁСТОЙ
							</h3>
						</Container>
					</div>
				</div>
				<Container>
					<div className="abao">
						<img src="/images/shijir.jpg" alt=""/>
						<div className="abouttitle2">
							<div className="bottomtext">
								<h2 className="bottomh2">Бидний эрхэм зорилго :</h2>
								<div className="aboutbox">
									<p>- Эрдэм мэдлэг эзэмших</p>
									<p>- Эрх чөлөөг бий болгоно</p>
								</div>
							</div>
							<div className="bottomtext2">
								<h2 className="bottomh2">Алсын хараа :</h2>
								<div className="aboutbox">
									<p>- Дэлхийн номер 1 сургалтын платформ болох</p>
								</div>
							</div>
							<div className="bottomtext2">
								<h2 className="bottomh2">Уриа үг :</h2>
								<div className="aboutbox">
									<p>- Тасралтгүй хөгж</p>
								</div>
							</div>
						</div>
					</div>
				</Container>

				{/* TIMELINE */}
				<h4 className="abouth1">Бидний тухай</h4>
				<div className="about">
					<div className="timeline">
						<ul>
							<li>
								<div className="timeline-content">
									<p className="tcd">2020</p>
									<h2 className="tch2">Түүх</h2>
									<p className="tcp">
										ODOSURY Цахим сургалтын платформ нь “Том амжилт” группын харъяа охин компани болох “Амжилт Дотком” -ын хөгжүүлж байгаа программ бөгөөд 2020 оны 8 сараас Amjilt.com нэртэйгээр үйл ажиллагаа эхлэж байсан түүхтэй.
									</p>
								</div>
							</li>
							<li>
								<div className="timeline-content">
									<p className="tcd">2021</p>
									<h2 className="tch2">Одоо</h2>
									<p className="tcp">
										2021 оноос ODOSURY буюу Одоо Суръя нэртэйгээр маркетинг болон менежмент, вэб хөгжүүлэлтийн багтайгаар вэбсайт болон гар утасны аппликейшнээр дамжуулан хэрэглэгчиддэээ хүрч , үйл ажиллагаагаа өдөр өдрөөр өргөжүүлсээр байна.
										<br/>Бид бүх насны хүмүүсд зориулсан хамгийн том цахим платформ болох зорилго тавин хэрэглэгчиддээ хамгийн чанартай, систэмтэй контентоор байнга хангахын тулд тасралтгүй ажилласаар байна
										<br/>ODOSURY нь онлайнаар сурч хөгжих сонирхолтой бүх насны хүмүүсд зориулсан олон төрлийн мэргэжлийн болон хувь хүний ур чадварыг хөгжүүлэх сургалтуудыг мэргэжлийн багш нар зөвхөн ODOSURY-н хэрэглэгчдэд зориулан бэлтгэдгээрээ онцлог.
										<br/>Мөн манай платформ анх удаа  дэлхийн шилдэг бэстселлэр номнуудын хураангуйг сонсоход амар байдлаар бэлтгэж хэрэглэгчиддээ хүргэж байна.
										<br/>ODOSURY сайтаас PREMIUM буюу 1 төлөлтөөр бүх хичээлийг үзэх боломжтойгоос гадна мөн өөрийн сонирхож байгаа хичээлийг тусд нь худалдан авах боломжтой.
										<br/>Ирээдүй: ODOSURY цаашид хэрэглэгчиддээ зориулан олон төрлийн контент бэлтгэж хүргэхийг зорьж байгаа бөгөөд заримаас нь дурдвал : мэдлэг шалгах төрөл бүрийн тест болон шалгалтууд, бүрэн хэмжээний сонсдог ном, багш болон суралцагчидтай шууд харьцах боломжтой виртуал кэмп зэрэг багтсан болно.
									</p>
								</div>
							</li>

							<li>
								<div className="timeline-content">
									<p className="tcd">2022</p>
									<h2 className="tch2">Ирээдүй</h2>
									<p className="tcp">
										ODOSURY цаашид хэрэглэгчиддээ зориулан олон төрлийн контент бэлтгэж хүргэхийг зорьж байгаа бөгөөд заримаас нь дурдвал : мэдлэг шалгах төрөл бүрийн тест болон шалгалтууд, бүрэн хэмжээний сонсдог ном, багш болон суралцагчидтай шууд харьцах боломжтой виртуал кэмп зэрэг багтсан болно.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				{/* TIMELINE END */}
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(About);
