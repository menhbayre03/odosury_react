import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Accordion, Card } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import * as actions from '../../actions/lesson_actions';
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import config from "../../config";
import Loader from "../include/Loader";
import AmjiltPdf from './pdf';
const reducer = ({ main, lesson }) => ({ main, lesson });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            program: {},
            activeIndex: '0',
            collapse: true
        };
    }

    componentDidMount() {
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
                        item.programs.map(prog => {
                            if((prog.passed_users || []).indexOf(user._id) < 0 && aa === 0) {
                                aa = 1;
                                self.setState({program: prog.timeline, activeIndex: index.toString()}, () => dispatch(actions.setProgress(lessonView._id, prog)));
                            }
                        })
                    })
                }
            }, 100)
        })
    }

    selectProgram(program) {
        const {lesson: {lessonView}} = this.props;
        const {dispatch} = this.props;
        this.setState({program: program.timeline}, () => dispatch(actions.setProgress(lessonView._id, program)))
    }

    render() {
        const {main: {user}, lesson: {lessonView, loadingView}} = this.props;
        const {program} = this.state;
        let mediaUrl = '';
        if(program.video) {
            mediaUrl = config.get('hostMedia')+"/api/video/show/"+program.video._id+'?lessonId='+lessonView._id+'&token='+Cookies.get('token');
        }
        if(program.pdf) {
            mediaUrl = config.get('hostMedia')+"/api/pdf/show/"+program.pdf._id+'?lessonId='+lessonView._id+'&token='+Cookies.get('token');
        }
        return (
            <React.Fragment>
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
                                {
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
                                                            </div>
                                                        ))
                                                    }
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))
                                }
                            </Accordion>
                        </div>
                    </Scrollbars>
                    <Loader status={loadingView}>
                        <div className="view-cont" style={{marginLeft: this.state.collapse ? 380 : 0}}>
                            <div className="view-header">
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
                            <div className={`program-cont ${program.type === 'video' ? 'video' : ''}`}>
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
                        </div>
                    </Loader>
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);