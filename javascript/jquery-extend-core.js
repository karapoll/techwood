// JavaScript Document
//---------------------------------------------------------------------------------------------
// QUICKEACH METHOD : ROULETTE SOURIS
// © 2010 - James Padolsey - http://james.padolsey.com/
// jQuery quickEach() est environ 88% plus rapide que la méthode originale jQuery each()

(function(a){a.fn.quickEach=function(g){var d=a([0]),e=-1,b=this.length,h;while(++e<b&&(h=d[0]=this[e])&&g.call(d,e,h)!==false){}return this}})(jQuery);

//---------------------------------------------------------------------------------------------
// FONCTIONS GENERIQUES
var px=function(x){return parseFloat(x)+'px'},inv=function(x){return 1/x};
var pad = function(n,l){var s=''+n;while(s.length<l){s='0'+s;}return s;};

//---------------------------------------------------------------------------------------------
// TIMER (Object JS)
// Copyright © 2011 - Romain Saillant (+ sources diverses)

var Timer=function(c,e){this.interval=parseFloat(c)*1000;this.played=false;e=(e!=undefined)?e:9e+99;var d=0;this.intCounter=function(){return d};var a=0;var b;this.action;this.start=this.play=function(){this.played=true;b=this;b.timerId=setInterval(function(){d++;b.action();if(d==e){b.stop()}},b.interval)};this.stop=function(){this.played=false;clearInterval(b.timerId);d=0};this.pause=function(){this.played=false;clearInterval(b.timerId)};this.resume=function(){this.played=true;if(d!=0&&this.played==true){b.start()}};this.playPause=function(){if(this.played==true){b.pause();this.played=false}else{b.play();this.played=true}};this.afterAction=function(){this.played=true;b=this;b.timerId=setInterval(function(){d++;if(d==e){b.stop();b.action()}},b.interval)}};

//----------------------------------------------------------------------------------------------
// RECUPERATION DES VARIABLES D'URL
// © 2006 - Roshambo - http://snipplr.com/view/799/get-url-variables/
// ex. URL : http://www.monsite.com/mapage.html?cat=26
// ex. JS  : getUrlVars()['cat'] => 26

var getUrlVars=function(){var d=[],c;var a=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var b=0;b<a.length;b++){c=a[b].split("=");d.push(c[0]);d[c[0]]=c[1]}return d};

//---------------------------------------------------------------------------------------------
// DIMENSIONS FENETRE
var dimScreen = {
	width:0,
	height:0	
}
// (Re)Calcul des dimmensions au chargement de la fenêtre et en cas de redimensionnement de cette dernière
$(window).on('load resize',function(e){
	dimScreen.width = $(window).innerWidth();
	dimScreen.height = $(window).innerHeight();	
});
//---------------------------------------------------------------------------------------------
// EVENT RESIZEEND -> Déclenchement d'un event à la fin d'un resize de la fenêtre du navigateur
// Adapté d'une contribution de Carlos Martinez - le 2 octobre 2012 - Forum : http://stackoverflow.com/

// Ex.: $(window).on('resizeEnd',function(){ window.location.reload(); }); // Rechargement de la page APRÈS un resize.

$(window).on('resize',function(){
	if(this.resized){
		clearTimeout(this.resized)
	};
	this.resized = setTimeout(function(){
		$(this).triggerHandler('resizeEnd');
	},500);
});
//---------------------------------------------------------------------------------------------
// CALCUL DU NOMBRE D'ENTREES DANS UN OBJET NATIF
// ex. : var max = Object.size(monObjectJS);

	Object.size = function(obj) {
		var size = 0, key;
		for(key in obj){if(obj.hasOwnProperty(key)) size++;}
		return size;
	};
//---------------------------------------------------------------------------------------------
// FONCTION SUBSTR (idem PHP) ex.: substr('abcdef',0,-1); © http://phpjs.org/functions/substr

var substr = function(k,a,g){var f=0,c=true,m=0,b=0,j=0,h="";k+="";var e=k.length;this.php_js=this.php_js||{};this.php_js.ini=this.php_js.ini||{};switch((this.php_js.ini["unicode.semantics"]&&this.php_js.ini["unicode.semantics"].local_value.toLowerCase())){case"on":for(f=0;f<k.length;f++){if(/[\uD800-\uDBFF]/.test(k.charAt(f))&&/[\uDC00-\uDFFF]/.test(k.charAt(f+1))){c=false;break}}if(!c){if(a<0){for(f=e-1,m=(a+=e);f>=m;f--){if(/[\uDC00-\uDFFF]/.test(k.charAt(f))&&/[\uD800-\uDBFF]/.test(k.charAt(f-1))){a--;m--}}}else{var d=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g;while((d.exec(k))!=null){var l=d.lastIndex;if(l-2<a){a++}else{break}}}if(a>=e||a<0){return false}if(g<0){for(f=e-1,b=(e+=g);f>=b;f--){if(/[\uDC00-\uDFFF]/.test(k.charAt(f))&&/[\uD800-\uDBFF]/.test(k.charAt(f-1))){e--;b--}}if(a>e){return false}return k.slice(a,e)}else{j=a+g;for(f=a;f<j;f++){h+=k.charAt(f);if(/[\uD800-\uDBFF]/.test(k.charAt(f))&&/[\uDC00-\uDFFF]/.test(k.charAt(f+1))){j++}}return h}break}case"off":default:if(a<0){a+=e}e=typeof g==="undefined"?e:(g<0?g+e:g+a);return a>=k.length||a<0||a>e?!1:k.slice(a,e)}return undefined};

//---------------------------------------------------------------------------------------------
// FONCTION FILE_GET_CONTENTS (idem PHP) © http://phpjs.org/functions/file_get_contents/
// Retourne le contenu du fichier passé en paramètre...

// Exemple : file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')

var file_get_contents = function (l,s,f,p,j){var J,c=[],z=[],A=0,B=0,C="",q=-1,d=0,y=null,F=false;var o=function(e){return e.substring(1)!==""};this.php_js=this.php_js||{};this.php_js.ini=this.php_js.ini||{};var r=this.php_js.ini;f=f||this.php_js.default_streams_context||null;if(!s){s=0}var I={FILE_USE_INCLUDE_PATH:1,FILE_TEXT:32,FILE_BINARY:64};if(typeof s==="number"){d=s}else{s=[].concat(s);for(B=0;B<s.length;B++){if(I[s[B]]){d=d|I[s[B]]}}}if(d&I.FILE_BINARY&&(d&I.FILE_TEXT)){throw"You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()"}if((d&I.FILE_USE_INCLUDE_PATH)&&r.include_path&&r.include_path.local_value){var x=r.include_path.local_value.indexOf("/")!==-1?"/":"\\";l=r.include_path.local_value+x+l}else{if(!/^(https?|file):/.test(l)){C=this.window.location.href;q=l.indexOf("/")===0?C.indexOf("/",8)-1:C.lastIndexOf("/");l=C.slice(0,q+1)+l}}if(f){var w=f.stream_options&&f.stream_options.http;F=!!w}if(!f||F){var b=this.window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(!b){throw new Error("XMLHttpRequest not supported")}var g=F?w.method:"GET";var n=!!(f&&f.stream_params&&f.stream_params["phpjs.async"]);if(r["phpjs.ajaxBypassCache"]&&r["phpjs.ajaxBypassCache"].local_value){l+=(l.match(/\?/)==null?"?":"&")+(new Date()).getTime()}b.open(g,l,n);if(n){var a=f.stream_params.notification;if(typeof a==="function"){if(0&&b.addEventListener){}else{b.onreadystatechange=function(e){var i={responseText:b.responseText,responseXML:b.responseXML,status:b.status,statusText:b.statusText,readyState:b.readyState,evt:e};var k;switch(b.readyState){case 0:a.call(i,0,0,"",0,0,0);break;case 1:a.call(i,0,0,"",0,0,0);break;case 2:a.call(i,0,0,"",0,0,0);break;case 3:k=b.responseText.length*2;a.call(i,7,0,"",0,k,0);break;case 4:if(b.status>=200&&b.status<400){k=b.responseText.length*2;a.call(i,8,0,"",b.status,k,0)}else{if(b.status===403){a.call(i,10,2,"",b.status,0,0)}else{a.call(i,9,2,"",b.status,0,0)}}break;default:throw"Unrecognized ready state for file_get_contents()"}}}}}if(F){var H=w.header&&w.header.split(/\r?\n/);var v=false;for(B=0;B<H.length;B++){var E=H[B];var D=E.search(/:\s*/);var m=E.substring(0,D);b.setRequestHeader(m,E.substring(D+1));if(m==="User-Agent"){v=true}}if(!v){var t=w.user_agent||(r.user_agent&&r.user_agent.local_value);if(t){b.setRequestHeader("User-Agent",t)}}y=w.content||null}if(d&I.FILE_TEXT){var u="text/html";if(w&&w["phpjs.override"]){u=w["phpjs.override"]}else{var h=(r["unicode.stream_encoding"]&&r["unicode.stream_encoding"].local_value)||"UTF-8";if(w&&w.header&&(/^content-type:/im).test(w.header)){u=w.header.match(/^content-type:\s*(.*)$/im)[1]}if(!(/;\s*charset=/).test(u)){u+="; charset="+h}}b.overrideMimeType(u)}else{if(d&I.FILE_BINARY){b.overrideMimeType("text/plain; charset=x-user-defined")}}try{if(w&&w["phpjs.sendAsBinary"]){b.sendAsBinary(y)}else{b.send(y)}}catch(G){return false}J=b.getAllResponseHeaders();if(J){J=J.split("\n");for(A=0;A<J.length;A++){if(o(J[A])){z.push(J[A])}}J=z;for(B=0;B<J.length;B++){c[B]=J[B]}this.$http_response_header=c}if(p||j){if(j){return b.responseText.substr(p||0,j)}return b.responseText.substr(p)}return b.responseText}return false};

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
