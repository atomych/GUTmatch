if(!self.define){let e,n={};const r=(r,i)=>(r=new URL(r+".js",i).href,n[r]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=n,document.head.appendChild(e)}else e=r,importScripts(r),n()})).then((()=>{let e=n[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let l={};const t=e=>r(e,c),o={module:{uri:c},exports:l,require:t};n[c]=Promise.all(i.map((e=>o[e]||t(e)))).then((e=>(s(...e),l)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"gut-search"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/GUTmatch/css/app.d8737e00.css",revision:null},{url:"/GUTmatch/img/fox.3f12cf5b.png",revision:null},{url:"/GUTmatch/img/love-fox.f0e70cac.png",revision:null},{url:"/GUTmatch/img/nav-bar-bg.8c8b2610.png",revision:null},{url:"/GUTmatch/img/search-bg-green.55c7314b.png",revision:null},{url:"/GUTmatch/img/search-bg-red.1068bced.png",revision:null},{url:"/GUTmatch/index.html",revision:"3de33f42909ca25198add66d1ede1583"},{url:"/GUTmatch/js/app.868a0c8d.js",revision:null},{url:"/GUTmatch/js/chunk-vendors.25fd6559.js",revision:null},{url:"/GUTmatch/manifest.json",revision:"78ec865bcbe4d584246d98ce86f0ba99"},{url:"/GUTmatch/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map