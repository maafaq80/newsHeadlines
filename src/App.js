import './App.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress})
  }

  render() {

    return (
      <>
        <div>
          <Router>
            <Navbar title="News Headlines" />
            <LoadingBar
             color='#f11946'
             progress={this.state.progress}
             height={4}
             />
            <Routes>
              <Route exact path='/' element={<News setProgress={this.setProgress}  key="general" pageSize={5} category="general" />} />
              <Route exact path='/business' element={<News setProgress={this.setProgress}  key="business" pageSize={5} category="business" />}/>
              <Route exact path='/entertainment' element={<News setProgress={this.setProgress}  key="Entertainment" pageSize={5} category="Entertainment" />} />
              <Route exact path='/health' element={<News setProgress={this.setProgress}  key="health" pageSize={5} category="health" />} />
              <Route exact path='/technology' element={<News setProgress={this.setProgress}   key="technology" pageSize={5} category="technology" />} />
              <Route exact path='/sports' element={<News setProgress={this.setProgress}  key="sports" pageSize={5} category="sports" />} />
            </Routes>



          </Router>
        </div>
      </>
    )
  }
}
