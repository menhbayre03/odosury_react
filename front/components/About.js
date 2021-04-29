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
				<h1 className="abouth1">Бидний тухай</h1>
				<div className="about">
					<div className="timeline">
						<ul>
							<li>
								<div className="timeline-content">
									<p className="tcd">2020</p>
									<h2 className="tch2">Түүх</h2>
									<p className="tcp">
										ODOSURY Цахим сургалтын платформ нь “Том
										амжилт” группын харъяа охин компани
										болох “Амжилт Дотком” -ын хөгжүүлж
										байгаа программ бөгөөд 2020 оны 8 сараас
										Amjilt.com нэртэйгээр үйл ажиллагаа
										эхлэж байсан түүхтэй.
									</p>
								</div>
							</li>
							<li>
								<div className="timeline-content">
									<p className="tcd">2021</p>
									<h2 className="tch2">Одоо</h2>
									<p className="tcp">
										Бид бүх насны хүмүүсд зориулсан хамгийн
										том цахим платформ болох зорилго тавин
										хэрэглэгчиддээ хамгийн чанартай,
										систэмтэй контентоор байнга хангахын
										тулд тасралтгүй ажилласаар байна <br />
										2021 оноос ODOSURY буюу Одоо Суръя
										нэртэйгээр маркетинг болон менежмент,
										вэб хөгжүүлэлтийн багтайгаар вэбсайт
										болон гар утасны аппликейшнээр дамжуулан
										хэрэглэгчиддэээ хүрч , үйл ажиллагаагаа
										өдөр өдрөөр өргөжүүлсээр байна. <br />{" "}
										ODOSURY нь онлайнаар сурч хөгжих
										сонирхолтой бүх насны хүмүүсд зориулсан
										олон төрлийн мэргэжлийн болон хувь хүний
										ур чадварыг хөгжүүлэх сургалтуудыг
										мэргэжлийн багш нар зөвхөн ODOSURY-н
										хэрэглэгчдэд зориулан бэлтгэдгээрээ
										онцлог. <br /> ODOSURY нь онлайнаар сурч
										хөгжих сонирхолтой бүх насны хүмүүсд
										зориулсан олон төрлийн мэргэжлийн болон
										хувь хүний ур чадварыг хөгжүүлэх
										сургалтуудыг мэргэжлийн багш нар зөвхөн
										ODOSURY-н хэрэглэгчдэд зориулан
										бэлтгэдгээрээ онцлог. <br />
										ODOSURY нь онлайнаар сурч хөгжих
										сонирхолтой бүх насны хүмүүсд зориулсан
										олон төрлийн мэргэжлийн болон хувь хүний
										ур чадварыг хөгжүүлэх сургалтуудыг
										мэргэжлийн багш нар зөвхөн ODOSURY-н
										хэрэглэгчдэд зориулан бэлтгэдгээрээ
										онцлог.
									</p>
								</div>
							</li>

							<li>
								<div className="timeline-content">
									<p className="tcd">2026</p>
									<h2 className="tch2">Ирээдүй</h2>
									<p className="tcp">
										ODOSURY Цахим сургалтын платформ нь “Том
										амжилт” группын харъяа охин компани
										болох “Амжилт Дотком” -ын хөгжүүлж
										байгаа программ бөгөөд 2020 оны 8 сараас
										Amjilt.com нэртэйгээр үйл ажиллагаа
										эхлэж байсан түүхтэй.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				{/* TIMELINE END */}
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
