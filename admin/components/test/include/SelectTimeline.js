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
            searchTimeline: '',
        };
    }
    searchTimeline(e){
        clearTimeout(this.state.timeOutTimeline);
        let cc = {pageSize: 10, pageNum: 0, search: e, lessons: (this.props.lessons || []).map(lesson => lesson._id)};
        let self = this;
        let timeOutTimeline = setTimeout(() => {self.props.dispatch(getTimelinesFromLessons(cc))}, 300);
        this.setState({timeOutTimeline: timeOutTimeline, searchTimeline: e});
    }
    findTimeline(e){
        const {test: {timelines}} = this.props;
        if((this.props.timelines || []).some(timeline => (timeline._id || 'as').toString() === (e || '').toString())){
            this.props.changeParentState?.({timelines: (this.props.timelines || []).filter(timeline => (timeline._id || 'as').toString() !== (e || '').toString())});
        }else{
            let found = {};
            (timelines || []).map(timeline => {if((timeline._id || 'as').toString() === (e || '').toString()) found = timeline});
            this.props.changeParentState?.({timelines: [...(this.props.timelines || []), found]});
        }
    }
    render() {
        const {test: {timelines, gettingTimelines}} = this.props;
        return (
            <>
                {
                    this.props.categoryParent && this.props.lessons && (this.props.lessons || []).length > 0 ?
                        <>
                            <div style={{marginTop: 20}}>
                                {
                                    (this.props.timelines || []).length > 0 ?
                                        <div>
                                            <b>Сонгогдсон хөтөлбөрүүд: </b>
                                            {
                                                (this.props.timelines || []).map(timeline =>
                                                    <div key={`timeline-li-${timeline._id}`} style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Tooltip
                                                            title={timeline.title}
                                                        >
                                                            <div
                                                                style={{
                                                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                                    display: 'block', width: '95%', marginRight: '1%'
                                                                }}
                                                                key={`timeline-div-ellipsis-${timeline._id}`}
                                                            >
                                                                {timeline.title}
                                                            </div>
                                                        </Tooltip>
                                                        <div
                                                            onClick={() => this.props.changeParentState?.({timelines: this.props.timelines.filter(timeliness =>
                                                                    (timeliness._id || 'as').toString() !== (timeline._id || '').toString())})}
                                                            style={{color: 'red', cursor: 'pointer', width: '4%'}}
                                                        >
                                                            <CloseCircleOutlined />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        :
                                        <div>
                                            <b>Хичээлийн хөтөлбөр сонгоогүй байна</b>
                                        </div>
                                }
                            </div>
                            <Select
                                showArrow={false}
                                key={'test-question-timeline'}
                                showSearch={true}
                                searchValue={this.state.searchTimeline}
                                allowClear={false}
                                style={{ width: '100%' }}
                                placeholder={"Хөтөлбөрийн нэрээр хайх."}
                                loading={gettingTimelines}
                                onSelect={(e) => this.findTimeline(e)}
                                defaultActiveFirstOption={false}
                                onSearch={this.searchTimeline.bind(this)}
                                notFoundContent={<Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Хөтөлбөр байхгүй байна.</span>} />}
                                filterOption={false}
                                value={null}
                                dropdownClassName={'admin-test-timeline-dropdown'}
                                dropdownRender={(record) =>
                                    ((record.props || {}).options || []).length > 0 ?
                                        ((record.props || {}).options || []).map((opt, index) =>
                                                <Row
                                                    key={`multiple-column-timeline-select-column-${index}`}
                                                    className={
                                                        (this.props.timelines || []).some(lesson => (lesson._id || 'ds').toString() === opt.value) ? 'row active' : 'row'
                                                    }
                                                    onClick={() => this.findTimeline(opt.value)}
                                                    style={{display: 'flex', alignItems: 'center'}}
                                                >
                                    <span
                                        key={`multiple-column-timeline-select-span`}
                                        style={{
                                            display: 'inline-block',
                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                            textOverflow: 'ellipsis', width: '80%'
                                        }}
                                    >{opt.children}</span>
                                                </Row>
                                        )
                                        :
                                        <Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Хайлтын илэрц олдсонгүй!</span>} />
                                }
                            >
                                {
                                    (timelines || []).map(time => <Select.Option key={time._id} value={time._id}>{time.title}</Select.Option>)
                                }
                            </Select>
                        </>
                        :
                        null
                }
            </>
        );
    }
}

export default SelectLesson;