import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lesson_actions";
import arrayMove from 'array-move';


import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const reducer = ({ main, lesson }) => ({ main, lesson });
import { Card, Button, List, Avatar, Table, Modal, Form, Input, Select, Popconfirm, Progress, Spin, Row, Col, TreeSelect, InputNumber, Steps, Upload, message } from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, DragOutlined, SearchOutlined, UploadOutlined, CloseCircleFilled, SolutionOutlined, LoadingOutlined, SmileOutlined, CheckCircleFilled, CaretRightFilled, CaretLeftFilled } from '@ant-design/icons'
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
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
            current: 0,
            //upload
            loading: false,
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
        // if(this.state.current === 0){
        //     if(!lesson.title || (lesson.title && lesson.title.trim() === '' )){
        //         return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        //     }
        //     if(!lesson.description || (lesson.description && lesson.description.trim() === '' )){
        //         return config.get('emitter').emit('warning', ("Танилцуулга оруулна уу!"));
        //     }
        //     if(!lesson.intro_desc || (lesson.intro_desc && lesson.intro_desc.trim() === '' )){
        //         return config.get('emitter').emit('warning', ("Дэлгэрэнгүй танилцуулга оруулна уу!"));
        //     }
        // }
        // if(this.state.current === 1){
        //     if(!selectedMember || !selectedMember._id){
        //         return config.get('emitter').emit('warning', ("Багш сонгоно уу!"));
        //     }
        //     if(!lesson.category || (lesson.category && lesson.category.trim() === '' )){
        //         return config.get('emitter').emit('warning', ("Ангилал сонгоно уу!"));
        //     }
        //     if(!lesson.price || (lesson.price && lesson.price === 0 )){
        //         return config.get('emitter').emit('warning', ("Үнэ оруулна уу!"));
        //     }
        //     if(lesson.sale && lesson.sale > lesson.price){
        //         return config.get('emitter').emit('warning', ("Хямдрал үнэ-ээс их байж болохгүй!"));
        //     }
        // }
        // if(this.state.current === 2){
        //     if(!this.state.requirementsArray || (this.state.requirementsArray && this.state.requirementsArray.length<1 )){
        //         return config.get('emitter').emit('warning', ("Шаардлагатай зүйлс оруулна уу!"));
        //     }
        //     if(!this.state.learn_check_listArray || (this.state.learn_check_listArray && this.state.learn_check_listArray.length<1 )){
        //         return config.get('emitter').emit('warning', ("Сурах зүйлс оруулна уу!"));
        //     }
        // }
        const current = this.state.current + 1;
        this.setState({ current });

    }
    submitLesson(){
        const {lesson:{lesson, lessonImage, lessonVideo}} = this.props;
        if(!lessonImage || !lessonImage.path || lessonImage.path === '' || !lessonImage.type || lessonImage.type !== 'image' ){
            return config.get('emitter').emit('warning', ("Зураг оруулна уу!"));
        }
        // if(!lessonVideo || !lessonVideo.path || lessonVideo.path === '' || !lessonVideo.type || lessonVideo.type !== 'video' ){
        //     return config.get('emitter').emit('warning', ("Бичлэг оруулна уу!"));
        // }
        let cc = {
            ...lesson,
            selectedMember: this.state.selectedMember,
            lessonImage: lessonImage,
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
    //upload
    customRequest(files) {
        const {main:{user}} = this.props;
        var id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadLessonImage([files.file], 'image', id));
    }
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/JPEG' || file.type === 'image/PNG';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('Image must smaller than 5MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    customRequestVideo(files) {
        const {main:{user}} = this.props;
        let id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadLessonVideo([files.file], 'video', id));
    }
    beforeUploadVideo(file) {
        const isJpgOrPng = file.type === 'video/mp4' || file.type === 'image/MP4';
        if (!isJpgOrPng) {
            message.error('You can only upload mp4 file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 200;
        if (!isLt2M) {
            message.error('Video must smaller than 200MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    render() {
        let { main:{user}, lesson:{imageUploadLoading, lessonImage, videoUploadLoading, lessonVideo, status, openModal, lessonVideoProgress, lessonImageProgress, lesson, lessons, submitLessonLoader, all, searchTeachersResult, searchTeacherLoader, categories, level} } = this.props;
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
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div style={{fontSize: 24}}>
                {imageUploadLoading ?
                    <React.Fragment>
                        <LoadingOutlined />
                        {lessonImageProgress && lessonImageProgress.percent?
                            <Progress percent={lessonImageProgress.percent} size="small" />
                            :
                            <Progress percent={0} size="small" />
                        }
                    </React.Fragment>
                    :
                    <PlusOutlined />
                }
            </div>
        );
        const uploadButtonVideo = (
            <div style={{fontSize: 24}}>
                {videoUploadLoading ?
                    <React.Fragment>
                        <LoadingOutlined />
                        {lessonVideoProgress && lessonVideoProgress.percent?
                            <Progress percent={lessonVideoProgress.percent} size="small" />
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
                                                        <TextArea size="middle" rows={4}
                                                                  value={lesson.intro_desc ? lesson.intro_desc : ''}
                                                                  name='intro_desc'
                                                                  onChange={this.onChangeHandler.bind(this)}/>
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
                                                        label='Ангилал'
                                                    >
                                                        <TreeSelect
                                                            size="middle"
                                                            showSearch
                                                            style={{width: '100%'}}
                                                            value={lesson.category}
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
                                                        label='Зураг'
                                                        help='Зурагны хэмжээ хамгийн багадаа 1200 x 450 байх'
                                                        style={{marginBottom: 10}}
                                                    >
                                                        <Upload
                                                            name="avatar"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            disabled={imageUploadLoading}
                                                            beforeUpload={this.beforeUpload.bind(this)}
                                                            customRequest={this.customRequest.bind(this)}
                                                        >
                                                            {lessonImage && lessonImage.path ? <img src={`${config.get('hostMedia')}${lessonImage.path}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                                        </Upload>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Бичлэг'
                                                    >
                                                        <Upload
                                                            name="avatar"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            disabled={videoUploadLoading}
                                                            beforeUpload={this.beforeUploadVideo.bind(this)}
                                                            customRequest={this.customRequestVideo.bind(this)}
                                                        >
                                                            {lessonVideo && lessonVideo.path ?
                                                                lessonVideoProgress && lessonVideoProgress.percent?
                                                                    <React.Fragment>
                                                                        <div>{lessonVideo.original_name ? lessonVideo.original_name : ''}</div>
                                                                        <Progress percent={lessonVideoProgress.percent} size="small" />
                                                                    </React.Fragment>
                                                                    :
                                                                    <Progress percent={0} size="small" />
                                                                :
                                                                uploadButtonVideo
                                                            }
                                                        </Upload>
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
            </div>

        );
    }
}

export default  connect(reducer)(LessonEdit);