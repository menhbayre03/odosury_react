import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Accordion, Card } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import * as actions from '../../actions/lesson_actions';
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import Download from "downloadjs";
import config from "../../config";
import Loader from "../include/Loader";
import AmjiltPdf from './pdf';
import {
    isMobile
} from "react-device-detect";
const reducer = ({ main, lesson }) => ({ main, lesson });

class Bundle extends Component {
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
        document.body.classList.add('hide-mess');
        window.scroll(0, 0);
        let self = this;
        const {dispatch,location,  match, main: {user}} = this.props;
        dispatch(actions.getViewArea(match.params.slug));
        this.setProgram = config.get('emitter').addListener('setProgram', function (lessonView) {
            let aa = 0;
            setTimeout(function () {
                if((location.state || {}).levelIndex != null && (location.state || {}).programIndex != null) {
                    let prog =(lessonView.levels || [])[location.state.levelIndex].programs[location.state.programIndex];
                    self.setState({program: prog.timeline, activeIndex: location.state.levelIndex.toString()}, () => dispatch(actions.setProgress(lessonView._id, prog)));
                } else {
                    (lessonView.levels || []).map((item, index) => {
                        item.programs.map((prog, indP) => {
                            if((prog.passed_users || []).indexOf(user._id) < 0 && aa === 0) {
                                aa = 1;
                                self.setState({program: prog.timeline, activeIndex: index.toString()}, () => dispatch(actions.setProgress(lessonView._id, prog)));
                            } else if(index+1 === (lessonView.levels || []).length && indP+1 === item.programs.length && aa === 0) {
                                aa = 1;
                                self.setState({program: (lessonView.levels || [])[0].programs[0].timeline, activeIndex: '0'.toString()}, () => dispatch(actions.setProgress(lessonView._id, prog)));
                            }
                        })
                    })
                }
            }, 100)
        })
    }
    componentWillUnmount() {
        document.body.classList.remove('hide-mess');
        this.setProgram.remove();
    }

    downloadFile(zip){
        let url = config.get('hostMedia') + "/api/zip/"+zip._id+"?token="+Cookies.get('token');
        setTimeout(() => {
            var x = new XMLHttpRequest();
            x.open("GET", url, true);
            x.responseType = 'blob';
            x.onload = function (e) {
                Download(x.response, zip.path, "application/octet-stream");
            }
            x.send();

        }, 200);
    }

    selectProgram(program) {
        const {lesson: {lessonView}} = this.props;
        const {dispatch} = this.props;
        if(isMobile) {
            this.setState({collapse: false})
        }
        this.setState({program: program.timeline}, () => dispatch(actions.setProgress(lessonView._id, program)))
    }

    render() {
        const {lesson: {loadingView}} = this.props;
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
        const {lesson: {lessonView}} = this.props;
        const {program} = this.state;
        let mediaUrl = '';
        if(program.video) {
            mediaUrl = config.get('hostMedia')+"/api/video/show/"+program.video._id+'?lessonId='+lessonView._id+'&token='+Cookies.get('token');
        }
        if(program.audio) {
            mediaUrl = config.get('hostMedia')+"/api/audio/show/"+program.audio._id+'?lessonId='+lessonView._id+'&token='+Cookies.get('token');
        }
        if(program.pdf) {
            mediaUrl = config.get('hostMedia')+"/api/pdf/show/"+program.pdf._id+'?lessonId='+lessonView._id+'&token='+Cookies.get('token');
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
                        }} onClick={() => this.props.history.push(`/lesson/${lessonView.slug}`)}/>
                    </h5>
                </div>
                <div className={`program-cont ${program.type === 'video' ? 'video' : ''}`}
                    style={{
                        padding: (isMobile || (program.type === 'video' || program.type === 'pdf')) ? '20px 0 0 0' : '40px 30px'
                    }}
                >
                    {
                        program._id ? (
                            <div>
                                {
                                    program.type === 'video' ? null : (
                                        <h6 className="tit">{program.title}</h6>
                                    )
                                }
                                {
                                    program.content ? (
                                        <div className="content-prog" dangerouslySetInnerHTML={{__html : program.content}}/>
                                    ) : null
                                }
                                {
                                    program.video && mediaUrl && program.type === 'video' ? (
                                        <ReactPlayer
                                            playing
                                            onError={() => config.get('emitter').emit('warning', 'Хандах эрх хүрэхгүй байна.')}
                                            controls
                                            light={`${config.get('hostMedia')}${program.video.thumbnail}`}
                                            autoPlay={false}
                                            height={560}
                                            playIcon={<ion-icon style={{fontSize: 74, color: '#fff'}} name="play-circle"/>}
                                            width={"100%"}
                                            url={mediaUrl}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList : "nodownload"
                                                    }
                                                }
                                            }}
                                        />
                                    ) : null
                                }
                                {
                                    program.audio && mediaUrl && program.type === 'audio' ? (
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
                                    ) : null
                                }
                                {
                                    program.pdf && mediaUrl && program.type === 'pdf' ? (
                                        <div className={'PdfView'}>
                                            <div style={{padding: '0px 0px 10px'}}>
                                                <AmjiltPdf src={mediaUrl} hideHeader={true}/>
                                            </div>
                                        </div>
                                    ) : null
                                }
                                {
                                    program.type === 'video' ? (
                                        <h6 className="tit" style={{marginTop: 20}}>{program.title}</h6>
                                    ) : null
                                }
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
        const {main: {user}, lesson: {lessonView}} = this.props;
        return (
            (lessonView.levels || []).map((item, index) => (
                <Card key={index}>
                    <Card.Header>
                        <Accordion.Toggle onClick={() => this.setState({activeIndex: this.state.activeIndex === index.toString() ? '' : index.toString()})} as={Button} variant="link" eventKey={index.toString()}>
                            {item.title}
                            {
                                this.state.activeIndex == index.toString() ? (
                                    <ion-icon style={{
                                        float: 'right',
                                        fontSize: 20,
                                        position: 'relative',
                                        top: 3,
                                    }} name="chevron-down"/>
                                ) : (
                                    <ion-icon style={{
                                        float: 'right',
                                        fontSize: 20,
                                        position: 'relative',
                                        top: 3,
                                    }} name="chevron-up"/>
                                )
                            }
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>
                            {
                                (item.programs || []).map((program, ind) => (
                                    <React.Fragment>
                                        <div onClick={() => this.selectProgram(program)} className={`program ${(program.passed_users || []).indexOf(((user || {})._id || 'WW@@#').toString()) > -1 ? 'passed' : ''} ${this.state.program._id == (program.timeline || {})._id ? 'current' : ''}`} key={ind}>
                                            {
                                                (program.timeline || {}).type === 'video' ? (
                                                    <ion-icon name="videocam"/>
                                                ) : (
                                                    (program.timeline || {}).type === 'audio' ? (
                                                        <ion-icon name="videocam"/>
                                                    ) : (
                                                        <ion-icon name="document-text"/>
                                                    )
                                                )
                                            }
                                            <p>{(program.timeline || {}).title}</p>
                                            {
                                                program.timeline.minutes > 0 ? (
                                                    <span>{(program.timeline || {}).minutes} мин</span>
                                                ) : null
                                            }
                                            {
                                                (program.timeline || {}).include_zip ? (
                                                    <span className="include_zip" onClick={() => this.downloadFile((program.timeline || {}).include_zip)}>Нэмэлт файл</span>
                                                ) : null
                                            }
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))
        )
    }
}

export default  connect(reducer)(Bundle);