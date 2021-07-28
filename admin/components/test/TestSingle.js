import React from "react";
import { connect } from 'react-redux';
import config from '../../config';
import {getTest, createTest, deleteTest, createQuestion, deleteQuestion, getQuestion} from '../../actions/test_actions'
const reducer = ({ main, test }) => ({ main, test });
import {
    Card, Empty, Popover,
    Table, Row, Col,
    Button, Popconfirm,
    Input, Drawer,
    Select, Form,
    Switch, InputNumber
} from 'antd';
import {
    PlusOutlined, EnterOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined
} from '@ant-design/icons';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //FOR TEST
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

            types: [
                'selectOne', 'selectMulti',
                'connectOne', 'connectMulti',
                'inputOne', 'inputMulti',
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


            //FOR EDITING LIST ITEM
            editing: '',
            editingContent: '',


            // FOR QUESTION
            visible: false,
            questionType: '',
            questionDifficulty: '',
            questionTitle: '',
            questionPoint: 0,
            questionAnswers: [],
            questionCorrectAnswer:  '',
            questionTemp: '',
        };
    }
    componentDidMount() {
        if(((this.props.match || {}).params || {}).test !== 'new'){
            this.props.dispatch(getQuestion({test: ((this.props.match || {}).params || {}).test}));
            this.props.dispatch(getTest({_id: ((this.props.match || {}).params || {}).test}));
        }
    }
    componentWillUnmount() {

    }
    getDifficulty(e){
        switch (e) {
            case 'easy': return 'Хялбар';
            case 'medium': return 'Энгийн';
            case 'hard': return 'Хүндэвтэр';
            case 'pro': return 'Хүнд';
            default: return '';
        }
    }
    getType(e){
        switch (e) {
            case 'selectOne': return 'Сонгох асуулт';
            case 'selectMulti': return 'Олон сонголттой асуулт';
            case 'connectOne': return 'Холбох асуулт';
            case 'connectMulti': return 'Олон холболттой асуулт';
            case 'inputOne': return 'Бөглөх асуулт';
            case 'inputMulti': return 'Олон бөглөх хэсэгтэй асуулт';
            default: return '';
        }
    }
    submit(e){
        console.log(this.state)
        console.log(e)
        if(!this.state.title || this.state.title !== ''){
            config.get('emitter').emit('warning', 'Шалгалтын нэрийг оруулна уу.');
        }else if(!this.state.title || this.state.title !== ''){
            config.get('emitter').emit('warning', 'Шалгалтын нэрийг оруулна уу.');
        }
        // {name: 'title', value: this.state.title},
        // {name: 'duration', value: this.state.duration},
        // {name: 'price', value: this.state.price},
        // {name: 'secret', value: this.state.secret},
        // {name: 'oneTime', value: this.state.oneTime},
        // {name: 'hasCertificate', value: this.state.hasCertificate},
        // {name: 'easyQuestion', value: this.state.easyQuestion},
        // {name: 'mediumQuestion', value: this.state.mediumQuestion},
        // {name: 'hardQuestion', value: this.state.hardQuestion},
        // {name: 'proQuestion', value: this.state.proQuestion},
    }
    submitQuestion(){
        console.log(this.state)
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
            this.props.dispatch(createQuestion({
                type: this.state.questionType,
                difficulty: this.state.questionDifficulty,
                title: this.state.questionTitle,
                points: this.state.questionPoint,
                answers: this.state.questionAnswers,
                correct: this.state.questionCorrectAnswer,
            }))
        }
    }
    getKey(key){
        return `${key}-${Math.random()}`;
    }
    changeArray(parent, child, key, property, action){
        let string = `${parent}${child}`;
        let initial = (this.state || [])[string];
        if(action === 'edit'){
            initial = (initial || []).map(ini => {
                if((ini._id || 'as').toString() !== (key || '').toString()){
                    return ini;
                }
                return {
                    ...ini,
                    [property]: this.state.editingContent
                }
            });
            this.setState({[string]: initial, editingContent: '', editing: ''});
        }else if(action === 'delete'){
            initial = (initial || []).filter(ini => (ini._id || 'as').toString() !== (key || '').toString());
            this.setState({[string]: initial});
        }
    }
    getListItem(parent, child, item, type, property){
        return (
            <li
                key={`${parent}-${child}-child-${item._id}`}
                onDoubleClick={() => type !== 'difficulty' ? this.setState({editing: item._id, editingContent: (item || [])[property]}) : null}
            >
                {
                    this.state.editing !== item._id ?
                        <Popover
                            key={`${parent}-${child}-popover-${item._id}`}
                            title={'Нэр'}
                            content={item[property]}
                        >
                            <div key={`${parent}-${child}-div-${item._id}`} style={{display: 'flex', flexDirection: 'row'}}>
                                <div
                                    style={{width: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}
                                    key={`${parent}-${child}-content-${item._id}`}
                                >
                                    {
                                        type === 'difficulty' ?
                                            <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', height: '100%', alignItems: 'center'}}>
                                                <span>{this.getType(item[property])}</span>
                                                <span>{item.quantity}</span>
                                            </div>
                                            :
                                            item[property]
                                    }

                                </div>
                                <div style={{width: '10%'}} key={`${parent}-${child}-actions-${item._id}`}>
                                    {
                                        type !== 'difficulty' ?
                                            <Button
                                                icon={<EditOutlined />}
                                                key={`${parent}-${child}-edit-${item._id}`}
                                                onClick={() => this.setState({editing: item._id, editingContent: (item || [])[property]})}
                                                style={{color: '#4e53a0', border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                            />
                                            :
                                            null
                                    }
                                    <Button
                                        key={`${parent}-${child}-delete-${item._id}`} icon={<DeleteOutlined />}
                                        danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                        onClick={() => this.changeArray(parent, child, item._id, property, 'delete')}
                                    />
                                </div>
                            </div>
                        </Popover>
                        :
                        <Input.Group>
                            <Input.TextArea value={this.state.editingContent} onChange={(e) => this.setState({editingContent: e.target.value})} />
                            <Button
                                style={{color: '#4e53a0', border: 'none', boxShadow: 'none', width: 50, backgroundColor: 'transparent'}}
                                icon={<CheckOutlined/>}
                                onClick={() => this.changeArray(parent, child, item._id, property, 'edit')}
                            />
                            <Button
                                icon={<CloseCircleOutlined />}
                                onClick={() => this.setState({editing: '', editingContent: '', width: 50, backgroundColor: 'transparent'})}
                                danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                            />
                        </Input.Group>
                }
            </li>
        )
    }
    render() {
        return (
            <React.Fragment>
                <Card
                    title="Шалгалт"
                    bordered={true}
                    loading={false}
                    extra={
                        <>
                            {/*{*/}
                            {/*    ((this.props.match || {}).params || {}).test !== 'new' ?*/}
                            {/*        <Button*/}
                            {/*            type={'primary'}*/}
                            {/*            icon={<PlusOutlined />}*/}
                            {/*            onClick={() => this.setState({visible: true})}*/}
                            {/*        >*/}
                            {/*            Асуулт нэмэх*/}
                            {/*        </Button>*/}
                            {/*        :*/}
                            {/*        null*/}
                            {/*}*/}
                            <Button
                                type={'primary'}
                                icon={<PlusOutlined />}
                                onClick={() => this.setState({visible: true})}
                            >
                                Асуулт нэмэх
                            </Button>
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
                    >
                        {/*labelCol={{*/}
                        {/*    span: 6,*/}
                        {/*}}*/}
                        {/*wrapperCol={{*/}
                        {/*    span: 14,*/}
                        {/*}}*/}

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
                                        <Col span={6}>
                                            <div>
                                                <div style={{textAlign: 'center'}}>
                                                    {this.getDifficulty(diff)} асуултууд
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
                                                <div>
                                                    {
                                                        ((this.state || [])[`${diff}Question`] || []).length > 0 ?
                                                            <ul>
                                                                {((this.state || [])[`${diff}Question`] || []).map(question =>
                                                                    this.getListItem(diff, 'Question', question, 'difficulty', 'type')
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
                                                                        {this.getType(type)}
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
                                                                                _id: this.getKey(diff),
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
                                type={'primary'}
                                htmlType={'submit'}
                                form={'test-single'}
                            >
                                Хадгалах
                            </Button>
                        </div>
                    </Form>
                </Card>
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
                                onConfirm={() => this.setState({
                                    visible: false
                                })}
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
                            >
                                {this.state._id ? 'Шинэчлэх' : 'Нэмэх'}
                            </Button>
                        </div>
                    }
                >
                    {/*<Row gutter={10}>*/}
                    {/*    <Col span={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>*/}
                    {/*        <span>Тестийн төрөл:</span>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={16}>*/}
                    {/*        <Select*/}
                    {/*            style={{width: 200}}*/}
                    {/*            value={this.state.type}*/}
                    {/*            onSelect={(e) => this.setState({type: e})}*/}
                    {/*        >*/}
                    {/*            <Select.Option*/}
                    {/*                value={'selectOne'} key={'selectOne'}*/}
                    {/*            >Сонгох тест</Select.Option>*/}
                    {/*        </Select>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <div key={'test-drawer-types'} style={{marginBottom: 20}}>
                        <span>Асуултын төрөл:</span>
                        <Select
                            style={{width: 200, marginLeft: 10, marginRight: 20}}
                            value={this.state.questionType}
                            onSelect={(e) => this.setState({questionType: e})}
                        >
                            <Select.Option
                                value={'selectOne'} key={'selectOne'}
                            >Сонгох тест</Select.Option>
                        </Select>
                        <span>Асуултын ангилал:</span>
                        <Select
                            style={{width: 200, marginLeft: 10, marginRight: 20}}
                            value={this.state.questionDifficulty}
                            onSelect={(e) => this.setState({questionDifficulty: e})}
                        >
                            {
                                (this.state.difficulties || []).map(diff =>
                                    <Select.Option value={diff} key={diff}>{this.getDifficulty()} асуулт</Select.Option>
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
                            <React.Fragment>
                                <div style={{marginBottom: 10}}>
                                    <span>Асуулт: </span>
                                    <Input.TextArea
                                        value={this.state.questionTitle}
                                        onChange={(e) => this.setState({questionTitle: e.target.value})}
                                    />
                                </div>
                                <div style={{marginBottom: 10}}>
                                    <span>Хариултууд:</span>
                                    <div style={{marginLeft: 30}}>
                                        {
                                            (this.state.questionAnswers || []).length > 0 ?
                                                <ol type={'A'}>
                                                    {
                                                        (this.state.questionAnswers || []).map((ans, ind) =>
                                                            <div
                                                                style={
                                                                    ind === ((this.state.questionCorrectAnswer || 'x').charCodeAt(0)-65) ?
                                                                        {backgroundColor: 'green', padding: 5, color: '#fff', fontSize: 16, listStylePosition: 'inside'}
                                                                        :
                                                                        {padding: 5, fontSize: 16}
                                                                }
                                                                key={ans.key}
                                                            >
                                                                {this.getListItem('question', 'Answers', ans, 'answer', 'content')}
                                                            </div>)
                                                    }
                                                </ol>
                                                :
                                                <div style={{
                                                    fontSize: 20, fontWeight: 700, color: '#dedede', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100
                                                }}>
                                                    Хоосон байна
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div style={{marginBottom: 10}}>
                                    <Row>
                                        <Col span={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 600}}>
                                            {String.fromCharCode((this.state.questionAnswers || []).length+65)}
                                        </Col>
                                        <Col span={18}>
                                            <Input.TextArea
                                                value={this.state.questionTemp}
                                                onChange={(e) => this.setState({questionTemp: e.target.value})}
                                                onPressEnter={(e) =>{
                                                    e.preventDefault();
                                                    this.state.questionTemp !== '' ?
                                                        this.setState({
                                                            questionAnswers: [...(this.state.questionAnswers || []), {
                                                                _id: this.getKey('selectOne'),
                                                                content: this.state.questionTemp,
                                                            }],
                                                            questionTemp: ''
                                                        })
                                                        :
                                                        null
                                                }}
                                            />
                                        </Col>
                                        <Col span={3} style={{display: 'flex', justifyContent: 'center'}}>
                                            <Button
                                                onClick={() =>
                                                    this.state.questionTemp !== '' ?
                                                        this.setState({
                                                            questionAnswers: [...(this.state.questionAnswers || []), {
                                                                _id: this.getKey('selectOne'),
                                                                content: this.state.questionTemp,
                                                            }],
                                                            questionTemp: ''
                                                        })
                                                        :
                                                        null
                                                }
                                                icon={<EnterOutlined />} style={{color: '#4e53a0', backgroundColor: 'white', border: 'none', boxShadow: 'none'}}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <span>Зөв хариулт:</span>
                                <Select
                                    style={{width: 200, marginLeft: 10}}
                                    value={this.state.questionCorrectAnswer}
                                    onSelect={(e) => this.setState({questionCorrectAnswer: e})}
                                    notFoundContent={<Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Хариулт байхгүй байна.</span>} />}
                                >
                                    {
                                        (this.state.questionAnswers || []).map((ans, ind) =>
                                            <Select.Option value={String.fromCharCode(ind+65)} key={`${ind}-answer-correct`}>
                                                {String.fromCharCode(ind+65)}
                                            </Select.Option>
                                        )
                                    }
                                </Select>
                            </React.Fragment>
                            :
                            null
                    }
                </Drawer>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Test);