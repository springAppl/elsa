import React from 'react';
import Navigator from './navigator';
import Tloader from 'react-touch-loader';
import '../css/home.css';
import '../css/tloader.less';
import {get} from './FetchUtil';
import {List, Row, Col, Icon, Avatar} from 'antd';
import {Link} from 'react-router-dom';
const IconText = ({type, text}) => (
    <span>
        <Icon type={type} style={{
            marginRight: 8
        }}/> {text}
    </span>
);
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            canRefreshResolve: 1,
            data: [],
            hasMore: false,
            initializing: 0,
            current: 1,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: 'Ant Design, a design language for background applications, is refined by Ant UED' +
                    ' Team.',
            content: 'We supply a series of design principles, practical patterns and high quality des' +
                    'ign resources (Sketch and Axure), to help people create their product prototypes' +
                    ' beautifully and efficiently.'
        }
    }

    refresh(resolve, reject) {
        // if (!this.state.canRefreshResolve) return reject();
        this.getArticle();
        resolve();
    }
    loadMore(resolve) {
        this.getArticle();
        resolve();
    }
    componentWillMount() {}
    componentDidMount() {
        this.getArticle();
    }
    toggleCanRefresh() {
        this.setState({
            canRefreshResolve: !this.state.canRefreshResolve
        });
    }
    getArticle = () => {
        get('/api/article/paging?pageNo=' + this.state.current, (data) => {
            this.setState((prevState) => ({
                data: prevState
                    .data
                    .concat(data.elements),
                current: prevState.current + 1,
                hasMore: prevState.current + 1 <= data.pages
            }));
        })
    }
    render() {
        return (
            <div className="vies">
                <Navigator/>
                <Row>
                    <Col sm={1} md={1} lg={2}/>
                    <Col span={20}>
                    <Tloader
                        className="main"
                        onRefresh={(resolve, reject) => this.refresh(resolve, reject)}
                        onLoadMore={(resolve) => this.loadMore(resolve)}
                        hasMore={this.state.hasMore}
                        initializing={this.state.initializing}>
                        <List
                            split={false}
                            itemLayout="vertical"
                            size="large"
                            dataSource={this.state.data}
                            renderItem={item => (
                            <Link to={'/article/detail/' + item.id}>
                                <List.Item
                                    key={item.title}
                                    actions={[ < IconText type = "star-o" text = "156" />, < IconText type = "like-o" text = "156" />, < IconText type = "message" text = "2" />
                                ]}
                                    extra={< img width = {
                                    272
                                }
                                alt = "logo" src = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>
                                    <List.Item.Meta
                                        avatar={< Avatar src = {
                                        this.state.avatar
                                    } />}
                                        title={item.title}
                                        description={this.state.description}/> {this.state.content}
                                </List.Item>
                            </Link>
                        )}/>
                    </Tloader>
                    </Col>
                    <Col sm={1} md={1} lg={2}/>
                </Row>
            </div>
        );
    }
}