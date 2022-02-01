import './App.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  render() {

    return (
      <>
        <div>
          <Router>
            <Navbar title="News Headlines" />
            <Routes>
              <Route exact path='/' element={<News key="general" pageSize={5} category="general" />} />
              <Route exact path='/business' element={<News key="business" pageSize={5} category="business" />}/>
              <Route exact path='/entertainment' element={<News key="Entertainment" pageSize={5} category="Entertainment" />} />
              <Route exact path='/health' element={<News key="health" pageSize={5} category="health" />} />
              <Route exact path='/technology' element={<News  key="technology" pageSize={5} category="technology" />} />
              <Route exact path='/sports' element={<News key="sports" pageSize={5} category="sports" />} />
            </Routes>



          </Router>
        </div>
      </>
    )
  }
}
