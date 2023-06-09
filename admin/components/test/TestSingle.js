import React from "react";
import { connect } from 'react-redux';
import config from '../../config';
import {
    getTest, createTest, deleteTest,
    createQuestion, deleteQuestion, publishTest, publishQuestion,
    unpublishQuestion, unpublishTest, chooseMedia, getLessonsFromCategory, getTimelinesFromLessons
} from '../../actions/test_actions';
import {
    getCategory
} from "../../actions/category_actions";

const reducer = ({ main, test, media }) => ({ main, test, media });
import MediaLib from "../media/MediaLib";
import {
    Card, Empty, Popover,
    Table, Row, Col, Tag,
    Button, Popconfirm, Modal,
    Input, Drawer, Collapse,
    Select, Form, Tooltip,
    Switch, InputNumber
} from 'antd';
import {
    PlusOutlined, EyeOutlined, SaveOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined, UploadOutlined
} from '@ant-design/icons';
import TestSingleQuestion from "./TestSingleQuestion";
import TestSingleQuestions from "./TestSingleQuestions";
import conf from "./include/conf";
import SelectOne from "./include/SelectOne";
import SelectCategory from "./include/SelectCategory";
import SelectLesson from "./include/SelectLesson";
import SelectTimeline from "./include/SelectTimeline";

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            loadingTest: false,

            //FOR TEST
            _id: '',
            title: '',
            category: {},
            searchCategory: '',
            lessons: [],
            searchLesson: '',
            timelines: [],
            searchTimeline: '',
            secret: true,
            oneTime: true,
            hasCertificate: false,
            price: 0,
            duration: 0,
            percent: 100,
            easyQuestion: [],
            mediumQuestion: [],
            hardQuestion: [],
            proQuestion: [],
            needUpdate: false,
            status: '',
            // types: [
            //     'selectOne', 'selectMulti',
            //     'connectOne', 'connectMulti',
            //     'inputOne', 'inputMulti',
            // ],
            types: [
                'selectOne',
            ],
            difficulties: [
                'easy', 'medium', 'hard', 'pro'
            ],
            temp: {
                easy: {quantity: 0, type: '', adding: false},
                medium: {quantity: 0, type: '', adding: false},
                hard: {quantity: 0, type: '', adding: false},
                pro: {quantity: 0, type: '', adding: false},
            },

            questions: [],

            //FOR EDITING LIST ITEM
            editing: '',
            editingContent: '',

            // FOR QUESTION
            visible: false,
            questionType: '',
            questionDifficulty: '',
            questionPoint: 0,

            question_id: '',
            questionTitle: '',
            questionAnswers: [],
            questionCorrectAnswer:  '',
            questionTemp: '',

            // LOADERS
            questionSubmitLoading: false,
            testSubmitLoading: false,
            testUnpublishLoading: false,
            publishLoading: false,
            deleteQuestionLoading: '',
            publishQuestionLoading: '',
            unpublishQuestionLoading: '',

            // MEDIA
            mediaType: '',
            forWhat: '',
            modalImage: {},
            cardImage: {},

            //MODAL
            modalVisible: false
        };
        this.questionHandler = this.questionHandler.bind(this);
        this.propertyHandler = this.propertyHandler.bind(this);
        this.listItemHandler = this.listItemHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.changeParentState = this.changeParentState.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }
    componentDidMount() {
        let self = this;
        this.getTest = config.get('emitter').addListener('testSingleGetTest', function(data) {
            if (data.success) {
                self.setState({
                    loadingTest: false,
                    _id: (data.test || {})._id,
                    title: (data.test || {}).title,
                    secret: (data.test || {}).secret,
                    percent: (data.test || {}).percent,
                    oneTime: (data.test || {}).oneTime,
                    hasCertificate: (data.test || {}).hasCertificate,
                    price: (data.test || {}).price,
                    duration: (data.test || {}).duration,
                    easyQuestion: ((data.test || {}).easyQuestion || []),
                    mediumQuestion: ((data.test || {}).mediumQuestion || []),
                    hardQuestion: ((data.test || {}).hardQuestion || []),
                    proQuestion: ((data.test || {}).proQuestion || []),
                    questions: (data.questions || []),
                    lessons: ((data.test || {}).lessons || []),
                    category: ((data.test || {}).category || {}),
                    modalImage: ((data.test || {}).modalImage || {}),
                    cardImage: ((data.test || {}).cardImage || {}),
                    status: (data?.test?.status || 'idle')
                });
            }else{
                self.setState({loadingTest: false});
            }
        });
        if(((this.props.match || {}).params || {}).test !== 'new'){
            this.setState({
                loadingTest: true
            }, () => {
                this.props.dispatch(getTest({slug: ((this.props.match || {}).params || {}).test}));
            });
        }
    }
    componentWillUnmount() {
        this.setState({testSubmitLoading: false, questionSubmitLoading: false})
        this.getTest.remove();
    }
    // MEDIA METHOD
    openMediaLib(mediaType, forWhat){
        this.setState({mediaType, forWhat})
    }
    chooseMedia(data, type){
        if(this.state.forWhat === 'testModalImage'){
            this.setState({modalImage: data[0], needUpdate: true});
        }else{
            this.setState({cardImage: data[0], needUpdate: true});
        }
        // this.props.dispatch(chooseMedia({data: data, medType:type, forWhat:this.state.forWhat}));
    }
    // CLEAR
    clear() {
        this.setState({
            loadingTest: false,
            temp: {
                easy: {quantity: 0, type: '', adding: false},
                medium: {quantity: 0, type: '', adding: false},
                hard: {quantity: 0, type: '', adding: false},
                pro: {quantity: 0, type: '', adding: false},
            },
            editing: '',
            editingContent: '',
            visible: false,
            question_id: '',
            questionType: '',
            questionDifficulty: '',
            questionTitle: '',
            questionPoint: 0,
            questionAnswers: [],
            questionCorrectAnswer:  '',
            questionTemp: '',
            questionSubmitLoading: false,
            testSubmitLoading: false,
            timelines: []
        })
    }
    // METHOD WHICH LETS US CHANGE PARENT'S STATE
    questionHandler(obj, actionObj, action){
        if(obj){
            if(action === 'publish') {
                if(actionObj.loader && Object.keys(actionObj.loader).length > 0){
                    this.setState({
                        publishQuestionLoading: actionObj.loader
                    }, () => {
                        this.props.dispatch(publishQuestion({...obj})).then(c => {
                            if(c.json?.success){
                                let updatedQuestions = (this.state.questions || []).map(question => {
                                    if((c.json?._id || 'as').toString() !== (question._id || '').toString()){
                                        return question;
                                    }
                                    return {
                                        ...question,
                                        status: 'active'
                                    }
                                });
                                this.setState({
                                    questions: updatedQuestions,
                                    publishQuestionLoading: ''
                                })
                            }else{
                                this.setState({
                                    publishQuestionLoading: ''
                                })
                            }
                        });
                    })
                }
            }else if(action === 'unpublish'){
                if(actionObj.loader && Object.keys(actionObj.loader).length > 0){
                    if(this.state.status === 'active'){
                        if(!this.readyToPublish(actionObj.difficulty, actionObj.type)){
                            this.setState({
                                unpublishQuestionLoading: actionObj.loader
                            }, () => {
                                this.props.dispatch(unpublishQuestion({...obj})).then(c => {
                                    if(c.json?.success){
                                        let updatedQuestions = (this.state.questions || []).map(question => {
                                            if((c.json?._id || 'as').toString() !== (question._id || '').toString()){
                                                return question;
                                            }
                                            return {
                                                ...question,
                                                status: 'pause'
                                            }
                                        });
                                        this.setState({
                                            questions: updatedQuestions,
                                            unpublishQuestionLoading: ''
                                        })
                                    }else{
                                        this.setState({
                                            unpublishQuestionLoading: ''
                                        })
                                    }
                                });
                            })
                        }else{
                            config.get('emitter').emit('warning', 'Энэ асуултыг устгавал асуулт бүрдэхгүй тул боломжгүй');
                        }
                    }else{
                        this.setState({
                            unpublishQuestionLoading: actionObj.loader
                        }, () => {
                            this.props.dispatch(unpublishQuestion({...obj})).then(c => {
                                if(c.json?.success){
                                    let updatedQuestions = (this.state.questions || []).map(question => {
                                        if((c.json?._id || 'as').toString() !== (question._id || '').toString()){
                                            return question;
                                        }
                                        return {
                                            ...question,
                                            status: 'pause'
                                        }
                                    });
                                    this.setState({
                                        questions: updatedQuestions,
                                        unpublishQuestionLoading: ''
                                    })
                                }else{
                                    this.setState({
                                        unpublishQuestionLoading: ''
                                    })
                                }
                            });
                        })
                    }
                }
            }else if(action === 'delete'){
                if(actionObj.loader && Object.keys(actionObj.loader).length > 0){
                    if(this.state.status === 'active'){
                        if(!this.readyToPublish(actionObj.difficulty, actionObj.type)){
                            this.setState({
                                deleteQuestionLoading: actionObj.loader
                            }, () => {
                                this.props.dispatch(deleteQuestion({...obj})).then(c => {
                                    if(c.json?.success){
                                        let updatedQuestions = (this.state.questions || []).filter(question =>
                                            (c.json?._id || 'as').toString() !== (question._id || '').toString());
                                        this.setState({
                                            questions: updatedQuestions,
                                            deleteQuestionLoading: ''
                                        })
                                    }else{
                                        this.setState({
                                            deleteQuestionLoading: ''
                                        })
                                    }
                                });
                            })
                        }else{
                            config.get('emitter').emit('warning', 'Энэ асуултыг устгавал асуулт бүрдэхгүй тул боломжгүй');
                        }
                    }else{
                        this.setState({
                            deleteQuestionLoading: actionObj.loader
                        }, () => {
                            this.props.dispatch(deleteQuestion({...obj})).then(c => {
                                if(c.json?.success){
                                    let updatedQuestions = (this.state.questions || []).filter(question =>
                                        (c.json?._id || 'as').toString() !== (question._id || '').toString());
                                    this.setState({
                                        questions: updatedQuestions,
                                        deleteQuestionLoading: ''
                                    })
                                }else{
                                    this.setState({
                                        deleteQuestionLoading: ''
                                    })
                                }
                            });
                        })
                    }
                }
            }else if(action === 'edit'){
                this.setState({
                    ...obj
                })
            }
        }
    }
    // HANDLING LIST ITEM
    listItemHandler(type, parent, child, action, _id, data){
        let string = `${parent}${child}`;
        let initial = ((this.state || [])[string] || [])
        if(action === 'insert'){
            let updated = [...(initial || []), data];
            this.setState({[string]: updated});
        }else if(action === 'edit'){
            let updated = (initial || []).map(answer => {
                if((answer._id || 'as').toString() !== (_id || '').toString()){
                    return answer;
                }
                return {
                    ...answer,
                    ...data
                }
            });
            this.setState({[string]: updated});
        }else{
            let updated = {[string]: (initial || []).filter(answer => (answer._id || 'as').toString() !== (_id || '').toString())}
            if(type === 'selectOne' && updated.questionAnswers?.length === 0){
                updated.questionCorrectAnswer = '';
            }
            this.setState({...updated});
        }
    }
    propertyHandler(type, parent, child, action, _id, data, elementType){
        let string = `${parent}${child}`;
        let initial = (
            (this.state || [])[string] || (
                elementType === 'obj' ? {} :
                elementType === 'str' ? '' :
                elementType === 'num' ? '' :
                elementType === 'arr' ? [] : null));
        this.setState({[string]: data});
    }
    submit(e){
        if(!this.state.title || this.state.title === ''){
            config.get('emitter').emit('warning', 'Шалгалтын нэрийг оруулна уу.');
        }else if(this.state.hasCertificate && (!this.state.percent || this.state.percent === 0)){
            config.get('emitter').emit('warning', 'Хувийг оруулна уу.');
        }else if(((this.state.easyQuestion || []).length + (this.state.mediumQuestion || []).length +
            (this.state.hardQuestion || []).length + (this.state.proQuestion || []).length) === 0){
            config.get('emitter').emit('warning', 'Шалгалтын асуултуудын тоог оруулна уу.');
        }else{
            let test = {
                _id: this.state._id,
                title: this.state.title,
                duration: this.state.duration,
                price: this.state.price,
                secret: this.state.secret,
                oneTime: this.state.oneTime,
                hasCertificate: this.state.hasCertificate,
                easyQuestion: this.state.easyQuestion,
                mediumQuestion: this.state.mediumQuestion,
                hardQuestion: this.state.hardQuestion,
                proQuestion: this.state.proQuestion,
                percent: this.state.percent,
            };
            if(this.state.category && Object.keys(this.state.category || {}).length !== 0 && (this.state.lessons || []).length === 0){
                return config.get('emitter').emit('warning', 'Ангилал сонгосон тохиолдолд хичээл сонгох шаардлагатай');
            }
            this.state.category && Object.keys(this.state.category || {}).length !== 0 ? test.category = this.state.category._id : null;
            this.state.category && Object.keys(this.state.category || {}).length !== 0 && (this.state.lessons || []).length > 0 ?
                test.lessons = (this.state.lessons || []).map(lesson => lesson._id) : null;
            if(this.state.modalImage && (Object.keys(this.state.modalImage) || []).length > 0
                && (this.state.modalImage || {})._id !== '') test.modalImage = (this.state.modalImage || {})._id;
            if(this.state.cardImage && (Object.keys(this.state.cardImage) || []).length > 0
                && (this.state.cardImage || {})._id !== '') test.cardImage = (this.state.cardImage || {})._id;
            if(this.state.status === 'active'){
                if(!this.readyToPublish()){
                    this.setState({testSubmitLoading: true}, () => {
                        this.props.dispatch(createTest(test)).then(c => {
                            this.setState({testSubmitLoading: false})
                        });
                    });
                }else{
                    config.get('emitter').emit('warning', 'Шалгалтын асуултуудын тоо хүрэлцэхгүй байна.');
                }
            }else{
                this.setState({testSubmitLoading: true}, () => {
                    this.props.dispatch(createTest(test)).then(c => {
                        this.setState({testSubmitLoading: false})
                    });
                });
            }
        }
    }
    submitQuestion(obj){
        if(!this.state.questionType || this.state.questionType === ''){
            config.get('emitter').emit('warning', 'Асуултын төрлийг оруулна уу.');
        }else if(!this.state.questionDifficulty || this.state.questionDifficulty === ''){
            config.get('emitter').emit('warning', 'Асуултын түвшинг оруулна уу.');
        }else if(!this.state.questionTitle || this.state.questionTitle === ''){
            config.get('emitter').emit('warning', 'Асуултыг оруулна уу.');
        }else if(!this.state.questionAnswers || (this.state.questionAnswers || []).length <= 1 || (this.state.questionAnswers || []).length > 20){
            config.get('emitter').emit('warning', 'Хариулт нь 1-ээс их, 21-ээс бага байх ёстой.');
        }else if(!this.state.questionCorrectAnswer || this.state.questionCorrectAnswer === ''){
            config.get('emitter').emit('warning', 'Зөв хариултыг оруулна уу.');
        }else if(this.state.category && Object.keys(this.state.category || {}).length !== 0 &&
            this.state.lessons && (this.state.lessons || []).length > 0 && (!this.state.timelines || (this.state.timelines || []).length === 0)){
            config.get('emitter').emit('warning', 'Холбогдох хөтөлбөрийг оруулна уу.');
        }else{
            this.setState({
                questionSubmitLoading: true
            }, () => {
                let question = {
                    _id: this.state._id,
                    question_id: this.state.question_id,
                    type: this.state.questionType,
                    difficulty: this.state.questionDifficulty,
                    title: this.state.questionTitle,
                    points: this.state.questionPoint,
                    answers: this.state.questionAnswers,
                    correct: this.state.questionCorrectAnswer,
                };
                if(this.state.category && Object.keys(this.state.category || {}).length !== 0 && this.state.lessons && (this.state.lessons || []).length > 0
                    && this.state.timelines && (this.state.timelines || []).length > 0)
                    question.timelines = (this.state.timelines || []);
                this.props.dispatch(createQuestion(question)).then(c => {
                    if((c.json || {}).success){
                        let questions;
                        if((c.json || {}).question_id && (c.json || {}).question_id !== ''){
                            questions = (this.state.questions || []).map(question => {
                                if((question._id || 'as').toString() !== ((c.json || {}).question || {})._id){
                                    return question;
                                }
                                return {...((c.json || {}).question || {})}
                            });
                        }else{
                            questions = [...(this.state.questions || []), (c.json || {}).question]
                        }
                        this.setState({
                            visible: false,
                            question_id: '',
                            questionType: '',
                            questionDifficulty: '',
                            questionTitle: '',
                            questionPoint: 0,
                            questionAnswers: [],
                            questionCorrectAnswer:  '',
                            questionTemp: '',
                            questions: questions,
                            questionSubmitLoading: false,
                            timelines: [],
                        });
                    }else{
                        this.setState({questionSubmitLoading: false});
                    }
                })
            })
        }
    }
    deleteFromArray(parent, child, key){
        let string = `${parent}${child}`;
        let initial = (this.state || [])[string];
        initial = (initial || []).filter(ini => (ini._id || 'as').toString() !== (key || '').toString());
        this.setState({[string]: initial, needUpdate: true});
    }
    readyToPublish(difficulty, type){
        let requiredQuestions = {};
        (this.state.difficulties || []).map(difficulty => {
            (requiredQuestions || [])[difficulty] = {};
            (this.state.types || []).map(type => {
                (requiredQuestions || [])[difficulty][type] = 0;
            });
            ((this.state || [])[`${difficulty}Question`] || []).map(question => {
                (requiredQuestions || [])[difficulty][question.type] = (question.quantity || 0);
            });
        });
        (this.state.questions || []).map(question => {
            (requiredQuestions || [])[(question.difficulty || 'easy')][(question.type || 'selectOne')]--;
        });
        if(difficulty && difficulty !== '' && type && type !== ''){
            (requiredQuestions || [])[difficulty][type]++;
        }
        return (this.state.difficulties || []).some(difficulty => {
            return (this.state.types || []).some(type => {
                return (requiredQuestions || [])[difficulty][type] > 0
            });
        });
    }
    getDifficultyListItem(parent, child, item, property){
        let questionCount = 0;
        (this.state.questions || []).map(question => {
            question.difficulty === parent && question.type === item[property] && question.status === 'active' ? questionCount++ : null;
        });
        return (
            <li
                key={`${parent}-${child}-child-${item._id}`}
            >
                <Popover
                    key={`${parent}-${child}-popover-${item._id}`}
                    title={'Нэр'}
                    content={conf.getType(item[property])}
                >
                    <div key={`${parent}-${child}-div-${item._id}`} style={{display: 'inline-flex', flexDirection: 'row', width: '95%'}}>
                        <div
                            style={{width: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}
                            key={`${parent}-${child}-content-${item._id}`}
                        >
                            <div style={
                                ((this.props.match || {}).params || {}).test !== 'new' ?
                                    questionCount === item.quantity ?
                                        {display: 'inline-flex', justifyContent: 'space-between', width: '100%', height: '100%', alignItems: 'center'}
                                        :
                                        questionCount > item.quantity ?
                                            {
                                                display: 'inline-flex', justifyContent: 'space-between',
                                                width: '100%', height: '100%', alignItems: 'center', color: 'green'
                                            }
                                            :
                                            {display: 'inline-flex', justifyContent: 'space-between', width: '100%', height: '100%', alignItems: 'center', color: 'red'}
                                    :
                                    {display: 'inline-flex', justifyContent: 'space-between', width: '100%', height: '100%', alignItems: 'center'}
                            }>
                                <span>{conf.getType(item[property])}</span>

                                <span>
                                    {
                                        ((this.props.match || {}).params || {}).test !== 'new' ?
                                            `${questionCount}/`
                                            :
                                            null
                                    }
                                    {item.quantity}
                                </span>
                            </div>
                        </div>
                        <div style={{width: '10%'}} key={`${parent}-${child}-actions-${item._id}`}>
                            <Button
                                key={`${parent}-${child}-delete-${item._id}`} icon={<DeleteOutlined />}
                                danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                onClick={() => this.deleteFromArray(parent, child, item._id)}
                            />
                        </div>
                    </div>
                </Popover>
            </li>
        )
    }
    // findCategory(e){
    //     const {test: {categories}} = this.props;
    //     let found = {};
    //     (categories || []).map(category => {
    //         if((category._id || 'as').toString() === (e || '').toString()) found = category;
    //     });
    //     this.setState({
    //         category: found, lessons: [], needUpdate: true
    //     })
    // }
    // searchCategory(e){
    //     clearTimeout(this.state.timeOutCategory);
    //     let cc = {pageSize: 10, pageNum: 0, search: e};
    //     let self = this;
    //     let timeOutCategory = setTimeout(() => {self.props.dispatch(getCategory(cc))}, 300);
    //     this.setState({timeOutCategory: timeOutCategory, searchCategory: e});
    // }
    // findLesson(e){
    //     const {test: {lessons}} = this.props;
    //     if((this.state.lessons || []).some(lesson => (lesson._id || 'as').toString() === (e || '').toString())){
    //         this.setState({lessons: (this.state.lessons || []).filter(lesson => (lesson._id || 'as').toString() !== (e || '').toString())});
    //     }else{
    //         let found = {};
    //         (lessons || []).map(lesson => {if((lesson._id || 'as').toString() === (e || '').toString()) found = lesson});
    //         this.setState({lessons: [...(this.state.lessons || []), found], needUpdate: true});
    //     }
    // }
    // searchLesson(e){
    //     clearTimeout(this.state.timeOutLesson);
    //     let cc = {pageSize: 10, pageNum: 0, search: e, category: (this.state.category || {})._id};
    //     let self = this;
    //     let timeOutLesson = setTimeout(() => {self.props.dispatch(getLessonsFromCategory(cc))}, 300);
    //     this.setState({timeOutLesson: timeOutLesson, searchLesson: e});
    // }
    // searchTimeline(e){
    //     clearTimeout(this.state.timeOutTimeline);
    //     let cc = {pageSize: 10, pageNum: 0, search: e, lessons: (this.state.lessons || []).map(lesson => lesson._id)};
    //     let self = this;
    //     let timeOutTimeline = setTimeout(() => {self.props.dispatch(getTimelinesFromLessons(cc))}, 300);
    //     this.setState({timeOutTimeline: timeOutTimeline, searchTimeline: e});
    // }
    // findTimeline(e){
    //     const {test: {timelines}} = this.props;
    //     if((this.state.timelines || []).some(timeline => (timeline._id || 'as').toString() === (e || '').toString())){
    //         this.setState({timelines: (this.state.timelines || []).filter(timeline => (timeline._id || 'as').toString() !== (e || '').toString())});
    //     }else{
    //         let found = {};
    //         (timelines || []).map(timeline => {if((timeline._id || 'as').toString() === (e || '').toString()) found = timeline});
    //         this.setState({timelines: [...(this.state.timelines || []), found]});
    //     }
    // }
    changeParentState(e){
        this.setState(e);
    }
    dispatch(e){
        this.props.dispatch(e);
    }
    render() {
        const {test: {categories, gettingCategories, gettingLessons, lessons, gettingTimelines, timelines}} = this.props;
        return (
            <React.Fragment>
                <div>
                    <Card
                        style={{marginBottom: 20}}
                        title={'Шалгалт'}
                        bordered={true}
                        loading={this.state.loadingTest}
                        extra={
                            ((this.props.match || {}).params || {}).test !== 'new' ?
                                <>
                                    <Button icon={<EyeOutlined />} shape={'circle'} type={'primary'} onClick={() => this.setState({
                                        modalVisible: true
                                    })} />&nbsp;
                                    Статус:&nbsp;
                                    {
                                        conf.getStatus(this.state.status)
                                    }
                                    <Button
                                        type={'primary'}
                                        icon={<PlusOutlined />}
                                        onClick={() => this.setState({visible: true})}
                                    >
                                        Асуулт нэмэх
                                    </Button>
                                </>
                                :
                                null
                        }
                    >
                        <Form
                            onFinish={this.submit.bind(this)}
                            // layout={'inline'}
                            id={'test-single'}
                            scrollToFirstError={true}
                            fields={[
                                {name: 'title', value: this.state.title},
                                {name: 'duration', value: this.state.duration},
                                {name: 'price', value: this.state.price},
                                {name: 'secret', value: this.state.secret},
                                {name: 'oneTime', value: this.state.oneTime},
                                {name: 'hasCertificate', value: this.state.hasCertificate},
                                {name: 'percent', value: this.state.percent},
                            ]}
                            onValuesChange={(e) => this.setState({needUpdate: true})}
                        >
                            <Form.Item
                                label='Шалгалтын нэр'
                                name='title'
                                rules={[
                                    {
                                        required: this.state.title === '',
                                        message: 'Шалгалтын нэр оруулна уу'
                                    }
                                ]}
                            >
                                <Input
                                    value={this.state.title}
                                    onChange={(e) => this.setState({title: e.target.value})}
                                />
                            </Form.Item>
                            <div
                                className={'test'}
                                key={'test-from-info'}
                            >
                                <Form.Item
                                    label='Хугацаа'
                                    name='duration'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Шалгалтын хугацааг оруулна уу'
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        min={0}
                                        value={this.state.duration}
                                        onChange={(e) => this.setState({duration: e})}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Үнэ'
                                    name='price'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Шалгалтын үнийг оруулна уу'
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        min={0}
                                        value={this.state.price}
                                        onChange={(e) => this.setState({price: e})}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Хариуг нууцлах'
                                    name='secret'
                                >
                                    <Switch
                                        checked={this.state.secret}
                                        onChange={(e) => this.setState({secret: e})}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Ганц удаа өгөх'
                                    name='oneTime'
                                >
                                    <Switch
                                        checked={this.state.oneTime}
                                        onChange={(e) => this.setState({oneTime: e})}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Гэрчилгээтэй'
                                    name='hasCertificate'
                                >
                                    <Switch
                                        checked={this.state.hasCertificate}
                                        onChange={(e) => this.setState({hasCertificate: e})}
                                    />
                                </Form.Item>
                                {
                                    this.state.hasCertificate ?
                                        <Form.Item
                                            label='Хувь'
                                            name='percent'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Шалгалтын хувийг оруулна уу'
                                                }
                                            ]}
                                        >
                                            <InputNumber
                                                min={0} max={100}
                                                value={this.state.percent}
                                                onChange={(e) => this.setState({percent: e})}
                                            />
                                        </Form.Item>
                                        :
                                        null
                                }
                            </div>
                            <div
                                style={{marginRight: 20, marginLeft: 20}}
                                className={'test'}
                                key={'test-from-questions'}
                            >
                                <Row gutter={20}>
                                    {
                                        (this.state.difficulties || []).map(diff =>
                                            <Col span={6} key={diff}>
                                                <div key={`div-${diff}`}>
                                                    <div style={{textAlign: 'center'}} key={`div-${diff}-${diff}`}>
                                                        {conf.getDifficulty(diff)} асуултууд
                                                        <Button
                                                            size={'small'}
                                                            style={{border: 'none', boxShadow: 'none', outline: 'none'}}
                                                            icon={<PlusOutlined />}
                                                            onClick={() => this.setState({
                                                                temp: {
                                                                    ...(this.state.temp || []),
                                                                    [diff]: {
                                                                        ...((this.state.temp || [])[diff] || []),
                                                                        adding: true
                                                                    }
                                                                }
                                                            })}
                                                        />
                                                    </div>
                                                    <div key={`div-${diff}-${diff}-${diff}`}>
                                                        {
                                                            ((this.state || [])[`${diff}Question`] || []).length > 0 ?
                                                                <ul>
                                                                    {((this.state || [])[`${diff}Question`] || []).map(question =>
                                                                        this.getDifficultyListItem(diff, 'Question', question, 'type')
                                                                    )}
                                                                </ul>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    ((this.state.temp || [])[diff] || {}).adding ?
                                                        <Input.Group compact key={`test-${diff}`}>
                                                            <Select
                                                                style={{width: 200}}
                                                                value={((this.state.temp || [])[diff] || {}).type}
                                                                onSelect={(e) => this.setState({
                                                                    temp: {
                                                                        ...(this.state.temp || []),
                                                                        [diff]: {
                                                                            ...((this.state.temp || [])[diff] || []),
                                                                            type: e
                                                                        }
                                                                    }
                                                                })}
                                                            >
                                                                {
                                                                    (this.state.types || []).map(type =>
                                                                        <Select.Option
                                                                            value={type}
                                                                            key={type}
                                                                            disabled={((this.state || [])[`${diff}Question`] || []).some(quest => quest.type === type)}
                                                                        >
                                                                            {conf.getType(type)}
                                                                        </Select.Option>
                                                                    )
                                                                }
                                                            </Select>
                                                            <InputNumber
                                                                value={((this.state.temp || [])[diff] || {}).quantity}
                                                                onChange={(e) => this.setState({
                                                                    temp: {
                                                                        ...(this.state.temp || []),
                                                                        [diff]: {
                                                                            ...((this.state.temp || [])[diff] || []),
                                                                            quantity: e
                                                                        }
                                                                    }
                                                                })}
                                                                min={0}
                                                            />
                                                            <Button
                                                                onClick={() => {
                                                                    if(((this.state.temp || [])[diff] || {}).type && ((this.state.temp || [])[diff] || {}).type !== '' &&
                                                                        ((this.state.temp || [])[diff] || {}).quantity
                                                                        && ((this.state.temp || [])[diff] || {}).quantity !== 0){
                                                                        this.setState({
                                                                            needUpdate: true,
                                                                            [`${diff}Question`]: [
                                                                                ...((this.state || [])[`${diff}Question`] || []),
                                                                                {
                                                                                    _id: conf.getKey(diff),
                                                                                    quantity: ((this.state.temp || [])[diff] || {}).quantity,
                                                                                    type: ((this.state.temp || [])[diff] || {}).type,
                                                                                }
                                                                            ],
                                                                            temp: {
                                                                                ...(this.state.temp || []),
                                                                                [diff]: {quantity: 0, type: '', adding: false}
                                                                            }
                                                                        });
                                                                    }
                                                                }}
                                                            >Нэмэх</Button>
                                                        </Input.Group>
                                                        :
                                                        null
                                                }
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>
                            <Row style={{marginTop: 10, marginBottom: 10}} gutter={[20, 0]} >
                                <Col span={7} key={'test-category'}>
                                    <SelectCategory
                                        categoryParent={this.state.category}
                                        changeParentState={this.changeParentState}
                                        main={this.props.main} test={this.props.test}
                                        dispatch={this.dispatch}
                                    />
                                </Col>
                                <Col span={17} key={'test-lessons'}>
                                    <SelectLesson
                                        categoryParent={this.state.category}
                                        changeParentState={this.changeParentState}
                                        lessons={this.state.lessons}
                                        main={this.props.main} test={this.props.test}
                                        dispatch={this.dispatch}
                                    />
                                </Col>
                            </Row>
                            {
                                (this.state.lessons || []).length > 0 ?
                                    <div className={'admin-test-lesson-div'}>
                                        {
                                            (this.state.lessons || []).map(lesson => (
                                                <Popover
                                                    title={'Хичээлийн мэдээлэл'}
                                                    content={
                                                        <div key={`video-${lesson._id}`} style={{width: 250, wordBreak: 'break-word'}}>
                                                            <div>
                                                                Ангилал: <b>{(this.state.category || {}).title}</b>
                                                            </div>
                                                            Хичээлийн нэр: <b>{lesson.title || ''}</b>
                                                        </div>
                                                    }
                                                >
                                                    <div key={lesson._id} className={'lesson'}>
                                                        <img
                                                            src={(lesson.thumbnailSmall|| {}).path ?
                                                                `${config.get('hostMedia')}${(lesson.thumbnailSmall|| {}).path}`
                                                                :
                                                                '/images/bg-hero.jpg'} alt={'lesson-image'}
                                                            onError={(e) => e.target.src = '/images/bg-hero.jpg'}
                                                        />
                                                        <span className={'title'}>
                                                            {lesson.title}
                                                        </span>
                                                        <div className={'close'}
                                                            onClick={() => {
                                                                this.setState({
                                                                    lessons: (this.state.lessons || []).filter(less => (less._id || 'as').toString() !== (lesson._id || '').toString())
                                                                })
                                                            }}
                                                        ><CloseCircleOutlined /></div>
                                                    </div>
                                                </Popover>
                                            ))
                                        }
                                    </div>
                                    :
                                    <div style={{width: '100%', padding: '10px 0', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                                        Хичээл сонгоогүй байна.
                                    </div>
                            }
                            <div
                                key={'test-from-finish'}
                                style={{textAlign: 'right'}}
                            >
                                <Button onClick={() => this.openMediaLib('image', 'testCardImage')} >
                                    <UploadOutlined /> {this.state.cardImage && (this.state.cardImage || {})._id ? 'Картны зураг солих' : 'Картны зураг'}
                                </Button>
                                <Button onClick={() => this.openMediaLib('image', 'testModalImage')} style={{marginLeft: 20}}>
                                    <UploadOutlined /> {this.state.modalImage && (this.state.modalImage || {})._id ? 'Модалын зураг солих' : 'Модалын зураг'}
                                </Button>
                                <Button
                                    icon={<SaveOutlined />}
                                    style={{marginLeft: 20}}
                                    htmlType={'submit'}
                                    form={'test-single'}
                                    disabled={!this.state.needUpdate}
                                    loading={this.state.testSubmitLoading}
                                >
                                    Хадгалах
                                </Button>
                                {
                                    this.state.status !== 'active' ?
                                        <Popconfirm
                                            title={'Шалгалтыг нийтлэх үү?'}
                                            okText={'Тийм'} cancelText={'Үгүй'}
                                            onConfirm={() => this.setState({
                                                publishLoading: true
                                            }, () => {
                                                this.props.dispatch(publishTest({slug: ((this.props.match || {}).params || {}).test})).then(c => {
                                                    if(c.json?.success){
                                                        this.setState({
                                                            publishLoading: false,
                                                            status: 'active',
                                                            questions: this.state.questions.map(question => {
                                                                return {
                                                                    ...question,
                                                                    status: 'active'
                                                                }
                                                            })
                                                        });
                                                    }else{
                                                        this.setState({publishLoading: false});
                                                    }
                                                });
                                            })}
                                            disabled={this.readyToPublish() || this.state.needUpdate}
                                        >
                                            <Button
                                                style={{marginLeft: 20}}
                                                type={'primary'}
                                                disabled={this.readyToPublish() || this.state.needUpdate}
                                                loading={this.state.publishLoading}
                                            >
                                                Нийтлэх
                                            </Button>
                                        </Popconfirm>
                                        :
                                        <Popconfirm
                                            title={'Шалгалтын нийтлэлтийг болиулах уу?'}
                                            onConfirm={() => this.setState({testUnpublishLoading: true} , () => {
                                                this.props.dispatch(unpublishTest({slug: ((this.props.match || {}).params || {}).test})).then(c => {
                                                    if(c.json?.success){
                                                        this.setState({testUnpublishLoading: false, status: 'pause'});
                                                    }else{
                                                        this.setState({testUnpublishLoading: false});
                                                    }
                                                })
                                            })}
                                            disabled={this.state.testUnpublishLoading}
                                        >
                                            <Button
                                                style={{marginLeft: 20}} type={'primary'}
                                                danger loading={this.state.testUnpublishLoading}
                                            >
                                                Нийтлэлийг зогсоох
                                            </Button>
                                        </Popconfirm>
                                }
                            </div>
                        </Form>
                    </Card>
                </div>
                {
                    this.state.questions?.length > 0 ?
                        <TestSingleQuestions questions={[...this.state.questions]} handler={this.questionHandler} deleteLoading={this.state.deleteLoading} />
                        :
                        null
                }
                <Drawer
                    visible={this.state.visible}
                    maskClosable={false}
                    closable={false}
                    width={1000}
                    title={'Шалгалтын асуулт нэмэх'}
                    footer={
                        <div style={{textAlign: 'right'}}>
                            <Popconfirm
                                okText={'Тийм'} cancelText={'Үгүй'}
                                title={'Болих уу?'}
                                onConfirm={() => this.clear() }
                            >
                                <Button danger size={'small'}>
                                    Болих
                                </Button>
                            </Popconfirm>
                            <Button
                                style={{marginLeft: 10}}
                                size={'small'}
                                type={'primary'}
                                onClick={() => this.submitQuestion()}
                                loading={this.state.questionSubmitLoading}
                            >
                                {this.state.question_id ? 'Шинэчлэх' : 'Нэмэх'}
                            </Button>
                        </div>
                    }
                >
                    <div key={'test-drawer-types'} style={{marginBottom: 20}}>
                        <span>Асуултын төрөл:</span>
                        <Select
                            disabled={this.state.question_id !== ''}
                            style={{width: 200, marginLeft: 10, marginRight: 20}}
                            value={this.state.questionType}
                            onSelect={(e) => this.setState({questionType: e})}
                        >
                            {
                                (this.state.types || []).map(type => <Select.Option value={type} key={type}>{conf.getType(type)}</Select.Option>)
                            }
                        </Select>
                        <span>Асуултын түвшин:</span>
                        <Select
                            style={{width: 200, marginLeft: 10, marginRight: 20}}
                            value={this.state.questionDifficulty}
                            onSelect={(e) => this.setState({questionDifficulty: e})}
                        >
                            {
                                (this.state.difficulties || []).map(diff =>
                                    <Select.Option value={diff} key={diff}>{conf.getDifficulty(diff)} асуулт</Select.Option>
                                )
                            }
                        </Select>
                        <span>Асуултын оноо:</span>
                        <InputNumber
                            style={{width: 100, marginLeft: 10}}
                            value={this.state.questionPoint}
                            min={0}
                            onChange={(e) => this.setState({questionPoint: e})}
                        />
                    </div>
                    {
                        this.state.questionType === 'selectOne' ?
                            <SelectOne
                                question_id={this.state.question_id}
                                questionTitle={this.state.questionTitle}
                                questionAnswers={this.state.questionAnswers}
                                questionCorrectAnswer={this.state.questionCorrectAnswer}
                                questionTemp={this.state.questionTemp}
                                propertyHandler={this.propertyHandler}
                                listItemHandler={this.listItemHandler}
                            />
                            :
                            null
                    }
                    <SelectTimeline
                        categoryParent={this.state.category}
                        changeParentState={this.changeParentState}
                        lessons={this.state.lessons} timelines={this.state.timelines}
                        main={this.props.main} test={this.props.test}
                        dispatch={this.dispatch}
                    />
                </Drawer>
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
                <Modal
                    visible={this.state.modalVisible}
                    footer={false}
                    onCancel={() => this.setState({modalVisible: false})}
                >
                    Тест хуудсанд:
                    <div
                        className="testCard"
                        style={this.state.cardImage && (this.state.cardImage || {}).path ?
                            {background: `url(${config.get('hostMedia')}${this.state.cardImage.path})`,
                                backgroundSize:'cover', backgroundPosition: 'center', margin: '0 0 20px 20px'} :
                            {background: 'url("/images/defaultTestCard1.png")', backgroundSize:'200px 110px', margin: '0 0 20px 20px'}
                        }
                    >
                        <div className="cardContent" style={{marginBottom: 20}}>
                            <p style={{
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', width: 160, margin: 0
                            }}>{this.state.title}</p>
                            <br/>
                            Хугацаа: {this.state.duration} мин
                            <br/>
                            <span style={{
                                color: '#ffc107', fontSize: 14
                            }}> Үнэ: {`${this.state.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮</span>
                            <div
                                className="certifyTagTest" style={this.state.hasCertificate? {} : {backgroundColor: '#dc3545', border: 'none', color: '#fff'}}
                            >
                                {this.state.hasCertificate ? 'СЕРТИФИКАТТАЙ' : 'СЕРТИФИКАТГҮЙ'}
                            </div>
                        </div>
                    </div>
                    Тест модалд:
                    <div className={'testModal'}>
                        <div
                            style={
                                this.state.modalImage && (this.state.modalImage || {}).path ?
                                    {background: `url(${config.get('hostMedia')}${this.state.modalImage.path})`,
                                        backgroundSize:'cover', backgroundPosition: 'center', margin: '0 0 20px 20px', height: 320} :
                                    {background: 'url("/images/defaultTest2.jpg")',backgroundSize:'600px 320px', margin: '0 0 0 20px', height: 320}
                            }
                            className="modalMain"
                        >
                            <h4 style={{color: 'white'}}>Та <span>{this.state.title}</span> тест өгөх гэж байна.</h4>
                            <div style={{marginLeft: 25, position: 'absolute', top: '105px'}}>
                                <div>
                                    Нийт: {
                                    (this.state.easyQuestion ||[]).length + (this.state.mediumQuestion ||[]).length +
                                    (this.state.hardQuestion ||[]).length + (this.state.proQuestion ||[]).length
                                } асуулттай
                                </div>
                                <div>
                                    Үргэлжлэх хугацаа: {this.state.duration !== 0 ? `${this.state.duration} минут` : 'Хугацаагүй'}
                                </div>
                                <div>Давтамж: {this.state.oneTime? 'Нэг удаа өгнө' : 'Хэд өгсөн ч болно'}</div>
                                <div>Үнэ: {this.state.price}₮ </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Test);