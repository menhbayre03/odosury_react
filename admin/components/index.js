import React, {Fragment} from "react";
import { connect } from 'react-redux';
import Login from "./Login";
import {renderRoutes} from 'react-router-config';
import {
    Route,
    Link
} from 'react-router-dom';
import {
    UserOutlined,
    HomeFilled,
    LogoutOutlined,
    LayoutFilled,
    DollarCircleFilled,
    DatabaseFilled,
    FileTextFilled
} from '@ant-design/icons';
import {Layout, Menu, Tooltip, Button } from 'antd';
import * as actions from "../actions";
const {Header, Content, Sider} = Layout;
const reducer = ({ main }) => ({ main });


class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    async flush() {
        const result = await actions.flush();
        console.log(result)
    };
    render() {
        let { main:{user}, location, route: {routes} } = this.props;
        function setDefault(){
            let res = 'home';
            let a = location.pathname.split('/');
            switch(a[2]){
                case null: res = 'home'; break;
                case 'bundles': res = 'bundles'; break;
                case 'teachers': res = 'teachers'; break;
                case 'category': res = 'category'; break;
                case 'lessons': res = 'lessons'; break;
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
                            {/*<Menu.Item key="teachers" icon={<UserOutlined />}>*/}
                            {/*    <Link to="/admin/teachers">*/}
                            {/*        <span>Багш</span>*/}
                            {/*    </Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="users" icon={<UserOutlined />}>
                                <Link to="/admin/user">
                                    <span>Хэрэглэгч</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="category" icon={<DatabaseFilled />}>
                                <Link to="/admin/category">
                                    <span>Ангилал</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="lessons" icon={<FileTextFilled />}>
                                <Link to="/admin/lessons">
                                    <span>Хичээл</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="audios" icon={<FileTextFilled />}>
                                <Link to="/admin/audios">
                                    <span>Сонсдог ном</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="audioCategory" icon={<DatabaseFilled />}>
                                <Link to="/admin/audioCategory">
                                    <span>Сонсдог Ангилал</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="bundles" icon={<LayoutFilled />}>
                                <Link to="/admin/bundles">
                                    <span>Багц</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="purchases" icon={<DollarCircleFilled />}>
                                <Link to="/admin/purchases">
                                    <span>Худалдан авалт</span>
                                </Link>
                            </Menu.Item>
                            <Button style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'block',
                            }} type={"primary"} onClick={() => this.flush()}>Cache цэвэрлэх</Button>
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
