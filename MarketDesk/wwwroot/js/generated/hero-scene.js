var Yp=0,uf=1,Zp=2;var zo=1,Jp=2,ma=3,kr=0,gn=1,ai=2,$i=0,ga=1,ff=2,df=3,pf=4,$p=5;var us=100,Kp=101,Qp=102,jp=103,tm=104,em=200,nm=201,im=202,rm=203,mf=204,gf=205,sm=206,am=207,om=208,lm=209,cm=210,hm=211,um=212,fm=213,dm=214,ac=0,oc=1,lc=2,js=3,cc=4,hc=5,uc=6,fc=7,zc=0,pm=1,mm=2,Ui=0,_f=1,xf=2,yf=3,Vo=4,vf=5,Sf=6,Mf=7;var bf=300,zr=301,fs=302,Vc=303,Gc=304,Go=306,ta=1e3,xi=1001,ea=1002,cn=1003,gm=1004;var Ho=1005;var pn=1006,Hc=1007;var Vr=1008;var Yn=1009,Tf=1010,wf=1011,_a=1012,Wc=1013,Fi=1014,vi=1015,Oi=1016,Xc=1017,qc=1018,xa=1020,Af=35902,Ef=35899,Cf=1021,Rf=1022,Si=1023,Wi=1026,Gr=1027,Yc=1028,Zc=1029,Hr=1030,Jc=1031;var $c=1033,Wo=33776,Xo=33777,qo=33778,Yo=33779,Kc=35840,Qc=35841,jc=35842,th=35843,eh=36196,nh=37492,ih=37496,rh=37488,sh=37489,Zo=37490,ah=37491,oh=37808,lh=37809,ch=37810,hh=37811,uh=37812,fh=37813,dh=37814,ph=37815,mh=37816,gh=37817,_h=37818,xh=37819,yh=37820,vh=37821,Sh=36492,Mh=36494,bh=36495,Th=36283,wh=36284,Jo=36285,Ah=36286;var ro=2300,dc=2301,rc=2302,$u=2303,Ku=2400,Qu=2401,ju=2402;var _m=3200;var $o=0,xm=1,pr="",Un="srgb",so="srgb-linear",ao="linear",_e="srgb";var sc=7680;var ym=519,vm=512,Sm=513,Mm=514,Eh=515,bm=516,Tm=517,Ch=518,wm=519,Am=35044;var Pf="300 es",Li=2e3,na=2001;function d0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function p0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function oo(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Em(){let r=oo("canvas");return r.style.display="block",r}var pp={},ia=null;function If(...r){let t="THREE."+r.shift();ia?ia("log",t,...r):console.log(t,...r)}function Cm(r){let t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=r[1];e&&e.isStackTrace?r[0]+=" "+e.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function jt(...r){r=Cm(r);let t="THREE."+r.shift();if(ia)ia("warn",t,...r);else{let e=r[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...r)}}function te(...r){r=Cm(r);let t="THREE."+r.shift();if(ia)ia("error",t,...r);else{let e=r[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...r)}}function as(...r){let t=r.join(" ");t in pp||(pp[t]=!0,jt(...r))}function Rm(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var Pm={[ac]:oc,[lc]:uc,[cc]:fc,[js]:hc,[oc]:ac,[uc]:lc,[fc]:cc,[hc]:js},Xi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var bu=Math.PI/180,pc=180/Math.PI;function ya(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[r&255]+Mn[r>>8&255]+Mn[r>>16&255]+Mn[r>>24&255]+"-"+Mn[t&255]+Mn[t>>8&255]+"-"+Mn[t>>16&15|64]+Mn[t>>24&255]+"-"+Mn[e&63|128]+Mn[e>>8&255]+"-"+Mn[e>>16&255]+Mn[e>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function ce(r,t,e){return Math.max(t,Math.min(e,r))}function m0(r,t){return(r%t+t)%t}function Tu(r,t,e){return(1-e)*r+e*t}function Ya(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var xt=class r{static{r.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(d!==_||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*_;m<0&&(u=-u,f=-f,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){let b=Math.acos(m),R=Math.sin(b);p=Math.sin(p*b)/R,o=Math.sin(o*b)/R,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+_*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+_*o;let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(s/2),u=l(n/2),f=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:jt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class r{static{r.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(mp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(mp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-s*i),d=2*(s*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=i+l*d+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return wu.copy(this).projectOnVector(t),this.sub(wu)}reflect(t){return this.sub(wu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wu=new K,mp=new qi,$t=class r{static{r.prototype.isMatrix3=!0}constructor(t,e,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],b=i[1],R=i[4],x=i[7],M=i[2],T=i[5],E=i[8];return s[0]=a*_+o*b+l*M,s[3]=a*m+o*R+l*T,s[6]=a*p+o*x+l*E,s[1]=c*_+h*b+d*M,s[4]=c*m+h*R+d*T,s[7]=c*p+h*x+d*E,s[2]=u*_+f*b+g*M,s[5]=u*m+f*R+g*T,s[8]=u*p+f*x+g*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Au.makeScale(t,e)),this}rotate(t){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Au.makeRotation(-t)),this}translate(t,e){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Au.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Au=new $t,gp=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_p=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function g0(){let r={enabled:!0,workingColorSpace:so,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===_e&&(i.r=fr(i.r),i.g=fr(i.g),i.b=fr(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(i.r=Qs(i.r),i.g=Qs(i.g),i.b=Qs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pr?ao:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return as("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return as("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[so]:{primaries:t,whitePoint:n,transfer:ao,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),r}var fe=g0();function fr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Qs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Bs,mc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Bs===void 0&&(Bs=oo("canvas")),Bs.width=t.width,Bs.height=t.height;let i=Bs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Bs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=oo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=fr(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(fr(e[n]/255)*255):e[n]=fr(e[n]);return{data:e,width:t.width,height:t.height}}else return jt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},_0=0,ra=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=ya(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Eu(i[a].image)):s.push(Eu(i[a]))}else s=Eu(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Eu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?mc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(jt("Texture: Unable to serialize Texture."),{})}var x0=0,Cu=new K,Fn=class r extends Xi{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=xi,i=xi,s=pn,a=Vr,o=Si,l=Yn,c=r.DEFAULT_ANISOTROPY,h=pr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=ya(),this.name="",this.source=new ra(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Cu).x}get height(){return this.source.getSize(Cu).y}get depth(){return this.source.getSize(Cu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){jt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){jt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ta:t.x=t.x-Math.floor(t.x);break;case xi:t.x=t.x<0?0:1;break;case ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ta:t.y=t.y-Math.floor(t.y);break;case xi:t.y=t.y<0?0:1;break;case ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=bf;Fn.DEFAULT_ANISOTROPY=1;var De=class r{static{r.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let R=(c+1)/2,x=(f+1)/2,M=(p+1)/2,T=(h+u)/4,E=(d+_)/4,y=(g+m)/4;return R>x&&R>M?R<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(R),i=T/n,s=E/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=T/i,s=y/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=E/s,i=y/s),this.set(n,i,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},gc=class extends Xi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},s=new Fn(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new ra(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qn=class extends gc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},lo=class extends Fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=cn,this.minFilter=cn,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var _c=class extends Fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=cn,this.minFilter=cn,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Se=class r{static{r.prototype.isMatrix4=!0}constructor(t,e,n,i,s,a,o,l,c,h,d,u,f,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,h,d,u,f,g,_,m)}set(t,e,n,i,s,a,o,l,c,h,d,u,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/ks.setFromMatrixColumn(t,0).length(),s=1/ks.setFromMatrixColumn(t,1).length(),a=1/ks.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(y0,t,v0)}lookAt(t,e,n){let i=this.elements;return jn.subVectors(t,e),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),Cr.crossVectors(n,jn),Cr.lengthSq()===0&&(Math.abs(n.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),Cr.crossVectors(n,jn)),Cr.normalize(),Nl.crossVectors(jn,Cr),i[0]=Cr.x,i[4]=Nl.x,i[8]=jn.x,i[1]=Cr.y,i[5]=Nl.y,i[9]=jn.y,i[2]=Cr.z,i[6]=Nl.z,i[10]=jn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],R=n[7],x=n[11],M=n[15],T=i[0],E=i[4],y=i[8],w=i[12],L=i[1],H=i[5],k=i[9],Q=i[13],z=i[2],Y=i[6],et=i[10],W=i[14],X=i[3],nt=i[7],P=i[11],at=i[15];return s[0]=a*T+o*L+l*z+c*X,s[4]=a*E+o*H+l*Y+c*nt,s[8]=a*y+o*k+l*et+c*P,s[12]=a*w+o*Q+l*W+c*at,s[1]=h*T+d*L+u*z+f*X,s[5]=h*E+d*H+u*Y+f*nt,s[9]=h*y+d*k+u*et+f*P,s[13]=h*w+d*Q+u*W+f*at,s[2]=g*T+_*L+m*z+p*X,s[6]=g*E+_*H+m*Y+p*nt,s[10]=g*y+_*k+m*et+p*P,s[14]=g*w+_*Q+m*W+p*at,s[3]=b*T+R*L+x*z+M*X,s[7]=b*E+R*H+x*Y+M*nt,s[11]=b*y+R*k+x*et+M*P,s[15]=b*w+R*Q+x*W+M*at,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15],b=l*f-c*u,R=o*f-c*d,x=o*u-l*d,M=a*f-c*h,T=a*u-l*h,E=a*d-o*h;return e*(_*b-m*R+p*x)-n*(g*b-m*M+p*T)+i*(g*R-_*M+p*E)-s*(g*x-_*T+m*E)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(s*h-o*l)+i*(s*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=e*o-n*a,R=e*l-i*a,x=e*c-s*a,M=n*l-i*o,T=n*c-s*o,E=i*c-s*l,y=h*_-d*g,w=h*m-u*g,L=h*p-f*g,H=d*m-u*_,k=d*p-f*_,Q=u*p-f*m,z=b*Q-R*k+x*H+M*L-T*w+E*y;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Y=1/z;return t[0]=(o*Q-l*k+c*H)*Y,t[1]=(i*k-n*Q-s*H)*Y,t[2]=(_*E-m*T+p*M)*Y,t[3]=(u*T-d*E-f*M)*Y,t[4]=(l*L-a*Q-c*w)*Y,t[5]=(e*Q-i*L+s*w)*Y,t[6]=(m*x-g*E-p*R)*Y,t[7]=(h*E-u*x+f*R)*Y,t[8]=(a*k-o*L+c*y)*Y,t[9]=(n*L-e*k-s*y)*Y,t[10]=(g*T-_*x+p*b)*Y,t[11]=(d*x-h*T-f*b)*Y,t[12]=(o*w-a*H-l*y)*Y,t[13]=(e*H-n*w+i*y)*Y,t[14]=(_*R-g*M-m*b)*Y,t[15]=(h*M-d*R+u*b)*Y,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,g=s*d,_=a*h,m=a*d,p=o*d,b=l*c,R=l*h,x=l*d,M=n.x,T=n.y,E=n.z;return i[0]=(1-(_+p))*M,i[1]=(f+x)*M,i[2]=(g-R)*M,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(u+p))*T,i[6]=(m+b)*T,i[7]=0,i[8]=(g+R)*E,i[9]=(m-b)*E,i[10]=(1-(u+_))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=ks.set(i[0],i[1],i[2]).length(),o=ks.set(i[4],i[5],i[6]).length(),l=ks.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Ci.copy(this);let c=1/a,h=1/o,d=1/l;return Ci.elements[0]*=c,Ci.elements[1]*=c,Ci.elements[2]*=c,Ci.elements[4]*=h,Ci.elements[5]*=h,Ci.elements[6]*=h,Ci.elements[8]*=d,Ci.elements[9]*=d,Ci.elements[10]*=d,e.setFromRotationMatrix(Ci),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,s,a,o=Li,l=!1){let c=this.elements,h=2*s/(e-t),d=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),g,_;if(l)g=s/(a-s),_=a*s/(a-s);else if(o===Li)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===na)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=Li,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),g,_;if(l)g=1/(a-s),_=a/(a-s);else if(o===Li)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===na)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ks=new K,Ci=new Se,y0=new K(0,0,0),v0=new K(1,1,1),Cr=new K,Nl=new K,jn=new K,xp=new Se,yp=new qi,Yi=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:jt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yp.setFromEuler(this),this.setFromQuaternion(yp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yi.DEFAULT_ORDER="XYZ";var co=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},S0=0,vp=new K,zs=new qi,ar=new Se,Ul=new K,Za=new K,M0=new K,b0=new qi,Sp=new K(1,0,0),Mp=new K(0,1,0),bp=new K(0,0,1),Tp={type:"added"},T0={type:"removed"},Vs={type:"childadded",child:null},Ru={type:"childremoved",child:null},hn=class r extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=ya(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new K,e=new Yi,n=new qi,i=new K(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Se},normalMatrix:{value:new $t}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zs.setFromAxisAngle(t,e),this.quaternion.multiply(zs),this}rotateOnWorldAxis(t,e){return zs.setFromAxisAngle(t,e),this.quaternion.premultiply(zs),this}rotateX(t){return this.rotateOnAxis(Sp,t)}rotateY(t){return this.rotateOnAxis(Mp,t)}rotateZ(t){return this.rotateOnAxis(bp,t)}translateOnAxis(t,e){return vp.copy(t).applyQuaternion(this.quaternion),this.position.add(vp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sp,t)}translateY(t){return this.translateOnAxis(Mp,t)}translateZ(t){return this.translateOnAxis(bp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ar.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ul.copy(t):Ul.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Za.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ar.lookAt(Za,Ul,this.up):ar.lookAt(Ul,Za,this.up),this.quaternion.setFromRotationMatrix(ar),i&&(ar.extractRotation(i.matrixWorld),zs.setFromRotationMatrix(ar),this.quaternion.premultiply(zs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Tp),Vs.child=t,this.dispatchEvent(Vs),Vs.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(T0),Ru.child=t,this.dispatchEvent(Ru),Ru.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ar.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ar.multiply(t.parent.matrixWorld)),t.applyMatrix4(ar),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Tp),Vs.child=t,this.dispatchEvent(Vs),Vs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Za,t,M0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Za,b0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};hn.DEFAULT_UP=new K(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ei=class extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}},w0={type:"move"},sa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(w0)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ei;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Im={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rr={h:0,s:0,l:0},Fl={h:0,s:0,l:0};function Pu(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=fe.workingColorSpace){return this.r=t,this.g=e,this.b=n,fe.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=fe.workingColorSpace){if(t=m0(t,1),e=ce(e,0,1),n=ce(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Pu(a,s,t+1/3),this.g=Pu(a,s,t),this.b=Pu(a,s,t-1/3)}return fe.colorSpaceToWorking(this,i),this}setStyle(t,e=Un){function n(s){s!==void 0&&parseFloat(s)<1&&jt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:jt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);jt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Un){let n=Im[t.toLowerCase()];return n!==void 0?this.setHex(n,e):jt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}copyLinearToSRGB(t){return this.r=Qs(t.r),this.g=Qs(t.g),this.b=Qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return fe.workingToColorSpace(bn.copy(this),t),Math.round(ce(bn.r*255,0,255))*65536+Math.round(ce(bn.g*255,0,255))*256+Math.round(ce(bn.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.workingToColorSpace(bn.copy(this),e);let n=bn.r,i=bn.g,s=bn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=fe.workingColorSpace){return fe.workingToColorSpace(bn.copy(this),e),t.r=bn.r,t.g=bn.g,t.b=bn.b,t}getStyle(t=Un){fe.workingToColorSpace(bn.copy(this),t);let e=bn.r,n=bn.g,i=bn.b;return t!==Un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Rr),this.setHSL(Rr.h+t,Rr.s+e,Rr.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Rr),t.getHSL(Fl);let n=Tu(Rr.h,Fl.h,e),i=Tu(Rr.s,Fl.s,e),s=Tu(Rr.l,Fl.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new ee;ee.NAMES=Im;var os=class extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yi,this.environmentIntensity=1,this.environmentRotation=new Yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ri=new K,or=new K,Iu=new K,lr=new K,Gs=new K,Hs=new K,wp=new K,Lu=new K,Du=new K,Nu=new K,Uu=new De,Fu=new De,Ou=new De,Dr=class r{constructor(t=new K,e=new K,n=new K){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ri.subVectors(t,e),i.cross(Ri);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ri.subVectors(i,e),or.subVectors(n,e),Iu.subVectors(t,e);let a=Ri.dot(Ri),o=Ri.dot(or),l=Ri.dot(Iu),c=or.dot(or),h=or.dot(Iu),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,lr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,lr.x),l.addScaledVector(a,lr.y),l.addScaledVector(o,lr.z),l)}static getInterpolatedAttribute(t,e,n,i,s,a){return Uu.setScalar(0),Fu.setScalar(0),Ou.setScalar(0),Uu.fromBufferAttribute(t,e),Fu.fromBufferAttribute(t,n),Ou.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Uu,s.x),a.addScaledVector(Fu,s.y),a.addScaledVector(Ou,s.z),a}static isFrontFacing(t,e,n,i){return Ri.subVectors(n,e),or.subVectors(t,e),Ri.cross(or).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ri.subVectors(this.c,this.b),or.subVectors(this.a,this.b),Ri.cross(or).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,a,o;Gs.subVectors(i,n),Hs.subVectors(s,n),Lu.subVectors(t,n);let l=Gs.dot(Lu),c=Hs.dot(Lu);if(l<=0&&c<=0)return e.copy(n);Du.subVectors(t,i);let h=Gs.dot(Du),d=Hs.dot(Du);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Gs,a);Nu.subVectors(t,s);let f=Gs.dot(Nu),g=Hs.dot(Nu);if(g>=0&&f<=g)return e.copy(s);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Hs,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return wp.subVectors(s,i),o=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(wp,o);let p=1/(m+_+u);return a=_*p,o=u*p,e.copy(n).addScaledVector(Gs,a).addScaledVector(Hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},yi=class{constructor(t=new K(1/0,1/0,1/0),e=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Pi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Pi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Pi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Pi):Pi.fromBufferAttribute(s,a),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ol.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ol.copy(n.boundingBox)),Ol.applyMatrix4(t.matrixWorld),this.union(Ol)}let i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ja),Bl.subVectors(this.max,Ja),Ws.subVectors(t.a,Ja),Xs.subVectors(t.b,Ja),qs.subVectors(t.c,Ja),Pr.subVectors(Xs,Ws),Ir.subVectors(qs,Xs),ns.subVectors(Ws,qs);let e=[0,-Pr.z,Pr.y,0,-Ir.z,Ir.y,0,-ns.z,ns.y,Pr.z,0,-Pr.x,Ir.z,0,-Ir.x,ns.z,0,-ns.x,-Pr.y,Pr.x,0,-Ir.y,Ir.x,0,-ns.y,ns.x,0];return!Bu(e,Ws,Xs,qs,Bl)||(e=[1,0,0,0,1,0,0,0,1],!Bu(e,Ws,Xs,qs,Bl))?!1:(kl.crossVectors(Pr,Ir),e=[kl.x,kl.y,kl.z],Bu(e,Ws,Xs,qs,Bl))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},cr=[new K,new K,new K,new K,new K,new K,new K,new K],Pi=new K,Ol=new yi,Ws=new K,Xs=new K,qs=new K,Pr=new K,Ir=new K,ns=new K,Ja=new K,Bl=new K,kl=new K,is=new K;function Bu(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){is.fromArray(r,s);let o=i.x*Math.abs(is.x)+i.y*Math.abs(is.y)+i.z*Math.abs(is.z),l=t.dot(is),c=e.dot(is),h=n.dot(is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var $e=new K,zl=new xt,A0=0,ni=class extends Xi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:A0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Am,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zl.fromBufferAttribute(this,e),zl.applyMatrix3(t),this.setXY(e,zl.x,zl.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix3(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ya(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ya(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ya(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ya(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ya(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xn(e,this.array),n=Xn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xn(e,this.array),n=Xn(n,this.array),i=Xn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xn(e,this.array),n=Xn(n,this.array),i=Xn(i,this.array),s=Xn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ho=class extends ni{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var uo=class extends ni{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ze=class extends ni{constructor(t,e,n){super(new Float32Array(t),e,n)}},E0=new yi,$a=new K,ku=new K,dr=class{constructor(t=new K,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):E0.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$a.subVectors(t,this.center);let e=$a.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector($a,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ku.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($a.copy(t.center).add(ku)),this.expandByPoint($a.copy(t.center).sub(ku))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},C0=0,_i=new Se,zu=new hn,Ys=new K,ti=new yi,Ka=new yi,ln=new K,mn=class r extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=ya(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(d0(t)?uo:ho)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new $t().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return _i.makeRotationFromQuaternion(t),this.applyMatrix4(_i),this}rotateX(t){return _i.makeRotationX(t),this.applyMatrix4(_i),this}rotateY(t){return _i.makeRotationY(t),this.applyMatrix4(_i),this}rotateZ(t){return _i.makeRotationZ(t),this.applyMatrix4(_i),this}translate(t,e,n){return _i.makeTranslation(t,e,n),this.applyMatrix4(_i),this}scale(t,e,n){return _i.makeScale(t,e,n),this.applyMatrix4(_i),this}lookAt(t){return zu.lookAt(t),zu.updateMatrix(),this.applyMatrix4(zu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ze(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&jt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];ti.setFromBufferAttribute(s),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(t){let n=this.boundingSphere.center;if(ti.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];Ka.setFromBufferAttribute(o),this.morphTargetsRelative?(ln.addVectors(ti.min,Ka.min),ti.expandByPoint(ln),ln.addVectors(ti.max,Ka.max),ti.expandByPoint(ln)):(ti.expandByPoint(Ka.min),ti.expandByPoint(Ka.max))}ti.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)ln.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(ln));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ln.fromBufferAttribute(o,c),l&&(Ys.fromBufferAttribute(t,c),ln.add(Ys)),i=Math.max(i,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ni(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new K,l[y]=new K;let c=new K,h=new K,d=new K,u=new xt,f=new xt,g=new xt,_=new K,m=new K;function p(y,w,L){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,L),u.fromBufferAttribute(s,y),f.fromBufferAttribute(s,w),g.fromBufferAttribute(s,L),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let H=1/(f.x*g.y-g.x*f.y);isFinite(H)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(H),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(H),o[y].add(_),o[w].add(_),o[L].add(_),l[y].add(m),l[w].add(m),l[L].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let y=0,w=b.length;y<w;++y){let L=b[y],H=L.start,k=L.count;for(let Q=H,z=H+k;Q<z;Q+=3)p(t.getX(Q+0),t.getX(Q+1),t.getX(Q+2))}let R=new K,x=new K,M=new K,T=new K;function E(y){M.fromBufferAttribute(i,y),T.copy(M);let w=o[y];R.copy(w),R.sub(M.multiplyScalar(M.dot(w))).normalize(),x.crossVectors(T,w);let H=x.dot(l[y])<0?-1:1;a.setXYZW(y,R.x,R.y,R.z,H)}for(let y=0,w=b.length;y<w;++y){let L=b[y],H=L.start,k=L.count;for(let Q=H,z=H+k;Q<z;Q+=3)E(t.getX(Q+0)),E(t.getX(Q+1)),E(t.getX(Q+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ni(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new K,s=new K,a=new K,o=new K,l=new K,c=new K,h=new K,d=new K;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ln.fromBufferAttribute(t,e),ln.normalize(),t.setXYZ(e,ln.x,ln.y,ln.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new ni(u,h,d)}if(this.index===null)return jt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Vu=new K,R0=new K,P0=new $t,Ii=class{constructor(t=new K(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Vu.subVectors(n,e).cross(R0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(Vu),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||P0.getNormalMatrix(t),i=this.coplanarPoint(Vu).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},I0=0,Zi=class extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=ya(),this.name="",this.type="Material",this.blending=ga,this.side=kr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mf,this.blendDst=gf,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ym,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sc,this.stencilZFail=sc,this.stencilZPass=sc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){jt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){jt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ii().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var hr=new K,Gu=new K,Vl=new K,Gl=new K,fo=class{constructor(t=new K,e=new K(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,hr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=hr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(hr.copy(this.origin).addScaledVector(this.direction,e),hr.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Gu.copy(t).add(e).multiplyScalar(.5),Vl.copy(e).sub(t).normalize(),Gl.copy(this.origin).sub(Gu);let s=t.distanceTo(e)*.5,a=-this.direction.dot(Vl),o=Gl.dot(this.direction),l=-Gl.dot(Vl),c=Gl.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=s*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Gu).addScaledVector(Vl,u),f}intersectSphere(t,e){if(t.radius<0)return null;hr.subVectors(t.center,this.origin);let n=hr.dot(this.direction),i=hr.dot(hr)-n*n,s=t.radius*t.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,hr)!==null}intersectTriangle(t,e,n,i,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,_=e.y-a.y,m=e.z-a.z,p=n.x-a.x,b=n.y-a.y,R=n.z-a.z,x=Math.abs(l),M=Math.abs(c),T=Math.abs(h),E,y,w,L,H,k,Q,z,Y,et,W,X;if(x>=M&&x>=T?(w=l,k=d,Y=g,X=p,l>=0?(E=c,y=h,L=u,H=f,Q=_,z=m,et=b,W=R):(E=h,y=c,L=f,H=u,Q=m,z=_,et=R,W=b)):M>=T?(w=c,k=u,Y=_,X=b,c>=0?(E=h,y=l,L=f,H=d,Q=m,z=g,et=R,W=p):(E=l,y=h,L=d,H=f,Q=g,z=m,et=p,W=R)):(w=h,k=f,Y=m,X=R,h>=0?(E=l,y=c,L=d,H=u,Q=g,z=_,et=p,W=b):(E=c,y=l,L=u,H=d,Q=_,z=g,et=b,W=p)),w===0)return null;let nt=E/w,P=y/w,at=1/w,At=L-nt*k,Et=H-P*k,Bt=Q-nt*Y,Ut=z-P*Y,qt=et-nt*X,B=W-P*X,F=qt*Ut-B*Bt,U=At*B-Et*qt,N=Bt*Et-Ut*At;if(i){if(F<0||U<0||N<0)return null}else if((F<0||U<0||N<0)&&(F>0||U>0||N>0))return null;let G=F+U+N;if(G===0)return null;let it=at*(F*k+U*Y+N*X);return(G>0?it<0:it>0)?null:this.at(it/G,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Di=class extends Zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ap=new Se,rs=new fo,Hl=new dr,Ep=new K,Wl=new K,Xl=new K,ql=new K,Hu=new K,Yl=new K,Cp=new K,Zl=new K,Le=class extends hn{constructor(t=new mn,e=new Di){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(s&&o){Yl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(Hu.fromBufferAttribute(d,t),a?Yl.addScaledVector(Hu,h):Yl.addScaledVector(Hu.sub(e),h))}e.add(Yl)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(s),rs.copy(t.ray).recast(t.near),!(Hl.containsPoint(rs.origin)===!1&&(rs.intersectSphere(Hl,Ep)===null||rs.origin.distanceToSquared(Ep)>(t.far-t.near)**2))&&(Ap.copy(s).invert(),rs.copy(t.ray).applyMatrix4(Ap),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,rs)))}_computeIntersections(t,e,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),R=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=b,M=R;x<M;x+=3){let T=o.getX(x),E=o.getX(x+1),y=o.getX(x+2);i=Jl(this,p,t,n,c,h,d,T,E,y),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let b=o.getX(m),R=o.getX(m+1),x=o.getX(m+2);i=Jl(this,a,t,n,c,h,d,b,R,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),R=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=b,M=R;x<M;x+=3){let T=x,E=x+1,y=x+2;i=Jl(this,p,t,n,c,h,d,T,E,y),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let b=m,R=m+1,x=m+2;i=Jl(this,a,t,n,c,h,d,b,R,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function L0(r,t,e,n,i,s,a,o){let l;if(t.side===gn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===kr,o),l===null)return null;Zl.copy(o),Zl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Zl);return c<e.near||c>e.far?null:{distance:c,point:Zl.clone(),object:r}}function Jl(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,Wl),r.getVertexPosition(l,Xl),r.getVertexPosition(c,ql);let h=L0(r,t,e,n,Wl,Xl,ql,Cp);if(h){let d=new K;Dr.getBarycoord(Cp,Wl,Xl,ql,d),i&&(h.uv=Dr.getInterpolatedAttribute(i,o,l,c,d,new xt)),s&&(h.uv1=Dr.getInterpolatedAttribute(s,o,l,c,d,new xt)),a&&(h.normal=Dr.getInterpolatedAttribute(a,o,l,c,d,new K),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new K,materialIndex:0};Dr.getNormal(Wl,Xl,ql,u.normal),h.face=u,h.barycoord=d}return h}var po=class extends Fn{constructor(t=null,e=1,n=1,i,s,a,o,l,c=cn,h=cn,d,u){super(null,a,o,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mo=class extends ni{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Zs=new Se,Rp=new Se,$l=[],Pp=new yi,D0=new Se,Qa=new Le,ja=new dr,go=class extends Le{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new mo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,D0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new yi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zs),Pp.copy(t.boundingBox).applyMatrix4(Zs),this.boundingBox.union(Pp)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new dr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zs),ja.copy(t.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(ja)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Qa.geometry=this.geometry,Qa.material=this.material,Qa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ja.copy(this.boundingSphere),ja.applyMatrix4(n),t.ray.intersectsSphere(ja)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Zs),Rp.multiplyMatrices(n,Zs),Qa.matrixWorld=Rp,Qa.raycast(t,$l);for(let a=0,o=$l.length;a<o;a++){let l=$l[a];l.instanceId=s,l.object=this,e.push(l)}$l.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new mo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new po(new Float32Array(i*this.count),i,this.count,Yc,vi));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ss=new dr,N0=new xt(.5,.5),Kl=new K,aa=class{constructor(t=new Ii,e=new Ii,n=new Ii,i=new Ii,s=new Ii,a=new Ii){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Li,n=!1){let i=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],g=s[8],_=s[9],m=s[10],p=s[11],b=s[12],R=s[13],x=s[14],M=s[15];if(i[0].setComponents(c-a,f-h,p-g,M-b).normalize(),i[1].setComponents(c+a,f+h,p+g,M+b).normalize(),i[2].setComponents(c+o,f+d,p+_,M+R).normalize(),i[3].setComponents(c-o,f-d,p-_,M-R).normalize(),n)i[4].setComponents(l,u,m,x).normalize(),i[5].setComponents(c-l,f-u,p-m,M-x).normalize();else if(i[4].setComponents(c-l,f-u,p-m,M-x).normalize(),e===Li)i[5].setComponents(c+l,f+u,p+m,M+x).normalize();else if(e===na)i[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(t){ss.center.set(0,0,0);let e=N0.distanceTo(t.center);return ss.radius=.7071067811865476+e,ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Kl.x=i.normal.x>0?t.max.x:t.min.x,Kl.y=i.normal.y>0?t.max.y:t.min.y,Kl.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Kl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var oa=class extends Zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},xc=new K,yc=new K,Ip=new Se,to=new fo,Ql=new dr,Wu=new K,Lp=new K,_o=class extends hn{constructor(t=new mn,e=new oa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)xc.fromBufferAttribute(e,i-1),yc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=xc.distanceTo(yc);t.setAttribute("lineDistance",new ze(n,1))}else jt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ql.copy(n.boundingSphere),Ql.applyMatrix4(i),Ql.radius+=s,t.ray.intersectsSphere(Ql)===!1)return;Ip.copy(i).invert(),to.copy(t.ray).applyMatrix4(Ip);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),b=h.getX(_+1),R=jl(this,t,to,l,p,b,_);R&&e.push(R)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=jl(this,t,to,l,_,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=jl(this,t,to,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=jl(this,t,to,l,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function jl(r,t,e,n,i,s,a){let o=r.geometry.attributes.position;if(xc.fromBufferAttribute(o,i),yc.fromBufferAttribute(o,s),e.distanceSqToSegment(xc,yc,Wu,Lp)>n)return;Wu.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Wu);if(!(c<t.near||c>t.far))return{distance:c,point:Lp.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var xo=class extends Fn{constructor(t=[],e=zr,n,i,s,a,o,l,c,h){super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},yo=class extends Fn{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Nr=class extends Fn{constructor(t,e,n=Fi,i,s,a,o=cn,l=cn,c,h=Wi,d=1){if(h!==Wi&&h!==Gr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ra(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},vc=class extends Nr{constructor(t,e=Fi,n=zr,i,s,a=cn,o=cn,l,c=Wi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},vo=class extends Fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ur=class r extends mn{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(d,2));function g(_,m,p,b,R,x,M,T,E,y,w){let L=x/E,H=M/y,k=x/2,Q=M/2,z=T/2,Y=E+1,et=y+1,W=0,X=0,nt=new K;for(let P=0;P<et;P++){let at=P*H-Q;for(let At=0;At<Y;At++){let Et=At*L-k;nt[_]=Et*b,nt[m]=at*R,nt[p]=z,c.push(nt.x,nt.y,nt.z),nt[_]=0,nt[m]=0,nt[p]=T>0?1:-1,h.push(nt.x,nt.y,nt.z),d.push(At/E),d.push(1-P/y),W+=1}}for(let P=0;P<y;P++)for(let at=0;at<E;at++){let At=u+at+Y*P,Et=u+at+Y*(P+1),Bt=u+(at+1)+Y*(P+1),Ut=u+(at+1)+Y*P;l.push(At,Et,Ut),l.push(Et,Bt,Ut),X+=6}o.addGroup(f,X,w),f+=X,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ii=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){jt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,s=n.length,a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=e||(a.isVector2?new xt:new K);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new K,i=[],s=[],a=[],o=new K,l=new Se;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new K)}s[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ce(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(ce(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},la=class extends ii{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new xt){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Sc=class extends la{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Lf(){let r=0,t=0,e=0,n=0;function i(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(s){let a=s*s,o=a*s;return r+t*s+e*a+n*o}}}var Dp=new K,Np=new K,Xu=new Lf,qu=new Lf,Yu=new Lf,ca=class extends ii{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new K){let n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(Np.subVectors(i[0],i[1]).add(i[0]),c=Np);let d=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Dp.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Dp),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Xu.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),qu.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),Yu.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Xu.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),qu.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Yu.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Xu.calc(l),qu.calc(l),Yu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new K().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Up(r,t,e,n,i){let s=(n-t)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*r+e}function U0(r,t){let e=1-r;return e*e*t}function F0(r,t){return 2*(1-r)*r*t}function O0(r,t){return r*r*t}function no(r,t,e,n){return U0(r,t)+F0(r,e)+O0(r,n)}function B0(r,t){let e=1-r;return e*e*e*t}function k0(r,t){let e=1-r;return 3*e*e*r*t}function z0(r,t){return 3*(1-r)*r*r*t}function V0(r,t){return r*r*r*t}function io(r,t,e,n,i){return B0(r,t)+k0(r,e)+z0(r,n)+V0(r,i)}var So=class extends ii{constructor(t=new xt,e=new xt,n=new xt,i=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new xt){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(io(t,i.x,s.x,a.x,o.x),io(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Mc=class extends ii{constructor(t=new K,e=new K,n=new K,i=new K){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new K){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(io(t,i.x,s.x,a.x,o.x),io(t,i.y,s.y,a.y,o.y),io(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Mo=class extends ii{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bc=class extends ii{constructor(t=new K,e=new K){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new K){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new K){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bo=class extends ii{constructor(t=new xt,e=new xt,n=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new xt){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(no(t,i.x,s.x,a.x),no(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Tc=class extends ii{constructor(t=new K,e=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new K){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(no(t,i.x,s.x,a.x),no(t,i.y,s.y,a.y),no(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},To=class extends ii{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){let n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Up(o,l.x,c.x,h.x,d.x),Up(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new xt().fromArray(i))}return this}},tf=Object.freeze({__proto__:null,ArcCurve:Sc,CatmullRomCurve3:ca,CubicBezierCurve:So,CubicBezierCurve3:Mc,EllipseCurve:la,LineCurve:Mo,LineCurve3:bc,QuadraticBezierCurve:bo,QuadraticBezierCurve3:Tc,SplineCurve:To}),wc=class extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tf[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new tf[i.type]().fromJSON(i))}return this}},Ji=class extends wc{constructor(t){super(),this.type="Path",this.currentPoint=new xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Mo(this.currentPoint.clone(),new xt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new bo(this.currentPoint.clone(),new xt(t,e),new xt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,a){let o=new So(this.currentPoint.clone(),new xt(t,e),new xt(n,i),new xt(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new To(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,s,a),this}absarc(t,e,n,i,s,a){return this.absellipse(t,e,n,n,i,s,a),this}ellipse(t,e,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,a,o,l),this}absellipse(t,e,n,i,s,a,o,l){let c=new la(t,e,n,i,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},wo=class extends Ji{constructor(t){super(t),this.uuid=ya(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Ji().fromJSON(i))}return this}};function G0(r,t,e=2){let n=t&&t.length,i=n?t[0]*e:r.length,s=Lm(r,0,i,e,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Y0(r,t,s,e)),r.length>80*e){o=r[0],l=r[1];let h=o,d=l;for(let u=e;u<i;u+=e){let f=r[u],g=r[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Ao(s,a,e,o,l,c,0),a}function Lm(r,t,e,n,i){let s;if(i===rx(r,t,e,n)>0)for(let a=t;a<e;a+=n)s=Fp(a/n|0,r[a],r[a+1],s);else for(let a=e-n;a>=t;a-=n)s=Fp(a/n|0,r[a],r[a+1],s);return s&&ha(s,s.next)&&(Co(s),s=s.next),s}function ls(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(ha(e,e.next)||Ue(e.prev,e,e.next)===0)){if(Co(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ao(r,t,e,n,i,s,a){if(!r)return;!a&&s&&Q0(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?W0(r,n,i,s):H0(r)){t.push(l.i,r.i,c.i),Co(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=X0(ls(r),t),Ao(r,t,e,n,i,s,2)):a===2&&q0(r,t,e,n,i,s):Ao(ls(r),t,e,n,i,s,1);break}}}function H0(r){let t=r.prev,e=r,n=r.next;if(Ue(t,e,n)>=0)return!1;let i=t.x,s=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,s,a),d=Math.min(o,l,c),u=Math.max(i,s,a),f=Math.max(o,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&eo(i,o,s,l,a,c,g.x,g.y)&&Ue(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function W0(r,t,e,n){let i=r.prev,s=r,a=r.next;if(Ue(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,d=s.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,d,u),_=Math.max(o,l,c),m=Math.max(h,d,u),p=ef(f,g,t,e,n),b=ef(_,m,t,e,n),R=r.prevZ,x=r.nextZ;for(;R&&R.z>=p&&x&&x.z<=b;){if(R.x>=f&&R.x<=_&&R.y>=g&&R.y<=m&&R!==i&&R!==a&&eo(o,h,l,d,c,u,R.x,R.y)&&Ue(R.prev,R,R.next)>=0||(R=R.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&eo(o,h,l,d,c,u,x.x,x.y)&&Ue(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;R&&R.z>=p;){if(R.x>=f&&R.x<=_&&R.y>=g&&R.y<=m&&R!==i&&R!==a&&eo(o,h,l,d,c,u,R.x,R.y)&&Ue(R.prev,R,R.next)>=0)return!1;R=R.prevZ}for(;x&&x.z<=b;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&eo(o,h,l,d,c,u,x.x,x.y)&&Ue(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function X0(r,t){let e=r;do{let n=e.prev,i=e.next.next;!ha(n,i)&&Nm(n,e,e.next,i)&&Eo(n,i)&&Eo(i,n)&&(t.push(n.i,e.i,i.i),Co(e),Co(e.next),e=r=i),e=e.next}while(e!==r);return ls(e)}function q0(r,t,e,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ex(a,o)){let l=Um(a,o);a=ls(a,a.next),l=ls(l,l.next),Ao(a,t,e,n,i,s,0),Ao(l,t,e,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function Y0(r,t,e,n){let i=[];for(let s=0,a=t.length;s<a;s++){let o=t[s]*n,l=s<a-1?t[s+1]*n:r.length,c=Lm(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(tx(c))}i.sort(Z0);for(let s=0;s<i.length;s++)e=J0(i[s],e);return e}function Z0(r,t){let e=r.x-t.x;if(e===0&&(e=r.y-t.y,e===0)){let n=(r.next.y-r.y)/(r.next.x-r.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function J0(r,t){let e=$0(r,t);if(!e)return t;let n=Um(e,r);return ls(n,n.next),ls(e,e.next)}function $0(r,t){let e=t,n=r.x,i=r.y,s=-1/0,a;if(ha(r,e))return e;do{if(ha(r,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>s&&(s=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Dm(i<c?n:s,i,l,c,i<c?s:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);Eo(e,r)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&K0(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function K0(r,t){return Ue(r.prev,r,t.prev)<0&&Ue(t.next,r,r.next)<0}function Q0(r,t,e,n){let i=r;do i.z===0&&(i.z=ef(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,j0(i)}function j0(r){let t,e=1;do{let n=r,i;r=null;let s=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,e*=2}while(t>1);return r}function ef(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function tx(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Dm(r,t,e,n,i,s,a,o){return(i-a)*(t-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(i-a)*(n-o)}function eo(r,t,e,n,i,s,a,o){return!(r===a&&t===o)&&Dm(r,t,e,n,i,s,a,o)}function ex(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!nx(r,t)&&(Eo(r,t)&&Eo(t,r)&&ix(r,t)&&(Ue(r.prev,r,t.prev)||Ue(r,t.prev,t))||ha(r,t)&&Ue(r.prev,r,r.next)>0&&Ue(t.prev,t,t.next)>0)}function Ue(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function ha(r,t){return r.x===t.x&&r.y===t.y}function Nm(r,t,e,n){let i=ec(Ue(r,t,e)),s=ec(Ue(r,t,n)),a=ec(Ue(e,n,r)),o=ec(Ue(e,n,t));return!!(i!==s&&a!==o||i===0&&tc(r,e,t)||s===0&&tc(r,n,t)||a===0&&tc(e,r,n)||o===0&&tc(e,t,n))}function tc(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function ec(r){return r>0?1:r<0?-1:0}function nx(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Nm(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Eo(r,t){return Ue(r.prev,r,r.next)<0?Ue(r,t,r.next)>=0&&Ue(r,r.prev,t)>=0:Ue(r,t,r.prev)<0||Ue(r,r.next,t)<0}function ix(r,t){let e=r,n=!1,i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Um(r,t){let e=nf(r.i,r.x,r.y),n=nf(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Fp(r,t,e,n){let i=nf(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Co(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function nf(r,t,e){return{i:r,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rx(r,t,e,n){let i=0;for(let s=t,a=e-n;s<e;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}var rf=class{static triangulate(t,e,n=2){return G0(t,e,n)}},Hi=class r{static area(t){let e=t.length,n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return r.area(t)<0}static triangulateShape(t,e){let n=[],i=[],s=[];Op(t),Bp(n,t);let a=t.length;e.forEach(Op);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Bp(n,e[l]);let o=rf.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Op(r){let t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Bp(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}var Ro=class r extends mn{constructor(t=new wo([new xt(.5,.5),new xt(-.5,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],s=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new ze(i,3)),this.setAttribute("uv",new ze(s,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:sx,R,x=!1,M,T,E,y;if(p){R=p.getSpacedPoints(h),x=!0,u=!1;let C=p.isCatmullRomCurve3?p.closed:!1;M=p.computeFrenetFrames(h,C),T=new K,E=new K,y=new K}u||(m=0,f=0,g=0,_=0);let w=o.extractPoints(c),L=w.shape,H=w.holes;if(!Hi.isClockWise(L)){L=L.reverse();for(let C=0,V=H.length;C<V;C++){let O=H[C];Hi.isClockWise(O)&&(H[C]=O.reverse())}}function Q(C){let O=10000000000000001e-36,I=C[0];for(let j=1;j<=C.length;j++){let lt=j%C.length,mt=C[lt],ft=mt.x-I.x,J=mt.y-I.y,S=ft*ft+J*J,Ct=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(I.x),Math.abs(I.y)),Tt=O*Ct*Ct;if(S<=Tt){C.splice(lt,1),j--;continue}I=mt}}Q(L),H.forEach(Q);let z=H.length,Y=L;for(let C=0;C<z;C++){let V=H[C];L=L.concat(V)}function et(C,V,O){return V||te("ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(V,O)}let W=L.length;function X(C,V,O){let I,j,lt,mt=C.x-V.x,ft=C.y-V.y,J=O.x-C.x,S=O.y-C.y,Ct=mt*mt+ft*ft,Tt=mt*S-ft*J;if(Math.abs(Tt)>Number.EPSILON){let D=Math.sqrt(Ct),v=Math.sqrt(J*J+S*S),q=V.x-ft/D,tt=V.y+mt/D,ct=O.x-S/v,Mt=O.y+J/v,yt=((ct-q)*S-(Mt-tt)*J)/(mt*S-ft*J);I=q+mt*yt-C.x,j=tt+ft*yt-C.y;let ut=I*I+j*j;if(ut<=2)return new xt(I,j);lt=Math.sqrt(ut/2)}else{let D=!1;mt>Number.EPSILON?J>Number.EPSILON&&(D=!0):mt<-Number.EPSILON?J<-Number.EPSILON&&(D=!0):Math.sign(ft)===Math.sign(S)&&(D=!0),D?(I=-ft,j=mt,lt=Math.sqrt(Ct)):(I=mt,j=ft,lt=Math.sqrt(Ct/2))}return new xt(I/lt,j/lt)}let nt=[];for(let C=0,V=Y.length,O=V-1,I=C+1;C<V;C++,O++,I++)O===V&&(O=0),I===V&&(I=0),nt[C]=X(Y[C],Y[O],Y[I]);let P=[],at,At=nt.concat();for(let C=0,V=z;C<V;C++){let O=H[C];at=[];for(let I=0,j=O.length,lt=j-1,mt=I+1;I<j;I++,lt++,mt++)lt===j&&(lt=0),mt===j&&(mt=0),at[I]=X(O[I],O[lt],O[mt]);P.push(at),At=At.concat(at)}let Et;if(m===0)Et=Hi.triangulateShape(Y,H);else{let C=[],V=[];for(let O=0;O<m;O++){let I=O/m,j=f*Math.cos(I*Math.PI/2),lt=g*Math.sin(I*Math.PI/2)+_;for(let mt=0,ft=Y.length;mt<ft;mt++){let J=et(Y[mt],nt[mt],lt);U(J.x,J.y,-j),I===0&&C.push(J)}for(let mt=0,ft=z;mt<ft;mt++){let J=H[mt];at=P[mt];let S=[];for(let Ct=0,Tt=J.length;Ct<Tt;Ct++){let D=et(J[Ct],at[Ct],lt);U(D.x,D.y,-j),I===0&&S.push(D)}I===0&&V.push(S)}}Et=Hi.triangulateShape(C,V)}let Bt=Et.length,Ut=g+_;for(let C=0;C<W;C++){let V=u?et(L[C],At[C],Ut):L[C];x?(E.copy(M.normals[0]).multiplyScalar(V.x),T.copy(M.binormals[0]).multiplyScalar(V.y),y.copy(R[0]).add(E).add(T),U(y.x,y.y,y.z)):U(V.x,V.y,0)}for(let C=1;C<=h;C++)for(let V=0;V<W;V++){let O=u?et(L[V],At[V],Ut):L[V];x?(E.copy(M.normals[C]).multiplyScalar(O.x),T.copy(M.binormals[C]).multiplyScalar(O.y),y.copy(R[C]).add(E).add(T),U(y.x,y.y,y.z)):U(O.x,O.y,d/h*C)}for(let C=m-1;C>=0;C--){let V=C/m,O=f*Math.cos(V*Math.PI/2),I=g*Math.sin(V*Math.PI/2)+_;for(let j=0,lt=Y.length;j<lt;j++){let mt=et(Y[j],nt[j],I);U(mt.x,mt.y,d+O)}for(let j=0,lt=H.length;j<lt;j++){let mt=H[j];at=P[j];for(let ft=0,J=mt.length;ft<J;ft++){let S=et(mt[ft],at[ft],I);x?U(S.x,S.y+R[h-1].y,R[h-1].x+O):U(S.x,S.y,d+O)}}}qt(),B();function qt(){let C=i.length/3;if(u){let V=0,O=W*V;for(let I=0;I<Bt;I++){let j=Et[I];N(j[2]+O,j[1]+O,j[0]+O)}V=h+m*2,O=W*V;for(let I=0;I<Bt;I++){let j=Et[I];N(j[0]+O,j[1]+O,j[2]+O)}}else{for(let V=0;V<Bt;V++){let O=Et[V];N(O[2],O[1],O[0])}for(let V=0;V<Bt;V++){let O=Et[V];N(O[0]+W*h,O[1]+W*h,O[2]+W*h)}}n.addGroup(C,i.length/3-C,0)}function B(){let C=i.length/3,V=0;F(Y,V),V+=Y.length;for(let O=0,I=H.length;O<I;O++){let j=H[O];F(j,V),V+=j.length}n.addGroup(C,i.length/3-C,1)}function F(C,V){let O=C.length;for(;--O>=0;){let I=O,j=O-1;j<0&&(j=C.length-1);for(let lt=0,mt=h+m*2;lt<mt;lt++){let ft=W*lt,J=W*(lt+1),S=V+I+ft,Ct=V+j+ft,Tt=V+j+J,D=V+I+J;G(S,Ct,Tt,D)}}}function U(C,V,O){l.push(C),l.push(V),l.push(O)}function N(C,V,O){it(C),it(V),it(O);let I=i.length/3,j=b.generateTopUV(n,i,I-3,I-2,I-1);ht(j[0]),ht(j[1]),ht(j[2])}function G(C,V,O,I){it(C),it(V),it(I),it(V),it(O),it(I);let j=i.length/3,lt=b.generateSideWallUV(n,i,j-6,j-3,j-2,j-1);ht(lt[0]),ht(lt[1]),ht(lt[3]),ht(lt[1]),ht(lt[2]),ht(lt[3])}function it(C){i.push(l[C*3+0]),i.push(l[C*3+1]),i.push(l[C*3+2])}function ht(C){s.push(C.x),s.push(C.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ax(e,n,t)}static fromJSON(t,e){let n=[];for(let s=0,a=t.shapes.length;s<a;s++){let o=e[t.shapes[s]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new tf[i.type]().fromJSON(i)),new r(n,t.options)}},sx={generateTopUV:function(r,t,e,n,i){let s=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new xt(s,a),new xt(o,l),new xt(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],g=t[i*3+2],_=t[s*3],m=t[s*3+1],p=t[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new xt(a,1-l),new xt(c,1-d),new xt(u,1-g),new xt(_,1-p)]:[new xt(o,1-l),new xt(h,1-d),new xt(f,1-g),new xt(m,1-p)]}};function ax(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Po=class r extends mn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let b=p*u-a;for(let R=0;R<c;R++){let x=R*d-s;g.push(x,-b,0),_.push(0,0,1),m.push(R/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){let R=b+c*p,x=b+c*(p+1),M=b+1+c*(p+1),T=b+1+c*p;f.push(R,x,T),f.push(x,M,T)}this.setIndex(f),this.setAttribute("position",new ze(g,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}};var Io=class r extends mn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new K,u=new K,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let b=[],R=p/n,x=a+R*o,M=t*Math.cos(x),T=Math.sqrt(t*t-M*M),E=0;p===0&&a===0?E=.5/e:p===n&&l===Math.PI&&(E=-.5/e);for(let y=0;y<=e;y++){let w=y/e,L=i+w*s;d.x=-T*Math.cos(L),d.y=M,d.z=T*Math.sin(L),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(w+E,1-R),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){let R=h[p][b+1],x=h[p][b],M=h[p+1][b],T=h[p+1][b+1];(p!==0||a>0)&&f.push(R,x,T),(p!==n-1||l<Math.PI)&&f.push(x,M,T)}this.setIndex(f),this.setAttribute("position",new ze(g,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function ds(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];if(kp(i))i.isRenderTargetTexture?(jt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(kp(i[0])){let s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Tn(r){let t={};for(let e=0;e<r.length;e++){let n=ds(r[e]);for(let i in n)t[i]=n[i]}return t}function kp(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function ox(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Df(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}var Fm={clone:ds,merge:Tn},lx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ri=class extends Zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lx,this.fragmentShader=cx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ds(t.uniforms),this.uniformsGroups=ox(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ee().setHex(i.value);break;case"v2":this.uniforms[n].value=new xt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new K().fromArray(i.value);break;case"v4":this.uniforms[n].value=new De().fromArray(i.value);break;case"m3":this.uniforms[n].value=new $t().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Se().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ac=class extends ri{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},cs=class extends Zi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Lo=class extends cs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ce(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Do=class extends Zi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=zc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ec=class extends Zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_m,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Cc=class extends Zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Js(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Zu(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}var Fr=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Rc=class extends Fr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ku,endingEnd:Ku}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,a=t+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Qu:s=t,o=2*e-n;break;case ju:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Qu:a=t,l=2*n-e;break;case ju:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,b=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,R=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let M=0;M!==o;++M)s[M]=p*a[h+M]+b*a[c+M]+R*a[l+M]+x*a[d+M];return s}},Pc=class extends Fr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},Ic=class extends Fr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Lc=class extends Fr{interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(i-e),_=1-g;for(let m=0;m!==o;++m)s[m]=a[c+m]*_+a[l+m]*g;return s}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let _=a[c+g],m=a[l+g],p=f*u+g*2,b=d[p],R=d[p+1],x=t*u+g*2,M=h[x],T=h[x+1],E=ux(n,e,b,M,i);s[g]=Om(E,_,R,T,m)}return s}};function Om(r,t,e,n,i){let s=1-r;return s*s*s*t+3*s*s*r*e+3*s*r*r*n+r*r*r*i}function hx(r,t,e,n,i){let s=1-r;return 3*s*s*(e-t)+6*s*r*(n-e)+3*r*r*(i-n)}function ux(r,t,e,n,i){let s=(r-t)/(i-t);for(let a=0;a<8;a++){let o=Om(s,t,e,n,i)-r;if(Math.abs(o)<1e-10)break;let l=hx(s,t,e,n,i);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var si=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Js(e,this.TimeBufferType),this.values=Js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Js(t.times,Array),values:Js(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Zu(t.settings)&&(n.settings={inTangents:Js(t.settings.inTangents,Array),outTangents:Js(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ic(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Pc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Rc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Lc(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ro:e=this.InterpolantFactoryMethodDiscrete;break;case dc:e=this.InterpolantFactoryMethodLinear;break;case rc:e=this.InterpolantFactoryMethodSmooth;break;case $u:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return jt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ro;case this.InterpolantFactoryMethodLinear:return dc;case this.InterpolantFactoryMethodSmooth:return rc;case this.InterpolantFactoryMethodBezier:return $u}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Zu(this.settings)&&(zp(this.settings.inTangents,t),zp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(te("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(te("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){te("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){te("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&p0(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){te("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===rc,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Zu(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function zp(r,t){for(let e=0,n=r.length;e!==n;e+=2)r[e]*=t}si.prototype.ValueTypeName="";si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=dc;var Or=class extends si{constructor(t,e,n){super(t,e,n)}};Or.prototype.ValueTypeName="bool";Or.prototype.ValueBufferType=Array;Or.prototype.DefaultInterpolation=ro;Or.prototype.InterpolantFactoryMethodLinear=void 0;Or.prototype.InterpolantFactoryMethodSmooth=void 0;var Dc=class extends si{constructor(t,e,n,i){super(t,e,n,i)}};Dc.prototype.ValueTypeName="color";var Nc=class extends si{constructor(t,e,n,i){super(t,e,n,i)}};Nc.prototype.ValueTypeName="number";var Uc=class extends Fr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)qi.slerpFlat(s,0,a,c-o,a,c,l);return s}},No=class extends si{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Uc(this.times,this.values,this.getValueSize(),t)}};No.prototype.ValueTypeName="quaternion";No.prototype.InterpolantFactoryMethodSmooth=void 0;var Br=class extends si{constructor(t,e,n){super(t,e,n)}};Br.prototype.ValueTypeName="string";Br.prototype.ValueBufferType=Array;Br.prototype.DefaultInterpolation=ro;Br.prototype.InterpolantFactoryMethodLinear=void 0;Br.prototype.InterpolantFactoryMethodSmooth=void 0;var Fc=class extends si{constructor(t,e,n,i){super(t,e,n,i)}};Fc.prototype.ValueTypeName="vector";var sf={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(Vp(r)||(this.files[r]=t))},get:function(r){if(this.enabled!==!1&&!Vp(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Vp(r){try{let t=r.slice(r.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Oc=class{constructor(t,e,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Bm=new Oc,hs=class{constructor(t){this.manager=t!==void 0?t:Bm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};hs.DEFAULT_MATERIAL_NAME="__DEFAULT";var ur={},af=class extends Error{constructor(t,e){super(t),this.response=e}},Uo=class extends hs{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let s=sf.get(`file:${t}`);if(s!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0);return}if(ur[t]!==void 0){ur[t].push({onLoad:e,onProgress:n,onError:i});return}ur[t]=[],ur[t].push({onLoad:e,onProgress:n,onError:i});let a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&jt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ur[t],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0,_=0,m=new ReadableStream({start(p){b();function b(){d.read().then(({done:R,value:x})=>{if(R)p.close();else{_+=x.byteLength;let M=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,E=h.length;T<E;T++){let y=h[T];y.onProgress&&y.onProgress(M)}p.enqueue(x),b()}},R=>{p.error(R)})}}});return new Response(m)}else throw new af(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{sf.add(`file:${t}`,c);let h=ur[t];delete ur[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ur[t];if(h===void 0)throw this.manager.itemError(t),c;delete ur[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ua=class extends hn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var Ju=new Se,Gp=new K,Hp=new K,Fo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.mapType=Yn,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new aa,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Gp.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gp),Hp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Ju.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ju,t.coordinateSystem,t.reversedDepth);let s=this._frameExtents,a=i?i.z/s.x:1,o=i?i.w/s.y:1,l=i?i.x/s.x:0,c=i?i.y/s.y:0;t.coordinateSystem===na||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Ju)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},nc=new K,ic=new qi,Gi=new K,Oo=class extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=Li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(nc,ic,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nc,ic,Gi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(nc,ic,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nc,ic,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Lr=new K,Wp=new xt,Xp=new xt,dn=class extends Oo{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=pc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(bu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return pc*2*Math.atan(Math.tan(bu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Lr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Lr.x,Lr.y).multiplyScalar(-t/Lr.z),Lr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Lr.x,Lr.y).multiplyScalar(-t/Lr.z)}getViewSize(t,e){return this.getViewBounds(t,Wp,Xp),e.subVectors(Xp,Wp)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(bu*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var of=class extends Fo{constructor(){super(new dn(90,1,.5,500)),this.isPointLightShadow=!0}},Bo=class extends ua{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new of}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},fa=class extends Oo{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},lf=class extends Fo{constructor(){super(new fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},da=class extends ua{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new lf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},ko=class extends ua{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var $s=-90,Ks=1,Bc=class extends hn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new dn($s,Ks,t,e);i.layers=this.layers,this.add(i);let s=new dn($s,Ks,t,e);s.layers=this.layers,this.add(s);let a=new dn($s,Ks,t,e);a.layers=this.layers,this.add(a);let o=new dn($s,Ks,t,e);o.layers=this.layers,this.add(o);let l=new dn($s,Ks,t,e);l.layers=this.layers,this.add(l);let c=new dn($s,Ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===Li)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===na)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},kc=class extends dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Nf="\\[\\]\\.:\\/",fx=new RegExp("["+Nf+"]","g"),Uf="[^"+Nf+"]",dx="[^"+Nf.replace("\\.","")+"]",px=/((?:WC+[\/:])*)/.source.replace("WC",Uf),mx=/(WCOD+)?/.source.replace("WCOD",dx),gx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uf),_x=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uf),xx=new RegExp("^"+px+mx+gx+_x+"$"),yx=["material","materials","bones","map"],cf=class{constructor(t,e,n){let i=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(fx,"")}static parseTrackName(t){let e=xx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);yx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){jt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){te("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){te("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){te("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){te("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){te("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){te("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){te("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;te("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){te("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){te("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=cf;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gT=new Float32Array(1);var hf=class r{static{r.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}},qp=new xt,pa=class{constructor(t=new xt(1/0,1/0),e=new xt(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=qp.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qp).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}};var Ni=class{constructor(){this.type="ShapePath",this.color=new ee,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(t,e){return this.currentPath=new Ji,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,a){return this.currentPath.bezierCurveTo(t,e,n,i,s,a),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(){function t(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let g=c[u],_=c[f];g.y>l.y!=_.y>l.y&&l.x<(_.x-g.x)*(l.y-g.y)/(_.y-g.y)+g.x&&(h=!h)}return h}function e(l,c){let h=c.getCenter(new xt);if(t(h,l))return h;let d=h.y,u=[],f=l.length;for(let g=0;g<f;g++){let _=l[g],m=l[(g+1)%f];if(_.y>d!=m.y>d){let p=_.x+(d-_.y)*(m.x-_.x)/(m.y-_.y);u.push(p)}}return u.length>1&&(u.sort((g,_)=>g-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(jt('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),s=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Hi.area(c);if(h===0)continue;let d=new pa;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);s.push({subPath:l,points:c,boundingBox:d,interiorPoint:e(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}s.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<s.length;l++){let c=s[l],h=0;for(let d=l-1;d>=0;d--){let u=s[d];if(u.boundingBox.containsBox(c.boundingBox)&&t(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of s)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let a=[],o=new Map;for(let l of s){if(l.exclude||l.role!=="outer")continue;let c=new wo;c.curves=l.subPath.curves,a.push(c),o.set(l,c)}for(let l of s){if(l.exclude||l.role!=="hole")continue;let c=o.get(l.container);if(!c)continue;let h=new Ji;h.curves=l.subPath.curves,c.holes.push(h)}return a}};function Ff(r,t,e,n){let i=vx(n);switch(e){case Cf:return r*t;case Yc:return r*t/i.components*i.byteLength;case Zc:return r*t/i.components*i.byteLength;case Hr:return r*t*2/i.components*i.byteLength;case Jc:return r*t*2/i.components*i.byteLength;case Rf:return r*t*3/i.components*i.byteLength;case Si:return r*t*4/i.components*i.byteLength;case $c:return r*t*4/i.components*i.byteLength;case Wo:case Xo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case qo:case Yo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Qc:case th:return Math.max(r,16)*Math.max(t,8)/4;case Kc:case jc:return Math.max(r,8)*Math.max(t,8)/2;case eh:case nh:case rh:case sh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ih:case Zo:case ah:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case oh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case lh:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ch:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case hh:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case uh:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case fh:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case dh:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ph:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case mh:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case gh:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case _h:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case xh:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case yh:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case vh:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Sh:case Mh:case bh:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Th:case wh:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Jo:case Ah:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vx(r){switch(r){case Yn:case Tf:return{byteLength:1,components:1};case _a:case wf:case Oi:return{byteLength:2,components:1};case Xc:case qc:return{byteLength:2,components:4};case Fi:case Wc:case vi:return{byteLength:4,components:1};case Af:case Ef:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?jt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ag(){let r=null,t=!1,e=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),e(s,a)}return{start:function(){t!==!0&&e!==null&&r!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Mx(r){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var bx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ax=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ex=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Px=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ix=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Lx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ux=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ox=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Hx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Jx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$x=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jx="gl_FragColor = linearToOutputTexel( gl_FragColor );",ty=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ey=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ny=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ry=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ay=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ly=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,py=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,my=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,gy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_y=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sy=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,My=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,by=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ty=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wy=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ay=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ey=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ry=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Py=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Iy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ly=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ny=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Oy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,By=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ky=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,qy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$y=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,jy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ev=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,av=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ov=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_v=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Iv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ov=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$v=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:bx,alphahash_pars_fragment:Tx,alphamap_fragment:wx,alphamap_pars_fragment:Ax,alphatest_fragment:Ex,alphatest_pars_fragment:Cx,aomap_fragment:Rx,aomap_pars_fragment:Px,batching_pars_vertex:Ix,batching_vertex:Lx,begin_vertex:Dx,beginnormal_vertex:Nx,bsdfs:Ux,iridescence_fragment:Fx,bumpmap_pars_fragment:Ox,clipping_planes_fragment:Bx,clipping_planes_pars_fragment:kx,clipping_planes_pars_vertex:zx,clipping_planes_vertex:Vx,color_fragment:Gx,color_pars_fragment:Hx,color_pars_vertex:Wx,color_vertex:Xx,common:qx,cube_uv_reflection_fragment:Yx,defaultnormal_vertex:Zx,displacementmap_pars_vertex:Jx,displacementmap_vertex:$x,emissivemap_fragment:Kx,emissivemap_pars_fragment:Qx,colorspace_fragment:jx,colorspace_pars_fragment:ty,envmap_fragment:ey,envmap_common_pars_fragment:ny,envmap_pars_fragment:iy,envmap_pars_vertex:ry,envmap_physical_pars_fragment:my,envmap_vertex:sy,fog_vertex:ay,fog_pars_vertex:oy,fog_fragment:ly,fog_pars_fragment:cy,gradientmap_pars_fragment:hy,lightmap_pars_fragment:uy,lights_lambert_fragment:fy,lights_lambert_pars_fragment:dy,lights_pars_begin:py,lights_toon_fragment:gy,lights_toon_pars_fragment:_y,lights_phong_fragment:xy,lights_phong_pars_fragment:yy,lights_physical_fragment:vy,lights_physical_pars_fragment:Sy,lights_fragment_begin:My,lights_fragment_maps:by,lights_fragment_end:Ty,lightprobes_pars_fragment:wy,logdepthbuf_fragment:Ay,logdepthbuf_pars_fragment:Ey,logdepthbuf_pars_vertex:Cy,logdepthbuf_vertex:Ry,map_fragment:Py,map_pars_fragment:Iy,map_particle_fragment:Ly,map_particle_pars_fragment:Dy,metalnessmap_fragment:Ny,metalnessmap_pars_fragment:Uy,morphinstance_vertex:Fy,morphcolor_vertex:Oy,morphnormal_vertex:By,morphtarget_pars_vertex:ky,morphtarget_vertex:zy,normal_fragment_begin:Vy,normal_fragment_maps:Gy,normal_pars_fragment:Hy,normal_pars_vertex:Wy,normal_vertex:Xy,normalmap_pars_fragment:qy,clearcoat_normal_fragment_begin:Yy,clearcoat_normal_fragment_maps:Zy,clearcoat_pars_fragment:Jy,iridescence_pars_fragment:$y,opaque_fragment:Ky,packing:Qy,premultiplied_alpha_fragment:jy,project_vertex:tv,dithering_fragment:ev,dithering_pars_fragment:nv,roughnessmap_fragment:iv,roughnessmap_pars_fragment:rv,shadowmap_pars_fragment:sv,shadowmap_pars_vertex:av,shadowmap_vertex:ov,shadowmask_pars_fragment:lv,skinbase_vertex:cv,skinning_pars_vertex:hv,skinning_vertex:uv,skinnormal_vertex:fv,specularmap_fragment:dv,specularmap_pars_fragment:pv,tonemapping_fragment:mv,tonemapping_pars_fragment:gv,transmission_fragment:_v,transmission_pars_fragment:xv,uv_pars_fragment:yv,uv_pars_vertex:vv,uv_vertex:Sv,worldpos_vertex:Mv,background_vert:bv,background_frag:Tv,backgroundCube_vert:wv,backgroundCube_frag:Av,cube_vert:Ev,cube_frag:Cv,depth_vert:Rv,depth_frag:Pv,distance_vert:Iv,distance_frag:Lv,equirect_vert:Dv,equirect_frag:Nv,linedashed_vert:Uv,linedashed_frag:Fv,meshbasic_vert:Ov,meshbasic_frag:Bv,meshlambert_vert:kv,meshlambert_frag:zv,meshmatcap_vert:Vv,meshmatcap_frag:Gv,meshnormal_vert:Hv,meshnormal_frag:Wv,meshphong_vert:Xv,meshphong_frag:qv,meshphysical_vert:Yv,meshphysical_frag:Zv,meshtoon_vert:Jv,meshtoon_frag:$v,points_vert:Kv,points_frag:Qv,shadow_vert:jv,shadow_frag:tS,sprite_vert:eS,sprite_frag:nS},Ft={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Qi={basic:{uniforms:Tn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:Tn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:Tn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:Tn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:Tn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:Tn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:Tn([Ft.points,Ft.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:Tn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:Tn([Ft.common,Ft.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:Tn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:Tn([Ft.sprite,Ft.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:Tn([Ft.common,Ft.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:Tn([Ft.lights,Ft.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};Qi.physical={uniforms:Tn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var Rh={r:0,b:0,g:0},iS=new Se,og=new $t;og.set(-1,0,0,0,1,0,0,0,1);function rS(r,t,e,n,i,s){let a=new ee(0),o=i===!0?0:1,l,c,h=null,d=0,u=null;function f(b){let R=b.isScene===!0?b.background:null;if(R&&R.isTexture){let x=b.backgroundBlurriness>0;R=t.get(R,x)}return R}function g(b){let R=!1,x=f(b);x===null?m(a,o):x&&x.isColor&&(m(x,1),R=!0);let M=r.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(r.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(b,R){let x=f(R);x&&(x.isCubeTexture||x.mapping===Go)?(c===void 0&&(c=new Le(new Ur(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:ds(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(iS.makeRotationFromEuler(R.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(og),c.material.toneMapped=fe.getTransfer(x.colorSpace)!==_e,(h!==x||d!==x.version||u!==r.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Le(new Po(2,2),new ri({name:"BackgroundMaterial",uniforms:ds(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:kr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=fe.getTransfer(x.colorSpace)!==_e,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==r.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=r.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,R){b.getRGB(Rh,Df(r)),e.buffers.color.setClear(Rh.r,Rh.g,Rh.b,R,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,R=1){a.set(b),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:_,dispose:p}}function sS(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null),s=i,a=!1;function o(H,k,Q,z,Y){let et=!1,W=d(H,z,Q,k);s!==W&&(s=W,c(s.object)),et=f(H,z,Q,Y),et&&g(H,z,Q,Y),Y!==null&&t.update(Y,r.ELEMENT_ARRAY_BUFFER),(et||a)&&(a=!1,x(H,k,Q,z),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function l(){return r.createVertexArray()}function c(H){return r.bindVertexArray(H)}function h(H){return r.deleteVertexArray(H)}function d(H,k,Q,z){let Y=z.wireframe===!0,et=n[k.id];et===void 0&&(et={},n[k.id]=et);let W=H.isInstancedMesh===!0?H.id:0,X=et[W];X===void 0&&(X={},et[W]=X);let nt=X[Q.id];nt===void 0&&(nt={},X[Q.id]=nt);let P=nt[Y];return P===void 0&&(P=u(l()),nt[Y]=P),P}function u(H){let k=[],Q=[],z=[];for(let Y=0;Y<e;Y++)k[Y]=0,Q[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Q,attributeDivisors:z,object:H,attributes:{},index:null}}function f(H,k,Q,z){let Y=s.attributes,et=k.attributes,W=0,X=Q.getAttributes();for(let nt in X)if(X[nt].location>=0){let at=Y[nt],At=et[nt];if(At===void 0&&(nt==="instanceMatrix"&&H.instanceMatrix&&(At=H.instanceMatrix),nt==="instanceColor"&&H.instanceColor&&(At=H.instanceColor)),at===void 0||at.attribute!==At||At&&at.data!==At.data)return!0;W++}return s.attributesNum!==W||s.index!==z}function g(H,k,Q,z){let Y={},et=k.attributes,W=0,X=Q.getAttributes();for(let nt in X)if(X[nt].location>=0){let at=et[nt];at===void 0&&(nt==="instanceMatrix"&&H.instanceMatrix&&(at=H.instanceMatrix),nt==="instanceColor"&&H.instanceColor&&(at=H.instanceColor));let At={};At.attribute=at,at&&at.data&&(At.data=at.data),Y[nt]=At,W++}s.attributes=Y,s.attributesNum=W,s.index=z}function _(){let H=s.newAttributes;for(let k=0,Q=H.length;k<Q;k++)H[k]=0}function m(H){p(H,0)}function p(H,k){let Q=s.newAttributes,z=s.enabledAttributes,Y=s.attributeDivisors;Q[H]=1,z[H]===0&&(r.enableVertexAttribArray(H),z[H]=1),Y[H]!==k&&(r.vertexAttribDivisor(H,k),Y[H]=k)}function b(){let H=s.newAttributes,k=s.enabledAttributes;for(let Q=0,z=k.length;Q<z;Q++)k[Q]!==H[Q]&&(r.disableVertexAttribArray(Q),k[Q]=0)}function R(H,k,Q,z,Y,et,W){W===!0?r.vertexAttribIPointer(H,k,Q,Y,et):r.vertexAttribPointer(H,k,Q,z,Y,et)}function x(H,k,Q,z){_();let Y=z.attributes,et=Q.getAttributes(),W=k.defaultAttributeValues;for(let X in et){let nt=et[X];if(nt.location>=0){let P=Y[X];if(P===void 0&&(X==="instanceMatrix"&&H.instanceMatrix&&(P=H.instanceMatrix),X==="instanceColor"&&H.instanceColor&&(P=H.instanceColor)),P!==void 0){let at=P.normalized,At=P.itemSize,Et=t.get(P);if(Et===void 0)continue;let Bt=Et.buffer,Ut=Et.type,qt=Et.bytesPerElement,B=Ut===r.INT||Ut===r.UNSIGNED_INT||P.gpuType===Wc;if(P.isInterleavedBufferAttribute){let F=P.data,U=F.stride,N=P.offset;if(F.isInstancedInterleavedBuffer){for(let G=0;G<nt.locationSize;G++)p(nt.location+G,F.meshPerAttribute);H.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let G=0;G<nt.locationSize;G++)m(nt.location+G);r.bindBuffer(r.ARRAY_BUFFER,Bt);for(let G=0;G<nt.locationSize;G++)R(nt.location+G,At/nt.locationSize,Ut,at,U*qt,(N+At/nt.locationSize*G)*qt,B)}else{if(P.isInstancedBufferAttribute){for(let F=0;F<nt.locationSize;F++)p(nt.location+F,P.meshPerAttribute);H.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let F=0;F<nt.locationSize;F++)m(nt.location+F);r.bindBuffer(r.ARRAY_BUFFER,Bt);for(let F=0;F<nt.locationSize;F++)R(nt.location+F,At/nt.locationSize,Ut,at,At*qt,At/nt.locationSize*F*qt,B)}}else if(W!==void 0){let at=W[X];if(at!==void 0)switch(at.length){case 2:r.vertexAttrib2fv(nt.location,at);break;case 3:r.vertexAttrib3fv(nt.location,at);break;case 4:r.vertexAttrib4fv(nt.location,at);break;default:r.vertexAttrib1fv(nt.location,at)}}}}b()}function M(){w();for(let H in n){let k=n[H];for(let Q in k){let z=k[Q];for(let Y in z){let et=z[Y];for(let W in et)h(et[W].object),delete et[W];delete z[Y]}}delete n[H]}}function T(H){if(n[H.id]===void 0)return;let k=n[H.id];for(let Q in k){let z=k[Q];for(let Y in z){let et=z[Y];for(let W in et)h(et[W].object),delete et[W];delete z[Y]}}delete n[H.id]}function E(H){for(let k in n){let Q=n[k];for(let z in Q){let Y=Q[z];if(Y[H.id]===void 0)continue;let et=Y[H.id];for(let W in et)h(et[W].object),delete et[W];delete Y[H.id]}}}function y(H){for(let k in n){let Q=n[k],z=H.isInstancedMesh===!0?H.id:0,Y=Q[z];if(Y!==void 0){for(let et in Y){let W=Y[et];for(let X in W)h(W[X].object),delete W[X];delete Y[et]}delete Q[z],Object.keys(Q).length===0&&delete n[k]}}}function w(){L(),a=!0,s!==i&&(s=i,c(s.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function aS(r,t,e){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(r.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function oS(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==Si&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let y=E===Oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Yn&&E!==vi&&!y&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(jt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&jt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),R=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=r.getParameter(r.MAX_SAMPLES),T=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:R,maxFragmentUniforms:x,maxSamples:M,samples:T}}function lS(r){let t=this,e=null,n=0,i=!1,s=!1,a=new Ii,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{let b=s?0:n,R=b*4,x=p.clippingState||null;l.value=x,x=h(g,u,R,f);for(let M=0;M!==R;++M)x[M]=e[M];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let R=0,x=f;R!==_;++R,x+=4)a.copy(d[R]).applyMatrix4(b,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var Sa=4,cS=6,hS=20,uS=256,Ko=new fa,km=new ee,Of=null,Bf=0,kf=0,zf=!1,fS=new K,ps=new K,ba=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){let{size:a=256,position:o=fS}=s;Of=this._renderer.getRenderTarget(),Bf=this._renderer.getActiveCubeFace(),kf=this._renderer.getActiveMipmapLevel(),zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Of,Bf,kf),this._renderer.xr.enabled=zf,t.scissorTest=!1,va(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zr||t.mapping===fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Of=this._renderer.getRenderTarget(),Bf=this._renderer.getActiveCubeFace(),kf=this._renderer.getActiveMipmapLevel(),zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Oi,format:Si,colorSpace:so,depthBuffer:!1},i=zm(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zm(t,e,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=dS(s)),this._blurMaterial=mS(s,t,e),this._ggxMaterial=pS(s,t,e)}return i}_compileMaterial(t){let e=new Le(new mn,t);this._renderer.compile(e,Ko)}_sceneToCubeUV(t,e,n,i,s){let l=new dn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(km),d.toneMapping=Ui,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Le(new Ur,new Di({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,p=!0):(m.color.copy(km),p=!0);for(let R=0;R<6;R++){let x=R%3;x===0?(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[R],s.y,s.z)):x===1?(l.up.set(0,0,c[R]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[R],s.z)):(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[R]));let M=this._cubeSize;va(i,x*M,R>2?M:0,M,M),d.setRenderTarget(i),p&&d.render(_,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===zr||t.mapping===fs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vm());let s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;va(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ko)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Sa?n-g+Sa:0),p=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,va(s,m,p,3*_,2*_),i.setRenderTarget(s),i.render(o,Ko),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,va(t,m,p,3*_,2*_),i.setRenderTarget(t),i.render(o,Ko)}_blur(t,e,n,i){let s=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,i,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-Sa?i-this._lodMax+Sa:0),u=4*(this._cubeSize-h);va(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Ko)}};function dS(r){let t=[],e=[],n=r,i=r-Sa+1+cS;for(let s=0;s<i;s++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let p=0;p<d;p++){let b=p%3*2/3-1,R=p>2?0:-1,x=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];g.set(x,f*u*p);for(let M=0;M<u;M++){let T=h[M*2]*2-1,E=h[M*2+1]*2-1;p===0?ps.set(1,E,T):p===1?ps.set(-T,1,-E):p===2?ps.set(-T,E,1):p===3?ps.set(-1,E,-T):p===4?ps.set(-T,-1,E):ps.set(T,E,-1),ps.toArray(_,(p*u+M)*f)}}let m=new mn;m.setAttribute("position",new ni(g,f)),m.setAttribute("outputDirection",new ni(_,f)),e.push(new Le(m,null)),n>Sa&&n--}return{lodMeshes:e,sizeLods:t}}function zm(r,t,e){let n=new qn(r,t,e);return n.texture.mapping=Go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function va(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function pS(r,t,e){return new ri({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:uS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function mS(r,t,e){return new ri({name:"SphericalGaussianBlur",defines:{SAMPLES:hS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Dh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Vm(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Gm(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Dh(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ih=class extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new xo(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ur(5,5,5),s=new ri({name:"CubemapFromEquirect",uniforms:ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:$i});s.uniforms.tEquirect.value=e;let a=new Le(i,s),o=e.minFilter;return e.minFilter===Vr&&(e.minFilter=pn),new Bc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}};function gS(r){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===Vc||f===Gc)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new Ih(g.height);return _.fromEquirectangularTexture(r,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===Vc||f===Gc,_=f===zr||f===fs;if(g||_){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ba(r)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let b=u.image;return g&&b&&b.height>0||_&&b&&l(b)?(n===null&&(n=new ba(r)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Vc?u.mapping=zr:f===Gc&&(u.mapping=fs),u}function l(u){let f=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function _S(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&as("WebGLRenderer: "+n+" extension not supported."),i}}}function xS(r,t,e,n){let i={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete i[u.id];let f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],r.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,_=0;if(g===void 0)return;if(f!==null){let b=f.array;_=f.version;for(let R=0,x=b.length;R<x;R+=3){let M=b[R+0],T=b[R+1],E=b[R+2];u.push(M,T,T,E,E,M)}}else{let b=g.array;_=g.version;for(let R=0,x=b.length/3-1;R<x;R+=3){let M=R+0,T=R+1,E=R+2;u.push(M,T,T,E,E,M)}}let m=new(g.count>=65535?uo:ho)(u,1);m.version=_;let p=s.get(d);p&&t.remove(p),s.set(d,m)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function yS(r,t,e){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){r.drawElements(n,u,s,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(r.drawElementsInstanced(n,u,s,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let _=0;for(let m=0;m<f;m++)_+=u[m];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function vS(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function SS(r,t,e){let n=new WeakMap,i=new De;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let w=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],R=0;f===!0&&(R=1),g===!0&&(R=2),_===!0&&(R=3);let x=o.attributes.position.count*R,M=1;x>t.maxTextureSize&&(M=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let T=new Float32Array(x*M*4*d),E=new lo(T,x,M,d);E.type=vi,E.needsUpdate=!0;let y=R*4;for(let L=0;L<d;L++){let H=m[L],k=p[L],Q=b[L],z=x*M*4*L;for(let Y=0;Y<H.count;Y++){let et=Y*y;f===!0&&(i.fromBufferAttribute(H,Y),T[z+et+0]=i.x,T[z+et+1]=i.y,T[z+et+2]=i.z,T[z+et+3]=0),g===!0&&(i.fromBufferAttribute(k,Y),T[z+et+4]=i.x,T[z+et+5]=i.y,T[z+et+6]=i.z,T[z+et+7]=0),_===!0&&(i.fromBufferAttribute(Q,Y),T[z+et+8]=i.x,T[z+et+9]=i.y,T[z+et+10]=i.z,T[z+et+11]=Q.itemSize===4?i.w:1)}}u={count:d,texture:E,size:new xt(x,M)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function MS(r,t,e,n,i){let s=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var bS={[_f]:"LINEAR_TONE_MAPPING",[xf]:"REINHARD_TONE_MAPPING",[yf]:"CINEON_TONE_MAPPING",[Vo]:"ACES_FILMIC_TONE_MAPPING",[Sf]:"AGX_TONE_MAPPING",[Mf]:"NEUTRAL_TONE_MAPPING",[vf]:"CUSTOM_TONE_MAPPING"};function TS(r,t,e,n,i,s){let a=new qn(t,e,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new mn;c.setAttribute("position",new ze([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ze([0,2,0,0,2,0],2));let h=new Ac({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Le(c,h),u=new fa(-1,1,1,-1,0,1),f=null,g=null,_=!1,m,p=null,b=[],R=!1;this.setSize=function(x,M){a.setSize(x,M),o!==null&&o.setSize(x,M),l!==null&&l.setSize(x,M);for(let T=0;T<b.length;T++){let E=b[T];E.setSize&&E.setSize(x,M)}},this.setEffects=function(x){b=x,R=b.length>0&&b[0].isRenderPass===!0;let M=a.width,T=a.height;b.length>0&&o===null&&(o=new qn(M,T,{type:Oi,depthBuffer:!1,stencilBuffer:!1}),l=new qn(M,T,{type:Oi,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<b.length;E++){let y=b[E];y.setSize&&y.setSize(M,T)}},this.begin=function(x,M){if(_||x.toneMapping===Ui&&b.length===0)return!1;if(p=M,M!==null){let T=M.width,E=M.height;(a.width!==T||a.height!==E)&&this.setSize(T,E)}return R===!1&&x.setRenderTarget(a),m=x.toneMapping,x.toneMapping=Ui,!0},this.hasRenderPass=function(){return R},this.end=function(x,M){x.toneMapping=m,_=!0;let T=a,E=o;for(let y=0;y<b.length;y++){let w=b[y];w.enabled!==!1&&(w.render(x,E,T,M),w.needsSwap!==!1&&(T=E,E=E===o?l:o))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},fe.getTransfer(f)===_e&&(h.defines.SRGB_TRANSFER="");let y=bS[g];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,x.setRenderTarget(p),x.render(d,u),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var lg=new Fn,Hf=new Nr(1,1),cg=new lo,hg=new _c,ug=new xo,Hm=[],Wm=[],Xm=new Float32Array(16),qm=new Float32Array(9),Ym=new Float32Array(4);function Ta(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Hm[i];if(s===void 0&&(s=new Float32Array(i),Hm[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function tn(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function en(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Nh(r,t){let e=Wm[t];e===void 0&&(e=new Int32Array(t),Wm[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function wS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function AS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2fv(this.addr,t),en(e,t)}}function ES(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(tn(e,t))return;r.uniform3fv(this.addr,t),en(e,t)}}function CS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4fv(this.addr,t),en(e,t)}}function RS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;Ym.set(n),r.uniformMatrix2fv(this.addr,!1,Ym),en(e,n)}}function PS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;qm.set(n),r.uniformMatrix3fv(this.addr,!1,qm),en(e,n)}}function IS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;Xm.set(n),r.uniformMatrix4fv(this.addr,!1,Xm),en(e,n)}}function LS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function DS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2iv(this.addr,t),en(e,t)}}function NS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(tn(e,t))return;r.uniform3iv(this.addr,t),en(e,t)}}function US(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4iv(this.addr,t),en(e,t)}}function FS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function OS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2uiv(this.addr,t),en(e,t)}}function BS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(tn(e,t))return;r.uniform3uiv(this.addr,t),en(e,t)}}function kS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4uiv(this.addr,t),en(e,t)}}function zS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Hf.compareFunction=e.isReversedDepthBuffer()?Ch:Eh,s=Hf):s=lg,e.setTexture2D(t||s,i)}function VS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||hg,i)}function GS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ug,i)}function HS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||cg,i)}function WS(r){switch(r){case 5126:return wS;case 35664:return AS;case 35665:return ES;case 35666:return CS;case 35674:return RS;case 35675:return PS;case 35676:return IS;case 5124:case 35670:return LS;case 35667:case 35671:return DS;case 35668:case 35672:return NS;case 35669:case 35673:return US;case 5125:return FS;case 36294:return OS;case 36295:return BS;case 36296:return kS;case 35678:case 36198:case 36298:case 36306:case 35682:return zS;case 35679:case 36299:case 36307:return VS;case 35680:case 36300:case 36308:case 36293:return GS;case 36289:case 36303:case 36311:case 36292:return HS}}function XS(r,t){r.uniform1fv(this.addr,t)}function qS(r,t){let e=Ta(t,this.size,2);r.uniform2fv(this.addr,e)}function YS(r,t){let e=Ta(t,this.size,3);r.uniform3fv(this.addr,e)}function ZS(r,t){let e=Ta(t,this.size,4);r.uniform4fv(this.addr,e)}function JS(r,t){let e=Ta(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function $S(r,t){let e=Ta(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function KS(r,t){let e=Ta(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function QS(r,t){r.uniform1iv(this.addr,t)}function jS(r,t){r.uniform2iv(this.addr,t)}function tM(r,t){r.uniform3iv(this.addr,t)}function eM(r,t){r.uniform4iv(this.addr,t)}function nM(r,t){r.uniform1uiv(this.addr,t)}function iM(r,t){r.uniform2uiv(this.addr,t)}function rM(r,t){r.uniform3uiv(this.addr,t)}function sM(r,t){r.uniform4uiv(this.addr,t)}function aM(r,t,e){let n=this.cache,i=t.length,s=Nh(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Hf:a=lg;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,s[o])}function oM(r,t,e){let n=this.cache,i=t.length,s=Nh(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||hg,s[a])}function lM(r,t,e){let n=this.cache,i=t.length,s=Nh(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||ug,s[a])}function cM(r,t,e){let n=this.cache,i=t.length,s=Nh(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||cg,s[a])}function hM(r){switch(r){case 5126:return XS;case 35664:return qS;case 35665:return YS;case 35666:return ZS;case 35674:return JS;case 35675:return $S;case 35676:return KS;case 5124:case 35670:return QS;case 35667:case 35671:return jS;case 35668:case 35672:return tM;case 35669:case 35673:return eM;case 5125:return nM;case 36294:return iM;case 36295:return rM;case 36296:return sM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return cM}}var Wf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=WS(e.type)}},Xf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hM(e.type)}},qf=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(t,e[o.id],n)}}},Vf=/(\w+)(\])?(\[|\.)?/g;function Zm(r,t){r.seq.push(t),r.map[t.id]=t}function uM(r,t,e){let n=r.name,i=n.length;for(Vf.lastIndex=0;;){let s=Vf.exec(n),a=Vf.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Zm(e,c===void 0?new Wf(o,r,t):new Xf(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new qf(o),Zm(e,d)),e=d}}}var Ma=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);uM(o,l,this)}let i=[],s=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Jm(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var fM=37297,dM=0;function pM(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var $m=new $t;function mM(r){fe._getMatrix($m,fe.workingColorSpace,r);let t=`mat3( ${$m.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(r)){case ao:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return jt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Km(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+pM(r.getShaderSource(t),o)}else return s}function gM(r,t){let e=mM(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var _M={[_f]:"Linear",[xf]:"Reinhard",[yf]:"Cineon",[Vo]:"ACESFilmic",[Sf]:"AgX",[Mf]:"Neutral",[vf]:"Custom"};function xM(r,t){let e=_M[t];return e===void 0?(jt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ph=new K;function yM(){fe.getLuminanceCoefficients(Ph);let r=Ph.x.toFixed(4),t=Ph.y.toFixed(4),e=Ph.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jo).join(`
`)}function SM(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function MM(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function jo(r){return r!==""}function Qm(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jm(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yf(r){return r.replace(bM,wM)}var TM=new Map;function wM(r,t){let e=re[t];if(e===void 0){let n=TM.get(t);if(n!==void 0)e=re[n],jt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Yf(e)}var AM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tg(r){return r.replace(AM,EM)}function EM(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function eg(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var CM={[zo]:"SHADOWMAP_TYPE_PCF",[ma]:"SHADOWMAP_TYPE_VSM"};function RM(r){return CM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var PM={[zr]:"ENVMAP_TYPE_CUBE",[fs]:"ENVMAP_TYPE_CUBE",[Go]:"ENVMAP_TYPE_CUBE_UV"};function IM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":PM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}var LM={[fs]:"ENVMAP_MODE_REFRACTION"};function DM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":LM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var NM={[zc]:"ENVMAP_BLENDING_MULTIPLY",[pm]:"ENVMAP_BLENDING_MIX",[mm]:"ENVMAP_BLENDING_ADD"};function UM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":NM[r.combine]||"ENVMAP_BLENDING_NONE"}function FM(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function OM(r,t,e,n){let i=r.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=RM(e),c=IM(e),h=DM(e),d=UM(e),u=FM(e),f=vM(e),g=SM(s),_=i.createProgram(),m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(jo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(jo).join(`
`),p.length>0&&(p+=`
`)):(m=[eg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jo).join(`
`),p=[eg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ui?"#define TONE_MAPPING":"",e.toneMapping!==Ui?re.tonemapping_pars_fragment:"",e.toneMapping!==Ui?xM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,gM("linearToOutputTexel",e.outputColorSpace),yM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(jo).join(`
`)),a=Yf(a),a=Qm(a,e),a=jm(a,e),o=Yf(o),o=Qm(o,e),o=jm(o,e),a=tg(a),o=tg(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Pf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let R=b+m+a,x=b+p+o,M=Jm(i,i.VERTEX_SHADER,R),T=Jm(i,i.FRAGMENT_SHADER,x);i.attachShader(_,M),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(H){if(r.debug.checkShaderErrors){let k=i.getProgramInfoLog(_)||"",Q=i.getShaderInfoLog(M)||"",z=i.getShaderInfoLog(T)||"",Y=k.trim(),et=Q.trim(),W=z.trim(),X=!0,nt=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,M,T);else{let P=Km(i,M,"vertex"),at=Km(i,T,"fragment");te("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+Y+`
`+P+`
`+at)}else Y!==""?jt("WebGLProgram: Program Info Log:",Y):(et===""||W==="")&&(nt=!1);nt&&(H.diagnostics={runnable:X,programLog:Y,vertexShader:{log:et,prefix:m},fragmentShader:{log:W,prefix:p}})}i.deleteShader(M),i.deleteShader(T),y=new Ma(i,_),w=MM(i,_)}let y;this.getUniforms=function(){return y===void 0&&E(this),y};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(_,fM)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=T,this}var BM=0,Zf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Jf(t),e.set(t,n)),n}},Jf=class{constructor(t){this.id=BM++,this.code=t,this.usedTimes=0}};function kM(r){return r===Hr||r===Zo||r===Jo}function zM(r,t,e,n,i,s){let a=new co,o=new Zf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,w,L,H,k,Q){let z=H.fog,Y=k.geometry,et=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?H.environment:null,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,X=t.get(y.envMap||et,W),nt=X&&X.mapping===Go?X.image.height:null,P=f[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&jt("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let at=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,At=at!==void 0?at.length:0,Et=0;Y.morphAttributes.position!==void 0&&(Et=1),Y.morphAttributes.normal!==void 0&&(Et=2),Y.morphAttributes.color!==void 0&&(Et=3);let Bt,Ut,qt,B;if(P){let Jt=Qi[P];Bt=Jt.vertexShader,Ut=Jt.fragmentShader}else{Bt=y.vertexShader,Ut=y.fragmentShader;let Jt=o.getVertexShaderStage(y),vt=o.getFragmentShaderStage(y);o.update(y,Jt,vt),qt=Jt.id,B=vt.id}let F=r.getRenderTarget(),U=r.state.buffers.depth.getReversed(),N=k.isInstancedMesh===!0,G=k.isBatchedMesh===!0,it=!!y.map,ht=!!y.matcap,C=!!X,V=!!y.aoMap,O=!!y.lightMap,I=!!y.bumpMap&&y.wireframe===!1,j=!!y.normalMap,lt=!!y.displacementMap,mt=!!y.emissiveMap,ft=!!y.metalnessMap,J=!!y.roughnessMap,S=y.anisotropy>0,Ct=y.clearcoat>0,Tt=y.dispersion>0,D=y.retroreflectivity>0,v=y.iridescence>0,q=y.sheen>0,tt=y.transmission>0,ct=S&&!!y.anisotropyMap,Mt=Ct&&!!y.clearcoatMap,yt=Ct&&!!y.clearcoatNormalMap,ut=Ct&&!!y.clearcoatRoughnessMap,dt=v&&!!y.iridescenceMap,Rt=v&&!!y.iridescenceThicknessMap,kt=q&&!!y.sheenColorMap,It=q&&!!y.sheenRoughnessMap,Pt=!!y.specularMap,bt=!!y.specularColorMap,Yt=!!y.specularIntensityMap,Qt=tt&&!!y.transmissionMap,Z=tt&&!!y.thicknessMap,wt=!!y.gradientMap,pt=!!y.alphaMap,Lt=y.alphaTest>0,Nt=!!y.alphaHash,gt=!!y.extensions,St=Ui;y.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(St=r.toneMapping);let _t={shaderID:P,shaderType:y.type,shaderName:y.name,vertexShader:Bt,fragmentShader:Ut,defines:y.defines,customVertexShaderID:qt,customFragmentShaderID:B,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:G,batchingColor:G&&k._colorsTexture!==null,instancing:N,instancingColor:N&&k.instanceColor!==null,instancingMorph:N&&k.morphTexture!==null,outputColorSpace:F===null?r.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:fe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:it,matcap:ht,envMap:C,envMapMode:C&&X.mapping,envMapCubeUVHeight:nt,aoMap:V,lightMap:O,bumpMap:I,normalMap:j,displacementMap:lt,emissiveMap:mt,normalMapObjectSpace:j&&y.normalMapType===xm,normalMapTangentSpace:j&&y.normalMapType===$o,packedNormalMap:j&&y.normalMapType===$o&&kM(y.normalMap.format),metalnessMap:ft,roughnessMap:J,anisotropy:S,anisotropyMap:ct,clearcoat:Ct,clearcoatMap:Mt,clearcoatNormalMap:yt,clearcoatRoughnessMap:ut,dispersion:Tt,retroreflection:D,iridescence:v,iridescenceMap:dt,iridescenceThicknessMap:Rt,sheen:q,sheenColorMap:kt,sheenRoughnessMap:It,specularMap:Pt,specularColorMap:bt,specularIntensityMap:Yt,transmission:tt,transmissionMap:Qt,thicknessMap:Z,gradientMap:wt,opaque:y.transparent===!1&&y.blending===ga&&y.alphaToCoverage===!1,alphaMap:pt,alphaTest:Lt,alphaHash:Nt,combine:y.combine,mapUv:it&&g(y.map.channel),aoMapUv:V&&g(y.aoMap.channel),lightMapUv:O&&g(y.lightMap.channel),bumpMapUv:I&&g(y.bumpMap.channel),normalMapUv:j&&g(y.normalMap.channel),displacementMapUv:lt&&g(y.displacementMap.channel),emissiveMapUv:mt&&g(y.emissiveMap.channel),metalnessMapUv:ft&&g(y.metalnessMap.channel),roughnessMapUv:J&&g(y.roughnessMap.channel),anisotropyMapUv:ct&&g(y.anisotropyMap.channel),clearcoatMapUv:Mt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:yt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:It&&g(y.sheenRoughnessMap.channel),specularMapUv:Pt&&g(y.specularMap.channel),specularColorMapUv:bt&&g(y.specularColorMap.channel),specularIntensityMapUv:Yt&&g(y.specularIntensityMap.channel),transmissionMapUv:Qt&&g(y.transmissionMap.channel),thicknessMapUv:Z&&g(y.thicknessMap.channel),alphaMapUv:pt&&g(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(j||S),vertexNormals:!!Y.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(it||pt),fog:!!z,useFog:y.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||Y.attributes.normal===void 0&&j===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:U,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:Y.attributes.position!==void 0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Et,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:St,decodeVideoTexture:it&&y.map.isVideoTexture===!0&&fe.getTransfer(y.map.colorSpace)===_e,decodeVideoTextureEmissive:mt&&y.emissiveMap.isVideoTexture===!0&&fe.getTransfer(y.emissiveMap.colorSpace)===_e,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ai,flipSided:y.side===gn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:gt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&y.extensions.multiDraw===!0||G)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return _t.vertexUv1s=l.has(1),_t.vertexUv2s=l.has(2),_t.vertexUv3s=l.has(3),l.clear(),_t}function m(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let L in y.defines)w.push(L),w.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(p(w,y),b(w,y),w.push(r.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function p(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function b(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function R(y){let w=f[y.type],L;if(w){let H=Qi[w];L=Fm.clone(H.uniforms)}else L=y.uniforms;return L}function x(y,w){let L=h.get(w);return L!==void 0?++L.usedTimes:(L=new OM(r,w,y,i),c.push(L),h.set(w,L)),L}function M(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function E(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:R,acquireProgram:x,releaseProgram:M,releaseShaderCache:T,programs:c,dispose:E}}function VM(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function GM(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function ng(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ig(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,_,m,p){let b=r[t];return b===void 0?(b={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},r[t]=b):(b.id=u.id,b.object=u,b.geometry=f,b.material=g,b.materialVariant=a(u),b.groupOrder=_,b.renderOrder=u.renderOrder,b.z=m,b.group=p),t++,b}function l(u,f,g,_,m,p,b){b.reversedDepth===!0&&(m=-m);let R=o(u,f,g,_,m,p);g.transmission>0?n.push(R):g.transparent===!0?i.push(R):e.push(R)}function c(u,f,g,_,m,p){let b=o(u,f,g,_,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?i.unshift(b):e.unshift(b)}function h(u,f){e.length>1&&e.sort(u||GM),n.length>1&&n.sort(f||ng),i.length>1&&i.sort(f||ng)}function d(){for(let u=t,f=r.length;u<f;u++){let g=r[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:h}}function HM(){let r=new WeakMap;function t(n,i){let s=r.get(n),a;return s===void 0?(a=new ig,r.set(n,[a])):i>=s.length?(a=new ig,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function WM(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new K,color:new ee};break;case"SpotLight":e={position:new K,direction:new K,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new K,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new K,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new K,halfWidth:new K,halfHeight:new K};break}return r[t.id]=e,e}}}function XM(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var qM=0;function YM(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ZM(r){let t=new WM,e=XM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new K);let i=new K,s=new Se,a=new Se;function o(c){let h=0,d=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,R=0,x=0,M=0,T=0,E=0,y=0,w=0,L=0;c.sort(YM);for(let k=0,Q=c.length;k<Q;k++){let z=c[k],Y=z.color,et=z.intensity,W=z.distance,X=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===Hr?X=z.shadow.map.texture:X=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)h+=Y.r*et,d+=Y.g*et,u+=Y.b*et;else if(z.isLightProbe){for(let nt=0;nt<9;nt++)n.probe[nt].addScaledVector(z.sh.coefficients[nt],et);L++}else if(z.isSunLight){let nt=t.get(z);if(nt.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let P=z.shadow,at=e.get(z);at.shadowIntensity=P.intensity,at.shadowBias=P.bias,at.shadowNormalBias=P.normalBias,at.shadowRadius=P.radius,at.shadowMapSize.copy(P.mapSize).multiply(P.getFrameExtents()),n.sunShadow[g]=at,n.sunShadowMap[g]=X;let At=P.getViewportCount();for(let Et=0;Et<At;Et++)n.sunShadowMatrix[_+Et]=P.getMatrix(Et),n.sunShadowCascade[_+Et]=P._cascadeData[Et];_+=At,g++}n.sun[f]=nt,f++}else if(z.isDirectionalLight){let nt=t.get(z);if(nt.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let P=z.shadow,at=e.get(z);at.shadowIntensity=P.intensity,at.shadowBias=P.bias,at.shadowNormalBias=P.normalBias,at.shadowRadius=P.radius,at.shadowMapSize=P.mapSize,n.directionalShadow[m]=at,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=z.shadow.matrix,M++}n.directional[m]=nt,m++}else if(z.isSpotLight){let nt=t.get(z);nt.position.setFromMatrixPosition(z.matrixWorld),nt.color.copy(Y).multiplyScalar(et),nt.distance=W,nt.coneCos=Math.cos(z.angle),nt.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),nt.decay=z.decay,n.spot[b]=nt;let P=z.shadow;if(z.map&&(n.spotLightMap[y]=z.map,y++,P.updateMatrices(z),z.castShadow&&w++),n.spotLightMatrix[b]=P.matrix,z.castShadow){let at=e.get(z);at.shadowIntensity=P.intensity,at.shadowBias=P.bias,at.shadowNormalBias=P.normalBias,at.shadowRadius=P.radius,at.shadowMapSize=P.mapSize,n.spotShadow[b]=at,n.spotShadowMap[b]=X,E++}b++}else if(z.isRectAreaLight){let nt=t.get(z);nt.color.copy(Y).multiplyScalar(et),nt.halfWidth.set(z.width*.5,0,0),nt.halfHeight.set(0,z.height*.5,0),n.rectArea[R]=nt,R++}else if(z.isPointLight){let nt=t.get(z);if(nt.color.copy(z.color).multiplyScalar(z.intensity),nt.distance=z.distance,nt.decay=z.decay,z.castShadow){let P=z.shadow,at=e.get(z);at.shadowIntensity=P.intensity,at.shadowBias=P.bias,at.shadowNormalBias=P.normalBias,at.shadowRadius=P.radius,at.shadowMapSize=P.mapSize,at.shadowCameraNear=P.camera.near,at.shadowCameraFar=P.camera.far,n.pointShadow[p]=at,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=z.shadow.matrix,T++}n.point[p]=nt,p++}else if(z.isHemisphereLight){let nt=t.get(z);nt.skyColor.copy(z.color).multiplyScalar(et),nt.groundColor.copy(z.groundColor).multiplyScalar(et),n.hemi[x]=nt,x++}}R>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ft.LTC_FLOAT_1,n.rectAreaLTC2=Ft.LTC_FLOAT_2):(n.rectAreaLTC1=Ft.LTC_HALF_1,n.rectAreaLTC2=Ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let H=n.hash;(H.sunLength!==f||H.directionalLength!==m||H.pointLength!==p||H.spotLength!==b||H.rectAreaLength!==R||H.hemiLength!==x||H.numSunShadows!==g||H.numDirectionalShadows!==M||H.numPointShadows!==T||H.numSpotShadows!==E||H.numSpotMaps!==y||H.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=m,n.spot.length=b,n.rectArea.length=R,n.point.length=p,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+y-w,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=L,H.sunLength=f,H.directionalLength=m,H.pointLength=p,H.spotLength=b,H.rectAreaLength=R,H.hemiLength=x,H.numSunShadows=g,H.numDirectionalShadows=M,H.numPointShadows=T,H.numSpotShadows=E,H.numSpotMaps=y,H.numLightProbes=L,n.version=qM++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let b=0,R=c.length;b<R;b++){let x=c[b];if(x.isSunLight){let M=n.sun[d];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(p),d++}else if(x.isDirectionalLight){let M=n.directional[u];M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),u++}else if(x.isSpotLight){let M=n.spot[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),g++}else if(x.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function rg(r){let t=new ZM(r),e=[],n=[],i=[];function s(u){d.camera=u,e.length=0,n.length=0,i.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){i.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function JM(r){let t=new WeakMap;function e(i,s=0){let a=t.get(i),o;return a===void 0?(o=new rg(r),t.set(i,[o])):s>=a.length?(o=new rg(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var $M=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,QM=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],jM=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],sg=new Se,Qo=new K,Gf=new K;function tb(r,t,e){let n=new aa,i=new xt,s=new xt,a=new De,o=new Ec,l=new Cc,c={},h=e.maxTextureSize,d={[kr]:gn,[gn]:kr,[ai]:ai},u=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:$M,fragmentShader:KM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new mn;g.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Le(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zo;let p=this.type;this.render=function(T,E,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Jp&&(jt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=zo);let w=r.getRenderTarget(),L=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),k=r.state;k.setBlending($i),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let Q=p!==this.type;Q&&E.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(Y=>Y.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,Y=T.length;z<Y;z++){let et=T[z],W=et.shadow;if(W===void 0){jt("WebGLShadowMap:",et,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let X=W.getFrameExtents();i.multiply(X),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/X.x),i.x=s.x*X.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/X.y),i.y=s.y*X.y,W.mapSize.y=s.y));let nt=r.state.buffers.depth.getReversed();if(W.camera._reversedDepth=nt,W.map===null||Q===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===ma){if(et.isPointLight){jt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new qn(i.x,i.y,{format:Hr,type:Oi,minFilter:pn,magFilter:pn,generateMipmaps:!1}),W.map.texture.name=et.name+".shadowMap",W.map.depthTexture=new Nr(i.x,i.y,vi),W.map.depthTexture.name=et.name+".shadowMapDepth",W.map.depthTexture.format=Wi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=cn,W.map.depthTexture.magFilter=cn}else et.isPointLight?(W.map=new Ih(i.x),W.map.depthTexture=new vc(i.x,Fi)):(W.map=new qn(i.x,i.y),W.map.depthTexture=new Nr(i.x,i.y,Fi)),W.map.depthTexture.name=et.name+".shadowMap",W.map.depthTexture.format=Wi,this.type===zo?(W.map.depthTexture.compareFunction=nt?Ch:Eh,W.map.depthTexture.minFilter=pn,W.map.depthTexture.magFilter=pn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=cn,W.map.depthTexture.magFilter=cn);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==i.x||W.map.height!==i.y)&&W.map.setSize(i.x,i.y);let P=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();et.isPointLight!==!0&&W.updateMatrices(et,y);for(let at=0;at<P;at++){let At=W.getCamera(at);if(et.isPointLight){let Et=W.camera,Bt=W.matrix,Ut=et.distance||Et.far;Ut!==Et.far&&(Et.far=Ut,Et.updateProjectionMatrix()),Qo.setFromMatrixPosition(et.matrixWorld),Et.position.copy(Qo),Gf.copy(Et.position),Gf.add(QM[at]),Et.up.copy(jM[at]),Et.lookAt(Gf),Et.updateMatrixWorld(),Bt.makeTranslation(-Qo.x,-Qo.y,-Qo.z),sg.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),W._frustum.setFromProjectionMatrix(sg,Et.coordinateSystem,Et.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)r.setRenderTarget(W.map,at),r.clear();else{at===0&&(r.setRenderTarget(W.map),r.clear());let Et=W.getViewport(at);a.set(s.x*Et.x,s.y*Et.y,s.x*Et.z,s.y*Et.w),k.viewport(a)}n=W.getFrustum(at),x(E,y,At,et,this.type)}W.isPointLightShadow!==!0&&this.type===ma&&b(W,y),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,L,H)};function b(T,E){let y=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new qn(i.x,i.y,{format:Hr,type:Oi}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(E,null,y,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(E,null,y,f,_,null)}function R(T,E,y,w){let L=null,H=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(H!==void 0)L=H;else if(L=y.isPointLight===!0?l:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let k=L.uuid,Q=E.uuid,z=c[k];z===void 0&&(z={},c[k]=z);let Y=z[Q];Y===void 0&&(Y=L.clone(),z[Q]=Y,E.addEventListener("dispose",M)),L=Y}if(L.visible=E.visible,L.wireframe=E.wireframe,w===ma?L.side=E.shadowSide!==null?E.shadowSide:E.side:L.side=E.shadowSide!==null?E.shadowSide:d[E.side],L.alphaMap=E.alphaMap,L.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,L.map=E.map,L.clipShadows=E.clipShadows,L.clippingPlanes=E.clippingPlanes,L.clipIntersection=E.clipIntersection,L.displacementMap=E.displacementMap,L.displacementScale=E.displacementScale,L.displacementBias=E.displacementBias,L.wireframeLinewidth=E.wireframeLinewidth,L.linewidth=E.linewidth,y.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let k=r.properties.get(L);k.light=y}return L}function x(T,E,y,w,L){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===ma)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);let Q=t.update(T),z=T.material;if(Array.isArray(z)){let Y=Q.groups;for(let et=0,W=Y.length;et<W;et++){let X=Y[et],nt=z[X.materialIndex];if(nt&&nt.visible){let P=R(T,nt,w,L);T.onBeforeShadow(r,T,E,y,Q,P,X),r.renderBufferDirect(y,null,Q,P,T,X),T.onAfterShadow(r,T,E,y,Q,P,X)}}}else if(z.visible){let Y=R(T,z,w,L);T.onBeforeShadow(r,T,E,y,Q,Y,null),r.renderBufferDirect(y,null,Q,Y,T,null),T.onAfterShadow(r,T,E,y,Q,Y,null)}}let k=T.children;for(let Q=0,z=k.length;Q<z;Q++)x(k[Q],E,y,w,L)}function M(T){T.target.removeEventListener("dispose",M);for(let y in c){let w=c[y],L=T.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function eb(r,t){function e(){let Z=!1,wt=new De,pt=null,Lt=new De(0,0,0,0);return{setMask:function(Nt){pt!==Nt&&!Z&&(r.colorMask(Nt,Nt,Nt,Nt),pt=Nt)},setLocked:function(Nt){Z=Nt},setClear:function(Nt,gt,St,_t,Jt){Jt===!0&&(Nt*=_t,gt*=_t,St*=_t),wt.set(Nt,gt,St,_t),Lt.equals(wt)===!1&&(r.clearColor(Nt,gt,St,_t),Lt.copy(wt))},reset:function(){Z=!1,pt=null,Lt.set(-1,0,0,0)}}}function n(){let Z=!1,wt=!1,pt=null,Lt=null,Nt=null;return{setReversed:function(gt){if(wt!==gt){let St=t.get("EXT_clip_control");gt?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),wt=gt;let _t=Nt;Nt=null,this.setClear(_t)}},getReversed:function(){return wt},setTest:function(gt){gt?F(r.DEPTH_TEST):U(r.DEPTH_TEST)},setMask:function(gt){pt!==gt&&!Z&&(r.depthMask(gt),pt=gt)},setFunc:function(gt){if(wt&&(gt=Pm[gt]),Lt!==gt){switch(gt){case ac:r.depthFunc(r.NEVER);break;case oc:r.depthFunc(r.ALWAYS);break;case lc:r.depthFunc(r.LESS);break;case js:r.depthFunc(r.LEQUAL);break;case cc:r.depthFunc(r.EQUAL);break;case hc:r.depthFunc(r.GEQUAL);break;case uc:r.depthFunc(r.GREATER);break;case fc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Lt=gt}},setLocked:function(gt){Z=gt},setClear:function(gt){Nt!==gt&&(Nt=gt,wt&&(gt=1-gt),r.clearDepth(gt))},reset:function(){Z=!1,pt=null,Lt=null,Nt=null,wt=!1}}}function i(){let Z=!1,wt=null,pt=null,Lt=null,Nt=null,gt=null,St=null,_t=null,Jt=null;return{setTest:function(vt){Z||(vt?F(r.STENCIL_TEST):U(r.STENCIL_TEST))},setMask:function(vt){wt!==vt&&!Z&&(r.stencilMask(vt),wt=vt)},setFunc:function(vt,Kt,Ht){(pt!==vt||Lt!==Kt||Nt!==Ht)&&(r.stencilFunc(vt,Kt,Ht),pt=vt,Lt=Kt,Nt=Ht)},setOp:function(vt,Kt,Ht){(gt!==vt||St!==Kt||_t!==Ht)&&(r.stencilOp(vt,Kt,Ht),gt=vt,St=Kt,_t=Ht)},setLocked:function(vt){Z=vt},setClear:function(vt){Jt!==vt&&(r.clearStencil(vt),Jt=vt)},reset:function(){Z=!1,wt=null,pt=null,Lt=null,Nt=null,gt=null,St=null,_t=null,Jt=null}}}let s=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],_=null,m=!1,p=null,b=null,R=null,x=null,M=null,T=null,E=null,y=new ee(0,0,0),w=0,L=!1,H=null,k=null,Q=null,z=null,Y=null,et=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,X=0,nt=r.getParameter(r.VERSION);nt.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(nt)[1]),W=X>=1):nt.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),W=X>=2);let P=null,at={},At=r.getParameter(r.SCISSOR_BOX),Et=r.getParameter(r.VIEWPORT),Bt=new De().fromArray(At),Ut=new De().fromArray(Et);function qt(Z,wt,pt,Lt){let Nt=new Uint8Array(4),gt=r.createTexture();r.bindTexture(Z,gt),r.texParameteri(Z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let St=0;St<pt;St++)Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,Lt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(wt+St,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return gt}let B={};B[r.TEXTURE_2D]=qt(r.TEXTURE_2D,r.TEXTURE_2D,1),B[r.TEXTURE_CUBE_MAP]=qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[r.TEXTURE_2D_ARRAY]=qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),B[r.TEXTURE_3D]=qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),F(r.DEPTH_TEST),a.setFunc(js),I(!1),j(uf),F(r.CULL_FACE),V($i);function F(Z){h[Z]!==!0&&(r.enable(Z),h[Z]=!0)}function U(Z){h[Z]!==!1&&(r.disable(Z),h[Z]=!1)}function N(Z,wt){return u[Z]!==wt?(r.bindFramebuffer(Z,wt),u[Z]=wt,Z===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=wt),Z===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function G(Z,wt){let pt=g,Lt=!1;if(Z){pt=f.get(wt),pt===void 0&&(pt=[],f.set(wt,pt));let Nt=Z.textures;if(pt.length!==Nt.length||pt[0]!==r.COLOR_ATTACHMENT0){for(let gt=0,St=Nt.length;gt<St;gt++)pt[gt]=r.COLOR_ATTACHMENT0+gt;pt.length=Nt.length,Lt=!0}}else pt[0]!==r.BACK&&(pt[0]=r.BACK,Lt=!0);Lt&&r.drawBuffers(pt)}function it(Z){return _!==Z?(r.useProgram(Z),_=Z,!0):!1}let ht={[us]:r.FUNC_ADD,[Kp]:r.FUNC_SUBTRACT,[Qp]:r.FUNC_REVERSE_SUBTRACT};ht[jp]=r.MIN,ht[tm]=r.MAX;let C={[em]:r.ZERO,[nm]:r.ONE,[im]:r.SRC_COLOR,[mf]:r.SRC_ALPHA,[cm]:r.SRC_ALPHA_SATURATE,[om]:r.DST_COLOR,[sm]:r.DST_ALPHA,[rm]:r.ONE_MINUS_SRC_COLOR,[gf]:r.ONE_MINUS_SRC_ALPHA,[lm]:r.ONE_MINUS_DST_COLOR,[am]:r.ONE_MINUS_DST_ALPHA,[hm]:r.CONSTANT_COLOR,[um]:r.ONE_MINUS_CONSTANT_COLOR,[fm]:r.CONSTANT_ALPHA,[dm]:r.ONE_MINUS_CONSTANT_ALPHA};function V(Z,wt,pt,Lt,Nt,gt,St,_t,Jt,vt){if(Z===$i){m===!0&&(U(r.BLEND),m=!1);return}if(m===!1&&(F(r.BLEND),m=!0),Z!==$p){if(Z!==p||vt!==L){if((b!==us||M!==us)&&(r.blendEquation(r.FUNC_ADD),b=us,M=us),vt)switch(Z){case ga:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ff:r.blendFunc(r.ONE,r.ONE);break;case df:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case pf:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:te("WebGLState: Invalid blending: ",Z);break}else switch(Z){case ga:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ff:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case df:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pf:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",Z);break}R=null,x=null,T=null,E=null,y.set(0,0,0),w=0,p=Z,L=vt}return}Nt=Nt||wt,gt=gt||pt,St=St||Lt,(wt!==b||Nt!==M)&&(r.blendEquationSeparate(ht[wt],ht[Nt]),b=wt,M=Nt),(pt!==R||Lt!==x||gt!==T||St!==E)&&(r.blendFuncSeparate(C[pt],C[Lt],C[gt],C[St]),R=pt,x=Lt,T=gt,E=St),(_t.equals(y)===!1||Jt!==w)&&(r.blendColor(_t.r,_t.g,_t.b,Jt),y.copy(_t),w=Jt),p=Z,L=!1}function O(Z,wt){Z.side===ai?U(r.CULL_FACE):F(r.CULL_FACE);let pt=Z.side===gn;wt&&(pt=!pt),I(pt),Z.blending===ga&&Z.transparent===!1?V($i):V(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),a.setFunc(Z.depthFunc),a.setTest(Z.depthTest),a.setMask(Z.depthWrite),s.setMask(Z.colorWrite);let Lt=Z.stencilWrite;o.setTest(Lt),Lt&&(o.setMask(Z.stencilWriteMask),o.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),o.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),mt(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?F(r.SAMPLE_ALPHA_TO_COVERAGE):U(r.SAMPLE_ALPHA_TO_COVERAGE)}function I(Z){H!==Z&&(Z?r.frontFace(r.CW):r.frontFace(r.CCW),H=Z)}function j(Z){Z!==Yp?(F(r.CULL_FACE),Z!==k&&(Z===uf?r.cullFace(r.BACK):Z===Zp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):U(r.CULL_FACE),k=Z}function lt(Z){Z!==Q&&(W&&r.lineWidth(Z),Q=Z)}function mt(Z,wt,pt){Z?(F(r.POLYGON_OFFSET_FILL),(z!==wt||Y!==pt)&&(z=wt,Y=pt,a.getReversed()&&(wt=-wt),r.polygonOffset(wt,pt))):U(r.POLYGON_OFFSET_FILL)}function ft(Z){Z?F(r.SCISSOR_TEST):U(r.SCISSOR_TEST)}function J(Z){Z===void 0&&(Z=r.TEXTURE0+et-1),P!==Z&&(r.activeTexture(Z),P=Z)}function S(Z,wt,pt){pt===void 0&&(P===null?pt=r.TEXTURE0+et-1:pt=P);let Lt=at[pt];Lt===void 0&&(Lt={type:void 0,texture:void 0},at[pt]=Lt),(Lt.type!==Z||Lt.texture!==wt)&&(P!==pt&&(r.activeTexture(pt),P=pt),r.bindTexture(Z,wt||B[Z]),Lt.type=Z,Lt.texture=wt)}function Ct(){let Z=at[P];Z!==void 0&&Z.type!==void 0&&(r.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function Tt(){try{r.compressedTexImage2D(...arguments)}catch(Z){te("WebGLState:",Z)}}function D(){try{r.compressedTexImage3D(...arguments)}catch(Z){te("WebGLState:",Z)}}function v(){try{r.texSubImage2D(...arguments)}catch(Z){te("WebGLState:",Z)}}function q(){try{r.texSubImage3D(...arguments)}catch(Z){te("WebGLState:",Z)}}function tt(){try{r.compressedTexSubImage2D(...arguments)}catch(Z){te("WebGLState:",Z)}}function ct(){try{r.compressedTexSubImage3D(...arguments)}catch(Z){te("WebGLState:",Z)}}function Mt(){try{r.texStorage2D(...arguments)}catch(Z){te("WebGLState:",Z)}}function yt(){try{r.texStorage3D(...arguments)}catch(Z){te("WebGLState:",Z)}}function ut(){try{r.texImage2D(...arguments)}catch(Z){te("WebGLState:",Z)}}function dt(){try{r.texImage3D(...arguments)}catch(Z){te("WebGLState:",Z)}}function Rt(Z){return d[Z]!==void 0?d[Z]:r.getParameter(Z)}function kt(Z,wt){d[Z]!==wt&&(r.pixelStorei(Z,wt),d[Z]=wt)}function It(Z){Bt.equals(Z)===!1&&(r.scissor(Z.x,Z.y,Z.z,Z.w),Bt.copy(Z))}function Pt(Z){Ut.equals(Z)===!1&&(r.viewport(Z.x,Z.y,Z.z,Z.w),Ut.copy(Z))}function bt(Z,wt){let pt=c.get(wt);pt===void 0&&(pt=new WeakMap,c.set(wt,pt));let Lt=pt.get(Z);Lt===void 0&&(Lt=r.getUniformBlockIndex(wt,Z.name),pt.set(Z,Lt))}function Yt(Z,wt){let Lt=c.get(wt).get(Z);l.get(wt)!==Lt&&(r.uniformBlockBinding(wt,Lt,Z.__bindingPointIndex),l.set(wt,Lt))}function Qt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},d={},P=null,at={},u={},f=new WeakMap,g=[],_=null,m=!1,p=null,b=null,R=null,x=null,M=null,T=null,E=null,y=new ee(0,0,0),w=0,L=!1,H=null,k=null,Q=null,z=null,Y=null,Bt.set(0,0,r.canvas.width,r.canvas.height),Ut.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:F,disable:U,bindFramebuffer:N,drawBuffers:G,useProgram:it,setBlending:V,setMaterial:O,setFlipSided:I,setCullFace:j,setLineWidth:lt,setPolygonOffset:mt,setScissorTest:ft,activeTexture:J,bindTexture:S,unbindTexture:Ct,compressedTexImage2D:Tt,compressedTexImage3D:D,texImage2D:ut,texImage3D:dt,pixelStorei:kt,getParameter:Rt,updateUBOMapping:bt,uniformBlockBinding:Yt,texStorage2D:Mt,texStorage3D:yt,texSubImage2D:v,texSubImage3D:q,compressedTexSubImage2D:tt,compressedTexSubImage3D:ct,scissor:It,viewport:Pt,reset:Qt}}function nb(r,t,e,n,i,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,v){return g?new OffscreenCanvas(D,v):oo("canvas")}function m(D,v,q){let tt=1,ct=Tt(D);if((ct.width>q||ct.height>q)&&(tt=q/Math.max(ct.width,ct.height)),tt<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let Mt=Math.floor(tt*ct.width),yt=Math.floor(tt*ct.height);u===void 0&&(u=_(Mt,yt));let ut=v?_(Mt,yt):u;return ut.width=Mt,ut.height=yt,ut.getContext("2d").drawImage(D,0,0,Mt,yt),jt("WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+Mt+"x"+yt+")."),ut}else return"data"in D&&jt("WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),D;return D}function p(D){return D.generateMipmaps}function b(D){r.generateMipmap(D)}function R(D){return D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?r.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(D,v,q,tt,ct,Mt=!1){if(D!==null){if(r[D]!==void 0)return r[D];jt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let yt;tt&&(yt=t.get("EXT_texture_norm16"),yt||jt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ut=v;if(v===r.RED&&(q===r.FLOAT&&(ut=r.R32F),q===r.HALF_FLOAT&&(ut=r.R16F),q===r.UNSIGNED_BYTE&&(ut=r.R8),q===r.UNSIGNED_SHORT&&yt&&(ut=yt.R16_EXT),q===r.SHORT&&yt&&(ut=yt.R16_SNORM_EXT)),v===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(ut=r.R8UI),q===r.UNSIGNED_SHORT&&(ut=r.R16UI),q===r.UNSIGNED_INT&&(ut=r.R32UI),q===r.BYTE&&(ut=r.R8I),q===r.SHORT&&(ut=r.R16I),q===r.INT&&(ut=r.R32I)),v===r.RG&&(q===r.FLOAT&&(ut=r.RG32F),q===r.HALF_FLOAT&&(ut=r.RG16F),q===r.UNSIGNED_BYTE&&(ut=r.RG8),q===r.UNSIGNED_SHORT&&yt&&(ut=yt.RG16_EXT),q===r.SHORT&&yt&&(ut=yt.RG16_SNORM_EXT)),v===r.RG_INTEGER&&(q===r.UNSIGNED_BYTE&&(ut=r.RG8UI),q===r.UNSIGNED_SHORT&&(ut=r.RG16UI),q===r.UNSIGNED_INT&&(ut=r.RG32UI),q===r.BYTE&&(ut=r.RG8I),q===r.SHORT&&(ut=r.RG16I),q===r.INT&&(ut=r.RG32I)),v===r.RGB_INTEGER&&(q===r.UNSIGNED_BYTE&&(ut=r.RGB8UI),q===r.UNSIGNED_SHORT&&(ut=r.RGB16UI),q===r.UNSIGNED_INT&&(ut=r.RGB32UI),q===r.BYTE&&(ut=r.RGB8I),q===r.SHORT&&(ut=r.RGB16I),q===r.INT&&(ut=r.RGB32I)),v===r.RGBA_INTEGER&&(q===r.UNSIGNED_BYTE&&(ut=r.RGBA8UI),q===r.UNSIGNED_SHORT&&(ut=r.RGBA16UI),q===r.UNSIGNED_INT&&(ut=r.RGBA32UI),q===r.BYTE&&(ut=r.RGBA8I),q===r.SHORT&&(ut=r.RGBA16I),q===r.INT&&(ut=r.RGBA32I)),v===r.RGB&&(q===r.UNSIGNED_SHORT&&yt&&(ut=yt.RGB16_EXT),q===r.SHORT&&yt&&(ut=yt.RGB16_SNORM_EXT),q===r.UNSIGNED_INT_5_9_9_9_REV&&(ut=r.RGB9_E5),q===r.UNSIGNED_INT_10F_11F_11F_REV&&(ut=r.R11F_G11F_B10F)),v===r.RGBA){let dt=Mt?ao:fe.getTransfer(ct);q===r.FLOAT&&(ut=r.RGBA32F),q===r.HALF_FLOAT&&(ut=r.RGBA16F),q===r.UNSIGNED_BYTE&&(ut=dt===_e?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT&&yt&&(ut=yt.RGBA16_EXT),q===r.SHORT&&yt&&(ut=yt.RGBA16_SNORM_EXT),q===r.UNSIGNED_SHORT_4_4_4_4&&(ut=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(ut=r.RGB5_A1)}return(ut===r.R16F||ut===r.R32F||ut===r.RG16F||ut===r.RG32F||ut===r.RGBA16F||ut===r.RGBA32F)&&t.get("EXT_color_buffer_float"),ut}function M(D,v){let q;return D?v===null||v===Fi||v===xa?q=r.DEPTH24_STENCIL8:v===vi?q=r.DEPTH32F_STENCIL8:v===_a&&(q=r.DEPTH24_STENCIL8,jt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Fi||v===xa?q=r.DEPTH_COMPONENT24:v===vi?q=r.DEPTH_COMPONENT32F:v===_a&&(q=r.DEPTH_COMPONENT16),q}function T(D,v){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==cn&&D.minFilter!==pn?Math.log2(Math.max(v.width,v.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?v.mipmaps.length:1}function E(D){let v=D.target;v.removeEventListener("dispose",E),w(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function y(D){let v=D.target;v.removeEventListener("dispose",y),H(v)}function w(D){let v=n.get(D);if(v.__webglInit===void 0)return;let q=D.source,tt=f.get(q);if(tt){let ct=tt[v.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&L(D),Object.keys(tt).length===0&&f.delete(q)}n.remove(D)}function L(D){let v=n.get(D);r.deleteTexture(v.__webglTexture);let q=D.source,tt=f.get(q);delete tt[v.__cacheKey],a.memory.textures--}function H(D){let v=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(v.__webglFramebuffer[tt]))for(let ct=0;ct<v.__webglFramebuffer[tt].length;ct++)r.deleteFramebuffer(v.__webglFramebuffer[tt][ct]);else r.deleteFramebuffer(v.__webglFramebuffer[tt]);v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer[tt])}else{if(Array.isArray(v.__webglFramebuffer))for(let tt=0;tt<v.__webglFramebuffer.length;tt++)r.deleteFramebuffer(v.__webglFramebuffer[tt]);else r.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&r.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let tt=0;tt<v.__webglColorRenderbuffer.length;tt++)v.__webglColorRenderbuffer[tt]&&r.deleteRenderbuffer(v.__webglColorRenderbuffer[tt]);v.__webglDepthRenderbuffer&&r.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let q=D.textures;for(let tt=0,ct=q.length;tt<ct;tt++){let Mt=n.get(q[tt]);Mt.__webglTexture&&(r.deleteTexture(Mt.__webglTexture),a.memory.textures--),n.remove(q[tt])}n.remove(D)}let k=0;function Q(){k=0}function z(){return k}function Y(D){k=D}function et(){let D=k;return D>=i.maxTextures&&jt("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+i.maxTextures),k+=1,D}function W(D){let v=[];return v.push(D.wrapS),v.push(D.wrapT),v.push(D.wrapR||0),v.push(D.magFilter),v.push(D.minFilter),v.push(D.anisotropy),v.push(D.internalFormat),v.push(D.format),v.push(D.type),v.push(D.generateMipmaps),v.push(D.premultiplyAlpha),v.push(D.flipY),v.push(D.unpackAlignment),v.push(D.colorSpace),v.join()}function X(D,v){let q=n.get(D);if(D.isVideoTexture&&S(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&q.__version!==D.version){let tt=D.image;if(tt===null)jt("WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)jt("WebGLRenderer: Texture marked for update but image is incomplete");else{U(q,D,v);return}}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+v)}function nt(D,v){let q=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){U(q,D,v);return}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+v)}function P(D,v){let q=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){U(q,D,v);return}e.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+v)}function at(D,v){let q=n.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&q.__version!==D.version){N(q,D,v);return}e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+v)}let At={[ta]:r.REPEAT,[xi]:r.CLAMP_TO_EDGE,[ea]:r.MIRRORED_REPEAT},Et={[cn]:r.NEAREST,[gm]:r.NEAREST_MIPMAP_NEAREST,[Ho]:r.NEAREST_MIPMAP_LINEAR,[pn]:r.LINEAR,[Hc]:r.LINEAR_MIPMAP_NEAREST,[Vr]:r.LINEAR_MIPMAP_LINEAR},Bt={[vm]:r.NEVER,[wm]:r.ALWAYS,[Sm]:r.LESS,[Eh]:r.LEQUAL,[Mm]:r.EQUAL,[Ch]:r.GEQUAL,[bm]:r.GREATER,[Tm]:r.NOTEQUAL};function Ut(D,v){if(v.type===vi&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===pn||v.magFilter===Hc||v.magFilter===Ho||v.magFilter===Vr||v.minFilter===pn||v.minFilter===Hc||v.minFilter===Ho||v.minFilter===Vr)&&jt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,At[v.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,At[v.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,At[v.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,Et[v.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,Et[v.minFilter]),v.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,Bt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===cn||v.minFilter!==Ho&&v.minFilter!==Vr||v.type===vi&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");r.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function qt(D,v){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,v.addEventListener("dispose",E));let tt=v.source,ct=f.get(tt);ct===void 0&&(ct={},f.set(tt,ct));let Mt=W(v);if(Mt!==D.__cacheKey){ct[Mt]===void 0&&(ct[Mt]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ct[Mt].usedTimes++;let yt=ct[D.__cacheKey];yt!==void 0&&(ct[D.__cacheKey].usedTimes--,yt.usedTimes===0&&L(v)),D.__cacheKey=Mt,D.__webglTexture=ct[Mt].texture}return q}function B(D,v,q){return Math.floor(Math.floor(D/q)/v)}function F(D,v,q,tt){let Mt=D.updateRanges;if(Mt.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,v.width,v.height,q,tt,v.data);else{Mt.sort((kt,It)=>kt.start-It.start);let yt=0;for(let kt=1;kt<Mt.length;kt++){let It=Mt[yt],Pt=Mt[kt],bt=It.start+It.count,Yt=B(Pt.start,v.width,4),Qt=B(It.start,v.width,4);Pt.start<=bt+1&&Yt===Qt&&B(Pt.start+Pt.count-1,v.width,4)===Yt?It.count=Math.max(It.count,Pt.start+Pt.count-It.start):(++yt,Mt[yt]=Pt)}Mt.length=yt+1;let ut=e.getParameter(r.UNPACK_ROW_LENGTH),dt=e.getParameter(r.UNPACK_SKIP_PIXELS),Rt=e.getParameter(r.UNPACK_SKIP_ROWS);e.pixelStorei(r.UNPACK_ROW_LENGTH,v.width);for(let kt=0,It=Mt.length;kt<It;kt++){let Pt=Mt[kt],bt=Math.floor(Pt.start/4),Yt=Math.ceil(Pt.count/4),Qt=bt%v.width,Z=Math.floor(bt/v.width),wt=Yt,pt=1;e.pixelStorei(r.UNPACK_SKIP_PIXELS,Qt),e.pixelStorei(r.UNPACK_SKIP_ROWS,Z),e.texSubImage2D(r.TEXTURE_2D,0,Qt,Z,wt,pt,q,tt,v.data)}D.clearUpdateRanges(),e.pixelStorei(r.UNPACK_ROW_LENGTH,ut),e.pixelStorei(r.UNPACK_SKIP_PIXELS,dt),e.pixelStorei(r.UNPACK_SKIP_ROWS,Rt)}}function U(D,v,q){let tt=r.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(tt=r.TEXTURE_2D_ARRAY),v.isData3DTexture&&(tt=r.TEXTURE_3D);let ct=qt(D,v),Mt=v.source;e.bindTexture(tt,D.__webglTexture,r.TEXTURE0+q);let yt=n.get(Mt);if(Mt.version!==yt.__version||ct===!0){if(e.activeTexture(r.TEXTURE0+q),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let pt=fe.getPrimaries(fe.workingColorSpace),Lt=v.colorSpace===pr?null:fe.getPrimaries(v.colorSpace),Nt=v.colorSpace===pr||pt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt)}e.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment);let dt=m(v.image,!1,i.maxTextureSize);dt=Ct(v,dt);let Rt=s.convert(v.format,v.colorSpace),kt=s.convert(v.type),It=x(v.internalFormat,Rt,kt,v.normalized,v.colorSpace,v.isVideoTexture);Ut(tt,v);let Pt,bt=v.mipmaps,Yt=v.isVideoTexture!==!0,Qt=yt.__version===void 0||ct===!0,Z=Mt.dataReady,wt=T(v,dt);if(v.isDepthTexture)It=M(v.format===Gr,v.type),Qt&&(Yt?e.texStorage2D(r.TEXTURE_2D,1,It,dt.width,dt.height):e.texImage2D(r.TEXTURE_2D,0,It,dt.width,dt.height,0,Rt,kt,null));else if(v.isDataTexture)if(bt.length>0){Yt&&Qt&&e.texStorage2D(r.TEXTURE_2D,wt,It,bt[0].width,bt[0].height);for(let pt=0,Lt=bt.length;pt<Lt;pt++)Pt=bt[pt],Yt?Z&&e.texSubImage2D(r.TEXTURE_2D,pt,0,0,Pt.width,Pt.height,Rt,kt,Pt.data):e.texImage2D(r.TEXTURE_2D,pt,It,Pt.width,Pt.height,0,Rt,kt,Pt.data);v.generateMipmaps=!1}else Yt?(Qt&&e.texStorage2D(r.TEXTURE_2D,wt,It,dt.width,dt.height),Z&&F(v,dt,Rt,kt)):e.texImage2D(r.TEXTURE_2D,0,It,dt.width,dt.height,0,Rt,kt,dt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Yt&&Qt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,wt,It,bt[0].width,bt[0].height,dt.depth);for(let pt=0,Lt=bt.length;pt<Lt;pt++)if(Pt=bt[pt],v.format!==Si)if(Rt!==null)if(Yt){if(Z)if(v.layerUpdates.size>0){let Nt=Ff(Pt.width,Pt.height,v.format,v.type);for(let gt of v.layerUpdates){let St=Pt.data.subarray(gt*Nt/Pt.data.BYTES_PER_ELEMENT,(gt+1)*Nt/Pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pt,0,0,gt,Pt.width,Pt.height,1,Rt,St)}}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pt,0,0,0,Pt.width,Pt.height,dt.depth,Rt,Pt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pt,It,Pt.width,Pt.height,dt.depth,0,Pt.data,0,0);else jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?Z&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,pt,0,0,0,Pt.width,Pt.height,dt.depth,Rt,kt,Pt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,pt,It,Pt.width,Pt.height,dt.depth,0,Rt,kt,Pt.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Yt&&Qt&&e.texStorage2D(r.TEXTURE_2D,wt,It,bt[0].width,bt[0].height);for(let pt=0,Lt=bt.length;pt<Lt;pt++)Pt=bt[pt],v.format!==Si?Rt!==null?Yt?Z&&e.compressedTexSubImage2D(r.TEXTURE_2D,pt,0,0,Pt.width,Pt.height,Rt,Pt.data):e.compressedTexImage2D(r.TEXTURE_2D,pt,It,Pt.width,Pt.height,0,Pt.data):jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?Z&&e.texSubImage2D(r.TEXTURE_2D,pt,0,0,Pt.width,Pt.height,Rt,kt,Pt.data):e.texImage2D(r.TEXTURE_2D,pt,It,Pt.width,Pt.height,0,Rt,kt,Pt.data)}else if(v.isDataArrayTexture)if(Yt){if(Qt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,wt,It,dt.width,dt.height,dt.depth),Z)if(v.layerUpdates.size>0){let pt=Ff(dt.width,dt.height,v.format,v.type);for(let Lt of v.layerUpdates){let Nt=dt.data.subarray(Lt*pt/dt.data.BYTES_PER_ELEMENT,(Lt+1)*pt/dt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Lt,dt.width,dt.height,1,Rt,kt,Nt)}v.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,Rt,kt,dt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,It,dt.width,dt.height,dt.depth,0,Rt,kt,dt.data);else if(v.isData3DTexture)Yt?(Qt&&e.texStorage3D(r.TEXTURE_3D,wt,It,dt.width,dt.height,dt.depth),Z&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,Rt,kt,dt.data)):e.texImage3D(r.TEXTURE_3D,0,It,dt.width,dt.height,dt.depth,0,Rt,kt,dt.data);else if(v.isFramebufferTexture){if(Qt)if(Yt)e.texStorage2D(r.TEXTURE_2D,wt,It,dt.width,dt.height);else{let pt=dt.width,Lt=dt.height;for(let Nt=0;Nt<wt;Nt++)e.texImage2D(r.TEXTURE_2D,Nt,It,pt,Lt,0,Rt,kt,null),pt>>=1,Lt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in r){let pt=r.canvas;if(pt.hasAttribute("layoutsubtree")||pt.setAttribute("layoutsubtree","true"),dt.parentNode!==pt){pt.appendChild(dt),d.add(v),pt.onpaint=Lt=>{let Nt=Lt.changedElements;for(let gt of d)Nt.includes(gt.image)&&(gt.needsUpdate=!0)},pt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,dt);else{let Nt=r.RGBA,gt=r.RGBA,St=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Nt,gt,St,dt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(bt.length>0){if(Yt&&Qt){let pt=Tt(bt[0]);e.texStorage2D(r.TEXTURE_2D,wt,It,pt.width,pt.height)}for(let pt=0,Lt=bt.length;pt<Lt;pt++)Pt=bt[pt],Yt?Z&&e.texSubImage2D(r.TEXTURE_2D,pt,0,0,Rt,kt,Pt):e.texImage2D(r.TEXTURE_2D,pt,It,Rt,kt,Pt);v.generateMipmaps=!1}else if(Yt){if(Qt){let pt=Tt(dt);e.texStorage2D(r.TEXTURE_2D,wt,It,pt.width,pt.height)}Z&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Rt,kt,dt)}else e.texImage2D(r.TEXTURE_2D,0,It,Rt,kt,dt);p(v)&&b(tt),yt.__version=Mt.version,v.onUpdate&&v.onUpdate(v)}D.__version=v.version}function N(D,v,q){if(v.image.length!==6)return;let tt=qt(D,v),ct=v.source;e.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+q);let Mt=n.get(ct);if(ct.version!==Mt.__version||tt===!0){e.activeTexture(r.TEXTURE0+q);let yt=fe.getPrimaries(fe.workingColorSpace),ut=v.colorSpace===pr?null:fe.getPrimaries(v.colorSpace),dt=v.colorSpace===pr||yt===ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let Rt=v.isCompressedTexture||v.image[0].isCompressedTexture,kt=v.image[0]&&v.image[0].isDataTexture,It=[];for(let gt=0;gt<6;gt++)!Rt&&!kt?It[gt]=m(v.image[gt],!0,i.maxCubemapSize):It[gt]=kt?v.image[gt].image:v.image[gt],It[gt]=Ct(v,It[gt]);let Pt=It[0],bt=s.convert(v.format,v.colorSpace),Yt=s.convert(v.type),Qt=x(v.internalFormat,bt,Yt,v.normalized,v.colorSpace),Z=v.isVideoTexture!==!0,wt=Mt.__version===void 0||tt===!0,pt=ct.dataReady,Lt=T(v,Pt);Ut(r.TEXTURE_CUBE_MAP,v);let Nt;if(Rt){Z&&wt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,Qt,Pt.width,Pt.height);for(let gt=0;gt<6;gt++){Nt=It[gt].mipmaps;for(let St=0;St<Nt.length;St++){let _t=Nt[St];v.format!==Si?bt!==null?Z?pt&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St,0,0,_t.width,_t.height,bt,_t.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St,Qt,_t.width,_t.height,0,_t.data):jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?pt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St,0,0,_t.width,_t.height,bt,Yt,_t.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St,Qt,_t.width,_t.height,0,bt,Yt,_t.data)}}}else{if(Nt=v.mipmaps,Z&&wt){Nt.length>0&&Lt++;let gt=Tt(It[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,Qt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(kt){Z?pt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,It[gt].width,It[gt].height,bt,Yt,It[gt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Qt,It[gt].width,It[gt].height,0,bt,Yt,It[gt].data);for(let St=0;St<Nt.length;St++){let Jt=Nt[St].image[gt].image;Z?pt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St+1,0,0,Jt.width,Jt.height,bt,Yt,Jt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St+1,Qt,Jt.width,Jt.height,0,bt,Yt,Jt.data)}}else{Z?pt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,bt,Yt,It[gt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Qt,bt,Yt,It[gt]);for(let St=0;St<Nt.length;St++){let _t=Nt[St];Z?pt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St+1,0,0,bt,Yt,_t.image[gt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,St+1,Qt,bt,Yt,_t.image[gt])}}}p(v)&&b(r.TEXTURE_CUBE_MAP),Mt.__version=ct.version,v.onUpdate&&v.onUpdate(v)}D.__version=v.version}function G(D,v,q,tt,ct,Mt){let yt=s.convert(q.format,q.colorSpace),ut=s.convert(q.type),dt=x(q.internalFormat,yt,ut,q.normalized,q.colorSpace),Rt=n.get(v),kt=n.get(q);if(kt.__renderTarget=v,!Rt.__hasExternalTextures){let It=Math.max(1,v.width>>Mt),Pt=Math.max(1,v.height>>Mt);ct===r.TEXTURE_3D||ct===r.TEXTURE_2D_ARRAY?e.texImage3D(ct,Mt,dt,It,Pt,v.depth,0,yt,ut,null):e.texImage2D(ct,Mt,dt,It,Pt,0,yt,ut,null)}e.bindFramebuffer(r.FRAMEBUFFER,D),J(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,tt,ct,kt.__webglTexture,0,ft(v)):(ct===r.TEXTURE_2D||ct>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,tt,ct,kt.__webglTexture,Mt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function it(D,v,q){if(r.bindRenderbuffer(r.RENDERBUFFER,D),v.depthBuffer){let tt=v.depthTexture,ct=tt&&tt.isDepthTexture?tt.type:null,Mt=M(v.stencilBuffer,ct),yt=v.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;J(v)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ft(v),Mt,v.width,v.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ft(v),Mt,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,Mt,v.width,v.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,yt,r.RENDERBUFFER,D)}else{let tt=v.textures;for(let ct=0;ct<tt.length;ct++){let Mt=tt[ct],yt=s.convert(Mt.format,Mt.colorSpace),ut=s.convert(Mt.type),dt=x(Mt.internalFormat,yt,ut,Mt.normalized,Mt.colorSpace);J(v)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ft(v),dt,v.width,v.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ft(v),dt,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,dt,v.width,v.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ht(D,v,q){let tt=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,D),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ct=n.get(v.depthTexture);if(ct.__renderTarget=v,(!ct.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),tt){if(ct.__webglInit===void 0&&(ct.__webglInit=!0,v.depthTexture.addEventListener("dispose",E)),ct.__webglTexture===void 0){ct.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,ct.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,v.depthTexture);let Rt=s.convert(v.depthTexture.format),kt=s.convert(v.depthTexture.type),It;v.depthTexture.format===Wi?It=r.DEPTH_COMPONENT24:v.depthTexture.format===Gr&&(It=r.DEPTH24_STENCIL8);for(let Pt=0;Pt<6;Pt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,It,v.width,v.height,0,Rt,kt,null)}}else X(v.depthTexture,0);let Mt=ct.__webglTexture,yt=ft(v),ut=tt?r.TEXTURE_CUBE_MAP_POSITIVE_X+q:r.TEXTURE_2D,dt=v.depthTexture.format===Gr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(v.depthTexture.format===Wi)J(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,ut,Mt,0,yt):r.framebufferTexture2D(r.FRAMEBUFFER,dt,ut,Mt,0);else if(v.depthTexture.format===Gr)J(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,ut,Mt,0,yt):r.framebufferTexture2D(r.FRAMEBUFFER,dt,ut,Mt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function C(D){let v=n.get(D),q=D.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==D.depthTexture){let tt=D.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),tt){let ct=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,tt.removeEventListener("dispose",ct)};tt.addEventListener("dispose",ct),v.__depthDisposeCallback=ct}v.__boundDepthTexture=tt}if(D.depthTexture&&!v.__autoAllocateDepthBuffer)if(q)for(let tt=0;tt<6;tt++)ht(v.__webglFramebuffer[tt],D,tt);else{let tt=D.texture.mipmaps;tt&&tt.length>0?ht(v.__webglFramebuffer[0],D,0):ht(v.__webglFramebuffer,D,0)}else if(q){v.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[tt]),v.__webglDepthbuffer[tt]===void 0)v.__webglDepthbuffer[tt]=r.createRenderbuffer(),it(v.__webglDepthbuffer[tt],D,!1);else{let ct=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=v.__webglDepthbuffer[tt];r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,ct,r.RENDERBUFFER,Mt)}}else{let tt=D.texture.mipmaps;if(tt&&tt.length>0?e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=r.createRenderbuffer(),it(v.__webglDepthbuffer,D,!1);else{let ct=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=v.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,ct,r.RENDERBUFFER,Mt)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function V(D,v,q){let tt=n.get(D);v!==void 0&&G(tt.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&C(D)}function O(D){let v=D.texture,q=n.get(D),tt=n.get(v);D.addEventListener("dispose",y);let ct=D.textures,Mt=D.isWebGLCubeRenderTarget===!0,yt=ct.length>1;if(yt||(tt.__webglTexture===void 0&&(tt.__webglTexture=r.createTexture()),tt.__version=v.version,a.memory.textures++),Mt){q.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0){q.__webglFramebuffer[ut]=[];for(let dt=0;dt<v.mipmaps.length;dt++)q.__webglFramebuffer[ut][dt]=r.createFramebuffer()}else q.__webglFramebuffer[ut]=r.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){q.__webglFramebuffer=[];for(let ut=0;ut<v.mipmaps.length;ut++)q.__webglFramebuffer[ut]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(yt)for(let ut=0,dt=ct.length;ut<dt;ut++){let Rt=n.get(ct[ut]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=r.createTexture(),a.memory.textures++)}if(D.samples>0&&J(D)===!1){q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ut=0;ut<ct.length;ut++){let dt=ct[ut];q.__webglColorRenderbuffer[ut]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[ut]);let Rt=s.convert(dt.format,dt.colorSpace),kt=s.convert(dt.type),It=x(dt.internalFormat,Rt,kt,dt.normalized,dt.colorSpace,D.isXRRenderTarget===!0),Pt=ft(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,Pt,It,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.RENDERBUFFER,q.__webglColorRenderbuffer[ut])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),it(q.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Mt){e.bindTexture(r.TEXTURE_CUBE_MAP,tt.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,v);for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)G(q.__webglFramebuffer[ut][dt],D,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,dt);else G(q.__webglFramebuffer[ut],D,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);p(v)&&b(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ut=0,dt=ct.length;ut<dt;ut++){let Rt=ct[ut],kt=n.get(Rt),It=r.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(It=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(It,kt.__webglTexture),Ut(It,Rt),G(q.__webglFramebuffer,D,Rt,r.COLOR_ATTACHMENT0+ut,It,0),p(Rt)&&b(It)}e.unbindTexture()}else{let ut=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ut=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ut,tt.__webglTexture),Ut(ut,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)G(q.__webglFramebuffer[dt],D,v,r.COLOR_ATTACHMENT0,ut,dt);else G(q.__webglFramebuffer,D,v,r.COLOR_ATTACHMENT0,ut,0);p(v)&&b(ut),e.unbindTexture()}D.depthBuffer&&C(D)}function I(D){let v=D.textures;for(let q=0,tt=v.length;q<tt;q++){let ct=v[q];if(p(ct)){let Mt=R(D),yt=n.get(ct).__webglTexture;e.bindTexture(Mt,yt),b(Mt),e.unbindTexture()}}}let j=[],lt=[];function mt(D){if(D.samples>0){if(J(D)===!1){let v=D.textures,q=D.width,tt=D.height,ct=r.COLOR_BUFFER_BIT,Mt=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,yt=n.get(D),ut=v.length>1;if(ut)for(let Rt=0;Rt<v.length;Rt++)e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer);let dt=D.texture.mipmaps;dt&&dt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let Rt=0;Rt<v.length;Rt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ct|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ct|=r.STENCIL_BUFFER_BIT)),ut){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,yt.__webglColorRenderbuffer[Rt]);let kt=n.get(v[Rt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,kt,0)}r.blitFramebuffer(0,0,q,tt,0,0,q,tt,ct,r.NEAREST),l===!0&&(j.length=0,lt.length=0,j.push(r.COLOR_ATTACHMENT0+Rt),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(j.push(Mt),lt.push(Mt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,lt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ut)for(let Rt=0;Rt<v.length;Rt++){e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.RENDERBUFFER,yt.__webglColorRenderbuffer[Rt]);let kt=n.get(v[Rt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.TEXTURE_2D,kt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){let v=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[v])}}}function ft(D){return Math.min(i.maxSamples,D.samples)}function J(D){let v=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function S(D){let v=a.render.frame;h.get(D)!==v&&(h.set(D,v),D.update())}function Ct(D,v){let q=D.colorSpace,tt=D.format,ct=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==so&&q!==pr&&(fe.getTransfer(q)===_e?(tt!==Si||ct!==Yn)&&jt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",q)),v}function Tt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=et,this.resetTextureUnits=Q,this.getTextureUnits=z,this.setTextureUnits=Y,this.setTexture2D=X,this.setTexture2DArray=nt,this.setTexture3D=P,this.setTextureCube=at,this.rebindTextures=V,this.setupRenderTarget=O,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=C,this.setupFrameBufferTexture=G,this.useMultisampledRTT=J,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function ib(r,t){function e(n,i=pr){let s,a=fe.getTransfer(i);if(n===Yn)return r.UNSIGNED_BYTE;if(n===Xc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===qc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Af)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ef)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Tf)return r.BYTE;if(n===wf)return r.SHORT;if(n===_a)return r.UNSIGNED_SHORT;if(n===Wc)return r.INT;if(n===Fi)return r.UNSIGNED_INT;if(n===vi)return r.FLOAT;if(n===Oi)return r.HALF_FLOAT;if(n===Cf)return r.ALPHA;if(n===Rf)return r.RGB;if(n===Si)return r.RGBA;if(n===Wi)return r.DEPTH_COMPONENT;if(n===Gr)return r.DEPTH_STENCIL;if(n===Yc)return r.RED;if(n===Zc)return r.RED_INTEGER;if(n===Hr)return r.RG;if(n===Jc)return r.RG_INTEGER;if(n===$c)return r.RGBA_INTEGER;if(n===Wo||n===Xo||n===qo||n===Yo)if(a===_e)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Wo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Wo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Kc||n===Qc||n===jc||n===th)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Kc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===jc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===th)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===eh||n===nh||n===ih||n===rh||n===sh||n===Zo||n===ah)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===eh||n===nh)return a===_e?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ih)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===rh)return s.COMPRESSED_R11_EAC;if(n===sh)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Zo)return s.COMPRESSED_RG11_EAC;if(n===ah)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===oh||n===lh||n===ch||n===hh||n===uh||n===fh||n===dh||n===ph||n===mh||n===gh||n===_h||n===xh||n===yh||n===vh)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===oh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ch)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ph)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_h)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sh||n===Mh||n===bh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Sh)return a===_e?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Th||n===wh||n===Jo||n===Ah)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Th)return s.COMPRESSED_RED_RGTC1_EXT;if(n===wh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ah)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xa?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var rb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,$f=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new vo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ri({vertexShader:rb,fragmentShader:sb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Le(new Po(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Kf=class extends Xi{constructor(t,e){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new $f,p={},b=e.getContextAttributes(),R=null,x=null,M=[],T=[],E=new xt,y=null,w=null,L=new dn;L.viewport=new De;let H=new dn;H.viewport=new De;let k=[L,H],Q=new kc,z=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let F=M[B];return F===void 0&&(F=new sa,M[B]=F),F.getTargetRaySpace()},this.getControllerGrip=function(B){let F=M[B];return F===void 0&&(F=new sa,M[B]=F),F.getGripSpace()},this.getHand=function(B){let F=M[B];return F===void 0&&(F=new sa,M[B]=F),F.getHandSpace()};function et(B){let F=T.indexOf(B.inputSource);if(F===-1)return;let U=M[F];U!==void 0&&(U.update(B.inputSource,B.frame,c||a),U.dispatchEvent({type:B.type,data:B.inputSource}))}function W(){i.removeEventListener("select",et),i.removeEventListener("selectstart",et),i.removeEventListener("selectend",et),i.removeEventListener("squeeze",et),i.removeEventListener("squeezestart",et),i.removeEventListener("squeezeend",et),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",X);for(let B=0;B<M.length;B++){let F=T[B];F!==null&&(T[B]=null,M[B].disconnect(F))}z=null,Y=null,m.reset();for(let B in p)delete p[B];if(t.setRenderTarget(R),f=null,u=null,d=null,i=null,x=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(E.width,E.height,!1),w!==null){let B=w.camera;B.fov=w.fov,B.zoom=w.zoom,B.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){s=B,n.isPresenting===!0&&jt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&jt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(B){if(i=B,i!==null){if(R=t.getRenderTarget(),i.addEventListener("select",et),i.addEventListener("selectstart",et),i.addEventListener("selectend",et),i.addEventListener("squeeze",et),i.addEventListener("squeezestart",et),i.addEventListener("squeezeend",et),i.addEventListener("end",W),i.addEventListener("inputsourceschange",X),b.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(E),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let U=null,N=null,G=null;b.depth&&(G=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,U=b.stencil?Gr:Wi,N=b.stencil?xa:Fi);let it={colorFormat:e.RGBA8,depthFormat:G,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(it),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new qn(u.textureWidth,u.textureHeight,{format:Si,type:Yn,depthTexture:new Nr(u.textureWidth,u.textureHeight,N,void 0,void 0,void 0,void 0,void 0,void 0,U),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let U={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,U),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new qn(f.framebufferWidth,f.framebufferHeight,{format:Si,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),qt.setContext(i),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(B){for(let F=0;F<B.removed.length;F++){let U=B.removed[F],N=T.indexOf(U);N>=0&&(T[N]=null,M[N].disconnect(U))}for(let F=0;F<B.added.length;F++){let U=B.added[F],N=T.indexOf(U);if(N===-1){for(let it=0;it<M.length;it++)if(it>=T.length){T.push(U),N=it;break}else if(T[it]===null){T[it]=U,N=it;break}if(N===-1)break}let G=M[N];G&&G.connect(U)}}let nt=new K,P=new K;function at(B,F,U){nt.setFromMatrixPosition(F.matrixWorld),P.setFromMatrixPosition(U.matrixWorld);let N=nt.distanceTo(P),G=F.projectionMatrix.elements,it=U.projectionMatrix.elements,ht=G[14]/(G[10]-1),C=G[14]/(G[10]+1),V=(G[9]+1)/G[5],O=(G[9]-1)/G[5],I=(G[8]-1)/G[0],j=(it[8]+1)/it[0],lt=ht*I,mt=ht*j,ft=N/(-I+j),J=ft*-I;if(F.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(J),B.translateZ(ft),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),G[10]===-1)B.projectionMatrix.copy(F.projectionMatrix),B.projectionMatrixInverse.copy(F.projectionMatrixInverse);else{let S=ht+ft,Ct=C+ft,Tt=lt-J,D=mt+(N-J),v=V*C/Ct*S,q=O*C/Ct*S;B.projectionMatrix.makePerspective(Tt,D,v,q,S,Ct),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function At(B,F){F===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(F.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(i===null)return;let F=B.near,U=B.far;m.texture!==null&&(m.depthNear>0&&(F=m.depthNear),m.depthFar>0&&(U=m.depthFar)),Q.near=H.near=L.near=F,Q.far=H.far=L.far=U,(z!==Q.near||Y!==Q.far)&&(i.updateRenderState({depthNear:Q.near,depthFar:Q.far}),z=Q.near,Y=Q.far),Q.layers.mask=B.layers.mask|6,L.layers.mask=Q.layers.mask&-5,H.layers.mask=Q.layers.mask&-3;let N=B.parent,G=Q.cameras;At(Q,N);for(let it=0;it<G.length;it++)At(G[it],N);G.length===2?at(Q,L,H):Q.projectionMatrix.copy(L.projectionMatrix),w===null&&B.isPerspectiveCamera&&(w={camera:B,fov:B.fov,zoom:B.zoom}),Et(B,Q,N)};function Et(B,F,U){U===null?B.matrix.copy(F.matrixWorld):(B.matrix.copy(U.matrixWorld),B.matrix.invert(),B.matrix.multiply(F.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(F.projectionMatrix),B.projectionMatrixInverse.copy(F.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=pc*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return Q},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(B){l=B,u!==null&&(u.fixedFoveation=B),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=B)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Q)},this.getCameraTexture=function(B){return p[B]};let Bt=null;function Ut(B,F){if(h=F.getViewerPose(c||a),g=F,h!==null){let U=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let N=!1;U.length!==Q.cameras.length&&(Q.cameras.length=0,N=!0);for(let C=0;C<U.length;C++){let V=U[C],O=null;if(f!==null)O=f.getViewport(V);else{let j=d.getViewSubImage(u,V);O=j.viewport,C===0&&(t.setRenderTargetTextures(x,j.colorTexture,j.depthStencilTexture),t.setRenderTarget(x))}let I=k[C];I===void 0&&(I=new dn,I.layers.enable(C),I.viewport=new De,k[C]=I),I.matrix.fromArray(V.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(V.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(O.x,O.y,O.width,O.height),C===0&&(Q.matrix.copy(I.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),N===!0&&Q.cameras.push(I)}let G=i.enabledFeatures;if(G&&G.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let C=d.getDepthInformation(U[0]);C&&C.isValid&&C.texture&&m.init(C,i.renderState)}if(G&&G.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let C=0;C<U.length;C++){let V=U[C].camera;if(V){let O=p[V];O||(O=new vo,p[V]=O);let I=d.getCameraImage(V);O.sourceTexture=I}}}}for(let U=0;U<M.length;U++){let N=T[U],G=M[U];N!==null&&G!==void 0&&G.update(N,F,c||a)}Bt&&Bt(B,F),F.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:F}),g=null}let qt=new ag;qt.setAnimationLoop(Ut),this.setAnimationLoop=function(B){Bt=B},this.dispose=function(){}}},ab=new Se,fg=new $t;fg.set(-1,0,0,0,1,0,0,0,1);function ob(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Df(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,R,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,R):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===gn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===gn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=t.get(p),R=b.envMap,x=b.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(ab.makeRotationFromEuler(x)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(fg),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,R){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=R*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function lb(r,t,e,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){let T=M.program;n.uniformBlockBinding(x,T)}function c(x,M){let T=i[x.id];T===void 0&&(m(x),T=h(x),i[x.id]=T,x.addEventListener("dispose",b));let E=M.program;n.updateUBOMapping(x,E);let y=t.render.frame;s[x.id]!==y&&(u(x),s[x.id]=y)}function h(x){let M=d();x.__bindingPointIndex=M;let T=r.createBuffer(),E=x.__size,y=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,T),r.bufferData(r.UNIFORM_BUFFER,E,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,T),T}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return te("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let M=i[x.id],T=x.uniforms,E=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let y=0,w=T.length;y<w;y++){let L=T[y];if(Array.isArray(L))for(let H=0,k=L.length;H<k;H++)f(L[H],y,H,E);else f(L,y,0,E)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,M,T,E){if(_(x,M,T,E)===!0){let y=x.__offset,w=x.value;if(Array.isArray(w)){let L=0;for(let H=0;H<w.length;H++){let k=w[H],Q=p(k);g(k,x.__data,L),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(L+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,x.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,y,x.__data)}}function g(x,M,T){typeof x=="number"||typeof x=="boolean"?M[0]=x:x.isMatrix3?(M[0]=x.elements[0],M[1]=x.elements[1],M[2]=x.elements[2],M[3]=0,M[4]=x.elements[3],M[5]=x.elements[4],M[6]=x.elements[5],M[7]=0,M[8]=x.elements[6],M[9]=x.elements[7],M[10]=x.elements[8],M[11]=0):ArrayBuffer.isView(x)?M.set(new x.constructor(x.buffer,x.byteOffset,M.length)):x.toArray(M,T)}function _(x,M,T,E){let y=x.value,w=M+"_"+T;if(E[w]===void 0)return typeof y=="number"||typeof y=="boolean"?E[w]=y:ArrayBuffer.isView(y)?E[w]=y.slice():E[w]=y.clone(),!0;{let L=E[w];if(typeof y=="number"||typeof y=="boolean"){if(L!==y)return E[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(L.equals(y)===!1)return L.copy(y),!0}}return!1}function m(x){let M=x.uniforms,T=0,E=16;for(let w=0,L=M.length;w<L;w++){let H=Array.isArray(M[w])?M[w]:[M[w]];for(let k=0,Q=H.length;k<Q;k++){let z=H[k],Y=Array.isArray(z.value)?z.value:[z.value];for(let et=0,W=Y.length;et<W;et++){let X=Y[et],nt=p(X),P=T%E,at=P%nt.boundary,At=P+at;T+=at,At!==0&&E-At<nt.storage&&(T+=E-At),z.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=T,T+=nt.storage}}}let y=T%E;return y>0&&(T+=E-y),x.__size=T,x.__cache={},this}function p(x){let M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?jt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):jt("WebGLRenderer: Unsupported uniform value type.",x),M}function b(x){let M=x.target;M.removeEventListener("dispose",b);let T=a.indexOf(M.__bindingPointIndex);a.splice(T,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function R(){for(let x in i)r.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:l,update:c,dispose:R}}var cb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ki=null;function hb(){return Ki===null&&(Ki=new po(cb,16,16,Hr,Oi),Ki.name="DFG_LUT",Ki.minFilter=pn,Ki.magFilter=pn,Ki.wrapS=xi,Ki.wrapT=xi,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}var Lh=class{constructor(t={}){let{canvas:e=Em(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Yn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=f,m=new Set([$c,Jc,Zc]),p=new Set([Yn,Fi,_a,xa,Xc,qc]),b=new Uint32Array(4),R=new Int32Array(4),x=new K,M=null,T=null,E=[],y=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,H=!1,k=null,Q=null,z=null,Y=null;this._outputColorSpace=Un;let et=0,W=0,X=null,nt=-1,P=null,at=new De,At=new De,Et=null,Bt=new ee(0),Ut=0,qt=e.width,B=e.height,F=1,U=null,N=null,G=new De(0,0,qt,B),it=new De(0,0,qt,B),ht=!1,C=new aa,V=!1,O=!1,I=new Se,j=new K,lt=new De,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ft=!1;function J(){return X===null?F:1}let S=n;function Ct(A,$){return e.getContext(A,$)}let Tt,D,v,q,tt,ct,Mt,yt,ut,dt,Rt,kt,It,Pt,bt,Yt,Qt,Z,wt,pt,Lt,Nt,gt;try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Jt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",Kt,!1),S===null){let $="webgl2";if(S=Ct($,A),S===null)throw Ct($)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}St()}catch(A){throw e.removeEventListener("webglcontextlost",Jt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",Kt,!1),te("WebGLRenderer: "+A.message),A}function St(){Tt=new _S(S),Tt.init(),Lt=new ib(S,Tt),D=new oS(S,Tt,t,Lt),v=new eb(S,Tt),D.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),Q=S.createFramebuffer(),z=S.createFramebuffer(),Y=S.createFramebuffer(),q=new vS(S),tt=new VM,ct=new nb(S,Tt,v,tt,D,Lt,q),Mt=new gS(L),yt=new Mx(S),Nt=new sS(S,yt),ut=new xS(S,yt,q,Nt),dt=new MS(S,ut,yt,Nt,q),Z=new SS(S,D,ct),bt=new lS(tt),Rt=new zM(L,Mt,Tt,D,Nt,bt),kt=new ob(L,tt),It=new HM,Pt=new JM(Tt),Qt=new rS(L,Mt,v,dt,g,l),Yt=new tb(L,dt,D),gt=new lb(S,q,D,v),wt=new aS(S,Tt,q),pt=new yS(S,Tt,q),q.programs=Rt.programs,L.capabilities=D,L.extensions=Tt,L.properties=tt,L.renderLists=It,L.shadowMap=Yt,L.state=v,L.info=q}_!==Yn&&(w=new TS(_,e.width,e.height,o,i,s));let _t=new Kf(L,S);this.xr=_t,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let A=Tt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Tt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(A){A!==void 0&&(F=A,this.setSize(qt,B,!1))},this.getSize=function(A){return A.set(qt,B)},this.setSize=function(A,$,ot=!0){if(_t.isPresenting){jt("WebGLRenderer: Can't change size while VR device is presenting.");return}qt=A,B=$,e.width=Math.floor(A*F),e.height=Math.floor($*F),ot===!0&&(e.style.width=A+"px",e.style.height=$+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,A,$)},this.getDrawingBufferSize=function(A){return A.set(qt*F,B*F).floor()},this.setDrawingBufferSize=function(A,$,ot){qt=A,B=$,F=ot,e.width=Math.floor(A*ot),e.height=Math.floor($*ot),this.setViewport(0,0,A,$)},this.setEffects=function(A){if(_===Yn){te("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let $=0;$<A.length;$++)if(A[$].isOutputPass===!0){jt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(at)},this.getViewport=function(A){return A.copy(G)},this.setViewport=function(A,$,ot,rt){A.isVector4?G.set(A.x,A.y,A.z,A.w):G.set(A,$,ot,rt),v.viewport(at.copy(G).multiplyScalar(F).round())},this.getScissor=function(A){return A.copy(it)},this.setScissor=function(A,$,ot,rt){A.isVector4?it.set(A.x,A.y,A.z,A.w):it.set(A,$,ot,rt),v.scissor(At.copy(it).multiplyScalar(F).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(A){v.setScissorTest(ht=A)},this.setOpaqueSort=function(A){U=A},this.setTransparentSort=function(A){N=A},this.getClearColor=function(A){return A.copy(Qt.getClearColor())},this.setClearColor=function(){Qt.setClearColor(...arguments)},this.getClearAlpha=function(){return Qt.getClearAlpha()},this.setClearAlpha=function(){Qt.setClearAlpha(...arguments)},this.clear=function(A=!0,$=!0,ot=!0){let rt=0;if(A){let st=!1;if(X!==null){let Dt=X.texture.format;st=m.has(Dt)}if(st){let Dt=X.texture.type,Vt=p.has(Dt),Ot=Qt.getClearColor(),Wt=Qt.getClearAlpha(),Zt=Ot.r,ie=Ot.g,ue=Ot.b;Vt?(b[0]=Zt,b[1]=ie,b[2]=ue,b[3]=Wt,S.clearBufferuiv(S.COLOR,0,b)):(R[0]=Zt,R[1]=ie,R[2]=ue,R[3]=Wt,S.clearBufferiv(S.COLOR,0,R))}else rt|=S.COLOR_BUFFER_BIT}$&&(rt|=S.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ot&&(rt|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),rt!==0&&S.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),k=A},this.dispose=function(){e.removeEventListener("webglcontextlost",Jt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",Kt,!1),Qt.dispose(),It.dispose(),Pt.dispose(),tt.dispose(),Mt.dispose(),dt.dispose(),Nt.dispose(),gt.dispose(),Rt.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Re),_t.removeEventListener("sessionend",Me),de.stop()};function Jt(A){A.preventDefault(),If("WebGLRenderer: Context Lost."),H=!0}function vt(){If("WebGLRenderer: Context Restored."),H=!1;let A=q.autoReset,$=Yt.enabled,ot=Yt.autoUpdate,rt=Yt.needsUpdate,st=Yt.type;St(),q.autoReset=A,Yt.enabled=$,Yt.autoUpdate=ot,Yt.needsUpdate=rt,Yt.type=st}function Kt(A){te("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ht(A){let $=A.target;$.removeEventListener("dispose",Ht),ne($)}function ne(A){Ye(A),tt.remove(A)}function Ye(A){let $=tt.get(A).programs;$!==void 0&&($.forEach(function(ot){Rt.releaseProgram(ot)}),A.isShaderMaterial&&Rt.releaseShaderCache(A))}this.renderBufferDirect=function(A,$,ot,rt,st,Dt){$===null&&($=mt);let Vt=st.isMesh&&st.matrixWorld.determinantAffine()<0,Ot=on(A,$,ot,rt,st);v.setMaterial(rt,Vt);let Wt=ot.index,Zt=1;if(rt.wireframe===!0){if(Wt=ut.getWireframeAttribute(ot),Wt===void 0)return;Zt=2}let ie=ot.drawRange,ue=ot.attributes.position,Xt=ie.start*Zt,ge=(ie.start+ie.count)*Zt;Dt!==null&&(Xt=Math.max(Xt,Dt.start*Zt),ge=Math.min(ge,(Dt.start+Dt.count)*Zt)),Wt!==null?(Xt=Math.max(Xt,0),ge=Math.min(ge,Wt.count)):ue!=null&&(Xt=Math.max(Xt,0),ge=Math.min(ge,ue.count));let Je=ge-Xt;if(Je<0||Je===1/0)return;Nt.setup(st,rt,Ot,ot,Wt);let Pe,be=wt;if(Wt!==null&&(Pe=yt.get(Wt),be=pt,be.setIndex(Pe)),st.isMesh)rt.wireframe===!0?(v.setLineWidth(rt.wireframeLinewidth*J()),be.setMode(S.LINES)):be.setMode(S.TRIANGLES);else if(st.isLine){let Sn=rt.linewidth;Sn===void 0&&(Sn=1),v.setLineWidth(Sn*J()),st.isLineSegments?be.setMode(S.LINES):st.isLineLoop?be.setMode(S.LINE_LOOP):be.setMode(S.LINE_STRIP)}else st.isPoints?be.setMode(S.POINTS):st.isSprite&&be.setMode(S.TRIANGLES);if(st.isBatchedMesh)if(Tt.get("WEBGL_multi_draw"))be.renderMultiDraw(st._multiDrawStarts,st._multiDrawCounts,st._multiDrawCount);else{let Sn=st._multiDrawStarts,zt=st._multiDrawCounts,Nn=st._multiDrawCount,me=Wt?yt.get(Wt).bytesPerElement:1,gi=tt.get(rt).currentProgram.getUniforms();for(let Vi=0;Vi<Nn;Vi++)gi.setValue(S,"_gl_DrawID",Vi),be.render(Sn[Vi]/me,zt[Vi])}else if(st.isInstancedMesh)be.renderInstances(Xt,Je,st.count);else if(ot.isInstancedBufferGeometry){let Sn=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,zt=Math.min(ot.instanceCount,Sn);be.renderInstances(Xt,Je,zt)}else be.render(Xt,Je)};function le(A,$,ot,rt){k!==null&&A.isNodeMaterial&&k.setObject(rt,A),V===!0&&bt.setState(A,ot,!1),A.transparent===!0&&A.side===ai&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,ke(A,$,rt),A.side=kr,A.needsUpdate=!0,ke(A,$,rt),A.side=ai):ke(A,$,rt)}this.compile=function(A,$,ot=null){ot===null&&(ot=A),k!==null&&k.renderStart(A,$,ot),T=Pt.get(ot),T.init($),y.push(T),ot.traverseVisible(function(st){st.isLight&&st.layers.test($.layers)&&(T.pushLight(st),st.castShadow&&T.pushShadow(st))}),A!==ot&&A.traverseVisible(function(st){st.isLight&&st.layers.test($.layers)&&(T.pushLight(st),st.castShadow&&T.pushShadow(st))}),T.setupLights(),k!==null&&k.updateLights(T.state.lightsArray),O=this.localClippingEnabled,V=bt.init(this.clippingPlanes,O),V===!0&&bt.setGlobalState(this.clippingPlanes,$),k!==null&&Yt.render(T.state.shadowsArray,ot,$);let rt=new Set;return A.traverse(function(st){if(!(st.isMesh||st.isPoints||st.isLine||st.isSprite))return;let Dt=st.material;if(Dt)if(Array.isArray(Dt))for(let Vt=0;Vt<Dt.length;Vt++){let Ot=Dt[Vt];le(Ot,ot,$,st),rt.add(Ot)}else le(Dt,ot,$,st),rt.add(Dt)}),T=y.pop(),k!==null&&k.renderEnd(),rt},this.compileAsync=function(A,$,ot=null){let rt=this.compile(A,$,ot);return new Promise(st=>{function Dt(){if(rt.forEach(function(Vt){let Wt=tt.get(Vt).currentProgram;(Wt===void 0||Wt.isReady())&&rt.delete(Vt)}),rt.size===0){st(A);return}setTimeout(Dt,10)}Tt.get("KHR_parallel_shader_compile")!==null?Dt():setTimeout(Dt,10)})};let Ce=null;function an(A){Ce&&Ce(A)}function Re(){de.stop()}function Me(){de.start()}let de=new ag;de.setAnimationLoop(an),typeof self<"u"&&de.setContext(self),this.setAnimationLoop=function(A){Ce=A,_t.setAnimationLoop(A),A===null?de.stop():de.start()},_t.addEventListener("sessionstart",Re),_t.addEventListener("sessionend",Me),this.render=function(A,$){if($!==void 0&&$.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;k!==null&&k.renderStart(A,$);let ot=_t.enabled===!0&&_t.isPresenting===!0,rt=w!==null&&(X===null||ot)&&w.begin(L,X);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(_t.cameraAutoUpdate===!0&&_t.updateCamera($),$=_t.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,$,X),T=Pt.get(A,y.length),T.init($),T.state.textureUnits=ct.getTextureUnits(),y.push(T),I.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),C.setFromProjectionMatrix(I,Li,$.reversedDepth),O=this.localClippingEnabled,V=bt.init(this.clippingPlanes,O),M=It.get(A,E.length),M.init(),E.push(M),_t.enabled===!0&&_t.isPresenting===!0){let Vt=L.xr.getDepthSensingMesh();Vt!==null&&Ln(Vt,$,-1/0,L.sortObjects)}Ln(A,$,0,L.sortObjects),M.finish(),k!==null&&k.updateLights(T.state.lightsArray),L.sortObjects===!0&&M.sort(U,N),ft=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,ft&&Qt.addToRenderList(M,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),V===!0&&bt.beginShadows();let st=T.state.shadowsArray;if(Yt.render(st,A,$),V===!0&&bt.endShadows(),(rt&&w.hasRenderPass())===!1){let Vt=M.opaque,Ot=M.transmissive;if(T.setupLights(),$.isArrayCamera){let Wt=$.cameras;if(Ot.length>0)for(let Zt=0,ie=Wt.length;Zt<ie;Zt++){let ue=Wt[Zt];vn(Vt,Ot,A,ue)}ft&&Qt.render(A);for(let Zt=0,ie=Wt.length;Zt<ie;Zt++){let ue=Wt[Zt];Ae(M,A,ue,ue.viewport)}}else Ot.length>0&&vn(Vt,Ot,A,$),ft&&Qt.render(A),Ae(M,A,$)}X!==null&&W===0&&(ct.updateMultisampleRenderTarget(X),ct.updateRenderTargetMipmap(X)),rt&&w.end(L),A.isScene===!0&&A.onAfterRender(L,A,$),Nt.resetDefaultState(),nt=-1,P=null,y.pop(),y.length>0?(T=y[y.length-1],ct.setTextureUnits(T.state.textureUnits),V===!0&&bt.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,E.pop(),E.length>0?M=E[E.length-1]:M=null,k!==null&&k.renderEnd()};function Ln(A,$,ot,rt){if(A.visible===!1)return;if(A.layers.test($.layers)){if(A.isGroup)ot=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update($);else if(A.isLightProbeGrid)T.pushLightProbeGrid(A);else if(A.isLight)T.pushLight(A),A.castShadow&&T.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(C)){rt&&lt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(I);let Vt=dt.update(A),Ot=A.material;Ot.visible&&M.push(A,Vt,Ot,ot,lt.z,null,$)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(C))){let Vt=dt.update(A),Ot=A.material;if(rt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),lt.copy(A.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),lt.copy(Vt.boundingSphere.center)),lt.applyMatrix4(A.matrixWorld).applyMatrix4(I)),Array.isArray(Ot)){let Wt=Vt.groups;for(let Zt=0,ie=Wt.length;Zt<ie;Zt++){let ue=Wt[Zt],Xt=Ot[ue.materialIndex];Xt&&Xt.visible&&M.push(A,Vt,Xt,ot,lt.z,ue,$)}}else Ot.visible&&M.push(A,Vt,Ot,ot,lt.z,null,$)}}let Dt=A.children;for(let Vt=0,Ot=Dt.length;Vt<Ot;Vt++)Ln(Dt[Vt],$,ot,rt)}function Ae(A,$,ot,rt){let{opaque:st,transmissive:Dt,transparent:Vt}=A;T.setupLightsView(ot),V===!0&&bt.setGlobalState(L.clippingPlanes,ot),rt&&v.viewport(at.copy(rt)),st.length>0&&Dn(st,$,ot),Dt.length>0&&Dn(Dt,$,ot),Vt.length>0&&Dn(Vt,$,ot),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function vn(A,$,ot,rt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[rt.id]===void 0){let Xt=Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[rt.id]=new qn(1,1,{generateMipmaps:!0,type:Xt?Oi:Yn,minFilter:Vr,samples:Math.max(4,D.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:fe.workingColorSpace})}let Dt=T.state.transmissionRenderTarget[rt.id],Vt=rt.viewport||at;Dt.setSize(Vt.z*L.transmissionResolutionScale,Vt.w*L.transmissionResolutionScale);let Ot=L.getRenderTarget(),Wt=L.getActiveCubeFace(),Zt=L.getActiveMipmapLevel();L.setRenderTarget(Dt),L.getClearColor(Bt),Ut=L.getClearAlpha(),Ut<1&&L.setClearColor(16777215,.5),L.clear(),ft&&Qt.render(ot);let ie=L.toneMapping;L.toneMapping=Ui;let ue=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),T.setupLightsView(rt),V===!0&&bt.setGlobalState(L.clippingPlanes,rt),Dn(A,ot,rt),ct.updateMultisampleRenderTarget(Dt),ct.updateRenderTargetMipmap(Dt),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let ge=0,Je=$.length;ge<Je;ge++){let Pe=$[ge],{object:be,geometry:Sn,material:zt,group:Nn}=Pe;if(zt.side===ai&&be.layers.test(rt.layers)){let me=zt.side;zt.side=gn,zt.needsUpdate=!0,Ze(be,ot,rt,Sn,zt,Nn),zt.side=me,zt.needsUpdate=!0,Xt=!0}}Xt===!0&&(ct.updateMultisampleRenderTarget(Dt),ct.updateRenderTargetMipmap(Dt))}L.setRenderTarget(Ot,Wt,Zt),L.setClearColor(Bt,Ut),ue!==void 0&&(rt.viewport=ue),L.toneMapping=ie}function Dn(A,$,ot){let rt=$.isScene===!0?$.overrideMaterial:null;for(let st=0,Dt=A.length;st<Dt;st++){let Vt=A[st],{object:Ot,geometry:Wt,group:Zt}=Vt,ie=Vt.material;ie.allowOverride===!0&&rt!==null&&(ie=rt),Ot.layers.test(ot.layers)&&Ze(Ot,$,ot,Wt,ie,Zt)}}function Ze(A,$,ot,rt,st,Dt){k!==null&&st.isNodeMaterial&&k.setObject(A,st),A.onBeforeRender(L,$,ot,rt,st,Dt),A.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),st.onBeforeRender(L,$,ot,rt,A,Dt),st.transparent===!0&&st.side===ai&&st.forceSinglePass===!1?(st.side=gn,st.needsUpdate=!0,L.renderBufferDirect(ot,$,rt,st,A,Dt),st.side=kr,st.needsUpdate=!0,L.renderBufferDirect(ot,$,rt,st,A,Dt),st.side=ai):L.renderBufferDirect(ot,$,rt,st,A,Dt),A.onAfterRender(L,$,ot,rt,st,Dt)}function ke(A,$,ot){$.isScene!==!0&&($=mt);let rt=tt.get(A),st=T.state.lights,Dt=T.state.shadowsArray,Vt=st.state.version,Ot=Rt.getParameters(A,st.state,Dt,$,ot,T.state.lightProbeGridArray),Wt=Rt.getProgramCacheKey(Ot),Zt=rt.programs;rt.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?$.environment:null,rt.fog=$.fog;let ie=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;rt.envMap=Mt.get(A.envMap||rt.environment,ie),rt.envMapRotation=rt.environment!==null&&A.envMap===null?$.environmentRotation:A.envMapRotation,Zt===void 0&&(A.addEventListener("dispose",Ht),Zt=new Map,rt.programs=Zt);let ue=Zt.get(Wt);if(ue!==void 0){if(rt.currentProgram===ue&&rt.lightsStateVersion===Vt)return zi(A,Ot),ue}else Ot.uniforms=Rt.getUniforms(A),k!==null&&A.isNodeMaterial&&k.build(A,ot,Ot),A.onBeforeCompile(Ot,L),ue=Rt.acquireProgram(Ot,Wt),Zt.set(Wt,ue),rt.uniforms=Ot.uniforms;let Xt=rt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Xt.clippingPlanes=bt.uniform),zi(A,Ot),rt.needsLights=mi(A),rt.lightsStateVersion=Vt,rt.needsLights&&(Xt.ambientLightColor.value=st.state.ambient,Xt.lightProbe.value=st.state.probe,Xt.sunLights.value=st.state.sun,Xt.sunLightShadows.value=st.state.sunShadow,Xt.directionalLights.value=st.state.directional,Xt.directionalLightShadows.value=st.state.directionalShadow,Xt.spotLights.value=st.state.spot,Xt.spotLightShadows.value=st.state.spotShadow,Xt.rectAreaLights.value=st.state.rectArea,Xt.ltc_1.value=st.state.rectAreaLTC1,Xt.ltc_2.value=st.state.rectAreaLTC2,Xt.pointLights.value=st.state.point,Xt.pointLightShadows.value=st.state.pointShadow,Xt.hemisphereLights.value=st.state.hemi,Xt.sunShadowMatrix.value=st.state.sunShadowMatrix,Xt.sunShadowCascade.value=st.state.sunShadowCascade,Xt.directionalShadowMatrix.value=st.state.directionalShadowMatrix,Xt.spotLightMatrix.value=st.state.spotLightMatrix,Xt.spotLightMap.value=st.state.spotLightMap,Xt.pointShadowMatrix.value=st.state.pointShadowMatrix),rt.lightProbeGrid=T.state.lightProbeGridArray.length>0,rt.currentProgram=ue,rt.uniformsList=null,ue}function je(A){if(A.uniformsList===null){let $=A.currentProgram.getUniforms();A.uniformsList=Ma.seqWithValue($.seq,A.uniforms)}return A.uniformsList}function zi(A,$){let ot=tt.get(A);ot.outputColorSpace=$.outputColorSpace,ot.batching=$.batching,ot.batchingColor=$.batchingColor,ot.instancing=$.instancing,ot.instancingColor=$.instancingColor,ot.instancingMorph=$.instancingMorph,ot.skinning=$.skinning,ot.morphTargets=$.morphTargets,ot.morphNormals=$.morphNormals,ot.morphColors=$.morphColors,ot.morphTargetsCount=$.morphTargetsCount,ot.numClippingPlanes=$.numClippingPlanes,ot.numIntersection=$.numClipIntersection,ot.vertexAlphas=$.vertexAlphas,ot.vertexTangents=$.vertexTangents,ot.toneMapping=$.toneMapping}function Ns(A,$){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition($.matrixWorld);for(let ot=0,rt=A.length;ot<rt;ot++){let st=A[ot];if(st.texture!==null&&st.boundingBox.containsPoint(x))return st}return null}function on(A,$,ot,rt,st){$.isScene!==!0&&($=mt),ct.resetTextureUnits();let Dt=$.fog,Vt=rt.isMeshStandardMaterial||rt.isMeshLambertMaterial||rt.isMeshPhongMaterial?$.environment:null,Ot=X===null?L.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:fe.workingColorSpace,Wt=rt.isMeshStandardMaterial||rt.isMeshLambertMaterial&&!rt.envMap||rt.isMeshPhongMaterial&&!rt.envMap,Zt=Mt.get(rt.envMap||Vt,Wt),ie=rt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,ue=!!ot.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),Xt=!!ot.morphAttributes.position,ge=!!ot.morphAttributes.normal,Je=!!ot.morphAttributes.color,Pe=Ui;rt.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Pe=L.toneMapping);let be=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Sn=be!==void 0?be.length:0,zt=tt.get(rt),Nn=T.state.lights;if(V===!0&&(O===!0||A!==P)){let Ee=A===P&&rt.id===nt;bt.setState(rt,A,Ee)}let me=!1;rt.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==Nn.state.version||zt.outputColorSpace!==Ot||st.isBatchedMesh&&zt.batching===!1||!st.isBatchedMesh&&zt.batching===!0||st.isBatchedMesh&&zt.batchingColor===!0&&st._colorsTexture===null||st.isBatchedMesh&&zt.batchingColor===!1&&st._colorsTexture!==null||st.isInstancedMesh&&zt.instancing===!1||!st.isInstancedMesh&&zt.instancing===!0||st.isSkinnedMesh&&zt.skinning===!1||!st.isSkinnedMesh&&zt.skinning===!0||st.isInstancedMesh&&zt.instancingColor===!0&&st.instanceColor===null||st.isInstancedMesh&&zt.instancingColor===!1&&st.instanceColor!==null||st.isInstancedMesh&&zt.instancingMorph===!0&&st.morphTexture===null||st.isInstancedMesh&&zt.instancingMorph===!1&&st.morphTexture!==null||zt.envMap!==Zt||rt.fog===!0&&zt.fog!==Dt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==bt.numPlanes||zt.numIntersection!==bt.numIntersection)||zt.vertexAlphas!==ie||zt.vertexTangents!==ue||zt.morphTargets!==Xt||zt.morphNormals!==ge||zt.morphColors!==Je||zt.toneMapping!==Pe||zt.morphTargetsCount!==Sn||!!zt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(me=!0):(me=!0,zt.__version=rt.version);let gi=zt.currentProgram;me===!0&&(gi=ke(rt,$,st),k&&rt.isNodeMaterial&&k.onUpdateProgram(rt,gi,zt));let Vi=!1,wr=!1,Fs=!1,ve=gi.getUniforms(),Xe=zt.uniforms;if(v.useProgram(gi.program)&&(Vi=!0,wr=!0,Fs=!0),rt.id!==nt&&(nt=rt.id,wr=!0),zt.needsLights){let Ee=Ns(T.state.lightProbeGridArray,st);zt.lightProbeGrid!==Ee&&(zt.lightProbeGrid=Ee,wr=!0)}if(Vi||P!==A){v.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ve.setValue(S,"projectionMatrix",A.projectionMatrix),ve.setValue(S,"viewMatrix",A.matrixWorldInverse);let Er=ve.map.cameraPosition;Er!==void 0&&Er.setValue(S,j.setFromMatrixPosition(A.matrixWorld)),D.logarithmicDepthBuffer&&ve.setValue(S,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&ve.setValue(S,"isOrthographic",A.isOrthographicCamera===!0),P!==A&&(P=A,wr=!0,Fs=!0)}if(zt.needsLights&&(Nn.state.sunShadowMap.length>0&&ve.setValue(S,"sunShadowMap",Nn.state.sunShadowMap,ct),Nn.state.directionalShadowMap.length>0&&ve.setValue(S,"directionalShadowMap",Nn.state.directionalShadowMap,ct),Nn.state.spotShadowMap.length>0&&ve.setValue(S,"spotShadowMap",Nn.state.spotShadowMap,ct),Nn.state.pointShadowMap.length>0&&ve.setValue(S,"pointShadowMap",Nn.state.pointShadowMap,ct)),st.isSkinnedMesh){ve.setOptional(S,st,"bindMatrix"),ve.setOptional(S,st,"bindMatrixInverse");let Ee=st.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),ve.setValue(S,"boneTexture",Ee.boneTexture,ct))}st.isBatchedMesh&&(ve.setOptional(S,st,"batchingTexture"),ve.setValue(S,"batchingTexture",st._matricesTexture,ct),ve.setOptional(S,st,"batchingIdTexture"),ve.setValue(S,"batchingIdTexture",st._indirectTexture,ct),ve.setOptional(S,st,"batchingColorTexture"),st._colorsTexture!==null&&ve.setValue(S,"batchingColorTexture",st._colorsTexture,ct));let Ar=ot.morphAttributes;if((Ar.position!==void 0||Ar.normal!==void 0||Ar.color!==void 0)&&Z.update(st,ot,gi),(wr||zt.receiveShadow!==st.receiveShadow)&&(zt.receiveShadow=st.receiveShadow,ve.setValue(S,"receiveShadow",st.receiveShadow)),(rt.isMeshStandardMaterial||rt.isMeshLambertMaterial||rt.isMeshPhongMaterial)&&rt.envMap===null&&$.environment!==null&&(Xe.envMapIntensity.value=$.environmentIntensity),Xe.dfgLUT!==void 0&&(Xe.dfgLUT.value=hb()),wr){if(ve.setValue(S,"toneMappingExposure",L.toneMappingExposure),zt.needsLights&&We(Xe,Fs),Dt&&rt.fog===!0&&kt.refreshFogUniforms(Xe,Dt),kt.refreshMaterialUniforms(Xe,rt,F,B,T.state.transmissionRenderTarget[A.id]),zt.needsLights&&zt.lightProbeGrid){let Ee=zt.lightProbeGrid;Xe.probesSH.value=Ee.texture,Xe.probesMin.value.copy(Ee.boundingBox.min),Xe.probesMax.value.copy(Ee.boundingBox.max),Xe.probesResolution.value.copy(Ee.resolution)}Ma.upload(S,je(zt),Xe,ct)}if(rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Ma.upload(S,je(zt),Xe,ct),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&ve.setValue(S,"center",st.center),ve.setValue(S,"modelViewMatrix",st.modelViewMatrix),ve.setValue(S,"normalMatrix",st.normalMatrix),ve.setValue(S,"modelMatrix",st.matrixWorld),rt.uniformsGroups!==void 0){let Ee=rt.uniformsGroups;for(let Er=0,Os=Ee.length;Er<Os;Er++){let dp=Ee[Er];gt.update(dp,gi),gt.bind(dp,gi)}}return gi}function We(A,$){A.ambientLightColor.needsUpdate=$,A.lightProbe.needsUpdate=$,A.sunLights.needsUpdate=$,A.sunLightShadows.needsUpdate=$,A.directionalLights.needsUpdate=$,A.directionalLightShadows.needsUpdate=$,A.pointLights.needsUpdate=$,A.pointLightShadows.needsUpdate=$,A.spotLights.needsUpdate=$,A.spotLightShadows.needsUpdate=$,A.rectAreaLights.needsUpdate=$,A.hemisphereLights.needsUpdate=$}function mi(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return et},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(A,$,ot){let rt=tt.get(A);rt.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,rt.__autoAllocateDepthBuffer===!1&&(rt.__useRenderToTexture=!1),tt.get(A.texture).__webglTexture=$,tt.get(A.depthTexture).__webglTexture=rt.__autoAllocateDepthBuffer?void 0:ot,rt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,$){let ot=tt.get(A);ot.__webglFramebuffer=$,ot.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(A,$=0,ot=0){X=A,et=$,W=ot;let rt=null,st=!1,Dt=!1;if(A){let Ot=tt.get(A);if(Ot.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(S.FRAMEBUFFER,Ot.__webglFramebuffer),at.copy(A.viewport),At.copy(A.scissor),Et=A.scissorTest,v.viewport(at),v.scissor(At),v.setScissorTest(Et),nt=-1;return}else if(Ot.__webglFramebuffer===void 0)ct.setupRenderTarget(A);else if(Ot.__hasExternalTextures)ct.rebindTextures(A,tt.get(A.texture).__webglTexture,tt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let ie=A.depthTexture;if(Ot.__boundDepthTexture!==ie){if(ie!==null&&tt.has(ie)&&(A.width!==ie.image.width||A.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ct.setupDepthRenderbuffer(A)}}let Wt=A.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(Dt=!0);let Zt=tt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Zt[$])?rt=Zt[$][ot]:rt=Zt[$],st=!0):A.samples>0&&ct.useMultisampledRTT(A)===!1?rt=tt.get(A).__webglMultisampledFramebuffer:Array.isArray(Zt)?rt=Zt[ot]:rt=Zt,at.copy(A.viewport),At.copy(A.scissor),Et=A.scissorTest}else at.copy(G).multiplyScalar(F).floor(),At.copy(it).multiplyScalar(F).floor(),Et=ht;if(ot!==0&&(rt=Q),v.bindFramebuffer(S.FRAMEBUFFER,rt)&&v.drawBuffers(A,rt),v.viewport(at),v.scissor(At),v.setScissorTest(Et),st){let Ot=tt.get(A.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ot.__webglTexture,ot)}else if(Dt){let Ot=$;for(let Wt=0;Wt<A.textures.length;Wt++){let Zt=tt.get(A.textures[Wt]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+Wt,Zt.__webglTexture,ot,Ot)}}else if(A!==null&&ot!==0){let Ot=tt.get(A.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ot.__webglTexture,ot)}nt=-1};function Us(A){let $=tt.get(A);return($.__readFormat!==A.format||$.__readType!==A.type)&&($.__readFormat=A.format,$.__readType=A.type,$.__formatReadable=D.textureFormatReadable(A.format),$.__typeReadable=D.textureTypeReadable(A.type)),$}this.readRenderTargetPixels=function(A,$,ot,rt,st,Dt,Vt,Ot=0){if(!(A&&A.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Wt=tt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Vt!==void 0&&(Wt=Wt[Vt]),Wt){v.bindFramebuffer(S.FRAMEBUFFER,Wt);try{let Zt=A.textures[Ot],ie=Zt.format,ue=Zt.type;A.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+Ot);let Xt=Us(Zt);if(Xt.__formatReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Xt.__typeReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=A.width-rt&&ot>=0&&ot<=A.height-st&&S.readPixels($,ot,rt,st,Lt.convert(ie),Lt.convert(ue),Dt)}finally{let Zt=X!==null?tt.get(X).__webglFramebuffer:null;v.bindFramebuffer(S.FRAMEBUFFER,Zt)}}},this.readRenderTargetPixelsAsync=async function(A,$,ot,rt,st,Dt,Vt,Ot=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Wt=tt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Vt!==void 0&&(Wt=Wt[Vt]),Wt)if($>=0&&$<=A.width-rt&&ot>=0&&ot<=A.height-st){v.bindFramebuffer(S.FRAMEBUFFER,Wt);let Zt=A.textures[Ot],ie=Zt.format,ue=Zt.type;A.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+Ot);let Xt=Us(Zt);if(Xt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Xt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ge=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,ge),S.bufferData(S.PIXEL_PACK_BUFFER,Dt.byteLength,S.STREAM_READ),S.readPixels($,ot,rt,st,Lt.convert(ie),Lt.convert(ue),0),S.bindBuffer(S.PIXEL_PACK_BUFFER,null);let Je=X!==null?tt.get(X).__webglFramebuffer:null;v.bindFramebuffer(S.FRAMEBUFFER,Je);let Pe=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await Rm(S,Pe,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,ge),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,Dt),S.bindBuffer(S.PIXEL_PACK_BUFFER,null),S.deleteBuffer(ge),S.deleteSync(Pe),Dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,$=null,ot=0){let rt=Math.pow(2,-ot),st=Math.floor(A.image.width*rt),Dt=Math.floor(A.image.height*rt),Vt=$!==null?$.x:0,Ot=$!==null?$.y:0;ct.setTexture2D(A,0),S.copyTexSubImage2D(S.TEXTURE_2D,ot,0,0,Vt,Ot,st,Dt),v.unbindTexture()},this.copyTextureToTexture=function(A,$,ot=null,rt=null,st=0,Dt=0){let Vt,Ot,Wt,Zt,ie,ue,Xt,ge,Je,Pe=A.isCompressedTexture?A.mipmaps[Dt]:A.image;if(ot!==null)Vt=ot.max.x-ot.min.x,Ot=ot.max.y-ot.min.y,Wt=ot.isBox3?ot.max.z-ot.min.z:1,Zt=ot.min.x,ie=ot.min.y,ue=ot.isBox3?ot.min.z:0;else{let Xe=Math.pow(2,-st);Vt=Math.floor(Pe.width*Xe),Ot=Math.floor(Pe.height*Xe),A.isDataArrayTexture?Wt=Pe.depth:A.isData3DTexture?Wt=Math.floor(Pe.depth*Xe):Wt=1,Zt=0,ie=0,ue=0}rt!==null?(Xt=rt.x,ge=rt.y,Je=rt.z):(Xt=0,ge=0,Je=0);let be=Lt.convert($.format),Sn=Lt.convert($.type),zt;$.isData3DTexture?(ct.setTexture3D($,0),zt=S.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(ct.setTexture2DArray($,0),zt=S.TEXTURE_2D_ARRAY):(ct.setTexture2D($,0),zt=S.TEXTURE_2D),v.activeTexture(S.TEXTURE0),v.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,$.flipY),v.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),v.pixelStorei(S.UNPACK_ALIGNMENT,$.unpackAlignment);let Nn=v.getParameter(S.UNPACK_ROW_LENGTH),me=v.getParameter(S.UNPACK_IMAGE_HEIGHT),gi=v.getParameter(S.UNPACK_SKIP_PIXELS),Vi=v.getParameter(S.UNPACK_SKIP_ROWS),wr=v.getParameter(S.UNPACK_SKIP_IMAGES);v.pixelStorei(S.UNPACK_ROW_LENGTH,Pe.width),v.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Pe.height),v.pixelStorei(S.UNPACK_SKIP_PIXELS,Zt),v.pixelStorei(S.UNPACK_SKIP_ROWS,ie),v.pixelStorei(S.UNPACK_SKIP_IMAGES,ue);let Fs=A.isDataArrayTexture||A.isData3DTexture,ve=$.isDataArrayTexture||$.isData3DTexture;if(A.isDepthTexture){let Xe=tt.get(A),Ar=tt.get($),Ee=tt.get(Xe.__renderTarget),Er=tt.get(Ar.__renderTarget);v.bindFramebuffer(S.READ_FRAMEBUFFER,Ee.__webglFramebuffer),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,Er.__webglFramebuffer);for(let Os=0;Os<Wt;Os++)Fs&&(S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,tt.get(A).__webglTexture,st,ue+Os),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,tt.get($).__webglTexture,Dt,Je+Os)),S.blitFramebuffer(Zt,ie,Vt,Ot,Xt,ge,Vt,Ot,S.DEPTH_BUFFER_BIT,S.NEAREST);v.bindFramebuffer(S.READ_FRAMEBUFFER,null),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(st!==0||A.isRenderTargetTexture||tt.has(A)){let Xe=tt.get(A),Ar=tt.get($);v.bindFramebuffer(S.READ_FRAMEBUFFER,z),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,Y);for(let Ee=0;Ee<Wt;Ee++)Fs?S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Xe.__webglTexture,st,ue+Ee):S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Xe.__webglTexture,st),ve?S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ar.__webglTexture,Dt,Je+Ee):S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ar.__webglTexture,Dt),st!==0?S.blitFramebuffer(Zt,ie,Vt,Ot,Xt,ge,Vt,Ot,S.COLOR_BUFFER_BIT,S.NEAREST):ve?S.copyTexSubImage3D(zt,Dt,Xt,ge,Je+Ee,Zt,ie,Vt,Ot):S.copyTexSubImage2D(zt,Dt,Xt,ge,Zt,ie,Vt,Ot);v.bindFramebuffer(S.READ_FRAMEBUFFER,null),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else ve?A.isDataTexture||A.isData3DTexture?S.texSubImage3D(zt,Dt,Xt,ge,Je,Vt,Ot,Wt,be,Sn,Pe.data):$.isCompressedArrayTexture?S.compressedTexSubImage3D(zt,Dt,Xt,ge,Je,Vt,Ot,Wt,be,Pe.data):S.texSubImage3D(zt,Dt,Xt,ge,Je,Vt,Ot,Wt,be,Sn,Pe):A.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,Dt,Xt,ge,Vt,Ot,be,Sn,Pe.data):A.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,Dt,Xt,ge,Pe.width,Pe.height,be,Pe.data):S.texSubImage2D(S.TEXTURE_2D,Dt,Xt,ge,Vt,Ot,be,Sn,Pe);v.pixelStorei(S.UNPACK_ROW_LENGTH,Nn),v.pixelStorei(S.UNPACK_IMAGE_HEIGHT,me),v.pixelStorei(S.UNPACK_SKIP_PIXELS,gi),v.pixelStorei(S.UNPACK_SKIP_ROWS,Vi),v.pixelStorei(S.UNPACK_SKIP_IMAGES,wr),Dt===0&&$.generateMipmaps&&S.generateMipmap(zt),v.unbindTexture()},this.initRenderTarget=function(A){tt.get(A).__webglFramebuffer===void 0&&ct.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ct.setTextureCube(A,0):A.isData3DTexture?ct.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ct.setTexture2DArray(A,0):ct.setTexture2D(A,0),v.unbindTexture()},this.resetState=function(){et=0,W=0,X=null,v.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}};var tl=Un,el=class r extends hs{constructor(t){super(t),this.defaultDPI=90,this.defaultUnit="px"}load(t,e,n,i){let s=this,a=new Uo(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(o){try{e(s.parse(o))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){let e=this;function n(F,U){if(F.nodeType!==1)return;F.hasAttribute("filter")&&console.warn("THREE.SVGLoader: Filters are not supported.");let N=M(F),G=!1,it=null;switch(F.nodeName){case"svg":U=_(F,U);break;case"style":s(F);break;case"g":U=_(F,U);break;case"path":U=_(F,U),F.hasAttribute("d")&&(it=i(F));break;case"rect":U=_(F,U),it=l(F);break;case"polygon":U=_(F,U),it=c(F);break;case"polyline":U=_(F,U),it=h(F);break;case"circle":U=_(F,U),it=d(F);break;case"ellipse":U=_(F,U),it=u(F);break;case"line":U=_(F,U),it=f(F);break;case"defs":G=!0;break;case"use":U=_(F,U);let V=(F.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),O=F.viewportElement.getElementById(V);O?n(O,U):console.warn("SVGLoader: 'use node' references non-existent node id: "+V);break;default:}if(it){U.fill!==void 0&&U.fill!=="none"&&!U.fill.startsWith("url")&&it.color.setStyle(U.fill,tl),y(it,Ut),Y.push(it);let C=Object.assign({},U);C.strokeWidth=U.strokeWidth*Q(Ut),it.userData={node:F,style:C,transform:Ut.clone(),gradients:W}}let ht=F.childNodes;for(let C=0;C<ht.length;C++){let V=ht[C];G&&V.nodeName!=="style"&&V.nodeName!=="defs"||n(V,U)}N&&(X.pop(),X.length>0?Ut.copy(X[X.length-1]):Ut.identity())}function i(F){let U=new Ni,N=new xt,G=new xt,it=new xt,ht=!0,C=!1,V=F.getAttribute("d");if(V===""||V==="none")return null;let O=V.match(/[a-df-z][^a-df-z]*/ig);for(let I=0,j=O.length;I<j;I++){let lt=O[I],mt=lt.charAt(0),ft=lt.slice(1).trim();ht===!0&&(C=!0,ht=!1);let J;switch(mt){case"M":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=2)N.x=J[S+0],N.y=J[S+1],G.x=N.x,G.y=N.y,S===0?U.moveTo(N.x,N.y):U.lineTo(N.x,N.y),S===0&&it.copy(N);break;case"H":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S++)N.x=J[S],G.x=N.x,G.y=N.y,U.lineTo(N.x,N.y),S===0&&C===!0&&it.copy(N);break;case"V":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S++)N.y=J[S],G.x=N.x,G.y=N.y,U.lineTo(N.x,N.y),S===0&&C===!0&&it.copy(N);break;case"L":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=2)N.x=J[S+0],N.y=J[S+1],G.x=N.x,G.y=N.y,U.lineTo(N.x,N.y),S===0&&C===!0&&it.copy(N);break;case"C":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=6)U.bezierCurveTo(J[S+0],J[S+1],J[S+2],J[S+3],J[S+4],J[S+5]),G.x=J[S+2],G.y=J[S+3],N.x=J[S+4],N.y=J[S+5],S===0&&C===!0&&it.copy(N);break;case"S":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=4)U.bezierCurveTo(m(N.x,G.x),m(N.y,G.y),J[S+0],J[S+1],J[S+2],J[S+3]),G.x=J[S+0],G.y=J[S+1],N.x=J[S+2],N.y=J[S+3],S===0&&C===!0&&it.copy(N);break;case"Q":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=4)U.quadraticCurveTo(J[S+0],J[S+1],J[S+2],J[S+3]),G.x=J[S+0],G.y=J[S+1],N.x=J[S+2],N.y=J[S+3],S===0&&C===!0&&it.copy(N);break;case"T":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=2){let Tt=m(N.x,G.x),D=m(N.y,G.y);U.quadraticCurveTo(Tt,D,J[S+0],J[S+1]),G.x=Tt,G.y=D,N.x=J[S+0],N.y=J[S+1],S===0&&C===!0&&it.copy(N)}break;case"A":J=p(ft,[3,4],7);for(let S=0,Ct=J.length;S<Ct;S+=7){if(J[S+5]==N.x&&J[S+6]==N.y)continue;let Tt=N.clone();N.x=J[S+5],N.y=J[S+6],G.x=N.x,G.y=N.y,a(U,J[S],J[S+1],J[S+2],J[S+3],J[S+4],Tt,N),S===0&&C===!0&&it.copy(N)}break;case"m":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=2)N.x+=J[S+0],N.y+=J[S+1],G.x=N.x,G.y=N.y,S===0?U.moveTo(N.x,N.y):U.lineTo(N.x,N.y),S===0&&it.copy(N);break;case"h":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S++)N.x+=J[S],G.x=N.x,G.y=N.y,U.lineTo(N.x,N.y),S===0&&C===!0&&it.copy(N);break;case"v":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S++)N.y+=J[S],G.x=N.x,G.y=N.y,U.lineTo(N.x,N.y),S===0&&C===!0&&it.copy(N);break;case"l":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=2)N.x+=J[S+0],N.y+=J[S+1],G.x=N.x,G.y=N.y,U.lineTo(N.x,N.y),S===0&&C===!0&&it.copy(N);break;case"c":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=6)U.bezierCurveTo(N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3],N.x+J[S+4],N.y+J[S+5]),G.x=N.x+J[S+2],G.y=N.y+J[S+3],N.x+=J[S+4],N.y+=J[S+5],S===0&&C===!0&&it.copy(N);break;case"s":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=4)U.bezierCurveTo(m(N.x,G.x),m(N.y,G.y),N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3]),G.x=N.x+J[S+0],G.y=N.y+J[S+1],N.x+=J[S+2],N.y+=J[S+3],S===0&&C===!0&&it.copy(N);break;case"q":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=4)U.quadraticCurveTo(N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3]),G.x=N.x+J[S+0],G.y=N.y+J[S+1],N.x+=J[S+2],N.y+=J[S+3],S===0&&C===!0&&it.copy(N);break;case"t":J=p(ft);for(let S=0,Ct=J.length;S<Ct;S+=2){let Tt=m(N.x,G.x),D=m(N.y,G.y);U.quadraticCurveTo(Tt,D,N.x+J[S+0],N.y+J[S+1]),G.x=Tt,G.y=D,N.x=N.x+J[S+0],N.y=N.y+J[S+1],S===0&&C===!0&&it.copy(N)}break;case"a":J=p(ft,[3,4],7);for(let S=0,Ct=J.length;S<Ct;S+=7){if(J[S+5]==0&&J[S+6]==0)continue;let Tt=N.clone();N.x+=J[S+5],N.y+=J[S+6],G.x=N.x,G.y=N.y,a(U,J[S],J[S+1],J[S+2],J[S+3],J[S+4],Tt,N),S===0&&C===!0&&it.copy(N)}break;case"Z":case"z":U.currentPath.autoClose=!0,U.currentPath.curves.length>0&&(N.copy(it),U.currentPath.currentPoint.copy(N),ht=!0);break;default:console.warn(lt)}C=!1}return U}function s(F){if(!(!F.sheet||!F.sheet.cssRules||!F.sheet.cssRules.length))for(let U=0;U<F.sheet.cssRules.length;U++){let N=F.sheet.cssRules[U];if(N.type!==1)continue;let G=N.selectorText.split(/,/gm).filter(Boolean).map(it=>it.trim());for(let it=0;it<G.length;it++){let ht=Object.fromEntries(Object.entries(N.style).filter(([,C])=>C!==""));et[G[it]]=Object.assign(et[G[it]]||{},ht)}}}function a(F,U,N,G,it,ht,C,V){if(U==0||N==0){F.lineTo(V.x,V.y);return}G=G*Math.PI/180,U=Math.abs(U),N=Math.abs(N);let O=(C.x-V.x)/2,I=(C.y-V.y)/2,j=Math.cos(G)*O+Math.sin(G)*I,lt=-Math.sin(G)*O+Math.cos(G)*I,mt=U*U,ft=N*N,J=j*j,S=lt*lt,Ct=J/mt+S/ft;if(Ct>1){let dt=Math.sqrt(Ct);U=dt*U,N=dt*N,mt=U*U,ft=N*N}let Tt=mt*S+ft*J,D=(mt*ft-Tt)/Tt,v=Math.sqrt(Math.max(0,D));it===ht&&(v=-v);let q=v*U*lt/N,tt=-v*N*j/U,ct=Math.cos(G)*q-Math.sin(G)*tt+(C.x+V.x)/2,Mt=Math.sin(G)*q+Math.cos(G)*tt+(C.y+V.y)/2,yt=o(1,0,(j-q)/U,(lt-tt)/N),ut=o((j-q)/U,(lt-tt)/N,(-j-q)/U,(-lt-tt)/N)%(Math.PI*2);F.currentPath.absellipse(ct,Mt,U,N,yt,yt+ut,ht===0,G)}function o(F,U,N,G){let it=F*N+U*G,ht=Math.sqrt(F*F+U*U)*Math.sqrt(N*N+G*G),C=Math.acos(Math.max(-1,Math.min(1,it/ht)));return F*G-U*N<0&&(C=-C),C}function l(F){let U=x(F.getAttribute("x")||0),N=x(F.getAttribute("y")||0),G=x(F.getAttribute("rx")||F.getAttribute("ry")||0),it=x(F.getAttribute("ry")||F.getAttribute("rx")||0),ht=x(F.getAttribute("width")),C=x(F.getAttribute("height")),V=1-.551915024494,O=new Ni;return O.moveTo(U+G,N),O.lineTo(U+ht-G,N),(G!==0||it!==0)&&O.bezierCurveTo(U+ht-G*V,N,U+ht,N+it*V,U+ht,N+it),O.lineTo(U+ht,N+C-it),(G!==0||it!==0)&&O.bezierCurveTo(U+ht,N+C-it*V,U+ht-G*V,N+C,U+ht-G,N+C),O.lineTo(U+G,N+C),(G!==0||it!==0)&&O.bezierCurveTo(U+G*V,N+C,U,N+C-it*V,U,N+C-it),O.lineTo(U,N+it),(G!==0||it!==0)&&O.bezierCurveTo(U,N+it*V,U+G*V,N,U+G,N),O}function c(F){function U(ht,C,V){let O=x(C),I=x(V);it===0?G.moveTo(O,I):G.lineTo(O,I),it++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,G=new Ni,it=0;return F.getAttribute("points").replace(N,U),G.currentPath.autoClose=!0,G}function h(F){function U(ht,C,V){let O=x(C),I=x(V);it===0?G.moveTo(O,I):G.lineTo(O,I),it++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,G=new Ni,it=0;return F.getAttribute("points").replace(N,U),G.currentPath.autoClose=!1,G}function d(F){let U=x(F.getAttribute("cx")||0),N=x(F.getAttribute("cy")||0),G=x(F.getAttribute("r")||0),it=new Ji;it.absarc(U,N,G,0,Math.PI*2);let ht=new Ni;return ht.subPaths.push(it),ht}function u(F){let U=x(F.getAttribute("cx")||0),N=x(F.getAttribute("cy")||0),G=x(F.getAttribute("rx")||0),it=x(F.getAttribute("ry")||0),ht=new Ji;ht.absellipse(U,N,G,it,0,Math.PI*2);let C=new Ni;return C.subPaths.push(ht),C}function f(F){let U=x(F.getAttribute("x1")||0),N=x(F.getAttribute("y1")||0),G=x(F.getAttribute("x2")||0),it=x(F.getAttribute("y2")||0),ht=new Ni;return ht.moveTo(U,N),ht.lineTo(G,it),ht.currentPath.autoClose=!1,ht}function g(F){let U="http://www.w3.org/1999/xlink",N=F.querySelectorAll("linearGradient, radialGradient"),G=["x1","y1","x2","y2","cx","cy","r","fx","fy","gradientUnits","gradientTransform","spreadMethod"],it={};for(let C of N){let V=C.getAttribute("id");if(!V)continue;let O={type:C.nodeName==="radialGradient"?"radialGradient":"linearGradient",attrs:{},stops:null,href:null},I=C.getAttributeNS(U,"href")||C.getAttribute("href")||"";I.startsWith("#")&&(O.href=I.substring(1));for(let lt of G)C.hasAttribute(lt)&&(O.attrs[lt]=C.getAttribute(lt));let j=C.querySelectorAll("stop");if(j.length>0){O.stops=[];for(let lt of j){let mt=lt.getAttribute("stop-color");!mt&&lt.style&&(mt=lt.style["stop-color"]),mt||(mt="#000");let ft=lt.getAttribute("stop-opacity");(ft===null||ft==="")&&lt.style&&(ft=lt.style["stop-opacity"]),ft=ft===null||ft===""||ft===void 0?1:Math.max(0,Math.min(1,parseFloat(ft)));let J=Math.max(0,Math.min(1,parseFloat(lt.getAttribute("offset")||"0")));O.stops.push({offset:J,color:mt,opacity:ft})}}it[V]=O}function ht(C,V){let O=it[C];if(!O||V.has(C))return O;if(V.add(C),O.href&&it[O.href]){let I=ht(O.href,V);if(I){O.stops||(O.stops=I.stops);for(let j in I.attrs)j in O.attrs||(O.attrs[j]=I.attrs[j])}}return O}for(let C in it)ht(C,new Set);for(let C in it){let lt=function(mt){return typeof mt!="string"?0:mt.endsWith("%")?parseFloat(mt)/100:x(mt)},V=it[C],O=V.attrs,I=O.gradientUnits==="userSpaceOnUse"?"userSpaceOnUse":"objectBoundingBox",j={type:V.type,gradientUnits:I,spreadMethod:O.spreadMethod==="reflect"||O.spreadMethod==="repeat"?O.spreadMethod:"pad",gradientTransform:null,stops:(V.stops||[]).slice().sort((mt,ft)=>mt.offset-ft.offset)};if(O.gradientTransform&&(j.gradientTransform=new $t,E(O.gradientTransform,j.gradientTransform)),V.type==="linearGradient")j.x1=O.x1!==void 0?lt(O.x1):0,j.y1=O.y1!==void 0?lt(O.y1):0,j.x2=O.x2!==void 0?lt(O.x2):I==="objectBoundingBox"?1:0,j.y2=O.y2!==void 0?lt(O.y2):0;else{let mt=I==="objectBoundingBox"?.5:0,ft=I==="objectBoundingBox"?.5:0;j.cx=O.cx!==void 0?lt(O.cx):mt,j.cy=O.cy!==void 0?lt(O.cy):mt,j.r=O.r!==void 0?lt(O.r):ft,j.fx=O.fx!==void 0?lt(O.fx):j.cx,j.fy=O.fy!==void 0?lt(O.fy):j.cy}W[C]=j}}function _(F,U){U=Object.assign({},U);let N={};if(F.hasAttribute("class")){let C=F.getAttribute("class").split(/\s/).filter(Boolean).map(V=>V.trim());for(let V=0;V<C.length;V++)N=Object.assign(N,et["."+C[V]])}F.hasAttribute("id")&&(N=Object.assign(N,et["#"+F.getAttribute("id")]));function G(C,V,O){O===void 0&&(O=function(j){return j}),F.hasAttribute(C)&&(U[V]=O(F.getAttribute(C))),N[V]&&(U[V]=O(N[V])),F.style&&F.style[C]!==""&&(U[V]=O(F.style[C]))}function it(C){return Math.max(0,Math.min(1,x(C)))}function ht(C){return Math.max(0,x(C))}return G("fill","fill"),G("fill-opacity","fillOpacity",it),G("fill-rule","fillRule"),G("opacity","opacity",it),G("stroke","stroke"),G("stroke-opacity","strokeOpacity",it),G("stroke-width","strokeWidth",ht),G("stroke-linejoin","strokeLineJoin"),G("stroke-linecap","strokeLineCap"),G("stroke-miterlimit","strokeMiterLimit",ht),G("visibility","visibility"),U}function m(F,U){return F-(U-F)}function p(F,U,N){if(typeof F!="string")throw new TypeError("Invalid input: "+typeof F);let G={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},it=0,ht=1,C=2,V=3,O=it,I=!0,j="",lt="",mt=[];function ft(Tt,D,v){let q=new SyntaxError('Unexpected character "'+Tt+'" at index '+D+".");throw q.partial=v,q}function J(){j!==""&&(lt===""?mt.push(Number(j)):mt.push(Number(j)*Math.pow(10,Number(lt)))),j="",lt=""}let S,Ct=F.length;for(let Tt=0;Tt<Ct;Tt++){if(S=F[Tt],Array.isArray(U)&&U.includes(mt.length%N)&&G.FLAGS.test(S)){O=ht,j=S,J();continue}if(O===it){if(G.WHITESPACE.test(S))continue;if(G.DIGIT.test(S)||G.SIGN.test(S)){O=ht,j=S;continue}if(G.POINT.test(S)){O=C,j=S;continue}G.COMMA.test(S)&&(I&&ft(S,Tt,mt),I=!0)}if(O===ht){if(G.DIGIT.test(S)){j+=S;continue}if(G.POINT.test(S)){j+=S,O=C;continue}if(G.EXP.test(S)){O=V;continue}G.SIGN.test(S)&&j.length===1&&G.SIGN.test(j[0])&&ft(S,Tt,mt)}if(O===C){if(G.DIGIT.test(S)){j+=S;continue}if(G.EXP.test(S)){O=V;continue}G.POINT.test(S)&&j[j.length-1]==="."&&ft(S,Tt,mt)}if(O===V){if(G.DIGIT.test(S)){lt+=S;continue}if(G.SIGN.test(S)){if(lt===""){lt+=S;continue}lt.length===1&&G.SIGN.test(lt)&&ft(S,Tt,mt)}}G.WHITESPACE.test(S)?(J(),O=it,I=!1):G.COMMA.test(S)?(J(),O=it,I=!0):G.SIGN.test(S)?(J(),O=ht,j=S):G.POINT.test(S)?(J(),O=C,j=S):ft(S,Tt,mt)}return J(),mt}let b=["mm","cm","in","pt","pc","px"],R={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function x(F){let U="px";if(typeof F=="string"||F instanceof String)for(let G=0,it=b.length;G<it;G++){let ht=b[G];if(F.endsWith(ht)){U=ht,F=F.substring(0,F.length-ht.length);break}}let N;return U==="px"&&e.defaultUnit!=="px"?N=R.in[e.defaultUnit]/e.defaultDPI:(N=R[U][e.defaultUnit],N<0&&(N=R[U].in*e.defaultDPI)),N*parseFloat(F)}function M(F){if(!(F.hasAttribute("transform")||F.nodeName==="use"&&(F.hasAttribute("x")||F.hasAttribute("y"))))return null;let U=T(F);return X.length>0&&U.premultiply(X[X.length-1]),Ut.copy(U),X.push(U),U}function T(F){let U=new $t;if(F.nodeName==="use"&&(F.hasAttribute("x")||F.hasAttribute("y"))){let N=x(F.getAttribute("x")||0),G=x(F.getAttribute("y")||0);U.makeTranslation(N,G)}return F.hasAttribute("transform")&&E(F.getAttribute("transform"),U),U}function E(F,U){let N=nt,G=F.split(")");for(let it=G.length-1;it>=0;it--){let ht=G[it].trim();if(ht==="")continue;let C=ht.indexOf("("),V=ht.length;if(C>0&&C<V){let O=ht.slice(0,C),I=p(ht.slice(C+1));switch(N.identity(),O){case"translate":if(I.length>=1){let j=I[0],lt=0;I.length>=2&&(lt=I[1]),N.makeTranslation(j,lt)}break;case"rotate":if(I.length>=1){let j=0,lt=0,mt=0;j=I[0]*Math.PI/180,I.length>=3&&(lt=I[1],mt=I[2]),P.makeTranslation(-lt,-mt),at.makeRotation(j),At.multiplyMatrices(at,P),P.makeTranslation(lt,mt),N.multiplyMatrices(P,At)}break;case"scale":if(I.length>=1){let j=I[0],lt=j;I.length>=2&&(lt=I[1]),N.makeScale(j,lt)}break;case"skewX":I.length===1&&N.set(1,Math.tan(I[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":I.length===1&&N.set(1,0,0,Math.tan(I[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":I.length===6&&N.set(I[0],I[2],I[4],I[1],I[3],I[5],0,0,1);break}U.premultiply(N)}}return U}function y(F,U){function N(C){Bt.set(C.x,C.y,1).applyMatrix3(U),C.set(Bt.x,Bt.y)}function G(C){let V=C.xRadius,O=C.yRadius,I=Math.cos(C.aRotation),j=Math.sin(C.aRotation),lt=new K(V*I,V*j,0),mt=new K(-O*j,O*I,0),ft=lt.applyMatrix3(U),J=mt.applyMatrix3(U),S=nt.set(ft.x,J.x,0,ft.y,J.y,0,0,0,1),Ct=P.copy(S).invert(),v=at.copy(Ct).transpose().multiply(Ct).elements,q=z(v[0],v[1],v[4]),tt=Math.sqrt(q.rt1),ct=Math.sqrt(q.rt2);if(C.xRadius=1/tt,C.yRadius=1/ct,C.aRotation=Math.atan2(q.sn,q.cs),!((C.aEndAngle-C.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let yt=P.set(tt,0,0,0,ct,0,0,0,1),ut=at.set(q.cs,q.sn,0,-q.sn,q.cs,0,0,0,1),dt=yt.multiply(ut).multiply(S),Rt=kt=>{let{x:It,y:Pt}=new K(Math.cos(kt),Math.sin(kt),0).applyMatrix3(dt);return Math.atan2(Pt,It)};C.aStartAngle=Rt(C.aStartAngle),C.aEndAngle=Rt(C.aEndAngle),w(U)&&(C.aClockwise=!C.aClockwise)}}function it(C){let V=H(U),O=k(U);C.xRadius*=V,C.yRadius*=O;let I=V>Number.EPSILON?Math.atan2(U.elements[1],U.elements[0]):Math.atan2(-U.elements[3],U.elements[4]);C.aRotation+=I,w(U)&&(C.aStartAngle*=-1,C.aEndAngle*=-1,C.aClockwise=!C.aClockwise)}let ht=F.subPaths;for(let C=0,V=ht.length;C<V;C++){let I=ht[C].curves;for(let j=0;j<I.length;j++){let lt=I[j];lt.isLineCurve?(N(lt.v1),N(lt.v2)):lt.isCubicBezierCurve?(N(lt.v0),N(lt.v1),N(lt.v2),N(lt.v3)):lt.isQuadraticBezierCurve?(N(lt.v0),N(lt.v1),N(lt.v2)):lt.isEllipseCurve&&(Et.set(lt.aX,lt.aY),N(Et),lt.aX=Et.x,lt.aY=Et.y,L(U)?G(lt):it(lt))}}}function w(F){let U=F.elements;return U[0]*U[4]-U[1]*U[3]<0}function L(F){let U=F.elements,N=U[0]*U[3]+U[1]*U[4];if(N===0)return!1;let G=H(F),it=k(F);return Math.abs(N/(G*it))>Number.EPSILON}function H(F){let U=F.elements;return Math.sqrt(U[0]*U[0]+U[1]*U[1])}function k(F){let U=F.elements;return Math.sqrt(U[3]*U[3]+U[4]*U[4])}function Q(F){let U=F.elements,N=U[0]*U[4]-U[1]*U[3];return Math.sqrt(Math.abs(N))}function z(F,U,N){let G,it,ht,C,V,O=F+N,I=F-N,j=Math.sqrt(I*I+4*U*U);return O>0?(G=.5*(O+j),V=1/G,it=F*V*N-U*V*U):O<0?it=.5*(O-j):(G=.5*j,it=-.5*j),I>0?ht=I+j:ht=I-j,Math.abs(ht)>2*Math.abs(U)?(V=-2*U/ht,C=1/Math.sqrt(1+V*V),ht=V*C):Math.abs(U)===0?(ht=1,C=0):(V=-.5*ht/U,ht=1/Math.sqrt(1+V*V),C=V*ht),I>0&&(V=ht,ht=-C,C=V),{rt1:G,rt2:it,cs:ht,sn:C}}let Y=[],et={},W={},X=[],nt=new $t,P=new $t,at=new $t,At=new $t,Et=new xt,Bt=new K,Ut=new $t,qt=new DOMParser().parseFromString(t,"image/svg+xml");return g(qt),n(qt.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:Y,gradients:W,xml:qt.documentElement}}static createFillMaterial(t){let e=t.userData.style;if(e.fill===void 0||e.fill==="none")return null;let n=t.color,i=null,s=dg.exec(e.fill);if(s){let o=t.userData.gradients&&t.userData.gradients[s[1]];i=ub(o,t)}let a=new Di({opacity:e.fillOpacity*(e.opacity||1),transparent:!0,side:ai,depthWrite:!1});return i!==null?a.map=i:a.color=n,a}static createStrokeMaterial(t){let e=t.userData.style;return e.stroke===void 0||e.stroke==="none"?null:(dg.test(e.stroke)&&console.warn("THREE.SVGLoader: Gradient strokes are not supported."),new Di({color:new ee().setStyle(e.stroke,tl),opacity:e.strokeOpacity*(e.opacity||1),transparent:!0,side:ai,depthWrite:!1}))}static createShapes(t){return console.warn("SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead."),t.toShapes()}static getStrokeStyle(t,e,n,i,s){return t=t!==void 0?t:1,e=e!==void 0?e:"#000",n=n!==void 0?n:"miter",i=i!==void 0?i:"butt",s=s!==void 0?s:4,{strokeColor:e,strokeWidth:t,strokeLineJoin:n,strokeLineCap:i,strokeMiterLimit:s}}static pointsToStroke(t,e,n,i){let s=[],a=[],o=[];if(r.pointsToStrokeWithBuffers(t,e,n,i,s,a,o)===0)return null;let l=new mn;return l.setAttribute("position",new ze(s,3)),l.setAttribute("normal",new ze(a,3)),l.setAttribute("uv",new ze(o,2)),l}static pointsToStrokeWithBuffers(t,e,n,i,s,a,o,l){let c=new xt,h=new xt,d=new xt,u=new xt,f=new xt,g=new xt,_=new xt,m=new xt,p=new xt,b=new xt,R=new xt,x=new xt,M=new xt,T=new xt,E=new xt,y=new xt,w=new xt;n=n!==void 0?n:12,i=i!==void 0?i:.001,l=l!==void 0?l:0,t=ht(t);let L=t.length;if(L<2)return 0;let H=t[0].equals(t[L-1]),k,Q=t[0],z,Y=e.strokeWidth/2,et=1/(L-1),W=0,X,nt,P,at,At=!1,Et=0,Bt=l*3,Ut=l*2;qt(t[0],t[1],c).multiplyScalar(Y),m.copy(t[0]).sub(c),p.copy(t[0]).add(c),b.copy(m),R.copy(p);for(let C=1;C<L;C++){k=t[C],C===L-1?H?z=t[1]:z=void 0:z=t[C+1];let V=c;if(qt(Q,k,V),d.copy(V).multiplyScalar(Y),x.copy(k).sub(d),M.copy(k).add(d),X=W+et,nt=!1,z!==void 0){qt(k,z,h),d.copy(h).multiplyScalar(Y),T.copy(k).sub(d),E.copy(k).add(d),P=!0,d.subVectors(z,Q),V.dot(d)<0&&(P=!1),C===1&&(At=P),d.subVectors(z,k),d.normalize();let O=Math.abs(V.dot(d));if(O>Number.EPSILON){let I=Y/O;d.multiplyScalar(-I),u.subVectors(k,Q),f.copy(u).setLength(I).add(d),y.copy(f).negate();let j=f.length(),lt=u.length();u.divideScalar(lt),g.subVectors(z,k);let mt=g.length();if(g.divideScalar(mt),u.dot(y)<lt&&g.dot(y)<mt&&(nt=!0),w.copy(f).add(k),y.add(k),nt){let ft=P?p:m,J=(w.x-ft.x)*(y.y-ft.y)-(w.y-ft.y)*(y.x-ft.x);(P&&J<0||!P&&J>0)&&y.copy(ft)}switch(at=!1,nt?P?(E.copy(y),M.copy(y)):(T.copy(y),x.copy(y)):U(),e.strokeLineJoin){case"bevel":N(P,nt,X);break;case"round":G(P,nt),P?F(k,x,T,X,0):F(k,E,M,X,1);break;default:let ft=Y*e.strokeMiterLimit/j;if(ft<1)if(e.strokeLineJoin!=="miter-clip"){N(P,nt,X);break}else G(P,nt),P?(g.subVectors(w,x).multiplyScalar(ft).add(x),_.subVectors(w,T).multiplyScalar(ft).add(T),B(x,X,0),B(g,X,0),B(k,X,.5),B(k,X,.5),B(g,X,0),B(_,X,0),B(k,X,.5),B(_,X,0),B(T,X,0)):(g.subVectors(w,M).multiplyScalar(ft).add(M),_.subVectors(w,E).multiplyScalar(ft).add(E),B(M,X,1),B(g,X,1),B(k,X,.5),B(k,X,.5),B(g,X,1),B(_,X,1),B(k,X,.5),B(_,X,1),B(E,X,1));else nt?(P?(B(p,W,1),B(m,W,0),B(w,X,0),B(p,W,1),B(w,X,0),B(y,X,1)):(B(p,W,1),B(m,W,0),B(w,X,1),B(m,W,0),B(y,X,0),B(w,X,1)),P?T.copy(w):E.copy(w)):P?(B(x,X,0),B(w,X,0),B(k,X,.5),B(k,X,.5),B(w,X,0),B(T,X,0)):(B(M,X,1),B(w,X,1),B(k,X,.5),B(k,X,.5),B(w,X,1),B(E,X,1)),at=!0;break}}else U()}else U();!H&&C===L-1&&it(t[0],b,R,P,!0,W),W=X,Q=k,m.copy(T),p.copy(E)}if(!H)it(k,x,M,P,!1,X);else if(nt&&s){let C=w,V=y;At!==P&&(C=y,V=w),P?(at||At)&&(V.toArray(s,0),V.toArray(s,9),at&&C.toArray(s,3)):(at||!At)&&(V.toArray(s,3),V.toArray(s,9),at&&C.toArray(s,0))}if(s){let C=[new xt,new xt,new xt],V=l*3;for(let O=V;O<Bt;O+=9)C[0].set(s[O],s[O+1]),C[1].set(s[O+3],s[O+4]),C[2].set(s[O+6],s[O+7]),Hi.area(C)<0&&(s[O+3]=C[0].x,s[O+4]=C[0].y)}return Et;function qt(C,V,O){return O.subVectors(V,C),O.set(-O.y,O.x).normalize()}function B(C,V,O){s&&(s[Bt]=C.x,s[Bt+1]=C.y,s[Bt+2]=0,a&&(a[Bt]=0,a[Bt+1]=0,a[Bt+2]=1),Bt+=3,o&&(o[Ut]=V,o[Ut+1]=O,Ut+=2)),Et+=3}function F(C,V,O,I,j){c.copy(V).sub(C).normalize(),h.copy(O).sub(C).normalize();let lt=Math.PI,mt=c.dot(h);Math.abs(mt)<1&&(lt=Math.abs(Math.acos(mt))),lt/=n,d.copy(V);for(let ft=0,J=n-1;ft<J;ft++)u.copy(d).rotateAround(C,lt),B(d,I,j),B(u,I,j),B(C,I,.5),d.copy(u);B(d,I,j),B(O,I,j),B(C,I,.5)}function U(){B(p,W,1),B(m,W,0),B(x,X,0),B(p,W,1),B(x,X,0),B(M,X,1)}function N(C,V,O){V?C?(B(p,W,1),B(m,W,0),B(x,X,0),B(p,W,1),B(x,X,0),B(y,X,1),B(x,O,0),B(T,O,0),B(y,O,.5)):(B(p,W,1),B(m,W,0),B(M,X,1),B(m,W,0),B(y,X,0),B(M,X,1),B(M,O,1),B(y,O,0),B(E,O,1)):C?(B(x,O,0),B(T,O,0),B(k,O,.5)):(B(M,O,1),B(E,O,0),B(k,O,.5))}function G(C,V){V&&(C?(B(p,W,1),B(m,W,0),B(x,X,0),B(p,W,1),B(x,X,0),B(y,X,1),B(x,W,0),B(k,X,.5),B(y,X,1),B(k,X,.5),B(T,W,0),B(y,X,1)):(B(p,W,1),B(m,W,0),B(M,X,1),B(m,W,0),B(y,X,0),B(M,X,1),B(M,W,1),B(y,X,0),B(k,X,.5),B(k,X,.5),B(y,X,0),B(E,W,1)))}function it(C,V,O,I,j,lt){switch(e.strokeLineCap){case"round":j?F(C,O,V,lt,.5):F(C,V,O,lt,.5);break;case"square":if(j)c.subVectors(V,C),h.set(c.y,-c.x),d.addVectors(c,h).add(C),u.subVectors(h,c).add(C),I?(d.toArray(s,3),u.toArray(s,0),u.toArray(s,9)):(d.toArray(s,3),o[7]===1?u.toArray(s,9):d.toArray(s,9),u.toArray(s,0));else{c.subVectors(O,C),h.set(c.y,-c.x),d.addVectors(c,h).add(C),u.subVectors(h,c).add(C);let mt=s.length;I?(d.toArray(s,mt-3),u.toArray(s,mt-6),u.toArray(s,mt-12)):(u.toArray(s,mt-6),d.toArray(s,mt-3),u.toArray(s,mt-12))}break;default:break}}function ht(C){let V=!1;for(let I=1,j=C.length-1;I<j;I++)if(C[I].distanceTo(C[I+1])<i){V=!0;break}if(!V)return C;let O=[];O.push(C[0]);for(let I=1,j=C.length-1;I<j;I++)C[I].distanceTo(C[I+1])>=i&&O.push(C[I]);return O.push(C[C.length-1]),O}}},dg=/^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;function ub(r,t,e=256){if(!r||!Array.isArray(r.stops)||r.stops.length===0)return null;let n=t.userData.transform,i=r.gradientUnits==="objectBoundingBox",s=null;if(i&&(s=fb(t,n),s===null))return null;function a(d,u,f){f.set(d,u,1),r.gradientTransform&&f.applyMatrix3(r.gradientTransform),i&&f.set(s.minX+f.x*s.width,s.minY+f.y*s.height,1),n&&f.applyMatrix3(n)}let o=document.createElement("canvas"),l;if(r.type==="linearGradient"){o.width=e,o.height=1;let d=o.getContext("2d"),u=d.createLinearGradient(0,0,e,0);pg(u,r.stops),d.fillStyle=u,d.fillRect(0,0,e,1);let f=new K,g=new K;a(r.x1,r.y1,f),a(r.x2,r.y2,g);let _=g.x-f.x,m=g.y-f.y,p=_*_+m*m||1e-20,b=_/p,R=m/p,x=-(b*f.x+R*f.y);l=new $t().set(b,R,x,0,0,.5,0,0,1)}else{let d=r.cx,u=r.cy,f=r.fx,g=r.fy,_=r.r;if(r.gradientTransform){let y=new K;y.set(d,u,1).applyMatrix3(r.gradientTransform),d=y.x,u=y.y,y.set(f,g,1).applyMatrix3(r.gradientTransform),f=y.x,g=y.y}if(i&&(d=s.minX+d*s.width,u=s.minY+u*s.height,f=s.minX+f*s.width,g=s.minY+g*s.height,_=_*Math.sqrt((s.width*s.width+s.height*s.height)/2)),_<=0)return null;o.width=e,o.height=e;let m=o.getContext("2d"),p=d-_,b=u-_,R=2*_,x=e/R;m.setTransform(x,0,0,x,-p*x,-b*x);let M=m.createRadialGradient(f,g,0,d,u,_);pg(M,r.stops),m.fillStyle=M,m.fillRect(p,b,R,R);let T=n?n.clone().invert():new $t;l=new $t().set(1/R,0,-p/R,0,1/R,-b/R,0,0,1).multiply(T)}let c=new yo(o);c.colorSpace=tl,c.flipY=!1,c.matrixAutoUpdate=!1,c.matrix=l;let h=r.spreadMethod==="reflect"?ea:r.spreadMethod==="repeat"?ta:xi;return c.wrapS=h,c.wrapT=h,c}function fb(r,t){let e=t?t.clone().invert():null,n=new xt,i=new pa;for(let s of r.subPaths)for(let a of s.getPoints())n.copy(a),e&&n.applyMatrix3(e),i.expandByPoint(n);return i.isEmpty()?null:{minX:i.min.x,minY:i.min.y,width:i.max.x-i.min.x,height:i.max.y-i.min.y}}function pg(r,t){let e=new ee;for(let n of t){let i=n.color;if(n.opacity<1){e.setStyle(n.color,tl);let s=/rgb\(([^)]+)\)/.exec(e.getStyle(tl));s&&(i=`rgba(${s[1]},${n.opacity})`)}r.addColorStop(Math.max(0,Math.min(1,n.offset)),i)}}var Uh=class extends os{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new Ur;t.deleteAttribute("uv");let e=new cs({side:gn}),n=new cs,i=new Bo(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let s=new Le(t,e);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let a=new go(t,n,6),o=new hn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new Le(t,wa(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Le(t,wa(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Le(t,wa(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new Le(t,wa(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new Le(t,wa(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new Le(t,wa(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function wa(r){return new Do({color:0,emissive:16777215,emissiveIntensity:r})}function mr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function bg(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}var Kn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ol={duration:.5,overwrite:!1,delay:0},md,_n,Ne,bi=1e8,we=1/bi,sd=Math.PI*2,db=sd/4,pb=0,Tg=Math.sqrt,mb=Math.cos,gb=Math.sin,nn=function(t){return typeof t=="string"},Ve=function(t){return typeof t=="function"},_r=function(t){return typeof t=="number"},Xh=function(t){return typeof t>"u"},er=function(t){return typeof t=="object"},$n=function(t){return t!==!1},gd=function(){return typeof window<"u"},Fh=function(t){return Ve(t)||nn(t)},wg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},An=Array.isArray,_b=/random\([^)]+\)/g,xb=/,\s*/g,mg=/(?:-?\.?\d|\.)+/gi,_d=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Qf=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,xd=/[+-]=-?[.\d]+/,yb=/[^,'"\[\]\s]+/gi,vb=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Oe,ji,ad,yd,li={},zh={},Ag,Eg=function(t){return(zh=Ea(t,li))&&En},qh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ll=function(t,e){return!e&&console.warn(t)},Cg=function(t,e){return t&&(li[t]=e)&&zh&&(zh[t]=e)||li},cl=function(){return 0},Sb={suppressEvents:!0,isStart:!0,kill:!1},Oh={suppressEvents:!0,kill:!1},Mb={suppressEvents:!0},vd={},Xr=[],od={},Rg,Zn={},jf={},gg=30,Bh=[],Sd="",Md=function(t){var e=t[0],n,i;if(er(e)||Ve(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Bh.length;i--&&!Bh[i].targetTest(e););n=Bh[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Ad(t[i],n)))||t.splice(i,1);return t},qr=function(t){return t._gsap||Md(Ti(t))[0]._gsap},bd=function(t,e,n){return(n=t[e])&&Ve(n)?t[e]():Xh(n)&&t.getAttribute&&t.getAttribute(e)||n},On=function(t,e){return(t=t.split(",")).forEach(e)||t},Ge=function(t){return Math.round(t*1e5)/1e5||0},Fe=function(t){return Math.round(t*1e7)/1e7||0},ys=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},bb=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Vh=function(){var t=Xr.length,e=Xr.slice(0),n,i;for(od={},Xr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Td=function(t){return!!(t._initted||t._startAt||t.add)},Pg=function(t,e,n,i){Xr.length&&!_n&&Vh(),t.render(e,n,i||!!(_n&&e<0&&Td(t))),Xr.length&&!_n&&Vh()},Ig=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(yb).length<2?e:nn(t)?t.trim():t},Lg=function(t){return t},ci=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Tb=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Ea=function(t,e){for(var n in e)t[n]=e[n];return t},_g=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=er(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Gh=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},rl=function(t){var e=t.parent||Oe,n=t.keyframes?Tb(An(t.keyframes)):ci;if($n(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},wb=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Dg=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Yh=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Yr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},ms=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Ab=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},ld=function(t,e,n,i){return t._startAt&&(_n?t._startAt.revert(Oh):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},Eb=function r(t){return!t||t._ts&&r(t.parent)},xg=function(t){return t._repeat?Ca(t._tTime,t=t.duration()+t._rDelay)*t:0},Ca=function(t,e){var n=Math.floor(t=Fe(t/e));return t&&n===t?n-1:n},Hh=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Zh=function(t){return t._end=Fe(t._start+(t._tDur/Math.abs(t._ts||t._rts||we)||0))},Jh=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Fe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Zh(t),n._dirty||ms(n,t)),t},Ng=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Hh(t.rawTime(),e),(!e._dur||fl(0,e.totalDuration(),n)-e._tTime>we)&&e.render(n,!0)),ms(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-we}},tr=function(t,e,n,i){return e.parent&&Yr(e),e._start=Fe((_r(n)?n:n||t!==Oe?Mi(t,n,e):t._time)+e._delay),e._end=Fe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Dg(t,e,"_first","_last",t._sort?"_start":0),cd(e)||(t._recent=e),i||Ng(t,e),t._ts<0&&Jh(t,t._tTime),t},Ug=function(t,e){return(li.ScrollTrigger||qh("scrollTrigger",e))&&li.ScrollTrigger.create(e,t)},Fg=function(t,e,n,i,s){if(Rd(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!_n&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Rg!==Jn.frame)return Xr.push(t),t._lazy=[s,i],1},Cb=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},cd=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Rb=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&Cb(t)&&!(!t._initted&&cd(t))||(t._ts<0||t._dp._ts<0)&&!cd(t))?0:1,o=t._rDelay,l=0,c,h,d;if(o&&t._repeat&&(l=fl(0,t._tDur,e),h=Ca(l,o),t._yoyo&&h&1&&(a=1-a),h!==Ca(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||_n||i||t._zTime===we||!e&&t._zTime){if(!t._initted&&Fg(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?we:0),n||(n=e&&!d),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&ld(t,e,n,!0),t._onUpdate&&!n&&oi(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&oi(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Yr(t,1),!n&&!_n&&(oi(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Pb=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Ra=function(t,e,n,i){var s=t._repeat,a=Fe(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Fe(a*(s+1)+t._rDelay*s):a,o>0&&!i&&Jh(t,t._tTime=t._tDur*o),t.parent&&Zh(t),n||ms(t.parent,t),t},yg=function(t){return t instanceof wn?ms(t):Ra(t,t._dur)},Ib={_start:0,endTime:cl,totalDuration:cl},Mi=function r(t,e,n){var i=t.labels,s=t._recent||Ib,a=t.duration()>=bi?s.endTime(!1):t._dur,o,l,c;return nn(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(An(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},sl=function(t,e,n){var i=_r(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;a.immediateRender=$n(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new qe(e[0],a,e[s+1])},Zr=function(t,e){return t||t===0?e(t):e},fl=function(t,e,n){return n<t?t:n>e?e:n},xn=function(t,e){return!nn(t)||!(e=vb.exec(t))?"":e[1]},Lb=function(t,e,n){return Zr(n,function(i){return fl(t,e,i)})},hd=[].slice,Og=function(t,e){return t&&er(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&er(t[0]))&&!t.nodeType&&t!==ji},Db=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return nn(i)&&!e||Og(i,1)?(s=n).push.apply(s,Ti(i)):n.push(i)})||n},Ti=function(t,e,n){return Ne&&!e&&Ne.selector?Ne.selector(t):nn(t)&&!n&&(ad||!Pa())?hd.call((e||yd).querySelectorAll(t),0):An(t)?Db(t,n):Og(t)?hd.call(t,0):t?[t]:[]},ud=function(t){return t=Ti(t)[0]||ll("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Ti(e,n.querySelectorAll?n:n===t?ll("Invalid scope")||yd.createElement("div"):t)}},Bg=function(t){return t.sort(function(){return .5-Math.random()})},kg=function(t){if(Ve(t))return t;var e=er(t)?t:{each:t},n=gs(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,d=i;return nn(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],d=i[1]),function(u,f,g){var _=(g||e).length,m=a[_],p,b,R,x,M,T,E,y,w;if(!m){if(w=e.grid==="auto"?0:(e.grid||[1,bi])[1],!w){for(E=-bi;E<(E=g[w++].getBoundingClientRect().left)&&w<_;);w<_&&w--}for(m=a[_]=[],p=l?Math.min(w,_)*h-.5:i%w,b=w===bi?0:l?_*d/w-.5:i/w|0,E=0,y=bi,T=0;T<_;T++)R=T%w-p,x=b-(T/w|0),m[T]=M=c?Math.abs(c==="y"?x:R):Tg(R*R+x*x),M>E&&(E=M),M<y&&(y=M);i==="random"&&Bg(m),m.max=E-y,m.min=y,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(w>_?_-1:c?c==="y"?_/w:w:Math.max(w,_/w))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=xn(e.amount||e.each)||0,n=n&&_<0?qb(n):n}return _=(m[u]-m.min)/m.max||0,Fe(m.b+(n?n(_):_)*m.v)+m.u}},fd=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Fe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(_r(n)?0:xn(n))}},zg=function(t,e){var n=An(t),i,s;return!n&&er(t)&&(i=n=t.radius||bi,t.values?(t=Ti(t.values),(s=!_r(t[0]))&&(i*=i)):t=fd(t.increment)),Zr(e,n?Ve(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=bi,h=0,d=t.length,u,f;d--;)s?(u=t[d].x-o,f=t[d].y-l,u=u*u+f*f):u=Math.abs(t[d]-o),u<c&&(c=u,h=d);return h=!i||c<=i?t[h]:a,s||h===a||_r(a)?h:h+xn(a)}:fd(t))},Vg=function(t,e,n,i){return Zr(An(t)?!e:n===!0?!!(n=0):!i,function(){return An(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Nb=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},Ub=function(t,e){return function(n){return t(parseFloat(n))+(e||xn(n))}},Fb=function(t,e,n){return Hg(t,e,0,1,n)},Gg=function(t,e,n){return Zr(n,function(i){return t[~~e(i)]})},Ob=function r(t,e,n){var i=e-t;return An(t)?Gg(t,r(0,t.length),e):Zr(n,function(s){return(i+(s-t)%i)%i+t})},Bb=function r(t,e,n){var i=e-t,s=i*2;return An(t)?Gg(t,r(0,t.length-1),e):Zr(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},Ia=function(t){return t.replace(_b,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(xb);return Vg(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Hg=function(t,e,n,i,s){var a=e-t,o=i-n;return Zr(s,function(l){return n+((l-t)/a*o||0)})},kb=function r(t,e,n,i){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var a=nn(t),o={},l,c,h,d,u;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(An(t)&&!An(e)){for(h=[],d=t.length,u=d-2,c=1;c<d;c++)h.push(r(t[c-1],t[c]));d--,s=function(g){g*=d;var _=Math.min(u,~~g);return h[_](g-_)},n=e}else i||(t=Ea(An(t)?[]:{},t));if(!h){for(l in e)Ed.call(o,t,l,"get",e[l]);s=function(g){return Ld(g,o)||(a?t.p:t)}}}return Zr(n,s)},vg=function(t,e,n){var i=t.labels,s=bi,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},oi=function(t,e,n){var i=t.vars,s=i[e],a=Ne,o=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&Xr.length&&Vh(),o&&(Ne=o),h=l?s.apply(c,l):s.call(c),Ne=a,h},nl=function(t){return Yr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!_n),t.progress()<1&&oi(t,"onInterrupt"),t},Aa,Wg=[],Xg=function(t){if(t)if(t=!t.name&&t.default||t,gd()||t.headless){var e=t.name,n=Ve(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:cl,render:Ld,add:Ed,kill:n1,modifier:e1,rawVars:0},a={targetTest:0,get:0,getSetter:$h,aliases:{},register:0};if(Pa(),t!==i){if(Zn[e])return;ci(i,ci(Gh(t,s),a)),Ea(i.prototype,Ea(s,Gh(t,a))),Zn[i.prop=e]=i,t.targetTest&&(Bh.push(i),vd[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Cg(e,i),t.register&&t.register(En,i,Bn)}else Wg.push(t)},Te=255,il={aqua:[0,Te,Te],lime:[0,Te,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Te],navy:[0,0,128],white:[Te,Te,Te],olive:[128,128,0],yellow:[Te,Te,0],orange:[Te,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Te,0,0],pink:[Te,192,203],cyan:[0,Te,Te],transparent:[Te,Te,Te,0]},td=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Te+.5|0},qg=function(t,e,n){var i=t?_r(t)?[t>>16,t>>8&Te,t&Te]:0:il.black,s,a,o,l,c,h,d,u,f,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),il[t])i=il[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Te,i&Te,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Te,t&Te]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(mg),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=td(l+1/3,s,a),i[1]=td(l,s,a),i[2]=td(l-1/3,s,a);else if(~t.indexOf("="))return i=t.match(_d),n&&i.length<4&&(i[3]=1),i}else i=t.match(mg)||il.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/Te,a=i[1]/Te,o=i[2]/Te,d=Math.max(s,a,o),u=Math.min(s,a,o),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===s?(a-o)/f+(a<o?6:0):d===a?(o-s)/f+2:(s-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Yg=function(t){var e=[],n=[],i=-1;return t.split(gr).forEach(function(s){var a=s.match(xs)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},Sg=function(t,e,n){var i="",s=(t+i).match(gr),a=e?"hsla(":"rgba(",o=0,l,c,h,d;if(!s)return t;if(s=s.map(function(u){return(u=qg(u,e,1))&&a+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=Yg(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(gr,"1").split(xs),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(gr),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},gr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in il)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),zb=/hsl[a]?\(/,wd=function(t){var e=t.join(" "),n;if(gr.lastIndex=0,gr.test(e))return n=zb.test(e),t[1]=Sg(t[1],n),t[0]=Sg(t[0],n,Yg(t[1])),!0},hl,Jn=(function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,d,u,f,g=function _(m){var p=r()-i,b=m===!0,R,x,M,T;if((p>t||p<0)&&(n+=p-e),i+=p,M=i-n,R=M-a,(R>0||b)&&(T=++d.frame,u=M-d.time*1e3,d.time=M=M/1e3,a+=R+(R>=s?4:s-R),x=1),b||(l=c(_)),x)for(f=0;f<o.length;f++)o[f](M,u,T,m)};return d={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return u/(1e3/(m||60))},wake:function(){Ag&&(!ad&&gd()&&(ji=ad=window,yd=ji.document||{},li.gsap=En,(ji.gsapVersions||(ji.gsapVersions=[])).push(En.version),Eg(zh||ji.GreenSockGlobals||!ji.gsap&&ji||{}),Wg.forEach(Xg)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(m){return setTimeout(m,a-d.time*1e3+1|0)},hl=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),hl=0,c=cl},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),a=d.time*1e3+s},add:function(m,p,b){var R=p?function(x,M,T,E){m(x,M,T,E),d.remove(R)}:m;return d.remove(m),o[b?"unshift":"push"](R),Pa(),R},remove:function(m,p){~(p=o.indexOf(m))&&o.splice(p,1)&&f>=p&&f--},_listeners:o},d})(),Pa=function(){return!hl&&Jn.wake()},pe={},Vb=/^[\d.\-M][\d.\-,\s]/,Gb=/["']/g,Hb=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Gb,"").trim():+c,i=l.substr(o+1).trim();return e},Wb=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Xb=function(t){var e=(t+"").split("("),n=pe[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Hb(e[1])]:Wb(t).split(",").map(Ig)):pe._CE&&Vb.test(t)?pe._CE("",t):n},qb=function(t){return function(e){return 1-t(1-e)}},gs=function(t,e){return t&&(Ve(t)?t:pe[t]||Xb(t))||e},vs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return On(t,function(o){pe[o]=li[o]=s,pe[a=o.toLowerCase()]=n;for(var l in s)pe[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=pe[o+"."+l]=s[l]}),s},Zg=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},ed=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/sd*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*gb((h-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Zg(o);return s=sd/s,l.config=function(c,h){return r(t,c,h)},l},nd=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Zg(n);return i.config=function(s){return r(t,s)},i};On("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;vs(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});pe.Linear.easeNone=pe.none=pe.Linear.easeIn;vs("Elastic",ed("in"),ed("out"),ed());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};vs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);vs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});vs("Circ",function(r){return-(Tg(1-r*r)-1)});vs("Sine",function(r){return r===1?1:-mb(r*db)+1});vs("Back",nd("in"),nd("out"),nd());pe.SteppedEase=pe.steps=li.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-we;return function(o){return((i*fl(0,a,o)|0)+s)*n}}};ol.ease=pe["quad.out"];On("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Sd+=r+","+r+"Params,"});var Ad=function(t,e){this.id=pb++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:bd,this.set=e?e.getSetter:$h},ul=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ra(this,+e.duration,1,1),this.data=e.data,Ne&&(this._ctx=Ne,Ne.data.push(this)),hl||Jn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Ra(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Pa(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Jh(this,n),!s._dp||s.parent||Ng(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&tr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===we||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Pg(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+xg(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+xg(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ca(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-we?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Hh(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-we?0:this._rts,this.totalTime(fl(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Zh(this),Ab(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Pa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==we&&(this._tTime-=we)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=Fe(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&tr(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Hh(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Mb);var i=_n;return _n=n,Td(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),_n=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,yg(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,yg(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Mi(this,n),$n(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,$n(i)),this._dur||(this._zTime=-we),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-we:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-we,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-we)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Ve(n)?n:Lg,l=function(){var h=i.then;i.then=null,s&&s(),Ve(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){nl(this)},r})();ci(ul.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-we,_prom:0,_ps:!1,_rts:1});var wn=(function(r){bg(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=$n(n.sortChildren),Oe&&tr(n.parent||Oe,mr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ug(mr(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return sl(0,arguments,this),this},e.from=function(i,s,a){return sl(1,arguments,this),this},e.fromTo=function(i,s,a,o){return sl(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,rl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new qe(i,s,Mi(this,a),1),this},e.call=function(i,s,a){return tr(this,qe.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new qe(i,a,Mi(this,l)),this},e.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,rl(a).immediateRender=$n(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},e.staggerFromTo=function(i,s,a,o,l,c,h,d){return o.startAt=a,rl(o).immediateRender=$n(o.immediateRender),this.staggerTo(i,s,o,l,c,h,d)},e.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Fe(i),d=this._zTime<0!=i<0&&(this._initted||!c),u,f,g,_,m,p,b,R,x,M,T,E;if(this!==Oe&&h>l&&i>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,x=this._start,R=this._ts,p=!R,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(u=Fe(h%m),h===l?(_=this._repeat,u=c):(M=Fe(h/m),_=~~M,_&&_===M&&(u=c,_--),u>c&&(u=c)),M=Ca(this._tTime,m),!o&&this._tTime&&M!==_&&this._tTime-M*m-this._dur<=0&&(M=_),T&&_&1&&(u=c-u,E=1),_!==M&&!this._lock){var y=T&&M&1,w=y===(T&&_&1);if(_<M&&(y=!y),o=y?0:h%c?c:h,this._lock=1,this.render(o||(E?0:Fe(_*m)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&oi(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,M=_),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,o=y?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=Pb(this,Fe(o),Fe(u)),b&&(h-=u-(u=b._start))),this._tTime=h,this._time=u,this._act=!!R,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!M&&(oi(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(f=this._first;f;){if(g=f._next,(f._act||u>=f._start)&&f._ts&&b!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,s,a),u!==this._time||!this._ts&&!p){b=0,g&&(h+=this._zTime=-we);break}}f=g}else{f=this._last;for(var L=i<0?i:u;f;){if(g=f._prev,(f._act||L<=f._end)&&f._ts&&b!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(L-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(L-f._start)*f._ts,s,a||_n&&Td(f)),u!==this._time||!this._ts&&!p){b=0,g&&(h+=this._zTime=L?-we:we);break}}f=g}}if(b&&!s&&(this.pause(),b.render(u>=o?0:-we)._zTime=u>=o?1:-1,this._ts))return this._start=x,Zh(this),this.render(i,s,a);this._onUpdate&&!s&&oi(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(x===this._start||Math.abs(R)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Yr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(oi(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(_r(s)||(s=Mi(this,s,i)),!(i instanceof ul)){if(An(i))return i.forEach(function(o){return a.add(o,s)}),this;if(nn(i))return this.addLabel(i,s);if(Ve(i))i=qe.delayedCall(0,i);else return this}return this!==i?tr(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-bi);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof qe?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return nn(i)?this.removeLabel(i):Ve(i)?this.killTweensOf(i):(i.parent===this&&Yh(this,i),i===this._recent&&(this._recent=this._last),ms(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Fe(Jn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Mi(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=qe.delayedCall(0,s||cl,a);return o.data="isPause",this._hasPause=1,tr(this,o,Mi(this,i))},e.removePause=function(i){var s=this._first;for(i=Mi(this,i);s;)s._start===i&&s.data==="isPause"&&Yr(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Wr!==o[l]&&o[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Ti(i),l=this._first,c=_r(s),h;l;)l instanceof qe?bb(l._targets,o)&&(c?(!Wr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Mi(a,i),l=s,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,g=qe.to(a,ci({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||we,onStart:function(){if(a.pause(),!f){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==m&&Ra(g,m,0,1).render(g._time,!0,!0),f=1}h&&h.apply(g,d||[])}},s));return u?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,ci({startAt:{time:Mi(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),vg(this,Mi(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),vg(this,Mi(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+we)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Fe(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return ms(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),ms(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,l=bi,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,tr(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Fe(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Ra(a,a===Oe&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Oe._ts&&(Pg(Oe,Hh(i,Oe)),Rg=Jn.frame),Jn.frame>=gg){gg+=Kn.autoSleep||120;var s=Oe._first;if((!s||!s._ts)&&Kn.autoSleep&&Jn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Jn.sleep()}}},t})(ul);ci(wn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Yb=function(t,e,n,i,s,a,o){var l=new Bn(this._pt,t,e,0,1,Id,null,s),c=0,h=0,d,u,f,g,_,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Ia(i)),a&&(b=[n,i],a(b,t,e),n=b[0],i=b[1]),u=n.match(Qf)||[];d=Qf.exec(i);)g=d[0],_=i.substring(c,d.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),g!==u[h++]&&(m=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:m,c:g.charAt(1)==="="?ys(m,g)-m:parseFloat(g)-m,m:f&&f<4?Math.round:0},c=Qf.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(xd.test(i)||p)&&(l.e=0),this._pt=l,l},Ed=function(t,e,n,i,s,a,o,l,c,h){Ve(i)&&(i=i(s||0,t,a));var d=t[e],u=n!=="get"?n:Ve(d)?c?t[e.indexOf("set")||!Ve(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,f=Ve(d)?c?Qb:Kg:Pd,g;if(nn(i)&&(~i.indexOf("random(")&&(i=Ia(i)),i.charAt(1)==="="&&(g=ys(u,i)+(xn(u)||0),(g||g===0)&&(i=g))),!h||u!==i||dd)return!isNaN(u*i)&&i!==""?(g=new Bn(this._pt,t,e,+u||0,i-(u||0),typeof d=="boolean"?t1:Qg,0,f),c&&(g.fp=c),o&&g.modifier(o,this,t),this._pt=g):(!d&&!(e in t)&&qh(e,i),Yb.call(this,t,e,u,i,f,l||Kn.stringFilter,c))},Zb=function(t,e,n,i,s){if(Ve(t)&&(t=al(t,s,e,n,i)),!er(t)||t.style&&t.nodeType||An(t)||wg(t))return nn(t)?al(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=al(t[o],s,e,n,i);return a},Cd=function(t,e,n,i,s,a){var o,l,c,h;if(Zn[t]&&(o=new Zn[t]).init(s,o.rawVars?e[t]:Zb(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Bn(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==Aa))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Wr,dd,Rd=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,u=i.keyframes,f=i.autoRevert,g=t._dur,_=t._startAt,m=t._targets,p=t.parent,b=p&&p.data==="nested"?p.vars.targets:m,R=t._overwrite==="auto"&&!md,x=t.timeline,M=i.easeReverse||d,T,E,y,w,L,H,k,Q,z,Y,et,W,X;if(x&&(!u||!s)&&(s="none"),t._ease=gs(s,ol.ease),t._rEase=M&&(gs(M)||t._ease),t._from=!x&&!!i.runBackwards,t._from&&(t.ratio=1),!x||u&&!i.stagger){if(Q=m[0]?qr(m[0]).harness:0,W=Q&&i[Q.prop],T=Gh(i,vd),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!f?_.render(-1,!0):_.revert(h&&g?Oh:Sb),_._lazy=0),a){if(Yr(t._startAt=qe.set(m,ci({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return oi(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n||!o&&!f)&&t._startAt.revert(Oh),o&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&g&&!_){if(e&&(o=!1),y=ci({overwrite:!1,data:"isFromStart",lazy:o&&!_&&$n(l),immediateRender:o,stagger:0,parent:p},T),W&&(y[Q.prop]=W),Yr(t._startAt=qe.set(m,y)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n?t._startAt.revert(Oh):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,we,we);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&$n(l)||l&&!g,E=0;E<m.length;E++){if(L=m[E],k=L._gsap||Md(m)[E]._gsap,t._ptLookup[E]=Y={},od[k.id]&&Xr.length&&Vh(),et=b===m?E:b.indexOf(L),Q&&(z=new Q).init(L,W||T,t,et,b)!==!1&&(t._pt=w=new Bn(t._pt,L,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(nt){Y[nt]=w}),z.priority&&(H=1)),!Q||W)for(y in T)Zn[y]&&(z=Cd(y,T,t,et,L,b))?z.priority&&(H=1):Y[y]=w=Ed.call(t,L,y,"get",T[y],et,b,0,i.stringFilter);t._op&&t._op[E]&&t.kill(L,t._op[E]),R&&t._pt&&(Wr=t,Oe.killTweensOf(L,Y,t.globalTime(e)),X=!t.parent,Wr=0),t._pt&&l&&(od[k.id]=1)}H&&Dd(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!X,u&&e<=0&&x.render(bi,!0,!0)},Jb=function(t,e,n,i,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,d,u,f;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,f=t._targets.length;f--;){if(h=u[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return dd=1,t.vars[e]="+=0",Rd(t,o),dd=0,l?ll(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,d.e&&(d.e=Ge(n)+xn(d.e)),d.b&&(d.b=h.s+xn(d.b))},$b=function(t,e){var n=t[0]?qr(t[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return e;s=Ea({},e);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Kb=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(An(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},al=function(t,e,n,i,s){return Ve(t)?t.call(e,n,i,s):nn(t)&&~t.indexOf("random(")?Ia(t):t},Jg=Sd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",$g={};On(Jg+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return $g[r]=1});var qe=(function(r){bg(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:rl(i))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=i.parent||Oe,b=(An(n)||wg(n)?_r(n[0]):"length"in i)?[n]:Ti(n),R,x,M,T,E,y,w,L;if(o._targets=b.length?Md(b):ll("GSAP target "+n+" not found. https://gsap.com",!Kn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,g||u||Fh(c)||Fh(h)){i=o.vars;var H=i.easeReverse||i.yoyoEase;if(R=o.timeline=new wn({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:b}),R.kill(),R.parent=R._dp=mr(o),R._start=0,u||Fh(c)||Fh(h)){if(T=b.length,w=u&&kg(u),er(u))for(E in u)~Jg.indexOf(E)&&(L||(L={}),L[E]=u[E]);for(x=0;x<T;x++)M=Gh(i,$g),M.stagger=0,H&&(M.easeReverse=H),L&&Ea(M,L),y=b[x],M.duration=+al(c,mr(o),x,y,b),M.delay=(+al(h,mr(o),x,y,b)||0)-o._delay,!u&&T===1&&M.delay&&(o._delay=h=M.delay,o._start+=h,M.delay=0),R.to(y,M,w?w(x,y,b):0),R._ease=pe.none;R.duration()?c=h=0:o.timeline=0}else if(g){rl(ci(R.vars.defaults,{ease:"none"})),R._ease=gs(g.ease||i.ease||"none");var k=0,Q,z,Y;if(An(g))g.forEach(function(et){return R.to(b,et,">")}),R.duration();else{M={};for(E in g)E==="ease"||E==="easeEach"||Kb(E,g[E],M,g.easeEach);for(E in M)for(Q=M[E].sort(function(et,W){return et.t-W.t}),k=0,x=0;x<Q.length;x++)z=Q[x],Y={ease:z.e,duration:(z.t-(x?Q[x-1].t:0))/100*c},Y[E]=z.v,R.to(b,Y,k),k+=Y.duration;R.duration()<c&&R.to({},{duration:c-R.duration()})}}c||o.duration(c=R.duration())}else o.timeline=0;return f===!0&&!md&&(Wr=mr(o),Oe.killTweensOf(b),Wr=0),tr(p,mr(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!g&&o._start===Fe(p._time)&&$n(d)&&Eb(mr(o))&&p.data!=="nested")&&(o._tTime=-we,o.render(Math.max(0,-h)||0)),m&&Ug(mr(o),m),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-we&&!h?l:i<we?0:i,u,f,g,_,m,p,b,R;if(!c)Rb(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,R=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,a);if(u=Fe(d%_),d===l?(g=this._repeat,u=c):(m=Fe(d/_),g=~~m,g&&g===m?(u=c,g--):u>c&&(u=c)),p=this._yoyo&&g&1,p&&(u=c-u),m=Ca(this._tTime,_),u===o&&!a&&this._initted&&g===m)return this._tTime=d,this;g!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(Fe(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Fg(this,h?i:u,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var x=u<o;if(x!==this._inv){var M=x?o:c-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=M?(x?-1:1)/M:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=b=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=b=this._ease(u/c);if(this._from&&(this.ratio=b=1-b),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!m&&(oi(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(b,f.d),f=f._next;R&&R.render(i<0?i:R._dur*R._ease(u/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&ld(this,i,s,a),oi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&oi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&ld(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Yr(this,1),!s&&!(h&&!o)&&(d||o||p)&&(oi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,l){hl||Jn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Rd(this,c),h=this._ease(c/this._dur),Jb(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(Jh(this,0),this.parent||Dg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?nl(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_n),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Wr&&Wr.vars.overwrite!==!0)._first||nl(this),this.parent&&a!==this.timeline.totalDuration()&&Ra(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Ti(i):o,c=this._ptLookup,h=this._pt,d,u,f,g,_,m,p;if((!s||s==="all")&&wb(o,l))return s==="all"&&(this._pt=0),nl(this);for(d=this._op=this._op||[],s!=="all"&&(nn(s)&&(_={},On(s,function(b){return _[b]=1}),s=_),s=$b(o,s)),p=o.length;p--;)if(~l.indexOf(o[p])){u=c[p],s==="all"?(d[p]=s,g=u,f={}):(f=d[p]=d[p]||{},g=s);for(_ in g)m=u&&u[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Yh(this,m,"_pt"),delete u[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&nl(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return sl(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return sl(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return Oe.killTweensOf(i,s,a)},t})(ul);ci(qe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});On("staggerTo,staggerFrom,staggerFromTo",function(r){qe[r]=function(){var t=new wn,e=hd.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Pd=function(t,e,n){return t[e]=n},Kg=function(t,e,n){return t[e](n)},Qb=function(t,e,n,i){return t[e](i.fp,n)},jb=function(t,e,n){return t.setAttribute(e,n)},$h=function(t,e){return Ve(t[e])?Kg:Xh(t[e])&&t.setAttribute?jb:Pd},Qg=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},t1=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Id=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Ld=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},e1=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},n1=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Yh(this,e,"_pt"):e.dep||(n=1),e=i;return!n},i1=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Dd=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},Bn=(function(){function r(e,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Qg,this.d=l||this,this.set=c||Pd,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=i1,this.m=n,this.mt=s,this.tween=i},r})();On(Sd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return vd[r]=1});li.TweenMax=li.TweenLite=qe;li.TimelineLite=li.TimelineMax=wn;Oe=new wn({sortChildren:!1,defaults:ol,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Kn.stringFilter=wd;var _s=[],kh={},r1=[],Mg=0,s1=0,id=function(t){return(kh[t]||r1).map(function(e){return e()})},pd=function(){var t=Date.now(),e=[];t-Mg>2&&(id("matchMediaInit"),_s.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=ji.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),id("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Mg=t,id("matchMedia"))},jg=(function(){function r(e,n){this.selector=n&&ud(n),this.data=[],this._r=[],this.isReverted=!1,this.id=s1++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Ve(n)&&(s=i,i=n,n=Ve);var a=this,o=function(){var c=Ne,h=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=ud(s)),Ne=a,d=i.apply(a,arguments),Ve(d)&&a._r.push(d),Ne=c,a.selector=h,a.isReverted=!1,d};return a.last=o,n===Ve?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ne;Ne=null,n(this),Ne=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof qe&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof wn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof qe)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=_s.length;a--;)_s[a].id===this.id&&_s.splice(a,1)},t.revert=function(n){this.kill(n||{})},r})(),a1=(function(){function r(e){this.contexts=[],this.scope=e,Ne&&Ne.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){er(n)||(n={matches:n});var a=new jg(0,s||this.scope),o=a.conditions={},l,c,h;Ne&&!a.selector&&(a.selector=Ne.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=ji.matchMedia(n[c]),l&&(_s.indexOf(a)<0&&_s.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(pd):l.addEventListener("change",pd)));return h&&i(a,function(d){return a.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),Wh={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Xg(i)})},timeline:function(t){return new wn(t)},getTweensOf:function(t,e){return Oe.getTweensOf(t,e)},getProperty:function(t,e,n,i){nn(t)&&(t=Ti(t)[0]);var s=qr(t||{}).get,a=n?Lg:Ig;return n==="native"&&(n=""),t&&(e?a((Zn[e]&&Zn[e].get||s)(t,e,n,i)):function(o,l,c){return a((Zn[o]&&Zn[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Ti(t),t.length>1){var i=t.map(function(h){return En.quickSetter(h,e,n)}),s=i.length;return function(h){for(var d=s;d--;)i[d](h)}}t=t[0]||{};var a=Zn[e],o=qr(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var d=new a;Aa._pt=0,d.init(t,n?h+n:h,Aa,0,[t]),d.render(1,d),Aa._pt&&Ld(1,Aa)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,s=En.to(t,ci((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(e,l,c,h)};return a.tween=s,a},isTweening:function(t){return Oe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=gs(t.ease,ol.ease)),_g(ol,t||{})},config:function(t){return _g(Kn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Zn[o]&&!li[o]&&ll(e+" effect requires "+o+" plugin.")}),jf[e]=function(o,l,c){return n(Ti(o),ci(l||{},s),c)},a&&(wn.prototype[e]=function(o,l,c){return this.add(jf[e](o,er(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){pe[t]=gs(e)},parseEase:function(t,e){return arguments.length?gs(t,e):pe},getById:function(t){return Oe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new wn(t),i,s;for(n.smoothChildTiming=$n(t.smoothChildTiming),Oe.remove(n),n._dp=0,n._time=n._tTime=Oe._time,i=Oe._first;i;)s=i._next,(e||!(!i._dur&&i instanceof qe&&i.vars.onComplete===i._targets[0]))&&tr(n,i,i._start-i._delay),i=s;return tr(Oe,n,0),n},context:function(t,e){return t?new jg(t,e):Ne},matchMedia:function(t){return new a1(t)},matchMediaRefresh:function(){return _s.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||pd()},addEventListener:function(t,e){var n=kh[t]||(kh[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=kh[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Ob,wrapYoyo:Bb,distribute:kg,random:Vg,snap:zg,normalize:Fb,getUnit:xn,clamp:Lb,splitColor:qg,toArray:Ti,selector:ud,mapRange:Hg,pipe:Nb,unitize:Ub,interpolate:kb,shuffle:Bg},install:Eg,effects:jf,ticker:Jn,updateRoot:wn.updateRoot,plugins:Zn,globalTimeline:Oe,core:{PropTween:Bn,globals:Cg,Tween:qe,Timeline:wn,Animation:ul,getCache:qr,_removeLinkedListItem:Yh,reverting:function(){return _n},context:function(t){return t&&Ne&&(Ne.data.push(t),t._ctx=Ne),Ne},suppressOverwrites:function(t){return md=t}}};On("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Wh[r]=qe[r]});Jn.add(wn.updateRoot);Aa=Wh.to({},{duration:0});var o1=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},l1=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=o1(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},rd=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(nn(s)&&(l={},On(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}l1(o,s)}}}},En=Wh.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)_n?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},rd("roundProps",fd),rd("modifiers"),rd("snap",zg))||Wh;qe.version=wn.version=En.version="3.15.0";Ag=1;gd()&&Pa();var c1=pe.Power0,h1=pe.Power1,u1=pe.Power2,f1=pe.Power3,d1=pe.Power4,p1=pe.Linear,m1=pe.Quad,g1=pe.Cubic,_1=pe.Quart,x1=pe.Quint,y1=pe.Strong,v1=pe.Elastic,S1=pe.Back,M1=pe.SteppedEase,b1=pe.Bounce,T1=pe.Sine,w1=pe.Expo,A1=pe.Circ;var t_,Jr,Da,kd,Ts,E1,e_,zd,C1=function(){return typeof window<"u"},yr={},bs=180/Math.PI,Na=Math.PI/180,La=Math.atan2,n_=1e8,Vd=/([A-Z])/g,R1=/(left|right|width|margin|padding|x)/i,P1=/[\s,\(]\S/,nr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ud=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},I1=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},L1=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},D1=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},N1=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},h_=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},u_=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},U1=function(t,e,n){return t.style[e]=n},F1=function(t,e,n){return t.style.setProperty(e,n)},O1=function(t,e,n){return t._gsap[e]=n},B1=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},k1=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},z1=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},Be="transform",Qn=Be+"Origin",V1=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in yr&&s){if(this.tfm=this.tfm||{},t!=="transform")t=nr[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=xr(i,o)}):this.tfm[t]=a.x?a[t]:xr(i,t),t===Qn&&(this.tfm.zOrigin=a.zOrigin);else return nr.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(Be)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Qn,e,"")),t=Be}(s||e)&&this.props.push(t,e,s[t])},f_=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},G1=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Vd,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=zd(),(!s||!s.isStart)&&!n[Be]&&(f_(n),i.zOrigin&&n[Qn]&&(n[Qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},d_=function(t,e){var n={target:t,props:[],revert:G1,save:V1};return t._gsap||En.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},p_,Fd=function(t,e){var n=Jr.createElementNS?Jr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Jr.createElement(t);return n&&n.style?n:Jr.createElement(t)},hi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Vd,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ua(e)||e,1)||""},i_="O,Moz,ms,Ms,Webkit".split(","),Ua=function(t,e,n){var i=e||Ts,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(i_[a]+t in s););return a<0?null:(a===3?"ms":a>=0?i_[a]:"")+t},Od=function(){C1()&&window.document&&(t_=window,Jr=t_.document,Da=Jr.documentElement,Ts=Fd("div")||{style:{}},E1=Fd("div"),Be=Ua(Be),Qn=Be+"Origin",Ts.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",p_=!!Ua("perspective"),zd=En.core.reverting,kd=1)},r_=function(t){var e=t.ownerSVGElement,n=Fd("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Da.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Da.removeChild(n),s},s_=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},m_=function(t){var e,n;try{e=t.getBBox()}catch{e=r_(t),n=1}return e&&(e.width||e.height)||n||(e=r_(t)),e&&!e.width&&!e.x&&!e.y?{x:+s_(t,["x","cx","x1"])||0,y:+s_(t,["y","cy","y1"])||0,width:0,height:0}:e},g_=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&m_(t))},Kr=function(t,e){if(e){var n=t.style,i;e in yr&&e!==Qn&&(e=Be),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Vd,"-$1").toLowerCase())):n.removeAttribute(e)}},$r=function(t,e,n,i,s,a){var o=new Bn(t._pt,e,n,0,1,a?u_:h_);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},a_={deg:1,rad:1,turn:1},H1={grid:1,flex:1},Qr=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Ts.style,l=R1.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=i==="px",f=i==="%",g,_,m,p;if(i===a||!s||a_[i]||a_[a])return s;if(a!=="px"&&!u&&(s=r(t,e,n,"px")),p=t.getCTM&&g_(t),(f||a==="%")&&(yr[e]||~e.indexOf("adius")))return g=p?t.getBBox()[l?"width":"height"]:t[h],Ge(f?s/g*d:s/100*g);if(o[l?"width":"height"]=d+(u?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Jr||!_.appendChild)&&(_=Jr.body),m=_._gsap,m&&f&&m.width&&l&&m.time===Jn.time&&!m.uncache)return Ge(s/m.width*d);if(f&&(e==="height"||e==="width")){var b=t.style[e];t.style[e]=d+i,g=t[h],b?t.style[e]=b:Kr(t,e)}else(f||a==="%")&&!H1[hi(_,"display")]&&(o.position=hi(t,"position")),_===t&&(o.position="static"),_.appendChild(Ts),g=Ts[h],_.removeChild(Ts),o.position="absolute";return l&&f&&(m=qr(_),m.time=Jn.time,m.width=_[h]),Ge(u?g*s/d:g&&s?d/g*s:0)},xr=function(t,e,n,i){var s;return kd||Od(),e in nr&&e!=="transform"&&(e=nr[e],~e.indexOf(",")&&(e=e.split(",")[0])),yr[e]&&e!=="transform"?(s=ml(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Qh(hi(t,Qn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Kh[e]&&Kh[e](t,e,n)||hi(t,e)||bd(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Qr(t,e,s,n)+n:s},W1=function(t,e,n,i){if(!n||n==="none"){var s=Ua(e,t,1),a=s&&hi(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=hi(t,"borderTopColor"))}var o=new Bn(this._pt,t.style,e,0,1,Id),l=0,c=0,h,d,u,f,g,_,m,p,b,R,x,M;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=hi(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=hi(t,e)||i,_?t.style[e]=_:Kr(t,e)),h=[n,i],wd(h),n=h[0],i=h[1],u=n.match(xs)||[],M=i.match(xs)||[],M.length){for(;d=xs.exec(i);)m=d[0],b=i.substring(l,d.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=u[c++]||"")&&(f=parseFloat(_)||0,x=_.substr((f+"").length),m.charAt(1)==="="&&(m=ys(f,m)+x),p=parseFloat(m),R=m.substr((p+"").length),l=xs.lastIndex-R.length,R||(R=R||Kn.units[e]||x,l===i.length&&(i+=R,o.e+=R)),x!==R&&(f=Qr(t,e,_,R)||0),o._pt={_next:o._pt,p:b||c===1?b:",",s:f,c:p-f,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?u_:h_;return xd.test(i)&&(o.e=0),this._pt=o,o},o_={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},X1=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=o_[n]||n,e[1]=o_[i]||i,e.join(" ")},q1=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],yr[o]&&(l=1,o=o==="transformOrigin"?Qn:Be),Kr(n,o);l&&(Kr(n,Be),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ml(n,1),a.uncache=1,f_(i)))}},Kh={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new Bn(t._pt,e,n,0,0,q1);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},pl=[1,0,0,1,0,0],__={},x_=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},l_=function(t){var e=hi(t,Be);return x_(e)?pl:e.substr(7).match(_d).map(Ge)},Gd=function(t,e){var n=t._gsap||qr(t),i=t.style,s=l_(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?pl:s):(s===pl&&!t.offsetParent&&t!==Da&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,Da.appendChild(t)),s=l_(t),l?i.display=l:Kr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):Da.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Bd=function(t,e,n,i,s,a){var o=t._gsap,l=s||Gd(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,u=o.yOffset||0,f=l[0],g=l[1],_=l[2],m=l[3],p=l[4],b=l[5],R=e.split(" "),x=parseFloat(R[0])||0,M=parseFloat(R[1])||0,T,E,y,w;n?l!==pl&&(E=f*m-g*_)&&(y=x*(m/E)+M*(-_/E)+(_*b-m*p)/E,w=x*(-g/E)+M*(f/E)-(f*b-g*p)/E,x=y,M=w):(T=m_(t),x=T.x+(~R[0].indexOf("%")?x/100*T.width:x),M=T.y+(~(R[1]||R[0]).indexOf("%")?M/100*T.height:M)),i||i!==!1&&o.smooth?(p=x-c,b=M-h,o.xOffset=d+(p*f+b*_)-p,o.yOffset=u+(p*g+b*m)-b):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=M,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Qn]="0px 0px",a&&($r(a,o,"xOrigin",c,x),$r(a,o,"yOrigin",h,M),$r(a,o,"xOffset",d,o.xOffset),$r(a,o,"yOffset",u,o.yOffset)),t.setAttribute("data-svg-origin",x+" "+M)},ml=function(t,e){var n=t._gsap||new Ad(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=hi(t,Qn)||"0",h,d,u,f,g,_,m,p,b,R,x,M,T,E,y,w,L,H,k,Q,z,Y,et,W,X,nt,P,at,At,Et,Bt,Ut;return h=d=u=_=m=p=b=R=x=0,f=g=1,n.svg=!!(t.getCTM&&g_(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Be]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Be]!=="none"?l[Be]:"")),i.scale=i.rotate=i.translate="none"),E=Gd(t,n.svg),n.svg&&(n.uncache?(X=t.getBBox(),c=n.xOrigin-X.x+"px "+(n.yOrigin-X.y)+"px",W=""):W=!e&&t.getAttribute("data-svg-origin"),Bd(t,W||c,!!W||n.originIsAbsolute,n.smooth!==!1,E)),M=n.xOrigin||0,T=n.yOrigin||0,E!==pl&&(H=E[0],k=E[1],Q=E[2],z=E[3],h=Y=E[4],d=et=E[5],E.length===6?(f=Math.sqrt(H*H+k*k),g=Math.sqrt(z*z+Q*Q),_=H||k?La(k,H)*bs:0,b=Q||z?La(Q,z)*bs+_:0,b&&(g*=Math.abs(Math.cos(b*Na))),n.svg&&(h-=M-(M*H+T*Q),d-=T-(M*k+T*z))):(Ut=E[6],Et=E[7],P=E[8],at=E[9],At=E[10],Bt=E[11],h=E[12],d=E[13],u=E[14],y=La(Ut,At),m=y*bs,y&&(w=Math.cos(-y),L=Math.sin(-y),W=Y*w+P*L,X=et*w+at*L,nt=Ut*w+At*L,P=Y*-L+P*w,at=et*-L+at*w,At=Ut*-L+At*w,Bt=Et*-L+Bt*w,Y=W,et=X,Ut=nt),y=La(-Q,At),p=y*bs,y&&(w=Math.cos(-y),L=Math.sin(-y),W=H*w-P*L,X=k*w-at*L,nt=Q*w-At*L,Bt=z*L+Bt*w,H=W,k=X,Q=nt),y=La(k,H),_=y*bs,y&&(w=Math.cos(y),L=Math.sin(y),W=H*w+k*L,X=Y*w+et*L,k=k*w-H*L,et=et*w-Y*L,H=W,Y=X),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),f=Ge(Math.sqrt(H*H+k*k+Q*Q)),g=Ge(Math.sqrt(et*et+Ut*Ut)),y=La(Y,et),b=Math.abs(y)>2e-4?y*bs:0,x=Bt?1/(Bt<0?-Bt:Bt):0),n.svg&&(W=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!x_(hi(t,Be)),W&&t.setAttribute("transform",W))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(f*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Ge(f),n.scaleY=Ge(g),n.rotation=Ge(_)+o,n.rotationX=Ge(m)+o,n.rotationY=Ge(p)+o,n.skewX=b+o,n.skewY=R+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Qn]=Qh(c)),n.xOffset=n.yOffset=0,n.force3D=Kn.force3D,n.renderTransform=n.svg?Z1:p_?y_:Y1,n.uncache=0,n},Qh=function(t){return(t=t.split(" "))[0]+" "+t[1]},Nd=function(t,e,n){var i=xn(e);return Ge(parseFloat(e)+parseFloat(Qr(t,"x",n+"px",i)))+i},Y1=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,y_(t,e)},Ss="0deg",dl="0px",Ms=") ",y_=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,u=n.skewX,f=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,R=n.zOrigin,x="",M=p==="auto"&&t&&t!==1||p===!0;if(R&&(d!==Ss||h!==Ss)){var T=parseFloat(h)*Na,E=Math.sin(T),y=Math.cos(T),w;T=parseFloat(d)*Na,w=Math.cos(T),a=Nd(b,a,E*w*-R),o=Nd(b,o,-Math.sin(T)*-R),l=Nd(b,l,y*w*-R+R)}m!==dl&&(x+="perspective("+m+Ms),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(M||a!==dl||o!==dl||l!==dl)&&(x+=l!==dl||M?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Ms),c!==Ss&&(x+="rotate("+c+Ms),h!==Ss&&(x+="rotateY("+h+Ms),d!==Ss&&(x+="rotateX("+d+Ms),(u!==Ss||f!==Ss)&&(x+="skew("+u+", "+f+Ms),(g!==1||_!==1)&&(x+="scale("+g+", "+_+Ms),b.style[Be]=x||"translate(0, 0)"},Z1=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,u=n.scaleY,f=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,R=parseFloat(a),x=parseFloat(o),M,T,E,y,w;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Na,c*=Na,M=Math.cos(l)*d,T=Math.sin(l)*d,E=Math.sin(l-c)*-u,y=Math.cos(l-c)*u,c&&(h*=Na,w=Math.tan(c-h),w=Math.sqrt(1+w*w),E*=w,y*=w,h&&(w=Math.tan(h),w=Math.sqrt(1+w*w),M*=w,T*=w)),M=Ge(M),T=Ge(T),E=Ge(E),y=Ge(y)):(M=d,y=u,T=E=0),(R&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(R=Qr(f,"x",a,"px"),x=Qr(f,"y",o,"px")),(g||_||m||p)&&(R=Ge(R+g-(g*M+_*E)+m),x=Ge(x+_-(g*T+_*y)+p)),(i||s)&&(w=f.getBBox(),R=Ge(R+i/100*w.width),x=Ge(x+s/100*w.height)),w="matrix("+M+","+T+","+E+","+y+","+R+","+x+")",f.setAttribute("transform",w),b&&(f.style[Be]=w)},J1=function(t,e,n,i,s){var a=360,o=nn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?bs:1),c=l-i,h=i+c+"deg",d,u;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*n_)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*n_)%a-~~(c/a)*a)),t._pt=u=new Bn(t._pt,e,n,i,c,I1),u.e=h,u.u="deg",t._props.push(n),u},c_=function(t,e){for(var n in e)t[n]=e[n];return t},$1=function(t,e,n){var i=c_({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,d,u,f,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Be]=e,o=ml(n,1),Kr(n,Be),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Be],a[Be]=e,o=ml(n,1),a[Be]=c);for(l in yr)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(f=xn(c),g=xn(h),d=f!==g?Qr(n,l,c,g):parseFloat(c),u=parseFloat(h),t._pt=new Bn(t._pt,o,l,d,u-d,Ud),t._pt.u=g||0,t._props.push(l));c_(o,i)};On("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});Kh[t>1?"border"+r:r]=function(o,l,c,h,d){var u,f;if(arguments.length<4)return u=a.map(function(g){return xr(o,g,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},a.forEach(function(g,_){return f[g]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,f,d)}});var Hd={name:"css",register:Od,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,l=n.vars.startAt,c,h,d,u,f,g,_,m,p,b,R,x,M,T,E,y,w;kd||Od(),this.styles=this.styles||d_(t),y=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(Zn[_]&&Cd(_,e,n,i,t,s)))){if(f=typeof h,g=Kh[_],f==="function"&&(h=h.call(n,i,t,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Ia(h)),g)g(this,t,_,h,n)&&(E=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",gr.lastIndex=0,gr.test(c)||(m=xn(c),p=xn(h),p?m!==p&&(c=Qr(t,_,c,p)+p):m&&(h+=m)),this.add(o,"setProperty",c,h,i,s,0,0,_),a.push(_),y.push(_,0,o[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,s):l[_],nn(c)&&~c.indexOf("random(")&&(c=Ia(c)),xn(c+"")||c==="auto"||(c+=Kn.units[_]||xn(xr(t,_))||""),(c+"").charAt(1)==="="&&(c=xr(t,_))):c=xr(t,_),u=parseFloat(c),b=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),b&&(h=h.substr(2)),d=parseFloat(h),_ in nr&&(_==="autoAlpha"&&(u===1&&xr(t,"visibility")==="hidden"&&d&&(u=0),y.push("visibility",0,o.visibility),$r(this,o,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=nr[_],~_.indexOf(",")&&(_=_.split(",")[0]))),R=_ in yr,R){if(this.styles.save(_),w=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=hi(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var L=t.style.perspective;t.style.perspective=h,h=hi(t,"perspective"),L?t.style.perspective=L:Kr(t,"perspective")}d=parseFloat(h)}if(x||(M=t._gsap,M.renderTransform&&!e.parseTransform||ml(t,e.parseTransform),T=e.smoothOrigin!==!1&&M.smooth,x=this._pt=new Bn(this._pt,o,Be,0,1,M.renderTransform,M,0,-1),x.dep=1),_==="scale")this._pt=new Bn(this._pt,M,"scaleY",M.scaleY,(b?ys(M.scaleY,b+d):d)-M.scaleY||0,Ud),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){y.push(Qn,0,o[Qn]),h=X1(h),M.svg?Bd(t,h,0,T,0,this):(p=parseFloat(h.split(" ")[2])||0,p!==M.zOrigin&&$r(this,M,"zOrigin",M.zOrigin,p),$r(this,o,_,Qh(c),Qh(h)));continue}else if(_==="svgOrigin"){Bd(t,h,1,T,0,this);continue}else if(_ in __){J1(this,M,_,u,b?ys(u,b+h):h);continue}else if(_==="smoothOrigin"){$r(this,M,"smooth",M.smooth,h);continue}else if(_==="force3D"){M[_]=h;continue}else if(_==="transform"){$1(this,h,t);continue}}else _ in o||(_=Ua(_)||_);if(R||(d||d===0)&&(u||u===0)&&!P1.test(h)&&_ in o)m=(c+"").substr((u+"").length),d||(d=0),p=xn(h)||(_ in Kn.units?Kn.units[_]:m),m!==p&&(u=Qr(t,_,c,p)),this._pt=new Bn(this._pt,R?M:o,_,u,(b?ys(u,b+d):d)-u,!R&&(p==="px"||_==="zIndex")&&e.autoRound!==!1?N1:Ud),this._pt.u=p||0,R&&w!==h?(this._pt.b=c,this._pt.e=w,this._pt.r=D1):m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=L1);else if(_ in o)W1.call(this,t,_,c,b?b+h:h);else if(_ in t)this.add(t,_,c||t[_],b?b+h:h,i,s);else if(_!=="parseTransform"){qh(_,h);continue}R||(_ in o?y.push(_,0,o[_]):typeof t[_]=="function"?y.push(_,2,t[_]()):y.push(_,1,c||t[_])),a.push(_)}}E&&Dd(this)},render:function(t,e){if(e.tween._time||!zd())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:xr,aliases:nr,getSetter:function(t,e,n){var i=nr[e];return i&&i.indexOf(",")<0&&(e=i),e in yr&&e!==Qn&&(t._gsap.x||xr(t,"x"))?n&&e_===n?e==="scale"?B1:O1:(e_=n||{})&&(e==="scale"?k1:z1):t.style&&!Xh(t.style[e])?U1:~e.indexOf("-")?F1:$h(t,e)},core:{_removeProperty:Kr,_getMatrix:Gd}};En.utils.checkPrefix=Ua;En.core.getStyleSaver=d_;(function(r,t,e,n){var i=On(r+","+t+","+e,function(s){yr[s]=1});On(t,function(s){Kn.units[s]="deg",__[s]=1}),nr[i[13]]=r+","+t,On(n,function(s){var a=s.split(":");nr[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");On("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Kn.units[r]="px"});En.registerPlugin(Hd);var ir=En.registerPlugin(Hd)||En,kE=ir.core.Tween;function v_(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function K1(r,t,e){return t&&v_(r.prototype,t),e&&v_(r,e),r}var yn,eu,Q1,ui,jr,ts,Oa,M_,ws,Ba,b_,vr,Bi,T_,w_=function(){return yn||typeof window<"u"&&(yn=window.gsap)&&yn.registerPlugin&&yn},A_=1,Fa=[],se=[],ki=[],_l=Date.now,Wd=function(t,e){return e},j1=function(){var t=Ba.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,se),i.push.apply(i,ki),se=n,ki=i,Wd=function(a,o){return e[a](o)}},Mr=function(t,e){return~ki.indexOf(t)&&ki[ki.indexOf(t)+1][e]},xl=function(t){return!!~b_.indexOf(t)},zn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},kn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},jh="scrollLeft",tu="scrollTop",Xd=function(){return vr&&vr.isPressed||se.cache++},nu=function(t,e){var n=function i(s){if(s||s===0){A_&&(ui.history.scrollRestoration="manual");var a=vr&&vr.isPressed;s=i.v=Math.round(s)||(vr&&vr.iOS?1:0),t(s),i.cacheID=se.cache,a&&Wd("ss",s)}else(e||se.cache!==i.cacheID||Wd("ref"))&&(i.cacheID=se.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},Cn={s:jh,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:nu(function(r){return arguments.length?ui.scrollTo(r,Ke.sc()):ui.pageXOffset||jr[jh]||ts[jh]||Oa[jh]||0})},Ke={s:tu,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Cn,sc:nu(function(r){return arguments.length?ui.scrollTo(Cn.sc(),r):ui.pageYOffset||jr[tu]||ts[tu]||Oa[tu]||0})},Vn=function(t,e){return(e&&e._ctx&&e._ctx.selector||yn.utils.toArray)(t)[0]||(typeof t=="string"&&yn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},tT=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},Sr=function(t,e){var n=e.s,i=e.sc;xl(t)&&(t=jr.scrollingElement||ts);var s=se.indexOf(t),a=i===Ke.sc?1:2;!~s&&(s=se.push(t)-1),se[s+a]||zn(t,"scroll",Xd);var o=se[s+a],l=o||(se[s+a]=nu(Mr(t,n),!0)||(xl(t)?i:nu(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,o||(l.smooth=yn.getProperty(t,"scrollBehavior")==="smooth"),l},iu=function(t,e,n){var i=t,s=t,a=_l(),o=a,l=e||50,c=Math.max(500,l*3),h=function(g,_){var m=_l();_||m-a>l?(s=i,i=g,o=a,a=m):n?i+=g:i=s+(g-s)/(m-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},u=function(g){var _=o,m=s,p=_l();return(g||g===0)&&g!==i&&h(g),a===o||p-o>c?0:(i+(n?m:-m))/((n?p:a)-_)*1e3};return{update:h,reset:d,getVelocity:u}},gl=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},S_=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},E_=function(){Ba=yn.core.globals().ScrollTrigger,Ba&&Ba.core&&j1()},C_=function(t){return yn=t||w_(),!eu&&yn&&typeof document<"u"&&document.body&&(ui=window,jr=document,ts=jr.documentElement,Oa=jr.body,b_=[ui,jr,ts,Oa],Q1=yn.utils.clamp,T_=yn.core.context||function(){},ws="onpointerenter"in Oa?"pointer":"mouse",M_=He.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Bi=He.eventTypes=("ontouchstart"in ts?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ts?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return A_=0},500),eu=1),Ba||E_(),eu};Cn.op=Ke;se.cache=0;var He=(function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){eu||C_(yn)||console.warn("Please gsap.registerPlugin(Observer)"),Ba||E_();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,d=n.onStop,u=n.onStopDelay,f=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,R=n.onPress,x=n.onRelease,M=n.onRight,T=n.onLeft,E=n.onUp,y=n.onDown,w=n.onChangeX,L=n.onChangeY,H=n.onChange,k=n.onToggleX,Q=n.onToggleY,z=n.onHover,Y=n.onHoverEnd,et=n.onMove,W=n.ignoreCheck,X=n.isNormalizer,nt=n.onGestureStart,P=n.onGestureEnd,at=n.onWheel,At=n.onEnable,Et=n.onDisable,Bt=n.onClick,Ut=n.scrollSpeed,qt=n.capture,B=n.allowClicks,F=n.lockAxis,U=n.onLockAxis;this.target=o=Vn(o)||ts,this.vars=n,f&&(f=yn.utils.toArray(f)),i=i||1e-9,s=s||0,g=g||1,Ut=Ut||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(Oa).lineHeight)||22);var N,G,it,ht,C,V,O,I=this,j=0,lt=0,mt=n.passive||!h&&n.passive!==!1,ft=Sr(o,Cn),J=Sr(o,Ke),S=ft(),Ct=J(),Tt=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Bi[0]==="pointerdown",D=xl(o),v=o.ownerDocument||jr,q=[0,0,0],tt=[0,0,0],ct=0,Mt=function(){return ct=_l()},yt=function(_t,Jt){return(I.event=_t)&&f&&tT(_t.target,f)||Jt&&Tt&&_t.pointerType!=="touch"||W&&W(_t,Jt)},ut=function(){I._vx.reset(),I._vy.reset(),G.pause(),d&&d(I)},dt=function(){var _t=I.deltaX=S_(q),Jt=I.deltaY=S_(tt),vt=Math.abs(_t)>=i,Kt=Math.abs(Jt)>=i;H&&(vt||Kt)&&H(I,_t,Jt,q,tt),vt&&(M&&I.deltaX>0&&M(I),T&&I.deltaX<0&&T(I),w&&w(I),k&&I.deltaX<0!=j<0&&k(I),j=I.deltaX,q[0]=q[1]=q[2]=0),Kt&&(y&&I.deltaY>0&&y(I),E&&I.deltaY<0&&E(I),L&&L(I),Q&&I.deltaY<0!=lt<0&&Q(I),lt=I.deltaY,tt[0]=tt[1]=tt[2]=0),(ht||it)&&(et&&et(I),it&&(m&&it===1&&m(I),b&&b(I),it=0),ht=!1),V&&!(V=!1)&&U&&U(I),C&&(at(I),C=!1),N=0},Rt=function(_t,Jt,vt){q[vt]+=_t,tt[vt]+=Jt,I._vx.update(_t),I._vy.update(Jt),c?N||(N=requestAnimationFrame(dt)):dt()},kt=function(_t,Jt){F&&!O&&(I.axis=O=Math.abs(_t)>Math.abs(Jt)?"x":"y",V=!0),O!=="y"&&(q[2]+=_t,I._vx.update(_t,!0)),O!=="x"&&(tt[2]+=Jt,I._vy.update(Jt,!0)),c?N||(N=requestAnimationFrame(dt)):dt()},It=function(_t){if(!yt(_t,1)){_t=gl(_t,h);var Jt=_t.clientX,vt=_t.clientY,Kt=Jt-I.x,Ht=vt-I.y,ne=I.isDragging;I.x=Jt,I.y=vt,(ne||(Kt||Ht)&&(Math.abs(I.startX-Jt)>=s||Math.abs(I.startY-vt)>=s))&&(it||(it=ne?2:1),ne||(I.isDragging=!0),kt(Kt,Ht))}},Pt=I.onPress=function(St){yt(St,1)||St&&St.button||(I.axis=O=null,G.pause(),I.isPressed=!0,St=gl(St),j=lt=0,I.startX=I.x=St.clientX,I.startY=I.y=St.clientY,I._vx.reset(),I._vy.reset(),zn(X?o:v,Bi[1],It,mt,!0),I.deltaX=I.deltaY=0,R&&R(I))},bt=I.onRelease=function(St){if(!yt(St,1)){kn(X?o:v,Bi[1],It,!0);var _t=!isNaN(I.y-I.startY),Jt=I.isDragging,vt=Jt&&(Math.abs(I.x-I.startX)>3||Math.abs(I.y-I.startY)>3),Kt=gl(St);!vt&&_t&&(I._vx.reset(),I._vy.reset(),h&&B&&yn.delayedCall(.08,function(){if(_l()-ct>300&&!St.defaultPrevented){if(St.target.click)St.target.click();else if(v.createEvent){var Ht=v.createEvent("MouseEvents");Ht.initMouseEvent("click",!0,!0,ui,1,Kt.screenX,Kt.screenY,Kt.clientX,Kt.clientY,!1,!1,!1,!1,0,null),St.target.dispatchEvent(Ht)}}})),I.isDragging=I.isGesturing=I.isPressed=!1,d&&Jt&&!X&&G.restart(!0),it&&dt(),p&&Jt&&p(I),x&&x(I,vt)}},Yt=function(_t){return _t.touches&&_t.touches.length>1&&(I.isGesturing=!0)&&nt(_t,I.isDragging)},Qt=function(){return(I.isGesturing=!1)||P(I)},Z=function(_t){if(!yt(_t)){var Jt=ft(),vt=J();Rt((Jt-S)*Ut,(vt-Ct)*Ut,1),S=Jt,Ct=vt,d&&G.restart(!0)}},wt=function(_t){if(!yt(_t)){_t=gl(_t,h),at&&(C=!0);var Jt=(_t.deltaMode===1?l:_t.deltaMode===2?ui.innerHeight:1)*g;Rt(_t.deltaX*Jt,_t.deltaY*Jt,0),d&&!X&&G.restart(!0)}},pt=function(_t){if(!yt(_t)){var Jt=_t.clientX,vt=_t.clientY,Kt=Jt-I.x,Ht=vt-I.y;I.x=Jt,I.y=vt,ht=!0,d&&G.restart(!0),(Kt||Ht)&&kt(Kt,Ht)}},Lt=function(_t){I.event=_t,z(I)},Nt=function(_t){I.event=_t,Y(I)},gt=function(_t){return yt(_t)||gl(_t,h)&&Bt(I)};G=I._dc=yn.delayedCall(u||.25,ut).pause(),I.deltaX=I.deltaY=0,I._vx=iu(0,50,!0),I._vy=iu(0,50,!0),I.scrollX=ft,I.scrollY=J,I.isDragging=I.isGesturing=I.isPressed=!1,T_(this),I.enable=function(St){return I.isEnabled||(zn(D?v:o,"scroll",Xd),a.indexOf("scroll")>=0&&zn(D?v:o,"scroll",Z,mt,qt),a.indexOf("wheel")>=0&&zn(o,"wheel",wt,mt,qt),(a.indexOf("touch")>=0&&M_||a.indexOf("pointer")>=0)&&(zn(o,Bi[0],Pt,mt,qt),zn(v,Bi[2],bt),zn(v,Bi[3],bt),B&&zn(o,"click",Mt,!0,!0),Bt&&zn(o,"click",gt),nt&&zn(v,"gesturestart",Yt),P&&zn(v,"gestureend",Qt),z&&zn(o,ws+"enter",Lt),Y&&zn(o,ws+"leave",Nt),et&&zn(o,ws+"move",pt)),I.isEnabled=!0,I.isDragging=I.isGesturing=I.isPressed=ht=it=!1,I._vx.reset(),I._vy.reset(),S=ft(),Ct=J(),St&&St.type&&Pt(St),At&&At(I)),I},I.disable=function(){I.isEnabled&&(Fa.filter(function(St){return St!==I&&xl(St.target)}).length||kn(D?v:o,"scroll",Xd),I.isPressed&&(I._vx.reset(),I._vy.reset(),kn(X?o:v,Bi[1],It,!0)),kn(D?v:o,"scroll",Z,qt),kn(o,"wheel",wt,qt),kn(o,Bi[0],Pt,qt),kn(v,Bi[2],bt),kn(v,Bi[3],bt),kn(o,"click",Mt,!0),kn(o,"click",gt),kn(v,"gesturestart",Yt),kn(v,"gestureend",Qt),kn(o,ws+"enter",Lt),kn(o,ws+"leave",Nt),kn(o,ws+"move",pt),I.isEnabled=I.isPressed=I.isDragging=!1,Et&&Et(I))},I.kill=I.revert=function(){I.disable();var St=Fa.indexOf(I);St>=0&&Fa.splice(St,1),vr===I&&(vr=0)},Fa.push(I),X&&xl(o)&&(vr=I),I.enable(_)},K1(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();He.version="3.15.0";He.create=function(r){return new He(r)};He.register=C_;He.getAll=function(){return Fa.slice()};He.getById=function(r){return Fa.filter(function(t){return t.vars.id===r})[0]};w_()&&yn.registerPlugin(He);var Gt,Ga,he,ye,pi,xe,sp,yu,Ll,wl,vl,ru,Rn,Mu,Qd,Hn,R_,P_,Ha,q_,qd,Y_,Gn,jd,Z_,J_,es,tp,ap,Wa,op,Al,ep,Yd,su=1,Pn=Date.now,Zd=Pn(),Ei=0,Sl=0,I_=function(t,e,n){var i=di(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},L_=function(t,e){return e&&(!di(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},eT=function r(){return Sl&&requestAnimationFrame(r)},D_=function(){return Mu=1},N_=function(){return Mu=0},rr=function(t){return t},Ml=function(t){return Math.round(t*1e5)/1e5||0},$_=function(){return typeof window<"u"},K_=function(){return Gt||$_()&&(Gt=window.gsap)&&Gt.registerPlugin&&Gt},Is=function(t){return!!~sp.indexOf(t)},Q_=function(t){return(t==="Height"?op:he["inner"+t])||pi["client"+t]||xe["client"+t]},j_=function(t){return Mr(t,"getBoundingClientRect")||(Is(t)?function(){return xu.width=he.innerWidth,xu.height=op,xu}:function(){return br(t)})},nT=function(t,e,n){var i=n.d,s=n.d2,a=n.a;return(a=Mr(t,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(e?Q_(s):t["client"+s])||0}},iT=function(t,e){return!e||~ki.indexOf(t)?j_(t):function(){return xu}},sr=function(t,e){var n=e.s,i=e.d2,s=e.d,a=e.a;return Math.max(0,(n="scroll"+i)&&(a=Mr(t,n))?a()-j_(t)()[s]:Is(t)?(pi[n]||xe[n])-Q_(i):t[n]-t["offset"+i])},au=function(t,e){for(var n=0;n<Ha.length;n+=3)(!e||~e.indexOf(Ha[n+1]))&&t(Ha[n],Ha[n+1],Ha[n+2])},di=function(t){return typeof t=="string"},In=function(t){return typeof t=="function"},bl=function(t){return typeof t=="number"},As=function(t){return typeof t=="object"},yl=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},ka=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},za=Math.abs,t0="left",e0="top",lp="right",cp="bottom",Cs="width",Rs="height",El="Right",Cl="Left",Rl="Top",Pl="Bottom",Qe="padding",wi="margin",qa="Width",hp="Height",rn="px",Ai=function(t){return he.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},rT=function(t){var e=Ai(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},U_=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},br=function(t,e){var n=e&&Ai(t)[Qd]!=="matrix(1, 0, 0, 1, 0, 0)"&&Gt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},vu=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},n0=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},sT=function(t){return function(e){return Gt.utils.snap(n0(t),e)}},up=function(t){var e=Gt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return e(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=e(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:e(s<0?i-t:i+t)}},aT=function(t){return function(e,n){return up(n0(t))(e,n.direction)}},ou=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},fn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},un=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},lu=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},F_={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},cu={toggleActions:"play",anticipatePin:0},Su={top:0,left:0,center:.5,bottom:1,right:1},pu=function(t,e){if(di(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in Su?Su[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},hu=function(t,e,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,d=s.fontSize,u=s.indent,f=s.fontWeight,g=ye.createElement("div"),_=Is(n)||Mr(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,p=_?xe:n.tagName==="IFRAME"?n.contentDocument.body:n,b=t.indexOf("start")!==-1,R=b?c:h,x="border-color:"+R+";font-size:"+d+";color:"+R+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(x+=(i===Ke?lp:cp)+":"+(a+parseFloat(u))+"px;"),o&&(x+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=x,g.innerText=e||e===0?t+"-"+e:t,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],mu(g,0,i,b),g},mu=function(t,e,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+qa]=1,s["border"+o+qa]=0,s[n.p]=e+"px",Gt.set(t,s)},ae=[],np={},Dl,O_=function(){return Pn()-Ei>34&&(Dl||(Dl=requestAnimationFrame(Tr)))},Va=function(){(!Gn||!Gn.isPressed||Gn.startX>xe.clientWidth)&&(se.cache++,Gn?Dl||(Dl=requestAnimationFrame(Tr)):Tr(),Ei||Ds("scrollStart"),Ei=Pn())},Jd=function(){J_=he.innerWidth,Z_=he.innerHeight},Tl=function(t){se.cache++,(t===!0||!Rn&&!Y_&&!ye.fullscreenElement&&!ye.webkitFullscreenElement&&(!jd||J_!==he.innerWidth||Math.abs(he.innerHeight-Z_)>he.innerHeight*.25))&&yu.restart(!0)},Ls={},oT=[],i0=function r(){return un(oe,"scrollEnd",r)||Es(!0)},Ds=function(t){return Ls[t]&&Ls[t].map(function(e){return e()})||oT},fi=[],r0=function(t){for(var e=0;e<fi.length;e+=5)(!t||fi[e+4]&&fi[e+4].query===t)&&(fi[e].style.cssText=fi[e+1],fi[e].getBBox&&fi[e].setAttribute("transform",fi[e+2]||""),fi[e+3].uncache=1)},s0=function(){return se.forEach(function(t){return In(t)&&++t.cacheID&&(t.rec=t())})},fp=function(t,e){var n;for(Hn=0;Hn<ae.length;Hn++)n=ae[Hn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));Al=!0,e&&r0(e),e||Ds("revert")},a0=function(t,e){se.cache++,(e||!Wn)&&se.forEach(function(n){return In(n)&&n.cacheID++&&(n.rec=0)}),di(t)&&(he.history.scrollRestoration=ap=t)},Wn,Ps=0,B_,lT=function(){if(B_!==Ps){var t=B_=Ps;requestAnimationFrame(function(){return t===Ps&&Es(!0)})}},o0=function(){xe.appendChild(Wa),op=!Gn&&Wa.offsetHeight||he.innerHeight,xe.removeChild(Wa)},k_=function(t){return Ll(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Es=function(t,e){if(pi=ye.documentElement,xe=ye.body,sp=[he,ye,pi,xe],Ei&&!t&&!Al){fn(oe,"scrollEnd",i0);return}o0(),Wn=oe.isRefreshing=!0,Al||s0();var n=Ds("refreshInit");q_&&oe.sort(),e||fp(),se.forEach(function(i){In(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ae.slice(0).forEach(function(i){return i.refresh()}),Al=!1,ae.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),ep=1,k_(!0),ae.forEach(function(i){var s=sr(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),k_(!1),ep=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),se.forEach(function(i){In(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),a0(ap,1),yu.pause(),Ps++,Wn=2,Tr(2),ae.forEach(function(i){return In(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Wn=oe.isRefreshing=!1,Ds("refresh")},ip=0,gu=1,Il,Tr=function(t){if(t===2||!Wn&&!Al){oe.isUpdating=!0,Il&&Il.update(0);var e=ae.length,n=Pn(),i=n-Zd>=50,s=e&&ae[0].scroll();if(gu=ip>s?-1:1,Wn||(ip=s),i&&(Ei&&!Mu&&n-Ei>200&&(Ei=0,Ds("scrollEnd")),vl=Zd,Zd=n),gu<0){for(Hn=e;Hn-- >0;)ae[Hn]&&ae[Hn].update(0,i);gu=1}else for(Hn=0;Hn<e;Hn++)ae[Hn]&&ae[Hn].update(0,i);oe.isUpdating=!1}Dl=0},rp=[t0,e0,cp,lp,wi+Pl,wi+El,wi+Rl,wi+Cl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],_u=rp.concat([Cs,Rs,"boxSizing","max"+qa,"max"+hp,"position",wi,Qe,Qe+Rl,Qe+El,Qe+Pl,Qe+Cl]),cT=function(t,e,n){Xa(n);var i=t._gsap;if(i.spacerIsNative)Xa(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},$d=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=rp.length,a=e.style,o=t.style,l;s--;)l=rp[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[cp]=o[lp]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Cs]=vu(t,Cn)+rn,a[Rs]=vu(t,Ke)+rn,a[Qe]=o[wi]=o[e0]=o[t0]="0",Xa(i),o[Cs]=o["max"+qa]=n[Cs],o[Rs]=o["max"+hp]=n[Rs],o[Qe]=n[Qe],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},hT=/([A-Z])/g,Xa=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,a;for((t.t._gsap||Gt.core.getCache(t.t)).uncache=1;i<n;i+=2)a=t[i+1],s=t[i],a?e[s]=a:e[s]&&e.removeProperty(s.replace(hT,"-$1").toLowerCase())}},uu=function(t){for(var e=_u.length,n=t.style,i=[],s=0;s<e;s++)i.push(_u[s],n[_u[s]]);return i.t=t,i},uT=function(t,e,n){for(var i=[],s=t.length,a=n?8:0,o;a<s;a+=2)o=t[a],i.push(o,o in e?e[o]:t[a+1]);return i.t=t.t,i},xu={left:0,top:0},z_=function(t,e,n,i,s,a,o,l,c,h,d,u,f,g){In(t)&&(t=t(l)),di(t)&&t.substr(0,3)==="max"&&(t=u+(t.charAt(4)==="="?pu("0"+t.substr(3),n):0));var _=f?f.time():0,m,p,b;if(f&&f.seek(0),isNaN(t)||(t=+t),bl(t))f&&(t=Gt.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,u,t)),o&&mu(o,n,i,!0);else{In(e)&&(e=e(l));var R=(t||"0").split(" "),x,M,T,E;b=Vn(e,l)||xe,x=br(b)||{},(!x||!x.left&&!x.top)&&Ai(b).display==="none"&&(E=b.style.display,b.style.display="block",x=br(b),E?b.style.display=E:b.style.removeProperty("display")),M=pu(R[0],x[i.d]),T=pu(R[1]||"0",n),t=x[i.p]-c[i.p]-h+M+s-T,o&&mu(o,T,i,n-T<20||o._isStart&&T>20),n-=n-T}if(g&&(l[g]=t||-.001,t<0&&(t=0)),a){var y=t+n,w=a._isStart;m="scroll"+i.d2,mu(a,y,i,w&&y>20||!w&&(d?Math.max(xe[m],pi[m]):a.parentNode[m])<=y+1),d&&(c=br(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+rn))}return f&&b&&(m=br(b),f.seek(u),p=br(b),f._caScrollDist=m[i.p]-p[i.p],t=t/f._caScrollDist*u),f&&f.seek(_),f?t:Math.round(t)},fT=/(webkit|moz|length|cssText|inset)/i,V_=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,a,o;if(e===xe){t._stOrig=s.cssText,o=Ai(t);for(a in o)!+a&&!fT.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=t._stOrig;Gt.core.getCache(t).uncache=1,e.appendChild(t)}},l0=function(t,e,n){var i=e,s=i;return function(a){var o=Math.round(t());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},fu=function(t,e,n){var i={};i[e.p]="+="+n,Gt.set(t,i)},G_=function(t,e){var n=Sr(t,e),i="_scroll"+e.p2,s=function a(o,l,c,h,d){var u=a.tween,f=l.onComplete,g={};c=c||n();var _=l0(n,c,function(){u.kill(),a.tween=0});return d=h&&d||0,h=h||o-c,u&&u.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+h*u.ratio+d*u.ratio*u.ratio)},l.onUpdate=function(){se.cache++,a.tween&&Tr()},l.onComplete=function(){a.tween=0,f&&f.call(u)},u=a.tween=Gt.to(t,l),u};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},fn(t,"wheel",n.wheelHandler),oe.isTouch&&fn(t,"touchmove",n.wheelHandler),s},oe=(function(){function r(e,n){Ga||r.register(Gt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),tp(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Sl){this.update=this.refresh=this.kill=rr;return}n=U_(di(n)||bl(n)||n.nodeType?{trigger:n}:n,cu);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,d=s.scrub,u=s.trigger,f=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,R=s.once,x=s.snap,M=s.pinReparent,T=s.pinSpacer,E=s.containerAnimation,y=s.fastScrollEnd,w=s.preventOverlaps,L=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Cn:Ke,H=!d&&d!==0,k=Vn(n.scroller||he),Q=Gt.core.getCache(k),z=Is(k),Y=("pinType"in n?n.pinType:Mr(k,"pinType")||z&&"fixed")==="fixed",et=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],W=H&&n.toggleActions.split(" "),X="markers"in n?n.markers:cu.markers,nt=z?0:parseFloat(Ai(k)["border"+L.p2+qa])||0,P=this,at=n.onRefreshInit&&function(){return n.onRefreshInit(P)},At=nT(k,z,L),Et=iT(k,z),Bt=0,Ut=0,qt=0,B=Sr(k,L),F,U,N,G,it,ht,C,V,O,I,j,lt,mt,ft,J,S,Ct,Tt,D,v,q,tt,ct,Mt,yt,ut,dt,Rt,kt,It,Pt,bt,Yt,Qt,Z,wt,pt,Lt,Nt;if(P._startClamp=P._endClamp=!1,P._dir=L,m*=45,P.scroller=k,P.scroll=E?E.time.bind(E):B,G=B(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(q_=1,n.refreshPriority===-9999&&(Il=P)),Q.tweenScroll=Q.tweenScroll||{top:G_(k,Ke),left:G_(k,Cn)},P.tweenTo=F=Q.tweenScroll[L.p],P.scrubDuration=function(vt){Yt=bl(vt)&&vt,Yt?bt?bt.duration(vt):bt=Gt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Yt,paused:!0,onComplete:function(){return p&&p(P)}}):(bt&&bt.progress(1).kill(),bt=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(d),It=0,l||(l=i.vars.id)),x&&((!As(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in xe.style&&Gt.set(z?[xe,pi]:k,{scrollBehavior:"auto"}),se.forEach(function(vt){return In(vt)&&vt.target===(z?ye.scrollingElement||pi:k)&&(vt.smooth=!1)}),N=In(x.snapTo)?x.snapTo:x.snapTo==="labels"?sT(i):x.snapTo==="labelsDirectional"?aT(i):x.directional!==!1?function(vt,Kt){return up(x.snapTo)(vt,Pn()-Ut<500?0:Kt.direction)}:Gt.utils.snap(x.snapTo),Qt=x.duration||{min:.1,max:2},Qt=As(Qt)?wl(Qt.min,Qt.max):wl(Qt,Qt),Z=Gt.delayedCall(x.delay||Yt/2||.1,function(){var vt=B(),Kt=Pn()-Ut<500,Ht=F.tween;if((Kt||Math.abs(P.getVelocity())<10)&&!Ht&&!Mu&&Bt!==vt){var ne=(vt-ht)/ft,Ye=i&&!H?i.totalProgress():ne,le=Kt?0:(Ye-Pt)/(Pn()-vl)*1e3||0,Ce=Gt.utils.clamp(-ne,1-ne,za(le/2)*le/.185),an=ne+(x.inertia===!1?0:Ce),Re,Me,de=x,Ln=de.onStart,Ae=de.onInterrupt,vn=de.onComplete;if(Re=N(an,P),bl(Re)||(Re=an),Me=Math.max(0,Math.round(ht+Re*ft)),vt<=C&&vt>=ht&&Me!==vt){if(Ht&&!Ht._initted&&Ht.data<=za(Me-vt))return;x.inertia===!1&&(Ce=Re-ne),F(Me,{duration:Qt(za(Math.max(za(an-Ye),za(Re-Ye))*.185/le/.05||0)),ease:x.ease||"power3",data:za(Me-vt),onInterrupt:function(){return Z.restart(!0)&&Ae&&ka(P,Ae)},onComplete:function(){P.update(),Bt=B(),i&&!H&&(bt?bt.resetTo("totalProgress",Re,i._tTime/i._tDur):i.progress(Re)),It=Pt=i&&!H?i.totalProgress():P.progress,b&&b(P),vn&&ka(P,vn)}},vt,Ce*ft,Me-vt-Ce*ft),Ln&&ka(P,Ln,F.tween)}}else P.isActive&&Bt!==vt&&Z.restart(!0)}).pause()),l&&(np[l]=P),u=P.trigger=Vn(u||f!==!0&&f),Nt=u&&u._gsap&&u._gsap.stRevert,Nt&&(Nt=Nt(P)),f=f===!0?u:Vn(f),di(o)&&(o={targets:u,className:o}),f&&(g===!1||g===wi||(g=!g&&f.parentNode&&f.parentNode.style&&Ai(f.parentNode).display==="flex"?!1:Qe),P.pin=f,U=Gt.core.getCache(f),U.spacer?J=U.pinState:(T&&(T=Vn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),U.spacerIsNative=!!T,T&&(U.spacerState=uu(T))),U.spacer=Tt=T||ye.createElement("div"),Tt.classList.add("pin-spacer"),l&&Tt.classList.add("pin-spacer-"+l),U.pinState=J=uu(f)),n.force3D!==!1&&Gt.set(f,{force3D:!0}),P.spacer=Tt=U.spacer,kt=Ai(f),Mt=kt[g+L.os2],v=Gt.getProperty(f),q=Gt.quickSetter(f,L.a,rn),$d(f,Tt,kt),Ct=uu(f)),X){lt=As(X)?U_(X,F_):F_,I=hu("scroller-start",l,k,L,lt,0),j=hu("scroller-end",l,k,L,lt,0,I),D=I["offset"+L.op.d2];var gt=Vn(Mr(k,"content")||k);V=this.markerStart=hu("start",l,gt,L,lt,D,0,E),O=this.markerEnd=hu("end",l,gt,L,lt,D,0,E),E&&(Lt=Gt.quickSetter([V,O],L.a,rn)),!Y&&!(ki.length&&Mr(k,"fixedMarkers")===!0)&&(rT(z?xe:k),Gt.set([I,j],{force3D:!0}),ut=Gt.quickSetter(I,L.a,rn),Rt=Gt.quickSetter(j,L.a,rn))}if(E){var St=E.vars.onUpdate,_t=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){P.update(0,0,1),St&&St.apply(E,_t||[])})}if(P.previous=function(){return ae[ae.indexOf(P)-1]},P.next=function(){return ae[ae.indexOf(P)+1]},P.revert=function(vt,Kt){if(!Kt)return P.kill(!0);var Ht=vt!==!1||!P.enabled,ne=Rn;Ht!==P.isReverted&&(Ht&&(wt=Math.max(B(),P.scroll.rec||0),qt=P.progress,pt=i&&i.progress()),V&&[V,O,I,j].forEach(function(Ye){return Ye.style.display=Ht?"none":"block"}),Ht&&(Rn=P,P.update(Ht)),f&&(!M||!P.isActive)&&(Ht?cT(f,Tt,J):$d(f,Tt,Ai(f),yt)),Ht||P.update(Ht),Rn=ne,P.isReverted=Ht)},P.refresh=function(vt,Kt,Ht,ne){if(!((Rn||!P.enabled)&&!Kt)){if(f&&vt&&Ei){fn(r,"scrollEnd",i0);return}!Wn&&at&&at(P),Rn=P,F.tween&&!Ht&&(F.tween.kill(),F.tween=0),bt&&bt.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Dt){return Dt.vars.immediateRender&&Dt.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var Ye=At(),le=Et(),Ce=E?E.duration():sr(k,L),an=ft<=.01||!ft,Re=0,Me=ne||0,de=As(Ht)?Ht.end:n.end,Ln=n.endTrigger||u,Ae=As(Ht)?Ht.start:n.start||(n.start===0||!u?0:f?"0 0":"0 100%"),vn=P.pinnedContainer=n.pinnedContainer&&Vn(n.pinnedContainer,P),Dn=u&&Math.max(0,ae.indexOf(P))||0,Ze=Dn,ke,je,zi,Ns,on,We,mi,Us,A,$,ot,rt,st;for(X&&As(Ht)&&(rt=Gt.getProperty(I,L.p),st=Gt.getProperty(j,L.p));Ze-- >0;)We=ae[Ze],We.end||We.refresh(0,1)||(Rn=P),mi=We.pin,mi&&(mi===u||mi===f||mi===vn)&&!We.isReverted&&($||($=[]),$.unshift(We),We.revert(!0,!0)),We!==ae[Ze]&&(Dn--,Ze--);for(In(Ae)&&(Ae=Ae(P)),Ae=I_(Ae,"start",P),ht=z_(Ae,u,Ye,L,B(),V,I,P,le,nt,Y,Ce,E,P._startClamp&&"_startClamp")||(f?-.001:0),In(de)&&(de=de(P)),di(de)&&!de.indexOf("+=")&&(~de.indexOf(" ")?de=(di(Ae)?Ae.split(" ")[0]:"")+de:(Re=pu(de.substr(2),Ye),de=di(Ae)?Ae:(E?Gt.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,ht):ht)+Re,Ln=u)),de=I_(de,"end",P),C=Math.max(ht,z_(de||(Ln?"100% 0":Ce),Ln,Ye,L,B()+Re,O,j,P,le,nt,Y,Ce,E,P._endClamp&&"_endClamp"))||-.001,Re=0,Ze=Dn;Ze--;)We=ae[Ze]||{},mi=We.pin,mi&&We.start-We._pinPush<=ht&&!E&&We.end>0&&(ke=We.end-(P._startClamp?Math.max(0,We.start):We.start),(mi===u&&We.start-We._pinPush<ht||mi===vn)&&isNaN(Ae)&&(Re+=ke*(1-We.progress)),mi===f&&(Me+=ke));if(ht+=Re,C+=Re,P._startClamp&&(P._startClamp+=Re),P._endClamp&&!Wn&&(P._endClamp=C||-.001,C=Math.min(C,sr(k,L))),ft=C-ht||(ht-=.01)&&.001,an&&(qt=Gt.utils.clamp(0,1,Gt.utils.normalize(ht,C,wt))),P._pinPush=Me,V&&Re&&(ke={},ke[L.a]="+="+Re,vn&&(ke[L.p]="-="+B()),Gt.set([V,O],ke)),f&&!(ep&&P.end>=sr(k,L)))ke=Ai(f),Ns=L===Ke,zi=B(),tt=parseFloat(v(L.a))+Me,!Ce&&C>1&&(ot=(z?ye.scrollingElement||pi:k).style,ot={style:ot,value:ot["overflow"+L.a.toUpperCase()]},z&&Ai(xe)["overflow"+L.a.toUpperCase()]!=="scroll"&&(ot.style["overflow"+L.a.toUpperCase()]="scroll")),$d(f,Tt,ke),Ct=uu(f),je=br(f,!0),Us=Y&&Sr(k,Ns?Cn:Ke)(),g?(yt=[g+L.os2,ft+Me+rn],yt.t=Tt,Ze=g===Qe?vu(f,L)+ft+Me:0,Ze&&(yt.push(L.d,Ze+rn),Tt.style.flexBasis!=="auto"&&(Tt.style.flexBasis=Ze+rn)),Xa(yt),vn&&ae.forEach(function(Dt){Dt.pin===vn&&Dt.vars.pinSpacing!==!1&&(Dt._subPinOffset=!0)}),Y&&B(wt)):(Ze=vu(f,L),Ze&&Tt.style.flexBasis!=="auto"&&(Tt.style.flexBasis=Ze+rn)),Y&&(on={top:je.top+(Ns?zi-ht:Us)+rn,left:je.left+(Ns?Us:zi-ht)+rn,boxSizing:"border-box",position:"fixed"},on[Cs]=on["max"+qa]=Math.ceil(je.width)+rn,on[Rs]=on["max"+hp]=Math.ceil(je.height)+rn,on[wi]=on[wi+Rl]=on[wi+El]=on[wi+Pl]=on[wi+Cl]="0",on[Qe]=ke[Qe],on[Qe+Rl]=ke[Qe+Rl],on[Qe+El]=ke[Qe+El],on[Qe+Pl]=ke[Qe+Pl],on[Qe+Cl]=ke[Qe+Cl],S=uT(J,on,M),Wn&&B(0)),i?(A=i._initted,qd(1),i.render(i.duration(),!0,!0),ct=v(L.a)-tt+ft+Me,dt=Math.abs(ft-ct)>1,Y&&dt&&S.splice(S.length-2,2),i.render(0,!0,!0),A||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),qd(0)):ct=ft,ot&&(ot.value?ot.style["overflow"+L.a.toUpperCase()]=ot.value:ot.style.removeProperty("overflow-"+L.a));else if(u&&B()&&!E)for(je=u.parentNode;je&&je!==xe;)je._pinOffset&&(ht-=je._pinOffset,C-=je._pinOffset),je=je.parentNode;$&&$.forEach(function(Dt){return Dt.revert(!1,!0)}),P.start=ht,P.end=C,G=it=Wn?wt:B(),!E&&!Wn&&(G<wt&&B(wt),P.scroll.rec=0),P.revert(!1,!0),Ut=Pn(),Z&&(Bt=-1,Z.restart(!0)),Rn=0,i&&H&&(i._initted||pt)&&i.progress()!==pt&&i.progress(pt||0,!0).render(i.time(),!0,!0),(an||qt!==P.progress||E||_||i&&!i._initted)&&(i&&!H&&(i._initted||qt||i.vars.immediateRender!==!1)&&i.totalProgress(E&&ht<-.001&&!qt?Gt.utils.normalize(ht,C,0):qt,!0),P.progress=an||(G-ht)/ft===qt?0:qt),f&&g&&(Tt._pinOffset=Math.round(P.progress*ct)),bt&&bt.invalidate(),isNaN(rt)||(rt-=Gt.getProperty(I,L.p),st-=Gt.getProperty(j,L.p),fu(I,L,rt),fu(V,L,rt-(ne||0)),fu(j,L,st),fu(O,L,st-(ne||0))),an&&!Wn&&P.update(),h&&!Wn&&!mt&&(mt=!0,h(P),mt=!1)}},P.getVelocity=function(){return(B()-it)/(Pn()-vl)*1e3||0},P.endAnimation=function(){yl(P.callbackAnimation),i&&(bt?bt.progress(1):i.paused()?H||yl(i,P.direction<0,1):yl(i,i.reversed()))},P.labelToScroll=function(vt){return i&&i.labels&&(ht||P.refresh()||ht)+i.labels[vt]/i.duration()*ft||0},P.getTrailing=function(vt){var Kt=ae.indexOf(P),Ht=P.direction>0?ae.slice(0,Kt).reverse():ae.slice(Kt+1);return(di(vt)?Ht.filter(function(ne){return ne.vars.preventOverlaps===vt}):Ht).filter(function(ne){return P.direction>0?ne.end<=ht:ne.start>=C})},P.update=function(vt,Kt,Ht){if(!(E&&!Ht&&!vt)){var ne=Wn===!0?wt:P.scroll(),Ye=vt?0:(ne-ht)/ft,le=Ye<0?0:Ye>1?1:Ye||0,Ce=P.progress,an,Re,Me,de,Ln,Ae,vn,Dn;if(Kt&&(it=G,G=E?B():ne,x&&(Pt=It,It=i&&!H?i.totalProgress():le)),m&&f&&!Rn&&!su&&Ei&&(!le&&ht<ne+(ne-it)/(Pn()-vl)*m?le=1e-4:le===1&&C>ne+(ne-it)/(Pn()-vl)*m&&(le=.9999)),le!==Ce&&P.enabled){if(an=P.isActive=!!le&&le<1,Re=!!Ce&&Ce<1,Ae=an!==Re,Ln=Ae||!!le!=!!Ce,P.direction=le>Ce?1:-1,P.progress=le,Ln&&!Rn&&(Me=le&&!Ce?0:le===1?1:Ce===1?2:3,H&&(de=!Ae&&W[Me+1]!=="none"&&W[Me+1]||W[Me],Dn=i&&(de==="complete"||de==="reset"||de in i))),w&&(Ae||Dn)&&(Dn||d||!i)&&(In(w)?w(P):P.getTrailing(w).forEach(function(zi){return zi.endAnimation()})),H||(bt&&!Rn&&!su?(bt._dp._time-bt._start!==bt._time&&bt.render(bt._dp._time-bt._start),bt.resetTo?bt.resetTo("totalProgress",le,i._tTime/i._tDur):(bt.vars.totalProgress=le,bt.invalidate().restart())):i&&i.totalProgress(le,!!(Rn&&(Ut||vt)))),f){if(vt&&g&&(Tt.style[g+L.os2]=Mt),!Y)q(Ml(tt+ct*le));else if(Ln){if(vn=!vt&&le>Ce&&C+1>ne&&ne+1>=sr(k,L),M)if(!vt&&(an||vn)){var Ze=br(f,!0),ke=ne-ht;V_(f,xe,Ze.top+(L===Ke?ke:0)+rn,Ze.left+(L===Ke?0:ke)+rn)}else V_(f,Tt);Xa(an||vn?S:Ct),dt&&le<1&&an||q(tt+(le===1&&!vn?ct:0))}}x&&!F.tween&&!Rn&&!su&&Z.restart(!0),o&&(Ae||R&&le&&(le<1||!Yd))&&Ll(o.targets).forEach(function(zi){return zi.classList[an||R?"add":"remove"](o.className)}),a&&!H&&!vt&&a(P),Ln&&!Rn?(H&&(Dn&&(de==="complete"?i.pause().totalProgress(1):de==="reset"?i.restart(!0).pause():de==="restart"?i.restart(!0):i[de]()),a&&a(P)),(Ae||!Yd)&&(c&&Ae&&ka(P,c),et[Me]&&ka(P,et[Me]),R&&(le===1?P.kill(!1,1):et[Me]=0),Ae||(Me=le===1?1:3,et[Me]&&ka(P,et[Me]))),y&&!an&&Math.abs(P.getVelocity())>(bl(y)?y:2500)&&(yl(P.callbackAnimation),bt?bt.progress(1):yl(i,de==="reverse"?1:!le,1))):H&&a&&!Rn&&a(P)}if(Rt){var je=E?ne/E.duration()*(E._caScrollDist||0):ne;ut(je+(I._isFlipped?1:0)),Rt(je)}Lt&&Lt(-ne/E.duration()*(E._caScrollDist||0))}},P.enable=function(vt,Kt){P.enabled||(P.enabled=!0,fn(k,"resize",Tl),z||fn(k,"scroll",Va),at&&fn(r,"refreshInit",at),vt!==!1&&(P.progress=qt=0,G=it=Bt=B()),Kt!==!1&&P.refresh())},P.getTween=function(vt){return vt&&F?F.tween:bt},P.setPositions=function(vt,Kt,Ht,ne){if(E){var Ye=E.scrollTrigger,le=E.duration(),Ce=Ye.end-Ye.start;vt=Ye.start+Ce*vt/le,Kt=Ye.start+Ce*Kt/le}P.refresh(!1,!1,{start:L_(vt,Ht&&!!P._startClamp),end:L_(Kt,Ht&&!!P._endClamp)},ne),P.update()},P.adjustPinSpacing=function(vt){if(yt&&vt){var Kt=yt.indexOf(L.d)+1;yt[Kt]=parseFloat(yt[Kt])+vt+rn,yt[1]=parseFloat(yt[1])+vt+rn,Xa(yt)}},P.disable=function(vt,Kt){if(vt!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,Kt||bt&&bt.pause(),wt=0,U&&(U.uncache=1),at&&un(r,"refreshInit",at),Z&&(Z.pause(),F.tween&&F.tween.kill()&&(F.tween=0)),!z)){for(var Ht=ae.length;Ht--;)if(ae[Ht].scroller===k&&ae[Ht]!==P)return;un(k,"resize",Tl),z||un(k,"scroll",Va)}},P.kill=function(vt,Kt){P.disable(vt,Kt),bt&&!Kt&&bt.kill(),l&&delete np[l];var Ht=ae.indexOf(P);Ht>=0&&ae.splice(Ht,1),Ht===Hn&&gu>0&&Hn--,Ht=0,ae.forEach(function(ne){return ne.scroller===P.scroller&&(Ht=1)}),Ht||Wn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,vt&&i.revert({kill:!1}),Kt||i.kill()),V&&[V,O,I,j].forEach(function(ne){return ne.parentNode&&ne.parentNode.removeChild(ne)}),Il===P&&(Il=0),f&&(U&&(U.uncache=1),Ht=0,ae.forEach(function(ne){return ne.pin===f&&Ht++}),Ht||(U.spacer=0)),n.onKill&&n.onKill(P)},ae.push(P),P.enable(!1,!1),Nt&&Nt(P),i&&i.add&&!ft){var Jt=P.update;P.update=function(){P.update=Jt,se.cache++,ht||C||P.refresh()},Gt.delayedCall(.01,P.update),ft=.01,ht=C=0}else P.refresh();f&&lT()},r.register=function(n){return Ga||(Gt=n||K_(),$_()&&window.document&&r.enable(),Ga=Sl),Ga},r.defaults=function(n){if(n)for(var i in n)cu[i]=n[i];return cu},r.disable=function(n,i){Sl=0,ae.forEach(function(a){return a[i?"kill":"disable"](n)}),un(he,"wheel",Va),un(ye,"scroll",Va),clearInterval(ru),un(ye,"touchcancel",rr),un(xe,"touchstart",rr),ou(un,ye,"pointerdown,touchstart,mousedown",D_),ou(un,ye,"pointerup,touchend,mouseup",N_),yu.kill(),au(un);for(var s=0;s<se.length;s+=3)lu(un,se[s],se[s+1]),lu(un,se[s],se[s+2])},r.enable=function(){if(he=window,ye=document,pi=ye.documentElement,xe=ye.body,Gt){if(Ll=Gt.utils.toArray,wl=Gt.utils.clamp,tp=Gt.core.context||rr,qd=Gt.core.suppressOverwrites||rr,ap=he.history.scrollRestoration||"auto",ip=he.pageYOffset||0,Gt.core.globals("ScrollTrigger",r),xe){Sl=1,Wa=document.createElement("div"),Wa.style.height="100vh",Wa.style.position="absolute",o0(),eT(),He.register(Gt),r.isTouch=He.isTouch,es=He.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),jd=He.isTouch===1,fn(he,"wheel",Va),sp=[he,ye,pi,xe],Gt.matchMedia?(r.matchMedia=function(h){var d=Gt.matchMedia(),u;for(u in h)d.add(u,h[u]);return d},Gt.addEventListener("matchMediaInit",function(){s0(),fp()}),Gt.addEventListener("matchMediaRevert",function(){return r0()}),Gt.addEventListener("matchMedia",function(){Es(0,1),Ds("matchMedia")}),Gt.matchMedia().add("(orientation: portrait)",function(){return Jd(),Jd})):console.warn("Requires GSAP 3.11.0 or later"),Jd(),fn(ye,"scroll",Va);var n=xe.hasAttribute("style"),i=xe.style,s=i.borderTopStyle,a=Gt.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=br(xe),Ke.m=Math.round(o.top+Ke.sc())||0,Cn.m=Math.round(o.left+Cn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(xe.setAttribute("style",""),xe.removeAttribute("style")),ru=setInterval(O_,250),Gt.delayedCall(.5,function(){return su=0}),fn(ye,"touchcancel",rr),fn(xe,"touchstart",rr),ou(fn,ye,"pointerdown,touchstart,mousedown",D_),ou(fn,ye,"pointerup,touchend,mouseup",N_),Qd=Gt.utils.checkPrefix("transform"),_u.push(Qd),Ga=Pn(),yu=Gt.delayedCall(.2,Es).pause(),Ha=[ye,"visibilitychange",function(){var h=he.innerWidth,d=he.innerHeight;ye.hidden?(R_=h,P_=d):(R_!==h||P_!==d)&&Tl()},ye,"DOMContentLoaded",Es,he,"load",Es,he,"resize",Tl],au(fn),ae.forEach(function(h){return h.enable(0,1)}),l=0;l<se.length;l+=3)lu(un,se[l],se[l+1]),lu(un,se[l],se[l+2])}else if(ye){var c=function h(){r.enable(),ye.removeEventListener("DOMContentLoaded",h)};ye.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Yd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ru)||(ru=i)&&setInterval(O_,i),"ignoreMobileResize"in n&&(jd=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(au(un)||au(fn,n.autoRefreshEvents||"none"),Y_=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Vn(n),a=se.indexOf(s),o=Is(s);~a&&se.splice(a,o?6:2),i&&(o?ki.unshift(he,i,xe,i,pi,i):ki.unshift(s,i))},r.clearMatchMedia=function(n){ae.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(di(n)?Vn(n):n).getBoundingClientRect(),o=a[s?Cs:Rs]*i||0;return s?a.right-o>0&&a.left+o<he.innerWidth:a.bottom-o>0&&a.top+o<he.innerHeight},r.positionInViewport=function(n,i,s){di(n)&&(n=Vn(n));var a=n.getBoundingClientRect(),o=a[s?Cs:Rs],l=i==null?o/2:i in Su?Su[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/he.innerWidth:(a.top+l)/he.innerHeight},r.killAll=function(n){if(ae.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Ls.killAll||[];Ls={},i.forEach(function(s){return s()})}},r})();oe.version="3.15.0";oe.saveStyles=function(r){return r?Ll(r).forEach(function(t){if(t&&t.style){var e=fi.indexOf(t);e>=0&&fi.splice(e,5),fi.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Gt.core.getCache(t),tp())}}):fi};oe.revert=function(r,t){return fp(!r,t)};oe.create=function(r,t){return new oe(r,t)};oe.refresh=function(r){return r?Tl(!0):(Ga||oe.register())&&Es(!0)};oe.update=function(r){return++se.cache&&Tr(r===!0?2:0)};oe.clearScrollMemory=a0;oe.maxScroll=function(r,t){return sr(r,t?Cn:Ke)};oe.getScrollFunc=function(r,t){return Sr(Vn(r),t?Cn:Ke)};oe.getById=function(r){return np[r]};oe.getAll=function(){return ae.filter(function(r){return r.vars.id!=="ScrollSmoother"})};oe.isScrolling=function(){return!!Ei};oe.snapDirectional=up;oe.addEventListener=function(r,t){var e=Ls[r]||(Ls[r]=[]);~e.indexOf(t)||e.push(t)};oe.removeEventListener=function(r,t){var e=Ls[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};oe.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,a=function(c,h){var d=[],u=[],f=Gt.delayedCall(i,function(){h(d,u),d=[],u=[]}).pause();return function(g){d.length||f.restart(!0),d.push(g.trigger),u.push(g),s<=d.length&&f.progress(1)}},o;for(o in t)n[o]=o.substr(0,2)==="on"&&In(t[o])&&o!=="onRefreshInit"?a(o,t[o]):t[o];return In(s)&&(s=s(),fn(oe,"refresh",function(){return s=t.batchMax()})),Ll(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,e.push(oe.create(c))}),e};var H_=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Kd=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(He.isTouch?" pinch-zoom":""):"none",t===pi&&r(xe,e)},du={auto:1,scroll:1},dT=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,a=s._gsap||Gt.core.getCache(s),o=Pn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==xe&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(du[(l=Ai(s)).overflowY]||du[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Is(s)&&(du[(l=Ai(s)).overflowY]||du[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},c0=function(t,e,n,i){return He.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&dT,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&fn(ye,He.eventTypes[0],X_,!1,!0)},onDisable:function(){return un(ye,He.eventTypes[0],X_,!0)}})},pT=/(input|label|select|textarea)/i,W_,X_=function(t){var e=pT.test(t.target.tagName);(e||W_)&&(t._gsapAllow=!0,W_=e)},mT=function(t){As(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,a=e.onRelease,o,l,c=Vn(t.target)||pi,h=Gt.core.globals().ScrollSmoother,d=h&&h.get(),u=es&&(t.content&&Vn(t.content)||d&&t.content!==!1&&!d.smooth()&&d.content()),f=Sr(c,Ke),g=Sr(c,Cn),_=1,m=(He.isTouch&&he.visualViewport?he.visualViewport.scale*he.visualViewport.width:he.outerWidth)/he.innerWidth,p=0,b=In(i)?function(){return i(o)}:function(){return i||2.8},R,x,M=c0(c,t.type,!0,s),T=function(){return x=!1},E=rr,y=rr,w=function(){l=sr(c,Ke),y=wl(es?1:0,l),n&&(E=wl(0,sr(c,Cn))),R=Ps},L=function(){u._gsap.y=Ml(parseFloat(u._gsap.y)+f.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},H=function(){if(x){requestAnimationFrame(T);var X=Ml(o.deltaY/2),nt=y(f.v-X);if(u&&nt!==f.v+f.offset){f.offset=nt-f.v;var P=Ml((parseFloat(u&&u._gsap.y)||0)-f.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",u._gsap.y=P+"px",f.cacheID=se.cache,Tr()}return!0}f.offset&&L(),x=!0},k,Q,z,Y,et=function(){w(),k.isActive()&&k.vars.scrollY>l&&(f()>l?k.progress(1)&&f(l):k.resetTo("scrollY",l))};return u&&Gt.set(u,{y:"+=0"}),t.ignoreCheck=function(W){return es&&W.type==="touchmove"&&H(W)||_>1.05&&W.type!=="touchstart"||o.isGesturing||W.touches&&W.touches.length>1},t.onPress=function(){x=!1;var W=_;_=Ml((he.visualViewport&&he.visualViewport.scale||1)/m),k.pause(),W!==_&&Kd(c,_>1.01?!0:n?!1:"x"),Q=g(),z=f(),w(),R=Ps},t.onRelease=t.onGestureStart=function(W,X){if(f.offset&&L(),!X)Y.restart(!0);else{se.cache++;var nt=b(),P,at;n&&(P=g(),at=P+nt*.05*-W.velocityX/.227,nt*=H_(g,P,at,sr(c,Cn)),k.vars.scrollX=E(at)),P=f(),at=P+nt*.05*-W.velocityY/.227,nt*=H_(f,P,at,sr(c,Ke)),k.vars.scrollY=y(at),k.invalidate().duration(nt).play(.01),(es&&k.vars.scrollY>=l||P>=l-1)&&Gt.to({},{onUpdate:et,duration:nt})}a&&a(W)},t.onWheel=function(){k._ts&&k.pause(),Pn()-p>1e3&&(R=0,p=Pn())},t.onChange=function(W,X,nt,P,at){if(Ps!==R&&w(),X&&n&&g(E(P[2]===X?Q+(W.startX-W.x):g()+X-P[1])),nt){f.offset&&L();var At=at[2]===nt,Et=At?z+W.startY-W.y:f()+nt-at[1],Bt=y(Et);At&&Et!==Bt&&(z+=Bt-Et),f(Bt)}(nt||X)&&Tr()},t.onEnable=function(){Kd(c,n?!1:"x"),oe.addEventListener("refresh",et),fn(he,"resize",et),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=g.smooth=!1),M.enable()},t.onDisable=function(){Kd(c,!0),un(he,"resize",et),oe.removeEventListener("refresh",et),M.kill()},t.lockAxis=t.lockAxis!==!1,o=new He(t),o.iOS=es,es&&!f()&&f(1),es&&Gt.ticker.add(rr),Y=o._dc,k=Gt.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:l0(f,f(),function(){return k.pause()})},onUpdate:Tr,onComplete:Y.vars.onComplete}),o};oe.sort=function(r){if(In(r))return ae.sort(r);var t=he.pageYOffset||0;return oe.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+he.innerHeight}),ae.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};oe.observe=function(r){return new He(r)};oe.normalizeScroll=function(r){if(typeof r>"u")return Gn;if(r===!0&&Gn)return Gn.enable();if(r===!1){Gn&&Gn.kill(),Gn=r;return}var t=r instanceof He?r:mT(r);return Gn&&Gn.target===t.target&&Gn.kill(),Is(t.target)&&(Gn=t),t};oe.core={_getVelocityProp:iu,_inputObserver:c0,_scrollers:se,_proxies:ki,bridge:{ss:function(){Ei||Ds("scrollStart"),Ei=Pn()},ref:function(){return Rn}}};K_()&&Gt.registerPlugin(oe);var sn={rendering:{pixelRatio:{desktop:1.5,compact:1},compactCameraDistance:182,compactFieldScale:.84,compactTravel:{lead:2.4,tail:.2}},subject:{focalPoint:[.5,.5],safeBounds:[.08,.08,.92,.92]},entry:{duration:1.2,settleDuration:.5,ease:"power3.out"},desktop:[{id:"focus",start:0,end:.22,gather:[0,0],exit:[0,0]},{id:"gather",start:.22,end:.72,gather:[0,1],exit:[0,0]},{id:"research",start:.72,end:1,gather:[1,1],exit:[0,1]}],compact:[{id:"focus",start:0,end:.3,gather:[0,0],exit:[0,0]},{id:"gather",start:.3,end:.75,gather:[0,1],exit:[0,0]},{id:"research",start:.75,end:1,gather:[1,1],exit:[0,1]}],paths:[[[-38,-49,-24],[-43,-23,-26],[-40,12,-28],[-16,43,-28],[22,50,-28],[42,35,-26]],[[-42,-37,-30],[-31,-48,-30],[12,-46,-30],[41,-16,-30],[43,20,-30],[28,47,-30]],[[-40,30,-36],[-20,48,-36],[17,42,-36],[38,12,-36],[31,-25,-36],[3,-50,-36]]]};function h0(r,t=!1){let e=Number.isFinite(r)?Math.max(0,Math.min(1,r)):0,n=t?sn.compact:sn.desktop,i=n.find(a=>e<a.end)||n[n.length-1],s=(e-i.start)/(i.end-i.start);return{id:i.id,gather:i.gather[0]+(i.gather[1]-i.gather[0])*s,exit:i.exit[0]+(i.exit[1]-i.exit[0])*s}}function u0(r,t,e){let n=t?sn.compact:sn.desktop,i=e?sn.compact:sn.desktop,s=Math.max(0,Math.min(1,r)),a=n.findIndex(c=>s<c.end),o=n[a<0?n.length-1:a],l=i[a<0?i.length-1:a];return l.start+(s-o.start)/(o.end-o.start)*(l.end-l.start)}function f0(r,t){return t?r<=t.raw?t.raw?t.visual*r/t.raw:0:t.raw<1?t.visual+(1-t.visual)*(r-t.raw)/(1-t.raw):1:r}async function KE(r,{signal:t}={}){let e=r.closest(".intro"),n;try{n=new Lh({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.dataset.state="fallback",()=>{}}let i=n.domElement;i.setAttribute("aria-hidden","true"),i.tabIndex=-1,n.setClearColor(0,0),n.toneMapping=Vo,n.toneMappingExposure=1.2;let s=new os,a=new dn(34,1,.1,500);a.position.z=160;let o=new ei,l=new ei;o.add(l),s.add(o);let c=new ko(16777215,.8),h=new da(16777215,2);h.position.set(-45,60,85);let d=new da(5698517,3);d.position.set(65,-15,-25),s.add(c,h,d);let u=new ba(n),f=new Uh,g=u.fromScene(f,.04);s.environment=g.texture,f.dispose(),u.dispose();let _=[],m=[],p=[],b=[],R=new ei;s.add(R);let x=!1,M=!0,T=!1,E=0,y,w=getComputedStyle(r).getPropertyValue("--hero-layout").trim()==="compact",L=0,H=0,k=0,Q,z,Y,et,W,X=matchMedia("(prefers-reduced-motion: reduce)"),nt=matchMedia("(hover: hover) and (pointer: fine)"),P={entry:1,scroll:0,x:0,y:0},at=()=>document.documentElement.dataset.theme==="dark",At=!1;try{At=sessionStorage.getItem("stocklumo.motionPaused")==="true"}catch{}window.StocklumoMotion&&(At=window.StocklumoMotion.isPaused());function Et(){let C=h0(P.scroll,w);return r.dataset.chapter!==C.id&&(r.dataset.chapter=C.id),C}function Bt(){if(E=0,x||!M||document.hidden)return;let C=Et();o.rotation.set(.08+P.x,-.38+P.y+P.entry*.2+C.gather*.2+C.exit*.08,-.08+C.exit*.07),o.position.y=C.exit*5,o.scale.setScalar(1-C.exit*.08),p.forEach((V,O)=>{V.position.z=(O?-1:1)*P.entry*4}),R.rotation.z=-.08+C.gather*.07,b.forEach(({line:V,point:O,curve:I},j)=>{V.geometry.setDrawRange(0,Math.round(97*(1-P.entry*.65))),V.material.opacity=(at()?.24:.28)*(1-C.exit*.6),O.material.opacity=(w?.45:.8)*(1-C.exit*.6),I.getPoint(.13+j*.19+C.gather*.3+(1-P.entry)*.06,O.position)}),n.render(s,a)}function Ut(){!E&&!x&&M&&!document.hidden&&(E=requestAnimationFrame(Bt))}function qt(){let{width:C,height:V,top:O}=r.getBoundingClientRect();if(!C||!V)return;let I=w,j=P.scroll,lt=Math.abs(C-L)>1||Math.abs(V-H)>1||Math.abs(O+scrollY-k)>1;if(L=C,H=V,k=O+scrollY,w=getComputedStyle(r).getPropertyValue("--hero-layout").trim()==="compact",r.dataset.variant=w?"compact":"desktop",n.setPixelRatio(Math.min(devicePixelRatio||1,sn.rendering.pixelRatio[r.dataset.variant])),n.setSize(C,V,!1),a.aspect=C/V,a.position.z=w?Math.max(sn.rendering.compactCameraDistance,130/a.aspect):a.aspect<.8?190:160,R.scale.setScalar(w?sn.rendering.compactFieldScale:1),a.updateProjectionMatrix(),z&&lt){let mt=u0(j,I,w);z.refresh(),Q={raw:Math.max(0,Math.min(1,(z.scroll()-z.start)/Math.max(1,z.end-z.start))),visual:mt},P.scroll=mt}Ut()}function B(C){typeof C?.detail?.paused=="boolean"&&(At=C.detail.paused),T=X.matches||At,r.dataset.motion=T?"paused":"active",T||document.hidden||!M?(y?.pause(),ir.killTweensOf(P,"x,y"),(T||document.hidden)&&z?.disable(!1),E&&cancelAnimationFrame(E),E=0,T&&(P.entry=P.x=P.y=P.scroll=0,Ut())):(z?.enable(!1),y?.resume(),Ut())}function F(C){if(T||!M||!nt.matches||document.hidden)return;let V=e.getBoundingClientRect();N(ir.utils.clamp(-.06,.06,((C.clientY-V.top)/V.height-.5)*.12)),G(ir.utils.clamp(-.1,.1,((C.clientX-V.left)/V.width-.5)*.2))}function U(){T||(N(0),G(0))}let N,G;function it(C){C.preventDefault(),ht()}function ht(){x||(x=!0,E&&cancelAnimationFrame(E),y?.kill(),z?.kill(),ir.killTweensOf(P),Y?.disconnect(),et?.disconnect(),W?.disconnect(),e.removeEventListener("pointermove",F),e.removeEventListener("pointerleave",U),X.removeEventListener("change",B),t?.removeEventListener("abort",ht),document.removeEventListener("visibilitychange",B),document.removeEventListener("stocklumo:motionchange",B),i.removeEventListener("webglcontextlost",it),m.forEach(C=>C.dispose()),_.forEach(C=>C.dispose()),g.dispose(),n.dispose(),i.remove(),r.dataset.state="fallback")}t?.addEventListener("abort",ht,{once:!0});try{let mt=function(){_.forEach(S=>S.color.copy(S.userData.themeColors[at()?"dark":"light"])),d.color=new ee(at()?5698517:10537440),n.toneMappingExposure=at()?1.15:1.35,Ut()},C=new el,[V,O]=await Promise.all([C.loadAsync("/images/stocklumo-mark.svg"),C.loadAsync("/images/stocklumo-mark-dark.svg")]);if(x||t?.aborted||!r.isConnected)return ht(),ht;let I=new Io(.48,8,6);m.push(I),sn.paths.forEach(S=>{let Ct=new ca(S.map(ct=>new K(...ct))),Tt=new mn().setFromPoints(Ct.getPoints(96));m.push(Tt);let D=new oa({color:V.paths[0].color,transparent:!0,opacity:.24,toneMapped:!1,depthWrite:!1}),v=new Di({color:V.paths[0].color,transparent:!0,opacity:.8,toneMapped:!1,depthWrite:!1});for(let ct of[D,v])ct.userData.themeColors={light:V.paths[0].color.clone(),dark:O.paths[0].color.clone()};_.push(D,v);let q=new _o(Tt,D),tt=new Le(I,v);R.add(q,tt),b.push({line:q,point:tt,curve:Ct})}),V.paths.forEach((S,Ct)=>{let Tt=new Di({color:S.color,toneMapped:!1});Tt.userData.themeColors={light:S.color.clone(),dark:O.paths[Ct].color.clone()};let D=new Lo({color:S.color,roughness:.3,metalness:.35,clearcoat:.4,clearcoatRoughness:.18,envMapIntensity:.35});D.userData.themeColors=Tt.userData.themeColors,_.push(Tt,D);let v=new ei;p.push(v),l.add(v);for(let q of el.createShapes(S)){let tt=new Ro(q,{depth:5,steps:1,bevelEnabled:!0,bevelSize:.55,bevelThickness:.65,bevelSegments:3,curveSegments:16});m.push(tt),v.add(new Le(tt,[Tt,D]))}});let j=new yi().setFromObject(l).getCenter(new K);l.position.copy(j).multiplyScalar(-1);let lt=new ei;o.remove(l),lt.add(l),lt.scale.y=-1,o.add(lt),o.scale.setScalar(1),ir.registerPlugin(oe),N=ir.quickTo(P,"x",{duration:sn.entry.settleDuration,ease:sn.entry.ease,onUpdate:Ut}),G=ir.quickTo(P,"y",{duration:sn.entry.settleDuration,ease:sn.entry.ease,onUpdate:Ut}),z=oe.create({trigger:r,start:()=>w?r.getBoundingClientRect().top+scrollY-r.clientHeight*sn.rendering.compactTravel.lead:"top top",end:()=>w?r.getBoundingClientRect().top+scrollY+r.clientHeight*sn.rendering.compactTravel.tail:"bottom top",onUpdate:S=>{T||(P.scroll=f0(S.progress,Q),Et(),Ut())}}),y=ir.timeline({paused:!0,onUpdate:Ut}),y.to(P,{entry:0,duration:sn.entry.duration,ease:sn.entry.ease}),r.append(i),W=new MutationObserver(mt),W.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),et=new ResizeObserver(qt),et.observe(r),et.observe(e);let ft=document.querySelector(".ticker");ft&&et.observe(ft);let J=document.querySelector(".header");return J&&et.observe(J),Y=new IntersectionObserver(([S])=>{M=S.isIntersecting,B()}),Y.observe(r),e.addEventListener("pointermove",F,{passive:!0}),e.addEventListener("pointerleave",U),document.addEventListener("stocklumo:motionchange",B),document.addEventListener("visibilitychange",B),X.addEventListener("change",B),i.addEventListener("webglcontextlost",it),qt(),mt(),Bt(),r.dataset.state="ready",B(),ht}catch{return ht(),ht}}export{KE as mountHero};
