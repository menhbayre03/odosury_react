import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import config from '../../config';
const reducer = ({ main }) => ({ main });

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false
        }
    }

    render() {
        const {main: {user}, item, watching} = this.props;
        let lectures = (item.levels || []).reduce(function (subTotal, level) {
            return subTotal + (level.programs || []).length
        }, 0);
        let hours = (item.levels || []).reduce(function (subTotal, level) {
            return subTotal + (level.programs || []).reduce((total, program) => (total + ((program || {}).timeline || {}).minutes || 0), 0)
        }, 0) / 60;
        let hoursText = 'Цаг';
        let progress = 0;
        if(watching) {
            item.progress.map(function (item) {
                if(item.user.toString() === user._id.toString()) {
                    progress = item.progress || 0
                }
            })
        }
        let rating = 0;
        if((item.rating || []).length > 0) {
            rating = item.rating.reduce((total, rate) => (total + rate.rate), 0) / item.rating.length
        }
        if(hours < 1 && hours !== 0) {
            hours = hours * 60;
            hoursText = 'Минут';
        } else if(hours === 0) {
            hoursText = false;
        }
        return (
            <div className={`grid-item ${watching ? 'watching' : ''}`}>
                <div title={item.title}>
                    <div className="grid-item-box">
                        <Link to={`/lesson/${item.slug}`} title={item.title} className="imga">
                            <img src={(item.thumbnailSmall || {}).path ? `${(item.thumbnailSmall || {}).url}${(item.thumbnailSmall || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                            <span className={`type ${item.free ? 'free' : item.eish ? 'eish' : ''}`}>{item.free ? 'Үнэгүй' : item.eish ? 'ЭЕШ' : 'Premium'}</span>
                        </Link>
                        <div className="contents">
                            {
                                watching ? (
                                    <div className="progressbar">
                                        <div className="filler" style={{width:`${progress}%`}}/>
                                    </div>
                                ) : null
                            }
                            <Link to={`/lesson/${item.slug}`} title={item.title}>
                                <h3>{item.title}</h3>
                            </Link>
                            {
                                watching ? null : (
                                    <div>
                                        {/*<Link className="teacher" to={`/teacher/${item.slug}`} title={`${(item.teacher || {}).last_name} ${(item.teacher || {}).first_name}`}>*/}
                                        {/*    {((item.teacher || {}).last_name || '').slice(0, 1)}. {(item.teacher || {}).first_name}*/}
                                        {/*</Link>*/}
                                        <span className="teacher">{item.eish ? 'Элсэлтийн ерөнхий шалгалт' : (item.category || {}).title}</span>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                            {/*<div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>*/}
                                            {/*    <ReactStars*/}
                                            {/*        count={5}*/}
                                            {/*        value={rating}*/}
                                            {/*        edit={false}*/}
                                            {/*        size={16}*/}
                                            {/*    />*/}
                                            {/*    <span style={{fontSize: 12, color: '#909090', marginLeft: 5}}>({(item.rating || []).length})</span>*/}
                                            {/*</div>*/}
                                            {
                                                item.sale > 0 && !item.eish ? (
                                                    <div style={{
                                                        textAlign: 'right',
                                                        marginTop: 10,
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-start',
                                                    }}>
                                                        <span style={{fontSize: 14, color: '#3e416d', display: 'block', fontWeight: 600, marginRight: 15}}>{config.formatMoney(item.sale)}₮</span>
                                                        <span style={{fontSize: 12, color: '#909090', display: 'block', fontWeight: 600 , textDecoration: 'line-through'}}>{config.formatMoney(item.price)}₮</span>
                                                    </div>
                                                ) : (
                                                    <div style={{
                                                        textAlign: 'right',
                                                        marginTop: 10,
                                                        alignItems: 'flex-end',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-end',
                                                    }}>
                                                        <span style={{fontSize: 14, color: '#3e416d', display: 'block', fontWeight: 600}}>{item.eish ? 'ЭЕШ БАГЦ' :config.formatMoney(item.price)+'₮'}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {/*{*/}
                        {/*    watching ? null : (*/}
                        {/*        <div className="footer">*/}
                        {/*            <h5><ion-icon name="library"/> {lectures} Хичээл </h5>*/}
                        {/*            <div>*/}
                        {/*                {*/}
                        {/*                    hoursText ? (*/}
                        {/*                        <h5>*/}
                        {/*                            <ion-icon name="time"/>*/}
                        {/*                            {Math.ceil(hours)} {hoursText}*/}
                        {/*                        </h5>*/}
                        {/*                    ) : null*/}
                        {/*                }*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect(reducer)(Header);