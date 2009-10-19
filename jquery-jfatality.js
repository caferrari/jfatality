/*
 * Fatality jQuery Plugin
 * http://ferrari.eti.br
 *
 * Copyright (c) 2009 Carlos André Ferrari <caferrari[at]gmail[dot]com> 
 * Dual licensed under the MIT and GPL licenses.
 *
 * Dependencies – jquery http://jquery.com/
 * options: 
 * timeOut - Timeout to type another key before it cancels the fatality
 * logKeys - Log the pressed keys to console (it helps to make new fatalityes)
 */
(function($){
	$.fatality = {
		keys: [],
		fila: [],
		timer: null,
		initialized: false,
	
		opt: {
			logKeys: false,
			timeOut: 1000
		},
						
		addKey: function(key, callback){
			self = this;
			if (!this.initialized){
				$(document).keydown(function(event){
					self.addFila(event);
				});
				this.initialized = true;
			}
			this.keys[this.keys.length] = [key, callback];
			return this;
		},
	
		addFila: function(event){
			this.fila[this.fila.length] = event.keyCode;
			//if (this.opt.logKeys) console.log(event.keyCode);
			this.check(this);
		},
	
		check: function(self){
			$(this.keys).each(function(k, i){
				if (new RegExp(i[0].join(",") + "$").test(self.fila.join(","))){
					self.fila = [];
					i[1]();
				}
			});
			clearTimeout(this.timer);
			this.timer = setTimeout(function(){
				self.fila = [];
			}, this.opt.timeOut);
		},
	
		setOpt: function(o){
			$.extend(this.opt, o);
			return this;
		}
	
	};
})(jQuery);
