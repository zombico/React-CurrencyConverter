import React, { Component } from 'react';
import './App.css';


class Converter extends Component {
  state={
    amount : '',
    from: 'CAD',
    to: 'USD',
    converted: '',
    error: false    
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
      const w = 1 / this.state.euroToCad
      const x = this.state.euroToUsd / this.state.euroToCad
      const y = this.state.euroToCad / this.state.euroToUsd
      const z = 1 / this.state.euroToUsd
      
      this.setState({ 
        cadToEuro: w,
        cadToUsd: x,
        usdToCad: y,
        usdToEuro: z
      })
    })    
    .catch(error => console.error('Error', error))
  }

  handleInputChange = e => {
    this.setState({ amount: e.target.value })
    this.getValue( e.target.value)
  }

  handleFromChange = e => {
    this.setState({ 
      from: e.target.value,
      amount: '',  
      converted: '',
      error: false
    })
    
  }

  handleToChange = e => {
    this.getValue(this.state.amount)      
    this.setState({ 
      to: e.target.value ,
      amount: '',
      converted: '',
      error: false    
    })
    
    
        
  }

  getValue = (e) => {            
    console.log(e)
    const z = this.state;    
    const { from, to } = z

    const req = from+to
    switch(req) {
      case 'CADUSD':
      console.log('cad to usd')      
        let amtCadtoUsd = z.cadToUsd * e;
        
        this.setState({ converted: amtCadtoUsd.toFixed(3) })
        break
      case 'USDCAD':
      
        let amtUsdtoCad = z.usdToCad * e;
        this.setState({ converted: amtUsdtoCad.toFixed(3) })
        break
      case 'CADEUR':
      
        let amtCadtoEur = z.cadToEuro * e;
        this.setState({ converted: amtCadtoEur.toFixed(3) })
        break
      case 'EURCAD':
      
        let amtEurtoCad = z.euroToCad * e;
        this.setState({ converted: amtEurtoCad.toFixed(3) })
        break
      case 'EURUSD':
        let amtEurotoUsd = z.euroToUsd * e;
      
        this.setState({ converted: amtEurotoUsd.toFixed(3) })
        break
      case 'USDEUR':
        let amtUsdtoEuro = z.usdToEuro * e;
      
        this.setState({ converted: amtUsdtoEuro.toFixed(3) })
        break      
      case 'USDUSD': {
      
        this.setState({ error: true })
        break      
      }
      default :
      console.log('banana')
    }
  }

  render() {

  
  return (
    <section>      
      <div>
        <h1>Currency converter</h1>
        <label> Type in amount and select currency: <br/>
          <input 
            ref={input => input && input.focus()} 
            name="amount" 
            onChange={this.handleInputChange} 
            value={this.state.amount}
            />
        </label>
        <label aria-label="Convert From">
          <select name="from" value={this.state.from} onChange={this.handleFromChange}>
            <option value='CAD' name='CAD'>CAD </option>
            <option value='USD' name='USD'>USD </option>
            <option value='EUR' name='EUR'>EUR </option>
          </select>
          { this.state.error && 
            <span>Please select different currencies</span>
          }
        </label>
      </div>


      <div>
        <label> Converted Amount <br/>
          <input value={this.state.converted} readOnly/>
        </label>
        <label aria-label="Convert From">
        <select name="to" value={this.state.to} onChange={this.handleToChange}>
          <option value='CAD' name='CAD'>CAD </option>
          <option value='USD' name='USD'>USD </option>
            <option value='EUR' name='EUR'>EUR </option>
        </select>
        </label>
      </div>

      <br/><br/>
      <a href="https://fixer.io/faq" target="_blank">Disclaimer</a>
    </section>
  );
}
}

export default Converter;
