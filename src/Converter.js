import React, { Component } from 'react';
import './App.css';


class Converter extends Component {
  state={
    amount : '',
    from: 'CAD',
    to: 'USD',
    converted: ''    
  }
  

  componentDidMount() {    
    fetch(`http://data.fixer.io/api/latest?access_key=aa139048e9c95de99e9b37afc4acdf15&symbols=USD,CAD`, {
    })
    .then(res => res.json())
    .then(result => {      
      this.setState({
        euroToUsd: result.rates.USD,
        euroToCad: result.rates.CAD,        
      }) 
    })
    .then(() => {
      const x = this.state.euroToUsd / this.state.euroToCad
      const y = this.state.euroToCad / this.state.euroToUsd
      this.setState({ 
        cadToUsd: x,
        usdToCad: y
      })
    })    
    .catch(error => console.error('Error', error))
  }

  handleInputChange = e => {
    this.setState({ amount: e.target.value })
    this.getValue( e.target.value)
  }

  handleFromChange = e => {
    this.setState({ from: e.target.value })
    this.getValue(this.state.amount)    
  }

  getValue = (e) => {            
    console.log(e)
    const z = this.state;    
    const { from, to } = z

    const req = from+to
    switch(req) {
      case 'CADUSD':
        let amtCadtoUsd = z.cadToUsd * e;
        this.setState({ converted: amtCadtoUsd })
      case 'EURUSD':
        let amtEurotoUsd = z.euroToUsd * e;
        this.setState({ converted: amtEurotoUsd })
    }
  }

  render() {

  
  return (
    <section>      
      <div>
        <h1>Currency converter</h1>
        <label> Type in amount and select currency: <br/>
          <input name="amount" onChange={this.handleInputChange}/>
        </label>
        <label aria-label="Convert From">
          <select name="from" value={this.state.from} onChange={this.handleFromChange}>
            <option value='CAD' name='CAD'>CAD </option>
            <option value='USD' name='USD'>USD </option>
            <option value='EUR' name='EUR'>EUR </option>
          </select>
        </label>
      </div>


      <div>
        <label> Converted Amount <br/>
          <input value={this.state.converted} disabled/>
        </label>
        <label aria-label="Convert From">
        <select name="to" value={this.state.to} onChange={this.handleChange}>
          <option value='CAD' name='CAD'>CAD </option>
          <option value='USD' name='USD'>USD </option>
          <option value='EUR' name='EUR'>EUR </option>
        </select>
        </label>
      </div>
    </section>
  );
}
}

export default Converter;
