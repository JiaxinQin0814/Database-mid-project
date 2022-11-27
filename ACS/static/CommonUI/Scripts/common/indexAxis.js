//Ê×Ò³Ê±¼äÖá
!function() {
	"use strict";
	var t = {
		ready: function(t) {
			/in/.test(document.readyState) ? setTimeout("Lib.ready(" + t + ")", 9) : t()
		}
	};
	window.Lib = t
}(), 
function() {
	"use strict";
	var t = function(t, e, a, s) {
			this.min = e, this.start = a, this.end = s, this.widthMonth = t
		};
	t.prototype.formatMonth = function(t) {
		return t = parseInt(t, 10), t >= 10 ? t : "0" + t
	}, t.prototype.getStartOffset = function() {
		return this.widthMonth / 12 * (12 * (this.start.getFullYear() - this.min) + this.start.getMonth())
	}, t.prototype.getFullYears = function() {
		return (this.end && this.end.getFullYear() || this.start.getFullYear()) - this.start.getFullYear()
	}, t.prototype.getMonths = function() {
		var t = this.getFullYears(),
			e = 0;
		return this.end ? this.end.hasMonth ? (e += this.end.getMonth() + 1, e += 12 - (this.start.hasMonth ? this.start.getMonth() : 0), e += 12 * (t - 1)) : (e += 12 - (this.start.hasMonth ? this.start.getMonth() : 0), e += 12 * (t - 1 > 0 ? t - 1 : 0)) : e += this.start.hasMonth ? 1 : 12, e
	}, t.prototype.getWidth = function() {
		return this.widthMonth / 12 * this.getMonths()
	}, t.prototype.getDateLabel = function() {
		return [(this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + "/" : "") + this.start.getFullYear(), this.end ? "-" + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + "/" : "") + this.end.getFullYear()) : ""].join("")
	}, window.TimesheetBubble = t
}(), 
function() {
	"use strict";
	var t = function(t, e, a, s) {
			this.container = "#" + t, this.data = [], this.year = {
				min: e,
				max: a
			}, this.parse(s || []), "undefined" != typeof document && (this.drawSections(), this.insertData())
		};
	t.prototype.insertData = function() {
		for (var t = [], e = document.querySelector(this.container + " .scale section").offsetWidth, a = 0, s = this.data.length; s > a; a++) {
			var n = this.data[a],
				i = new TimesheetBubble(e, this.year.min, n.start, n.end),
				r = ['<span style="margin-left: ' + i.getStartOffset() + "px; width: " + i.getWidth() + 'px;" class="bubble bubble-' + (n.type || "default") + '" data-duration="' + (n.end ? Math.round((n.end - n.start) / 1e3 / 60 / 60 / 24 / 39) : "") + '" title="'+ n.label +'"></span>', '<span class="date">' + i.getDateLabel() + "</span> ", '<span class="label" title="'+ n.label +'">' + n.label + "</span>"].join("");
			t.push("<li>" + r + "</li>")
		}
		document.querySelector(this.container).innerHTML += '<ul class="data">' + t.join("") + "</ul>"
	}, t.prototype.drawSections = function() {
		for (var t = [], e = this.year.min; e <= this.year.max; e++) t.push("<section><p>" + e + "</p></section>");
		document.querySelector(this.container).className = "timesheet color-scheme-default", document.querySelector(this.container).innerHTML = '<div class="scale">' + t.join("") + "</div>"
	}, t.prototype.parseDate = function(t) {
		return -1 === t.indexOf("/") ? (t = new Date(parseInt(t, 10), 0, 1), t.hasMonth = !1) : (t = t.split("/"), t = new Date(parseInt(t[1], 10), parseInt(t[0], 10) - 1, 1), t.hasMonth = !0), t
	}, t.prototype.parse = function(t) {
		for (var e = 0, a = t.length; a > e; e++) {
			var s = this.parseDate(t[e][0]),
				n = 4 === t[e].length ? this.parseDate(t[e][1]) : null,
				i = 4 === t[e].length ? t[e][2] : t[e][1],
				r = t[e][3] || "default";
			s.getFullYear() < this.year.min && (this.year.min = s.getFullYear()), n && n.getFullYear() > this.year.max ? this.year.max = n.getFullYear() : s.getFullYear() > this.year.max && (this.year.max = s.getFullYear()), this.data.push({
				start: s,
				end: n,
				label: i,
				type: r
			})
		}
	}, window.Timesheet = t
}();

