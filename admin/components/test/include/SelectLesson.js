import React from "react";
import { connect } from 'react-redux';
import {
    getLessonsFromCategory, getTimelinesFromLessons
} from '../../../actions/test_actions';
import {
    PlusOutlined, EyeOutlined, SaveOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined, UploadOutlined
} from '@ant-design/icons';
import config from "../../../config";
import {
    Card, Empty, Popover,
    Select, Form, Tooltip, Row, Col
} from 'antd';

class SelectLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchLesson: '',
        };
    }
    findLesson(e){
        const {test: {lessons}} = this.props;
        if((this.props.lessons || []).some(lesson => (lesson._id || 'as').toString() === (e || '').toString())){
            this.props.changeParentState?.({lessons: (this.props.lessons || []).filter(lesson => (lesson._id || 'as').toString() !== (e || '').toString())});
        }else{
            let found = {};
            (lessons || []).map(lesson => {if((lesson._id || 'as').toString() === (e || '').toString()) found = lesson});
            this.props.changeParentState?.({lessons: [...(this.props.lessons || []), found], needUpdate: true});
        }
    }
    searchLesson(e){
        clearTimeout(this.state.timeOutLesson);
        let cc = {pageSize: 10, pageNum: 0, search: e, category: (this.props.categoryParent || {})._id};
        let self = this;
        let timeOutLesson = setTimeout(() => {self.props.dispatch(getLessonsFromCategory(cc))}, 300);
        this.setState({timeOutLesson: timeOutLesson, searchLesson: e});
    }
    render() {
        const {test: {lessons, gettingLessons}} = this.props;
        return (
            this.props.categoryParent && (Object.keys(this.props.categoryParent || {}).length || []) > 0 ?
                <>
                    <div>
                        Хичээлүүд:
                    </div>
                    <Select
                        showArrow={false}
                        key={'test-lesson'}
                        showSearch={true}
                        searchValue={this.state.searchLesson}
                        allowClear={false}
                        style={{ width: '500px' }}
                        placeholder={"Хичээлийн нэрээр хайх."}
                        loading={gettingLessons}
                        onSelect={(e) => this.findLesson(e)}
                        defaultActiveFirstOption={false}
                        onSearch={this.searchLesson.bind(this)}
                        notFoundContent={<Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Хичээл байхгүй байна.</span>} />}
                        filterOption={false}
                        value={null}
                        dropdownClassName={'admin-test-lesson-dropdown'}
                        dropdownRender={(record) =>
                            ((record.props || {}).options || []).length > 0 ?
                                ((record.props || {}).options || []).map((opt, index) =>
                                    <Row
                                        key={`multiple-column-select-column-${index}`}
                                        className={
                                            (this.props.lessons || []).some(lesson =>
                                                (lesson._id || 'ds').toString() === opt.value) ? 'row active' : 'row'
                                        }
                                        onClick={() => this.findLesson(opt.value)}
                                        style={{display: 'flex', alignItems: 'center'}}
                                    >
                                        {
                                            (
                                                opt.children || []).map((child, ind) =>
                                                typeof child === 'object' ?
                                                    <div style={{overflow: 'hidden', marginRight: '1%', width: '19%'}}
                                                         key={`multiple-column-select-row-${ind}`}
                                                    >
                                                        <img
                                                            style={{
                                                                width: '100%', maxWidth: 75,
                                                                height: 'auto', objectFit: 'cover',
                                                                objectPosition: 'center'
                                                            }}
                                                            src={(child.props || {}).src ?
                                                                (child.props || {}).src
                                                                :
                                                                '/images/bg-hero.jpg'}
                                                            onError={(e) => e.target.src = '/images/bg-hero.jpg'}
                                                        />
                                                    </div>
                                                    :
                                                    <span
                                                        key={`multiple-column-select-span-${ind}`}
                                                        style={{
                                                            display: 'inline-block',
                                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                                            textOverflow: 'ellipsis', width: '80%'
                                                        }}
                                                    >{child}</span>
                                            )
                                        }
                                    </Row>
                                )
                                :
                                <Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Хайлтын илэрц олдсонгүй!</span>} />
                        }
                    >
                        {
                            (lessons || []).map(lesson =>
                                <Select.Option key={lesson._id} value={lesson._id}>
                                    <img
                                        style={{display: 'none'}}
                                        src={(lesson.thumbnailSmall|| {}).path ?
                                            `${config.get('hostMedia')}${(lesson.thumbnailSmall|| {}).path}`
                                            :
                                            '/images/bg-hero.jpg'}
                                        onError={(e) => e.target.src = '/images/bg-hero.jpg'}
                                    />
                                    {lesson.title}
                                </Select.Option>)
                        }
                    </Select>
                </>
                :
                <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <b>Ангилал сонгож хичээлүүдийг сонгоно уу.</b>
                </div>
        );
    }
}

export default SelectLesson;