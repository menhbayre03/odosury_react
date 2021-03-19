import React, { Component } from "react";
import { connect } from 'react-redux';
import { Accordion, Card } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import * as actions from '../../actions/audio_actions';
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import config from "../../config";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
const reducer = ({ main, audio }) => ({ main, audio });

class ViewAreaAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            program: {},
            activeIndex: '0',
            collapse: !isMobile
        };
    }

    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
        document.body.classList.add('hide-mess');
        window.scroll(0, 0);
        let self = this;
        const {dispatch,location,  match, main: {user}} = this.props;
        dispatch(actions.getViewAreaAudio(match.params.slug));
        this.setProgram = config.get('emitter').addListener('setProgramAudio', function (lessonView) {
            let aa = 0;
            setTimeout(function () {
                if((location.state || {}).programIndex != null) {
                    let prog =(lessonView.programs || [])[location.state.programIndex];
                    self.setState({program: prog.timeline, activeIndex: '0'.toString()}, () => dispatch(actions.setProgressAudio(lessonView._id, prog)));
                } else {
                    (lessonView.programs || []).map((prog, indP) => {
                        if((prog.passed_users || []).indexOf(user._id) < 0 && aa === 0) {
                            aa = 1;
                            self.setState({program: prog.timeline, activeIndex: '0'}, () => dispatch(actions.setProgressAudio(lessonView._id, prog)));
                        } else if(indP+1 === lessonView.programs.length && aa === 0) {
                            aa = 1;
                            self.setState({program: (lessonView.programs || [])[0].timeline, activeIndex: '0'.toString()}, () => dispatch(actions.setProgressAudio(lessonView._id, prog)));
                        }
                    })
                }
            }, 100)
        })
    }
    componentWillUnmount() {
        document.body.classList.remove('hide-mess');
        this.setProgram.remove();
    }

    selectProgram(program) {
        const {audio: {lessonView}} = this.props;
        const {dispatch} = this.props;
        if(isMobile) {
            this.setState({collapse: false})
        }
        this.setState({program: program.timeline}, () => dispatch(actions.setProgressAudio(lessonView._id, program)))
    }

    render() {
        const {audio: {loadingView}} = this.props;
        return (
            <React.Fragment>
                {
                    isMobile ? (
                        <div className="view-area">
                            <Scrollbars
                                className="sidebar"
                                style={{
                                    width: this.state.collapse ? '100%' : 0,
                                    opacity: this.state.collapse ? 1 : 0,
                                    visibility: this.state.collapse ? 'visible' : 'hidden',
                                    zIndex: 2
                                }}
                            >
                                <h4 style={{width: '100%'}}>Хөтөлбөрүүд:
                                    <ion-icon style={{float: 'right'}} name="chevron-back-outline" onClick={() => this.setState({collapse: false})}/>
                                </h4>
                                <div className="timeline-cont" style={{width: '100%'}}>
                                    <Accordion activeKey={this.state.activeIndex}>
                                        {this.renderSide()}
                                    </Accordion>
                                </div>
                            </Scrollbars>
                            <Loader status={loadingView}>
                                <div className="view-cont" style={{marginLeft: 0}}>
                                    {this.renderBody()}
                                </div>
                            </Loader>
                        </div>
                    ) : (
                        <div className="view-area">
                            <Scrollbars
                                className="sidebar"
                                style={{
                                    width: this.state.collapse ? 380 : 0,
                                    opacity: this.state.collapse ? 1 : 0,
                                    visibility: this.state.collapse ? 'visible' : 'hidden',
                                }}
                            >
                                <h4 style={{width: 380}}>Хөтөлбөрүүд:</h4>
                                <div className="timeline-cont" style={{width: 380}}>
                                    <Accordion activeKey={this.state.activeIndex}>
                                        {this.renderSide()}
                                    </Accordion>
                                </div>
                            </Scrollbars>
                            <Loader status={loadingView}>
                                <div className="view-cont" style={{marginLeft: this.state.collapse ? 380 : 0}}>
                                    {this.renderBody()}
                                </div>
                            </Loader>
                        </div>
                    )
                }
            </React.Fragment>
        );
    }
    renderBody() {
        const {audio: {lessonView}} = this.props;
        const {program} = this.state;
        let mediaUrl = '';
        if(program.audio) {
            mediaUrl = program.audio.url+"/api/audio/show/"+program.audio._id+'?lessonId='+lessonView._id+'&token='+Cookies.get('token');
        }
        return (
            <React.Fragment>
                <div className="view-header" style={{
                    width: isMobile ? '100%' : this.state.collapse ? 'calc(100% - 380px)' : '100%'
                }}>
                    {
                        this.state.collapse ? (
                            <ion-icon name="chevron-back-outline" onClick={() => this.setState({collapse: false})}/>
                        ) : (
                            <ion-icon name="menu-outline" onClick={() => this.setState({collapse: true})}/>
                        )
                    }
                    <h5>
                        {lessonView.title}
                        <ion-icon name="close" style={{
                            position: 'absolute',
                            top: -3,
                            right: -10,
                        }} onClick={() => this.props.history.push(`/audio/${lessonView.slug}`)}/>
                    </h5>
                </div>
                <div className={`program-cont`}
                    style={{
                        padding: (isMobile) ? '20px 0 0 0' : '40px 30px',
                        paddingTop:(isMobile) ? 60 : 80
                    }}
                >
                    {
                        program._id ? (
                            <div>
                                <h6 className="tit">{program.title}</h6>
                                <div>
                                    <div style={{padding: '0px 20px 10px'}}>
                                        <ReactPlayer
                                            playing
                                            controls
                                            onError={() => config.get('emitter').emit('warning', 'Хандах эрх хүрэхгүй байна.')}
                                            playIcon={<ion-icon style={{fontSize: 74, color: '#fff'}} name="play-circle"/>}
                                            height={60}
                                            width={"100%"}
                                            url={mediaUrl}
                                            config={{
                                                file: {
                                                    forceAudio: true,
                                                    attributes: {
                                                        controlsList : "nodownload"
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
    renderSide() {
        const {main: {user}, audio: {lessonView}} = this.props;
        return (
            <Card>
                <Accordion.Collapse eventKey={'0'}>
                    <Card.Body>
                        {
                            (lessonView.programs || []).map((program, ind) => (
                                <React.Fragment>
                                    <div onClick={() => this.selectProgram(program)} className={`program ${(program.passed_users || []).indexOf(((user || {})._id || 'WW@@#').toString()) > -1 ? 'passed' : ''} ${this.state.program._id == (program.timeline || {})._id ? 'current' : ''}`} key={ind}>
                                        <ion-icon name="videocam"/>
                                        <p>{(program.timeline || {}).title}</p>
                                        {
                                            program.timeline.minutes > 0 ? (
                                                <span>{(program.timeline || {}).minutes} мин</span>
                                            ) : null
                                        }
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }
}

export default  connect(reducer)(ViewAreaAudio);