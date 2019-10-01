import React, { Component } from 'react';

class Converter extends Component {
  state={
    amount : '',
    from: 'CAD',
    to: 'USD',
    converted: '',
    error: false    
  }
  
  componentDidMount() { 
    const today = new Date()
    let date = today.getDate()
    const day = today.getDay() 
    console.log(day)
    let sundays = day === 0 && day !== 6 ? date - 2 : date
    let saturdays = day === 6 && day !== 0 ? date - 1 : date
    let weekend = day === 0 ? sundays : saturdays;
    let latestDay = day === 0 || day === 6 ? weekend : date

    console.log(latestDay)
    const month = (today.getMonth() + 1).length > 1 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
    const formatted = today.getFullYear() + "-" + month + "-" +  latestDay
    

    fetch(`https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?start_date=${formatted}&end_date=${formatted}`, {             
    })
    .then(res => res.json())
    .then(result => {      
      console.log(result)
      this.setState({
        usdToCad: result.observations[0].FXUSDCAD.v               
      })
    
    })
    .then(() => { 
      const w = 1 / this.state.usdToCad
      console.log(w)
      this.setState({
        cadToUsd: w
      })
    })
    .catch(error => console.error('Error', error))
    
    fetch(`https://www.bankofcanada.ca/valet/observations/FXEURCAD/json?start_date=${formatted}&end_date=${formatted}`, {             
    })
    .then(res => res.json())
    .then(result => {      
      console.log(result)
      this.setState({
        euroToCad: result.observations[0].FXEURCAD.v               
      })
    
    })
    .then(() => { 
      const w = 1 / this.state.euroToCad
      const u = this.state.usdToCad / this.state.euroToCad
      const e = this.state.euroToCad / this.state.usdToCad
      console.log(w)
      this.setState({
        cadToEuro: w,
        usdToEuro: u,
        euroToUsd: e
      })
    })
    .catch(error => console.error('Error', error))
    // fetch(`http://data.fixer.io/api/latest?access_key=aa139048e9c95de99e9b37afc4acdf15&symbols=USD,CAD`, {
    // })
    // .then(res => res.json())
    // .then(result => {      
    //   this.setState({
    //     euroToUsd: result.rates.USD,
    //     euroToCad: result.rates.CAD,        
    //   }) 
    // })
    // .then(() => {
    //   const w = 1 / this.state.euroToCad
    //   const x = this.state.euroToUsd / this.state.euroToCad
    //   const y = this.state.euroToCad / this.state.euroToUsd
    //   const z = 1 / this.state.euroToUsd
      
    //   this.setState({ 
    //     cadToEuro: w,
    //     cadToUsd: x,
    //     usdToCad: y,
    //     usdToEuro: z
    //   })
    // })    
    // .catch(error => console.error('Error', error))
  }

  handleInputChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ amount: e.target.value })        
      this.getValue( e.target.value)
    }
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
    this.setState({ 
      to: e.target.value ,
      amount: '',
      converted: '',
      error: false    
    })                
  }

  getValue = (e) => {                
    const z = this.state;    
    const { from, to } = z
    const req = from+to

    switch(req) {
      case 'CADUSD':      
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
        this.setState({ converted: e })
        break      
      }
      case 'CADCAD': {     
        this.setState({ converted: e })
        break      
      }
      case 'EUREUR': {     
        this.setState({ converted: e })
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
            autoFocus
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
      <p className="disclaimer"><a href="https://fixer.io/faq" target="_blank">Disclaimer</a></p>
    </section>
  );
}
}

export default Converter;
