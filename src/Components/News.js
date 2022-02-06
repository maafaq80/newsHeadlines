
import React, { useState,useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Newsitem from './Newsitem'
import Spinner from './Spinner';


export default function News(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const [articles, setArticles] = useState([]);    
    const [loading, setLoading] = useState(false);    
    const [page, setPage] = useState(1);    
    const [totalResults, setTotalResults] = useState(0);    


   document.title = `${capitalizeFirstLetter(props.category)}-News Headlines`;



  const updateNews= async()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=579166e43d7c48bfb86da898b5de3be9&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
 useEffect(() => {
   updateNews();
  },[]);
 
  

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=579166e43d7c48bfb86da898b5de3be9&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  }
  
    return (


      <>
        <div className="container">
          <h1 className="text-center" style={{ padding: "40px 0px " }}>News -Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
          {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >

            <div className="container">
              <div className="row" style={{ paddingTop: "20px", paddingRight: "25px" }}>
                {articles.map((element) => {
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