import React from "react";
import { connect } from 'react-redux';
import {
    getCategory
} from "../../../actions/category_actions";
import {
    PlusOutlined, EyeOutlined, SaveOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined, UploadOutlined
} from '@ant-design/icons';
import {
    Card, Empty, Popover,
    Select, Form, Tooltip,
} from 'antd';

class SelectCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCategory: '',
        };
    }
    findCategory(e){
        const {test: {categories}} = this.props;
        let found = {};
        (categories || []).map(category => {
            if((category._id || 'as').toString() === (e || '').toString()) found = category;
        });
        this.props.changeParentState?.({category: found, lessons: [], needUpdate: true});
    }
    searchCategory(e){
        clearTimeout(this.state.timeOutCategory);
        let cc = {pageSize: 10, pageNum: 0, search: e};
        let self = this;
        let timeOutCategory = setTimeout(() => {self.props.dispatch(getCategory(cc))}, 300);
        this.setState({timeOutCategory: timeOutCategory, searchCategory: e});
    }
    render() {
        const {test: {categories, gettingCategories}} = this.props;
        return (
            <>
                {
                    this.props.categoryParent && (Object.keys(this.props.categoryParent || {}).length || []) > 0 ?
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>Ангилал:&nbsp;</div>
                            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                                <Tooltip
                                    title={this.props.categoryParent?.title}
                                >
                                    <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '89%', marginRight: '1%'}}>
                                        <b>{this.props.categoryParent?.title}</b>
                                    </div>
                                </Tooltip>
                                <div onClick={() => this.props.changeParentState?.({category: '', lessons: [], needUpdate: true})}
                                     style={{display: 'flex', justifyContent: 'center', width: '9%', color: 'red', cursor: 'pointer', alignItems: 'center'}}
                                >
                                    <CloseCircleOutlined />
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            Ангилал: <b>Сонгоогүй байна.</b>
                        </div>
                }
                <Select
                    showArrow={false}
                    key={'test-category'}
                    showSearch={true}
                    searchValue={this.state.searchCategory}
                    allowClear={false}
                    style={{ width: '100%' }}
                    placeholder={"Ангилалын нэрээр хайх."}
                    loading={gettingCategories}
                    onSelect={(e) => this.findCategory(e)}
                    defaultActiveFirstOption={false}
                    onSearch={this.searchCategory.bind(this)}
                    notFoundContent={<Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Ангилал байхгүй байна.</span>} />}
                    filterOption={false}
                    value={null}
                >
                    {
                        (categories || []).map(cate => <Select.Option key={cate._id} value={cate._id}>{cate.title}</Select.Option>)
                    }
                </Select>
            </>
        );
    }
}

export default SelectCategory;