import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Layout, Menu, message, Row, Button} from 'antd';
const {Header, Content, Sider} = Layout;
const rootElement = document.getElementById('admin');
import { withRouter } from "react-router"
require("../static/css/admin.less");
import config from './config';
import {
    Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeFilled,
} from '@ant-design/icons';
import configureStore from './store';
import {Provider} from 'react-redux';
import {createBrowserHistory as createHistory} from "history";
let history = createHistory();
let main = window.__INITIAL_STATE__;
const store = configureStore(main);

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Lesson from './components/Lesson';
import NotFound from './components/NotFound';

class ReactIndex extends React.Component {
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

    render() {
        let user = main.main.user;
        if (user === null || user === undefined || user === '') {
            return (
                <Fragment>
                    <Route exact path={'/admin'} component={Login}/>
                </Fragment>
            );
        } else {
            return (
                <Layout>
                    {/*<Scrollbars style={{width: 240, position: 'fixed', left: 0, height: '100vh'}}>*/}
                    <Sider
                        trigger={null}
                        // width={240}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" style={{textAlign: "center"}}>
                            <Link to="/dashboard">
                                <h3 style={{color: '#fff', padding: '20px 0 10px 0px'}}>PROGRID SYSTEMS</h3>
                            </Link>
                        </div>
                        <Menu theme={'dark'} defaultSelectedKeys={['home']} mode="inline">
                            <Menu.Item key="home" icon={<HomeFilled />}>
                                <Link to="/admin">
                                    <span>Хянах самбар</span>
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu
                                key="lesson"
                                title={
                                    <span>
                                            <span>Шийдэлs</span>
                                          </span>
                                }
                                icon={<HomeFilled />}
                            >
                                <Menu.Item key="lessonAll" icon={<HomeFilled />}>
                                    <Link to="/admin/lesson">
                                        <span>Бүх Хичээл</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="category" icon={<HomeFilled />}>
                                    <Link to="/admin/category">
                                        <span>Ангилал</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    {/*</Scrollbars>*/}
                    {/*<Layout style={{marginLeft: 240}}>*/}
                    <Layout>
                        <Header style={{background: '#fff'}}>
                            <Row align="middle" type="flex" justify="space-between">
                                <Button type="primary" onClick={() => this.toggle()} style={{ marginBottom: 16, width: "100%"}}>
                                    {this.state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                </Button>
                                <a href="/api/logout" style={{fontSize: 14}}> Гарах</a>
                            </Row>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                background: '#fff',
                                minHeight: 'calc(100vh - 112px)',
                            }}
                        >
                            <Switch>
                                <Route exact path='/admin' component={withRouter(Dashboard)}/>
                                <Route exact path='/admin/lesson' component={withRouter(Lesson)}/>
                                <Route exact path={'*'} component={withRouter(NotFound)} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            );
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <ReactIndex/>
        </Router>
    </Provider>
    ,

    rootElement
)
;