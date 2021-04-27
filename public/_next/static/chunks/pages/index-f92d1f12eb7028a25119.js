(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3607:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893);function a(){return(0,r.jsxs)("footer",{className:"text-center text-sm p-4 pt-8",children:[(0,r.jsx)("p",{children:"Created by Yi Ding. Designed by Anna Ding."}),(0,r.jsxs)("p",{children:["Roll your own at:"," ",(0,r.jsx)("a",{href:"https://github.com/yisding/vaccinepassport",children:"https://github.com/yisding/vaccinepassport"})]})]})}},9955:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893);function a(e){var t=e.title;return(0,r.jsx)("header",{className:"bg-blue-500 p-4 text-center text-white text-2xl",children:(0,r.jsx)("h1",{children:t})})}},1092:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(18),a=n(5893),s=n(7757),i=n.n(s),c=n(2137),o=n(2592),l=n(9008),u=n(7294),d=n(5503);n(6690),n(3759),n(7895);d.Z.apps.length||d.Z.initializeApp({apiKey:"AIzaSyD682TiM3lkMAtCJgfv-NVA5j-KyRYLnUI",authDomain:"vaccinepassport-dev.firebaseapp.com",projectId:"vaccinepassport-dev",storageBucket:"vaccinepassport-dev.appspot.com",messagingSenderId:"300460643704",appId:"1:300460643704:web:078a83447ebbe7afb7648d"});var p=d.Z,x=n(3607),h=n(9955);function f(e){var t=e.url,n=(0,u.useState)(""),r=n[0],s=n[1];return(0,u.useEffect)((function(){o.toDataURL(t,{errorCorrectionLevel:"H",type:"image/png",scale:8,color:{dark:"#059669FF",light:"#F9FAFBFF"}},(function(e,t){if(e)throw e;s(t)}))}),[t]),(0,a.jsx)("img",{src:r,alt:"Scan QR Code to see vaccination card."})}function v(){return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12.588",height:"20.141",viewBox:"0 0 12.588 20.141",children:(0,a.jsx)("path",{d:"M97.469,59.762a1.8,1.8,0,0,0,0-2.562,1.823,1.823,0,0,0-2.562,0l-6.4,6.4-6.416-6.4a1.811,1.811,0,0,0-2.562,2.562l7.7,7.7a1.823,1.823,0,0,0,2.562,0Z",transform:"translate(68.624 -78.363) rotate(90)",fill:"#3b3434",stroke:"rgba(0,0,0,0)",strokeWidth:"1"})})}function g(e){var t=e.token,n=e.setImageUrl,r=(0,u.useRef)(null),s=(0,u.useState)(null),o=s[0],l=s[1];return(0,a.jsx)("form",{onSubmit:function(){var e=(0,c.Z)(i().mark((function e(a){var s,c,o,l,u;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),s=r.current.files[0],(c=new FormData).append("file",s),e.next=6,fetch("https://us-central1-vaccinepassport-dev.cloudfunctions.net/uploadImage",{method:"POST",body:c,headers:new Headers({Authorization:"Bearer ".concat(t)})});case 6:return o=e.sent,e.next=9,o.json();case 9:l=e.sent,u=l.payload.imageUrl,n(u);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:(0,a.jsxs)("div",{children:[(0,a.jsx)("input",{id:"image",type:"file",accept:"image/png, image/jpeg",ref:r,onChange:function(){if(1===r.current.files.length){var e=r.current.files[0],t=new FileReader;t.onload=function(){l(t.result)},t.readAsDataURL(e)}else l(null)},style:{opacity:0,position:"absolute",height:.1,width:.1}}),(0,a.jsx)("div",{children:o?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{children:(0,a.jsx)("button",{className:"p-4",onClick:function(e){e.preventDefault(),r.current.value="",l(null)},children:(0,a.jsx)(v,{})})}),(0,a.jsxs)("div",{className:"text-center pt-12",children:[(0,a.jsx)("div",{className:"p-4",children:(0,a.jsx)("img",{src:o})}),(0,a.jsx)("div",{className:"mt-8",children:(0,a.jsx)("input",{type:"submit",value:"Create My QR Code",disabled:!t||!o,className:"bg-blue-500 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2"})})]})]}):(0,a.jsxs)("div",{className:"py-32 text-center",children:[-1===navigator.userAgent.indexOf("Mobi")&&(0,a.jsx)("div",{className:"text-lg px-10 py-4",children:"Feel free to try this anywhere, but you probably want to use it on your phone."}),(0,a.jsx)("div",{className:"text-lg px-10",children:"Take a photo or upload a photo of your vaccine card."}),(0,a.jsx)("div",{className:"mt-8",children:(0,a.jsx)("label",{htmlFor:"image",className:"bg-blue-500 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2",children:"Upload Card"})})]})})]})})}function m(e){var t=e.imageUrl,n=e.setImageUrl,s=e.token,o=(0,u.useState)(null),l=o[0],d=o[1],x=(0,u.useState)([]),h=x[0],v=x[1],g=(0,u.useState)(!1),m=g[0],j=g[1],b=p.auth().currentUser.uid;(0,u.useEffect)((function(){var e=p.firestore().collection("users").doc(b);console.log("outside snapshot tickets"),console.log(l);var t=e.onSnapshot((function(e){var t=e.data();if(t){var n=t.tickets;v((function(e){for(var t=Date.now(),a=new Set(e),s=0,i=Object.keys(n);s<i.length;s++){var c=i[s];(n[c].expiration.toMillis()<t||n[c].approved)&&a.add(c)}return(0,r.Z)(a)})),d(n)}}));return function(){console.log("unsubscribe"),t()}}),[b]);var w=new URL(t,location.href),y=function(){if(!l)return{nextHash:null,nextExpiration:null,nextCode:null};for(var e=Object.keys(l),t=new Set(h),n=null,r=null,a=null,s=0,i=e;s<i.length;s++){var c=i[s];t.has(c)||(!r||l[c].expiration.toMillis()<r)&&(r=l[c].expiration.toMillis(),n=c,a=l[c].code)}return{nextHash:n,nextExpiration:r,nextCode:a}}(),N=y.nextHash,k=(y.nextExpiration,y.nextCode);return(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"text-2xl pt-20",children:"Ready to Scan"}),(0,a.jsx)("div",{className:"py-4 mx-auto w-56",children:(0,a.jsx)(f,{url:w.href})}),(0,a.jsx)("div",{children:N?(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"text-2xl px-8",children:[(0,a.jsx)("p",{children:"You have a request to view your image."}),(0,a.jsxs)("p",{children:["Code: ",k]})]}),(0,a.jsx)("div",{className:"mt-8",children:(0,a.jsx)("button",{onClick:(0,c.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://us-central1-vaccinepassport-dev.cloudfunctions.net/approveTicket"+"?hash=".concat(N),{method:"POST",headers:new Headers({Authorization:"Bearer ".concat(s)})});case 2:e.sent,(t=new Set(h)).add(N),v((0,r.Z)(t));case 6:case"end":return e.stop()}}),e)}))),className:"bg-blue-500 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2",children:"Approve"})}),(0,a.jsx)("div",{className:"mt-4",children:(0,a.jsx)("button",{onClick:function(){var e=new Set(h);e.add(N),v((0,r.Z)(e))},className:"bg-white rounded-full py-2 px-4 text-red-500 text-lg border-gray-600 border-2",children:"Deny"})})]}):(0,a.jsx)("button",{onClick:(0,c.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!0),e.next=3,fetch("https://us-central1-vaccinepassport-dev.cloudfunctions.net/deleteUser",{method:"POST",headers:new Headers({Authorization:"Bearer ".concat(s)})});case 3:e.sent,n(null);case 5:case"end":return e.stop()}}),e)}))),disabled:m,className:"mt-8 bg-red-600 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2",children:"Delete Image and Data"})})]})}function j(){var e=(0,u.useState)(null),t=e[0],n=e[1],r=(0,u.useState)(null),s=r[0],o=r[1],d=(0,u.useState)(!0),f=d[0],v=d[1];return(0,u.useEffect)((function(){(0,c.Z)(i().mark((function e(){var t,r,a,s,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.auth().signInAnonymously();case 2:return t=e.sent,e.next=5,t.user.getIdToken();case 5:return r=e.sent,n(r),e.next=9,fetch("https://us-central1-vaccinepassport-dev.cloudfunctions.net/getUrl",{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(r)})});case 9:return a=e.sent,e.next=12,a.json();case 12:s=e.sent,c=s.payload.imageUrl,o(c),v(!1);case 16:case"end":return e.stop()}}),e)})))()}),[]),(0,a.jsxs)("div",{className:"flex flex-col min-h-full bg-gray-50",children:[(0,a.jsxs)(l.default,{children:[(0,a.jsx)("title",{children:"DIY Vaccine Passport"}),(0,a.jsx)("link",{rel:"icon",href:"/vaccine.png"})]}),(0,a.jsx)(h.Z,{title:"Vaccine Passport"}),(0,a.jsx)("main",{className:"flex-grow",children:f?(0,a.jsx)("div",{className:"pt-8 text-2xl text-center",children:"Loading..."}):s?(0,a.jsx)(m,{imageUrl:s,setImageUrl:o,token:t}):(0,a.jsx)(g,{setImageUrl:o,token:t})}),(0,a.jsx)(x.Z,{})]})}},5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(1092)}])}},function(e){e.O(0,[774,200,834,351,139],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);