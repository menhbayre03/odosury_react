import React from "react";
import { connect } from 'react-redux';
import config from '../../config';
import {getTest, createTest, deleteTest, createQuestion, deleteQuestion, publishTest } from '../../actions/test_actions'
const reducer = ({ main, test }) => ({ main, test });
import {
    Card, Empty, Popover,
    Table, Row, Col,
    Button, Popconfirm,
    Input, Drawer, Collapse,
    Select, Form, Tooltip,
    Switch, InputNumber
} from 'antd';
import {
    PlusOutlined, EnterOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined
} from '@ant-design/icons';
import TestSingleQuestion from "./TestSingleQuestion";
import TestSingleQuestions from "./TestSingleQuestions";
import conf from "./include/conf";
import SelectOne from "./include/SelectOne";

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            loadingTest: false,

            //FOR TEST
            _id: '',
            title: '',
            secret: true,
            oneTime: true,
            hasCertificate: false,
            price: 0,
            duration: 0,
            easyQuestion: [],
            mediumQuestion: [],
            hardQuestion: [],
            proQuestion: [],
            needUpdate: false,

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
            publishLoading: false,
        };
        this.questionHandler = this.questionHandler.bind(this);
        this.propertyHandler = this.propertyHandler.bind(this);
        this.listItemHandler = this.listItemHandler.bind(this);
        this.clear = this.clear.bind(this);
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
                    oneTime: (data.test || {}).oneTime,
                    hasCertificate: (data.test || {}).hasCertificate,
                    price: (data.test || {}).price,
                    duration: (data.test || {}).duration,
                    easyQuestion: ((data.test || {}).easyQuestion || []),
                    mediumQuestion: ((data.test || {}).mediumQuestion || []),
                    hardQuestion: ((data.test || {}).hardQuestion || []),
                    proQuestion: ((data.test || {}).proQuestion || []),
                    questions: (data.questions || [])
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
            testSubmitLoading: false
        })
    }
    questionHandler(obj, action){
        if(obj){
            if(action === 'delete'){
                this.props.dispatch(deleteQuestion({...obj})).then(c => {
                    if(c.json?.success){
                        let updatedQuestions = (this.state.questions || []).filter(question => (c.json?._id || 'as').toString() !== (question._id || '').toString());
                        this.setState({
                            questions: updatedQuestions
                        })
                    }
                });
            }else if(action === 'edit'){
                this.setState({
                    ...obj
                })
            }
        }
    }
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
        }else if(((this.state.easyQuestion || []).length + (this.state.mediumQuestion || []).length +
            (this.state.hardQuestion || []).length + (this.state.proQuestion || []).length) === 0){
            config.get('emitter').emit('warning', 'Шалгалтын асуултуудын тоог оруулна уу.');
        }else{
            this.setState({testSubmitLoading: true}, () => {
                this.props.dispatch(createTest({
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
                }));
            });
        }
    }
    submitQuestion(obj){
        if(!this.state.questionType || this.state.questionType === ''){
            config.get('emitter').emit('warning', 'Асуултын төрлийг оруулна уу.');
        }else if(!this.state.questionDifficulty || this.state.questionDifficulty === ''){
            config.get('emitter').emit('warning', 'Асуултын ангилалыг оруулна уу.');
        }else if(!this.state.questionTitle || this.state.questionTitle === ''){
            config.get('emitter').emit('warning', 'Асуултыг оруулна уу.');
        }else if(!this.state.questionAnswers || (this.state.questionAnswers || []).length <= 1 || (this.state.questionAnswers || []).length > 20){
            config.get('emitter').emit('warning', 'Хариулт нь 1-ээс их, 21-ээс бага байх ёстой.');
        }else if(!this.state.questionCorrectAnswer || this.state.questionCorrectAnswer === ''){
            config.get('emitter').emit('warning', 'Зөв хариултыг оруулна уу.');
        }else{
            this.setState({
                questionSubmitLoading: true
            }, () => {
                this.props.dispatch(createQuestion({
                    _id: this.state._id,
                    question_id: this.state.question_id,
                    type: this.state.questionType,
                    difficulty: this.state.questionDifficulty,
                    title: this.state.questionTitle,
                    points: this.state.questionPoint,
                    answers: this.state.questionAnswers,
                    correct: this.state.questionCorrectAnswer,
                })).then(c => {
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
                            questionSubmitLoading: false
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
        this.setState({[string]: initial});
    }
    getDifficultyListItem(parent, child, item, property){
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
                            <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', height: '100%', alignItems: 'center'}}>
                                <span>{conf.getType(item[property])}</span>
                                <span>{item.quantity}</span>
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
    render() {
        return (
            <React.Fragment>
                <Card
                    style={{marginBottom: 20}}
                    title="Шалгалт"
                    bordered={true}
                    loading={this.state.loadingTest}
                    extra={
                        <>
                            {
                                ((this.props.match || {}).params || {}).test !== 'new' ?
                                    <Button
                                        type={'primary'}
                                        icon={<PlusOutlined />}
                                        onClick={() => this.setState({visible: true})}
                                    >
                                        Асуулт нэмэх
                                    </Button>
                                    :
                                    null
                            }
                        </>
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
                        ]}
                        onValuesChange={() => this.setState({needUpdate: true})}
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
                                                                    ((this.state.temp || [])[diff] || {}).quantity && ((this.state.temp || [])[diff] || {}).quantity !== 0){
                                                                    this.setState({
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
                        <div
                            key={'test-from-finish'}
                            style={{textAlign: 'right'}}
                        >
                            <Button
                                htmlType={'submit'}
                                form={'test-single'}
                                disabled={!this.state.needUpdate}
                                loading={this.state.testSubmitLoading}
                            >
                                Хадгалах
                            </Button>
                            <Popconfirm
                                title={'Шалгалтыг нийтлэх үү?'}
                                okText={'Тийм'} cancelText={'Үгүй'}
                                onConfirm={() => this.setState({
                                    publishLoading: true
                                }, () => {
                                    this.props.dispatch(publishTest({slug: ((this.props.match || {}).params || {}).test}));
                                })}
                            >
                                <Button
                                    style={{marginLeft: 20}}
                                    type={'primary'}
                                    // disabled={!this.state}
                                    loading={this.state.publishLoading}
                                >
                                    Нийтлэх
                                </Button>
                            </Popconfirm>
                        </div>
                    </Form>
                </Card>
                {
                    this.state.questions?.length > 0 ?
                        <TestSingleQuestions questions={[...this.state.questions]} handler={this.questionHandler} />
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
                            style={{width: 200, marginLeft: 10, marginRight: 20}}
                            value={this.state.questionType}
                            onSelect={(e) => this.setState({questionType: e})}
                        >
                            {
                                (this.state.types || []).map(type => <Select.Option value={type} key={type}>{conf.getType(type)}</Select.Option>)
                            }
                        </Select>
                        <span>Асуултын ангилал:</span>
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
                </Drawer>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Test);