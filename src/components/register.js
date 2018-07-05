import React from 'react';
import '../css/login.css';
import {
    Form,
    Icon,
    Input,
    Button,
    Row,
    Col,
    message
} from 'antd';
import {post} from './FetchUtil';
const FormItem = Form.Item;

class NormalRegisterForm extends React.Component {

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

        console.log(params);
        post('/api/user', {
            name: params['userName'],
            password: params['password']
        },
        (data) => {
            localStorage.setItem('name', data.name);
            this.setState({
                isLogin: true
            });
            message.success('登录成功');
        });
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
                            <Input
                                        prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                        type="password"
                                        placeholder="Please Confirm Password"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
            </Row>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default WrappedNormalRegisterForm;