import React, { Component } from "react";
import { connect } from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';
import config from "../config";
import {
    isMobile
} from "react-device-detect";
import Header from "./include/Header";
import Footer from "./include/Footer";

const reducer = ({ main, payment}) => ({ main, payment});

class Eish extends Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: props.main.differenceEish };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let days = Math.floor(secs / (60 * 60 * 24));

        let divisor_for_hours = secs % (60 * 60 * 24);
        let hours = Math.floor(divisor_for_hours / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "d": days,
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }
    componentDidMount() {
        window.scroll(0, 0);
        config.get('ga').pageview(window.location.pathname);
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar }, () => this.startTimer());
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        const { main: {eishPrice, premium, eish}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="premium-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <div className="head-cont-premium">
                        <Container>
                            <div className="eish-head" style={{
                                backgroundImage: 'url("/images/eish-bg.jpg")',
                                margin: '0 auto 30px auto',
                                width: 860,
                                maxWidth: '100%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                height: isMobile ? 220 : 360
                            }}>
                                <img src="/images/eish.png" alt="" style={{margin: 'unset', width: 620, maxWidth: '70%', height: 'auto'}}/>
                                <h4>ЭЕШ БАГЦ</h4>
                            </div>
                        </Container>
                        <div className="dataa" style={{bottom: -96}}>
                            <div className="datte">
                                <h5>Дуусах хугацаа</h5>
                                <div className="clock">
                                    <div className="clock-container">
                                        <div className="clock-col">
                                            <p className="clock-day clock-timer">
                                                {this.state.time.d}
                                            </p>
                                            <p className="clock-label">
                                                Өдөр
                                            </p>
                                        </div>
                                        <div className="clock-col">
                                            <p className="clock-hours clock-timer">
                                                {this.state.time.h}
                                            </p>
                                            <p className="clock-label">
                                                Цаг
                                            </p>
                                        </div>
                                        <div className="clock-col">
                                            <p className="clock-minutes clock-timer">
                                                {this.state.time.m}
                                            </p>
                                            <p className="clock-label">
                                                Минут
                                            </p>
                                        </div>
                                        <div className="clock-col">
                                            <p className="clock-seconds clock-timer">
                                                {this.state.time.s}
                                            </p>
                                            <p className="clock-label">
                                                Сэкүнд
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="main-prem">
                            <Container>
                                <div className="lifetime">
                                    <Row className="justify-content-md-center">
                                        <Col md={6} className="sec-1">
                                            <p className="desc">ОНЦГОЙ ХЯМДРАЛ</p>
                                            <p className="price"><span>149.000₮</span> {config.formatMoney(eishPrice)}₮</p>
                                        </Col>
                                    </Row>
                                    <button onClick={() => premium ? console.log('gz') : user ? config.get('emitter').emit('paymentModal', {type: 'eish'}) : config.get('emitter').emit('openLogin', {type: 'eish'})}>
                                        {
                                            premium ?
                                                'Premium хэрэглэгч'
                                                : eish ?
                                                'ЭЕШ хэрэглэгч'
                                                :   'ЭЕШ багц авах'
                                        }
                                        <ion-icon name="arrow-redo-circle"/>
                                    </button>
                                </div>
                            </Container>
                        </div>
                        <div className="prem-txts">
                            <div className="bggg" style={{backgroundImage: 'url("/images/bggg.jpg")'}}/>
                            <div className="bgg2 eishi">
                                <Container>
                                    <p>
                                        Монгол улсын хэмжээнд их, дээд сургуульд элсэгч хүн болгон сурах ерөнхий чадвар, болон мэдлэгийн түвшинг тогтоох шалгалтыг ЭЕШ болгон 2005 оноос зохион байгуулж ирсэн. Нэг жилд 20000 гаруй сурагч энэхүү шалгалтыг өгч гадаад болон дотоодын их дээд сургуулиудад амжилттай элсэн суралцсаар байна.
                                    </p>
                                    <p>
                                        ЭЕШ-ын хүрээнд монгол хэл, англи хэл, орос хэл, математик, физик, хими, биологи, газарзүй, монгол улсын түүх, нийгмийн тухай мэдлэг зэрэг 10 хичээлээр шалгалт өгдөг.
                                    </p>
                                    <p>
                                        Бид ЭЕШ багцад нийт 10 хичээлийн шалгалтанд ирдэг агуулгын дагуу хичээлүүдийг мэргэжлийн багш нараар бэлдүүлж нэг доороос эдгээр бүх хичээлийг авах боломжийг хэрэглэгчиддээ олгож байна.
                                    </p>
                                    <p>
                                        Нэг удаагийн нэг сарын сургалтын төлбөрөөр бүх 10 хичээлийн видео контентыг 1 жилийн хугацаанд хязгааргүй үзэх боломжтой бөгөөд жил болгоны ЭЕШ-ын агуулгаар баяжуулж тест хэлбэрээр оруулан мэдлэг сорих хэсгээр баяжуулан дүү нартаа хүргэж байн
                                    </p>
                                </Container>
                            </div>
                        </div>
                        <Container>
                            <div className="prem-cont">
                                <div className="bolomjq">
                                    <h4>ODOSURY – ийн ЭЕШ багцыг худалдаж авснаар</h4>
                                    <ul>
                                        <li><span className="fir">1</span><span>ЭЕШ-ын 6 хичээлийн видео контентуудыг нэг доороос үзэх</span></li>
                                        <li><span className="fir">2</span><span>ЕБС-ийн хамгийн чадварлаг багш нараар бэлдүүлсэн видео хичээлүүд</span></li>
                                        <li><span className="fir">3</span><span>1 сургалтанд сурах төлбөрөөр бүх хичээлийг үзэх эрх</span></li>
                                        <li><span className="fir">4</span><span>1 жилийн хязгааргүй ашиглах эрх</span></li>
                                        <li><span className="fir">5</span><span>ЭЕШ-д ирдэг бүх агуулгыг багтаахыг зорьсон</span></li>
                                        <li><span className="fir">6</span><span>Жил болгоны ЭЕШ материалуудыг гүйцэтгэж үнэлгээгээ харах боломж</span></li>
                                        <li><span className="fir">7</span><span>Мэргэжил сонголтын зөвлөгөөг багтаасан</span></li>
                                        <li><span className="fir">8</span><span>Зөвхөн ODOSURY хэрэглэгчдэд тусгайлан зориулж бэлтгэсэн оюуны өмчийн видео хичээл</span></li>
                                        <li><span className="fir">9</span><span>Онлайн орчинд бие даан суралцаж өндөр оноо авах боломж</span></li>
                                        <li><span className="fir">10</span><span>Хичээлийг компьютер, гар утас, таблет, телевизор зэргээс үзэх боломжтой</span></li>
                                    </ul>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Eish);
