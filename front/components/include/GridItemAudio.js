import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import config from '../../config';
const reducer = ({ main }) => ({ main });

class GridItemAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false
        }
    }

    render() {
        const {main: {user}, item, watching} = this.props;
        let lectures = (item.programs || []).length;
        let hours = (item.programs || []).reduce(function (subTotal, program) {
            return subTotal + ((program || {}).timeline || {}).minutes || 0
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
        // return (
        //     <div className={`grid-item ${watching ? 'watching' : ''}`}>
        //         <div title={item.title}>
        //             <div className="grid-item-box">
        //                 <Link to={`/audio/${item.slug}`} title={item.title}>
        //                     <img src={(item.thumbnail || {}).path ? `${(item.thumbnail || {}).url}${(item.thumbnail || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
        //                 </Link>
        //                 <div className="contents">
        //                     <Link to={`/audio/${item.slug}`} title={item.title}>
        //                         <h3>{item.title}</h3>
        //                     </Link>
        //                     {
        //                         watching ? (
        //                             <div className="progressbar">
        //                                 <div className="filler" style={{width:`${progress}%`}}/>
        //                             </div>
        //                         ) : (
        //                             <div>
        //                                 <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        //                                     <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
        //                                         <ReactStars
        //                                             count={5}
        //                                             value={rating}
        //                                             edit={false}
        //                                             size={16}
        //                                         />
        //                                         <span style={{fontSize: 12, color: '#909090', marginLeft: 5}}>({(item.rating || []).length})</span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         )
        //                     }
        //                 </div>
        //                 {
        //                     watching ? null : (
        //                         <div className="footer">
        //                             <h5><ion-icon name="library"/> {lectures} Бүлэг </h5>
        //                             <div>
        //                                 {
        //                                     hoursText ? (
        //                                         <h5>
        //                                             <ion-icon name="time"/>
        //                                             {Math.ceil(hours)} {hoursText}
        //                                         </h5>
        //                                     ) : null
        //                                 }
        //                             </div>
        //                         </div>
        //                     )
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // );
        return (
            <Link style={{textDecoration: 'none'}} to={`/audio/${item.slug}`}>
                <div className="bundle-item">
                    <img src={(item.thumbnail || {}).path ? `${config.get('hostMedia')}${(item.thumbnail || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`} className="cover-img"/>
                    <div className="bundle-detail">
                        <h4>{item.title}</h4>
                        <p className="skill-card-subtitle">
                            <span>
                                <ion-icon name="library"/> {` ${lectures} Бүлэг`}
                            </span>
                            {
                                hoursText ? (
                                    <span>
                                        <ion-icon name="time"/>
                                        {Math.ceil(hours)} {hoursText}
                                    </span>
                                ) : null
                            }
                        </p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default  connect(reducer)(GridItemAudio);