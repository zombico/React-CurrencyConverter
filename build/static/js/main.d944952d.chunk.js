(window.webpackJsonpconverter=window.webpackJsonpconverter||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},15:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(2),c=a.n(r),l=(a(13),a(14),a(3)),s=a(4),u=a(6),i=a(5),d=a(7),v=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={amount:"",from:"CAD",to:"USD",converted:"",error:!1},a.handleInputChange=function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&(a.setState({amount:e.target.value}),a.getValue(e.target.value))},a.handleFromChange=function(e){a.setState({from:e.target.value,amount:"",converted:"",error:!1})},a.handleToChange=function(e){a.setState({to:e.target.value,amount:"",converted:"",error:!1})},a.getValue=function(e){var t=a.state;switch(t.from+t.to){case"CADUSD":var n=t.cadToUsd*e;a.setState({converted:n.toFixed(3)});break;case"USDCAD":var o=t.usdToCad*e;a.setState({converted:o.toFixed(3)});break;case"CADEUR":var r=t.cadToEuro*e;a.setState({converted:r.toFixed(3)});break;case"EURCAD":var c=t.euroToCad*e;a.setState({converted:c.toFixed(3)});break;case"EURUSD":var l=t.euroToUsd*e;a.setState({converted:l.toFixed(3)});break;case"USDEUR":var s=t.usdToEuro*e;a.setState({converted:s.toFixed(3)});break;case"USDUSD":case"CADCAD":case"EUREUR":a.setState({converted:e});break;default:console.log("banana")}},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new Date,a=t.getDate(),n=t.getUTCDay();console.log(n);var o=0===n||1===n?0===n?0===n&&6!==n?a-2:n:6===n&&0!==n?a-1:n:n;console.log(o);var r=(t.getMonth()+1).length>1?t.getMonth()+1:"0"+(t.getMonth()+1),c=t.getFullYear()+"-"+r+"-"+o;fetch("https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?start_date=".concat(c,"&end_date=").concat(c),{}).then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({usdToCad:t.observations[0].FXUSDCAD.v})})).then((function(){var t=1/e.state.usdToCad;console.log(t),e.setState({cadToUsd:t})})).catch((function(e){return console.error("Error",e)})),fetch("https://www.bankofcanada.ca/valet/observations/FXEURCAD/json?start_date=".concat(c,"&end_date=").concat(c),{}).then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({euroToCad:t.observations[0].FXEURCAD.v})})).then((function(){var t=1/e.state.euroToCad,a=e.state.usdToCad/e.state.euroToCad,n=e.state.euroToCad/e.state.usdToCad;console.log(t),e.setState({cadToEuro:t,usdToEuro:a,euroToUsd:n})})).catch((function(e){return console.error("Error",e)}))}},{key:"render",value:function(){return o.a.createElement("section",null,o.a.createElement("div",null,o.a.createElement("h1",null,"Currency converter"),o.a.createElement("label",null," Type in amount and select currency: ",o.a.createElement("br",null),o.a.createElement("input",{autoFocus:!0,ref:function(e){return e&&e.focus()},name:"amount",onChange:this.handleInputChange,value:this.state.amount})),o.a.createElement("label",{"aria-label":"Convert From"},o.a.createElement("select",{name:"from",value:this.state.from,onChange:this.handleFromChange},o.a.createElement("option",{value:"CAD",name:"CAD"},"CAD "),o.a.createElement("option",{value:"USD",name:"USD"},"USD "),o.a.createElement("option",{value:"EUR",name:"EUR"},"EUR ")))),o.a.createElement("div",null,o.a.createElement("label",null," Converted Amount ",o.a.createElement("br",null),o.a.createElement("input",{value:this.state.converted,readOnly:!0})),o.a.createElement("label",{"aria-label":"Convert From"},o.a.createElement("select",{name:"to",value:this.state.to,onChange:this.handleToChange},o.a.createElement("option",{value:"CAD",name:"CAD"},"CAD "),o.a.createElement("option",{value:"USD",name:"USD"},"USD "),o.a.createElement("option",{value:"EUR",name:"EUR"},"EUR ")))),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("p",{className:"disclaimer"},o.a.createElement("a",{href:"https://fixer.io/faq",target:"_blank"},"Disclaimer")))}}]),t}(n.Component);var m=function(){return o.a.createElement(v,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,a){e.exports=a(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.d944952d.chunk.js.map