(this["webpackJsonpribeegomfkerho-app"]=this["webpackJsonpribeegomfkerho-app"]||[]).push([[0],{58:function(e,t,a){},83:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(20),r=a.n(c),i=(a(58),a(26)),j=a(5),s=a(22),o=a(94),h=a(98),l=a(95),b=a(99),u=a(96),d=a(2),O=function(e){var t=e.laskuri,a=e.handleClick,n=["Lasketaan tasoituksia","Pisteiden derivointia","Miinustetaan Antin tarinat","Otetaan m\xf6rrikerroin huomioon","Henkka"];return-1===t?Object(d.jsx)(b.a,{variant:"contained",color:"primary",onClick:a,children:"Laske kerhon paras pelaaja"}):Object(d.jsx)("div",{children:t<n.length-1?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(u.a,{}),Object(d.jsx)(l.a,{variant:"h5",children:n[t]})]}):Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)(l.a,{variant:"h5",children:["Paras pelaaja on ",Object(d.jsx)("strong",{children:"Henkka"})]})})})},p=function(){var e=Object(n.useState)(-1),t=Object(s.a)(e,2),a=t[0],c=t[1],r=function e(t){c(t+1),t<3&&setTimeout((function(){e(t+1)}),Math.floor(5e3*Math.random()))};return Object(d.jsx)(o.a,{children:Object(d.jsxs)(h.a,{textAlign:"center",children:[Object(d.jsx)(i.b,{to:"/rawData",children:"Raakadata"})," | ",Object(d.jsx)(i.b,{to:"/hc",children:"Handicapit"}),Object(d.jsx)(l.a,{variant:"h4",style:{marginBottom:60},children:"Risbeegomfkerho"}),Object(d.jsx)(l.a,{variant:"body1",children:"Paina nappia selvitt\xe4\xe4ksesi kuka on Risbeegomfkerhon vuoden 2021 paras pelaaja."}),Object(d.jsx)("div",{style:{marginTop:50},children:Object(d.jsx)(O,{laskuri:a,handleClick:function(){c(0),r(a)}})})]})})},x=a(29),f=a.n(x),k=function(e){var t=e.rata;return Object(d.jsx)("div",{children:Object(d.jsxs)("li",{children:[t.name," / ",t.layout,Object(d.jsx)("ul",{children:t.players.map((function(e){return Object(d.jsx)(m,{pelaaja:e},e.name+t.name+t.layout)}))})]})})},m=function(e){var t=e.pelaaja;return Object(d.jsxs)("li",{children:[Object(d.jsx)("strong",{children:t.name}),", pelej\xe4: ",t.games,", juokseva HC: ",t.runningHC,", HC: ",Object(d.jsx)("strong",{children:t.HC})]})},g=function(){var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){f.a.get("https://risbeegomfkerho.herokuapp.com/api/courses").then((function(e){c(e.data)}))}),[]),Object(d.jsxs)(o.a,{children:[Object(d.jsx)(l.a,{variant:"h3",children:"Handicapit"}),Object(d.jsx)("ul",{children:a.map((function(e){return Object(d.jsx)(k,{rata:e},e.name+e.layout)}))})]})},v=function(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){f.a.get("https://risbeegomfkerho.herokuapp.com/api/games").then((function(e){c(e.data)}))}),[]),Object(d.jsx)("pre",{children:JSON.stringify(a,null,4)})},y=function(){return Object(d.jsx)(i.a,{children:Object(d.jsxs)(j.c,{children:[Object(d.jsx)(j.a,{path:"/rawData",children:Object(d.jsx)(v,{})}),Object(d.jsx)(j.a,{path:"/hc",children:Object(d.jsx)(g,{})}),Object(d.jsx)(j.a,{path:"/",children:Object(d.jsx)(p,{})})]})})};r.a.render(Object(d.jsx)(y,{}),document.getElementById("root"))}},[[83,1,2]]]);
//# sourceMappingURL=main.0c66abf2.chunk.js.map