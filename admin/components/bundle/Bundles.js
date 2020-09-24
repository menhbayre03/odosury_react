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
    Progress
} from 'antd';
import { EditOutlined, LoadingOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, SearchOutlined } from '@ant-design/icons'
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
        // this.props.dispatch(actions.getTeachers({pageNum: this.state.pageNum, pageSize: this.state.pageSize}));
    }
    // componentWillUnmount() {
    //     this.props.dispatch(actions.closeTeacherModal());
    // }
    openModal(data) {
        this.props.dispatch(actions.openBundleModal(data));
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
    // submitTeacher() {
    //     const {bundle:{bundle}} = this.props;
    //     let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     const phoneRegex = /^[0-9]{8}$/;
    //     const nameRegex = /^[а-яА-Яa-zA-z үҮөӨёЁ-]*$/;
    //     // if(!bundle.avatar || (bundle.avatar && bundle.avatar.trim() === '' )){
    //     //     return config.get('emitter').emit('warning', ("Зураг оруулна уу!"));
    //     // }
    //     if(!bundle.last_name || (bundle.last_name && bundle.last_name.trim() === '' )){
    //         return config.get('emitter').emit('warning', ("Овог оруулна уу!"));
    //     } else if((!nameRegex.test(bundle.last_name))){
    //         return config.get('emitter').emit('warning', ("Овог бичиглэл буруу байна!"));
    //     }
    //     if(!bundle.first_name || (bundle.first_name && bundle.first_name.trim() === '' )){
    //         return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
    //     } else if((!nameRegex.test(bundle.first_name))){
    //         return config.get('emitter').emit('warning', ("Нэр бичиглэл буруу байна!"));
    //     }
    //     if(!bundle.email){
    //         return config.get('emitter').emit('warning', ("Имэйл оруулна уу!"));
    //     } else if((!emailRegex.test(bundle.email))){
    //         return config.get('emitter').emit('warning', ("Имэйл бичиглэл буруу байна!"));
    //     }
    //     if(!bundle.phone){
    //         return config.get('emitter').emit('warning', ("Утас оруулна уу!"));
    //     } else if((!phoneRegex.test(bundle.phone))){
    //         return config.get('emitter').emit('warning', ("Утас бичиглэл буруу байна!"));
    //     }
    //     this.props.dispatch(actions.submitTeacher({...bundle}));
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
    render() {
        let { main:{user}, bundle:{status, openModal, bundle, bundles, submitBundleLoader, all, imageUploadLoading, bundleThumbnail, bundleThumbnailProgress} } = this.props;
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
        console.log('avatar');
        console.log(avatar);
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

                <Card
                    style={{ width: 300, display: 'inline-block', marginRight: 40 }}
                    hoverable
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <EditOutlined key="edit" />,
                        <DeleteFilled key='delete' />
                    ]}
                >
                    <Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
                <Card
                    style={{ width: 300, display: 'inline-block', marginRight: 40 }}
                    hoverable
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <EditOutlined key="edit" />,
                        <DeleteFilled key='delete' />
                    ]}
                >
                    <Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>


                {/*<div style={{marginBottom: 20}}>*/}
                {/*    <Input maxLength={60} size='small' placeholder='Нэр, имэйл' style={{width: 200, marginRight: 20}} value={this.state.search} name='search' onChange={(e) => this.setState({search: e.target.value})} />*/}
                {/*    <Button type="primary" size='small' icon={<SearchOutlined />} onClick={this.searchTeacher.bind(this)} >Хайх</Button>*/}
                {/*</div>*/}

                {/*<Table size="small" dataSource={bundles} columns={columns} onChange={this.tableOnChange.bind(this)} pagination={pagination} />*/}
                <Modal
                    title="Багш"
                    visible={openModal}
                    // onOk={this.submitTeacher.bind(this)}
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
                    {/*<Form.Item*/}
                    {/*    label='Нэр'*/}
                    {/*    labelCol={{span: 5}}*/}
                    {/*    // help=""*/}
                    {/*>*/}
                    {/*    <Input maxLength={60} value={bundle.first_name? bundle.first_name : ''} name='first_name' onChange={this.onChangeHandler.bind(this)} />*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item*/}
                    {/*    label='Танилцуулга'*/}
                    {/*    labelCol={{span: 5}}*/}
                    {/*    // help=""*/}
                    {/*>*/}
                    {/*    <TextArea rows={4} value={bundle.bio? bundle.bio : ''} name='bio' onChange={this.onChangeHandler.bind(this)} />*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item*/}
                    {/*    label='Имэйл'*/}
                    {/*    labelCol={{span: 5}}*/}
                    {/*    // help=""*/}
                    {/*>*/}
                    {/*    <Input maxLength={60} value={bundle.email? bundle.email : ''} name='email' onChange={this.onChangeHandler.bind(this)} />*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item*/}
                    {/*    label='Утас'*/}
                    {/*    labelCol={{span: 5}}*/}
                    {/*    // help=""*/}
                    {/*>*/}
                    {/*    <Input maxLength={8} type='text' value={bundle.phone? bundle.phone : ''} name='phone' onChange={this.onChangeHandler.bind(this)} />*/}
                    {/*</Form.Item>*/}
                </Modal>

            </Card>
        );
    }
}

export default  connect(reducer)(Bundle);