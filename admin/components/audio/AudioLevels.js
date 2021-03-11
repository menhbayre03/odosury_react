import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import * as actions from "../../actions/audioLevel_actions";
import arrayMove from 'array-move';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const reducer = ({ main, audioLevel }) => ({ main, audioLevel });
import { Card, Button, Modal, Form, Popconfirm, Input, Select, InputNumber, message, Progress } from 'antd';
import { DeleteFilled, PlusOutlined, EditFilled, UploadOutlined, LoadingOutlined, CaretLeftFilled } from '@ant-design/icons'
import MediaLib from "../media/MediaLib";
const { TextArea } = Input;
const { Option } = Select;
const SortableItem = SortableElement(( {value ,progInd, removeTimeline, openEditTimeline, dis, progId}) => {
    return (
        <div className='sortable-item'>
            {progInd+1}. {value.timeline.title}
            <span>
                <Button loading={value.loading || dis.props.editTimelineLoader} style={{marginRight: 10}} size='small' type="default" key='updateTimeline' icon={<EditFilled />}
                        onClick={openEditTimeline.bind(this, 'update', value.timeline)}
                >
                    Засах
                </Button>
                <Popconfirm
                    title={`Та устгах гэж байна!`}
                    onConfirm={removeTimeline.bind(this, progId)}
                    okText="Усгах"
                    placement="left"
                    cancelText="Болих"
                >
                    <Button loading={value.loading} type={"primary"} style={{marginRight: 10}} key={`deleteTimeline-${value._id}`} danger size={"small"}>
                        <DeleteFilled/> Устгах
                    </Button>
                </Popconfirm>
            </span>
        </div>
    )
});
const SortableContainera = SortableContainer(({children}) => {
    return <div>{children}</div>;
});
class LessonLevels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // current: 0,

            // loading: false,
            mediaType: '',
            // foodImage: null,
        };
        // this.editor = null;
        // this.editorCb = null;
        this.removeTimeline = this.removeTimeline.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.openEditTimeline = this.openEditTimeline.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(actions.getAudioSingle({id:this.props.match.params.id}));
    }
    openEditTimeline(type, timeline) {
        this.props.dispatch(actions.openEditTimeline({type:type, timelineId: type === 'new' ? timeline : timeline._id}));
    }
    openMediaLib(mediaType){
        this.setState({mediaType})
    }
    chooseMedia(data, type){
        this.props.dispatch(actions.chooseMedia({data: data, medType:type}));
    }
    removeTimeline(progId) {
        const {audioLevel:{audio}} = this.props;
        this.props.dispatch(actions.removeTimeline({_id:audio._id, progId:progId}));
    }
    onSortEnd({oldIndex, newIndex}) {
        const {dispatch, audioLevel:{audio, orderLoader}} = this.props;
        if(oldIndex !== newIndex && !orderLoader){
            let aa = arrayMove((audio.programs || []), oldIndex, newIndex);
            dispatch(actions.orderLevels({sineLevel:aa, _id: audio._id}));
        }
    };
    onChangeHandlerLevelTimeline(e) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:e.target.name, value: e.target.value}));
    }
    closeEditTimeline() {
        this.props.dispatch(actions.closeEditTimeline());
    }
    removeUploadedFile(name) {
        this.props.dispatch(actions.removeUploadedFile({name: name}));
        return false;
    };
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:name, value: value}));
    }
    submitTimeline(){
        const {audioLevel:{ timeline, audio, timelineAudio }} = this.props;
        if(!timeline.title || (timeline.title && timeline.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        if(!timeline.minutes || (timeline.minutes && timeline.minutes === 0 )){
            return config.get('emitter').emit('warning', ("Минут оруулна уу!"));
        }
        if(timeline.type === 'audio') {
            if(!timelineAudio || !timelineAudio._id || timelineAudio._id === '' || !timelineAudio.type || timelineAudio.type !== 'audio' ){
                return config.get('emitter').emit('warning', ("Аудио оруулна уу!"));
            }
        }
        let cc = {
            ...timeline,
            audioBook: audio._id,
            timelineAudio: timelineAudio || {}
        };
        this.props.dispatch(actions.submitTimeline(cc));
    }
    render() {
        let { audioLevel:{ audio, editTimelineLoader, openEditTimeline, status, lesson, openModalLevel, level, openModalLevelTimline, timeline, timelineSubmitLoader, timelineVideo, timelineVideoProgress, videoUploadLoadingT, timelineAudio, timelinePdf, timelineAudioProgress, audioUploadLoadingT , timelineFile, timelineFileProgress, fileUploadLoadingT } } = this.props;
        return (
            <Card
                title={audio && audio.title ? audio.title : 'Хөтөлбөр'}
                bordered={true}
                loading={status}
                extra={
                    <React.Fragment>
                        <Link to='/admin/audios'>
                            <Button style={{marginRight: 10}} type="default" key='newLevel' icon={<CaretLeftFilled />} >
                                Буцах
                            </Button>
                        </Link>
                        <Button style={{marginRight: 10}} type="primary" key='newLevel' icon={<PlusOutlined />} onClick={this.openEditTimeline.bind(this, 'new', {})} >
                            Хөтөлбөр нэмэх
                        </Button>
                    </React.Fragment>
                }
            >
                <div className='lesson-levels'>
                    <div className='levels'>
                        <SortableContainera onSortEnd={this.onSortEnd.bind(this)}>
                            {audio.programs && audio.programs.length > 0 ?
                                audio.programs.map((prog, index) =>
                                    <SortableItem
                                        key={(prog || {})._id}
                                        value={prog}
                                        index={index}
                                        removeTimeline={this.removeTimeline}
                                        openEditTimeline={this.openEditTimeline}
                                        dis={this}
                                        progInd={index}
                                        progId={(prog || {})._id}
                                    />
                                )
                                :
                                <tr>
                                    <td colSpan={4}>Хоосон</td>
                                </tr>
                            }
                        </SortableContainera>
                    </div>
                    {openEditTimeline && !editTimelineLoader?
                        <Modal
                            title="Хөтөлбөр"
                            visible={openEditTimeline}
                            confirmLoading={timelineSubmitLoader}
                            width={1000}
                            onOk={this.submitTimeline.bind(this)}
                            onCancel={this.closeEditTimeline.bind(this)}
                            okText="Хадгалах"
                            cancelText="Болих"
                            maskClosable={false}
                        >
                            <Form>
                                <Form.Item
                                    label='Нэр'
                                    labelCol={{span: 4}}
                                    fieldKey='name'
                                >
                                    <Input autoFocus={true} size="middle" maxLength={60} value={timeline.title? timeline.title : ''} name='title'
                                           onChange={this.onChangeHandlerLevelTimeline.bind(this)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Аудио'
                                    labelCol={{span: 4}}
                                    className='upload-a'
                                >
                                    <div>
                                        <Button onClick={this.openMediaLib.bind(this, 'audio')} style={{marginBottom: 10}}>
                                            <UploadOutlined /> {timelineAudio && timelineAudio._id? 'Солих' : 'Аудио'}
                                        </Button>
                                        {timelineAudio && timelineAudio._id ?
                                            <div className='uploaded-a'>
                                                        <span className='uploaded-a-name'>
                                                            {timelineAudio.original_name}
                                                        </span>
                                                <span onClick={this.removeUploadedFile.bind(this, 'timelineAudio')} className='uploaded-a-action'>
                                                    <DeleteFilled />
                                                </span>
                                            </div>
                                            :
                                            null
                                        }

                                    </div>
                                </Form.Item>
                                <Form.Item
                                    fieldKey='min'
                                    label='Минут'
                                    labelCol={{span: 4}}
                                >
                                    <InputNumber
                                        size="middle"
                                        style={{width: '100%'}}
                                        name='minutes'
                                        min={0}
                                        max={600}
                                        maxLength={9}
                                        value={timeline.minutes ? timeline.minutes.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                                        // formatter={value => `${value}мин`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        formatter={value => `${value} минут`}
                                        onChange={this.onChangeHandle2.bind(this, 'minutes')}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        null
                    }
                </div>
                {this.state.mediaType !== ''?
                    <MediaLib
                        visible={this.state.mediaType != ''}
                        multi={false}
                        onOk={this.chooseMedia.bind(this)}
                        type={this.state.mediaType}
                        dimension={{width:1200, height: 450}}
                        onHide={() => this.setState({mediaType: ''})}
                    />
                    :
                    null
                }
            </Card>


        );
    }
}
export default  connect(reducer)(LessonLevels);