import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lesson_actions";


const reducer = ({ main, lesson }) => ({ main, lesson });
import { Card, Button, Avatar, Table, Modal, Form, Input, Select, Popconfirm, Spin, Row, Col, TreeSelect, InputNumber, Steps } from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, SearchOutlined, CloseCircleFilled, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons'
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
            selectedMember: {},

            foodRequirementsArray: [],
            requirement: '',
            learn_check_listArray: [],
            learn_check_list: '',
            current: 0
        };
    }
    componentDidMount() {
        // this.props.dispatch(actions.getLesson({pageNum: this.state.pageNum, pageSize: this.state.pageSize}));
    }
    componentWillUnmount() {
        this.props.dispatch(actions.closeLessonModal());
    }
    openModal(data) {
        this.setState({ search_user: '', selectedMember: {}, foodRequirementsArray: [], requirement: '', learn_check_listArray: [], learn_check_list: '', });
        this.props.dispatch(actions.openLessonModal(data));
    }
    closeModal() {
        this.props.dispatch(actions.closeLessonModal());
    }
    onChangeHandler(e) {
        this.props.dispatch(actions.lessonChangeHandler({name:e.target.name, value: e.target.value}));
    }
    // submitTeacher() {
    //     const {teacher:{teacher}} = this.props;
    //     let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     const phoneRegex = /^[0-9]{8}$/;
    //     const nameRegex = /^[а-яА-Яa-zA-z үҮөӨёЁ-]*$/;
    //     if(!teacher.last_name || (teacher.last_name && teacher.last_name.trim() === '' )){
    //         return config.get('emitter').emit('warning', ("Овог оруулна уу!"));
    //     } else if((!nameRegex.test(teacher.last_name))){
    //         return config.get('emitter').emit('warning', ("Овог бичиглэл буруу байна!"));
    //     }
    //     if(!teacher.first_name || (teacher.first_name && teacher.first_name.trim() === '' )){
    //         return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
    //     } else if((!nameRegex.test(teacher.first_name))){
    //         return config.get('emitter').emit('warning', ("Нэр бичиглэл буруу байна!"));
    //     }
    //     if(!teacher.email){
    //         return config.get('emitter').emit('warning', ("Имэйл оруулна уу!"));
    //     } else if((!emailRegex.test(teacher.email))){
    //         return config.get('emitter').emit('warning', ("Имэйл бичиглэл буруу байна!"));
    //     }
    //     if(!teacher.phone){
    //         return config.get('emitter').emit('warning', ("Утас оруулна уу!"));
    //     } else if((!phoneRegex.test(teacher.phone))){
    //         return config.get('emitter').emit('warning', ("Утас бичиглэл буруу байна!"));
    //     }
    //     let cc = {
    //         _id: teacher._id,
    //         first_name: teacher.first_name,
    //         last_name: teacher.last_name,
    //         bio: teacher.bio,
    //         email: teacher.email,
    //         phone: teacher.phone,
    //         avatar: teacher.avatar,
    //         status: teacher.status,
    //     };
    //     console.log('cc');
    //     console.log(cc);
    //     this.props.dispatch(actions.submitTeacher(cc));
    // }
    // tableOnChange(data){
    //     const {dispatch } = this.props;
    //     this.setState({pageNum : data.current - 1});
    //     let cc = {
    //         pageNum:data.current - 1,
    //         pageSize:this.state.pageSize,
    //         search: this.state.search
    //     };
    //     this.props.dispatch(actions.getTeachers(cc));
    // }
    // searchTeacher(){
    //     const {dispatch } = this.props;
    //     this.setState({pageNum: 0});
    //     let cc = {
    //         pageNum:0,
    //         pageSize:this.state.pageSize,
    //         search: this.state.search
    //     };
    //     this.props.dispatch(actions.getTeachers(cc));
    // }
    // delete(id){
    //     this.props.dispatch(actions.deleteTeachers({_id:id, pageSize: this.state.pageSize, pageNum: this.state.pageNum}));
    // }
    searchTeacher(event, value){
        const {dispatch} = this.props;
        function submitSearch(aa){
            dispatch(actions.searchTeacher({search_user:aa}));
            // console.log('dis dis');
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
        // let val = (value || '').split('-');
        // let result = val[val.length - 1];
        this.props.dispatch(actions.lessonChangeHandler({name:name, value: value}));
    }

    removeSingleOrts(index, name){
        if(name === 'requirement'){
            let hold = [];
            if(this.state.foodRequirementsArray && this.state.foodRequirementsArray.length>0){
                hold = this.state.foodRequirementsArray.filter((run, idx) => idx !== index);
                this.setState({foodRequirementsArray: hold})
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
                let hold = this.state.foodRequirementsArray;
                hold.unshift(s);
                this.setState({foodRequirementsArray: hold, requirement:''});
            }
        }
        if(name === 'learn_check_list'){
            const {learn_check_list} = this.state;
            let s = learn_check_list.trim();
            if(s && s !== ''){
                let hold = this.state.learn_check_listArray;
                hold.unshift(s);
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
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        let { main:{user}, lesson:{status, openModal, lesson, lessons, submitLessonLoader, all, searchTeachersResult, searchTeacherLoader, categories} } = this.props;
        // let pagination = {
        //     total : all,
        //     current: this.state.pageNum + 1,
        //     pageSize : this.state.pageSize,
        //     position: 'bottom',
        //     showSizeChanger: false
        // };
        // const columns = [
        //     {
        //         key: 'num',
        //         title: '№',
        //         render: (text, record, idx) => (
        //             (this.state.pageNum * this.state.pageNum) + idx + 1
        //         ),
        //     },
        //     {
        //         key: 'last_name',
        //         title: 'Овог',
        //         render: (text, record) => (
        //             record.last_name ? record.last_name : '-'
        //         ),
        //     },
        //     {
        //         key: 'first_name',
        //         title: 'Нэр',
        //         render: (text, record) => (
        //             record.first_name ? record.first_name : '-'
        //         ),
        //     },
        //     {
        //         key: 'email',
        //         title: 'Имэйл',
        //         render: (text, record) => (
        //             record.email ? record.email : '-'
        //         ),
        //     },
        //     {
        //         key: 'phone',
        //         title: 'Утас',
        //         render: (text, record) => (
        //             record.phone ? record.phone : '-'
        //         ),
        //     },
        //     {
        //         title: 'Үйлдэл',
        //         key: 'action',
        //         render: (text, record) => (
        //             <div style={{width: 240}}>
        //
        //                 <Button size={"small"} style={{marginRight: 10}} key={record._id+'edit'} loading={!!record.loading}
        //                         onClick = {this.openModal.bind(this, record._id, record.first_name, record.last_name, record.bio, record.email, record.phone, record.avatar, record.status )}
        //                 >
        //                     <EditFilled /> Засах
        //                 </Button>
        //                 {/*{record.status !== 'active'?*/}
        //                 {/*    <Button size={"small"} type={"primary"} style={{marginRight: 10}}*/}
        //                 {/*            onClick = {this.changeCategoryStatus.bind(this, record._id, 'active')}*/}
        //                 {/*    >*/}
        //                 {/*        <EditFilled /> Идэвхжүүлэх*/}
        //                 {/*    </Button>*/}
        //                 {/*    :*/}
        //                 {/*    null*/}
        //                 {/*}*/}
        //                 <Popconfirm
        //                     title={`Та устгах гэж байна!`}
        //                     onConfirm={this.delete.bind(this, record._id)}
        //                     okText="Усгах"
        //                     placement="left"
        //                     cancelText="Болих"
        //                 >
        //                     <Button type={"primary"} key={record._id} danger size={"small"} loading={!!record.loading}>
        //                         <DeleteFilled/> Устгах
        //                     </Button>
        //                 </Popconfirm>
        //             </div>
        //         ),
        //         width: 240
        //     },
        // ];
        let avatar = '/images/default-avatar.png';
        if (this.state.selectedMember && this.state.selectedMember.avatar && this.state.selectedMember.avatar !== '') {
            avatar = this.state.selectedMember.avatar.indexOf('http') > -1 ? this.state.selectedMember.avatar : `https://amjilt.com${ this.state.selectedMember.avatar}`;
        }
        const { current } = this.state;
        const steps = [
            {
                title: 'Үндсэн тохиргоо',
                content: 'main-content',
            },
            {
                title: 'Контент',
                content: 'upload-content',
            },
            {
                title: 'Хичээл',
                content: 'lesson-content',
            },
        ];
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {
                        steps[current].content === 'main-content'?
                            <React.Fragment>
                                <Form.Item
                                    label='Нэр'
                                    // labelCol={{span: 5}}
                                >
                                    <Input autoFocus={true} size="small" maxLength={60} value={lesson.title? lesson.title : ''} name='title' onChange={this.onChangeHandler.bind(this)} />
                                </Form.Item>
                                <Form.Item
                                    label='Танилцуулга'
                                    // labelCol={{span: 5}}
                                    style={{marginBottom: 10}}
                                    help="Богино танилцуулга"
                                >
                                    {/*<Input size="small" maxLength={60} value={lesson.description? lesson.description : ''} name='description' onChange={this.onChangeHandler.bind(this)} />*/}
                                    <TextArea size="small" rows={2} value={lesson.description? lesson.description : ''} name='description' onChange={this.onChangeHandler.bind(this)} />
                                </Form.Item>
                                <Form.Item
                                    label='Дэлгэрэнгүй танилцуулга'
                                    // labelCol={{span: 5}}
                                    style={{marginBottom: 10}}
                                    help="Дэлгэрэнгүй танилцуулга"
                                >
                                    <TextArea size="small" rows={4} value={lesson.intro_desc? lesson.intro_desc : ''} name='intro_desc' onChange={this.onChangeHandler.bind(this)} />
                                </Form.Item>
                                <Form.Item
                                    label='Багш'
                                    // labelCol={{span: 5}}
                                    help="Овог нэр, имэйл"
                                    style={{marginBottom: 10}}
                                >
                                    <Select
                                        size="small"
                                        showSearch
                                        style={{width: '100%'}}
                                        value={this.state.search_user}
                                        defaultActiveFirstOption={false}
                                        placeholder="Овог нэр, имэйл "
                                        showArrow={false}
                                        filterOption={false}
                                        onSearch={this.searchTeacher.bind(this, 'search_member')}
                                        onChange={this.chooseMember.bind(this)}
                                        notFoundContent={searchTeacherLoader? <Spin size="small" /> :'Багш олдсонгүй'}
                                    >
                                        {
                                            searchTeachersResult && searchTeachersResult.length > 0 ? (
                                                searchTeachersResult.map(item => (
                                                    <Select.Option
                                                        // onClick={this.chooseMember.bind(this, item)}
                                                        key={item._id} value={item._id}> {`${item.last_name} ${item.first_name}`} </Select.Option>
                                                ))
                                            ) : null
                                        }
                                    </Select>
                                    {this.state.selectedMember && this.state.selectedMember._id?
                                        <div className='selected-member'>
                                            <Row>
                                                <Col md={6}><img onError={(e) => e.target.src = `/images/default-avatar.png`} src={avatar} /></Col>
                                                <Col md={18}>
                                                    <div className='adf'>{(this.state.selectedMember.last_name || '')} {(this.state.selectedMember.first_name || '')}</div>
                                                    <div>{(this.state.selectedMember.phone || '')}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                        :
                                        null
                                    }
                                </Form.Item>
                                <Form.Item
                                    label='Ангилал'
                                    // labelCol={{span: 5}}
                                >
                                    <TreeSelect
                                        size="small"
                                        showSearch
                                        style={{ width: '100%' }}
                                        value={lesson.category}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        onChange={this.onChangeHandle2.bind(this, 'category')}
                                    >
                                        {categories && categories.length>0?
                                            categories.map((run, idx) =>
                                                <TreeNode value={`parent-${run._id}`} title={run.title}>
                                                    {run.child && run.child.length > 0?
                                                        run.child.map(innerRun =>
                                                            <TreeNode value={`parent-${run._id}-${innerRun._id}`} title={innerRun.title} />
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
                                    // labelCol={{span: 5}}
                                    // help=""
                                >
                                    <InputNumber
                                        size="small"
                                        style={{width: '100%'}}
                                        name='price'
                                        min={0}
                                        max={1000000000}
                                        value={lesson.price? lesson.price.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                                        formatter={value => `${value}₮`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        onChange={this.onChangeHandle2.bind(this, 'price')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Хямдрал'
                                    // labelCol={{span: 5}}
                                    // help=""
                                >
                                    <InputNumber
                                        size="small"
                                        style={{width: '100%'}}
                                        name='sale'
                                        min={0}
                                        max={1000000000}
                                        value={lesson.sale? lesson.sale.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                                        formatter={value => `${value}₮`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        onChange={this.onChangeHandle2.bind(this, 'sale')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Шаардлагатай зүйлс'
                                    // labelCol={{span: 5}}
                                    help='Хичээлийг үзэхэд шаардлагатай зүйлс'
                                >
                                    <div>
                                        <div className='orts-outer'>
                                            {this.state.foodRequirementsArray && this.state.foodRequirementsArray.length>0?
                                                this.state.foodRequirementsArray.map((run, idx) =>
                                                    <div className='orts-inner' key={idx+'afro'}>
                                                        {`${idx+1}. ${run}`}
                                                        <div className='action' onClick={this.removeSingleOrts.bind(this, idx, 'requirement' )}><CloseCircleFilled /></div>
                                                    </div>
                                                )
                                                :
                                                <div className='orts-inner' key='no-orts' style={{opacity: '0.7'}}>
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
                                        <Button style={{width:120, float:'right'}} onClick={this.addSingleOrts.bind(this, 'requirement')}>
                                            <PlusOutlined /> Нэмэх
                                        </Button>
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    label='Сурах зүйлс'
                                    help='Энэ хичээлээс юу юу сурах вэ?'
                                    style={{marginBottom: 10}}
                                    // labelCol={{span: 5}}
                                >
                                    <div>
                                        <div className='orts-outer'>
                                            {this.state.learn_check_listArray && this.state.learn_check_listArray.length>0?
                                                this.state.learn_check_listArray.map((run, idx) =>
                                                    <div className='orts-inner' key={idx+'afro'}>
                                                        {`${idx+1}. ${run}`}
                                                        <div className='action' onClick={this.removeSingleOrts.bind(this, idx, 'learn_check_list')}><CloseCircleFilled /></div>
                                                    </div>
                                                )
                                                :
                                                <div className='orts-inner' key='no-orts' style={{opacity: '0.7'}}>
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
                                        <Button style={{width:120, float:'right'}} onClick={this.addSingleOrts.bind(this, 'learn_check_list')}>
                                            <PlusOutlined /> Нэмэх
                                        </Button>
                                    </div>
                                </Form.Item>
                            </React.Fragment>
                            :
                            steps[current].content

                    }
                </div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={this.prev.bind(this)}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={this.next.bind(this)}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
                {/*<Modal*/}
                {/*    title="Хичээл"*/}
                {/*    visible={openModal}*/}
                {/*    // onOk={this.submitTeacher.bind(this)}*/}
                {/*    onCancel={this.closeModal.bind(this)}*/}
                {/*    okText="Хадгалах"*/}
                {/*    cancelText="Болих"*/}
                {/*    confirmLoading={submitLessonLoader}*/}
                {/*    maskClosable={false}*/}
                {/*>*/}


                {/*</Modal>*/}
            </div>

        );
    }
}

export default  connect(reducer)(LessonEdit);