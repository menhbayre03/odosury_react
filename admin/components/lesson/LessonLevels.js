import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import * as actions from "../../actions/lessonLevel_actions";
import arrayMove from 'array-move';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const reducer = ({ main, lessonLevel }) => ({ main, lessonLevel });
import { Card, Button, Modal, Form, Popconfirm, Input, Select, InputNumber, Upload, message, Progress } from 'antd';
import { DeleteFilled, PlusOutlined, EditFilled, UploadOutlined, LoadingOutlined, CaretLeftFilled, PictureOutlined } from '@ant-design/icons'
import MediaLib from "../media/MediaLib";
const { TextArea } = Input;
const { Option } = Select;
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
            mediaType: '',
            foodImage: null,
        };
        this.editor = null;
        this.editorCb = null;
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
    closeModalLevelTimline() {
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
            if(!timelineVideo || !timelineVideo._id || timelineVideo._id === '' || !timelineVideo.type || timelineVideo.type !== 'video' ){
                return config.get('emitter').emit('warning', ("Бичлэг оруулна уу!"));
            }
        }
        if(timeline.type === 'audio') {
            if(!timelineAudio || !timelineAudio._id || timelineAudio._id === '' || !timelineAudio.type || timelineAudio.type !== 'audio' ){
                return config.get('emitter').emit('warning', ("Аудио оруулна уу!"));
            }
        }
        if(timeline.type === 'content') {
            let content = ((this.editor || {}).editor).getContent({format:'raw'});
            if(!content || content === '' ){
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
            timelineContent: timeline.type === 'content'? (content || null)  : null,
            timelineFile: timelineFile && timelineFile._id ? timelineFile : null
        };
        this.props.dispatch(actions.submitTimeline(cc));
    }
    onChangeHandlerLevelTimelineSelect(value){
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:'type', value: value}));
    };
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:name, value: value}));
    }
    deleteLevel(id) {
        const {lessonLevel:{lesson}} = this.props;
        this.props.dispatch(actions.deleteLevel({_id:lesson._id, level_id: id}));
    }
    removeTimeline(level_id, timeline_id) {
        const {lessonLevel:{lesson}} = this.props;
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
            dispatch(actions.orderLevels({collection: collection, sineLevel:aa, level_id: lesson.levels[collection]._id, _id: lesson._id}));
        }
    };
    removeUploadedFile(name) {
        this.props.dispatch(actions.removeUploadedFile({name: name}));
        return false;
    };

    onImageUpload(callback, value, meta){
        this.editorCb = callback;
        // //callback('myimage.jpg', {alt: 'My alt text'});
        // this.setState({editorMedia: true})
    }



    //MediaLibrary
    openMediaLib(mediaType){
        this.setState({mediaType})
    }
    chooseMedia(data, type){
        this.props.dispatch(actions.chooseMedia({data: data, medType:type}));
    }
    render() {
        let { lessonLevel:{editTimelineLoader, openEditTimeline, status, lesson, openModalLevel, level, orderLoader, openModalLevelTimline, timeline, timelineSubmitLoader, timelineVideo, timelineVideoProgress, videoUploadLoadingT, timelineAudio, timelineAudioProgress, audioUploadLoadingT , timelineFile, timelineFileProgress, fileUploadLoadingT } } = this.props;
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
                    <Button icon={<UploadOutlined />}>Upload</Button>
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
                    <Button icon={<UploadOutlined />}>Upload</Button>
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
                    <Button icon={<UploadOutlined />}>Upload</Button>
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
                                            loading={orderLoader.includes(run._id)}
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
                            title="Түвшин"
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
                                {timeline.type?
                                    timeline.type === 'video'?
                                        <Form.Item
                                            label='Бичлэг'
                                            labelCol={{span: 4}}
                                            className='upload-m'
                                        >
                                            <div>
                                                <Button onClick={this.openMediaLib.bind(this, 'video')} style={{marginBottom: 10}}>
                                                    <UploadOutlined /> {timelineVideo && timelineVideo._id? 'Солих' : 'Бичлэг'}
                                                </Button>
                                                {timelineVideo && timelineVideo._id ?
                                                    <div className='uploaded-v'>
                                                        <span className='uploaded-v-image'>
                                                            <img src={`${config.get('hostMedia')}${timelineVideo.thumbnail}`} />
                                                        </span>
                                                        <span className='uploaded-v-name'>
                                                            {timelineVideo.original_name}
                                                        </span>
                                                        <span onClick={this.removeUploadedFile.bind(this, 'timelineVideo')} className='uploaded-v-action'>
                                                            <DeleteFilled />
                                                        </span>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </Form.Item>
                                        :
                                        timeline.type === 'audio'?
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
                                            :
                                            timeline.type === 'content'?
                                                <Editor
                                                    ref={(ref) => {
                                                        this.editor = ref;
                                                    }}
                                                    apiKey='xo6szqntkvg39zc2iafs9skjrw8s20sm44m28p3klgjo26y3'
                                                    height="350px"
                                                    value={timeline.content}
                                                    init={{
                                                        height: "350px",
                                                        content_style: 'body { background-color: #f7f7f7;}' +
                                                            'img { max-width: 100%; }',
                                                        relative_urls: false,
                                                        remove_script_host: false,
                                                        plugins: 'image code paste link lists textcolor hr table emoticons advlist',
                                                        file_picker_callback: this.onImageUpload.bind(this),
                                                        file_picker_types: 'image',
                                                        paste_data_images: true,
                                                        paste_webkit_styles: "color font-size",
                                                        valid_elements: 'img[src],*[style]',
                                                        toolbar: 'undo redo | bold italic | fontsizeselect | alignleft aligncenter alignright | image media link | numlist bullist | forecolor backcolor | emoticons',
                                                        extended_valid_elements: "iframe[src|style|scrolling|class|width|height|name|align]",
                                                        color_cols: "5",
                                                        custom_colors: false,
                                                        body_class: 'tiny_editor',
                                                        formats: {
                                                            h1: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h2: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h3: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h4: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h5: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h6: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            p: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            bold: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            italic: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            code: {styles: {'font-family': "'Nunito', sans-serif"}}
                                                        }
                                                    }}
                                                />
                                                :
                                                null
                                    :
                                    null
                                }
                                <Form.Item
                                    label='Татац'
                                    labelCol={{span: 4}}
                                    className='upload-m'
                                >

                                    {/*<Upload*/}
                                    {/*    listType="picture"*/}
                                    {/*    disabled={fileUploadLoadingT}*/}
                                    {/*    beforeUpload={this.beforeUploadFile.bind(this)}*/}
                                    {/*    customRequest={this.customRequestFile.bind(this)}*/}
                                    {/*    onRemove={this.removeUploadedFile.bind(this, 'timelineFile')}*/}
                                    {/*    fileList={ timelineFile && timelineFile.path ? [{uid: timelineFile._id, name: timelineFile.original_name, url: `${config.get('hostMedia')}${timelineFile.thumbnail}`}] : []}*/}
                                    {/*>*/}
                                    {/*    {uploadButtonFile}*/}
                                    {/*</Upload>*/}
                                    <div>
                                        <Button onClick={this.openMediaLib.bind(this, 'file')} style={{marginBottom: 10}}>
                                            <UploadOutlined /> {timelineFile && timelineFile._id? 'Солих' : 'Татац'}
                                        </Button>
                                        {timelineFile && timelineFile._id ?
                                            <div className='uploaded-f'>
                                                <span className='uploaded-f-name'>
                                                    {timelineFile.original_name}
                                                </span>
                                                <span onClick={this.removeUploadedFile.bind(this, 'timelineFile')} className='uploaded-f-action'>
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
                                        <Option value="content">Контент</Option>
                                        <Option value="video">Бичлэг</Option>
                                        <Option value="audio">Аудио</Option>
                                    </Select>
                                </Form.Item>
                                {timeline.type?
                                    timeline.type === 'video'?
                                        <Form.Item
                                            label='Бичлэг'
                                            labelCol={{span: 4}}
                                            className='upload-m'
                                        >
                                            <div>
                                                <Button onClick={this.openMediaLib.bind(this, 'video')} style={{marginBottom: 10}}>
                                                    <UploadOutlined /> {timelineVideo && timelineVideo._id? 'Солих' : 'Бичлэг'}
                                                </Button>
                                                {timelineVideo && timelineVideo._id ?
                                                    <div className='uploaded-v'>
                                                        <span className='uploaded-v-image'>
                                                            <img src={`${config.get('hostMedia')}${timelineVideo.thumbnail}`} />
                                                        </span>
                                                        <span className='uploaded-v-name'>
                                                            {timelineVideo.original_name}
                                                        </span>
                                                        <span onClick={this.removeUploadedFile.bind(this, 'timelineVideo')} className='uploaded-v-action'>
                                                            <DeleteFilled />
                                                        </span>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </Form.Item>
                                        :
                                        timeline.type === 'audio'?
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
                                            :
                                            timeline.type === 'content'?
                                                <Editor
                                                    ref={(ref) => {
                                                        this.editor = ref;
                                                    }}
                                                    apiKey='xo6szqntkvg39zc2iafs9skjrw8s20sm44m28p3klgjo26y3'
                                                    height="350px"
                                                    value={timeline.content}
                                                    init={{
                                                        height: "350px",
                                                        content_style: 'body { background-color: #f7f7f7;}' +
                                                            'img { max-width: 100%; }',
                                                        relative_urls: false,
                                                        remove_script_host: false,
                                                        plugins: 'image code paste link lists textcolor hr table emoticons advlist',
                                                        // file_picker_callback: this.onImageUpload.bind(this),
                                                        file_picker_types: 'image',
                                                        paste_data_images: true,
                                                        paste_webkit_styles: "color font-size",
                                                        valid_elements: 'img[src],*[style]',
                                                        toolbar: 'undo redo | bold italic | fontsizeselect | alignleft aligncenter alignright | image media link | numlist bullist | forecolor backcolor | emoticons',
                                                        extended_valid_elements: "iframe[src|style|scrolling|class|width|height|name|align]",
                                                        color_cols: "5",
                                                        custom_colors: false,
                                                        body_class: 'tiny_editor',
                                                        formats: {
                                                            h1: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h2: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h3: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h4: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h5: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            h6: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            p: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            bold: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            italic: {styles: {'font-family': "'Nunito', sans-serif"}},
                                                            code: {styles: {'font-family': "'Nunito', sans-serif"}}
                                                        }
                                                    }}
                                                />
                                            :
                                            null
                                    :
                                    null
                                }
                                <Form.Item
                                    label='Татац'
                                    labelCol={{span: 4}}
                                    className='upload-m'
                                >

                                    {/*<Upload*/}
                                    {/*    listType="picture"*/}
                                    {/*    disabled={fileUploadLoadingT}*/}
                                    {/*    beforeUpload={this.beforeUploadFile.bind(this)}*/}
                                    {/*    customRequest={this.customRequestFile.bind(this)}*/}
                                    {/*    onRemove={this.removeUploadedFile.bind(this, 'timelineFile')}*/}
                                    {/*    fileList={ timelineFile && timelineFile.path ? [{uid: timelineFile._id, name: timelineFile.original_name, url: `${config.get('hostMedia')}${timelineFile.thumbnail}`}] : []}*/}
                                    {/*>*/}
                                    {/*    {uploadButtonFile}*/}
                                    {/*</Upload>*/}
                                    <div>
                                        <Button onClick={this.openMediaLib.bind(this, 'file')} style={{marginBottom: 10}}>
                                            <UploadOutlined /> {timelineFile && timelineFile._id? 'Солих' : 'Татац'}
                                        </Button>
                                        {timelineFile && timelineFile._id ?
                                            <div className='uploaded-f'>
                                                <span className='uploaded-f-name'>
                                                    {timelineFile.original_name}
                                                </span>
                                                <span onClick={this.removeUploadedFile.bind(this, 'timelineFile')} className='uploaded-f-action'>
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