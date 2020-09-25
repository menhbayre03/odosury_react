import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lessonLevel_actions";
import arrayMove from 'array-move';
import { Link } from 'react-router-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const reducer = ({ main, lessonLevel }) => ({ main, lessonLevel });
import {
    Card,
    Button,
    List,
    Avatar,
    Table,
    Modal,
    Form,
    Popconfirm,
    Input,
    Select,
    Spin,
    Row,
    Col,
    TreeSelect,
    InputNumber,
    Steps,
    Upload,
    message,
    Progress
} from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, DragOutlined, SearchOutlined, CheckOutlined, UploadOutlined, CloseCircleFilled, SolutionOutlined, LoadingOutlined, SmileOutlined, CheckCircleFilled, CaretRightFilled, CaretLeftFilled } from '@ant-design/icons'
import LessonEdit from "./LessonEdit";
import {closeEditTimeline} from "../../actionTypes";
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { Step } = Steps;
const SortableItem = SortableElement(( {value ,needRemove, removeTimeline, openEditTimeline, dis, indexes}) => {
    return (
        <div className='sortable-item'>
            {indexes.progIdx+1}. {value.timeline.title}
            <span>
                <Button loading={value.timeline.loading || dis.props.editTimelineLoader} style={{marginRight: 10}} size='small' type="default" key='updateTimeline' icon={<EditFilled />}
                        // onClick={this.openModalLevelTimline.bind(this, 'update', run._id, prog.timeline)}
                        onClick={openEditTimeline.bind(this, 'update', needRemove.levelIndex, value.timeline)}
                >
                    Засах
                </Button>
                <Popconfirm
                    title={`Та устгах гэж байна!`}
                    onConfirm={removeTimeline.bind(this,needRemove.levelIndex, needRemove.program)}
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
            current: 0,
            //upload
            loading: false,
        };
        this.removeTimeline = this.removeTimeline.bind(this);
        this.openEditTimeline = this.openEditTimeline.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(actions.getLessonSingle({id:this.props.match.params.id}));
    }

    componentWillUnmount() {
        this.closeModalLevelTimline();
        this.closeLessonModalLevel();
        this.closeEditTimeline();
    }
    openModalLevel(type, idx, data = {}) {
        this.props.dispatch(actions.openLessonModalLevel({type:type, idx:idx, level:data}));
    }
    openModalLevelTimline(type, level_id, timeline) {
        this.props.dispatch(actions.openModalLevelTimline({type:type, level_id:level_id, timeline: timeline}));
    }
    openEditTimeline(type, level_id, timeline) {
        this.props.dispatch(actions.openEditTimeline({type:type, level_id:level_id, timelineId:timeline._id}));
    }
    closeModalLevelTimline(type, idx, data = {}) {
        this.props.dispatch(actions.closeModalLevelTimline());
    }
    closeLessonModalLevel() {
        this.props.dispatch(actions.closeLessonModalLevel());
    }
    closeEditTimeline() {
        this.props.dispatch(actions.closeEditTimeline());
    }
    onChangeHandlerLevel(e) {
        this.props.dispatch(actions.lessonChangeHandlerLevel({name:e.target.name, value: e.target.value}));
    }
    onChangeHandlerLevelTimeline(e) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:e.target.name, value: e.target.value}));
    }
    addLevel(){
        const {lessonLevel:{level, levelType, lesson, levelIdx}} = this.props;
        if(!level.title || (level.title && level.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        this.props.dispatch(actions.lessonAddLevel({_id: lesson._id, level_id:level._id, level: level, levelType: levelType, lesson: lesson, levelIdx:levelIdx}));
    }
    submitTimeline(){
        const {lessonLevel:{ timeline, timelineType, lesson, levelIndex, level_id, timelineVideo, timelineAudio, timelineFile }} = this.props;
        if(!timeline.title || (timeline.title && timeline.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        if(!timeline.description || (timeline.description && timeline.description.trim() === '' )){
            return config.get('emitter').emit('warning', ("Тайлбар оруулна уу!"));
        }
        if(!timeline.type || (timeline.type && timeline.type.trim() === '' )){
            return config.get('emitter').emit('warning', ("Төрөл оруулна уу!"));
        }
        if(!timeline.minutes || (timeline.minutes && timeline.minutes === 0 )){
            return config.get('emitter').emit('warning', ("Минут оруулна уу!"));
        }
        if(timeline.type === 'video'){
            if(!timelineVideo || !timelineVideo.path || timelineVideo.path === '' || !timelineVideo.type || timelineVideo.type !== 'video' ){
                return config.get('emitter').emit('warning', ("Бичлэг оруулна уу!"));
            }
        }
        if(timeline.type === 'audio') {
            if(!timelineAudio || !timelineAudio.path || timelineAudio.path === '' || !timelineAudio.type || timelineAudio.type !== 'audio' ){
                return config.get('emitter').emit('warning', ("Аудио оруулна уу!"));
            }
        }
        let cc = {
            ...timeline,
            lesson: lesson._id,
            timelineType: timelineType,
            level_id: level_id,
            levelIndex:levelIndex,
            timelineVideo: timeline.type === 'video'? (timelineVideo || {})  : null,
            timelineAudio: timeline.type === 'audio'? (timelineAudio || {})  : null,
            timelineContent: timeline.type === 'content'? timelineAudio || {}  : null,
            timelineFile: (timelineFile || null)
        };
        this.props.dispatch(actions.submitTimeline(cc));
    }
    removeItem(item, index){
        const {dispatch, lessonLevel:{lesson}} = this.props;
        // let aa = (lesson.levels || []).filter(function (lvl, idx) {
        //     return idx !== index;
        // });
        // dispatch(actions.orderLevels(aa));
    };
    onChangeHandlerLevelTimelineSelect(value){
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:'type', value: value}));
    };
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:name, value: value}));
    }
    complete() {
        const {dispatch, lessonLevel:{lesson}} = this.props;
    }
    deleteLevel(id) {
        const {dispatch, lessonLevel:{lesson}} = this.props;
        this.props.dispatch(actions.deleteLevel({_id:lesson._id, level_id: id}));
    }
    removeTimeline(level_id, timeline_id) {
        const {dispatch, lessonLevel:{lesson}} = this.props;
        this.props.dispatch(actions.removeTimeline({_id:lesson._id, level_id: level_id, timeline_id:timeline_id}));
    }
    //upload
    customRequestVideo(files) {
        const {main:{user}} = this.props;
        let id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadTimelineVideo([files.file], 'video', id));
    }
    beforeUploadVideo(file) {
        const isJpgOrPng = file.type === 'video/mp4' || file.type === 'video/MP4';
        if (!isJpgOrPng) {
            message.error('You can only upload .mp4 file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 200;
        if (!isLt2M) {
            message.error('Video must smaller than 200MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    customRequestAudio(files) {
        const {main:{user}} = this.props;
        let id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadTimelineAudio([files.file], 'audio', id));
    }
    beforeUploadAudio(file) {
        const isJpgOrPng = file.type === 'audio/mp3' || file.type === 'audio/MP3' || file.type === 'audio/mpeg';
        if (!isJpgOrPng) {
            message.error('You can only upload .mp3 file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 200;
        if (!isLt2M) {
            message.error('Audio must smaller than 200MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    customRequestFile(files) {
        const {main:{user}} = this.props;
        let id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadTimelineFile([files.file], 'file', id));
    }
    beforeUploadFile(file) {
        let fileName = (file.name || '').split('.');
        const isJpgOrPng = file.type === 'application/zip' || (file.type === '' && fileName && fileName[fileName.length-1] === 'rar');
        if (!isJpgOrPng) {
            message.error('You can only upload .zip or .rar file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 200;
        if (!isLt2M) {
            message.error('File must smaller than 200MB!');
        }
        return isJpgOrPng && isLt2M;
    }



    onSortEnd({oldIndex, newIndex, collection}) {
        const {dispatch, lessonLevel:{lesson}} = this.props;
        if(oldIndex !== newIndex){
            let aa = arrayMove((lesson.levels[collection].programs || []), oldIndex, newIndex);
            dispatch(actions.orderLevels({collection: collection, sineLevel:aa}));
        }
    };
    render() {
        let { main:{user}, lessonLevel:{editTimelineLoader, openEditTimeline, status, lesson, openModalLevel, level, openModalLevelTimline, timeline, timelineSubmitLoader, timelineVideo, timelineVideoProgress, videoUploadLoadingT, timelineAudio, timelineAudioProgress, audioUploadLoadingT , timelineFile, timelineFileProgress, fileUploadLoadingT } } = this.props;


        const uploadButtonVideo = (
            <div style={{fontSize: 24}}>
                {videoUploadLoadingT ?
                    <React.Fragment>
                        <LoadingOutlined />
                        {timelineVideoProgress && timelineVideoProgress.percent?
                            <Progress percent={timelineVideoProgress.percent} size="small" />
                            :
                            <Progress percent={0} size="small" />
                        }
                    </React.Fragment>
                    :
                    <PlusOutlined />
                }
            </div>
        );
        const uploadButtonAudio = (
            <div style={{fontSize: 24}}>
                {audioUploadLoadingT ?
                    <React.Fragment>
                        <LoadingOutlined />
                        {timelineAudioProgress && timelineAudioProgress.percent?
                            <Progress percent={timelineAudioProgress.percent} size="small" />
                            :
                            <Progress percent={0} size="small" />
                        }
                    </React.Fragment>
                    :
                    <PlusOutlined />
                }
            </div>
        );
        const uploadButtonFile = (
            <div style={{fontSize: 24}}>
                {fileUploadLoadingT ?
                    <React.Fragment>
                        <LoadingOutlined />
                        {timelineFileProgress && timelineFileProgress.percent?
                            <Progress percent={timelineFileProgress.percent} size="small" />
                            :
                            <Progress percent={0} size="small" />
                        }
                    </React.Fragment>
                    :
                    <PlusOutlined />
                }
            </div>
        );
        return (
            <Card
                title={lesson && lesson.title? lesson.title : 'LEVEL'}
                bordered={true}
                loading={status}
                extra={
                    <React.Fragment>
                        <Link to='/admin/lessons'>
                            <Button style={{marginRight: 10}} type="default" key='newLevel' icon={<CaretLeftFilled />} >
                                Буцах
                            </Button>
                        </Link>
                        <Button style={{marginRight: 10}} type="primary" key='newLevel' icon={<PlusOutlined />} onClick={this.openModalLevel.bind(this, 'new', null, {})} >
                            Түвшин
                        </Button>
                        {/*<Button loading={timelineSubmitLoader} type="primary" key='hadhad' icon={<CheckOutlined />} onClick={this.complete.bind(this)}>*/}
                        {/*    Хадгалах*/}
                        {/*</Button>*/}
                        {/*<Button type="default" key='forwardButton' icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >*/}
                        {/*    Болих*/}
                        {/*</Button>*/}
                        {/*<Button type="primary" key='forwardButton' icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >*/}
                        {/*    Болих*/}
                        {/*</Button>*/}
                    </React.Fragment>
                }
            >
                <div className='lesson-levels'>
                    <div className='levels'>
                        <SortableContainera onSortEnd={this.onSortEnd.bind(this)}>
                            {lesson.levels && lesson.levels.length>0?
                                lesson.levels.map((run, idx) =>
                                    <div key={run._id+'lvls'}>
                                        <Card
                                            style={{marginBottom: 20}}
                                            size='small'
                                            title={run.title ? run.title : ''}
                                            extra={
                                                <React.Fragment>
                                                    <Button loading={run.loading} style={{marginRight: 10}} size='small' type="default" key='updateLevel' icon={<EditFilled />} onClick={this.openModalLevel.bind(this, 'update', idx, run)} >
                                                        Засах
                                                    </Button>
                                                    <Popconfirm
                                                        title={`Та устгах гэж байна!`}
                                                        onConfirm={this.deleteLevel.bind(this, run._id)}
                                                        okText="Усгах"
                                                        placement="left"
                                                        cancelText="Болих"
                                                    >
                                                        <Button loading={run.loading} type={"primary"} style={{marginRight: 10}} key='deleteLevel' danger size={"small"}>
                                                            <DeleteFilled/> Устгах
                                                        </Button>
                                                    </Popconfirm>
                                                    <Button loading={run.loading} size='small' type="primary" key='newTimeline' icon={<PlusOutlined />} onClick={this.openModalLevelTimline.bind(this, 'new', run._id, {})} >
                                                        Хөтөлбөр
                                                    </Button>
                                                </React.Fragment>
                                            }
                                        >
                                            {run.programs && run.programs.length>0?
                                                run.programs.map((prog, index) =>
                                                    <SortableItem
                                                        key={prog._id}
                                                        value={prog}
                                                        index={index}
                                                        collection={idx}
                                                        removeTimeline={this.removeTimeline}
                                                        openEditTimeline={this.openEditTimeline}
                                                        dis={this}
                                                        needRemove={{levelIndex:run._id, program:prog.timeline._id}}
                                                        indexes={{levelIdx: idx, progIdx: index}}
                                                    />
                                                )
                                                :
                                                <tr>
                                                    <td colSpan={4}>Хоосон түвшин</td>
                                                </tr>
                                            }
                                        </Card>
                                    </div>
                                )
                                :
                                null
                            }
                        </SortableContainera>
                    </div>

                    {openModalLevel?
                        <Modal
                            title="Level"
                            visible={openModalLevel}
                            onOk={this.addLevel.bind(this)}
                            onCancel={this.closeLessonModalLevel.bind(this)}
                            okText="Хадгалах"
                            cancelText="Болих"
                            maskClosable={false}
                        >
                            <Form.Item
                                label='Нэр'
                            >
                                <Input autoFocus={true} size="middle" maxLength={60} value={level.title? level.title : ''} name='title' onChange={this.onChangeHandlerLevel.bind(this)} />
                            </Form.Item>
                        </Modal>
                        :
                        null
                    }
                    {openModalLevelTimline?
                        <Modal
                            title="Хөтөлбөр"
                            visible={openModalLevelTimline}
                            confirmLoading={timelineSubmitLoader}
                            onOk={this.submitTimeline.bind(this)}
                            onCancel={this.closeModalLevelTimline.bind(this)}
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
                                    label='Тайлбар'
                                    labelCol={{span: 4}}
                                    fieldKey='desc'
                                >
                                    <TextArea size="middle" rows={4}
                                              value={timeline.description ? timeline.description : ''}
                                              name='description'
                                              onChange={this.onChangeHandlerLevelTimeline.bind(this)}/>
                                    {/*<Input autoFocus={true} size="middle" maxLength={60} value={timeline.description? timeline.description : ''} name='description'*/}
                                    {/*       onChange={this.onChangeHandlerLevelTimeline.bind(this)}*/}
                                    {/*/>*/}
                                </Form.Item>
                                <Form.Item
                                    label='Төрөл'
                                    name='type'
                                    fieldKey='type'
                                    labelCol={{span: 4}}
                                >
                                    <span style={{display: "none"}}>{timeline.type? timeline.type : ''}</span>
                                    <Select
                                        value={timeline.type ? timeline.type : ''}
                                        onChange={this.onChangeHandlerLevelTimelineSelect.bind(this)}
                                    >
                                        {/*<Option value="">Төрөл сонгоно уу</Option>*/}
                                        <Option value="content">Контент</Option>
                                        <Option value="video">Бичлэг</Option>
                                        <Option value="audio">Аудио</Option>
                                    </Select>
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
                                {timeline.type?
                                    timeline.type === 'video'?
                                        <Form.Item
                                            label='Бичлэг'
                                            labelCol={{span: 4}}
                                        >
                                            <Upload
                                                // name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                disabled={videoUploadLoadingT}
                                                beforeUpload={this.beforeUploadVideo.bind(this)}
                                                customRequest={this.customRequestVideo.bind(this)}
                                            >
                                                {timelineVideo && timelineVideo.path ?
                                                    <img src={`${config.get('hostMedia')}${timelineVideo.thumbnail}`} alt="avatar" style={{ width: '100%' }} />
                                                    :
                                                    uploadButtonVideo
                                                }
                                            </Upload>
                                        </Form.Item>
                                        :
                                        timeline.type === 'audio'?
                                            <Form.Item
                                                label='Аудио'
                                                labelCol={{span: 4}}
                                            >
                                                <Upload
                                                    // name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    disabled={audioUploadLoadingT}
                                                    beforeUpload={this.beforeUploadAudio.bind(this)}
                                                    customRequest={this.customRequestAudio.bind(this)}
                                                >
                                                    {timelineAudio && timelineAudio.path ?
                                                        <div>{timelineAudio.original_name}</div>
                                                        :
                                                        uploadButtonAudio
                                                    }
                                                </Upload>
                                            </Form.Item>
                                            :
                                            timeline.type === 'content'?
                                                'CONTENT'
                                            :
                                            null
                                    :
                                    null
                                }
                                <Form.Item
                                    label='Татац'
                                    labelCol={{span: 4}}
                                >
                                    <Upload
                                        // name="avatar"
                                        listType="picture-card"
                                        // className="avatar-uploader"
                                        showUploadList={false}
                                        disabled={fileUploadLoadingT}
                                        beforeUpload={this.beforeUploadFile.bind(this)}
                                        customRequest={this.customRequestFile.bind(this)}
                                    >
                                        {timelineFile && timelineFile.path ?
                                            <div>{timelineFile.original_name}</div>
                                            :
                                            uploadButtonFile
                                        }
                                    </Upload>
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        null
                    }
                    {openEditTimeline && !editTimelineLoader?
                        <Modal
                            title="Хөтөлбөр"
                            visible={openEditTimeline}
                            confirmLoading={timelineSubmitLoader}
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
                                    label='Тайлбар'
                                    labelCol={{span: 4}}
                                    fieldKey='desc'
                                >
                                    <TextArea size="middle" rows={4}
                                              value={timeline.description ? timeline.description : ''}
                                              name='description'
                                              onChange={this.onChangeHandlerLevelTimeline.bind(this)}/>
                                    {/*<Input autoFocus={true} size="middle" maxLength={60} value={timeline.description? timeline.description : ''} name='description'*/}
                                    {/*       onChange={this.onChangeHandlerLevelTimeline.bind(this)}*/}
                                    {/*/>*/}
                                </Form.Item>
                                <Form.Item
                                    label='Төрөл'
                                    name='type'
                                    fieldKey='type'
                                    labelCol={{span: 4}}
                                >
                                    <span style={{display: "none"}}>{timeline.type? timeline.type : ''}</span>
                                    <Select
                                        value={timeline.type ? timeline.type : ''}
                                        onChange={this.onChangeHandlerLevelTimelineSelect.bind(this)}
                                    >
                                        {/*<Option value="">Төрөл сонгоно уу</Option>*/}
                                        <Option value="content">Контент</Option>
                                        <Option value="video">Бичлэг</Option>
                                        <Option value="audio">Аудио</Option>
                                    </Select>
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
                                {timeline.type?
                                    timeline.type === 'video'?
                                        <Form.Item
                                            label='Бичлэг'
                                            labelCol={{span: 4}}
                                        >
                                            <Upload
                                                // name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                disabled={videoUploadLoadingT}
                                                beforeUpload={this.beforeUploadVideo.bind(this)}
                                                customRequest={this.customRequestVideo.bind(this)}
                                            >
                                                {timelineVideo && timelineVideo.path ?
                                                    <img src={`${config.get('hostMedia')}${timelineVideo.thumbnail}`} alt="avatar" style={{ width: '100%' }} />
                                                    :
                                                    uploadButtonVideo
                                                }
                                            </Upload>
                                        </Form.Item>
                                        :
                                        timeline.type === 'audio'?
                                            <Form.Item
                                                label='Аудио'
                                                labelCol={{span: 4}}
                                            >
                                                <Upload
                                                    // name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    disabled={audioUploadLoadingT}
                                                    beforeUpload={this.beforeUploadAudio.bind(this)}
                                                    customRequest={this.customRequestAudio.bind(this)}
                                                >
                                                    {timelineAudio && timelineAudio.path ?
                                                        <div>{timelineAudio.original_name}</div>
                                                        :
                                                        uploadButtonAudio
                                                    }
                                                </Upload>
                                            </Form.Item>
                                            :
                                            timeline.type === 'content'?
                                                'CONTENT'
                                            :
                                            null
                                    :
                                    null
                                }
                                <Form.Item
                                    label='Татац'
                                    labelCol={{span: 4}}
                                >
                                    <Upload
                                        // name="avatar"
                                        listType="picture-card"
                                        // className="avatar-uploader"
                                        showUploadList={false}
                                        disabled={fileUploadLoadingT}
                                        beforeUpload={this.beforeUploadFile.bind(this)}
                                        customRequest={this.customRequestFile.bind(this)}
                                    >
                                        {timelineFile && timelineFile.path ?
                                            <div>{timelineFile.original_name}</div>
                                            :
                                            uploadButtonFile
                                        }
                                    </Upload>
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        null
                    }
                </div>
            </Card>


        );
    }
}
export default  connect(reducer)(LessonLevels);