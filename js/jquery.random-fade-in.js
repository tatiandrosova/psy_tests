(function($) {

$.fn.randomFadeIn = function(duration, is_loop) {
	return this.each(function() {
		new RandomFadeIn(this, duration, is_loop);
	});
};

function RandomFadeIn(elem, duration, is_loop) {
	this.elem = elem;
	this.duration  = (duration  == undefined) ? 'slow' : duration;
	this.is_loop = (is_loop == undefined) ? true   : is_loop;

	this.len = $(this.elem).children().length;
	this.order = [];
	for (var i = 0; i < this.len; i++) this.order[i] = i;

	this._shuffleOrder();
	this._fadeInImages(0);
}

$.extend(RandomFadeIn.prototype, {

	_shuffleOrder: function() {
		var last_idx = this.len;
		while (last_idx > 0) {
			var rand_idx = Math.floor(Math.random() * last_idx);
			var last_elem = this.order[--last_idx];

			this.order[last_idx] = this.order[rand_idx];
			this.order[rand_idx] = last_elem;
		}
	},

	_fadeInImages: function(idx) {
		var self = this;
		$(this.elem).children().eq(this.order[idx]).children().fadeIn(
			self.duration,
			function() {
				idx++;
				if (idx < self.len) {
					self._fadeInImages(idx);
				} else if (self.is_loop) {
					idx = 0;
					$(self.elem).children().children().fadeOut(self.is_loop);
					self._shuffleOrder();
					self._fadeInImages(idx);
				}
			}
		);
	}
}); 

})(jQuery);
