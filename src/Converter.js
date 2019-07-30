import React, {Component}  from "react";
import axios from "axios";
class Converter extends Component{
    state={
        currencies: ["USD", "AUD", "PHP", "EUR","CAD", "HKD", "ISK", "CHF", "TRY", "GBP", "ZAR", "JPY", "SGD", "BGN"],
        base:"USD",
        amount: "",
        convertTo: "EUR",
        result: "",
        date : "",
    }
    handleSelect=(c)=>{
     this.setState({
         [c.target.name] : c.target.value,
         result:null,
     },
     this.calculate
     );
    };

    handleInput=(d)=>{
        this.setState({
            amount: d.target.value,
            result:null,
        },

        this.calculate
        );
    };

    calculate=()=>{
        const amount=this.state.amount;
        if(amount === isNaN){
            return
        }else{
        //    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        //    .then(res=>res.json())
        axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
           .then(({data})=>{
               
               const date = data.date;
               const result = (data.rates[this.state.convertTo] *amount).toFixed(4);
               this.setState({ result , date
               });
              

           })
        }
        }
       
    handleSwap=(e)=>{
         const base=this.state.base
         const convertTo=this.state.convertTo
         e.preventDefault();
         this.setState({
          convertTo:base, base:convertTo,
          result:null,
         },
         this.calculate
         );
    };
    render(){
                 const {currencies, base, amount, convertTo, result, date} = this.state
        return(
           <div>
           <div className="container">
           <h1> Currency Converter </h1>
           
               <div className="row">
               <div className="col-lg-6 mx-auto">
               <div className="card card-body">
                <h5>{amount} {base} IS EQUIVALENT TO</h5>
                <h2>{result===null?"calculating ...":result} {convertTo}</h2>
                <p>As of {date}</p>
                <div className="row row-lg-12">
                    <div className= "col-lg-10">
                        <form className="form-inline md-4">
                        <input 
                        type="number"
                        value={amount}
                        onChange={this.handleInput}
                        className="form-control form-control-lg mx-3"/>
                         <select name="base"
                         value={base}
                         onChange={this.handleSelect}
                         className="form-control form-control-lg">
                             {currencies.map(currency => (<option key={currency}
                             value= {currency}> {currency} </option>))}
                         </select>
                        </form>
                              <br/>
                        <form className="form-inline md-4">
                        <input disabled={true}
                        value={result===null?"calculating...":result}
                         className="form-control form-control-lg mx-3"/>
                        <select name="convertTo"
                         value={convertTo}
                         onChange={this.handleSelect}
                         className="form-control form-control-lg">
                             {currencies.map(currency => (<option key={currency}
                             value= {currency}> {currency} </option>))}
                         </select>
                       
                        </form>
                    </div>
                        <div className="col-lg-2 align-self-center">
                            <h1 onClick={this.handleSwap} className="swap"> &#8595; &#8593; </h1>
                        </div>
                </div>
            </div>
               </div>

               </div>
           </div>
            
            </div>
        )
    }
};
export default Converter;