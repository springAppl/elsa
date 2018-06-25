import React from 'react';
import { Menu, Icon, Row, Col } from 'antd';
import blog from '../image/blog.png';
import { Link } from 'react-router-dom';
import '../css/navigator.css';

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
                <Menu.Item key="springcloud" >
                    <Icon type="appstore" />SpringCloud
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
            </Menu>
          </Col>
          <Col sm={1} md={1} lg={2}/>
      </Row>
    );
  }
}