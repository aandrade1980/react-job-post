(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(34)},26:function(e,t,n){},27:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(14),c=n.n(l),o=(n(26),n(5)),i=n(6),u=n(11),s=n(7),m=n(12),d=n(37),p=n(35),h=n(39),f=n(36),b=(n(27),n(28),n(29),Object(a.memo)(function(e){var t=e.title;return r.a.createElement("header",{className:"header"},r.a.createElement("h1",null,t))})),E=n(15),v=n(38),j=(n(30),function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",description:""},n.submitJobPost=function(e){e.preventDefault();var t=new FormData;t.append("title",n.state.title),t.append("description",n.state.description),t.append("file",n.uploadInput.files[0]),fetch("/api/putJob",{method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){e.success?n.props.history.push("/"):console.log("Error: ",e.error)})},n.changeHandler=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(E.a)({},a,r))},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:this.submitJobPost},r.a.createElement("fieldset",null,r.a.createElement("legend",null,"Job Info"),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"title"},"Title:"),r.a.createElement("input",{type:"text",name:"title",value:this.state.title,onChange:this.changeHandler})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"description"},"Description:"),r.a.createElement("textarea",{name:"description",rows:"4",cols:"50",value:this.state.description,onChange:this.changeHandler})),r.a.createElement("div",null,r.a.createElement("label",null,"PrintScreen: "),r.a.createElement("input",{ref:function(t){e.uploadInput=t},type:"file"})),r.a.createElement("div",{className:"button"},r.a.createElement("button",{type:"submit"},"Send this!"))))}}]),t}(a.Component)),g=Object(v.a)(j),w=n(18),O=Object(a.lazy)(function(){return n.e(3).then(n.bind(null,41))}),y=function(){var e=Object(a.useState)([]),t=Object(w.a)(e,2),n=t[0],l=t[1];Object(a.useEffect)(function(){fetch("/api/getJobs").then(function(e){return e.json()}).then(function(e){return l(e.data)})},[]);var c=function(e){fetch("/api/deleteJob/".concat(e),{method:"DELETE"}).then(function(e){return e.json()}).then(function(e){return o(e.id)})},o=function(e){return l(n.filter(function(t){return t._id!==e}))};return r.a.createElement("div",{className:"jobList-container"},r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},n.length&&n.map(function(e){return r.a.createElement(O,{key:e._id,jobId:e._id,title:e.title,description:e.description,imgUrl:e.imgUrl,createdAt:e.createdAt,deleteJob:c})})))},J=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{title:"Jobs"}),r.a.createElement(d.a,null,r.a.createElement("main",null,r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(p.a,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(p.a,{to:"/new-post"},"New Job")))),r.a.createElement(h.a,null,r.a.createElement(f.a,{exact:!0,path:"/new-post",component:g}),r.a.createElement(f.a,{path:"/",component:y})))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.c04ea095.chunk.js.map