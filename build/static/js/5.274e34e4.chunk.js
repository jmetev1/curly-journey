(this["webpackJsonpexpress-HelloWorld"]=this["webpackJsonpexpress-HelloWorld"]||[]).push([[5,2,16],{40:function(e,t,n){var a=n(69);function r(e){return function(){return e[~~(Math.random()*e.length)]}}var i=e.exports=function(){return r(a)+" "+r(a)};i.first=i.middle=i.place=i.last=r(a)},69:function(e){e.exports=JSON.parse('["Aaberg","Bob","Randall","Farina","Donald"]')},74:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var r=n(14),a=n(2),i=n(5),l=n(6),o=n(8),c=n(7),u=n(19),s=n(9),d=n(0),p=n.n(d),f=n(26),b=n(40),y=n.n(b),v=n(27);function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var h=window.pglOptions.prefill,m=function(e){function AddProvider(){var e,t;Object(i.a)(this,AddProvider);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(t=Object(o.a)(this,(e=Object(c.a)(AddProvider)).call.apply(e,[this].concat(l)))).state={name:h?y.a.first()+" "+y.a.last():"",clinic:null,type:h?"MD":"",allMyClinics:[]},t.providerTypes=["MD","PA","NP","MSN"],t.SubmitButton=v.SubmitButton.bind(Object(u.a)(t)),t.submit=function(){var e=function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(n,!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t.state);delete e.allMyClinics,fetch(f.url+"provider",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()}))},t.Input=function(e){var n=e.id,r=e.label;return p.a.createElement(v.MyTextInputField,{required:!0,label:r,value:t.state[n],onChange:t.addValue.bind(Object(u.a)(t),n)})},t.SelectType=function(){return p.a.createElement(v.MySelectField,{label:"Provider Type",defaultValue:"MD",onChange:function onChange(e){return t.addValue("type",e)}},t.providerTypes.map((function(e){return p.a.createElement("option",{key:e,value:e},e)})))},t.See=function(){return p.a.createElement(v.DevInfo,null,Object.entries(t.state).map((function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return"allMyClinics"!==n&&p.a.createElement("div",{key:n},n," is ",a)})))},t}return Object(s.a)(AddProvider,e),Object(l.a)(AddProvider,[{key:"componentDidMount",value:function componentDidMount(){var e=this;Object(f.getMyClinics)().then((function(t){var n=function rando(e){return Math.floor(Math.random()*e)},r={allMyClinics:t};h&&(r.type=e.providerTypes[n(4)],r.clinic=t[n(t.length)]._id),e.setState(r,f.automatic?e.submit:function(){})}))}},{key:"addValue",value:function addValue(e,t){var n={};n[e]=t.target.value,this.setState(n)}},{key:"render",value:function render(){var e=this.state.allMyClinics;return p.a.createElement(p.a.Fragment,null,p.a.createElement(this.See,null),p.a.createElement(v.SelectClinic,{clinics:e,setClinic:this.addValue.bind(this,"clinic")}),p.a.createElement(this.Input,{id:"name",label:"Provider Name"}),p.a.createElement(this.SelectType,null),p.a.createElement(this.SubmitButton,null))}}]),AddProvider}(p.a.Component)}}]);
//# sourceMappingURL=5.274e34e4.chunk.js.map