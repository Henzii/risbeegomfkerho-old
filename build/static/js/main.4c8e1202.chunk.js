(this["webpackJsonpribeegomfkerho-app"]=this["webpackJsonpribeegomfkerho-app"]||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(9),i=a.n(c),r=(a(75),a(141)),j=a(129),s=a(28),l=a(11),o=a(18),d=a(126),h=a(142),b=a(130),u=a(2),O=function(e){var t=e.laskuri,a=e.handleClick,n=["Lasketaan tasoituksia","Pisteiden derivointia","Miinustetaan Antin tarinat","Otetaan m\xf6rrikerroin huomioon","Henkka"];return-1===t?Object(u.jsx)(h.a,{variant:"contained",color:"primary",onClick:a,children:"Laske kerhon paras pelaaja"}):Object(u.jsx)("div",{children:t<n.length-1?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(b.a,{}),Object(u.jsx)(j.a,{variant:"h5",children:n[t]})]}):Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(j.a,{variant:"h5",children:["Paras pelaaja on ",Object(u.jsx)("strong",{children:"Henkka"})]})})})},x=function(){var e=Object(n.useState)(-1),t=Object(o.a)(e,2),a=t[0],c=t[1],i=function e(t){c(t+1),t<3&&setTimeout((function(){e(t+1)}),Math.floor(5e3*Math.random()))};return Object(u.jsx)(d.a,{children:Object(u.jsxs)(r.a,{textAlign:"center",children:[Object(u.jsx)(j.a,{variant:"h4",style:{marginBottom:60},children:"Risbeegomfkerho"}),Object(u.jsx)(j.a,{variant:"body1",children:"Paina nappia selvitt\xe4\xe4ksesi kuka on Risbeegomfkerhon vuoden 2021 paras pelaaja."}),Object(u.jsx)("div",{style:{marginTop:50},children:Object(u.jsx)(O,{laskuri:a,handleClick:function(){c(0),i(a)}})})]})})},m=a(139),p=a(131),f=a(132),g=a(24),k=a.n(g),v=function(e){var t=e.game;return Object(u.jsxs)(p.a,{style:{marginBottom:10,maxWidth:550,padding:10},elevation:2,children:[Object(u.jsx)(j.a,{variant:"h5",children:t.course.name}),Object(u.jsx)(j.a,{variant:"subtitle1",children:t.course.layout}),Object(u.jsx)(j.a,{variant:"subtitle2",children:t.course.date}),Object(u.jsxs)(f.a,{container:!0,spacing:2,direction:"row",justifyContent:"flex-start",children:[Object(u.jsx)("div",{style:{margin:10,padding:5},children:Object(u.jsxs)("strong",{children:[Object(u.jsx)(f.a,{item:!0,children:"Pelaaja"}),Object(u.jsx)(f.a,{item:!0,children:"Tulos"}),Object(u.jsx)(f.a,{item:!0,children:"+/-"}),Object(u.jsx)(f.a,{item:!0,children:"HC"}),Object(u.jsx)(f.a,{item:!0,children:"HC tulos"}),Object(u.jsx)(f.a,{item:!0,children:"Sija"}),Object(u.jsx)(f.a,{item:!0,children:"HC Sija"})]})}),t.players.map((function(e){return Object(u.jsx)(y,{player:e},e.name+t.course.date)}))]})]})},y=function(e){var t=e.player,a=1===t.rankHC?{fontWeight:800,margin:10,backgroundColor:"#fff3d1",padding:5}:{margin:10,padding:5};return Object(u.jsxs)("div",{style:a,children:[Object(u.jsx)(f.a,{item:!0,children:t.name}),Object(u.jsx)(f.a,{item:!0,children:t.total}),Object(u.jsx)(f.a,{item:!0,children:t.plusminus}),Object(u.jsx)(f.a,{item:!0,children:Math.round(100*t.HC)/100}),Object(u.jsx)(f.a,{item:!0,children:Math.round(100*t.totalHC)/100}),Object(u.jsx)(f.a,{item:!0,children:t.rank}),Object(u.jsx)(f.a,{item:!0,children:t.rankHC})]})},C=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(""),r=Object(o.a)(i,2),s=r[0],l=r[1];return Object(n.useEffect)((function(){k.a.get("https://risbeegomfkerho.herokuapp.com/api/games").then((function(e){c(e.data)}))}),[]),Object(u.jsxs)(d.a,{children:[Object(u.jsx)(j.a,{variant:"h4",gutterBottom:!0,children:"Kilpailut"}),Object(u.jsx)(m.a,{variant:"outlined",size:"small",value:s,placeholder:"Suodata radan nimell\xe4",margin:"normal",onChange:function(e){return l(e.target.value)}}),a.filter((function(e){return e.course.name.toLowerCase().includes(s.toLowerCase())})).map((function(e){return Object(u.jsx)(v,{game:e},e.course.name+e.course.date)}))]})},H=function(e){var t=e.rata;return Object(u.jsx)("div",{children:Object(u.jsxs)("li",{children:[t.name," / ",t.layout,Object(u.jsx)("ul",{children:t.players.map((function(e){return Object(u.jsx)(S,{pelaaja:e},e.name+t.name+t.layout)}))})]})})},S=function(e){var t=e.pelaaja;return Object(u.jsxs)("li",{children:[Object(u.jsx)("strong",{children:t.name}),", pelej\xe4: ",t.games,", juokseva HC: ",t.runningHC,", HC: ",Object(u.jsx)("strong",{children:t.HC})]})},P=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){k.a.get("https://risbeegomfkerho.herokuapp.com/api/courses").then((function(e){c(e.data)}))}),[]),Object(u.jsxs)(d.a,{children:[Object(u.jsx)(j.a,{variant:"h3",children:"Handicapit"}),Object(u.jsx)("ul",{children:a.map((function(e){return Object(u.jsx)(H,{rata:e},e.name+e.layout)}))})]})},w=a(46),B=a(133),M=a(134),E=a(135),F=a(136),R=a(137),L=a(138),T=[10,6,4,3,2,1],W=function(e){var t=e.pelaaja,a=e.i,n=e.handleOnClick,c=e.selected;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(F.a,{hover:"true",onClick:function(){return n(a)},children:[Object(u.jsxs)(R.a,{children:[a+1,"."]}),Object(u.jsx)(R.a,{children:t.name}),Object(u.jsx)(R.a,{children:t.pisteet})]}),c===a&&Object(u.jsx)(J,{pelaaja:t})]})},J=function(e){var t=e.pelaaja;return Object(u.jsx)(F.a,{children:Object(u.jsxs)(R.a,{colSpan:3,children:["Voittoprosentti: ",Object(u.jsx)("strong",{children:Math.round(t.sijoitukset[0]/t.pelit*1e4)/100}),Object(u.jsx)("br",{}),"Pelej\xe4: ",Object(u.jsx)("strong",{children:t.pelit}),Object(u.jsxs)(f.a,{container:!0,direction:"row",justifyContent:"flex-start",style:{width:200,margin:20},children:[Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(f.a,{item:!0,xs:6,children:Object(u.jsx)("strong",{children:"Sijoitus"})}),Object(u.jsx)(f.a,{item:!0,xs:6,children:Object(u.jsx)("strong",{children:"Kertoja"})})]}),t.sijoitukset.map((function(e,t){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(f.a,{item:!0,xs:6,children:t+1}),Object(u.jsx)(f.a,{item:!0,xs:6,children:e})]})}))]})]})})},K=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(-1),r=Object(o.a)(i,2),s=r[0],l=r[1];return Object(n.useEffect)((function(){k.a.get("https://risbeegomfkerho.herokuapp.com/api/games").then((function(e){var t,a=[],n=Object(w.a)(e.data);try{for(n.s();!(t=n.n()).done;){var i,r=t.value,j=Object(w.a)(r.players);try{var s=function(){var e=i.value,t=a.find((function(t){return t.name===e.name}));t&&null!==t||(t={name:e.name,pisteet:0,sijoitukset:[0,0,0,0,0,0],pelit:0},a.push(t)),t.pisteet+=T[e.rankHC-1]||0,t.pelit++,t.sijoitukset[e.rankHC-1]++,1===e.rank&&t.pisteet++};for(j.s();!(i=j.n()).done;)s()}catch(l){j.e(l)}finally{j.f()}}}catch(l){n.e(l)}finally{n.f()}c(a.sort((function(e,t){return t.pisteet-e.pisteet})))}))}),[]),console.log(a),Object(u.jsxs)(d.a,{children:[Object(u.jsx)(j.a,{variant:"h4",gutterBottom:!0,children:"Pistetaulukko"}),Object(u.jsx)(B.a,{component:p.a,style:{borderRadius:10,marginBottom:30,maxWidth:500},children:Object(u.jsxs)(M.a,{children:[Object(u.jsx)(E.a,{children:Object(u.jsxs)(F.a,{children:[Object(u.jsx)(R.a,{children:"Sija"}),Object(u.jsx)(R.a,{children:"Pelaaja"}),Object(u.jsx)(R.a,{children:"Pisteet"})]})}),Object(u.jsx)(L.a,{children:a.map((function(e,t){return Object(u.jsx)(W,{i:t,pelaaja:e,handleOnClick:l,selected:s},e.name)}))})]})}),Object(u.jsx)(j.a,{variant:"h5",children:"Pisteiden jako"}),Object(u.jsx)(B.a,{component:p.a,style:{borderRadius:20,maxWidth:500},children:Object(u.jsxs)(M.a,{children:[Object(u.jsx)(E.a,{children:Object(u.jsxs)(F.a,{children:[Object(u.jsx)(R.a,{children:"Sija"}),Object(u.jsx)(R.a,{children:"Pisteet"})]})}),Object(u.jsxs)(L.a,{children:[T.map((function(e,t){return Object(u.jsxs)(F.a,{hover:"true",children:[Object(u.jsxs)(R.a,{children:[t+1,"."]}),Object(u.jsx)(R.a,{children:e})]})})),Object(u.jsxs)(F.a,{children:[Object(u.jsx)(R.a,{children:"Nopein kierros"}),Object(u.jsx)(R.a,{children:"1"})]})]})]})})]})},A=function(){var e=Object(n.useState)({}),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){k.a.get("https://risbeegomfkerho.herokuapp.com/api/games").then((function(e){c(e.data)}))}),[]),Object(u.jsx)("pre",{children:JSON.stringify(a,null,4)})},D=function(){return Object(u.jsxs)(s.a,{children:[Object(u.jsx)(r.a,{align:"center",style:{marginTop:50},children:Object(u.jsxs)(j.a,{children:[Object(u.jsx)(s.b,{to:"/points",children:"Pistetaulukko"})," |\xa0",Object(u.jsx)(s.b,{to:"/games",children:"Kilpailut"})," |\xa0",Object(u.jsx)(s.b,{to:"/hc",children:"Handicapit"})," |\xa0",Object(u.jsx)(s.b,{to:"/rawData",children:"Raakadata"})]})}),Object(u.jsxs)(l.c,{children:[Object(u.jsx)(l.a,{path:"/rawData",children:Object(u.jsx)(A,{})}),Object(u.jsx)(l.a,{path:"/games",children:Object(u.jsx)(C,{})}),Object(u.jsx)(l.a,{path:"/points",children:Object(u.jsx)(K,{})}),Object(u.jsx)(l.a,{path:"/hc",children:Object(u.jsx)(P,{})}),Object(u.jsx)(l.a,{path:"/",children:Object(u.jsx)(x,{})})]})]})};i.a.render(Object(u.jsx)(D,{}),document.getElementById("root"))},75:function(e,t,a){}},[[100,1,2]]]);
//# sourceMappingURL=main.4c8e1202.chunk.js.map