var webpacknumbers=function(r){var n={};function e(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return r[o].call(t.exports,t,t.exports,e),t.l=!0,t.exports}return e.m=r,e.c=n,e.d=function(r,n,o){e.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:o})},e.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},e.t=function(r,n){if(1&n&&(r=e(r)),8&n)return r;if(4&n&&"object"==typeof r&&r&&r.__esModule)return r;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var t in r)e.d(o,t,function(n){return r[n]}.bind(null,t));return o},e.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(n,"a",n),n},e.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},e.p="",e(e.s=2)}([function(r,n){r.exports=$},function(r){r.exports=[{num:1,word:"One"},{num:2,word:"Two"},{num:3,word:"Three"},{num:4,word:"Four"},{num:5,word:"Five"},{num:0,word:"Zero"}]},function(r,n,e){"use strict";e.r(n),e.d(n,"numToWord",function(){return f}),e.d(n,"wordToNum",function(){return i});var o=e(1),t=e(0),u=e.n(t);function f(r){for(var n of o)if(n.num==r)return console.log(u.a),n.word}function i(r){for(var n of o)if(n.word==r)return console.log(u.a),n.num}}]);