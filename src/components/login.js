import React from 'react';
import '../css/login.css';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Row,
    Col
} from 'antd';
import {postURL} from './FetchUtil';
import {Link} from 'react-router-dom';
import {
    withRouter
  } from 'react-router-dom'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    //console.log('Received values of form: ', values);
                }
            });
        const params = this
            .props
            .form
            .getFieldsValue();
        var url = '/api/login?account=' + params['userName'] + '&password=' + params['password'];
        postURL(url);
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row type="flex" justify="space-around" align="middle" className="login">
                <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                    placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Password!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                    type="password"
                                    placeholder="Password"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or
                            <Link to="/register">register now!</Link>
                        </FormItem>
                    </Form>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
            </Row>
        );
    }
}
export default withRouter(Form.create()(NormalLoginForm));