(this["webpackJsonpexpress-HelloWorld"]=this["webpackJsonpexpress-HelloWorld"]||[]).push([[18],{164:function(e,t,n){var r={"./":[35,9],"./AddClinic":[72,9,4],"./AddClinic.js":[72,9,4],"./AddProvider":[73,9,5],"./AddProvider.js":[73,9,5],"./AddVisit":[80,9,0,1,6],"./AddVisit.js":[80,9,0,1,6],"./App":[36,9],"./App.css":[47,7],"./App.js":[36,9],"./App.test":[74,9,9],"./App.test.js":[74,9,9],"./AppOld":[75,7,10],"./AppOld.js":[75,7,10],"./ErrorBoundary":[38,9],"./ErrorBoundary.js":[38,9],"./Fields":[26,9],"./Fields.js":[26,9],"./Login":[48,9,0,1,3],"./Login.js":[48,9,0,1,3],"./OneClinic":[70,9,11],"./OneClinic.js":[70,9,11],"./PastVisits":[76,9,7],"./PastVisits.js":[76,9,7],"./Settings":[81,9,12],"./Settings.js":[81,9,12],"./Signup":[77,9,0,1,8],"./Signup.js":[77,9,0,1,8],"./Validation":[67,9,0,13],"./Validation.js":[67,9,0,13],"./data":[69,9,14],"./data.js":[69,9,14],"./image/la_south.gif":[170,7,23],"./image/pglogo.webp":[171,7,21],"./image/pnglogo.png":[41,7],"./index":[35,9],"./index.css":[51,7],"./index.js":[35,9],"./logo.svg":[172,7,22],"./random-name":[39,7,2],"./random-name/":[39,7,2],"./random-name/index":[39,7,2],"./random-name/index.js":[39,7,2],"./random-name/names":[68,3,16],"./random-name/names.json":[68,3,16],"./random-name/places":[78,3,17],"./random-name/places.json":[78,3,17],"./serviceWorker":[79,9,15],"./serviceWorker.js":[79,9,15],"./url":[25,9],"./url.js":[25,9]};function webpackAsyncContext(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],a=t[0];return Promise.all(t.slice(2).map(n.e)).then((function(){return n.t(a,t[1])}))}webpackAsyncContext.keys=function webpackAsyncContextKeys(){return Object.keys(r)},webpackAsyncContext.id=164,e.exports=webpackAsyncContext},25:function(e,t,n){"use strict";n.r(t),n.d(t,"url",(function(){return r})),n.d(t,"getMyClinics",(function(){return a})),n.d(t,"automatic",(function(){return i})),n(92).load();var r="/api/",a=function getMyClinics(){return fetch(r+"clinic",{method:"GET"}).then((function(e){return e.json()}))},i=!1},26:function(e,t,n){"use strict";n.r(t),n.d(t,"MySelectField",(function(){return b})),n.d(t,"MyTextarea",(function(){return j})),n.d(t,"MyTextInputField",(function(){return O})),n.d(t,"SelectClinic",(function(){return w})),n.d(t,"Wrapper",(function(){return S})),n.d(t,"SubmitButton",(function(){return x})),n.d(t,"DevInfo",(function(){return k})),n.d(t,"addValue",(function(){return C})),n.d(t,"OneVisit",(function(){return A})),n.d(t,"Receipt",(function(){return P})),n.d(t,"Err",(function(){return B})),n.d(t,"compress",(function(){return D})),n.d(t,"Header",(function(){return F})),n.d(t,"Loading",(function(){return L})),n.d(t,"routeNames",(function(){return V})),n.d(t,"Pretty",(function(){return M}));var r=n(13),a=n(43),i=n.n(a),o=n(63),c=n(62),l=n(0),u=n.n(l),s=n(41),d=n.n(s),m=n(167),p=n(166),f=n(168),g=n(32),E=n(65),h=n(46),v=n(25),y=n(34),b=function MySelectField(e){return u.a.createElement(m.a,Object.assign({},e,{inputHeight:48}))},j=function MyTextarea(e){return u.a.createElement(p.a,Object.assign({},e,{style:{fontSize:"16px"}}))},O=function MyTextInputField(e){return u.a.createElement(f.a,Object.assign({},e,{inputHeight:48}))},w=function SelectClinic(e){var t=e.clinics,n=void 0===t?[]:t,r=e.setClinic;return u.a.createElement(b,{label:"Choose a clinic",onChange:r},[{_id:0,name:"Choose a clinic"}].concat(Object(c.a)(n)).map((function(e){var t=e._id,n=e.name;return u.a.createElement("option",{key:t,value:t},n)})))},S=function Wrapper(e){var t=e.children;return u.a.createElement(g.a,{display:"flex",padding:6,background:"tint2",borderRadius:3},u.a.createElement(g.a,{flex:1,alignItems:"center"},t))},x=function SubmitButton(e){var t=this,n=e.link,r=void 0===n?"":n,a=this.state,c=a.submitted;return a.waiting&&!c?"Submitting Data":c?u.a.createElement("div",null,"Successfully Submitted",u.a.createElement("div",null,r||u.a.createElement("button",{onClick:function reload(){return location.reload()}},"Add Another"))):u.a.createElement(E.a,{onClick:function doIt(){t.setState({submitted:!1,waiting:!0},Object(o.a)(i.a.mark((function _callee(){return i.a.wrap((function _callee$(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.submit();case 2:t.setState({submitted:!0});case 3:case"end":return e.stop()}}),_callee)}))))},appearance:"primary",children:"Submit"})},k=function DevInfo(e){var t=e.children;return window.pglOptions.showState&&u.a.createElement(u.a.Fragment,null,t)},C=function addValue(e,t){var n={},r=t.target.value;n[e]=r,this.setState(n)},A=function OneVisit(e){var t=e.visit,n=void 0===t?{}:t,r=e.spending;if(!n._id)return"Choose a Date";var a=n.amountSpent,i=n.providers,o=n.materials,c=n.receiptID,l=n.rep;return u.a.createElement(u.a.Fragment,null,u.a.createElement("h4",null,"For This Visit"),u.a.createElement("div",null,"Amount Spent: $",a),u.a.createElement("div",null,"Materials: ",o.length?o.join(" "):"None"),u.a.createElement("div",null,"Rep: ",l," "),u.a.createElement("div",null,"Providers Present:",u.a.createElement("ol",null,i.map((function(e){return r[e]?u.a.createElement("li",{key:e},r[e].name):"Loading"})))),c&&c.length?u.a.createElement(P,{src:"".concat(v.url,"receipt/").concat(c)}):"No image was uploaded")},P=function Receipt(e){var t=e.src,n=Object(l.useState)(!1),a=Object(r.a)(n,2),i=a[0],o=a[1],c=Object(l.useState)(!0),s=Object(r.a)(c,2),d=s[0],m=s[1],p=function toggle(){return o(!i)};return i?u.a.createElement("div",{className:"fill-screen-all"},u.a.createElement("button",{onClick:p,className:"top-right"},"X"),u.a.createElement("div",{onClick:p,className:"fill-screen"},u.a.createElement("div",{style:{transform:"rotate(90deg)"}},u.a.createElement("img",{className:"make-it-fit",src:t,alt:"receipt",onLoad:function onLoad(){return m(!1)}}),d&&u.a.createElement(h.a,null)))):u.a.createElement(u.a.Fragment,null,u.a.createElement("h4",null,"Click To Enlarge"),u.a.createElement("div",{style:{display:"flex",height:"350px"}},u.a.createElement("div",{style:{margin:"auto",transform:"rotate(90deg)"}},u.a.createElement("div",{onClick:p},u.a.createElement("img",{height:"250px",onLoad:function onLoad(){return m(!1)},src:t,alt:"receipt"}),d&&u.a.createElement(h.a,null)))))},B=function Err(e){var t=e.children;return u.a.createElement("div",{style:{background:"red"}},t)},D=function compress(e,t){e.persist();var n=new FileReader;n.readAsDataURL(e.target.files[0]),n.onload=function(r){var a=new Image;a.src=r.target.result,a.onload=function(){var n=document.createElement("canvas");n.width=1e3,n.height=a.height*(1e3/a.width);var r=n.getContext("2d");r.drawImage(a,0,0,1e3,n.height),r.canvas.toBlob((function(n){var r=new File([n],e.target.files[0].name,{type:"image/jpeg",lastModified:Date.now()});t(r)}),"image/jpeg",1)},n.onerror=function(e){return console.log(e)}}},F=function Header(e){var t=e.user,n=function MyButton(e){return u.a.createElement(E.a,Object.assign({style:{flex:"1 1 33%"},height:"36"},e))},a={margin:"auto"};return u.a.createElement("nav",{style:{display:"flex",flexWrap:"wrap"}},window.pglOptions.dev&&u.a.createElement(n,{key:"user",children:u.a.createElement("span",{style:a},"user is ",t)}),u.a.createElement(n,{key:"logout",onClick:function logout(){return fetch(v.url+"logout").then((function(){return location.reload()}))},children:u.a.createElement("span",{style:a},"Logout")}),Object.entries(V).filter((function(e){var n=Object(r.a)(e,1)[0];return"admin"!==t||"Past Visits"===n})).map((function(e){var t=Object(r.a)(e,2),i=t[0],o=Object(r.a)(t[1],1)[0];return!0!==window.pglOptions.settings&&"Settings"===i?null:u.a.createElement(n,{key:i,appearance:window.location.href.includes(o)?"primary":"default"},u.a.createElement(y.c,{to:"/".concat(o),style:{width:"100%",textDecoration:"none",color:"unset"}},u.a.createElement("span",{style:a},i)))})))},L=function Loading(){return u.a.createElement(g.a,{paddingTop:15,paddingBottom:100,height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"},u.a.createElement("div",{width:"90vw",border:"default",style:{textAlign:"center"}},u.a.createElement("img",{src:d.a,height:"47px",alt:"pgl logo"}),u.a.createElement("h4",null,"Please wait, loading ")))},V={"Past Visits":["pastvisits"],"Add Clinic":["addclinic"],"Add Provider":["addprovider"],"Add Visit":["addvisit"],Settings:["settings"]},M=function Pretty(e){var t=e.children,n=e.user;return u.a.createElement(u.a.Fragment,null,u.a.createElement(F,{user:n}),u.a.createElement(g.a,{paddingTop:15,paddingBottom:100,display:"flex",alignItems:"center",justifyContent:"center"},u.a.createElement(g.a,{width:"90vw",border:"default"},t)))}},35:function(e,t,n){"use strict";n.r(t);var r=n(13),a=n(0),i=n.n(a),o=n(50),c=n.n(o),l=(n(51),n(36)),u=n(25),s=n(38);window.pglOptions||(window.pglOptions={});for(var d=fetch(u.url+"login",{credentials:"include"}),m=0,p=Object.entries({dev:!1,validate:!0,prefill:!1,showState:!1,settings:!1});m<p.length;m++){var f=p[m],g=Object(r.a)(f,2),E=g[0],h=g[1],v=localStorage[E];window.pglOptions[E]=v?"true"===v:h}c.a.render(i.a.createElement(s.ErrorBoundary,null,i.a.createElement(a.StrictMode,null,i.a.createElement(l.default,{userPromise:d}))),document.getElementById("root"))},36:function(e,t,n){"use strict";n.r(t);var r=n(13),a=n(0),i=n.n(a),o=(n(47),n(34)),c=n(15),l=n(26);t.default=function App(e){var t=e.userPromise,u=window.pglOptions.dev,s=Object(a.useState)(!u),d=Object(r.a)(s,2),m=d[0],p=d[1],f=Object(a.useState)(u?"test":null),g=Object(r.a)(f,2),E=g[0],h=g[1];return Object(a.useEffect)((function(){t.then((function(e){return e.json()})).then((function(e){h(e),p(!1)})).catch((function(e){throw new Error("app js setState on comp did mount")}))}),[t]),m?i.a.createElement(l.Loading,null):i.a.createElement(o.a,null,i.a.createElement(a.Suspense,{fallback:i.a.createElement(l.Loading,null)},i.a.createElement(c.d,null,Object.keys(l.routeNames).map((function(e){var t=e.split(" ").join("");return i.a.createElement(c.b,{key:t,path:"/".concat(t.toLowerCase()),render:function render(e){if(E){var r=Object(a.lazy)((function(){return n(164)("./".concat(t))}));return i.a.createElement(l.Pretty,{user:E},i.a.createElement(r,Object.assign({},e,{user:E})))}return i.a.createElement(c.a,{to:"/login"})}})})),i.a.createElement(c.b,{path:"/login",render:function render(){var e=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(3)]).then(n.bind(null,48))}));return i.a.createElement(e,{setUser:h,user:E})}}),i.a.createElement(c.b,null,i.a.createElement(c.a,{to:E?"/addvisit":"/login"})))))}},38:function(e,t,n){"use strict";n.r(t),n.d(t,"ErrorBoundary",(function(){return m}));var r=n(13),a=n(1),i=n(4),o=n(5),c=n(7),l=n(6),u=n(8),s=n(0),d=n.n(s);function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var m=function(e){function ErrorBoundary(e){var t;return Object(i.a)(this,ErrorBoundary),(t=Object(c.a)(this,Object(l.a)(ErrorBoundary).call(this,e))).state={error:null},t}return Object(u.a)(ErrorBoundary,e),Object(o.a)(ErrorBoundary,[{key:"componentDidCatch",value:function componentDidCatch(e,t){this.setState(function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(n,!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({error:e},t))}},{key:"render",value:function render(){return this.state.error?d.a.createElement(d.a.Fragment,null,d.a.createElement("h1",null,"Something went wrong."),d.a.createElement("a",{href:"/"},d.a.createElement("h2",null,"Click here to reload")),Object.entries(this.state).map((function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return d.a.createElement("div",{style:{outline:"solid",padding:"10px"},key:n},n," is ",a.toString())}))):this.props.children}}]),ErrorBoundary}(d.a.Component)},41:function(e,t,n){e.exports=n.p+"static/media/pnglogo.a87f43c6.png"},47:function(e,t,n){},51:function(e,t,n){},86:function(e,t,n){e.exports=n(35)}},[[86,19,20]]]);
//# sourceMappingURL=main.a0e0e79f.chunk.js.map