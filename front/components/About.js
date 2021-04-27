import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";
import "../../static/css/batja.less";
const reducer = ({ main, home }) => ({ main, home });

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<Header location={this.props.location} />
				<article>
					<h1>Бидний тухай</h1>
					<div className="sect1">
						<div className="textcontent">
							<h2>Түүх</h2>
							<div className="borderline"></div>
							<p>
								ODOSURY Цахим сургалтын платформ нь “Том амжилт”
								группын харъяа охин компани болох “Амжилт
								Дотком” -ын хөгжүүлж байгаа программ бөгөөд 2020
								оны 8 сараас Amjilt.com нэртэйгээр үйл ажиллагаа
								эхлэж байсан түүхтэй.
							</p>
						</div>
					</div>
					<div className="sect2">
						<div className="textcontent">
							<h2>Одоо</h2>
							<div className="borderline"></div>
							<p>
								2021 оноос ODOSURY буюу Одоо Суръя нэртэйгээр
								маркетинг болон менежмент, вэб хөгжүүлэлтийн
								багтайгаар вэбсайт болон гар утасны
								аппликейшнээр дамжуулан хэрэглэгчиддээ хүрч ,
								үйл ажиллагаагаа өдөр өдрөөр өргөжүүлсээр байна.
								Бид бүх насны хүмүүсд зориулсан хамгийн том
								цахим платформ болох зорилго тавин
								хэрэглэгчиддээ хамгийн чанартай, систэмтэй
								контентоор байнга хангахын тулд тасралтгүй
								ажилласаар байна ODOSURY нь онлайнаар сурч
								хөгжих сонирхолтой бүх насны хүмүүсд зориулсан
								олон төрлийн мэргэжлийн болон хувь хүний ур
								чадварыг хөгжүүлэх сургалтуудыг мэргэжлийн багш
								нар зөвхөн ODOSURY-н хэрэглэгчдэд зориулан
								бэлтгэдгээрээ онцлог. Мөн манай платформ анх
								удаа дэлхийн шилдэг бэстселлэр номнуудын
								хураангуйг сонсоход амар байдлаар бэлтгэж
								хэрэглэгчиддээ хүргэж байна. ODOSURY сайтаас
								PREMIUM буюу 1 төлөлтөөр бүх хичээлийг үзэх
								боломжтойгоос гадна мөн өөрийн сонирхож байгаа
								хичээлийг тусд нь худалдан авах боломжтой.
							</p>
						</div>
					</div>
					<div className="sect3">
						<div className="textcontent">
							<h2>Ирээдүй</h2>
							<div className="borderline"></div>
							<p>
								ODOSURY цаашид хэрэглэгчиддээ зориулан олон
								төрлийн контент бэлтгэж хүргэхийг зорьж байгаа
								бөгөөд заримаас нь дурдвал : мэдлэг шалгах төрөл
								бүрийн тест болон шалгалтууд, бүрэн хэмжээний
								сонсдог ном, багш болон суралцагчидтай шууд
								харьцах боломжтой виртуал кэмп зэрэг багтсан
								болно.
							</p>
						</div>
					</div>
					<div className="big">
						<div className="textcontent">
							<h2>Бидний эрхэм зорилго :</h2>
							<p>Эрдэм мэдлэг эзэмших Эрх чөлөөг бий болгоно</p>
							<h2>Алсын хараа :</h2>
							<p>Дэлхийн номер 1 сургалтын платформ болох</p>
						</div>
					</div>
				</article>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(About);
