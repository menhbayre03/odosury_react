import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/bundle_actions";


const reducer = ({ main, bundle }) => ({ main, bundle });
import {
    Card,
    Button,
    Avatar,
    Table,
    Modal,
    Form,
    Input,
    Select,
    Popconfirm,
    Upload,
    message,
    InputNumber,
    Progress,
} from 'antd';
import { EditOutlined, LoadingOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, SearchOutlined, CloseCircleFilled } from '@ant-design/icons'
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

class Bundle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            search: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(actions.getBundle({pageNum: this.state.pageNum, pageSize: this.state.pageSize}));
    }
    // componentWillUnmount() {
    //     this.props.dispatch(actions.closeTeacherModal());
    // }
    openModal(data) {
        const {bundle:{lessons}} = this.props;
        if(lessons && lessons.length>0){
            this.props.dispatch(actions.openBundleModal(data));
        } else {
            return config.get('emitter').emit('warning', ("Хичээл үүсгэнэ уу!"));
        }
    }
    closeModal() {
        this.props.dispatch(actions.closeBundleModal());
    }
    onChangeHandler(e) {
        this.props.dispatch(actions.bundleChangeHandler({name:e.target.name, value: e.target.value}));
    }
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.bundleChangeHandler({name:name, value: value}));
    }
    submitTeacher() {
        const {bundle:{bundle, bundleThumbnail}} = this.props;
        if(!bundleThumbnail || (bundleThumbnail && bundleThumbnail.path && bundleThumbnail.path.trim() === '')){
            return config.get('emitter').emit('warning', ("Зураг оруулна уу!"));
        }
        if(!bundle.title || (bundle.title && bundle.title.trim() === '')){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        if(!bundle.price || (bundle.price && bundle.price === 0)){
            return config.get('emitter').emit('warning', ("Үнэ оруулна уу!"));
        }
        if(!bundle.levels || (bundle.levels && bundle.levels.length < 1)){
            return config.get('emitter').emit('warning', ("Түвшин оруулна уу!"));
        } else {
            let check = false;
            bundle.levels.map(function (run) {
                if(!run.lessons || (run.lessons && run.lessons.length < 1)){
                    check = true;
                }
            });
            if(check){
                return config.get('emitter').emit('warning', ("Түвшиндээ хичээл оруулна уу!"));
            }
        }
        let cc = {
            ...bundle,
            thumbnail: bundleThumbnail._id,
            bundleThumbnail: bundleThumbnail,
        };
        this.props.dispatch(actions.submitBundle(cc));
    }
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
    //upload
    customRequest(files) {
        const {main:{user}} = this.props;
        var id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadBundleThumbnail([files.file], 'image', id));
    }
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/JPEG' || file.type === 'image/PNG';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // levels
    addBundleLevel(){
        const {bundle:{bundleLevelName}} = this.props;
        if(!bundleLevelName || (bundleLevelName && bundleLevelName==='')){
            return config.get('emitter').emit('warning', ("Түвшний нэр оруулна уу!"));
        }
        this.props.dispatch(actions.addBundleLevel());
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
    addSingleOrts(idx){
        const {bundle:{lessonValue}} = this.props;
        if(!lessonValue || (lessonValue && lessonValue.value && lessonValue.value === '')){
            return config.get('emitter').emit('warning', ("Хичээл сонгоно уу!"));
        }
        this.props.dispatch(actions.addLessonToBundleLevels({index: idx}));
    }
    changeState(e, value, idx){
        if(e === 'bundleLevelName'){
            this.props.dispatch(actions.bundleLevelOnChange({name:e, value: value.target.value}));
        } else if(e === 'lessons'){
            this.props.dispatch(actions.bundleLevelOnChange({name:e, value: idx, index:value}));
        }
    }
    render() {
        let { main:{user}, bundle:{status, openModal, bundleLevelName, bundle, bundles, lessonValue, submitBundleLoader, all, imageUploadLoading, lessons, bundleThumbnail, bundleThumbnailProgress} } = this.props;
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
        //         key: 'created',
        //         title: 'Огноо',
        //         render: (text, record, idx) => (
        //             record.created ? moment(record.created).format('YYYY-MM-DD') : '-'
        //         ),
        //     },
        //     {
        //         title: 'Үйлдэл',
        //         key: 'action',
        //         render: (text, record) => (
        //             <div style={{width: 240}}>
        //
        //                 <Button size={"small"} style={{marginRight: 10}} key={record._id+'edit'} loading={!!record.loading}
        //                         onClick = {this.openModal.bind(this, record )}
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
        // //upload
        const uploadButton = (
            <div style={{fontSize: 24}}>
                {imageUploadLoading ?
                    <React.Fragment>
                        <LoadingOutlined />
                        {bundleThumbnailProgress && bundleThumbnailProgress.percent?
                            <Progress percent={bundleThumbnailProgress.percent} size="small" />
                            :
                            <Progress percent={0} size="small" />
                        }
                    </React.Fragment>
                    :
                    <PlusOutlined />
                    }
            </div>
        );
        let avatar = '/images/default-bundle.png';
        if (bundleThumbnail && bundleThumbnail.path !== '') {
            avatar = `${config.get('hostMedia')}${bundleThumbnail.path}`;
        }
        console.log('lessonValue')
        console.log(lessonValue)
        return (
            <Card
                title="Багц"
                bordered={true}
                loading={false}
                extra={
                    <Button type="primary" icon={<PlusOutlined />}
                            onClick={this.openModal.bind(this, {})}
                    >
                        Багц
                    </Button>
                }
            >

                {bundles && bundles.length>0?
                    bundles.map(run =>
                        <Card
                            style={{ width: 200, display: 'inline-block', marginRight: 40 }}
                            hoverable
                            cover={
                                <img
                                    // alt="example"
                                    style={{width: '100%'}}
                                    src={`${config.get('hostMedia')}${run.thumbnail.path}`}
                                />
                            }
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteFilled key='delete' />
                            ]}
                        >
                            <Meta
                                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={run.title}
                                description={`Үнэ: ${run.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮`}

                            />
                        </Card>
                    )
                    :
                    null
                }




                {/*<div style={{marginBottom: 20}}>*/}
                {/*    <Input maxLength={60} size='small' placeholder='Нэр, имэйл' style={{width: 200, marginRight: 20}} value={this.state.search} name='search' onChange={(e) => this.setState({search: e.target.value})} />*/}
                {/*    <Button type="primary" size='small' icon={<SearchOutlined />} onClick={this.searchTeacher.bind(this)} >Хайх</Button>*/}
                {/*</div>*/}

                {/*<Table size="small" dataSource={bundles} columns={columns} onChange={this.tableOnChange.bind(this)} pagination={pagination} />*/}
                <Modal
                    title="Багш"
                    visible={openModal}
                    onOk={this.submitTeacher.bind(this)}
                    onCancel={this.closeModal.bind(this)}
                    okText="Хадгалах"
                    cancelText="Болих"
                    confirmLoading={submitBundleLoader}
                    maskClosable={false}
                >

                    <Form.Item
                        label='Зураг'
                        labelCol={{span: 5}}
                    >
                        <Upload
                            name="thumbnail"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            disabled={imageUploadLoading}
                            beforeUpload={this.beforeUpload.bind(this)}
                            customRequest={this.customRequest.bind(this)}
                        >
                            {bundleThumbnail && bundleThumbnail.path ?
                                <img
                                    onError={(e) => e.target.src = `/images/default-bundle.png`}
                                    src={avatar}
                                    style={{ width: '100%' }}
                                />
                                :
                                uploadButton
                            }
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label='Нэр'
                        labelCol={{span: 5}}
                    >
                        <Input maxLength={60} value={bundle.title? bundle.title : ''} name='title' onChange={this.onChangeHandler.bind(this)} />
                    </Form.Item>
                    <Form.Item
                        label='Үнэ'
                        labelCol={{span: 5}}
                    >
                        <InputNumber
                            size="middle"
                            style={{width: '100%'}}
                            name='price'
                            min={0}
                            max={1000000000}
                            value={bundle.price ? bundle.price.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                            formatter={value => `${value}₮`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            onChange={this.onChangeHandle2.bind(this, 'price')}
                        />
                    </Form.Item>
                    <Form.Item
                            label='Хямдрал'
                        labelCol={{span: 5}}
                    >
                        <InputNumber
                            size="middle"
                            style={{width: '100%'}}
                            name='sale'
                            min={0}
                            max={1000000000}
                            value={bundle.sale ? bundle.sale.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                            formatter={value => `${value}₮`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            onChange={this.onChangeHandle2.bind(this, 'sale')}
                        />
                    </Form.Item>
                    <Form.Item
                            label='Түвшин'
                        labelCol={{span: 5}}
                    >
                        <Input
                            type="text"
                            ref="textInput"
                            name="bundleLevelName"
                            placeholder='Түвшний нэр'
                            style={{width: '100%', marginBottom: 10}}
                            value={bundleLevelName}
                            onChange={this.changeState.bind(this, 'bundleLevelName')}
                        />
                        <Button size='small' style={{width: 120, float: 'right'}}
                                onClick={this.addBundleLevel.bind(this, 'bundleLevelName')}>
                            <PlusOutlined/> Түвшин
                        </Button>

                        {bundle.levels && bundle.levels.length>0?
                            bundle.levels.map((run, idx) =>
                                <div key={idx+'levels'}>
                                    <div>{run.title}</div>
                                    <div className='bundle-level-outer'>
                                        {run.lessons && run.lessons.length > 0 ?
                                            run.lessons.map((run, idx) =>
                                                <div className='orts-inner' key={idx + 'afro'}>
                                                    {`${idx + 1}. ${run}`}
                                                    <div className='action'
                                                         // onClick={this.removeSingleOrts.bind(this, idx, 'lesson')}
                                                    >
                                                        <CloseCircleFilled/></div>
                                                </div>
                                            )
                                            :
                                            <div className='orts-inner' key='no-orts'
                                                 style={{opacity: '0.7'}}>
                                                Хичээл оруулна уу
                                            </div>
                                        }
                                    </div>
                                    {/*<Input*/}
                                    {/*    type="text"*/}
                                    {/*    ref="textInput"*/}
                                    {/*    name="learn_check_list"*/}
                                    {/*    placeholder='React'*/}
                                    {/*    style={{width: '100%', marginBottom: 10}}*/}
                                    {/*    value={this.state.learn_check_list}*/}
                                    {/*    onChange={this.changeState.bind(this)}*/}
                                    {/*/>*/}
                                    <Select
                                        value={lessonValue.value && lessonValue.index === idx ? lessonValue.value : ''}
                                        // onChange={this.onChangeHandlerLevelTimelineSelect.bind(this)}
                                        name="lessons"
                                        onChange={this.changeState.bind(this, 'lessons', idx)}
                                    >
                                        <Option value="">Хичээл сонгоно уу</Option>
                                        {lessons.length>0?
                                            lessons.map(les =>
                                                <Option value={les._id}>{les.title}</Option>
                                            )
                                            :
                                            null
                                        }
                                    </Select>
                                    <Button size='small' style={{width: 120, float: 'right'}}
                                            onClick={this.addSingleOrts.bind(this, idx)}>
                                        <PlusOutlined/> Нэмэх
                                    </Button>
                                </div>
                            )
                            :
                            null
                        }
                    </Form.Item>
                </Modal>

            </Card>
        );
    }
}

export default  connect(reducer)(Bundle);