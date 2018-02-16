!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t["aws-sig"]=e()}(this,function(){"use strict";var t=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),e={},n=e.lib={},r=n.Base={extend:function(e){var n=t(this);return e&&n.mixIn(e),n.hasOwnProperty("init")&&this.init!==n.init||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},i=n.WordArray=r.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||s).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes,i=t.sigBytes;if(this.clamp(),r%4)for(var o=0;o<i;o++){var s=n[o>>>2]>>>24-o%4*8&255;e[r+o>>>2]|=s<<24-(r+o)%4*8}else for(o=0;o<i;o+=4)e[r+o>>>2]=n[o>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=Math.ceil(e/4)},clone:function(){var t=r.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e,n=[],r=function(t){t=t;var e=987654321,n=4294967295;return function(){var r=((e=36969*(65535&e)+(e>>16)&n)<<16)+(t=18e3*(65535&t)+(t>>16)&n)&n;return r/=4294967296,(r+=.5)*(Math.random()>.5?1:-1)}},o=0;o<t;o+=4){var s=r(4294967296*(e||Math.random()));e=987654071*s(),n.push(4294967296*s()|0)}return new i.init(n,t)}}),o=e.enc={},s=o.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],i=0;i<n;i++){var o=e[i>>>2]>>>24-i%4*8&255;r.push((o>>>4).toString(16)),r.push((15&o).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new i.init(n,e/2)}},a=o.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],i=0;i<n;i++){var o=e[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(o))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new i.init(n,e)}},c=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return a.parse(unescape(encodeURIComponent(t)))}},u=n.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new i.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=c.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e=this._data,n=e.words,r=e.sigBytes,o=this.blockSize,s=r/(4*o),a=(s=t?Math.ceil(s):Math.max((0|s)-this._minBufferSize,0))*o,c=Math.min(4*a,r);if(a){for(var u=0;u<a;u+=o)this._doProcessBlock(n,u);var h=n.splice(0,a);e.sigBytes-=c}return new i.init(h,c)},clone:function(){var t=r.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),h=(n.Hasher=u.extend({cfg:r.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new h.HMAC.init(t,n).finalize(e)}}}),e.algo={}),f=e,d=f.lib.Base,l=f.enc.Utf8,p=(f.algo.HMAC=d.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=l.parse(e));var n=t.blockSize,r=4*n;e.sigBytes>r&&(e=t.finalize(e)),e.clamp();for(var i=this._oKey=e.clone(),o=this._iKey=e.clone(),s=i.words,a=o.words,c=0;c<n;c++)s[c]^=1549556828,a[c]^=909522486;i.sigBytes=o.sigBytes=r,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,n=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(n))}}),e),g=p.lib,y=g.WordArray,v=g.Hasher,_=p.algo,m=[],w=[];!function(){function t(t){for(var e=Math.sqrt(t),n=2;n<=e;n++)if(!(t%n))return!1;return!0}function e(t){return 4294967296*(t-(0|t))|0}for(var n=2,r=0;r<64;)t(n)&&(r<8&&(m[r]=e(Math.pow(n,.5))),w[r]=e(Math.pow(n,1/3)),r++),n++}();var B=[],S=_.SHA256=v.extend({_doReset:function(){this._hash=new y.init(m.slice(0))},_doProcessBlock:function(t,e){for(var n=this._hash.words,r=n[0],i=n[1],o=n[2],s=n[3],a=n[4],c=n[5],u=n[6],h=n[7],f=0;f<64;f++){if(f<16)B[f]=0|t[e+f];else{var d=B[f-15],l=(d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3,p=B[f-2],g=(p<<15|p>>>17)^(p<<13|p>>>19)^p>>>10;B[f]=l+B[f-7]+g+B[f-16]}var y=r&i^r&o^i&o,v=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),_=h+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&c^~a&u)+w[f]+B[f];h=u,u=c,c=a,a=s+_|0,s=o,o=i,i=r,r=_+(v+y)|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+o|0,n[3]=n[3]+s|0,n[4]=n[4]+a|0,n[5]=n[5]+c|0,n[6]=n[6]+u|0,n[7]=n[7]+h|0},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,r=8*t.sigBytes;return e[r>>>5]|=128<<24-r%32,e[14+(r+64>>>9<<4)]=Math.floor(n/4294967296),e[15+(r+64>>>9<<4)]=n,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=v.clone.call(this);return t._hash=this._hash.clone(),t}}),A=v._createHelper(S),z=v._createHmacHelper(S),H=function(t){return A(t).toString()},j=z,x=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})},C=function(t,e){return t.localeCompare(e)};var b=function(t){return t.toString().trim().replace(/\s+/g," ")},M=function(t){return t.length?t.map(function(t){var e=t[0],n=t[1];return e+":"+(Array.isArray(n)?n.map(b).join(","):b(n))}).join("\n"):""},k=function(t){return t.map(function(t){return t[0]}).join(";")},D=function(t){var e=t.headers;return void 0===e&&(e={}),Object.keys(e).map(function(t){return[t.toLowerCase(),e[t]]}).sort(function(t,e){return t[0]>e[0]})},O=/\/\/+/g;function U(t){var e,n=t.method,r=t.body,i=t.sortedHeaders;return[n?n.toUpperCase():"GET",(e=t,e.url.pathname.replace(O,"/").split("/").reduce(function(t,e){return".."===e?(t.pop(),t):"."===e?t:(t.push(e),t)},[]).join("/")),function(t){var e=t.url,n={},r=[];return e.searchParams.forEach(function(t,e){n[e]||(n[e]=[]),n[e].push(t)}),Object.keys(n).sort(C).forEach(function(t){n[t].sort(C).forEach(function(e){r.push(x(t)+"="+x(e))})}),r.join("&")}(t),M(i),"",k(i),H("string"==typeof r?r.trim():r)].join("\n")}var I=/[:\-]|\.\d{3}/g,T=function(t){var e=t.headers,n="X-Amz-Date"in e?e["X-Amz-Date"]:new Date(e.Date||Date.now()).toISOString().replace(I,"");return{short:n.split("T")[0],long:n}},E=function(t,e){var n=t.algorithm,r=t.accessKeyId,i=t.date,o=t.region,s=t.service,a=t.sortedHeaders;return[n+" Credential="+r+"/"+i.short+"/"+o+"/"+s+"/aws4_request","SignedHeaders="+k(a),"Signature="+e].join(", ")};return function(t,e){var n=Object.assign(Object.create(null),{method:"GET"},t,e,{url:new URL(t.url),algorithm:"AWS4-HMAC-SHA256",date:T(t),sortedHeaders:D(t)}),r=function(t,e){var n=t.date,r=t.secretAccessKey,i=t.region,o=t.service,s=j(n.short,"AWS4"+r),a=j(i,s),c=j(o,a),u=j("aws4_request",c);return j(e,u)}(n,function(t,e){var n=t.algorithm,r=t.date,i=t.region,o=t.service;return[n,r.long,r.short+"/"+i+"/"+o+"/aws4_request",H(e)].join("\n")}(n,U(n))),i=E(n,r);return t.headers||(t.headers={}),t.headers["X-Amz-Date"]=n.date.long,e.sessionToken&&(t.headers["X-Amz-Security-Token"]=e.sessionToken),t.headers.Authorization=i,t}});
//# sourceMappingURL=aws-sig.umd.js.map
