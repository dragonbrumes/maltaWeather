import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { API_ROOT } from '../config/apiConfig';

class Article extends Component {
  constructor(props) {
    super(props);
    // create a ref for futur return to top (cf render)
    this.top = React.createRef();
  }

  state = {
    metaTitle: undefined,
    title: undefined,
    content: undefined,
    articles: ''
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.someValue !== prevState.someValue) {
  //     return { someState: nextProps.someValue };
  //   } else return null;
  // }

  componentDidMount() {
    //grab article at start
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    // listen to new props and compare to old one to know if a rerender should run
    const { match } = this.props;
    const oldID = prevProps.match.params.id;
    const newID = match.params.id;
    if (oldID !== newID) {
      this.fetchArticles();
    }
    // return to top on loading
    this.top.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  fetchArticles = () => {
    // catch the url param of the article id sended by the router
    const { id } = this.props.match.params;
    // sending the article id to the back api
    axios.get(API_ROOT + 'article/' + id).then(res => {
      // populate state
      this.setState({
        metaTitle: res.data.metaTitle,
        title: res.data.title,
        content: res.data.content
      });
    });
  };

  render() {
    const { metaTitle, title, content } = this.state;

    // if (articles) {
    //   const Articles = () => {
    //     articles.map(el => {
    //       return (
    //         <div>
    //           <h1>{el.title}</h1>
    //           <div>{el.content}</div>
    //         </div>
    //       );
    //     });
    //   }; //const
    // } //if
    return (
      <div>
        <Helmet title={`${metaTitle} - malta-weather.net`} />
        <div className="article" ref={this.top}>
          <div className="article-content">
            <ReactMarkdown source={title} />
            <ReactMarkdown source={content} />
          </div>
        </div>
      </div>
    );
  }
}
// hoc withRouter for grabing url parameter (match.param)
export default withRouter(Article);
