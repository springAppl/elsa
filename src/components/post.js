import React from 'react';
import LzEditor from 'react-lz-editor';
import {Button, Input, Form, message} from 'antd';
import '../css/post.css';
import ArticleTags from './articleTags';
import {put} from './FetchUtil';
const FormItem = Form.Item;
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: '请输入内容',
            tags: ['java', 'spring', 'reactjs'],
            id: null
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var formValue = this
            .props
            .form
            .getFieldsValue();
        formValue.tags = this.state.tags;
        formValue.content = this.state.htmlContent;
        formValue.id = this.state.id;
        put('/api/article', formValue, (data) => {
            this.setState({
                id: data.id
            });
            message.success('发布成功');
        });
    }
    receiveHtml = (content) => {
        this.setState({htmlContent: content});
    }
    changeTags = (tags) => {
        this.setState({
            tags: tags
        });
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
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    <span className="title">标题</span>
                    {getFieldDecorator('title')(<Input/>)}
                </FormItem>
                <FormItem>
                    <LzEditor
                        importContent={this.state.htmlContent}
                        cbReceiver={this.receiveHtml}
                        uploadProps={uploadProps}
                        lang="en"/>

                </FormItem>
                <FormItem>
                    <ArticleTags tags={this.state.tags} changeTags={this.changeTags}/>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}
const postEditor = Form.create()(Post);
export default postEditor;