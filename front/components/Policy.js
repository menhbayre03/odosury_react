import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./include/Header";
import Footer from "./include/Footer";
import config from "../config";

const reducer = ({ main, home }) => ({ main, home });

class Policy extends Component {
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
				<div className="container" style={{padding: '80px 0'}}>
					<div className="row">
						<h2 className="h2" style={{textAlign: 'center', width: '100%'}}>Нууцлалын баталгаа</h2>
						<div className="divider"></div>
						<div className="ll-support-bottom terms-bottom">
							<b>Дата сан</b>
							<p>Amjilt.com нь танд дараах нөхцөлийн дагуу үйлчлэх бөгөөд Amjilt.com -ээр үйлчлүүлэгчид
								энэхүү үйлчилгээний нөхцөлийг баримтлан үйлчлүүлнэ. Бүртгэлийн зарчим Хэрэглэгч нь
								Amjilt.com- ийн үйлчилгээг хэрэглэхээр бүртгүүлэхдээ Amjilt.com бүртгэлийн хуудас болон
								Мэргэжлийн Профайл хэсэгт өөрийн тухай үнэн зөв мэдээллийг оруулж тэдгээрийн өөрчлөлтийг
								цаг тухай бүрд нь хийж байх үүрэгтэй. Хэн нэгэн хэрэглэгчийн оруулсан шаардлагатай
								мэдээлэл ямар нэгэн байдлаар худлаа байх эсвэл бид таны мэдээллийг худлаа гэдгийг
								шалтгаантайгаар сэжиглэвэл Amjilt.com нь тухайн хэрэглэгчийн бүртгэлийг хасах түүнд
								цаашид үйлчилгээ үзүүлэхээс татгалзах эрхтэй.</p>
							<b>Мэдээлэл ашиглах журам</b>
							<p>Сургуулийн захиргаа сурагч болон багш нарын мэдээллийг ашиглах эрхтэй ч тухайн мэдээлэл
								нь хувь хүний халдашгүй эрх эрх чөлөөнд хамаарах тул хувь хүний нууцад хамаарах
								мэдээллийг устгах эрхийг хувь хүн эдэлнэ. Сургуулийн хөтөлбөрт багтсан төрөл бүрийн
								хичээлийн материал нь тухайн сургуулийн өмч бөгөөд сургуулийн холбогдох албан тушаалтан
								зөвшөөрсөнөөр сурагчид ашиглах боломжтой. </p>
							<b>Мэдээлэлтэй танилцах</b>
							<p>Эцэг эхчүүд болон хууль ёсны асран хамгаалагчид нь сурагчийн сургуулийн орчны үйл
								ажиллагаа, ирц дүн төлбөрийн явцын мэдээлэлтэй танилцах эрхтэй. </p>
							<b>Аюулгүй байдлын баталгаа</b>
							<p>Дата санд хадгалагдаж буй мэдээллийн аюулгүй байдлыг Байгууллагын тухай хуулийн 5.2-т
								заасны дагуу чандлан хадгална.</p>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(reducer)(Policy);
