import React from 'react';
import LzEditor from 'react-lz-editor';
import {Button, Input, Form} from 'antd';
import '../css/post.css';
import ArticleTags from './articleTags';
import {format} from 'upath';
const FormItem = Form.Item;
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: '请输入内容',
            responseList: []
        }
        this.receiveHtml = this
            .receiveHtml
            .bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        const formValue = this
            .props
            .form
            .getFieldsValue();
        console.log(formValue);
    }
    receiveHtml(content) {
        console.log("recieved HTML content", content);
        this.setState({responseList: []});
    }
    render() {
        const uploadProps = {
            action: "http://v0.api.upyun.com/devopee",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => {},
            multiple: true,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this
                .handleSubmit
                .bind(this)}>
                <FormItem>
                    <span className="title">标题</span>
                    {getFieldDecorator('title')(<Input/>)}
                </FormItem>
                <FormItem>
                    {/* {getFieldDecorator('content', {})(
          )} */}
                    <LzEditor
                        active={true}
                        importContent={this.state.htmlContent}
                        cbReceiver={this.receiveHtml}
                        uploadProps={uploadProps}
                        lang="en"/>

                </FormItem>
                <FormItem>
                    <ArticleTags tags={['java', 'spring', 'reactjs']}/>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}
const postEditor = Form.create()(Post);
export default postEditor;