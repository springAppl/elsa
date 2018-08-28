import React from 'react';
import { Menu, Icon, Row, Col} from 'antd';
import blog from '../image/blog.png';
import { Link } from 'react-router-dom';
import '../css/navigator.css';
import {get, postURL} from './FetchUtil';
import MenuItem from 'antd/lib/menu/MenuItem';
const SubMenu = Menu.SubMenu;
export default class Navigator extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          name: null
      }
  }
  handleClick = (e) => {
    if(e.key === 'post') {
        window.location = '/post';
    } else if (e.key === 'logout') {
        this.logout();
    }
  }
  componentWillMount() {
      get('/api/user/detail', (data) => {
        this.setState({
            name: data.name
        });
      })
  }
  logout = () => {
    postURL('/api/logout');
  }
  render() {
    const loginButton = this.state.name?(
        <SubMenu title={<span><Icon type="setting" />{this.state.name}</span>}>
            <MenuItem key="post">
                发帖
            </MenuItem>
            <MenuItem key="logout">
                退出
            </MenuItem>
        </SubMenu>
    ):(
        <Menu.Item>
            <Link to="/login">登录</Link>
        </Menu.Item>
    );
    return (
      <Row>
          <Col sm={1} md={1} lg={2}/>
          <Col sm={2} md={2} lg={2}>
            <Link to="/login" className="logo">
                <img src={blog} alt="logo"/>
                <span >Blog</span>
            </Link>
          </Col>
          <Col sm={20} md={20} lg={18}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="hot">
                <Icon type="appstore" />热门
                </Menu.Item>
                <Menu.Item key="java" >
                    <Icon type="appstore" />Java
                </Menu.Item>
                <Menu.Item key="springboot" >
                    <Icon type="appstore" />SpringBoot
                </Menu.Item>
                <Menu.Item key="react">
                    <Icon type="appstore" />ReactJS
                </Menu.Item>
                <Menu.Item key="nginx" >
                    <Icon type="appstore" />Nginx
                </Menu.Item>
                <Menu.Item key="redis" >
                    <Icon type="appstore" />Redis
                </Menu.Item>
                <Menu.Item key="docker" >
                    <Icon type="appstore" />Docker
                </Menu.Item>
                <Menu.Item key="wechatapp" >
                    <Icon type="appstore" />微信小程序
                </Menu.Item>
                {loginButton}
            </Menu>
          </Col>
          <Col sm={1} md={1} lg={2}/>
      </Row>
    );
  }
}