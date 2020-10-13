import React from 'react';
import { connect } from 'react-redux';
import Header from "../include/Header";
import Loader from "../include/Loader";
import Footer from "../include/Footer";
import { removeFromCard } from '../../actions/lesson_actions';
import * as actions from '../../actions/card_actions';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
const reducer = ({ main, card }) => ({ main, card });

class CardPage extends React.Component {
    constructor(props){
        let searchParams = new URLSearchParams(location.search);
        // t=b === bank
        // t=q === qpay
        super(props);
        if(parseInt(searchParams.get('s')) || searchParams.get('t') === 'b' || searchParams.get('t') === 'q'){
            props.dispatch(actions.setCardTypes({
                type: searchParams.get('t'),
                step: parseInt(searchParams.get('s')) || 1,
            }));
        }
    }
    render() {
        const {
            main: { user },
            card: { step, type, qpay },
            dispatch
        } = this.props;
        let bundles = (user.bundles || []);
        let lessons = (user.lessons || []);
        let lessonsPrice = lessons.reduce((total, c) => total + (c.sale ? c.sale : c.price), 0) || 0;
        let bundlesPrice = bundles.reduce((total, c) => total + (c.sale ? c.sale : c.price), 0) || 0;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <Loader status={0}>
                    {
                        step === 1 ?
                            <div>
                                <button onClick={() => dispatch(removeFromCard({_id: 'a'}))}>sags hoosloh</button>
                                <Row>
                                    <Col md={8}>
                                        <p>kicheelvvd</p>
                                        {
                                            lessons.map( (lesson) =>
                                                <div>
                                                    <span>{lesson.title}</span>
                                                    <button disabled={lesson.deleting} onClick={() => dispatch(removeFromCard({_id: lesson._id}))}>{
                                                        lesson.deleting ? "deleting" : "x"
                                                    }</button>
                                                </div>
                                            )
                                        }
                                    </Col>
                                    <Col md={4}>
                                        <NumberFormat value={lessonsPrice} displayType={'text'} renderText={(value) => <p>hicheelvvd: {value}₮</p>} thousandSeparator={true}/>
                                        <NumberFormat value={bundlesPrice} displayType={'text'} renderText={(value) => <p>bagtsuud: {value}₮</p>} thousandSeparator={true}/>
                                        <NumberFormat value={bundlesPrice + lessonsPrice} displayType={'text'} renderText={(value) => <p>bugd: {value}₮</p>} thousandSeparator={true}/>
                                        <button onClick={() => dispatch(actions.setCardTypes({step: 2, type: type}))}>Hudaldaj awyaaa idda</button>
                                    </Col>
                                </Row>
                            </div>
                        : step === 2 ?
                            <div>
                                <p>step mother</p>
                                <div>
                                    <p>sisterlvv yaaj ywhaa songii</p>
                                    <button
                                        onClick={() =>
                                            qpay.qPay_QRcode && qpay.payment_id ?
                                                dispatch(actions.getQpay({amount: (bundlesPrice + lessonsPrice)}))
                                            :
                                                dispatch(actions.setCardTypes({step: 3, type: 'q'}))
                                        }
                                    >
                                        qpay
                                    </button>
                                    <button onClick={() => dispatch(actions.setCardTypes({step: 3, type: 'b'}))}>bank</button>
                                </div>
                                <button onClick={() => dispatch(actions.setCardTypes({step: 1, type: type}))}>list ee harii</button>
                            </div>
                        : step === 3 && (type === 'q' || type === 'b')?
                            <div>
                                <p>
                                    step sister
                                </p>
                                <button onClick={() => dispatch(actions.setCardTypes({step: 2, type: type}))}>mother lvv ywii</button>
                            </div>
                        : null
                    }
                </Loader>
                <Footer />
            </React.Fragment>
        )
    }
}


export default connect(reducer)(CardPage);