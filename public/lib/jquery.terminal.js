(function (e, R)
{
	function ta(c, d)
	{
		var i;
		if (typeof c === "string" && typeof d === "string")
		{
			localStorage[c] = d;
			return true
		}
		else if (typeof c === "object" && typeof d === "undefined")
		{
			for (i in c)
				if (c.hasOwnProperty(i)) localStorage[i] = c[i];
			return true
		}
		return false
	}

	function ka(c, d)
	{
		var i, g;
		i = new Date;
		i.setTime(i.getTime() + 31536E6);
		i = "; expires=" + i.toGMTString();
		if (typeof c === "string" && typeof d === "string")
		{
			document.cookie = c + "=" + d + i + "; path=/";
			return true
		}
		else if (typeof c === "object" && typeof d === "undefined")
		{
			for (g in c)
				if (c.hasOwnProperty(g)) document.cookie = g + "=" + c[g] + i + "; path=/";
			return true
		}
		return false
	}

	function ua(c)
	{
		return localStorage[c]
	}

	function va(c)
	{
		var d, i, g;
		c += "=";
		d = document.cookie.split(";");
		for (i = 0; i < d.length; i++)
		{
			for (g = d[i]; g.charAt(0) === " ";) g = g.substring(1, g.length);
			if (g.indexOf(c) === 0) return g.substring(c.length, g.length)
		}
		return null
	}

	function wa(c)
	{
		return delete localStorage[c]
	}

	function xa(c)
	{
		return ka(c, "", -1)
	}

	function ia(c, d)
	{
		var i = [],
			g = c.length;
		if (g < d) return [c];
		for (var l = 0; l < g; l += d) i.push(c.substring(l, l + d));
		return i
	}

	function ya(c)
	{
		var d = c ? [c] : [];
		e.extend(this,
		{
			size: function ()
			{
				return d.length
			},
			pop: function ()
			{
				if (d.length === 0) return null;
				else
				{
					var i = d[d.length - 1];
					d = d.slice(0, d.length - 1);
					return i
				}
			},
			push: function (i)
			{
				d = d.concat([i]);
				return i
			},
			top: function ()
			{
				return d.length > 0 ? d[d.length - 1] : null
			}
		})
	}

	function za(c, d)
	{
		var i = true;
		if (typeof c === "string" && c !== "") c += "_";
		var g = e.Storage.get(c + "commands");
		g = g ? (new Function("return " + g + ";"))() : [];
		var l = g.length - 1;
		e.extend(this,
		{
			append: function (r)
			{
				if (i)
					if (g[g.length - 1] !== r)
					{
						g.push(r);
						l = g.length - 1;
						if (d && g.length > d) g = g.slice(-d);
						e.Storage.set(c + "commands", e.json_stringify(g))
					}
			},
			data: function ()
			{
				return g
			},
			next: function ()
			{
				l < g.length - 1 && ++l;
				if (l !== -1) return g[l]
			},
			reset: function ()
			{
				l = g.length - 1
			},
			last: function ()
			{
				return g[length - 1]
			},
			end: function ()
			{
				return l === g.length - 1
			},
			position: function ()
			{
				return l
			},
			previous: function ()
			{
				var r = l;
				l > 0 && --l;
				if (r !== -1) return g[r]
			},
			clear: function ()
			{
				g = [];
				this.purge()
			},
			enabled: function ()
			{
				return i
			},
			enable: function ()
			{
				i = true
			},
			purge: function ()
			{
				e.Storage.remove(c + "commands")
			},
			disable: function ()
			{
				i = false
			}
		})
	}

	function ja(c, d)
	{
		var i = c.split(/(\s+)/);
		return {
			name: i[0],
			args: d(i.slice(2)
				.join(""))
		}
	}

	function la(c)
	{
		var d = e('<div class="terminal"><span>&nbsp;</span></div>')
			.appendTo("body"),
			i = d.find("span")
			.width();
		d.remove();
		d = Math.floor(c.width() / i);
		if (ha(c))
		{
			c = c.innerWidth() - c.width();
			d -= Math.ceil((20 - c / 2) / (i - 1))
		}
		return d
	}

	function ha(c)
	{
		return c.get(0)
			.scrollHeight > c.innerHeight()
	}
	e.omap = function (c, d)
	{
		var i = {};
		e.each(c, function (g, l)
		{
			i[g] = d.call(c, g, l)
		});
		return i
	};
	var da = typeof window.localStorage !== "undefined";
	e.extend(
	{
		Storage:
		{
			set: da ? ta : ka,
			get: da ? ua : va,
			remove: da ? wa : xa
		}
	});
	jQuery.fn.extend(
	{
		everyTime: function (c, d, i, g, l)
		{
			return this.each(function ()
			{
				jQuery.timer.add(this, c, d, i, g, l)
			})
		},
		oneTime: function (c, d, i)
		{
			return this.each(function ()
			{
				jQuery.timer.add(this, c, d, i, 1)
			})
		},
		stopTime: function (c, d)
		{
			return this.each(function ()
			{
				jQuery.timer.remove(this, c, d)
			})
		}
	});
	jQuery.extend(
	{
		timer:
		{
			guid: 1,
			global:
			{},
			regex: /^([0-9]+)\s*(.*s)?$/,
			powers:
			{
				ms: 1,
				cs: 10,
				ds: 100,
				s: 1E3,
				das: 1E4,
				hs: 1E5,
				ks: 1E6
			},
			timeParse: function (c)
			{
				if (c === R || c === null) return null;
				var d = this.regex.exec(jQuery.trim(c.toString()));
				return d[2] ? parseInt(d[1], 10) * (this.powers[d[2]] || 1) : c
			},
			add: function (c, d, i, g, l, r)
			{
				var C = 0;
				if (jQuery.isFunction(i))
				{
					l || (l = g);
					g = i;
					i = d
				}
				d = jQuery.timer.timeParse(d);
				if (!(typeof d !== "number" || isNaN(d) || d <= 0))
				{
					if (l && l.constructor !== Number)
					{
						r = !!l;
						l = 0
					}
					l = l || 0;
					r = r || false;
					if (!c.$timers) c.$timers = {};
					c.$timers[i] || (c.$timers[i] = {});
					g.$timerID = g.$timerID || this.guid++;
					var k = function ()
					{
						if (!(r && k.inProgress))
						{
							k.inProgress = true;
							if (++C > l && l !== 0 || g.call(c, C) === false) jQuery.timer.remove(c, i, g);
							k.inProgress = false
						}
					};
					k.$timerID = g.$timerID;
					c.$timers[i][g.$timerID] || (c.$timers[i][g.$timerID] = window.setInterval(k, d));
					this.global[i] || (this.global[i] = []);
					this.global[i].push(c)
				}
			},
			remove: function (c, d, i)
			{
				var g = c.$timers,
					l;
				if (g)
				{
					if (d)
					{
						if (g[d])
						{
							if (i)
							{
								if (i.$timerID)
								{
									window.clearInterval(g[d][i.$timerID]);
									delete g[d][i.$timerID]
								}
							}
							else
								for (var r in g[d])
									if (g[d].hasOwnProperty(r))
									{
										window.clearInterval(g[d][r]);
										delete g[d][r]
									} for (l in g[d])
								if (g[d].hasOwnProperty(l)) break;
							if (!l)
							{
								l = null;
								delete g[d]
							}
						}
					}
					else
						for (var C in g) g.hasOwnProperty(C) && this.remove(c, C, i);
					for (l in g)
						if (g.hasOwnProperty(l)) break;
					if (!l) c.$timers = null
				}
			}
		}
	});
	if (jQuery.browser && jQuery.browser.msie || /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())) jQuery(window)
		.one("unload", function ()
		{
			var c = jQuery.timer.global,
				d;
			for (d in c)
				if (c.hasOwnProperty(d))
					for (var i = c[d], g = i.length; --g;) jQuery.timer.remove(i[g], d)
		});
	(function (c)
	{
		if (String.prototype.split.toString()
			.match(/\[native/))
		{
			var d = String.prototype.split,
				i = /()??/.exec("")[1] === c,
				g;
			g = function (l, r, C)
			{
				if (Object.prototype.toString.call(r) !== "[object RegExp]") return d.call(l, r, C);
				var k = [],
					w = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.extended ? "x" : "") + (r.sticky ? "y" : ""),
					z = 0,
					B, x, A;
				r = RegExp(r.source, w + "g");
				l += "";
				i || (B = RegExp("^" + r.source + "$(?!\\s)", w));
				for (C = C === c ? 4294967295 : C >>> 0; x = r.exec(l);)
				{
					w = x.index + x[0].length;
					if (w > z)
					{
						k.push(l.slice(z, x.index));
						!i && x.length > 1 && x[0].replace(B, function ()
						{
							for (var G = 1; G < arguments.length - 2; G++)
								if (arguments[G] === c) x[G] = c
						});
						x.length > 1 && x.index < l.length && Array.prototype.push.apply(k, x.slice(1));
						A = x[0].length;
						z = w;
						if (k.length >= C) break
					}
					r.lastIndex === x.index && r.lastIndex++
				}
				if (z === l.length)
				{
					if (A || !r.test("")) k.push("")
				}
				else k.push(l.slice(z));
				return k.length > C ? k.slice(0, C) : k
			};
			String.prototype.split = function (l, r)
			{
				return g(this, l, r)
			};
			return g
		}
	})();
	e.json_stringify = function (c, d)
	{
		var i = "",
			g;
		d = d === R ? 1 : d;
		switch (typeof c)
		{
		case "function":
			i += c;
			break;
		case "boolean":
			i += c ? "true" : "false";
			break;
		case "object":
			if (c === null) i += "null";
			else if (c instanceof Array)
			{
				i += "[";
				var l = c.length;
				for (g = 0; g < l - 1; ++g) i += e.json_stringify(c[g], d + 1);
				i += e.json_stringify(c[l - 1], d + 1) + "]"
			}
			else
			{
				i += "{";
				for (l in c)
					if (c.hasOwnProperty(l)) i += '"' + l + '":' + e.json_stringify(c[l], d + 1);
				i += "}"
			}
			break;
		case "string":
			l = c;
			var r = {
				"\\\\": "\\\\",
				'"': '\\"',
				"/": "\\/",
				"\\n": "\\n",
				"\\r": "\\r",
				"\\t": "\\t"
			};
			for (g in r)
				if (r.hasOwnProperty(g)) l = l.replace(RegExp(g, "g"), r[g]);
			i += '"' + l + '"';
			break;
		case "number":
			i += String(c)
		}
		i += d > 1 ? "," : "";
		if (d === 1) i = i.replace(/,([\]}])/g, "$1");
		return i.replace(/([\[{]),/g, "$1")
	};
	e.fn.cmd = function (c)
	{
		function d()
		{
			b.toggleClass("inverted")
		}

		function i()
		{
			K = "(reverse-i-search)`" + G + "': ";
			Z()
		}

		function g(f)
		{
			var t = O.data(),
				L = t.length;
			if (f && H > 0) L -= H;
			if (G.length > 0)
				for (var S = G.length; S > 0; S--)
				{
					f = RegExp("^" + G.substring(0, S));
					for (var Y = L; Y--;)
						if (f.test(t[Y]))
						{
							H = t.length - Y;
							q = 0;
							k.set(t[Y], true);
							I();
							if (G.length !== S)
							{
								G = G.substring(0, S);
								i()
							}
							return
						}
				}
		}

		function l(f)
		{
			var t = f.substring(0, B - x);
			f = f.substring(B - x);
			return [t].concat(ia(f, B))
		}

		function r()
		{
			z.focus();
			k.oneTime(1, function ()
			{
				k.insert(z.val());
				z.blur()
					.val("")
			})
		}

		function C(f)
		{
			if (typeof c.keydown == "function")
			{
				var t = c.keydown(f);
				if (t !== R) return t
			}
			if (T)
			{
				if (f.which !== 38 && !(f.which === 80 && f.ctrlKey)) ba = true;
				if (A && (f.which === 35 || f.which === 36 || f.which === 37 || f.which === 38 || f.which === 39 || f.which === 40 || f.which === 13 || f.which === 27))
				{
					K = F;
					A = false;
					H = null;
					G = "";
					Z();
					if (f.which === 27) n = "";
					I();
					C.call(this, f)
				}
				else if (f.altKey)
				{
					if (f.which === 68)
					{
						k.set(n.slice(0, q) + n.slice(q)
							.replace(/[^ ]+ |[^ ]+$/, ""), true);
						return false
					}
					return true
				}
				else if (f.keyCode === 13)
				{
					if (O && n && (c.historyFilter && c.historyFilter(n) || !c.historyFilter)) O.append(n);
					f = n;
					O.reset();
					k.set("");
					c.commands && c.commands(f);
					typeof K === "function" && Z()
				}
				else if (f.which === 8)
					if (A)
					{
						G = G.slice(0, -1);
						i()
					}
					else
					{
						if (n !== "" && q > 0)
						{
							n = n.slice(0, q - 1) + n.slice(q, n.length);
							--q;
							I()
						}
					}
				else if (f.which === 9 && !(f.ctrlKey || f.altKey)) k.insert("\t");
				else if (f.which === 46)
				{
					if (n !== "" && q < n.length)
					{
						n = n.slice(0, q) + n.slice(q + 1, n.length);
						I()
					}
					return true
				}
				else if (O && f.which === 38 || f.which === 80 && f.ctrlKey)
				{
					if (ba) P = n;
					ba = false;
					k.set(O.previous())
				}
				else if (O && f.which === 40 || f.which === 78 && f.ctrlKey) k.set(O.end() ? P : O.next());
				else if (f.which === 37 || f.which === 66 && f.ctrlKey)
					if (f.ctrlKey && f.which !== 66)
					{
						t = q - 1;
						f = 0;
						for (n[t] === " " && --t; t > 0; --t)
							if (n[t] === " " && n[t + 1] !== " ")
							{
								f = t + 1;
								break
							}
							else if (n[t] === "\n" && n[t + 1] !== "\n")
						{
							f = t;
							break
						}
						k.position(f)
					}
					else
					{
						if (q > 0)
						{
							--q;
							I()
						}
					}
				else if (f.which === 82 && f.ctrlKey)
					if (A) g(true);
					else
					{
						F = K;
						i();
						P = n;
						n = "";
						I();
						A = true
					}
				else if (f.which == 71 && f.ctrlKey)
				{
					if (A)
					{
						K = F;
						Z();
						n = P;
						I();
						A = false
					}
				}
				else if (f.which === 39 || f.which === 70 && f.ctrlKey)
					if (f.ctrlKey && f.which !== 70)
					{
						n[q] === " " && ++q;
						f = n.slice(q)
							.match(/\S[\n\s]{2,}|[\n\s]+\S?/);
						if (!f || f[0].match(/^\s+$/)) q = n.length;
						else if (f[0][0] !== " ") q += f.index + 1;
						else
						{
							q += f.index + f[0].length - 1;
							f[0][f[0].length - 1] !== " " && --q
						}
						I()
					}
					else
					{
						if (q < n.length)
						{
							++q;
							I()
						}
					}
				else if (f.which === 123) return true;
				else if (f.which === 36) k.position(0);
				else if (f.which === 35) k.position(n.length);
				else if (f.shiftKey && f.which == 45)
				{
					r();
					return true
				}
				else if (f.ctrlKey || f.metaKey)
				{
					if (f.which === 192) return true;
					if (f.metaKey)
						if (f.which === 82) return true;
						else if (f.which === 76) return true;
					if (f.shiftKey)
					{
						if (f.which === 84) return true
					}
					else if (f.which === 87)
					{
						if (n !== "")
						{
							f = n.slice(0, q);
							t = n.slice(q + 1);
							var L = f.match(/([^ ]+ *$)/);
							q = f.length - L[0].length;
							n = f.slice(0, q) + t;
							I()
						}
					}
					else if (f.which === 72)
					{
						if (n !== "" && q > 0)
						{
							n = n.slice(0, --q);
							if (q < n.length - 1) n += n.slice(q);
							I()
						}
					}
					else if (f.which === 65) k.position(0);
					else if (f.which === 69) k.position(n.length);
					else if (f.which === 88 || f.which === 67 || f.which === 84) return true;
					else if (f.which === 86)
					{
						r();
						return true
					}
					else if (f.which === 75)
						if (q === 0) k.set("");
						else q !== n.length && k.set(n.slice(0, q));
					else if (f.which === 85)
					{
						k.set(n.slice(q, n.length));
						k.position(0)
					}
				}
				else return true;
				return false
			}
		}
		var k = this,
			w = k.data("cmd");
		if (w) return w;
		k.addClass("cmd");
		k.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');
		var z = e("<textarea/>")
			.addClass("clipboard")
			.appendTo(k);
		c.width && k.width(c.width);
		var B, x, A = false,
			G = "",
			H = null,
			F, M = c.mask || false,
			n = "",
			q = 0,
			K, T = c.enabled,
			ea = c.historySize || 60,
			Q, O, b = k.find(".cursor"),
			I = function (f)
			{
				function t(y, D)
				{
					if (D === y.length)
					{
						X.html(e.terminal.encode(y, true));
						b.html("&nbsp;");
						m.html("")
					}
					else if (D === 0)
					{
						X.html("");
						b.html(e.terminal.encode(y.slice(0, 1), true));
						m.html(e.terminal.encode(y.slice(1), true))
					}
					else
					{
						var E = e.terminal.encode(y.slice(0, D), true);
						X.html(E);
						E = y.slice(D, D + 1);
						b.html(E === " " ? "&nbsp;" : e.terminal.encode(E, true));
						D === y.length - 1 ? m.html("") : m.html(e.terminal.encode(y.slice(D + 1), true))
					}
				}

				function L(y)
				{
					return "<div>" + e.terminal.encode(y, true) + "</div>"
				}

				function S(y)
				{
					var D = m;
					e.each(y, function (E, s)
					{
						D = e(L(s))
							.insertAfter(D)
							.addClass("clear")
					})
				}

				function Y(y)
				{
					e.each(y, function (D, E)
					{
						X.before(L(E))
					})
				}
				var X = b.prev(),
					m = b.next();
				return function ()
				{
					var y = M ? n.replace(/./g, "*") : n,
						D, E;
					f.find("div")
						.remove();
					X.html("");
					if (y.length > B - x - 1 || y.match(/\n/))
					{
						var s, u = y.match(/\t/g),
							a = u ? u.length * 3 : 0;
						if (u) y = y.replace(/\t/g, "\u0000\u0000\u0000\u0000");
						if (y.match(/\n/))
						{
							var h = y.split("\n");
							E = B - x - 1;
							for (D = 0; D < h.length - 1; ++D) h[D] += " ";
							if (h[0].length > E)
							{
								s = [h[0].substring(0, E)];
								s = s.concat(ia(h[0].substring(E), B))
							}
							else s = [h[0]];
							for (D = 1; D < h.length; ++D)
								if (h[D].length > B) s = s.concat(ia(h[D], B));
								else s.push(h[D])
						}
						else s = l(y); if (u) s = e.map(s, function (o)
						{
							return o.replace(/\x00\x00\x00\x00/g, "\t")
						});
						E = s[0].length;
						if (!(E === 0 && s.length === 1))
							if (q < E)
							{
								t(s[0], q);
								S(s.slice(1))
							}
							else if (q === E)
						{
							X.before(L(s[0]));
							t(s[1], 0);
							S(s.slice(2))
						}
						else
						{
							D = s.length;
							if (q < E)
							{
								t(s[0], q);
								S(s.slice(1))
							}
							else if (q === E)
							{
								X.before(L(s[0]));
								t(s[1], 0);
								S(s.slice(2))
							}
							else
							{
								u = s.slice(-1)[0];
								h = y.length - q;
								var j = u.length;
								y = 0;
								if (h <= j)
								{
									Y(s.slice(0, -1));
									t(u, (j === h ? 0 : j - h) + a)
								}
								else if (D === 3)
								{
									X.before("<div>" + e.terminal.encode(s[0], true) + "</div>");
									t(s[1], q - E - 1);
									m.after('<div class="clear">' + e.terminal.encode(s[2], true) + "</div>")
								}
								else
								{
									y = q;
									for (D = 0; D < s.length; ++D)
									{
										E = s[D].length;
										if (y > E) y -= E;
										else break
									}
									E = s[D];
									a = D;
									if (y === E.length)
									{
										y = 0;
										E = s[++a]
									}
									t(E, y);
									Y(s.slice(0, a));
									S(s.slice(a + 1))
								}
							}
						}
					}
					else if (y === "")
					{
						X.html("");
						b.html("&nbsp;");
						m.html("")
					}
					else t(y, q)
				}
			}(k),
			P, Z = function ()
			{
				function f(L)
				{
					x = e("<div>" + e.terminal.strip(L) + "</div>")
						.text()
						.length;
					t.html(e.terminal.format(e.terminal.encode(L)))
				}
				var t = k.find(".prompt");
				return function ()
				{
					switch (typeof K)
					{
					case "string":
						f(K);
						break;
					case "function":
						K(f)
					}
				}
			}(),
			ba = true,
			J = [];
		e.extend(k,
		{
			name: function (f)
			{
				if (f !== R)
				{
					Q = f;
					O = new za(f, ea);
					(f = J.length) && !J[f - 1].enabled() && O.disable();
					J.push(O);
					return k
				}
				else return Q
			},
			purge: function ()
			{
				for (var f = J.length; f--;) J[f].purge();
				J = [];
				return k
			},
			history: function ()
			{
				return O
			},
			set: function (f, t)
			{
				if (f !== R)
				{
					n = f;
					if (!t) q = n.length;
					I();
					if (typeof c.onCommandChange === "function") c.onCommandChange(n)
				}
				return k
			},
			insert: function (f, t)
			{
				if (q === n.length) n += f;
				else n = q === 0 ? f + n : n.slice(0, q) + f + n.slice(q);
				t || (q += f.length);
				I();
				if (typeof c.onCommandChange === "function") c.onCommandChange(n);
				return k
			},
			get: function ()
			{
				return n
			},
			commands: function (f)
			{
				if (f)
				{
					c.commands = f;
					return k
				}
				else return f
			},
			destroy: function ()
			{
				e(document.documentElement || window)
					.unbind(".cmd");
				k.stopTime("blink", d);
				k.find(".cursor")
					.next()
					.remove()
					.end()
					.prev()
					.remove()
					.end()
					.remove();
				k.find(".prompt, .clipboard")
					.remove();
				k.removeClass("cmd")
					.removeData("cmd");
				return k
			},
			prompt: function (f)
			{
				if (f === R) return K;
				else
				{
					if (typeof f === "string" || typeof f === "function") K = f;
					else throw "prompt must be a function or string";
					Z();
					I();
					return k
				}
			},
			position: function (f)
			{
				if (typeof f === "number")
				{
					q = f < 0 ? 0 : f > n.length ? n.length : f;
					I();
					return k
				}
				else return q
			},
			visible: function ()
			{
				var f = k.visible;
				return function ()
				{
					f.apply(k, []);
					I();
					Z()
				}
			}(),
			show: function ()
			{
				var f = k.show;
				return function ()
				{
					f.apply(k, []);
					I();
					Z()
				}
			}(),
			resize: function (f)
			{
				if (f) B = f;
				else
				{
					f = k.width();
					var t = b.innerWidth();
					B = Math.floor(f / t)
				}
				I();
				return k
			},
			enable: function ()
			{
				if (!T)
				{
					b.addClass("inverted");
					k.everyTime(500, "blink", d);
					T = true
				}
				return k
			},
			isenabled: function ()
			{
				return T
			},
			disable: function ()
			{
				if (T)
				{
					k.stopTime("blink", d);
					b.removeClass("inverted");
					T = false
				}
				return k
			},
			mask: function (f)
			{
				if (typeof f === "boolean")
				{
					M = f;
					I();
					return k
				}
				else return M
			}
		});
		k.name(c.name || c.prompt || "");
		K = c.prompt || "> ";
		Z();
		if (c.enabled === R || c.enabled === true) k.enable();
		e(document.documentElement || window)
			.bind("keypress.cmd", function (f)
			{
				var t;
				if (f.ctrlKey && f.which === 99) return true;
				if (!A && typeof c.keypress === "function") t = c.keypress(f);
				if (t === R || t)
				{
					if (T)
						if (e.inArray(f.which, [38, 13, 0, 8]) > -1 && f.keyCode !== 123 && !(f.which === 38 && f.shiftKey)) return false;
						else if (!f.ctrlKey && !(f.altKey && f.which === 100) || f.altKey)
					{
						if (A)
						{
							G += String.fromCharCode(f.which);
							g();
							i()
						}
						else k.insert(String.fromCharCode(f.which));
						return false
					}
				}
				else return t
			})
			.bind("keydown.cmd", C);
		k.data("cmd", k);
		return k
	};
	var Aa = /(\[\[[gbiuso]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,
		ma = /\[\[([gbiuso]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,
		na = /\[\[([gbiuso]*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/gi,
		oa = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,
		Ba = /https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g,
		Ca = /((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g,
		pa = /('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g,
		qa = /(\[\[[gbiuso]*;[^;]*;[^\]]*\])/,
		ra = /\[\[[gbiuso]*;[^;]*;[^\]]*\]?$/;
	e.terminal = {
		split_equal: function (c, d)
		{
			for (var i = false, g = false, l = "", r = [], C = c.replace(na, function (M, n, q)
				{
					M = n.match(/;/g)
						.length;
					return "[[" + n + (M == 2 ? ";;" : M == 3 ? ";" : "") + q.replace(/\\\]/g, "&#93;")
						.replace(/\n/g, "\\n") + "]" + q + "]"
				})
				.split(/\n/g), k = 0, w = C.length; k < w; ++k)
				if (C[k] === "") r.push("");
				else
					for (var z = C[k], B = 0, x = 0, A = 0, G = z.length; A < G; ++A)
					{
						if (z[A] === "[" && z[A + 1] === "[") i = true;
						else if (i && z[A] === "]")
							if (g) g = i = false;
							else g = true;
						else if (i && g || !i)
							if (z[A] === "&")
							{
								var H = z.substring(A)
									.match(/^(&[^;]+;)/);
								if (!H) throw "Unclosed html entity in line " + (k + 1) + " at char " + (A + 1);
								A += H[1].length - 2;
								A === G - 1 && r.push(F + H[1]);
								continue
							}
							else if (z[A] === "]" && z[A - 1] === "\\")--x;
						else ++x; if (x === d || A === G - 1)
						{
							var F = z.substring(B, A + 1);
							if (l)
							{
								F = l + F;
								if (F.match("]")) l = ""
							}
							B = A + 1;
							x = 0;
							if (H = F.match(na))
							{
								H = H[H.length - 1];
								if (H[H.length - 1] !== "]")
								{
									l = H.match(qa)[1];
									F += "]"
								}
								else if (F.match(ra))
								{
									F = F.replace(ra, "");
									l = H.match(qa)[1]
								}
							}
							r.push(F)
						}
					}
			return r
		},
		encode: function (c, d)
		{
			c = d ? c.replace(/&(?![^=]+=)/g, "&amp;") : c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;|[^= "]+=[^=])/g, "&amp;");
			return c.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/ /g, "&nbsp;")
				.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
		},
		format: function (c)
		{
			if (typeof c === "string")
			{
				var d = c.split(Aa);
				if (d && d.length > 1) c = e.map(d, function (i)
					{
						return i === "" ? i : i.substring(0, 1) === "[" ? i.replace(ma, function (g, l, r, C, k, w, z)
						{
							if (z === "") return "";
							z = z.replace(/\\]/g, "]");
							g = "";
							if (l.indexOf("b") !== -1) g += "font-weight:bold;";
							var B = [];
							l.indexOf("u") !== -1 && B.push("underline");
							l.indexOf("s") !== -1 && B.push("line-through");
							l.indexOf("o") !== -1 && B.push("overline");
							if (B.length) g += "text-decoration:" + B.join(" ") + ";";
							if (l.indexOf("i") !== -1) g += "font-style:italic;";
							if (r.match(oa))
							{
								g += "color:" + r + ";";
								if (l.indexOf("g") !== -1) g += "text-shadow:0 0 5px " + r + ";"
							}
							if (C.match(oa)) g += "background-color:" + C;
							return '<span style="' + g + '"' + (k !== "" ? ' class="' + k + '"' : "") + ' data-text="' + (w === "" ? z : w.replace(/&#93;/g, "]"))
								.replace('"', "&quote;") + '">' + z + "</span>"
						}) : "<span>" + i + "</span>"
					})
					.join("");
				return e.map(c.split(/(<\/?span[^>]*>)/g), function (i)
					{
						return i.match(/span/) ? i : i.replace(Ba, function (g)
							{
								var l = g.match(/\.$/);
								g = g.replace(/\.$/, "");
								return '<a target="_blank" href="' + g + '">' + g + "</a>" + (l ? "." : "")
							})
							.replace(Ca, '<a href="mailto:$1">$1</a>')
					})
					.join("")
					.replace(/<span><br\/?><\/span>/g, "<br/>")
			}
			else return ""
		},
		escape_brackets: function (c)
		{
			return c.replace(/\[/g, "&#91;")
				.replace(/\]/g, "&#93;")
		},
		strip: function (c)
		{
			return c.replace(ma, "$6")
		},
		active: function ()
		{
			return $.front()
		},
		from_ntroff: function (c)
		{
			return c.replace(/((?:_\x08.|.\x08_)+)/g, function (d)
				{
					return "[[u;;]" + d.replace(/_x08|\x08_|_\u0008|\u0008_/g, "") + "]"
				})
				.replace(/((?:.\x08.)+)/g, function (d)
				{
					return "[[b;#fff;]" + d.replace(/(.)(?:\x08|\u0008)(.)/g, function (i, g, l)
					{
						return l
					}) + "]"
				})
		},
		ansi_colors:
		{
			normal:
			{
				black: "#000",
				red: "#A00",
				green: "#008400",
				yellow: "#A50",
				blue: "#00A",
				magenta: "#A0A",
				cyan: "#0AA",
				white: "#AAA"
			},
			faited:
			{
				black: "#000",
				red: "#640000",
				green: "#006100",
				yellow: "#737300",
				blue: "#000087",
				magenta: "#650065",
				cyan: "#008787",
				white: "#818181"
			},
			bold:
			{
				black: "#000",
				red: "#F55",
				green: "#44D544",
				yellow: "#FF5",
				blue: "#55F",
				magenta: "#F5F",
				cyan: "#5FF",
				white: "#FFF"
			},
			palette: ["#000000", "#AA0000", "#00AA00", "#AA5500", "#0000AA", "#AA00AA", "#00AAAA", "#AAAAAA", "#555555", "#FF5555", "#55FF55", "#FFFF55", "#5555FF", "#FF55FF", "#55FFFF", "#FFFFFF", "#000000", "#00005F", "#000087", "#0000AF", "#0000D7", "#0000FF", "#005F00", "#005F5F", "#005F87", "#005FAF", "#005FD7", "#005FFF", "#008700", "#00875F", "#008787", "#0087AF", "#0087D7", "#00AF00", "#00AF5F", "#00AF87", "#00AFAF", "#00AFD7", "#00AFFF", "#00D700", "#00D75F", "#00D787", "#00D7AF", "#00D7D7", "#00D7FF", "#00FF00", "#00FF5F", "#00FF87", "#00FFAF", "#00FFD7", "#00FFFF", "#5F0000", "#5F005F", "#5F0087", "#5F00AF", "#5F00D7", "#5F00FF", "#5F5F00", "#5F5F5F", "#5F5F87", "#5F5FAF", "#5F5FD7", "#5F5FFF", "#5F8700", "#5F875F", "#5F8787", "#5F87AF", "#5F87D7", "#5F87FF", "#5FAF00", "#5FAF5F", "#5FAF87", "#5FAFAF", "#5FAFD7", "#5FAFFF", "#5FD700", "#5FD75F", "#5FD787", "#5FD7AF", "#5FD7D7", "#5FD7FF", "#5FFF00", "#5FFF5F", "#5FFF87", "#5FFFAF", "#5FFFD7", "#5FFFFF", "#870000", "#87005F", "#870087", "#8700AF", "#8700D7", "#8700FF", "#875F00", "#875F5F", "#875F87", "#875FAF", "#875FD7", "#875FFF", "#878700", "#87875F", "#878787", "#8787AF", "#8787D7", "#8787FF", "#87AF00", "#87AF5F", "#87AF87", "#87AFAF", "#87AFD7", "#87AFFF", "#87D700", "#87D75F", "#87D787", "#87D7AF", "#87D7D7", "#87D7FF", "#87FF00", "#87FF5F", "#87FF87", "#87FFAF", "#87FFD7", "#87FFFF", "#AF0000", "#AF005F", "#AF0087", "#AF00AF", "#AF00D7", "#AF00FF", "#AF5F00", "#AF5F5F", "#AF5F87", "#AF5FAF", "#AF5FD7", "#AF5FFF", "#AF8700", "#AF875F", "#AF8787", "#AF87AF", "#AF87D7", "#AF87FF", "#AFAF00", "#AFAF5F", "#AFAF87", "#AFAFAF", "#AFAFD7", "#AFAFFF", "#AFD700", "#AFD75F", "#AFD787", "#AFD7AF", "#AFD7D7", "#AFD7FF", "#AFFF00", "#AFFF5F", "#AFFF87", "#AFFFAF", "#AFFFD7", "#AFFFFF", "#D70000", "#D7005F", "#D70087", "#D700AF", "#D700D7", "#D700FF", "#D75F00", "#D75F5F", "#D75F87", "#D75FAF", "#D75FD7", "#D75FFF", "#D78700", "#D7875F", "#D78787", "#D787AF", "#D787D7", "#D787FF", "#D7AF00", "#D7AF5F", "#D7AF87", "#D7AFAF", "#D7AFD7", "#D7AFFF", "#D7D700", "#D7D75F", "#D7D787", "#D7D7AF", "#D7D7D7", "#D7D7FF", "#D7FF00", "#D7FF5F", "#D7FF87", "#D7FFAF", "#D7FFD7", "#D7FFFF", "#FF0000", "#FF005F", "#FF0087", "#FF00AF", "#FF00D7", "#FF00FF", "#FF5F00", "#FF5F5F", "#FF5F87", "#FF5FAF", "#FF5FD7", "#FF5FFF", "#FF8700", "#FF875F", "#FF8787", "#FF87AF", "#FF87D7", "#FF87FF", "#FFAF00", "#FFAF5F", "#FFAF87", "#FFAFAF", "#FFAFD7", "#FFAFFF", "#FFD700", "#FFD75F", "#FFD787", "#FFD7AF", "#FFD7D7", "#FFD7FF", "#FFFF00", "#FFFF5F", "#FFFF87", "#FFFFAF", "#FFFFD7", "#FFFFFF", "#080808", "#121212", "#1C1C1C", "#262626", "#303030", "#3A3A3A", "#444444", "#4E4E4E", "#585858", "#626262", "#6C6C6C", "#767676", "#808080", "#8A8A8A", "#949494", "#9E9E9E", "#A8A8A8", "#B2B2B2", "#BCBCBC", "#C6C6C6", "#D0D0D0", "#DADADA", "#E4E4E4", "#EEEEEE"]
		},
		from_ansi: function ()
		{
			var c = {
					30: "black",
					31: "red",
					32: "green",
					33: "yellow",
					34: "blue",
					35: "magenta",
					36: "cyan",
					37: "white",
					39: "white"
				},
				d = {
					40: "black",
					41: "red",
					42: "green",
					43: "yellow",
					44: "blue",
					45: "magenta",
					46: "cyan",
					47: "white",
					49: "black"
				};
			return function (i)
			{
				var g = i.split(/(\x1B\[[0-9;]*[A-Za-z])/g);
				if (g.length == 1) return i;
				i = [];
				if (g.length > 3 && g.slice(0, 3)
					.join("") == "[0m") g = g.slice(3);
				for (var l = false, r, C, k, w, z = 0; z < g.length; ++z)
					if (w = g[z].match(/^\x1B\[([0-9;]*)([A-Za-z])$/)) switch (w[2])
					{
					case "m":
						if (w[1] == "") continue;
						if (w[1] !== "0")
						{
							var B = w[1].split(";"),
								x = void 0,
								A = k = false,
								G = false,
								H = [],
								F = "",
								M = "",
								n = false,
								q = false,
								K = false,
								T = e.terminal.ansi_colors.palette,
								ea = void 0;
							for (ea in B)
							{
								x = parseInt(B[ea], 10);
								switch (x)
								{
								case 1:
									H.push("b");
									G = true;
									k = false;
									break;
								case 4:
									H.push("u");
									break;
								case 3:
									H.push("i");
									break;
								case 5:
									K = true;
									break;
								case 38:
									n = true;
									break;
								case 48:
									q = true;
									break;
								case 2:
									k = true;
									G = false;
									break;
								case 7:
									A = true;
								default:
									if (n && K && T[x - 1]) F = T[x - 1];
									else if (c[x]) F = c[x];
									if (q && K && T[x - 1]) M = T[x - 1];
									else if (d[x]) M = d[x]
								}
								if (x !== 5) K = false
							}
							if (!F && A) F = "black";
							if (!M && A) M = "white";
							if (F && M && A)
							{
								B = M;
								M = F;
								F = B
							}
							x = B = e.terminal.ansi_colors.normal;
							if (G) B = x = e.terminal.ansi_colors.bold;
							else if (k) B = x = e.terminal.ansi_colors.faited;
							k = [H.join(""), n ? F : B[F], q ? M : x[M]]
						}
						if (l)
						{
							i.push("]");
							if (w[1] == "0")
							{
								l = false;
								r = C = ""
							}
							else
							{
								k[1] = k[1] || r;
								k[2] = k[2] || C;
								i.push("[[" + k.join(";") + "]");
								if (k[1]) r = k[1];
								if (k[2]) C = k[2]
							}
						}
						else
						{
							l = true;
							i.push("[[" + k.join(";") + "]");
							if (k[1]) r = k[1];
							if (k[2]) C = k[2]
						}
					}
					else i.push(g[z]);
				l && i.push("]");
				return i.join("")
			}
		}(),
		parseArguments: function (c)
		{
			return e.map(c.match(pa) || [], function (d)
			{
				if (d[0] === "'" && d[d.length - 1] === "'") return d.replace(/^'|'$/g, "");
				else if (d[0] === '"' && d[d.length - 1] === '"')
				{
					d = d.replace(/^"|"$/g, "")
						.replace(/\\([" ])/g, "$1");
					return d.replace(/\\\\|\\t|\\n/g, function (i)
						{
							return i[1] === "t" ? "\t" : i[1] === "n" ? "\n" : "\\"
						})
						.replace(/\\x([0-9a-f]+)/gi, function (i, g)
						{
							return String.fromCharCode(parseInt(g, 16))
						})
						.replace(/\\0([0-7]+)/g, function (i, g)
						{
							return String.fromCharCode(parseInt(g, 8))
						})
				}
				else return d[0] === "/" && d[d.length - 1] == "/" ? RegExp(d.replace(/^\/|\/$/g, "")) : d.match(/^-?[0-9]+$/) ? parseInt(d, 10) : d.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/) ? parseFloat(d) : d.replace(/\\ /g, " ")
			})
		},
		splitArguments: function (c)
		{
			return e.map(c.match(pa) || [], function (d)
			{
				return d[0] === "'" && d[d.length - 1] === "'" ? d.replace(/^'|'$/g, "") : d[0] === '"' && d[d.length - 1] === '"' ? d.replace(/^"|"$/g, "")
					.replace(/\\([" ])/g, "$1") : d[0] === "/" && d[d.length - 1] == "/" ? d : d.replace(/\\ /g, " ")
			})
		},
		parseCommand: function (c)
		{
			return ja(c, e.terminal.parseArguments)
		},
		splitCommand: function (c)
		{
			return ja(c, e.terminal.splitArguments)
		},
		test: function ()
		{
			function c(w, z)
			{
				d.echo(z + " &#91;" + (w ? "[[b;#44D544;]PASS]" : "[[b;#FF5555;]FAIL]") + "&#93;")
			}
			var d = e("body")
				.terminal()
				.css("margin", 0);
			d.outerHeight();
			d.height();
			e(window)
				.resize(function ()
				{
					d.css("height", e(window)
						.height() - 20)
				})
				.resize();
			d.echo("Testing...");
			var i = 'name "foo bar" baz /^asd [x]/ str\\ str 10 1e10',
				g = e.terminal.splitCommand(i);
			c(g.name === "name" && g.args[0] === "foo bar" && g.args[1] === "baz" && g.args[2] === "/^asd [x]/" && g.args[3] === "str str" && g.args[4] === "10" && g.args[5] === "1e10", "$.terminal.splitCommand");
			g = e.terminal.parseCommand(i);
			c(g.name === "name" && g.args[0] === "foo bar" && g.args[1] === "baz" && e.type(g.args[2]) === "regexp" && g.args[2].source === "^asd [x]" && g.args[3] === "str str" && g.args[4] === 10 && g.args[5] === 1E10, "$.terminal.parseCommand");
			c(e.terminal.from_ansi("\u001b[2;31;46mFoo\u001b[1;3;4;32;45mBar\u001b[0m\u001b[7mBaz") === "[[;#640000;#008787]Foo][[biu;#44D544;#FF55FF]Bar][[;#000;#AAA]Baz]", "$.terminal.from_ansi");
			i = "[[biugs;#fff;#000]Foo][[i;;;foo]Bar][[ous;;]Baz]";
			d.echo("$.terminal.format");
			c(e.terminal.format(i) === '<span style="font-weight:bold;text-decoration:underline line-through;font-style:italic;color:#fff;text-shadow:0 0 5px #fff;background-color:#000" data-text="Foo">Foo</span><span style="font-style:italic;" class="foo" data-text="Bar">Bar</span><span style="text-decoration:underline line-through overline;" data-text="Baz">Baz</span>', "\tformatting");
			c(e.terminal.format("http://terminal.jcubic.pl/examples.php https://www.google.com/?q=jquery%20terminal") === '<a target="_blank" href="http://terminal.jcubic.pl/examples.php">http://terminal.jcubic.pl/examples.php</a> <a target="_blank" href="https://www.google.com/?q=jquery%20terminal">https://www.google.com/?q=jquery%20terminal</a>', "\turls");
			c(e.terminal.format("foo@bar.com baz.quux@example.com") === '<a href="mailto:foo@bar.com">foo@bar.com</a> <a href="mailto:baz.quux@example.com">baz.quux@example.com</a>', "\temails");
			c(e.terminal.strip("-_-[[biugs;#fff;#000]Foo]-_-[[i;;;foo]Bar]-_-[[ous;;]Baz]-_-") === "-_-Foo-_-Bar-_-Baz-_-", "$.terminal.strip");
			i = "[[bui;#fff;]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dolor nisl, in suscipit justo. Donec a enim et est porttitor semper at vitae augue. Proin at nulla at dui mattis mattis. Nam a volutpat ante. Aliquam consequat dui eu sem convallis ullamcorper. Nulla suscipit, massa vitae suscipit ornare, tellus] est [[b;;#f00]consequat nunc, quis blandit elit odio eu arcu. Nam a urna nec nisl varius sodales. Mauris iaculis tincidunt orci id commodo. Aliquam] non magna quis [[i;;]tortor malesuada aliquam] eget ut lacus. Nam ut vestibulum est. Praesent volutpat tellus in eros dapibus elementum. Nam laoreet risus non nulla mollis ac luctus [[ub;#fff;]felis dapibus. Pellentesque mattis elementum augue non sollicitudin. Nullam lobortis fermentum elit ac mollis. Nam ac varius risus. Cras faucibus euismod nulla, ac auctor diam rutrum sit amet. Nulla vel odio erat], ac mattis enim.";
			d.echo("$.terminal.split_equal");
			g = [10, 40, 60, 400];
			for (var l = g.length; l--;)
			{
				for (var r = e.terminal.split_equal(i, g[l]), C = true, k = 0; k < r.length; ++k)
					if (e.terminal.strip(r[k])
						.length > g[l])
					{
						C = false;
						break
					}
				c(C, "\tsplit " + g[l])
			}
		}
	};
	e.fn.visible = function ()
	{
		return this.css("visibility", "visible")
	};
	e.fn.hidden = function ()
	{
		return this.css("visibility", "hidden")
	};
	var Da = 0;
	e.jrpc = function (c, d, i, g, l)
	{
		d = e.json_stringify(
		{
			jsonrpc: "2.0",
			method: d,
			params: i,
			id: ++Da
		});
		return e.ajax(
		{
			url: c,
			data: d,
			success: g,
			error: l,
			contentType: "application/json",
			dataType: "json",
			async: true,
			cache: false,
			type: "POST"
		})
	};
	da = / {13}$/;
	var Ea = [
		["jQuery Terminal", "(c) 2011-2013 jcubic"],
		["jQuery Terminal Emulator v. 0.7.4", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/, "")],
		["jQuery Terminal Emulator version version 0.7.4", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/^Copyright /, "")],
		["      _______                 ________                        __", "     / / _  /_ ____________ _/__  ___/______________  _____  / /", " __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /", "/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__", "\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/", "         \\/          /____/                                   ".replace(da, "") + "version 0.7.4", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],
		["      __ _____                     ________                              __", "     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /", " __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /", "/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__", "\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/", "          \\/              /____/                                          ".replace(da, "") + "version 0.7.4", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"]
	];
	e.terminal.defaults = {
		prompt: "> ",
		history: true,
		exit: true,
		clear: true,
		enabled: true,
		historySize: 60,
		checkArity: true,
		displayExceptions: true,
		cancelableAjax: true,
		processArguments: true,
		login: null,
		outputLimit: -1,
		tabcompletion: null,
		historyFilter: null,
		onInit: e.noop,
		onClear: e.noop,
		onBlur: e.noop,
		onFocus: e.noop,
		onTerminalChange: e.noop,
		onExit: e.noop,
		keypress: e.noop,
		keydown: e.noop
	};
	var fa = [],
		$ = new function (c)
		{
			var d = c ? [c] : [],
				i = 0;
			e.extend(this,
			{
				get: function ()
				{
					return d
				},
				rotate: function ()
				{
					if (d.length === 1) return d[0];
					else
					{
						if (i === d.length - 1) i = 0;
						else ++i;
						return d[i]
					}
				},
				length: function ()
				{
					return d.length
				},
				set: function (g)
				{
					for (var l = d.length; l--;)
						if (d[l] === g)
						{
							i = l;
							return
						}
					this.append(g)
				},
				front: function ()
				{
					return d[i]
				},
				append: function (g)
				{
					d.push(g)
				}
			})
		};
	e.fn.terminal = function (c, d)
	{
		function i(a)
		{
			return typeof m.processArguments === "function" ? ja(a, m.processArguments) : m.processArguments ? e.terminal.parseCommand(a) : e.terminal.splitCommand(a)
		}

		function g(a)
		{
			if (typeof a === "string") b.echo(a);
			else if (a instanceof Array) b.echo(e.map(a, function (h)
				{
					return e.json_stringify(h)
				})
				.join(" "));
			else typeof a === "object" ? b.echo(e.json_stringify(a)) : b.echo(a)
		}

		function l(a)
		{
			var h = function (j, o)
			{
				b.pause();
				e.jrpc(a, j, o, function (p)
				{
					p.error ? b.error("&#91;RPC&#93; " + p.error.message) : g(p.result);
					b.resume()
				}, function (p, v)
				{
					v !== "abort" && b.error("&#91;AJAX&#93; " + v + " - Server reponse is: \n" + p.responseText);
					b.resume()
				})
			};
			return function (j, o)
			{
				if (j !== "")
				{
					j = i(j);
					if (!m.login || j.name === "help") h(j.name, j.args);
					else
					{
						var p = o.token();
						p ? h(j.name, [p].concat(j.args)) : o.error("&#91;AUTH&#93; Access denied (no token)")
					}
				}
			}
		}

		function r(a, h)
		{
			return function (j, o)
			{
				if (j !== "")
				{
					j = i(j);
					var p = a[j.name],
						v = e.type(p);
					if (v === "function")
						if (h && p.length !== j.args.length) b.error("&#91;Arity&#93; wrong number of arguments. Function '" + j.name + "' expect " + p.length + " got " + j.args.length);
						else return p.apply(b, j.args);
					else if (v === "object" || v === "string")
					{
						var U = [];
						if (v === "object")
						{
							for (var V in p) p.hasOwnProperty(V) && U.push(V);
							p = r(p, h)
						}
						o.push(p,
						{
							prompt: j.name + "> ",
							name: j.name,
							completion: v === "object" ? function (N, aa, W)
							{
								W(U)
							} : R
						})
					}
					else o.error("Command '" + j.name + "' Not Found")
				}
			}
		}

		function C(a, h)
		{
			h = h || e.noop;
			var j = e.type(a),
				o = {};
			if (j === "string")
			{
				b.pause();
				e.jrpc(a, "system.describe", [], function (U)
				{
					var V = [];
					if (U.procs)
					{
						var N = {};
						e.each(U.procs, function (aa, W)
						{
							V.push(W.name);
							N[W.name] = function ()
							{
								var ca = Array.prototype.slice.call(arguments);
								if (m.checkArity && W.params && W.params.length !== ca.length) b.error("&#91;Arity&#93; wrong number of arguments.Function '" + W.name + "' expect " + W.params.length + " got " + ca.length);
								else
								{
									b.pause();
									e.jrpc(a, W.name, ca, function (ga)
									{
										ga.error ? b.error("&#91;RPC&#93; " + ga.error.message) : g(ga.result);
										b.resume()
									}, function (ga, sa)
									{
										sa !== "abort" && b.error("&#91;AJAX&#93; " + sa + " - Server reponse is: \n" + ga.responseText);
										b.resume()
									})
								}
							}
						});
						o.interpreter = r(N, false);
						o.completion = function (aa, W, ca)
						{
							ca(V)
						}
					}
					else
					{
						o.interpreter = l(a);
						o.completion = m.completion
					}
					b.resume();
					h(o)
				}, function ()
				{
					o.completion = m.completion;
					o.interpreter = l(a);
					h(o)
				})
			}
			else if (j === "object")
			{
				var p = [],
					v;
				for (v in a) p.push(v);
				o.interpreter = r(a, true);
				o.completion = function (U, V, N)
				{
					N(p)
				};
				h(o)
			}
			else if (j !== "function") throw j + " is invalid interpreter value";
			else h(
			{
				interpreter: a,
				completion: m.completion
			})
		}

		function k(a)
		{
			return typeof a === "string" ? a : typeof a.fileName === "string" ? a.fileName + ": " + a.message : a.message
		}

		function w(a, h)
		{
			if (m.displayExceptions)
			{
				var j = k(a);
				b.error("&#91;" + h + "&#93;: " + j);
				if (typeof a.fileName === "string")
				{
					b.pause();
					e.get(a.fileName, function (o)
					{
						b.resume();
						var p = a.lineNumber - 1;
						(o = o.split("\n")[p]) && b.error("&#91;" + a.lineNumber + "&#93;: " + o)
					})
				}
				a.stack && b.error(a.stack)
			}
		}

		function z()
		{
			var a = P.prop ? P.prop("scrollHeight") : P.attr("scrollHeight");
			P.scrollTop(a)
		}

		function B(a, h)
		{
			try
			{
				if (typeof h === "function") h(function () {});
				else if (typeof h !== "string") throw a + " must be string or function";
			}
			catch (j)
			{
				w(j, a.toUpperCase());
				return false
			}
			return true
		}

		function x(a, h)
		{
			try
			{
				var j = e.extend(
				{
					raw: false,
					finalize: e.noop
				}, h ||
				{});
				a = e.type(a) === "function" ? a() : a;
				a = e.type(a) === "string" ? a : String(a);
				var o, p;
				j.raw || (a = e.terminal.encode(a));
				a = e.terminal.from_ntroff(a);
				a = e.terminal.from_ansi(a);
				Q.push(O);
				if (!j.raw && (a.length > L || a.match(/\n/)))
				{
					var v = e.terminal.split_equal(a, L);
					o = 0;
					for (p = v.length; o < p; ++o)
						if (v[o] === "" || v[o] === "\r") Q.push("&nbsp");
						else j.raw ? Q.push(v[o]) : Q.push(e.terminal.format(v[o]))
				}
				else
				{
					j.raw || (a = e.terminal.format(a));
					Q.push(a)
				}
				Q.push(j.finalize)
			}
			catch (U)
			{
				alert("Internal Exception(draw_line):" + k(U) + "\n" + U.stack)
			}
		}

		function A()
		{
			try
			{
				if (m.outputLimit >= 0)
				{
					var a = b.rows(),
						h = m.outputLimit === 0 ? a : m.outputLimit;
					a = 0;
					for (var j, o, p = e("<div/>"), v = Q.length; v--;)
						if (typeof Q[v] === "function")
						{
							o = Q[v];
							j = e("<div/>")
						}
						else if (Q[v] === O)
					{
						j.prependTo(p);
						try
						{
							o(j)
						}
						catch (U)
						{
							w(U, "USER:echo(finalize)")
						}
					}
					else
					{
						j.prepend("<div>" + Q[v] + "</div>");
						if (++a === h)
						{
							if (Q[v - 1] !== O) try
							{
								o(j)
							}
							catch (V)
							{
								w(V, "USER:echo(finalize)")
							}
							break
						}
					}
					p.children()
						.appendTo(f)
				}
				else e.each(Q, function (aa, W)
				{
					if (W === O) j = e("<div></div>");
					else if (typeof W === "function")
					{
						j.appendTo(f);
						try
						{
							W(j)
						}
						catch (ca)
						{
							w(ca, "USER:echo(finalize)")
						}
					}
					else e("<div/>")
						.html(W)
						.appendTo(j)
						.width("100%")
				});
				z();
				Q = []
			}
			catch (N)
			{
				alert("flush " + k(N) + "\n" + N.stack)
			}
		}

		function G()
		{
			if (m.greetings === R) b.echo(b.signature);
			else m.greetings && b.echo(m.greetings)
		}

		function H(a)
		{
			a = e.terminal.escape_brackets(e.terminal.encode(a, true));
			var h = u.prompt();
			if (u.mask()) a = a.replace(/./g, "*");
			typeof h === "function" ? h(function (j)
			{
				b.echo(j + a)
			}) : b.echo(h + a)
		}

		function F(a, h)
		{
			try
			{
				Z = a;
				var j = s.top();
				if (a === "exit" && m.exit)
					if (s.size() === 1)
						if (m.login) n();
						else
						{
							h || H(a);
							b.echo("You can't exit from main interpeter")
						}
				else b.pop("exit");
				else
				{
					h || H(a);
					var o = J.length - 1;
					if (a === "clear" && m.clear) b.clear();
					else
					{
						var p = j.interpreter(a, b);
						if (p !== R)
						{
							if (o === J.length - 1)
							{
								J.pop();
								p !== false && b.echo(p)
							}
							else J = p === false ? J.slice(0, o)
								.concat(J.slice(o + 1)) : J.slice(0, o)
								.concat([p])
								.concat(J.slice(o + 1));
							b.resize()
						}
					}
				}
			}
			catch (v)
			{
				w(v, "USER");
				b.resume();
				throw v;
			}
		}

		function M()
		{
			var a = null;
			u.prompt("login: ");
			m.history && u.history()
				.disable();
			u.commands(function (h)
			{
				try
				{
					H(h);
					if (a)
					{
						u.mask(false);
						b.pause();
						if (typeof m.login !== "function") throw "Value of login property must be a function";
						m.login(a, h, function (o)
						{
							if (o)
							{
								var p = m.name;
								p = (p ? p + "_" : "") + t + "_";
								e.Storage.set(p + "token", o);
								e.Storage.set(p + "login", a);
								u.commands(F);
								T()
							}
							else
							{
								b.error("Wrong password try again");
								u.prompt("login: ");
								a = null
							}
							b.resume()
						}, b)
					}
					else
					{
						a = h;
						u.prompt("password: ");
						u.mask(true)
					}
				}
				catch (j)
				{
					w(j, "LOGIN", b);
					throw j;
				}
			})
		}

		function n()
		{
			if (typeof m.onBeforelogout === "function") try
			{
				if (m.onBeforelogout(b) == false) return
			}
			catch (a)
			{
				w(a, "onBeforelogout");
				throw a;
			}
			var h = (m.name ? m.name + "_" : "") + t + "_";
			e.Storage.remove(h + "token");
			e.Storage.remove(h + "login");
			m.history && u.history()
				.disable();
			M();
			if (typeof m.onAfterlogout === "function") try
			{
				m.onAfterlogout(b)
			}
			catch (j)
			{
				w(j, "onAfterlogout");
				throw j;
			}
		}

		function q(a)
		{
			var h = (m.name ? m.name + "_" : "") + t + "_interpreters",
				j = e.Storage.get(h);
			j = j ? (new Function("return " + j + ";"))() : [];
			if (!e.inArray(a, h))
			{
				j.push(a);
				e.Storage.set(h, e.json_stringify(j))
			}
		}

		function K()
		{
			var a = s.top(),
				h = (m.name ? m.name + "_" : "") + t + (I.length ? "_" + I.join("_") : "");
			q(h);
			u.name(h);
			typeof a.prompt == "function" ? u.prompt(function (j)
			{
				a.prompt(j, b)
			}) : u.prompt(a.prompt);
			u.set("");
			if (typeof a.onStart === "function") a.onStart(b)
		}

		function T()
		{
			K();
			m.history && u.history()
				.enable();
			G();
			if (typeof m.onInit === "function") try
			{
				m.onInit(b)
			}
			catch (a)
			{
				w(a, "OnInit");
				throw a;
			}
		}

		function ea(a)
		{
			var h = s.top();
			if (e.type(h.keydown) === "function")
			{
				h = h.keydown(a, b);
				if (h !== R) return h
			}
			var j;
			b.oneTime(10, function ()
			{
				D()
			});
			if (e.type(m.keydown) === "function")
			{
				h = m.keydown(a, b);
				if (h !== R) return h
			}
			if (b.paused())
			{
				if (a.which === 68 && a.ctrlKey)
				{
					if (fa.length)
					{
						for (j = fa.length; j--;)
						{
							a = fa[j];
							if (4 !== a.readyState) try
							{
								a.abort()
							}
							catch (o)
							{
								b.error("error in aborting ajax")
							}
						}
						fa = [];
						b.resume()
					}
					return false
				}
			}
			else
			{
				if (a.which !== 9) ba = 0;
				if (a.which === 68 && a.ctrlKey)
				{
					if (u.get() === "")
						if (s.size() > 1 || m.login !== R) b.pop("");
						else
						{
							b.resume();
							b.echo("")
						}
					else b.set_command("");
					return false
				}
				else if (m.tabcompletion && a.which === 9)
				{
					++ba;
					var p = u.get()
						.substring(0, u.position());
					a = p.split(" ");
					var v;
					if (a.length == 1) v = a[0];
					else
					{
						v = a[a.length - 1];
						for (j = a.length - 1; j > 0; j--)
							if (a[j - 1][a[j - 1].length - 1] == "\\") v = a[j - 1] + " " + v;
							else break
					}
					a = v.replace(/([\^\$\[\]\(\)\+\*\.\|])/g, "\\$1");
					var U = RegExp("^" + a);
					s.top()
						.completion(b, v, function (V)
						{
							if (u.get()
								.substring(0, u.position()) === p)
							{
								var N = [];
								for (j = V.length; j--;) U.test(V[j]) && N.push(V[j]);
								if (N.length === 1) b.insert(N[0].replace(U, ""));
								else if (N.length > 1)
									if (ba >= 2)
									{
										H(p);
										b.echo(N.join("\t"));
										ba = 0
									}
									else
									{
										V = false;
										var aa = v.length;
										a: for (; aa < N[0].length; ++aa)
										{
											for (j = 1; j < N.length; ++j)
												if (N[0].charAt(aa) !== N[j].charAt(aa)) break a;
											V = true
										}
										V && b.insert(N[0].slice(0, aa)
											.replace(U, ""))
									}
							}
						});
					return false
				}
				else if (a.which === 86 && a.ctrlKey) b.oneTime(1, function ()
				{
					z()
				});
				else if (a.which === 9 && a.ctrlKey)
				{
					if ($.length() > 1)
					{
						b.focus(false);
						return false
					}
				}
				else if (a.which === 34) b.scroll(b.height());
				else a.which === 33 ? b.scroll(-b.height()) : b.attr(
				{
					scrollTop: b.attr("scrollHeight")
				})
			}
		}
		var Q = [],
			O = 1,
			b = this;
		if (this.length > 1) return this.each(function ()
		{
			e.fn.terminal.call(e(this), c, e.extend(
			{
				name: b.selector
			}, d))
		});
		else
		{
			if (b.data("terminal")) return b.data("terminal");
			if (b.length === 0) throw 'Sorry, but terminal said that "' + b.selector + '" is not valid selector!';
			var I = [],
				P, Z, ba = 0,
				J = [],
				f, t = $.length(),
				L, S, Y, X = [],
				m = e.extend(
				{}, e.terminal.defaults,
				{
					name: b.selector
				}, d ||
				{}),
				y = !m.enabled;
			e.extend(b, e.omap(
			{
				clear: function ()
				{
					f.html("");
					u.set("");
					J = [];
					try
					{
						m.onClear(b)
					}
					catch (a)
					{
						w(a, "onClear");
						throw a;
					}
					b.attr(
					{
						scrollTop: 0
					});
					return b
				},
				export_view: function ()
				{
					return {
						prompt: b.get_prompt(),
						command: b.get_command(),
						position: u.position(),
						lines: J.slice(0)
					}
				},
				import_view: function (a)
				{
					b.set_prompt(a.prompt);
					b.set_command(a.command);
					u.position(a.position);
					J = a.lines;
					b.resize();
					return b
				},
				exec: function (a, h)
				{
					y ? X.push([a, h]) : F(a, h);
					return b
				},
				commands: function ()
				{
					return s.top()
						.interpreter
				},
				greetings: function ()
				{
					G();
					return b
				},
				paused: function ()
				{
					return y
				},
				pause: function ()
				{
					if (u)
					{
						y = true;
						b.disable();
						u.hidden()
					}
					return b
				},
				resume: function ()
				{
					if (u)
					{
						b.enable();
						var a = X;
						for (X = []; a.length;)
						{
							var h = a.shift();
							b.exec.apply(b, h)
						}
						u.visible();
						z()
					}
					return b
				},
				cols: function ()
				{
					return L
				},
				rows: function ()
				{
					var a = e('<div class="terminal"><span>&nbsp;</span></div>')
						.appendTo("body"),
						h = Math.floor(b.height() / a.height());
					a.remove();
					return h
				},
				history: function ()
				{
					return u.history()
				},
				next: function ()
				{
					if ($.length() === 1) return b;
					else
					{
						var a = b.offset()
							.top;
						b.height();
						b.scrollTop();
						var h = b,
							j = e(window)
							.scrollTop(),
							o = j + e(window)
							.height(),
							p = e(h)
							.offset()
							.top;
						if (p + e(h)
							.height() >= j && p <= o)
						{
							$.front()
								.disable();
							a = $.rotate()
								.enable();
							h = a.offset()
								.top - 50;
							e("html,body")
								.animate(
								{
									scrollTop: h
								}, 500);
							try
							{
								m.onTerminalChange(a)
							}
							catch (v)
							{
								w(v, "onTerminalChange");
								throw v;
							}
							return a
						}
						else
						{
							b.enable();
							e("html,body")
								.animate(
								{
									scrollTop: a - 50
								}, 500);
							return b
						}
					}
				},
				focus: function (a, h)
				{
					b.oneTime(1, function ()
					{
						if ($.length() === 1)
							if (a === false) try
							{
								!h && m.onBlur(b) !== false && b.disable()
							}
						catch (j)
						{
							w(j, "onBlur");
							throw j;
						}
						else try
						{
							!h && m.onFocus(b) !== false && b.enable()
						}
						catch (o)
						{
							w(o, "onFocus");
							throw o;
						}
						else if (a === false) b.next();
						else
						{
							var p = $.front();
							if (p != b)
							{
								p.disable();
								if (!h) try
								{
									m.onTerminalChange(b)
								}
								catch (v)
								{
									w(v, "onTerminalChange");
									throw v;
								}
							}
							$.set(b);
							b.enable()
						}
					});
					return b
				},
				enable: function ()
				{
					L === R && b.resize();
					if (y)
						if (u)
						{
							u.enable();
							y = false
						}
					return b
				},
				disable: function ()
				{
					if (u)
					{
						y = true;
						u.disable()
					}
					return b
				},
				enabled: function ()
				{
					return y
				},
				signature: function ()
				{
					var a = b.cols();
					a = a < 15 ? null : a < 35 ? 0 : a < 55 ? 1 : a < 64 ? 2 : a < 75 ? 3 : 4;
					return a !== null ? Ea[a].join("\n") + "\n" : ""
				},
				version: function ()
				{
					return "0.7.4"
				},
				get_command: function ()
				{
					return u.get()
				},
				insert: function (a)
				{
					if (typeof a === "string")
					{
						u.insert(a);
						return b
					}
					else throw "insert function argument is not a string";
				},
				set_prompt: function (a)
				{
					if (B("prompt", a))
					{
						typeof a == "function" ? u.prompt(function (h)
						{
							a(h, b)
						}) : u.prompt(a);
						s.top()
							.prompt = a
					}
					return b
				},
				get_prompt: function ()
				{
					return s.top()
						.prompt
				},
				set_command: function (a)
				{
					u.set(a);
					return b
				},
				set_mask: function (a)
				{
					u.mask(a);
					return b
				},
				get_output: function (a)
				{
					return a ? J : e.map(J, function (h)
						{
							return typeof h[0] == "function" ? h[0]() : h[0]
						})
						.join("\n")
				},
				resize: function (a, h)
				{
					if (a && h)
					{
						b.width(a);
						b.height(h)
					}
					a = b.width();
					h = b.height();
					L = la(b);
					u.resize(L);
					var j = f.empty()
						.detach();
					e.each(J, function (o, p)
					{
						x.apply(null, p)
					});
					u.before(j);
					A();
					if (typeof m.onResize === "function" && (Y !== h || S !== a)) m.onResize(b);
					if (Y !== h || S !== a)
					{
						Y = h;
						S = a
					}
					return b
				},
				flush: function ()
				{
					A()
				},
				echo: function (a, h)
				{
					try
					{
						var j = e.extend(
						{
							flush: true,
							raw: false,
							finalize: e.noop
						}, h ||
						{});
						Q = [];
						x(a, j);
						j.flush && A();
						J.push([a, j]);
						if (j.outputLimit >= 0)
						{
							var o = j.outputLimit === 0 ? b.rows() : j.outputLimit,
								p = f.find("div div");
							p.length > o && p.slice(0, J.length - o + 1)
								.remove()
						}
						D()
					}
					catch (v)
					{
						alert("terminal.echo " + k(v) + "\n" + v.stack)
					}
					return b
				},
				error: function (a, h)
				{
					return b.echo("[[;#f00;]" + e.terminal.escape_brackets(a)
						.replace(/\\$/, "&#92;") + "]", h)
				},
				scroll: function (a)
				{
					var h;
					a = Math.round(a);
					if (P.prop)
					{
						a > P.prop("scrollTop") && a > 0 && P.prop("scrollTop", 0);
						h = P.prop("scrollTop")
					}
					else
					{
						a > P.attr("scrollTop") && a > 0 && P.attr("scrollTop", 0);
						h = P.attr("scrollTop")
					}
					P.scrollTop(h + a);
					return b
				},
				logout: m.login ? function ()
				{
					for (; s.size() > 1;) s.pop();
					n();
					return b
				} : function ()
				{
					throw "You don't have login function";
				},
				token: m.login ? function ()
				{
					var a = m.name;
					return e.Storage.get((a ? a + "_" : "") + t + "_token")
				} : e.noop,
				login_name: m.login ? function ()
				{
					var a = m.name;
					return e.Storage.get((a ? a + "_" : "") + t + "_login")
				} : e.noop,
				name: function ()
				{
					return s.top()
						.name
				},
				push: function (a, h)
				{
					if (h && (!h.prompt || B("prompt", h.prompt)) || !h)
					{
						h = h ||
						{};
						h.name = h.name || Z;
						h.prompt = h.prompt || h.name + " ";
						I.push(h.name);
						var j = s.top();
						if (j) j.mask = u.mask();
						C(a, function (o)
						{
							s.push(e.extend(
							{}, o, h));
							K()
						})
					}
					return b
				},
				pop: function (a)
				{
					a !== R && H(a);
					I.pop();
					if (s.top()
						.name === m.name)
					{
						if (m.login)
						{
							n();
							if (e.type(m.onExit) === "function") try
							{
								m.onExit(b)
							}
							catch (h)
							{
								w(h, "onExit");
								throw h;
							}
						}
					}
					else
					{
						a = s.pop();
						K();
						if (e.type(a.onExit) === "function") try
						{
							a.onExit(b)
						}
						catch (j)
						{
							w(j, "onExit");
							throw j;
						}
						b.set_mask(s.top()
							.mask)
					}
					return b
				},
				level: function ()
				{
					return s.size()
				},
				reset: function ()
				{
					for (b.clear(); s.size() > 1;) s.pop();
					T();
					return b
				},
				purge: function ()
				{
					var a = (m.name ? m.name + "_" : "") + t + "_",
						h = e.Storage.get(a + "interpreters");
					e.each((new Function("return " + h + ";"))(), function (j, o)
					{
						e.Storage.remove(o + "_commands")
					});
					e.Storage.remove(a + "interpreters");
					e.Storage.remove(a + "token");
					e.Storage.remove(a + "login");
					return b
				},
				destroy: function ()
				{
					u.destroy()
						.remove();
					f.remove();
					e(document)
						.unbind(".terminal");
					e(window)
						.unbind(".terminal");
					b.unbind("click, mousewheel");
					b.removeData("terminal")
						.removeClass("terminal");
					m.width && b.css("width", "");
					m.height && b.css("height", "");
					return b
				}
			}, function (a, h)
			{
				return function ()
				{
					try
					{
						return h.apply(this, Array.prototype.slice.apply(arguments))
					}
					catch (j)
					{
						a !== "exec" && w(j, "TERMINAL");
						throw j;
					}
				}
			}));
			var D = function ()
			{
				var a = ha(b);
				return function ()
				{
					if (a !== ha(b))
					{
						b.resize();
						a = ha(b)
					}
				}
			}();
			m.width && b.width(m.width);
			m.height && b.height(m.height);
			P = !navigator.userAgent.toLowerCase()
				.match(/(webkit)[ \/]([\w.]+)/) && b[0].tagName.toLowerCase() == "body" ? e("html") : b;
			e(document)
				.bind("ajaxSend.terminal", function (a, h)
				{
					fa.push(h)
				});
			f = e("<div>")
				.addClass("terminal-output")
				.appendTo(b);
			b.addClass("terminal");
			if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			{
				b.click(function ()
				{
					b.find("textarea")
						.focus()
				});
				b.find("textarea")
					.focus()
			}
			if (m.login && typeof m.onBeforeLogin === "function") try
			{
				m.onBeforeLogin(b)
			}
			catch (E)
			{
				w(E, "onBeforeLogin");
				throw E;
			}
			if (typeof c === "string" && (typeof m.login === "string" || m.login)) m.login = function (a)
			{
				return function (h, j, o)
				{
					b.pause();
					e.jrpc(c, a, [h, j], function (p)
					{
						b.resume();
						!p.error && p.result ? o(p.result) : o(null)
					}, function (p, v)
					{
						b.resume();
						b.error("&#91;AJAX&#92; Response: " + v + "\n" + p.responseText)
					})
				}
			}(e.type(m.login) === "boolean" ? "login" : m.login);
			if (B("prompt", m.prompt))
			{
				var s, u;
				C(c, function (a)
				{
					s = new ya(e.extend(
					{
						name: m.name,
						prompt: m.prompt,
						greetings: m.greetings
					}, a));
					u = e("<div/>")
						.appendTo(b)
						.cmd(
						{
							prompt: m.prompt,
							history: m.history,
							historyFilter: m.historyFilter,
							historySize: m.historySize,
							width: "100%",
							keydown: ea,
							keypress: m.keypress ? function (h)
							{
								return m.keypress(h, b)
							} : null,
							onCommandChange: function (h)
							{
								if (e.type(m.onCommandChange) === "function") try
								{
									m.onCommandChange(h, b)
								}
								catch (j)
								{
									w(j, "onCommandChange");
									throw j;
								}
								z()
							},
							commands: F
						});
					L = la(b);
					$.append(b);
					m.enabled === true ? b.focus(R, true) : b.disable();
					e(document)
						.bind("click.terminal", function (h)
						{
							!e(h.target)
								.parents()
								.hasClass("terminal") && m.onBlur(b) !== false && b.disable()
						});
					b.click(function ()
					{
						b.focus()
					});
					m.login && b.token && !b.token() && b.login_name && !b.login_name() ? M() : T();
					b.oneTime(100, function ()
					{
						e(window)
							.bind("resize.terminal", function ()
							{
								if (b.is(":visible"))
								{
									var h = b.width(),
										j = b.height();
									if (Y !== j || S !== h) b.resize()
								}
							})
					});
					e.type(e.fn.init.prototype.mousewheel) === "function" && b.mousewheel(function (h, j)
					{
						j > 0 ? b.scroll(-40) : b.scroll(40);
						return false
					}, true)
				})
			}
			b.data("terminal", b);
			return b
		}
	}
})(jQuery);