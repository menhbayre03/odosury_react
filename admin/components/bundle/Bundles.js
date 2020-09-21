import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";


const reducer = ({ main }) => ({ main });
import { Card, Button, Avatar  } from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined } from '@ant-design/icons';
const { Meta } = Card;

class Bundle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        let { main:{user}, location, route: {routes} } = this.props;
        return (
            <Card
                title="Багцууд"
                bordered={true}
                loading={false}
                extra={
                    <Button type="primary" icon={<PlusOutlined />} >
                        Багц
                    </Button>
                }
            >
                {/*<Card*/}
                {/*    hoverable*/}
                {/*    style={{ width: 240, display: 'inline-block', marginRight: 40 }}*/}
                {/*    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}*/}
                {/*>*/}
                {/*    <Meta title="Europe Street beat" description="www.instagram.com" />*/}
                {/*</Card>*/}
                {/*<Card*/}
                {/*    hoverable*/}
                {/*    style={{ width: 240, display: 'inline-block', marginRight: 40 }}*/}
                {/*    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}*/}
                {/*>*/}
                {/*    <Meta title="Europe Street beat" description="www.instagram.com" />*/}
                {/*</Card>*/}
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
            </Card>
        );
    }
}

export default  connect(reducer)(Bundle);