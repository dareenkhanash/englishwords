import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
      defintion: ''
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }
  onClick(e) {

    const word = this.state.word;
    var that = this;
    axios({
      method: 'get',
      url: 'http://localhost:5000/search/' + word
    })
      .then(function (response) {
        console.log(response);
        that.setState({ defintion: response.data });
      }).catch(err => { that.setState({ defintion: "" }) });

  }
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <div className="container">
            <h1>English word API</h1>
            <div className="row justify-content-md-center">
              <div className="col-md-4">
                <input type="text" name="word" className="btn-block" value={this.state.name}
                  onChange={this.onChange} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary btn-block"
                  name="btnDef" onClick={this.onClick} >
                  Defintion
                </button>
              </div>

            </div>
            <br />
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                <textarea type="text" name="defintion" value={this.state.defintion}
                  className="btn-block textArea" onChange={this.onChange} />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
