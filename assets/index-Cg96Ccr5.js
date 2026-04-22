import{A as e,C as t,D as n,E as r,F as i,M as a,N as o,O as s,P as c,S as l,T as u,_ as d,a as f,b as p,c as m,d as h,f as g,g as _,h as v,i as y,j as b,k as x,l as S,m as C,n as w,o as T,p as E,r as D,s as O,t as ee,u as k,v as te,w as ne,x as re,y as A}from"./three-CZyftYvw.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var j=11102230246251565e-32,M=134217729,ie=(3+8*j)*j;function ae(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(o=l+a,s=a-(o-l),l=t[++d]):(o=u+a,s=a-(o-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d]):(o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return(a!==0||p===0)&&(i[p++]=a),p}function oe(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}function N(e){return new Float64Array(e)}var se=(3+16*j)*j,ce=(2+12*j)*j,le=(9+64*j)*j*j,ue=N(4),de=N(8),fe=N(12),pe=N(16),P=N(4);function me(e,t,n,r,i,a,o){let s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e-i,E=n-i,D=t-a,O=r-a;b=T*O,f=M*T,p=f-(f-T),m=T-p,f=M*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=D*E,f=M*D,p=f-(f-D),m=D-p,f=M*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,ue[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,ue[1]=y-(_+d)+(d-S),w=v+_,d=w-v,ue[2]=v-(w-d)+(_-d),ue[3]=w;let ee=oe(4,ue),k=ce*o;if(ee>=k||-ee>=k||(d=e-T,s=e-(T+d)+(d-i),d=n-E,l=n-(E+d)+(d-i),d=t-D,c=t-(D+d)+(d-a),d=r-O,u=r-(O+d)+(d-a),s===0&&c===0&&l===0&&u===0)||(k=le*o+ie*Math.abs(ee),ee+=T*u+O*s-(D*l+E*c),ee>=k||-ee>=k))return ee;b=s*O,f=M*s,p=f-(f-s),m=s-p,f=M*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=c*E,f=M*c,p=f-(f-c),m=c-p,f=M*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,P[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,P[1]=y-(_+d)+(d-S),w=v+_,d=w-v,P[2]=v-(w-d)+(_-d),P[3]=w;let te=ae(4,ue,4,P,de);b=T*u,f=M*T,p=f-(f-T),m=T-p,f=M*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=D*l,f=M*D,p=f-(f-D),m=D-p,f=M*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,P[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,P[1]=y-(_+d)+(d-S),w=v+_,d=w-v,P[2]=v-(w-d)+(_-d),P[3]=w;let ne=ae(te,de,4,P,fe);return b=s*u,f=M*s,p=f-(f-s),m=s-p,f=M*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=c*l,f=M*c,p=f-(f-c),m=c-p,f=M*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,P[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,P[1]=y-(_+d)+(d-S),w=v+_,d=w-v,P[2]=v-(w-d)+(_-d),P[3]=w,pe[ae(ne,fe,4,P,pe)-1]}function he(e,t,n,r,i,a){let o=(t-a)*(n-i),s=(e-i)*(r-a),c=o-s,l=Math.abs(o+s);return Math.abs(c)>=se*l?c:-me(e,t,n,r,i,a,l)}(7+56*j)*j,(3+28*j)*j,(26+288*j)*j*j,N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(8),N(8),N(8),N(4),N(8),N(8),N(16),N(12),N(192),N(192),(10+96*j)*j,(4+48*j)*j,(44+576*j)*j*j,N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(8),N(8),N(8),N(8),N(8),N(8),N(8),N(8),N(8),N(4),N(4),N(4),N(8),N(16),N(16),N(16),N(32),N(32),N(48),N(64),N(1152),N(1152),(16+224*j)*j,(5+72*j)*j,(71+1408*j)*j*j,N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(4),N(24),N(24),N(24),N(24),N(24),N(24),N(24),N(24),N(24),N(24),N(1152),N(1152),N(1152),N(1152),N(1152),N(2304),N(2304),N(3456),N(5760),N(8),N(8),N(8),N(16),N(24),N(48),N(48),N(96),N(192),N(384),N(384),N(384),N(768),N(96),N(96),N(96),N(1152);var ge=2**-52,_e=new Uint32Array(512),ve=class e{static from(t,n=Ee,r=De){let i=t.length,a=new Float64Array(i*2);for(let e=0;e<i;e++){let i=t[e];a[2*e]=n(i),a[2*e+1]=r(i)}return new e(a)}constructor(e){let t=e.length>>1;if(t>0&&typeof e[0]!=`number`)throw Error(`Expected coords to contain numbers.`);this.coords=e;let n=Math.max(2*t-5,0);this._triangles=new Uint32Array(n*3),this._halfedges=new Int32Array(n*3),this._hashSize=Math.ceil(Math.sqrt(t)),this._hullPrev=new Uint32Array(t),this._hullNext=new Uint32Array(t),this._hullTri=new Uint32Array(t),this._hullHash=new Int32Array(this._hashSize),this._ids=new Uint32Array(t),this._dists=new Float64Array(t),this.trianglesLen=0,this._cx=0,this._cy=0,this._hullStart=0,this.hull=this._triangles,this.triangles=this._triangles,this.halfedges=this._halfedges,this.update()}update(){let{coords:e,_hullPrev:t,_hullNext:n,_hullTri:r,_hullHash:i}=this,a=e.length>>1,o=1/0,s=1/0,c=-1/0,l=-1/0;for(let t=0;t<a;t++){let n=e[2*t],r=e[2*t+1];n<o&&(o=n),r<s&&(s=r),n>c&&(c=n),r>l&&(l=r),this._ids[t]=t}let u=(o+c)/2,d=(s+l)/2,f=0,p=0,m=0;for(let t=0,n=1/0;t<a;t++){let r=be(u,d,e[2*t],e[2*t+1]);r<n&&(f=t,n=r)}let h=e[2*f],g=e[2*f+1];for(let t=0,n=1/0;t<a;t++){if(t===f)continue;let r=be(h,g,e[2*t],e[2*t+1]);r<n&&r>0&&(p=t,n=r)}let _=e[2*p],v=e[2*p+1],y=1/0;for(let t=0;t<a;t++){if(t===f||t===p)continue;let n=Se(h,g,_,v,e[2*t],e[2*t+1]);n<y&&(m=t,y=n)}let b=e[2*m],x=e[2*m+1];if(y===1/0){for(let t=0;t<a;t++)this._dists[t]=e[2*t]-e[0]||e[2*t+1]-e[1];we(this._ids,this._dists,0,a-1);let t=new Uint32Array(a),n=0;for(let e=0,r=-1/0;e<a;e++){let i=this._ids[e],a=this._dists[i];a>r&&(t[n++]=i,r=a)}this.hull=t.subarray(0,n),this.triangles=new Uint32Array,this.halfedges=new Int32Array;return}if(he(h,g,_,v,b,x)<0){let e=p,t=_,n=v;p=m,_=b,v=x,m=e,b=t,x=n}let S=Ce(h,g,_,v,b,x);this._cx=S.x,this._cy=S.y;for(let t=0;t<a;t++)this._dists[t]=be(e[2*t],e[2*t+1],S.x,S.y);we(this._ids,this._dists,0,a-1),this._hullStart=f;let C=3;n[f]=t[m]=p,n[p]=t[f]=m,n[m]=t[p]=f,r[f]=0,r[p]=1,r[m]=2,i.fill(-1),i[this._hashKey(h,g)]=f,i[this._hashKey(_,v)]=p,i[this._hashKey(b,x)]=m,this.trianglesLen=0,this._addTriangle(f,p,m,-1,-1,-1);for(let a=0,o=0,s=0;a<this._ids.length;a++){let c=this._ids[a],l=e[2*c],u=e[2*c+1];if(a>0&&Math.abs(l-o)<=ge&&Math.abs(u-s)<=ge||(o=l,s=u,c===f||c===p||c===m))continue;let d=0;for(let e=0,t=this._hashKey(l,u);e<this._hashSize&&(d=i[(t+e)%this._hashSize],!(d!==-1&&d!==n[d]));e++);d=t[d];let h=d,g;for(;g=n[h],he(l,u,e[2*h],e[2*h+1],e[2*g],e[2*g+1])>=0;)if(h=g,h===d){h=-1;break}if(h===-1)continue;let _=this._addTriangle(h,c,n[h],-1,-1,r[h]);r[c]=this._legalize(_+2),r[h]=_,C++;let v=n[h];for(;g=n[v],he(l,u,e[2*v],e[2*v+1],e[2*g],e[2*g+1])<0;)_=this._addTriangle(v,c,g,r[c],-1,r[v]),r[c]=this._legalize(_+2),n[v]=v,C--,v=g;if(h===d)for(;g=t[h],he(l,u,e[2*g],e[2*g+1],e[2*h],e[2*h+1])<0;)_=this._addTriangle(g,c,h,-1,r[h],r[g]),this._legalize(_+2),r[g]=_,n[h]=h,C--,h=g;this._hullStart=t[c]=h,n[h]=t[v]=c,n[c]=v,i[this._hashKey(l,u)]=c,i[this._hashKey(e[2*h],e[2*h+1])]=h}this.hull=new Uint32Array(C);for(let e=0,t=this._hullStart;e<C;e++)this.hull[e]=t,t=n[t];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(e,t){return Math.floor(ye(e-this._cx,t-this._cy)*this._hashSize)%this._hashSize}_legalize(e){let{_triangles:t,_halfedges:n,coords:r}=this,i=0,a=0;for(;;){let o=n[e],s=e-e%3;if(a=s+(e+2)%3,o===-1){if(i===0)break;e=_e[--i];continue}let c=o-o%3,l=s+(e+1)%3,u=c+(o+2)%3,d=t[a],f=t[e],p=t[l],m=t[u];if(xe(r[2*d],r[2*d+1],r[2*f],r[2*f+1],r[2*p],r[2*p+1],r[2*m],r[2*m+1])){t[e]=m,t[o]=d;let r=n[u];if(r===-1){let t=this._hullStart;do{if(this._hullTri[t]===u){this._hullTri[t]=e;break}t=this._hullPrev[t]}while(t!==this._hullStart)}this._link(e,r),this._link(o,n[a]),this._link(a,u);let s=c+(o+1)%3;i<_e.length&&(_e[i++]=s)}else{if(i===0)break;e=_e[--i]}}return a}_link(e,t){this._halfedges[e]=t,t!==-1&&(this._halfedges[t]=e)}_addTriangle(e,t,n,r,i,a){let o=this.trianglesLen;return this._triangles[o]=e,this._triangles[o+1]=t,this._triangles[o+2]=n,this._link(o,r),this._link(o+1,i),this._link(o+2,a),this.trianglesLen+=3,o}};function ye(e,t){let n=e/(Math.abs(e)+Math.abs(t));return(t>0?3-n:1+n)/4}function be(e,t,n,r){let i=e-n,a=t-r;return i*i+a*a}function xe(e,t,n,r,i,a,o,s){let c=e-o,l=t-s,u=n-o,d=r-s,f=i-o,p=a-s,m=c*c+l*l,h=u*u+d*d,g=f*f+p*p;return c*(d*g-h*p)-l*(u*g-h*f)+m*(u*p-d*f)<0}function Se(e,t,n,r,i,a){let o=n-e,s=r-t,c=i-e,l=a-t,u=o*o+s*s,d=c*c+l*l,f=.5/(o*l-s*c),p=(l*u-s*d)*f,m=(o*d-c*u)*f;return p*p+m*m}function Ce(e,t,n,r,i,a){let o=n-e,s=r-t,c=i-e,l=a-t,u=o*o+s*s,d=c*c+l*l,f=.5/(o*l-s*c);return{x:e+(l*u-s*d)*f,y:t+(o*d-c*u)*f}}function we(e,t,n,r){if(r-n<=20)for(let i=n+1;i<=r;i++){let r=e[i],a=t[r],o=i-1;for(;o>=n&&t[e[o]]>a;)e[o+1]=e[o--];e[o+1]=r}else{let i=n+r>>1,a=n+1,o=r;Te(e,i,a),t[e[n]]>t[e[r]]&&Te(e,n,r),t[e[a]]>t[e[r]]&&Te(e,a,r),t[e[n]]>t[e[a]]&&Te(e,n,a);let s=e[a],c=t[s];for(;;){do a++;while(t[e[a]]<c);do o--;while(t[e[o]]>c);if(o<a)break;Te(e,a,o)}e[n+1]=e[o],e[o]=s,r-a+1>=o-n?(we(e,t,a,r),we(e,t,n,o-1)):(we(e,t,n,o-1),we(e,t,a,r))}}function Te(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function Ee(e){return e[0]}function De(e){return e[1]}var Oe=.05,F=1e-6,ke={density:1};function Ae(){return{points:[],closed:!1,selectedVertexId:null,hoveredVertexId:null,valid:!1,error:`Click on the ground to place the first outline point.`}}function je(e){return e.map(e=>({id:e.id,position:e.position.clone()}))}function Me(e){return e.map(e=>e.position.clone())}function Ne(e){let t=0;for(let n=0;n<e.length;n+=1){let r=e[n],i=e[(n+1)%e.length];t+=r.x*i.y-i.x*r.y}return t*.5}function Pe(e,t){if(e.length===0)return{valid:!1,error:`Click on the ground to place the first outline point.`};if(e.length<3)return{valid:!1,error:`Add at least three corners to define the canopy boundary.`};let n=Me(e);return Ye(n,t)?{valid:!1,error:`Outline crosses itself. Move a point or undo the last segment.`}:t?Math.abs(Ne(n))<Oe?{valid:!1,error:`Outline is too small to generate a stable canopy mesh.`}:{valid:!0,error:`Outline is valid. Mesh generation is ready.`}:{valid:!0,error:`Click the first point or press Enter to close the outline.`}}function Fe(e,t={}){let n={...ke,...t},r=Ie(Me(e)),i=Math.abs(Ne(r)),a=Be(r),o=Ve(i,a,n.density),s=ze(r,A.clamp(Math.round(a/o),r.length*2,960)),c=[],l=new Set;Le(c,s,l);let u=r.map(e=>Re(c,e)).filter(e=>e>=0);return Le(c,He(s,o)),{vertices:c,triangles:Ue(c,s,ve.from(c,e=>e.x,e=>e.y).triangles),boundaryVertexIndices:l,stitchedVertexIndices:new Set(l),seamPath:s.map(e=>e.clone()),cornerVertexIndices:u,area:i}}function Ie(e){let t=e.map(e=>e.clone());return Ne(t)<0&&t.reverse(),t}function Le(e,t,n){for(let r of t){let t=Re(e,r);if(t>=0){n?.add(t);continue}let i=e.length;e.push(r.clone()),n?.add(i)}}function Re(e,t){for(let n=0;n<e.length;n+=1)if(e[n].distanceToSquared(t)<=F*16)return n;return-1}function ze(e,t){let n=[],r=Be(e)/t;for(let t=0;t<e.length;t+=1){let i=e[t],a=e[(t+1)%e.length],o=i.distanceTo(a),s=Math.max(1,Math.ceil(o/r));for(let e=0;e<s;e+=1){let t=new c().lerpVectors(i,a,e/s),r=n[n.length-1];(!r||r.distanceToSquared(t)>F)&&n.push(t)}}return n}function Be(e){let t=0;for(let n=0;n<e.length;n+=1){let r=e[n],i=e[(n+1)%e.length];t+=r.distanceTo(i)}return Math.max(t,F)}function Ve(e,t,n){let r=A.clamp(n,.25,4),i=A.clamp(Math.round(e*52+t*8),180,2200),a=A.clamp(Math.round(i*r),60,8800),o=Math.sqrt(e*4/(Math.sqrt(3)*a));return A.clamp(o,.12,.42)}function He(e,t){let n=new f().setFromPoints([...e]),r=t*Math.sqrt(3)*.5,i=t*.42,a=[],o=0;for(let s=n.min.y+r;s<=n.max.y-r;s+=r){let r=o%2==0?0:t*.5;for(let o=n.min.x+t*.5+r;o<=n.max.x-t*.5;o+=t){let t=new c(o,s);Ke(t,e)&&(qe(t,e,!0)<i||a.push(t))}o+=1}return a}function Ue(e,t,n){let r=[];for(let i=0;i<n.length;i+=3){let a=[n[i],n[i+1],n[i+2]],o=e[a[0]],s=e[a[1]],c=e[a[2]];if(We(o,s,c,t)){if(Ge(o,s,c)<0){r.push([a[0],a[2],a[1]]);continue}r.push(a)}}return r}function We(e,t,n,r){if(Math.abs(Ge(e,t,n))<F||!Ke(e.clone().add(t).add(n).multiplyScalar(1/3),r))return!1;let i=e.clone().add(t).multiplyScalar(.5),a=t.clone().add(n).multiplyScalar(.5),o=n.clone().add(e).multiplyScalar(.5);return Ke(i,r)&&Ke(a,r)&&Ke(o,r)}function Ge(e,t,n){return(e.x*(t.y-n.y)+t.x*(n.y-e.y)+n.x*(e.y-t.y))*.5}function Ke(e,t){for(let n=0;n<t.length;n+=1){let r=t[n],i=t[(n+1)%t.length];if($e(r,e,i))return!0}let n=!1;for(let r=0,i=t.length-1;r<t.length;i=r,r+=1){let a=t[r],o=t[i];a.y>e.y!=o.y>e.y&&e.x<(o.x-a.x)*(e.y-a.y)/(o.y-a.y+F)+a.x&&(n=!n)}return n}function qe(e,t,n){let r=1/0,i=n?t.length:t.length-1;for(let n=0;n<i;n+=1){let i=t[n],a=t[(n+1)%t.length];r=Math.min(r,Je(e,i,a))}return Math.sqrt(r)}function Je(e,t,n){let r=n.clone().sub(t),i=r.lengthSq();if(i<F)return e.distanceToSquared(t);let a=A.clamp(e.clone().sub(t).dot(r)/i,0,1),o=t.clone().add(r.multiplyScalar(a));return e.distanceToSquared(o)}function Ye(e,t){let n=t?e.length:e.length-1;for(let r=0;r<n;r+=1){let i=e[r],a=e[(r+1)%e.length];for(let o=r+1;o<n;o+=1){if(Xe(r,o,e.length,t))continue;let n=e[o],s=e[(o+1)%e.length];if(Ze(i,a,n,s))return!0}}return!1}function Xe(e,t,n,r){return Math.abs(e-t)<=1?!0:r?e===0&&t===n-1||t===0&&e===n-1:!1}function Ze(e,t,n,r){let i=Qe(e,t,n),a=Qe(e,t,r),o=Qe(n,r,e),s=Qe(n,r,t);return!!(i!==a&&o!==s||i===0&&$e(e,n,t)||a===0&&$e(e,r,t)||o===0&&$e(n,e,r)||s===0&&$e(n,t,r))}function Qe(e,t,n){let r=(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y);return Math.abs(r)<F?0:r>0?1:2}function $e(e,t,n){return t.x<=Math.max(e.x,n.x)+F&&t.x+F>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)+F&&t.y+F>=Math.min(e.y,n.y)}var et={useCornerAnchors:!0,pressure:56.55,crownBias:.2,pressureScale:8.3,pressureResponse:1.9,damping:4.8,substeps:5,constraintIterations:10,stiffness:.19,maxDeltaTime:.032,displaySubdivisionLevel:1,meshDensity:1},tt=.008,nt=new k(14410480),rt=new k(16766074),I={color:15857151,metalness:1,roughness:.28,clearcoat:1,clearcoatRoughness:.24,envMapIntensity:1.9,iridescence:.72,iridescenceIOR:1.22,iridescenceThicknessRange:[140,460],reflectivity:1,specularIntensity:1,sheen:.1,sheenRoughness:.5,sheenColor:15199999,eggIridescence:1.05,eggIridescenceFrequency:1.25},it={color:12768754,metalness:.04,roughness:.86,clearcoat:0,clearcoatRoughness:0,envMapIntensity:0,iridescence:.18,iridescenceIOR:1.22,iridescenceThicknessRange:[140,460],reflectivity:.18,specularIntensity:.22,sheen:0,sheenRoughness:1,sheenColor:16777215,eggIridescence:.42,eggIridescenceFrequency:1.1},at=class{mesh;flatMesh;state;vertexDots;displaySubdivisionLevel;params;pinnedMask;crownWeights;forces;previousPositions;coarseRenderTopology;renderTopologyCache=new Map;wireEdgePairs=[];wireOverlay;eggIridescenceState;tempVectorA=new i;constructor(e,t={}){this.params={...et,...t};let r={density:this.params.meshDensity};this.flatMesh=Fe(e,r);let a=st(this.flatMesh,this.params),o=new O;o.setAttribute(`position`,new T(new Float32Array,3)),o.setIndex([]),this.state={currentPressure:0,targetPressure:this.params.pressure,positions:a.positions,velocities:a.velocities,basePositions:a.basePositions,pinnedTargets:a.pinnedTargets,anchorIndices:a.anchorIndices,springs:a.springs,triangles:a.triangles,geometry:o},this.displaySubdivisionLevel=Math.max(0,Math.round(this.params.displaySubdivisionLevel)),this.pinnedMask=a.pinnedMask,this.crownWeights=a.crownWeights,this.forces=a.positions.map(()=>new i),this.previousPositions=a.positions.map(e=>e.clone()),this.eggIridescenceState={strength:I.eggIridescence,frequency:I.eggIridescenceFrequency,uniforms:null},this.coarseRenderTopology=gt(a.positions.length,a.triangles,this.flatMesh.boundaryVertexIndices),this.renderTopologyCache.set(0,this.coarseRenderTopology),this.mesh=new p(o,new re({color:I.color,metalness:I.metalness,roughness:I.roughness,clearcoat:I.clearcoat,clearcoatRoughness:I.clearcoatRoughness,envMapIntensity:I.envMapIntensity,iridescence:I.iridescence,iridescenceIOR:I.iridescenceIOR,iridescenceThicknessRange:I.iridescenceThicknessRange,reflectivity:I.reflectivity,specularIntensity:I.specularIntensity,sheen:I.sheen,sheenRoughness:I.sheenRoughness,sheenColor:new k(I.sheenColor),side:2,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),this.installEggIridescenceShader();let c=new O;c.setAttribute(`position`,new T(new Float32Array,3)),this.wireOverlay=new d(c,new _({color:3625068,transparent:!0,opacity:.38,depthWrite:!1,toneMapped:!1})),this.wireOverlay.visible=!0,this.wireOverlay.frustumCulled=!1,this.wireOverlay.renderOrder=3,this.mesh.add(this.wireOverlay);let l=new O;l.setAttribute(`position`,new T(new Float32Array(this.state.positions.length*3),3)),l.setAttribute(`color`,new T(new Float32Array(this.state.positions.length*3),3)),this.vertexDots=new n(l,new s({size:.06,vertexColors:!0,transparent:!0,opacity:.68,depthWrite:!1,toneMapped:!1,sizeAttenuation:!0})),this.vertexDots.frustumCulled=!1,this.vertexDots.renderOrder=4,this.vertexDots.userData.simulation=this,this.mesh.add(this.vertexDots),this.mesh.castShadow=!0,this.mesh.receiveShadow=!1,this.mesh.userData.simulation=this,this.rebuildRenderGeometry(),this.syncGeometry()}update(e){let t=Math.min(e,this.params.maxDeltaTime);if(t<=0)return;let n=t/this.params.substeps;for(let e=0;e<this.params.substeps;e+=1)this.step(n);this.syncGeometry()}setPressure(e){this.state.targetPressure=A.clamp(e,0,100)}setCrownBias(e){this.params.crownBias=A.clamp(e,0,4)}setPressureScale(e){this.params.pressureScale=A.clamp(e,0,200)}setPressureResponse(e){this.params.pressureResponse=A.clamp(e,.1,20)}setDamping(e){this.params.damping=A.clamp(e,0,40)}setSubsteps(e){this.params.substeps=A.clamp(Math.round(e),1,20)}setConstraintIterations(e){this.params.constraintIterations=A.clamp(Math.round(e),1,60)}setStiffness(e){let t=A.clamp(e,0,2);this.params.stiffness=t;for(let e of this.state.springs)e.stiffness=t}setMaxDeltaTime(e){this.params.maxDeltaTime=A.clamp(e,1/240,.2)}reset(){this.state.currentPressure=0;for(let e=0;e<this.state.positions.length;e+=1){let t=this.pinnedMask[e]?this.state.pinnedTargets[e]:this.state.basePositions[e];this.state.positions[e].copy(t),this.state.velocities[e].set(0,0,0),this.previousPositions[e].copy(t)}this.syncGeometry()}getPinnedCount(){return this.state.anchorIndices.length}getAnchorVertices(){return this.state.anchorIndices.map(e=>({index:e,position:this.getDisplayVertexPosition(e)}))}getDisplayVertexPosition(e,t=new i){return t.copy(this.state.positions[e])}isPinnedVertex(e){return e>=0&&e<this.pinnedMask.length&&this.pinnedMask[e]}isCornerVertex(e){return this.flatMesh.cornerVertexIndices.includes(e)}ensurePinnedVertex(e,t=this.state.positions[e]?.y??0){if(e<0||e>=this.state.positions.length)return!1;this.pinnedMask[e]||(this.pinnedMask[e]=!0,this.state.anchorIndices.push(e),this.state.anchorIndices.sort((e,t)=>e-t));let n=this.state.basePositions[e],r=this.state.pinnedTargets[e];return r.set(n.x,A.clamp(t,-20,20),n.z),this.state.positions[e].copy(r),this.previousPositions[e].copy(r),this.state.velocities[e].set(0,0,0),this.syncGeometry(),!0}setPinnedVertexDisplayHeight(e,t){if(!this.pinnedMask[e])return;let n=this.state.basePositions[e],r=this.state.pinnedTargets[e];r.set(n.x,A.clamp(t,-20,20),n.z),this.state.positions[e].copy(r),this.previousPositions[e].copy(r),this.state.velocities[e].set(0,0,0),this.syncGeometry()}removePinnedVertex(e,t){return!this.isPinnedVertex(e)||t&&this.isCornerVertex(e)?!1:(this.pinnedMask[e]=!1,this.state.anchorIndices.splice(0,this.state.anchorIndices.length,...this.state.anchorIndices.filter(t=>t!==e)),this.previousPositions[e].copy(this.state.positions[e]),this.state.velocities[e].set(0,0,0),this.syncGeometry(),!0)}groundPinnedVertices(){if(this.state.anchorIndices.length!==0){for(let e of this.state.anchorIndices){let t=this.state.basePositions[e],n=this.state.pinnedTargets[e];n.set(t.x,0,t.z),this.state.positions[e].copy(n),this.previousPositions[e].copy(n),this.state.velocities[e].set(0,0,0)}this.syncGeometry()}}clearPinnedVertices(e){if(this.state.anchorIndices.length===0&&!e)return;let t=e?new Set(this.flatMesh.cornerVertexIndices):new Set,n=[];for(let e=0;e<this.state.positions.length;e+=1){let r=t.has(e);if(this.pinnedMask[e]=r,r){n.push(e);continue}this.state.velocities[e].set(0,0,0)}this.state.anchorIndices.splice(0,this.state.anchorIndices.length,...n),this.syncGeometry()}setWireframeVisible(e){this.wireOverlay.visible=e}setSubdivisionLevel(e){let t=Math.max(0,Math.round(e));this.displaySubdivisionLevel!==t&&(this.displaySubdivisionLevel=t,this.rebuildRenderGeometry(),this.syncGeometry())}setReflectionEnabled(e){this.applyMaterialStyle(e?I:it)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.wireOverlay.geometry.dispose(),this.wireOverlay.material.dispose(),this.vertexDots.geometry.dispose(),this.vertexDots.material.dispose()}step(e){this.state.currentPressure=A.damp(this.state.currentPressure,this.state.targetPressure,this.params.pressureResponse,e);for(let e=0;e<this.state.positions.length;e+=1)this.previousPositions[e].copy(this.state.positions[e]),this.forces[e].set(0,0,0);this.applyUniformLiftForces();let t=Math.exp(-this.params.damping*e);for(let n=0;n<this.state.positions.length;n+=1){if(this.pinnedMask[n]){this.state.positions[n].copy(this.state.pinnedTargets[n]);continue}this.state.velocities[n].addScaledVector(this.forces[n],e),this.state.velocities[n].multiplyScalar(t),this.state.positions[n].addScaledVector(this.state.velocities[n],e)}for(let e=0;e<this.params.constraintIterations;e+=1)this.solveSpringConstraints(),this.enforcePinnedTargets();let n=e>0?1/e:0;for(let e=0;e<this.state.positions.length;e+=1){if(this.pinnedMask[e]){this.state.velocities[e].set(0,0,0);continue}this.state.velocities[e].copy(this.state.positions[e]).sub(this.previousPositions[e]).multiplyScalar(n)}}applyUniformLiftForces(){let e=this.state.currentPressure*this.params.pressureScale;if(!(e<1e-5))for(let t=0;t<this.state.positions.length;t+=1){if(this.pinnedMask[t])continue;let n=1+this.crownWeights[t]*this.params.crownBias;this.forces[t].y+=e*n}}solveSpringConstraints(){for(let e of this.state.springs){let t=this.state.positions[e.a],n=this.state.positions[e.b];this.tempVectorA.subVectors(n,t);let r=this.tempVectorA.length();if(r<1e-6)continue;let i=(r-e.restLength)/r,a=this.tempVectorA.multiplyScalar(i*e.stiffness),o=this.pinnedMask[e.a],s=this.pinnedMask[e.b];!o&&!s?(t.addScaledVector(a,.5),n.addScaledVector(a,-.5)):o?s||n.addScaledVector(a,-1):t.add(a)}}enforcePinnedTargets(){for(let e of this.state.anchorIndices)this.state.positions[e].copy(this.state.pinnedTargets[e])}applyMaterialStyle(e){this.mesh.material.color.setHex(e.color),this.mesh.material.metalness=e.metalness,this.mesh.material.roughness=e.roughness,this.mesh.material.clearcoat=e.clearcoat,this.mesh.material.clearcoatRoughness=e.clearcoatRoughness,this.mesh.material.envMapIntensity=e.envMapIntensity,this.mesh.material.iridescence=e.iridescence,this.mesh.material.iridescenceIOR=e.iridescenceIOR,this.mesh.material.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.mesh.material.reflectivity=e.reflectivity,this.mesh.material.specularIntensity=e.specularIntensity,this.mesh.material.sheen=e.sheen,this.mesh.material.sheenRoughness=e.sheenRoughness,this.mesh.material.sheenColor.setHex(e.sheenColor),this.eggIridescenceState.strength=e.eggIridescence,this.eggIridescenceState.frequency=e.eggIridescenceFrequency,this.eggIridescenceState.uniforms&&(this.eggIridescenceState.uniforms.uEggIridescence.value=e.eggIridescence,this.eggIridescenceState.uniforms.uEggIridescenceFrequency.value=e.eggIridescenceFrequency),this.mesh.material.needsUpdate=!0}installEggIridescenceShader(){this.mesh.material.customProgramCacheKey=()=>`canopy-single-surface-egg-iridescence-v1`,this.mesh.material.onBeforeCompile=e=>{let t={uEggIridescence:{value:this.eggIridescenceState.strength},uEggIridescenceFrequency:{value:this.eggIridescenceState.frequency}};this.eggIridescenceState.uniforms=t,e.uniforms.uEggIridescence=t.uEggIridescence,e.uniforms.uEggIridescenceFrequency=t.uEggIridescenceFrequency,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vEggIriWorldPosition;
varying vec3 vEggIriWorldNormal;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vEggIriWorldPosition = worldPosition.xyz;
vEggIriWorldNormal = normalize( mat3( modelMatrix ) * normal );`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uEggIridescence;
uniform float uEggIridescenceFrequency;
varying vec3 vEggIriWorldPosition;
varying vec3 vEggIriWorldNormal;

float eggSaturate01(float value) {
  return clamp(value, 0.0, 1.0);
}

float eggHash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float eggSmoothNoise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = eggHash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = eggHash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = eggHash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = eggHash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = eggHash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = eggHash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = eggHash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = eggHash13(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);
  return mix(nxy0, nxy1, u.z);
}

vec3 eggBismuthPalette(float t) {
  t = fract(t);
  vec3 c0 = vec3(1.00, 0.84, 0.20);
  vec3 c1 = vec3(1.00, 0.33, 0.77);
  vec3 c2 = vec3(0.18, 0.93, 1.00);
  vec3 c3 = vec3(0.30, 1.00, 0.46);
  if (t < 0.25) {
    return mix(c0, c1, t * 4.0);
  }
  if (t < 0.50) {
    return mix(c1, c2, (t - 0.25) * 4.0);
  }
  if (t < 0.75) {
    return mix(c2, c3, (t - 0.50) * 4.0);
  }
  return mix(c3, c0, (t - 0.75) * 4.0);
}

vec3 applyEggIridescence(vec3 baseColor) {
  float iriStrength = eggSaturate01(uEggIridescence);
  if (iriStrength <= 0.0001) {
    return baseColor;
  }

  vec3 n = normalize(vEggIriWorldNormal);
  vec3 viewDir = normalize(cameraPosition - vEggIriWorldPosition);
  float ndv = eggSaturate01(dot(n, viewDir));
  float jitter = eggSmoothNoise3(vEggIriWorldPosition * 1.5 + vec3(31.4));
  float broadNoise = eggSmoothNoise3(vEggIriWorldPosition * 0.48 + vec3(11.7));
  float bandFreq = max(0.2, uEggIridescenceFrequency);
  float facetBand =
    (vEggIriWorldPosition.y * 1.8 + vEggIriWorldPosition.x * 0.42 - vEggIriWorldPosition.z * 0.31) * bandFreq;
  float stepBand = (abs(vEggIriWorldPosition.x) + abs(vEggIriWorldPosition.z)) * 0.92;
  float swirl =
    0.5 +
    0.5 *
      sin(
        dot(vEggIriWorldPosition, vec3(0.73, 0.51, -0.46)) * bandFreq * 1.25 +
        broadNoise * 4.6 +
        6.283
      );
  float thicknessT = fract(facetBand * 0.123 + stepBand * 0.081 + swirl * 0.39 + jitter * 0.27 + 5.7);
  float thicknessNm = mix(120.0, 980.0, thicknessT);

  vec3 wavelengths = vec3(680.0, 540.0, 440.0);
  vec3 phase = (4.0 * 3.14159265 * 1.65 * thicknessNm * max(ndv, 0.08)) / wavelengths;
  vec3 interference = 0.5 + 0.5 * cos(phase + vec3(0.0, 2.094, 4.188));

  float hueSweep =
    fract(
      thicknessT * (0.55 + uEggIridescenceFrequency * 0.65) +
      dot(n, vec3(0.23, 0.11, -0.37)) * 0.18
    );
  vec3 oxidePalette = eggBismuthPalette(hueSweep);
  vec3 oxideColor = mix(interference, oxidePalette, 0.68);

  float fresnel = pow(1.0 - ndv, 2.2);
  float filmAmount = iriStrength * (0.48 + 0.52 * fresnel);
  vec3 branchTint = mix(vec3(1.0), baseColor, 0.58);
  vec3 metallicBase = vec3(0.92, 0.94, 0.98) * mix(vec3(1.0), branchTint, 0.26);
  vec3 oxideTinted = mix(oxideColor, oxideColor * branchTint, 0.62);
  vec3 blendTint = mix(metallicBase, oxideTinted, eggSaturate01(filmAmount * 0.78));
  vec3 overlayTint = mix(vec3(1.0), blendTint, 0.62 * iriStrength);
  vec3 iridescentBase = baseColor * overlayTint;
  iridescentBase += oxideColor * fresnel * iriStrength * 0.22;
  return mix(baseColor, iridescentBase, 0.85 * iriStrength);
}`).replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.rgb = applyEggIridescence(diffuseColor.rgb);`)}}getRenderTopology(e){let t=Math.max(0,Math.round(e));if(this.renderTopologyCache.has(t))return this.renderTopologyCache.get(t);for(let e=1;e<=t;e+=1){if(this.renderTopologyCache.has(e))continue;let t=this.renderTopologyCache.get(e-1);if(!t)throw Error(`Missing subdivision topology for level ${e-1}.`);let n=bt(t);n=yt(n,e,.18),this.renderTopologyCache.set(e,n)}return this.renderTopologyCache.get(t)}rebuildRenderGeometry(){let e=this.getRenderTopology(this.displaySubdivisionLevel);this.wireEdgePairs=e.wireEdgePairs,this.state.geometry.setAttribute(`position`,new T(new Float32Array(e.vertexStencils.length*3),3)),this.state.geometry.setIndex(e.indices),this.state.geometry.deleteAttribute(`normal`),this.wireOverlay.geometry.setAttribute(`position`,new T(new Float32Array(this.wireEdgePairs.length*3),3))}syncGeometry(){let e=this.getRenderTopology(this.displaySubdivisionLevel),t=this.state.geometry.getAttribute(`position`);for(let n=0;n<e.vertexStencils.length;n+=1){let r=e.vertexStencils[n],i=0,a=0,o=0;for(let e=0;e<r.indices.length;e+=1){let t=r.indices[e],n=this.state.positions[t],s=r.weights[e];i+=n.x*s,a+=n.y*s,o+=n.z*s}t.setXYZ(n,i,a,o)}for(let e=0;e<this.state.positions.length;e+=1){if(!this.pinnedMask[e])continue;let n=this.state.positions[e];t.setXYZ(e,n.x,n.y,n.z)}t.needsUpdate=!0,this.state.geometry.computeVertexNormals(),this.state.geometry.computeBoundingSphere();let n=this.state.geometry.getAttribute(`normal`),r=this.wireOverlay.geometry.getAttribute(`position`);for(let e=0;e<this.wireEdgePairs.length;e+=1){let i=this.wireEdgePairs[e],a=t.getX(i),o=t.getY(i),s=t.getZ(i),c=n.getX(i),l=n.getY(i),u=n.getZ(i);r.setXYZ(e,a+c*tt,o+l*tt,s+u*tt)}r.needsUpdate=!0,this.wireOverlay.geometry.computeBoundingSphere();let i=this.vertexDots.geometry.getAttribute(`position`),a=this.vertexDots.geometry.getAttribute(`color`);for(let e=0;e<this.state.positions.length;e+=1){let t=this.state.positions[e],n=this.pinnedMask[e]?rt:nt;i.setXYZ(e,t.x,t.y,t.z),a.setXYZ(e,n.r,n.g,n.b)}i.needsUpdate=!0,a.needsUpdate=!0,this.vertexDots.geometry.computeBoundingSphere()}};function ot(e,t){return new at(e,t)}function st(e,t){let n=[],r=[],a=[],o=[],s=[],c=[],l=new Set(e.cornerVertexIndices),u=ct(e);for(let u=0;u<e.vertices.length;u+=1){let d=e.vertices[u],f=new i(d.x,0,d.y),p=t.useCornerAnchors&&l.has(u);n.push(f.clone()),r.push(new i),a.push(f.clone()),o.push(f.clone()),s.push(p),p&&c.push(u)}return{positions:n,velocities:r,basePositions:a,pinnedTargets:o,anchorIndices:c,springs:dt(e.triangles,n,t.stiffness),triangles:e.triangles.map(([e,t,n])=>[e,n,t]),pinnedMask:s,crownWeights:u}}function ct(e){let t=new Float32Array(e.vertices.length),n=0;for(let r=0;r<e.vertices.length;r+=1){if(e.boundaryVertexIndices.has(r)){t[r]=0;continue}let i=lt(e.vertices[r],e.seamPath,!0);t[r]=i,n=Math.max(n,i)}if(n<=1e-6)return t;for(let e=0;e<t.length;e+=1)t[e]=A.clamp(t[e]/n,0,1);let r=_t(e.triangles,e.vertices.length);for(let n=0;n<3;n+=1){let n=new Float32Array(t);for(let i=0;i<t.length;i+=1){if(e.boundaryVertexIndices.has(i)){n[i]=0;continue}let a=r[i];if(a.length===0)continue;let o=0;for(let e of a)o+=t[e];o/=a.length,n[i]=A.lerp(t[i],o,.24)}t.set(n)}return t}function lt(e,t,n){let r=1/0,i=n?t.length:Math.max(0,t.length-1);for(let n=0;n<i;n+=1){let i=t[n],a=t[(n+1)%t.length];r=Math.min(r,ut(e,i,a))}return Math.sqrt(r)}function ut(e,t,n){let r=n.clone().sub(t),i=r.lengthSq();if(i<1e-6)return e.distanceToSquared(t);let a=A.clamp(e.clone().sub(t).dot(r)/i,0,1),o=t.clone().add(r.multiplyScalar(a));return e.distanceToSquared(o)}function dt(e,t,n){let r=new Map;return e.forEach(([e,i,a])=>{ft(r,e,i,t,n),ft(r,i,a,t,n),ft(r,a,e,t,n)}),[...r.values()]}function ft(e,t,n,r,i){let a=t<n?`${t}:${n}`:`${n}:${t}`;e.has(a)||e.set(a,{a:t,b:n,restLength:r[t].distanceTo(r[n]),stiffness:i})}function pt(e){let t=new Map,n=(e,n)=>{let r=`${Math.min(e,n)}:${Math.max(e,n)}`;t.has(r)||t.set(r,[e,n])};for(let[t,r,i]of e)n(t,r),n(r,i),n(i,t);return[...t.values()].flat()}function mt(e,t){return e<t?`${e}:${t}`:`${t}:${e}`}function ht(e){return{indices:[...e.indices],weights:[...e.weights]}}function gt(e,t,n){let r=t.map(([e,t,n])=>[e,t,n]),i=Array.from({length:e},(e,t)=>n.has(t)),a=new Set;for(let[e,t,n]of r)i[e]&&i[t]&&a.add(mt(e,t)),i[t]&&i[n]&&a.add(mt(t,n)),i[n]&&i[e]&&a.add(mt(n,e));return{vertexStencils:Array.from({length:e},(e,t)=>({indices:[t],weights:[1]})),triangles:r,indices:r.flat(),wireEdgePairs:pt(r),creaseVertices:i,creaseEdges:a}}function _t(e,t){let n=Array.from({length:t},()=>new Set);for(let[t,r,i]of e)n[t].add(r),n[t].add(i),n[r].add(t),n[r].add(i),n[i].add(t),n[i].add(r);return n.map(e=>[...e])}function vt(e){let t=new Map;for(let n of e)if(!(Math.abs(n.weight)<1e-8))for(let e=0;e<n.stencil.indices.length;e+=1){let r=n.stencil.indices[e],i=n.stencil.weights[e]*n.weight;t.set(r,(t.get(r)??0)+i)}let n=[...t.entries()].filter(([,e])=>Math.abs(e)>1e-8).sort(([e],[t])=>e-t),r=n.reduce((e,[,t])=>e+t,0);return n.length===0||Math.abs(r)<1e-8?{indices:[],weights:[]}:{indices:n.map(([e])=>e),weights:n.map(([,e])=>e/r)}}function yt(e,t,n){if(t<=0||n<=0)return e;let r=_t(e.triangles,e.vertexStencils.length),i=e.vertexStencils.map(ht);for(let a=0;a<t;a+=1){let t=i.map(ht);for(let a=0;a<i.length;a+=1){if(e.creaseVertices[a])continue;let o=r[a];if(o.length===0)continue;let s=1/o.length,c=vt(o.map(e=>({stencil:i[e],weight:s})));t[a]=vt([{stencil:i[a],weight:1-n},{stencil:c,weight:n}])}i=t}return{vertexStencils:i,triangles:e.triangles.map(([e,t,n])=>[e,t,n]),indices:[...e.indices],wireEdgePairs:[...e.wireEdgePairs],creaseVertices:[...e.creaseVertices],creaseEdges:new Set(e.creaseEdges)}}function bt(e){let t=e.vertexStencils.length,n=_t(e.triangles,t),r=new Map,i=new Map,a=Array.from({length:t},()=>new Set),o=(e,t,n)=>{let a=mt(e,t);i.has(a)||i.set(a,[e,t]);let o=r.get(a);if(o){o.push(n);return}r.set(a,[n])};for(let[t,n,r]of e.triangles)o(t,n,r),o(n,r,t),o(r,t,n);for(let[t,[n,o]]of i){let i=r.get(t)?.length??0;(e.creaseEdges.has(t)||i<=1)&&(a[n].add(o),a[o].add(n))}let s=Array(t),c=Array.from({length:t},(t,n)=>e.creaseVertices[n]||a[n].size>0);for(let r=0;r<t;r+=1){let t=e.vertexStencils[r],i=[...a[r]];if(i.length===2){s[r]=vt([{stencil:t,weight:.75},{stencil:e.vertexStencils[i[0]],weight:.125},{stencil:e.vertexStencils[i[1]],weight:.125}]);continue}if(i.length>2){let n=.25/i.length;s[r]=vt([{stencil:t,weight:.75},...i.map(t=>({stencil:e.vertexStencils[t],weight:n}))]);continue}let o=n[r];if(o.length===0){s[r]=ht(t);continue}let c=o.length,l=c===3?3/16:3/(8*c);s[r]=vt([{stencil:t,weight:1-c*l},...o.map(t=>({stencil:e.vertexStencils[t],weight:l}))])}let l=new Map,u=new Set,d=[...i.entries()].sort(([e],[t])=>e.localeCompare(t));for(let[t,[n,i]]of d){let a=r.get(t)??[],o=e.creaseEdges.has(t)||a.length<=1,d=o||a.length<2?vt([{stencil:e.vertexStencils[n],weight:.5},{stencil:e.vertexStencils[i],weight:.5}]):vt([{stencil:e.vertexStencils[n],weight:3/8},{stencil:e.vertexStencils[i],weight:3/8},{stencil:e.vertexStencils[a[0]],weight:1/8},{stencil:e.vertexStencils[a[1]],weight:1/8}]),f=s.length;s.push(d),c.push(o),l.set(t,f),o&&(u.add(mt(n,f)),u.add(mt(f,i)))}let f=[];for(let[t,n,r]of e.triangles){let e=l.get(mt(t,n)),i=l.get(mt(n,r)),a=l.get(mt(r,t));if(e===void 0||i===void 0||a===void 0)throw Error(`Failed to build subdivided render topology.`);f.push([t,e,a],[e,n,i],[a,i,r],[e,i,a])}return{vertexStencils:s,triangles:f,indices:f.flat(),wireEdgePairs:pt(f),creaseVertices:c,creaseEdges:u}}var xt=`
varying vec3 localPosition;
varying vec4 worldPosition;

uniform vec3 worldCamProjPosition;
uniform vec3 worldPlanePosition;
uniform float fadeDistance;
uniform bool infiniteGrid;
uniform bool followCamera;

void main() {
  localPosition = position.xzy;
  if (infiniteGrid) {
    localPosition *= 1.0 + fadeDistance;
  }

  worldPosition = modelMatrix * vec4(localPosition, 1.0);
  if (followCamera) {
    worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
    localPosition = (inverse(modelMatrix) * worldPosition).xyz;
  }

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,St=`
varying vec3 localPosition;
varying vec4 worldPosition;

uniform vec3 worldCamProjPosition;
uniform float cellSize;
uniform float sectionSize;
uniform vec3 cellColor;
uniform vec3 sectionColor;
uniform float fadeDistance;
uniform float fadeStrength;
uniform float fadeFrom;
uniform float cellThickness;
uniform float sectionThickness;
uniform float opacity;

float getGrid(float size, float thickness) {
  vec2 r = localPosition.xz / size;
  vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
  float line = min(grid.x, grid.y) + 1.0 - thickness;
  return 1.0 - min(line, 1.0);
}

void main() {
  float g1 = getGrid(cellSize, cellThickness);
  float g2 = getGrid(sectionSize, sectionThickness);

  vec3 from = worldCamProjPosition * vec3(fadeFrom);
  float dist = distance(from, worldPosition.xyz);
  float d = 1.0 - min(dist / fadeDistance, 1.0);
  vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

  gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength) * opacity);
  gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
  if (gl_FragColor.a <= 0.0) {
    discard;
  }

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Ct=class{mesh;plane=new ne;up=new i(0,1,0);origin=new i(0,0,0);constructor(e={}){let t=new u(e.width??200,e.height??200),n=new a({transparent:!0,side:1,depthWrite:!1,uniforms:{cellSize:{value:e.cellSize??1},sectionSize:{value:e.sectionSize??5},fadeDistance:{value:e.fadeDistance??140},fadeStrength:{value:e.fadeStrength??1.2},fadeFrom:{value:e.fadeFrom??1},cellThickness:{value:e.cellThickness??.6},sectionThickness:{value:e.sectionThickness??1.2},opacity:{value:e.opacity??1},cellColor:{value:new k(e.cellColor??`#8b9095`)},sectionColor:{value:new k(e.sectionColor??`#5e6368`)},infiniteGrid:{value:e.infiniteGrid??!0},followCamera:{value:e.followCamera??!1},worldCamProjPosition:{value:new i},worldPlanePosition:{value:new i}},vertexShader:xt,fragmentShader:St});n.alphaToCoverage=!0,this.mesh=new p(t,n),this.mesh.frustumCulled=!1,this.mesh.position.y=e.y??.001,this.mesh.renderOrder=-50}update(e){this.mesh.updateWorldMatrix(!0,!1),this.plane.setFromNormalAndCoplanarPoint(this.up,this.origin).applyMatrix4(this.mesh.matrixWorld);let t=this.mesh.material.uniforms;this.plane.projectPoint(e.position,t.worldCamProjPosition.value),t.worldPlanePosition.value.copy(this.origin).applyMatrix4(this.mesh.matrixWorld)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}};document.title=`260421_CatenaryCanopy`;var wt=document.querySelector(`#app`)??(()=>{throw Error(`App root was not found.`)})();wt.innerHTML=`
  <div class="app-shell">
    <canvas class="viewport" aria-label="Inflation canopy viewport"></canvas>
    <section id="ui-panel" class="apple-panel" aria-label="Inflation canopy controls">
      <div id="ui-handle" class="panel-drag-handle">
        <button
          id="collapseToggle"
          class="collapse-button panel-collapse-toggle"
          type="button"
          aria-label="Collapse controls"
          aria-expanded="true"
        >
          <span class="collapse-icon" aria-hidden="true"></span>
        </button>
      </div>
      <div class="ui-body panel-sections">
        <div class="control-hint">Wheel = Zoom, MMB = Pan, RMB = Orbit</div>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Simulation</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <div class="control-hint">
              LMB = Draw Outline<br />
              Enter = Finish Outline<br />
              Connect to Start = Finish Outline
            </div>
            <div class="control control-grid-2">
              <button id="startButton" class="pill-button action-button is-start-state" type="button">Start</button>
              <button id="resetButton" class="pill-button reset-button" type="button">Reset</button>
            </div>
            <div class="control">
              <button id="clearSceneButton" class="pill-button control-button-wide" type="button">Clear</button>
            </div>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Physics</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <label class="control" for="pressureSlider">
              <div class="control-row">
                <span>Pressure</span>
                <input
                  id="pressure-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="100"
                  step="0.01"
                  value="56.55"
                />
              </div>
              <input id="pressureSlider" type="range" min="0" max="100" value="56.55" step="0.01" />
            </label>
            <label class="control" for="crownBiasSlider">
              <div class="control-row">
                <span>Crown Bias</span>
                <input
                  id="crown-bias-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="4"
                  step="0.01"
                  value="0.20"
                />
              </div>
              <input id="crownBiasSlider" type="range" min="0" max="4" value="0.2" step="0.01" />
            </label>
            <label class="control" for="pressureScaleSlider">
              <div class="control-row">
                <span>Pressure Scale</span>
                <input
                  id="pressure-scale-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="200"
                  step="0.1"
                  value="8.3"
                />
              </div>
              <input id="pressureScaleSlider" type="range" min="0" max="200" value="8.3" step="0.1" />
            </label>
            <label class="control" for="pressureResponseSlider">
              <div class="control-row">
                <span>Pressure Response</span>
                <input
                  id="pressure-response-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value="1.90"
                />
              </div>
              <input id="pressureResponseSlider" type="range" min="0.1" max="20" value="1.9" step="0.1" />
            </label>
            <label class="control" for="dampingSlider">
              <div class="control-row">
                <span>Damping</span>
                <input
                  id="damping-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="40"
                  step="0.1"
                  value="4.80"
                />
              </div>
              <input id="dampingSlider" type="range" min="0" max="40" value="4.8" step="0.1" />
            </label>
            <label class="control" for="substepsSlider">
              <div class="control-row">
                <span>Substeps</span>
                <input
                  id="substeps-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max="20"
                  step="1"
                  value="5"
                />
              </div>
              <input id="substepsSlider" type="range" min="1" max="20" value="5" step="1" />
            </label>
            <label class="control" for="constraintIterationsSlider">
              <div class="control-row">
                <span>Constraint Iterations</span>
                <input
                  id="constraint-iterations-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max="60"
                  step="1"
                  value="10"
                />
              </div>
              <input id="constraintIterationsSlider" type="range" min="1" max="60" value="10" step="1" />
            </label>
            <label class="control" for="stiffnessSlider">
              <div class="control-row">
                <span>Stiffness</span>
                <input
                  id="stiffness-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="2"
                  step="0.01"
                  value="0.19"
                />
              </div>
              <input id="stiffnessSlider" type="range" min="0" max="2" value="0.19" step="0.01" />
            </label>
            <label class="control" for="maxDeltaTimeSlider">
              <div class="control-row">
                <span>Max Delta Time</span>
                <input
                  id="max-delta-time-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0.004"
                  max="0.2"
                  step="0.001"
                  value="0.0320"
                />
              </div>
              <input id="maxDeltaTimeSlider" type="range" min="0.004" max="0.2" value="0.032" step="0.001" />
            </label>
            <label class="control" for="subdivisionLevelSlider">
              <div class="control-row">
                <span>Subdivision Level</span>
                <input
                  id="subdivision-level-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="4"
                  step="1"
                  value="1"
                />
              </div>
              <input id="subdivisionLevelSlider" type="range" min="0" max="4" value="1" step="1" />
            </label>
            <label class="control" for="meshDensitySlider">
              <div class="control-row">
                <span>Mesh Density</span>
                <input
                  id="mesh-density-value"
                  class="value-pill value-input"
                  type="number"
                  inputmode="decimal"
                  min="0.25"
                  max="4"
                  step="0.05"
                  value="1.00"
                />
              </div>
              <input id="meshDensitySlider" type="range" min="0.25" max="4" value="1" step="0.05" />
            </label>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Anchors</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <div class="control-hint">
              LMB Mesh Vert = Add Anchor<br />
              LMB+Drag Anchor = Raise or Lower<br />
              Double LMB Added Anchor = Delete
            </div>
            <label class="toggle-control" for="cornerAnchorsToggle">
              <span>Corner Anchors</span>
              <input id="cornerAnchorsToggle" type="checkbox" checked />
            </label>
            <div class="control control-grid-2">
              <button id="groundAnchorsButton" class="pill-button" type="button">Ground</button>
              <button id="clearAnchorsButton" class="pill-button" type="button">Clear</button>
            </div>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Display</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <label class="toggle-control" for="baseGridToggle">
              <span>Base Grid</span>
              <input id="baseGridToggle" type="checkbox" checked />
            </label>
            <label class="toggle-control" for="wireToggle">
              <span>Mesh Wires</span>
              <input id="wireToggle" type="checkbox" checked />
            </label>
            <label class="toggle-control" for="reflectionToggle">
              <span>Foil Material</span>
              <input id="reflectionToggle" type="checkbox" checked />
            </label>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Export</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <div class="control">
              <button id="exportObjButton" class="pill-button control-button-wide" type="button">Export OBJ</button>
            </div>
            <div class="control">
              <button id="exportGlbButton" class="pill-button control-button-wide" type="button">Export GLB</button>
            </div>
            <div class="control">
              <button id="exportScreenshotButton" class="pill-button control-button-wide" type="button">Export Screenshot</button>
            </div>
          </div>
        </section>
      </div>
      <div id="ui-handle-bottom"></div>
    </section>
  </div>
`;function L(e){let t=wt.querySelector(e);if(!t)throw Error(`Missing UI element: ${e}`);return t}function Tt(e,t,n,r,i,a){for(let o of[-t,0,t]){let t=e.createRadialGradient(n+o,r,0,n+o,r,i);for(let[e,n]of a)t.addColorStop(e,n);e.fillStyle=t,e.fillRect(n+o-i,r-i,i*2,i*2)}}function Et(t){let n=new D(t),r=document.createElement(`canvas`);r.width=1024,r.height=512;let i=r.getContext(`2d`);if(!i)throw Error(`Could not create environment canvas context.`);let a=r.width,o=r.height,s=i.createLinearGradient(0,0,0,o);s.addColorStop(0,`#172241`),s.addColorStop(.24,`#35538b`),s.addColorStop(.52,`#9aa8e2`),s.addColorStop(.76,`#ebf1ff`),s.addColorStop(1,`#c8f3ff`),i.fillStyle=s,i.fillRect(0,0,a,o),Tt(i,a,a*.18,o*.5,a*.24,[[0,`rgba(255, 92, 223, 0.62)`],[.42,`rgba(255, 92, 223, 0.18)`],[1,`rgba(255, 92, 223, 0)`]]),Tt(i,a,a*.82,o*.52,a*.24,[[0,`rgba(255, 207, 103, 0.82)`],[.4,`rgba(255, 207, 103, 0.24)`],[1,`rgba(255, 207, 103, 0)`]]),Tt(i,a,a*.5,o*.84,a*.34,[[0,`rgba(79, 230, 255, 0.72)`],[.38,`rgba(79, 230, 255, 0.24)`],[1,`rgba(79, 230, 255, 0)`]]),Tt(i,a,a*.5,o*.2,a*.26,[[0,`rgba(255, 255, 255, 0.82)`],[.48,`rgba(255, 255, 255, 0.18)`],[1,`rgba(255, 255, 255, 0)`]]),Tt(i,a,a*.58,o*.58,a*.18,[[0,`rgba(255, 255, 255, 0.34)`],[.55,`rgba(255, 255, 255, 0.08)`],[1,`rgba(255, 255, 255, 0)`]]);let c=new m(r);c.colorSpace=e,c.mapping=303;let l=n.fromEquirectangular(c);return c.dispose(),n.dispose(),l}var Dt=L(`.viewport`),R=L(`#ui-panel`),Ot=L(`#ui-handle`),kt=L(`#ui-handle-bottom`),At=L(`#collapseToggle`),jt=L(`#startButton`),Mt=L(`#resetButton`),Nt=L(`#clearSceneButton`),Pt=L(`#exportObjButton`),Ft=L(`#exportGlbButton`),It=L(`#exportScreenshotButton`),Lt=L(`#pressureSlider`),Rt=L(`#pressure-value`),zt=L(`#crownBiasSlider`),Bt=L(`#crown-bias-value`),Vt=L(`#pressureScaleSlider`),Ht=L(`#pressure-scale-value`),Ut=L(`#pressureResponseSlider`),Wt=L(`#pressure-response-value`),Gt=L(`#dampingSlider`),Kt=L(`#damping-value`),qt=L(`#substepsSlider`),Jt=L(`#substeps-value`),Yt=L(`#constraintIterationsSlider`),Xt=L(`#constraint-iterations-value`),Zt=L(`#stiffnessSlider`),Qt=L(`#stiffness-value`),$t=L(`#maxDeltaTimeSlider`),en=L(`#max-delta-time-value`),tn=L(`#subdivisionLevelSlider`),nn=L(`#subdivision-level-value`),rn=L(`#meshDensitySlider`),an=L(`#mesh-density-value`),on=L(`#cornerAnchorsToggle`),sn=L(`#groundAnchorsButton`),cn=L(`#clearAnchorsButton`),ln=L(`#baseGridToggle`),un=L(`#wireToggle`),dn=L(`#reflectionToggle`),z=new y({canvas:Dt,antialias:!0,powerPreference:`high-performance`,preserveDrawingBuffer:!0});z.outputColorSpace=e,z.toneMapping=4,z.toneMappingExposure=1.18,z.shadowMap.enabled=!0,z.shadowMap.type=2;var B=new b;B.background=new k(0);var fn=Et(z);B.environment=fn.texture;var pn={magenta:6.2,cyan:7.8,amber:6.9},V=new t(42,1,.1,200);V.position.set(8.5,7.2,8.5);var mn=new Ct({width:200,height:200,sectionSize:5,sectionThickness:1.02,cellSize:1,cellThickness:.46,cellColor:`#656b71`,sectionColor:`#52585f`,fadeDistance:140,fadeStrength:1.35,infiniteGrid:!0,followCamera:!0,y:.001,opacity:.9});B.add(mn.mesh);var H=new w(V,z.domElement);H.enableDamping=!0,H.target.set(0,.3,0),H.minDistance=3,H.maxDistance=120,H.maxPolarAngle=Math.PI-.01,H.mouseButtons.LEFT=-1,H.mouseButtons.MIDDLE=te.PAN,H.mouseButtons.RIGHT=te.ROTATE;var hn=new C(16382975,9148068,1.2);B.add(hn);var U=new g(16777215,1.5);U.position.set(6,11,4),U.castShadow=!0,U.shadow.mapSize.set(2048,2048),U.shadow.bias=-15e-5,U.shadow.normalBias=.045,U.shadow.camera.near=.5,U.shadow.camera.far=40,U.shadow.camera.left=-12,U.shadow.camera.right=12,U.shadow.camera.top=12,U.shadow.camera.bottom=-12,B.add(U);var gn=new g(14150655,.55);gn.position.set(-9,6,-8),B.add(gn);var _n=new r(16731336,pn.magenta,30,2);_n.position.set(-7.5,4.5,4.8),B.add(_n);var vn=new r(5236479,pn.cyan,28,2);vn.position.set(6.5,2.4,7.5),B.add(vn);var yn=new r(16762967,pn.amber,28,2);yn.position.set(7.8,5.2,-4.8),B.add(yn);var bn=new E;bn.position.y=.02,B.add(bn);var xn=new E;B.add(xn);var Sn=new E;B.add(Sn);var Cn=new h(.11,.11,.08,20),wn=new o(.06,16,12),Tn=new l({color:15988731,roughness:.35,metalness:.02}),En=new l({color:16766074,roughness:.32,metalness:.04}),Dn=new l({color:6547599,roughness:.28,metalness:.06}),On=new l({color:16753479,roughness:.3,metalness:.05}),kn=new l({color:16766074,roughness:.28,metalness:.06}),An=new l({color:16753479,roughness:.26,metalness:.08}),jn=new _({color:15988731}),Mn=new _({color:14703224}),W=new x;W.params.Points.threshold=.18;var Nn=new ne(new i(0,1,0),0),Pn=new ne,Fn=new c,In=new i,Ln=new S,Rn=6,zn=320,Bn=.06,Vn=`260421_CatenaryCanopy`,Hn=1/60,Un=8,Wn={x:0,y:0},Gn={obj:0,glb:0,png:0},Kn=1,G=Ae(),K=null,qn=null,Jn=!1,q=0,Yn=!1,J=null,Xn=null,Y=null,Zn=null,Qn=null,$n=on.checked,er=ln.checked,tr=un.checked,nr=dn.checked;function rr(e,t){let n=z.domElement.getBoundingClientRect();Fn.x=(e-n.left)/n.width*2-1,Fn.y=-((t-n.top)/n.height)*2+1}function ir(e,t){return rr(e,t),W.setFromCamera(Fn,V),W.ray.intersectPlane(Nn,In)?In.clone():null}function ar(e){return new c(e.x,e.z)}function or(e){return{id:Kn++,position:ar(e)}}function sr(e=G.closed){let t=Pe(G.points,e);G.valid=t.valid,G.error=t.error}function cr(e){G.hoveredVertexId!==e&&(G.hoveredVertexId=e,fr())}function lr(e){Zn!==e&&(Zn=e,X())}function ur(e,t){if(K||G.closed||G.points.length<3){cr(null);return}let n=pr(e,t);cr(n?Number(n.object.userData.pointId):null)}function dr(e,t){if(!K){lr(null);return}let n=mr(e,t);lr(n?Number(n.object.userData.anchorIndex):null)}function fr(){if(qn&&=(bn.remove(qn),qn.geometry.dispose(),null),xn.clear(),sr(),G.points.length>=2){let e=[];for(let t of G.points)e.push(new i(t.position.x,0,t.position.y));G.closed&&G.points.length>=3&&e.push(new i(G.points[0].position.x,0,G.points[0].position.y)),qn=new v(new O().setFromPoints(e),G.closed||G.points.length>=3?G.valid?jn:Mn:jn),bn.add(qn)}if(K)return;let e=G.points[0]?.id??null;for(let t of G.points){let n=!G.closed&&t.id===e&&G.points.length>=3&&Pe(G.points,!0).valid,r=G.hoveredVertexId===t.id,i=new p(Cn,n&&G.hoveredVertexId===t.id?Dn:r?On:n?En:Tn);i.position.set(t.position.x,.05,t.position.y),i.userData.pointId=t.id,xn.add(i)}}function X(){if(Sn.clear(),K)for(let e of K.getAnchorVertices()){let t=new p(wn,Zn===e.index?An:kn);t.position.copy(e.position),t.userData.anchorIndex=e.index,Sn.add(t)}}function pr(e,t){return xn.children.length===0?null:(rr(e,t),W.setFromCamera(Fn,V),W.intersectObjects(xn.children,!1)[0]??null)}function mr(e,t){return Sn.children.length===0?null:(rr(e,t),W.setFromCamera(Fn,V),W.intersectObjects(Sn.children,!1)[0]??null)}function hr(e,t){if(!K)return null;rr(e,t),W.setFromCamera(Fn,V);let n=W.intersectObject(K.vertexDots,!1)[0];return typeof n?.index==`number`?n.index:null}function Z(e,t){let n=Number.parseFloat(e.value);return Number.isFinite(n)?n:t}function gr(e,t,n){return Math.min(Math.max(e,t),n)}function _r(e){if(e.step===`any`)return null;let t=Number.parseFloat(e.step);return Number.isFinite(t)&&t>0?t:null}function vr(e){if(!Number.isFinite(e))return 0;let t=e.toString().toLowerCase();if(t.includes(`e-`)){let[,e]=t.split(`e-`),n=Number.parseInt(e??`0`,10);return(t.split(`.`)[1]?.split(`e`)[0]??``).length+n}return t.split(`.`)[1]?.length??0}function yr(e,t){let n=Number.parseFloat(t.min),r=Number.parseFloat(t.max),i=e;Number.isFinite(n)&&Number.isFinite(r)&&(i=gr(i,n,r));let a=_r(t);if(a===null)return i;let o=Number.isFinite(n)?n:0,s=Math.round((i-o)/a)*a+o,c=vr(a);return Number.parseFloat(s.toFixed(c))}function br(e,t,n,r){let i=Number.parseFloat(e.value);t.value=`${yr(Number.isFinite(i)?i:n,t)}`,r()}function Q(e,t,n,r){let i=()=>{br(e,t,n,r)};e.addEventListener(`change`,i),e.addEventListener(`blur`,i),e.addEventListener(`keydown`,t=>{if(t.key===`Enter`){t.preventDefault(),i(),e.blur();return}t.key===`Escape`&&(t.preventDefault(),r(),e.blur())})}function xr(){let e=K?new Set(K.flatMesh.cornerVertexIndices):null;return K?.getAnchorVertices().map(t=>({position:t.position.clone(),isCornerAnchor:e?.has(t.index)??!1}))??[]}function Sr(e,t){if(!K)return-1;let n=-1,r=1/0;for(let i=0;i<K.flatMesh.vertices.length;i+=1){if(t.has(i))continue;let a=K.flatMesh.vertices[i],o=a.x-e.x,s=a.y-e.z,c=o*o+s*s;c<r&&(r=c,n=i)}return n}function Cr(){return $n}function wr(){return Z(Lt,56.55)}function Tr(){return Z(zt,.2)}function Er(){return Z(Vt,8.3)}function Dr(){return Z(Ut,1.9)}function Or(){return Z(Gt,4.8)}function kr(){return Math.max(1,Math.round(Z(qt,5)))}function Ar(){return Math.max(1,Math.round(Z(Yt,10)))}function jr(){return Z(Zt,.19)}function Mr(){return Z($t,.032)}function Nr(){return Math.max(0,Math.round(Z(tn,1)))}function Pr(){return Z(rn,1)}function Fr(){return{useCornerAnchors:Cr(),pressure:wr(),crownBias:Tr(),pressureScale:Er(),pressureResponse:Dr(),damping:Or(),substeps:kr(),constraintIterations:Ar(),stiffness:jr(),maxDeltaTime:Mr(),displaySubdivisionLevel:Nr(),meshDensity:Pr()}}function Ir(e){let t=Number.parseFloat(e.min||`0`),n=Number.parseFloat(e.max||`1`),r=Number.parseFloat(e.value||`0`),i=n<=t?0:(r-t)/(n-t)*100;e.style.setProperty(`--range-progress`,`${A.clamp(i,0,100)}%`)}function Lr(e){let t=or(e),n=G.points[G.points.length-1];n&&n.position.distanceTo(t.position)<Bn||(G.points=[...G.points,t],G.closed=!1,fr(),$())}function Rr(e,t){G.points=G.points.map(n=>n.id===e?{...n,position:ar(t)}:n),fr(),$()}function zr(e=!1){let t=e?xr():[];if(G.hoveredVertexId=null,Zn=null,Vr(),K=ot(je(G.points),Fr()),q=0,K.setWireframeVisible(tr),K.setReflectionEnabled(nr),B.add(K.mesh),t.length>0){let e=new Set;for(let n of t){if(!Cr()&&n.isCornerAnchor)continue;let t=Sr(n.position,e);t<0||(e.add(t),K.ensurePinnedVertex(t,n.position.y))}}fr(),X()}function Br(){let e=Pe(G.points,!0);if(!e.valid){G.valid=!1,G.error=e.error,fr(),$();return}G.closed=!0,G.valid=!0,G.error=`Mesh generated. Press Start to inflate.`,zr(),Jn=!1,$()}function Vr(){K&&(q=0,Zn=null,B.remove(K.mesh),K.dispose(),K=null,fr(),X())}function Hr(){Jn=!1,q=0,H.enabled=!0,yi(),Zn=null,G=Ae(),Kn=1,Vr(),fr(),X(),$()}function Ur(){K&&(Jn=!1,q=0,J=null,Xn=null,Y=null,K.reset(),X(),$())}function Wr(){Rt.value=wr().toFixed(2),Ir(Lt)}function Gr(){Bt.value=Tr().toFixed(2),Ir(zt)}function Kr(){Ht.value=Er().toFixed(1),Ir(Vt)}function qr(){Wt.value=Dr().toFixed(2),Ir(Ut)}function Jr(){Kt.value=Or().toFixed(2),Ir(Gt)}function Yr(){Jt.value=`${kr()}`,Ir(qt)}function Xr(){Xt.value=`${Ar()}`,Ir(Yt)}function Zr(){Qt.value=jr().toFixed(2),Ir(Zt)}function Qr(){en.value=Mr().toFixed(4),Ir($t)}function $r(){nn.value=`${Nr()}`,Ir(tn)}function ei(){an.value=Pr().toFixed(2),Ir(rn)}function $(){Wr(),Gr(),Kr(),qr(),Jr(),Yr(),Xr(),Zr(),Qr(),$r(),ei(),jt.textContent=Jn?`Pause`:`Start`,jt.classList.toggle(`is-start-state`,!Jn),jt.classList.toggle(`is-stop-state`,Jn),jt.disabled=!1,sn.disabled=!1,cn.disabled=!1,Pt.disabled=!1,Ft.disabled=!1,It.disabled=!1}function ti(){mn.mesh.visible=er,K?.setWireframeVisible(tr)}function ni(){B.environment=nr?fn.texture:null,_n.intensity=nr?pn.magenta:0,vn.intensity=nr?pn.cyan:0,yn.intensity=nr?pn.amber:0,K?.setReflectionEnabled(nr)}function ri(e){if(!K)return;let t=K.getDisplayVertexPosition(e),n=V.getWorldDirection(new i),r=new i(n.x,0,n.z);r.lengthSq()<1e-6&&r.set(1,0,0),r.normalize();let a=new i().crossVectors(r,new i(0,1,0)).normalize();Pn.setFromNormalAndCoplanarPoint(a,t)}function ii(){K?.getPinnedCount()||(Jn=!1,q=0)}function ai(){!K||K.getPinnedCount()===0||(Jn=!Jn,q=0,$())}function oi(e,t){let n=document.createElement(`a`),r=URL.createObjectURL(e);n.href=r,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(r),0)}function si(e){return Gn[e]+=1,`${Vn}_${String(Gn[e]).padStart(3,`0`)}.${e}`}function ci(){return K?[K.mesh]:[]}function li(e){return(Array.isArray(e)?e[0]:e).color?.clone()??new k(12768754)}function ui(){return ci().map((e,t)=>{e.updateWorldMatrix(!0,!1);let n=e.geometry.clone();n.applyMatrix4(e.matrixWorld),n.computeVertexNormals();let r=new p(n,new l({color:li(e.material),side:2,roughness:.45,metalness:.05}));return r.name=`${Vn}_${String(t+1).padStart(2,`0`)}`,r})}function di(e){for(let t of e)t.geometry.dispose(),t.material.dispose()}function fi(){let e=ui();if(e.length===0)return;let t=`# ${Vn} OBJ Export\n`,n=0;for(let r of e){let e=r.geometry,i=e.getAttribute(`position`),a=e.getAttribute(`normal`),o=e.getIndex();t+=`o ${r.name}\n`;for(let e=0;e<i.count;e+=1)t+=`v ${i.getX(e)} ${i.getY(e)} ${i.getZ(e)}\n`;if(a)for(let e=0;e<a.count;e+=1)t+=`vn ${a.getX(e)} ${a.getY(e)} ${a.getZ(e)}\n`;if(o)for(let e=0;e<o.count;e+=3){let r=n+o.getX(e)+1,i=n+o.getX(e+1)+1,s=n+o.getX(e+2)+1;t+=a?`f ${r}//${r} ${i}//${i} ${s}//${s}\n`:`f ${r} ${i} ${s}\n`}else for(let e=0;e<i.count;e+=3){let r=n+e+1,i=n+e+2,o=n+e+3;t+=a?`f ${r}//${r} ${i}//${i} ${o}//${o}\n`:`f ${r} ${i} ${o}\n`}n+=i.count}oi(new Blob([t],{type:`text/plain;charset=utf-8`}),si(`obj`)),di(e)}function pi(){let e=ui();if(e.length===0)return;let t=new ee,n=new E;for(let t of e)n.add(t);t.parse(n,t=>{t instanceof ArrayBuffer&&oi(new Blob([t],{type:`model/gltf-binary`}),si(`glb`)),di(e)},()=>{di(e)},{binary:!0})}function mi(){z.render(B,V),z.domElement.toBlob(e=>{e&&oi(e,si(`png`))},`image/png`)}function hi(){if(window.innerWidth<=700){R.style.left=``,R.style.top=``;return}let e=R.getBoundingClientRect(),t=Math.max(12,window.innerWidth-e.width-12),n=Math.max(12,window.innerHeight-e.height-12),r=A.clamp(e.left,12,t),i=A.clamp(e.top,12,n);R.style.left=`${r}px`,R.style.top=`${i}px`,R.style.right=`auto`,R.style.bottom=`auto`}function gi(){let e=wt.querySelectorAll(`.panel-section-header`);for(let t of e)t.addEventListener(`click`,()=>{let e=t.closest(`.panel-section`);if(!e)return;let n=e.classList.toggle(`is-collapsed`);t.setAttribute(`aria-expanded`,n?`false`:`true`)})}function _i(e){if(window.innerWidth<=700||e.target instanceof Element&&e.target.closest(`.collapse-button`))return;let t=R.getBoundingClientRect();Yn=!0,Wn.x=e.clientX-t.left,Wn.y=e.clientY-t.top,R.style.left=`${t.left}px`,R.style.top=`${t.top}px`,R.style.right=`auto`,R.style.bottom=`auto`,e.currentTarget?.setPointerCapture(e.pointerId)}function vi(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement||e?.hasAttribute(`contenteditable`)===!0}function yi(){J=null,Xn=null,Y=null,Qn=null}function bi(){Wr(),K?.setPressure(wr()),$()}function xi(){Gr(),K?.setCrownBias(Tr())}function Si(){Kr(),K?.setPressureScale(Er())}function Ci(){qr(),K?.setPressureResponse(Dr())}function wi(){Jr(),K?.setDamping(Or())}function Ti(){Yr(),K?.setSubsteps(kr())}function Ei(){Xr(),K?.setConstraintIterations(Ar())}function Di(){Zr(),K?.setStiffness(jr())}function Oi(){Qr(),K?.setMaxDeltaTime(Mr())}function ki(){$r(),K?.setSubdivisionLevel(Nr())}function Ai(){ei(),K&&(zr(!0),$())}function ji(e,t){if(K){if(!(Qn!==null&&Qn.index===e&&t-Qn.timeStamp<=zn)){Qn={index:e,timeStamp:t};return}Qn=null,K.removePinnedVertex(e,Cr())&&(ii(),Zn=null,X(),$())}}jt.addEventListener(`click`,ai),Mt.addEventListener(`click`,Ur),Nt.addEventListener(`click`,Hr),Pt.addEventListener(`click`,fi),Ft.addEventListener(`click`,pi),It.addEventListener(`click`,mi),Lt.addEventListener(`input`,bi),zt.addEventListener(`input`,xi),Vt.addEventListener(`input`,Si),Ut.addEventListener(`input`,Ci),Gt.addEventListener(`input`,wi),qt.addEventListener(`input`,Ti),Yt.addEventListener(`input`,Ei),Zt.addEventListener(`input`,Di),$t.addEventListener(`input`,Oi),tn.addEventListener(`input`,ki),rn.addEventListener(`input`,Ai),Q(Rt,Lt,56.55,bi),Q(Bt,zt,.2,xi),Q(Ht,Vt,8.3,Si),Q(Wt,Ut,1.9,Ci),Q(Kt,Gt,4.8,wi),Q(Jt,qt,5,Ti),Q(Xt,Yt,10,Ei),Q(Qt,Zt,.19,Di),Q(en,$t,.032,Oi),Q(nn,tn,1,ki),Q(an,rn,1,Ai),on.addEventListener(`change`,()=>{$n=on.checked,K&&(zr(!0),ii()),$()}),sn.addEventListener(`click`,()=>{!K||K.getPinnedCount()===0||(K.groundPinnedVertices(),X(),$())}),cn.addEventListener(`click`,()=>{!K||K.getPinnedCount()===0||(K.clearPinnedVertices(Cr()),ii(),X(),$())}),ln.addEventListener(`change`,()=>{er=ln.checked,ti()}),un.addEventListener(`change`,()=>{tr=un.checked,ti()}),dn.addEventListener(`change`,()=>{nr=dn.checked,ni()}),z.domElement.addEventListener(`contextmenu`,e=>{e.preventDefault()}),R.addEventListener(`contextmenu`,e=>{e.preventDefault()}),At.addEventListener(`pointerdown`,e=>{e.stopPropagation()}),At.addEventListener(`click`,()=>{let e=R.classList.toggle(`is-collapsed`);At.setAttribute(`aria-expanded`,e?`false`:`true`),hi()}),Ot.addEventListener(`pointerdown`,_i),kt.addEventListener(`pointerdown`,_i),z.domElement.addEventListener(`pointerdown`,e=>{if(e.button===1||e.button===2){H.enabled=!0;return}if(e.button!==0)return;if(H.enabled=!1,K){let t=mr(e.clientX,e.clientY);if(t){J={pointerId:e.pointerId,clientX:e.clientX,clientY:e.clientY,type:`anchor`,anchorIndex:Number(t.object.userData.anchorIndex)},z.domElement.setPointerCapture(e.pointerId),e.stopPropagation();return}let n=hr(e.clientX,e.clientY);if(n!==null){J={pointerId:e.pointerId,clientX:e.clientX,clientY:e.clientY,type:`vertex`,anchorIndex:n},z.domElement.setPointerCapture(e.pointerId),e.stopPropagation();return}H.enabled=!0;return}let t=pr(e.clientX,e.clientY);if(t){let n=Number(t.object.userData.pointId),r=G.points[0]?.id??null;J={pointerId:e.pointerId,clientX:e.clientX,clientY:e.clientY,type:`outline`,pointId:n,canClose:n===r&&G.points.length>=3&&Pe(G.points,!0).valid},z.domElement.setPointerCapture(e.pointerId),e.stopPropagation();return}let n=ir(e.clientX,e.clientY);if(!n){H.enabled=!0;return}Lr(n)},{capture:!0}),z.domElement.addEventListener(`pointermove`,e=>{if(Xn===null&&Y===null&&(K?(dr(e.clientX,e.clientY),cr(null)):(ur(e.clientX,e.clientY),lr(null))),J&&Xn===null&&Y===null){if(J.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-J.clientX,e.clientY-J.clientY)>Rn){if(Qn=null,J.type===`outline`)Xn=J.pointId??null;else if(J.type===`anchor`)Y=J.anchorIndex??null,Y!==null&&ri(Y);else{z.domElement.hasPointerCapture(e.pointerId)&&z.domElement.releasePointerCapture(e.pointerId),J=null,H.enabled=!0;return}J=null}else return}if(Xn!==null){let t=ir(e.clientX,e.clientY);if(!t)return;Rr(Xn,t);return}if(Y!==null&&K){rr(e.clientX,e.clientY),W.setFromCamera(Fn,V);let t=new i;W.ray.intersectPlane(Pn,t)&&(K.setPinnedVertexDisplayHeight(Y,t.y),X())}}),z.domElement.addEventListener(`pointerup`,e=>{if(Xn!==null){z.domElement.hasPointerCapture(e.pointerId)&&z.domElement.releasePointerCapture(e.pointerId),Xn=null,H.enabled=!0;return}if(Y!==null){z.domElement.hasPointerCapture(e.pointerId)&&z.domElement.releasePointerCapture(e.pointerId),Y=null,X(),$(),H.enabled=!0;return}if(J&&J.pointerId===e.pointerId){z.domElement.hasPointerCapture(e.pointerId)&&z.domElement.releasePointerCapture(e.pointerId);let t=Math.hypot(e.clientX-J.clientX,e.clientY-J.clientY);t<=Rn&&J.type===`outline`&&J.canClose?Br():t<=Rn&&J.type===`anchor`&&K&&J.anchorIndex!==void 0?ji(J.anchorIndex,e.timeStamp):t<=Rn&&J.type===`vertex`&&K&&J.anchorIndex!==void 0&&(K.ensurePinnedVertex(J.anchorIndex),X(),$()),J=null,H.enabled=!0;return}H.enabled=!0}),z.domElement.addEventListener(`pointercancel`,e=>{z.domElement.hasPointerCapture(e.pointerId)&&z.domElement.releasePointerCapture(e.pointerId),yi(),cr(null),lr(null),H.enabled=!0}),z.domElement.addEventListener(`pointerleave`,()=>{cr(null),lr(null)}),window.addEventListener(`pointermove`,e=>{Yn&&(R.style.left=`${e.clientX-Wn.x}px`,R.style.top=`${e.clientY-Wn.y}px`,R.style.right=`auto`,R.style.bottom=`auto`,hi())}),window.addEventListener(`pointerup`,e=>{Yn&&(Yn=!1,Ot.hasPointerCapture(e.pointerId)&&Ot.releasePointerCapture(e.pointerId),kt.hasPointerCapture(e.pointerId)&&kt.releasePointerCapture(e.pointerId))}),window.addEventListener(`pointercancel`,e=>{Yn&&(Yn=!1,Ot.hasPointerCapture(e.pointerId)&&Ot.releasePointerCapture(e.pointerId),kt.hasPointerCapture(e.pointerId)&&kt.releasePointerCapture(e.pointerId))}),window.addEventListener(`keydown`,e=>{e.key!==`Enter`||e.repeat||vi()||K||G.points.length>=3&&(e.preventDefault(),Br())}),window.addEventListener(`resize`,Mi);function Mi(){let e=window.innerWidth,t=window.innerHeight;V.aspect=e/t,V.updateProjectionMatrix(),z.setPixelRatio(Math.min(window.devicePixelRatio,2)),z.setSize(e,t,!1),hi()}function Ni(){let e=Ln.getDelta();if(H.update(),mn.update(V),K&&Jn){K.setPressure(wr()),q+=e;let t=Hn*Un;q=Math.min(q,t);let n=0;for(;q>=Hn&&n<Un;)K.update(Hn),q-=Hn,n+=1}else q=0;z.render(B,V)}fr(),gi(),Wr(),Gr(),ti(),ni(),$(),Mi(),requestAnimationFrame(()=>{document.documentElement.classList.add(`ui-ready`)}),window.addEventListener(`beforeunload`,()=>{Vr(),fn.dispose(),mn.dispose(),Cn.dispose(),wn.dispose(),Tn.dispose(),En.dispose(),Dn.dispose(),On.dispose(),kn.dispose(),An.dispose(),jn.dispose(),Mn.dispose(),z.dispose()}),z.setAnimationLoop(Ni);