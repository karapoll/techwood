// JavaScript Document
//---------------------------------------------------------------------------------------------
// MOUSEWHEEL
//---------------------------------------------------------------------------------------------
// MOUSEWHEEL EVENT : ROULETTE SOURIS
// © 2011 Brandon Aaron (http://brandonaaron.net)
// Version: 3.0.6 - Requires: jQuery : 1.2.2+

(function(d){var e=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks){for(var a=e.length;a;){d.event.fixHooks[e[--a]]=d.event.mouseHooks}}d.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var c=e.length;c;){this.addEventListener(e[--c],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var c=e.length;c;){this.removeEventListener(e[--c],b,false)}}else{this.onmousewheel=null}}};d.fn.extend({mousewheel:function(c){return c?this.bind("mousewheel",c):this.trigger("mousewheel")},unmousewheel:function(c){return this.unbind("mousewheel",c)}});function b(h){var f=h||window.event,i=[].slice.call(arguments,1),k=0,j=true,g=0,c=0;h=d.event.fix(f);h.type="mousewheel";if(f.wheelDelta){k=f.wheelDelta/120}if(f.detail){k=-f.detail/3}c=k;if(f.axis!==undefined&&f.axis===f.HORIZONTAL_AXIS){c=0;g=-1*k}if(f.wheelDeltaY!==undefined){c=f.wheelDeltaY/120}if(f.wheelDeltaX!==undefined){g=-1*f.wheelDeltaX/120}i.unshift(h,k,g,c);return(d.event.dispatch||d.event.handle).apply(this,i)}})(jQuery);

// * 0.008333 => /120
// * 0.333333 => /3

//---------------------------------------------------------------------------------------------
// SCROLLSTART & SCROLLSTOP EVENTS : début et fin d'un scroll (un vrai scroll HTML => CSS:overflow -> auto)
// © 2009 James Padolsey (http://james.padolsey.com/)

// (function(d){var a=jQuery.event.special,c="D"+(+new Date()),b="D"+(+new Date()+1);a.scrollstart={setup:function(){var f,e=function(i){var g=this,h=arguments;if(f){clearTimeout(f)}else{i.type="scrollstart";jQuery.event.handle.apply(g,h)}f=setTimeout(function(){f=null},a.scrollstop.latency)};jQuery(this).on("scroll",e).data(c,e)},teardown:function(){jQuery(this).off("scroll",jQuery(this).data(c))}};a.scrollstop={latency:300,setup:function(){var f,e=function(i){var g=this,h=arguments;if(f){clearTimeout(f)}f=setTimeout(function(){f=null;i.type="scrollstop";jQuery.event.handle.apply(g,h)},a.scrollstop.latency)};jQuery(this).on("scroll",e).data(b,e)},teardown:function(){jQuery(this).off("scroll",jQuery(this).data(b))}}})(jQuery);

//---------------------------------------------------------------------------------------------
// DECLENCHEMENT D'UN .ON() EVENT ou DE LA FONCTION D'UNE METHODE EVENT
(function($){
	$.f_triggerEvent = $.fte = function(c,b,a){if($.isFunction(b)){b()}else{$(c.target).triggerHandler(a)}};
	
	/*
	L'utilisation de la syntaxe $.maFonction ajoute la dite fonction à jQuery...
	On peut faire de même avec une variable : ex. $.jour = 'lundi';
	
	ex. : $.f_triggerEvent(e,f,'altclick');
	e : event Object => e.data.xxx , e.keyCode , e.target , e.currentTarget , ...
	f : fonction passée en paramètre
	a : nom de l'event => 'shiftclick'
	
	var f_triggerEvent = function(e,f,trigger){
		if($.isFunction(f)){ // Si une fonction est passée en argument, on est alors dans une méthode de type leftclick()
			f(); // Exécution de la fonction passée en paramètre.
		}
		else{ 
			// Si une fonction n'est pas passée en paramètre, alors :
			// Déclenchement d'un événement pour les méthodes on()/off()
			$(e.target).triggerHandler(trigger); 
		}
	};
	*/
})(jQuery);
//---------------------------------------------------------------------------------------------
// CLICK
//---------------------------------------------------------------------------------------------
// CLICK UPDATED : ajout du cursor:pointer sur élément cliquable.
// © 2010 - Ben Alman (http://benalman.com/news/2010/03/jquery-special-events/)
(function(a){a.event.special.click={setup:function(){a(this).css('cursor','pointer');return false},teardown:function(){a(this).css('cursor','');return false}}})(jQuery);

//----------------------------------------------------------------------------------------------
// CLICKOUTSIDE EVENT : détection d'un clic de souris à l'extérieur d'un élément
// © 2010 Ben Alman (http://benalman.com) - 2012 Updated by Romain Saillant (on() & off() method) - Requires : jQuery : 1.7+

(function(c){var a=c([]);c.event.special.clickoutside={setup:function(){a=a.add(this);if(a.length===1){c(document).on('click',b)}},teardown:function(){a=a.not(this);if(a.length===0){c(document).off('click',b)}},add:function(d){var e=d.handler;d.handler=function(g,f){g.target=f;e.apply(this,arguments)}}};function b(d){c(a).each(function(){var e=c(this);if(this!==d.target&&!e.has(d.target).length){e.triggerHandler("clickoutside",[d.target])}})}})(jQuery);

//---------------------------------------------------------------------------------------------
// EVENTS : de ALTCLICK à ALTSHIFTCTRLCLICK : 
// © 2012 Romain Saillant - Requires : jQuery : 1.7+
// NOTE : Ne peut pas être combiné avec un event CLICK standard... sinon ce CLICK standard sera déclenché (puisque détecté) -> (***)

(function($){
	//-------------------------------------------------------
	var events_ASC = ['altclick','shiftclick','ctrlclick','altshiftclick','altctrlclick','shiftctrlclick','altshiftctrlclick','metaclick','strictclick'];
	//-------------------------------------------------------
	var f_ASC_Click = function(e,f){ // Sous condition, exécution de la fonction $.f_triggerEvent() (alias $.fte())
	
		// Désactivation de tous menus contextuels déclenchés - par défaut - par le navigateur.
		$(e.target).on('contextmenu',function(e){ return false; });

		if     ( e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[0]); }
		else if(!e.altKey &&  e.shiftKey && !e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[1]); }
		else if(!e.altKey && !e.shiftKey &&  e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[2]); }
		else if( e.altKey &&  e.shiftKey && !e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[3]); }
		else if( e.altKey && !e.shiftKey &&  e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[4]); }
		else if(!e.altKey &&  e.shiftKey &&  e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[5]); }
		else if( e.altKey &&  e.shiftKey &&  e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[6]); }
		else if(!e.altKey && !e.shiftKey && !e.ctrlKey &&  e.metaKey){ $.fte(e,f,events_ASC[7]); }
		else if(!e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ $.fte(e,f,events_ASC[8]); }
	};	
	//-------------------------------------------------------
	for(i=0,max=events_ASC.length;i<max;i++){
		// Création d'un nouvel event pour les méthodes on()/off() et d'une nouvelle méthode
		// [A] EVENT
		$.event.special[events_ASC[i]] = {  // [A] event pour la méthode on()
		  setup:    function(){$(this).css('cursor','pointer').on('mouseup',f_ASC_Click);},
		  teardown: function(){$(this).off('mouseup');}
		};
		// [B] METHODE
		$.fn[events_ASC[i]] = function(f){  // [B] méthode altclick()
			return this.quickEach(function(){
				$(this).css('cursor','pointer').on('mouseup',function(e){f_ASC_Click(e,f);});
			});
		};
	}
	/*
	//-------------------------------------------------------
	$.event.special.altclick = {  // [A] event pour la méthode on()
		setup:    function(){$(this).css('cursor','pointer').on('mouseup',f_ASC_Click);},
		teardown: function(){$(this).off('mouseup');}
	};
	//-------------------------------------------------------
	$.fn.altclick = function(f){  // [B] méthode altclick()
		return this.quickEach(function(){
			$(this).css('cursor','pointer').on('mouseup',function(e){f_ASC_Click(e,f);});
		});
	};
	//-------------------------------------------------------
	*/
})(jQuery);


//---------------------------------------------------------------------------------------------
// EVENTS : LEFTCLICK - MIDDLECLICK - RIGHTCLICK 
// © 2012 Romain Saillant - Requires : jQuery : 1.7+
// NOTE : Ne peuvent pas être combiné avec un event CLICK standard... -> (***)

(function($){
	//-------------------------------------------------------
	var events_BTN = ['leftclick','middleclick','rightclick'];
	// ------------------------------------------------------
	var f_mousebuttonclick = function(e,f){
		// Désactivation de tous menus contextuels déclenchés - par défaut - par le navigateur.
		$(e.target).on('contextmenu',function(e){ return false; });
		$.f_triggerEvent(e,f,events_BTN[e.which-1]);
	};
	//-------------------------------------------------------
	//var btn_num;
	$.each(events_BTN,function(i,events){
		//console.log(i);
		// Création d'un nouvel event pour les méthodes on()/off() et d'une nouvelle méthode
		// [A] EVENT
		$.event.special[events] = {  // [A] event pour la méthode on()
		//$.event.special[events_BTN[i]] = {  // [A] event pour la méthode on()
		  setup:    function(){$(this).css('cursor','pointer').on('mouseup',{button:(i+1)},f_mousebuttonclick);},
		  teardown: function(){$(this).off('mouseup');}
		};
		// [B] METHODE
		$.fn[events] = function(f){  // [B] méthode altclick()
		//$.fn[events_BTN[i]] = function(f){  // [B] méthode altclick()
			return this.quickEach(function(){
				$(this).css('cursor','pointer').on('mouseup',function(e){f_mousebuttonclick(e,f);});
			});
		};
	});
	//-------------------------------------------------------
})(jQuery);


//---------------------------------------------------------------------------------------------
// EVENTS : SLOWCLICK - FASTCLICK : 
// © 2012 Romain Saillant - Requires : jQuery : 1.7+
// NOTE : Ne peut pas être combiné avec un event CLICK standard...

(function($){
	$.event.special.slowclick = {
	  setup:    function(){$(this).css('cursor','pointer').on('mousedown',{speed:750,slow:true},f_speedclick);},
	  teardown: function(){$(this).off('mousedown');}
	};
	//-------------------------------------------------------
	$.event.special.fastclick = {
	  setup:    function(){$(this).css('cursor','pointer').on('mousedown',{speed:150,slow:false},f_speedclick);},
	  teardown: function(){$(this).off('mousedown');}
	};
	//-------------------------------------------------------
	var f_speedclick = function(e,f){

		// Désactivation de tous menus contextuels déclenchés - par défaut - par le navigateur.
		$(e.target).on('contextmenu',function(e){ return false; });

		var speed = e.data.speed,
			slow =  e.data.slow,
			time1 = e.timeStamp; // stockage du temps Unix au moment du mousedown.
			
		$(e.target).on('mouseup',function(e){ 
			e.stopImmediatePropagation(); // évite le déclenchement de multiples onmouseup
			time2 = e.timeStamp; // stockage du temps Unix au moment du mouseup.
			if((time2 - time1) > speed && slow === true){ // Si la différence de temps est supérieure à 750ms
				$.fte(e,f,'slowclick');
			}
			else if((time2 - time1) < speed && slow === false){ // Si la différence de temps est inférieure à 150ms
				$.fte(e,f,'fastclick');
			}
		});
	};	
	//-------------------------------------------------------
		$.fn.slowclick = function(f){
			return this.quickEach(function(){
				$(this).css('cursor','pointer').on('mousedown',{speed:750,slow:true},function(e){f_speedclick(e,f);});});
		};
	//-------------------------------------------------------
		$.fn.fastclick = function(f){
			return this.quickEach(function(){
				$(this).css('cursor','pointer').on('mousedown',{speed:150,slow:false},function(e){f_speedclick(e,f);});});
		};
	//-------------------------------------------------------
})(jQuery);

//---------------------------------------------------------------------------------------------
// KEYCLICK - ALTKEYCLICK - SHIFTKEYCLICK - CTRLKEYCLICK : 
// © 2012 Romain Saillant - Requires : jQuery : 1.7+

(function($){
	var keyboard = {
		// Specials :
		27: 'esc', 9: 'tab', 32:'space', 13: 'return', 16: 'shift', 17: 'ctrl', 18: 'alt', 8:'backspace', 
        145: 'scroll', 20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',
        35:'end', 
		// Directions :
		33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 
		// Numbers Keyboard :
		48:'key0', 49:'key1', 50:'key2', 51:'key3', 52:'key4', 
		53:'key5', 54:'key6', 55:'key7', 56:'key8', 57:'key9',
		// Letters :
		65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',
		78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',
		// Numbers Pad :
		96: 'num0', 97: 'num1', 98: 'num2', 99: 'num3', 100:'num4', 
		101:'num5', 102:'num6', 103:'num7', 104:'num8', 105:'num9',
		// Signs :
        106: 'num*', 107: 'num+', 108: '????', 109: 'num-', 110: '????', 111: 'Num/',
		// F-Touchs :
        112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8',
		120:'f9', 121:'f10', 122:'f11' /* 123:'f12', 191: '/' , */ 
	};
	//-------------------------------------------------------
	var keycode, // Initialisation du code ASCII de la touche enfoncée
		f_keyclick = function(obj,ev,keySign,f){

		// Désactivation de tous menus contextuels déclenchés - par défaut - par le navigateur.
		$(obj).on('contextmenu',function(e){ return false; });
		
		// Récupération du code ASCII de la touche enfoncée... e.keyCode
		$(document).on('keydown',function(e){ keycode = e.keyCode; }); 
		
		$(obj).css('cursor','pointer').on(ev,function(e){// Sur l'événement (ev) choisi...
		// Si la valeur (dans l'Object keyboard) du code ASCII détecté correspond à la valeur envoyée (keySign.touch) => si 'a' === 'a'
			if(keyboard[keycode] === keySign.touch){ 
				if($.isFunction(f)){ // Si f est bien une fonction 
					f(); // => Exécution de la fonction passée en paramétre des méthodes [B] keyclick() & cie.
				}
			}
		});

	};	
    //-------------------------------------------------------
//	$.fn.key = function(keySign,f){  // [B] méthode keyclick()
//		return this.quickEach(function(){
//			$(this).on('keyup',function(e){
//				if(keyboard[e.keyCode] === keySign.touch){
//					if($.isFunction(f)){ // Si f est bien une fonction 
//						f(); // => Exécution de la fonction passée en paramétre des méthodes [B] keyclick() & cie.
//					}
//				}
//			});
//		});
//	};
    //-------------------------------------------------------
	$.fn.keyclick = function(keySign,f){  // [B] méthode keyclick()
		return this.quickEach(function(){
			f_keyclick(this,'click',keySign,f);
		});
	};
    //-------------------------------------------------------
//	$.fn.altkey = function(keySign,f){  // [B] méthode keyclick()
//		return this.quickEach(function(){
//			$(this).on('keyup',function(e){
//				if(e.altKey && keyboard[e.keyCode] === keySign.touch){
//					if($.isFunction(f)){ // Si f est bien une fonction 
//						f(); // => Exécution de la fonction passée en paramétre des méthodes [B] keyclick() & cie.
//					}
//				}
//			});
//		});
//	};
    //-------------------------------------------------------
	$.fn.altkeyclick = function(keySign,f){  // [B] méthode altkeyclick()
		return this.quickEach(function(){
			f_keyclick(this,'altclick',keySign,f);
		});
	};
	//-------------------------------------------------------
	$.fn.shiftkeyclick = function(keySign,f){  // [B] méthode shiftkeyclick()
		return this.quickEach(function(){
			f_keyclick(this,'shiftclick',keySign,f);
		});
	};
	//-------------------------------------------------------
	$.fn.ctrlkeyclick = function(keySign,f){  // [B] méthode ctrlkeyclick()
		return this.quickEach(function(){
			f_keyclick(this,'ctrlclick',keySign,f);
		});
	};
	//-------------------------------------------------------
})(jQuery);

//---------------------------------------------------------------------------------------------
// DELAY - MOUSEHOLD :
// © 2012 Romain Saillant - Requires : jQuery : 1.7+

(function($){
	//-------------------------------------------------------
	$.f_eventdelay = function(obj,evtsDelay,params){
		return obj.quickEach(function(){
			//console.log(evDelay);
			var p = $.extend({},{
						repeat:1,
						delay:0,
						beforeAction:function(){},
						afterAction: function(){},
						action:      function(){}
					},params); // Valeurs par defaut
					
			var	t = new Timer(p.delay,p.repeat); // 1 fois X secondes
				
			obj.css('cursor','pointer').on(evtsDelay.eventStart,function(e){
				p.beforeAction();
				t.afterAction = p.afterAction;
				t.action = p.action;
				t.start();
			});
			// Annule t.action si un second événement (mouseup, blur) intevient avant la fin du délai (p.delay)
			if(evtsDelay.eventStopDelay !== null){
				obj.on(evtsDelay.eventStopDelay,function(e){t.stop();});
			}
		});
	};
	//-------------------------------------------------------
	$.fn.extend({
		mousehold:function(params){
			$.f_eventdelay(this,{eventStart:'mousedown',eventEnd:'mouseup'},params);
		},
		delayEvent : function(evtsDelay,params){
			$.f_eventdelay(this,evtsDelay,params);
		}
	});
	//-------------------------------------------------------
})(jQuery);

//---------------------------------------------------------------------------------------------
// TEXT SELECTED :
// © 2012 Romain Saillant - Requires : jQuery : 1.7+

(function($){
	//-------------------------------------------------------
	$.textSelected; // Défaut, pourra ainsi être utilisé à posteriori par la méthode textSelect()
	//-------------------------------------------------------
	$.f_textSelected = function (){
		var windoc = window || document;
		if(windoc.getSelection){ // IE9 et W3C 
			return windoc.getSelection().toString();
		}
		else if(document.selection){ // IE6/7/8
			var s = document.selection.createRange();
			return s.text;
		}
	}
	//-------------------------------------------------------
	$.fn.textSelect = function(f){
		return this.quickEach(function(){
			$(this).on('mouseup',function(e){
				$.textSelected = $.f_textSelected();
				// Protège l'exécution de la fonction de l'événement double-clic ( => 2x mouseup => le 1er est tjrs vide)
				if($.textSelected !== ''){ 
					f();
				}
			});
		});
	};
	//-------------------------------------------------------
})(jQuery);
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
