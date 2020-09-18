import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../config";
import moment from "moment";
import Login from "./Login";
import Routes from "../router";
import {renderRoutes} from 'react-router-config';
import {
    Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeFilled,
    LogoutOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import {Layout, Menu, message, Breadcrumb, Row, Button, Tooltip } from 'antd';
const {Header, Content, Sider, Footer} = Layout;
const { SubMenu } = Menu;
const reducer = ({ main }) => ({ main });


class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    componentDidMount() {
        this.onSuccessField = config.get('emitter').addListener('success', function (text) {
            message.success(text);
        });
        this.onErrorField = config.get('emitter').addListener('error', function (text) {
            message.warning(text);
        });
    }
    componentWillUnmount() {
        this.onErrorField.remove();
        this.onSuccessField.remove();
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        let { main:{user}, location, route: {routes} } = this.props;
        function setDefault(){
            let res = 'home';
            let a = location.pathname.split('/');
            switch(a[2]){
                case null: res = 'home'; break;
                case 'students': res = 'students'; break;
                // case 'tses':
                //     if(a[3] === 'food'){
                //         res = 'food'
                //     } else if(a[3] === 'category'){
                //         res = 'category'
                //     }
                //     break;
                default: res = 'home';
            }
            return res;
        }
        if (user === null || user === undefined || user === '') {
            return (
                <Fragment>
                    <Route exact path={'/admin/login'} component={Login}/>
                </Fragment>
            );
        } else {
            return (
                <Layout className='main-layout'>
                    <Sider
                        theme='light'
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={() => this.setState({collapsed: !this.state.collapsed})}
                    >
                        <div className="sider-logo">
                                {this.state.collapsed?
                                    <h3>OS</h3>
                                    :
                                    <h3>Odo Sury</h3>
                                }
                        </div>
                        <Menu theme="light" defaultSelectedKeys={[setDefault()]}  mode="inline">
                            <Menu.Item key="home" icon={<HomeFilled />}>
                                <Link to="/admin">
                                    <span>Нүүр</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="students" icon={<UserOutlined />}>
                                <Link to="/admin/students">
                                    <span>Сурагчид</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                        {/*<Button type="primary" onClick={() => this.toggleCollapsed()} style={{ marginBottom: 16, width: "100%"}}>*/}
                        {/*    {this.state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}*/}
                        {/*</Button>*/}
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" >
                            <Tooltip placement="bottom" title='Гарах'>
                                <a href="/logout" className='logout-button'><LogoutOutlined /></a>
                            </Tooltip>
                        </Header>

                        <Content className='odoSury-content'>
                            {renderRoutes(routes)}
                        </Content>
                    </Layout>
                </Layout>
            );
        }
    }
}

export default  connect(reducer)(index);