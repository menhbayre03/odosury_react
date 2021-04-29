import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";

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

				{/* BANNER */}

				<div className="abouttitle">
					<div className="abouttext2">
						<h3>
							БИД ӨӨРӨӨ ӨӨРТЭЙГӨӨ АЖИЛЛАЖ БУСДААС ДУТУУ БИШ ИЛҮҮ
							МЭДЛЭГТЭЙ НЬ БАЙХ ЁСТОЙ
						</h3>
					</div>
				</div>

				{/* TIMELINE */}

				<div
					className="container"
					style={{ minHeight: "calc(100vh - 185px)" }}
				>
					<h1 className="abouth1">Бидний тухай</h1>

					<div className="sect sect1">
						<div className="aboutyear aboutyear1">
							<img
								className="makesmall"
								src="https://www.flaticon.com/svg/vstatic/svg/624/624758.svg?token=exp=1619697139~hmac=f44addaad769f7d3dd4b68265b19b642"
								alt="chart"
							/>
							<h4 className="abouth4 h41">2020</h4>
						</div>
						<div className="abouttext text1">
							<h2 className="abouth2">Түүх</h2>
							<p className="aboutp">
								ODOSURY Цахим сургалтын платформ нь “Том амжилт”
								группын харъяа охин компани болох “Амжилт
								Дотком” -ын хөгжүүлж байгаа программ бөгөөд 2020
								оны 8 сараас Amjilt.com нэртэйгээр үйл ажиллагаа
								эхлэж байсан түүхтэй.
							</p>
						</div>
					</div>

					<div className="sect sect2">
						<div className="abouttext text2">
							<h2 className="abouth2">Одоо</h2>
							<p className="aboutp">
								2021 оноос ODOSURY буюу Одоо Суръя нэртэйгээр
								маркетинг болон менежмент, вэб хөгжүүлэлтийн
								багтайгаар вэбсайт болон гар утасны
								аппликейшнээр дамжуулан хэрэглэгчиддэээ хүрч ,
								үйл ажиллагаагаа өдөр өдрөөр өргөжүүлсээр байна.
								<br />
								<br />
								Бид бүх насны хүмүүсд зориулсан хамгийн том
								цахим платформ болох зорилго тавин
								хэрэглэгчиддээ хамгийн чанартай, систэмтэй
								контентоор байнга хангахын тулд тасралтгүй
								ажилласаар байна.
								<br />
								<br /> ODOSURY нь онлайнаар сурч хөгжих
								сонирхолтой бүх насны хүмүүсд зориулсан олон
								төрлийн мэргэжлийн болон хувь хүний ур чадварыг
								хөгжүүлэх сургалтуудыг мэргэжлийн багш нар
								зөвхөн ODOSURY-н хэрэглэгчдэд зориулан
								бэлтгэдгээрээ онцлог.
								<br />
								<br /> Мөн манай платформ анх удаа дэлхийн
								шилдэг бэстселлэр номнуудын хураангуйг сонсоход
								амар байдлаар бэлтгэж хэрэглэгчиддээ хүргэж
								байна.
								<br />
								<br /> ODOSURY сайтаас PREMIUM буюу 1 төлөлтөөр
								бүх хичээлийг үзэх боломжтойгоос гадна мөн
								өөрийн сонирхож байгаа хичээлийг тусд нь
								худалдан авах боломжтой.
							</p>
						</div>
						<div className="aboutyear aboutyear2">
							<img
								className="makesmall"
								src="https://www.flaticon.com/svg/vstatic/svg/1827/1827933.svg?token=exp=1619697111~hmac=ed3d3110550eb548b348c5ba6522811a"
								alt="notebook"
							/>
							<h4 className="abouth4">2021</h4>
						</div>
					</div>

					<div className="sect sect3">
						<div className="aboutyear aboutyear3">
							<img
								className="makesmall"
								src="https://www.flaticon.com/svg/vstatic/svg/768/768818.svg?token=exp=1619697027~hmac=0cae48050b37421ce88a5b2905d19b6b"
								alt="edit"
							/>
							<h4 className="abouth4">2021---</h4>
						</div>
						<div className="abouttext text3">
							<h2 className="abouth2 abouth2mid">Ирээдүй</h2>
							<p className="aboutp">
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

					{/* VIDEO */}
					<div className="sect sect4">
						<h2 className="abouth2">Demo demo demo demo</h2>
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/mdhyoB6LF5A"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>

				<div className="abouttitle2">
					<div className="bottomtext">
						<h2 className="bottomh2">Бидний эрхэм зорилго :</h2>
						<div className="aboutbox box1">
							<img
								className="makesmall2"
								src="https://www.flaticon.com/svg/vstatic/svg/1940/1940611.svg?token=exp=1619697341~hmac=f4982f04ea0d6b4e30d704d6f5df6797"
								alt="gradcap"
							/>
							<p>Эрдэм мэдлэг эзэмших</p>
						</div>
						<div className="aboutbox box2">
							<img
								className="makesmall2"
								src="https://www.flaticon.com/svg/vstatic/svg/2916/2916780.svg?token=exp=1619697384~hmac=c9f5ae0538d04826fff412547e8b9756"
								alt="free"
							/>
							<p>Эрх чөлөөг бий болгоно</p>
						</div>
					</div>
					<div className="bottomtext2">
						<h2 className="bottomh2">Алсын хараа :</h2>
						<div className="aboutbox box3">
							<img
								className="makesmall2"
								src="https://www.flaticon.com/svg/vstatic/svg/91/91202.svg?token=exp=1619698955~hmac=73ef8758e724f5cd1085043fccc1d6f1"
								alt="crown"
							/>
							<p>Дэлхийн номер 1 сургалтын платформ болох</p>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(About);
