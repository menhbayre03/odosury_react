import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import * as actions from "../../actions/audio_actions";
import { Card, Button, Switch, Form, Input, Select, Progress, Spin, Row, Col, TreeSelect, InputNumber, Steps, message } from 'antd';
import { DeleteFilled, PlusOutlined, UploadOutlined, CloseCircleFilled, LoadingOutlined, CheckCircleFilled, CaretRightFilled, CaretLeftFilled } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react';
import MediaLib from "../media/MediaLib";

const reducer = ({ main, audio }) => ({ main, audio });
const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const { Step } = Steps;

class AudioEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            holdEditor: '',
            mediaType: '',
            current: 0,
            loading: false,
            forWhat: ''
        };
    }
    componentWillUnmount() {
        this.setState({
            pageNum: 0,
            pageSize: 50,
            current: 0,
            loading: false,
        });
        this.editor = null;
        this.editorCb = null;
        this.props.dispatch(actions.closeAudioModal());
    }
    closeModal() {
        this.props.dispatch(actions.closeAudioModal());
    }
    onChangeHandler(e) {
        this.props.dispatch(actions.audioChangeHandler({name:e.target.name, value: e.target.value}));
    }
    searchTeacher(event, value){
        const {dispatch} = this.props;
        function submitSearch(aa){
            dispatch(actions.searchTeacher({search_user:aa}));
        }
        if (event === 'search_member' && value !== '') {
            this.setState({ search_user: value });
            clearTimeout(this.state.timeOut);
            let text = value;
            let timeOut = setTimeout(function(){
                submitSearch(text)
            }, 300);
            this.setState({
                timeOut:timeOut
            });
        }
    }

    chooseMember(item) {
        const {audio:{searchTeachersResult}} = this.props;
        this.setState({selectedMember: ((searchTeachersResult || []).filter(run => run._id.toString() === item.toString())[0] || {}) });
    };
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.audioChangeHandler({name:name, value: value}));
    }
    removeSingleOrts(index, name){
        if(name === 'requirement'){
            let hold = [];
            if(this.state.requirementsArray && this.state.requirementsArray.length>0){
                hold = this.state.requirementsArray.filter((run, idx) => idx !== index);
                this.setState({requirementsArray: hold})
            }
        }
        if(name === 'learn_check_list'){
            let hold = [];
            if(this.state.learn_check_listArray && this.state.learn_check_listArray.length>0){
                hold = this.state.learn_check_listArray.filter((run, idx) => idx !== index);
                this.setState({learn_check_listArray: hold})
            }
        }
    }
    addSingleOrts(name){
        if(name === 'requirement'){
            const {requirement} = this.state;
            let s = requirement.trim();
            if(s && s !== ''){
                let hold = this.state.requirementsArray;
                hold.push(s);
                this.setState({requirementsArray: hold, requirement:''});
            }
        }
        if(name === 'learn_check_list'){
            const {learn_check_list} = this.state;
            let s = learn_check_list.trim();
            if(s && s !== ''){
                let hold = this.state.learn_check_listArray;
                hold.push(s);
                this.setState({learn_check_listArray: hold, learn_check_list:''});
            }
        }
    }
    changeState(e, value){
        if (typeof e === 'string' || e instanceof String) {
            this.setState({ [e]: value});
        } else {
            this.setState({ [e.target.name]: e.target.value});
        }
    }
    next() {
        const {audio:{ audio }} = this.props;
        const { selectedMember } = this.state;
        if(this.state.current === 0){
            let content = (this.editor || {}).editor.getContent({format:'raw'});
            if(!audio.title || (audio.title && audio.title.trim() === '' )){
                return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
            }
            if(!audio.description || (audio.description && audio.description.trim() === '' )){
                return config.get('emitter').emit('warning', ("Танилцуулга оруулна уу!"));
            }
            if(!content || content === '' || content === '<p><br data-mce-bogus="1"></p>' ){
                return config.get('emitter').emit('warning', ("Дэлгэрэнгүй танилцуулга оруулна уу!"));
            }
            this.setState({holdEditor: content});
        }
        if(this.state.current === 1){
            if(!audio.category || (audio.category && audio.category.trim() === '' )){
                return config.get('emitter').emit('warning', ("Ангилал сонгоно уу!"));
            }
        }
        if(this.state.current === 2){
        }
        const current = this.state.current + 1;
        this.setState({ current });

    }
    submitLesson(){
        const {audio:{audio, audioImage }} = this.props;
        if(!audioImage || !audioImage.path || audioImage.path === '' || !audioImage.type || audioImage.type !== 'image' ){
            return config.get('emitter').emit('warning', ("Жижиг зураг оруулна уу!"));
        }
        let cc = {
            ...audio,
            intro_desc: (this.state.holdEditor || null),
            audioImage: audioImage,
        };
        this.props.dispatch(actions.submitAudio(cc));
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    removeUploadedFile(name) {
        this.props.dispatch(actions.removeUploadedFile({name: name}));
        return false;
    };



    //MediaLibrary
    openMediaLib(mediaType, forWhat){
        this.setState({mediaType, forWhat:forWhat})
    }
    chooseMedia(data, type){
        this.props.dispatch(actions.chooseMedia({data: data, medType:type, forWhat:this.state.forWhat}));
    }
    setFeatured(e){
        this.props.dispatch(actions.setFeatured());
    }
    render() {
        let { main:{user}, audio:{imageUploadLoading, audioImage, status, openModal, audioImageProgress, audio, audios, submitAudioLoader, all, searchTeachersResult, searchTeacherLoader, categories, level} } = this.props;
        let avatar = '/images/default-avatar.png';
        if (this.state.selectedMember && this.state.selectedMember.avatar && this.state.selectedMember.avatar !== '') {
            avatar = this.state.selectedMember.avatar;
        }
        const { current } = this.state;
        const steps = [
            {
                title: 'Танилцуулга',
                content: 'description-content',
            },
            {
                title: 'Тохиргоо',
                content: 'settings-content',
            },
            {
                title: 'Шаардлага',
                content: 'requirement-content',
            },
            {
                title: 'Контент',
                content: 'content-content',
            },
        ];
        //upload
        return (
            <div className='lesson-edit'>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} loading={submitAudioLoader} onClick={this.prev.bind(this)}>
                            <CaretLeftFilled /> Өмнөх
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" loading={submitAudioLoader} onClick={this.next.bind(this)}>
                            <CaretRightFilled /> Дараах
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" loading={submitAudioLoader} onClick={this.submitLesson.bind(this)}>
                            <CheckCircleFilled /> Хадгалах
                        </Button>
                    )}
                </div>
                <div className="steps-content">
                                <Row>
                                    <Col md={6} />
                                    <Col md={12}>
                                        {
                                            steps[current].content === 'description-content' ?
                                                <div className='description-content'>
                                                    <Form.Item
                                                        label='Нэр'
                                                        // labelCol={{span: 5}}
                                                    >
                                                        <Input autoFocus={true} size="middle" maxLength={60}
                                                               value={audio.title ? audio.title : ''} name='title'
                                                               onChange={this.onChangeHandler.bind(this)}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Танилцуулга'
                                                    >
                                                        <TextArea size="middle" rows={2}
                                                                  value={audio.description ? audio.description : ''}
                                                                  name='description'
                                                                  onChange={this.onChangeHandler.bind(this)}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Дэлгэрэнгүй танилцуулга'
                                                    >
                                                        <Editor
                                                            ref={(ref) => {
                                                                this.editor = ref;
                                                            }}
                                                            apiKey='xo6szqntkvg39zc2iafs9skjrw8s20sm44m28p3klgjo26y3'
                                                            height="350px"
                                                            value={audio.intro_desc}
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
                                                                body_class: 'tiny_editor'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            steps[current].content === 'settings-content' ?
                                                <div className='settings-content'>
                                                    <Form.Item
                                                        label='Ангилал'
                                                    >
                                                        <TreeSelect
                                                            size="middle"
                                                            treeDefaultExpandAll
                                                            showSearch
                                                            style={{width: '100%'}}
                                                            value={audio.category}
                                                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                                            placeholder="Please select"
                                                            allowClear
                                                            onChange={this.onChangeHandle2.bind(this, 'category')}
                                                        >
                                                            {categories && categories.length > 0 ?
                                                                categories.map((run, idx) =>
                                                                    <TreeNode value={`${run._id}`}
                                                                              title={run.title}>
                                                                        {run.child && run.child.length > 0 ?
                                                                            run.child.map(innerRun =>
                                                                                <TreeNode
                                                                                    value={`parent-${run._id}-${innerRun._id}`}
                                                                                    title={innerRun.title}/>
                                                                            )
                                                                            :
                                                                            null
                                                                        }
                                                                    </TreeNode>
                                                                )
                                                                :
                                                                null
                                                            }
                                                        </TreeSelect>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Онцлох'
                                                    >
                                                        <Switch checked={!!audio.featured} onChange={this.setFeatured.bind(this)} />
                                                    </Form.Item>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            steps[current].content === 'requirement-content' ?
                                                <div className='requirement-content'>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            steps[current].content === 'content-content' ?
                                                <div className='content-content'>
                                                    <Form.Item
                                                        label='Зураг'
                                                        labelCol={{span: 4}}
                                                        help='Зурагны хэмжээ хамгийн багадаа 250 x 400 байх'
                                                        style={{marginBottom: 10}}
                                                    >
                                                        <div>
                                                            <Button onClick={this.openMediaLib.bind(this, 'image', 'audio')} style={{marginBottom: 10}}>
                                                                <UploadOutlined /> {audioImage && audioImage._id? 'Солих' : 'Зураг'}
                                                            </Button>
                                                            {audioImage && audioImage._id ?
                                                                <div className='uploaded-i'>
                                                                    <span className='uploaded-i-image'>
                                                                        <img src={`${config.get('hostMedia')}${audioImage.path}`} />
                                                                    </span>
                                                                    <span onClick={this.removeUploadedFile.bind(this, 'audioImage')} className='uploaded-i-action'>
                                                                        <DeleteFilled />
                                                                    </span>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </Form.Item>
                                                </div>
                                                :
                                                null
                                        }
                                    </Col>
                                    <Col md={6}/>
                                </Row>

                </div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} loading={submitAudioLoader} onClick={this.prev.bind(this)}>
                            <CaretLeftFilled /> Өмнөх
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" loading={submitAudioLoader} onClick={this.next.bind(this)}>
                            <CaretRightFilled /> Дараах
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" loading={submitAudioLoader} onClick={this.submitLesson.bind(this)}>
                            <CheckCircleFilled /> Хадгалах
                        </Button>
                    )}
                </div>


                {this.state.mediaType !== ''?
                    <MediaLib
                        visible={this.state.mediaType != ''}
                        multi={false}
                        onOk={this.chooseMedia.bind(this)}
                        type={this.state.mediaType}
                        dimension={{width:1200, height: 450}}
                        forWhat={this.state.forWhat}
                        onHide={() => this.setState({mediaType: ''})}
                    />
                    :
                    null
                }
            </div>

        );
    }
}

export default  connect(reducer)(AudioEdit);
