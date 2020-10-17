import React from "react";
import { connect } from 'react-redux';
import config from "../../config";


const reducer = ({ main, bundle }) => ({ main, bundle });
import {
    Card,
} from 'antd';
import { getPayments } from '../../actions/purchase_actions';
import { EditOutlined, LoadingOutlined, DeleteFilled, PlusOutlined, CloseCircleFilled, UploadOutlined } from '@ant-design/icons';

class Purchase extends React.Component {
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
        this.props.dispatch(getPayments());
    }
    render() {
        let { main:{user}, bundle:{status, openModal, bundleLevelName, bundle, bundles, lessonValue, submitBundleLoader, lessons, bundleThumbnail} } = this.props;
        let avatar = '/images/default-bundle.png';
        if (bundleThumbnail && bundleThumbnail.path !== '') {
            avatar = `${config.get('hostMedia')}${bundleThumbnail.path}`;
        }
        return (
            <Card
                title="Худалдан авалт"
                bordered={true}
                loading={false}
            >
                sda
            </Card>
        );
    }
}

export default  connect(reducer)(Purchase);