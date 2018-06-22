import React from 'react';
import { Menu, Icon, Row, Col } from 'antd';
import blog from '../image/blog.png';
import { Link } from 'react-router-dom';
import '../css/navigator.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Navigator extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Row>
          <Col  md={2} lg={4}/>
          <Col md={2} lg={2}>
            <Link to="/login" className="logo">
                <img src={blog} alt="logo"/>
                <span >Blog</span>
            </Link>
          </Col>
          <Col md={18} lg={14}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="mail">
                <Icon type="java" />Java
                </Menu.Item>
                <Menu.Item key="springboot" >
                    <Icon type="appstore" />SpringBoot
                </Menu.Item>
                <Menu.Item key="springcloud" >
                    <Icon type="appstore" />SpringCloud
                </Menu.Item>
                <Menu.Item key="react">
                    <Icon type="mail" />ReactJS
                </Menu.Item>
                <Menu.Item key="nginx" >
                    <Icon type="appstore" />Nginx
                </Menu.Item>
                <Menu.Item key="redis" >
                    <Icon type="appstore" />Redis
                </Menu.Item>
                <Menu.Item key="zookeeper" >
                    <Icon type="appstore" />Zookeeper
                </Menu.Item>
                <Menu.Item key="docker" >
                    <Icon type="appstore" />Docker
                </Menu.Item>
                <Menu.Item key="wechatapp" >
                    <Icon type="appstore" />微信小程序
                </Menu.Item>
            </Menu>
          </Col>
          <Col md={2} lg={4}/>
      </Row>
    );
  }
}