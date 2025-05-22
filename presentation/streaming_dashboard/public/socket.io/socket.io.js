/*!
 * Socket.IO v4.8.1
 * (c) 2014-2024 Guillermo Rauch
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
		: (typeof define === 'function' && define.amd ? define(factory)
			: (global = typeof globalThis === 'undefined' ? global || globalThis : globalThis, global.io = factory()));
})(this, (() => {
	'use strict';

	function _arrayLikeToArray(r, a) {
		(a == null || a > r.length) && (a = r.length);
		for (var e = 0, n = new Array(a); e < a; e++) {
			n[e] = r[e];
		}

		return n;
	}

	function _arrayWithoutHoles(r) {
		if (Array.isArray(r)) {
			return _arrayLikeToArray(r);
		}
	}

	function _construct(t, e, r) {
		if (_isNativeReflectConstruct()) {
			return Reflect.apply(Reflect.construct, null, arguments);
		}

		const o = [null];
		o.push.apply(o, e);
		const p = new (t.bind.apply(t, o))();
		return r && _setPrototypeOf(p, r.prototype), p;
	}

	function _defineProperties(e, r) {
		for (const o of r) {
			o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
		}
	}

	function _createClass(e, r, t) {
		return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, 'prototype', {
			writable: !1,
		}), e;
	}

	function _createForOfIteratorHelper(r, e) {
		let t = typeof Symbol !== 'undefined' && r[Symbol.iterator] || r['@@iterator'];
		if (!t) {
			if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && typeof r.length === 'number') {
				t && (r = t);
				let n = 0;
				const F = function () {};

				return {
					s: F,
					n() {
						return n >= r.length ? {
							done: !0,
						} : {
							done: !1,
							value: r[n++],
						};
					},
					e(r) {
						throw r;
					},
					f: F,
				};
			}

			throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
		}

		let o;
		let a = !0;
		let u = !1;
		return {
			s() {
				t = t.call(r);
			},
			n() {
				const r = t.next();
				return a = r.done, r;
			},
			e(r) {
				u = !0, o = r;
			},
			f() {
				try {
					a || t.return == null || t.return();
				} finally {
					if (u) {
						throw o;
					}
				}
			},
		};
	}

	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function (n) {
			for (let e = 1; e < arguments.length; e++) {
				const t = arguments[e];
				for (const r in t) {
					Object.hasOwn(t, r) && (n[r] = t[r]);
				}
			}

			return n;
		}, Reflect.apply(_extends, null, arguments);
	}

	function _getPrototypeOf(t) {
		return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
			return t.__proto__ || Object.getPrototypeOf(t);
		}, _getPrototypeOf(t);
	}

	function _inheritsLoose(t, o) {
		t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
	}

	function _isNativeFunction(t) {
		try {
			return Function.toString.call(t).includes('[native code]');
		} catch {
			return typeof t === 'function';
		}
	}

	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
		} catch {}

		return (_isNativeReflectConstruct = function () {
			return Boolean(t);
		})();
	}

	function _iterableToArray(r) {
		if (typeof Symbol !== 'undefined' && r[Symbol.iterator] != null || r['@@iterator'] != null) {
			return Array.from(r);
		}
	}

	function _nonIterableSpread() {
		throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
	}

	function _setPrototypeOf(t, e) {
		return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
			return t.__proto__ = e, t;
		}, _setPrototypeOf(t, e);
	}

	function _toConsumableArray(r) {
		return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
	}

	function _toPrimitive(t, r) {
		if (typeof t !== 'object' || !t) {
			return t;
		}

		const e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			const i = e.call(t, r || 'default');
			if (typeof i !== 'object') {
				return i;
			}

			throw new TypeError('@@toPrimitive must return a primitive value.');
		}

		return (r === 'string' ? String : Number)(t);
	}

	function _toPropertyKey(t) {
		const i = _toPrimitive(t, 'string');
		return typeof i === 'symbol' ? i : String(i);
	}

	function _typeof(o) {
		'@babel/helpers - typeof';

		return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (o) {
			return typeof o;
		} : function (o) {
			return o && typeof Symbol === 'function' && o.constructor === Symbol && o !== Symbol.prototype ? 'symbol' : typeof o;
		}, _typeof(o);
	}

	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if (typeof r === 'string') {
				return _arrayLikeToArray(r, a);
			}

			let t = Object.prototype.toString.call(r).slice(8, -1);
			return t === 'Object' && r.constructor && (t = r.constructor.name), t === 'Map' || t === 'Set' ? Array.from(r) : (t === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0);
		}
	}

	function _wrapNativeSuper(t) {
		const r = typeof Map === 'function' ? new Map() : void 0;
		return _wrapNativeSuper = function (t) {
			if (t === null || !_isNativeFunction(t)) {
				return t;
			}

			if (typeof t !== 'function') {
				throw new TypeError('Super expression must either be null or a function');
			}

			if (void 0 !== r) {
				if (r.has(t)) {
					return r.get(t);
				}

				r.set(t, Wrapper);
			}

			function Wrapper() {
				return _construct(t, arguments, _getPrototypeOf(this).constructor);
			}

			return Wrapper.prototype = Object.create(t.prototype, {
				constructor: {
					value: Wrapper,
					enumerable: !1,
					writable: !0,
					configurable: !0,
				},
			}), _setPrototypeOf(Wrapper, t);
		}, _wrapNativeSuper(t);
	}

	const PACKET_TYPES = Object.create(null); // No Map = no polyfill
	PACKET_TYPES.open = '0';
	PACKET_TYPES.close = '1';
	PACKET_TYPES.ping = '2';
	PACKET_TYPES.pong = '3';
	PACKET_TYPES.message = '4';
	PACKET_TYPES.upgrade = '5';
	PACKET_TYPES.noop = '6';
	const PACKET_TYPES_REVERSE = Object.create(null);
	for (const key of Object.keys(PACKET_TYPES)) {
		PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
	}

	const ERROR_PACKET = {
		type: 'error',
		data: 'parser error',
	};

	const withNativeBlob$1 = typeof Blob === 'function' || typeof Blob !== 'undefined' && Object.prototype.toString.call(Blob) === '[object BlobConstructor]';
	const withNativeArrayBuffer$2 = typeof ArrayBuffer === 'function';
	// ArrayBuffer.isView method is not defined in IE10
	const isView$1 = function isView(object) {
		return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(object) : object && object.buffer instanceof ArrayBuffer;
	};

	const encodePacket = function encodePacket(_reference, supportsBinary, callback) {
		const type = _reference.type;
		const data = _reference.data;
		if (withNativeBlob$1 && data instanceof Blob) {
			if (supportsBinary) {
				return callback(data);
			}

			return encodeBlobAsBase64(data, callback);
		}

		if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
			if (supportsBinary) {
				return callback(data);
			}

			return encodeBlobAsBase64(new Blob([data]), callback);
		}

		// Plain string
		return callback(PACKET_TYPES[type] + (data || ''));
	};

	var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
		const fileReader = new FileReader();
		fileReader.addEventListener('load', () => {
			const content = fileReader.result.split(',')[1];
			callback('b' + (content || ''));
		});

		return fileReader.readAsDataURL(data);
	};

	function toArray(data) {
		if (data instanceof Uint8Array) {
			return data;
		}

		if (data instanceof ArrayBuffer) {
			return new Uint8Array(data);
		}

		return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	}

	let TEXT_ENCODER;
	function encodePacketToBinary(packet, callback) {
		if (withNativeBlob$1 && packet.data instanceof Blob) {
			return packet.data.arrayBuffer().then(toArray).then(callback);
		}

		if (withNativeArrayBuffer$2 && (packet.data instanceof ArrayBuffer || isView$1(packet.data))) {
			return callback(toArray(packet.data));
		}

		encodePacket(packet, false, encoded => {
			TEXT_ENCODER ||= new TextEncoder();

			callback(TEXT_ENCODER.encode(encoded));
		});
	}

	// Imported from https://github.com/socketio/base64-arraybuffer
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// Use a lookup table to find the index.
	const lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
	for (let i = 0; i < chars.length; i++) {
		lookup$1[chars.charCodeAt(i)] = i;
	}

	const decode$1 = function decode(base64) {
		let bufferLength = base64.length * 0.75;
		const length_ = base64.length;
		let i;
		let p = 0;
		let encoded1;
		let encoded2;
		let encoded3;
		let encoded4;
		if (base64.at(-1) === '=') {
			bufferLength--;
			if (base64.at(-2) === '=') {
				bufferLength--;
			}
		}

		const arraybuffer = new ArrayBuffer(bufferLength);
		const bytes = new Uint8Array(arraybuffer);
		for (i = 0; i < length_; i += 4) {
			encoded1 = lookup$1[base64.charCodeAt(i)];
			encoded2 = lookup$1[base64.charCodeAt(i + 1)];
			encoded3 = lookup$1[base64.charCodeAt(i + 2)];
			encoded4 = lookup$1[base64.charCodeAt(i + 3)];
			bytes[p++] = encoded1 << 2 | encoded2 >> 4;
			bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
			bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
		}

		return arraybuffer;
	};

	const withNativeArrayBuffer$1 = typeof ArrayBuffer === 'function';
	const decodePacket = function decodePacket(encodedPacket, binaryType) {
		if (typeof encodedPacket !== 'string') {
			return {
				type: 'message',
				data: mapBinary(encodedPacket, binaryType),
			};
		}

		const type = encodedPacket.charAt(0);
		if (type === 'b') {
			return {
				type: 'message',
				data: decodeBase64Packet(encodedPacket.slice(1), binaryType),
			};
		}

		const packetType = PACKET_TYPES_REVERSE[type];
		if (!packetType) {
			return ERROR_PACKET;
		}

		return encodedPacket.length > 1 ? {
			type: PACKET_TYPES_REVERSE[type],
			data: encodedPacket.slice(1),
		} : {
			type: PACKET_TYPES_REVERSE[type],
		};
	};

	var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
		if (withNativeArrayBuffer$1) {
			const decoded = decode$1(data);
			return mapBinary(decoded, binaryType);
		}

		return {
			base64: true,
			data,
		}; // Fallback for old browsers
	};

	var mapBinary = function mapBinary(data, binaryType) {
		switch (binaryType) {
			case 'blob': {
				if (data instanceof Blob) {
					// From WebSocket + binaryType "blob"
					return data;
				}

				// From HTTP long-polling or WebTransport
				return new Blob([data]);
			}

			case 'arraybuffer':
			default: {
				if (data instanceof ArrayBuffer) {
					// From HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
					return data;
				}

				// From WebTransport (Uint8Array)
				return data.buffer;
			}
		}
	};

	const SEPARATOR = String.fromCharCode(30); // See https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
	const encodePayload = function encodePayload(packets, callback) {
		// Some packets may be added to the array while encoding, so the initial length must be saved
		const length = packets.length;
		const encodedPackets = new Array(length);
		let count = 0;
		for (const [i, packet] of packets.entries()) {
			// Force base64 encoding for binary packets
			encodePacket(packet, false, encodedPacket => {
				encodedPackets[i] = encodedPacket;
				if (++count === length) {
					callback(encodedPackets.join(SEPARATOR));
				}
			});
		}
	};

	const decodePayload = function decodePayload(encodedPayload, binaryType) {
		const encodedPackets = encodedPayload.split(SEPARATOR);
		const packets = [];
		for (const encodedPacket of encodedPackets) {
			const decodedPacket = decodePacket(encodedPacket, binaryType);
			packets.push(decodedPacket);
			if (decodedPacket.type === 'error') {
				break;
			}
		}

		return packets;
	};

	function createPacketEncoderStream() {
		return new TransformStream({
			transform: function transform(packet, controller) {
				encodePacketToBinary(packet, encodedPacket => {
					const payloadLength = encodedPacket.length;
					let header;
					// Inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
					if (payloadLength < 126) {
						header = new Uint8Array(1);
						new DataView(header.buffer).setUint8(0, payloadLength);
					} else if (payloadLength < 65_536) {
						header = new Uint8Array(3);
						const view = new DataView(header.buffer);
						view.setUint8(0, 126);
						view.setUint16(1, payloadLength);
					} else {
						header = new Uint8Array(9);
						const _view = new DataView(header.buffer);
						_view.setUint8(0, 127);
						_view.setBigUint64(1, BigInt(payloadLength));
					}

					// First bit indicates whether the payload is plain text (0) or binary (1)
					if (packet.data && typeof packet.data !== 'string') {
						header[0] |= 0x80;
					}

					controller.enqueue(header);
					controller.enqueue(encodedPacket);
				});
			},
		});
	}

	let TEXT_DECODER;
	function totalLength(chunks) {
		return chunks.reduce((accumulator, chunk) => accumulator + chunk.length, 0);
	}

	function concatChunks(chunks, size) {
		if (chunks[0].length === size) {
			return chunks.shift();
		}

		const buffer = new Uint8Array(size);
		let index = 0;
		for (let i = 0; i < size; i++) {
			buffer[i] = chunks[0][index++];
			if (index === chunks[0].length) {
				chunks.shift();
				index = 0;
			}
		}

		if (chunks.length > 0 && index < chunks[0].length) {
			chunks[0] = chunks[0].slice(index);
		}

		return buffer;
	}

	function createPacketDecoderStream(maxPayload, binaryType) {
		TEXT_DECODER ||= new TextDecoder();

		const chunks = [];
		let state = 0;
		let expectedLength = -1;
		let isBinary = false;
		return new TransformStream({
			transform: function transform(chunk, controller) {
				chunks.push(chunk);
				while (true) {
					if (state === 0 /* State.READ_HEADER */) {
						if (totalLength(chunks) < 1) {
							break;
						}

						const header = concatChunks(chunks, 1);
						isBinary = (header[0] & 0x80) === 0x80;
						expectedLength = header[0] & 0x7F;
						if (expectedLength < 126) {
							state = 3;
						} else if (expectedLength === 126) {
							state = 1;
						} else {
							state = 2;
						}
					} else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */) {
						if (totalLength(chunks) < 2) {
							break;
						}

						const headerArray = concatChunks(chunks, 2);
						expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
						state = 3;
					} else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */) {
						if (totalLength(chunks) < 8) {
							break;
						}

						const _headerArray = concatChunks(chunks, 8);
						const view = new DataView(_headerArray.buffer, _headerArray.byteOffset, _headerArray.length);
						const n = view.getUint32(0);
						if (n > 2 ** (53 - 32) - 1) {
							// The maximum safe integer in JavaScript is 2^53 - 1
							controller.enqueue(ERROR_PACKET);
							break;
						}

						expectedLength = n * 2 ** 32 + view.getUint32(4);
						state = 3;
					} else {
						if (totalLength(chunks) < expectedLength) {
							break;
						}

						const data = concatChunks(chunks, expectedLength);
						controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
						state = 0;
					}

					if (expectedLength === 0 || expectedLength > maxPayload) {
						controller.enqueue(ERROR_PACKET);
						break;
					}
				}
			},
		});
	}

	const protocol$1 = 4;

	/**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

	function Emitter(object) {
		if (object) {
			return mixin(object);
		}
	}

	/**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

	function mixin(object) {
		for (const key in Emitter.prototype) {
			object[key] = Emitter.prototype[key];
		}

		return object;
	}

	/**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

	Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, function_) {
		this._callbacks = this._callbacks || {};
		(this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(function_);
		return this;
	};

	/**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

	Emitter.prototype.once = function (event, function_) {
		function on() {
			this.off(event, on);
			Reflect.apply(function_, this, arguments);
		}

		on.fn = function_;
		this.on(event, on);
		return this;
	};

	/**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

	Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, function_) {
		this._callbacks = this._callbacks || {};

		// All
		if (arguments.length === 0) {
			this._callbacks = {};
			return this;
		}

		// Specific event
		const callbacks = this._callbacks['$' + event];
		if (!callbacks) {
			return this;
		}

		// Remove all handlers
		if (arguments.length == 1) {
			delete this._callbacks['$' + event];
			return this;
		}

		// Remove specific handler
		let callback;
		for (let i = 0; i < callbacks.length; i++) {
			callback = callbacks[i];
			if (callback === function_ || callback.fn === function_) {
				callbacks.splice(i, 1);
				break;
			}
		}

		// Remove event specific arrays for event types that no
		// one is subscribed for to avoid memory leak.
		if (callbacks.length === 0) {
			delete this._callbacks['$' + event];
		}

		return this;
	};

	/**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

	Emitter.prototype.emit = function (event) {
		this._callbacks = this._callbacks || {};
		const arguments_ = Array.from({length: arguments.length - 1});
		let callbacks = this._callbacks['$' + event];
		for (var i = 1; i < arguments.length; i++) {
			arguments_[i - 1] = arguments[i];
		}

		if (callbacks) {
			callbacks = callbacks.slice(0);
			for (var i = 0, length_ = callbacks.length; i < length_; ++i) {
				callbacks[i].apply(this, arguments_);
			}
		}

		return this;
	};

	// Alias used for reserved events (protected method)
	Emitter.prototype.emitReserved = Emitter.prototype.emit;

	/**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

	Emitter.prototype.listeners = function (event) {
		this._callbacks = this._callbacks || {};
		return this._callbacks['$' + event] || [];
	};

	/**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

	Emitter.prototype.hasListeners = function (event) {
		return this.listeners(event).length > 0;
	};

	const nextTick = (function () {
		const isPromiseAvailable = typeof Promise === 'function' && typeof Promise.resolve === 'function';
		if (isPromiseAvailable) {
			return function (callback) {
				return Promise.resolve().then(callback);
			};
		}

		return function (callback, setTimeoutFunction) {
			return setTimeoutFunction(callback, 0);
		};
	})();
	const globalThisShim = (function () {
		if (typeof globalThis !== 'undefined') {
			return globalThis;
		}

		if (typeof globalThis !== 'undefined') {
			return globalThis;
		}

		return new Function('return this')();
	})();
	const defaultBinaryType = 'arraybuffer';
	function createCookieJar() {}

	function pick(object) {
		for (var _length = arguments.length, attribute = Array.from({length: _length > 1 ? _length - 1 : 0}), _key = 1; _key < _length; _key++) {
			attribute[_key - 1] = arguments[_key];
		}

		return attribute.reduce((accumulator, k) => {
			if (object.hasOwnProperty(k)) {
				accumulator[k] = object[k];
			}

			return accumulator;
		}, {});
	}

	// Keep a reference to the real timeout functions so they can be used when overridden
	const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
	const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
	function installTimerFunctions(object, options) {
		if (options.useNativeTimers) {
			object.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
			object.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
		} else {
			object.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
			object.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
		}
	}

	// Base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
	const BASE64_OVERHEAD = 1.33;
	// We could also have used `new Blob([obj]).size`, but it isn't supported in IE9
	function byteLength(object) {
		if (typeof object === 'string') {
			return utf8Length(object);
		}

		// Arraybuffer or blob
		return Math.ceil((object.byteLength || object.size) * BASE64_OVERHEAD);
	}

	function utf8Length(string_) {
		let c = 0;
		let length = 0;
		for (let i = 0, l = string_.length; i < l; i++) {
			c = string_.charCodeAt(i);
			if (c < 0x80) {
				length += 1;
			} else if (c < 0x8_00) {
				length += 2;
			} else if (c < 0xD8_00 || c >= 0xE0_00) {
				length += 3;
			} else {
				i++;
				length += 4;
			}
		}

		return length;
	}

	/**
   * Generates a random 8-characters string.
   */
	function randomString() {
		return Date.now().toString(36).slice(3) + Math.random().toString(36).slice(2, 5);
	}

	// Imported from https://github.com/galkn/querystring
	/**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */
	function encode(object) {
		let string_ = '';
		for (const i in object) {
			if (object.hasOwnProperty(i)) {
				if (string_.length > 0) {
					string_ += '&';
				}

				string_ += encodeURIComponent(i) + '=' + encodeURIComponent(object[i]);
			}
		}

		return string_;
	}

	/**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */
	function decode(qs) {
		const qry = {};
		const pairs = qs.split('&');
		for (let i = 0, l = pairs.length; i < l; i++) {
			const pair = pairs[i].split('=');
			qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}

		return qry;
	}

	const TransportError = /* #__PURE__ */(function (_Error) {
		function TransportError(reason, description, context) {
			let _this;
			_this = _Error.call(this, reason) || this;
			_this.description = description;
			_this.context = context;
			_this.type = 'TransportError';
			return _this;
		}

		_inheritsLoose(TransportError, _Error);
		return TransportError;
	})(/* #__PURE__ */_wrapNativeSuper(Error));
	const Transport = /* #__PURE__ */(function (_Emitter) {
		/**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
		function Transport(options) {
			let _this2;
			_this2 = _Emitter.call(this) || this;
			_this2.writable = false;
			installTimerFunctions(_this2, options);
			_this2.opts = options;
			_this2.query = options.query;
			_this2.socket = options.socket;
			_this2.supportsBinary = !options.forceBase64;
			return _this2;
		}

		/**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
		_inheritsLoose(Transport, _Emitter);
		const _proto = Transport.prototype;
		_proto.onError = function onError(reason, description, context) {
			_Emitter.prototype.emitReserved.call(this, 'error', new TransportError(reason, description, context));
			return this;
		}
		/**
     * Opens the transport.
     */;

		_proto.open = function open() {
			this.readyState = 'opening';
			this.doOpen();
			return this;
		}
		/**
     * Closes the transport.
     */;

		_proto.close = function close() {
			if (this.readyState === 'opening' || this.readyState === 'open') {
				this.doClose();
				this.onClose();
			}

			return this;
		}
		/**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */;

		_proto.send = function send(packets) {
			if (this.readyState === 'open') {
				this.write(packets);
			}
		}
		/**
     * Called upon open
     *
     * @protected
     */;

		_proto.onOpen = function onOpen() {
			this.readyState = 'open';
			this.writable = true;
			_Emitter.prototype.emitReserved.call(this, 'open');
		}
		/**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */;

		_proto.onData = function onData(data) {
			const packet = decodePacket(data, this.socket.binaryType);
			this.onPacket(packet);
		}
		/**
     * Called with a decoded packet.
     *
     * @protected
     */;

		_proto.onPacket = function onPacket(packet) {
			_Emitter.prototype.emitReserved.call(this, 'packet', packet);
		}
		/**
     * Called upon close.
     *
     * @protected
     */;

		_proto.onClose = function onClose(details) {
			this.readyState = 'closed';
			_Emitter.prototype.emitReserved.call(this, 'close', details);
		}
		/**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */;

		_proto.pause = function pause(onPause) {};
		_proto.createUri = function createUri(schema) {
			const query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			return schema + '://' + this._hostname() + this._port() + this.opts.path + this._query(query);
		};

		_proto._hostname = function _hostname() {
			const hostname = this.opts.hostname;
			return hostname.includes(':') ? '[' + hostname + ']' : hostname;
		};

		_proto._port = function _port() {
			if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
				return ':' + this.opts.port;
			}

			return '';
		};

		_proto._query = function _query(query) {
			const encodedQuery = encode(query);
			return encodedQuery.length > 0 ? '?' + encodedQuery : '';
		};

		return Transport;
	})(Emitter);

	const Polling = /* #__PURE__ */(function (_Transport) {
		function Polling() {
			let _this;
			_this = Reflect.apply(_Transport, this, arguments) || this;
			_this._polling = false;
			return _this;
		}

		_inheritsLoose(Polling, _Transport);
		const _proto = Polling.prototype;
		/**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
		_proto.doOpen = function doOpen() {
			this._poll();
		}
		/**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */;

		_proto.pause = function pause(onPause) {
			const _this2 = this;
			this.readyState = 'pausing';
			const pause = function pause() {
				_this2.readyState = 'paused';
				onPause();
			};

			if (this._polling || !this.writable) {
				let total = 0;
				if (this._polling) {
					total++;
					this.once('pollComplete', () => {
						--total || pause();
					});
				}

				if (!this.writable) {
					total++;
					this.once('drain', () => {
						--total || pause();
					});
				}
			} else {
				pause();
			}
		}
		/**
     * Starts polling cycle.
     *
     * @private
     */;

		_proto._poll = function _poll() {
			this._polling = true;
			this.doPoll();
			this.emitReserved('poll');
		}
		/**
     * Overloads onData to detect payloads.
     *
     * @protected
     */;

		_proto.onData = function onData(data) {
			const _this3 = this;
			const callback = function callback(packet) {
				// If its the first message we consider the transport open
				if (_this3.readyState === 'opening' && packet.type === 'open') {
					_this3.onOpen();
				}

				// If its a close packet, we close the ongoing requests
				if (packet.type === 'close') {
					_this3.onClose({
						description: 'transport closed by the server',
					});
					return false;
				}

				// Otherwise bypass onData and handle the message
				_this3.onPacket(packet);
			};

			// Decode payload
			decodePayload(data, this.socket.binaryType).forEach(callback);
			// If an event did not trigger closing
			if (this.readyState !== 'closed') {
				// If we got data we're not polling
				this._polling = false;
				this.emitReserved('pollComplete');
				if (this.readyState === 'open') {
					this._poll();
				}
			}
		}
		/**
     * For polling, send a close packet.
     *
     * @protected
     */;

		_proto.doClose = function doClose() {
			const _this4 = this;
			const close = function close() {
				_this4.write([{
					type: 'close',
				}]);
			};

			if (this.readyState === 'open') {
				close();
			} else {
				// In case we're trying to close while
				// handshaking is in progress (GH-164)
				this.once('open', close);
			}
		}
		/**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */;

		_proto.write = function write(packets) {
			const _this5 = this;
			this.writable = false;
			encodePayload(packets, data => {
				_this5.doWrite(data, () => {
					_this5.writable = true;
					_this5.emitReserved('drain');
				});
			});
		}
		/**
     * Generates uri for connection.
     *
     * @private
     */;

		_proto.uri = function uri() {
			const schema = this.opts.secure ? 'https' : 'http';
			const query = this.query || {};
			// Cache busting is forced
			if (this.opts.timestampRequests !== false) {
				query[this.opts.timestampParam] = randomString();
			}

			if (!this.supportsBinary && !query.sid) {
				query.b64 = 1;
			}

			return this.createUri(schema, query);
		};

		return _createClass(Polling, [{
			key: 'name',
			get: function get() {
				return 'polling';
			},
		}]);
	})(Transport);

	// Imported from https://github.com/component/has-cors
	let value = false;
	try {
		value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
	} catch {
		// If XMLHttp support is disabled in IE then it will throw
		// when trying to create
	}

	const hasCORS = value;

	function empty() {}
	const BaseXHR = /* #__PURE__ */(function (_Polling) {
		/**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
		function BaseXHR(options) {
			let _this;
			_this = _Polling.call(this, options) || this;
			if (typeof location !== 'undefined') {
				const isSSL = location.protocol === 'https:';
				let port = location.port;
				// Some user agents have empty `location.port`
				port ||= isSSL ? '443' : '80';

				_this.xd = typeof location !== 'undefined' && options.hostname !== location.hostname || port !== options.port;
			}

			return _this;
		}

		/**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
		_inheritsLoose(BaseXHR, _Polling);
		const _proto = BaseXHR.prototype;
		_proto.doWrite = function doWrite(data, function_) {
			const _this2 = this;
			const request = this.request({
				method: 'POST',
				data,
			});
			request.on('success', function_);
			request.on('error', (xhrStatus, context) => {
				_this2.onError('xhr post error', xhrStatus, context);
			});
		}
		/**
     * Starts a poll cycle.
     *
     * @private
     */;

		_proto.doPoll = function doPoll() {
			const _this3 = this;
			const request = this.request();
			request.on('data', this.onData.bind(this));
			request.on('error', (xhrStatus, context) => {
				_this3.onError('xhr poll error', xhrStatus, context);
			});
			this.pollXhr = request;
		};

		return BaseXHR;
	})(Polling);
	const Request = /* #__PURE__ */(function (_Emitter) {
		/**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
		function Request(createRequest, uri, options) {
			let _this4;
			_this4 = _Emitter.call(this) || this;
			_this4.createRequest = createRequest;
			installTimerFunctions(_this4, options);
			_this4._opts = options;
			_this4._method = options.method || 'GET';
			_this4._uri = uri;
			_this4._data = undefined === options.data ? null : options.data;
			_this4._create();
			return _this4;
		}

		/**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
		_inheritsLoose(Request, _Emitter);
		const _proto2 = Request.prototype;
		_proto2._create = function _create() {
			const _this5 = this;
			let _a;
			const options = pick(this._opts, 'agent', 'pfx', 'key', 'passphrase', 'cert', 'ca', 'ciphers', 'rejectUnauthorized', 'autoUnref');
			options.xdomain = Boolean(this._opts.xd);
			const xhr = this._xhr = this.createRequest(options);
			try {
				xhr.open(this._method, this._uri, true);
				try {
					if (this._opts.extraHeaders) {
						// @ts-ignore
						xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
						for (const i in this._opts.extraHeaders) {
							if (this._opts.extraHeaders.hasOwnProperty(i)) {
								xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
							}
						}
					}
				} catch {}

				if (this._method === 'POST') {
					try {
						xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
					} catch {}
				}

				try {
					xhr.setRequestHeader('Accept', '*/*');
				} catch {}

				(_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
				// Ie6 check
				if ('withCredentials' in xhr) {
					xhr.withCredentials = this._opts.withCredentials;
				}

				if (this._opts.requestTimeout) {
					xhr.timeout = this._opts.requestTimeout;
				}

				xhr.addEventListener('readystatechange', () => {
					let _a;
					if (xhr.readyState === 3) {
						(_a = _this5._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(
							// @ts-ignore
							xhr.getResponseHeader('set-cookie'));
					}

					if (xhr.readyState !== 4) {
						return;
					}

					if (xhr.status === 200 || xhr.status === 1223) {
						_this5._onLoad();
					} else {
						// Make sure the `error` event handler that's user-set
						// does not throw in the same tick and gets caught here
						_this5.setTimeoutFn(() => {
							_this5._onError(typeof xhr.status === 'number' ? xhr.status : 0);
						}, 0);
					}
				});

				xhr.send(this._data);
			} catch (error) {
				// Need to defer since .create() is called directly from the constructor
				// and thus the 'error' event can only be only bound *after* this exception
				// occurs.  Therefore, also, we cannot throw here at all.
				this.setTimeoutFn(() => {
					_this5._onError(error);
				}, 0);
				return;
			}

			if (typeof document !== 'undefined') {
				this._index = Request.requestsCount++;
				Request.requests[this._index] = this;
			}
		}
		/**
     * Called upon error.
     *
     * @private
     */;

		_proto2._onError = function _onError(error) {
			this.emitReserved('error', error, this._xhr);
			this._cleanup(true);
		}
		/**
     * Cleans up house.
     *
     * @private
     */;

		_proto2._cleanup = function _cleanup(fromError) {
			if (this._xhr === undefined || this._xhr === null) {
				return;
			}

			this._xhr.addEventListener('readystatechange', empty);
			if (fromError) {
				try {
					this._xhr.abort();
				} catch {}
			}

			if (typeof document !== 'undefined') {
				delete Request.requests[this._index];
			}

			this._xhr = null;
		}
		/**
     * Called upon load.
     *
     * @private
     */;

		_proto2._onLoad = function _onLoad() {
			const data = this._xhr.responseText;
			if (data !== null) {
				this.emitReserved('data', data);
				this.emitReserved('success');
				this._cleanup();
			}
		}
		/**
     * Aborts the request.
     *
     * @package
     */;

		_proto2.abort = function abort() {
			this._cleanup();
		};

		return Request;
	})(Emitter);
	Request.requestsCount = 0;
	Request.requests = {};
	/**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */
	if (typeof document !== 'undefined') {
		// @ts-ignore
		if (typeof attachEvent === 'function') {
			// @ts-ignore
			attachEvent('onunload', unloadHandler);
		} else if (typeof addEventListener === 'function') {
			const terminationEvent = 'onpagehide' in globalThisShim ? 'pagehide' : 'unload';
			addEventListener(terminationEvent, unloadHandler, false);
		}
	}

	function unloadHandler() {
		for (const i in Request.requests) {
			if (Request.requests.hasOwnProperty(i)) {
				Request.requests[i].abort();
			}
		}
	}

	const hasXHR2 = (function () {
		const xhr = newRequest({
			xdomain: false,
		});
		return xhr && xhr.responseType !== null;
	})();
	/**
   * HTTP long-polling based on the built-in `XMLHttpRequest` object.
   *
   * Usage: browser
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
   */
	const XHR = /* #__PURE__ */(function (_BaseXHR) {
		function XHR(options) {
			let _this6;
			_this6 = _BaseXHR.call(this, options) || this;
			const forceBase64 = options && options.forceBase64;
			_this6.supportsBinary = hasXHR2 && !forceBase64;
			return _this6;
		}

		_inheritsLoose(XHR, _BaseXHR);
		const _proto3 = XHR.prototype;
		_proto3.request = function request() {
			const options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			_extends(options, {
				xd: this.xd,
			}, this.opts);
			return new Request(newRequest, this.uri(), options);
		};

		return XHR;
	})(BaseXHR);
	function newRequest(options) {
		const xdomain = options.xdomain;
		// XMLHttpRequest can be disabled on IE
		try {
			if (typeof XMLHttpRequest !== 'undefined' && (!xdomain || hasCORS)) {
				return new XMLHttpRequest();
			}
		} catch {}

		if (!xdomain) {
			try {
				return new globalThisShim[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
			} catch {}
		}
	}

	// Detect ReactNative environment
	const isReactNative = typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative';
	const BaseWS = /* #__PURE__ */(function (_Transport) {
		function BaseWS() {
			return Reflect.apply(_Transport, this, arguments) || this;
		}

		_inheritsLoose(BaseWS, _Transport);
		const _proto = BaseWS.prototype;
		_proto.doOpen = function doOpen() {
			const uri = this.uri();
			const protocols = this.opts.protocols;
			// React Native only supports the 'headers' option, and will print a warning if anything else is passed
			const options = isReactNative ? {} : pick(this.opts, 'agent', 'perMessageDeflate', 'pfx', 'key', 'passphrase', 'cert', 'ca', 'ciphers', 'rejectUnauthorized', 'localAddress', 'protocolVersion', 'origin', 'maxPayload', 'family', 'checkServerIdentity');
			if (this.opts.extraHeaders) {
				options.headers = this.opts.extraHeaders;
			}

			try {
				this.ws = this.createSocket(uri, protocols, options);
			} catch (error) {
				return this.emitReserved('error', error);
			}

			this.ws.binaryType = this.socket.binaryType;
			this.addEventListeners();
		}
		/**
     * Adds event listeners to the socket
     *
     * @private
     */;

		_proto.addEventListeners = function addEventListeners() {
			const _this = this;
			this.ws.addEventListener('open', () => {
				if (_this.opts.autoUnref) {
					_this.ws._socket.unref();
				}

				_this.onOpen();
			});

			this.ws.addEventListener('close', closeEvent => _this.onClose({
				description: 'websocket connection closed',
				context: closeEvent,
			}));

			this.ws.onmessage = function (event_) {
				return _this.onData(event_.data);
			};

			this.ws.onerror = function (e) {
				return _this.onError('websocket error', e);
			};
		};

		_proto.write = function write(packets) {
			const _this2 = this;
			this.writable = false;
			// EncodePacket efficient as it uses WS framing
			// no need for encodePayload
			const _loop = function _loop() {
				const packet = packets[i];
				const lastPacket = i === packets.length - 1;
				encodePacket(packet, _this2.supportsBinary, data => {
					// Sometimes the websocket has already been closed but the browser didn't
					// have a chance of informing us about it yet, in that case send will
					// throw an error
					try {
						_this2.doWrite(packet, data);
					} catch {}

					if (lastPacket) {
						// Fake drain
						// defer to next tick to allow Socket to clear writeBuffer
						nextTick(() => {
							_this2.writable = true;
							_this2.emitReserved('drain');
						}, _this2.setTimeoutFn);
					}
				});
			};

			for (var i = 0; i < packets.length; i++) {
				_loop();
			}
		};

		_proto.doClose = function doClose() {
			if (this.ws !== undefined) {
				this.ws.onerror = function () {};
				this.ws.close();
				this.ws = null;
			}
		}
		/**
     * Generates uri for connection.
     *
     * @private
     */;

		_proto.uri = function uri() {
			const schema = this.opts.secure ? 'wss' : 'ws';
			const query = this.query || {};
			// Append timestamp to URI
			if (this.opts.timestampRequests) {
				query[this.opts.timestampParam] = randomString();
			}

			// Communicate binary support capabilities
			if (!this.supportsBinary) {
				query.b64 = 1;
			}

			return this.createUri(schema, query);
		};

		return _createClass(BaseWS, [{
			key: 'name',
			get: function get() {
				return 'websocket';
			},
		}]);
	})(Transport);
	const WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
	/**
   * WebSocket transport based on the built-in `WebSocket` object.
   *
   * Usage: browser, Node.js (since v21), Deno, Bun
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
   * @see https://caniuse.com/mdn-api_websocket
   * @see https://nodejs.org/api/globals.html#websocket
   */
	const WS = /* #__PURE__ */(function (_BaseWS) {
		function WS() {
			return Reflect.apply(_BaseWS, this, arguments) || this;
		}

		_inheritsLoose(WS, _BaseWS);
		const _proto2 = WS.prototype;
		_proto2.createSocket = function createSocket(uri, protocols, options) {
			return isReactNative ? new WebSocketCtor(uri, protocols, options) : (protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri));
		};

		_proto2.doWrite = function doWrite(_packet, data) {
			this.ws.send(data);
		};

		return WS;
	})(BaseWS);

	/**
   * WebTransport transport based on the built-in `WebTransport` object.
   *
   * Usage: browser, Node.js (with the `@fails-components/webtransport` package)
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
   * @see https://caniuse.com/webtransport
   */
	const WT = /* #__PURE__ */(function (_Transport) {
		function WT() {
			return Reflect.apply(_Transport, this, arguments) || this;
		}

		_inheritsLoose(WT, _Transport);
		const _proto = WT.prototype;
		_proto.doOpen = function doOpen() {
			const _this = this;
			try {
				// @ts-ignore
				this._transport = new WebTransport(this.createUri('https'), this.opts.transportOptions[this.name]);
			} catch (error) {
				return this.emitReserved('error', error);
			}

			this._transport.closed.then(() => {
				_this.onClose();
			}).catch(error => {
				_this.onError('webtransport error', error);
			});
			// Note: we could have used async/await, but that would require some additional polyfills
			this._transport.ready.then(() => {
				_this._transport.createBidirectionalStream().then(stream => {
					const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, _this.socket.binaryType);
					const reader = stream.readable.pipeThrough(decoderStream).getReader();
					const encoderStream = createPacketEncoderStream();
					encoderStream.readable.pipeTo(stream.writable);
					_this._writer = encoderStream.writable.getWriter();
					const read = function read() {
						reader.read().then(_reference => {
							const done = _reference.done;
							const value = _reference.value;
							if (done) {
								return;
							}

							_this.onPacket(value);
							read();
						}).catch(error => {});
					};

					read();
					const packet = {
						type: 'open',
					};
					if (_this.query.sid) {
						packet.data = '{"sid":"'.concat(_this.query.sid, '"}');
					}

					_this._writer.write(packet).then(() => _this.onOpen());
				});
			});
		};

		_proto.write = function write(packets) {
			const _this2 = this;
			this.writable = false;
			const _loop = function _loop() {
				const packet = packets[i];
				const lastPacket = i === packets.length - 1;
				_this2._writer.write(packet).then(() => {
					if (lastPacket) {
						nextTick(() => {
							_this2.writable = true;
							_this2.emitReserved('drain');
						}, _this2.setTimeoutFn);
					}
				});
			};

			for (var i = 0; i < packets.length; i++) {
				_loop();
			}
		};

		_proto.doClose = function doClose() {
			let _a;
			(_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
		};

		return _createClass(WT, [{
			key: 'name',
			get: function get() {
				return 'webtransport';
			},
		}]);
	})(Transport);

	const transports = {
		websocket: WS,
		webtransport: WT,
		polling: XHR,
	};

	// Imported from https://github.com/galkn/parseuri
	/**
   * Parses a URI
   *
   * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
   *
   * See:
   * - https://developer.mozilla.org/en-US/docs/Web/API/URL
   * - https://caniuse.com/url
   * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
   *
   * History of the parse() method:
   * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
   * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
   * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */
	const re = /^(?:(?![^:@/?#]+:[^:@/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@/?#]*)(?::([^:@/?#]*))?)?@)?((?:[a-f\d]{0,4}:){2,7}[a-f\d]{0,4}|[^:/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#/]*\.[^?#/.]+(?:[?#]|$)))*\/?)?([^?#/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	const parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
	function parse(string_) {
		if (string_.length > 8000) {
			throw 'URI too long';
		}

		const source = string_;
		const b = string_.indexOf('[');
		const e = string_.indexOf(']');
		if (b != -1 && e != -1) {
			string_ = string_.slice(0, Math.max(0, b)) + string_.substring(b, e).replaceAll(':', ';') + string_.substring(e, string_.length);
		}

		const m = re.exec(string_ || '');
		const uri = {};
		let i = 14;
		while (i--) {
			uri[parts[i]] = m[i] || '';
		}

		if (b != -1 && e != -1) {
			uri.source = source;
			uri.host = uri.host.substring(1, uri.host.length - 1).replaceAll(';', ':');
			uri.authority = uri.authority.replace('[', '').replace(']', '').replaceAll(';', ':');
			uri.ipv6uri = true;
		}

		uri.pathNames = pathNames(uri, uri.path);
		uri.queryKey = queryKey(uri, uri.query);
		return uri;
	}

	function pathNames(object, path) {
		const regx = /\/{2,9}/g;
		const names = path.replaceAll(regx, '/').split('/');
		if (path.slice(0, 1) == '/' || path.length === 0) {
			names.splice(0, 1);
		}

		if (path.slice(-1) == '/') {
			names.splice(-1, 1);
		}

		return names;
	}

	function queryKey(uri, query) {
		const data = {};
		query.replaceAll(/(?:^|&)([^&=]*)=?([^&]*)/g, ($0, $1, $2) => {
			if ($1) {
				data[$1] = $2;
			}
		});
		return data;
	}

	const withEventListeners = typeof addEventListener === 'function' && typeof removeEventListener === 'function';
	const OFFLINE_EVENT_LISTENERS = [];
	if (withEventListeners) {
		// Within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
		// script, so we create one single event listener here which will forward the event to the socket instances
		addEventListener('offline', () => {
			for (const listener of OFFLINE_EVENT_LISTENERS) {
				 listener(); continue;
			}
		}, false);
	}

	/**
   * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
   * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
   *
   * This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
   * successfully establishes the connection.
   *
   * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
   *
   * @example
   * import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
   *
   * const socket = new SocketWithoutUpgrade({
   *   transports: [WebSocket]
   * });
   *
   * socket.on("open", () => {
   *   socket.send("hello");
   * });
   *
   * @see SocketWithUpgrade
   * @see Socket
   */
	const SocketWithoutUpgrade = /* #__PURE__ */(function (_Emitter) {
		/**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
		function SocketWithoutUpgrade(uri, options) {
			let _this;
			_this = _Emitter.call(this) || this;
			_this.binaryType = defaultBinaryType;
			_this.writeBuffer = [];
			_this._prevBufferLen = 0;
			_this._pingInterval = -1;
			_this._pingTimeout = -1;
			_this._maxPayload = -1;
			/**
       * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
       * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
       */
			_this._pingTimeoutTime = Infinity;
			if (uri && _typeof(uri) === 'object') {
				options = uri;
				uri = null;
			}

			if (uri) {
				const parsedUri = parse(uri);
				options.hostname = parsedUri.host;
				options.secure = parsedUri.protocol === 'https' || parsedUri.protocol === 'wss';
				options.port = parsedUri.port;
				if (parsedUri.query) {
					options.query = parsedUri.query;
				}
			} else if (options.host) {
				options.hostname = parse(options.host).host;
			}

			installTimerFunctions(_this, options);
			_this.secure = options.secure == null ? typeof location !== 'undefined' && location.protocol === 'https:' : options.secure;
			if (options.hostname && !options.port) {
				// If no port is specified manually, use the protocol default
				options.port = _this.secure ? '443' : '80';
			}

			_this.hostname = options.hostname || (typeof location === 'undefined' ? 'localhost' : location.hostname);
			_this.port = options.port || (typeof location !== 'undefined' && location.port ? location.port : (_this.secure ? '443' : '80'));
			_this.transports = [];
			_this._transportsByName = {};
			for (const t of options.transports) {
				const transportName = t.prototype.name;
				_this.transports.push(transportName);
				_this._transportsByName[transportName] = t;
			}

			_this.opts = _extends({
				path: '/engine.io',
				agent: false,
				withCredentials: false,
				upgrade: true,
				timestampParam: 't',
				rememberUpgrade: false,
				addTrailingSlash: true,
				rejectUnauthorized: true,
				perMessageDeflate: {
					threshold: 1024,
				},
				transportOptions: {},
				closeOnBeforeunload: false,
			}, options);
			_this.opts.path = _this.opts.path.replace(/\/$/, '') + (_this.opts.addTrailingSlash ? '/' : '');
			if (typeof _this.opts.query === 'string') {
				_this.opts.query = decode(_this.opts.query);
			}

			if (withEventListeners) {
				if (_this.opts.closeOnBeforeunload) {
					// Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
					// ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
					// closed/reloaded)
					_this._beforeunloadEventListener = function () {
						if (_this.transport) {
							// Silently close the transport
							_this.transport.removeAllListeners();
							_this.transport.close();
						}
					};

					addEventListener('beforeunload', _this._beforeunloadEventListener, false);
				}

				if (_this.hostname !== 'localhost') {
					_this._offlineEventListener = function () {
						_this._onClose('transport close', {
							description: 'network connection lost',
						});
					};

					OFFLINE_EVENT_LISTENERS.push(_this._offlineEventListener);
				}
			}

			if (_this.opts.withCredentials) {
				_this._cookieJar = createCookieJar();
			}

			_this._open();
			return _this;
		}

		/**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
		_inheritsLoose(SocketWithoutUpgrade, _Emitter);
		const _proto = SocketWithoutUpgrade.prototype;
		_proto.createTransport = function createTransport(name) {
			const query = _extends({}, this.opts.query);
			// Append engine.io protocol identifier
			query.EIO = protocol$1;
			// Transport name
			query.transport = name;
			// Session id if we already have one
			if (this.id) {
				query.sid = this.id;
			}

			const options = _extends({}, this.opts, {
				query,
				socket: this,
				hostname: this.hostname,
				secure: this.secure,
				port: this.port,
			}, this.opts.transportOptions[name]);
			return new this._transportsByName[name](options);
		}
		/**
     * Initializes transport to use and starts probe.
     *
     * @private
     */;

		_proto._open = function _open() {
			const _this2 = this;
			if (this.transports.length === 0) {
				// Emit error on next tick so it can be listened to
				this.setTimeoutFn(() => {
					_this2.emitReserved('error', 'No transports available');
				}, 0);
				return;
			}

			const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.includes('websocket') ? 'websocket' : this.transports[0];
			this.readyState = 'opening';
			const transport = this.createTransport(transportName);
			transport.open();
			this.setTransport(transport);
		}
		/**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */;

		_proto.setTransport = function setTransport(transport) {
			const _this3 = this;
			if (this.transport) {
				this.transport.removeAllListeners();
			}

			// Set up transport
			this.transport = transport;
			// Set up transport listeners
			transport.on('drain', this._onDrain.bind(this)).on('packet', this._onPacket.bind(this)).on('error', this._onError.bind(this)).on('close', reason => _this3._onClose('transport close', reason));
		}
		/**
     * Called when connection is deemed open.
     *
     * @private
     */;

		_proto.onOpen = function onOpen() {
			this.readyState = 'open';
			SocketWithoutUpgrade.priorWebsocketSuccess = this.transport.name === 'websocket';
			this.emitReserved('open');
			this.flush();
		}
		/**
     * Handles a packet.
     *
     * @private
     */;

		_proto._onPacket = function _onPacket(packet) {
			if (this.readyState === 'opening' || this.readyState === 'open' || this.readyState === 'closing') {
				this.emitReserved('packet', packet);
				// Socket is live - any packet counts
				this.emitReserved('heartbeat');
				switch (packet.type) {
					case 'open': {
						this.onHandshake(JSON.parse(packet.data));
						break;
					}

					case 'ping': {
						this._sendPacket('pong');
						this.emitReserved('ping');
						this.emitReserved('pong');
						this._resetPingTimeout();
						break;
					}

					case 'error': {
						const error = new Error('server error');
						// @ts-ignore
						error.code = packet.data;
						this._onError(error);
						break;
					}

					case 'message': {
						this.emitReserved('data', packet.data);
						this.emitReserved('message', packet.data);
						break;
					}
				}
			}
		}
		/**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */;

		_proto.onHandshake = function onHandshake(data) {
			this.emitReserved('handshake', data);
			this.id = data.sid;
			this.transport.query.sid = data.sid;
			this._pingInterval = data.pingInterval;
			this._pingTimeout = data.pingTimeout;
			this._maxPayload = data.maxPayload;
			this.onOpen();
			// In case open handler closes socket
			if (this.readyState === 'closed') {
				return;
			}

			this._resetPingTimeout();
		}
		/**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */;

		_proto._resetPingTimeout = function _resetPingTimeout() {
			const _this4 = this;
			this.clearTimeoutFn(this._pingTimeoutTimer);
			const delay = this._pingInterval + this._pingTimeout;
			this._pingTimeoutTime = Date.now() + delay;
			this._pingTimeoutTimer = this.setTimeoutFn(() => {
				_this4._onClose('ping timeout');
			}, delay);
			if (this.opts.autoUnref) {
				this._pingTimeoutTimer.unref();
			}
		}
		/**
     * Called on `drain` event
     *
     * @private
     */;

		_proto._onDrain = function _onDrain() {
			this.writeBuffer.splice(0, this._prevBufferLen);
			// Setting prevBufferLen = 0 is very important
			// for example, when upgrading, upgrade packet is sent over,
			// and a nonzero prevBufferLen could cause problems on `drain`
			this._prevBufferLen = 0;
			if (this.writeBuffer.length === 0) {
				this.emitReserved('drain');
			} else {
				this.flush();
			}
		}
		/**
     * Flush write buffers.
     *
     * @private
     */;

		_proto.flush = function flush() {
			if (this.readyState !== 'closed' && this.transport.writable && !this.upgrading && this.writeBuffer.length > 0) {
				const packets = this._getWritablePackets();
				this.transport.send(packets);
				// Keep track of current length of writeBuffer
				// splice writeBuffer and callbackBuffer on `drain`
				this._prevBufferLen = packets.length;
				this.emitReserved('flush');
			}
		}
		/**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */;

		_proto._getWritablePackets = function _getWritablePackets() {
			const shouldCheckPayloadSize = this._maxPayload && this.transport.name === 'polling' && this.writeBuffer.length > 1;
			if (!shouldCheckPayloadSize) {
				return this.writeBuffer;
			}

			let payloadSize = 1; // First packet type
			for (let i = 0; i < this.writeBuffer.length; i++) {
				const data = this.writeBuffer[i].data;
				if (data) {
					payloadSize += byteLength(data);
				}

				if (i > 0 && payloadSize > this._maxPayload) {
					return this.writeBuffer.slice(0, i);
				}

				payloadSize += 2; // Separator + packet type
			}

			return this.writeBuffer;
		}
		/**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */
		/* private */;

		_proto._hasPingExpired = function _hasPingExpired() {
			const _this5 = this;
			if (!this._pingTimeoutTime) {
				return true;
			}

			const hasExpired = Date.now() > this._pingTimeoutTime;
			if (hasExpired) {
				this._pingTimeoutTime = 0;
				nextTick(() => {
					_this5._onClose('ping timeout');
				}, this.setTimeoutFn);
			}

			return hasExpired;
		}
		/**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */;

		_proto.write = function write(message, options, function_) {
			this._sendPacket('message', message, options, function_);
			return this;
		}
		/**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */;

		_proto.send = function send(message, options, function_) {
			this._sendPacket('message', message, options, function_);
			return this;
		}
		/**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */;

		_proto._sendPacket = function _sendPacket(type, data, options, function_) {
			if (typeof data === 'function') {
				function_ = data;
				data = undefined;
			}

			if (typeof options === 'function') {
				function_ = options;
				options = null;
			}

			if (this.readyState === 'closing' || this.readyState === 'closed') {
				return;
			}

			options ||= {};
			options.compress = options.compress !== false;
			const packet = {
				type,
				data,
				options,
			};
			this.emitReserved('packetCreate', packet);
			this.writeBuffer.push(packet);
			if (function_) {
				this.once('flush', function_);
			}

			this.flush();
		}
		/**
     * Closes the connection.
     */;

		_proto.close = function close() {
			const _this6 = this;
			const close = function close() {
				_this6._onClose('forced close');
				_this6.transport.close();
			};

			const cleanupAndClose = function cleanupAndClose() {
				_this6.off('upgrade', cleanupAndClose);
				_this6.off('upgradeError', cleanupAndClose);
				close();
			};

			const waitForUpgrade = function waitForUpgrade() {
				// Wait for upgrade to finish since we can't send packets while pausing a transport
				_this6.once('upgrade', cleanupAndClose);
				_this6.once('upgradeError', cleanupAndClose);
			};

			if (this.readyState === 'opening' || this.readyState === 'open') {
				this.readyState = 'closing';
				if (this.writeBuffer.length > 0) {
					this.once('drain', () => {
						if (_this6.upgrading) {
							waitForUpgrade();
						} else {
							close();
						}
					});
				} else if (this.upgrading) {
					waitForUpgrade();
				} else {
					close();
				}
			}

			return this;
		}
		/**
     * Called upon transport error
     *
     * @private
     */;

		_proto._onError = function _onError(error) {
			SocketWithoutUpgrade.priorWebsocketSuccess = false;
			if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === 'opening') {
				this.transports.shift();
				return this._open();
			}

			this.emitReserved('error', error);
			this._onClose('transport error', error);
		}
		/**
     * Called upon transport close.
     *
     * @private
     */;

		_proto._onClose = function _onClose(reason, description) {
			if (this.readyState === 'opening' || this.readyState === 'open' || this.readyState === 'closing') {
				// Clear timers
				this.clearTimeoutFn(this._pingTimeoutTimer);
				// Stop event from firing again for transport
				this.transport.removeAllListeners('close');
				// Ensure transport won't stay open
				this.transport.close();
				// ignore further transport communication
				this.transport.removeAllListeners();
				if (withEventListeners) {
					if (this._beforeunloadEventListener) {
						removeEventListener('beforeunload', this._beforeunloadEventListener, false);
					}

					if (this._offlineEventListener) {
						const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
						if (i !== -1) {
							OFFLINE_EVENT_LISTENERS.splice(i, 1);
						}
					}
				}

				// Set ready state
				this.readyState = 'closed';
				// Clear session id
				this.id = null;
				// Emit close event
				this.emitReserved('close', reason, description);
				// Clean buffers after, so users can still
				// grab the buffers on `close` event
				this.writeBuffer = [];
				this._prevBufferLen = 0;
			}
		};

		return SocketWithoutUpgrade;
	})(Emitter);
	SocketWithoutUpgrade.protocol = protocol$1;
	/**
   * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
   * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
   *
   * This class comes with an upgrade mechanism, which means that once the connection is established with the first
   * low-level transport, it will try to upgrade to a better transport.
   *
   * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
   *
   * @example
   * import { SocketWithUpgrade, WebSocket } from "engine.io-client";
   *
   * const socket = new SocketWithUpgrade({
   *   transports: [WebSocket]
   * });
   *
   * socket.on("open", () => {
   *   socket.send("hello");
   * });
   *
   * @see SocketWithoutUpgrade
   * @see Socket
   */
	const SocketWithUpgrade = /* #__PURE__ */(function (_SocketWithoutUpgrade) {
		function SocketWithUpgrade() {
			let _this7;
			_this7 = Reflect.apply(_SocketWithoutUpgrade, this, arguments) || this;
			_this7._upgrades = [];
			return _this7;
		}

		_inheritsLoose(SocketWithUpgrade, _SocketWithoutUpgrade);
		const _proto2 = SocketWithUpgrade.prototype;
		_proto2.onOpen = function onOpen() {
			_SocketWithoutUpgrade.prototype.onOpen.call(this);
			if (this.readyState === 'open' && this.opts.upgrade) {
				for (let i = 0; i < this._upgrades.length; i++) {
					this._probe(this._upgrades[i]);
				}
			}
		}
		/**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */;

		_proto2._probe = function _probe(name) {
			const _this8 = this;
			let transport = this.createTransport(name);
			let failed = false;
			SocketWithoutUpgrade.priorWebsocketSuccess = false;
			const onTransportOpen = function onTransportOpen() {
				if (failed) {
					return;
				}

				transport.send([{
					type: 'ping',
					data: 'probe',
				}]);
				transport.once('packet', message => {
					if (failed) {
						return;
					}

					if (message.type === 'pong' && message.data === 'probe') {
						_this8.upgrading = true;
						_this8.emitReserved('upgrading', transport);
						if (!transport) {
							return;
						}

						SocketWithoutUpgrade.priorWebsocketSuccess = transport.name === 'websocket';
						_this8.transport.pause(() => {
							if (failed) {
								return;
							}

							if (_this8.readyState === 'closed') {
								return;
							}

							cleanup();
							_this8.setTransport(transport);
							transport.send([{
								type: 'upgrade',
							}]);
							_this8.emitReserved('upgrade', transport);
							transport = null;
							_this8.upgrading = false;
							_this8.flush();
						});
					} else {
						const error = new Error('probe error');
						// @ts-ignore
						error.transport = transport.name;
						_this8.emitReserved('upgradeError', error);
					}
				});
			};

			function freezeTransport() {
				if (failed) {
					return;
				}

				// Any callback called by transport should be ignored since now
				failed = true;
				cleanup();
				transport.close();
				transport = null;
			}

			// Handle any error that happens while probing
			const onerror = function onerror(error_) {
				const error = new Error('probe error: ' + error_);
				// @ts-ignore
				error.transport = transport.name;
				freezeTransport();
				_this8.emitReserved('upgradeError', error);
			};

			function onTransportClose() {
				onerror('transport closed');
			}

			// When the socket is closed while we're probing
			function onclose() {
				onerror('socket closed');
			}

			// When the socket is upgraded while we're probing
			function onupgrade(to) {
				if (transport && to.name !== transport.name) {
					freezeTransport();
				}
			}

			// Remove all listeners on the transport and on self
			var cleanup = function cleanup() {
				transport.removeListener('open', onTransportOpen);
				transport.removeListener('error', onerror);
				transport.removeListener('close', onTransportClose);
				_this8.off('close', onclose);
				_this8.off('upgrading', onupgrade);
			};

			transport.once('open', onTransportOpen);
			transport.once('error', onerror);
			transport.once('close', onTransportClose);
			this.once('close', onclose);
			this.once('upgrading', onupgrade);
			if (this._upgrades.includes('webtransport') && name !== 'webtransport') {
				// Favor WebTransport
				this.setTimeoutFn(() => {
					if (!failed) {
						transport.open();
					}
				}, 200);
			} else {
				transport.open();
			}
		};

		_proto2.onHandshake = function onHandshake(data) {
			this._upgrades = this._filterUpgrades(data.upgrades);
			_SocketWithoutUpgrade.prototype.onHandshake.call(this, data);
		}
		/**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */;

		_proto2._filterUpgrades = function _filterUpgrades(upgrades) {
			const filteredUpgrades = [];
			for (const upgrade of upgrades) {
				if (~this.transports.indexOf(upgrade)) {
					filteredUpgrades.push(upgrade);
				}
			}

			return filteredUpgrades;
		};

		return SocketWithUpgrade;
	})(SocketWithoutUpgrade);
	/**
   * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
   * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
   *
   * This class comes with an upgrade mechanism, which means that once the connection is established with the first
   * low-level transport, it will try to upgrade to a better transport.
   *
   * @example
   * import { Socket } from "engine.io-client";
   *
   * const socket = new Socket();
   *
   * socket.on("open", () => {
   *   socket.send("hello");
   * });
   *
   * @see SocketWithoutUpgrade
   * @see SocketWithUpgrade
   */
	const Socket$1 = /* #__PURE__ */(function (_SocketWithUpgrade) {
		function Socket(uri) {
			const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			const o = _typeof(uri) === 'object' ? uri : options;
			if (!o.transports || o.transports && typeof o.transports[0] === 'string') {
				o.transports = (o.transports || ['polling', 'websocket', 'webtransport']).map(transportName => transports[transportName]).filter(Boolean);
			}

			return _SocketWithUpgrade.call(this, uri, o) || this;
		}

		_inheritsLoose(Socket, _SocketWithUpgrade);
		return Socket;
	})(SocketWithUpgrade);

	Socket$1.protocol;

	function getDefaultExportFromCjs(x) {
  	return x && x.__esModule && Object.hasOwn(x, 'default') ? x.default : x;
	}

	const browser = {exports: {}};

	let ms;
	let hasRequiredMs;
	function requireMs() {
		if (hasRequiredMs) {
			return ms;
		}

		hasRequiredMs = 1;
		const s = 1000;
		const m = s * 60;
		const h = m * 60;
		const d = h * 24;
		const w = d * 7;
		const y = d * 365.25;

		/**
     * Parse or format the given `val`.
     *
     * Options:
     *
     *  - `long` verbose formatting [false]
     *
     * @param {String|Number} val
     * @param {Object} [options]
     * @throws {Error} throw an error if val is not a non-empty string or a number
     * @return {String|Number}
     * @api public
     */

		ms = function ms(value_, options) {
			options ||= {};
			const type = _typeof(value_);
			if (type === 'string' && value_.length > 0) {
				return parse(value_);
			}

			if (type === 'number' && isFinite(value_)) {
				return options.long ? fmtLong(value_) : fmtShort(value_);
			}

			throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(value_));
		};

		/**
     * Parse the given `str` and return milliseconds.
     *
     * @param {String} str
     * @return {Number}
     * @api private
     */

		function parse(string_) {
			string_ = String(string_);
			if (string_.length > 100) {
				return;
			}

			const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(string_);
			if (!match) {
				return;
			}

			const n = Number.parseFloat(match[1]);
			const type = (match[2] || 'ms').toLowerCase();
			switch (type) {
				case 'years':
				case 'year':
				case 'yrs':
				case 'yr':
				case 'y': {
					return n * y;
				}

				case 'weeks':
				case 'week':
				case 'w': {
					return n * w;
				}

				case 'days':
				case 'day':
				case 'd': {
					return n * d;
				}

				case 'hours':
				case 'hour':
				case 'hrs':
				case 'hr':
				case 'h': {
					return n * h;
				}

				case 'minutes':
				case 'minute':
				case 'mins':
				case 'min':
				case 'm': {
					return n * m;
				}

				case 'seconds':
				case 'second':
				case 'secs':
				case 'sec':
				case 's': {
					return n * s;
				}

				case 'milliseconds':
				case 'millisecond':
				case 'msecs':
				case 'msec':
				case 'ms': {
					return n;
				}

				default: {
					return undefined;
				}
			}
		}

		/**
     * Short format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */

		function fmtShort(ms) {
			const msAbs = Math.abs(ms);
			if (msAbs >= d) {
				return Math.round(ms / d) + 'd';
			}

			if (msAbs >= h) {
				return Math.round(ms / h) + 'h';
			}

			if (msAbs >= m) {
				return Math.round(ms / m) + 'm';
			}

			if (msAbs >= s) {
				return Math.round(ms / s) + 's';
			}

			return ms + 'ms';
		}

		/**
     * Long format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */

		function fmtLong(ms) {
			const msAbs = Math.abs(ms);
			if (msAbs >= d) {
				return plural(ms, msAbs, d, 'day');
			}

			if (msAbs >= h) {
				return plural(ms, msAbs, h, 'hour');
			}

			if (msAbs >= m) {
				return plural(ms, msAbs, m, 'minute');
			}

			if (msAbs >= s) {
				return plural(ms, msAbs, s, 'second');
			}

			return ms + ' ms';
		}

		/**
     * Pluralization helper.
     */

		function plural(ms, msAbs, n, name) {
			const isPlural = msAbs >= n * 1.5;
			return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
		}

		return ms;
	}

	/**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;
		for (const key of Object.keys(env)) {
			createDebug[key] = env[key];
		}

		/**
    * The currently active debug mode names, and names to skip.
    */

		createDebug.names = [];
		createDebug.skips = [];

		/**
    * Map of special "%n" handling functions, for the debug "format" argument.
    *
    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    */
		createDebug.formatters = {};

		/**
    * Selects a color for a debug namespace
    * @param {String} namespace The namespace string for the debug instance to be colored
    * @return {Number|String} An ANSI color code for the given namespace
    * @api private
    */
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash = Math.trunc(hash); // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}

		createDebug.selectColor = selectColor;

		/**
    * Create a debugger with the given `namespace`.
    *
    * @param {String} namespace
    * @return {Function}
    * @api public
    */
		function createDebug(namespace) {
			let previousTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug() {
				for (var _length = arguments.length, arguments_ = new Array(_length), _key = 0; _key < _length; _key++) {
					arguments_[_key] = arguments[_key];
				}

				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const current = Date.now();
				const ms = current - (previousTime || current);
				self.diff = ms;
				self.prev = previousTime;
				self.curr = current;
				previousTime = current;
				arguments_[0] = createDebug.coerce(arguments_[0]);
				if (typeof arguments_[0] !== 'string') {
					// Anything else let's inspect with %O
					arguments_.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				arguments_[0] = arguments_[0].replaceAll(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}

					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const value_ = arguments_[index];
						match = formatter.call(self, value_);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						arguments_.splice(index, 1);
						index--;
					}

					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, arguments_);
				const logFunction = self.log || createDebug.log;
				logFunction.apply(self, arguments_);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: function get() {
					if (enableOverride !== null) {
						return enableOverride;
					}

					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: function set(v) {
					enableOverride = v;
				},
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (delimiter === undefined ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
    * Enables a debug mode by namespaces. This can include modes
    * separated by a colon and wildcards.
    *
    * @param {String} namespaces
    * @api public
    */
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			let i;
			const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
			const length_ = split.length;
			for (i = 0; i < length_; i++) {
				if (!split[i]) {
					// ignore empty strings
					continue;
				}

				namespaces = split[i].replaceAll('*', '.*?');
				if (namespaces[0] === '-') {
					createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
				} else {
					createDebug.names.push(new RegExp('^' + namespaces + '$'));
				}
			}
		}

		/**
    * Disable debug output.
    *
    * @return {String} namespaces
    * @api public
    */
		function disable() {
			const namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(namespace => '-' + namespace))).join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
    * Returns true if the given mode name is enabled, false otherwise.
    *
    * @param {String} name
    * @return {Boolean}
    * @api public
    */
		function enabled(name) {
			if (name.at(-1) === '*') {
				return true;
			}

			let i;
			let length_;
			for (i = 0, length_ = createDebug.skips.length; i < length_; i++) {
				if (createDebug.skips[i].test(name)) {
					return false;
				}
			}

			for (i = 0, length_ = createDebug.names.length; i < length_; i++) {
				if (createDebug.names[i].test(name)) {
					return true;
				}
			}

			return false;
		}

		/**
    * Convert regexp to namespace
    *
    * @param {RegExp} regxep
    * @return {String} namespace
    * @api private
    */
		function toNamespace(regexp) {
			return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
		}

		/**
    * Coerce `val`.
    *
    * @param {Mixed} val
    * @return {Mixed}
    * @api private
    */
		function coerce(value_) {
			if (value_ instanceof Error) {
				return value_.stack || value_.message;
			}

			return value_;
		}

		/**
    * XXX DO NOT USE. This is a temporary stub function.
    * XXX It WILL be removed in the next major release.
    */
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());
		return createDebug;
	}

	const common = setup;

	/* eslint-env browser */
	browser.exports;
	(function (module, exports) {
		/**
     * This is the web browser implementation of `debug()`.
     */

		exports.formatArgs = formatArguments;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (function () {
			let warned = false;
			return function () {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
     * Colors.
     */

		exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

		/**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof globalThis !== 'undefined' && globalThis.process && (globalThis.process.type === 'renderer' || globalThis.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && /(edge|trident)\/(\d+)/.test(navigator.userAgent.toLowerCase())) {
				return false;
			}

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance
      // Is firebug? http://stackoverflow.com/a/398120/376773
      || typeof globalThis !== 'undefined' && globalThis.console && (globalThis.console.firebug || globalThis.console.exception && globalThis.console.table)
      // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && Number.parseInt(RegExp.$1, 10) >= 31
      // Double check webkit in userAgent just in case we are in a worker
      || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
		}

		/**
     * Colorize log arguments if enabled.
     *
     * @api public
     */

		function formatArguments(arguments_) {
			arguments_[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + arguments_[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			arguments_.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			arguments_[0].replaceAll(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}

				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});
			arguments_.splice(lastC, 0, c);
		}

		/**
     * Invokes `console.debug()` when available.
     * No-op when `console.debug` is not a "function".
     * If `console.debug` is not available, falls back
     * to `console.log`.
     *
     * @api public
     */
		exports.log = console.debug || console.log || function () {};

		/**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug');
			} catch {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = common(exports);
		const formatters = module.exports.formatters;

		/**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		};
	})(browser, browser.exports);

	const browserExports = browser.exports;
	const debugModule = /* @__PURE__ */getDefaultExportFromCjs(browserExports);

	const debug$3 = debugModule('socket.io-client:url'); // Debug()
	/**
   * URL parser.
   *
   * @param uri - url
   * @param path - the request path of the connection
   * @param loc - An object meant to mimic window.location.
   *        Defaults to window.location.
   * @public
   */
	function url(uri) {
		const path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		let loc = arguments.length > 2 ? arguments[2] : undefined;
		let object = uri;
		// Default to window.location
		loc ||= typeof location !== 'undefined' && location;
		uri ??= loc.protocol + '//' + loc.host;
		// Relative path support
		if (typeof uri === 'string') {
			if (uri.charAt(0) === '/') {
				uri = uri.charAt(1) === '/' ? loc.protocol + uri : loc.host + uri;
			}

			if (!/^(https?|wss?):\/\//.test(uri)) {
				debug$3('protocol-less url %s', uri);
				uri = loc === undefined ? 'https://' + uri : loc.protocol + '//' + uri;
			}

			// Parse
			debug$3('parse %s', uri);
			object = parse(uri);
		}

		// Make sure we treat `localhost:80` and `localhost` equally
		if (!object.port) {
			if (/^(http|ws)$/.test(object.protocol)) {
				object.port = '80';
			} else if (/^(http|ws)s$/.test(object.protocol)) {
				object.port = '443';
			}
		}

		object.path = object.path || '/';
		const ipv6 = object.host.includes(':');
		const host = ipv6 ? '[' + object.host + ']' : object.host;
		// Define unique id
		object.id = object.protocol + '://' + host + ':' + object.port + path;
		// Define href
		object.href = object.protocol + '://' + host + (loc && loc.port === object.port ? '' : ':' + object.port);
		return object;
	}

	const withNativeArrayBuffer = typeof ArrayBuffer === 'function';
	const isView = function isView(object) {
		return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(object) : object.buffer instanceof ArrayBuffer;
	};

	const toString = Object.prototype.toString;
	const withNativeBlob = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
	const withNativeFile = typeof File === 'function' || typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';
	/**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */
	function isBinary(object) {
		return withNativeArrayBuffer && (object instanceof ArrayBuffer || isView(object)) || withNativeBlob && object instanceof Blob || withNativeFile && object instanceof File;
	}

	function hasBinary(object, toJSON) {
		if (!object || _typeof(object) !== 'object') {
			return false;
		}

		if (Array.isArray(object)) {
			for (let i = 0, l = object.length; i < l; i++) {
				if (hasBinary(object[i])) {
					return true;
				}
			}

			return false;
		}

		if (isBinary(object)) {
			return true;
		}

		if (object.toJSON && typeof object.toJSON === 'function' && arguments.length === 1) {
			return hasBinary(object.toJSON(), true);
		}

		for (const key in object) {
			if (Object.hasOwn(object, key) && hasBinary(object[key])) {
				return true;
			}
		}

		return false;
	}

	/**
   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @public
   */
	function deconstructPacket(packet) {
		const buffers = [];
		const packetData = packet.data;
		const pack = packet;
		pack.data = _deconstructPacket(packetData, buffers);
		pack.attachments = buffers.length; // Number of binary 'attachments'
		return {
			packet: pack,
			buffers,
		};
	}

	function _deconstructPacket(data, buffers) {
		if (!data) {
			return data;
		}

		if (isBinary(data)) {
			const placeholder = {
				_placeholder: true,
				num: buffers.length,
			};
			buffers.push(data);
			return placeholder;
		}

		if (Array.isArray(data)) {
			const newData = Array.from({length: data.length});
			for (const [i, datum] of data.entries()) {
				newData[i] = _deconstructPacket(datum, buffers);
			}

			return newData;
		}

		if (_typeof(data) === 'object' && !(data instanceof Date)) {
			const _newData = {};
			for (const key in data) {
				if (Object.hasOwn(data, key)) {
					_newData[key] = _deconstructPacket(data[key], buffers);
				}
			}

			return _newData;
		}

		return data;
	}

	/**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @public
   */
	function reconstructPacket(packet, buffers) {
		packet.data = _reconstructPacket(packet.data, buffers);
		delete packet.attachments; // No longer useful
		return packet;
	}

	function _reconstructPacket(data, buffers) {
		if (!data) {
			return data;
		}

		if (data && data._placeholder === true) {
			const isIndexValid = typeof data.num === 'number' && data.num >= 0 && data.num < buffers.length;
			if (isIndexValid) {
				return buffers[data.num]; // Appropriate buffer (should be natural order anyway)
			}

			throw new Error('illegal attachments');
		} else if (Array.isArray(data)) {
			for (let i = 0; i < data.length; i++) {
				data[i] = _reconstructPacket(data[i], buffers);
			}
		} else if (_typeof(data) === 'object') {
			for (const key in data) {
				if (Object.hasOwn(data, key)) {
					data[key] = _reconstructPacket(data[key], buffers);
				}
			}
		}

		return data;
	}

	/**
   * These strings must not be used as event names, as they have a special meaning.
   */
	const RESERVED_EVENTS$1 = new Set(['connect',
		// Used on the client side
		'connect_error',
		// Used on the client side
		'disconnect',
		// Used on both sides
		'disconnecting',
		// Used on the server side
		'newListener',
		// Used by the Node.js EventEmitter
		'removeListener', // Used by the Node.js EventEmitter
	]);
	/**
   * Protocol version.
   *
   * @public
   */
	const protocol = 5;
	let PacketType;
	(function (PacketType) {
		PacketType[PacketType.CONNECT = 0] = 'CONNECT';
		PacketType[PacketType.DISCONNECT = 1] = 'DISCONNECT';
		PacketType[PacketType.EVENT = 2] = 'EVENT';
		PacketType[PacketType.ACK = 3] = 'ACK';
		PacketType[PacketType.CONNECT_ERROR = 4] = 'CONNECT_ERROR';
		PacketType[PacketType.BINARY_EVENT = 5] = 'BINARY_EVENT';
		PacketType[PacketType.BINARY_ACK = 6] = 'BINARY_ACK';
	})(PacketType ||= {});

	/**
   * A socket.io Encoder instance
   */
	const Encoder = /* #__PURE__ */(function () {
		/**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
		function Encoder(replacer) {
			this.replacer = replacer;
		}

		/**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
		const _proto = Encoder.prototype;
		_proto.encode = function encode(object) {
			if ((object.type === PacketType.EVENT || object.type === PacketType.ACK) && hasBinary(object)) {
				return this.encodeAsBinary({
					type: object.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
					nsp: object.nsp,
					data: object.data,
					id: object.id,
				});
			}

			return [this.encodeAsString(object)];
		}
		/**
     * Encode packet as string.
     */;

		_proto.encodeAsString = function encodeAsString(object) {
			// First is type
			let string_ = String(object.type);
			// Attachments if we have them
			if (object.type === PacketType.BINARY_EVENT || object.type === PacketType.BINARY_ACK) {
				string_ += object.attachments + '-';
			}

			// If we have a namespace other than `/`
			// we append it followed by a comma `,`
			if (object.nsp && object.nsp !== '/') {
				string_ += object.nsp + ',';
			}

			// Immediately followed by the id
			if (object.id != null) {
				string_ += object.id;
			}

			// Json data
			if (object.data != null) {
				string_ += JSON.stringify(object.data, this.replacer);
			}

			return string_;
		}
		/**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */;

		_proto.encodeAsBinary = function encodeAsBinary(object) {
			const deconstruction = deconstructPacket(object);
			const pack = this.encodeAsString(deconstruction.packet);
			const buffers = deconstruction.buffers;
			buffers.unshift(pack); // Add packet info to beginning of data list
			return buffers; // Write all the buffers
		};

		return Encoder;
	})();
	/**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   */
	const Decoder = /* #__PURE__ */(function (_Emitter) {
		/**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
		function Decoder(reviver) {
			let _this;
			_this = _Emitter.call(this) || this;
			_this.reviver = reviver;
			return _this;
		}

		/**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
		_inheritsLoose(Decoder, _Emitter);
		const _proto2 = Decoder.prototype;
		_proto2.add = function add(object) {
			let packet;
			if (typeof object === 'string') {
				if (this.reconstructor) {
					throw new Error('got plaintext data when reconstructing a packet');
				}

				packet = this.decodeString(object);
				const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
				if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
					packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
					// Binary packet's json
					this.reconstructor = new BinaryReconstructor(packet);
					// No attachments, labeled binary but no binary data to follow
					if (packet.attachments === 0) {
						_Emitter.prototype.emitReserved.call(this, 'decoded', packet);
					}
				} else {
					// Non-binary full packet
					_Emitter.prototype.emitReserved.call(this, 'decoded', packet);
				}
			} else if (isBinary(object) || object.base64) {
				// Raw binary data
				if (this.reconstructor) {
					packet = this.reconstructor.takeBinaryData(object);
					if (packet) {
						// Received final buffer
						this.reconstructor = null;
						_Emitter.prototype.emitReserved.call(this, 'decoded', packet);
					}
				} else {
					throw new Error('got binary data when not reconstructing a packet');
				}
			} else {
				throw new Error('Unknown type: ' + object);
			}
		}
		/**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */;

		_proto2.decodeString = function decodeString(string_) {
			let i = 0;
			// Look up type
			const p = {
				type: Number(string_.charAt(0)),
			};
			if (PacketType[p.type] === undefined) {
				throw new Error('unknown packet type ' + p.type);
			}

			// Look up attachments if type binary
			if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
				const start = i + 1;
				while (string_.charAt(++i) !== '-' && i != string_.length) {}
				const buf = string_.substring(start, i);
				if (buf != Number(buf) || string_.charAt(i) !== '-') {
					throw new Error('Illegal attachments');
				}

				p.attachments = Number(buf);
			}

			// Look up namespace (if any)
			if (string_.charAt(i + 1) === '/') {
				const _start = i + 1;
				while (++i) {
					const c = string_.charAt(i);
					if (c === ',') {
						break;
					}

					if (i === string_.length) {
						break;
					}
				}

				p.nsp = string_.substring(_start, i);
			} else {
				p.nsp = '/';
			}

			// Look up id
			const next = string_.charAt(i + 1);
			if (next !== '' && Number(next) == next) {
				const _start2 = i + 1;
				while (++i) {
					const _c = string_.charAt(i);
					if (_c == null || Number(_c) != _c) {
						--i;
						break;
					}

					if (i === string_.length) {
						break;
					}
				}

				p.id = Number(string_.substring(_start2, i + 1));
			}

			// Look up json data
			if (string_.charAt(++i)) {
				const payload = this.tryParse(string_.slice(i));
				if (Decoder.isPayloadValid(p.type, payload)) {
					p.data = payload;
				} else {
					throw new Error('invalid payload');
				}
			}

			return p;
		};

		_proto2.tryParse = function tryParse(string_) {
			try {
				return JSON.parse(string_, this.reviver);
			} catch {
				return false;
			}
		};

		Decoder.isPayloadValid = function isPayloadValid(type, payload) {
			switch (type) {
				case PacketType.CONNECT: {
					return isObject(payload);
				}

				case PacketType.DISCONNECT: {
					return payload === undefined;
				}

				case PacketType.CONNECT_ERROR: {
					return typeof payload === 'string' || isObject(payload);
				}

				case PacketType.EVENT:
				case PacketType.BINARY_EVENT: {
					return Array.isArray(payload) && (typeof payload[0] === 'number' || typeof payload[0] === 'string' && !RESERVED_EVENTS$1.has(payload[0]));
				}

				case PacketType.ACK:
				case PacketType.BINARY_ACK: {
					return Array.isArray(payload);
				}
			}
		}
		/**
     * Deallocates a parser's resources
     */;

		_proto2.destroy = function destroy() {
			if (this.reconstructor) {
				this.reconstructor.finishedReconstruction();
				this.reconstructor = null;
			}
		};

		return Decoder;
	})(Emitter);
	/**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   */
	var BinaryReconstructor = /* #__PURE__ */(function () {
		function BinaryReconstructor(packet) {
			this.packet = packet;
			this.buffers = [];
			this.reconPack = packet;
		}

		/**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
		const _proto3 = BinaryReconstructor.prototype;
		_proto3.takeBinaryData = function takeBinaryData(binaryData) {
			this.buffers.push(binaryData);
			if (this.buffers.length === this.reconPack.attachments) {
				// Done with buffer list
				const packet = reconstructPacket(this.reconPack, this.buffers);
				this.finishedReconstruction();
				return packet;
			}

			return null;
		}
		/**
     * Cleans up binary packet reconstruction variables.
     */;

		_proto3.finishedReconstruction = function finishedReconstruction() {
			this.reconPack = null;
			this.buffers = [];
		};

		return BinaryReconstructor;
	})();
	function isNamespaceValid(nsp) {
		return typeof nsp === 'string';
	}

	// See https://caniuse.com/mdn-javascript_builtins_number_isinteger
	const isInteger = Number.isInteger || function (value) {
		return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	};

	function isAckIdValid(id) {
		return id === undefined || isInteger(id);
	}

	// See https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
	function isObject(value) {
		return Object.prototype.toString.call(value) === '[object Object]';
	}

	function isDataValid(type, payload) {
		switch (type) {
			case PacketType.CONNECT: {
				return payload === undefined || isObject(payload);
			}

			case PacketType.DISCONNECT: {
				return payload === undefined;
			}

			case PacketType.EVENT: {
				return Array.isArray(payload) && (typeof payload[0] === 'number' || typeof payload[0] === 'string' && !RESERVED_EVENTS$1.has(payload[0]));
			}

			case PacketType.ACK: {
				return Array.isArray(payload);
			}

			case PacketType.CONNECT_ERROR: {
				return typeof payload === 'string' || isObject(payload);
			}

			default: {
				return false;
			}
		}
	}

	function isPacketValid(packet) {
		return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
	}

	const parser = /* #__PURE__ */Object.freeze({
		__proto__: null,
		protocol,
		get PacketType() {
			return PacketType;
		},
		Encoder,
		Decoder,
		isPacketValid,
	});

	function on(object, event_, function_) {
		object.on(event_, function_);
		return function subDestroy() {
			object.off(event_, function_);
		};
	}

	const debug$2 = debugModule('socket.io-client:socket'); // Debug()
	/**
   * Internal events.
   * These events can't be emitted by the user.
   */
	const RESERVED_EVENTS = Object.freeze({
		connect: 1,
		connect_error: 1,
		disconnect: 1,
		disconnecting: 1,
		// EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
		newListener: 1,
		removeListener: 1,
	});
	/**
   * A Socket is the fundamental class for interacting with the server.
   *
   * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log("connected");
   * });
   *
   * // send an event to the server
   * socket.emit("foo", "bar");
   *
   * socket.on("foobar", () => {
   *   // an event was received from the server
   * });
   *
   * // upon disconnection
   * socket.on("disconnect", (reason) => {
   *   console.log(`disconnected due to ${reason}`);
   * });
   */
	const Socket = /* #__PURE__ */(function (_Emitter) {
		/**
     * `Socket` constructor.
     */
		function Socket(io, nsp, options) {
			let _this;
			_this = _Emitter.call(this) || this;
			/**
       * Whether the socket is currently connected to the server.
       *
       * @example
       * const socket = io();
       *
       * socket.on("connect", () => {
       *   console.log(socket.connected); // true
       * });
       *
       * socket.on("disconnect", () => {
       *   console.log(socket.connected); // false
       * });
       */
			_this.connected = false;
			/**
       * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
       * be transmitted by the server.
       */
			_this.recovered = false;
			/**
       * Buffer for packets received before the CONNECT packet
       */
			_this.receiveBuffer = [];
			/**
       * Buffer for packets that will be sent once the socket is connected
       */
			_this.sendBuffer = [];
			/**
       * The queue of packets to be sent with retry in case of failure.
       *
       * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
       * @private
       */
			_this._queue = [];
			/**
       * A sequence to generate the ID of the {@link QueuedPacket}.
       * @private
       */
			_this._queueSeq = 0;
			_this.ids = 0;
			/**
       * A map containing acknowledgement handlers.
       *
       * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
       *
       * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
       * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
       * - `const value = await socket.emitWithAck("test")`
       *
       * From those that don't:
       *
       * - `socket.emit("test", (value) => { ... });`
       *
       * In the first case, the handlers will be called with an error when:
       *
       * - the timeout is reached
       * - the socket gets disconnected
       *
       * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
       * an acknowledgement from the server.
       *
       * @private
       */
			_this.acks = {};
			_this.flags = {};
			_this.io = io;
			_this.nsp = nsp;
			if (options && options.auth) {
				_this.auth = options.auth;
			}

			_this._opts = _extends({}, options);
			if (_this.io._autoConnect) {
				_this.open();
			}

			return _this;
		}

		/**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
		_inheritsLoose(Socket, _Emitter);
		const _proto = Socket.prototype;
		/**
     * Subscribe to open, close and packet events
     *
     * @private
     */
		_proto.subEvents = function subEvents() {
			if (this.subs) {
				return;
			}

			const io = this.io;
			this.subs = [on(io, 'open', this.onopen.bind(this)), on(io, 'packet', this.onpacket.bind(this)), on(io, 'error', this.onerror.bind(this)), on(io, 'close', this.onclose.bind(this))];
		}
		/**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */;

		/**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
		_proto.connect = function connect() {
			if (this.connected) {
				return this;
			}

			this.subEvents();
			if (!this.io._reconnecting) {
				this.io.open();
			} // Ensure open

			if (this.io._readyState === 'open') {
				this.onopen();
			}

			return this;
		}
		/**
     * Alias for {@link connect()}.
     */;

		_proto.open = function open() {
			return this.connect();
		}
		/**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */;

		_proto.send = function send() {
			for (var _length = arguments.length, arguments_ = new Array(_length), _key = 0; _key < _length; _key++) {
				arguments_[_key] = arguments[_key];
			}

			arguments_.unshift('message');
			this.emit.apply(this, arguments_);
			return this;
		}
		/**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */;

		_proto.emit = function emit(event_) {
			let _a; let _b; let _c;
			if (RESERVED_EVENTS.hasOwnProperty(event_)) {
				throw new Error('"' + event_.toString() + '" is a reserved event name');
			}

			for (var _length2 = arguments.length, arguments_ = Array.from({length: _length2 > 1 ? _length2 - 1 : 0}), _key2 = 1; _key2 < _length2; _key2++) {
				arguments_[_key2 - 1] = arguments[_key2];
			}

			arguments_.unshift(event_);
			if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
				this._addToQueue(arguments_);
				return this;
			}

			const packet = {
				type: PacketType.EVENT,
				data: arguments_,
			};
			packet.options = {};
			packet.options.compress = this.flags.compress !== false;
			// Event ack callback
			if (typeof arguments_.at(-1) === 'function') {
				const id = this.ids++;
				debug$2('emitting packet with ack id %d', id);
				const ack = arguments_.pop();
				this._registerAckCallback(id, ack);
				packet.id = id;
			}

			const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
			const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
			const discardPacket = this.flags.volatile && !isTransportWritable;
			if (discardPacket) {
				debug$2('discard packet as the transport is not currently writable');
			} else if (isConnected) {
				this.notifyOutgoingListeners(packet);
				this.packet(packet);
			} else {
				this.sendBuffer.push(packet);
			}

			this.flags = {};
			return this;
		}
		/**
     * @private
     */;

		_proto._registerAckCallback = function _registerAckCallback(id, ack) {
			const _this2 = this;
			let _a;
			const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
			if (timeout === undefined) {
				this.acks[id] = ack;
				return;
			}

			// @ts-ignore
			const timer = this.io.setTimeoutFn(() => {
				delete _this2.acks[id];
				for (let i = 0; i < _this2.sendBuffer.length; i++) {
					if (_this2.sendBuffer[i].id === id) {
						debug$2('removing packet with ack id %d from the buffer', id);
						_this2.sendBuffer.splice(i, 1);
					}
				}

				debug$2('event with ack id %d has timed out after %d ms', id, timeout);
				ack.call(_this2, new Error('operation has timed out'));
			}, timeout);
			const function_ = function function__() {
				// @ts-ignore
				_this2.io.clearTimeoutFn(timer);
				for (var _length3 = arguments.length, arguments_ = new Array(_length3), _key3 = 0; _key3 < _length3; _key3++) {
					arguments_[_key3] = arguments[_key3];
				}

				ack.apply(_this2, arguments_);
			};

			function_.withError = true;
			this.acks[id] = function_;
		}
		/**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */;

		_proto.emitWithAck = function emitWithAck(event_) {
			const _this3 = this;
			for (var _length4 = arguments.length, arguments_ = Array.from({length: _length4 > 1 ? _length4 - 1 : 0}), _key4 = 1; _key4 < _length4; _key4++) {
				arguments_[_key4 - 1] = arguments[_key4];
			}

			return new Promise((resolve, reject) => {
				const function_ = function function__(argument1, argument2) {
					return argument1 ? reject(argument1) : resolve(argument2);
				};

				function_.withError = true;
				arguments_.push(function_);
				_this3.emit.apply(_this3, [event_].concat(arguments_));
			});
		}
		/**
     * Add the packet to the queue.
     * @param args
     * @private
     */;

		_proto._addToQueue = function _addToQueue(arguments_) {
			const _this4 = this;
			let ack;
			if (typeof arguments_.at(-1) === 'function') {
				ack = arguments_.pop();
			}

			const packet = {
				id: this._queueSeq++,
				tryCount: 0,
				pending: false,
				args: arguments_,
				flags: _extends({
					fromQueue: true,
				}, this.flags),
			};
			arguments_.push(function (error) {
				if (packet !== _this4._queue[0]) {
					// The packet has already been acknowledged
					return;
				}

				const hasError = error !== null;
				if (hasError) {
					if (packet.tryCount > _this4._opts.retries) {
						debug$2('packet [%d] is discarded after %d tries', packet.id, packet.tryCount);
						_this4._queue.shift();
						if (ack) {
							ack(error);
						}
					}
				} else {
					debug$2('packet [%d] was successfully sent', packet.id);
					_this4._queue.shift();
					if (ack) {
						for (var _length5 = arguments.length, responseArguments = Array.from({length: _length5 > 1 ? _length5 - 1 : 0}), _key5 = 1; _key5 < _length5; _key5++) {
							responseArguments[_key5 - 1] = arguments[_key5];
						}

						ack.apply(void 0, [null].concat(responseArguments));
					}
				}

				packet.pending = false;
				return _this4._drainQueue();
			});
			this._queue.push(packet);
			this._drainQueue();
		}
		/**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */;

		_proto._drainQueue = function _drainQueue() {
			const force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			debug$2('draining queue');
			if (!this.connected || this._queue.length === 0) {
				return;
			}

			const packet = this._queue[0];
			if (packet.pending && !force) {
				debug$2('packet [%d] has already been sent and is waiting for an ack', packet.id);
				return;
			}

			packet.pending = true;
			packet.tryCount++;
			debug$2('sending packet [%d] (try n°%d)', packet.id, packet.tryCount);
			this.flags = packet.flags;
			this.emit.apply(this, packet.args);
		}
		/**
     * Sends a packet.
     *
     * @param packet
     * @private
     */;

		_proto.packet = function packet(_packet) {
			_packet.nsp = this.nsp;
			this.io._packet(_packet);
		}
		/**
     * Called upon engine `open`.
     *
     * @private
     */;

		_proto.addEventListener('open', function onopen() {
			const _this5 = this;
			debug$2('transport is open - connecting');
			if (typeof this.auth === 'function') {
				this.auth(data => {
					_this5._sendConnectPacket(data);
				});
			} else {
				this._sendConnectPacket(this.auth);
			}
		})
		/**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */;

		_proto._sendConnectPacket = function _sendConnectPacket(data) {
			this.packet({
				type: PacketType.CONNECT,
				data: this._pid ? _extends({
					pid: this._pid,
					offset: this._lastOffset,
				}, data) : data,
			});
		}
		/**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */;

		_proto.onerror = function onerror(error) {
			if (!this.connected) {
				this.emitReserved('connect_error', error);
			}
		}
		/**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */;

		_proto.addEventListener('close', function onclose(reason, description) {
			debug$2('close (%s)', reason);
			this.connected = false;
			delete this.id;
			this.emitReserved('disconnect', reason, description);
			this._clearAcks();
		})
		/**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */;

		_proto._clearAcks = function _clearAcks() {
			const _this6 = this;
			for (const id of Object.keys(this.acks)) {
				const isBuffered = _this6.sendBuffer.some(packet => String(packet.id) === id);
				if (!isBuffered) {
					// Note: handlers that do not accept an error as first argument are ignored here
					const ack = _this6.acks[id];
					delete _this6.acks[id];
					if (ack.withError) {
						ack.call(_this6, new Error('socket has been disconnected'));
					}
				}
			}
		}
		/**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */;

		_proto.onpacket = function onpacket(packet) {
			const sameNamespace = packet.nsp === this.nsp;
			if (!sameNamespace) {
				return;
			}

			switch (packet.type) {
				case PacketType.CONNECT: {
					if (packet.data && packet.data.sid) {
						this.onconnect(packet.data.sid, packet.data.pid);
					} else {
						this.emitReserved('connect_error', new Error('It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)'));
					}

					break;
				}

				case PacketType.EVENT:
				case PacketType.BINARY_EVENT: {
					this.onevent(packet);
					break;
				}

				case PacketType.ACK:
				case PacketType.BINARY_ACK: {
					this.onack(packet);
					break;
				}

				case PacketType.DISCONNECT: {
					this.ondisconnect();
					break;
				}

				case PacketType.CONNECT_ERROR: {
					this.destroy();
					const error = new Error(packet.data.message);
					// @ts-ignore
					error.data = packet.data.data;
					this.emitReserved('connect_error', error);
					break;
				}
			}
		}
		/**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */;

		_proto.onevent = function onevent(packet) {
			const arguments_ = packet.data || [];
			debug$2('emitting event %j', arguments_);
			if (packet.id != null) {
				debug$2('attaching ack callback to event');
				arguments_.push(this.ack(packet.id));
			}

			if (this.connected) {
				this.emitEvent(arguments_);
			} else {
				this.receiveBuffer.push(Object.freeze(arguments_));
			}
		};

		_proto.emitEvent = function emitEvent(arguments_) {
			if (this._anyListeners && this._anyListeners.length > 0) {
				const listeners = this._anyListeners.slice();
				const _iterator = _createForOfIteratorHelper(listeners);
				let _step;
				try {
					for (_iterator.s(); !(_step = _iterator.n()).done;) {
						const listener = _step.value;
						listener.apply(this, arguments_);
					}
				} catch (error) {
					_iterator.e(error);
				} finally {
					_iterator.f();
				}
			}

			_Emitter.prototype.emit.apply(this, arguments_);
			if (this._pid && arguments_.length > 0 && typeof arguments_.at(-1) === 'string') {
				this._lastOffset = arguments_.at(-1);
			}
		}
		/**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */;

		_proto.ack = function ack(id) {
			const self = this;
			let sent = false;
			return function () {
				// Prevent double callbacks
				if (sent) {
					return;
				}

				sent = true;
				for (var _length6 = arguments.length, arguments_ = new Array(_length6), _key6 = 0; _key6 < _length6; _key6++) {
					arguments_[_key6] = arguments[_key6];
				}

				debug$2('sending ack %j', arguments_);
				self.packet({
					type: PacketType.ACK,
					id,
					data: arguments_,
				});
			};
		}
		/**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */;

		_proto.onack = function onack(packet) {
			const ack = this.acks[packet.id];
			if (typeof ack !== 'function') {
				debug$2('bad ack %s', packet.id);
				return;
			}

			delete this.acks[packet.id];
			debug$2('calling ack %s with %j', packet.id, packet.data);
			// @ts-ignore FIXME ack is incorrectly inferred as 'never'
			if (ack.withError) {
				packet.data.unshift(null);
			}

			// @ts-ignore
			ack.apply(this, packet.data);
		}
		/**
     * Called upon server connect.
     *
     * @private
     */;

		_proto.addEventListener('connect', function onconnect(id, pid) {
			debug$2('socket connected with id %s', id);
			this.id = id;
			this.recovered = pid && this._pid === pid;
			this._pid = pid; // Defined only if connection state recovery is enabled
			this.connected = true;
			this.emitBuffered();
			this.emitReserved('connect');
			this._drainQueue(true);
		})
		/**
     * Emit buffered events (received and emitted).
     *
     * @private
     */;

		_proto.emitBuffered = function emitBuffered() {
			const _this7 = this;
			for (const arguments_ of this.receiveBuffer) {
				 _this7.emitEvent(arguments_); continue;
			}

			this.receiveBuffer = [];
			for (const packet of this.sendBuffer) {
				_this7.notifyOutgoingListeners(packet);
				_this7.packet(packet);
			}

			this.sendBuffer = [];
		}
		/**
     * Called upon server disconnect.
     *
     * @private
     */;

		_proto.ondisconnect = function ondisconnect() {
			debug$2('server disconnect (%s)', this.nsp);
			this.destroy();
			this.onclose('io server disconnect');
		}
		/**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */;

		_proto.destroy = function destroy() {
			if (this.subs) {
				// Clean subscriptions to avoid reconnections
				for (const subDestroy of this.subs) {
					 subDestroy(); continue;
				}

				this.subs = undefined;
			}

			this.io._destroy(this);
		}
		/**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */;

		_proto.disconnect = function disconnect() {
			if (this.connected) {
				debug$2('performing disconnect (%s)', this.nsp);
				this.packet({
					type: PacketType.DISCONNECT,
				});
			}

			// Remove socket from pool
			this.destroy();
			if (this.connected) {
				// Fire events
				this.onclose('io client disconnect');
			}

			return this;
		}
		/**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */;

		_proto.close = function close() {
			return this.disconnect();
		}
		/**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */;

		_proto.compress = function compress(_compress) {
			this.flags.compress = _compress;
			return this;
		}
		/**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */;

		/**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
		_proto.timeout = function timeout(_timeout) {
			this.flags.timeout = _timeout;
			return this;
		}
		/**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */;

		_proto.onAny = function onAny(listener) {
			this._anyListeners = this._anyListeners || [];
			this._anyListeners.push(listener);
			return this;
		}
		/**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */;

		_proto.prependAny = function prependAny(listener) {
			this._anyListeners = this._anyListeners || [];
			this._anyListeners.unshift(listener);
			return this;
		}
		/**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */;

		_proto.offAny = function offAny(listener) {
			if (!this._anyListeners) {
				return this;
			}

			if (listener) {
				const listeners = this._anyListeners;
				for (let i = 0; i < listeners.length; i++) {
					if (listener === listeners[i]) {
						listeners.splice(i, 1);
						return this;
					}
				}
			} else {
				this._anyListeners = [];
			}

			return this;
		}
		/**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */;

		_proto.listenersAny = function listenersAny() {
			return this._anyListeners || [];
		}
		/**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */;

		_proto.onAnyOutgoing = function onAnyOutgoing(listener) {
			this._anyOutgoingListeners = this._anyOutgoingListeners || [];
			this._anyOutgoingListeners.push(listener);
			return this;
		}
		/**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */;

		_proto.prependAnyOutgoing = function prependAnyOutgoing(listener) {
			this._anyOutgoingListeners = this._anyOutgoingListeners || [];
			this._anyOutgoingListeners.unshift(listener);
			return this;
		}
		/**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */;

		_proto.offAnyOutgoing = function offAnyOutgoing(listener) {
			if (!this._anyOutgoingListeners) {
				return this;
			}

			if (listener) {
				const listeners = this._anyOutgoingListeners;
				for (let i = 0; i < listeners.length; i++) {
					if (listener === listeners[i]) {
						listeners.splice(i, 1);
						return this;
					}
				}
			} else {
				this._anyOutgoingListeners = [];
			}

			return this;
		}
		/**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */;

		_proto.listenersAnyOutgoing = function listenersAnyOutgoing() {
			return this._anyOutgoingListeners || [];
		}
		/**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */;

		_proto.notifyOutgoingListeners = function notifyOutgoingListeners(packet) {
			if (this._anyOutgoingListeners && this._anyOutgoingListeners.length > 0) {
				const listeners = this._anyOutgoingListeners.slice();
				const _iterator2 = _createForOfIteratorHelper(listeners);
				let _step2;
				try {
					for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
						const listener = _step2.value;
						listener.apply(this, packet.data);
					}
				} catch (error) {
					_iterator2.e(error);
				} finally {
					_iterator2.f();
				}
			}
		};

		return _createClass(Socket, [{
			key: 'disconnected',
			get: function get() {
				return !this.connected;
			},
		}, {
			key: 'active',
			get: function get() {
				return Boolean(this.subs);
			},
		}, {
			key: 'volatile',
			get: function get() {
				this.flags.volatile = true;
				return this;
			},
		}]);
	})(Emitter);

	/**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */
	function Backoff(options) {
		options ||= {};
		this.ms = options.min || 100;
		this.max = options.max || 10_000;
		this.factor = options.factor || 2;
		this.jitter = options.jitter > 0 && options.jitter <= 1 ? options.jitter : 0;
		this.attempts = 0;
	}

	/**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */
	Backoff.prototype.duration = function () {
		let ms = this.ms * this.factor ** this.attempts++;
		if (this.jitter) {
			const random = Math.random();
			const deviation = Math.floor(random * this.jitter * ms);
			ms = (Math.floor(random * 10) & 1) == 0 ? ms - deviation : ms + deviation;
		}

		return Math.min(ms, this.max) | 0;
	};

	/**
   * Reset the number of attempts.
   *
   * @api public
   */
	Backoff.prototype.reset = function () {
		this.attempts = 0;
	};

	/**
   * Set the minimum duration
   *
   * @api public
   */
	Backoff.prototype.setMin = function (min) {
		this.ms = min;
	};

	/**
   * Set the maximum duration
   *
   * @api public
   */
	Backoff.prototype.setMax = function (max) {
		this.max = max;
	};

	/**
   * Set the jitter
   *
   * @api public
   */
	Backoff.prototype.setJitter = function (jitter) {
		this.jitter = jitter;
	};

	const debug$1 = debugModule('socket.io-client:manager'); // Debug()
	const Manager = /* #__PURE__ */(function (_Emitter) {
		function Manager(uri, options) {
			let _this;
			let _a;
			_this = _Emitter.call(this) || this;
			_this.nsps = {};
			_this.subs = [];
			if (uri && _typeof(uri) === 'object') {
				options = uri;
				uri = undefined;
			}

			options ||= {};
			options.path = options.path || '/socket.io';
			_this.opts = options;
			installTimerFunctions(_this, options);
			_this.reconnection(options.reconnection !== false);
			_this.reconnectionAttempts(options.reconnectionAttempts || Infinity);
			_this.reconnectionDelay(options.reconnectionDelay || 1000);
			_this.reconnectionDelayMax(options.reconnectionDelayMax || 5000);
			_this.randomizationFactor((_a = options.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
			_this.backoff = new Backoff({
				min: _this.reconnectionDelay(),
				max: _this.reconnectionDelayMax(),
				jitter: _this.randomizationFactor(),
			});
			_this.timeout(options.timeout == null ? 20_000 : options.timeout);
			_this._readyState = 'closed';
			_this.uri = uri;
			const _parser = options.parser || parser;
			_this.encoder = new _parser.Encoder();
			_this.decoder = new _parser.Decoder();
			_this._autoConnect = options.autoConnect !== false;
			if (_this._autoConnect) {
				_this.open();
			}

			return _this;
		}

		_inheritsLoose(Manager, _Emitter);
		const _proto = Manager.prototype;
		_proto.reconnection = function reconnection(v) {
			if (arguments.length === 0) {
				return this._reconnection;
			}

			this._reconnection = Boolean(v);
			if (!v) {
				this.skipReconnect = true;
			}

			return this;
		};

		_proto.reconnectionAttempts = function reconnectionAttempts(v) {
			if (v === undefined) {
				return this._reconnectionAttempts;
			}

			this._reconnectionAttempts = v;
			return this;
		};

		_proto.reconnectionDelay = function reconnectionDelay(v) {
			let _a;
			if (v === undefined) {
				return this._reconnectionDelay;
			}

			this._reconnectionDelay = v;
			(_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
			return this;
		};

		_proto.randomizationFactor = function randomizationFactor(v) {
			let _a;
			if (v === undefined) {
				return this._randomizationFactor;
			}

			this._randomizationFactor = v;
			(_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
			return this;
		};

		_proto.reconnectionDelayMax = function reconnectionDelayMax(v) {
			let _a;
			if (v === undefined) {
				return this._reconnectionDelayMax;
			}

			this._reconnectionDelayMax = v;
			(_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
			return this;
		};

		_proto.timeout = function timeout(v) {
			if (arguments.length === 0) {
				return this._timeout;
			}

			this._timeout = v;
			return this;
		}
		/**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */;

		_proto.maybeReconnectOnOpen = function maybeReconnectOnOpen() {
			// Only try to reconnect if it's the first time we're connecting
			if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
				// Keeps reconnection from firing twice for the same reconnection loop
				this.reconnect();
			}
		}
		/**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */;

		_proto.open = function open(function_) {
			const _this2 = this;
			debug$1('readyState %s', this._readyState);
			if (~this._readyState.indexOf('open')) {
				return this;
			}

			debug$1('opening %s', this.uri);
			this.engine = new Socket$1(this.uri, this.opts);
			const socket = this.engine;
			const self = this;
			this._readyState = 'opening';
			this.skipReconnect = false;
			// Emit `open`
			const openSubDestroy = on(socket, 'open', () => {
				self.onopen();
				function_ && function_();
			});
			const onError = function onError(error) {
				debug$1('error');
				_this2.cleanup();
				_this2._readyState = 'closed';
				_this2.emitReserved('error', error);
				if (function_) {
					function_(error);
				} else {
					// Only do this if there is no fn to handle the error
					_this2.maybeReconnectOnOpen();
				}
			};

			// Emit `error`
			const errorSub = on(socket, 'error', onError);
			if (this._timeout !== false) {
				const timeout = this._timeout;
				debug$1('connect attempt will timeout after %d', timeout);
				// Set timer
				const timer = this.setTimeoutFn(() => {
					debug$1('connect attempt timed out after %d', timeout);
					openSubDestroy();
					onError(new Error('timeout'));
					socket.close();
				}, timeout);
				if (this.opts.autoUnref) {
					timer.unref();
				}

				this.subs.push(() => {
					_this2.clearTimeoutFn(timer);
				});
			}

			this.subs.push(openSubDestroy, errorSub);
			return this;
		}
		/**
     * Alias for open()
     *
     * @return self
     * @public
     */;

		_proto.connect = function connect(function_) {
			return this.open(function_);
		}
		/**
     * Called upon transport open.
     *
     * @private
     */;

		_proto.addEventListener('open', function onopen() {
			debug$1('open');
			// Clear old subs
			this.cleanup();
			// Mark as open
			this._readyState = 'open';
			this.emitReserved('open');
			// Add new subs
			const socket = this.engine;
			this.subs.push(on(socket, 'ping', this.onping.bind(this)), on(socket, 'data', this.ondata.bind(this)), on(socket, 'error', this.onerror.bind(this)), on(socket, 'close', this.onclose.bind(this)),
				// @ts-ignore
				on(this.decoder, 'decoded', this.ondecoded.bind(this)));
		})
		/**
     * Called upon a ping.
     *
     * @private
     */;

		_proto.onping = function onping() {
			this.emitReserved('ping');
		}
		/**
     * Called with data.
     *
     * @private
     */;

		_proto.ondata = function ondata(data) {
			try {
				this.decoder.add(data);
			} catch (error) {
				this.onclose('parse error', error);
			}
		}
		/**
     * Called when parser fully decodes a packet.
     *
     * @private
     */;

		_proto.ondecoded = function ondecoded(packet) {
			const _this3 = this;
			// The nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
			nextTick(() => {
				_this3.emitReserved('packet', packet);
			}, this.setTimeoutFn);
		}
		/**
     * Called upon socket error.
     *
     * @private
     */;

		_proto.onerror = function onerror(error) {
			debug$1('error', error);
			this.emitReserved('error', error);
		}
		/**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */;

		_proto.socket = function socket(nsp, options) {
			let socket = this.nsps[nsp];
			if (!socket) {
				socket = new Socket(this, nsp, options);
				this.nsps[nsp] = socket;
			} else if (this._autoConnect && !socket.active) {
				socket.connect();
			}

			return socket;
		}
		/**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */;

		_proto._destroy = function _destroy(socket) {
			const nsps = Object.keys(this.nsps);
			for (let _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
				const nsp = _nsps[_i];
				const _socket = this.nsps[nsp];
				if (_socket.active) {
					debug$1('socket %s is still active, skipping close', nsp);
					return;
				}
			}

			this._close();
		}
		/**
     * Writes a packet.
     *
     * @param packet
     * @private
     */;

		_proto._packet = function _packet(packet) {
			debug$1('writing packet %j', packet);
			const encodedPackets = this.encoder.encode(packet);
			for (const encodedPacket of encodedPackets) {
				this.engine.write(encodedPacket, packet.options);
			}
		}
		/**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */;

		_proto.cleanup = function cleanup() {
			debug$1('cleanup');
			for (const subDestroy of this.subs) {
				 subDestroy(); continue;
			}

			this.subs.length = 0;
			this.decoder.destroy();
		}
		/**
     * Close the current socket.
     *
     * @private
     */;

		_proto._close = function _close() {
			debug$1('disconnect');
			this.skipReconnect = true;
			this._reconnecting = false;
			this.onclose('forced close');
		}
		/**
     * Alias for close()
     *
     * @private
     */;

		_proto.disconnect = function disconnect() {
			return this._close();
		}
		/**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */;

		_proto.addEventListener('close', function onclose(reason, description) {
			let _a;
			debug$1('closed due to %s', reason);
			this.cleanup();
			(_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
			this.backoff.reset();
			this._readyState = 'closed';
			this.emitReserved('close', reason, description);
			if (this._reconnection && !this.skipReconnect) {
				this.reconnect();
			}
		})
		/**
     * Attempt a reconnection.
     *
     * @private
     */;

		_proto.reconnect = function reconnect() {
			const _this4 = this;
			if (this._reconnecting || this.skipReconnect) {
				return this;
			}

			const self = this;
			if (this.backoff.attempts >= this._reconnectionAttempts) {
				debug$1('reconnect failed');
				this.backoff.reset();
				this.emitReserved('reconnect_failed');
				this._reconnecting = false;
			} else {
				const delay = this.backoff.duration();
				debug$1('will wait %dms before reconnect attempt', delay);
				this._reconnecting = true;
				const timer = this.setTimeoutFn(() => {
					if (self.skipReconnect) {
						return;
					}

					debug$1('attempting reconnect');
					_this4.emitReserved('reconnect_attempt', self.backoff.attempts);
					// Check again for the case socket closed in above events
					if (self.skipReconnect) {
						return;
					}

					self.open(error => {
						if (error) {
							debug$1('reconnect attempt error');
							self._reconnecting = false;
							self.reconnect();
							_this4.emitReserved('reconnect_error', error);
						} else {
							debug$1('reconnect success');
							self.onreconnect();
						}
					});
				}, delay);
				if (this.opts.autoUnref) {
					timer.unref();
				}

				this.subs.push(() => {
					_this4.clearTimeoutFn(timer);
				});
			}
		}
		/**
     * Called upon successful reconnect.
     *
     * @private
     */;

		_proto.onreconnect = function onreconnect() {
			const attempt = this.backoff.attempts;
			this._reconnecting = false;
			this.backoff.reset();
			this.emitReserved('reconnect', attempt);
		};

		return Manager;
	})(Emitter);

	const debug = debugModule('socket.io-client'); // Debug()
	/**
   * Managers cache.
   */
	const cache = {};
	function lookup(uri, options) {
		if (_typeof(uri) === 'object') {
			options = uri;
			uri = undefined;
		}

		options ||= {};
		const parsed = url(uri, options.path || '/socket.io');
		const source = parsed.source;
		const id = parsed.id;
		const path = parsed.path;
		const sameNamespace = cache[id] && path in cache[id].nsps;
		const newConnection = options.forceNew || options['force new connection'] || options.multiplex === false || sameNamespace;
		let io;
		if (newConnection) {
			debug('ignoring socket cache for %s', source);
			io = new Manager(source, options);
		} else {
			if (!cache[id]) {
				debug('new io instance for %s', source);
				cache[id] = new Manager(source, options);
			}

			io = cache[id];
		}

		if (parsed.query && !options.query) {
			options.query = parsed.queryKey;
		}

		return io.socket(parsed.path, options);
	}

	// So that "lookup" can be used both as a function (e.g. `io(...)`) and as a
	// namespace (e.g. `io.connect(...)`), for backward compatibility
	_extends(lookup, {
		Manager,
		Socket,
		io: lookup,
		connect: lookup,
	});

	return lookup;
}));
// # sourceMappingURL=socket.io.js.map
