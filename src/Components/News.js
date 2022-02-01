
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';


export default class News extends Component {
  articles = [
   ]
   capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    console.log("hello i m newscomponent");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      }
      document.title=`${this.capitalizeFirstLetter(this.props.category)}-News Headlines`
  }
  async updateNews(){
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ffedf2d5cb784e80998000f4358d608f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles,
       totalResults:parsedData.totalResults,
       loading:false});

  }
 
async componentDidMount(){
this.updateNews();

  }
  handleNext = async () => {
  this.setState({page:this.state.page+1})
  this.updateNews();
   
  }
  handlePrevious = async () => {
    this.setState({page :this.state.page-1})
    this.updateNews();
  }
  render() {
    return (

      <>
        <div className="container my-3"> 
          <h1 className="text-center" style={{padding:"40px 0px "}}>News -Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
          {this.state.loading && <Spinner/>}
          <div className="row">
                  {!this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                       <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author = {element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                       })}
           </div>
            
           <div className="container my-2 d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>
           </div>


        </div>
      </>
    )
  }
}
