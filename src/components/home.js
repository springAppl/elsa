import React from 'react';
import Navigator from './navigator';
import Tloader from 'react-touch-loader';
import '../css/home.css';
import '../css/tloader.less';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          canRefreshResolve: 1,
          listLen: 0,
          hasMore: 0,
          initializing: 0,
          refreshedAt: Date.now()
        }
      }
    
      refresh(resolve, reject) {
        setTimeout(() => {
          if (!this.state.canRefreshResolve) return reject();
    
          this.setState({
            listLen: 9,
            hasMore: 1,
            refreshedAt: Date.now()
          });
          resolve();
        }, 2e3);
      }
      loadMore(resolve) {
        setTimeout(() => {
          var l = this.state.listLen + 9;
    
          this.setState({
            listLen: l,
            hasMore: l > 0 && l < 50
          });
    
          resolve();
        }, 2e3);
      }
      componentDidMount() {
        setTimeout(() => {
          this.setState({
            listLen: 9,
            hasMore: 1,
            initializing: 0, // initialized
          });
        }, 2e3);
      }
      toggleCanRefresh() {
        this.setState({ canRefreshResolve: !this.state.canRefreshResolve });
      }
    


    render() {

        var { listLen, hasMore, initializing} = this.state;
        var list = [];
    
        if (listLen) {
          for (var i = 0; i < listLen; i++) {
            list.push(
              <li key={i}>
                <p>{i}</p>
              </li>
            );
          }
        }


        return (
            <div>
                <Navigator/>
                <Tloader className="main"
                  onRefresh={(resolve, reject) => this.refresh(resolve, reject)}
                  onLoadMore={(resolve) => this.loadMore(resolve)}
                  hasMore={hasMore}
                  initializing={initializing}>
                  <ul>{list}</ul>
                </Tloader>
            </div>
        );
    }
}