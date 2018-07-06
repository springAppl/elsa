import React from 'react';
import LzEditor from 'react-lz-editor';
import {Button, Input, Form, message} from 'antd';
import '../../css/article/post.css';
import ArticleTags from './articleTags';
import {put} from '../FetchUtil';
const FormItem = Form.Item;
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: null,
            tags: ['java', 'spring', 'reactjs'],
            id: null,
            responseList: []
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
        this.setState({responseList:[]});
    }
    changeTags = (tags) => {
        this.setState({
            tags: tags
        });
    }
    render() {
        const uploadProps = {
            action: "/api/image",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => {},
            multiple: true,
            showUploadList: true
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    <span className="title">标题</span>
                    {getFieldDecorator('title')(<Input/>)}
                </FormItem>
                <FormItem>
                <LzEditor
                        active={true}
                        importContent='请输入内容'
                        cbReceiver={this.receiveHtml}
                        uploadProps={uploadProps}
                        lang="en"/>
                </FormItem>
                <FormItem>
                    <ArticleTags tags={this.state.tags} changeTags={this.changeTags}/>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
            </div>
        );
    }
}
const postEditor = Form.create()(Post);
export default postEditor;