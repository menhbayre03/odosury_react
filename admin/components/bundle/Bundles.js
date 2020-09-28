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
import { EditOutlined, LoadingOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, SearchOutlined, CloseCircleFilled, UploadOutlined } from '@ant-design/icons'
import MediaLib from "../media/MediaLib";
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
            mediaType: '',
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
        if(bundle.sale > bundle.price){
            return config.get('emitter').emit('warning', ("Хямдрал үнэ-ээс их байж болохгүй!"));
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
    delete(id){
        this.props.dispatch(actions.deleteBundle({_id:id, pageSize: this.state.pageSize, pageNum: this.state.pageNum}));
    }
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
    removeSingleOrts(index, name, lessonId){
            this.props.dispatch(actions.removeSingleOrts({name: name, index: index, lessonId:lessonId}));
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
    //MediaLibrary
    openMediaLib(mediaType){
        this.setState({mediaType})
    }
    chooseMedia(data, type){
        this.props.dispatch(actions.chooseMedia({data: data, medType:type}));
    }
    removeUploadedFile(name) {
        this.props.dispatch(actions.removeUploadedFile({name: name}));
        return false;
    };
    render() {
        let { main:{user}, bundle:{status, openModal, bundleLevelName, bundle, bundles, lessonValue, submitBundleLoader, all, imageUploadLoading, lessons, bundleThumbnail, bundleThumbnailProgress} } = this.props;
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
                            loading={run.loading}
                            cover={
                                <img
                                    // alt="example"
                                    onError={(e) => e.target.src = `/images/default-bundle.png`}
                                    style={{width: '100%'}}
                                    src={`${config.get('hostMedia')}${run.thumbnail.path}`}
                                />
                            }
                            actions={[
                                <span onClick={this.openModal.bind(this, run)}>
                                    <EditOutlined key="edit" />
                                </span>,
                                <Popconfirm
                                    title={`Та устгах гэж байна!`}
                                    onConfirm={this.delete.bind(this, run._id)}
                                    okText="Усгах"
                                    placement="left"
                                    cancelText="Болих"
                                >
                                    <span><DeleteFilled key='delete' /></span>
                                </Popconfirm>
                            ]}
                        >
                            <Meta
                                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={run.title}
                                description={
                                    <div>
                                        <div>{`Үнэ: ${run.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮`}</div>
                                        <div>Хямдрал: <span style={{color: '#d81c1c'}}>{run.sale ? `${run.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮` : '0₮'} </span></div>
                                    </div>
                                }
                            />
                        </Card>
                    )
                    :
                    null
                }

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
                        {/*<Upload*/}
                        {/*    name="thumbnail"*/}
                        {/*    listType="picture-card"*/}
                        {/*    className="avatar-uploader"*/}
                        {/*    showUploadList={false}*/}
                        {/*    disabled={imageUploadLoading}*/}
                        {/*    beforeUpload={this.beforeUpload.bind(this)}*/}
                        {/*    customRequest={this.customRequest.bind(this)}*/}
                        {/*>*/}
                        {/*    {bundleThumbnail && bundleThumbnail.path ?*/}
                        {/*        <img*/}
                        {/*            onError={(e) => e.target.src = `/images/default-bundle.png`}*/}
                        {/*            src={avatar}*/}
                        {/*            style={{ width: '100%' }}*/}
                        {/*        />*/}
                        {/*        :*/}
                        {/*        uploadButton*/}
                        {/*    }*/}
                        {/*</Upload>*/}
                        <div>
                            <Button onClick={this.openMediaLib.bind(this, 'image')} style={{marginBottom: 10}}>
                                <UploadOutlined /> {bundleThumbnail && bundleThumbnail._id? 'Солих' : 'Зураг'}
                            </Button>
                            {bundleThumbnail && bundleThumbnail._id ?
                                <div className='uploaded-i'>
                                                                    <span className='uploaded-i-image'>
                                                                        <img src={`${config.get('hostMedia')}${bundleThumbnail.path}`} />
                                                                    </span>
                                    <span onClick={this.removeUploadedFile.bind(this, 'bundleThumbnail')} className='uploaded-i-action'>
                                                                        <DeleteFilled />
                                                                    </span>
                                </div>
                                :
                                null
                            }
                        </div>
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
                        <div className='bundle-levels'>
                            <Input
                                type="text"
                                ref="textInput"
                                name="bundleLevelName"
                                placeholder='Түвшний нэр'
                                style={{width: '100%', marginBottom: 10}}
                                value={bundleLevelName}
                                onChange={this.changeState.bind(this, 'bundleLevelName')}
                            />
                            <div className='bundle-levels-add'>
                                <Button size='small' style={{width: 120}}
                                        onClick={this.addBundleLevel.bind(this, 'bundleLevelName')}>
                                    <PlusOutlined/> Түвшин
                                </Button>
                            </div>

                            {bundle.levels && bundle.levels.length>0?
                                bundle.levels.map((run, idx) =>
                                    <div className='levels' key={idx+'levels'}>
                                        <div className='level-title'>
                                            {run.title}
                                            <Button size='small' danger style={{float: "right"}}
                                                    onClick={this.removeSingleOrts.bind(this, idx, 'bundleLevel', '' )}>
                                                <DeleteFilled/> Устгах
                                            </Button>
                                        </div>
                                        <div className='bundle-level-outer'>
                                            {run.lessons && run.lessons.length > 0 ?
                                                run.lessons.map((innerRun, innerIdx) =>
                                                    <div className='orts-inner' key={innerIdx + 'afro'}>
                                                        <span>{innerIdx + 1}. {lessons && lessons.length>0? lessons.filter(les => les._id.toString() === innerRun.toString())[0].title : innerRun}</span>
                                                        <div className='action'
                                                            onClick={this.removeSingleOrts.bind(this, idx, 'lessons', innerRun)}
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
                                        <div className='timeline-select'>
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
                                        </div>
                                        <div className='timeline-add-btn'>
                                            <Button size='small' style={{width: 120}}
                                                    onClick={this.addSingleOrts.bind(this, idx)}>
                                                <PlusOutlined/> Нэмэх
                                            </Button>
                                        </div>
                                    </div>
                                )
                                :
                                null
                            }
                        </div>
                    </Form.Item>
                </Modal>

                {this.state.mediaType !== ''?
                    <MediaLib
                        visible={this.state.mediaType != ''}
                        multi={false}
                        onOk={this.chooseMedia.bind(this)}
                        type={this.state.mediaType}
                        dimension={{width:1200, height: 450}}
                        forWhat='bundle'
                        onHide={() => this.setState({mediaType: ''})}
                    />
                    :
                    null
                }
            </Card>
        );
    }
}

export default  connect(reducer)(Bundle);