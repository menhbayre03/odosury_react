import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import * as actions from "../../actions/lesson_actions";

const reducer = ({ main, lesson }) => ({ main, lesson });
import { Card, Button, Switch, Form, Input, Select, Progress, Spin, Row, Col, TreeSelect, InputNumber, Steps, message } from 'antd';
import { DeleteFilled, PlusOutlined, UploadOutlined, CloseCircleFilled, LoadingOutlined, CheckCircleFilled, CaretRightFilled, CaretLeftFilled } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react';
import MediaLib from "../media/MediaLib";
const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const { Step } = Steps;

class LessonEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            search: '',
            search_user: '',
            selectedMember: props.lesson.lesson.teacher,
            requirementsArray: (props.lesson.lesson.requirements || []),
            requirement: '',
            learn_check_listArray: (props.lesson.lesson.learn_check_list || []),
            learn_check_list: '',
            holdEditor: '',
            mediaType: '',
            current: 0,
            //upload
            loading: false,
            forWhat: ''
        };
    }
    componentWillUnmount() {
        this.setState({
            pageNum: 0,
            pageSize: 50,
            search: '',
            search_user: '',
            selectedMember: {},
            requirementsArray: [],
            requirement: '',
            learn_check_listArray: [],
            learn_check_list: '',
            current: 0,
            loading: false,
        });
        this.editor = null;
        this.editorCb = null;
        this.props.dispatch(actions.closeLessonModal());
    }
    closeModal() {
        this.props.dispatch(actions.closeLessonModal());
    }
    onChangeHandler(e) {
        this.props.dispatch(actions.lessonChangeHandler({name:e.target.name, value: e.target.value}));
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
        const {lesson:{searchTeachersResult}} = this.props;
        this.setState({selectedMember: ((searchTeachersResult || []).filter(run => run._id.toString() === item.toString())[0] || {}) });
    };
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.lessonChangeHandler({name:name, value: value}));
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
        const {lesson:{ lesson }} = this.props;
        const { selectedMember } = this.state;
        if(this.state.current === 0){
            let content = (this.editor || {}).editor.getContent({format:'raw'});
            if(!lesson.title || (lesson.title && lesson.title.trim() === '' )){
                return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
            }
            if(!lesson.description || (lesson.description && lesson.description.trim() === '' )){
                return config.get('emitter').emit('warning', ("Танилцуулга оруулна уу!"));
            }
            if(!content || content === '' || content === '<p><br data-mce-bogus="1"></p>' ){
                return config.get('emitter').emit('warning', ("Дэлгэрэнгүй танилцуулга оруулна уу!"));
            }
            this.setState({holdEditor: content});
        }
        if(this.state.current === 1){
            if(!selectedMember || !selectedMember._id){
                return config.get('emitter').emit('warning', ("Багш сонгоно уу!"));
            }
            if(!lesson.price || (lesson.price && lesson.price === 0 )){
                return config.get('emitter').emit('warning', ("Үнэ оруулна уу!"));
            }
            if(lesson.sale && lesson.sale > lesson.price){
                return config.get('emitter').emit('warning', ("Хямдрал үнэ-ээс их байж болохгүй!"));
            }
        }
        if(this.state.current === 2){
            if(!this.state.requirementsArray || (this.state.requirementsArray && this.state.requirementsArray.length<1 )){
                return config.get('emitter').emit('warning', ("Шаардлагатай зүйлс оруулна уу!"));
            }
            if(!this.state.learn_check_listArray || (this.state.learn_check_listArray && this.state.learn_check_listArray.length<1 )){
                return config.get('emitter').emit('warning', ("Сурах зүйлс оруулна уу!"));
            }
        }
        const current = this.state.current + 1;
        this.setState({ current });

    }
    submitLesson(){
        const {lesson:{lesson, lessonImage, lessonSmallImage, lessonVideo}} = this.props;
        if(!lessonImage || !lessonImage.path || lessonImage.path === '' || !lessonImage.type || lessonImage.type !== 'image' ){
            return config.get('emitter').emit('warning', ("Том зураг оруулна уу!"));
        }
        if(!lessonSmallImage || !lessonSmallImage.path || lessonSmallImage.path === '' || !lessonSmallImage.type || lessonSmallImage.type !== 'image' ){
            return config.get('emitter').emit('warning', ("Жижиг зураг оруулна уу!"));
        }
        let cc = {
            ...lesson,
            selectedMember: this.state.selectedMember,
            intro_desc: (this.state.holdEditor || null),
            lessonImage: lessonImage,
            lessonSmallImage: lessonSmallImage,
            lessonVideo: (lessonVideo || {}),
            requirementsArray: this.state.requirementsArray,
            learn_check_listArray: this.state.learn_check_listArray
        };
        this.props.dispatch(actions.submitLesson(cc));
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
    setEish(e){
        this.props.dispatch(actions.setEish());
    }
    render() {
        let { main:{user}, lesson:{imageUploadLoading, lessonImage, lessonSmallImage, videoUploadLoading, lessonVideo, status, openModal, lessonVideoProgress, lessonImageProgress, lesson, lessons, submitLessonLoader, all, searchTeachersResult, searchTeacherLoader, categories, level} } = this.props;
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
                        <Button style={{ margin: '0 8px' }} loading={submitLessonLoader} onClick={this.prev.bind(this)}>
                            <CaretLeftFilled /> Өмнөх
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" loading={submitLessonLoader} onClick={this.next.bind(this)}>
                            <CaretRightFilled /> Дараах
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" loading={submitLessonLoader} onClick={this.submitLesson.bind(this)}>
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
                                                               value={lesson.title ? lesson.title : ''} name='title'
                                                               onChange={this.onChangeHandler.bind(this)}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Танилцуулга'
                                                    >
                                                        <TextArea size="middle" rows={2}
                                                                  value={lesson.description ? lesson.description : ''}
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
                                                            value={lesson.intro_desc}
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
                                                        label='Багш'
                                                    >
                                                        <Select
                                                            size="middle"
                                                            showSearch
                                                            style={{width: '100%'}}
                                                            value={this.state.search_user}
                                                            defaultActiveFirstOption={false}
                                                            placeholder="Овог нэр, имэйл "
                                                            showArrow={false}
                                                            filterOption={false}
                                                            onSearch={this.searchTeacher.bind(this, 'search_member')}
                                                            onChange={this.chooseMember.bind(this)}
                                                            notFoundContent={searchTeacherLoader ?
                                                                <Spin size="middle"/> : 'Багш олдсонгүй'}
                                                        >
                                                            {
                                                                searchTeachersResult && searchTeachersResult.length > 0 ? (
                                                                    searchTeachersResult.map(item => (
                                                                        <Select.Option
                                                                            key={item._id}
                                                                            value={item._id}> {`${item.last_name} ${item.first_name}`} </Select.Option>
                                                                    ))
                                                                ) : null
                                                            }
                                                        </Select>
                                                        {this.state.selectedMember && this.state.selectedMember._id ?
                                                            <div className='selected-member'>
                                                                <div className='inline_block'>
                                                                    <img
                                                                        onError={(e) => e.target.src = `/images/default-avatar.png`}
                                                                        src={avatar}/>
                                                                </div>
                                                                <div className='inline_block'>
                                                                    <div
                                                                        className='ner'>{(this.state.selectedMember.last_name || '')} {(this.state.selectedMember.first_name || '')}</div>
                                                                    <div>{(this.state.selectedMember.phone || '')}</div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='selected-member'>
                                                                <div className='inline_block'>
                                                                    <img
                                                                        onError={(e) => e.target.src = `/images/default-avatar.png`}
                                                                        src={avatar}/>
                                                                </div>
                                                                <div className='inline_block'>
                                                                    <div className='error'>Багш сонгоогүй байна!</div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='ЕЭШ'
                                                    >
                                                        <Switch checked={!!lesson.eish} onChange={this.setEish.bind(this)} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Ангилал'
                                                    >
                                                        <TreeSelect
                                                            size="middle"
                                                            treeDefaultExpandAll
                                                            showSearch
                                                            style={{width: '100%'}}
                                                            value={lesson.category}
                                                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                                            placeholder="Please select"
                                                            allowClear
                                                            onChange={this.onChangeHandle2.bind(this, 'category')}
                                                            disabled={lesson.eish}
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
                                                        <Switch checked={!!lesson.featured} onChange={this.setFeatured.bind(this)} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Үнэ'
                                                    >
                                                        <InputNumber
                                                            size="middle"
                                                            style={{width: '100%'}}
                                                            name='price'
                                                            min={0}
                                                            max={1000000000}
                                                            value={lesson.price ? lesson.price.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                                                            formatter={value => `${value}₮`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            onChange={this.onChangeHandle2.bind(this, 'price')}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Хямдрал'
                                                    >
                                                        <InputNumber
                                                            size="middle"
                                                            style={{width: '100%'}}
                                                            name='sale'
                                                            min={0}
                                                            max={1000000000}
                                                            value={lesson.sale ? lesson.sale.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                                                            formatter={value => `${value}₮`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            onChange={this.onChangeHandle2.bind(this, 'sale')}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            steps[current].content === 'requirement-content' ?
                                                <div className='requirement-content'>
                                                    <Form.Item
                                                        label='Шаардлагатай зүйлс'
                                                    >
                                                        <div>
                                                            <div className='orts-outer'>
                                                                {this.state.requirementsArray && this.state.requirementsArray.length > 0 ?
                                                                    this.state.requirementsArray.map((run, idx) =>
                                                                        <div className='orts-inner' key={idx + 'afro'}>
                                                                            {`${idx + 1}. ${run}`}
                                                                            <div className='action'
                                                                                 onClick={this.removeSingleOrts.bind(this, idx, 'requirement')}>
                                                                                <CloseCircleFilled/></div>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    <div className='orts-inner' key='no-orts'
                                                                         style={{opacity: '0.7'}}>
                                                                        Шаардлагатай зүйлсийг оруулаагүй байна.
                                                                    </div>
                                                                }
                                                            </div>
                                                            <Input
                                                                type="text"
                                                                ref="textInput"
                                                                name="requirement"
                                                                placeholder='Javascript'
                                                                style={{width: '100%', marginBottom: 10}}
                                                                value={this.state.requirement}
                                                                onChange={this.changeState.bind(this)}
                                                            />
                                                            <Button size='small' style={{width: 120, float: 'right'}}
                                                                    onClick={this.addSingleOrts.bind(this, 'requirement')}>
                                                                <PlusOutlined/> Нэмэх
                                                            </Button>
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Сурах зүйлс'
                                                    >
                                                        <div>
                                                            <div className='orts-outer'>
                                                                {this.state.learn_check_listArray && this.state.learn_check_listArray.length > 0 ?
                                                                    this.state.learn_check_listArray.map((run, idx) =>
                                                                        <div className='orts-inner' key={idx + 'afro'}>
                                                                            {`${idx + 1}. ${run}`}
                                                                            <div className='action'
                                                                                 onClick={this.removeSingleOrts.bind(this, idx, 'learn_check_list')}>
                                                                                <CloseCircleFilled/></div>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    <div className='orts-inner' key='no-orts'
                                                                         style={{opacity: '0.7'}}>
                                                                        Сурах зүйлсийг оруулаагүй байна.
                                                                    </div>
                                                                }
                                                            </div>
                                                            <Input
                                                                type="text"
                                                                ref="textInput"
                                                                name="learn_check_list"
                                                                placeholder='React'
                                                                style={{width: '100%', marginBottom: 10}}
                                                                value={this.state.learn_check_list}
                                                                onChange={this.changeState.bind(this)}
                                                            />
                                                            <Button size='small' style={{width: 120, float: 'right'}}
                                                                    onClick={this.addSingleOrts.bind(this, 'learn_check_list')}>
                                                                <PlusOutlined/> Нэмэх
                                                            </Button>
                                                        </div>
                                                    </Form.Item>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            steps[current].content === 'content-content' ?
                                                <div className='content-content'>
                                                    <Form.Item
                                                        label='Том зураг'
                                                        labelCol={{span: 4}}
                                                        help='Зурагны хэмжээ хамгийн багадаа 1200 x 450 байх'
                                                        style={{marginBottom: 10}}
                                                    >
                                                        <div>
                                                            <Button onClick={this.openMediaLib.bind(this, 'image', 'lesson')} style={{marginBottom: 10}}>
                                                                <UploadOutlined /> {lessonImage && lessonImage._id? 'Солих' : 'Зураг'}
                                                            </Button>
                                                            {lessonImage && lessonImage._id ?
                                                                <div className='uploaded-i'>
                                                                    <span className='uploaded-i-image'>
                                                                        <img src={`${config.get('hostMedia')}${lessonImage.path}`} />
                                                                    </span>
                                                                    <span onClick={this.removeUploadedFile.bind(this, 'lessonImage')} className='uploaded-i-action'>
                                                                        <DeleteFilled />
                                                                    </span>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Жижиг зураг'
                                                        labelCol={{span: 4}}
                                                        help='Зурагны хэмжээ хамгийн багадаа 800 x 450 байх'
                                                        style={{marginBottom: 10}}
                                                    >
                                                        <div>
                                                            <Button onClick={this.openMediaLib.bind(this, 'image', 'lessonSmall')} style={{marginBottom: 10}}>
                                                                <UploadOutlined /> {lessonSmallImage && lessonSmallImage._id? 'Солих' : 'Зураг'}
                                                            </Button>
                                                            {lessonSmallImage && lessonSmallImage._id ?
                                                                <div className='uploaded-i'>
                                                                    <span className='uploaded-i-image'>
                                                                        <img src={`${config.get('hostMedia')}${lessonSmallImage.path}`} />
                                                                    </span>
                                                                    <span onClick={this.removeUploadedFile.bind(this, 'lessonSmallImage')} className='uploaded-i-action'>
                                                                        <DeleteFilled />
                                                                    </span>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Бичлэг'
                                                        labelCol={{span: 4}}
                                                        className='upload-m'
                                                    >
                                                        <div>
                                                            <Button onClick={this.openMediaLib.bind(this, 'video')} style={{marginBottom: 10}}>
                                                                <UploadOutlined /> {lessonVideo && lessonVideo._id? 'Солих' : 'Бичлэг'}
                                                            </Button>
                                                            {lessonVideo && lessonVideo._id ?
                                                                <div className='uploaded-v'>
                                                                    <span className='uploaded-v-image'>
                                                                        <img src={`${config.get('hostMedia')}${lessonVideo.thumbnail}`} />
                                                                    </span>
                                                                    <span className='uploaded-v-name'>
                                                                        {lessonVideo.original_name}
                                                                    </span>
                                                                    <span onClick={this.removeUploadedFile.bind(this, 'lessonVideo')} className='uploaded-v-action'>
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
                        <Button style={{ margin: '0 8px' }} loading={submitLessonLoader} onClick={this.prev.bind(this)}>
                            <CaretLeftFilled /> Өмнөх
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" loading={submitLessonLoader} onClick={this.next.bind(this)}>
                            <CaretRightFilled /> Дараах
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" loading={submitLessonLoader} onClick={this.submitLesson.bind(this)}>
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

export default  connect(reducer)(LessonEdit);