import React, { Component } from 'react';
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=5;
  api_key=process.env.REACT_APP_NEWS_API
  state={
    progress:10
  }
 setProgress=(progress)=>{
      this.setState({progress:progress})
  }
  render() {
    return <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress}  api_key={this.api_key} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
          <Route exact path="/home" element={<News setProgress={this.setProgress} api_key={this.api_key} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>

          <Route exact path="/business" element={<News setProgress={this.setProgress} api_key={this.api_key} key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} api_key={this.api_key} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
          <Route exact path="/general" element={<News setProgress={this.setProgress} api_key={this.api_key} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress} api_key={this.api_key} key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} api_key={this.api_key} key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} api_key={this.api_key} key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} api_key={this.api_key} key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>

        </Routes>
      </BrowserRouter>




    </div>;
  }
}

