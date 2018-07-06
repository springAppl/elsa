import React from 'react';
import {get} from '../FetchUtil';
import Navigator from '../navigator';
import {Row, Col} from 'antd';
import '../../css/article.css';
export default class ArticleDetail extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title: null,
            content: null,
            id: this.props.match.params.id
        }
    }


    componentWillMount() {
        get('/api/article/' + this.state.id, (data) => {
            this.setState({
                title: data.title,
                content: data.content
            });
        })
    }
    
    
    render(){
        return(
            <div>
                <Navigator/>
                <Row>
                    <Col sm={1} md={1} lg={2}/>
                    <Col span={20}>
                        <article>
                            <h1 className="title">{this.state.title}</h1>
                            <div dangerouslySetInnerHTML={{__html: this.state.content}}>

                            </div>
                        </article>
                    </Col>
                    <Col sm={1} md={1} lg={2}/>
                </Row>
            </div>
        );
    }
}