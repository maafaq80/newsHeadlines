
import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Newsitem from './Newsitem'
import Spinner from './Spinner';


export default class News extends Component {
  articles = [
  ]
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("hello i m newscomponent");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-News Headlines`
  }



  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=233df1b9377448d8a09295b3df9aa193&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=233df1b9377448d8a09295b3df9aa193&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });

  }
  render() {
    return (


      <>
        <div className="container">
          <h1 className="text-center" style={{ padding: "40px 0px " }}>News -Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >

            <div className="container">
              <div className="row" style={{ paddingTop: "20px", paddingRight: "25px" }}>
                {this.state.articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>




      </>
    )
  }
}
