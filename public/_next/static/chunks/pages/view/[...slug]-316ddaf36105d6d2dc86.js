(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[165,179],{2137:function(e,n,t){"use strict";function c(e,n,t,c,r,s,o){try{var a=e[s](o),i=a.value}catch(u){return void t(u)}a.done?n(i):Promise.resolve(i).then(c,r)}function r(e){return function(){var n=this,t=arguments;return new Promise((function(r,s){var o=e.apply(n,t);function a(e){c(o,r,s,a,i,"next",e)}function i(e){c(o,r,s,a,i,"throw",e)}a(void 0)}))}}t.d(n,{Z:function(){return r}})},2484:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});var c=t(5893),r=t(7757),s=t.n(r),o=t(2137),a=t(1163),i=t(7294);function u(){var e=(0,a.useRouter)().query.slug,n=(0,i.useState)(null),t=n[0],r=n[1],u=(0,i.useState)(null),d=u[0],l=u[1],p=(0,i.useState)(null),f=(p[0],p[1]),h=null;return"object"===typeof e&&(h=e.join("/")),(0,i.useEffect)((function(){(0,o.Z)(s().mark((function e(){var n,t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,fetch("https://us-central1-vaccinepassport-dev.cloudfunctions.net/getTicket"+"?image=".concat(encodeURIComponent(h)),{method:"POST"});case 4:return n=e.sent,e.next=7,n.json();case 7:(t=e.sent).error?f(t.error):r(t);case 9:case"end":return e.stop()}}),e)})))()}),[h]),(0,i.useEffect)((function(){if(h){var e=function(){var n=(0,o.Z)(s().mark((function n(){var c,r;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t){n.next=9;break}return n.next=3,fetch("https://us-central1-vaccinepassport-dev.cloudfunctions.net/canAccessImage"+"?image=".concat(encodeURIComponent(h),"&hash=").concat(encodeURIComponent(t.hash)));case 3:return c=n.sent,n.next=6,c.json();case 6:r=n.sent,l(r.approved),"not yet"===r.approved&&setTimeout(e,5e3);case 9:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();e()}}),[h,t]),h?(0,c.jsxs)("div",{children:[(0,c.jsx)("header",{className:"bg-blue-500 p-4 text-center text-white text-2xl",children:(0,c.jsx)("h1",{children:"Vaccine Passport Viewer"})}),t?(0,c.jsxs)("div",{className:"text-2xl p-8 text-center",children:[(!d||"not yet"===d)&&t&&(0,c.jsxs)("div",{children:[(0,c.jsx)("p",{children:"Requesting Access."}),(0,c.jsxs)("p",{children:["Your code is ",t.code,"."]})]}),d&&"invalid ticket"===d&&(0,c.jsx)("div",{children:"Please rescan the QR code."}),d&&"approved"===d&&(0,c.jsx)("img",{src:"https://us-central1-vaccinepassport-dev.cloudfunctions.net/downloadImage"+"?image=".concat(encodeURIComponent(h),"&hash=").concat(encodeURIComponent(t.hash))})]}):(0,c.jsx)("div",{className:"pt-8 text-2xl text-center",children:"Loading..."}),(0,c.jsx)("footer",{className:"text-center text-sm p-4 pt-8",children:"Created by Yi Ding. Designed by Anna Ding."})]}):null}},8826:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/view/[...slug]",function(){return t(2484)}])},1163:function(e,n,t){e.exports=t(2441)},4453:function(){}},function(e){e.O(0,[774,351,433],(function(){return n=8826,e(e.s=n);var n}));var n=e.O();_N_E=n}]);