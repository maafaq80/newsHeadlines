import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState,useEffect } from 'react';


export default function App() {
  const [progress, setProgress] = useState(0);
 

    return (
      <>
        <div>
          <Router>
            <Navbar title="News Headlines" />
            <LoadingBar
             color='#f11946'
             progress={setProgress}
             height={4}
             />
            <Routes>
              <Route exact path='/' element={<News setProgress={setProgress}  key="general" pageSize={5} category="general" />} />
              <Route exact path='/business' element={<News setProgress={setProgress}  key="business" pageSize={5} category="business" />}/>
              <Route exact path='/entertainment' element={<News setProgress={setProgress}  key="Entertainment" pageSize={5} category="Entertainment" />} />
              <Route exact path='/health' element={<News setProgress={setProgress}  key="health" pageSize={5} category="health" />} />
              <Route exact path='/technology' element={<News setProgress={setProgress}   key="technology" pageSize={5} category="technology" />} />
              <Route exact path='/sports' element={<News setProgress={setProgress}  key="sports" pageSize={5} category="sports" />} />
            </Routes>



          </Router>
        </div>
      </>
    )
  }

