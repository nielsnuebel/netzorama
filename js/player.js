(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mediaplayer-bundle"] = factory();
	else
		root["mediaplayer-bundle"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.swfobject = __webpack_require__(15);

	__webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var FlashProxy, HTML5Proxy, HomadTracker, Mediaplayer,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  slice = [].slice;

	__webpack_require__(2);

	HomadTracker = __webpack_require__(3);

	HTML5Proxy = __webpack_require__(4);

	FlashProxy = __webpack_require__(7);

	Mediaplayer = (function() {
	  Mediaplayer.prototype.metadata = {};

	  function Mediaplayer(_container, _settings) {
	    this.parseMetadata = bind(this.parseMetadata, this);
	    this.feedloadFail = bind(this.feedloadFail, this);
	    this.feedloadComplete = bind(this.feedloadComplete, this);
	    var customVideoAttributes, homadTracker, i, len, method, ref, ref1, ref2, ref3;
	    if (arguments.length > 2) {
	      console.warn("[DEPRECATION] Use @settings object to pass customVideoAttributes, debug and shinobi.");
	    }
	    if (_settings) {
	      this.settings = _settings;
	    } else if ((((ref = $('#mediaplayerSettings')) != null ? ref.text : void 0) != null) && $('#mediaplayerSettings').text() !== "" && $('#mediaplayerSettings').text() !== "{}") {
	      this.settings = JSON.parse($('#mediaplayerSettings').text());
	    } else {
	      throw 'no settings found';
	    }
	    if (((ref1 = this.settings) != null ? (ref2 = ref1.reporting) != null ? ref2.googleanalytics : void 0 : void 0) != null) {
	      console.warn("[DEPRECATION] googleanalytics found in reporting, players will send GA tracking calls on top of events sent through Shinobi.");
	    }
	    this.options = {};
	    this.tryProxyLoad = false;
	    this.shinobi = this.settings.shinobi || arguments[4];
	    customVideoAttributes = this.settings.customVideoAttributes || arguments[2] || {};
	    this.mobile = navigator.userAgent.match(/iPhone|iPod|Symbian|MIDP|Windows CE|BlackBerry|Opera Mini|PSP|Android/) || navigator.userAgent.match(/iPad|RIM Tablet/);
	    this.html5 = this.settings.force === 'html5';
	    if (this.html5) {
	      this.mobile = true;
	    }
	    if (this.settings.shinobi != null) {
	      delete this.settings.shinobi;
	    }
	    if (this.settings.reporting && this.settings.reporting.enabled && this.settings.reporting.homad && this.settings.reporting.homad.enabled) {
	      homadTracker = new HomadTracker();
	    }
	    if (this.html5 || this.mobile) {
	      this.proxy = new HTML5Proxy(_container, this.settings, customVideoAttributes, false);
	    } else {
	      this.proxy = new FlashProxy(_container, this.settings);
	    }
	    this.proxy.addEventListener("track", (function(_this) {
	      return function(report) {
	        var ref3, ref4;
	        report.container = _container;
	        $.extend(report, _this.metadata);
	        if (_this.metadata.title && (report.contentTitle == null)) {
	          report.contentTitle = _this.metadata.title;
	        }
	        if (_this.metadata.feedduration && (report.contentDuration == null)) {
	          report.contentDuration = _this.metadata.feedduration;
	        }
	        if (!report.contentMGID) {
	          report.contentMGID = _this.metadata.mediaid;
	        }
	        report.mediaplayerInstance = _this;
	        if (((ref3 = _this.shinobi) != null ? ref3.track : void 0) != null) {
	          return _this.shinobi.track(report);
	        } else if (((ref4 = window.VIACOM.Shinobi) != null ? ref4.track : void 0) != null) {
	          return window.VIACOM.Shinobi.track(report);
	        }
	      };
	    })(this));
	    ref3 = ['addEventListener', 'removeEventListener', 'play', 'pause', 'getDuration', 'getCurrentTime', 'setCurrentTime', 'getVolume', 'setVolume', 'setAutoPlay', 'getAutoPlay', 'requestFullscreen', 'invokeAd', 'destroy'];
	    for (i = 0, len = ref3.length; i < len; i++) {
	      method = ref3[i];
	      this[method] = this.proxy[method].bind(this.proxy);
	    }
	  }

	  Mediaplayer.prototype.load = function(type, token, _options, callback, mrss) {
	    var stream;
	    if (_options == null) {
	      _options = {};
	    }
	    if (callback == null) {
	      callback = null;
	    }
	    if (mrss == null) {
	      mrss = null;
	    }
	    this.log('load', type, token, _options, callback, mrss);
	    if ((mrss != null) && mrss.indexOf('http:') > -1 && this.settings.forceSSL) {
	      mrss = mrss.split('http://').join('https://');
	    }
	    this.embedInfo = {
	      type: type,
	      token: token,
	      mrss: mrss
	    };
	    this.embedInfo.image = (_options != null ? _options.image : void 0) || this.settings.image || null;
	    if (((_options != null ? _options.debug : void 0) != null) && _options.debug) {
	      if (!this.settings.debug) {
	        this.settings.debug = _options.debug;
	      }
	      this.tryProxyLoad = true;
	      this.log(this.getEmbedPath());
	    }
	    this.currentToken = token;
	    if (type === 'arc' || type === 'mixed_playlist_video') {
	      this.callback = callback;
	      this.options = _options;
	      return this.loadFeedFromTokenOrURL(type, token, mrss);
	    } else if (type === 'akamai_httpstream') {
	      stream = 'http://unilivemtveu-lh.akamaihd.net/';
	      if (typeof token === 'object') {
	        stream = token[this.mobile ? 1 : 0];
	      } else {
	        if (this.mobile) {
	          stream += 'i/' + token + '/master.m3u8';
	        } else {
	          stream += 'z/' + token + '/manifest.f4m';
	        }
	      }
	      return this.proxy.load(type, stream, _options, callback, mrss);
	    } else {
	      this.proxy.load(type, token, _options, callback, mrss);
	      if (mrss != null) {
	        return this.loadMetadata(mrss);
	      } else if (type === 'music_video' || type === 'local_playlist' || type === 'local_playlist_video') {
	        return this.loadMetadata(this.protocolToUse() + 'api.mtvnn.com/v2/mrss.xml?uri=mgid:sensei:video:mtvnn.com:' + type + '-' + token);
	      }
	    }
	  };

	  Mediaplayer.prototype.loadFeedFromTokenOrURL = function(type, token, mrss) {
	    var arcsite;
	    if (mrss && mrss !== '') {
	      return this.loadFeed(mrss);
	    } else if (token && token !== '') {
	      if (token.substr(0, 4) === 'http') {
	        return this.loadFeed(token);
	      } else {
	        if (type === 'arc') {
	          if (this.settings.tld == null) {
	            throw "If no mrss is provided for " + type + ", a tld must be provided in the player @settings.";
	          }
	          arcsite = this.settings.arcSite || 'mtv.de';
	          return this.loadFeed(this.protocolToUse() + 'api.mtvnn.com/v2/mrss.xml?uri=mgid:sensei:video:mtvnn.com:music_video-' + token + '-' + this.settings.tld.toUpperCase() + '&arcSite=' + arcsite);
	        } else {
	          return this.loadFeed(this.protocolToUse() + 'api.mtvnn.com/v2/mrss.xml?uri=mgid:sensei:video:mtvnn.com:' + type + '-' + token);
	        }
	      }
	    }
	  };

	  Mediaplayer.prototype.loadFeed = function(source) {
	    return this.loadFeedXML(source, this.feedloadComplete);
	  };

	  Mediaplayer.prototype.feedloadComplete = function(data) {
	    var token;
	    if (data == null) {
	      return;
	    }
	    this.$feed = $(data);
	    this.parseMetadata(data);
	    token = this.mobile ? this.$feed.xpath("//*:content/@url").val() + '&device=iPad&format=json' : this.xmlToString(data);
	    return this.proxy.load("arc", token, this.options, this.callback, this.source);
	  };

	  Mediaplayer.prototype.feedloadFail = function(data) {
	    if (this.tryProxyLoad) {
	      this.log('Failed to load feed. Trying to load through local server');
	      this.tryProxyLoad = false;
	      return this.loadFeedXML('/feedloader/?source=' + encodeURIComponent(this.source), this.feedloadComplete);
	    }
	  };

	  Mediaplayer.prototype.loadFeedXML = function(source, finishedCallback) {
	    this.source = source;
	    return $.ajax({
	      url: source,
	      dataType: 'xml',
	      success: finishedCallback,
	      fail: this.feedloadFail,
	      error: this.feedloadFail
	    });
	  };

	  Mediaplayer.prototype.loadMetadata = function(source) {
	    return this.loadFeedXML(source, this.parseMetadata);
	  };

	  Mediaplayer.prototype.xmlToString = function(data) {
	    var e, error, serialized;
	    try {
	      serialized = new XMLSerializer().serializeToString(data);
	    } catch (error) {
	      e = error;
	      serialized = data.xml;
	    }
	    return serialized;
	  };

	  Mediaplayer.prototype.getEmbedCode = function() {
	    if (this.embedInfo == null) {
	      return false;
	    }
	    return '<iframe width="640" height="360" src="' + this.getEmbedPath() + '" allowfullscreen frameborder="0"></iframe>';
	  };

	  Mediaplayer.prototype.getEmbedPath = function() {
	    var path;
	    path = window.location.protocol + '//' + window.location.host + '/embed/?type=' + this.embedInfo.type + '&token=' + this.embedInfo.token;
	    if (this.embedInfo.mrss) {
	      path += '&mrss=' + encodeURIComponent(this.embedInfo.mrss);
	    }
	    if (this.embedInfo.image) {
	      path += '&image=' + encodeURIComponent(this.embedInfo.image);
	    }
	    return path;
	  };

	  Mediaplayer.prototype.parseMetadata = function(data) {
	    var $xml, title;
	    this.log('parseMetadata', data);
	    $xml = $(data);
	    title = $xml.find("title").text().split('_');
	    this.metadata = {};
	    this.metadata.title = $xml.find("title").text();
	    this.metadata.title_tag = $xml.find("title").text();
	    if (title.length > 1) {
	      this.metadata.franchise = title[1];
	    }
	    this.metadata.feedduration = $xml.xpath("//*:content/@duration").val();
	    this.metadata.file = $xml.xpath("//*:content/@url").val();
	    if (title.length > 3) {
	      this.metadata.season = title[3];
	      if (title.length > 4) {
	        this.metadata.episode = title[4];
	        if (title.length > 5) {
	          if (title[5].split('part').length > 0) {
	            this.metadata.part = title[5].split('part')[1];
	          }
	        }
	      }
	    }
	    $xml.xpath("//*:category/@scheme").each((function(_this) {
	      return function(id, content) {
	        if (content.value === "urn:mtvn:playlist_uri") {
	          return _this.metadata.mediaid = $xml.xpath("//*:category/@scheme")[id].innerHTML;
	        }
	      };
	    })(this));
	    if (!this.metadata.mediaid) {
	      return this.metadata.mediaid = $xml.find('category[scheme="urn:mtvn:playlist_uri"]:eq(0)').text();
	    }
	  };

	  Mediaplayer.prototype.protocolToUse = function() {
	    if ((this.settings.forceSSL != null) && this.settings.forceSSL) {
	      return 'https://';
	    }
	    if (window.location.href.indexOf('http:') !== -1) {
	      return 'http://';
	    } else {
	      return 'http://';
	    }
	  };

	  Mediaplayer.prototype.log = function(args) {
	    if (this.settings.debug) {
	      return console.log.apply(console, ['[プレ]'].concat(slice.call(arguments)));
	    }
	  };

	  return Mediaplayer;

	})();

	module.exports = Mediaplayer;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 * jQuery XPath plugin v0.3.1
	 * https://github.com/ilinsky/jquery-xpath
	 * Copyright 2015, Sergey Ilinsky
	 * Dual licensed under the MIT and GPL licenses.
	 *
	 * Includes xpath.js - XPath 2.0 implementation in JavaScript
	 * https://github.com/ilinsky/xpath.js
	 * Copyright 2015, Sergey Ilinsky
	 * Dual licensed under the MIT and GPL licenses.
	 *
	 */
	(function () {


	var cString		= window.String,
		cBoolean	= window.Boolean,
		cNumber		= window.Number,
		cObject		= window.Object,
		cArray		= window.Array,
		cRegExp		= window.RegExp,
		cDate		= window.Date,
		cFunction	= window.Function,
		cMath		= window.Math,
		cError		= window.Error,
		cSyntaxError= window.SyntaxError,
		cTypeError	= window.TypeError,
		fIsNaN		= window.isNaN,
		fIsFinite	= window.isFinite,
		nNaN		= window.NaN,
		nInfinity	= window.Infinity,
			fWindow_btoa	= window.btoa,
		fWindow_atob	= window.atob,
		fWindow_parseInt= window.parseInt,
		fString_trim	=(function() {
			return cString.prototype.trim ? function(sValue) {return cString(sValue).trim();} : function(sValue) {
				return cString(sValue).replace(/^\s+|\s+$/g, '');
			};
		})(),
		fArray_indexOf	=(function() {
			return cArray.prototype.indexOf ? function(aValue, vItem) {return aValue.indexOf(vItem);} : function(aValue, vItem) {
				for (var nIndex = 0, nLength = aValue.length; nIndex < nLength; nIndex++)
					if (aValue[nIndex] === vItem)
						return nIndex;
				return -1;
			};
		})();

	var sNS_XSD	= "http://www.w3.org/2001/XMLSchema",
		sNS_XPF	= "http://www.w3.org/2005/xpath-functions",
		sNS_XNS	= "http://www.w3.org/2000/xmlns/",
		sNS_XML	= "http://www.w3.org/XML/1998/namespace";


	function cException(sCode
			, sMessage
		) {

		this.code		= sCode;
		this.message	=
						  sMessage ||
						  oException_messages[sCode];
	};

	cException.prototype	= new cError;


	var oException_messages	= {};
	oException_messages["XPDY0002"]	= "Evaluation of an expression relies on some part of the dynamic context that has not been assigned a value.";
	oException_messages["XPST0003"]	= "Expression is not a valid instance of the grammar";
	oException_messages["XPTY0004"]	= "Type is not appropriate for the context in which the expression occurs";
	oException_messages["XPST0008"]	= "Expression refers to an element name, attribute name, schema type name, namespace prefix, or variable name that is not defined in the static context";
	oException_messages["XPST0010"]	= "Axis not supported";
	oException_messages["XPST0017"]	= "Expanded QName and number of arguments in a function call do not match the name and arity of a function signature";
	oException_messages["XPTY0018"]	= "The result of the last step in a path expression contains both nodes and atomic values";
	oException_messages["XPTY0019"]	= "The result of a step (other than the last step) in a path expression contains an atomic value.";
	oException_messages["XPTY0020"]	= "In an axis step, the context item is not a node.";
	oException_messages["XPST0051"]	= "It is a static error if a QName that is used as an AtomicType in a SequenceType is not defined in the in-scope schema types as an atomic type.";
	oException_messages["XPST0081"]	= "A QName used in an expression contains a namespace prefix that cannot be expanded into a namespace URI by using the statically known namespaces.";
	oException_messages["FORG0001"]	= "Invalid value for cast/constructor.";
	oException_messages["FORG0003"]	= "fn:zero-or-one called with a sequence containing more than one item.";
	oException_messages["FORG0004"]	= "fn:one-or-more called with a sequence containing no items.";
	oException_messages["FORG0005"]	= "fn:exactly-one called with a sequence containing zero or more than one item.";
	oException_messages["FORG0006"]	= "Invalid argument type.";
	oException_messages["FODC0001"]	= "No context document.";
	oException_messages["FORX0001"]	= "Invalid regular expression flags.";
	oException_messages["FOCA0002"]	= "Invalid lexical value.";
	oException_messages["FOCH0002"]	= "Unsupported collation.";

	oException_messages["FONS0004"]	= "No namespace found for prefix.";


	function cLexer(sValue) {
		var aMatch	= sValue.match(/\$?(?:(?![0-9-])(?:[\w-]+|\*):)?(?![0-9-])(?:[\w-]+|\*)|\(:|:\)|\/\/|\.\.|::|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?|"[^"]*(?:""[^"]*)*"|'[^']*(?:''[^']*)*'|<<|>>|[!<>]=|(?![0-9-])[\w-]+:\*|\s+|./g);
		if (aMatch) {
			var nStack	= 0;
			for (var nIndex = 0, nLength = aMatch.length; nIndex < nLength; nIndex++)
				if (aMatch[nIndex] == '(:')
					nStack++;
				else
				if (aMatch[nIndex] == ':)' && nStack)
					nStack--;
				else
				if (!nStack && !/^\s/.test(aMatch[nIndex]))
					this[this.length++]	= aMatch[nIndex];
			if (nStack)
				throw new cException("XPST0003"
						, "Unclosed comment"
				);
		}
	};

	cLexer.prototype.index		= 0;
	cLexer.prototype.length	= 0;

	cLexer.prototype.reset	= function() {
		this.index	= 0;
	};

	cLexer.prototype.peek	= function(nOffset) {
		return this[this.index +(nOffset || 0)] || '';
	};

	cLexer.prototype.next	= function(nOffset) {
		return(this.index+= nOffset || 1) < this.length;
	};

	cLexer.prototype.back	= function(nOffset) {
		return(this.index-= nOffset || 1) > 0;
	};

	cLexer.prototype.eof	= function() {
		return this.index >= this.length;
	};


	function cDOMAdapter() {

	};

	cDOMAdapter.prototype.isNode		= function(oNode) {
		return oNode &&!!oNode.nodeType;
	};

	cDOMAdapter.prototype.getProperty	= function(oNode, sName) {
		return oNode[sName];
	};

	cDOMAdapter.prototype.isSameNode	= function(oNode, oNode2) {
		return oNode == oNode2;
	};

	cDOMAdapter.prototype.compareDocumentPosition	= function(oNode, oNode2) {
		return oNode.compareDocumentPosition(oNode2);
	};

	cDOMAdapter.prototype.lookupNamespaceURI	= function(oNode, sPrefix) {
		return oNode.lookupNamespaceURI(sPrefix);
	};

	cDOMAdapter.prototype.getElementById	= function(oNode, sId) {
		return oNode.getElementById(sId);
	};

	cDOMAdapter.prototype.getElementsByTagNameNS	= function(oNode, sNameSpaceURI, sLocalName) {
		return oNode.getElementsByTagNameNS(sNameSpaceURI, sLocalName);
	};


	function cDynamicContext(oStaticContext, vItem, oScope, oDOMAdapter) {
			this.staticContext	= oStaticContext;
			this.item		= vItem;
			this.scope		= oScope || {};
		this.stack		= {};
			this.DOMAdapter	= oDOMAdapter || new cDOMAdapter;
			var oDate	= new cDate,
			nOffset	= oDate.getTimezoneOffset();
		this.dateTime	= new cXSDateTime(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate(), oDate.getHours(), oDate.getMinutes(), oDate.getSeconds() + oDate.getMilliseconds() / 1000, -nOffset);
		this.timezone	= new cXSDayTimeDuration(0, cMath.abs(~~(nOffset / 60)), cMath.abs(nOffset % 60), 0, nOffset > 0);
	};

	cDynamicContext.prototype.item		= null;
	cDynamicContext.prototype.position	= 0;
	cDynamicContext.prototype.size		= 0;
	cDynamicContext.prototype.scope		= null;
	cDynamicContext.prototype.stack		= null;	cDynamicContext.prototype.dateTime	= null;
	cDynamicContext.prototype.timezone	= null;
	cDynamicContext.prototype.staticContext	= null;

	cDynamicContext.prototype.pushVariable	= function(sName, vValue) {
		if (!this.stack.hasOwnProperty(sName))
			this.stack[sName]	= [];
		this.stack[sName].push(this.scope[sName]);
		this.scope[sName] = vValue;
	};

	cDynamicContext.prototype.popVariable	= function(sName) {
		if (this.stack.hasOwnProperty(sName)) {
			this.scope[sName] = this.stack[sName].pop();
			if (!this.stack[sName].length) {
				delete this.stack[sName];
				if (typeof this.scope[sName] == "undefined")
					delete this.scope[sName];
			}
		}
	};


	function cStaticContext() {
		this.dataTypes	= {};
		this.documents	= {};
		this.functions	= {};
		this.collations	= {};
		this.collections= {};
	};

	cStaticContext.prototype.baseURI	= null;
	cStaticContext.prototype.dataTypes	= null;
	cStaticContext.prototype.documents	= null;
	cStaticContext.prototype.functions	= null;
	cStaticContext.prototype.defaultFunctionNamespace	= null;
	cStaticContext.prototype.collations	= null;
	cStaticContext.prototype.defaultCollationName		= sNS_XPF + "/collation/codepoint";
	cStaticContext.prototype.collections	= null;
	cStaticContext.prototype.namespaceResolver	= null;
	cStaticContext.prototype.defaultElementNamespace	= null;

	var rStaticContext_uri	= /^(?:\{([^\}]+)\})?(.+)$/;
	cStaticContext.prototype.setDataType		= function(sUri, fFunction) {
		var aMatch	= sUri.match(rStaticContext_uri);
		if (aMatch)
			if (aMatch[1] != sNS_XSD)
				this.dataTypes[sUri]	= fFunction;
	};

	cStaticContext.prototype.getDataType		= function(sUri) {
		var aMatch	= sUri.match(rStaticContext_uri);
		if (aMatch)
			return aMatch[1] == sNS_XSD ? hStaticContext_dataTypes[cRegExp.$2] : this.dataTypes[sUri];
	};

	cStaticContext.prototype.setDocument		= function(sUri, fFunction) {
		this.documents[sUri]	= fFunction;
	};

	cStaticContext.prototype.setFunction		= function(sUri, fFunction) {
		var aMatch	= sUri.match(rStaticContext_uri);
		if (aMatch)
			if (aMatch[1] != sNS_XPF)
				this.functions[sUri]	= fFunction;
	};

	cStaticContext.prototype.getFunction		= function(sUri) {
		var aMatch	= sUri.match(rStaticContext_uri);
		if (aMatch)
			return aMatch[1] == sNS_XPF ? hStaticContext_functions[cRegExp.$2] : this.functions[sUri];
	};

	cStaticContext.prototype.setCollation		= function(sUri, fFunction) {
		this.collations[sUri]	= fFunction;
	};

	cStaticContext.prototype.getCollation		= function(sUri) {
		return this.collations[sUri];
	};


	cStaticContext.prototype.setCollection	= function(sUri, fFunction) {
		this.collections[sUri]	= fFunction;
	};

	cStaticContext.prototype.getURIForPrefix	= function(sPrefix) {
		var oResolver	= this.namespaceResolver,
			fResolver	= oResolver && oResolver.lookupNamespaceURI ? oResolver.lookupNamespaceURI : oResolver,
			sNameSpaceURI;
		if (fResolver instanceof cFunction && (sNameSpaceURI = fResolver.call(oResolver, sPrefix)))
			return sNameSpaceURI;
		if (sPrefix == 'fn')
			return sNS_XPF;
		if (sPrefix == 'xs')
			return sNS_XSD;
		if (sPrefix == "xml")
			return sNS_XML;
		if (sPrefix == "xmlns")
			return sNS_XNS;
			throw new cException("XPST0081"
					, "Prefix '" + sPrefix + "' has not been declared"
		);
	};

	cStaticContext.js2xs	= function(vItem) {
			if (typeof vItem == "boolean")
			vItem	= new cXSBoolean(vItem);
		else
		if (typeof vItem == "number")
			vItem	=(fIsNaN(vItem) ||!fIsFinite(vItem)) ? new cXSDouble(vItem) : fNumericLiteral_parseValue(cString(vItem));
		else
			vItem	= new cXSString(cString(vItem));
			return vItem;
	};

	cStaticContext.xs2js	= function(vItem) {
		if (vItem instanceof cXSBoolean)
			vItem	= vItem.valueOf();
		else
		if (fXSAnyAtomicType_isNumeric(vItem))
			vItem	= vItem.valueOf();
		else
			vItem	= vItem.toString();
			return vItem;
	};

	var hStaticContext_functions	= {},
		hStaticContext_signatures	= {},
		hStaticContext_dataTypes	= {},
		hStaticContext_operators	= {};

	function fStaticContext_defineSystemFunction(sName, aParameters, fFunction) {
			hStaticContext_functions[sName]	= fFunction;
			hStaticContext_signatures[sName]	= aParameters;
	};

	function fStaticContext_defineSystemDataType(sName, fFunction) {
			hStaticContext_dataTypes[sName]	= fFunction;
	};


	function cExpression(sExpression, oStaticContext) {
		var oLexer	= new cLexer(sExpression),
			oExpr	= fExpr_parse(oLexer, oStaticContext);
			if (!oLexer.eof())
			throw new cException("XPST0003"
					, "Unexpected token beyond end of query"
			);
			if (!oExpr)
			throw new cException("XPST0003"
					, "Expected expression"
			);
		this.internalExpression	= oExpr;
	};

	cExpression.prototype.internalExpression	= null;

	cExpression.prototype.evaluate	= function(oContext) {
		return this.internalExpression.evaluate(oContext);
	};


	function cStringCollator() {

	};

	cStringCollator.prototype.equals	= function(sValue1, sValue2) {
		throw "Not implemented";
	};

	cStringCollator.prototype.compare	= function(sValue1, sValue2) {
		throw "Not implemented";
	};


	function cXSConstants(){};

	cXSConstants.ANYSIMPLETYPE_DT		= 1;
	cXSConstants.STRING_DT				= 2;
	cXSConstants.BOOLEAN_DT				= 3;
	cXSConstants.DECIMAL_DT				= 4;
	cXSConstants.FLOAT_DT				= 5;
	cXSConstants.DOUBLE_DT				= 6;
	cXSConstants.DURATION_DT			= 7;
	cXSConstants.DATETIME_DT			= 8;
	cXSConstants.TIME_DT				= 9;
	cXSConstants.DATE_DT				= 10;
	cXSConstants.GYEARMONTH_DT			= 11;
	cXSConstants.GYEAR_DT				= 12;
	cXSConstants.GMONTHDAY_DT			= 13;
	cXSConstants.GDAY_DT				= 14;
	cXSConstants.GMONTH_DT				= 15;
	cXSConstants.HEXBINARY_DT			= 16;
	cXSConstants.BASE64BINARY_DT		= 17;
	cXSConstants.ANYURI_DT				= 18;
	cXSConstants.QNAME_DT				= 19;
	cXSConstants.NOTATION_DT			= 20;
	cXSConstants.NORMALIZEDSTRING_DT	= 21;
	cXSConstants.TOKEN_DT				= 22;
	cXSConstants.LANGUAGE_DT			= 23;
	cXSConstants.NMTOKEN_DT				= 24;
	cXSConstants.NAME_DT				= 25;
	cXSConstants.NCNAME_DT				= 26;
	cXSConstants.ID_DT					= 27;
	cXSConstants.IDREF_DT				= 28;
	cXSConstants.ENTITY_DT				= 29;
	cXSConstants.INTEGER_DT				= 30;
	cXSConstants.NONPOSITIVEINTEGER_DT	= 31;
	cXSConstants.NEGATIVEINTEGER_DT		= 32;
	cXSConstants.LONG_DT				= 33;
	cXSConstants.INT_DT					= 34;
	cXSConstants.SHORT_DT				= 35;
	cXSConstants.BYTE_DT				= 36;
	cXSConstants.NONNEGATIVEINTEGER_DT	= 37;
	cXSConstants.UNSIGNEDLONG_DT		= 38;
	cXSConstants.UNSIGNEDINT_DT			= 39;
	cXSConstants.UNSIGNEDSHORT_DT		= 40;
	cXSConstants.UNSIGNEDBYTE_DT		= 41;
	cXSConstants.POSITIVEINTEGER_DT		= 42;
	cXSConstants.LISTOFUNION_DT			= 43;
	cXSConstants.LIST_DT				= 44;
	cXSConstants.UNAVAILABLE_DT			= 45;

	cXSConstants.DATETIMESTAMP_DT		= 46;
	cXSConstants.DAYMONTHDURATION_DT	= 47;
	cXSConstants.DAYTIMEDURATION_DT		= 48;
	cXSConstants.PRECISIONDECIMAL_DT	= 49;
	cXSConstants.ANYATOMICTYPE_DT		= 50;
	cXSConstants.ANYTYPE_DT				= 51;

	cXSConstants.XT_YEARMONTHDURATION_DT=-1;
	cXSConstants.XT_UNTYPEDATOMIC_DT	=-2;


	function cExpr() {
		this.items	= [];
	};

	cExpr.prototype.items	= null;

	function fExpr_parse (oLexer, oStaticContext) {
		var oItem;
		if (oLexer.eof() ||!(oItem = fExprSingle_parse(oLexer, oStaticContext)))
			return;

			var oExpr	= new cExpr;
		oExpr.items.push(oItem);
		while (oLexer.peek() == ',') {
			oLexer.next();
			if (oLexer.eof() ||!(oItem = fExprSingle_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected expression"
				);
			oExpr.items.push(oItem);
		}
		return oExpr;
	};

	cExpr.prototype.evaluate	= function(oContext) {
		var oSequence	= [];
		for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
			oSequence	= hStaticContext_operators["concatenate"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
		return oSequence;
	};


	function cExprSingle() {

	};

	function fExprSingle_parse (oLexer, oStaticContext) {
		if (!oLexer.eof())
			return fIfExpr_parse(oLexer, oStaticContext)
				|| fForExpr_parse(oLexer, oStaticContext)
				|| fQuantifiedExpr_parse(oLexer, oStaticContext)
				|| fOrExpr_parse(oLexer, oStaticContext);
	};


	function cForExpr() {
		this.bindings	= [];
		this.returnExpr	= null;
	};

	cForExpr.prototype.bindings		= null;
	cForExpr.prototype.returnExpr	= null;

	function fForExpr_parse (oLexer, oStaticContext) {
		if (oLexer.peek() == "for" && oLexer.peek(1).substr(0, 1) == '$') {
			oLexer.next();

			var oForExpr	= new cForExpr,
				oExpr;
			do {
				oForExpr.bindings.push(fSimpleForBinding_parse(oLexer, oStaticContext));
			}
			while (oLexer.peek() == ',' && oLexer.next());

			if (oLexer.peek() != "return")
				throw new cException("XPST0003"
						, "Expected 'return' token in for expression"
				);

			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fExprSingle_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected return statement operand in for expression"
				);

			oForExpr.returnExpr	= oExpr;
			return oForExpr;
		}
	};

	cForExpr.prototype.evaluate	= function (oContext) {
		var oSequence	= [];
		(function(oSelf, nBinding) {
			var oBinding	= oSelf.bindings[nBinding++],
				oSequence1	= oBinding.inExpr.evaluate(oContext),
				sUri	= (oBinding.namespaceURI ? '{' + oBinding.namespaceURI + '}' : '') + oBinding.localName;
			for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++) {
				oContext.pushVariable(sUri, oSequence1[nIndex]);
				if (nBinding < oSelf.bindings.length)
					arguments.callee(oSelf, nBinding);
				else
					oSequence	= oSequence.concat(oSelf.returnExpr.evaluate(oContext));
				oContext.popVariable(sUri);
			}
		})(this, 0);

		return oSequence;
	};

	function cSimpleForBinding(sPrefix, sLocalName, sNameSpaceURI, oInExpr) {
		this.prefix			= sPrefix;
		this.localName		= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
		this.inExpr		= oInExpr;
	};

	cSimpleForBinding.prototype.prefix			= null;
	cSimpleForBinding.prototype.localName		= null;
	cSimpleForBinding.prototype.namespaceURI	= null;
	cSimpleForBinding.prototype.inExpr		= null;

	function fSimpleForBinding_parse (oLexer, oStaticContext) {
		var aMatch	= oLexer.peek().substr(1).match(rNameTest);
		if (!aMatch)
			throw new cException("XPST0003"
					, "Expected binding in for expression"
			);

		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw new cException("XPST0003"
					, "Illegal use of wildcard in for expression binding variable name"
			);

		oLexer.next();
		if (oLexer.peek() != "in")
			throw new cException("XPST0003"
					, "Expected 'in' token in for expression binding"
			);

		oLexer.next();
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fExprSingle_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected in statement operand in for expression binding"
			);

		return new cSimpleForBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
	};


	function cIfExpr(oCondExpr, oThenExpr, oElseExpr) {
		this.condExpr	= oCondExpr;
		this.thenExpr		= oThenExpr;
		this.elseExpr		= oElseExpr;
	};

	cIfExpr.prototype.condExpr	= null;
	cIfExpr.prototype.thenExpr	= null;
	cIfExpr.prototype.elseExpr	= null;

	function fIfExpr_parse (oLexer, oStaticContext) {
		var oCondExpr,
			oThenExpr,
			oElseExpr;
		if (oLexer.peek() == "if" && oLexer.peek(1) == '(') {
			oLexer.next(2);
					if (oLexer.eof() ||!(oCondExpr = fExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected if statement operand in conditional expression"
				);
					if (oLexer.peek() != ')')
				throw new cException("XPST0003"
						, "Expected ')' token in for expression"
				);

			oLexer.next();
			if (oLexer.peek() != "then")
				throw new cException("XPST0003"
						, "Expected 'then' token in conditional if expression"
				);

			oLexer.next();
			if (oLexer.eof() ||!(oThenExpr = fExprSingle_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected then statement operand in condional expression"
				);

			if (oLexer.peek() != "else")
				throw new cException("XPST0003"
						, "Expected 'else' token in conditional if expression"
				);

			oLexer.next();
			if (oLexer.eof() ||!(oElseExpr = fExprSingle_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected else statement operand in condional expression"
				);
					return new cIfExpr(oCondExpr, oThenExpr, oElseExpr);
		}
	};

	cIfExpr.prototype.evaluate	= function (oContext) {
		return this[fFunction_sequence_toEBV(this.condExpr.evaluate(oContext), oContext) ? "thenExpr" : "elseExpr"].evaluate(oContext);
	};


	function cQuantifiedExpr(sQuantifier) {
		this.quantifier		= sQuantifier;
		this.bindings		= [];
		this.satisfiesExpr	= null;
	};

	cQuantifiedExpr.prototype.bindings		= null;
	cQuantifiedExpr.prototype.quantifier	= null;
	cQuantifiedExpr.prototype.satisfiesExpr	= null;

	function fQuantifiedExpr_parse (oLexer, oStaticContext) {
		var sQuantifier	= oLexer.peek();
		if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
			oLexer.next();

			var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier),
				oExpr;
			do {
				oQuantifiedExpr.bindings.push(fSimpleQuantifiedBinding_parse(oLexer, oStaticContext));
			}
			while (oLexer.peek() == ',' && oLexer.next());

			if (oLexer.peek() != "satisfies")
				throw new cException("XPST0003"
						, "Expected 'satisfies' token in quantified expression"
				);

			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fExprSingle_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected satisfies statement operand in quantified expression"
				);

			oQuantifiedExpr.satisfiesExpr	= oExpr;
			return oQuantifiedExpr;
		}
	};

	cQuantifiedExpr.prototype.evaluate	= function (oContext) {
			var bEvery	= this.quantifier == "every",
			bResult	= bEvery ? true : false;
		(function(oSelf, nBinding) {
			var oBinding	= oSelf.bindings[nBinding++],
				oSequence1	= oBinding.inExpr.evaluate(oContext),
				sUri	= (oBinding.namespaceURI ? '{' + oBinding.namespaceURI + '}' : '') + oBinding.localName;
			for (var nIndex = 0, nLength = oSequence1.length; (nIndex < nLength) && (bEvery ? bResult :!bResult); nIndex++) {
				oContext.pushVariable(sUri, oSequence1[nIndex]);
				if (nBinding < oSelf.bindings.length)
					arguments.callee(oSelf, nBinding);
				else
					bResult	= fFunction_sequence_toEBV(oSelf.satisfiesExpr.evaluate(oContext), oContext);
				oContext.popVariable(sUri);
			}
		})(this, 0);

		return [new cXSBoolean(bResult)];
	};



	function cSimpleQuantifiedBinding(sPrefix, sLocalName, sNameSpaceURI, oInExpr) {
		this.prefix			= sPrefix;
		this.localName		= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
		this.inExpr		= oInExpr;
	};

	cSimpleQuantifiedBinding.prototype.prefix		= null;
	cSimpleQuantifiedBinding.prototype.localName	= null;
	cSimpleQuantifiedBinding.prototype.namespaceURI	= null;
	cSimpleQuantifiedBinding.prototype.inExpr	= null;

	function fSimpleQuantifiedBinding_parse (oLexer, oStaticContext) {
		var aMatch	= oLexer.peek().substr(1).match(rNameTest);
		if (!aMatch)
			throw new cException("XPST0003"
					, "Expected binding in quantified expression"
			);

		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw new cException("XPST0003"
					, "Illegal use of wildcard in quantified expression binding variable name"
			);

		oLexer.next();
		if (oLexer.peek() != "in")
			throw new cException("XPST0003"
					, "Expected 'in' token in quantified expression binding"
			);

		oLexer.next();
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fExprSingle_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected in statement operand in quantified expression binding"
			);

		return new cSimpleQuantifiedBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
	};


	function cComparisonExpr(oLeft, oRight, sOperator) {
		this.left	= oLeft;
		this.right	= oRight;
		this.operator	= sOperator;
	};

	cComparisonExpr.prototype.left	= null;
	cComparisonExpr.prototype.right	= null;
	cComparisonExpr.prototype.operator	= null;

	function fComparisonExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			oRight;
		if (oLexer.eof() ||!(oExpr = fRangeExpr_parse(oLexer, oStaticContext)))
			return;
		if (!(oLexer.peek() in hComparisonExpr_operators))
			return oExpr;

			var sOperator	= oLexer.peek();
		oLexer.next();
		if (oLexer.eof() ||!(oRight = fRangeExpr_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected second operand in comparison expression"
			);
		return new cComparisonExpr(oExpr, oRight, sOperator);
	};

	cComparisonExpr.prototype.evaluate	= function (oContext) {
		var oResult	= hComparisonExpr_operators[this.operator](this, oContext);
		return oResult == null ? [] : [oResult];
	};

	function fComparisonExpr_GeneralComp(oExpr, oContext) {
		var oLeft	= fFunction_sequence_atomize(oExpr.left.evaluate(oContext), oContext);
		if (!oLeft.length)
			return new cXSBoolean(false);

		var oRight	= fFunction_sequence_atomize(oExpr.right.evaluate(oContext), oContext);
		if (!oRight.length)
			return new cXSBoolean(false);

		var bResult	= false;
		for (var nLeftIndex = 0, nLeftLength = oLeft.length, bLeft, vLeft; (nLeftIndex < nLeftLength) &&!bResult; nLeftIndex++) {
			for (var nRightIndex = 0, nRightLength = oRight.length, bRight, vRight; (nRightIndex < nRightLength) &&!bResult; nRightIndex++) {

				vLeft	= oLeft[nLeftIndex];
				vRight	= oRight[nRightIndex];

				bLeft	= vLeft instanceof cXSUntypedAtomic;
				bRight	= vRight instanceof cXSUntypedAtomic;

				if (bLeft && bRight) {
									vLeft	= cXSString.cast(vLeft);
					vRight	= cXSString.cast(vRight);
				}
				else {
									if (bLeft) {
											if (vRight instanceof cXSDayTimeDuration)
							vLeft	= cXSDayTimeDuration.cast(vLeft);
						else
						if (vRight instanceof cXSYearMonthDuration)
							vLeft	= cXSYearMonthDuration.cast(vLeft);
						else
											if (vRight.primitiveKind)
							vLeft	= hStaticContext_dataTypes[vRight.primitiveKind].cast(vLeft);
					}
					else
					if (bRight) {
											if (vLeft instanceof cXSDayTimeDuration)
							vRight	= cXSDayTimeDuration.cast(vRight);
						else
						if (vLeft instanceof cXSYearMonthDuration)
							vRight	= cXSYearMonthDuration.cast(vRight);
						else
											if (vLeft.primitiveKind)
							vRight	= hStaticContext_dataTypes[vLeft.primitiveKind].cast(vRight);
					}

									if (vLeft instanceof cXSAnyURI)
						vLeft	= cXSString.cast(vLeft);
					if (vRight instanceof cXSAnyURI)
						vRight	= cXSString.cast(vRight);
				}

				bResult	= hComparisonExpr_ValueComp_operators[hComparisonExpr_GeneralComp_map[oExpr.operator]](vLeft, vRight, oContext).valueOf();
			}
		}
		return new cXSBoolean(bResult);
	};

	var hComparisonExpr_GeneralComp_map	= {
		'=':	'eq',
		'!=':	'ne',
		'>':	'gt',
		'<':	'lt',
		'>=':	'ge',
		'<=':	'le'
	};

	function fComparisonExpr_ValueComp(oExpr, oContext) {
		var oLeft	= fFunction_sequence_atomize(oExpr.left.evaluate(oContext), oContext);
		if (!oLeft.length)
			return null;
			fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
				, "first operand of '" + oExpr.operator + "'"
		);

		var oRight	= fFunction_sequence_atomize(oExpr.right.evaluate(oContext), oContext);
		if (!oRight.length)
			return null;
			fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
				, "second operand of '" + oExpr.operator + "'"
		);

		var vLeft	= oLeft[0],
			vRight	= oRight[0];

			if (vLeft instanceof cXSUntypedAtomic)
			vLeft	= cXSString.cast(vLeft);
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSString.cast(vRight);

			if (vLeft instanceof cXSAnyURI)
			vLeft	= cXSString.cast(vLeft);
		if (vRight instanceof cXSAnyURI)
			vRight	= cXSString.cast(vRight);

			return hComparisonExpr_ValueComp_operators[oExpr.operator](vLeft, vRight, oContext);
	};

	var hComparisonExpr_ValueComp_operators	= {};
	hComparisonExpr_ValueComp_operators['eq']	= function(oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-equal";
		}
		else
		if (oLeft instanceof cXSBoolean) {
			if (oRight instanceof cXSBoolean)
				sOperator	= "boolean-equal";
		}
		else
		if (oLeft instanceof cXSString) {
			if (oRight instanceof cXSString)
				return hStaticContext_operators["numeric-equal"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(0));
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSDate)
				sOperator	= "date-equal";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSTime)
				sOperator	= "time-equal";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSDateTime)
				sOperator	= "dateTime-equal";
		}
		else
		if (oLeft instanceof cXSDuration) {
			if (oRight instanceof cXSDuration)
				sOperator	= "duration-equal";
		}
		else
		if (oLeft instanceof cXSGYearMonth) {
			if (oRight instanceof cXSGYearMonth)
				sOperator	= "gYearMonth-equal";
		}
		else
		if (oLeft instanceof cXSGYear) {
			if (oRight instanceof cXSGYear)
				sOperator	= "gYear-equal";
		}
		else
		if (oLeft instanceof cXSGMonthDay) {
			if (oRight instanceof cXSGMonthDay)
				sOperator	= "gMonthDay-equal";
		}
		else
		if (oLeft instanceof cXSGMonth) {
			if (oRight instanceof cXSGMonth)
				sOperator	= "gMonth-equal";
		}
		else
		if (oLeft instanceof cXSGDay) {
			if (oRight instanceof cXSGDay)
				sOperator	= "gDay-equal";
		}
			else
		if (oLeft instanceof cXSQName) {
			if (oRight instanceof cXSQName)
				sOperator	= "QName-equal";
		}
		else
		if (oLeft instanceof cXSHexBinary) {
			if (oRight instanceof cXSHexBinary)
				sOperator	= "hexBinary-equal";
		}
		else
		if (oLeft instanceof cXSBase64Binary) {
			if (oRight instanceof cXSBase64Binary)
				sOperator	= "base64Binary-equal";
		}

			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

			throw new cException("XPTY0004"
				, "Cannot compare values of given types"
		);	};
	hComparisonExpr_ValueComp_operators['ne']	= function(oLeft, oRight, oContext) {
		return new cXSBoolean(!hComparisonExpr_ValueComp_operators['eq'](oLeft, oRight, oContext).valueOf());
	};
	hComparisonExpr_ValueComp_operators['gt']	= function(oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-greater-than";
		}
		else
		if (oLeft instanceof cXSBoolean) {
			if (oRight instanceof cXSBoolean)
				sOperator	= "boolean-greater-than";
		}
		else
		if (oLeft instanceof cXSString) {
			if (oRight instanceof cXSString)
				return hStaticContext_operators["numeric-greater-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(0));
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSDate)
				sOperator	= "date-greater-than";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSTime)
				sOperator	= "time-greater-than";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSDateTime)
				sOperator	= "dateTime-greater-than";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "yearMonthDuration-greater-than";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "dayTimeDuration-greater-than";
		}

			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

			throw new cException("XPTY0004"
				, "Cannot compare values of given types"
		);	};
	hComparisonExpr_ValueComp_operators['lt']	= function(oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-less-than";
		}
		else
		if (oLeft instanceof cXSBoolean) {
			if (oRight instanceof cXSBoolean)
				sOperator	= "boolean-less-than";
		}
		else
		if (oLeft instanceof cXSString) {
			if (oRight instanceof cXSString)
				return hStaticContext_operators["numeric-less-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(0));
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSDate)
				sOperator	= "date-less-than";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSTime)
				sOperator	= "time-less-than";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSDateTime)
				sOperator	= "dateTime-less-than";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "yearMonthDuration-less-than";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "dayTimeDuration-less-than";
		}

			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

			throw new cException("XPTY0004"
				, "Cannot compare values of given types"
		);	};
	hComparisonExpr_ValueComp_operators['ge']	= function(oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-less-than";
		}
		else
		if (oLeft instanceof cXSBoolean) {
			if (oRight instanceof cXSBoolean)
				sOperator	= "boolean-less-than";
		}
		else
		if (oLeft instanceof cXSString) {
			if (oRight instanceof cXSString)
				return hStaticContext_operators["numeric-greater-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(-1));
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSDate)
				sOperator	= "date-less-than";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSTime)
				sOperator	= "time-less-than";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSDateTime)
				sOperator	= "dateTime-less-than";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "yearMonthDuration-less-than";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "dayTimeDuration-less-than";
		}

			if (sOperator)
			return new cXSBoolean(!hStaticContext_operators[sOperator].call(oContext, oLeft, oRight).valueOf());

			throw new cException("XPTY0004"
				, "Cannot compare values of given types"
		);	};
	hComparisonExpr_ValueComp_operators['le']	= function(oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-greater-than";
		}
		else
		if (oLeft instanceof cXSBoolean) {
			if (oRight instanceof cXSBoolean)
				sOperator	= "boolean-greater-than";
		}
		else
		if (oLeft instanceof cXSString) {
			if (oRight instanceof cXSString)
				return hStaticContext_operators["numeric-less-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(1));
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSDate)
				sOperator	= "date-greater-than";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSTime)
				sOperator	= "time-greater-than";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSDateTime)
				sOperator	= "dateTime-greater-than";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "yearMonthDuration-greater-than";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "dayTimeDuration-greater-than";
		}

			if (sOperator)
			return new cXSBoolean(!hStaticContext_operators[sOperator].call(oContext, oLeft, oRight).valueOf());

			throw new cException("XPTY0004"
				, "Cannot compare values of given types"
		);	};

	function fComparisonExpr_NodeComp(oExpr, oContext) {
		var oLeft	= oExpr.left.evaluate(oContext);
		if (!oLeft.length)
			return null;
			fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
				, "first operand of '" + oExpr.operator + "'"
		);
			fFunctionCall_assertSequenceItemType(oContext, oLeft, cXTNode
				, "first operand of '" + oExpr.operator + "'"
		);

		var oRight	= oExpr.right.evaluate(oContext);
		if (!oRight.length)
			return null;
			fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
				, "second operand of '" + oExpr.operator + "'"
		);
			fFunctionCall_assertSequenceItemType(oContext, oRight, cXTNode
				, "second operand of '" + oExpr.operator + "'"
		);

		return hComparisonExpr_NodeComp_operators[oExpr.operator](oLeft[0], oRight[0], oContext);
	};

	var hComparisonExpr_NodeComp_operators	= {};
	hComparisonExpr_NodeComp_operators['is']	= function(oLeft, oRight, oContext) {
		return hStaticContext_operators["is-same-node"].call(oContext, oLeft, oRight);
	};
	hComparisonExpr_NodeComp_operators['>>']	= function(oLeft, oRight, oContext) {
		return hStaticContext_operators["node-after"].call(oContext, oLeft, oRight);
	};
	hComparisonExpr_NodeComp_operators['<<']	= function(oLeft, oRight, oContext) {
		return hStaticContext_operators["node-before"].call(oContext, oLeft, oRight);
	};

	var hComparisonExpr_operators	= {
			'=':	fComparisonExpr_GeneralComp,
		'!=':	fComparisonExpr_GeneralComp,
		'<':	fComparisonExpr_GeneralComp,
		'<=':	fComparisonExpr_GeneralComp,
		'>':	fComparisonExpr_GeneralComp,
		'>=':	fComparisonExpr_GeneralComp,
			'eq':	fComparisonExpr_ValueComp,
		'ne':	fComparisonExpr_ValueComp,
		'lt':	fComparisonExpr_ValueComp,
		'le':	fComparisonExpr_ValueComp,
		'gt':	fComparisonExpr_ValueComp,
		'ge':	fComparisonExpr_ValueComp,
			'is':	fComparisonExpr_NodeComp,
		'>>':	fComparisonExpr_NodeComp,
		'<<':	fComparisonExpr_NodeComp
	};


	function cAdditiveExpr(oExpr) {
		this.left	= oExpr;
		this.items	= [];
	};

	cAdditiveExpr.prototype.left	= null;
	cAdditiveExpr.prototype.items	= null;

	var hAdditiveExpr_operators	= {};
	hAdditiveExpr_operators['+']	= function(oLeft, oRight, oContext) {
		var sOperator	= '',
			bReverse	= false;

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-add";
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "add-yearMonthDuration-to-date";
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "add-dayTimeDuration-to-date";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (oRight instanceof cXSDate) {
				sOperator	= "add-yearMonthDuration-to-date";
				bReverse	= true;
			}
			else
			if (oRight instanceof cXSDateTime) {
				sOperator	= "add-yearMonthDuration-to-dateTime";
				bReverse	= true;
			}
			else
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "add-yearMonthDurations";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (oRight instanceof cXSDate) {
				sOperator	= "add-dayTimeDuration-to-date";
				bReverse	= true;
			}
			else
			if (oRight instanceof cXSTime) {
				sOperator	= "add-dayTimeDuration-to-time";
				bReverse	= true;
			}
			else
			if (oRight instanceof cXSDateTime) {
				sOperator	= "add-dayTimeDuration-to-dateTime";
				bReverse	= true;
			}
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "add-dayTimeDurations";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "add-dayTimeDuration-to-time";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "add-yearMonthDuration-to-dateTime";
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "add-dayTimeDuration-to-dateTime";
		}

			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, bReverse ? oRight : oLeft, bReverse ? oLeft : oRight);

			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};
	hAdditiveExpr_operators['-']	= function (oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-subtract";
		}
		else
		if (oLeft instanceof cXSDate) {
			if (oRight instanceof cXSDate)
				sOperator	= "subtract-dates";
			else
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "subtract-yearMonthDuration-from-date";
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "subtract-dayTimeDuration-from-date";
		}
		else
		if (oLeft instanceof cXSTime) {
			if (oRight instanceof cXSTime)
				sOperator	= "subtract-times";
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "subtract-dayTimeDuration-from-time";
		}
		else
		if (oLeft instanceof cXSDateTime) {
			if (oRight instanceof cXSDateTime)
				sOperator	= "subtract-dateTimes";
			else
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "subtract-yearMonthDuration-from-dateTime";
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "subtract-dayTimeDuration-from-dateTime";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "subtract-yearMonthDurations";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "subtract-dayTimeDurations";
		}

			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};

	function fAdditiveExpr_parse (oLexer, oStaticContext) {
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fMultiplicativeExpr_parse(oLexer, oStaticContext)))
			return;
		if (!(oLexer.peek() in hAdditiveExpr_operators))
			return oExpr;

			var oAdditiveExpr	= new cAdditiveExpr(oExpr),
			sOperator;
		while ((sOperator = oLexer.peek()) in hAdditiveExpr_operators) {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fMultiplicativeExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected second operand in additive expression"
				);
			oAdditiveExpr.items.push([sOperator, oExpr]);
		}
		return oAdditiveExpr;
	};

	cAdditiveExpr.prototype.evaluate	= function (oContext) {
		var oLeft	= fFunction_sequence_atomize(this.left.evaluate(oContext), oContext);

		if (!oLeft.length)
			return [];
			fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
				, "first operand of '" + this.items[0][0] + "'"
		);

		var vLeft	= oLeft[0];
		if (vLeft instanceof cXSUntypedAtomic)
			vLeft	= cXSDouble.cast(vLeft);	
		for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
			oRight	= fFunction_sequence_atomize(this.items[nIndex][1].evaluate(oContext), oContext);

			if (!oRight.length)
				return [];
					fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
					, "first operand of '" + this.items[nIndex][0] + "'"
			);

			vRight	= oRight[0];
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSDouble.cast(vRight);	
			vLeft	= hAdditiveExpr_operators[this.items[nIndex][0]](vLeft, vRight, oContext);
		}
		return [vLeft];
	};


	function cMultiplicativeExpr(oExpr) {
		this.left	= oExpr;
		this.items	= [];
	};

	cMultiplicativeExpr.prototype.left	= null;
	cMultiplicativeExpr.prototype.items	= null;

	var hMultiplicativeExpr_operators	= {};
	hMultiplicativeExpr_operators['*']		= function (oLeft, oRight, oContext) {
		var sOperator	= '',
			bReverse	= false;

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-multiply";
			else
			if (oRight instanceof cXSYearMonthDuration) {
				sOperator	= "multiply-yearMonthDuration";
				bReverse	= true;
			}
			else
			if (oRight instanceof cXSDayTimeDuration) {
				sOperator	= "multiply-dayTimeDuration";
				bReverse	= true;
			}
		}
		else {
			if (oLeft instanceof cXSYearMonthDuration) {
				if (fXSAnyAtomicType_isNumeric(oRight))
					sOperator	= "multiply-yearMonthDuration";
			}
			else
			if (oLeft instanceof cXSDayTimeDuration) {
				if (fXSAnyAtomicType_isNumeric(oRight))
					sOperator	= "multiply-dayTimeDuration";
			}
		}

			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, bReverse ? oRight : oLeft, bReverse ? oLeft : oRight);

			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};
	hMultiplicativeExpr_operators['div']	= function (oLeft, oRight, oContext) {
		var sOperator	= '';

		if (fXSAnyAtomicType_isNumeric(oLeft)) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "numeric-divide";
		}
		else
		if (oLeft instanceof cXSYearMonthDuration) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "divide-yearMonthDuration";
			else
			if (oRight instanceof cXSYearMonthDuration)
				sOperator	= "divide-yearMonthDuration-by-yearMonthDuration";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "divide-dayTimeDuration";
			else
			if (oRight instanceof cXSDayTimeDuration)
				sOperator	= "divide-dayTimeDuration-by-dayTimeDuration";
		}
			if (sOperator)
			return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};
	hMultiplicativeExpr_operators['idiv']	= function (oLeft, oRight, oContext) {
		if (fXSAnyAtomicType_isNumeric(oLeft) && fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-integer-divide"].call(oContext, oLeft, oRight);
			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};
	hMultiplicativeExpr_operators['mod']	= function (oLeft, oRight, oContext) {
		if (fXSAnyAtomicType_isNumeric(oLeft) && fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-mod"].call(oContext, oLeft, oRight);
			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};

	function fMultiplicativeExpr_parse (oLexer, oStaticContext) {
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fUnionExpr_parse(oLexer, oStaticContext)))
			return;
		if (!(oLexer.peek() in hMultiplicativeExpr_operators))
			return oExpr;

			var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
			sOperator;
		while ((sOperator = oLexer.peek()) in hMultiplicativeExpr_operators) {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fUnionExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected second operand in multiplicative expression"
				);
			oMultiplicativeExpr.items.push([sOperator, oExpr]);
		}
		return oMultiplicativeExpr;
	};

	cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
		var oLeft	= fFunction_sequence_atomize(this.left.evaluate(oContext), oContext);

			if (!oLeft.length)
			return [];
			fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
				, "first operand of '" + this.items[0][0] + "'"
		);

		var vLeft	= oLeft[0];
		if (vLeft instanceof cXSUntypedAtomic)
			vLeft	= cXSDouble.cast(vLeft);	
		for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
			oRight	= fFunction_sequence_atomize(this.items[nIndex][1].evaluate(oContext), oContext);

			if (!oRight.length)
				return [];
					fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
					, "second operand of '" + this.items[nIndex][0] + "'"
			);

			vRight	= oRight[0];
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSDouble.cast(vRight);	
			vLeft	= hMultiplicativeExpr_operators[this.items[nIndex][0]](vLeft, vRight, oContext);
		}
		return [vLeft];
	};


	function cUnaryExpr(sOperator, oExpr) {
		this.operator	= sOperator;
		this.expression	= oExpr;
	};

	cUnaryExpr.prototype.operator	= null;
	cUnaryExpr.prototype.expression	= null;

	var hUnaryExpr_operators	= {};
	hUnaryExpr_operators['-']	= function(oRight, oContext) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-unary-minus"].call(oContext, oRight);
			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};
	hUnaryExpr_operators['+']	= function(oRight, oContext) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-unary-plus"].call(oContext, oRight);
			throw new cException("XPTY0004"
				, "Arithmetic operator is not defined for provided arguments"
		);	};

	function fUnaryExpr_parse (oLexer, oStaticContext) {
		if (oLexer.eof())
			return;
		if (!(oLexer.peek() in hUnaryExpr_operators))
			return fValueExpr_parse(oLexer, oStaticContext);

			var sOperator	= '+',
			oExpr;
		while (oLexer.peek() in hUnaryExpr_operators) {
			if (oLexer.peek() == '-')
				sOperator	= sOperator == '-' ? '+' : '-';
			oLexer.next();
		}
		if (oLexer.eof() ||!(oExpr = fValueExpr_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected operand in unary expression"
			);
		return new cUnaryExpr(sOperator, oExpr);
	};

	cUnaryExpr.prototype.evaluate	= function (oContext) {
		var oRight	= fFunction_sequence_atomize(this.expression.evaluate(oContext), oContext);

			if (!oRight.length)
			return [];
			fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
				, "second operand of '" + this.operator + "'"
		);

		var vRight	= oRight[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	
		return [hUnaryExpr_operators[this.operator](vRight, oContext)];
	};


	function cValueExpr() {

	};

	function fValueExpr_parse (oLexer, oStaticContext) {
		return fPathExpr_parse(oLexer, oStaticContext);
	};


	function cOrExpr(oExpr) {
		this.left	= oExpr;
		this.items	= [];
	};

	cOrExpr.prototype.left	= null;
	cOrExpr.prototype.items	= null;

	function fOrExpr_parse (oLexer, oStaticContext) {
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fAndExpr_parse(oLexer, oStaticContext)))
			return;
		if (oLexer.peek() != "or")
			return oExpr;

			var oOrExpr	= new cOrExpr(oExpr);
		while (oLexer.peek() == "or") {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fAndExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected second operand in logical expression"
				);
			oOrExpr.items.push(oExpr);
		}
		return oOrExpr;
	};

	cOrExpr.prototype.evaluate	= function (oContext) {
		var bValue	= fFunction_sequence_toEBV(this.left.evaluate(oContext), oContext);
		for (var nIndex = 0, nLength = this.items.length; (nIndex < nLength) && !bValue; nIndex++)
			bValue	= fFunction_sequence_toEBV(this.items[nIndex].evaluate(oContext), oContext);
		return [new cXSBoolean(bValue)];
	};


	function cAndExpr(oExpr) {
		this.left	= oExpr;
		this.items	= [];
	};

	cAndExpr.prototype.left		= null;
	cAndExpr.prototype.items	= null;

	function fAndExpr_parse (oLexer, oStaticContext) {
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fComparisonExpr_parse(oLexer, oStaticContext)))
			return;
		if (oLexer.peek() != "and")
			return oExpr;

			var oAndExpr	= new cAndExpr(oExpr);
		while (oLexer.peek() == "and") {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fComparisonExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected second operand in logical expression"
				);
			oAndExpr.items.push(oExpr);
		}
		return oAndExpr;
	};

	cAndExpr.prototype.evaluate	= function (oContext) {
		var bValue	= fFunction_sequence_toEBV(this.left.evaluate(oContext), oContext);
		for (var nIndex = 0, nLength = this.items.length; (nIndex < nLength) && bValue; nIndex++)
			bValue	= fFunction_sequence_toEBV(this.items[nIndex].evaluate(oContext), oContext);
		return [new cXSBoolean(bValue)];
	};


	function cStepExpr() {

	};

	cStepExpr.prototype.predicates	= null;

	function fStepExpr_parse (oLexer, oStaticContext) {
		if (!oLexer.eof())
			return fFilterExpr_parse(oLexer, oStaticContext)
				|| fAxisStep_parse(oLexer, oStaticContext);
	};

	function fStepExpr_parsePredicates (oLexer, oStaticContext, oStep) {
		var oExpr;
			while (oLexer.peek() == '[') {
			oLexer.next();

			if (oLexer.eof() ||!(oExpr = fExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected expression in predicate"
				);

			oStep.predicates.push(oExpr);

			if (oLexer.peek() != ']')
				throw new cException("XPST0003"
						, "Expected ']' token in predicate"
				);

			oLexer.next();
		}
	};

	cStepExpr.prototype.applyPredicates	= function(oSequence, oContext) {
		var vContextItem	= oContext.item,
			nContextPosition= oContext.position,
			nContextSize	= oContext.size;
			for (var nPredicateIndex = 0, oSequence1, nPredicateLength = this.predicates.length; nPredicateIndex < nPredicateLength; nPredicateIndex++) {
			oSequence1	= oSequence;
			oSequence	= [];
			for (var nIndex = 0, oSequence2, nLength = oSequence1.length; nIndex < nLength; nIndex++) {
							oContext.item		= oSequence1[nIndex];
				oContext.position	= nIndex + 1;
				oContext.size		= nLength;
							oSequence2	= this.predicates[nPredicateIndex].evaluate(oContext);
							if (oSequence2.length == 1 && fXSAnyAtomicType_isNumeric(oSequence2[0])) {
					if (oSequence2[0].valueOf() == nIndex + 1)
						oSequence.push(oSequence1[nIndex]);
				}
				else
				if (fFunction_sequence_toEBV(oSequence2, oContext))
					oSequence.push(oSequence1[nIndex]);
			}
		}
			oContext.item		= vContextItem;
		oContext.position	= nContextPosition;
		oContext.size		= nContextSize;
			return oSequence;
	};


	function cAxisStep(sAxis, oTest) {
		this.axis	= sAxis;
		this.test	= oTest;
		this.predicates	= [];
	};

	cAxisStep.prototype	= new cStepExpr;

	cAxisStep.prototype.axis		= null;
	cAxisStep.prototype.test		= null;

	var hAxisStep_axises	= {};
	hAxisStep_axises["attribute"]			= {};
	hAxisStep_axises["child"]				= {};
	hAxisStep_axises["descendant"]			= {};
	hAxisStep_axises["descendant-or-self"]	= {};
	hAxisStep_axises["following"]			= {};
	hAxisStep_axises["following-sibling"]	= {};
	hAxisStep_axises["self"]				= {};
	hAxisStep_axises["ancestor"]			= {};
	hAxisStep_axises["ancestor-or-self"]	= {};
	hAxisStep_axises["parent"]				= {};
	hAxisStep_axises["preceding"]			= {};
	hAxisStep_axises["preceding-sibling"]	= {};

	function fAxisStep_parse (oLexer, oStaticContext) {
		var sAxis	= oLexer.peek(),
			oExpr,
			oStep;
		if (oLexer.peek(1) == '::') {
			if (!(sAxis in hAxisStep_axises))
				throw new cException("XPST0003"
						, "Unknown axis name: " + sAxis
				);

			oLexer.next(2);
			if (oLexer.eof() ||!(oExpr = fNodeTest_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected node test expression in axis step"
				);
					oStep	= new cAxisStep(sAxis, oExpr);
		}
		else
		if (sAxis == '..') {
			oLexer.next();
			oStep	= new cAxisStep("parent", new cKindTest("node"));
		}
		else
		if (sAxis == '@') {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fNodeTest_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected node test expression in axis step"
				);
					oStep	= new cAxisStep("attribute", oExpr);
		}
		else {
			if (oLexer.eof() ||!(oExpr = fNodeTest_parse(oLexer, oStaticContext)))
				return;
			oStep	= new cAxisStep(oExpr instanceof cKindTest && oExpr.name == "attribute" ? "attribute" : "child", oExpr);
		}
			fStepExpr_parsePredicates(oLexer, oStaticContext, oStep);

		return oStep;
	};

	cAxisStep.prototype.evaluate	= function (oContext) {
		var oItem	= oContext.item;

		if (!oContext.DOMAdapter.isNode(oItem))
			throw new cException("XPTY0020");

		var oSequence	= [],
			fGetProperty= oContext.DOMAdapter.getProperty,
			nType		= fGetProperty(oItem, "nodeType");

		switch (this.axis) {
					case "attribute":
				if (nType == 1)
					for (var aAttributes = fGetProperty(oItem, "attributes"), nIndex = 0, nLength = aAttributes.length; nIndex < nLength; nIndex++)
						oSequence.push(aAttributes[nIndex]);
				break;

			case "child":
				for (var oNode = fGetProperty(oItem, "firstChild"); oNode; oNode = fGetProperty(oNode, "nextSibling"))
					oSequence.push(oNode);
				break;

			case "descendant-or-self":
				oSequence.push(oItem);
						case "descendant":
				fAxisStep_getChildrenForward(fGetProperty(oItem, "firstChild"), oSequence, fGetProperty);
				break;

			case "following":
							for (var oParent = oItem, oSibling; oParent; oParent = fGetProperty(oParent, "parentNode"))
					if (oSibling = fGetProperty(oParent, "nextSibling"))
						fAxisStep_getChildrenForward(oSibling, oSequence, fGetProperty);
				break;

			case "following-sibling":
				for (var oNode = oItem; oNode = fGetProperty(oNode, "nextSibling");)
					oSequence.push(oNode);
				break;

			case "self":
				oSequence.push(oItem);
				break;

					case "ancestor-or-self":
				oSequence.push(oItem);
						case "ancestor":
				for (var oNode = nType == 2 ? fGetProperty(oItem, "ownerElement") : oItem; oNode = fGetProperty(oNode, "parentNode");)
					oSequence.push(oNode);
				break;

			case "parent":
				var oParent	= nType == 2 ? fGetProperty(oItem, "ownerElement") : fGetProperty(oItem, "parentNode");
				if (oParent)
					oSequence.push(oParent);
				break;

			case "preceding":
							for (var oParent = oItem, oSibling; oParent; oParent = fGetProperty(oParent, "parentNode"))
					if (oSibling = fGetProperty(oParent, "previousSibling"))
						fAxisStep_getChildrenBackward(oSibling, oSequence, fGetProperty);
				break;

			case "preceding-sibling":
				for (var oNode = oItem; oNode = fGetProperty(oNode, "previousSibling");)
					oSequence.push(oNode);
				break;
		}

			if (oSequence.length && !(this.test instanceof cKindTest && this.test.name == "node")) {
			var oSequence1	= oSequence;
			oSequence	= [];
			for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++) {
				if (this.test.test(oSequence1[nIndex], oContext))
					oSequence.push(oSequence1[nIndex]);
			}
		}

			if (oSequence.length && this.predicates.length)
			oSequence	= this.applyPredicates(oSequence, oContext);

			switch (this.axis) {
			case "ancestor":
			case "ancestor-or-self":
			case "parent":
			case "preceding":
			case "preceding-sibling":
				oSequence.reverse();
		}

		return oSequence;
	};

	function fAxisStep_getChildrenForward(oNode, oSequence, fGetProperty) {
		for (var oChild; oNode; oNode = fGetProperty(oNode, "nextSibling")) {
			oSequence.push(oNode);
			if (oChild = fGetProperty(oNode, "firstChild"))
				fAxisStep_getChildrenForward(oChild, oSequence, fGetProperty);
		}
	};

	function fAxisStep_getChildrenBackward(oNode, oSequence, fGetProperty) {
		for (var oChild; oNode; oNode = fGetProperty(oNode, "previousSibling")) {
			if (oChild = fGetProperty(oNode, "lastChild"))
				fAxisStep_getChildrenBackward(oChild, oSequence, fGetProperty);
			oSequence.push(oNode);
		}
	};


	function cPathExpr() {
		this.items	= [];
	};

	cPathExpr.prototype.items	= null;

	function fPathExpr_parse (oLexer, oStaticContext) {
		if (oLexer.eof())
			return;
		var sSingleSlash	= '/',
			sDoubleSlash	= '/' + '/';

		var oPathExpr	= new cPathExpr(),
			sSlash	= oLexer.peek(),
			oExpr;
			if (sSlash == sDoubleSlash || sSlash == sSingleSlash) {
			oLexer.next();
			oPathExpr.items.push(new cFunctionCall(null, "root", sNS_XPF));
					if (sSlash == sDoubleSlash)
				oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
		}

			if (oLexer.eof() ||!(oExpr = fStepExpr_parse(oLexer, oStaticContext))) {
			if (sSlash == sSingleSlash)
				return oPathExpr.items[0];			if (sSlash == sDoubleSlash)
				throw new cException("XPST0003"
						, "Expected path step expression"
				);
			return;
		}
		oPathExpr.items.push(oExpr);

			while ((sSlash = oLexer.peek()) == sSingleSlash || sSlash == sDoubleSlash) {
			if (sSlash == sDoubleSlash)
				oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
					oLexer.next();
			if (oLexer.eof() ||!(oExpr = fStepExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected path step expression"
				);
					oPathExpr.items.push(oExpr);
		}

		if (oPathExpr.items.length == 1)
			return oPathExpr.items[0];

			return oPathExpr;
	};

	cPathExpr.prototype.evaluate	= function (oContext) {
		var vContextItem	= oContext.item;
			var oSequence	= [vContextItem];
		for (var nItemIndex = 0, nItemLength = this.items.length, oSequence1; nItemIndex < nItemLength; nItemIndex++) {
			oSequence1	= [];
			for (var nIndex = 0, nLength = oSequence.length; nIndex < nLength; nIndex++) {
							oContext.item	= oSequence[nIndex];
							for (var nRightIndex = 0, oSequence2 = this.items[nItemIndex].evaluate(oContext), nRightLength = oSequence2.length; nRightIndex < nRightLength; nRightIndex++)
					if ((nItemIndex < nItemLength - 1) && !oContext.DOMAdapter.isNode(oSequence2[nRightIndex]))
						throw new cException("XPTY0019");
					else
					if (fArray_indexOf(oSequence1, oSequence2[nRightIndex]) ==-1)
						oSequence1.push(oSequence2[nRightIndex]);
			}
			oSequence	= oSequence1;
		};
			oContext.item	= vContextItem;
			return fFunction_sequence_order(oSequence, oContext);
	};


	function cNodeTest() {

	};

	function fNodeTest_parse (oLexer, oStaticContext) {
		if (!oLexer.eof())
			return fKindTest_parse(oLexer, oStaticContext)
				|| fNameTest_parse(oLexer, oStaticContext);
	};


	function cKindTest(sName) {
		this.name	= sName;
		this.args	= [];
	};

	cKindTest.prototype	= new cNodeTest;

	cKindTest.prototype.name	= null;
	cKindTest.prototype.args	= null;

	var hKindTest_names	= {};
	hKindTest_names["document-node"]	= {};
	hKindTest_names["element"]			= {};
	hKindTest_names["attribute"]		= {};
	hKindTest_names["processing-instruction"]	= {};
	hKindTest_names["comment"]			= {};
	hKindTest_names["text"]				= {};
	hKindTest_names["node"]				= {};
	hKindTest_names["schema-element"]	= {};
	hKindTest_names["schema-attribute"]	= {};

	function fKindTest_parse (oLexer, oStaticContext) {
		var sName	= oLexer.peek();
		if (oLexer.peek(1) == '(') {
					if (!(sName in hKindTest_names))
				throw new cException("XPST0003"
						, "Unknown '" + sName + "' kind test"
				);

					oLexer.next(2);
					var oTest	= new cKindTest(sName);
			if (oLexer.peek() != ')') {
				if (sName == "document-node") {
								}
				else
				if (sName == "element") {
								}
				else
				if (sName == "attribute") {
								}
				else
				if (sName == "processing-instruction") {
								}
				else
				if (sName == "schema-attribute") {
								}
				else
				if (sName == "schema-element") {
								}
			}
			else {
				if (sName == "schema-attribute")
					throw new cException("XPST0003"
							, "Expected attribute declaration in 'schema-attribute' kind test"
					);
				else
				if (sName == "schema-element")
					throw new cException("XPST0003"
							, "Expected element declaration in 'schema-element' kind test"
					);
			}

			if (oLexer.peek() != ')')
				throw new cException("XPST0003"
						, "Expected ')' token in kind test"
				);
			oLexer.next();

			return oTest;
		}
	};

	cKindTest.prototype.test	= function (oNode, oContext) {
		var fGetProperty	= oContext.DOMAdapter.getProperty,
			nType	= oContext.DOMAdapter.isNode(oNode) ? fGetProperty(oNode, "nodeType") : 0;
		switch (this.name) {
					case "node":			return !!nType;
			case "attribute":				if (nType != 2)	return false;	break;
			case "document-node":	return nType == 9;
			case "element":			return nType == 1;
			case "processing-instruction":	if (nType != 7)	return false;	break;
			case "comment":			return nType == 8;
			case "text":			return nType == 3 || nType == 4;

					case "schema-attribute":
				throw "KindTest '" + "schema-attribute" + "' not implemented";

			case "schema-element":
				throw "KindTest '" + "schema-element" + "' not implemented";
		}

			if (nType == 2)
			return fGetProperty(oNode, "prefix") != "xmlns" && fGetProperty(oNode, "localName") != "xmlns";
		if (nType == 7)
			return fGetProperty(oNode, "target") != "xml";

		return true;
	};


	function cNameTest(sPrefix, sLocalName, sNameSpaceURI) {
		this.prefix			= sPrefix;
		this.localName		= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
	};

	cNameTest.prototype	= new cNodeTest;

	cNameTest.prototype.prefix			= null;
	cNameTest.prototype.localName		= null;
	cNameTest.prototype.namespaceURI	= null;

	var rNameTest	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;
	function fNameTest_parse (oLexer, oStaticContext) {
		var aMatch	= oLexer.peek().match(rNameTest);
		if (aMatch) {
			if (aMatch[1] == '*' && aMatch[2] == '*')
				throw new cException("XPST0003"
						, "Illegal use of *:* wildcard in name test"
				);
			oLexer.next();
			return new cNameTest(aMatch[1] || null, aMatch[2], aMatch[1] ? aMatch[1] == '*' ? '*' : oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultElementNamespace);
		}
	};

	cNameTest.prototype.test	= function (oNode, oContext) {
		var fGetProperty	= oContext.DOMAdapter.getProperty,
			nType	= fGetProperty(oNode, "nodeType");
		if (nType == 1 || nType == 2) {
			if (this.localName == '*')
				return (nType == 1 || (fGetProperty(oNode, "prefix") != "xmlns" && fGetProperty(oNode, "localName") != "xmlns")) && (!this.prefix || fGetProperty(oNode, "namespaceURI") == this.namespaceURI);
			if (this.localName == fGetProperty(oNode, "localName"))
				return this.namespaceURI == '*' || (nType == 2 && !this.prefix && !fGetProperty(oNode, "prefix")) || fGetProperty(oNode, "namespaceURI") == this.namespaceURI;
		}
			return false;
	};


	function cPrimaryExpr() {

	};

	function fPrimaryExpr_parse (oLexer, oStaticContext) {
		if (!oLexer.eof())
			return fContextItemExpr_parse(oLexer, oStaticContext)
				|| fParenthesizedExpr_parse(oLexer, oStaticContext)
				|| fFunctionCall_parse(oLexer, oStaticContext)
				|| fVarRef_parse(oLexer, oStaticContext)
				|| fLiteral_parse(oLexer, oStaticContext);
	};


	function cParenthesizedExpr(oExpr) {
		this.expression	= oExpr;
	};

	function fParenthesizedExpr_parse (oLexer, oStaticContext) {
		if (oLexer.peek() == '(') {
			oLexer.next();
					var oExpr	= null;
			if (oLexer.peek() != ')')
				oExpr	= fExpr_parse(oLexer, oStaticContext);

					if (oLexer.peek() != ')')
				throw new cException("XPST0003"
						, "Expected ')' token in parenthesized expression"
				);

			oLexer.next();

					return new cParenthesizedExpr(oExpr);
		}
	};

	cParenthesizedExpr.prototype.evaluate	= function (oContext) {
		return this.expression ? this.expression.evaluate(oContext) : [];
	};


	function cContextItemExpr() {

	};

	function fContextItemExpr_parse (oLexer, oStaticContext) {
		if (oLexer.peek() == '.') {
			oLexer.next();
			return new cContextItemExpr;
		}
	};

	cContextItemExpr.prototype.evaluate	= function (oContext) {
		if (oContext.item == null)
			throw new cException("XPDY0002"
					, "Dynamic context does not have context item initialized"
			);
			return [oContext.item];
	};


	function cLiteral() {

	};

	cLiteral.prototype.value	= null;

	function fLiteral_parse (oLexer, oStaticContext) {
		if (!oLexer.eof())
			return fNumericLiteral_parse(oLexer, oStaticContext)
				|| fStringLiteral_parse(oLexer, oStaticContext);
	};

	cLiteral.prototype.evaluate	= function (oContext) {
		return [this.value];
	};


	function cNumericLiteral(oValue) {
		this.value	= oValue;
	};

	cNumericLiteral.prototype	= new cLiteral;

	var rNumericLiteral	= /^[+\-]?(?:(?:(\d+)(?:\.(\d*))?)|(?:\.(\d+)))(?:[eE]([+-])?(\d+))?$/;
	function fNumericLiteral_parse (oLexer, oStaticContext) {
		var sValue	= oLexer.peek(),
			vValue	= fNumericLiteral_parseValue(sValue);
		if (vValue) {
			oLexer.next();
			return new cNumericLiteral(vValue);
		}
	};

	function fNumericLiteral_parseValue(sValue) {
		var aMatch	= sValue.match(rNumericLiteral);
		if (aMatch) {
			var cType	= cXSInteger;
			if (aMatch[5])
				cType	= cXSDouble;
			else
			if (aMatch[2] || aMatch[3])
				cType	= cXSDecimal;
			return new cType(+sValue);
		}
	};


	function cStringLiteral(oValue) {
		this.value	= oValue;
	};

	cStringLiteral.prototype	= new cLiteral;

	var rStringLiteral	= /^'([^']*(?:''[^']*)*)'|"([^"]*(?:""[^"]*)*)"$/;
	function fStringLiteral_parse (oLexer, oStaticContext) {
		var aMatch	= oLexer.peek().match(rStringLiteral);
		if (aMatch) {
			oLexer.next();
			return new cStringLiteral(new cXSString(aMatch[1] ? aMatch[1].replace("''", "'") : aMatch[2] ? aMatch[2].replace('""', '"') : ''));
		}
	};


	function cFilterExpr(oPrimary) {
		this.expression	= oPrimary;
		this.predicates	= [];
	};

	cFilterExpr.prototype	= new cStepExpr;

	cFilterExpr.prototype.expression	= null;

	function fFilterExpr_parse (oLexer, oStaticContext) {
		var oExpr;
		if (oLexer.eof() ||!(oExpr = fPrimaryExpr_parse(oLexer, oStaticContext)))
			return;

		var oFilterExpr	= new cFilterExpr(oExpr);
			fStepExpr_parsePredicates(oLexer, oStaticContext, oFilterExpr);

			if (oFilterExpr.predicates.length == 0)
			return oFilterExpr.expression;

		return oFilterExpr;
	};

	cFilterExpr.prototype.evaluate	= function (oContext) {
		var oSequence	= this.expression.evaluate(oContext);
		if (this.predicates.length && oSequence.length)
			oSequence	= this.applyPredicates(oSequence, oContext);
		return oSequence;
	};


	function cVarRef(sPrefix, sLocalName, sNameSpaceURI) {
		this.prefix			= sPrefix;
		this.localName		= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
	};

	cVarRef.prototype.prefix		= null;
	cVarRef.prototype.localName		= null;
	cVarRef.prototype.namespaceURI	= null;

	function fVarRef_parse (oLexer, oStaticContext) {
		if (oLexer.peek().substr(0, 1) == '$') {
			var aMatch	= oLexer.peek().substr(1).match(rNameTest);
			if (aMatch) {
				if (aMatch[1] == '*' || aMatch[2] == '*')
					throw new cException("XPST0003"
								, "Illegal use of wildcard in var expression variable name"
						);

				var oVarRef	= new cVarRef(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
				oLexer.next();
				return oVarRef;
			}
		}
	};

	cVarRef.prototype.evaluate	= function (oContext) {
		var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName;
		if (oContext.scope.hasOwnProperty(sUri))
			return [oContext.scope[sUri]];
			throw new cException("XPST0008"
				, "Variable $" + (this.prefix ? this.prefix + ':' : '') + this.localName + " has not been declared"
		);
	};


	function cFunctionCall(sPrefix, sLocalName, sNameSpaceURI) {
		this.prefix			= sPrefix;
		this.localName		= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
		this.args	= [];
	};

	cFunctionCall.prototype.prefix			= null;
	cFunctionCall.prototype.localName		= null;
	cFunctionCall.prototype.namespaceURI	= null;
	cFunctionCall.prototype.args	= null;

	function fFunctionCall_parse (oLexer, oStaticContext) {
		var aMatch	= oLexer.peek().match(rNameTest);
		if (aMatch && oLexer.peek(1) == '(') {
					if (!aMatch[1] && (aMatch[2] in hKindTest_names))
				return fAxisStep_parse(oLexer, oStaticContext);
					if (aMatch[1] == '*' || aMatch[2] == '*')
				throw new cException("XPST0003"
						, "Illegal use of wildcard in function name"
				);
			var oFunctionCallExpr	= new cFunctionCall(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultFunctionNamespace),
				oExpr;
			oLexer.next(2);
					if (oLexer.peek() != ')') {
				do {
					if (oLexer.eof() ||!(oExpr = fExprSingle_parse(oLexer, oStaticContext)))
						throw new cException("XPST0003"
								, "Expected function call argument"
						);
									oFunctionCallExpr.args.push(oExpr);
				}
				while (oLexer.peek() == ',' && oLexer.next());
							if (oLexer.peek() != ')')
					throw new cException("XPST0003"
							, "Expected ')' token in function call"
					);
			}
			oLexer.next();
			return oFunctionCallExpr;
		}
	};

	cFunctionCall.prototype.evaluate	= function (oContext) {
		var aArguments	= [],
			aParameters,
			fFunction;

			for (var nIndex = 0, nLength = this.args.length; nIndex < nLength; nIndex++)
			aArguments.push(this.args[nIndex].evaluate(oContext));

		var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName;
			if (this.namespaceURI == sNS_XPF) {
			if (fFunction = hStaticContext_functions[this.localName]) {
							if (aParameters = hStaticContext_signatures[this.localName])
					fFunctionCall_prepare(this.localName, aParameters, fFunction, aArguments, oContext);
							var vResult	= fFunction.apply(oContext, aArguments);
							return vResult == null ? [] : vResult instanceof cArray ? vResult : [vResult];
			}
			throw new cException("XPST0017"
					, "Unknown system function: " + sUri + '()'
			);
		}
		else
		if (this.namespaceURI == sNS_XSD) {
			if ((fFunction = hStaticContext_dataTypes[this.localName]) && this.localName != "NOTATION" && this.localName != "anyAtomicType") {
							fFunctionCall_prepare(this.localName, [[cXSAnyAtomicType]], fFunction, aArguments, oContext);
							return [fFunction.cast(aArguments[0])];
			}
			throw new cException("XPST0017"
					, "Unknown type constructor function: " + sUri + '()'
			);
		}
		else
		if (fFunction = oContext.staticContext.getFunction(sUri)) {
					var vResult	= fFunction.apply(oContext, aArguments);
					return vResult == null ? [] : vResult instanceof cArray ? vResult : [vResult];
		}
			throw new cException("XPST0017"
				, "Unknown user function: " + sUri + '()'
		);
	};

	var aFunctionCall_numbers	= ["first", "second", "third", "fourth", "fifth"];
	function fFunctionCall_prepare(sName, aParameters, fFunction, aArguments, oContext) {
		var oArgument,
			nArgumentsLength	= aArguments.length,
			oParameter,
			nParametersLength	= aParameters.length,
			nParametersRequired	= 0;

			while ((nParametersRequired < aParameters.length) && !aParameters[nParametersRequired][2])
			nParametersRequired++;

			if (nArgumentsLength > nParametersLength)
			throw new cException("XPST0017"
					, "Function " + sName + "() must have " + (nParametersLength ? " no more than " : '') + nParametersLength + " argument" + (nParametersLength > 1 || !nParametersLength ? 's' : '')
			);
		else
		if (nArgumentsLength < nParametersRequired)
			throw new cException("XPST0017"
					, "Function " + sName + "() must have " + (nParametersRequired == nParametersLength ? "exactly" : "at least") + ' ' + nParametersRequired + " argument" + (nParametersLength > 1 ? 's' : '')
			);

		for (var nIndex = 0; nIndex < nArgumentsLength; nIndex++) {
			oParameter	= aParameters[nIndex];
			oArgument	= aArguments[nIndex];
					fFunctionCall_assertSequenceCardinality(oContext, oArgument, oParameter[1]
					, aFunctionCall_numbers[nIndex] + " argument of " + sName + '()'
			);
					fFunctionCall_assertSequenceItemType(oContext, oArgument, oParameter[0]
					, aFunctionCall_numbers[nIndex] + " argument of " + sName + '()'
			);
			if (oParameter[1] != '+' && oParameter[1] != '*')
				aArguments[nIndex]	= oArgument.length ? oArgument[0] : null;
		}
	};

	function fFunctionCall_assertSequenceItemType(oContext, oSequence, cItemType
			, sSource
		) {
			for (var nIndex = 0, nLength = oSequence.length, nNodeType, vItem; nIndex < nLength; nIndex++) {
			vItem	= oSequence[nIndex];
					if (cItemType == cXTNode || cItemType.prototype instanceof cXTNode) {
							if (!oContext.DOMAdapter.isNode(vItem))
					throw new cException("XPTY0004"
							, "Required item type of " + sSource + " is " + cItemType
					);

							if (cItemType != cXTNode) {
					nNodeType	= oContext.DOMAdapter.getProperty(vItem, "nodeType");
					if ([null, cXTElement, cXTAttribute, cXTText, cXTText, null, null, cXTProcessingInstruction, cXTComment, cXTDocument, null, null, null][nNodeType] != cItemType)
						throw new cException("XPTY0004"
								, "Required item type of " + sSource + " is " + cItemType
						);
				}
			}
			else
					if (cItemType == cXSAnyAtomicType || cItemType.prototype instanceof cXSAnyAtomicType) {
							vItem	= fFunction_sequence_atomize([vItem], oContext)[0];
							if (cItemType != cXSAnyAtomicType) {
									if (vItem instanceof cXSUntypedAtomic)
						vItem	= cItemType.cast(vItem);
									else
					if (cItemType == cXSString) {
						if (vItem instanceof cXSAnyURI)
							vItem	= cXSString.cast(vItem);
					}
					else
					if (cItemType == cXSDouble) {
						if (fXSAnyAtomicType_isNumeric(vItem))
							vItem	= cItemType.cast(vItem);
					}
				}
							if (!(vItem instanceof cItemType))
					throw new cException("XPTY0004"
							, "Required item type of " + sSource + " is " + cItemType
					);
							oSequence[nIndex]	= vItem;
			}
		}
	};

	function fFunctionCall_assertSequenceCardinality(oContext, oSequence, sCardinality
			, sSource
		) {
		var nLength	= oSequence.length;
			if (sCardinality == '?') {			if (nLength > 1)
				throw new cException("XPTY0004"
						, "Required cardinality of " + sSource + " is one or zero"
				);
		}
		else
		if (sCardinality == '+') {			if (nLength < 1)
				throw new cException("XPTY0004"
						, "Required cardinality of " + sSource + " is one or more"
				);
		}
		else
		if (sCardinality != '*') {			if (nLength != 1)
				throw new cException("XPTY0004"
						, "Required cardinality of " + sSource + " is exactly one"
				);
		}
	};


	function cIntersectExceptExpr(oExpr) {
		this.left	= oExpr;
		this.items	= [];
	};

	cIntersectExceptExpr.prototype.left		= null;
	cIntersectExceptExpr.prototype.items	= null;

	function fIntersectExceptExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			sOperator;
		if (oLexer.eof() ||!(oExpr = fInstanceofExpr_parse(oLexer, oStaticContext)))
			return;
		if (!((sOperator = oLexer.peek()) == "intersect" || sOperator == "except"))
			return oExpr;

			var oIntersectExceptExpr	= new cIntersectExceptExpr(oExpr);
		while ((sOperator = oLexer.peek()) == "intersect" || sOperator == "except") {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fInstanceofExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected second operand in " + sOperator + " expression"
				);
			oIntersectExceptExpr.items.push([sOperator, oExpr]);
		}
		return oIntersectExceptExpr;
	};

	cIntersectExceptExpr.prototype.evaluate	= function (oContext) {
		var oSequence	= this.left.evaluate(oContext);
		for (var nIndex = 0, nLength = this.items.length, oItem; nIndex < nLength; nIndex++)
			oSequence	= hStaticContext_operators[(oItem = this.items[nIndex])[0]].call(oContext, oSequence, oItem[1].evaluate(oContext));
		return oSequence;
	};


	function cRangeExpr(oLeft, oRight) {
		this.left	= oLeft;
		this.right	= oRight;
	};

	cRangeExpr.prototype.left	= null;
	cRangeExpr.prototype.right	= null;

	function fRangeExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			oRight;
		if (oLexer.eof() ||!(oExpr = fAdditiveExpr_parse(oLexer, oStaticContext)))
			return;
		if (oLexer.peek() != "to")
			return oExpr;

			oLexer.next();
		if (oLexer.eof() ||!(oRight = fAdditiveExpr_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected second operand in range expression"
			);
		return new cRangeExpr(oExpr, oRight);
	};

	cRangeExpr.prototype.evaluate	= function (oContext) {
			var oLeft	= this.left.evaluate(oContext);
		if (!oLeft.length)
			return [];
			var sSource	= "first operand of 'to'";

		fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
				, sSource
		);
		fFunctionCall_assertSequenceItemType(oContext, oLeft, cXSInteger
				, sSource
		);

		var oRight	= this.right.evaluate(oContext);
		if (!oRight.length)
			return [];

		sSource	= "second operand of 'to'";

		fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
				, sSource
		);
		fFunctionCall_assertSequenceItemType(oContext, oRight, cXSInteger
				, sSource
		);

		return hStaticContext_operators["to"].call(oContext, oLeft[0], oRight[0]);
	};


	function cUnionExpr(oExpr) {
		this.left	= oExpr;
		this.items	= [];
	};

	cUnionExpr.prototype.left	= null;
	cUnionExpr.prototype.items	= null;

	function fUnionExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			sOperator;
		if (oLexer.eof() ||!(oExpr = fIntersectExceptExpr_parse(oLexer, oStaticContext)))
			return;
		if (!((sOperator = oLexer.peek()) == '|' || sOperator == "union"))
			return oExpr;

			var oUnionExpr	= new cUnionExpr(oExpr);
		while ((sOperator = oLexer.peek()) == '|' || sOperator == "union") {
			oLexer.next();
			if (oLexer.eof() ||!(oExpr = fIntersectExceptExpr_parse(oLexer, oStaticContext)))
				throw new cException("XPST0003"
						, "Expected second operand in union expression"
				);
			oUnionExpr.items.push(oExpr);
		}
		return oUnionExpr;
	};

	cUnionExpr.prototype.evaluate	= function (oContext) {
		var oSequence	= this.left.evaluate(oContext);
		for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
			oSequence	= hStaticContext_operators["union"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
		return oSequence;
	};


	function cInstanceofExpr(oExpr, oType) {
		this.expression	= oExpr;
		this.type		= oType;
	};

	cInstanceofExpr.prototype.expression	= null;
	cInstanceofExpr.prototype.type			= null;

	function fInstanceofExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			oType;
		if (oLexer.eof() ||!(oExpr = fTreatExpr_parse(oLexer, oStaticContext)))
			return;

		if (!(oLexer.peek() == "instance" && oLexer.peek(1) == "of"))
			return oExpr;

		oLexer.next(2);
		if (oLexer.eof() ||!(oType = fSequenceType_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected second operand in instance of expression"
			);

		return new cInstanceofExpr(oExpr, oType);
	};

	cInstanceofExpr.prototype.evaluate	= function(oContext) {
		var oSequence1	= this.expression.evaluate(oContext),
			oItemType	= this.type.itemType,
			sOccurence	= this.type.occurence;
			if (!oItemType)
			return [new cXSBoolean(!oSequence1.length)];
			if (!oSequence1.length)
			return [new cXSBoolean(sOccurence == '?' || sOccurence == '*')];
		if (oSequence1.length != 1)
			if (!(sOccurence == '+' || sOccurence == '*'))
				return [new cXSBoolean(false)];

			if (!oItemType.test)			return [new cXSBoolean(true)];

		var bValue	= true;
		for (var nIndex = 0, nLength = oSequence1.length; (nIndex < nLength) && bValue; nIndex++)
			bValue	= oItemType.test.test(oSequence1[nIndex], oContext);
			return [new cXSBoolean(bValue)];
	};


	function cTreatExpr(oExpr, oType) {
		this.expression	= oExpr;
		this.type		= oType;
	};

	cTreatExpr.prototype.expression	= null;
	cTreatExpr.prototype.type		= null;

	function fTreatExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			oType;
		if (oLexer.eof() ||!(oExpr = fCastableExpr_parse(oLexer, oStaticContext)))
			return;

		if (!(oLexer.peek() == "treat" && oLexer.peek(1) == "as"))
			return oExpr;

		oLexer.next(2);
		if (oLexer.eof() ||!(oType = fSequenceType_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected second operand in treat expression"
			);

		return new cTreatExpr(oExpr, oType);
	};

	cTreatExpr.prototype.evaluate	= function(oContext) {
		var oSequence1	= this.expression.evaluate(oContext),
			oItemType	= this.type.itemType,
			sOccurence	= this.type.occurence;
			if (!oItemType) {
			if (oSequence1.length)
				throw new cException("XPDY0050"
						, "The only value allowed for the value in 'treat as' expression is an empty sequence"
				);
			return oSequence1;
		}

			if (!(sOccurence == '?' || sOccurence == '*'))
			if (!oSequence1.length)
				throw new cException("XPDY0050"
						, "An empty sequence is not allowed as the value in 'treat as' expression"
				);

		if (!(sOccurence == '+' || sOccurence == '*'))
			if (oSequence1.length != 1)
				throw new cException("XPDY0050"
						, "A sequence of more than one item is not allowed as the value in 'treat as' expression"
				);

			if (!oItemType.test)			return oSequence1;

		for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++)
			if (!oItemType.test.test(oSequence1[nIndex], oContext))
				throw new cException("XPDY0050"
						, "Required item type of value in 'treat as' expression is " + (oItemType.test.prefix ? oItemType.test.prefix + ':' : '') + oItemType.test.localName
									);

			return oSequence1;
	};


	function cCastableExpr(oExpr, oType) {
		this.expression	= oExpr;
		this.type		= oType;
	};

	cCastableExpr.prototype.expression	= null;
	cCastableExpr.prototype.type		= null;

	function fCastableExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			oType;
		if (oLexer.eof() ||!(oExpr = fCastExpr_parse(oLexer, oStaticContext)))
			return;

		if (!(oLexer.peek() == "castable" && oLexer.peek(1) == "as"))
			return oExpr;

		oLexer.next(2);
		if (oLexer.eof() ||!(oType = fSingleType_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected second operand in castable expression"
			);

		return new cCastableExpr(oExpr, oType);
	};

	cCastableExpr.prototype.evaluate	= function(oContext) {
		var oSequence1	= this.expression.evaluate(oContext),
			oItemType	= this.type.itemType,
			sOccurence	= this.type.occurence;

		if (oSequence1.length > 1)
			return [new cXSBoolean(false)];
		else
		if (!oSequence1.length)
			return [new cXSBoolean(sOccurence == '?')];

			try {
			oItemType.cast(fFunction_sequence_atomize(oSequence1, oContext)[0]);
		}
		catch (e) {
			if (e.code == "XPST0051")
				throw e;
			if (e.code == "XPST0017")
				throw new cException("XPST0080"
						, "No value is castable to " + (oItemType.prefix ? oItemType.prefix + ':' : '') + oItemType.localName
				);
					return [new cXSBoolean(false)];
		}

		return [new cXSBoolean(true)];
	};


	function cCastExpr(oExpr, oType) {
		this.expression	= oExpr;
		this.type		= oType;
	};

	cCastExpr.prototype.expression	= null;
	cCastExpr.prototype.type		= null;

	function fCastExpr_parse (oLexer, oStaticContext) {
		var oExpr,
			oType;
		if (oLexer.eof() ||!(oExpr = fUnaryExpr_parse(oLexer, oStaticContext)))
			return;

		if (!(oLexer.peek() == "cast" && oLexer.peek(1) == "as"))
			return oExpr;

		oLexer.next(2);
		if (oLexer.eof() ||!(oType = fSingleType_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
					, "Expected second operand in cast expression"
			);

		return new cCastExpr(oExpr, oType);
	};

	cCastExpr.prototype.evaluate	= function(oContext) {
		var oSequence1	= this.expression.evaluate(oContext);
			fFunctionCall_assertSequenceCardinality(oContext, oSequence1, this.type.occurence
				, "'cast as' expression operand"
		);
			if (!oSequence1.length)
			return [];
			return [this.type.itemType.cast(fFunction_sequence_atomize(oSequence1, oContext)[0], oContext)];
	};


	function cAtomicType(sPrefix, sLocalName, sNameSpaceURI) {
		this.prefix			= sPrefix;
		this.localName		= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
	};

	cAtomicType.prototype.prefix		= null;
	cAtomicType.prototype.localName		= null;
	cAtomicType.prototype.namespaceURI	= null;

	function fAtomicType_parse (oLexer, oStaticContext) {
		var aMatch	= oLexer.peek().match(rNameTest);
		if (aMatch) {
			if (aMatch[1] == '*' || aMatch[2] == '*')
				throw new cException("XPST0003"
						, "Illegal use of wildcard in type name"
				);
			oLexer.next();
			return new cAtomicType(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
		}
	};

	cAtomicType.prototype.test	= function(vItem, oContext) {
			var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName,
			cType	= this.namespaceURI == sNS_XSD ? hStaticContext_dataTypes[this.localName] : oContext.staticContext.getDataType(sUri);
		if (cType)
			return vItem instanceof cType;
			throw new cException("XPST0051"
				, "Unknown simple type " + (this.prefix ? this.prefix + ':' : '') + this.localName
		);
	};

	cAtomicType.prototype.cast	= function(vItem, oContext) {
			var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName,
			cType	= this.namespaceURI == sNS_XSD ? hStaticContext_dataTypes[this.localName] : oContext.staticContext.getDataType(sUri);
		if (cType)
			return cType.cast(vItem);
			throw new cException("XPST0051"
				, "Unknown atomic type " + (this.prefix ? this.prefix + ':' : '') + this.localName
		);
	};


	function cItemType(oTest) {
		this.test	= oTest;
	};

	cItemType.prototype.test	= null;

	function fItemType_parse (oLexer, oStaticContext) {
		if (oLexer.eof())
			return;

		var oExpr;
		if (oLexer.peek() == "item" && oLexer.peek(1) == '(') {
			oLexer.next(2);
			if (oLexer.peek() != ')')
				throw new cException("XPST0003"
						, "Expected ')' token in item type expression"
				);
			oLexer.next();
			return new cItemType;
		}
			if (oExpr = fKindTest_parse(oLexer, oStaticContext))
			return new cItemType(oExpr);
		if (oExpr = fAtomicType_parse(oLexer, oStaticContext))
			return new cItemType(oExpr);
	};


	function cSequenceType(oItemType, sOccurence) {
		this.itemType	= oItemType	|| null;
		this.occurence	= sOccurence|| null;
	};

	cSequenceType.prototype.itemType	= null;
	cSequenceType.prototype.occurence	= null;

	function fSequenceType_parse (oLexer, oStaticContext) {
		if (oLexer.eof())
			return;

		if (oLexer.peek() == "empty-sequence" && oLexer.peek(1) == '(') {
			oLexer.next(2);
			if (oLexer.peek() != ')')
				throw new cException("XPST0003"
						, "Expected ')' token in sequence type"
				);
			oLexer.next();
			return new cSequenceType;		}

		var oExpr,
			sOccurence;
		if (!oLexer.eof() && (oExpr = fItemType_parse(oLexer, oStaticContext))) {
			sOccurence	= oLexer.peek();
			if (sOccurence == '?' || sOccurence == '*' || sOccurence == '+')
				oLexer.next();
			else
				sOccurence	= null;

			return new cSequenceType(oExpr, sOccurence);
		}
	};


	function cSingleType(oItemType, sOccurence) {
		this.itemType	= oItemType	|| null;
		this.occurence	= sOccurence|| null;
	};

	cSingleType.prototype.itemType	= null;
	cSingleType.prototype.occurence	= null;

	function fSingleType_parse (oLexer, oStaticContext) {
		var oExpr,
			sOccurence;
		if (!oLexer.eof() && (oExpr = fAtomicType_parse(oLexer, oStaticContext))) {
			sOccurence	= oLexer.peek();
			if (sOccurence == '?')
				oLexer.next();
			else
				sOccurence	= null;

			return new cSingleType(oExpr, sOccurence);
		}
	};


	function cXSAnyType() {

	};

	cXSAnyType.prototype.builtInKind	= cXSConstants.ANYTYPE_DT;


	function cXSAnySimpleType() {

	};

	cXSAnySimpleType.prototype	= new cXSAnyType;

	cXSAnySimpleType.prototype.builtInKind	= cXSConstants.ANYSIMPLETYPE_DT;
	cXSAnySimpleType.prototype.primitiveKind= null;

	cXSAnySimpleType.PRIMITIVE_ANYURI		= "anyURI";		cXSAnySimpleType.PRIMITIVE_BASE64BINARY	= "base64Binary";	cXSAnySimpleType.PRIMITIVE_BOOLEAN		= "boolean";	cXSAnySimpleType.PRIMITIVE_DATE			= "date";		cXSAnySimpleType.PRIMITIVE_DATETIME		= "dateTime";	cXSAnySimpleType.PRIMITIVE_DECIMAL		= "decimal";	cXSAnySimpleType.PRIMITIVE_DOUBLE		= "double";		cXSAnySimpleType.PRIMITIVE_DURATION		= "duration";	cXSAnySimpleType.PRIMITIVE_FLOAT		= "float";		cXSAnySimpleType.PRIMITIVE_GDAY			= "gDay";		cXSAnySimpleType.PRIMITIVE_GMONTH		= "gMonth";		cXSAnySimpleType.PRIMITIVE_GMONTHDAY	= "gMonthDay";	cXSAnySimpleType.PRIMITIVE_GYEAR		= "gYear";		cXSAnySimpleType.PRIMITIVE_GYEARMONTH	= "gYearMonth";	cXSAnySimpleType.PRIMITIVE_HEXBINARY	= "hexBinary";	cXSAnySimpleType.PRIMITIVE_NOTATION		= "NOTATION";	cXSAnySimpleType.PRIMITIVE_QNAME		= "QName";		cXSAnySimpleType.PRIMITIVE_STRING		= "string";		cXSAnySimpleType.PRIMITIVE_TIME			= "time";		

	function cXSAnyAtomicType() {

	};

	cXSAnyAtomicType.prototype	= new cXSAnySimpleType;
	cXSAnyAtomicType.prototype.builtInKind	= cXSConstants.ANYATOMICTYPE_DT;

	cXSAnyAtomicType.cast	= function(vValue) {
		throw new cException("XPST0017"
				, "Abstract type used in constructor function xs:anyAtomicType"
		);	};

	function fXSAnyAtomicType_isNumeric(vItem) {
		return vItem instanceof cXSFloat || vItem instanceof cXSDouble || vItem instanceof cXSDecimal;
	};

	fStaticContext_defineSystemDataType("anyAtomicType",	cXSAnyAtomicType);


	function cXSAnyURI(sScheme, sAuthority, sPath, sQuery, sFragment) {
		this.scheme		= sScheme;
		this.authority	= sAuthority;
		this.path		= sPath;
		this.query		= sQuery;
		this.fragment	= sFragment;
	};

	cXSAnyURI.prototype	= new cXSAnyAtomicType;
	cXSAnyURI.prototype.builtInKind		= cXSConstants.ANYURI_DT;
	cXSAnyURI.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_ANYURI;

	cXSAnyURI.prototype.scheme		= null;
	cXSAnyURI.prototype.authority	= null;
	cXSAnyURI.prototype.path		= null;
	cXSAnyURI.prototype.query		= null;
	cXSAnyURI.prototype.fragment	= null;

	cXSAnyURI.prototype.toString	= function() {
		return (this.scheme ? this.scheme + ':' : '')
				+ (this.authority ? '/' + '/' + this.authority : '')
				+ (this.path ? this.path : '')
				+ (this.query ? '?' + this.query : '')
				+ (this.fragment ? '#' + this.fragment : '');
	};

	var rXSAnyURI	= /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;	cXSAnyURI.cast	= function(vValue) {
		if (vValue instanceof cXSAnyURI)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch;
			if (aMatch = fString_trim(vValue).match(rXSAnyURI))
				return new cXSAnyURI(aMatch[2], aMatch[4], aMatch[5], aMatch[7], aMatch[9]);
			throw new cException("FORG0001");
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:anyURI can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("anyURI",	cXSAnyURI);


	function cXSBase64Binary(sValue) {
		this.value	= sValue;
	};

	cXSBase64Binary.prototype	= new cXSAnyAtomicType;
	cXSBase64Binary.prototype.builtInKind	= cXSConstants.BASE64BINARY_DT;
	cXSBase64Binary.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_BASE64BINARY;

	cXSBase64Binary.prototype.value	= null;

	cXSBase64Binary.prototype.valueOf	= function() {
		return this.value;
	};

	cXSBase64Binary.prototype.toString	= function() {
		return this.value;
	};

	var rXSBase64Binary		= /^((([A-Za-z0-9+\/]\s*){4})*(([A-Za-z0-9+\/]\s*){3}[A-Za-z0-9+\/]|([A-Za-z0-9+\/]\s*){2}[AEIMQUYcgkosw048]\s*=|[A-Za-z0-9+\/]\s*[AQgw]\s*=\s*=))?$/;
	cXSBase64Binary.cast	= function(vValue) {
		if (vValue instanceof cXSBase64Binary)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSBase64Binary);
			if (aMatch)
				return new cXSBase64Binary(aMatch[0]);
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSHexBinary) {
			var aMatch	= vValue.valueOf().match(/.{2}/g),
				aValue	= [];
			for (var nIndex = 0, nLength = aMatch.length; nIndex < nLength; nIndex++)
				aValue.push(cString.fromCharCode(fWindow_parseInt(aMatch[nIndex], 16)));
			return new cXSBase64Binary(fWindow_btoa(aValue.join('')));
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:hexBinary can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("base64Binary",	cXSBase64Binary);


	function cXSBoolean(bValue) {
		this.value	= bValue;
	};

	cXSBoolean.prototype	= new cXSAnyAtomicType;
	cXSBoolean.prototype.builtInKind	= cXSConstants.BOOLEAN_DT;
	cXSBoolean.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_BOOLEAN;

	cXSBoolean.prototype.value	= null;

	cXSBoolean.prototype.valueOf	= function() {
		return this.value;
	};

	cXSBoolean.prototype.toString	= function() {
		return cString(this.value);
	};

	var rXSBoolean	= /^(0|1|true|false)$/;
	cXSBoolean.cast	= function(vValue) {
		if (vValue instanceof cXSBoolean)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch;
			if (aMatch = fString_trim(vValue).match(rXSBoolean))
				return new cXSBoolean(aMatch[1] == '1' || aMatch[1] == "true");
			throw new cException("FORG0001");
		}
		if (fXSAnyAtomicType_isNumeric(vValue))
			return new cXSBoolean(vValue != 0);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:boolean can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("boolean",	cXSBoolean);


	function cXSDate(nYear, nMonth, nDay, nTimezone, bNegative) {
		this.year		= nYear;
		this.month		= nMonth;
		this.day		= nDay;
		this.timezone	= nTimezone;
		this.negative	= bNegative;
	};

	cXSDate.prototype	= new cXSAnyAtomicType;
	cXSDate.prototype.builtInKind	= cXSConstants.DATE_DT;
	cXSDate.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DATE;

	cXSDate.prototype.year		= null;
	cXSDate.prototype.month		= null;
	cXSDate.prototype.day		= null;
	cXSDate.prototype.timezone	= null;
	cXSDate.prototype.negative	= null;

	cXSDate.prototype.toString	= function() {
		return fXSDateTime_getDateComponent(this)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSDate		= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSDate.cast	= function(vValue) {
		if (vValue instanceof cXSDate)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSDate);
			if (aMatch) {
				var nYear	= +aMatch[2],
					nMonth	= +aMatch[3],
					nDay	= +aMatch[4];
				if (nDay - 1 < fXSDate_getDaysForYearMonth(nYear, nMonth))
					return new cXSDate( nYear,
										nMonth,
										nDay,
										aMatch[5] ? aMatch[5] == 'Z' ? 0 : (aMatch[6] == '-' ? -1 : 1) * (aMatch[7] * 60 + aMatch[8] * 1) : null,
										aMatch[1] == '-'
					);
							throw new cException("FORG0001"
						, "Invalid date '" + vValue + "' (Non-existent date)"
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDateTime)
			return new cXSDate(vValue.year, vValue.month, vValue.day, vValue.timezone, vValue.negative);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:date can never succeed"
		);
	};

	var aXSDate_days	= [31,28,31,30,31,30,31,31,30,31,30,31];
	function fXSDate_getDaysForYearMonth(nYear, nMonth) {
		return nMonth == 2 && (nYear % 400 == 0 || nYear % 100 != 0 && nYear % 4 == 0) ? 29 : aXSDate_days[nMonth - 1];
	};

	function fXSDate_normalize(oValue, bDay) {
			if (!bDay) {
			var nDay	= fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
			if (oValue.day > nDay) {
				while (oValue.day > nDay) {
					oValue.month	+= 1;
					if (oValue.month > 12) {
						oValue.year		+= 1;
						if (oValue.year == 0)
							oValue.year	= 1;
						oValue.month	= 1;
					}
					oValue.day	-= nDay;
					nDay = fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
				}
			}
			else
			if (oValue.day < 1) {
				while (oValue.day < 1) {
					oValue.month	-= 1;
					if (oValue.month < 1) {
						oValue.year		-= 1;
						if (oValue.year == 0)
							oValue.year	=-1;
						oValue.month	= 12;
					}
					nDay = fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
					oValue.day	+= nDay;
				}
			}
		}
			if (oValue.month > 12) {
			oValue.year		+= ~~(oValue.month / 12);
			if (oValue.year == 0)
				oValue.year	= 1;
			oValue.month	= oValue.month % 12;
		}
		else
		if (oValue.month < 1) {
			oValue.year		+= ~~(oValue.month / 12) - 1;
			if (oValue.year == 0)
				oValue.year	=-1;
			oValue.month	= oValue.month % 12 + 12;
		}

		return oValue;
	};

	fStaticContext_defineSystemDataType("date",	cXSDate);


	function cXSDateTime(nYear, nMonth, nDay, nHours, nMinutes, nSeconds, nTimezone, bNegative) {
		this.year	= nYear;
		this.month	= nMonth;
		this.day	= nDay;
		this.hours	= nHours;
		this.minutes	= nMinutes;
		this.seconds	= nSeconds;
		this.timezone	= nTimezone;
		this.negative	= bNegative;
	};

	cXSDateTime.prototype	= new cXSAnyAtomicType;
	cXSDateTime.prototype.builtInKind	= cXSConstants.DATETIME_DT;
	cXSDateTime.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DATETIME;

	cXSDateTime.prototype.year		= null;
	cXSDateTime.prototype.month		= null;
	cXSDateTime.prototype.day		= null;
	cXSDateTime.prototype.hours		= null;
	cXSDateTime.prototype.minutes	= null;
	cXSDateTime.prototype.seconds	= null;
	cXSDateTime.prototype.timezone	= null;
	cXSDateTime.prototype.negative	= null;

	cXSDateTime.prototype.toString	= function() {
		return fXSDateTime_getDateComponent(this)
				+ 'T'
				+ fXSDateTime_getTimeComponent(this)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSDateTime		= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSDateTime.cast	= function(vValue) {
		if (vValue instanceof cXSDateTime)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSDateTime);
			if (aMatch) {
				var nYear	= +aMatch[2],
					nMonth	= +aMatch[3],
					nDay	= +aMatch[4],
					bValue	= !!aMatch[10];
				if (nDay - 1 < fXSDate_getDaysForYearMonth(nYear, nMonth))
					return fXSDateTime_normalize(new cXSDateTime( nYear,
											nMonth,
											nDay,
											bValue ? 24 : +aMatch[6],
											bValue ? 0 : +aMatch[7],
											cNumber((bValue ? 0 : aMatch[8]) + '.' + (bValue ? 0 : aMatch[9] || 0)),
											aMatch[12] ? aMatch[12] == 'Z' ? 0 : (aMatch[13] == '-' ? -1 : 1) * (aMatch[14] * 60 + aMatch[15] * 1) : null,
											aMatch[1] == '-'
					));
							throw new cException("FORG0001"
						, "Invalid date '" + vValue + "' (Non-existent date)"
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDate)
			return new cXSDateTime(vValue.year, vValue.month, vValue.day, 0, 0, 0, vValue.timezone, vValue.negative);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:dateTime can never succeed"
		);
	};

	function fXSDateTime_pad(vValue, nLength) {
		var sValue	= cString(vValue);
		if (arguments.length < 2)
			nLength	= 2;
		return (sValue.length < nLength + 1 ? new cArray(nLength + 1 - sValue.length).join('0') : '') + sValue;
	};

	function fXSDateTime_getTZComponent(oDateTime) {
		var nTimezone	= oDateTime.timezone;
		return nTimezone == null
				? ''
				: nTimezone
					? (nTimezone > 0 ? '+' : '-')
						+ fXSDateTime_pad(cMath.abs(~~(nTimezone / 60)))
						+ ':'
						+ fXSDateTime_pad(cMath.abs(nTimezone % 60))
					: 'Z';
	};

	function fXSDateTime_getDateComponent(oDateTime) {
		return (oDateTime.negative ? '-' : '')
				+ fXSDateTime_pad(oDateTime.year, 4)
				+ '-' + fXSDateTime_pad(oDateTime.month)
				+ '-' + fXSDateTime_pad(oDateTime.day);
	};

	function fXSDateTime_getTimeComponent(oDateTime) {
		var aValue	= cString(oDateTime.seconds).split('.');
		return fXSDateTime_pad(oDateTime.hours)
				+ ':' + fXSDateTime_pad(oDateTime.minutes)
				+ ':' + fXSDateTime_pad(aValue[0])
				+ (aValue.length > 1 ? '.' + aValue[1] : '');
	};

	function fXSDateTime_normalize(oValue) {
		return fXSDate_normalize(fXSTime_normalize(oValue));
	};

	fStaticContext_defineSystemDataType("dateTime",	cXSDateTime);


	function cXSDecimal(nValue) {
		this.value	= nValue;
	};

	cXSDecimal.prototype	= new cXSAnyAtomicType;
	cXSDecimal.prototype.builtInKind	= cXSConstants.DECIMAL_DT;
	cXSDecimal.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DECIMAL;

	cXSDecimal.prototype.value	= null;

	cXSDecimal.prototype.valueOf	= function() {
		return this.value;
	};

	cXSDecimal.prototype.toString	= function() {
		return cString(this.value);
	};

	var rXSDecimal	= /^[+\-]?((\d+(\.\d*)?)|(\.\d+))$/;
	cXSDecimal.cast	= function(vValue) {
		if (vValue instanceof cXSDecimal)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSDecimal);
			if (aMatch)
				return new cXSDecimal(+vValue);
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSBoolean)
			return new cXSDecimal(vValue * 1);
		if (fXSAnyAtomicType_isNumeric(vValue)) {
			if (fIsNaN(vValue) || !fIsFinite(vValue))
				throw new cException("FOCA0002"
						, "Cannot convert '" + vValue + "' to xs:decimal"
				);
			return new cXSDecimal(+vValue);
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:decimal can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("decimal",	cXSDecimal);


	function cXSDouble(nValue) {
		this.value	= nValue;
	};

	cXSDouble.prototype	= new cXSAnyAtomicType;
	cXSDouble.prototype.builtInKind		= cXSConstants.DOUBLE_DT;
	cXSDouble.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DOUBLE;

	cXSDouble.prototype.value	= null;

	cXSDouble.prototype.valueOf	= function() {
		return this.value;
	};

	cXSDouble.prototype.toString	= function() {
		return cString(this.value);
	};

	var rXSDouble	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;
	cXSDouble.cast	= function(vValue) {
		if (vValue instanceof cXSDouble)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSDouble);
			if (aMatch)
				return new cXSDouble(aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue);
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSBoolean)
			return new cXSDouble(vValue * 1);
		if (fXSAnyAtomicType_isNumeric(vValue))
			return new cXSDouble(vValue.value);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:double can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("double",	cXSDouble);


	function cXSDuration(nYear, nMonth, nDay, nHours, nMinutes, nSeconds, bNegative) {
		this.year	= nYear;
		this.month	= nMonth;
		this.day	= nDay;
		this.hours	= nHours;
		this.minutes	= nMinutes;
		this.seconds	= nSeconds;
		this.negative	= bNegative;
	};

	cXSDuration.prototype	= new cXSAnyAtomicType;
	cXSDuration.prototype.builtInKind	= cXSConstants.DURATION_DT;
	cXSDuration.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DURATION;

	cXSDuration.prototype.year		= null;
	cXSDuration.prototype.month		= null;
	cXSDuration.prototype.day		= null;
	cXSDuration.prototype.hours		= null;
	cXSDuration.prototype.minutes	= null;
	cXSDuration.prototype.seconds	= null;
	cXSDuration.prototype.negative	= null;

	cXSDuration.prototype.toString	= function() {
		return (this.negative ? '-' : '') + 'P'
				+ ((fXSDuration_getYearMonthComponent(this) + fXSDuration_getDayTimeComponent(this)) || 'T0S');
	};

	var rXSDuration		= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;
	cXSDuration.cast	= function(vValue) {
		if (vValue instanceof cXSYearMonthDuration)
			return new cXSDuration(vValue.year, vValue.month, 0, 0, 0, 0, vValue.negative);
		if (vValue instanceof cXSDayTimeDuration)
			return new cXSDuration(0, 0, vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
		if (vValue instanceof cXSDuration)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSDuration);
			if (aMatch)
				return fXSDuration_normalize(new cXSDuration(+aMatch[2] || 0, +aMatch[3] || 0, +aMatch[4] || 0, +aMatch[5] || 0, +aMatch[6] || 0, +aMatch[7] || 0, aMatch[1] == '-'));
			throw new cException("FORG0001");
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:duration can never succeed"
		);
	};

	function fXSDuration_getYearMonthComponent(oDuration) {
		return (oDuration.year ? oDuration.year + 'Y' : '')
				+ (oDuration.month ? oDuration.month + 'M' : '');
	};

	function fXSDuration_getDayTimeComponent(oDuration) {
		return (oDuration.day ? oDuration.day + 'D' : '')
				+ (oDuration.hours || oDuration.minutes || oDuration.seconds
					? 'T'
						+ (oDuration.hours ? oDuration.hours + 'H' : '')
						+ (oDuration.minutes ? oDuration.minutes + 'M' : '')
						+ (oDuration.seconds ? oDuration.seconds + 'S' : '')
					: '');
	};

	function fXSDuration_normalize(oDuration) {
		return fXSYearMonthDuration_normalize(fXSDayTimeDuration_normalize(oDuration));
	};

	fStaticContext_defineSystemDataType("duration",	cXSDuration);


	function cXSFloat(nValue) {
		this.value	= nValue;
	};

	cXSFloat.prototype	= new cXSAnyAtomicType;
	cXSFloat.prototype.builtInKind		= cXSConstants.FLOAT_DT;
	cXSFloat.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_FLOAT;

	cXSFloat.prototype.value	= null;

	cXSFloat.prototype.valueOf	= function() {
		return this.value;
	};

	cXSFloat.prototype.toString	= function() {
		return cString(this.value);
	};

	var rXSFloat	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;
	cXSFloat.cast	= function(vValue) {
		if (vValue instanceof cXSFloat)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSFloat);
			if (aMatch)
				return new cXSFloat(aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue);
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSBoolean)
			return new cXSFloat(vValue * 1);
		if (fXSAnyAtomicType_isNumeric(vValue))
			return new cXSFloat(vValue.value);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:float can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("float",	cXSFloat);


	function cXSGDay(nDay, nTimezone) {
		this.day		= nDay;
		this.timezone	= nTimezone;
	};

	cXSGDay.prototype	= new cXSAnyAtomicType;
	cXSGDay.prototype.builtInKind	= cXSConstants.GDAY_DT;
	cXSGDay.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GDAY;

	cXSGDay.prototype.day		= null;
	cXSGDay.prototype.timezone	= null;

	cXSGDay.prototype.toString	= function() {
		return '-'
				+ '-'
				+ '-' + fXSDateTime_pad(this.day)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSGDay		= /^---(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSGDay.cast	= function(vValue) {
		if (vValue instanceof cXSGDay)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSGDay);
			if (aMatch) {
				var nDay	= +aMatch[1];
				return new cXSGDay(	nDay,
									aMatch[2] ? aMatch[2] == 'Z' ? 0 : (aMatch[3] == '-' ? -1 : 1) * (aMatch[4] * 60 + aMatch[5] * 1) : null
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
			return new cXSGDay(vValue.day, vValue.timezone);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:gDay can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("gDay",	cXSGDay);


	function cXSGMonth(nMonth, nTimezone) {
		this.month		= nMonth;
		this.timezone	= nTimezone;
	};

	cXSGMonth.prototype	= new cXSAnyAtomicType;
	cXSGMonth.prototype.builtInKind		= cXSConstants.GMONTH_DT;
	cXSGMonth.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GMONTH;

	cXSGMonth.prototype.month		= null;
	cXSGMonth.prototype.timezone	= null;

	cXSGMonth.prototype.toString	= function() {
		return '-'
				+ '-' + fXSDateTime_pad(this.month)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSGMonth	= /^--(0[1-9]|1[0-2])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSGMonth.cast	= function(vValue) {
		if (vValue instanceof cXSGMonth)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSGMonth);
			if (aMatch) {
				var nMonth	= +aMatch[1];
				return new cXSGMonth(	nMonth,
										aMatch[2] ? aMatch[2] == 'Z' ? 0 : (aMatch[3] == '-' ? -1 : 1) * (aMatch[4] * 60 + aMatch[5] * 1) : null
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
			return new cXSGMonth(vValue.month, vValue.timezone);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:gMonth can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("gMonth",	cXSGMonth);


	function cXSGMonthDay(nMonth, nDay, nTimezone) {
		this.month		= nMonth;
		this.day		= nDay;
		this.timezone	= nTimezone;
	};

	cXSGMonthDay.prototype	= new cXSAnyAtomicType;
	cXSGMonthDay.prototype.builtInKind		= cXSConstants.GMONTHDAY_DT;
	cXSGMonthDay.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GMONTHDAY;

	cXSGMonthDay.prototype.month	= null;
	cXSGMonthDay.prototype.day		= null;
	cXSGMonthDay.prototype.timezone	= null;

	cXSGMonthDay.prototype.toString	= function() {
		return '-'
				+ '-' + fXSDateTime_pad(this.month)
				+ '-' + fXSDateTime_pad(this.day)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSGMonthDay	= /^--(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSGMonthDay.cast	= function(vValue) {
		if (vValue instanceof cXSGMonthDay)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSGMonthDay);
			if (aMatch) {
				var nMonth	= +aMatch[1],
					nDay	= +aMatch[2];
				if (nDay - 1 < fXSDate_getDaysForYearMonth(1976, nMonth))
					return new cXSGMonthDay(	nMonth,
												nDay,
												aMatch[3] ? aMatch[3] == 'Z' ? 0 : (aMatch[4] == '-' ? -1 : 1) * (aMatch[5] * 60 + aMatch[6] * 1) : null
					);
							throw new cException("FORG0001"
						, "Invalid date '" + vValue + "' (Non-existent date)"
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
			return new cXSGMonthDay(vValue.month, vValue.day, vValue.timezone);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:gMonthDay can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("gMonthDay",	cXSGMonthDay);


	function cXSGYear(nYear, nTimezone) {
		this.year	= nYear;
		this.timezone	= nTimezone;
	};

	cXSGYear.prototype	= new cXSAnyAtomicType;
	cXSGYear.prototype.builtInKind		= cXSConstants.GYEAR_DT;
	cXSGYear.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GYEAR;

	cXSGYear.prototype.year		= null;
	cXSGYear.prototype.timezone	= null;

	cXSGYear.prototype.toString	= function() {
		return fXSDateTime_pad(this.year)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSGYear		= /^-?([1-9]\d\d\d+|0\d\d\d)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSGYear.cast	= function(vValue) {
		if (vValue instanceof cXSGYear)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSGYear);
			if (aMatch) {
				var nYear	= +aMatch[1];
				return new cXSGYear(	nYear,
										aMatch[2] ? aMatch[2] == 'Z' ? 0 : (aMatch[3] == '-' ? -1 : 1) * (aMatch[4] * 60 + aMatch[5] * 1) : null
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
			return new cXSGYear(vValue.year, vValue.timezone);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:gYear can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("gYear",	cXSGYear);


	function cXSGYearMonth(nYear, nMonth, nTimezone) {
		this.year		= nYear;
		this.month		= nMonth;
		this.timezone	= nTimezone;
	};

	cXSGYearMonth.prototype	= new cXSAnyAtomicType;
	cXSGYearMonth.prototype.builtInKind		= cXSConstants.GYEARMONTH_DT;
	cXSGYearMonth.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GYEARMONTH;

	cXSGYearMonth.prototype.year	= null;
	cXSGYearMonth.prototype.month	= null;
	cXSGYearMonth.prototype.timezone= null;

	cXSGYearMonth.prototype.toString	= function() {
		return fXSDateTime_pad(this.year)
				+ '-' + fXSDateTime_pad(this.month)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSGYearMonth	= /^-?([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSGYearMonth.cast	= function(vValue) {
		if (vValue instanceof cXSGYearMonth)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSGYearMonth);
			if (aMatch) {
				var nYear	= +aMatch[1],
					nMonth	= +aMatch[2];
				return new cXSGYearMonth(	nYear,
											nMonth,
											aMatch[3] ? aMatch[3] == 'Z' ? 0 : (aMatch[4] == '-' ? -1 : 1) * (aMatch[5] * 60 + aMatch[6] * 1) : null
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
			return new cXSGYearMonth(vValue.year, vValue.month, vValue.timezone);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:gYearMonth can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("gYearMonth",	cXSGYearMonth);


	function cXSHexBinary(sValue) {
		this.value	= sValue;
	};

	cXSHexBinary.prototype	= new cXSAnyAtomicType;
	cXSHexBinary.prototype.builtInKind		= cXSConstants.HEXBINARY_DT;
	cXSHexBinary.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_HEXBINARY;

	cXSHexBinary.prototype.value	= null;

	cXSHexBinary.prototype.valueOf	= function() {
		return this.value;
	};

	cXSHexBinary.prototype.toString	= function() {
		return this.value;
	};

	var rXSHexBinary	= /^([0-9a-fA-F]{2})*$/;
	cXSHexBinary.cast	= function(vValue) {
		if (vValue instanceof cXSHexBinary)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSHexBinary);
			if (aMatch)
				return new cXSHexBinary(aMatch[0].toUpperCase());
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSBase64Binary) {
			var sValue	= fWindow_atob(vValue.valueOf()),
				aValue	= [];
			for (var nIndex = 0, nLength = sValue.length, sLetter; nIndex < nLength; nIndex++) {
				sLetter = sValue.charCodeAt(nIndex).toString(16);
				aValue.push(new cArray(3 - sLetter.length).join('0') + sLetter);
			}
			return new cXSHexBinary(aValue.join(''));
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:hexBinary can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("hexBinary",	cXSHexBinary);


	function cXSNOTATION() {

	};

	cXSNOTATION.prototype	= new cXSAnyAtomicType;
	cXSNOTATION.prototype.builtInKind	= cXSConstants.NOTATION_DT;
	cXSNOTATION.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_NOTATION;

	cXSNOTATION.cast	= function(vValue) {
		throw new cException("XPST0017"
				, "Abstract type used in constructor function xs:NOTATION"
		);	};

	fStaticContext_defineSystemDataType("NOTATION",	cXSNOTATION);



	function cXSQName(sPrefix, sLocalName, sNameSpaceURI) {
		this.prefix	= sPrefix;
		this.localName	= sLocalName;
		this.namespaceURI	= sNameSpaceURI;
	};

	cXSQName.prototype	= new cXSAnyAtomicType;
	cXSQName.prototype.builtInKind		= cXSConstants.QNAME_DT;
	cXSQName.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_QNAME;

	cXSQName.prototype.prefix	= null;
	cXSQName.prototype.localName	= null;
	cXSQName.prototype.namespaceURI	= null;

	cXSQName.prototype.toString	= function() {
		return (this.prefix ? this.prefix + ':' : '') + this.localName;
	};

	var rXSQName	= /^(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+)$/;
	cXSQName.cast	= function(vValue) {
		if (vValue instanceof cXSQName)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSQName);
			if (aMatch)
				return new cXSQName(aMatch[1] || null, aMatch[2], null);
			throw new cException("FORG0001");
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:QName can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("QName",	cXSQName);


	function cXSString(sValue) {
		this.value	= sValue;
	};

	cXSString.prototype	= new cXSAnyAtomicType;

	cXSString.prototype.value	= null;
	cXSString.prototype.builtInKind		= cXSConstants.STRING_DT;
	cXSString.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_STRING;

	cXSString.prototype.valueOf		= function() {
		return this.value;
	};

	cXSString.prototype.toString	= function() {
		return this.value;
	};

	cXSString.cast	= function(vValue) {
		return new cXSString(cString(vValue));
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:string can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("string",	cXSString);


	function cXSTime(nHours, nMinutes, nSeconds, nTimezone) {
		this.hours	= nHours;
		this.minutes	= nMinutes;
		this.seconds	= nSeconds;
		this.timezone	= nTimezone;
	};

	cXSTime.prototype	= new cXSAnyAtomicType;
	cXSTime.prototype.builtInKind	= cXSConstants.TIME_DT;
	cXSTime.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_TIME;

	cXSTime.prototype.hours		= null;
	cXSTime.prototype.minutes	= null;
	cXSTime.prototype.seconds	= null;
	cXSTime.prototype.timezone		= null;

	cXSTime.prototype.toString	= function() {
		return fXSDateTime_getTimeComponent(this)
				+ fXSDateTime_getTZComponent(this);
	};

	var rXSTime		= /^(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
	cXSTime.cast	= function(vValue) {
		if (vValue instanceof cXSTime)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSTime);
			if (aMatch) {
				var bValue	= !!aMatch[6];
				return new cXSTime(bValue ? 0 : +aMatch[2],
									bValue ? 0 : +aMatch[3],
									cNumber((bValue ? 0 : aMatch[4]) + '.' + (bValue ? 0 : aMatch[5] || 0)),
									aMatch[8] ? aMatch[8] == 'Z' ? 0 : (aMatch[9] == '-' ? -1 : 1) * (aMatch[10] * 60 + aMatch[11] * 1) : null
				);
			}
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDateTime)
			return new cXSTime(vValue.hours, vValue.minutes, vValue.seconds, vValue.timezone);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:time can never succeed"
		);
	};

	function fXSTime_normalize(oValue) {
			if (oValue.seconds >= 60 || oValue.seconds < 0) {
			oValue.minutes	+= ~~(oValue.seconds / 60) - (oValue.seconds < 0 && oValue.seconds % 60 ? 1 : 0);
			oValue.seconds	= oValue.seconds % 60 + (oValue.seconds < 0 && oValue.seconds % 60 ? 60 : 0);
		}
			if (oValue.minutes >= 60 || oValue.minutes < 0) {
			oValue.hours	+= ~~(oValue.minutes / 60) - (oValue.minutes < 0 && oValue.minutes % 60 ? 1 : 0);
			oValue.minutes	= oValue.minutes % 60 + (oValue.minutes < 0 && oValue.minutes % 60 ? 60 : 0);
		}
			if (oValue.hours >= 24 || oValue.hours < 0) {
			if (oValue instanceof cXSDateTime)
				oValue.day		+= ~~(oValue.hours / 24) - (oValue.hours < 0 && oValue.hours % 24 ? 1 : 0);
			oValue.hours	= oValue.hours % 24 + (oValue.hours < 0 && oValue.hours % 24 ? 24 : 0);
		}
			return oValue;
	};

	fStaticContext_defineSystemDataType("time",	cXSTime);


	function cXSUntypedAtomic(sValue) {
		this.value	= sValue;
	};

	cXSUntypedAtomic.prototype	= new cXSAnyAtomicType;
	cXSUntypedAtomic.prototype.builtInKind	= cXSConstants.XT_UNTYPEDATOMIC_DT;

	cXSUntypedAtomic.prototype.toString	= function() {
		return cString(this.value);
	};

	cXSUntypedAtomic.cast	= function(vValue) {
		if (vValue instanceof cXSUntypedAtomic)
			return vValue;

		return new cXSUntypedAtomic(cString(vValue));
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:untypedAtomic can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("untypedAtomic",	cXSUntypedAtomic);


	function cXSYearMonthDuration(nYear, nMonth, bNegative) {
		cXSDuration.call(this, nYear, nMonth, 0, 0, 0, 0, bNegative);
	};

	cXSYearMonthDuration.prototype	= new cXSDuration;
	cXSYearMonthDuration.prototype.builtInKind	= cXSConstants.XT_YEARMONTHDURATION_DT;

	cXSYearMonthDuration.prototype.toString	= function() {
		return (this.negative ? '-' : '') + 'P'
				+ (fXSDuration_getYearMonthComponent(this) || '0M');
	};

	var rXSYearMonthDuration	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?$/;
	cXSYearMonthDuration.cast	= function(vValue) {
		if (vValue instanceof cXSYearMonthDuration)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSYearMonthDuration);
			if (aMatch)
				return fXSYearMonthDuration_normalize(new cXSYearMonthDuration(+aMatch[2] || 0, +aMatch[3] || 0, aMatch[1] == '-'));
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSDayTimeDuration)
			return new cXSYearMonthDuration(0, 0);
		if (vValue instanceof cXSDuration)
			return new cXSYearMonthDuration(vValue.year, vValue.month, vValue.negative);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:yearMonthDuration can never succeed"
		);
	};

	function fXSYearMonthDuration_normalize(oDuration) {
		if (oDuration.month >= 12) {
			oDuration.year	+= ~~(oDuration.month / 12);
			oDuration.month	%= 12;
		}
		return oDuration;
	};

	fStaticContext_defineSystemDataType("yearMonthDuration",	cXSYearMonthDuration);


	function cXSDayTimeDuration(nDay, nHours, nMinutes, nSeconds, bNegative) {
		cXSDuration.call(this, 0, 0, nDay, nHours, nMinutes, nSeconds, bNegative);
	};

	cXSDayTimeDuration.prototype	= new cXSDuration;
	cXSDayTimeDuration.prototype.builtInKind	= cXSConstants.DAYTIMEDURATION_DT;

	cXSDayTimeDuration.prototype.toString	= function() {
		return (this.negative ? '-' : '') + 'P'
				+ (fXSDuration_getDayTimeComponent(this) || 'T0S');
	};

	var rXSDayTimeDuration	= /^(-)?P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;
	cXSDayTimeDuration.cast	= function(vValue) {
		if (vValue instanceof cXSDayTimeDuration)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSDayTimeDuration);
			if (aMatch)
				return fXSDayTimeDuration_normalize(new cXSDayTimeDuration(+aMatch[2] || 0, +aMatch[3] || 0, +aMatch[4] || 0, +aMatch[5] || 0, aMatch[1] == '-'));
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSYearMonthDuration)
			return new cXSDayTimeDuration(0, 0, 0, 0);
		if (vValue instanceof cXSDuration)
			return new cXSDayTimeDuration(vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:dayTimeDuration can never succeed"
		);
	};

	function fXSDayTimeDuration_normalize(oDuration) {
		if (oDuration.seconds >= 60) {
			oDuration.minutes	+= ~~(oDuration.seconds / 60);
			oDuration.seconds	%= 60;
		}
		if (oDuration.minutes >= 60) {
			oDuration.hours		+= ~~(oDuration.minutes / 60);
			oDuration.minutes	%= 60;
		}
		if (oDuration.hours >= 24) {
			oDuration.day		+= ~~(oDuration.hours / 24);
			oDuration.hours		%= 24;
		}
		return oDuration;
	};

	fStaticContext_defineSystemDataType("dayTimeDuration",	cXSDayTimeDuration);


	function cXSInteger(nValue) {
		this.value	= nValue;
	};

	cXSInteger.prototype	= new cXSDecimal;
	cXSInteger.prototype.builtInKind	= cXSConstants.INTEGER_DT;

	var rXSInteger	= /^[-+]?[0-9]+$/;
	cXSInteger.cast	= function(vValue) {
		if (vValue instanceof cXSInteger)
			return vValue;
		if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
			var aMatch	= fString_trim(vValue).match(rXSInteger);
			if (aMatch)
				return new cXSInteger(~~vValue);
			throw new cException("FORG0001");
		}
		if (vValue instanceof cXSBoolean)
			return new cXSInteger(vValue * 1);
		if (fXSAnyAtomicType_isNumeric(vValue)) {
			if (fIsNaN(vValue) || !fIsFinite(vValue))
				throw new cException("FOCA0002"
						, "Cannot convert '" + vValue + "' to xs:integer"
				);
			return new cXSInteger(~~vValue);
		}
			throw new cException("XPTY0004"
				, "Casting value '" + vValue + "' to xs:integer can never succeed"
		);
	};

	fStaticContext_defineSystemDataType("integer",	cXSInteger);


	function cXSNonPositiveInteger(nValue) {
		this.value	= nValue;
	};

	cXSNonPositiveInteger.prototype	= new cXSInteger;
	cXSNonPositiveInteger.prototype.builtInKind	= cXSConstants.NONPOSITIVEINTEGER_DT;

	cXSNonPositiveInteger.cast	= function(vValue) {
		return new cXSNonPositiveInteger(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("nonPositiveInteger",	cXSNonPositiveInteger);


	function cXSNegativeInteger(nValue) {
		this.value	= nValue;
	};

	cXSNegativeInteger.prototype	= new cXSNonPositiveInteger;
	cXSNegativeInteger.prototype.builtInKind	= cXSConstants.NEGATIVEINTEGER_DT;

	cXSNegativeInteger.cast	= function(vValue) {
		return new cXSNegativeInteger(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("negativeInteger",	cXSNegativeInteger);


	function cXSLong(nValue) {
		this.value	= nValue;
	};

	cXSLong.prototype	= new cXSInteger;
	cXSLong.prototype.builtInKind	= cXSConstants.LONG_DT;

	cXSLong.cast	= function(vValue) {
		return new cXSLong(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("long",	cXSLong);


	function cXSInt(nValue) {
		this.value	= nValue;
	};

	cXSInt.prototype	= new cXSLong;
	cXSInt.prototype.builtInKind	= cXSConstants.INT_DT;

	cXSInt.cast	= function(vValue) {
		return new cXSInt(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("int",	cXSInt);


	function cXSShort(nValue) {
		this.value	= nValue;
	};

	cXSShort.prototype	= new cXSInt;
	cXSShort.prototype.builtInKind	= cXSConstants.SHORT_DT;

	cXSShort.cast	= function(vValue) {
		return new cXSShort(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("short",	cXSShort);


	function cXSByte(nValue) {
		this.value	= nValue;
	};

	cXSByte.prototype	= new cXSShort;
	cXSByte.prototype.builtInKind	= cXSConstants.BYTE_DT;

	cXSByte.cast	= function(vValue) {
		return new cXSByte(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("byte",	cXSByte);


	function cXSNonNegativeInteger(nValue) {
		this.value	= nValue;
	};

	cXSNonNegativeInteger.prototype	= new cXSInteger;
	cXSNonNegativeInteger.prototype.builtInKind	= cXSConstants.NONNEGATIVEINTEGER_DT;

	cXSNonNegativeInteger.cast	= function(vValue) {
		return new cXSNonNegativeInteger(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("nonNegativeInteger",	cXSNonNegativeInteger);


	function cXSPositiveInteger(nValue) {
		this.value	= nValue;
	};

	cXSPositiveInteger.prototype	= new cXSNonNegativeInteger;
	cXSPositiveInteger.prototype.builtInKind	= cXSConstants.POSITIVEINTEGER_DT;

	cXSPositiveInteger.cast	= function(vValue) {
		return new cXSPositiveInteger(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("positiveInteger",	cXSPositiveInteger);


	function cXSUnsignedLong(nValue) {
		this.value	= nValue;
	};

	cXSUnsignedLong.prototype	= new cXSNonNegativeInteger;
	cXSUnsignedLong.prototype.builtInKind	= cXSConstants.UNSIGNEDLONG_DT;

	cXSUnsignedLong.cast	= function(vValue) {
		return new cXSUnsignedLong(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("unsignedLong",	cXSUnsignedLong);


	function cXSUnsignedInt(nValue) {
		this.value	= nValue;
	};

	cXSUnsignedInt.prototype	= new cXSNonNegativeInteger;
	cXSUnsignedInt.prototype.builtInKind	= cXSConstants.UNSIGNEDINT_DT;

	cXSUnsignedInt.cast	= function(vValue) {
		return new cXSUnsignedInt(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("unsignedInt",	cXSUnsignedInt);


	function cXSUnsignedShort(nValue) {
		this.value	= nValue;
	};

	cXSUnsignedShort.prototype	= new cXSUnsignedInt;
	cXSUnsignedShort.prototype.builtInKind	= cXSConstants.UNSIGNEDSHORT_DT;

	cXSUnsignedShort.cast	= function(vValue) {
		return new cXSUnsignedShort(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("unsignedShort",	cXSUnsignedShort);


	function cXSUnsignedByte(nValue) {
		this.value	= nValue;
	};

	cXSUnsignedByte.prototype	= new cXSUnsignedShort;
	cXSUnsignedByte.prototype.builtInKind	= cXSConstants.UNSIGNEDBYTE_DT;

	cXSUnsignedByte.cast	= function(vValue) {
		return new cXSUnsignedByte(cNumber(vValue));
	};

	fStaticContext_defineSystemDataType("unsignedByte",	cXSUnsignedByte);


	function cXSNormalizedString(sValue) {
		this.value	= sValue;
	};

	cXSNormalizedString.prototype	= new cXSString;
	cXSNormalizedString.prototype.builtInKind	= cXSConstants.NORMALIZEDSTRING_DT;

	cXSNormalizedString.cast	= function(vValue) {
		return new cXSNormalizedString(cString(vValue));
	};

	fStaticContext_defineSystemDataType("normalizedString",	cXSNormalizedString);


	function cXSToken(sValue) {
		this.value	= sValue;
	};

	cXSToken.prototype	= new cXSNormalizedString;
	cXSToken.prototype.builtInKind	= cXSConstants.TOKEN_DT;

	cXSToken.cast	= function(vValue) {
		return new cXSToken(cString(vValue));
	};

	fStaticContext_defineSystemDataType("token",	cXSToken);


	function cXSName(sValue) {
		this.value	= sValue;
	};

	cXSName.prototype	= new cXSToken;
	cXSName.prototype.builtInKind	= cXSConstants.NAME_DT;

	cXSName.cast	= function(vValue) {
		return new cXSName(cString(vValue));
	};

	fStaticContext_defineSystemDataType("Name",	cXSName);


	function cXSNCName(sValue) {
		this.value	= sValue;
	};

	cXSNCName.prototype	= new cXSName;
	cXSNCName.prototype.builtInKind	= cXSConstants.NCNAME_DT;

	cXSNCName.cast	= function(vValue) {
		return new cXSNCName(cString(vValue));
	};

	fStaticContext_defineSystemDataType("NCName",	cXSNCName);


	function cXSENTITY(sValue) {
		this.value	= sValue;
	};

	cXSENTITY.prototype	= new cXSNCName;
	cXSENTITY.prototype.builtInKind	= cXSConstants.ENTITY_DT;

	cXSENTITY.cast	= function(vValue) {
		return new cXSENTITY(cString(vValue));
	};

	fStaticContext_defineSystemDataType("ENTITY",	cXSENTITY);


	function cXSID(sValue) {
		this.value	= sValue;
	};

	cXSID.prototype	= new cXSNCName;
	cXSID.prototype.builtInKind	= cXSConstants.ID_DT;

	cXSID.cast	= function(vValue) {
		return new cXSID(cString(vValue));
	};

	fStaticContext_defineSystemDataType("ID",	cXSID);


	function cXSLanguage(sValue) {
		this.value	= sValue;
	};

	cXSLanguage.prototype	= new cXSToken;
	cXSLanguage.prototype.builtInKind	= cXSConstants.LANGUAGE_DT;

	cXSLanguage.cast	= function(vValue) {
		return new cXSLanguage(cString(vValue));
	};

	fStaticContext_defineSystemDataType("language",	cXSLanguage);


	function cXSNMTOKEN(sValue) {
		this.value	= sValue;
	};

	cXSNMTOKEN.prototype	= new cXSToken;
	cXSNMTOKEN.prototype.builtInKind	= cXSConstants.NMTOKEN_DT;

	cXSNMTOKEN.cast	= function(vValue) {
		return new cXSNMTOKEN(cString(vValue));
	};

	fStaticContext_defineSystemDataType("NMTOKEN",	cXSNMTOKEN);


	function cXTItem() {

	};


	function cXTNode() {

	};

	cXTNode.prototype	= new cXTItem;



	function cXTAttribute() {

	};

	cXTAttribute.prototype	= new cXTNode;


	function cXTComment() {

	};

	cXTComment.prototype	= new cXTNode;


	function cXTDocument() {

	};

	cXTDocument.prototype	= new cXTNode;


	function cXTElement() {

	};

	cXTElement.prototype	= new cXTNode;


	function cXTProcessingInstruction() {

	};

	cXTProcessingInstruction.prototype	= new cXTNode;


	function cXTText() {

	};

	cXTText.prototype	= new cXTNode;



	hStaticContext_operators["hexBinary-equal"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
	};

	hStaticContext_operators["base64Binary-equal"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
	};




	hStaticContext_operators["boolean-equal"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
	};

	hStaticContext_operators["boolean-less-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
	};

	hStaticContext_operators["boolean-greater-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
	};




	hStaticContext_operators["yearMonthDuration-less-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(fOperator_yearMonthDuration_toMonths(oLeft) < fOperator_yearMonthDuration_toMonths(oRight));
	};

	hStaticContext_operators["yearMonthDuration-greater-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(fOperator_yearMonthDuration_toMonths(oLeft) > fOperator_yearMonthDuration_toMonths(oRight));
	};

	hStaticContext_operators["dayTimeDuration-less-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(fOperator_dayTimeDuration_toSeconds(oLeft) < fOperator_dayTimeDuration_toSeconds(oRight));
	};

	hStaticContext_operators["dayTimeDuration-greater-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(fOperator_dayTimeDuration_toSeconds(oLeft) > fOperator_dayTimeDuration_toSeconds(oRight));
	};

	hStaticContext_operators["duration-equal"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.negative == oRight.negative
				&& fOperator_yearMonthDuration_toMonths(oLeft) == fOperator_yearMonthDuration_toMonths(oRight)
				&& fOperator_dayTimeDuration_toSeconds(oLeft) == fOperator_dayTimeDuration_toSeconds(oRight));
	};

	hStaticContext_operators["dateTime-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(oLeft, oRight, 'eq');
	};

	hStaticContext_operators["dateTime-less-than"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(oLeft, oRight, 'lt');
	};

	hStaticContext_operators["dateTime-greater-than"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(oLeft, oRight, 'gt');
	};

	hStaticContext_operators["date-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDates(oLeft, oRight, 'eq');
	};

	hStaticContext_operators["date-less-than"]	= function(oLeft, oRight) {
		return fOperator_compareDates(oLeft, oRight, 'lt');
	};

	hStaticContext_operators["date-greater-than"]	= function(oLeft, oRight) {
		return fOperator_compareDates(oLeft, oRight, 'gt');
	};

	hStaticContext_operators["time-equal"]	= function(oLeft, oRight) {
		return fOperator_compareTimes(oLeft, oRight, 'eq');
	};

	hStaticContext_operators["time-less-than"]	= function(oLeft, oRight) {
		return fOperator_compareTimes(oLeft, oRight, 'lt');
	};

	hStaticContext_operators["time-greater-than"]	= function(oLeft, oRight) {
		return fOperator_compareTimes(oLeft, oRight, 'gt');
	};

	hStaticContext_operators["gYearMonth-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(
				new cXSDateTime(oLeft.year, oLeft.month, fXSDate_getDaysForYearMonth(oLeft.year, oLeft.month), 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
				new cXSDateTime(oRight.year, oRight.month, fXSDate_getDaysForYearMonth(oRight.year, oRight.month), 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
				'eq'
		);
	};

	hStaticContext_operators["gYear-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(
				new cXSDateTime(oLeft.year, 1, 1, 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
				new cXSDateTime(oRight.year, 1, 1, 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
				'eq'
		);
	};

	hStaticContext_operators["gMonthDay-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(
				new cXSDateTime(1972, oLeft.month, oLeft.day, 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
				new cXSDateTime(1972, oRight.month, oRight.day, 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
				'eq'
		);
	};

	hStaticContext_operators["gMonth-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(
				new cXSDateTime(1972, oLeft.month, fXSDate_getDaysForYearMonth(1972, oRight.month), 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
				new cXSDateTime(1972, oRight.month, fXSDate_getDaysForYearMonth(1972, oRight.month), 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
				'eq'
		);
	};

	hStaticContext_operators["gDay-equal"]	= function(oLeft, oRight) {
		return fOperator_compareDateTimes(
				new cXSDateTime(1972, 12, oLeft.day, 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
				new cXSDateTime(1972, 12, oRight.day, 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
				'eq'
		);
	};

	hStaticContext_operators["add-yearMonthDurations"]	= function(oLeft, oRight) {
		return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) + fOperator_yearMonthDuration_toMonths(oRight));
	};

	hStaticContext_operators["subtract-yearMonthDurations"]	= function(oLeft, oRight) {
		return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) - fOperator_yearMonthDuration_toMonths(oRight));
	};

	hStaticContext_operators["multiply-yearMonthDuration"]	= function(oLeft, oRight) {
		return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) * oRight);
	};

	hStaticContext_operators["divide-yearMonthDuration"]	= function(oLeft, oRight) {
		return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) / oRight);
	};

	hStaticContext_operators["divide-yearMonthDuration-by-yearMonthDuration"]	= function(oLeft, oRight) {
		return new cXSDecimal(fOperator_yearMonthDuration_toMonths(oLeft) / fOperator_yearMonthDuration_toMonths(oRight));
	};

	hStaticContext_operators["add-dayTimeDurations"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_dayTimeDuration_toSeconds(oLeft) + fOperator_dayTimeDuration_toSeconds(oRight));
	};

	hStaticContext_operators["subtract-dayTimeDurations"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_dayTimeDuration_toSeconds(oLeft) - fOperator_dayTimeDuration_toSeconds(oRight));
	};

	hStaticContext_operators["multiply-dayTimeDuration"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_dayTimeDuration_toSeconds(oLeft) * oRight);
	};

	hStaticContext_operators["divide-dayTimeDuration"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_dayTimeDuration_toSeconds(oLeft) / oRight);
	};

	hStaticContext_operators["divide-dayTimeDuration-by-dayTimeDuration"]	= function(oLeft, oRight) {
		return new cXSDecimal(fOperator_dayTimeDuration_toSeconds(oLeft) / fOperator_dayTimeDuration_toSeconds(oRight));
	};

	hStaticContext_operators["subtract-dateTimes"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_dateTime_toSeconds(oLeft) - fOperator_dateTime_toSeconds(oRight));
	};

	hStaticContext_operators["subtract-dates"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_dateTime_toSeconds(oLeft) - fOperator_dateTime_toSeconds(oRight));
	};

	hStaticContext_operators["subtract-times"]	= function(oLeft, oRight) {
		return fOperator_dayTimeDuration_fromSeconds(fOperator_time_toSeconds(oLeft) - fOperator_time_toSeconds(oRight));
	};

	hStaticContext_operators["add-yearMonthDuration-to-dateTime"]	= function(oLeft, oRight) {
		return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '+');
	};

	hStaticContext_operators["add-dayTimeDuration-to-dateTime"]	= function(oLeft, oRight) {
		return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '+');
	};

	hStaticContext_operators["subtract-yearMonthDuration-from-dateTime"]	= function(oLeft, oRight) {
		return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '-');
	};

	hStaticContext_operators["subtract-dayTimeDuration-from-dateTime"]	= function(oLeft, oRight) {
		return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '-');
	};

	hStaticContext_operators["add-yearMonthDuration-to-date"]	= function(oLeft, oRight) {
		return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '+');
	};

	hStaticContext_operators["add-dayTimeDuration-to-date"]	= function(oLeft, oRight) {
		return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '+');
	};

	hStaticContext_operators["subtract-yearMonthDuration-from-date"]	= function(oLeft, oRight) {
		return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '-');
	};

	hStaticContext_operators["subtract-dayTimeDuration-from-date"]	= function(oLeft, oRight) {
		return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '-');
	};

	hStaticContext_operators["add-dayTimeDuration-to-time"]	= function(oLeft, oRight) {
		var oValue	= new cXSTime(oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone);
		oValue.hours	+= oRight.hours;
		oValue.minutes	+= oRight.minutes;
		oValue.seconds	+= oRight.seconds;
			return fXSTime_normalize(oValue);
	};

	hStaticContext_operators["subtract-dayTimeDuration-from-time"]	= function(oLeft, oRight) {
		var oValue	= new cXSTime(oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone);
		oValue.hours	-= oRight.hours;
		oValue.minutes	-= oRight.minutes;
		oValue.seconds	-= oRight.seconds;
			return fXSTime_normalize(oValue);
	};

	function fOperator_compareTimes(oLeft, oRight, sComparator) {
		var nLeft	= fOperator_time_toSeconds(oLeft),
			nRight	= fOperator_time_toSeconds(oRight);
		return new cXSBoolean(sComparator == 'lt' ? nLeft < nRight : sComparator == 'gt' ? nLeft > nRight : nLeft == nRight);
	};

	function fOperator_compareDates(oLeft, oRight, sComparator) {
		return fOperator_compareDateTimes(cXSDateTime.cast(oLeft), cXSDateTime.cast(oRight), sComparator);
	};

	function fOperator_compareDateTimes(oLeft, oRight, sComparator) {
			var oTimezone	= new cXSDayTimeDuration(0, 0, 0, 0),
			sLeft	= fFunction_dateTime_adjustTimezone(oLeft, oTimezone).toString(),
			sRight	= fFunction_dateTime_adjustTimezone(oRight, oTimezone).toString();
		return new cXSBoolean(sComparator == 'lt' ? sLeft < sRight : sComparator == 'gt' ? sLeft > sRight : sLeft == sRight);
	};

	function fOperator_addYearMonthDuration2DateTime(oLeft, oRight, sOperator) {
		var oValue;
		if (oLeft instanceof cXSDate)
			oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
		else
		if (oLeft instanceof cXSDateTime)
			oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
			oValue.year		= oValue.year + oRight.year * (sOperator == '-' ?-1 : 1);
		oValue.month	= oValue.month + oRight.month * (sOperator == '-' ?-1 : 1);
			fXSDate_normalize(oValue, true);
			var nDay	= fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
		if (oValue.day > nDay)
			oValue.day	= nDay;
			return oValue;
	};

	function fOperator_addDayTimeDuration2DateTime(oLeft, oRight, sOperator) {
		var oValue;
		if (oLeft instanceof cXSDate) {
			var nValue	= (oRight.hours * 60 + oRight.minutes) * 60 + oRight.seconds;
			oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
			oValue.day	= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1) - 1 * (nValue && sOperator == '-');
					fXSDate_normalize(oValue);
		}
		else
		if (oLeft instanceof cXSDateTime) {
			oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
			oValue.seconds	= oValue.seconds + oRight.seconds * (sOperator == '-' ?-1 : 1);
			oValue.minutes	= oValue.minutes + oRight.minutes * (sOperator == '-' ?-1 : 1);
			oValue.hours	= oValue.hours + oRight.hours * (sOperator == '-' ?-1 : 1);
			oValue.day		= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1);
					fXSDateTime_normalize(oValue);
		}
		return oValue;
	};

	function fOperator_dayTimeDuration_toSeconds(oDuration) {
		return (((oDuration.day * 24 + oDuration.hours) * 60 + oDuration.minutes) * 60 + oDuration.seconds) * (oDuration.negative ? -1 : 1);
	};

	function fOperator_dayTimeDuration_fromSeconds(nValue) {
		var bNegative	=(nValue = cMath.round(nValue)) < 0,
			nDays	= ~~((nValue = cMath.abs(nValue)) / 86400),
			nHours	= ~~((nValue -= nDays * 3600 * 24) / 3600),
			nMinutes= ~~((nValue -= nHours * 3600) / 60),
			nSeconds	= nValue -= nMinutes * 60;
		return new cXSDayTimeDuration(nDays, nHours, nMinutes, nSeconds, bNegative);
	};

	function fOperator_yearMonthDuration_toMonths(oDuration) {
		return (oDuration.year * 12 + oDuration.month) * (oDuration.negative ? -1 : 1);
	};

	function fOperator_yearMonthDuration_fromMonths(nValue) {
		var nNegative	=(nValue = cMath.round(nValue)) < 0,
			nYears	= ~~((nValue = cMath.abs(nValue)) / 12),
			nMonths		= nValue -= nYears * 12;
		return new cXSYearMonthDuration(nYears, nMonths, nNegative);
	};

	function fOperator_time_toSeconds(oTime) {
		return oTime.seconds + (oTime.minutes - (oTime.timezone != null ? oTime.timezone % 60 : 0) + (oTime.hours - (oTime.timezone != null ? ~~(oTime.timezone / 60) : 0)) * 60) * 60;
	};

	function fOperator_dateTime_toSeconds(oValue) {
		var oDate	= new cDate((oValue.negative ? -1 : 1) * oValue.year, oValue.month, oValue.day, 0, 0, 0, 0);
		if (oValue instanceof cXSDateTime) {
			oDate.setHours(oValue.hours);
			oDate.setMinutes(oValue.minutes);
			oDate.setSeconds(oValue.seconds);
		}
		if (oValue.timezone != null)
			oDate.setMinutes(oDate.getMinutes() - oValue.timezone);
		return oDate.getTime() / 1000;
	};




	hStaticContext_operators["is-same-node"]	= function(oLeft, oRight) {
		return new cXSBoolean(this.DOMAdapter.isSameNode(oLeft, oRight));
	};

	hStaticContext_operators["node-before"]	= function(oLeft, oRight) {
		return new cXSBoolean(!!(this.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 4));
	};

	hStaticContext_operators["node-after"]	= function(oLeft, oRight) {
		return new cXSBoolean(!!(this.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 2));
	};







	function fFunctionCall_numeric_getPower(oLeft, oRight) {
		if (fIsNaN(oLeft) || (cMath.abs(oLeft) == nInfinity) || fIsNaN(oRight) || (cMath.abs(oRight) == nInfinity))
			return 0;
		var aLeft	= cString(oLeft).match(rNumericLiteral),
			aRight	= cString(oRight).match(rNumericLiteral),
			nPower	= cMath.max(1, (aLeft[2] || aLeft[3] || '').length + (aLeft[5] || 0) * (aLeft[4] == '+' ?-1 : 1), (aRight[2] || aRight[3] || '').length + (aRight[5] || 0) * (aRight[4] == '+' ?-1 : 1));
		return nPower + (nPower % 2 ? 0 : 1);
	};

	hStaticContext_operators["numeric-add"]		= function(oLeft, oRight) {
		var nLeft	= oLeft.valueOf(),
			nRight	= oRight.valueOf(),
			nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
		return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) + (nRight * nPower))/nPower);
	};

	hStaticContext_operators["numeric-subtract"]	= function(oLeft, oRight) {
		var nLeft	= oLeft.valueOf(),
			nRight	= oRight.valueOf(),
			nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
		return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) - (nRight * nPower))/nPower);
	};

	hStaticContext_operators["numeric-multiply"]	= function(oLeft, oRight) {
		var nLeft	= oLeft.valueOf(),
			nRight	= oRight.valueOf(),
			nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
		return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) * (nRight * nPower))/(nPower * nPower));
	};

	hStaticContext_operators["numeric-divide"]	= function(oLeft, oRight) {
		var nLeft	= oLeft.valueOf(),
			nRight	= oRight.valueOf(),
			nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
		return fOperator_numeric_getResultOfType(oLeft, oRight, (oLeft * nPower) / (oRight * nPower));
	};

	hStaticContext_operators["numeric-integer-divide"]	= function(oLeft, oRight) {
		return new cXSInteger(~~(oLeft / oRight));
	};

	hStaticContext_operators["numeric-mod"]	= function(oLeft, oRight) {
		var nLeft	= oLeft.valueOf(),
			nRight	= oRight.valueOf(),
			nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
		return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) % (nRight * nPower)) / nPower);
	};

	hStaticContext_operators["numeric-unary-plus"]	= function(oRight) {
		return oRight;
	};

	hStaticContext_operators["numeric-unary-minus"]	= function(oRight) {
		oRight.value	*=-1;
		return oRight;
	};


	hStaticContext_operators["numeric-equal"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
	};

	hStaticContext_operators["numeric-less-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
	};

	hStaticContext_operators["numeric-greater-than"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
	};

	function fOperator_numeric_getResultOfType(oLeft, oRight, nResult) {
		return new (oLeft instanceof cXSInteger && oRight instanceof cXSInteger && nResult == cMath.round(nResult) ? cXSInteger : cXSDecimal)(nResult);
	};




	hStaticContext_operators["QName-equal"]	= function(oLeft, oRight) {
		return new cXSBoolean(oLeft.localName == oRight.localName && oLeft.namespaceURI == oRight.namespaceURI);
	};




	hStaticContext_operators["concatenate"]	= function(oSequence1, oSequence2) {
		return oSequence1.concat(oSequence2);
	};

	hStaticContext_operators["union"]	= function(oSequence1, oSequence2) {
		var oSequence	= [];
			for (var nIndex = 0, nLength = oSequence1.length, oItem; nIndex < nLength; nIndex++) {
			if (!this.DOMAdapter.isNode(oItem = oSequence1[nIndex]))
				throw new cException("XPTY0004"
						, "Required item type of first operand of 'union' is node()"
				);					if (fArray_indexOf(oSequence, oItem) ==-1)
				oSequence.push(oItem);
		}
			for (var nIndex = 0, nLength = oSequence2.length, oItem; nIndex < nLength; nIndex++) {
			if (!this.DOMAdapter.isNode(oItem = oSequence2[nIndex]))
				throw new cException("XPTY0004"
						, "Required item type of second operand of 'union' is node()"
				);					if (fArray_indexOf(oSequence, oItem) ==-1)
				oSequence.push(oItem);
		}
		return fFunction_sequence_order(oSequence, this);
	};

	hStaticContext_operators["intersect"]	= function(oSequence1, oSequence2) {
		var oSequence	= [];
		for (var nIndex = 0, nLength = oSequence1.length, oItem, bFound; nIndex < nLength; nIndex++) {
			if (!this.DOMAdapter.isNode(oItem = oSequence1[nIndex]))
				throw new cException("XPTY0004"
						, "Required item type of second operand of 'intersect' is node()"
				);					bFound	= false;
			for (var nRightIndex = 0, nRightLength = oSequence2.length;(nRightIndex < nRightLength) && !bFound; nRightIndex++) {
				if (!this.DOMAdapter.isNode(oSequence2[nRightIndex]))
					throw new cException("XPTY0004"
							, "Required item type of first operand of 'intersect' is node()"
					);
				bFound = this.DOMAdapter.isSameNode(oSequence2[nRightIndex], oItem);
			}
					if (bFound && fArray_indexOf(oSequence, oItem) ==-1)
				oSequence.push(oItem);
		}
		return fFunction_sequence_order(oSequence, this);
	};

	hStaticContext_operators["except"]	= function(oSequence1, oSequence2) {
		var oSequence	= [];
		for (var nIndex = 0, nLength = oSequence1.length, oItem, bFound; nIndex < nLength; nIndex++) {
			if (!this.DOMAdapter.isNode(oItem = oSequence1[nIndex]))
				throw new cException("XPTY0004"
						, "Required item type of second operand of 'except' is node()"
				);					bFound	= false;
			for (var nRightIndex = 0, nRightLength = oSequence2.length;(nRightIndex < nRightLength) && !bFound; nRightIndex++) {
				if (!this.DOMAdapter.isNode(oSequence2[nRightIndex]))
					throw new cException("XPTY0004"
							, "Required item type of first operand of 'except' is node()"
					);
				bFound = this.DOMAdapter.isSameNode(oSequence2[nRightIndex], oItem);
			}
					if (!bFound && fArray_indexOf(oSequence, oItem) ==-1)
				oSequence.push(oItem);
		}
		return fFunction_sequence_order(oSequence, this);
	};

	hStaticContext_operators["to"]	= function(oLeft, oRight) {
		var oSequence	= [];
		for (var nIndex = oLeft.valueOf(), nLength = oRight.valueOf(); nIndex <= nLength; nIndex++)
			oSequence.push(new cXSInteger(nIndex));
			return oSequence;
	};




	fStaticContext_defineSystemFunction("node-name",		[[cXTNode, '?']],	function(oNode) {
		if (oNode != null) {
			var fGetProperty	= this.DOMAdapter.getProperty;
			switch (fGetProperty(oNode, "nodeType")) {
				case 1:					case 2:						return new cXSQName(fGetProperty(oNode, "prefix"), fGetProperty(oNode, "localName"), fGetProperty(oNode, "namespaceURI"));
				case 5:						throw "Not implemented";
				case 6:						throw "Not implemented";
				case 7:						return new cXSQName(null, fGetProperty(oNode, "target"), null);
				case 10:					return new cXSQName(null, fGetProperty(oNode, "name"), null);
			}
		}
			return null;
	});

	fStaticContext_defineSystemFunction("nilled",	[[cXTNode, '?']],	function(oNode) {
		if (oNode != null) {
			if (this.DOMAdapter.getProperty(oNode, "nodeType") == 1)
				return new cXSBoolean(false);		}
			return null;
	});

	fStaticContext_defineSystemFunction("string",	[[cXTItem, '?', true]],	function(oItem) {
		if (!arguments.length) {
			if (!this.item)
				throw new cException("XPDY0002");
			oItem	= this.item;
		}
		return oItem == null ? new cXSString('') : cXSString.cast(fFunction_sequence_atomize([oItem], this)[0]);
	});

	fStaticContext_defineSystemFunction("data",	[[cXTItem, '*']],		function(oSequence1) {
		return fFunction_sequence_atomize(oSequence1, this);
	});

	fStaticContext_defineSystemFunction("base-uri",	[[cXTNode, '?', true]],	function(oNode) {
		if (!arguments.length) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "base-uri() function called when the context item is not a node"
				);
			oNode	= this.item;
		}
			return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oNode, "baseURI") || ''));
	});

	fStaticContext_defineSystemFunction("document-uri",	[[cXTNode, '?']],	function(oNode) {
		if (oNode != null) {
			var fGetProperty	= this.DOMAdapter.getProperty;
			if (fGetProperty(oNode, "nodeType") == 9)
				return cXSAnyURI.cast(new cXSString(fGetProperty(oNode, "documentURI") || ''));
		}
			return null;
	});




	fStaticContext_defineSystemFunction("resolve-uri",	[[cXSString, '?'], [cXSString, '', true]],	function(sUri, sBaseUri) {
		var sBaseUri;
		if (arguments.length < 2) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "resolve-uri() function called when the context item is not a node"
				);
			sBaseUri	= new cXSString(this.DOMAdapter.getProperty(this.item, "baseURI") || '');
		}

		if (sUri == null)
			return null;

			if (sUri.valueOf() == '' || sUri.valueOf().charAt(0) == '#')
			return cXSAnyURI.cast(sBaseUri);

		var oUri	= cXSAnyURI.cast(sUri);
		if (oUri.scheme)
			return oUri;

		var oBaseUri	= cXSAnyURI.cast(sBaseUri);
		oUri.scheme	= oBaseUri.scheme;

		if (!oUri.authority) {
					oUri.authority	= oBaseUri.authority;

					if (oUri.path.charAt(0) != '/') {
				var aUriSegments		= oUri.path.split('/'),
					aBaseUriSegments	= oBaseUri.path.split('/');
				aBaseUriSegments.pop();

				var nBaseUriStart	= aBaseUriSegments[0] == '' ? 1 : 0;
				for (var nIndex = 0, nLength = aUriSegments.length; nIndex < nLength; nIndex++) {
					if (aUriSegments[nIndex] == '..') {
						if (aBaseUriSegments.length > nBaseUriStart)
							aBaseUriSegments.pop();
						else {
							aBaseUriSegments.push(aUriSegments[nIndex]);
							nBaseUriStart++;
						}
					}
					else
					if (aUriSegments[nIndex] != '.')
						aBaseUriSegments.push(aUriSegments[nIndex]);
				}
				if (aUriSegments[--nIndex] == '..' || aUriSegments[nIndex] == '.')
					aBaseUriSegments.push('');
							oUri.path	= aBaseUriSegments.join('/');
			}
		}

		return oUri;
	});




	fStaticContext_defineSystemFunction("true",	[],	function() {
		return new cXSBoolean(true);
	});

	fStaticContext_defineSystemFunction("false",	[],	function() {
		return new cXSBoolean(false);
	});

	fStaticContext_defineSystemFunction("not",	[[cXTItem, '*']],	function(oSequence1) {
		return new cXSBoolean(!fFunction_sequence_toEBV(oSequence1, this));
	});



	fStaticContext_defineSystemFunction("position",	[],	function() {
		return new cXSInteger(this.position);
	});

	fStaticContext_defineSystemFunction("last",	[],	function() {
		return new cXSInteger(this.size);
	});

	fStaticContext_defineSystemFunction("current-dateTime",	[],	 function() {
		return this.dateTime;
	});

	fStaticContext_defineSystemFunction("current-date",	[],	function() {
		return cXSDate.cast(this.dateTime);
	});

	fStaticContext_defineSystemFunction("current-time",	[],	function() {
		return cXSTime.cast(this.dateTime);
	});

	fStaticContext_defineSystemFunction("implicit-timezone",	[],	function() {
		return this.timezone;
	});

	fStaticContext_defineSystemFunction("default-collation",	[],	 function() {
		return new cXSString(this.staticContext.defaultCollationName);
	});

	fStaticContext_defineSystemFunction("static-base-uri",	[],	function() {
		return cXSAnyURI.cast(new cXSString(this.staticContext.baseURI || ''));
	});




	fStaticContext_defineSystemFunction("years-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
		return fFunction_duration_getComponent(oDuration, "year");
	});

	fStaticContext_defineSystemFunction("months-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
		return fFunction_duration_getComponent(oDuration, "month");
	});

	fStaticContext_defineSystemFunction("days-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
		return fFunction_duration_getComponent(oDuration, "day");
	});

	fStaticContext_defineSystemFunction("hours-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
		return fFunction_duration_getComponent(oDuration, "hours");
	});

	fStaticContext_defineSystemFunction("minutes-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
		return fFunction_duration_getComponent(oDuration, "minutes");
	});

	fStaticContext_defineSystemFunction("seconds-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
		return fFunction_duration_getComponent(oDuration, "seconds");
	});

	fStaticContext_defineSystemFunction("year-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime,	"year");
	});

	fStaticContext_defineSystemFunction("month-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime, "month");
	});

	fStaticContext_defineSystemFunction("day-from-dateTime",			[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime, "day");
	});

	fStaticContext_defineSystemFunction("hours-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime, "hours");
	});

	fStaticContext_defineSystemFunction("minutes-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime, "minutes");
	});

	fStaticContext_defineSystemFunction("seconds-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime, "seconds");
	});

	fStaticContext_defineSystemFunction("timezone-from-dateTime",	[[cXSDateTime, '?']],	function(oDateTime) {
		return fFunction_dateTime_getComponent(oDateTime, "timezone");
	});

	fStaticContext_defineSystemFunction("year-from-date",	[[cXSDate, '?']],	function(oDate) {
		return fFunction_dateTime_getComponent(oDate, "year");
	});

	fStaticContext_defineSystemFunction("month-from-date",	[[cXSDate, '?']],	function(oDate) {
		return fFunction_dateTime_getComponent(oDate, "month");
	});

	fStaticContext_defineSystemFunction("day-from-date",		[[cXSDate, '?']],	function(oDate) {
		return fFunction_dateTime_getComponent(oDate, "day");
	});

	fStaticContext_defineSystemFunction("timezone-from-date",	[[cXSDate, '?']],	function(oDate) {
		return fFunction_dateTime_getComponent(oDate, "timezone");
	});

	fStaticContext_defineSystemFunction("hours-from-time",		[[cXSTime, '?']],	function(oTime) {
		return fFunction_dateTime_getComponent(oTime, "hours");
	});

	fStaticContext_defineSystemFunction("minutes-from-time",		[[cXSTime, '?']],	function(oTime) {
		return fFunction_dateTime_getComponent(oTime, "minutes");
	});

	fStaticContext_defineSystemFunction("seconds-from-time",		[[cXSTime, '?']],	function(oTime) {
		return fFunction_dateTime_getComponent(oTime, "seconds");
	});

	fStaticContext_defineSystemFunction("timezone-from-time",	[[cXSTime, '?']],	function(oTime) {
		return fFunction_dateTime_getComponent(oTime, "timezone");
	});


	fStaticContext_defineSystemFunction("adjust-dateTime-to-timezone",	[[cXSDateTime, '?'], [cXSDayTimeDuration, '?', true]],	function(oDateTime, oDayTimeDuration) {
		return fFunction_dateTime_adjustTimezone(oDateTime, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
	});

	fStaticContext_defineSystemFunction("adjust-date-to-timezone",		[[cXSDate, '?'], [cXSDayTimeDuration, '?', true]],	function(oDate, oDayTimeDuration) {
		return fFunction_dateTime_adjustTimezone(oDate, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
	});

	fStaticContext_defineSystemFunction("adjust-time-to-timezone",		[[cXSTime, '?'], [cXSDayTimeDuration, '?', true]],	function(oTime, oDayTimeDuration) {
		return fFunction_dateTime_adjustTimezone(oTime, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
	});

	function fFunction_duration_getComponent(oDuration, sName) {
		if (oDuration == null)
			return null;

		var nValue	= oDuration[sName] * (oDuration.negative ?-1 : 1);
		return sName == "seconds" ? new cXSDecimal(nValue) : new cXSInteger(nValue);
	};

	function fFunction_dateTime_getComponent(oDateTime, sName) {
		if (oDateTime == null)
			return null;

		if (sName == "timezone") {
			var nTimezone	= oDateTime.timezone;
			if (nTimezone == null)
				return null;
			return new cXSDayTimeDuration(0, cMath.abs(~~(nTimezone / 60)), cMath.abs(nTimezone % 60), 0, nTimezone < 0);
		}
		else {
			var nValue	= oDateTime[sName];
			if (!(oDateTime instanceof cXSDate)) {
				if (sName == "hours")
					if (nValue == 24)
						nValue	= 0;
			}
			if (!(oDateTime instanceof cXSTime))
				nValue	*= oDateTime.negative ?-1 : 1;
			return sName == "seconds" ? new cXSDecimal(nValue) : new cXSInteger(nValue);
		}
	};

	function fFunction_dateTime_adjustTimezone(oDateTime, oTimezone) {
		if (oDateTime == null)
			return null;

			var oValue;
		if (oDateTime instanceof cXSDate)
			oValue	= new cXSDate(oDateTime.year, oDateTime.month, oDateTime.day, oDateTime.timezone, oDateTime.negative);
		else
		if (oDateTime instanceof cXSTime)
			oValue	= new cXSTime(oDateTime.hours, oDateTime.minutes, oDateTime.seconds, oDateTime.timezone, oDateTime.negative);
		else
			oValue	= new cXSDateTime(oDateTime.year, oDateTime.month, oDateTime.day, oDateTime.hours, oDateTime.minutes, oDateTime.seconds, oDateTime.timezone, oDateTime.negative);

			if (oTimezone == null)
			oValue.timezone	= null;
		else {
			var nTimezone	= fOperator_dayTimeDuration_toSeconds(oTimezone) / 60;
			if (oDateTime.timezone != null) {
				var nDiff	= nTimezone - oDateTime.timezone;
				if (oDateTime instanceof cXSDate) {
					if (nDiff < 0)
						oValue.day--;
				}
				else {
					oValue.minutes	+= nDiff % 60;
					oValue.hours	+= ~~(nDiff / 60);
				}
							fXSDateTime_normalize(oValue);
			}
			oValue.timezone	= nTimezone;
		}
		return oValue;
	};




	fStaticContext_defineSystemFunction("name",	[[cXTNode, '?', true]],	function(oNode) {
		if (!arguments.length) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "name() function called when the context item is not a node"
				);
			oNode	= this.item;
		}
		else
		if (oNode == null)
			return new cXSString('');
			var vValue	= hStaticContext_functions["node-name"].call(this, oNode);
		return new cXSString(vValue == null ? '' : vValue.toString());
	});

	fStaticContext_defineSystemFunction("local-name",	[[cXTNode, '?', true]],	function(oNode) {
		if (!arguments.length) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "local-name() function called when the context item is not a node"
				);
			oNode	= this.item;
		}
		else
		if (oNode == null)
			return new cXSString('');
			return new cXSString(this.DOMAdapter.getProperty(oNode, "localName") || '');
	});

	fStaticContext_defineSystemFunction("namespace-uri",	[[cXTNode, '?', true]],	function(oNode) {
		if (!arguments.length) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "namespace-uri() function called when the context item is not a node"
				);
			oNode	= this.item;
		}
		else
		if (oNode == null)
			return cXSAnyURI.cast(new cXSString(''));
			return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oNode, "namespaceURI") || ''));
	});

	fStaticContext_defineSystemFunction("number",	[[cXSAnyAtomicType, '?', true]],	function(oItem) {
		if (!arguments.length) {
			if (!this.item)
				throw new cException("XPDY0002");
			oItem	= fFunction_sequence_atomize([this.item], this)[0];
		}

			var vValue	= new cXSDouble(nNaN);
		if (oItem != null) {
			try {
				vValue	= cXSDouble.cast(oItem);
			}
			catch (e) {

			}
		}
		return vValue;
	});

	fStaticContext_defineSystemFunction("lang",	[[cXSString, '?'], [cXTNode, '', true]],	function(sLang, oNode) {
		if (arguments.length < 2) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "lang() function called when the context item is not a node"
				);
			oNode	= this.item;
		}

		var fGetProperty	= this.DOMAdapter.getProperty;
		if (fGetProperty(oNode, "nodeType") == 2)
			oNode	= fGetProperty(oNode, "ownerElement");

			for (var aAttributes; oNode; oNode = fGetProperty(oNode, "parentNode"))
			if (aAttributes = fGetProperty(oNode, "attributes"))
				for (var nIndex = 0, nLength = aAttributes.length; nIndex < nLength; nIndex++)
					if (fGetProperty(aAttributes[nIndex], "nodeName") == "xml:lang")
						return new cXSBoolean(fGetProperty(aAttributes[nIndex], "value").replace(/-.+/, '').toLowerCase() == sLang.valueOf().replace(/-.+/, '').toLowerCase());
			return new cXSBoolean(false);
	});

	fStaticContext_defineSystemFunction("root",	[[cXTNode, '?', true]],	function(oNode) {
		if (!arguments.length) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "root() function called when the context item is not a node"
				);
			oNode	= this.item;
		}
		else
		if (oNode == null)
			return null;

		var fGetProperty	= this.DOMAdapter.getProperty;

			if (fGetProperty(oNode, "nodeType") == 2)
			oNode	= fGetProperty(oNode, "ownerElement");

		for (var oParent = oNode; oParent; oParent = fGetProperty(oNode, "parentNode"))
			oNode	= oParent;

		return oNode;
	});




	fStaticContext_defineSystemFunction("abs",		[[cXSDouble, '?']],	function(oValue) {
		return new cXSDecimal(cMath.abs(oValue));
	});

	fStaticContext_defineSystemFunction("ceiling",	[[cXSDouble, '?']],	function(oValue) {
		return new cXSDecimal(cMath.ceil(oValue));
	});

	fStaticContext_defineSystemFunction("floor",		[[cXSDouble, '?']],	function(oValue) {
		return new cXSDecimal(cMath.floor(oValue));
	});

	fStaticContext_defineSystemFunction("round",		[[cXSDouble, '?']],	function(oValue) {
		return new cXSDecimal(cMath.round(oValue));
	});

	fStaticContext_defineSystemFunction("round-half-to-even",	[[cXSDouble, '?'], [cXSInteger, '', true]],	function(oValue, oPrecision) {
		var nPrecision	= arguments.length > 1 ? oPrecision.valueOf() : 0;

			if (nPrecision < 0) {
			var oPower	= new cXSInteger(cMath.pow(10,-nPrecision)),
				nRounded= cMath.round(hStaticContext_operators["numeric-divide"].call(this, oValue, oPower)),
				oRounded= new cXSInteger(nRounded);
				nDecimal= cMath.abs(hStaticContext_operators["numeric-subtract"].call(this, oRounded, hStaticContext_operators["numeric-divide"].call(this, oValue, oPower)));
			return hStaticContext_operators["numeric-multiply"].call(this, hStaticContext_operators["numeric-add"].call(this, oRounded, new cXSDecimal(nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), oPower);
		}
		else {
			var oPower	= new cXSInteger(cMath.pow(10, nPrecision)),
				nRounded= cMath.round(hStaticContext_operators["numeric-multiply"].call(this, oValue, oPower)),
				oRounded= new cXSInteger(nRounded);
				nDecimal= cMath.abs(hStaticContext_operators["numeric-subtract"].call(this, oRounded, hStaticContext_operators["numeric-multiply"].call(this, oValue, oPower)));
			return hStaticContext_operators["numeric-divide"].call(this, hStaticContext_operators["numeric-add"].call(this, oRounded, new cXSDecimal(nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), oPower);
		}
	});




	fStaticContext_defineSystemFunction("resolve-QName",	[[cXSString, '?'], [cXTElement]],	function(oQName, oElement) {
		if (oQName == null)
			return null;

		var sQName	= oQName.valueOf(),
			aMatch	= sQName.match(rXSQName);
		if (!aMatch)
			throw new cException("FOCA0002"
					, "Invalid QName '" + sQName + "'"
			);

		var sPrefix	= aMatch[1] || null,
			sLocalName	= aMatch[2],
			sNameSpaceURI = this.DOMAdapter.lookupNamespaceURI(oElement, sPrefix);
			if (sPrefix != null &&!sNameSpaceURI)
			throw new cException("FONS0004"
					, "Namespace prefix '" + sPrefix + "' has not been declared"
			);

		return new cXSQName(sPrefix, sLocalName, sNameSpaceURI || null);
	});

	fStaticContext_defineSystemFunction("QName",		[[cXSString, '?'], [cXSString]],	function(oUri, oQName) {
		var sQName	= oQName.valueOf(),
			aMatch	= sQName.match(rXSQName);

		if (!aMatch)
			throw new cException("FOCA0002"
					, "Invalid QName '" + sQName + "'"
			);

		return new cXSQName(aMatch[1] || null, aMatch[2] || null, oUri == null ? '' : oUri.valueOf());
	});

	fStaticContext_defineSystemFunction("prefix-from-QName",			[[cXSQName, '?']],	function(oQName) {
		if (oQName != null) {
			if (oQName.prefix)
				return new cXSNCName(oQName.prefix);
		}
			return null;
	});

	fStaticContext_defineSystemFunction("local-name-from-QName",		[[cXSQName, '?']],	function(oQName) {
		if (oQName == null)
			return null;

		return new cXSNCName(oQName.localName);
	});

	fStaticContext_defineSystemFunction("namespace-uri-from-QName",	[[cXSQName, '?']],	function(oQName) {
		if (oQName == null)
			return null;

		return cXSAnyURI.cast(new cXSString(oQName.namespaceURI || ''));
	});

	fStaticContext_defineSystemFunction("namespace-uri-for-prefix",	[[cXSString, '?'], [cXTElement]],	function(oPrefix, oElement) {
		var sPrefix	= oPrefix == null ? '' : oPrefix.valueOf(),
			sNameSpaceURI	= this.DOMAdapter.lookupNamespaceURI(oElement, sPrefix || null);

		return sNameSpaceURI == null ? null : cXSAnyURI.cast(new cXSString(sNameSpaceURI));
	});

	fStaticContext_defineSystemFunction("in-scope-prefixes",	[[cXTElement]],	function(oElement) {
		throw "Function '" + "in-scope-prefixes" + "' not implemented";
	});




	fStaticContext_defineSystemFunction("boolean",	[[cXTItem, '*']],	function(oSequence1) {
		return new cXSBoolean(fFunction_sequence_toEBV(oSequence1, this));
	});

	fStaticContext_defineSystemFunction("index-of",	[[cXSAnyAtomicType, '*'], [cXSAnyAtomicType], [cXSString, '', true]],	function(oSequence1, oSearch, oCollation) {
		if (!oSequence1.length || oSearch == null)
			return [];

		
		var vLeft	= oSearch;
			if (vLeft instanceof cXSUntypedAtomic)
			vLeft	= cXSString.cast(vLeft);

		var oSequence	= [];
		for (var nIndex = 0, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
			vRight	= oSequence1[nIndex];
					if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSString.cast(vRight);
					if (vRight.valueOf() === vLeft.valueOf())
				oSequence.push(new cXSInteger(nIndex + 1));
		}

		return oSequence;
	});

	fStaticContext_defineSystemFunction("empty",	[[cXTItem, '*']],	function(oSequence1) {
		return new cXSBoolean(!oSequence1.length);
	});

	fStaticContext_defineSystemFunction("exists",	[[cXTItem, '*']],	function(oSequence1) {
		return new cXSBoolean(!!oSequence1.length);
	});

	fStaticContext_defineSystemFunction("distinct-values",	[[cXSAnyAtomicType, '*'], [cXSString, '', true]],	function(oSequence1, oCollation) {
		if (!oSequence1.length)
			return null;

		var oSequence	= [];
		for (var nIndex = 0, nLength = oSequence1.length, vLeft; nIndex < nLength; nIndex++) {
			vLeft	= oSequence1[nIndex];
					if (vLeft instanceof cXSUntypedAtomic)
				vLeft	= cXSString.cast(vLeft);
			for (var nRightIndex = 0, nRightLength = oSequence.length, vRight, bFound = false; (nRightIndex < nRightLength) &&!bFound; nRightIndex++) {
				vRight	= oSequence[nRightIndex];
							if (vRight instanceof cXSUntypedAtomic)
					vRight	= cXSString.cast(vRight);
							if (vRight.valueOf() === vLeft.valueOf())
					bFound	= true;
			}
			if (!bFound)
				oSequence.push(oSequence1[nIndex]);
		}

		return oSequence;
	});

	fStaticContext_defineSystemFunction("insert-before",	[[cXTItem, '*'], [cXSInteger], [cXTItem, '*']],	function(oSequence1, oPosition, oSequence3) {
		if (!oSequence1.length)
			return oSequence3;
		if (!oSequence3.length)
			return oSequence1;

		var nLength 	= oSequence1.length,
			nPosition	= oPosition.valueOf();
		if (nPosition < 1)
			nPosition	= 1;
		else
		if (nPosition > nLength)
			nPosition	= nLength + 1;

		var oSequence	=  [];
		for (var nIndex = 0; nIndex < nLength; nIndex++) {
			if (nPosition == nIndex + 1)
				oSequence	= oSequence.concat(oSequence3);
			oSequence.push(oSequence1[nIndex]);
		}
		if (nPosition == nIndex + 1)
			oSequence	= oSequence.concat(oSequence3);

		return oSequence;
	});

	fStaticContext_defineSystemFunction("remove",	[[cXTItem, '*'], [cXSInteger]],	function(oSequence1, oPosition) {
		if (!oSequence1.length)
			return [];

		var nLength 	= oSequence1.length,
			nPosition	= oPosition.valueOf();

		if (nPosition < 1 || nPosition > nLength)
			return oSequence1;

		var oSequence	=  [];
		for (var nIndex = 0; nIndex < nLength; nIndex++)
			if (nPosition != nIndex + 1)
				oSequence.push(oSequence1[nIndex]);

		return oSequence;
	});

	fStaticContext_defineSystemFunction("reverse",	[[cXTItem, '*']],	function(oSequence1) {
		oSequence1.reverse();

		return oSequence1;
	});

	fStaticContext_defineSystemFunction("subsequence",	[[cXTItem, '*'], [cXSDouble, ''], [cXSDouble, '', true]],	function(oSequence1, oStart, oLength) {
		var nPosition	= cMath.round(oStart),
			nLength		= arguments.length > 2 ? cMath.round(oLength) : oSequence1.length - nPosition + 1;

			return oSequence1.slice(nPosition - 1, nPosition - 1 + nLength);
	});

	fStaticContext_defineSystemFunction("unordered",	[[cXTItem, '*']],	function(oSequence1) {
		return oSequence1;
	});


	fStaticContext_defineSystemFunction("zero-or-one",	[[cXTItem, '*']],	function(oSequence1) {
		if (oSequence1.length > 1)
			throw new cException("FORG0003");

		return oSequence1;
	});

	fStaticContext_defineSystemFunction("one-or-more",	[[cXTItem, '*']],	function(oSequence1) {
		if (!oSequence1.length)
			throw new cException("FORG0004");

		return oSequence1;
	});

	fStaticContext_defineSystemFunction("exactly-one",	[[cXTItem, '*']],	function(oSequence1) {
		if (oSequence1.length != 1)
			throw new cException("FORG0005");

		return oSequence1;
	});


	fStaticContext_defineSystemFunction("deep-equal",	[[cXTItem, '*'], [cXTItem, '*'], [cXSString, '', true]],	function(oSequence1, oSequence2, oCollation) {
		throw "Function '" + "deep-equal" + "' not implemented";
	});


	fStaticContext_defineSystemFunction("count",	[[cXTItem, '*']],	function(oSequence1) {
		return new cXSInteger(oSequence1.length);
	});

	fStaticContext_defineSystemFunction("avg",	[[cXSAnyAtomicType, '*']],	function(oSequence1) {
		if (!oSequence1.length)
			return null;

			try {
			var vValue	= oSequence1[0];
			if (vValue instanceof cXSUntypedAtomic)
				vValue	= cXSDouble.cast(vValue);
			for (var nIndex = 1, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
				vRight	= oSequence1[nIndex];
				if (vRight instanceof cXSUntypedAtomic)
					vRight	= cXSDouble.cast(vRight);
				vValue	= hAdditiveExpr_operators['+'](vValue, vRight, this);
			}
			return hMultiplicativeExpr_operators['div'](vValue, new cXSInteger(nLength), this);
		}
		catch (e) {
					throw e.code != "XPTY0004" ? e : new cException("FORG0006"
					, "Input to avg() contains a mix of types"
			);
		}
	});

	fStaticContext_defineSystemFunction("max",	[[cXSAnyAtomicType, '*'], [cXSString, '', true]],	function(oSequence1, oCollation) {
		if (!oSequence1.length)
			return null;

		
			try {
			var vValue	= oSequence1[0];
			for (var nIndex = 1, nLength = oSequence1.length; nIndex < nLength; nIndex++)
				if (hComparisonExpr_ValueComp_operators['ge'](oSequence1[nIndex], vValue, this).valueOf())
					vValue	= oSequence1[nIndex];
			return vValue;
		}
		catch (e) {
					throw e.code != "XPTY0004" ? e : new cException("FORG0006"
					, "Input to max() contains a mix of not comparable values"
			);
		}
	});

	fStaticContext_defineSystemFunction("min",	[[cXSAnyAtomicType, '*'], [cXSString, '', true]],	function(oSequence1, oCollation) {
		if (!oSequence1.length)
			return null;

		
			try {
			var vValue	= oSequence1[0];
			for (var nIndex = 1, nLength = oSequence1.length; nIndex < nLength; nIndex++)
				if (hComparisonExpr_ValueComp_operators['le'](oSequence1[nIndex], vValue, this).valueOf())
					vValue	= oSequence1[nIndex];
			return vValue;
		}
		catch (e) {
					throw e.code != "XPTY0004" ? e : new cException("FORG0006"
					, "Input to min() contains a mix of not comparable values"
			);
		}
	});

	fStaticContext_defineSystemFunction("sum",	[[cXSAnyAtomicType, '*'], [cXSAnyAtomicType, '?', true]],	function(oSequence1, oZero) {
		if (!oSequence1.length) {
			if (arguments.length > 1)
				return oZero;
			else
				return new cXSDouble(0);

			return null;
		}

		
			try {
			var vValue	= oSequence1[0];
			if (vValue instanceof cXSUntypedAtomic)
				vValue	= cXSDouble.cast(vValue);
			for (var nIndex = 1, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
				vRight	= oSequence1[nIndex];
				if (vRight instanceof cXSUntypedAtomic)
					vRight	= cXSDouble.cast(vRight);
				vValue	= hAdditiveExpr_operators['+'](vValue, vRight, this);
			}
			return vValue;
		}
		catch (e) {
					throw e.code != "XPTY0004" ? e : new cException("FORG0006"
					, "Input to sum() contains a mix of types"
			);
		}
	});


	fStaticContext_defineSystemFunction("id",	[[cXSString, '*'], [cXTNode, '', true]],	function(oSequence1, oNode) {
		if (arguments.length < 2) {
			if (!this.DOMAdapter.isNode(this.item))
				throw new cException("XPTY0004"
						, "id() function called when the context item is not a node"
				);
			oNode	= this.item;
		}

			var oDocument	= hStaticContext_functions["root"].call(this, oNode);
		if (this.DOMAdapter.getProperty(oDocument, "nodeType") != 9)
			throw new cException("FODC0001");

			var oSequence	= [];
		for (var nIndex = 0; nIndex < oSequence1.length; nIndex++)
			for (var nRightIndex = 0, aValue = fString_trim(oSequence1[nIndex]).split(/\s+/), nRightLength = aValue.length; nRightIndex < nRightLength; nRightIndex++)
				if ((oNode = this.DOMAdapter.getElementById(oDocument, aValue[nRightIndex])) && fArray_indexOf(oSequence, oNode) ==-1)
					oSequence.push(oNode);
			return fFunction_sequence_order(oSequence, this);
	});

	fStaticContext_defineSystemFunction("idref",	[[cXSString, '*'], [cXTNode, '', true]],	function(oSequence1, oNode) {
		throw "Function '" + "idref" + "' not implemented";
	});

	fStaticContext_defineSystemFunction("doc",			[[cXSString, '?', true]],	function(oUri) {
		throw "Function '" + "doc" + "' not implemented";
	});

	fStaticContext_defineSystemFunction("doc-available",	[[cXSString, '?', true]],	function(oUri) {
		throw "Function '" + "doc-available" + "' not implemented";
	});

	fStaticContext_defineSystemFunction("collection",	[[cXSString, '?', true]],	function(oUri) {
		throw "Function '" + "collection" + "' not implemented";
	});

	fStaticContext_defineSystemFunction("element-with-id",	[[cXSString, '*'], [cXTNode, '', true]],	function(oSequence1, oNode) {
		throw "Function '" + "element-with-id" + "' not implemented";
	});

	function fFunction_sequence_toEBV(oSequence1, oContext) {
		if (!oSequence1.length)
			return false;

		var oItem	= oSequence1[0];
		if (oContext.DOMAdapter.isNode(oItem))
			return true;

		if (oSequence1.length == 1) {
			if (oItem instanceof cXSBoolean)
				return oItem.value.valueOf();
			if (oItem instanceof cXSString)
				return !!oItem.valueOf().length;
			if (fXSAnyAtomicType_isNumeric(oItem))
				return !(fIsNaN(oItem.valueOf()) || oItem.valueOf() == 0);

			throw new cException("FORG0006"
					, "Effective boolean value is defined only for sequences containing booleans, strings, numbers, URIs, or nodes"
			);
		}

		throw new cException("FORG0006"
				, "Effective boolean value is not defined for a sequence of two or more items"
		);
	};

	function fFunction_sequence_atomize(oSequence1, oContext) {
		var oSequence	= [];
		for (var nIndex = 0, nLength = oSequence1.length, oItem, vItem; nIndex < nLength; nIndex++) {
			oItem	= oSequence1[nIndex];
			vItem	= null;
					if (oItem == null)
				vItem	= null;
					else
			if (oContext.DOMAdapter.isNode(oItem)) {
				var fGetProperty	= oContext.DOMAdapter.getProperty;
				switch (fGetProperty(oItem, "nodeType")) {
					case 1:						vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "textContent"));
						break;
					case 2:						vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "value"));
						break;
					case 3:					case 4:					case 8:						vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "data"));
						break;
					case 7:						vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "data"));
						break;
					case 9:						var oNode	= fGetProperty(oItem, "documentElement");
						vItem	= new cXSUntypedAtomic(oNode ? fGetProperty(oNode, "textContent") : '');
						break;
				}
			}
					else
			if (oItem instanceof cXSAnyAtomicType)
				vItem	= oItem;

					if (vItem != null)
				oSequence.push(vItem);
		}

		return oSequence;
	};

	function fFunction_sequence_order(oSequence1, oContext) {
		return oSequence1.sort(function(oNode, oNode2) {
			var nPosition	= oContext.DOMAdapter.compareDocumentPosition(oNode, oNode2);
			return nPosition & 2 ? 1 : nPosition & 4 ?-1 : 0;
		});
	};




	fStaticContext_defineSystemFunction("codepoints-to-string",	[[cXSInteger, '*']],	function(oSequence1) {
		var aValue	= [];
		for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++)
			aValue.push(cString.fromCharCode(oSequence1[nIndex]));

		return new cXSString(aValue.join(''));
	});

	fStaticContext_defineSystemFunction("string-to-codepoints",	[[cXSString, '?']],	function(oValue) {
		if (oValue == null)
			return null;

		var sValue	= oValue.valueOf();
		if (sValue == '')
			return [];

		var oSequence	= [];
		for (var nIndex = 0, nLength = sValue.length; nIndex < nLength; nIndex++)
			oSequence.push(new cXSInteger(sValue.charCodeAt(nIndex)));

		return oSequence;
	});

	fStaticContext_defineSystemFunction("compare",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue1, oValue2, oCollation) {
		if (oValue1 == null || oValue2 == null)
			return null;

		var sCollation	= this.staticContext.defaultCollationName,
			vCollation;
		if (arguments.length > 2)
			sCollation	= oCollation.valueOf();

		vCollation	= sCollation == sNS_XPF + "/collation/codepoint" ? oCodepointStringCollator : this.staticContext.getCollation(sCollation);
		if (!vCollation)
			throw new cException("FOCH0002"
					, "Unknown collation " + '{' + sCollation + '}'
			);

		return new cXSInteger(vCollation.compare(oValue1.valueOf(), oValue2.valueOf()));
	});

	fStaticContext_defineSystemFunction("codepoint-equal",	[[cXSString, '?'], [cXSString, '?']],	function(oValue1, oValue2) {
		if (oValue1 == null || oValue2 == null)
			return null;

		
		return new cXSBoolean(oValue1.valueOf() == oValue2.valueOf());
	});


	fStaticContext_defineSystemFunction("concat",	null,	function() {
			if (arguments.length < 2)
			throw new cException("XPST0017"
					, "Function concat() must have at least 2 arguments"
			);

		var aValue	= [];
		for (var nIndex = 0, nLength = arguments.length, oSequence; nIndex < nLength; nIndex++) {
			oSequence	= arguments[nIndex];
					fFunctionCall_assertSequenceCardinality(this, oSequence, '?'
					, "each argument of concat()"
			);
					if (oSequence.length)
				aValue[aValue.length]	= cXSString.cast(fFunction_sequence_atomize(oSequence, this)[0]).valueOf();
		}

		return new cXSString(aValue.join(''));
	});

	fStaticContext_defineSystemFunction("string-join",	[[cXSString, '*'], [cXSString]],	function(oSequence1, oValue) {
		return new cXSString(oSequence1.join(oValue));
	});

	fStaticContext_defineSystemFunction("substring",	[[cXSString, '?'], [cXSDouble], [cXSDouble, '', true]],	function(oValue, oStart, oLength) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			nStart	= cMath.round(oStart) - 1,
			nEnd	= arguments.length > 2 ? nStart + cMath.round(oLength) : sValue.length;

			return new cXSString(nEnd > nStart ? sValue.substring(nStart, nEnd) : '');
	});

	fStaticContext_defineSystemFunction("string-length",	[[cXSString, '?', true]],	function(oValue) {
		if (!arguments.length) {
			if (!this.item)
				throw new cException("XPDY0002");
			oValue	= cXSString.cast(fFunction_sequence_atomize([this.item], this)[0]);
		}
		return new cXSInteger(oValue == null ? 0 : oValue.valueOf().length);
	});

	fStaticContext_defineSystemFunction("normalize-space",	[[cXSString, '?', true]],	function(oValue) {
		if (!arguments.length) {
			if (!this.item)
				throw new cException("XPDY0002");
			oValue	= cXSString.cast(fFunction_sequence_atomize([this.item], this)[0]);
		}
		return new cXSString(oValue == null ? '' : fString_trim(oValue).replace(/\s\s+/g, ' '));
	});

	fStaticContext_defineSystemFunction("normalize-unicode",	[[cXSString, '?'], [cXSString, '', true]],	function(oValue, oNormalization) {
		throw "Function '" + "normalize-unicode" + "' not implemented";
	});

	fStaticContext_defineSystemFunction("upper-case",	[[cXSString, '?']],	function(oValue) {
		return new cXSString(oValue == null ? '' : oValue.valueOf().toUpperCase());
	});

	fStaticContext_defineSystemFunction("lower-case",	[[cXSString, '?']],	function(oValue) {
		return new cXSString(oValue == null ? '' : oValue.valueOf().toLowerCase());
	});

	fStaticContext_defineSystemFunction("translate",	[[cXSString, '?'], [cXSString], [cXSString]],	function(oValue, oMap, oTranslate) {
		if (oValue == null)
			return new cXSString('');

		var aValue	= oValue.valueOf().split(''),
			aMap	= oMap.valueOf().split(''),
			aTranslate	= oTranslate.valueOf().split(''),
			nTranslateLength	= aTranslate.length,
			aReturn	= [];
		for (var nIndex = 0, nLength = aValue.length, nPosition; nIndex < nLength; nIndex++)
			if ((nPosition = aMap.indexOf(aValue[nIndex])) ==-1)
				aReturn[aReturn.length]	= aValue[nIndex];
			else
			if (nPosition < nTranslateLength)
				aReturn[aReturn.length]	= aTranslate[nPosition];

		return new cXSString(aReturn.join(''));
	});

	fStaticContext_defineSystemFunction("encode-for-uri",	[[cXSString, '?']],	function(oValue) {
		return new cXSString(oValue == null ? '' : window.encodeURIComponent(oValue));
	});

	fStaticContext_defineSystemFunction("iri-to-uri",		[[cXSString, '?']],	function(oValue) {
		return new cXSString(oValue == null ? '' : window.encodeURI(window.decodeURI(oValue)));
	});

	fStaticContext_defineSystemFunction("escape-html-uri",	[[cXSString, '?']],	function(oValue) {
		if (oValue == null || oValue.valueOf() == '')
			return new cXSString('');
			var aValue	= oValue.valueOf().split('');
		for (var nIndex = 0, nLength = aValue.length, nCode; nIndex < nLength; nIndex++)
			if ((nCode = aValue[nIndex].charCodeAt(0)) < 32 || nCode > 126)
				aValue[nIndex]	= window.encodeURIComponent(aValue[nIndex]);
		return new cXSString(aValue.join(''));
	});


	fStaticContext_defineSystemFunction("contains",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
		return new cXSBoolean((oValue == null ? '' : oValue.valueOf()).indexOf(oSearch == null ? '' : oSearch.valueOf()) >= 0);
	});

	fStaticContext_defineSystemFunction("starts-with",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
		return new cXSBoolean((oValue == null ? '' : oValue.valueOf()).indexOf(oSearch == null ? '' : oSearch.valueOf()) == 0);
	});

	fStaticContext_defineSystemFunction("ends-with",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			sSearch	= oSearch == null ? '' : oSearch.valueOf();

		return new cXSBoolean(sValue.indexOf(sSearch) == sValue.length - sSearch.length);
	});

	fStaticContext_defineSystemFunction("substring-before",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			sSearch	= oSearch == null ? '' : oSearch.valueOf(),
			nPosition;

		return new cXSString((nPosition = sValue.indexOf(sSearch)) >= 0 ? sValue.substring(0, nPosition) : '');
	});

	fStaticContext_defineSystemFunction("substring-after",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			sSearch	= oSearch == null ? '' : oSearch.valueOf(),
			nPosition;

		return new cXSString((nPosition = sValue.indexOf(sSearch)) >= 0 ? sValue.substring(nPosition + sSearch.length) : '');
	});


	function fFunction_string_createRegExp(sValue, sFlags) {
		var d1	= '\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF',
			d2	= '\u0370-\u037D\u037F-\u1FFF\u200C-\u200D',
			d3	= '\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD',
			c	= 'A-Z_a-z\\-.0-9\u00B7' + d1 + '\u0300-\u036F' + d2 + '\u203F-\u2040' + d3,
			i	= 'A-Z_a-z' + d1 + d2 + d3;

		sValue	= sValue
					.replace(/\[\\i-\[:\]\]/g, '[' + i + ']')
					.replace(/\[\\c-\[:\]\]/g, '[' + c + ']')
					.replace(/\\i/g, '[:' + i + ']')
					.replace(/\\I/g, '[^:' + i + ']')
					.replace(/\\c/g, '[:' + c + ']')
					.replace(/\\C/g, '[^:' + c + ']');

			if (sFlags && !sFlags.match(/^[smix]+$/))
			throw new cException("FORX0001");	
		var bFlagS	= sFlags.indexOf('s') >= 0,
			bFlagX	= sFlags.indexOf('x') >= 0;
		if (bFlagS || bFlagX) {
					sFlags	= sFlags.replace(/[sx]/g, '');
			var aValue	= [],
				rValue	= /\s/;
			for (var nIndex = 0, nLength = sValue.length, bValue = false, sCharCurr, sCharPrev = ''; nIndex < nLength; nIndex++) {
				sCharCurr	= sValue.charAt(nIndex);
				if (sCharPrev != '\\') {
					if (sCharCurr == '[')
						bValue	= true;
					else
					if (sCharCurr == ']')
						bValue	= false;
				}
							if (bValue || !(bFlagX && rValue.test(sCharCurr))) {
									if (!bValue && (bFlagS && sCharCurr == '.' && sCharPrev != '\\'))
						aValue[aValue.length]	= '(?:.|\\s)';
					else
						aValue[aValue.length]	= sCharCurr;
				}
				sCharPrev	= sCharCurr;
			}
			sValue	= aValue.join('');
		}

		return new cRegExp(sValue, sFlags + 'g');
	};

	fStaticContext_defineSystemFunction("matches",	[[cXSString, '?'], [cXSString], [cXSString, '', true]],	function(oValue, oPattern, oFlags) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			rRegExp	= fFunction_string_createRegExp(oPattern.valueOf(), arguments.length > 2 ? oFlags.valueOf() : '');

		return new cXSBoolean(rRegExp.test(sValue));
	});

	fStaticContext_defineSystemFunction("replace",	[[cXSString, '?'], [cXSString],  [cXSString], [cXSString, '', true]],	function(oValue, oPattern, oReplacement, oFlags) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			rRegExp	= fFunction_string_createRegExp(oPattern.valueOf(), arguments.length > 3 ? oFlags.valueOf() : '');

		return new cXSBoolean(sValue.replace(rRegExp, oReplacement.valueOf()));
	});

	fStaticContext_defineSystemFunction("tokenize",	[[cXSString, '?'], [cXSString], [cXSString, '', true]],	function(oValue, oPattern, oFlags) {
		var sValue	= oValue == null ? '' : oValue.valueOf(),
			rRegExp	= fFunction_string_createRegExp(oPattern.valueOf(), arguments.length > 2 ? oFlags.valueOf() : '');

		var oSequence	= [];
		for (var nIndex = 0, aValue = sValue.split(rRegExp), nLength = aValue.length; nIndex < nLength; nIndex++)
			oSequence.push(new cXSString(aValue[nIndex]));

		return oSequence;
	});




	fStaticContext_defineSystemFunction("trace",		[[cXTItem, '*'], [cXSString]],	function(oSequence1, oLabel) {
		var oConsole	= window.console;
		if (oConsole && oConsole.log)
			oConsole.log(oLabel.valueOf(), oSequence1);
		return oSequence1;
	});


	var oCodepointStringCollator	= new cStringCollator;

	oCodepointStringCollator.equals	= function(sValue1, sValue2) {
		return sValue1 == sValue2;
	};

	oCodepointStringCollator.compare	= function(sValue1, sValue2) {
		return sValue1 == sValue2 ? 0 : sValue1 > sValue2 ? 1 :-1;
	};


	var cAttr	= function() {

	};

	cAttr.prototype.nodeType		= 2;
	cAttr.prototype.nodeName		=
	cAttr.prototype.nodeValue		=
	cAttr.prototype.ownerDocument	=
	cAttr.prototype.localName		=
	cAttr.prototype.namespaceURI	=
	cAttr.prototype.prefix			=
	cAttr.prototype.attributes		=
	cAttr.prototype.childNodes		=
	cAttr.prototype.firstChild		=
	cAttr.prototype.lastChild		=
	cAttr.prototype.previousSibling	=
	cAttr.prototype.nextSibling		=
	cAttr.prototype.parentNode		=

	cAttr.prototype.name			=
	cAttr.prototype.specified		=
	cAttr.prototype.value			=
	cAttr.prototype.ownerElement	= null;


	function cLXDOMAdapter() {

	};

	cLXDOMAdapter.prototype	= new cDOMAdapter;

	var oLXDOMAdapter_staticContext	= new cStaticContext;

	cLXDOMAdapter.prototype.getProperty	= function(oNode, sName) {
			if (sName in oNode)
			return oNode[sName];

			if (sName == "baseURI") {
			var sBaseURI	= '',
				fResolveUri	= oLXDOMAdapter_staticContext.getFunction('{' + "http://www.w3.org/2005/xpath-functions" + '}' + "resolve-uri"),
				cXSString	= oLXDOMAdapter_staticContext.getDataType('{' + "http://www.w3.org/2001/XMLSchema" + '}' + "string");

			for (var oParent = oNode, sUri; oParent; oParent = oParent.parentNode)
				if (oParent.nodeType == 1  && (sUri = oParent.getAttribute("xml:base")))
					sBaseURI	= fResolveUri(new cXSString(sUri), new cXSString(sBaseURI)).toString();
					return sBaseURI;
		}
		else
		if (sName == "textContent") {
			var aText = [];
			(function(oNode) {
				for (var nIndex = 0, oChild; oChild = oNode.childNodes[nIndex]; nIndex++)
					if (oChild.nodeType == 3  || oChild.nodeType == 4 )
						aText.push(oChild.data);
					else
					if (oChild.nodeType == 1  && oChild.firstChild)
						arguments.callee(oChild);
			})(oNode);
			return aText.join('');
		}
	};

	cLXDOMAdapter.prototype.compareDocumentPosition	= function(oNode, oChild) {
			if ("compareDocumentPosition" in oNode)
			return oNode.compareDocumentPosition(oChild);

			if (oChild == oNode)
			return 0;

			var oAttr1	= null,
			oAttr2	= null,
			aAttributes,
			oAttr, oElement, nIndex, nLength;
		if (oNode.nodeType == 2 ) {
			oAttr1	= oNode;
			oNode	= this.getProperty(oAttr1, "ownerElement");
		}
		if (oChild.nodeType == 2 ) {
			oAttr2	= oChild;
			oChild	= this.getProperty(oAttr2, "ownerElement");
		}

			if (oAttr1 && oAttr2 && oNode && oNode == oChild) {
			for (nIndex = 0, aAttributes = this.getProperty(oNode, "attributes"), nLength = aAttributes.length; nIndex < nLength; nIndex++) {
				oAttr	= aAttributes[nIndex];
				if (oAttr == oAttr1)
					return 32  | 4 ;
				if (oAttr == oAttr2)
					return 32  | 2 ;
			}
		}

			var aChain1	= [], nLength1, oNode1,
			aChain2	= [], nLength2, oNode2;
			if (oAttr1)
			aChain1.push(oAttr1);
		for (oElement = oNode; oElement; oElement = oElement.parentNode)
			aChain1.push(oElement);
		if (oAttr2)
			aChain2.push(oAttr2);
		for (oElement = oChild; oElement; oElement = oElement.parentNode)
			aChain2.push(oElement);
			if (((oNode.ownerDocument || oNode) != (oChild.ownerDocument || oChild)) || (aChain1[aChain1.length - 1] != aChain2[aChain2.length - 1]))
			return 32  | 1 ;
			for (nIndex = cMath.min(nLength1 = aChain1.length, nLength2 = aChain2.length); nIndex; --nIndex)
			if ((oNode1 = aChain1[--nLength1]) != (oNode2 = aChain2[--nLength2])) {
							if (oNode1.nodeType == 2 )
					return 4 ;
				if (oNode2.nodeType == 2 )
					return 2 ;
							if (!oNode2.nextSibling)
					return 4 ;
				if (!oNode1.nextSibling)
					return 2 ;
				for (oElement = oNode2.previousSibling; oElement; oElement = oElement.previousSibling)
					if (oElement == oNode1)
						return 4 ;
				return 2 ;
			}
			return nLength1 < nLength2 ? 4  | 16  : 2  | 8 ;
	};

	cLXDOMAdapter.prototype.lookupNamespaceURI	= function(oNode, sPrefix) {
			if ("lookupNamespaceURI" in oNode)
			return oNode.lookupNamespaceURI(sPrefix);

			for (; oNode && oNode.nodeType != 9  ; oNode = oNode.parentNode)
			if (sPrefix == this.getProperty(oChild, "prefix"))
				return this.getProperty(oNode, "namespaceURI");
			else
			if (oNode.nodeType == 1)				for (var oAttributes = this.getProperty(oNode, "attributes"), nIndex = 0, nLength = oAttributes.length, sName = "xmlns" + ':' + sPrefix; nIndex < nLength; nIndex++)
					if (this.getProperty(oAttributes[nIndex], "nodeName") == sName)
						return this.getProperty(oAttributes[nIndex], "value");
		return null;
	};

	cLXDOMAdapter.prototype.getElementsByTagNameNS	= function(oNode, sNameSpaceURI, sLocalName) {
			if ("getElementsByTagNameNS" in oNode)
			return oNode.getElementsByTagNameNS(sNameSpaceURI, sLocalName);

			var aElements	= [],
			bNameSpaceURI	= '*' == sNameSpaceURI,
			bLocalName		= '*' == sLocalName;
		(function(oNode) {
			for (var nIndex = 0, oChild; oChild = oNode.childNodes[nIndex]; nIndex++)
				if (oChild.nodeType == 1) {					if ((bLocalName || sLocalName == this.getProperty(oChild, "localName")) && (bNameSpaceURI || sNameSpaceURI == this.getProperty(oChild, "namespaceURI")))
						aElements[aElements.length]	= oChild;
					if (oChild.firstChild)
						arguments.callee(oChild);
				}
		})(oNode);
		return aElements;
	};


	var oL2DOMAdapter	= new cLXDOMAdapter;



	var oL2HTMLDOMAdapter	= new cLXDOMAdapter;

	oL2HTMLDOMAdapter.getProperty	= function(oNode, sName) {
		if (sName == "localName") {
			if (oNode.nodeType == 1)
				return oNode.localName.toLowerCase();
		}
		if (sName == "namespaceURI")
			return oNode.nodeType == 1 ? "http://www.w3.org/1999/xhtml" : null;
			return cLXDOMAdapter.prototype.getProperty.call(this, oNode, sName);
	};


	var oMSHTMLDOMAdapter	= new cLXDOMAdapter;

	oMSHTMLDOMAdapter.getProperty	= function(oNode, sName) {
		if (sName == "localName") {
			if (oNode.nodeType == 1)
				return oNode.nodeName.toLowerCase();
		}
		if (sName == "prefix")
			return null;
		if (sName == "namespaceURI")
			return oNode.nodeType == 1 ? "http://www.w3.org/1999/xhtml" : null;
		if (sName == "textContent")
			return oNode.innerText;
		if (sName == "attributes" && oNode.nodeType == 1) {
			var aAttributes	= [];
			for (var nIndex = 0, oAttributes = oNode.attributes, nLength = oAttributes.length, oNode2, oAttribute; nIndex < nLength; nIndex++) {
				oNode2	= oAttributes[nIndex];
				if (oNode2.specified) {
					oAttribute	= new cAttr;
					oAttribute.ownerElement	= oNode;
					oAttribute.ownerDocument= oNode.ownerDocument;
					oAttribute.specified	= true;
					oAttribute.value		=
					oAttribute.nodeValue	= oNode2.nodeValue;
					oAttribute.name			=
					oAttribute.nodeName		=
									oAttribute.localName	= oNode2.nodeName.toLowerCase();
									aAttributes[aAttributes.length]	= oAttribute;
				}
			}
			return aAttributes;
		}
			return cLXDOMAdapter.prototype.getProperty.call(this, oNode, sName);
	};


	var oMSXMLDOMAdapter	= new cLXDOMAdapter;

	oMSXMLDOMAdapter.getProperty	= function(oNode, sName) {
		if (sName == "localName") {
			if (oNode.nodeType == 7)
				return null;
			if (oNode.nodeType == 1)
				return oNode.baseName;
		}
		if (sName == "prefix" || sName == "namespaceURI")
			return oNode[sName] || null;
		if (sName == "textContent")
			return oNode.text;
		if (sName == "attributes" && oNode.nodeType == 1) {
			var aAttributes	= [];
			for (var nIndex = 0, oAttributes = oNode.attributes, nLength = oAttributes.length, oNode2, oAttribute; nIndex < nLength; nIndex++) {
				oNode2	= oAttributes[nIndex];
				if (oNode2.specified) {
					oAttribute	= new cAttr;
					oAttribute.nodeType		= 2;
					oAttribute.ownerElement	= oNode;
					oAttribute.ownerDocument= oNode.ownerDocument;
					oAttribute.specified	= true;
					oAttribute.value		=
					oAttribute.nodeValue	= oNode2.nodeValue;
					oAttribute.name			=
					oAttribute.nodeName		= oNode2.nodeName;
									oAttribute.localName	= oNode2.baseName;
					oAttribute.prefix		= oNode2.prefix || null;
					oAttribute.namespaceURI	= oNode2.namespaceURI || null;
									aAttributes[aAttributes.length]	= oAttribute;
				}
			}
			return aAttributes;
		}
			return cLXDOMAdapter.prototype.getProperty.call(this, oNode, sName);
	};

	oMSXMLDOMAdapter.getElementById	= function(oDocument, sId) {
		return oDocument.nodeFromID(sId);
	};




	var cQuery		= window.jQuery,
		oDocument	= window.document,
			bOldMS	= !!oDocument.namespaces && !oDocument.createElementNS,
			bOldW3	= !bOldMS && oDocument.documentElement.namespaceURI != "http://www.w3.org/1999/xhtml";

	var oHTMLStaticContext	= new cStaticContext,
		oXMLStaticContext	= new cStaticContext;

	oHTMLStaticContext.baseURI	= oDocument.location.href;
	oHTMLStaticContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";
	oHTMLStaticContext.defaultElementNamespace	= "http://www.w3.org/1999/xhtml";

	oXMLStaticContext.defaultFunctionNamespace	= oHTMLStaticContext.defaultFunctionNamespace;

	function fXPath_evaluate(oQuery, sExpression, fNSResolver) {
			if (typeof sExpression == "undefined" || sExpression === null)
			sExpression	= '';

			var oNode	= oQuery[0];
		if (typeof oNode == "undefined")
			oNode	= null;

			var oStaticContext	= oNode && (oNode.nodeType == 9 ? oNode : oNode.ownerDocument).createElement("div").tagName == "DIV" ? oHTMLStaticContext : oXMLStaticContext;

			oStaticContext.namespaceResolver	= fNSResolver;

			var oExpression	= new cExpression(cString(sExpression), oStaticContext);

			oStaticContext.namespaceResolver	= null;

			var aSequence,
			oSequence	= new cQuery,
			oAdapter	= oL2DOMAdapter;

			if (bOldMS)
			oAdapter	= oStaticContext == oHTMLStaticContext ? oMSHTMLDOMAdapter : oMSXMLDOMAdapter;
		else
		if (bOldW3 && oStaticContext == oHTMLStaticContext)
			oAdapter	= oL2HTMLDOMAdapter;

			aSequence	= oExpression.evaluate(new cDynamicContext(oStaticContext, oNode, null, oAdapter));
		for (var nIndex = 0, nLength = aSequence.length, oItem; nIndex < nLength; nIndex++)
			oSequence.push(oAdapter.isNode(oItem = aSequence[nIndex]) ? oItem : cStaticContext.xs2js(oItem));

		return oSequence;
	};

	var oObject	= {};
	oObject.xpath	= function(oQuery, sExpression, fNSResolver) {
		return fXPath_evaluate(oQuery instanceof cQuery ? oQuery : new cQuery(oQuery), sExpression, fNSResolver);
	};
	cQuery.extend(cQuery, oObject);

	oObject	= {};
	oObject.xpath	= function(sExpression, fNSResolver) {
		return fXPath_evaluate(this, sExpression, fNSResolver);
	};
	cQuery.extend(cQuery.prototype, oObject);

	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	var HomadTracker;

	HomadTracker = (function() {
	  function HomadTracker() {
	    this.assignGlobal();
	  }

	  HomadTracker.prototype.assignGlobal = function() {
	    return window.homadPlaybackStart = this.track;
	  };

	  HomadTracker.prototype.track = function(args) {
	    if (!((window.Kobra != null) && (Kobra.Models != null))) {
	      console.warn('Kobra not available');
	      return;
	    }
	    if (args.duration > 2) {
	      console.log('[蛇]H0MAD✔');
	      Kobra.Models.WatchCount.inc({
	        key: 'homad-key',
	        foreign_type: 'Homad'
	      });
	    }
	  };

	  return HomadTracker;

	})();

	module.exports = HomadTracker;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(6);

	var HTML5Proxy = (function() {
	  function HTML5Proxy(container, settings, customVideoAttributes, debug) {

	    this.container = container;
	    this.settings = settings;
	    if (settings.hasOwnProperty("controls")) {
	      customVideoAttributes.controls = settings.controls;
	    }
	    this.player = new $.H5P.Player(
	      this.container,
	      this.settings,
	      customVideoAttributes,
	      debug
	    );

	  }

	  // translates event names between wrapper and html5player.
	  HTML5Proxy.prototype.translateEventName = function(name) {
	    var rewrites = {
	      'play'       :  'playback:started',
	      'ended'      :  'playback:ended',
	      'timeupdate' :  'timeElapsed'
	    };
	    for (var key in rewrites) {
	      if (rewrites.hasOwnProperty(key) && name == key) return rewrites[key];
	    }
	    return name;
	  };

	  HTML5Proxy.prototype.addEventListener = function(name, callback) {
	    name = this.translateEventName(name);
	    return this.player.subscribe(name, callback);
	  };

	  HTML5Proxy.prototype.removeEventListener = function(name, callback) {
	    name = this.translateEventName(name);
	    return this.player.unsubscribe(name, callback);
	  };

	  HTML5Proxy.prototype.load = function(type, token, options, callback, mrss) {
	    var smartTVMode = this.settings.html5smartTVMode;
	    return this.player.loadApiVideo(type, token, options, callback, smartTVMode, mrss);
	  };

	  HTML5Proxy.prototype.play = function() {
	    return this.player.play();
	  };

	  HTML5Proxy.prototype.pause = function() {
	    return this.player.pause();
	  };

	  HTML5Proxy.prototype.getDuration = function() {
	    return this.player.getDuration();
	  };

	  HTML5Proxy.prototype.getCurrentTime = function() {
	    return this.player.timeElapsedWithSegments();
	  };

	  HTML5Proxy.prototype.setCurrentTime = function(value) {
	    return this.player.skipTo(value);
	  };

	  HTML5Proxy.prototype.getVolume = function() {
	    return this.player.getVolume();
	  };

	  HTML5Proxy.prototype.setVolume = function(value) {
	    return this.player.setVolume(value);
	  };

	  HTML5Proxy.prototype.getAutoPlay = function() {
	    return this.player.getAutoPlay();
	  };

	  HTML5Proxy.prototype.setAutoPlay = function(value) {
	    return this.player.setAutoPlay(value);
	  };

	  HTML5Proxy.prototype.requestFullscreen = function() {
	    return this.player.requestFullscreen();
	  };

	  HTML5Proxy.prototype.invokeAd = function() {
	    return this.player.invokeAd();
	  };

	  HTML5Proxy.prototype.destroy = function() {
	    return this.player.destroy();
	  };

	  return HTML5Proxy;

	})();

	module.exports = HTML5Proxy;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function(){var Q="SDK_"+"6.6.0-r10939-201601190610".replace(/[^\w]/g,"_"),u="undefined"!=typeof window?window:"undefined"!=typeof GLOBAL?GLOBAL:this;u.tv=u.tv||{};u.tv.freewheel=u.tv.freewheel||{};u.tv.freewheel[Q]=function(u){var a={version:"js-6.6.0-r10939-201601190610"};if("undefined"!==typeof window)window._fw_admanager=window._fw_admanager||{},window._fw_admanager.version=a.version;a.LOG_LEVEL_QUIET=0;a.LOG_LEVEL_INFO=1;a.LOG_LEVEL_DEBUG=2;a.setLogLevel=function(b){"undefined"!==typeof console&&
	b>a.LOG_LEVEL_QUIET?(a.log=function(){console.log(">FW "+(new Date).toTimeString().substr(3,6)+Array.prototype.slice.call(arguments).join(" "))},a.warn=function(){console.warn(">FW "+(new Date).toTimeString().substr(3,6)+Array.prototype.slice.call(arguments).join(" "))},a.debug=b>a.LOG_LEVEL_INFO?function(){console.log(">FW "+(new Date).toTimeString().substr(3,6)+Array.prototype.slice.call(arguments).join(" "))}:function(){}):a.warn=a.log=a.debug=function(){}};a.setLogLevel(a.LOG_LEVEL_INFO);a.log("FreeWheel Integration Runtime",
	a.version);(function(){var b=navigator.userAgent.toLowerCase();a.PLATFORM_IS_WINDOWSPHONE=-1<b.search("windows phone os");a.PLATFORM_IS_IPAD=-1<b.search("ipad");a.PLATFORM_IS_IPHONE_IPOD=-1<b.search("iphone")||-1<b.search("ipod");a.PLATFORM_IE_MOBILE_VERSION=function(){var a=b.search(/iemobile\/\d\.\d/);if(-1<a){var d=b.substr(a+9,1),a=b.substr(a+11,1);return 1*d+0.1*a}return 0}();a.PLATFORM_IOS_VERSION=function(){var a=b.search(/os \d_\d/);if(-1<a){var d=b.substr(a+3,1),a=b.substr(a+5,1);return 1*
	d+0.1*a}return 0}();a.PLATFORM_ANDROID_VERSION=function(){var a=b.search(/android \d\.\d/);if(-1<a){var d=b.substr(a+8,1),a=b.substr(a+10,1);return 1*d+0.1*a}return-1<b.indexOf("transformer")?3.2:0}();a.PLATFORM_IS_SAFARI=0<a.PLATFORM_IOS_VERSION&&-1<b.search("applewebkit")||0===a.PLATFORM_ANDROID_VERSION&&0>b.search("chrome")&&-1<b.search("safari");a.PLATFORM_IS_MOBILE=0<a.PLATFORM_IOS_VERSION||0<a.PLATFORM_ANDROID_VERSION;a.PLATFORM_ID=a.PLATFORM_IS_MOBILE?0<a.PLATFORM_ANDROID_VERSION?"Android"+
	a.PLATFORM_ANDROID_VERSION:a.PLATFORM_IS_IPAD?"iPad"+a.PLATFORM_IOS_VERSION:a.PLATFORM_IS_IPHONE_IPOD?"iPhone"+a.PLATFORM_IOS_VERSION:"UnknownMobile":"Desktop";a.log("Device:",a.PLATFORM_ID,"PLATFORM_IS_SAFARI:",a.PLATFORM_IS_SAFARI)})();a.PLATFORM_EVENT_CLICK=a.PLATFORM_IS_MOBILE?"touchend":"click";a.MOBILE_EVENT_DRAG="touchmove";a.PLATFORM_SEND_REQUEST_BY_FORM=!1;a.PLATFORM_HIDE_AND_SHOW_CONTENT_VIDEO_BY_MOVE_POSITION=3.1<=a.PLATFORM_ANDROID_VERSION;a.PLATFORM_HIDE_AND_SHOW_CONTENT_VIDEO_BY_SET_DISPLAY=
	!0;a.PLATFORM_SUPPORT_PLAY_MIDROLL_BY_CURRENT_VIDEO_ELEMENT=a.PLATFORM_IS_IPAD||a.PLATFORM_IS_IPHONE_IPOD;a.PLATFORM_AUTO_SEEK_AFTER_MIDROLL=a.PLATFORM_IS_IPAD;a.PLATFORM_NOT_SUPPORT_OVERLAY_AD=a.PLATFORM_IS_IPHONE_IPOD||0<a.PLATFORM_ANDROID_VERSION&&3.1>a.PLATFORM_ANDROID_VERSION||a.PLATFORM_IS_WINDOWSPHONE;a.PLATFORM_FILL_VIDEO_POOL_FOR_MIDROLL=4.2<=a.PLATFORM_IOS_VERSION;a.PLATFORM_NOT_SUPPORT_MIDROLL_AD=2.2<=a.PLATFORM_ANDROID_VERSION&&3>=a.PLATFORM_ANDROID_VERSION||9<=a.PLATFORM_IE_MOBILE_VERSION;
	a.PLATFORM_NOT_SUPPORT_VIDEO_AD=0<a.PLATFORM_ANDROID_VERSION&&2.1>=a.PLATFORM_ANDROID_VERSION;a.PLATFORM_DETECT_FULL_SCREEN_FOR_MIDROLL=a.PLATFORM_IS_IPAD&&4.2<=a.PLATFORM_IOS_VERSION;a.PLATFORM_NOT_SUPPORT_CLICK_FOR_VIDEO=a.PLATFORM_IS_IPHONE_IPOD||a.PLATFORM_IS_WINDOWSPHONE;a.PLATFORM_NOT_FIRE_CLICK_WHEN_AD_VIDEO_PAUSED=3.1<=a.PLATFORM_ANDROID_VERSION;a.PLATFORM_WAIT_WHEN_AD_VIDEO_TIMEOUT=0<a.PLATFORM_ANDROID_VERSION&&3>=a.PLATFORM_ANDROID_VERSION;a.PLATFORM_VIDEO_DOESNOT_SUPPORT_TIMEUPDATE=9<=
	a.PLATFORM_IE_MOBILE_VERSION;a.PLATFORM_PLAY_DUMMY_VIDEO_FOR_PREROLL=0<a.PLATFORM_IOS_VERSION&&4.2>a.PLATFORM_IOS_VERSION&&4<=a.PLATFORM_IOS_VERSION;a.PLATFORM_NOT_WAIT_FOR_ERROR_WHEN_PLAY_DUMMY_VIDEO_FOR_PREROLL=!1;a.PLATFORM_SUPPORT_VIDEO_START_DETECT_TIMEOUT=0===a.PLATFORM_IOS_VERSION||4<=a.PLATFORM_IOS_VERSION&&4.2>a.PLATFORM_IOS_VERSION;a.PLATFORM_NOT_SUPPORT_OVERLAY_CLICK_WHEN_CONTROLS_IS_TRUE=a.PLATFORM_IS_IPAD;a.RENDERER_STATE_INIT=1;a.RENDERER_STATE_STARTING=2;a.RENDERER_STATE_STARTED=3;
	a.RENDERER_STATE_COMPLETING=4;a.RENDERER_STATE_COMPLETED=5;a.RENDERER_STATE_FAILED=6;a.TRANSLATOR_STATE_INIT=a.RENDERER_STATE_INIT;a.TRANSLATOR_STATE_STARTING=a.RENDERER_STATE_STARTING;a.TRANSLATOR_STATE_STARTED=a.RENDERER_STATE_STARTED;a.TRANSLATOR_STATE_COMPLETING=a.RENDERER_STATE_COMPLETING;a.TRANSLATOR_STATE_COMPLETED=a.RENDERER_STATE_COMPLETED;a.TRANSLATOR_STATE_FAILED=a.RENDERER_STATE_FAILED;a.EVENT_AD="adEvent";a.EVENT_SLOT_IMPRESSION="slotImpression";a.EVENT_SLOT_END="slotEnd";a.EVENT_AD_IMPRESSION=
	"defaultImpression";a.EVENT_AD_IMPRESSION_END="adEnd";a.EVENT_AD_QUARTILE="quartile";a.EVENT_AD_FIRST_QUARTILE="firstQuartile";a.EVENT_AD_MIDPOINT="midPoint";a.EVENT_AD_THIRD_QUARTILE="thirdQuartile";a.EVENT_AD_COMPLETE="complete";a.EVENT_AD_CLICK="defaultClick";a.EVENT_AD_MUTE="_mute";a.EVENT_AD_UNMUTE="_un-mute";a.EVENT_AD_COLLAPSE="_collapse";a.EVENT_AD_EXPAND="_expand";a.EVENT_AD_PAUSE="_pause";a.EVENT_AD_RESUME="_resume";a.EVENT_AD_REWIND="_rewind";a.EVENT_AD_ACCEPT_INVITATION="_accept-invitation";
	a.EVENT_AD_CLOSE="_close";a.EVENT_AD_MINIMIZE="_minimize";a.EVENT_ERROR="_e_unknown";a.EVENT_RESELLER_NO_AD="resellerNoAd";a.EVENT_AD_MEASUREMENT="concreteEvent";a.INFO_KEY_CUSTOM_ID="customId";a.INFO_KEY_MODULE_TYPE="moduleType";a.MODULE_TYPE_EXTENSION="extension";a.MODULE_TYPE_RENDERER="renderer";a.MODULE_TYPE_TRANSLATOR="translator";a.INFO_KEY_ERROR_CODE="errorCode";a.INFO_KEY_ERROR_INFO="errorInfo";a.INFO_KEY_ERROR_MODULE="errorModule";a.ERROR_IO="_e_io";a.ERROR_TIMEOUT="_e_timeout";a.ERROR_NULL_ASSET=
	"_e_null-asset";a.ERROR_ADINSTANCE_UNAVAILABLE="_e_adinst-unavail";a.ERROR_UNKNOWN="_e_unknown";a.ERROR_MISSING_PARAMETER="_e_missing-param";a.ERROR_NO_AD_AVAILABLE="_e_no-ad";a.ERROR_PARSE="_e_parse";a.ERROR_INVALID_VALUE="_e_invalid-value";a.ERROR_INVALID_SLOT="_e_invalid-slot";a.ERROR_NO_RENDERER="_e_no-renderer";a.ERROR_DEVICE_LIMIT="_e_device-limit";a.ERROR_3P_COMPONENT="_e_3p-comp";a.ERROR_UNSUPPORTED_3P_FEATURE="_e_unsupp-3p-feature";a.ERROR_SECURITY="_e_security";a.ERROR_UNMATCHED_SLOT_SIZE=
	"_e_slot-size-unmatch";a.INFO_KEY_URL="url";a.INFO_KEY_SHOW_BROWSER="showBrowser";a.INFO_KEY_CUSTOM_EVENT_NAME="customEventName";a.INFO_KEY_NEED_EMPTY_CT="needEmptyCT";a.INFO_KEY_CONCRETE_EVENT_ID="concreteEventId";a.EVENT_TYPE_CLICK_TRACKING="CLICKTRACKING";a.EVENT_TYPE_IMPRESSION="IMPRESSION";a.EVENT_TYPE_CLICK="CLICK";a.EVENT_TYPE_STANDARD="STANDARD";a.EVENT_TYPE_GENERIC="GENERIC";a.EVENT_TYPE_ERROR="ERROR";a.EVENT_VIDEO_VIEW="videoView";a.SHORT_EVENT_TYPE_IMPRESSION="i";a.SHORT_EVENT_TYPE_CLICK=
	"c";a.SHORT_EVENT_TYPE_STANDARD="s";a.SHORT_EVENT_TYPE_ERROR="e";a.INIT_VALUE_ZERO="0";a.INIT_VALUE_ONE="1";a.INIT_VALUE_TWO="2";a.INFO_KEY_PARAMETERS="parameters";a.URL_PARAMETER_KEY_ET="et";a.URL_PARAMETER_KEY_CN="cn";a.URL_PARAMETER_KEY_INIT="init";a.URL_PARAMETER_KEY_CT="ct";a.URL_PARAMETER_KEY_METR="metr";a.URL_PARAMETER_KEY_CR="cr";a.URL_PARAMETER_KEY_KEY_VALUE="kv";a.URL_PARAMETER_KEY_ERROR_INFO="additional";a.URL_PARAMETER_KEY_ERROR_MODULE="renderer";a.URL_PARAMETER_KEY_CREATIVE_RENDITION_ID=
	"reid";a.URL_PARAMETER_KEY_CONCRETE_EVENT_ID="creid";a.CAPABILITY_SLOT_TEMPLATE="sltp";a.CAPABILITY_DISPLAY_REFRESH="rfnt";a.CAPABILITY_MULTIPLE_CREATIVE_RENDITIONS="emcr";a.CAPABILITY_RECORD_VIDEO_VIEW="exvt";a.CAPABILITY_CHECK_COMPANION="cmpn";a.CAPABILITY_CHECK_TARGETING="targ";a.CAPABILITY_FALLBACK_UNKNOWN_ASSET="unka";a.CAPABILITY_FALLBACK_UNKNOWN_SITE_SECTION="unks";a.CAPABILITY_FALLBACK_ADS="fbad";a.CAPABILITY_SLOT_CALLBACK="slcb";a.CAPABILITY_NULL_CREATIVE="nucr";a.CAPABILITY_AUTO_EVENT_TRACKING=
	"aeti";a.CAPABILITY_RENDERER_MANIFEST="rema";a.CAPABILITY_REQUIRE_VIDEO_CALLBACK="vicb";a.CAPABILITY_SKIP_AD_SELECTION="skas";a.SLOT_TYPE_TEMPORAL="temporal";a.SLOT_TYPE_VIDEOPLAYER_NONTEMPORAL="videoPlayerNonTemporal";a.SLOT_TYPE_SITESECTION_NONTEMPORAL="siteSectionNonTemporal";a.TIME_POSITION_CLASS_PREROLL="PREROLL";a.TIME_POSITION_CLASS_MIDROLL="MIDROLL";a.TIME_POSITION_CLASS_POSTROLL="POSTROLL";a.TIME_POSITION_CLASS_OVERLAY="OVERLAY";a.TIME_POSITION_CLASS_DISPLAY="DISPLAY";a.TIME_POSITION_CLASS_PAUSE_MIDROLL=
	"PAUSE_MIDROLL";a.EVENT_REQUEST_COMPLETE="onRequestComplete";a.EVENT_SLOT_STARTED="onSlotStarted";a.EVENT_SLOT_ENDED="onSlotEnded";a.EVENT_CONTENT_VIDEO_PAUSE_REQUEST="contentVideoPauseRequest";a.EVENT_CONTENT_VIDEO_RESUME_REQUEST="contentVideoResumeRequest";a.CAPABILITY_STATUS_OFF=0;a.CAPABILITY_STATUS_ON=1;a.PARAMETER_LEVEL_PROFILE=0;a.PARAMETER_LEVEL_GLOBAL=1;a.PARAMETER_LEVEL_OVERRIDE=5;a.PARAMETER_ENABLE_FORM_TRANSPORT="sdk.enableFormTransport";a.PARAMETER_DESIRED_BITRATE="desiredBitrate";a.PARAMETER_VIDEO_POOL_SIZE=
	"sdk.videoPoolSize";a.PARAMETER_PAGE_SLOT_CONTENT_TYPE="sdk.pageSlotContentType";a.PARAMETER_PLAY_MIDROLL_BY_CURRENT_VIDEO_ELEMENT="PARAMETER_PLAY_MIDROLL_BY_CURRENT_VIDEO_ELEMENT";a.PARAMETER_EXTENSION_AD_CONTROL_CLICK_ELEMENT="extension.ad.control.clickElement";a.PARAMETER_EXTENSION_CONTENT_VIDEO_ENABLED="extension.contentVideo.enabled";a.PARAMETER_EXTENSION_CONTENT_VIDEO_RESPOND_PAUSE_RESUME="extension.contentVideo.respondPauseResume";a.PARAMETER_EXTENSION_CONTENT_VIDEO_AUTO_SEEK_BACK="extension.contentVideo.autoSeekBack";
	a.PARAMETER_EXTENSION_CONTENT_VIDEO_AUTO_SOURCE_RESTORE="extension.contentVideo.autoSourceRestore";a.PARAMETER_EXTENSION_VIDEO_STATE_ENABLED="extension.videoState.enabled";a.PARAMETER_RENDERER_VIDEO_START_DETECT_TIMEOUT="renderer.video.startDetectTimeout";a.PARAMETER_RENDERER_VIDEO_PROGRESS_DETECT_TIMEOUT="renderer.video.progressDetectTimeout";a.PARAMETER_RENDERER_VIDEO_ANDROID_DELAY="renderer.video.android.delay";a.PARAMETER_RENDERER_VIDEO_DISPLAY_CONTROLS_WHEN_PAUSE="renderer.video.displayControlsWhenPause";
	a.PARAMETER_RENDERER_VIDEO_CLICK_DETECTION="renderer.video.clickDetection";a.PARAMETER_RENDERER_VIDEO_PLAY_AFTER_STALLED="renderer.video.playAfterStalled";a.PARAMETER_EXTENSION_SURVEY_ENABLED="extension.survey.enabled";a.PARAMETER_RENDERER_DISPLAY_COAD_SCRIPT_NAME="renderer.html.coadScriptName";a.PARAMETER_RENDERER_HTML_SHOULD_BACKGROUND_TRANSPARENT="renderer.html.isBackgroundTransparent";a.PARAMETER_RENDERER_HTML_SHOULD_END_AFTER_DURATION="renderer.html.shouldEndAfterDuration";a.PARAMETER_RENDERER_HTML_AD_LOAD_TIMEOUT=
	"renderer.html.adLoadTimeout";a.PARAMETER_RENDERER_HTML_PLACEMENT_TYPE="renderer.html.placementType";a.PARAMETER_RENDERER_HTML_BOOTSTRAP="renderer.html.bootstrap";a.PARAMETER_RENDERER_HTML_PRIMARY_ANCHOR="renderer.html.primaryAnchor";a.PARAMETER_RENDERER_HTML_MARGIN_WIDTH="renderer.html.marginWidth";a.PARAMETER_RENDERER_HTML_MARGIN_HEIGHT="renderer.html.marginHeight";a.PARAMETER_VPAID_CREATIVE_TIMEOUT_DELAY="renderer.vpaid.creativeTimeoutDelay";a.PARAMETER_RENDERER_HTML_PLACEMENT_TYPE_INLINE="inline";
	a.PARAMETER_RENDERER_HTML_PLACEMENT_TYPE_INTERSTITIAL="interstitial";a.PARAMETER_RENDERER_HTML_BASEUNIT_INTERSTITIAL="app-interstitial";a.ID_TYPE_FW=1;a.ID_TYPE_CUSTOM=2;a.ID_TYPE_GROUP=3;a.VIDEO_STATE_PLAYING=1;a.VIDEO_STATE_PAUSED=2;a.VIDEO_STATE_STOPPED=3;a.VIDEO_STATE_COMPLETED=4;a.VIDEO_ASSET_AUTO_PLAY_TYPE_ATTENDED=1;a.VIDEO_ASSET_AUTO_PLAY_TYPE_UNATTENDED=2;a.VIDEO_ASSET_AUTO_PLAY_TYPE_NONE=3;a.VIDEO_ASSET_AUTO_PLAY_TYPE_NON_AUTO_PLAY=3;a.ADUNIT_PREROLL="preroll";a.ADUNIT_MIDROLL="midroll";
	a.ADUNIT_POSTROLL="postroll";a.ADUNIT_OVERLAY="overlay";a.SLOT_LOCATION_PLAYER="player";a.SLOT_LOCATION_EXTERNAL="external";a.SLOT_OPTION_INITIAL_AD_STAND_ALONE=0;a.SLOT_OPTION_INITIAL_AD_KEEP_ORIGINAL=1;a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_ONLY=2;a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_STAND_ALONE=3;a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_THEN_STAND_ALONE=4;a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_NO_STAND_ALONE=5;a.SLOT_OPTION_INITIAL_AD_NO_STAND_ALONE=6;a.SLOT_OPTION_INITIAL_AD_NO_STAND_ALONE_IF_TEMPORAL=
	7;a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_NO_STAND_ALONE_IF_TEMPORAL=8;a.Util={canPlayVideoType:function(b){if(a.PLATFORM_IS_SAFARI&&("video/ogg"==b||"video/webm"==b))return!1;if(1<a.PLATFORM_ANDROID_VERSION&&"video/m4v"==b)return!0;"video/3gp"==b&&(b="video/3gpp");if(3<=a.PLATFORM_ANDROID_VERSION&&"video/3gpp"==b)return!0;var c=document.createElement("video");return!c.canPlayType?!1:!(!c.canPlayType(b)&&!c.canPlayType(b.replace("/","/x-")))},str2bool:function(b){if(!b)return!1;b=a.Util.trim(b).toLowerCase();
	return"true"==b||"yes"==b||"on"==b||"1"==b},trim:function(a){return"string"!=typeof a?a.toString():a.replace(/^\s+|\s+$/g,"")},isBlank:function(b){return!b||""===a.Util.trim(b)},encodeToHex:function(a){for(var c="",d=0;d<a.length;d++){for(var f=a.charCodeAt(d).toString(16).toUpperCase();4>f.length;)f="0"+f;c+="\\u"+f.toUpperCase()}return c},forEachOnArray:function(a,c,d){var f;if(null==a)throw new TypeError(" array is null or not defined");var a=Object(a),g=a.length>>>0;if("[object Function]"!={}.toString.call(c))throw new TypeError(c+
	" is not a function");d&&(f=d);for(d=0;d<g;){var h;d in a&&(h=a[d],c.call(f,h,d,a));d++}},mixin:function(a,c){var d={},f;for(f in c)if("undefined"==typeof d[f]||d[f]!=c[f])a[f]=c[f];return a},copy:function(b){return a.Util.mixin({},b)},bind:function(a,c){var d=Array.prototype.slice.call(arguments);d.shift();c=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}},getObject:function(a,c,d){if(!a)return null;for(var a=a.split("."),c=c||window,f=0,g;c&&(g=a[f]);f++)c=
	g in c?c[g]:d?c[g]={}:void 0;return c},buildNode:function(b,c,d,f,g){a.debug("Util.buildNode");d||(d=document);var h=null!=navigator.userAgent.match(/Firefox/);b.innerHTML=c||"";for(var b=b.getElementsByTagName("script"),i=d.getElementsByTagName("head")[0],c=0;c<b.length;++c)if(h||b[c].src){var k=d.createElement("script");if(b[c].charset)k.charset=b[c].charset;if(b[c].src)k.src=b[c].src;if(b[c].innerHTML)k.innerHTML=b[c].innerHTML;k.onload=k.onreadystatechange=function(){(!this.readyState||"loaded"==
	this.readyState||"complete"==this.readyState)&&i.removeChild(k)};try{i.appendChild(k)}catch(j){a.warn("load script err: "+j)}}else k=b[c].innerHTML,f&&(k=k.replace(/var fw_scope = document;/,"var fw_scope="+f+";")),g&&(k=k.replace(/var fw_scope_window = window;/,"var fw_scope_window="+g+";")),eval(k)},replacePageSlot:function(b,c,d){a.debug("Util.replacePageSlot("+Array.prototype.slice.call(arguments).join(",")+")");var f,g,h;try{f=document.getElementById(b)?document:parent.document.getElementById(b)?
	parent.document:null,g=document.getElementById(b)?"window":parent.document.getElementById(b)?"parent":null}catch(i){g=f=null}if(!f)for(var k=0;k<window.frames.length;k++)try{if(window.frames[k].document.getElementById(b))f=window.frames[k].document,g="window.frames["+k+"]"}catch(j){a.warn(j)}g&&(h=g+".document");a.log("replacing slot "+b+" in frame "+h);if(!f)throw"Slot element not found: "+b;k=d?f.getElementById(d):f.getElementById("_fw_container_"+b);a.Util.buildNode(k,c,f,h,g)},pingURLWithImage:function(a){(new Image(1,
	1)).src=a},pingURLWithForm:function(a,c,d){d=d?"_fw_request":"_fw_cb";null==c&&(c=Math.random());var f=document.createElement("iframe");f.name=d+"_iframe_"+c;f.id=d+"_iframe_"+c;f.style.position="absolute";f.style.left="-10000px";f.style.width="1px";f.style.visibility="hidden";var g=document.createElement("form");g.action=a;g.id=d+"_form_"+c;g.target=f.id;g.method="post";g.style.position="absolute";g.style.left="-10000px";g.style.width="1px";g.style.visibility="hidden";document.body&&(document.body.appendChild(f),
	document.body.appendChild(g),g.submit(),document.body.removeChild(g))},pingURLWithScript:function(a){var c=document.getElementsByTagName("head")[0],d=document.createElement("script");d.src=a;d.onload=d.onreadystatechange=function(){(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState)&&c.removeChild(d)};c.appendChild(d)},pingURL:function(b){a.debug("send callback: "+b);b&&(a.PLATFORM_SEND_REQUEST_BY_FORM?a.Util.pingURLWithForm(b,null,!1):a.Util.pingURLWithImage(b))},pingURLs:function(b){for(var c=
	0;c<b.length;c++)a.Util.pingURL(b[c])},setParameterInURL:function(a,c,d){if(!a||!c||null==d)return null;var f=!1,g,a=a.split("?"),h,d=encodeURIComponent(d);if(a[1]){h=a[1].split("&");for(var i=0;i<h.length;++i)if(g=h[i].split("="),g[0]==c){h[i]=g[0]+"="+d;f=!0;break}g=h.join("&");f||(g=c+"="+d+"&"+g)}else g=c+"="+d;return g=a[0]+"?"+g},getParameterInURL:function(b,c){if(!b||!c)return null;var d=b.split("?");if(d[1])for(var d=d[1].split("&"),f=0;f<d.length;++f){var g=d[f].split("=");if(g[0]==c&&!a.Util.isBlank(g[1]))return decodeURIComponent(g[1])}return null},
	isParameterInURL:function(a,c){if(!a||!c)return!1;var d=a.split("?");if(d[1])for(var d=d[1].split("&"),f=0;f<d.length;++f)if(d[f].split("=")[0]==c)return!0;return!1},flashVersion:function(){var b="0,0,0,0";if(null!=navigator.plugins&&0<navigator.plugins.length){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"])try{var c=navigator.plugins["Shockwave Flash"+(navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"")].description.split(" "),d=c[2].split("."),f=d[0],g=d[1],h=
	c[3];""==h&&(h=c[4]);"d"==h[0]?h=h.substring(1):"r"==h[0]&&(h=h.substring(1),0<h.indexOf("d")&&(h=h.substring(0,h.indexOf("d"))));b=f+","+g+","+h+",0"}catch(i){a.warn("Flash detection failed on navigator method")}}else{var k;try{k=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");var j=k.GetVariable("$version").split(" ")[1].split(",");3==j.length?b=j.join(",")+",0":4==j.length&&(b=j.join(","))}catch(m){a.warn("Flash detection failed on ActiveX method")}}return b},xmlToJson:function(b){var c={};
	if(!b)return null;if(1===b.nodeType){if(0<b.attributes.length){c["@attributes"]={};for(var d=0;d<b.attributes.length;d++){var f=b.attributes.item(d);c["@attributes"][f.nodeName]=f.nodeValue}}}else if(3===b.nodeType)c=b.nodeValue;else if(4===b.nodeType)c=b.nodeValue;if(b.hasChildNodes()){for(d=0;d<b.childNodes.length;d++){var f=b.childNodes.item(d),g=f.nodeName;if("undefined"===typeof c[g])c[g]=a.Util.xmlToJson(f);else{if("undefined"===typeof c[g].length||"string"===typeof c[g]){var h=c[g];c[g]=[];
	c[g].push(h)}c[g].push(a.Util.xmlToJson(f))}}if("undefined"!==typeof c["#cdata-section"])c.value=c["#cdata-section"];else if(c["#text"])c.value=c["#text"]}return c},lazyJavaScriptLoad:function(a,c){var d=document.getElementsByTagName("head")[0]||document.documentElement,f=document.createElement("script");f.type="text/javascript";f.src=a;if(c)f.attachEvent&&!window.opera?f.onreadystatechange=function(){if("loaded"==f.readyState||"complete"==f.readyState)d.removeChild(f),f.onreadystatechange=null,c()}:
	f.addEventListener("load",function(){d.removeChild(f);c()},!1);d.insertBefore(f,d.firstChild)},getViewport:function(){var a=0,c=0;if("undefined"!==typeof window.innerWidth)a=window.innerWidth,c=window.innerHeight;else if("undefined"!==typeof document.documentElement&&"undefined"!==typeof document.documentElement.clientWidth&&0!==document.documentElement.clientWidth)a=document.documentElement.clientWidth,c=document.documentElement.clientHeight;else if(document.getElementsByTagName("body")&&document.getElementsByTagName("body")[0])a=
	document.getElementsByTagName("body")[0].clientWidth,c=document.getElementsByTagName("body")[0].clientHeight;return{width:a,height:c,offsetX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,offsetY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}},getAbsoluteUrl:function(b,c){b=a.Util.trim(b);c=a.Util.trim(c);if(-1!==c.indexOf("://"))return c;var d=b.substring(0,b.indexOf("://")-1);if(0===c.indexOf("//"))return d+":"+c;var d=b.indexOf("/",
	b.indexOf("://")+5),f=b;-1!==d&&(f=b.substring(0,d));if(0==c.indexOf("/"))return f+c;d=b.lastIndexOf("#");f=b;-1!==d&&(f=b.substring(0,d));if(0==c.indexOf("#"))return f+c;f=b.indexOf("?");d=b;-1!==f&&(d=b.substring(0,f));if(0==c.indexOf("?"))return d+c;f=-1===f?b.lastIndexOf("/"):d.lastIndexOf("/");d=-1!==f?b.substring(0,f+1):d+"/";return d+c}};a.MediaState=function(){};a.MediaState.prototype={};a.MediaState.prototype.constructor=a.MediaState;a.Util.mixin(a.MediaState.prototype,{play:function(b){a.debug(this._name+
	" play("+b+")")},pause:function(b){a.debug(this._name+" pause("+b+")")},complete:function(b){a.debug(this._name+" complete("+b+")")}});a.MediaInitState=function(){this._name="MediaInitState"};a.MediaInitState.prototype=new a.MediaState;a.MediaInitState.prototype.constructor=a.MediaInitState;a.Util.mixin(a.MediaInitState.prototype,{play:function(b){a.debug(this._name+" play("+b+")");b.setMediaState(a.MediaPlayingState.instance);if("function"===typeof b.onStartPlaying)b.onStartPlaying()}});a.MediaInitState.instance=
	new a.MediaInitState;a.MediaPlayingState=function(){this._name="MediaPlayingState"};a.MediaPlayingState.prototype=new a.MediaState;a.MediaPlayingState.prototype.constructor=a.MediaPlayingState;a.Util.mixin(a.MediaPlayingState.prototype,{pause:function(b){a.debug(this._name+" pause("+b+")");b.setMediaState(a.MediaPausedState.instance);if("function"===typeof b.onPausePlaying)b.onPausePlaying()},complete:function(b){a.debug(this._name+" complete("+b+")");b.setMediaState(a.MediaEndState.instance);if("function"===
	typeof b.onCompletePlaying)b.onCompletePlaying()}});a.MediaPlayingState.instance=new a.MediaPlayingState;a.MediaPausedState=function(){this._name="MediaPausedState"};a.MediaPausedState.prototype=new a.MediaState;a.MediaPausedState.prototype.constructor=a.MediaPausedState;a.Util.mixin(a.MediaPausedState.prototype,{play:function(b){a.debug(this._name+" play("+b+")");b.setMediaState(a.MediaPlayingState.instance);if("function"===typeof b.onResumePlaying)b.onResumePlaying()},complete:function(b){a.debug(this._name+
	" complete("+b+")");b.setMediaState(a.MediaEndState.instance);if("function"===typeof b.onCompletePlaying)b.onCompletePlaying()}});a.MediaPausedState.instance=new a.MediaPausedState;a.MediaReplayingState=function(){this._name="MediaReplayingState"};a.MediaReplayingState.prototype=new a.MediaState;a.MediaReplayingState.prototype.constructor=a.MediaReplayingState;a.Util.mixin(a.MediaReplayingState.prototype,{pause:function(b){a.debug(this._name+" pause("+b+")");b.setMediaState(a.MediaReplayPausedState.instance);
	if("function"===typeof b.onPausePlaying)b.onPausePlaying()},complete:function(b){a.debug(this._name+" complete("+b+")");b.setMediaState(a.MediaEndState.instance);if("function"===typeof b.onCompleteReplaying)b.onCompleteReplaying()}});a.MediaReplayingState.instance=new a.MediaReplayingState;a.MediaReplayPausedState=function(){this._name="MediaReplayPausedState"};a.MediaReplayPausedState.prototype=new a.MediaState;a.MediaReplayPausedState.prototype.constructor=a.MediaReplayPausedState;a.Util.mixin(a.MediaReplayPausedState.prototype,
	{play:function(b){a.debug(this._name+" play("+b+")");b.setMediaState(a.MediaReplayingState.instance);if("function"===typeof b.onResumePlaying)b.onResumePlaying()},complete:function(b){a.debug(this._name+" complete("+b+")");b.setMediaState(a.MediaEndState.instance);if("function"===typeof b.onCompleteReplaying)b.onCompleteReplaying()}});a.MediaReplayPausedState.instance=new a.MediaReplayingState;a.MediaEndState=function(){this._name="MediaEndState"};a.MediaEndState.prototype=new a.MediaState;a.MediaEndState.prototype.constructor=
	a.MediaEndState;a.Util.mixin(a.MediaEndState.prototype,{play:function(b){a.debug(this._name+" play("+b+")");b.setMediaState(a.MediaReplayingState.instance);if("function"===typeof b.onStartReplaying)b.onStartReplaying()}});a.MediaEndState.instance=new a.MediaEndState;a.RendererState=function(){};a.RendererState.prototype={};a.RendererState.prototype.constructor=a.RendererState;a.Util.mixin(a.RendererState.prototype,{start:function(){a.debug(this._name+" start()")},notifyStarted:function(){a.debug(this._name+
	" notifyStarted()")},stop:function(){a.debug(this._name+" stop()")},complete:function(){a.debug(this._name+" complete()")},notifyCompleted:function(){a.debug(this._name+" notifyCompleted()")},fail:function(b){a.debug(this._name+" fail()");b.setRendererState(a.RendererFailedState.instance);b.getAdInstance().complete()}});a.RendererInitState=function(){this._name="RendererInitState"};a.RendererInitState.prototype=new a.RendererState;a.RendererInitState.prototype.constructor=a.RendererInitState;a.RendererInitState.instance=
	new a.RendererInitState;a.Util.mixin(a.RendererInitState.prototype,{start:function(b){a.debug(this._name+" start()");b.setRendererState(a.RendererStartingState.instance);b.getRenderer().start(b)},stop:function(b){a.debug(this._name+" stop()");b.setRendererState(a.RendererCompletingState.instance);b.getRendererState().notifyCompleted()}});a.RendererStartingState=function(){this._name="RendererStartingState"};a.RendererStartingState.prototype=new a.RendererState;a.RendererStartingState.prototype.constructor=
	a.RendererStartingState;a.RendererStartingState.instance=new a.RendererStartingState;a.Util.mixin(a.RendererStartingState.prototype,{notifyStarted:function(b){a.debug(this._name+" notifyStarted()");b.setRendererState(a.RendererStartedState.instance);b.getAdInstance().play()},stop:function(b){a.debug(this._name+" stop()");"function"===typeof b.getRenderer().stop&&(b.setRendererState(a.RendererCompletingState.instance),b.getRenderer().stop())}});a.RendererStartedState=function(){this._name="RendererStartedState"};
	a.RendererStartedState.prototype=new a.RendererState;a.RendererStartedState.prototype.constructor=a.RendererStartedState;a.RendererStartedState.instance=new a.RendererStartedState;a.Util.mixin(a.RendererStartedState.prototype,{complete:function(b){a.debug(this._name+" complete()");b.setRendererState(a.RendererCompletingState.instance)},stop:function(b){a.debug(this._name+" stop()");"function"===typeof b.getRenderer().stop&&(b.setRendererState(a.RendererCompletingState.instance),!1===b.getRenderer().stop()&&
	b.getAdInstance().fakeComplete())}});a.RendererCompletingState=function(){this._name="RendererCompletingState"};a.RendererCompletingState.prototype=new a.RendererState;a.RendererCompletingState.prototype.constructor=a.RendererCompletingState;a.RendererCompletingState.instance=new a.RendererCompletingState;a.Util.mixin(a.RendererCompletingState.prototype,{notifyCompleted:function(b){a.debug(this._name+" notifyCompleted()");b.setRendererState(a.RendererCompletedState.instance);b.getAdInstance().complete()}});
	a.RendererCompletedState=function(){this._name="RendererCompletedState"};a.RendererCompletedState.prototype=new a.RendererState;a.RendererCompletedState.prototype.constructor=a.RendererCompletedState;a.RendererCompletedState.instance=new a.RendererCompletedState;a.RendererFailedState=function(){this._name="RendererFailedState"};a.RendererFailedState.prototype=new a.RendererState;a.RendererFailedState.prototype.constructor=a.RendererFailedState;a.RendererFailedState.instance=new a.RendererFailedState;
	a.HTMLRenderer=function(){};a.HTMLRenderer.prototype={start:function(b){this.rendererController=b;b.getAdInstance().getSlot().getBase()?this._setupParameters()&&(this._render(),b.handleStateTransition(a.RENDERER_STATE_STARTED)):b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_INVALID_SLOT,errorInfo:"slot base is empty"})},pause:function(){this.log("pause")},resume:function(){this.log("resume")},stop:function(){this.log("stop isMRAIDAd:"+this.isMRAIDAd+
	" tpc:"+this._tpc+" interstitial:"+this.shouldKeepInterstitial);if(this.isMRAIDAd||this._tpc!=a.TIME_POSITION_CLASS_DISPLAY||this.shouldKeepInterstitial)this._cleanup(),this.rendererController.handleStateTransition(a.RENDERER_STATE_COMPLETED);else return!1},_cleanup:function(){this.log("_cleanup");if(this.timer)this.timer.stop(),this.timer=null;if(this.adLoadTimeoutTimer)this.adLoadTimeoutTimer.stop(),this.adLoadTimeoutTimer=null;window.removeEventListener?(document.removeEventListener("touchmove",
	this.touchMoveDisabler,!1),window.removeEventListener("message",this.messageHandlerFunc,!1),window.removeEventListener("resize",this.viewportChangeFunc,!1),window.removeEventListener("scroll",this.viewportChangeFunc,!1)):window.detachEvent&&(window.detachEvent("onmessage",this.messageHandlerFunc),window.detachEvent("onresize",this.viewportChangeFunc),window.detachEvent("onscroll",this.viewportChangeFunc));if(this.isMRAIDAd&&(this.mraid.inExpandedState()&&(this.log("stopping with expanded state, invoke close()"),
	this._mraidClose()),this.mraid.inDefaultState())){this.log("stopping with default state, invoke close()");this._mraidClose();return}var a;if(this.expandedAdElement){a=this.expandedAdElement.parentNode;this.expandedAdElement._fw_closeButton&&a.removeChild(this.expandedAdElement._fw_closeButton);a.removeChild(this.expandedAdElement);if(this.expandedAdElement===this.defaultAdElement){if(this.defaultAdElementContainer===this.defaultAdElement)this.defaultAdElementContainer=null;this.defaultAdElement=null}this.expandedAdElement=
	null}if(this.expandedLightbox)a=this.expandedLightbox.parentNode,a.removeChild(this.expandedLightbox),this.expandedLightbox=null;this.rendererController.getAdInstance().getSlot().getTimePositionClass();if(this.defaultAdElement){a=this.defaultAdElement.parentNode;var c=this.defaultAdElement;c.style.display="none";a!==this.rendererController.getAdInstance().getSlot().getBase()&&window.setTimeout(function(){for(var d=a&&a.childNodes||[],f=0;f<d.length;f++){var g=d[f];g===c&&a.removeChild(g)}},200);if(this.defaultAdElementContainer===
	this.defaultAdElement)this.defaultAdElementContainer=null;this.defaultAdElement=null}if(this.defaultAdElementContainer)a=this.defaultAdElementContainer.parentNode,a.removeChild(this.defaultAdElementContainer),this.defaultAdElementContainer=null;this.shouldPauseContentWhenStart&&this.rendererController.requestContentStateChange(!1)},_setupParameters:function(){var b=this.rendererController,c=b.getAdInstance(),d=c.getSlot().getTimePositionClass();this._tpc=d;var f=c.getActiveCreativeRendition(),c=f.getBaseUnit(),
	f=f.getCreativeApi(),g;if(a.PLATFORM_NOT_SUPPORT_OVERLAY_AD&&d===a.TIME_POSITION_CLASS_OVERLAY)return b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_DEVICE_LIMIT,errorInfo:"Overlay not supported on this device."}),!1;if(a.PLATFORM_NOT_SUPPORT_MIDROLL_AD&&(d===a.TIME_POSITION_CLASS_MIDROLL||d===a.TIME_POSITION_CLASS_PAUSE_MIDROLL))return b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_DEVICE_LIMIT,errorInfo:"Midroll, pause_midroll not supported on this device."}),
	!1;if(a.PLATFORM_IS_IPHONE_IPOD)switch(d){case a.TIME_POSITION_CLASS_MIDROLL:case a.TIME_POSITION_CLASS_PAUSE_MIDROLL:case a.TIME_POSITION_CLASS_OVERLAY:return b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_DEVICE_LIMIT,errorInfo:"Midroll, pause_midroll and overlay ads are not supported on iPod, iPhone."}),!1;case a.TIME_POSITION_CLASS_PREROLL:case a.TIME_POSITION_CLASS_POSTROLL:b.setCapability(a.EVENT_AD_CLICK,a.CAPABILITY_STATUS_OFF)}this.adLoadTimeout=
	5;if(g=b.getParameter(a.PARAMETER_RENDERER_HTML_AD_LOAD_TIMEOUT))this.adLoadTimeout=0<Number(g)?Number(g):this.adLoadTimeout;this.shouldKeepInterstitial=!1;if(g=b.getParameter(a.PARAMETER_RENDERER_HTML_PLACEMENT_TYPE))this.shouldKeepInterstitial=g===a.PARAMETER_RENDERER_HTML_PLACEMENT_TYPE_INTERSTITIAL;else if("string"===typeof c)this.shouldKeepInterstitial=c.toLowerCase()===a.PARAMETER_RENDERER_HTML_BASEUNIT_INTERSTITIAL;this.isInterstitialNow=this.shouldKeepInterstitial;this.shouldPauseContentWhenStart=
	!1;this.shouldPauseContentWhenExpandOrClick=!this.shouldKeepInterstitial&&(d===a.TIME_POSITION_CLASS_DISPLAY||d===a.TIME_POSITION_CLASS_OVERLAY);this.shouldBackgroundTransparent=!1;g=b.getParameter(a.PARAMETER_RENDERER_HTML_SHOULD_BACKGROUND_TRANSPARENT);if("undefined"!==typeof g&&null!==g)this.shouldBackgroundTransparent=a.Util.str2bool(g);this.shouldEndAfterDuration=d!==a.TIME_POSITION_CLASS_DISPLAY;g=b.getParameter(a.PARAMETER_RENDERER_HTML_SHOULD_END_AFTER_DURATION);if("undefined"!==typeof g&&
	null!==g)this.shouldEndAfterDuration=a.Util.str2bool(g);this.coadScriptName=b.getParameter(a.PARAMETER_RENDERER_DISPLAY_COAD_SCRIPT_NAME);if(!this.coadScriptName)this.coadScriptName=b.getParameter("coad_script_name");this.primaryAnchor=b.getParameter(a.PARAMETER_RENDERER_HTML_PRIMARY_ANCHOR)||"bc";this.marginWidth=b.getParameter(a.PARAMETER_RENDERER_HTML_MARGIN_WIDTH)||0;this.marginHeight=b.getParameter(a.PARAMETER_RENDERER_HTML_MARGIN_HEIGHT)||0;this.bootstrap=b.getParameter(a.PARAMETER_RENDERER_HTML_BOOTSTRAP);
	c=a.Util.getViewport();this.defaultExpandWidth=c.width;this.defaultExpandHeight=c.height;this.isMRAIDAd="MRAID-1.0"===f;this.mraid=new function(b){this.STATELOADING="loading";this.STATEDEFAULT="default";this.STATEEXPANDED="expanded";this.STATEHIDDEN="hidden";this._renderer=b;this._state=this.STATELOADING;this._useCustomClose=!1;this.viewable=this.expandIsModal=!0;this._baseUrlExpanded=this._baseUrlDefault="";b=Object.defineProperty||function(a,b,c){c.get&&a.__defineGetter__(b,c.get);c.set&&a.__defineSetter__(b,
	c.set)};b(this,"baseUrl",{get:function(){return this.inExpandedState()?this._baseUrlExpanded||this._baseUrlDefault:this._baseUrlDefault},set:function(a){this.inExpandedState()?this._baseUrlExpanded=a:(this._baseUrlDefault=a,this._baseUrlExpanded="")}});b(this,"useCustomClose",{get:function(){return this._useCustomClose},set:function(a){if(this._useCustomClose===!a)this._useCustomClose=!!a,this.pushData()}});b(this,"placementType",{get:function(){return this._renderer.shouldKeepInterstitial?"interstitial":
	"inline"}});b(this,"expandWidth",{get:function(){return this._renderer.requestedExpandWidth&&this._renderer.requestedExpandWidth<this._renderer.defaultExpandWidth?this._renderer.requestedExpandWidth:this._renderer.defaultExpandWidth}});b(this,"expandHeight",{get:function(){return this._renderer.requestedExpandHeight&&this._renderer.requestedExpandHeight<this._renderer.defaultExpandHeight?this._renderer.requestedExpandHeight:this._renderer.defaultExpandHeight}});b(this,"state",{get:function(){return this._state},
	set:function(b){this.log("mraid.state change "+this.state+" => "+b);if(this.state!==b){this._renderer.shouldPauseContentWhenExpandOrClick&&(b===this.STATEEXPANDED?this._renderer.rendererController.requestContentStateChange(!0):this.inExpandedState()&&this._renderer.rendererController.requestContentStateChange(!1));if(b===this.STATEEXPANDED)this._renderer.expandedAdElement?this._renderer.rendererController.processEvent({name:a.EVENT_AD_ACCEPT_INVITATION}):(this._renderer.expandedAdElement=this._renderer.defaultAdElement,
	this._renderer.rendererController.processEvent({name:a.EVENT_AD_EXPAND})),this._renderer.presentInterstitial(),this._renderer.shouldEndAfterDuration&&this._renderer.timer.pause();else if(b===this.STATEDEFAULT)this._renderer.shouldKeepInterstitial?(this._renderer.expandedAdElement=this._renderer.defaultAdElement,this._renderer.presentInterstitial()):(this.inExpandedState()&&(this._renderer.expandedAdElement!==this._renderer.defaultAdElement?this._renderer.rendererController.processEvent({name:a.EVENT_AD_CLOSE}):
	this._renderer.rendererController.processEvent({name:a.EVENT_AD_COLLAPSE})),this._renderer.expandedAdElement=null,this._renderer.presentInline()),this._renderer.shouldEndAfterDuration&&this._renderer.timer.start();this._state=b;this.pushData();b===this.STATEHIDDEN&&this._renderer.stop()}}});this.inLoadingState=function(){return this.state===this.STATELOADING};this.inDefaultState=function(){return this.state===this.STATEDEFAULT};this.inExpandedState=function(){return this.state===this.STATEEXPANDED};
	this.inHiddenState=function(){return this.state===this.STATEHIDDEN};this.pushData=function(){var a='mraid._Update("'+this.state+'", '+this.viewable+', "'+this.placementType+'", '+this.expandWidth+", "+this.expandHeight+", "+this.useCustomClose+", "+this.expandIsModal+")";this.log("mraid.pushData: going to invoke on iframe with "+a);this._renderer.defaultAdElement?(this._renderer.defaultAdElement.contentWindow.postMessage("fwsdk-bounce:"+a,"*"),this._renderer.expandedAdElement&&this._renderer.expandedAdElement!==
	this._renderer.defaultAdElement&&this._renderer.expandedAdElement.contentWindow.postMessage("fwsdk-bounce:"+a,"*")):this.warn("_mraidPushData: no iframe suitable to send "+a)};this.log=function(a){this._renderer.log(a)};this.warn=function(a){this._renderer.warn(a)}}(this);this.onLoadFunc=a.Util.bind(this,function(){if(this.adLoadTimeoutTimer)this.adLoadTimeoutTimer.stop(),this.adLoadTimeoutTimer=null;this.timer&&this.shouldEndAfterDuration&&this.timer.start()});this.touchMoveDisabler=function(a){a.preventDefault()};
	this.log("setting parameters, adLoadTimeout: "+this.adLoadTimeout+", isMRAIDAd: "+this.isMRAIDAd+", shouldKeepInterstitial: "+this.shouldKeepInterstitial+", shouldEndAfterDuration: "+this.shouldEndAfterDuration+", shouldPauseContentWhenStart: "+this.shouldPauseContentWhenStart+", shouldPauseContentWhenExpandOrClick: "+this.shouldPauseContentWhenExpandOrClick+", shouldBackgroundTransparent: "+this.shouldBackgroundTransparent+", defaultExpandWidth: "+this.defaultExpandWidth+", defaultExpandHeight: "+
	this.defaultExpandHeight+", coadScriptName: "+this.coadScriptName+", primaryAnchor: "+this.primaryAnchor+", marginWidth: "+this.marginWidth+", marginHeight: "+this.marginHeight+", bootstrap: "+this.bootstrap);if(this.shouldKeepInterstitial){if(d===a.TIME_POSITION_CLASS_OVERLAY)return b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_INVALID_SLOT,errorInfo:"Interstitial ad is not supported on overlay slot."}),!1}else if(this.isMRAIDAd&&(!a.PLATFORM_IS_IPHONE_IPOD||
	d===a.TIME_POSITION_CLASS_DISPLAY))b.setCapability(a.EVENT_AD_ACCEPT_INVITATION,a.CAPABILITY_STATUS_ON),b.setCapability(a.EVENT_AD_CLOSE,a.CAPABILITY_STATUS_ON),b.setCapability(a.EVENT_AD_COLLAPSE,a.CAPABILITY_STATUS_ON),b.setCapability(a.EVENT_AD_EXPAND,a.CAPABILITY_STATUS_ON);return!0},_render:function(){this.log("_render");var b=this.rendererController,c=b.getAdInstance(),d=c.getSlot(),f=d.getTimePositionClass(),g=d.getBase(),h=c.getActiveCreativeRendition(),i=h.getDuration(),k=h.getPrimaryCreativeRenditionAsset(),
	c=k.getUrl(),j=k.getContent();if(f===a.TIME_POSITION_CLASS_DISPLAY)g.innerHTML="";this.timer=new a.Timer(i,a.Util.bind(this,this.stop));if(this.coadScriptName&&"function"===typeof window[this.coadScriptName])this.defaultAdElement=window[this.coadScriptName](j,c,h.getHeight(),h.getWidth(),k.getMimeType(),d.getCustomId()),this.timer&&this.shouldEndAfterDuration&&this.timer.start();else{i=document.createElement("span");i.id="_fw_ad_container_html_"+d.getCustomId()+"_";i.style.position="relative"===g.style.position?
	"absolute":"relative";i.style.display="inline-block";i.style.margin="0px";i.style.padding="0px";i.style.width=g.style.width||"100%";i.style.height=g.style.height||"100%";i.style.top=i.style.left="0px";g.appendChild(i);this.defaultAdElementContainer=i;if(!c&&!j){b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_NULL_ASSET});this.stop();return}if("text/html_lit_nowrapper"==h.getContentType()||"text/html_lit_js_wc_nw"==h.getContentType()){if(this.isMRAIDAd||
	this.isInterstitialNow){b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_INVALID_VALUE});this.stop();return}if(!j){b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_NULL_ASSET});this.stop();return}this.defaultAdElement=i;this.defaultAdElement.innerHTML=j;for(var d=this.defaultAdElement.getElementsByTagName("script"),m=document.getElementsByTagName("head")[0],g=0;g<d.length;++g)if(d[g].src){var l=document.createElement("script");
	if(d[g].charset)l.charset=d[g].charset;if(d[g].src)l.src=d[g].src;if(d[g].innerHTML)l.innerHTML=d[g].innerHTML;l.onload=l.onreadystatechange=function(){(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState)&&m.removeChild(l)};m.appendChild(l)}else l=d[g].innerHTML,eval(l);this.presentInline();this.onLoadFunc();return}h=document.createElement("iframe");h.id="_fw_ad_container_iframe_"+d.getCustomId()+"_"+Math.random();h.attachEvent?h.attachEvent("onload",this.onLoadFunc):h.onload=
	this.onLoadFunc;this.defaultAdElement=h;this.defaultAdElementContainer.appendChild(h);this._fillAdNode(h,c,j);if(this.isMRAIDAd)this.adLoadTimeoutTimer=new a.Timer(this.adLoadTimeout,a.Util.bind(this,function(){b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorCode:a.ERROR_TIMEOUT,errorModule:"HTMLRenderer",errorInfo:"Loading element timeout"});f!==a.TIME_POSITION_CLASS_DISPLAY?this.isMRAIDAd&&!this.mraid.inLoadingState()?this._mraidClose():this.stop():this.stop()})),this.adLoadTimeoutTimer.start()}if(!this.defaultAdElement&&
	(d=g.getElementsByTagName("iframe"))&&0<d.length)this.defaultAdElement=d[d.length-1];if(this.defaultAdElement){this.defaultAdElement.frameBorder="0";if(this.shouldBackgroundTransparent)this.defaultAdElement.allowTransparency="true",this.defaultAdElement.style["background-color"]="rgba(255,255,255,0)";this.isInterstitialNow?(this.expandedAdElement=this.defaultAdElement,this.presentInterstitial()):this.presentInline();this.messageHandlerFunc=a.Util.bind(this,this._onWindowMessageReceived);this.viewportChangeFunc=
	a.Util.bind(this,function(){this.viewportChangeFuncTimer&&window.clearTimeout(this.viewportChangeFuncTimer);this.viewportChangeFuncTimer=window.setTimeout(a.Util.bind(this,this._onViewportResizeScroll),200)});window.addEventListener?(window.addEventListener("message",this.messageHandlerFunc,!1),window.addEventListener("resize",this.viewportChangeFunc,!1),window.addEventListener("scroll",this.viewportChangeFunc,!1)):window.attachEvent&&(window.attachEvent("onmessage",this.messageHandlerFunc),window.attachEvent("onresize",
	this.viewportChangeFunc),window.attachEvent("onscroll",this.viewportChangeFunc))}else this.isMRAIDAd&&(b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorCode:a.ERROR_UNKNOWN,errorModule:"HTMLRenderer",errorInfo:"Failed to find iframe in slotBase for MRAID ad"}),this.stop())},_layoutOverlayAd:function(a){this.log("_layoutOverlayAd");var c=this.rendererController.getAdInstance(),d=c.getSlot(),f=d.getVideoDisplaySize().width,d=d.getVideoDisplaySize().height,g=c.getActiveCreativeRendition(),c=g.getWidth()||
	240,g=g.getHeight()||50;a.style.width=Math.min(c,f)+"px";a.style.height=Math.min(g,d)+"px";a.style.left=a.style.top=a.style.right=a.style.bottom="";switch(this.primaryAnchor){case "tl":case "lt":a.style.top=this.marginHeight+"px";a.style.left=this.marginWidth+"px";break;case "tr":case "rt":a.style.top=this.marginHeight+"px";a.style.right=this.marginWidth+"px";break;case "bl":case "lb":a.style.bottom=this.marginHeight+"px";a.style.left=this.marginWidth+"px";break;case "br":case "rb":a.style.bottom=
	this.marginHeight+"px";a.style.right=this.marginWidth+"px";break;case "tc":case "ct":a.style.top=this.marginHeight+"px";a.style.left=0.5*Math.max(0,f-c)+"px";break;case "lm":case "ml":a.style.left=this.marginWidth+"px";a.style.top=0.5*Math.max(0,d-g)+"px";break;case "rm":case "mr":a.style.right=this.marginWidth+"px";a.style.top=0.5*Math.max(0,d-g)+"px";break;case "mc":case "cm":case "c":case "m":a.style.left=0.5*Math.max(0,f-c)+"px";a.style.top=0.5*Math.max(0,d-g)+"px";break;default:case "bc":case "cb":a.style.bottom=
	this.marginHeight+"px",a.style.left=0.5*Math.max(0,f-c)+"px"}},_fillAdNode:function(b,c,d){this.log("_fillAdNode, url:"+c+", content:"+(d?"<omited>":"<empty>"));var f=this.rendererController;if(c)b.src=c;else if(d)b=b.contentWindow?b.contentWindow.document:b.contentDocument.document?b.contentDocument.document:b.contentDocument,b.open(),b.write(d),b.close();else return f.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"HTMLRenderer",errorCode:a.ERROR_NULL_ASSET}),!1;return!0},presentInline:function(){this.log("presentInline");
	this.isInterstitialNow=!1;var b=this.defaultAdElement;if(b){var c=this.rendererController.getAdInstance(),d=c.getSlot(),f=d.getTimePositionClass(),g=d.getWidth(),h=d.getHeight(),i=d.getVideoDisplaySize().width,d=d.getVideoDisplaySize().height,k=c.getActiveCreativeRendition(),c=k.getWidth(),k=k.getHeight();b.scrolling="no";b.style.overflow="hidden";switch(f){case a.TIME_POSITION_CLASS_DISPLAY:b.style.position="";b.style.background=this.shouldBackgroundTransparent?"transparent":"";b.style.left="0px";
	b.style.top="0px";b.style.width=(g?g:c)+"px";b.style.height=(h?h:k)+"px";break;case a.TIME_POSITION_CLASS_OVERLAY:b.style.position="absolute";b.style.background=this.shouldBackgroundTransparent?"transparent":"white";this._layoutOverlayAd(b);break;default:b.style.position="absolute",b.style.background=this.shouldBackgroundTransparent?"transparent":"white",b.style.left="0px",b.style.top="0px",b.style.width=i+"px",b.style.height=d+"px"}}},presentInterstitial:function(){this.log("presentInterstitial, defaultExpandWidth: "+
	this.defaultExpandWidth+", defaultExpandHeight: "+this.defaultExpandHeight+", this.mraid.expandWidth: "+this.mraid.expandWidth+", this.mraid.expandHeight: "+this.mraid.expandHeight+", (Math.max(0, this.defaultExpandWidth - this.mraid.expandWidth) / 2) = "+Math.max(0,this.defaultExpandWidth-this.mraid.expandWidth)/2+", (Math.max(0, this.defaultExpandHeight - this.mraid.expandHeight) / 2) = "+Math.max(0,this.defaultExpandHeight-this.mraid.expandHeight)/2);if(this.expandedAdElement){this.isInterstitialNow=
	!0;document.addEventListener&&(document.removeEventListener("touchmove",this.touchMoveDisabler,!1),document.addEventListener("touchmove",this.touchMoveDisabler,!1));var b=this.expandedAdElement.parentNode;if(!this.expandedLightbox)this.expandedLightbox=document.createElement("div"),this.expandedLightbox.style.background="black",this.expandedLightbox.style.opacity=0.8,this.expandedLightbox.style.position="fixed",this.expandedLightbox.style.top="0px",this.expandedLightbox.style.left="0px",this.expandedLightbox.style.zIndex=
	this.expandedLightbox.style["z-index"]=9999,b.appendChild(this.expandedLightbox);this.expandedLightbox.style.width=this.defaultExpandWidth+"px";this.expandedLightbox.style.height=this.defaultExpandHeight+"px";this.expandedAdElement.frameBorder="0";this.expandedAdElement.scrolling="no";this.expandedAdElement.style.position="fixed";this.expandedAdElement.style.overflow="hidden";this.expandedAdElement.style.top=this.expandedAdElement.top=Math.max(0,this.defaultExpandHeight-this.mraid.expandHeight)/2+
	"px";this.expandedAdElement.style.left=this.expandedAdElement.left=Math.max(0,this.defaultExpandWidth-this.mraid.expandWidth)/2+"px";this.expandedAdElement.style.width=this.expandedAdElement.width=this.mraid.expandWidth+"px";this.expandedAdElement.style.height=this.expandedAdElement.height=this.mraid.expandHeight+"px";this.expandedAdElement.style.zIndex=this.expandedAdElement.style["z-index"]=1E4;this.log("presentInterstitial, expanded ad element size: (top, left, width, height) = ("+this.expandedAdElement.top+
	", "+this.expandedAdElement.left+", "+this.expandedAdElement.width+", "+this.expandedAdElement.height+")");if(this.isMRAIDAd){var c=this.expandedAdElement._fw_closeButton;if(!c)c=document.createElement("div"),c.addEventListener?c.addEventListener("click",a.Util.bind(this,function(){this._mraidClose()})):c.attachEvent&&c.attachEvent("onclick",a.Util.bind(this,function(){this._mraidClose()})),c.style.position="fixed",c.style.margin="0px",c.style.padding="0px",c.style.width="25px",c.style.height="25px",
	c.style.zIndex=c.style["z-index"]=10001,b.appendChild(c),this.expandedAdElement._fw_closeButton=c;c.style.top=this.expandedAdElement.style.top;c.style.left=Math.max(0,this.defaultExpandWidth-this.mraid.expandWidth)/2+this.mraid.expandWidth-25+"px";c.innerHTML=this.mraid.useCustomClose?0<a.PLATFORM_ANDROID_VERSION?"   ":"":0<a.PLATFORM_ANDROID_VERSION&&3>=a.PLATFORM_ANDROID_VERSION?'<img style="width:25px; height:25px; border:0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4xJREFUeNrMmjFv2kAUxw/IUAZUw4AqJjIxMAQJ9sIHgDYLUqfSBTowJBudAmOnNCNeAitLyVgxxNlBgk+QTKgb6UQHhr7nniNj8PmM3zk86XQZOPt+ee/e+9+dI4zQms1mGTpsb6EVXH42h/YHmqHrukH17kjAiWvQfYT2gfeH2BjaHfYA9hwqCABkobvik9eI/qkIMYB2A0BPSkG4By44hErrQfvhx0MRn/F/Cy3LwjH0yhfZdRSThOhyCI2FZ/iuRrFYjMxmMyMwCEDc8nB6LSsDTBZg7g4GAYj7ANmI0gpeMDEPTxwDhBRMzAXiGrqv7PgMYTSA+eWZtQACvfCTHbedQzYbu4LwOvHolp3q9TorlUpsuVyyfr/P1us16ezi8TirVqtmP5lMzPcIiuepvc5EHT+4doPIZDImhPV3q9UyX0hl+MxOp2O+I5/Ps1qt5pWat4py1CE7Gm4jnf99Sph9z5Lw9gWf845HhLJjtVqx0WhEDuMGgaElYVdbWYuTDbxGYcwiELreskQiwXK5HFssFmyz2ZBA4PoTrA9nFhtCFnu2PCJdL6bTKYlnCCCYfe4WyGc/I4PCEEK8zD3Cw+rxkPjGDIMp2Rl+otRMDGHZaZRvTQ8yv55RBGEKSwQ5C/IEWRiFEGhnMVj1naCbJa9slk6nVUKg/T2h2iyhZywZ4/RCMplUCWFW+hPBsQ0ZjFMhEEOY9SRKLUv3rRnFEHtFI4nhRPelX1xH2FQYOYjf9EsJ8qQSQqVqth8dkYGI6oQK1awExKvYUQlNL5CFSghq1exiCwQxVEOEAGPEYFPyG2QKniS+CWNTRL05w7DSdf2blX7HYe7siD0ztteRm7B3doQww5c9Ow+vspcKRvHXbrfJBCBBmOH13XdnZe95jcKzJmoVK/KMhPV2JAq/UDG8TgJVCEA3GAlvGG5a61JGpmM4UKtYJ4zEs7fmuu8Qu8vU3xEK12EqlXJV0FZIgTe6QhAOcx/kUEKxYUhVZGX8Oft/sX9sNudz2zHXW13wCm6B71m4F6AiwyuECnhj7mtjxQdUKPcrQdStCELoEZtnNO6ZwiuGU8Xr4wE/HwzgJVDY19T49cOlzA9jsk/EC0iQMQ/cM+9C8MIngOjLDjj0o5oGrzVZBWsBa8TA78Cgnznh3QQe6we9j0cpPnTe1IYG4kgIZR5273mvCdIohg6G6TzI5O32T4ABAPsBS28k7apdAAAAAElFTkSuQmCC">':
	'<img style="width:25px; height:25px; border:0" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHZpZXdCb3g9IjAgMCA0MDAgNDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0MDAgNDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Y2lyY2xlIGZpbGw9IiM2NjY2NjYiIGN4PSIyMDAuMTM5IiBjeT0iMTk5Ljg2IiByPSIxOTcuODYiLz48cGF0aCBmaWxsPSIjRjBGMEYwIiBzdHJva2U9IiNGMEYwRjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTExNC44NjUsMzAzLjY0NGMtNi4yMjYsNi4yMjctMTUuMzYzLDcuMTg2LTIwLjQwNywyLjE0NGwtMC41MjItMC41MjJjLTUuMDQzLTUuMDQzLTQuMDgzLTE0LjE4LDIuMTQ0LTIwLjQwN0wyODQuODYsOTYuMDc4YzYuMjI2LTYuMjI3LDE1LjM2Mi03LjE4NiwyMC40MDUtMi4xNDRsMC41MjIsMC41MjFjNS4wNDMsNS4wNDIsNC4wODMsMTQuMTc5LTIuMTQ0LDIwLjQwOEwxMTQuODY1LDMwMy42NDR6Ii8+PHBhdGggZmlsbD0iI0YwRjBGMCIgc3Ryb2tlPSIjRjBGMEYwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0zMDcuODE5LDI4OC42NjZjNS4xNTMsNS4xNTgsNS4wNDgsMTMuNjI0LTAuMjQxLDE4LjkxMWwwLDBjLTUuMjg4LDUuMjg5LTEzLjc1Miw1LjM5My0xOC45MDksMC4yNEw5MS45MDYsMTExLjA1NWMtNS4xNTYtNS4xNTYtNS4wNDgtMTMuNjIzLDAuMjQtMTguOTFsMCwwYzUuMjktNS4yODksMTMuNzU1LTUuMzk2LDE4LjkxMS0wLjI0MUwzMDcuODE5LDI4OC42NjZ6Ii8+PC9zdmc+">'}}},
	_onWindowMessageReceived:function(b){if(this.defaultAdElement&&!(b.source!==this.defaultAdElement.contentWindow&&(this.expandedAdElement?b.source!==this.expandedAdElement.contentWindow:1))){this.log("_onWindowMessageReceived, event.data:"+b.data+", event.origin:"+b.origin);var c=b.data.toString().split(":");if(c&&2<=c.length&&"fwsdk-invoke"===c[0]){var d=c[1];if((c=c.slice(2))&&0<c.length){for(var f=0;f<c.length;f++)c[f]=decodeURIComponent(c[f]);1===c.length&&(c=c[0])}else c=null;if("iframe_ready"===
	d){if(this.onLoadFunc&&b.source===this.defaultAdElement.contentWindow&&this.defaultAdElement!==this.expandedAdElement)this.onLoadFunc();if(c&&(c=a.Util.trim(c))&&this.isMRAIDAd)this.mraid.baseUrl=c;this.bootstrap&&b.source.postMessage("fwsdk-bounce:"+this.bootstrap,b.origin);b.source.postMessage('fwsdk-bounce:mraid._messagingModel = "postMessage"',b.origin);if(this.isMRAIDAd)b.source===this.defaultAdElement.contentWindow&&this.shouldPauseContentWhenStart&&this.rendererController.requestContentStateChange(!0),
	this.mraid.inLoadingState()?this.mraid.state=this.mraid.STATEDEFAULT:this.expandedAdElement&&b.source===this.expandedAdElement.contentWindow&&this.mraid.pushData()}else this.isMRAIDAd?this._mraidMethods(d,c):"close"===d&&this.stop()}}},_mraidMethods:function(b,c){if(b&&this.isMRAIDAd)switch(this.log("_mraidMethods("+b+", "+c+")"),b){case "open":"string"===typeof c?this._mraidOpen(c):2<=c.length&&this._mraidOpen(c[0],a.Util.str2bool(c[1]));break;case "close":this._mraidClose();break;case "expand":this._mraidExpand(c);
	break;case "useCustomClose":c&&0<c.length?this.mraid.useCustomClose=a.Util.str2bool(c):this.warn("Invalid parameter to useCustomClose");break;case "setExpandProperties":if(!c)break;this.requestedExpandWidth=Number(c[0]);this.requestedExpandHeight=Number(c[1]);if(!this.requestedExpandWidth||!this.requestedExpandHeight||this.requestedExpandWidth===this.defaultExpandWidth&&this.requestedExpandHeight===this.defaultExpandHeight)this.requestedExpandHeight=this.requestedExpandWidth=0;this.mraid.useCustomClose=
	a.Util.str2bool(c[2]);(this.requestedExpandWidth!==this.mraid.expandWidth||this.requestedExpandHeight!==this.mraid.expandHeight)&&this.mraid.pushData();break;case "log":this.log("MRAID log:"+c);break;default:this.warn("Unknown MRAID function call: "+b+" with param:"+c)}},_mraidOpen:function(b,c){this.log("_mraidOpen("+b+"), baseUrl:"+this.mraid.baseUrl+", absolute Url"+(b=a.Util.getAbsoluteUrl(this.mraid.baseUrl,b)));var d=this.rendererController;d.getAdInstance();b&&"string"===typeof b&&0<b.length?
	((c||"undefined"===typeof c)&&window.open(b),d.processEvent({name:a.EVENT_AD_CLICK,info:{showBrowser:!1,url:b}})):this.warn("_mraidOpen: url required for open")},_mraidClose:function(){this.log("_mraidClose, current state: "+this.mraid.state);if(this.mraid.inExpandedState()){window.removeEventListener&&document.removeEventListener("touchmove",this.touchMoveDisabler,!1);var a=this.expandedAdElement,c=this.expandedAdElement._fw_closeButton;this.expandedAdElement._fw_closeButton=null;var d=this.expandedAdElement.parentNode;
	this.mraid.state=this.mraid.STATEDEFAULT;if(this.expandedLightbox)d.removeChild(this.expandedLightbox),this.expandedLightbox=null;if(a!==this.defaultAdElement)a.style.display="hidden",window.setTimeout(function(){d.removeChild(a)},50);d.removeChild(c)}else this.mraid.inDefaultState()?this.mraid.state=this.mraid.STATEHIDDEN:this.warn("_mraidClose: close() is only valid when in expanded/default state")},_mraidExpand:function(b){this.log("_mraidExpand, current state: "+this.mraid.state);if(this.mraid.inDefaultState())if(this.shouldKeepInterstitial)this.warn("_mraidExpand: expand() is only valid for inline ad");
	else{if(b){var c=document.createElement("iframe");if(this.shouldBackgroundTransparent)c.allowTransparency="true",c.style["background-color"]="rgba(255,255,255,0)";(this.defaultAdElementContainer||this.defaultAdElement.parentNode).appendChild(c);this.expandedAdElement=c;this.log("_mraidExpand("+b+"), baseUrl:"+this.mraid.baseUrl+", absolute Url"+(b=a.Util.getAbsoluteUrl(this.mraid.baseUrl,b)));this._fillAdNode(c,b,null)}this.mraid.state=this.mraid.STATEEXPANDED;this.isInterstitialNow=!0;this._onViewportResizeScroll()}else this.warn("_mraidExpand: expand() is only valid when in default state")},
	_onViewportResizeScroll:function(){var b=a.Util.getViewport();this.defaultExpandWidth=b.width;this.defaultExpandHeight=b.height;this.isInterstitialNow&&this.presentInterstitial()},log:function(b){var c=this.rendererController.getAdInstance().getSlot();a.log("HTMLRenderer["+c+"]\t"+b)},warn:function(b){var c=this.rendererController.getAdInstance().getSlot();a.warn("HTMLRenderer["+c+"]\t"+b)},info:function(){return{moduleType:a.MODULE_TYPE_RENDERER}},getPlayheadTime:function(){return this.timer?this.timer.getPlayheadTime():
	-1},getDuration:function(){return this.timer?this.timer.getDuration():-1}};a.HTMLRenderer.prototype.constructor=a.HTMLRenderer;a.Ad=function(){var b=null,c=[],d=!1,f=null,g=!1;return{isRequiredToShow:function(){return g},parse:function(h){if(h){b=h.adId||null;d=h.noLoad;f=h.adUnit;if(h.hasOwnProperty("required"))g=h.required;for(var i=0,h=h.creatives||[];i<h.length;i++){var k=h[i],j=new a.Creative;j.parse(k);c.push(j)}}},getSoAdUnit:function(){return f},getId:function(){return b},getNoLoad:function(){return d},
	getCreative:function(a){for(var b=0;b<c.length;b++)if(c[b].getId()===a)return c[b];return null},addCreativeRendition:function(){var b=new a.Creative;c.push(b);return b}}};a.Creative=function(){var b=null,c=null,d=null,f={},g=[];return{getId:function(){return b},getBaseUnit:function(){return c},getDuration:function(){return d},getParameter:function(a){return f[a]},setParameter:function(a,b){null==b?delete f[a]:f[a]=b},parse:function(h){if(h){b=h.creativeId||null;c=h.baseUnit||null;d=1*h.duration;var i;
	if(h.parameters)if(h.parameters.constructor===Array)for(var k=0,j=h.parameters||[];k<j.length;k++)i=j[k],f[i.name]=i.value;else"object"===typeof h.parameters&&(f=a.Util.copy(h.parameters));for(k=0,j=h.creativeRenditions||[];k<j.length;k++)i=j[k],h=new a.CreativeRendition,h.parse(i),h.setDuration(d),h.setBaseUnit(c),g.push(h)}},getAllCreativeRenditions:function(){return g},cloneForTranslation:function(){var g=new a.Creative;g.parse({creativeId:b,baseUnit:c,duration:d,parameters:a.Util.copy(f)});return g}}};
	a.CreativeRendition=function(){var b=null,c="None",d=null,f=null,g=null,h=null,i=null,k=null,j=null,m=null,l={},o=null,n=[],t=null;return{getId:function(){return b},getCreativeApi:function(){return c},setCreativeApi:function(a){c=a||"None"},getReplicaId:function(){return f},getContentType:function(){return g?g:o&&o.getContentType()?o.getContentType():null},setContentType:function(a){g=a},getWrapperType:function(){return h},setWrapperType:function(a){h=a},getWrapperUrl:function(){return i},setWrapperUrl:function(a){i=
	a},getBaseUnit:function(){return d},setBaseUnit:function(a){d=a},getPreference:function(){return k},setPreference:function(a){k=a},getWidth:function(){return j},setWidth:function(a){j=a},getHeight:function(){return m},setHeight:function(a){m=a},getDuration:function(){return t},setDuration:function(a){t=a},getParameter:function(a){return l[a]},setParameter:function(a,b){null==b?delete l[a]:l[a]=b},getPrimaryCreativeRenditionAsset:function(){return o},getOtherCreativeRenditionAssets:function(){return n.slice()},
	addCreativeRenditionAsset:function(b,c){var d=new a.CreativeRenditionAsset;d.setName(b);c?o=d:n.push(d);return d},parse:function(d){if(d){b=d.creativeRenditionId||null;c=d.creativeApi||"None";f=d.hasOwnProperty("adReplicaId")?1*d.adReplicaId:-1;g=d.contentType||null;h=d.wrapperType||null;i=d.wrapperUrl||null;k=1*d.preference;j=1*d.width;m=1*d.height;for(var t,w=0,x=d.parameters||[];w<x.length;w++)t=x[w],l[t.name]=t.value;o=new a.CreativeRenditionAsset;o.parse(d.asset);for(w=0,x=d.otherAssets||[];w<
	x.length;w++)t=x[w],d=new a.CreativeRenditionAsset,d.parse(t),n.push(d)}}}};a.CreativeRenditionAsset=function(){var a=null,c=null,d=null,f=null,g=null,h=null;return{getName:function(){return a},setName:function(c){a=c},getUrl:function(){return c},setUrl:function(a){c=a},getContent:function(){return d},setContent:function(a){d=a},getContentType:function(){return f},setContentType:function(a){f=a},getMimeType:function(){return g},setMimeType:function(a){g=a},getBytes:function(){return h},setBytes:function(a){h=
	a},parse:function(i){i&&(a=i.name||null,c=i.url||null,d=i.content||null,f=i.contentType||null,g=i.mimeType||null,h=1*i.bytes)}}};a.AdControlExtension=function(a){this._context=a;this._currentSlot=this._dragEvent=this._clickEvent=this._targetElement=null;this._dragging=!1};a.AdControlExtension.prototype={start:function(){if(!this._clickEvent)this._clickEvent=a.PLATFORM_EVENT_CLICK,this._dragEvent=a.MOBILE_EVENT_DRAG;this._onAdClicked=a.Util.bind(this,function(){a.log("AdControlExtension","clicked on target element: "+
	this._targetElement.id);var b=this._currentSlot?this._currentSlot.getCurrentAdInstance():null;if(!(b&&"VPAID"==b.getActiveCreativeRendition().getCreativeApi()))this._dragging?this._dragging=!1:this._currentSlot&&this._currentSlot.getCurrentAdInstance()&&this._currentSlot.getCurrentAdInstance().getRendererController().processEvent({name:a.EVENT_AD_CLICK})});this._onAdDragged=a.Util.bind(this,function(){a.log("AdControlExtension","dragging target element: "+this._targetElement.id);this._dragging=!0});
	this._onSlotStarted=a.Util.bind(this,function(a){a.slot&&this._isTargetSlot(a.slot)&&(this._clearListener(),this._attachListener(a.slot))});this._onSlotEnded=a.Util.bind(this,function(a){if(a.slot&&this._isTargetSlot(a.slot)){if(this._targetElement)this._targetElement.style.visibility="hidden";this._clearListener()}});this._onAdStarted=a.Util.bind(this,function(b){if((b=b.adInstance)&&this._isTargetSlot(b.getSlot())&&this._targetElement&&"VPAID"!=b.getActiveCreativeRendition().getCreativeApi())this._targetElement.style.visibility=
	0<b.getEventCallbackUrls(a.EVENT_AD_CLICK,a.EVENT_TYPE_CLICK).length?"":"hidden"});this._context.addEventListener(a.EVENT_SLOT_ENDED,this._onSlotEnded);this._context.addEventListener(a.EVENT_SLOT_STARTED,this._onSlotStarted);this._context.addEventListener(a.EVENT_AD_IMPRESSION,this._onAdStarted);if(this._targetElement)this._targetElement.style.visibility="hidden"},_onAdClicked:function(){},_onSlotStarted:function(){},_onSlotEnded:function(){},_attachListener:function(b){a.debug("AdControlExtension._attachListener");
	var c=this._context.getParameter(a.PARAMETER_EXTENSION_AD_CONTROL_CLICK_ELEMENT);if(c)(this._targetElement=document.getElementById(c))?(this._currentSlot=b,this._targetElement.addEventListener(this._clickEvent,this._onAdClicked,!1),this._targetElement.addEventListener(this._dragEvent,this._onAdDragged,!1)):a.warn("Attempted to process click/tap via PARAMETER_EXTENSION_AD_CONTROL_CLICK_ELEMENT specified html element: '"+c+"'. The specified element is not available on the current HTML page.")},_clearListener:function(){if(this._targetElement)this._targetElement.removeEventListener(this._clickEvent,
	this._onAdClicked,!1),this._targetElement.removeEventListener(this._dragEvent,this._onAdDragged,!1),this._targetElement=null;this._currentSlot=null},_isTargetSlot:function(b){return b.getType()===a.SLOT_TYPE_TEMPORAL&&b.getTimePositionClass()!==a.TIME_POSITION_CLASS_OVERLAY?!0:!1},dispose:function(){a.log("AdControlExtension.dispose()");this._clearListener();this._onAdClicked=null;this._context.removeEventListener(a.EVENT_SLOT_ENDED,this._onSlotEnded);this._context.removeEventListener(a.EVENT_SLOT_STARTED,
	this._onSlotStarted);this._context.removeEventListener(a.EVENT_AD_IMPRESSION,this._onAdStarted);this._onAdStarted=this._onSlotEnded=this._onSlotStarted=null}};a.AdControlExtension.prototype.constructor=a.AdControlExtension;a.AdInstance=function(b){this._context=b;this._primaryCreativeRendition=this._creative=this._replicaId=this._creativeRenditionId=this._creativeId=this._soAdUnit=this._adId=this._slot=null;this._creativeRenditions=[];this._noLoad=!1;this._companionAdInstances=[];this._eventCallbacks=
	[];this._externalEventCallbackUrlsDictionary={};this._rendererController=new a.RendererController(b,this);this._timer=new a.Timer;this._metr=0;this._state=a.MediaInitState.instance;this._isStartSuccessfully=this._translated=this._isImpressionSent=!1;this._lastDurationFromRenderer=-1;this._slotCustomId=this._parentAdInstancesGroup=null};a.AdInstance.prototype={};a.AdInstance.prototype.constructor=a.AdInstance;a.METR_MASK_QUARTILE=0;a.METR_MASK_MIDPOINT=1;a.METR_MASK_COMPLETE=2;a.METR_MASK_VOLUME=3;
	a.METR_MASK_SIZE=4;a.METR_MASK_CONTROL=5;a.METR_MASK_REWIND=6;a.METR_MASK_ACCEPT_INVITATION=7;a.METR_MASK_CLOSE=8;a.METR_MASK_MINIMIZE=9;a.METR_MASK_CLICK=10;a.AdInstance._metrDictionary={};a.AdInstance._metrDictionary[a.EVENT_AD_FIRST_QUARTILE]=a.AdInstance._metrDictionary[a.EVENT_AD_THIRD_QUARTILE]=a.AdInstance._metrDictionary[a.EVENT_AD_QUARTILE]=1<<a.METR_MASK_QUARTILE|1<<a.METR_MASK_MIDPOINT|1<<a.METR_MASK_COMPLETE;a.AdInstance._metrDictionary[a.EVENT_AD_MIDPOINT]=1<<a.METR_MASK_MIDPOINT|1<<
	a.METR_MASK_COMPLETE;a.AdInstance._metrDictionary[a.EVENT_AD_COMPLETE]=1<<a.METR_MASK_COMPLETE;a.AdInstance._metrDictionary[a.EVENT_AD_MUTE]=1<<a.METR_MASK_VOLUME;a.AdInstance._metrDictionary[a.EVENT_AD_UNMUTE]=1<<a.METR_MASK_VOLUME;a.AdInstance._metrDictionary[a.EVENT_AD_COLLAPSE]=1<<a.METR_MASK_SIZE;a.AdInstance._metrDictionary[a.EVENT_AD_EXPAND]=1<<a.METR_MASK_SIZE;a.AdInstance._metrDictionary[a.EVENT_AD_PAUSE]=1<<a.METR_MASK_CONTROL;a.AdInstance._metrDictionary[a.EVENT_AD_RESUME]=1<<a.METR_MASK_CONTROL;
	a.AdInstance._metrDictionary[a.EVENT_AD_REWIND]=1<<a.METR_MASK_REWIND;a.AdInstance._metrDictionary[a.EVENT_AD_ACCEPT_INVITATION]=1<<a.METR_MASK_ACCEPT_INVITATION;a.AdInstance._metrDictionary[a.EVENT_AD_CLOSE]=1<<a.METR_MASK_CLOSE;a.AdInstance._metrDictionary[a.EVENT_AD_MINIMIZE]=1<<a.METR_MASK_MINIMIZE;a.AdInstance._metrDictionary[a.EVENT_AD_CLICK]=1<<a.METR_MASK_CLICK;a.Util.mixin(a.AdInstance.prototype,{getAdId:function(){return this._adId},getSoAdUnit:function(){return this._soAdUnit},getEventCallbackUrls:function(b,
	c){var d=[],f=c===a.EVENT_TYPE_CLICK,g=c===a.EVENT_TYPE_CLICK_TRACKING,h=a.EventCallback.getEventCallback(this._eventCallbacks,b,g?a.EVENT_TYPE_CLICK:c);if(!h)return d;var i={};i[a.INFO_KEY_NEED_EMPTY_CT]=!0;f?h._showBrowser&&d.push(h.getUrl(i)):g?h._showBrowser||d.push(h.getUrl(i)):d.push(h.getUrl(i));f||(d=d.concat(h.getTrackingUrls()));return d},addEventCallbackUrls:function(a,c,d){d&&this._isValidEventNameAndType(a,c)&&(this._externalEventCallbackUrlsDictionary[c+"-"+a]=this.getExternalEventCallbackUrls(a,
	c).concat(d||[]))},setClickThroughUrl:function(b,c){if(c&&this._isValidEventNameAndType(b,a.EVENT_TYPE_CLICK)){var d=this.getEventCallback(b,a.EVENT_TYPE_CLICK);if(d){if(!a.Util.isParameterInURL(d._url,a.URL_PARAMETER_KEY_CR))d._url=d._url+"&"+a.URL_PARAMETER_KEY_CR+"=";d._url=a.Util.setParameterInURL(d._url,a.URL_PARAMETER_KEY_CR,c);d._showBrowser=!0}}},addCreativeRendition:function(){var b=new a.CreativeRendition;b.parse({creativeRenditionId:this._creativeRenditionId,preference:0});b.setBaseUnit(this._creative.getBaseUnit());
	b.setDuration(this._creative.getDuration());this._creativeRenditions.push(b);if(this.isPlaceholder())this._noLoad=!1;return b},getRendererController:function(){return this._rendererController},getSlot:function(){if(!this._slot)this._slot=this._context._adResponse.getSlotByCustomId(this._slotCustomId);return this._slot},getCompanionSlots:function(){for(var a=[],c=0;c<this._companionAdInstances.length;c++)a.push(this._companionAdInstances[c]._slot);return a},getCreativeRendition:function(a,c){for(var d=
	null,f=0,g=this._creativeRenditions||[];f<g.length;f++)if(g[f].getId()===a){if(g[f].getReplicaId()===c)return g[f];if(!d||g[f].getReplicaId()<d.getReplicaId())d=g[f]}return d},getActiveCreativeRendition:function(){return this._primaryCreativeRendition},setActiveCreativeRendition:function(b){b?(-1==this._creativeRenditions.indexOf(b)&&this._creativeRenditions.push(cr),this._primaryCreativeRendition=b,this._creativeRenditionId=b.getId()):a.warn("AdInstance.setActiveCreativeRendition","rendition is null")},
	getAllCreativeRenditions:function(){var a=this._creativeRenditions.slice();a.sort(function(a,b){return b.getPreference()-a.getPreference()});var c=a.indexOf(this._primaryCreativeRendition);-1<c&&(a.splice(c,1),a.unshift(this._primaryCreativeRendition));return a},getRenderableCreativeRenditions:function(){var a=this._creativeRenditions.slice().sort(function(a,b){return b.getPreference()-a.getPreference()}).filter(function(a){return this._rendererController.rendererMatch(a)},this),c=a.indexOf(this._primaryCreativeRendition);
	-1<c&&(a.splice(c,1),a.unshift(this._primaryCreativeRendition));return a},getPlayheadTime:function(){var b=-1;if(this._rendererController.getRenderer()&&"function"===typeof this._rendererController.getRenderer().getPlayheadTime)try{b=this._rendererController.getRenderer().getPlayheadTime()}catch(c){a.warn("AdInstance.getPlayheadTime",c.description)}return b},getDuration:function(){var a=-1;if(this._rendererController.getRenderer()&&"function"===typeof this._rendererController.getRenderer().getDuration)this._lastDurationFromRenderer=
	a=this._rendererController.getRenderer().getDuration();-1===a&&(a=-1<this._lastDurationFromRenderer?this._lastDurationFromRenderer:this.getActiveCreativeRendition().getDuration());return a},parse:function(b){if(b){this._adId=b.adId;this._creativeId=b.creativeId;this._creativeRenditionId=b.creativeRenditionId;this._replicaId=b.hasOwnProperty("replicaId")?1*b.replicaId:-1;this._noLoad=this._context._adResponse.getAd(this._adId).getNoLoad();this._soAdUnit=this._context._adResponse.getAd(this._adId).getSoAdUnit();
	this._creative=this._context._adResponse.getCreative(this._adId,this._creativeId);this._creativeRenditions=this._creative.getAllCreativeRenditions();for(var c,d=0,f=b.eventCallbacks||[];d<f.length;d++){c=f[d];var g=a.EventCallback.newEventCallback(this._context,c.name,c.type);if(g)g._adInstance=this,g.parse(c),this._eventCallbacks.push(g)}for(d=0,f=b.companionAds||[];d<f.length;++d)if((c=f[d])&&c.adSlotCustomId)g=new a.AdInstance(this._context),g._slotCustomId=c.adSlotCustomId,g.parse(c),this._companionAdInstances.push(g);
	for(d=0,f=b.fallbackAds||[];d<f.length;++d)c=f[d],g=new a.AdInstance(this._context),this._parentAdInstancesGroup.push(g),g._slot=this._slot,g._parentAdInstancesGroup=this._parentAdInstancesGroup,g.parse(c);this._primaryCreativeRendition=this.getCreativeRendition(this._creativeRenditionId,this._replicaId)}},play:function(){a.log("AdInstance.play "+this._slotCustomId);this._timer.tick();this.processEvent(a.EVENT_AD_IMPRESSION,a.EVENT_TYPE_IMPRESSION);if(!this._isStartSuccessfully)a.MODULE_TYPE_RENDERER===
	this._rendererController.getRenderer().info()[a.INFO_KEY_MODULE_TYPE]&&this._context.dispatchEvent(a.EVENT_AD_IMPRESSION,{adInstance:this,slotCustomId:this._slotCustomId}),this._isStartSuccessfully=!0;this._state.play(this);if(this._rendererController.getRenderer().info()[a.INFO_KEY_MODULE_TYPE]===a.MODULE_TYPE_RENDERER)for(var b=0;b<this._companionAdInstances.length;b++)this._companionAdInstances[b].isPlaceholder()||this._companionAdInstances[b].getSlot().playCompanionAds(this._companionAdInstances[b])},
	stop:function(){a.log("AdInstance.stop");this._rendererController.stop()},fakeComplete:function(){if(this._slot.getTimePositionClass()===a.TIME_POSITION_CLASS_DISPLAY)this._isStartSuccessfully=!1,this._slot.playNextAdInstance()},complete:function(){this._isStartSuccessfully&&(this.processEvent(a.EVENT_AD_IMPRESSION_END,a.EVENT_TYPE_IMPRESSION),a.MODULE_TYPE_RENDERER===this._rendererController.getRenderer().info()[a.INFO_KEY_MODULE_TYPE]&&this._context.dispatchEvent(a.EVENT_AD_IMPRESSION_END,{adInstance:this}));
	this._state.complete(this);this._rendererController._restorePlaceholdersForHybrid();this._rendererController.setRenderer(null);this._isStartSuccessfully=!1;this._slot.playNextAdInstance()},isStarted:function(){return this._isStartSuccessfully},onStartPlaying:function(){a.MODULE_TYPE_RENDERER===this._rendererController.getRenderer().info()[a.INFO_KEY_MODULE_TYPE]?this._isImpressionSent=!0:this._translated=!0},onCompletePlaying:function(){},onStartReplaying:function(){},onCompleteReplaying:function(){},
	getEventCallback:function(b,c){return a.EventCallback.getEventCallback(this._eventCallbacks,b,c)},processEvent:function(b,c,d){var f=!0,c=this.getEventCallback(b,c);b===a.EVENT_AD_IMPRESSION&&this._isStartSuccessfully&&(c=this.getEventCallback(a.EVENT_ERROR,a.EVENT_TYPE_ERROR),d={errorInfo:"Trying to send defaultImpression multiple times"},f=!1);c?c.process(d):f=!1;b===a.EVENT_AD_CLICK&&this._context.dispatchEvent(a.EVENT_AD_CLICK,{adInstance:this});(b!=a.EVENT_AD_IMPRESSION&&b!=a.EVENT_AD_IMPRESSION_END||
	a.MODULE_TYPE_RENDERER===this._rendererController.getRenderer().info()[a.INFO_KEY_MODULE_TYPE])&&this._context.dispatchEvent(a.EVENT_AD,{subType:b,adInstance:this,slot:this._slot});return f},setMetr:function(b,c){var d=a.AdInstance._metrDictionary[b];if(d)b===a.EVENT_AD_CLICK&&(c=!c),this._metr=c===a.CAPABILITY_STATUS_ON||!0===c?this._metr|d:this._metr&~d},getExternalEventCallbackUrls:function(a,c){return(this._externalEventCallbackUrlsDictionary[c+"-"+a]||[]).slice()},reset:function(){this._rendererController.reset();
	for(var b=0;b<this._companionAdInstances.length;b++){var c=this._companionAdInstances[b];(c._state===a.MediaPlayingState.instance||c._state===a.MediaReplayingState.instance)&&c.stop();c._rendererController.reset()}},cloneForTranslation:function(){var b=new a.AdInstance(this._context);b._parent=this;b._adId=this._adId;b._creativeId=this._creativeId;b._creative=this._creative.cloneForTranslation();b._creativeRenditionId=this._creativeRenditionId;b._noLoad=this._noLoad;b._slot=this.getSlot();b._soAdUnit=
	this.getSoAdUnit();for(var c=0;c<this._eventCallbacks.length;c++){var d=this._eventCallbacks[c].copy();d._adInstance=b;b._eventCallbacks.push(d)}b._externalEventCallbackUrlsDictionary=a.Util.copy(this._externalEventCallbackUrlsDictionary);for(c=0;c<this._companionAdInstances.length;c++)this._companionAdInstances[c].isPlaceholder()?b._companionAdInstances.push(this._companionAdInstances[c].cloneForTranslation()):b._companionAdInstances.push(this._companionAdInstances[c]);return b},isPlaceholder:function(){return this._noLoad},
	setMediaState:function(a){this._state=a},_isValidEventNameAndType:function(b,c){return a.Util.isBlank(b)||a.Util.isBlank(c)?!1:c===a.EVENT_TYPE_CLICK||c===a.EVENT_TYPE_CLICK_TRACKING||c===a.EVENT_TYPE_IMPRESSION&&(b===a.EVENT_AD_IMPRESSION||b===a.EVENT_AD_FIRST_QUARTILE||b===a.EVENT_AD_MIDPOINT||b===a.EVENT_AD_THIRD_QUARTILE||b===a.EVENT_AD_COMPLETE)||c===a.EVENT_TYPE_STANDARD&&(b===a.EVENT_AD_PAUSE||b===a.EVENT_AD_RESUME||b===a.EVENT_AD_REWIND||b===a.EVENT_AD_MUTE||b===a.EVENT_AD_UNMUTE||b===a.EVENT_AD_COLLAPSE||
	b===a.EVENT_AD_EXPAND||b===a.EVENT_AD_MINIMIZE||b===a.EVENT_AD_CLOSE||b===a.EVENT_AD_ACCEPT_INVITATION)||c===a.EVENT_TYPE_ERROR&&b===a.EVENT_ERROR},isPlayable:function(){var b;b=!(this._rendererController.getRendererState()==a.RendererFailedState.instance&&!this._isImpressionSent);if(!b)return a.debug("AdInstance.isPlayable returning false isImpressionSent:",this._isImpressionSent),b;(b=b&&!this._translated)||a.debug("AdInstance.isPlayable returning false translated:",this._translated);return b},
	toString:function(){return"[AdInstance "+this._adId+"]"},getCompanionAdInstances:function(){for(var a=[],c=0;c<this._companionAdInstances.length;++c)this._companionAdInstances[c].isPlaceholder()||a.push(this._companionAdInstances[c]);return a},isRequiredToShow:function(){return this._context._adResponse.getAd(this._adId).isRequiredToShow()}});a.AdManager=function(){var b=this;this._context=this.newContext();this._context.addEventListener(a.EVENT_REQUEST_COMPLETE,function(a){b.onRequestComplete(a)});
	this._networkId=this._serverURL="";this._onRequestComplete=this._location=null};a.AdManager.prototype={getVersion:function(){if(a.version){var b=a.version.match(/^js-(\d)\.(\d)\.(\d).(\d)/)||a.version.match(/^js-(\d)\.(\d)\.(\d)/)||a.version.match(/^js-(\d)\.(\d)/);if(0<b.length)return(b[1]<<24)+(b[2]<<16)+(b[3]<<8)+b[4];if(0===a.versions.indexOf("js-trunk"))return 4294967295}return 0},setNetwork:function(b){a.debug("AdManager.setNetwork("+Array.prototype.slice.call(arguments).join(",")+")");if(0<
	1*b){this._networkId=1*b;for(var c in a._instanceQueue)if(a._instanceQueue.hasOwnProperty(c)){var d=a._instanceQueue[c];d&&d._videoAsset._videoPlayPending&&d._videoAsset.play()}}else a.warn("AdManager.setNetwork","valid networkId required")},setServerURL:function(b){a.debug("AdManager.setServerURL("+Array.prototype.slice.call(arguments).join(",")+")");a.warn("AdManager.setServerURL method is DEPRECATED, use AdManager.setServer instead.");this.setServer(b)},setServer:function(b){a.debug("AdManager.setServer("+
	Array.prototype.slice.call(arguments).join(",")+")");if(!b||"string"!==typeof b)a.warn("AdManager.setServer","server url required");else{this._serverURL=b;for(var c in a._instanceQueue)if(a._instanceQueue.hasOwnProperty(c)){var d=a._instanceQueue[c];d&&d._videoAsset._videoPlayPending&&d._videoAsset.play()}}},setLocation:function(b){a.debug("AdManager.setLocation("+Array.prototype.slice.call(arguments).join(",")+")");this._location=b},newContext:function(){a.debug("AdManager.newContext("+Array.prototype.slice.call(arguments).join(",")+
	")");return new a.Context(this)},setParameter:function(b,c,d){a.debug("AdManager.setParameter("+Array.prototype.slice.call(arguments).join(",")+")");this._context.setParameter(b,c,d)},getParameter:function(a){return this._context.getParameter(a)},submitRequest:function(b,c){a.debug("AdManager.submitRequest()");b&&"function"===typeof b?this._onRequestComplete=b:a.warn("AdManager.submitRequest(): callback function required");this._context.submitRequest(c/1E3)},onRequestComplete:function(b){a.debug("AdManager.onRequestComplete("+
	Array.prototype.slice.call(arguments).join(",")+")");if(this._onRequestComplete)this._onRequestComplete({success:b.success,response:b.response}),this._onRequestComplete=null},registerVideoDisplayBase:function(b){a.debug("AdManager.registerVideoDisplayBase("+Array.prototype.slice.call(arguments).join(",")+")");this._context.registerVideoDisplayBase(b)},setVideoAsset:function(b,c){a.debug("AdManager.setVideoAsset("+Array.prototype.slice.call(arguments).join(",")+")");this._context.setVideoAsset(b,c)},
	setSiteSection:function(b){a.debug("AdManager.setSiteSection("+Array.prototype.slice.call(arguments).join(",")+")");this._context.setSiteSection(b)},addKeyValue:function(b,c){a.debug("AdManager.addKeyValue("+Array.prototype.slice.call(arguments).join(",")+")");this._context.addKeyValue(b,c)},setVideoDisplayCompatibleSizes:function(b){a.debug("AdManager.setVideoDisplayCompatibleSizes("+Array.prototype.slice.call(arguments).join(",")+")");this._context.setVideoDisplayCompatibleSizes(b)},playSlots:function(b,
	c){a.warn("AdManager.playSlots() has DEPRECATED, use tv.freewheel.SDK.Slot.Play() instead");a.debug("AdManager.playSlots("+b+")");"string"===typeof b&&(b=b.toUpperCase());this._playSlots(b,c)},_playSlots:function(b,c){"function"!==typeof c&&(c=function(){});if(this._context._adResponse){for(var d=[],f=this._context.getTemporalSlots(),g=0;g<f.length;++g){var h=f[g];(0.1>Math.abs(h.getTimePosition()-b)||b===h.getTimePositionClass())&&d.push(h)}if(0===d.length)a.warn("AdManager.playSlots","no slot matches",
	b),c();else if(b===a.TIME_POSITION_CLASS_OVERLAY)for(g=0;g<d.length;g++)(function(a){if(!a._onContentVideoTimeUpdate){var b=this._context.getContentVideoElement(),c=a._onContentVideoTimeUpdate=function(){!b.paused&&!0!==b._fw_videoAdPlaying&&0<=b.currentTime-a.getTimePosition()&&1>b.currentTime-a.getTimePosition()&&(b.removeEventListener("timeupdate",c,!1),a._play(function(){var d=setInterval(function(){!b.paused&&2<Math.abs(b.currentTime-a.getTimePosition())&&(b.addEventListener("timeupdate",c,!1),
	clearInterval(d))},1E3)}))};b.addEventListener("timeupdate",c,!1)}})(d[g]);else(function(){var a=d.shift();a?a._play(arguments.callee):c()})()}else a.warn("AdManager._playSlots","request is not completed"),c()},dispose:function(){a.debug("AdManager.dispose()");this._context.dispose();this._onRequestComplete=null},cloneContext:function(a){var c=this.newContext(),d=a._adRequest._capabilities._capabilities,f;for(f in d)d.hasOwnProperty(f)&&c.setCapability(f,d[f]);c.setProfile(a._adRequest._playerProfile);
	c.setSiteSection(a._ss_id,a._ss_networkId,a._ss_pageViewRandom,a._ss_idType,a._ss_fallbackId);c.setVideoAsset(a._va_id,a._va_duration,a._va_networkId,a._va_location,a._va_autoPlayType,a._va_viewRandom,a._va_idType,a._va_fallbackId);c.setVisitor(a._adRequest._visitorCustomId);return c}};a.AdManager.prototype.constructor=a.AdManager;a.AdRequest=function(b){this._context=b;this._capabilities=new a.Capabilities;this._keyValues=[];this._playerProfile="";this._compatibleDimensions=null;this._temporalSlots=
	[];this._siteSectionId=this._siteSectionCustomId="";this._siteSectionViewRandom=this._siteSectionFallbackId=this._siteSectionNetworkId=0;this._visitorCustomId="";this._subsessionToken=0;this._slotScanner=new a.PageSlotScanner(b);this._urlParams={};this._urlKeyValues=[];this._customInfo=""};a.AdRequest.prototype={setCapability:function(a,c){this._capabilities.setCapability(a,c)},addKeyValue:function(b,c){if("string"!==typeof b||"string"!==typeof c||0===b.length)a.warn("AdRequest.addKeyValue:","key and value required");
	else{var d=encodeURIComponent(b)+"="+encodeURIComponent(c);0>this._keyValues.indexOf(d)&&this._keyValues.push(d)}},setProfile:function(b){"string"!==typeof b?a.warn("AdRequest.setProfile:","player profile required"):this._playerProfile=b},setVideoDisplayCompatibleSizes:function(b){if(!b||!b.length)a.warn("AdRequest.setVideoDisplayCompatibleSizes:","compatible dimensions required");else{for(var c=[],d={},f=0;f<b.length;++f)if(a.debug("dimension is:",b[f].width,"X",b[f].height),0<b[f].width&&0<b[f].height){var g=
	b[f].width+","+b[f].height;null==d[g]&&(d[g]="",c.push(g))}if(0<c.length)this._compatibleDimensions=c.join("|")}},setSiteSection:function(b,c,d,f,g){if(b){switch(f){case a.ID_TYPE_FW:this._siteSectionId=b;break;case a.ID_TYPE_GROUP:this._siteSectionId="g"+b;break;default:this._siteSectionCustomId=b}if(0<1*c)this._siteSectionNetworkId=1*c;if(0<1*d)this._siteSectionViewRandom=1*d;if(0<1*g)this._siteSectionFallbackId=1*g}else a.warn("AdRequest.setSiteSection: id required")},setVisitor:function(b){"string"!==
	typeof b?a.warn("AdRequest.setVisitor:","customId required"):this._visitorCustomId=b},addTemporalSlot:function(b,c,d,f,g){if(a.Util.isBlank(b)||a.Util.isBlank(c)||0>d)a.warn("AdRequest.addTemporalSlot:","invalid parameters");else{for(var h=0;h<this._temporalSlots.length;h++)if(this._temporalSlots[h].getCustomId()===b){a.warn("AdRequest.addTemporalSlot:","slot is already existed, ignored");return}h=new a.Slot(this._context);h.setCustomId(b);h.setAdUnit(c);h.setTimePosition(d);h.setSlotProfile(f);h.setCuepointSequence(1*
	g);this._temporalSlots.push(h)}},setSubsessionToken:function(a){this._subsessionToken=a},scanPageSlots:function(){this._slotScanner.scanPageSlots()},generateTypeBRequestUrl:function(){var b=this._context._adManager._serverURL.split("?"),c=b[0],d=[/fwmrm\.net$/,/fwmrm\.net\/$/,/fwmrm\.net\/ad$/,/fwmrm\.net\/ad\/$/,/fwmrm\.net\/ad\/g$/,/fwmrm\.net\/ad\/g\/$/,/fwmrm\.net\/ad\/g\/1$/];if(0===c.indexOf("http://")||0===c.indexOf("https://"))for(var f=0;f<d.length;++f)if(c.match(d[f])){c=c.slice(0,c.indexOf("fwmrm.net")+
	9)+"/ad/g/1";break}this.parseQueryStr(b.slice(1).join("?"));b=this.generateGlobalParametersQueryStr()+";"+this.generateKeyValuesStr()+";";if(!this._capabilities.getCapability(a.CAPABILITY_SKIP_AD_SELECTION)||1!=this._capabilities.getCapability(a.CAPABILITY_SKIP_AD_SELECTION))b+=this.generateSlotsTypeBStr();a.Util.isBlank(this._customInfo)||(b+=";"+this._customInfo);return c+"?"+b},generateVideoViewRequestUrlWithDummyContextInstanceId:function(b){this._context.setCapability(a.CAPABILITY_REQUIRE_VIDEO_CALLBACK,
	a.CAPABILITY_STATUS_ON);this._context.setCapability(a.CAPABILITY_SKIP_AD_SELECTION,a.CAPABILITY_STATUS_ON);var c=this.generateTypeBRequestUrl(),c=a.Util.setParameterInURL(c,"cbfn","tv.freewheel.SDK._instanceQueue['Context_"+b+"']._videoAsset.requestComplete");a.debug("generateVideoViewRequestUrlWithDummyContextInstanceId():"+c);this._context.setCapability(a.CAPABILITY_REQUIRE_VIDEO_CALLBACK,a.CAPABILITY_STATUS_UNSET);this._context.setCapability(a.CAPABILITY_SKIP_AD_SELECTION,a.CAPABILITY_STATUS_UNSET);
	return c},parseQueryStr:function(b){a.debug("AdRequest.parseQueryStr("+Array.prototype.slice.call(arguments).join(",")+")");this._urlParams={};this._urlKeyValues=[];this._customInfo="";if(b){";"===b.charAt(b.length-1)&&(b=b.substring(0,b.length-1));var c=b.split(";"),d,f;if(c[0]){d=c[0].split("&");for(f=0;f<d.length;++f){var g=d[f].split("=");2===g.length&&(this._urlParams[g[0]]=g[1])}}if(c[1]){d=c[1].split("&");for(f=0;f<d.length;++f)this._urlKeyValues.push(d[f])}if(c[2])this._customInfo=c.slice(2).join(";")}},
	generateGlobalParametersQueryStr:function(){a.debug("AdRequest.generateGlobalParametersQueryStr");for(var b=this._context.getParameter("wrapperVersion"),b=[["prof",this._playerProfile,"string"],["nw",this._context._adManager._networkId,"number"],["caid",this._context._videoAsset._customId,"string"],["asid",this._context._videoAsset._id,"string"],["vdur",this._context._videoAsset._duration,"number"],["asnw",this._context._videoAsset._networkId,"number"],["asml",this._context._videoAsset._location,
	"string"],["vprn",this._context._videoAsset._viewRandom,"number"],["afid",this._context._videoAsset._fallbackId,"number"],["csid",this._siteSectionCustomId,"string"],["ssid",this._siteSectionId,"string"],["ssnw",this._siteSectionNetworkId,"number"],["pvrn",this._siteSectionViewRandom,"number"],["sfid",this._siteSectionFallbackId,"number"],["vcid",this._visitorCustomId,"string"],["ssto",this._subsessionToken,"number"],["cd",this._compatibleDimensions||this.detectScreenDimension(),"string"],["vclr",
	a.version+(b?","+b:""),"string"],["resp",a.PLATFORM_SEND_REQUEST_BY_FORM?"json2":"json","string"],["orig",window.location.protocol+"//"+window.location.host,"string"],["cbfn","tv.freewheel.SDK._instanceQueue['Context_"+this._context._instanceId+"'].requestComplete","string"]],c=0;c<b.length;c++){var d=b[c];switch(d[2]){case "string":a.Util.isBlank(d[1])||(this._urlParams[d[0]]=encodeURIComponent(d[1]));break;case "number":0<d[1]&&(this._urlParams[d[0]]=d[1])}}var b="",f;for(f in this._urlParams)this._urlParams.hasOwnProperty(f)&&
	(b+=f+"="+this._urlParams[f]+"&");b=b.substring(0,b.length-1);0<this._slotScanner._candidateAds.length&&(null==this._capabilities._capabilities[a.CAPABILITY_CHECK_COMPANION]&&this._capabilities.setCapability(a.CAPABILITY_CHECK_COMPANION,a.CAPABILITY_STATUS_ON),null==this._capabilities._capabilities[a.CAPABILITY_CHECK_TARGETING]&&this._capabilities.setCapability(a.CAPABILITY_CHECK_TARGETING,a.CAPABILITY_STATUS_OFF));!this._context._videoAsset._eventCallback&&!this._context._videoAsset._requestedVideoViewUrl&&
	(this._context._videoAsset._id||this._context._videoAsset._customId)&&this._context.setCapability(a.CAPABILITY_REQUIRE_VIDEO_CALLBACK,a.CAPABILITY_STATUS_ON);this._capabilities._capabilities[a.CAPABILITY_DISPLAY_REFRESH]&&this._context.setCapability(a.CAPABILITY_REQUIRE_VIDEO_CALLBACK,a.CAPABILITY_STATUS_OFF);b=this._capabilities.parseCapabilities(b);this._context.setCapability(a.CAPABILITY_REQUIRE_VIDEO_CALLBACK,a.CAPABILITY_STATUS_UNSET);f="";switch(this._context._videoAsset._autoPlayType){case a.VIDEO_ASSET_AUTO_PLAY_TYPE_UNATTENDED:f=
	"+play+uapl";break;case a.VIDEO_ASSET_AUTO_PLAY_TYPE_NONE:f="-play";break;default:f="+play-uapl"}return b=b.replace(/flag=/,"flag="+encodeURIComponent(f))},generateKeyValuesStr:function(){a.debug("AdRequest.generateKeyValuesStr");for(var b=a.Util.flashVersion(),b=this._keyValues.concat(["_fw_h_x_flash_version="+encodeURIComponent(b),"_fw_dpr="+(void 0===window.devicePixelRatio?"1":window.devicePixelRatio.toFixed(2).toString())]),c=0;c<this._urlKeyValues.length;c++){var d=this._urlKeyValues[c];0>b.indexOf(d)&&
	b.push(d)}(c=this._context._adManager._location)&&b.push("ltlg="+encodeURIComponent(Math.round(1E4*c.coords.latitude)/1E4+","+Math.round(1E4*c.coords.longitude)/1E4));return b.join("&")},generateSlotsTypeBStr:function(){a.debug("AdRequest.generateSlotsTypeBStr");for(var b="",c=[],d=0;d<this._temporalSlots.length;d++){for(var f=this._temporalSlots[d],f=[["slid",f.getCustomId(),"string"],["slau",f.getAdUnit(),"string"],["ptgt","a","string"],["tpos",f.getTimePosition(),"number"],["cpsq",f.getCuepointSequence(),
	"number"],["envp",f.getSlotProfile(),"string"]],g=[],h=0;h<f.length;h++){var i=f[h];switch(i[2]){case "string":a.Util.isBlank(i[1])||g.push(i[0]+"="+encodeURIComponent(i[1]));break;case "number":"cpsq"===i[0]?0<i[1]&&g.push(i[0]+"="+i[1]):0<=i[1]&&g.push(i[0]+"="+i[1])}}c.push(g.join("&"))}0<c.length&&(b=c.join(";")+";");return b+=this._slotScanner.slotsToTypeBStr()},detectScreenDimension:function(){a.debug("AdRequest.detectScreenDimension:",screen.width+","+screen.height);return screen.width+","+
	screen.height}};a.AdResponse=function(a){this._context=a};a.AdResponse.prototype={};a.AdResponse.prototype.constructor=a.AdResponse;a.Util.mixin(a.AdResponse.prototype,{parse:function(b,c){this._data=b;this._temporalSlots=[];this._videoPlayerNonTemporalSlots=[];this._siteSectionNonTemporalSlots=[];this._profileParameters={};this._ads=[];this._siteSectionCustomId=a.Util.getObject("siteSection.customId",b)||"";this._adRenderers=[];var d,f,g;f=a.Util.getObject("parameters",b)||[];for(d=0;d<f.length;++d)g=
	f[d],this._profileParameters[g.name]=g.value;this._adRenderers=a.Util.getObject("rendererManifest.adRenderers.adRenderer",b)||[];for(d=0;d<this._adRenderers.length;d++)if("undefined"!==typeof this._adRenderers[d].adUnit)this._adRenderers[d].baseUnit=this._adRenderers[d].adUnit,delete this._adRenderers[d].adUnit;f=a.Util.getObject("ads.ads",b)||[];for(d=0;d<f.length;++d)g=new a.Ad(this._context),g.parse(f[d]),this._ads.push(g);f=a.Util.getObject("siteSection.videoPlayer.videoAsset.adSlots",b)||[];
	for(d=0;d<f.length;++d)g=new a.Slot(this._context),g.setType(a.SLOT_TYPE_TEMPORAL),g.setBase(c),g.parse(f[d]),this._temporalSlots.push(g);f=a.Util.getObject("siteSection.videoPlayer.adSlots",b)||[];for(d=0;d<f.length;++d)g=new a.Slot(this._context),g.setType(a.SLOT_TYPE_VIDEOPLAYER_NONTEMPORAL),g.setTimePositionClass(a.TIME_POSITION_CLASS_DISPLAY),g.parse(f[d]),this._initSlotData(g),this._videoPlayerNonTemporalSlots.push(g);f=a.Util.getObject("siteSection.adSlots",b)||[];for(d=0;d<f.length;++d)g=
	new a.Slot(this._context),g.setType(a.SLOT_TYPE_SITESECTION_NONTEMPORAL),g.setTimePositionClass(a.TIME_POSITION_CLASS_DISPLAY),g.parse(f[d]),this._initSlotData(g),this._siteSectionNonTemporalSlots.push(g);this._context._videoAsset.parse(a.Util.getObject("siteSection.videoPlayer.videoAsset",b)||{})},getCreativeRendition:function(a,c,d,f){return(a=this.getCreative(a,c))?a.getCreativeRendition(d,f):null},getCreative:function(a,c){var d=this.getAd(a);return d?d.getCreative(c):null},getAd:function(a){for(var c=
	0;c<this._ads.length;c++){var d=this._ads[c];if(d.getId()===a)return d}return null},getTemporalSlots:function(){return this._temporalSlots},getSiteSectionNonTemporalSlots:function(){return this._siteSectionNonTemporalSlots},getVideoPlayerNonTemporalSlots:function(){return this._videoPlayerNonTemporalSlots},getSiteSectionCustomId:function(){return this._siteSectionCustomId},getSlotByCustomId:function(b){for(var c=0;c<this._temporalSlots.length;++c)if(this._temporalSlots[c].getCustomId()===b)return this._temporalSlots[c];
	for(c=0;c<this._videoPlayerNonTemporalSlots.length;++c)if(this._videoPlayerNonTemporalSlots[c].getCustomId()===b)return this._videoPlayerNonTemporalSlots[c];for(c=0;c<this._siteSectionNonTemporalSlots.length;++c)if(this._siteSectionNonTemporalSlots[c].getCustomId()===b)return this._siteSectionNonTemporalSlots[c];a.warn("getSlotByCustomId(): not found",b);return null},_initSlotData:function(b){for(var c=!1,d=0;d<this._context._adRequest._slotScanner._knownSlots.length;d++){var f=this._context._adRequest._slotScanner._knownSlots[d];
	if(b.getCustomId()===f.id&&f.element){b.setWidth(f.width);b.setHeight(f.height);b.setBase(f.element);b.setAcceptCompanion(f.acceptCompanion);b.setInitialAdOption(f.initialAdOption);c=!0;break}}c||a.warn("Failed to init slot "+b.getCustomId());return c}});a.Capabilities=function(){this._capabilities={};this.init()};a.Capabilities.prototype={init:function(){for(var b=[a.CAPABILITY_SLOT_TEMPLATE,a.CAPABILITY_MULTIPLE_CREATIVE_RENDITIONS,a.CAPABILITY_FALLBACK_UNKNOWN_ASSET,a.CAPABILITY_FALLBACK_UNKNOWN_SITE_SECTION,
	a.CAPABILITY_FALLBACK_ADS,a.CAPABILITY_SLOT_CALLBACK,a.CAPABILITY_NULL_CREATIVE,a.CAPABILITY_AUTO_EVENT_TRACKING,a.CAPABILITY_RENDERER_MANIFEST],c=0;c<b.length;c++)this._capabilities[b[c]]=a.CAPABILITY_STATUS_ON},setCapability:function(a,c){this._capabilities[a]=c},getCapability:function(a){return this._capabilities[a]},parseCapabilities:function(b){var c="",d;for(d in this._capabilities)if(this._capabilities.hasOwnProperty(d)){switch(this._capabilities[d]){case a.CAPABILITY_STATUS_ON:c+="+"+d;break;
	case a.CAPABILITY_STATUS_OFF:c+="-"+d}b=b.replace(RegExp("(%2B|-|\\+)"+d,"g"),"")}c=encodeURIComponent(c);return b=-1<b.indexOf("flag=")?b.replace(/flag=/,"flag="+c):b+("&flag="+c)}};a.ContentVideoExtension=function(b){function c(){a.debug("ContentVideoExtension: EVENT_CONTENT_VIDEO_PAUSE_REQUEST pausing content video",m.src);l=m.currentTime;m.pause()}function d(){a.debug("ContentVideoExtension: EVENT_CONTENT_VIDEO_RESUME_REQUEST resume content video",m.src);if(j._videoAsset&&(null==j._videoAsset._state||
	j._videoAsset._state===a.VIDEO_STATE_COMPLETED))a.warn("ContentVideoExtension: video state is uninitialized or completed, skip resume.");else if(a.log("ContentVideoExtension: resume content video"),m.play(),a.PLATFORM_AUTO_SEEK_AFTER_MIDROLL){var b=j.getParameter(a.PARAMETER_EXTENSION_CONTENT_VIDEO_AUTO_SEEK_BACK);null==b&&(b="true");!1!==a.Util.str2bool(b)&&(o&&(m.removeEventListener("timeupdate",o,!1),o=null),o=function(){if(!(0>=m.currentTime||0>=m.seekable.length))if(m.removeEventListener("timeupdate",
	o,!1),o=null,0<m.currentTime&&1>m.currentTime&&1<l){a.log("ContentVideoExtension: seeking to original time",l);try{m.currentTime=l}catch(b){a.warn("ContentVideoExtension: seek error")}}},m.addEventListener("timeupdate",o,!1))}}function f(b){switch(b.slot.getTimePositionClass()){case a.TIME_POSITION_CLASS_PREROLL:case a.TIME_POSITION_CLASS_POSTROLL:a.debug("ContentVideoExtension: store current content video src",m.src),n=m.src,t=m.controls,m.paused||m.pause()}}function g(b){b=b.slot.getTimePositionClass();
	switch(b){case a.TIME_POSITION_CLASS_PREROLL:case a.TIME_POSITION_CLASS_POSTROLL:a.debug("ContentVideoExtension: restore content video src to",n);if(m.src!==n)m.src=n;m.controls=t;b===a.TIME_POSITION_CLASS_PREROLL&&m.load()}}function h(b,c){var d=j.getParameter(b);null==d&&(d=c);return a.Util.str2bool(d)}var i=!0,k=!0,j=b,m=b.getContentVideoElement(),l=0,o=null,n=null,t=null;return{start:function(){a.debug("ContentVideoExtension.start()");i=h(a.PARAMETER_EXTENSION_CONTENT_VIDEO_RESPOND_PAUSE_RESUME,
	!0);k=h(a.PARAMETER_EXTENSION_CONTENT_VIDEO_AUTO_SOURCE_RESTORE,!0);i&&(a.debug("ContentVideoExtension: enabling content video pause resume request handling."),j.addEventListener(a.EVENT_CONTENT_VIDEO_PAUSE_REQUEST,c),j.addEventListener(a.EVENT_CONTENT_VIDEO_RESUME_REQUEST,d));k&&(a.debug("ContentVideoExtension: enabling content video source management."),j.addEventListener(a.EVENT_SLOT_STARTED,f),j.addEventListener(a.EVENT_SLOT_ENDED,g))},dispose:function(){a.debug("ContentVideoExtension.dispose()");
	j&&(j.removeEventListener(a.EVENT_CONTENT_VIDEO_PAUSE_REQUEST,c),j.removeEventListener(a.EVENT_CONTENT_VIDEO_RESUME_REQUEST,d),j.removeEventListener(a.EVENT_SLOT_STARTED,f),j.removeEventListener(a.EVENT_SLOT_ENDED,g),m&&o&&(m.removeEventListener("timeupdate",o,!1),o=null),j=null);m=null}}};a._instanceCounter=0;a._instanceQueue={};a.Context=function(b){this._adManager=b;this._adRequest=new a.AdRequest(this);this._adResponse=null;this._videoAsset=new a.VideoAsset(this);this._temporalSlotBase=null;this._videoDisplaySize=
	{};this._globalLevelParameterDictionary={};this._overrideLevelParameterDictionary={};this._rendererManifest={};this._overriddenAdRenderers=[];this._eventDispatcher=new a.EventDispatcher;this._requestState=0;this._adControlExtension=new a.AdControlExtension(this);this._surveyExtension=new a.SurveyExtension(this);this._videoStateExtension=new a.VideoStateExtension(this);this._displayRefreshExtension=new a.DisplayRefreshExtension(this);this._totalSetDisplaySizeCount=this._autoSetDisplaySizeCount=0;this._instanceId=
	a._instanceCounter;a._instanceQueue["Context_"+a._instanceCounter]=this;a._instanceCounter++;this._contentVideoAttached=!1;this._currentContentPlayheadTime=0;this._ss_id="";this._ss_networkId=this._ss_pageViewRandom=0;this._ss_idType=a.ID_TYPE_CUSTOM;this._ss_fallbackId=0;this._va_location=this._va_networkId=this._va_duration=this._va_id="";this._va_autoPlayType=a.VIDEO_ASSET_AUTO_PLAY_TYPE_ATTENDED;this._va_viewRandom=this._va_fallbackId=0;this._va_idType=a.ID_TYPE_CUSTOM;this._isRefreshRequest=
	!1;this._refreshSlots=[]};a.Context.prototype={addRenderer:function(a,c,d,f,g,h,i){this._overriddenAdRenderers.push({url:a,baseUnit:c,contentType:d,creativeApi:h,slotType:f,soAdUnit:g,parameter:i})},setCapability:function(b,c){a.debug("Context.setCapability",b,c);this._adRequest.setCapability(b,c)},addKeyValue:function(b,c){a.debug("Context.addKeyValue",b,c);this._adRequest.addKeyValue(b,c)},setParameter:function(b,c,d){a.debug("Context.setParameter",b,c,d);var f=null;if(d===a.PARAMETER_LEVEL_GLOBAL)f=
	this._globalLevelParameterDictionary;else if(d===a.PARAMETER_LEVEL_OVERRIDE)f=this._overrideLevelParameterDictionary;else return;null==c?delete f[b]:f[b]=c},getParameter:function(a){return!a?null:this._overrideLevelParameterDictionary.hasOwnProperty(a)?this._overrideLevelParameterDictionary[a]:this._adResponse&&this._adResponse._profileParameters.hasOwnProperty(a)?this._adResponse._profileParameters[a]:this._globalLevelParameterDictionary.hasOwnProperty(a)?this._globalLevelParameterDictionary[a]:
	null},setVideoState:function(b){a.debug("Context.setVideoState",b);this._videoAsset.setVideoState(b)},registerVideoDisplayBase:function(b){a.debug("Context.registerVideoDisplayBase",b);if(!b||"string"!==typeof b)a.warn("Context.registerVideoDisplayBase","id required");else if(this._temporalSlotBase&&this._temporalSlotBase.id===b){a.debug("Context.registerVideoDisplayBase","register the same display base, will only change size");var c=this._temporalSlotBase.getElementsByTagName("video");this._setVideoDisplaySizeByContentVideo(c[0])}else(this._temporalSlotBase=
	document.getElementById(b))?(c=this._temporalSlotBase.getElementsByTagName("video"),0===c.length?(a.warn("Context.registerVideoDisplayBase","could not get video element from",b),this._temporalSlotBase=null):(this._temporalSlotBase["_fw_contentVideo_"+this._instanceId]=c[0],this._setVideoDisplaySizeByContentVideo(c[0]),this._startContentVideoExtension())):a.warn("Context.registerVideoDisplayBase","could not get element",b)},setContentVideoElement:function(b){a.debug("Context.setContentVideoElement()");
	!b||!b.parentNode?a.warn("Context.setContentVideoElement","contentVideo and contentVideo.parentNode is required"):(this._temporalSlotBase=b.parentNode,this._temporalSlotBase["_fw_contentVideo_"+this._instanceId]===b?(a.debug("Context.setContentVideoElement","set the same video in same div, will only change size"),this._setVideoDisplaySizeByContentVideo(b)):(this._temporalSlotBase["_fw_contentVideo_"+this._instanceId]=b,this._setVideoDisplaySizeByContentVideo(b),this._startContentVideoExtension()))},
	getContentVideoElement:function(){return!this._temporalSlotBase?(a.warn("SlotBase is null"),null):this._temporalSlotBase["_fw_contentVideo_"+this._instanceId]},setVideoDisplaySize:function(b,c,d,f,g){a.debug("Context.setVideoDisplaySize("+Array.prototype.slice.call(arguments).join(",")+")");this._totalSetDisplaySizeCount++;this._videoDisplaySize={left:b,top:c,width:d,height:f,position:g};for(var h=this.getTemporalSlots(),i=0;i<h.length;++i){var k=h[i];if(k.getState()===a.MediaPlayingState.instance||
	k.getState()===a.MediaReplayingState.instance){if(h=k.getCurrentAdInstance())(h=h.getRendererController().getRenderer())&&h.resize?h.resize():a.debug("renderer do not support resize");break}}},getVideoDisplaySize:function(){function a(b){b=parseInt(b,10);isNaN(b)&&(b=0);return b}this._videoDisplaySize.left=a(this._videoDisplaySize.left);this._videoDisplaySize.right=a(this._videoDisplaySize.right);this._videoDisplaySize.width=a(this._videoDisplaySize.width);this._videoDisplaySize.height=a(this._videoDisplaySize.height);
	return this._videoDisplaySize},setVideoDisplayCompatibleSizes:function(b){a.debug("Context.setVideoDisplayCompatibleSizes",b);this._adRequest.setVideoDisplayCompatibleSizes(b)},setProfile:function(b){a.debug("Context.setProfile",b);this._adRequest.setProfile(b)},setVideoAsset:function(b,c,d,f,g,h,i,k){a.debug("Context.setVideoAsset("+Array.prototype.slice.call(arguments).join(",")+")");this._videoAsset.setVideoAsset(b,c,d,f,g,h,i,k);this._va_id=b;this._va_duration=c;this._va_networkId=d;this._va_location=
	f;this._va_autoPlayType=g;this._va_viewRandom=h;this._va_idType=i;this._va_fallbackId=k},setSiteSection:function(b,c,d,f,g){a.debug("Context.setSiteSection("+Array.prototype.slice.call(arguments).join(",")+")");this._adRequest.setSiteSection(b,c,d,f,g);this._ss_id=b;this._ss_networkId=c;this._ss_pageViewRandom=d;this._ss_idType=f;this._ss_fallbackId=g},setVisitor:function(b){a.debug("Context.setVisitor("+Array.prototype.slice.call(arguments).join(",")+")");this._adRequest.setVisitor(b)},startSubsession:function(b){a.debug("Context.startSubsession("+
	b+")");this._adRequest.setSubsessionToken(b)},addTemporalSlot:function(b,c,d,f,g){a.debug("Context.addTemporalSlot("+Array.prototype.slice.call(arguments).join(",")+")");this._adRequest.addTemporalSlot(b,c,d,f,g)},getTemporalSlots:function(){return this._adResponse?this._adResponse._temporalSlots.slice():[]},getSlotByCustomId:function(a){return this._adResponse?this._adResponse.getSlotByCustomId(a):null},getSlotsByTimePositionClass:function(a){var c=[];if(this._adResponse){for(var d=0;d<this._adResponse._temporalSlots.length;d++)this._adResponse._temporalSlots[d].getTimePositionClass()===
	a&&c.push(this._adResponse._temporalSlots[d]);for(d=0;d<this._adResponse._siteSectionNonTemporalSlots.length;d++)this._adResponse._siteSectionNonTemporalSlots[d].getTimePositionClass()===a&&c.push(this._adResponse._siteSectionNonTemporalSlots[d]);for(d=0;d<this._adResponse._videoPlayerNonTemporalSlots.length;d++)this._adResponse._videoPlayerNonTemporalSlots[d].getTimePositionClass()===a&&c.push(this._adResponse._videoPlayerNonTemporalSlots[d])}return c},submitRequest:function(b){a.debug("Context.submitRequest",
	b);if(this._requestState)a.warn("Context.submitRequest: request already submitted");else if(a.Util.isBlank(this._adManager._serverURL))a.warn("Context.submitRequest: serverURL is not set");else{this._requestState=1;this._adRequest.scanPageSlots();if(this._isRefreshRequest){for(var c={},d=[],f=0;f<this._refreshSlots.length;f++){var g=this._refreshSlots[f];if(void 0!=this._adRequest._slotScanner._slots[g]){c[g]=this._adRequest._slotScanner._slots[g];for(var h=c[g].split("&"),i=0;i<h.length;i++)-1!==
	h[i].search("flag")&&(h[i]="flag=-cmpn");c[g]=h.join("&")}for(i=0;i<this._adRequest._slotScanner._knownSlots.length;i++)if(this._adRequest._slotScanner._knownSlots[i].id==g)h=this._adRequest._slotScanner._knownSlots[i],h.acceptCompanion=!1,h.initialAdOption=a.SLOT_OPTION_INITIAL_AD_STAND_ALONE,d.push(h)}this._adRequest._slotScanner._slots=c;this._adRequest._slotScanner._knownSlots=d}if(this.getParameter(a.PARAMETER_ENABLE_FORM_TRANSPORT))a.debug("Context.submitRequest: enabling Safari transport mechanism globally"),
	a.PLATFORM_SEND_REQUEST_BY_FORM=!0;c=this._adManager._serverURL;".js"!==c.substring(c.length-3,c.length)&&(c=this._adRequest.generateTypeBRequestUrl());var k=this;if("number"!==typeof b||0>=b||!b)b=5;setTimeout(function(){1===k._requestState&&(a.warn("Context.submitRequest: request timeout"),k.requestComplete(null))},1E3*b);a.log("Context.submitRequest: sending request to",c,"timeout",b);a.PLATFORM_SEND_REQUEST_BY_FORM?(a.debug("Context.submitRequest:","use json2"),a.Util.pingURLWithForm(c,this._instanceId,
	!0),k._onMessagePosted=function(a){"object"===typeof a.data&&a.data.hasOwnProperty("cbfn")&&-1<a.data.cbfn.indexOf("['Context_"+k._instanceId+"']")&&k.requestComplete(a.data.response)},window.addEventListener("message",k._onMessagePosted,!1)):a.Util.pingURLWithScript(c)}},requestComplete:function(b){if(1!==this._requestState)a.warn("ad request complete after timeout"),this.dispatchEvent(a.EVENT_REQUEST_COMPLETE,{success:!1});else{this._requestState=2;a.debug("Context.requestComplete");if(a.PLATFORM_SEND_REQUEST_BY_FORM){window.removeEventListener("message",
	this._onMessagePosted,!1);var c=document.getElementById("_fw_request_iframe_"+this._instanceId);document.body.removeChild(c)}if(null!==b){this._adControlExtension.start();this._surveyExtension.start();this._displayRefreshExtension.start();a._instanceQueue["Context_"+this._instanceId]=null;this._adResponse=new a.AdResponse(this);this._adResponse.parse(b,this._temporalSlotBase);a.log("Ad request succeeded");this._videoStateExtension.start();this.dispatchEvent(a.EVENT_REQUEST_COMPLETE,{success:!0,response:b});
	c=this._adResponse.getSiteSectionNonTemporalSlots();for(b=0;b<c.length;++b)a.log("Auto play site section nonTemporal slots"),c[b].play();c=this._adResponse.getVideoPlayerNonTemporalSlots();for(b=0;b<c.length;++b)a.log("Auto play video player nonTemporal slots"),c[b].play()}else a.warn("Ad request failed"),this.dispatchEvent(a.EVENT_REQUEST_COMPLETE,{success:!1})}},addEventListener:function(b,c){a.debug("Context.addEventListener",b);this._eventDispatcher.addEventListener(b,c)},removeEventListener:function(b,
	c){a.debug("Context.removeEventListener",b);this._eventDispatcher.removeEventListener(b,c)},dispatchEvent:function(b,c){a.log("Context.dispatchEvent",b);if(b===a.EVENT_SLOT_STARTED){var d=c.slot.getTimePositionClass();if(d===a.TIME_POSITION_CLASS_PREROLL||d===a.TIME_POSITION_CLASS_MIDROLL||d===a.TIME_POSITION_CLASS_POSTROLL)this._contentVideoAttached=!0,this._markCurrentContentPlayheadTime()}else if(b===a.EVENT_SLOT_ENDED&&(d=c.slot.getTimePositionClass(),d===a.TIME_POSITION_CLASS_PREROLL||d===a.TIME_POSITION_CLASS_MIDROLL||
	d===a.TIME_POSITION_CLASS_POSTROLL))this._contentVideoAttached=!1;c=c||{};c.type=b;c.target=this;this._eventDispatcher.dispatchEvent(c)},dispose:function(){a.debug("Context.dispose");this.setVideoState(a.VIDEO_STATE_STOPPED);if(this._adResponse){if(this._contentVideoExtension)this._contentVideoExtension.dispose(),this._contentVideoExtension=null;this._adControlExtension.dispose();this._surveyExtension.dispose();this._displayRefreshExtension.dispose();this._videoStateExtension.dispose();if(this._temporalSlotBase){for(var b=
	0,c=this._adResponse._temporalSlots||[];b<c.length;++b){var d=c[b];if(d._onContentVideoTimeUpdate){var f=this._temporalSlotBase["_fw_contentVideo_"+this._instanceId];f&&f.removeEventListener("timeupdate",d._onContentVideoTimeUpdate,!1);d._onContentVideoTimeUpdate=null}}this._temporalSlotBase["_fw_contentVideo_"+this._instanceId]=null}this._isRefreshRequest=!1;this._refreshSlots=[]}},_markCurrentContentPlayheadTime:function(){var a=this._temporalSlotBase["_fw_contentVideo_"+this._instanceId].currentTime;
	if(0<a)this._currentContentPlayheadTime=a},_getContentPlayheadTime:function(){var a=-1;if(!this._contentVideoAttached)a=this._temporalSlotBase["_fw_contentVideo_"+this._instanceId].currentTime;return 0<a?a:this._currentContentPlayheadTime},_setVideoDisplaySizeByContentVideo:function(a){if(this._autoSetDisplaySizeCount===this._totalSetDisplaySizeCount){var c=a.style.left,d=a.style.top,f=a.offsetWidth?a.offsetWidth:a.style.pixelWidth,g=a.offsetHeight?a.offsetHeight:a.style.pixelHeight,a=a.style.position;
	this._autoSetDisplaySizeCount++;this.setVideoDisplaySize(c,d,f,g,a)}},_startContentVideoExtension:function(){var b=this.getParameter(a.PARAMETER_EXTENSION_CONTENT_VIDEO_ENABLED);null==b&&(b="true");!1===a.Util.str2bool(b)?a.log("Content Video Extension disabled"):this._temporalSlotBase?(this._contentVideoExtension&&this._contentVideoExtension.dispose(),this._contentVideoExtension=new a.ContentVideoExtension(this),this._contentVideoExtension.start()):a.warn("SlotBase is null")},_replacePageSlot:function(a,
	c){navigator.userAgent.match(/MSIE/);var d=null!=navigator.userAgent.match(/Firefox/),f=function(){window._fw_admanager&&!0==window._fw_admanager.enableDebug&&window.console&&window.console.log&&(window.console.log.apply?window.console.log.apply(window.console,arguments):window.console.log(arguments[0],arguments[1],arguments[2],arguments[3]))};f("fw replace %s",a);var g,h,i;try{g=document.getElementById(a)?document:parent.document.getElementById(a)?parent.document:null,h=document.getElementById(a)?
	"window":parent.document.getElementById(a)?"parent":null}catch(k){h=g=null}if(!g)for(var j=0;j<window.frames.length;j++)try{if(window.frames[j].document.getElementById(a))g=window.frames[j].document,h="window.frames["+j+"]"}catch(m){f(m)}h&&(i=h+".document");f("fw replacing slot %s in frame %s",a,i);if(!g)throw"Slot element not found: "+a;j=g.getElementById("_fw_container_"+a);j.innerHTML=c;for(var j=j.getElementsByTagName("script"),l=g.getElementsByTagName("head")[0],o=0;o<j.length;++o)if(d||j[o].src){var n=
	g.createElement("script");if(j[o].charset)n.charset=j[o].charset;if(j[o].src)n.src=j[o].src;if(j[o].innerHTML)n.innerHTML=j[o].innerHTML;n.onload=n.onreadystatechange=function(){(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState)&&l.removeChild(n)};f("fw append script for %s",a);l.appendChild(n)}else n=j[o].innerHTML,n=n.replace(/var fw_scope = document;/,"var fw_scope="+i+";"),n=n.replace(/var fw_scope_window = window;/,"var fw_scope_window="+h+";"),f("fw eval in %s for %s, %s",
	i,a,n),eval(n);f("fw finish replace %s",a)}};a.Context.prototype.constructor=a.Context;a.DisplayRefreshExtension=function(a){this.REFRESH_TYPE_NONE="refresh_none";this.REFRESH_TYPE_AD="refresh_ad";this.REFRESH_TYPE_TIME="refresh_time";this.REPLACE_TYPE_NONE="replace_none";this.REPLACE_TYPE_BLANK="replace_blank";this.REPLACE_TYPE_AD="replace_ad";this._context=a;this._subContext=null;this._displaySlots=[];this._companionSlots=[];this._keyValues=[];this._globalParameters=[];this._overrideParameters=
	[];this._refreshType=this.REFRESH_TYPE_NONE;this._replaceType=this.REPLACE_TYPE_NONE;this._refreshInterval=0;this._refreshTimer=null;this._firstTemporalAd=!0;this._REQUEST_TIME_OUT=5;this.init()};a.DisplayRefreshExtension.prototype={start:function(){a.debug("DisplayRefreshExtension.start()")},init:function(){a.debug("DisplayRefreshExtension.init()");this._onRendererEvent=a.Util.bind(this,function(b){a.debug("DisplayRefreshExtension._onRendererEvent()");b.subType===a.EVENT_AD_IMPRESSION&&this._onAdStarted(b)});
	this._onSlotEnded=a.Util.bind(this,function(b){var c=b.slot.getTimePositionClass(),b=b.slot;a.debug("DisplayRefreshExtension._onSlotEnded()",b,c);if(!(null==b||c==a.TIME_POSITION_CLASS_DISPLAY||0==b.getAdInstances().length))if(this._refreshType==this.REFRESH_TYPE_AD)this._resetSubContext(),this._refreshSlots(this._displaySlots);else if(this._refreshType==this.REFRESH_TYPE_TIME){this._resetSubContext();this._refreshSlots(this._displaySlots);var d=this;this._refreshTimer=setInterval(function(){a.debug("DisplayRefreshExtension._onTimeout()");
	d._resetSubContext();d._refreshSlots(d._displaySlots)},1E3*this._refreshInterval)}});this._onRequestComplete=a.Util.bind(this,function(b){a.debug("DisplayRefreshExtension._onRequestComplete()");if(b.success){switch(this._context.getParameter("refreshType")){case "ad":this._refreshType=this.REFRESH_TYPE_AD;break;case "time":this._refreshInterval=this._context.getParameter("refreshInterval");this._refreshType=0<this._refreshInterval?this.REFRESH_TYPE_TIME:this.REFRESH_TYPE_NONE;break;default:this._refreshType=
	this.REFRESH_TYPE_NONE}switch(this._context.getParameter("replaceMissingCompanion")){case "blank":this._replaceType=this.REPLACE_TYPE_BLANK;break;case "ad":this._replaceType=this.REPLACE_TYPE_AD;break;default:this._replaceType=this.REPLACE_TYPE_NONE}if(this._refreshType!=this.REFRESH_TYPE_NONE||this._replaceType!=this.REPLACE_TYPE_NONE){if(this._displaySlots=this._context.getSlotsByTimePositionClass(a.TIME_POSITION_CLASS_DISPLAY),this._companionSlots=this._displaySlots.filter(function(a){return a.getAcceptCompanion()}),
	this._keyValues=this._context._adRequest._keyValues,this._globalParameters=this._context._globalLevelParameterDictionary,this._overrideParameters=this._context._overrideLevelParameterDictionary,this._firstTemporalAd=!0,this._context.addEventListener(a.EVENT_AD,this._onRendererEvent),this._context.addEventListener(a.EVENT_SLOT_ENDED,this._onSlotEnded),this._refreshType==this.REFRESH_TYPE_TIME){var c=this;this._refreshTimer=setInterval(function(){a.debug("DisplayRefreshExtension._onTimeout()");c._resetSubContext();
	c._refreshSlots(c._displaySlots)},1E3*this._refreshInterval)}}else this._refreshTimer&&clearInterval(this._refreshTimer)}else a.debug("DisplayRefreshExtension: request complete failed")});this._context.addEventListener(a.EVENT_REQUEST_COMPLETE,this._onRequestComplete)},_resetSubContext:function(){a.debug("DisplayRefreshExtension._resetSubContext()");this._subContext=this._context._adManager.cloneContext(this._context);this._subContext._displayRefreshExtension.dispose();this._subContext._videoStateExtension.dispose();
	this._subContext.setCapability(a.CAPABILITY_SLOT_TEMPLATE,a.CAPABILITY_STATUS_OFF);this._subContext.setCapability(a.CAPABILITY_DISPLAY_REFRESH,a.CAPABILITY_STATUS_ON);this._playRefreshedSlots=a.Util.bind(this,function(b){a.debug("DisplayRefreshExtension._playRefreshedSlots()");if(b.success)for(var b=this._subContext.getSlotsByTimePositionClass(a.TIME_POSITION_CLASS_DISPLAY),c=0;c<b.length;c++)b[c].play();else a.debug("DisplayRefreshExtension._playRefreshedSlots(): subContext refresh request error:",
	b)});this._subContext.addEventListener(a.EVENT_REQUEST_COMPLETE,this._playRefreshedSlots);for(var b=this._subContext._adRequest._keyValues,c=0;c<this._keyValues.length;c++)0>b.indexOf(this._keyValues[c])&&b.push(this._keyValues[c]);for(var d in this._globalParameters)this._globalParameters.hasOwnProperty(d)&&this._subContext.setParameter(d,this._globalParameters[d],a.PARAMETER_LEVEL_GLOBAL);for(d in this._overrideParameters)this._overrideParameters.hasOwnProperty(d)&&this._subContext.setParameter(d,
	this._overrideParameters[d],a.PARAMETER_LEVEL_OVERRIDE)},_onAdStarted:function(b){a.debug("DisplayRefreshExtension._onAdStarted()");var c=b.adInstance.getSlot();a.debug("DisplayRefreshExtension._onAdStarted(): slot: ",c," | timePositionClass:",c.getTimePositionClass());if(!(null==c||c.getTimePositionClass()==a.TIME_POSITION_CLASS_DISPLAY))if(this._resetSubContext(),this._refreshTimer&&clearInterval(this._refreshTimer),this._replaceType!=this.REPLACE_TYPE_NONE)for(var b=b.adInstance,c=c.getAdInstances(),
	d=0;d<c.length;d++)b.getAdId()===c[d].getAdId()&&this._checkMissingCompanionForAd(b)},_checkMissingCompanionForAd:function(b){a.debug("DisplayRefreshExtension._checkMissingCompanionForAd()",b);for(var c=this._companionSlots.slice(),b=b.getCompanionAdInstances(),d=0;d<b.length;d++){var f=c.indexOf(b[d].getSlot());-1<f&&c.splice(f,1)}if(this._firstTemporalAd)this._firstTemporalAd=!1,c=c.filter(function(b){if(!(b.getInitialAdOption()==a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_ONLY||b.getInitialAdOption()==
	a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_STAND_ALONE||b.getInitialAdOption()==a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_THEN_STAND_ALONE||b.getInitialAdOption()==a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_NO_STAND_ALONE||b.getInitialAdOption()==a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_NO_STAND_ALONE_IF_TEMPORAL))return a.debug("DisplayRefreshExtension._checkMissingCompanionForAd(): firstCompanionAsInitial false in slot ",b.getCustomId()),!0;for(var c=b.getAdInstances(),d=0;d<c.length;d++)if(!c[d].isPlaceholder())return a.debug("DisplayRefreshExtension._checkMissingCompanionForAd(): first companion found in slot ",
	b.getCustomId()),!1;a.debug("DisplayRefreshExtension._checkMissingCompanionForAd(): firstCompanionAsInitial true, no ad in slot ",b.getCustomId());return!0});if(this._replaceType==this.REPLACE_TYPE_BLANK)for(d=0;d<c.length;d++)c[d].stop(),this._subContext._replacePageSlot(c[d].getCustomId(),"");else this._replaceType==this.REPLACE_TYPE_AD&&this._refreshSlots(c)},_refreshSlots:function(b){a.debug("DisplayRefreshExtension._refreshSlots()",b);if(!(null==b||0==b.length)){for(var c=0;c<b.length;c++)b[c].stop(),
	this._subContext._refreshSlots.push(b[c].getCustomId());this._subContext._isRefreshRequest=!0;this._subContext.submitRequest(this._REQUEST_TIME_OUT)}},dispose:function(){a.debug("DisplayRefreshExtension.dispose()");if(this._context)this._context.removeEventListener(a.EVENT_REQUEST_COMPLETE,this._onRequestComplete),this._context.removeEventListener(a.EVENT_SLOT_ENDED,this._onSlotEnded),this._context.removeEventListener(a.EVENT_AD,this._onRendererEvent),this._context=null;if(this._subContext)this._subContext.removeEventListener(a.EVENT_REQUEST_COMPLETE,
	this._playRefreshedSlots),this._subContext=null;this._displaySlots=[];this._companionSlots=[];this._keyValues=[];this._globalParameters=[];this._overrideParameters=[];this._refreshType=this.REFRESH_TYPE_NONE;this._replaceType=this.REPLACE_TYPE_NONE;this._refreshInterval=0;this._refreshTimer&&clearInterval(this._refreshTimer);this._refreshTimer=null;this._firstTemporalAd=!0}};a.DisplayRefreshExtension.prototype.constructor=a.DisplayRefreshExtension;a.EventCallback=function(a){this._url=this._name=
	this._type=null;this._showBrowser=!1;this._trackingUrls=[];this._adInstance=this._slot=null;this._context=a};a.EventCallback.prototype={};a.EventCallback.prototype.constructor=a.EventCallback;a.EventCallback.getEventCallback=function(b,c,d){for(var f,g=0;g<b.length;g++)if(f=b[g],f._name===c&&f._type===d)return f;for(g=0;g<b.length;g++)if(f=b[g],f._type===a.EVENT_TYPE_GENERIC){if(c=a.EventCallback.newEventCallback(f._context,c,d))c._url=f._url,c._slot=f._slot,c._adInstance=f._adInstance,b.push(c);
	return c}return null};a.EventCallback.newEventCallback=function(b,c,d){var f=null;if(d===a.EVENT_TYPE_GENERIC)f=new a.EventCallback(b);else if(d===a.EVENT_TYPE_ERROR)f=new a.ErrorEventCallback(b);else if(d===a.EVENT_TYPE_CLICK)f=new a.AdClickEventCallback(b);else if(d===a.EVENT_TYPE_STANDARD)f=new a.AdStandardEventCallback(b);else if(c===a.EVENT_SLOT_IMPRESSION||c===a.EVENT_SLOT_END)f=new a.SlotImpressionEventCallback(b);else if(c===a.EVENT_AD_IMPRESSION||c===a.EVENT_AD_IMPRESSION_END)f=new a.AdImpressionEventCallback(b);
	else if(c===a.EVENT_VIDEO_VIEW)f=new a.VideoViewEventCallback(b);else if(c===a.EVENT_RESELLER_NO_AD)f=new a.ResellerNoAdEventCallback(b);else if(c===a.EVENT_AD_FIRST_QUARTILE||c===a.EVENT_AD_MIDPOINT||c===a.EVENT_AD_THIRD_QUARTILE||c===a.EVENT_AD_COMPLETE)f=new a.AdQuartileEventCallback(b);else return null;f._name=c;f._type=d;return f};a.EventCallback.getShortType=function(b){var c="";switch(b){case a.EVENT_TYPE_IMPRESSION:c=a.SHORT_EVENT_TYPE_IMPRESSION;break;case a.EVENT_TYPE_CLICK:c=a.SHORT_EVENT_TYPE_CLICK;
	break;case a.EVENT_TYPE_STANDARD:c=a.SHORT_EVENT_TYPE_STANDARD;break;case a.EVENT_TYPE_ERROR:c=a.SHORT_EVENT_TYPE_ERROR}return c};a.Util.mixin(a.EventCallback.prototype,{parse:function(a){if(a){this._usage=a.use;this._type=a.type;this._name=a.name;this._url=a.url;this._showBrowser=a.showBrowser;this._trackingUrls=[];for(var c=0,a=a.trackingUrls||[];c<a.length;c++)this._trackingUrls.push(a[c].value)}},copy:function(){var a=new this.constructor(this._context);a._type=this._type;a._name=this._name;a._url=
	this._url;a._showBrowser=this._showBrowser;a._trackingUrls=this._trackingUrls.slice();a._slot=this._slot;a._adInstance=this._adInstance;return a},getUrl:function(b){var c=this._replaceMacrosInUrl(this._url);this._name===a.EVENT_AD_MEASUREMENT?(c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_ET,a.SHORT_EVENT_TYPE_IMPRESSION),c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CONCRETE_EVENT_ID,b[a.INFO_KEY_CONCRETE_EVENT_ID])):c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_ET,a.EventCallback.getShortType(this._type));
	c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CN,this._name);this._adInstance&&0<this._adInstance._creativeRenditionId&&(c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CREATIVE_RENDITION_ID,this._adInstance._creativeRenditionId));return c},getTrackingUrls:function(){var b=this._trackingUrls;if(this._adInstance){var c=this._type;if(c===a.EVENT_TYPE_CLICK)c=a.EVENT_TYPE_CLICK_TRACKING;b=b.concat(this._adInstance.getExternalEventCallbackUrls(this._name,c))}for(var c=[],d=0;d<b.length;d++){var f=
	a.Util.trim(this._replaceMacrosInUrl(b[d]));a.Util.isBlank(f)||c.push(f)}return c},process:function(b){b=b||{};this._processTrackingUrls();a.Util.pingURL(this.getUrl(b))},_processTrackingUrls:function(){this._shouldSkipSendingTrackingAndExternalUrls()||a.Util.pingURLs(this.getTrackingUrls())},_shouldSkipSendingTrackingAndExternalUrls:function(){return!1},_needEmptyCT:function(b){var c=!1;b&&!0===b[a.INFO_KEY_NEED_EMPTY_CT]&&(c=!0);return c},_getAdPlayheadTime:function(){var a=-1;this._adInstance&&
	(a=this._adInstance.getPlayheadTime());return a},_getCreativeAssetLocation:function(){var a=null;this._adInstance&&this._adInstance.getActiveCreativeRendition()&&this._adInstance.getActiveCreativeRendition().getPrimaryCreativeRenditionAsset()&&(a=this._adInstance.getActiveCreativeRendition().getPrimaryCreativeRenditionAsset().getUrl());return a},_getParameter:function(a){var c=null;return c=this._adInstance?this._adInstance._rendererController.getParameter(a):this._slot?this._slot.getParameter(a):
	this._context.getParameter(a)},_replaceMacrosInUrl:function(b){if(a.Util.isBlank(b))return b;var b=b.replace(/#(ce?)\{([^\}]+)\}/g,a.Util.bind(this,function(b,c,d){b="ce"===c;c=null;switch(d){case "ad.playheadTime":d=this._getAdPlayheadTime();c=0<=d?Math.round(d)+"":"";break;case "content.playheadTime":d=this._context._getContentPlayheadTime();c=0<=d?Math.round(d)+"":"";break;case "creative.assetLocation":c=this._getCreativeAssetLocation();break;default:0===d.indexOf("parameter.")&&(c=this._getParameter(d.substr(10)))}a.Util.isBlank(c)&&
	(c="");return b?encodeURIComponent(c):c})),c="";try{c=a.Util.getParameterInURL(b,a.URL_PARAMETER_KEY_CR)}catch(d){return a.warn(d),b}a.Util.isBlank(c)||(b=a.Util.setParameterInURL(b,a.URL_PARAMETER_KEY_CR,this._replaceMacrosInUrl(c)));return b}});a.AdClickEventCallback=function(b){a.EventCallback.call(this,b)};a.AdClickEventCallback.prototype=new a.EventCallback;a.AdClickEventCallback.prototype.constructor=a.AdClickEventCallback;a.Util.mixin(a.AdClickEventCallback.prototype,{getUrl:function(b){var c=
	a.EventCallback.prototype.getUrl.call(this,b);b[a.INFO_KEY_URL]&&(a.Util.isParameterInURL(c,a.URL_PARAMETER_KEY_CR)||(c=c+"&"+a.URL_PARAMETER_KEY_CR+"="),c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CR,b[a.INFO_KEY_URL]));return c},process:function(b){var b=b||{},c=this.getUrl(b),d=!0===this._showBrowser,d=b.hasOwnProperty(a.INFO_KEY_SHOW_BROWSER)?!0===b[a.INFO_KEY_SHOW_BROWSER]:d;b[a.INFO_KEY_URL]&&(d=!0);d&&!a.Util.isBlank(c)?(window.open(c),this._processTrackingUrls()):a.EventCallback.prototype.process.call(this,
	b)}});a.AdImpressionEventCallback=function(b){a.EventCallback.call(this,b)};a.AdImpressionEventCallback.prototype=new a.EventCallback;a.AdImpressionEventCallback.prototype.constructor=a.AdImpressionEventCallback;a.Util.mixin(a.AdImpressionEventCallback.prototype,{_shouldSkipSendingTrackingAndExternalUrls:function(){return this._getInitValue()!==a.INIT_VALUE_ONE},_getInitValue:function(){return this._adInstance.getSlot().isPauseSlot()||!this._processed?a.INIT_VALUE_ONE:a.INIT_VALUE_TWO},getUrl:function(b){var c=
	a.EventCallback.prototype.getUrl.call(this,b),c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_METR,this._adInstance._metr);this._name!==a.EVENT_AD_IMPRESSION&&(c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CT,this._needEmptyCT(b)?"":this._adInstance._timer.tick()));return c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_INIT,this._getInitValue())},process:function(b){if(a.MODULE_TYPE_TRANSLATOR!==this._adInstance.getRendererController().getRenderer().info()[a.INFO_KEY_MODULE_TYPE])a.EventCallback.prototype.process.call(this,
	b),this._processed=!0}});a.AdQuartileEventCallback=function(b){a.EventCallback.call(this,b)};a.AdQuartileEventCallback.prototype=new a.EventCallback;a.AdQuartileEventCallback.prototype.constructor=a.AdQuartileEventCallback;a.Util.mixin(a.AdQuartileEventCallback.prototype,{getUrl:function(b){var c=a.EventCallback.prototype.getUrl.call(this,b),c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_METR,this._adInstance._metr);return c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CT,this._needEmptyCT(b)?
	"":this._adInstance._timer.tick())},process:function(b){if(!this._processed)a.EventCallback.prototype.process.call(this,b),this._processed=!0}});a.AdStandardEventCallback=function(b){a.EventCallback.call(this,b)};a.AdStandardEventCallback.prototype=new a.EventCallback;a.AdStandardEventCallback.prototype.constructor=a.AdStandardEventCallback;a.ErrorEventCallback=function(b){a.EventCallback.call(this,b)};a.ErrorEventCallback.prototype=new a.EventCallback;a.ErrorEventCallback.prototype.constructor=a.ErrorEventCallback;
	a.Util.mixin(a.ErrorEventCallback.prototype,{getUrl:function(b){var c=a.EventCallback.prototype.getUrl.call(this,b),d=b[a.INFO_KEY_ERROR_CODE];if(!d)d=a.ERROR_UNKNOWN;var f=b[a.INFO_KEY_ERROR_INFO];f||(f="");(b=b[a.INFO_KEY_ERROR_MODULE])||(b="");c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_CN,d);return c=a.Util.setParameterInURL(c,a.URL_PARAMETER_KEY_KEY_VALUE,encodeURIComponent(a.URL_PARAMETER_KEY_ERROR_MODULE)+"="+encodeURIComponent(b)+"&"+encodeURIComponent(a.URL_PARAMETER_KEY_ERROR_INFO)+
	"="+a.PLATFORM_ID+"/"+encodeURIComponent(f))}});a.ResellerNoAdEventCallback=function(b){a.EventCallback.call(this,b)};a.ResellerNoAdEventCallback.prototype=new a.EventCallback;a.ResellerNoAdEventCallback.prototype.constructor=a.ResellerNoAdEventCallback;a.Util.mixin(a.ResellerNoAdEventCallback.prototype,{});a.SlotImpressionEventCallback=function(b){a.EventCallback.call(this,b)};a.SlotImpressionEventCallback.prototype=new a.EventCallback;a.SlotImpressionEventCallback.prototype.constructor=a.SlotImpressionEventCallback;
	a.Util.mixin(a.SlotImpressionEventCallback.prototype,{_shouldSkipSendingTrackingAndExternalUrls:function(){return this._getInitValue()!==a.INIT_VALUE_ONE},_getInitValue:function(){return this._slot.isPauseSlot()||!this._processed?a.INIT_VALUE_ONE:a.INIT_VALUE_TWO},getUrl:function(b){b=a.EventCallback.prototype.getUrl.call(this,b);return b=a.Util.setParameterInURL(b,a.URL_PARAMETER_KEY_INIT,this._getInitValue())},process:function(b){a.EventCallback.prototype.process.call(this,b);this._processed=!0}});
	a.VideoViewEventCallback=function(b){a.EventCallback.call(this,b)};a.VideoViewEventCallback.prototype=new a.EventCallback;a.VideoViewEventCallback.prototype.constructor=a.VideoViewEventCallback;a.Util.mixin(a.VideoViewEventCallback.prototype,{_shouldSkipSendingTrackingAndExternalUrls:function(){return this._getInitValue()!==a.INIT_VALUE_ONE},_getInitValue:function(){return!this._processed?a.INIT_VALUE_ONE:a.INIT_VALUE_ZERO},_getCTValue:function(){return this._context._videoAsset.getPlayheadTime()},
	getUrl:function(b){b=a.EventCallback.prototype.getUrl.call(this,b);b=a.Util.setParameterInURL(b,a.URL_PARAMETER_KEY_INIT,this._getInitValue());return b=a.Util.setParameterInURL(b,a.URL_PARAMETER_KEY_CT,this._getCTValue())},_shouldSkipSendingTrackingAndExternalUrls:function(){return this._processed},process:function(b){a.EventCallback.prototype.process.call(this,b);this._processed=!0}});a.EventDispatcher=function(){this._listeners={}};a.EventDispatcher.prototype={addEventListener:function(a,c){"undefined"===
	typeof this._listeners[a]&&(this._listeners[a]=[]);this._listeners[a].push(c)},dispatchEvent:function(b){"string"===typeof b&&(b={type:b});if(!b.target)b.target=this;if(b.type&&this._listeners[b.type]instanceof Array)for(var c=this._listeners[b.type],d=0,f=c.length;d<f;d++)try{c[d]&&c[d].call(this,b)}catch(g){a.warn("EventDispatcher.dispatchEvent",b.type,g)}},removeEventListener:function(a,c){if(this._listeners[a]instanceof Array){var d=this._listeners[a];if(null==c)this._listeners[a]=[];else for(var f=
	0,g=d.length;f<g;f++)if(d[f]===c){d.splice(f,1);break}}}};a.EventDispatcher.prototype.constructor=a.EventDispatcher;a.Hash=function(){this._keys=[];this._dictionary={}};a.Hash.prototype={};a.Hash.prototype.constructor=a.Hash;a.Util.mixin(a.Hash.prototype,{setKeyValue:function(a,c,d){a&&(this._dictionary.hasOwnProperty(a)||(0===d?this._keys.unshift(a):this._keys.push(a)),this._dictionary[a]=c)},move:function(a){for(var c=0;c<this._keys.length;c++){var d=this._keys[c];if(d===a){this._keys.splice(c,
	1);this._keys.push(d);break}}},getValue:function(a){return this._dictionary[a]}});a.HTMLAdGenerator={log:function(b){a.log("HTMLAdGenerator\t"+b)},getExtension:function(a){return!a?"":(a=a.match(/^[^?]+\/[^?.]*(\.\w+)+/))?a[a.length-1].slice(1):""},generateAd:function(b,c,d,f,g,h,i){a.HTMLAdGenerator.log("generatorAd("+[].slice.call(arguments,0).join(",")+")");var k=h,j=!1;null==k&&(j=!0,k=a.HTMLAdGenerator.getExtension(b).toLowerCase());switch(k){case "jpeg":case "jpg":case "gif":case "png":case "image/jpeg":case "image/jpg":case "image/gif":case "image/png":case "image/bmp":k=
	a.HTMLAdGenerator.generateImageHTML(b,c);break;case "swf":case "application/x-shockwave-flash":k=a.HTMLAdGenerator.generateFlashHTML(b,c,d,f,g);break;case "script":case "js":case "text/javascript":case "text/js_ref":case "application/x-javascript":k=a.HTMLAdGenerator.generateScriptHTML(b,d,f,g);break;case "iframe":case "html":case "htm":case "text/html":case "text/html_doc_ref":case "text/html_lit_nowrapper":case "text/html_doc_lit_mobile":k=a.HTMLAdGenerator.generateIFrameHTML(b,c,d,f,g);break;default:k=
	j?a.HTMLAdGenerator.generateIFrameHTML(b,c,d,f,g):a.HTMLAdGenerator.generateAd(b,c,d,f,g,null,i)}return"text/html_doc_lit_mobile"===i?a.HTMLAdGenerator.htmlLitToHTMLDocLitMobile(k):k},generateImageHTML:function(b,c){a.HTMLAdGenerator.log("generateImageHTML");var d=null;return c?'<a href="'+c+'" target="_blank"><img src="'+b+'" border="0" /></a>':'<img src="'+b+'" border="0" />'},generateFlashHTML:function(b,c,d,f,g){a.HTMLAdGenerator.log("generateFlashHTML");var h=b;c&&0<c.length&&(h+=-1===b.indexOf("?")?
	"?":"&",h+="clickTag="+encodeURIComponent(c));return'<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"WIDTH="'+f+'" HEIGHT="'+g+'" id="'+d+'_external_ad">'+('<PARAM NAME=movie VALUE="'+h+'"/>')+'<PARAM NAME=quality VALUE=high/><PARAM NAME=bgcolor VALUE=#FFFFFF/><PARAM NAME="allowScriptAccess" VALUE="always"/><PARAM NAME="loop" VALUE="true"/>'+('<EMBED src="'+h+'" ')+('quality=high bgcolor=#FFFFFF WIDTH="'+
	f+'" HEIGHT="'+g+'"NAME="'+d+'_external_video" ALIGN="" TYPE="application/x-shockwave-flash"PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>')},generateIFrameHTML:function(b,c,d,f,g){a.HTMLAdGenerator.log("generateIFrameHTML");return'<iframe height="'+g+'" width="'+f+'" frameborder="0" scrolling="no" allowtransparency="true" leftmargin="0" rightmargin="0" marginwidth="0" marginheight="0" src="'+b+'"></iframe>'},docLitToHTMLLit:function(b,c,d,f){a.HTMLAdGenerator.log("docLitToHTMLLit");
	return'<iframe id="_fw_frame_'+c+'" width="'+d+'" height="'+f+'" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe><script language="javascript" type="text/javascript" id="_fw_container_js_'+c+"\">if(!fw_targets) {var fw_targets = [];}var _fw_wr;var fw_scope = document;var fw_content = '"+a.Util.encodeToHex(b)+"';var trgtFrm = fw_scope.getElementById(\"_fw_frame_"+c+'");trgtFrm = (trgtFrm.contentWindow) ? trgtFrm.contentWindow : (trgtFrm.contentDocument.document) ? trgtFrm.contentDocument.document : trgtFrm.contentDocument;fw_targets["'+
	c+'"] = trgtFrm;if(navigator.userAgent.match(/\\bMSIE\\b/) || navigator.userAgent.match(/\\bOpera\\b/)){trgtFrm.document.open();trgtFrm.document.write(fw_content);setTimeout(function(){fw_close(fw_targets["'+c+'"])}, 7500);} else if (navigator.userAgent.match(/\\bFirefox\\b/)) {if(true && fw_content.length < 2000){var ec = escape(fw_content);var fw_iframe_url = "http://m2.feiwei.tv/g/lib/template/echo.html?s="+ec;fw_scope.getElementById("_fw_frame_'+c+'").src = fw_iframe_url;} else {trgtFrm.document.open();trgtFrm.document.write(fw_content);trgtFrm.document.close();}} else {trgtFrm.document.open();trgtFrm.document.write(fw_content);trgtFrm.document.close();}function fw_close(theFrame){theFrame.document.close();}<\/script>'},
	htmlLitToDocLit:function(b){a.HTMLAdGenerator.log("htmlLitToDocLit");return'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Advertisement</title></head><body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+b+"</body></html>"},wrapUnsafeHTML:function(b,c,d,f){return a.HTMLAdGenerator.htmlLitToHTMLDocLitMobile(a.HTMLAdGenerator.docLitToHTMLLit(a.HTMLAdGenerator.htmlLitToDocLit(b),c,d,f))},wrapJSCode:function(b,
	c,d,f){return a.HTMLAdGenerator.wrapUnsafeHTML('<script language="javascript" type="text/javascript">'+b+"<\/script>",c,d,f)},generateScriptHTML:function(b,c,d,f){a.HTMLAdGenerator.log("generateScriptHTML");return a.HTMLAdGenerator.wrapUnsafeHTML('<script language="javascript" type="text/javascript" src="'+b+'"><\/script>',c,d,f)},htmlLitToHTMLDocLitMobile:function(b){a.HTMLAdGenerator.log("htmlLitToHTMLDocLitMobile");return'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><meta name = "viewport" content = "initial-scale = 1.0, target-densitydpi = device-dpi" /><title>Advertisement</title><script type="text/javascript">window._fw_page_url = "";<\/script></head><body style="margin:0px;background-color:transparent;">'+
	b+"</body></html>"}};a.NullRenderer=function(){};a.NullRenderer.prototype={start:function(b){b.setCapability(a.EVENT_AD_CLICK,a.CAPABILITY_STATUS_OFF);b.handleStateTransition(a.RENDERER_STATE_STARTED);b.handleStateTransition(a.RENDERER_STATE_COMPLETED)},info:function(){return{moduleType:a.MODULE_TYPE_RENDERER}},getPlayheadTime:function(){return-1},getDuration:function(){return-1}};a.NullRenderer.prototype.constructor=a.NullRenderer;a.PageSlotScanner=function(a){this.OPTION_INIT=1;this.OPTION_FCAI=
	2;this.OPTION_NIIC=4;this.OPTION_NOSA=8;this.OPTION_NSIT=16;this._knownSlots=[];this._slots={};this._candidateAds=[];this._slotOptionFound=!1;this._context=a};a.PageSlotScanner.prototype={isSlotDuplicate:function(a){for(var c=0;c<this._knownSlots.length;++c)if(this._knownSlots[c].id===a)return!0;return!1},findPageSlotByScope:function(b){var c=b.document;if(c){var d,f=/(^|\s)_fwph(\s|$)/,g=c.getElementsByTagName("span");if(!b._fw_admanager)b._fw_admanager={};b._fw_admanager.pageScanState=!0;for(b=
	0;b<g.length;++b){var h;d=g[b];if(f.test(d.className)&&(d=d.getAttribute("id"),(h=c.getElementById("_fw_input_"+d))&&!this.isSlotDuplicate(d)))if(h=h.getAttribute("value")){";"!==h.charAt(h.length-1)&&(h+=";");h=h.split(";");var i=h[h.length-2],k=!1;-1!==i.search("lo=i")&&(k=!0);var j=!1;-1!==i.search("prct=")&&(j=!0);0>i.search("flag=")&&(i+="&flag=");0>i.search("ptgt=")&&(i="ptgt=s&"+i);h=[];for(var m=i.split("&"),l,o,n,i=!0,t=a.SLOT_OPTION_INITIAL_AD_STAND_ALONE,r=0;r<m.length;++r)if(l=m[r].split("="),
	2===l.length){l[1]=decodeURIComponent(l[1]);if("ssct"===l[0])if(j)continue;else j=!0,l[0]="prct";"flag"===l[0]?(-1===l[1].search(/[-\+]cmpn/)&&(l[1]+="+cmpn"),"+"!==l[1].charAt(0)&&"-"!==l[1].charAt(0)&&(l[1]="+"+l[1]),k&&-1===l[1].search("-init")&&(l[1]+="-init"),-1!==l[1].search("-nrpl")&&(l[1]=l[1].replace("-nrpl","+cmpn")),-1!==l[1].search("-cmpn")&&(i=!1),t=this._getInitialOption(l[1]),this._slotOptionFound||(t=k?a.SLOT_OPTION_INITIAL_AD_KEEP_ORIGINAL:a.SLOT_OPTION_INITIAL_AD_STAND_ALONE)):"w"===
	l[0]?o=Number(l[1]):"h"===l[0]?n=Number(l[1]):"cana"===l[0]&&this._addCandidateAds(l[1]);l=encodeURIComponent(l[0])+"="+encodeURIComponent(l[1]);h.push(l)}j||(k=this._context.getParameter(a.PARAMETER_PAGE_SLOT_CONTENT_TYPE)||"text/html_doc_lit_mobile,text/html_doc_ref",h.push("prct="+encodeURIComponent(k)));(k=c.getElementById("_fw_container_"+d))?(this._slots[d]=h.join("&")+";",this._knownSlots.push({id:d,width:o,height:n,element:k,acceptCompanion:i,initialAdOption:t})):a.warn("Failed to find container for slot "+
	d)}}}},scanPageSlots:function(){for(var b=0;b<window.frames.length;++b)try{a.debug("scanPageSlots in frame",b),this.findPageSlotByScope(window.frames[b])}catch(c){}try{window.parent&&window.parent!==window&&(a.debug("scanPageSlots in parent frame"),this.findPageSlotByScope(window.parent))}catch(d){}try{a.debug("scanPageSlots in current window"),this.findPageSlotByScope(window)}catch(f){}},slotsToTypeBStr:function(){var a="",c;for(c in this._slots)if(this._slots.hasOwnProperty(c)){var d=this._slots[c];
	-1===d.search("slid=")&&(d="slid="+encodeURIComponent(c)+"&"+d);a+=d;";"!==a.charAt(a.length-1)&&(a+=";")}a&&(a=a.substring(0,a.length-1));return a},_addCandidateAds:function(a){for(var a=a.split(","),c=0;c<a.length;c++){var d=parseInt(a[c],10);0<d&&this._candidateAds.push(d)}},_parseFlags:function(a){for(var c=[],d=[],f="",g=!0,a=a+"+",h=0;h<a.length;++h){var i=a.charAt(h);switch(i){case "+":case "-":""!=f&&(g?c.push(f):d.push(f),f="");g="+"==i;break;default:f+=i}}return[c,d]},_getInitialOption:function(b){for(var c=
	!1,d=0,b=this._parseFlags(b),f=a.SLOT_OPTION_INITIAL_AD_STAND_ALONE,g=0;g<b.length;++g)for(var h=0;h<b[g].length;++h)switch(b[g][h].toString().toLowerCase()){case "init":d=0==g?d&~this.OPTION_INIT:d|this.OPTION_INIT;c=!0;break;case "fcai":d=0==g?d|this.OPTION_FCAI:d&~this.OPTION_FCAI;c=!0;break;case "niic":d=0==g?d|this.OPTION_NIIC:d&~this.OPTION_NIIC;c=!0;break;case "nosa":d=0==g?d|this.OPTION_NOSA:d&~this.OPTION_NOSA;c=!0;break;case "nsit":d=0==g?d|this.OPTION_NSIT:d&~this.OPTION_NSIT,c=!0}switch(d){case 0:if(c)f=
	a.SLOT_OPTION_INITIAL_AD_STAND_ALONE;break;case 1:f=a.SLOT_OPTION_INITIAL_AD_KEEP_ORIGINAL;break;case 3:f=a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_ONLY;break;case 2:f=a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_STAND_ALONE;break;case 6:f=a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_THEN_STAND_ALONE;break;case 8:f=a.SLOT_OPTION_INITIAL_AD_NO_STAND_ALONE;break;case 10:f=a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_NO_STAND_ALONE;break;case 16:f=a.SLOT_OPTION_INITIAL_AD_NO_STAND_ALONE_IF_TEMPORAL;break;case 18:f=
	a.SLOT_OPTION_INITIAL_AD_FIRST_COMPANION_OR_NO_STAND_ALONE_IF_TEMPORAL;break;default:f=a.SLOT_OPTION_INITIAL_AD_STAND_ALONE}this._slotOptionFound=c;return f}};a.PageSlotScanner.prototype.constructor=a.PageSlotScanner;a.RendererController=function(b,c){var d=null,f=null,g={},h=a.RendererInitState.instance,i={},k=[],j=0;return{getAdInstance:function(){return c},getContext:function(){return b},getRendererState:function(){return h},processEvent:function(b){var d=b.name;if(d===a.RENDERER_STATE_STARTED||
	d===a.RENDERER_STATE_COMPLETING||d===a.RENDERER_STATE_COMPLETED||d===a.RENDERER_STATE_FAILED)this.handleStateTransition(d,b.info);else{var f=this._inferEventType(d);f&&(f===a.EVENT_TYPE_CLICK&&b.info&&b.info[a.INFO_KEY_CUSTOM_EVENT_NAME]&&(d=b.info[a.INFO_KEY_CUSTOM_EVENT_NAME]),(d!==a.EVENT_AD_MEASUREMENT||b.info[a.INFO_KEY_CONCRETE_EVENT_ID])&&c.processEvent(d,f,b.info))}},handleStateTransition:function(b,d){switch(b){case a.RENDERER_STATE_STARTED:h.notifyStarted(this);break;case a.RENDERER_STATE_COMPLETING:h.complete(this);
	break;case a.RENDERER_STATE_COMPLETED:h.complete(this);h.notifyCompleted(this);break;case a.RENDERER_STATE_FAILED:c.getSlot()._clearScheduledAdInstance();d||(d={});a.warn("FAIL",d.errorModule,d.errorCode,d.errorInfo);var f=c.processEvent(a.EVENT_ERROR,a.EVENT_TYPE_ERROR,d);f||a.debug("No EVENT_ERROR callback found");if(d)switch(d[a.INFO_KEY_ERROR_CODE]){case a.ERROR_NO_AD_AVAILABLE:case a.ERROR_3P_COMPONENT:case a.ERROR_PARSE:(f=c.processEvent(a.EVENT_RESELLER_NO_AD,a.EVENT_TYPE_IMPRESSION))||a.debug("No EVENT_RESELLER_NO_AD callback found.")}h.fail(this);
	break;default:a.debug("Unknown event received",b)}},setCapability:function(a,b){c.setMetr(a,b)},getVersion:function(){return b._adManager.getVersion()},getParameter:function(a){if(!a)return null;if(b._overrideLevelParameterDictionary.hasOwnProperty(a))return b._overrideLevelParameterDictionary[a];if(c.getActiveCreativeRendition()&&"undefined"!==typeof c.getActiveCreativeRendition().getParameter(a))return c.getActiveCreativeRendition().getParameter(a);var d=c._creative;return d&&"undefined"!==typeof d.getParameter(a)?
	d.getParameter(a):"undefined"!==typeof c.getSlot().getParameter(a)?c.getSlot().getParameter(a):b._adResponse._profileParameters.hasOwnProperty(a)?b._adResponse._profileParameters[a]:b._globalLevelParameterDictionary.hasOwnProperty(a)?b._globalLevelParameterDictionary[a]:g&&g.hasOwnProperty(a)?g[a]:null},getCompanionSlots:function(){for(var a=[],b=c._companionAdInstances,d=0;d<b.length;d++)b[d].isPlaceholder()&&a.push(b[d].getSlot());return a},createNullDrivingAdInstance:function(){var a=c.getSlot().scheduleAdInstance();
	a.addCreativeRendition().setContentType("null/null");return a},scheduleAdInstances:function(a){var b,d=[],f=null,a=a||[];if(0===a.length)return d;for(b=0;b<a.length;b++)a[b].getCustomId()===c.getSlot().getCustomId()&&(f=c.getSlot().scheduleAdInstance());if(!f)if(this.isTranslator())f=this.createNullDrivingAdInstance();else if(this.isRenderer())f=c;else return d;for(var g=0;g<a.length;g++){if(a[g].getCustomId()===c.getSlot().getCustomId())f!==c&&d.push(f);else for(var h=0,j=f._companionAdInstances;h<
	j.length;h++)if(b=j[h],a[g]===b.getSlot()){if(this.isTranslator())d.push(b);else if(this.isRenderer()&&b.isPlaceholder()){var w=b.cloneForTranslation();f===c&&(i[w]=b);j[h]=w;d.push(w);k.push(w)}break}d.length<=g&&d.push(null)}return d},commitAdInstance:function(){if(this.isRenderer()&&c.isStarted()){for(var b=0;b<k.length;b++){var d=k[b];d&&d.getSlot().playCompanionAds(d)}k=[]}else a.warn("Skipping RendererController.commitAdInstance when called with driving ad not started or completed.")},isRenderer:function(){return d&&
	a.MODULE_TYPE_RENDERER===d.info()[a.INFO_KEY_MODULE_TYPE]},isTranslator:function(){return d&&a.MODULE_TYPE_TRANSLATOR===d.info()[a.INFO_KEY_MODULE_TYPE]},playable:function(){return h===a.RendererInitState.instance},reset:function(){h=a.RendererInitState.instance},play:function(){for(var a=c.getAllCreativeRenditions()||[],b=null,d=0;d<a.length;d++){var f=a[d];if(b=this._matchRendererClassName(f)){c.setActiveCreativeRendition(f);break}}0===j&&this._actualPlay(b)},_actualPlay:function(b){(f=a.Util.getObject(b)||
	a.Util.getObject(u+"."+b))&&(d=new f);d?h.start(this):this.handleStateTransition(a.RENDERER_STATE_FAILED,{errorCode:a.ERROR_NO_RENDERER,errorInfo:"Renderer class <"+b+"> not found"})},dispatchEvent:function(a,c){b.dispatchEvent(a,c)},requestContentStateChange:function(b){b?this.dispatchEvent(a.EVENT_CONTENT_VIDEO_PAUSE_REQUEST):this.dispatchEvent(a.EVENT_CONTENT_VIDEO_RESUME_REQUEST)},getRenderer:function(){return d},setRenderer:function(a){d=a},setRendererState:function(a){h=a},getContentVideoElement:function(){return b.getContentVideoElement()},
	_restorePlaceholdersForHybrid:function(){if(i&&this.isRenderer()){for(var a=[],b=0;b<c._companionAdInstances.length;b++){var d=c._companionAdInstances[b],f=i[d];f?a.push(f):a.push(d)}c._companionAdInstances=a}0<k.length&&this.isRenderer()&&(k=[])},rendererMatch:function(b){return f?f===a.Util.getObject(this._matchRendererClassName(b)):!0},_matchRendererClassName:function(d){function f(b,c,d){a.debug("matching "+b+" within "+c);if(!c)return!0;c=c.split(",");c[c.length-1]||c.pop();if(d){b=b.toLowerCase();
	for(d=0;d<c.length;d++)if(b==c[d].toLowerCase())return!0;a.debug("not match");return!1}(c=0<=c.indexOf(b))||a.debug("not match");return c}var h=d.getPrimaryCreativeRenditionAsset().getContentType(),i=d.getContentType(),k=d.getWrapperType(),r=d.getCreativeApi(),J=d.getBaseUnit(),w=c.getSoAdUnit(),x=c.getSlot();x.getType();x=x.getTimePositionClass();a.debug("match renderer for creativeRendition:"+d.getId());if(a.Util.isBlank(i)&&a.Util.isBlank(k))return a.warn("renderer not match due to both contentType and wrapperType are empty"),
	null;var s=b._rendererManifest["*"];s||(s=b._rendererManifest[k]);s||(s=b._rendererManifest[i]);if(!s)for(var H=b._overriddenAdRenderers.concat(b._adResponse._adRenderers),E=0;E<H.length;E++){var q=H[E],v=!q.contentType;v||(k?v=f(k,q.contentType,!0):(h&&(v=f(h,q.contentType,!0)),v||(v=f(i,q.contentType,!0))));if(v)if((v=!q.creativeApi)||(v=f(r,q.creativeApi)),v)if(q.baseUnit&&!f(J,q.baseUnit))a.debug("can't match renderer "+q.url+" due to baseUnit not match for creativeRendition:"+d.getId());else if(q.soAdUnit&&
	!f(w,q.soAdUnit))a.debug("can't match renderer "+q.url+" due to soAdUnit not match for creativeRendition:"+d.getId());else if(q.slotType&&!f(x.toUpperCase(),q.slotType.toUpperCase()))a.debug("can't match renderer "+q.url+" due to slotType not match for creativeRendition:"+d.getId());else{if(a.debug("renderer "+q.url+" matched for creativeRendition:"+d.getId()),q.url){s=q.url;d=s.indexOf("?");-1!==d&&(s=s.substring(0,d));d=s.lastIndexOf("/");-1!==d&&(s=s.substring(d+1));d=s.lastIndexOf(".js");-1!==
	d&&(s=s.substring(0,d));var B={};if(q.parameter){d=[].concat(q.parameter);for(h=0;h<d.length;h++)if(d[h].hasOwnProperty("name"))B[d[h].name]=d[h].value;else for(var A in d[h])d[h].hasOwnProperty(A)&&(B[A]=d[h][A])}a.Util.getObject(u+"."+s)&&(s=u+"."+s);if(a.Util.getObject(s))g=B,j=0;else{if(0<j)break;var C=this;A=1*this.getContext().getParameter("moduleLoadTimeout")||6E4;j=window.setTimeout(function(){j=-1;C.handleStateTransition(a.RENDERER_STATE_FAILED,{errorCode:a.ERROR_NO_RENDERER,errorInfo:"Load renderer timeout, URL:"+
	q.url})},A);a.Util.lazyJavaScriptLoad(q.url,function(){a.log("async load renderer successful, URL:"+q.url);-1===j?a.debug("renderer loaded after timeout. WILL NOT PLAY."):(window.clearTimeout(j),j=0,g=B,C._actualPlay(s))})}break}}else a.debug("can't match renderer "+q.url+" due to creative api not match for creativeRendition:"+d.getId());else a.debug("can't match renderer "+q.url+" due to contentType not match for creativeRendition:"+d.getId())}return s?s:!a.Util.isBlank(k)?null:"null/null"===i?u+
	".NullRenderer":null},_inferEventType:function(b){return b===a.EVENT_ERROR?a.EVENT_TYPE_ERROR:b===a.EVENT_AD_CLICK?a.EVENT_TYPE_CLICK:b===a.EVENT_AD_IMPRESSION||b===a.EVENT_AD_FIRST_QUARTILE||b===a.EVENT_AD_MIDPOINT||b===a.EVENT_AD_THIRD_QUARTILE||b===a.EVENT_AD_COMPLETE||b===a.EVENT_RESELLER_NO_AD?a.EVENT_TYPE_IMPRESSION:b===a.EVENT_AD_PAUSE||b===a.EVENT_AD_RESUME||b===a.EVENT_AD_REWIND||b===a.EVENT_AD_MUTE||b===a.EVENT_AD_UNMUTE||b===a.EVENT_AD_COLLAPSE||b===a.EVENT_AD_EXPAND||b===a.EVENT_AD_MINIMIZE||
	b===a.EVENT_AD_CLOSE||b===a.EVENT_AD_ACCEPT_INVITATION?a.EVENT_TYPE_STANDARD:b===a.EVENT_AD_MEASUREMENT?a.EVENT_TYPE_GENERIC:null},stop:function(){a.log("RendererController.stop");0<j&&(j=-1);h.stop(this)}}};a.RenditionSelector=function(a,c,d,f){this._targetByterate=a;this._arWeight=c;this._pxWeight=d;this._conversionFactor=f};a.RenditionSelector.prototype={getBestFitRendition:function(b,c,d){var f=this;b.reverse();b=b.filter(function(b){return b&&b.getPrimaryCreativeRenditionAsset()&&(b.getPrimaryCreativeRenditionAsset().getUrl()||
	b.getPrimaryCreativeRenditionAsset().getContent())&&a.Util.canPlayVideoType(b.getPrimaryCreativeRenditionAsset().getMimeType())}).sort(function(a,b){return f.getBitrate(a)-f.getBitrate(b)});if(!b.length)return null;var g=Number.MAX_VALUE,h=b.filter(function(a){a=f.getBitrate(a);g=a<g?a:g;return a<=f._targetByterate});h.length||(h=b.filter(function(a){return f.getBitrate(a)<=g}));return h.sort(function(a,b){return f.compareVisualMetrics(a,b,c,d)}).pop()},compareVisualMetrics:function(a,c,d,f){var g=
	this.calculateVisualRatios(a.getWidth(),a.getHeight(),d,f),f=this.calculateVisualRatios(c.getWidth(),c.getHeight(),d,f);if(!g&&f)return-1;if(g&&!f)return 1;if(g&&f){var d=this._conversionFactor*this._arWeight*Math.log(g.arRatio),h=this._pxWeight*Math.log(g.pixelation),g=this._conversionFactor*this._arWeight*Math.log(f.arRatio),f=this._pxWeight*Math.log(f.pixelation),d=this.findDistance(d,h,0,0),g=this.findDistance(g,f,0,0);if(g!=d)return g-d}return a.getPreference()-c.getPreference()},calculateVisualRatios:function(a,
	c,d,f){if(0<a&&0<c&&0<d&&0<f){var g=a/c,h=d/f;g>h?f=d/g:d=f*g;return{arRatio:g/h,pixelation:a*c/(d*f)}}return null},findDistance:function(a,c,d,f){return isNaN(a)||isNaN(d)||isNaN(c)||isNaN(f)?NaN:Math.sqrt(Math.pow(d-a,2)+Math.pow(f-c,2))},getBitrate:function(a){var c=a.getDuration();return(a=a.getPrimaryCreativeRenditionAsset().getBytes())&&c&&!isNaN(a)&&!isNaN(c)&&0<a&&0<c?8*a/1E3/c:-1}};a.RenditionSelector.prototype.constructor=a.RenditionSelector;a.Slot=function(b){var c="",d=null,f=null,g=null,
	h=null,i=[],k=[],j={},m=null,l=a.MediaInitState.instance,o=0,n=null,t,r,J,w,x,s,u=!1,E=!1,q=!0,v=[],B,A;return{getSlotProfile:function(){return f},setSlotProfile:function(a){f=a},setMediaState:function(a){l=a},setParameter:function(a,b){null===b?delete j[a]:j[a]=b},getParameter:function(a){if(a&&j.hasOwnProperty(a))return j[a]},getAdCount:function(){return i.length},setCustomId:function(a){c=a},getCustomId:function(){return c},setAdUnit:function(a){x=a},getAdUnit:function(){return x},setType:function(a){d=
	a},getType:function(){return d},setTimePosition:function(a){r=a},getTimePosition:function(){return r},setTimePositionClass:function(a){n=a&&a.toUpperCase()},getTimePositionClass:function(){return n},setWidth:function(a){J=a},getWidth:function(){return n!==a.TIME_POSITION_CLASS_DISPLAY?J?J:b.getVideoDisplaySize().width:J},setHeight:function(a){w=1*a},getHeight:function(){return n!==a.TIME_POSITION_CLASS_DISPLAY?w?w:b.getVideoDisplaySize().height:w},setBase:function(a){t=a},getBase:function(){return t},
	setCuepointSequence:function(a){s=1*a?1*a:0},getCuepointSequence:function(){return s},getVideoDisplaySize:function(){return b.getVideoDisplaySize()},parse:function(d){if(d){c=d.customId;r=1*d.timePosition;n=d.timePositionClass&&d.timePositionClass.toUpperCase()||n;x=d.adUnit;for(var f,g=0,h=d.eventCallbacks||[];g<h.length;g++){f=h[g];var j=a.EventCallback.newEventCallback(b,f.name,f.type);if(j)j._slot=this,j.parse(f),k.push(j)}for(g=0,h=d.selectedAds||[];g<h.length;g++)f=h[g],d=[],j=new a.AdInstance(b),
	d.push(j),j._slot=this,j._slotCustomId=c,j._parentAdInstancesGroup=d,j.parse(f),i.push(d)}},getCurrentAdInstance:function(){return g},isPauseSlot:function(){return n===a.TIME_POSITION_CLASS_PAUSE_MIDROLL},play:function(b){n===a.TIME_POSITION_CLASS_DISPLAY&&!q?(a.log("Slot is invisible. Push the play operation to the queue."),v.push({operation:this.play,argument:b})):(a.log("Slot.play",n),u=!1,n===a.TIME_POSITION_CLASS_DISPLAY&&1<i.length&&i.splice(0,i.length-1),this._play(b))},stop:function(){a.log("Slot.stop",
	n);n===a.TIME_POSITION_CLASS_DISPLAY&&(v=[]);l===a.MediaInitState.instance||l===a.MediaEndState.instance?a.log("Slot.stop, not start or already end, ignore"):(u=!0,g?g.stop():a.warn("Slot.stop, no _currentAdInstance, ignore"))},setVisible:function(b){if(!n===a.TIME_POSITION_CLASS_DISPLAY)a.log("Slot.setVisible is only for display ads.");else if(a.log("Slot.setVisible",b),q!=b&&(q=b))for(;0<v.length;)op=v.pop(),op.operation&&op.operation.call(this,op.argument)},_play:function(a){m=m||a;l.play(this)},
	onStartPlaying:function(){this._onStartPlaying()},onStartReplaying:function(){this._onStartPlaying()},onCompletePlaying:function(){this._onCompletePlaying()},onCompleteReplaying:function(){this._onCompletePlaying()},playNextAdInstance:function(){a.log("Slot.playNextAdInstance ",n);this._playNextAdInstance()||l.complete(this)},scheduleAdInstance:function(){return h=g.cloneForTranslation()},_clearScheduledAdInstance:function(){h=null},_onStartPlaying:function(){var b=a.EventCallback.getEventCallback(k,
	a.EVENT_SLOT_IMPRESSION,a.EVENT_TYPE_IMPRESSION);b&&b.process();this.dispatchSlotEvent(a.EVENT_SLOT_STARTED);this.playNextAdInstance()},dispatchSlotEvent:function(a){E||b.dispatchEvent(a,{slot:this})},_onCompletePlaying:function(){m&&m();m=null;v=[];var b=a.EventCallback.getEventCallback(k,a.EVENT_SLOT_END,a.EVENT_TYPE_IMPRESSION);b&&b.process();g=null;this.dispatchSlotEvent(a.EVENT_SLOT_ENDED)},_playNextAdInstance:function(){if(u||l!==a.MediaPlayingState.instance&&l!==a.MediaReplayingState.instance)return!1;
	this._commitScheduledAdInstance();g=this._nextPlayableAdInstance();if(!g)return!1;g.reset();g.getRendererController().play();return!0},_commitScheduledAdInstance:function(){if(h){var a=g._parentAdInstancesGroup.indexOf(g);if(0<=a)h._parentAdInstancesGroup=g._parentAdInstancesGroup,g._parentAdInstancesGroup.splice(a,1,h),h=null}},_nextPlayableAdInstance:function(){var b=-1;if(g){var c=g._parentAdInstancesGroup,d=c.indexOf(g),b=i.indexOf(c);0<=b&&0<=d&&(g._isImpressionSent||d==c.length-1)&&b++}else b=
	0;if(0>b||b>=i.length)return null;if(l===a.MediaPlayingState.instance){c=i[b];for(d=0;d<c.length;d++){var f=c[d];if(f.getRendererController().playable())return f}}else if(l===a.MediaReplayingState.instance)for(;b<i.length;b++){c=i[b];for(d=0;d<c.length;d++)if(f=c[d],f._isImpressionSent)return f;for(d=0;d<c.length;d++)if(f=c[d],f.getRendererController().getRendererState()!==a.RendererFailedState.instance&&!f._translated)return f}return null},toString:function(){return"[Slot "+c+"]"},getAdInstances:function(){for(var a=
	[],b=0;b<i.length;++b)for(var c=i[b],d=0;d<c.length;++d){var f=c[d];if(f.isPlayable()){a.push(f);break}}return a},getPlayheadTime:function(){for(var a=0,b=this.getAdInstances(),c=0;c<b.length;++c)if(b[c]===g){b=g.getPlayheadTime();-1<b&&(a+=b);break}else{var d=b[c].getDuration();-1<d&&(a+=d)}o&&a>o&&(a=o);return a},getTotalDuration:function(){for(var a=0,b=this.getAdInstances(),c=0;c<b.length;++c){var d=b[c].getDuration();-1<d&&(a+=d)}return o=a},playCompanionAds:function(b){a.log("Slot.playCompanionAds");
	var c=[];b._parentAdInstancesGroup=c;c.push(b);i.push(c);E=!0;g&&this.stop();this.play()},getState:function(){return l},setAcceptCompanion:function(a){B=a},getAcceptCompanion:function(){return B},setInitialAdOption:function(a){A=a},getInitialAdOption:function(){return A}}};a.SurveyExtension=function(a){this._context=a;this._surveyPingedIds=[]};a.SurveyExtension.prototype={start:function(){a.log("SurveyExtension.start("+Array.prototype.slice.call(arguments).join(",")+")");this._onAdStarted=a.Util.bind(this,
	function(b){this._parameters=this._getParameters();if(this._parameters.enabled){a.log("SurveyExtension.onAdStarted()");var c=b.adInstance;if(-1<this._surveyPingedIds.indexOf(c.getAdId()))a.log("won't pingback survey since it has been pinged back");else{var d=c._creative.getParameter("_fw_survey_url");if(d)try{a.log("append"+d+" to head");var f=document.getElementsByTagName("head")[0],g=document.createElement("script");g.setAttribute("type","text/javascript");g.setAttribute("src",d);f.appendChild(g);
	this._surveyPingedIds.push(c.getAdId())}catch(h){a.warn("Append survey to head",b.type,e)}}}});this._context.addEventListener(a.EVENT_AD_IMPRESSION,this._onAdStarted)},dispose:function(){a.log("SurveyExtension.dispose()");this._context.removeEventListener(a.EVENT_AD_IMPRESSION,this._onAdStarted);this._parameters=this._onAdStarted=null},_getParameters:function(){var b={};b.enabled="false"!=this._context.getParameter(a.PARAMETER_EXTENSION_SURVEY_ENABLED);a.log(b);return b}};a.SurveyExtension.prototype.constructor=
	a.SurveyExtension;a.Timer=function(a,c){this._lastTickDate=new Date;this._duration=a||-1;this._playheadTime=-1;this._callback=c;this._state=-1};a.Timer.prototype={};a.Timer.prototype.constructor=a.Timer;a.Util.mixin(a.Timer.prototype,{tick:function(){var a=new Date,c=Math.round((a.getTime()-this._lastTickDate.getTime())/1E3);this._lastTickDate=a;return c},start:function(){if(0!==this._state){if(2===this._state||-1===this._playheadTime)this._playheadTime=0;this._state=0;this._timeStamp=new Date;if(this._timeouter)window.clearTimeout(this._timeouter),
	this._timeouter=null;var a=this,c=1E3*(this._duration-this._playheadTime);if(!(0>c))this._timeouter=window.setTimeout(function(){a.stop();a._playheadTime=a._duration;a._callback&&a._callback()},c)}},pause:function(){if(0===this._state){this._state=1;if(this._timeouter)window.clearTimeout(this._timeouter),this._timeouter=null;this._playheadTime=(new Date-this._timeStamp)/1E3+this._playheadTime}},stop:function(){this._state=2;if(this._timeouter)window.clearTimeout(this._timeouter),this._timeouter=null;
	this._playheadTime=(new Date-this._timeStamp)/1E3+this._playheadTime},getPlayheadTime:function(){return 0===this._state?(new Date-this._timeStamp)/1E3+this._playheadTime:this._playheadTime},getCTValue:function(){return(new Date-this._timeStamp)/1E3},getDuration:function(){return this._duration}});a.Url=function(b){this._session=this._base="";this._parameters=new a.Hash;this.setString(b)};a.Url.prototype={};a.Url.prototype.constructor=a.Url;a.Util.mixin(a.Url.prototype,{setString:function(b){if(this._string!==
	b&&b&&(this._string=b,b=b.split("?"),this._base=b[0],this._parameters=new a.Hash,b[1])){var c=b[1].indexOf(";"),d="";0<c&&0===b[1].indexOf("session=")?(this._session=b[1].substring(0,c+1),d=b[1].substring(c+1)):d=b[1];b=d.split("&");for(d=0;d<b.length;d++){var f=b[d],c=f.indexOf("=");if(!(0>c)){var g=decodeURIComponent(f.substring(0,c)),c=decodeURIComponent(f.substring(c+1));this._parameters.setKeyValue(g,c)}}}},setParameter:function(a,c){this._parameters.setKeyValue(a,c,0);this._string=null},getParameter:function(a){return this._parameters.getValue(a)},
	toString:function(){if(this._string)return this._string;this._parameters.move("cr",-1);for(var a=this._parameters._keys,c=[],d=0;d<a.length;d++){var f=a[d],g=this._parameters.getValue(f);c.push(encodeURIComponent(f)+"="+encodeURIComponent(g))}return this._string=this._base+"?"+this._session+c.join("&")}});a.VastTranslator=function(){};a.VastTranslator.prototype={start:function(b){function c(b){a.log("VastTranslator\t"+b)}function d(b){a.warn("VastTranslator\t"+b)}function f(a,b){if(a)if(a.length&&
	"string"!==typeof a)for(var c=0;c<a.length;c++)b(a[c].value);else a.value&&b(a.value)}function g(a,b){f(b,function(b){b&&a.push(b)})}function h(b){if(!b)return!1;for(var c=0;c<v.length;c++)if(a.Util.trim(v[c]).toLowerCase()===a.Util.trim(b).toLowerCase())return!0;return!1}function i(b){if(!b)return null;"string"!==typeof b&&(b=b.toString());b=a.Util.trim(b);return-1<b.indexOf("://")?b:null}function k(a){this.code=this.url=null;this.height=this.width=NaN;this.resourceType=this.creativeType=null;this.bitrate=
	NaN;this.creativeApi=null;this.ad=a;this.clickThrough=null;this.clickTrackings=[];this.customClicks=[];this.creativeData=null}function j(){this.creativeView=[];this.start=[];this.firstQuartile=[];this.midpoint=[];this.thirdQuartile=[];this.complete=[];this.mute=[];this.unmute=[];this.pause=[];this.rewind=[];this.resume=[];this.replay=[];this.fullscreen=[];this.expand=[];this.collapse=[];this.acceptInvitation=[];this.stop=[]}function m(a){this._impressions=[];this.clickThrough=null;this.clickTrackings=
	[];this.customClicks=[];this.creativeData=null;this.sequence=-1;this.vastRenditions=[];this.duration=NaN;this.adp=a;this.isDrivingAd=!1}function l(a){m.call(this,a)}function o(a){m.call(this,a)}function n(a){m.call(this,a)}function t(){}function r(a,b,d,f){if(a&&f&&0<f.length){c("augmentCallbacks("+b+", "+d+", "+f+")");for(var g=a.getEventCallbackUrls(b,d),h=0;h<g.length;h++)-1<f.indexOf(g[h])&&(c("augmentCallbacks() url = "+g[h]),f.unshift(g[h]));a.addEventCallbackUrls(b,d,f)}else c("augmentCallbacks("+
	b+", "+d+", "+f+"), empty callbacks")}function u(b,d){c("initErrorTrackings()");if(b&&d){for(var f=d.errorTrackings,g=0;g<f.length;g++)-1<f[g].search("[ERRORCODE]")&&(f[g]=f[g].replace("[ERRORCODE]","900"));r(b,a.EVENT_ERROR,a.EVENT_TYPE_ERROR,d.errorTrackings)}}function w(b,d){c("initTrackingEvents()");d&&b&&(r(b,a.EVENT_AD_IMPRESSION,a.EVENT_TYPE_IMPRESSION,d.creativeView),r(b,a.EVENT_AD_IMPRESSION,a.EVENT_TYPE_IMPRESSION,d.start),r(b,a.EVENT_AD_FIRST_QUARTILE,a.EVENT_TYPE_IMPRESSION,d.firstQuartile),
	r(b,a.EVENT_AD_MIDPOINT,a.EVENT_TYPE_IMPRESSION,d.midpoint),r(b,a.EVENT_AD_THIRD_QUARTILE,a.EVENT_TYPE_IMPRESSION,d.thirdQuartile),r(b,a.EVENT_AD_COMPLETE,a.EVENT_TYPE_IMPRESSION,d.complete),r(b,a.EVENT_AD_MUTE,a.EVENT_TYPE_STANDARD,d.mute),r(b,a.EVENT_AD_UNMUTE,a.EVENT_TYPE_STANDARD,d.unmute),r(b,a.EVENT_AD_PAUSE,a.EVENT_TYPE_STANDARD,d.pause),r(b,a.EVENT_AD_RESUME,a.EVENT_TYPE_STANDARD,d.resume),r(b,a.EVENT_AD_REWIND,a.EVENT_TYPE_STANDARD,d.rewind),r(b,a.EVENT_AD_EXPAND,a.EVENT_TYPE_STANDARD,d.fullscreen),
	r(b,a.EVENT_AD_COLLAPSE,a.EVENT_TYPE_STANDARD,d.collapse),r(b,a.EVENT_AD_EXPAND,a.EVENT_TYPE_STANDARD,d.expand),r(b,a.EVENT_AD_CLOSE,a.EVENT_TYPE_STANDARD,d.stop),r(b,a.EVENT_AD_ACCEPT_INVITATION,a.EVENT_TYPE_STANDARD,d.acceptInvitation))}function x(b,d,f,g,h){c("initClickAndImpressionEvents");if(b){d&&b.setClickThroughUrl(a.EVENT_AD_CLICK,d);f&&0<f.length&&r(b,a.EVENT_AD_CLICK,a.EVENT_TYPE_CLICK_TRACKING,f);if(g&&0<g.length)for(d=0;d<g.length;d++)g[d].url&&r(b,g[d].id,a.EVENT_TYPE_CLICK_TRACKING,
	[g[d].url]);h&&r(b,a.EVENT_AD_IMPRESSION,a.EVENT_TYPE_IMPRESSION,h)}}function s(a,b){c("initTemporalAdInstance");a||d("initTemporalAdInstance: Invalid adInstance");if(b.selectedDrivingAd){b.surveyUrl&&a._creative.setParameter("_fw_survey_url",b.surveyUrl);var f=b.selectedDrivingAd,g=b.selectedDrivingRenditions;c("vastRenditions:"+g);for(var i=y===B,k=0;k<g.length;k++){var j=g[k],l=a.addCreativeRendition(),m=l.addCreativeRenditionAsset("VAST_CRA",!0),p;a:switch(p=j.creativeType,p){case "video/mp4":p=
	"video/mp4-h264";break a;case "video/3gp":p="video/3gpp";break a}c("initTemporalAdInstance() set rendition/asset [vastRd.creativeApi,vastAd.duration,vastRd.width,vastRd.height,vastRd.url,assetContentType,vastRd.creativeType] =  "+[j.creativeApi,f.duration,j.width,j.height,j.url,p,j.creativeType]);l.setCreativeApi(j.creativeApi);isNaN(f.duration)||l.setDuration(f.duration);j.width&&!isNaN(j.width)&&l.setWidth(j.width);j.height&&!isNaN(j.height)&&l.setHeight(j.height);j.url&&m.setUrl(j.url);j.code&&
	m.setContent(j.code);m.setMimeType(j.creativeType);"static"===j.resourceType&&"text/html"===j.creativeType?m.setContentType("text/html_doc_ref"):"application/x-javascript"===j.creativeType||"application/javascript"===j.creativeType?m.setContentType("text/js_ref"):"iframe"===j.resourceType?m.setContentType("text/html_doc_ref"):"text/html"===j.creativeType||"text/html_doc_ref"===j.creativeType?m.setContentType("text/html_doc_ref"):"text/html_doc_lit_mobile"===j.creativeType?m.setContentType("text/html_doc_lit_mobile"):
	i||h(p)?(m.setContentType("text/html_doc_lit_mobile"),m.setUrl(null),m.setContent(H(a,C.getCustomId(),f,j,"text/html_doc_lit_mobile"))):m.setContentType(p);f.creativeData&&0!==f.creativeData.length&&(c("initTemporalAdInstance(), set asset parameter VPAID_creativeData:"+f.creativeData),l.setParameter("VPAID_creativeData",f.creativeData));if(!i&&!h(p))j=j.bitrate,!isNaN(j)&&0<j&&m.setBytes(1E3*j*f.duration/8);p=K;m=L;j=!1;if(l.getContentType()&&p){var n=l.getContentType().toLowerCase(),o=p.toLowerCase();
	if(n==o)j=!0;else if(0==n.indexOf("video/mp4")&&0==o.indexOf("video/mp4")||"application/javascript"==o&&"text/js_ref"==n)l.setContentType(p),j=!0}p=!1;l.getCreativeApi()&&m&&(n=l.getCreativeApi().toLowerCase(),o=m.toLowerCase(),n==o?p=!0:0==n.indexOf("mraid")&&0==o.indexOf("mraid")&&(p=!0,l.setCreativeApi(m)));j&&p?l.setPreference(10):p?l.setPreference(6):j?l.setPreference(5):l.setPreference(0);c("adjustMatchedRendition "+l.getId()+", contentType "+l.getContentType()+", creativeAPI "+l.getCreativeApi()+
	", preference "+l.getPreference())}w(a,f.trackingEvents);u(a,b);x(a,i?g[0].clickThrough:f.clickThrough,f.clickTrackings,f.customClicks,f.impressions)}else{var l=a.addCreativeRendition();l.setContentType("null/null");var m=l.addCreativeRenditionAsset("VAST_CRA",!0);m.setContentType("null/null")}}function H(b,d,f,g,h){c("getCoadHTML, ad id = "+b.getAdId());return g.url&&0<g.url.length?((f=g.clickThrough)&&0<f.length&&b.setClickThroughUrl(a.EVENT_AD_CLICK,f),b=b.getEventCallbackUrls(a.EVENT_AD_CLICK,
	a.EVENT_TYPE_CLICK)[0],a.HTMLAdGenerator.generateAd(g.url,b,d,g.width,g.height,g.creativeType,h)):g.code&&0<g.code.length?"script"===g.resourceType||"text/javascript"===g.resourceType||"text/js_ref"===g.resourceType||"application/x-javascript"===g.resourceType?a.HTMLAdGenerator.wrapJSCode(g.code,d,g.width,g.height):a.HTMLAdGenerator.wrapUnsafeHTML(g.code,d,g.width,g.height):null}function E(b,d,f,g){c("initPageAdInstance ad:"+d.getAdId());var h=f.vastRenditions[0];if(h.url||h.code){var i=d.addCreativeRendition(),
	j=i.addCreativeRenditionAsset("VAST_CRA",!0);i.setCreativeApi(h.creativeApi);i.setWidth(h.width);i.setHeight(h.height);"static"===h.resourceType&&"text/html"===h.creativeType?(j.setContentType("text/html_doc_ref"),j.setUrl(h.url)):"iframe"===h.resourceType?(j.setContentType("text/html_doc_ref"),j.setUrl(h.url)):"HTML"===h.resourceType?(j.setContentType("text/html_doc_lit_mobile"),j.setContent(a.HTMLAdGenerator.wrapUnsafeHTML(h.code,b.getCustomId(),h.width,h.height))):(j.setContentType("text/html_doc_lit_mobile"),
	j.setContent(H(d,b.getCustomId(),f,h,"text/html_doc_lit_mobile")));j.setMimeType("text/html")}else c("initPageAdInstance will add a tracking only companion ad");w(d,f.trackingEvents);u(d,g);x(d,h.clickThrough,h.clickTrackings,h.customClicks,f.impressions)}function q(d){if(200==d.status)if(d.responseXML){var f=(new t).parseAdData(d.responseXML);if(f){c("scheduleVastAds");if(!f||0===f.length)c("no ads for scheduleVastAds");else if(d=f[0].selectedPackage,f=f[0].redirectPackage,!d&&!f)c("scheduleVastAds(), no ads from vast response!!!"),
	b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_NO_AD_AVAILABLE});else if(!d&&f){c("scheduleVastAds(), no ads scheduled, redirect to downstream Secondary Ad Server");c("scheduleRedirect");var d=[],g=[];d.push(C);g.push({});for(var h=G,i=f.selectedCompanionAds,j=0;j<h.length;j++){var k=h[j];i&&i[k.getCustomId()]&&(d.push(k),g.push(i[k.getCustomId()]))}if((h=b.scheduleAdInstances(d))&&0<h.length)i=h[0],j=i.addCreativeRendition(),j.setWrapperUrl(f.tagUrl),
	j.setWrapperType(N),j.setContentType(K),j.setCreativeApi(L),w(i,f.getTrackingEventsOfWrapper()),u(i,f),x(i,f.getClickThroughOfWrapper(),f.getClickTrackingsOfWrapper(),f.getCustomClicksOfWrapper(),f.getImpressionOfWrapper());c("scheduleRedirect, schedule companion for redirect ad ",f);for(j=1;j<h.length;j++)if(i=h[j])k=g[j],k instanceof n&&E(d[j],i,k,f)}else if(d){c("scheduleVastAds(), ads returned from vast response, going to schedule them");d.selectedDrivingAd?(c("scheduleVastAds(), ads returned from vast response, going to schedule them with driving ad"),
	d.selectedDrivingAd.isDrivingAd=!0):c("scheduleVastAds(), ads returned from vast response, going to schedule them without driving ad");c("scheduleAdPackage()");f=[];g=[];f.push(C);d.selectedDrivingAd&&g.push(d.selectedDrivingAd);h=G;i=d.selectedCompanionAds;for(j=0;j<h.length;j++)k=h[j],i&&i[k.getCustomId()]&&(f.push(k),g.push(i[k.getCustomId()]));i=b.scheduleAdInstances(f);if(0<i.length){c( true?"":", 1 of it is nullAd for pure companion ad schedule");
	d.selectedDrivingAd||c("Driving ad is not selected, will create a dummy null ad.");d.selectedDrivingAd||(f.shift(),s(i.shift(),d));for(j=0;j<i.length;j++)if(k=i[j]){var l=g[j];l instanceof n?E(f[j],k,l,d):s(k,d)}!d.selectedDrivingAd&&0<h.length&&0<d.companionAds.length&&0===g.length&&(c("found empty companion slots and companion ads in package, but none of them matches slot size"),b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_UNMATCHED_SLOT_SIZE}))}else c("scheduleAdPackage, no ad scheduled.")}b.handleStateTransition(a.TRANSLATOR_STATE_STARTED);
	b.handleStateTransition(a.TRANSLATOR_STATE_COMPLETED)}}else b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_PARSE,errorInfo:F});else 400<=d.status&&b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_IO,errorInfo:F})}var v="image/gif,image/jpeg,image/png,text/html,text/javascript,text/html_doc_ref,text/html_doc_lit_mobile,application/x-javascript,application/javascript".split(","),B=4,A=b.getAdInstance(),
	C=A.getSlot(),y=function(){if(!C)return 1;switch(C.getTimePositionClass()){case a.TIME_POSITION_CLASS_PREROLL:case a.TIME_POSITION_CLASS_MIDROLL:case a.TIME_POSITION_CLASS_POSTROLL:return 2;case a.TIME_POSITION_CLASS_OVERLAY:return B;case a.TIME_POSITION_CLASS_DISPLAY:return C&&!C.getBase()?8:1;default:return 1}}(),G=b.getCompanionSlots().filter(function(b){if(!b)return!1;switch(b.getTimePositionClass()){case a.TIME_POSITION_CLASS_PREROLL:case a.TIME_POSITION_CLASS_MIDROLL:case a.TIME_POSITION_CLASS_PAUSE_MIDROLL:case a.TIME_POSITION_CLASS_POSTROLL:return!1;
	default:return!0}});c("Checking CompanionSlots, length = "+G.length+", rendererController.getCompanionSlots().length = "+b.getCompanionSlots().length+", AdInstance.getCompanionSlots.length = "+A.getCompanionSlots().length);var K=A.getActiveCreativeRendition().getContentType(),L=A.getActiveCreativeRendition().getCreativeApi()||"None";this.log("ExpectedDrivingContentType:"+K+", ExpectedDrivingAPI:"+L);var N=A.getActiveCreativeRendition().getWrapperType();k.prototype={init:function(a,b,c,d,f,g,h,i){this.log("init("+
	[].slice.call(arguments,0).join(",")+")");this.url=a;this.width=1*b;this.height=1*c;this.creativeType=d;this.resourceType=f;this.bitrate=g;var j;j=h;if(!j||0===j.length)j="None";else{var k="";switch(j.toLowerCase()){case "flashvar":case "flashvars":k="clickTag";break;case "vpaid":k="VPAID";break;case "mraid":k="MRAID-1.0";break;default:k=j}j=k}this.creativeApi=j;this.code=i||null},log:function(b){a.log("VastTranslator.VastRendition\t"+b)},toString:function(){var a=[],b;for(b in this)this.hasOwnProperty(b)&&
	"function"!==typeof this[b]&&"ad"!==b&&a.push(b+":"+this[b]);return a.join(",")}};k.prototype.constructor=k;m.prototype={parse:function(b){this.log("parse()");if(b.Duration)if(b.Duration.value){var c=/(\d+):(\d+):(\d+)/.exec(b.Duration.value);c?this.duration=3600*c[1]+60*c[2]+1*c[3]:this.warn("Failed to parse duration value for creative "+b)}else this.warn("No duration value set for creative "+b);if(b.VideoClicks)b.VideoClicks=[].concat(b.VideoClicks),a.Util.forEachOnArray(b.VideoClicks,function(a){if(a.ClickThrough&&
	a.ClickThrough.value)this.clickThrough=i(a.ClickThrough.value);if(a.ClickTracking){a.ClickTracking=[].concat(a.ClickTracking);for(var b=0;b<a.ClickTracking.length;b++){var c=i(a.ClickTracking[b].value);c&&this.clickTrackings.push(c)}}if(a.CustomClick){a.CustomClick=[].concat(a.CustomClick);for(b=0;b<a.CustomClick.length;b++){var d=null;a.CustomClick[b]["@attributes"]&&(d=a.CustomClick[b]["@attributes"].id);(c=i(a.CustomClick[b].value))&&this.customClicks.push({id:d,url:c})}}},this);if(b.MediaFiles&&
	b.MediaFiles.MediaFile)b.MediaFiles.MediaFile=[].concat(b.MediaFiles.MediaFile),a.Util.forEachOnArray(b.MediaFiles.MediaFile,function(a){var b=i(a.value),c=NaN,d=NaN,f=null,g="None",h=NaN;if(a["@attributes"])c=a["@attributes"].width||NaN,d=a["@attributes"].height||NaN,f=a["@attributes"].type,g=a["@attributes"].apiFramework||"None",h=a["@attributes"].bitrate||NaN;b&&-1!==b.indexOf(":")?(a=new k(this),a.init(b,c,d,f,"",h,g,null),a.clickThrough=this.clickThrough,this.vastRenditions.push(a),(isNaN(c)||
	isNaN(d))&&this.log("continue with missing [width,height]"+[c,d])):this.warn("will ignore this mediaFile because some required field is missing [url,width,height]:"+[b,c,d])},this);b.TrackingEvents&&this.parseTrackingEvents(b.TrackingEvents,this.setTrackingEvents());if(b.AdParameters)this.log("parse() get a AdParameters:"+b.AdParameters.value),this.creativeData=b.AdParameters.value;if(b.Companion)b.Companion=[].concat(b.Companion),a.Util.forEachOnArray(b.Companion,function(b){var c=null,d=null,f=
	"",g="",j=null,D=null,l=!1;b.CompanionClickThrough&&(g=i(b.CompanionClickThrough.value));if(b.StaticResource)c=i(b.StaticResource.value),b.StaticResource["@attributes"]&&(d=b.StaticResource["@attributes"].creativeType),f="static";if(b.IFrameResource&&(c=i(b.IFrameResource.value)))d="text/html_doc_ref",f="iframe";if(b.HTMLResource&&(j=b.HTMLResource["#cdata-section"]||"",j=a.Util.trim(j)))d="text/html_doc_lit_mobile",f="HTML";if(b.TrackingEvents)D=b.TrackingEvents;var m=new n(this.adp);m.sequence=
	this.sequence;m.clickThrough=g;D&&m.parseTrackingEvents(D,m.setTrackingEvents());if(b["@attributes"]){var D=b["@attributes"].width||NaN,I=b["@attributes"].height||NaN,b=b["@attributes"].apiFramework||"None";if((c&&-1!==c.indexOf(":")||j)&&!isNaN(D)&&!isNaN(I)&&h(d)||this.adp.isWrapper){var p=new k(m);p.init(c,D,I,d,f,NaN,b,j);p.clickThrough=g;m.vastRenditions.push(p)}else l=!0,this.warn("will ignore this rendition because some required fields is missing or incompatible [creativeType,url,code,width,height]:"+
	[d,c,j,D,I])}else this.adp.isWrapper||(l=!0,this.warn("for InLine ad package, No attributes found for the Companion ads:"+b));l?this.adp.isWrapper&&this.adp.companionAds.push(m):this.adp.companionAds.push(m)},this);if(b.NonLinear)b.NonLinear=[].concat(b.NonLinear),a.Util.forEachOnArray(b.NonLinear,function(b){var c=null,d=null,f="",g="",j="",D=null,l=!1;if(b.AdParameters)j=b.AdParameters.value;b.NonLinearClickThrough&&(g=i(b.NonLinearClickThrough.value));if(b.StaticResource)c=i(b.StaticResource.value),
	b.StaticResource["@attributes"]&&(d=b.StaticResource["@attributes"].creativeType),f="static";b.IFrameResource&&(c=i(b.IFrameResource.value),d="text/html_doc_ref",f="iframe");b.HTMLResource&&(D=b.HTMLResource["#cdata-section"]||"",D=a.Util.trim(D),d="text/html_doc_lit_mobile",f="HTML");var m=new o(this.adp);m.sequence=this.sequence;m.clickThrough=g;m._trackingEvents=this._trackingEvents;if(j)m.creativeData=j;if(b["@attributes"]){var j=b["@attributes"].width||NaN,I=b["@attributes"].height||NaN,b=b["@attributes"].apiFramework||
	"None";if((c||D)&&!isNaN(j)&&!isNaN(I)&&h(d)){var p=new k(m);p.init(c,j,I,d,f,NaN,b,D);p.clickThrough=g;m.vastRenditions.push(p)}else l=!0,this.warn("will ignore this rendition because some required fields is missing or incompatible:[creativeType,url,code,width,height]:"+[d,c,D,j,I])}else this.adp.isWrapper||(l=!0,this.warn("for InLine ad package, No attributes found for the NonLinear ads:"+b));this.adp.nonLinearAds.push(m);l?this.adp.isWrapper&&this.adp.nonLinearAds.push(m):this.adp.nonLinearAds.push(m)},
	this)},parseLinears:function(a){2!=y?this.log("TargetAdType != TARGET_LINEAR, skipping parse"):this.parse(a)},parseNonLinears:function(a){y!==B?this.log("TargetAdType != TARGET_NONLINEAR, skipping parse"):this.parse(a)},parseCompanionAds:function(a){this.parse(a)},setTrackingEvents:function(){if(!this._trackingEvents)this._trackingEvents=new j;return this._trackingEvents},parseTrackingEvents:function(b,c){this.log("parseTrackingEvents");if(b.Tracking)b.Tracking=[].concat(b.Tracking),a.Util.forEachOnArray(b.Tracking,
	function(a){var b=a["@attributes"].event;if(a=i(a.value))switch(b){case "creativeView":case "start":case "firstQuartile":case "midpoint":case "thirdQuartile":case "complete":case "mute":case "unmute":case "pause":case "resume":case "rewind":case "replay":case "fullscreen":case "expand":case "collapse":case "acceptInvitation":case "stop":c[b].push(a);break;case "close":c.stop.push(a)}},this)},toString:function(){return this.constructor.name+", renditions:"+this.vastRenditions},log:function(b){a.log("VastTranslator."+
	this.constructor.name+"\t"+b)},warn:function(b){a.warn("VastTranslator."+this.constructor.name+"\t"+b)}};var p=Object.defineProperty||function(a,b,c){c.get&&a.__defineGetter__(b,c.get);c.set&&a.__defineSetter__(b,c.set)};p(m.prototype,"trackingEvents",{get:function(){this.log("get trackingEvents()");return this._trackingEvents?this._trackingEvents:this.isDrivingAd?this.adp.trackingEvents:null}});p(m.prototype,"impressions",{set:function(a){this._impressions=a},get:function(){return this.isDrivingAd?
	this._impressions.concat(this.adp.impressions):this._impressions}});m.prototype.constructor=m;l.prototype=new m;l.prototype.constructor=l;o.prototype=new m;o.prototype.constructor=o;n.prototype=new m;n.prototype.getPrimaryRendition=function(){return this.vastRenditions[0]||null};p(n.prototype,"impressions",{get:function(){return 8===y?this._impressions.concat(this.adp.impressions):this._impressions}});n.prototype.constructor=n;var O=function(){this.impressions=[];this.errorTrackings=[];this.linearAds=
	[];this.nonLinearAds=[];this.companionAds=[];this.extensions=[];this.tagUrl="";this.isWrapper=!1;this.surveyUrl=null;this.selectedDrivingRenditions=[];this.selectedDrivingAd=null;this.selectedCompanionAds={}};O.prototype={parse:function(a){this.log("parse("+a+")");if(a)if(!a.Creatives||!this.isWrapper&&!a.Creatives.Creative)this.warn("parse(): no creative found");else{g(this.impressions,a.Impression);g(this.extensions,a.Extensions);g(this.errorTrackings,a.Error);if(this.isWrapper&&a.VASTAdTagURI)this.tagUrl=
	a.VASTAdTagURI.value||"";if(a.Survey&&a.Survey.value&&0<a.Survey.value.length)this.surveyUrl=a.Survey.value;a.Creatives.Creative=a.Creatives.Creative?[].concat(a.Creatives.Creative):[];for(var b=0;b<a.Creatives.Creative.length;b++){var c=a.Creatives.Creative[b],d=-1,f;c["@attributes"]&&(d=c["@attributes"].sequence||-1,d*=1);if(c.Linear)f=new l(this),f.sequence=d,f.parseLinears(c.Linear),this.linearAds.push(f);else if(c.NonLinearAds)f=new o(this),f.sequence=d,f.parseNonLinears(c.NonLinearAds);else if(c.CompanionAds)f=
	new n(this),f.sequence=d,f.parseCompanionAds(c.CompanionAds)}}else this.warn("parse(): empty adpackage")},testAndUpdatePackageForTemporalSlot:function(a){this.log("testAndUpdatePackageForTemporalSlot("+a+")");a=a?this.linearAds:this.nonLinearAds;if(1>a.length)return!1;this.log("testAndUpdatePackageForTemporalSlot(), ads.length = "+a.length+"");var b=!1;if(!b)for(var c=0;c<a.length;c++){var d=this.findRenditionGroupByContentType(a[c]);if(0<d.length){this.log("testAndUpdatePackageForTemporalSlot() : found driving ad and renditions group: "+
	d);this.selectedDrivingRenditions=d;this.selectedDrivingAd=a[c];b=!0;break}}return b},testAndUpdatePackageForPageSlots:function(a){var b=!1,c=this.companionAds,d=G.slice(0),f=null;this.log("testAndUpdatePackageForPageSlots("+a+"), ads are "+c.join(",")+", slots are "+d.join(","));if(a){if(f=this.matchAdsToSlots(c,d),0<f.length){b=!0;for(a=0;a<f.length;a++)c=f[a],d=c.ad,this.selectedCompanionAds[c.slot.getCustomId()]=d}}else f=this.matchAdsToSlots(c,[C]),1===f.length?(b=!0,this.selectedDrivingAd=f[0].ad):
	this.selectedDrivingAd=null;return b},renditionFitsInSlot:function(a,b){return!a?!1:a.width<=b.getWidth()&&a.height<=b.getHeight()},calcDeadSpaceRatio:function(a,b){var c=a.getPrimaryRendition();if(!c)return!1;this.log("ad w,h  slot w,h"+[c.width,c.height,b.getWidth(),b.getHeight()]);return!this.renditionFitsInSlot(c,b)?1:1-c.width*c.height/b.getWidth()*b.getHeight()},matchAdsToSlots:function(a,b){this.log("matchAdsToSlots(ads="+a.join(",")+", slots="+b.join(",")+")");for(var c=[],d=null,f=null,g=
	1,h=0;h<a.length;h++)for(var i=a[h],j=0;j<b.length;j++){var k=b[j],l=this.calcDeadSpaceRatio(i,k);l<g&&(d=i,f=k,g=l)}null!==d&&(c.push({ad:d,slot:f}),a.splice(a.indexOf(d),1),b.splice(b.indexOf(f),1),c=c.concat(this.matchAdsToSlots(a,b)));this.log("matchAdsToSlots: winningAd:"+d+" winningSlot:"+f+" ratio:"+g);return c},getAllRenditions:function(a){return a.vastRenditions},findRenditionGroupByContentType:function(b){this.log("findRenditionGroupByContentType:"+b);var c=[];if(b instanceof l&&isNaN(b.duration))return this.warn("findRenditionGroupByContentType(), duration of linear ad is NaN, will not used for scheduling"),
	c;for(var d=this.getAllRenditions(b),f=0;f<d.length;f++){var g=d[f];if(b instanceof l){if(null==g.creativeType||""==a.Util.trim(g.creativeType)){this.warn("findRenditionGroupByContentType, the contentType "+g.creativeType+" not supported for linearAd");continue}}else if(!h(g.creativeType)){this.warn("findRenditionGroupByContentType, the contentType "+g.creativeType+" not supported for non-linearAd");continue}c.push(g)}return c},formalizeString:function(b){return!b?"":a.Util.trim(b).toLowerCase()},
	getAdsByTargetType:function(){this.log("getAdsByTargetType");var a=[];switch(y){case 8:a=this.companionAds;break;case 2:a=this.linearAds;break;case B:a=this.nonLinearAds}for(var b=0;b<a.length;b++)a[b].isDrivingAd=!0;return a},getImpressionOfWrapper:function(){this.log("getImpressionOfWrapper");for(var a=this.getAdsByTargetType(),b=null,c=0;c<a.length;c++){var d=a[c];if(d&&d._impressions&&0<d._impressions.length){b=d._impressions;break}}if(!b)b=this.impressions;return b},getTrackingEventsOfWrapper:function(){this.log("getTrackingEventsOfWrapper");
	for(var a=this.getAdsByTargetType(),b=null,c=0;c<a.length;c++){var d=a[c];if(d&&d._trackingEvents){b=d._trackingEvents;break}}return b},getClickThroughOfWrapper:function(){this.log("getClickThroughOfWrapper");for(var a=this.getAdsByTargetType(),b=null,c=0;c<a.length;c++){var d=a[c];if(d){if(d.clickThrough)b=d.clickThrough;for(var d=d.vastRenditions,f=0;f<d.length;f++){var g=d[f];if(g.clickThrough){b=g.clickThrough;break}}if(b)break}}return b},getClickTrackingsOfWrapper:function(){this.log("getClickTrackingsOfWrapper");
	for(var a=this.getAdsByTargetType(),b=null,c=0;c<a.length;c++){var d=a[c];if(d){if(d.clickTrackings&&0<d.clickTrackings.length)b=d.clickTrackings;for(var d=d.vastRenditions,f=0;f<d.length;f++){var g=d[f];if(g.clickTrackings&&0<g.clickTrackings.length){b=g.clickTrackings;break}}if(b)break}}return b},getCustomClicksOfWrapper:function(){this.log("getCustomClicksOfWrapper");for(var a=this.getAdsByTargetType(),b=null,c=0;c<a.length;c++){var d=a[c];if(d){if(d.customClicks&&0<d.customClicks.length)b=d.customClicks;
	for(var d=d.vastRenditions,f=0;f<d.length;f++){var g=d[f];if(g.customClicks&&0<g.customClicks.length){b=g.customClicks;break}}if(b)break}}return b},testWrapperForRedirect:function(){this.log("testAndUpdateWrapperForRedirect()");return this.tagUrl&&0<this.tagUrl.length},log:function(b){a.log("VastTranslator.VastAdPackage\t"+b)},warn:function(b){a.warn("VastTranslator.VastAdPackage\t"+b)}};O.prototype.constructor=O;t.prototype={getVastVersion:function(a){this.log("getVastVersion("+a+")");return a?0===
	a.indexOf("3.")?3:0===a.indexOf("2.")?2:0===a.indexOf("1.")?1:-1:-1},parseAdData:function(c){this.log("parseAdData()");var d={},f;d.selectedPackage=null;d.redirectPackage=null;var g=a.Util.xmlToJson(c);if(!g||!g.VAST||!g.VAST["@attributes"]||2!==this.getVastVersion(g.VAST["@attributes"].version))b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_PARSE});else{if(g.VAST.Ad){g.VAST.Ad=[].concat(g.VAST.Ad);var h=[],c=[],i;for(f=0;f<g.VAST.Ad.length;f++)i=
	new O,i.isWrapper=!!g.VAST.Ad[f].Wrapper,i.isWrapper?(i.parse(g.VAST.Ad[f].Wrapper),c.push(i)):(i.parse(g.VAST.Ad[f].InLine),h.push(i));g=!1;if(0===h.length&&0===c.length)return this.log("parseAdData(): no ads from vast response!!!"),[d];this.log("parseAdData(): "+h.length+"inline ads, "+c.length+" wrapper ads.");i=null;for(f=0;f<h.length;f++)if(this.selectUsableAdsForDrivingSlot(h[f])){this.log("parseAdData(): package for driving slot is found!!!");i=h[f];break}f=0<G.length&&A.getSlot().getTimePositionClass()!==
	a.TIME_POSITION_CLASS_DISPLAY;if(i)f&&this.selectUsableAdsCompanionSlots(i)&&this.log("parseAdData(): companion ads are found for companion slots, with driving slot"),d.selectedPackage=i;else if(f){f=!1;for(var j=0;j<h.length;j++)if(i=h[j],this.selectUsableAdsCompanionSlots(i))this.log("parseAdData(): companion ads are found for companion slots,without driving slot"),d.selectedPackage=i,f=!0;f||(this.log("parseAdData(): companion ads are not found for companion slots,without driving slot"),g=!0)}else this.log("parseAdData(): no usable ads found in vast response!!!"),
	g=!0;if(g&&0<c.length)for(h=0;h<c.length;h++)if(this.testWrapperForRedirect(c[h])){d.redirectPackage=c[h];this.selectUsableAdsCompanionSlots(c[h])&&this.log("parseAdData(): companion ads are found for wrapper ad");break}return[d]}b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_NO_AD_AVAILABLE})}},selectUsableAdsForDrivingSlot:function(a){this.log("selectUsableAdsForDrivingSlot()");var b=!0;switch(y){case 2:b=this.testAndUpdatePackageForTemporalSlot(a,
	!0);break;case B:b=this.testAndUpdatePackageForTemporalSlot(a,!1);break;case 8:b=this.testAndUpdatePackageForPageSlots(a,!1);break;default:b=!1}return b},selectUsableAdsCompanionSlots:function(a){this.log("selectUsableAdsCompanionSlots(pk)");return this.testAndUpdatePackageForPageSlots(a,!0)},testAndUpdatePackageForTemporalSlot:function(a,b){this.log("testAndUpdatePackageForTemporalSlot(pk,isLinear), isLinear = "+b);return a.testAndUpdatePackageForTemporalSlot(b)},testAndUpdatePackageForPageSlots:function(a,
	b){this.log("testAndUpdatePackageForPageSlots(pk,isCompanion) isCompanion = "+b);return a.testAndUpdatePackageForPageSlots(b)},testWrapperForRedirect:function(a){this.log("testWrapperForRedirect(pk)");return a.testWrapperForRedirect()},log:function(b){a.log("VastTranslator.VastParser\t"+b)},warn:function(b){a.warn("VastTranslator.VastParser\t"+b)}};var F=A.getActiveCreativeRendition().getWrapperUrl(),p=A.getActiveCreativeRendition().getWrapperType();c("AdInstance.getActiveCreativeRendition().getWrapperUrl()="+
	F+", getWrapperType()="+p);if("external/vast-2"!==p)b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_NO_RENDERER,errorInfo:"wrapperType="+p});else if(!F||0===F.length)b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorCode:a.ERROR_NULL_ASSET,errorInfo:"wrapperUrl="+F});else{p=b.getParameter("translator.vast.asyncLoad");p=!0===a.Util.str2bool(p);c("will load vast xml, asyncAjax:"+p);var P=b.getParameter("translator.vast.loadWithCookie"),
	P=!0===a.Util.str2bool(P),z=null;try{window.XDomainRequest?(z=new XDomainRequest,p=!0):(z=new XMLHttpRequest,z.withCredentials=P),p?(z.open("GET",F),window.XDomainRequest?z.onload=function(){var a=new ActiveXObject("Microsoft.XMLDOM");a.async=!1;a.loadXML(z.responseText);z.responseXML=a;z.status=200;q(z)}:z.onreadystatechange=function(){4==z.readyState&&q(z)},z.onerror=function(){if(window.XDomainRequest)z.status=0;0==z.status?(d("CORS error"),b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",
	errorCode:a.ERROR_SECURITY,errorInfo:F})):(d("exception:"+z.statusText),b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorInfo:z.statusText}))},z.send()):(z.open("GET",F,!1),z.send(),q(z))}catch(M){p=!1;if(window.XMLHttpRequestException){if(M instanceof XMLHttpRequestException)switch(M.code){case XMLHttpRequestException.NETWORK_ERR:p=!0}}else M.code===DOMException.NETWORK_ERR&&(d("CORS in IE10"),p=!0);p?(d("CORS error:"+M),b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,
	{errorModule:"VastTranslator",errorCode:a.ERROR_SECURITY,errorInfo:F})):(d("exception:"+M),b.handleStateTransition(a.TRANSLATOR_STATE_FAILED,{errorModule:"VastTranslator",errorInfo:M}))}}},info:function(){return{moduleType:a.MODULE_TYPE_TRANSLATOR}},log:function(b){a.log("VastTranslator\t"+b)},warn:function(b){a.warn("VastTranslator\t"+b)},getPlayheadTime:function(){return-1},getDuration:function(){return-1}};a.VastTranslator.prototype.constructor=a.VastTranslator;a.VideoAsset=function(b){this._defaultTimeouts=
	[5,10,15,30,60,120,180,300];this._context=b;this._internalState=a.MediaInitState.instance;this._eventCallback=this._state="";this._callbackTimer=null;this._requestedVideoViewUrl=this._videoPlayPending=!1;this._dummyInstanceId="";this._delay=0;this._location=this._networkId=this._duration=this._customId=this._id="";this._autoPlayType=a.VIDEO_ASSET_AUTO_PLAY_TYPE_ATTENDED;this._viewRandom=this._fallbackId=0};a.VideoAsset.prototype={setVideoAsset:function(b,c,d,f,g,h,i,k){if(b){var j=!1;switch(i){case a.ID_TYPE_FW:j=
	this._id!=b;this._id=b;break;case a.ID_TYPE_GROUP:j=this._id!="g"+b;this._id="g"+b;break;default:j=this._customId!=b,this._customId=b}if(j)this._eventCallback="";if("number"===typeof c)this._duration=Math.round(10*c)/10;if(0<1*d)this._networkId=1*d;if("string"===typeof f)this._location=f;if("number"===typeof g)this._autoPlayType=g;if(0<1*h)this._viewRandom=1*h;if(0<1*k)this._fallbackId=1*k;this._videoPlayPending&&this.play()}else a.warn("AdRequest.setVideoAsset","id is required.")},setVideoState:function(b){b===
	a.VIDEO_STATE_PLAYING?this.play():b===a.VIDEO_STATE_PAUSED||b===a.VIDEO_STATE_STOPPED?this.pause():b===a.VIDEO_STATE_COMPLETED&&this.complete();this._state=b},callback:function(b){this._eventCallback?this._eventCallback.process():b=!0;if(!b)(b=this._defaultTimeouts.shift())||(b=300),this._callbackTimer=new a.Timer(b,a.Util.bind(this,this.callback)),this._callbackTimer.start()},getPlayheadTime:function(){var a=this._delay;this._delay=0;a+=this._callbackTimer?this._callbackTimer.getCTValue():0;return Math.floor(a)},
	play:function(){if(!this._context._adManager._serverURL||!this._context._adManager._networkId||!this._id&&!this._customId){if(a.warn("Server URL or Network ID or Video Asset id/customId is not set, pend video asset play request."),this._videoPlayPending=!0,!this._callbackTimer)this._callbackTimer=new a.Timer,this._callbackTimer.tick()}else if(this._eventCallback)this._videoPlayPending=!1,this._internalState.play(this);else if(!this._requestedVideoViewUrl&&(this._requestedVideoViewUrl=!0,this.requestForVideoViewCallback(),
	!this._callbackTimer))this._callbackTimer=new a.Timer,this._callbackTimer.tick()},pause:function(){this._internalState.pause(this)},complete:function(){this._internalState.complete(this)},onStartPlaying:function(){this.callback()},onStartReplaying:function(){this.callback()},onPausePlaying:function(){this.callback(!0);this._callbackTimer.pause()},onResumePlaying:function(){this._callbackTimer.start()},onCompletePlaying:function(){this.callback(!0);this._callbackTimer.stop();this._callbackTimer=null;
	this._eventCallback="";this._requestedVideoViewUrl=!1},onCompleteReplaying:function(){this.onCompletePlaying()},setMediaState:function(a){this._internalState=a},requestForVideoViewCallback:function(){var b=new a.Context(this._context._adManager);b._videoAsset=this;this._dummyInstanceId=b._instanceId;var b=this._context._adRequest.generateVideoViewRequestUrlWithDummyContextInstanceId(b._instanceId),c=this;a.PLATFORM_SEND_REQUEST_BY_FORM?(a.debug("Context.submitRequest:","use json2"),a.Util.pingURLWithForm(b,
	this._dummyInstanceId,!0),c._onMessagePosted=function(a){"object"===typeof a.data&&a.data.hasOwnProperty("cbfn")&&-1<a.data.cbfn.indexOf("['Context_"+this._dummyInstanceId+"']")&&c.requestComplete(a.data.response)},window.addEventListener("message",c._onMessagePosted,!1)):a.Util.pingURLWithScript(b)},requestComplete:function(b){this._delay=this._callbackTimer.tick();this._callbackTimer=null;if(a.PLATFORM_SEND_REQUEST_BY_FORM){window.removeEventListener("message",this._onMessagePosted,!1);var c=document.getElementById("_fw_request_iframe_"+
	this._dummyInstanceId);document.body.removeChild(c)}null!==b?(a._instanceQueue["Context_"+this._dummyInstanceId]=null,this.parse(a.Util.getObject("siteSection.videoPlayer.videoAsset",b)||{}),this.play()):a.warn("Failed to get video view callback url.")},parse:function(b){if(b){this._customId=b.customId;this._networkId=parseInt(b.networkId);for(var c=0,d=b.eventCallbacks||[];c<d.length;c++){var b=d[c],f=a.EventCallback.newEventCallback(this._context,b.name,b.type);if(f&&b.name===a.EVENT_VIDEO_VIEW){f.parse(b);
	this._eventCallback=f;a.debug("Parsed video view url: "+this._eventCallback._url);break}}}}};a.VideoRenderer=function(){this._adVideo=null;this._duration=this._playheadTime=-1;this._dragging=this._stopInvoked=this._isEnded=!1};a.VideoRenderer.prototype={start:function(b){var c=b.getAdInstance(),d=c.getSlot(),f=this,g=!1;if(a.PLATFORM_NOT_SUPPORT_VIDEO_AD)b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"VideoRenderer",errorCode:a.ERROR_DEVICE_LIMIT,errorInfo:d.getTimePositionClass()});
	else if(a.PLATFORM_NOT_SUPPORT_MIDROLL_AD&&d.getTimePositionClass()===a.TIME_POSITION_CLASS_MIDROLL)b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"VideoRenderer",errorCode:a.ERROR_DEVICE_LIMIT,errorInfo:"midroll"});else{a.log("VideoRenderer.start",d.getTimePositionClass(),c);var h=b.getContentVideoElement(),i=d.getVideoDisplaySize().width,k=d.getVideoDisplaySize().height,j=c.getRenderableCreativeRenditions(),m=(i=(new a.RenditionSelector(b.getParameter(a.PARAMETER_DESIRED_BITRATE)||
	1E3,b.getParameter("arWeight")||1,b.getParameter("pxWeight")||1,0.2)).getBestFitRendition(j,i,k))?i.getPrimaryCreativeRenditionAsset():null;if(!m&&j.length)b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"VideoRenderer",errorCode:a.ERROR_DEVICE_LIMIT,errorInfo:"no compatible asset"});else if(!m||!m.getUrl())b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"VideoRenderer",errorCode:a.ERROR_NULL_ASSET});else{c.setActiveCreativeRendition(i);a.log("VideoRenderer.start selected rendition is:",
	m.getUrl());b.setCapability(a.EVENT_AD_QUARTILE,a.CAPABILITY_STATUS_ON);var l=!a.PLATFORM_NOT_SUPPORT_CLICK_FOR_VIDEO;l||b.setCapability(a.EVENT_AD_CLICK,a.CAPABILITY_STATUS_OFF);var o=a.PLATFORM_EVENT_CLICK,n=a.MOBILE_EVENT_DRAG;a.debug("VideoRenderer","use content video element");h.controls=!1;this._adVideo=h;var t=null,r=null,u=null,w=function(b){a.debug("VideoRenderer.checkTimeUpdate timeout");K(b)},x=function(){r&&(clearTimeout(r),r=null)},s=a.Util.bind(this,function(c){a.debug("onAdVideoBufferEmpty(): Ad video event "+
	c.type);c=b.getParameter(a.PARAMETER_RENDERER_VIDEO_PLAY_AFTER_STALLED);null==c||"undefined"===typeof c||!1===a.Util.str2bool(c)||(a.debug("play the ad immediately after the stalled event"),h&&h._fw_videoAdPlaying&&h.play())}),H=a.Util.bind(this,function(c){if(h.paused&&a.PLATFORM_NOT_FIRE_CLICK_WHEN_AD_VIDEO_PAUSED)h.play();else if(!b.getParameter(a.PARAMETER_EXTENSION_AD_CONTROL_CLICK_ELEMENT)){var d=b.getParameter(a.PARAMETER_RENDERER_VIDEO_CLICK_DETECTION);null==d&&(d="true");if(!1!==a.Util.str2bool(d))a.debug("Ad video event "+
	c.type),this._dragging?this._dragging=!1:b.processEvent({name:a.EVENT_AD_CLICK})}}),E=a.Util.bind(this,function(b){a.debug("Ad video event "+b.type);this._dragging=!0}),q,v,B=function(c){a.debug("Ad video event "+c.type+" ended: "+h.ended+" playing:"+h._fw_videoAdPlaying);if(h.ended&&0.2>Math.abs(h.duration-h.currentTime)||!h._fw_videoAdPlaying)q=setTimeout(function(){a.warn("Force ad video end bc ad paused with ended = true");c.type="ended";v(c)},200);else{var d=b.getParameter(a.PARAMETER_RENDERER_VIDEO_DISPLAY_CONTROLS_WHEN_PAUSE);
	null==d&&(d="true");!1===a.Util.str2bool(d)?a.debug("Pause controls disabled"):h.controls=!0;x()}},A=function(b){a.debug("Ad video event "+b.type);h.controls=!1},C=!1,y=0,G=function(){x();if(!h.paused){var c=b.getParameter(a.PARAMETER_RENDERER_VIDEO_PROGRESS_DETECT_TIMEOUT)||8E3;r=setTimeout(w,c,c+"ms timeout when playing")}if(!C){C=!0;f._playheadTime=h.currentTime;if(0>f._playheadTime)f._playheadTime=0;t&&(clearTimeout(t),t=null);f._quartileTimerId=setInterval(function(){var c=h.currentTime,d=h.duration;
	if(0<c)f._playheadTime=c;if(0<d)f._duration=d;if(!("number"!==typeof c||"number"!==typeof d||u))if(c>=0.25*d&&1>y&&(b.processEvent({name:a.EVENT_AD_FIRST_QUARTILE}),y=1),c>=0.5*d&&2>y&&(b.processEvent({name:a.EVENT_AD_MIDPOINT}),y=2),c>=0.75*d&&3>y)clearInterval(f._quartileTimerId),f._quartileTimerId=null,b.processEvent({name:a.EVENT_AD_THIRD_QUARTILE}),y=3},1E3);b.handleStateTransition(a.RENDERER_STATE_STARTED)}};this.dispose=a.Util.bind(this,function(){v()});v=function(c){var d=u;c&&c.type&&(a.debug("Ad video event "+
	c.type),"error"===c.type&&(a.warn(c.target.src),a.warn(c.target.currentSrc)));x();t&&(clearTimeout(t),t=null);l&&(h.removeEventListener(o,H,!1),h.removeEventListener(n,E,!1));q&&(clearTimeout(q),q=null);h.removeEventListener("ended",v,!1);h.removeEventListener("error",v,!0);h.removeEventListener("pause",B,!1);h.removeEventListener("playing",A,!1);h.removeEventListener("timeupdate",G,!1);h.removeEventListener("stalled",s,!1);h.paused||(a.debug("try pausing video before complete"),h.pause());c&&"error"===
	c.type&&(d="video error",(c=h.error||c.target.error)&&(d="error:"+c+",code:"+c.code));if(!d)f._isEnded=!0;a.log("VideoRenderer.complete");if(!g){g=!0;delete h._fw_videoAdPlaying;f._adVideo=null;if(f._quartileTimerId)clearInterval(f._quartileTimerId),f._quartileTimerId=null;d?b.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"VideoRenderer",errorInfo:d}):(f._stopInvoked||(h.currentTime>=0.25*h.duration&&1>y&&(b.processEvent({name:a.EVENT_AD_FIRST_QUARTILE}),y=1),h.currentTime>=0.5*h.duration&&
	2>y&&(b.processEvent({name:a.EVENT_AD_MIDPOINT}),y=2),h.currentTime>=0.75*h.duration&&3>y&&(b.processEvent({name:a.EVENT_AD_THIRD_QUARTILE}),y=3),h.currentTime>=h.duration-0.5&&4>y&&(b.processEvent({name:a.EVENT_AD_COMPLETE}),y=4)),f._stopInvoked=!1,b.handleStateTransition(a.RENDERER_STATE_COMPLETED))}};var K=function(b){u=b;a.warn(u);a.PLATFORM_WAIT_WHEN_AD_VIDEO_TIMEOUT||v()};h._fw_videoAdPlaying=!0;var L=!1,N=function(){if(!L){L=!0;l&&(h.addEventListener(o,H,!1),h.addEventListener(n,E,!1));h.addEventListener("ended",
	v,!1);h.addEventListener("error",v,!0);h.addEventListener("pause",B,!1);h.addEventListener("playing",A,!1);h.addEventListener("timeupdate",G,!1);h.addEventListener("stalled",s,!1);h.src=m.getUrl();a.log("VideoRenderer play video ad "+h.src);h.load();if(h._fw_fromVideoPool||a.PLATFORM_SUPPORT_VIDEO_START_DETECT_TIMEOUT){var c=b.getParameter(a.PARAMETER_RENDERER_VIDEO_START_DETECT_TIMEOUT)||5E3;t=setTimeout(K,c,c+"ms timeout before playing")}a.PLATFORM_VIDEO_DOESNOT_SUPPORT_TIMEUPDATE&&b.handleStateTransition(a.RENDERER_STATE_STARTED);
	0<a.PLATFORM_ANDROID_VERSION?(c=b.getParameter(a.PARAMETER_RENDERER_VIDEO_ANDROID_DELAY)||100,setTimeout(function(){h.play()},c)):setTimeout(function(){h.play()},100)}};!a.VideoRenderer._fw_playedDummyVideo&&d.getTimePositionClass()===a.TIME_POSITION_CLASS_PREROLL&&a.PLATFORM_PLAY_DUMMY_VIDEO_FOR_PREROLL&&!/\.webm$/.test(m.getUrl())?(a.VideoRenderer._fw_playedDummyVideo=!0,a.debug("play dummy video for iOS 3.2-4.1"),h.src="http://127.0.0.1:1/404.mp4",h.load(),h.play(),h._fw_videoAdPlaying=!0,h.addEventListener("error",
	function(){event.target.removeEventListener("error",arguments.callee,!0);N()},!0),setTimeout(N,a.PLATFORM_NOT_WAIT_FOR_ERROR_WHEN_PLAY_DUMMY_VIDEO_FOR_PREROLL?500:5E3)):N()}}},stop:function(){a.debug("VideoRenderer stop");this._stopInvoked=!0;if(this._adVideo)this._adVideo._fw_videoAdPlaying=!1,this._adVideo.pause(),this.dispose()},info:function(){return{moduleType:a.MODULE_TYPE_RENDERER}},getPlayheadTime:function(){if(this._isEnded&&0<this._duration)return this._duration;if(this._adVideo){var a=
	this._adVideo.currentTime;if(0<a)return a}return this._playheadTime},getDuration:function(){return this._duration}};a.VideoRenderer.prototype.constructor=a.VideoRenderer;a.VideoStateExtension=function(a){this._context=a};a.VideoStateExtension.prototype={_enabled:function(){if(null==this._context)return!1;var b=this._context.getParameter(a.PARAMETER_EXTENSION_VIDEO_STATE_ENABLED);null==b&&(b="false");return!0===a.Util.str2bool(b)},start:function(){this._enabled()?this._context.setVideoState(a.VIDEO_STATE_PLAYING):
	a.log("VideoStateExtension is disabled.")},dispose:function(){this._context=null}};a.VideoStateExtension.prototype.constructor=a.VideoStateExtension;a.VPAIDWrapper=function(){this._creative=null;this._timeoutInMs=0;this._eventHandlers={};this._loadIntervalTimer=this._timeoutTimer=null;this._timeoutOperation="";this.timeoutReached=!1;this._visibilityChangeListener=null};a.VPAIDWrapper.prototype={_isCreativeFunctionInvokable:function(a){return!this._creative?!1:(a=this._creative[a])&&"function"==typeof a?
	!0:!1},checkVPAIDInterface:function(a){for(var c={passed:!0,missingInterfaces:""},d=a.length-1;0<=d;d--)if(!this._isCreativeFunctionInvokable(a[d]))c.passed=!1,c.missingInterfaces+=a[d]+" ";return c},loadCreativeAsset:function(b){a.log("loadCreativeAsset("+b+")");var c=document.getElementById("vpaidFrame"),d=document.createElement("iframe");d.id="vpaidFrame";null==c?document.body.appendChild(d):document.body.replaceChild(d,c);d.width=0;d.height=0;d.style.display="none";d.contentWindow.document.open();
	d.contentWindow.document.write('<script type="text/javascript" src="'+b+'"> <\/script>');d.contentWindow.document.close();this._timeoutOperation="loadCreativeAsset";this._waitForTimeout();var f=this;this._loadIntervalTimer=setInterval(function(){var b=document.getElementById("vpaidFrame").contentWindow.getVPAIDAd;if(b&&"function"===typeof b)clearInterval(f._loadIntervalTimer),b=b(),"undefined"===typeof b?a.debug("getVPAIDAd() returns undefined value"):null===b?a.debug("getVPAIDAd() returns null"):
	(f._creative=b,f._eventHandlers.CreativeAssetLoaded())},200)},setCallbacksForCreative:function(a,c){for(var d in a)a.hasOwnProperty(d)&&this._creative.subscribe(a[d],d,c)},removeCallbacksForCreative:function(a){for(var c in a)a.hasOwnProperty(c)&&this._creative.unsubscribe(a[c],c)},handshakeVersion:function(b){a.log("VPAID Creative: handshakeVersion("+b+")");return this._creative.handshakeVersion(b)},initAd:function(b,c,d,f,g,h){a.log("VPAID Creative: initAd()");this._timeoutOperation="initAd";this._waitForTimeout();
	this._creative.initAd(b,c,d,f,g,h)},startAd:function(){a.log("VPAID Creative: startAd()");this._timeoutOperation="startAd";this._waitForTimeout();this._creative.startAd()},stopAd:function(){a.log("VPAID Creative: stopAd()");"startAd"===this._timeoutOperation?(clearTimeout(this._timeoutTimer),this._timeoutOperation="startAd and stopAd"):this._timeoutOperation+="stopAd";this._waitForTimeout();this._creative.stopAd()},canPauseAd:function(){return this._isCreativeFunctionInvokable("pauseAd")},canResumeAd:function(){return this._isCreativeFunctionInvokable("resumeAd")},
	canResizeAd:function(){return this._isCreativeFunctionInvokable("resizeAd")},pauseAd:function(){this.canPauseAd()&&(a.log("VPAID Creative: pauseAd()"),this._creative.pauseAd())},resumeAd:function(){this.canResumeAd()&&(a.log("VPAID Creative: resumeAd()"),this._creative.resumeAd())},resizeAd:function(b,c,d){this.canResizeAd()?(a.log("VPAID Creative: resizeAd()"),this._creative.resizeAd(b,c,d)):a.log("The creative is not able to resize")},getAdVolume:function(){return this._isCreativeFunctionInvokable("getAdVolume")?
	this._creative.getAdVolume():-1},getAdExpanded:function(){return this._isCreativeFunctionInvokable("getAdExpanded")?this._creative.getAdExpanded():!1},getAdRemainingTime:function(){return this._isCreativeFunctionInvokable("getAdRemainingTime")?this._creative.getAdRemainingTime():-1},getAdDuration:function(){return this._isCreativeFunctionInvokable("getAdDuration")?this._creative.getAdDuration():-1},getAdLinear:function(){return this._creative.getAdLinear()},getAdCompanions:function(){return this._isCreativeFunctionInvokable("getAdCompanions")?
	this._creative.getAdCompanions():""},setTimeoutValueInMs:function(a){this._timeoutInMs=a},cancelTimeoutEvent:function(){var a="startAd and stopAd"!==this._timeoutOperation;clearTimeout(this._timeoutTimer);if(!a){this._timeoutOperation="startAd";var c=this;setTimeout(function(){c._eventHandlers.timeout.call()},500)}},addEventListener:function(a,c){this._eventHandlers[a]=c},removeEventListener:function(a){this._eventHandlers[a]=null},_waitForTimeout:function(){a.log("Wait for "+this._timeoutOperation+
	" for "+this._timeoutInMs+"ms");if(this._eventHandlers.timeout){var b=this;this._timeoutTimer=setTimeout(function(){if(!b.timeoutReached)b.timeoutReached=!0;"startAd"===b._timeoutOperation?b.stopAd():("loadCreativeAsset"===b._timeoutOperation&&clearInterval(b._loadIntervalTimer),b._eventHandlers.timeout.call())},this._timeoutInMs)}},getTimeoutOperation:function(){return this._timeoutOperation}};a.VPAIDWrapper.prototype.constructor=a.VPAIDWrapper;a.VPAIDRenderer=function(){this.vpaidCreative=this.rendererController=
	null;this.vpaidVolume=this.vpaidDuration=-1;this.creativeEventCallbacks={};this.isMuted=!1;this.adPlaybackState="";this.creativeTimeoutDelayInMs=1E4;this.vpaidDesiredBitrate=268;this.vpaidViewmode="normal";this.playheadTime=0;this.videoBase=document.createElement("div");this.videoParent=null;this.SUPPORTED_CREATIVE_VPAID_VERSION_MIN=this.PLAYER_VPAID_VERSION=2};a.VPAIDRenderer.prototype={};a.VPAIDRenderer.prototype.constructor=a.VPAIDRenderer;a.VPAIDRenderer.VastCompanion=function(a,c,d,f){this._width=
	a;this._height=c;this._apiFramework=d;this._xmlNode=f};a.VPAIDRenderer.VastCompanion.prototype={getWidth:function(){return this._width},getHeight:function(){return this._height},_isValidResource:function(a,c){return"StaticResource"===a&&c["@attributes"].creativeType||"IFrameResource"===a&&c.value||"HTMLResource"===a&&c.value},hasValidRendtions:function(){for(var a in this._xmlNode)if(this._xmlNode.hasOwnProperty(a)&&("StaticResource"===a||"IFrameResource"===a||"HTMLResource"===a))for(var c=[].concat(this._xmlNode[a]),
	d=c.length-1;0<=d;d--)if(this._isValidResource(a,c[d]))return!0;return!1},translateToAdInstance:function(b){this._xmlNode.CompanionClickThrough&&b.setClickThroughUrl(a.EVENT_AD_CLICK,this._xmlNode.CompanionClickThrough.value);if(this._xmlNode.TrackingEvents){var c=this._xmlNode.TrackingEvents;if(c.Tracking){for(var c=[].concat(c.Tracking),d=[],f=c.length-1;0<=f;f--)"creativeView"===c[f]["@attributes"].event&&d.push(c[f].value);0<d.length&&b.addEventCallbackUrls(a.EVENT_AD_IMPRESSION,a.EVENT_TYPE_IMPRESSION,
	d)}}for(var g in this._xmlNode)if(this._xmlNode.hasOwnProperty(g)&&("StaticResource"===g||"IFrameResource"===g||"HTMLResource"===g)){c=[].concat(this._xmlNode[g]);for(f=c.length-1;0<=f;f--)if(this._isValidResource(g,c[f])){var d=c[f],h=b.addCreativeRendition();h.setWidth(this._width);h.setHeight(this._height);h.setCreativeApi("None");var i=h.addCreativeRenditionAsset("VPAIDAsset"+f,!0);i.setContentType("text/html_doc_lit_mobile");i.setMimeType("text/html");var k=b.getEventCallbackUrls(a.EVENT_AD_CLICK,
	a.EVENT_TYPE_CLICK)[0],j=g;"HTMLResource"===j?i.setContent(a.HTMLAdGenerator.wrapUnsafeHTML(d.value,b.getSlot().getCustomId(),this._width,this._height)):("IFrameResource"===j?creativeType="iframe":"StaticResource"===j&&(creativeType=this._xmlNode.creativeType),i.setContent(a.HTMLAdGenerator.generateAd(d.value,k,b.getSlot().getCustomId(),this._width,this._height,creativeType,i.getContentType())));a.debug("rendtion width: "+h.getWidth()+" height:"+h.getHeight()+" asset content:"+i.getContent())}}}};
	a.VPAIDRenderer.VastCompanion.prototype.constructor=a.VPAIDRenderer.VastCompanion;a.VPAIDRenderer.VastAdSelect=function(){};a.VPAIDRenderer.VastAdSelect.prototype={_getDeadSpaceRatio:function(b,c){var d=b.getWidth(),f=b.getHeight(),g=c.getWidth(),h=c.getHeight(),i=1;d<=g&&f<=h&&(i=1-d*f/(g*h));a.debug("computing dead space ratio ("+i+") for slot "+g+"x"+h+" and ad "+d+"x"+f);return i},matchAdsWithSlots:function(b,c){a.log("VPAIDRenderer: Matching ads with slots");for(var d=0;d<c.length;++d)c[d].matched=
	!1;for(var f=[],g=[],d=0;d<b.length;d++)for(var h=0;h<c.length;h++)g.push({ratio:this._getDeadSpaceRatio(b[d],c[h]),adIndex:d,slotIndex:h});g.sort(function(a,b){return a.ratio-b.ratio});for(d=0;d<g.length&&!(1==g[d].ratio);d++){var h=g[d],i=b[h.adIndex],k=c[h.slotIndex];if(!i.matched&&!k.matched)a.log("Winning ratio:"+h.ratio+" Winning ad:"+i.getWidth()+"x"+i.getHeight()+" for slot:"+k.getWidth()+"x"+k.getHeight()),f.push({ad:i,slot:k}),i.matched=!0,k.matched=!0}return f}};a.VPAIDRenderer.VastAdSelect.prototype.constructor=
	a.VPAIDRenderer.VastAdSelect;a.Util.mixin(a.VPAIDRenderer.prototype,{_failWithError:function(b,c){this.rendererController.handleStateTransition(a.RENDERER_STATE_FAILED,{errorModule:"VPAIDRenderer",errorCode:b,errorInfo:c});this.dispose()},onCreativeTimeout:function(){a.log("VPAIDRenderer: onCreativeTimeout()");var b=this.vpaidCreative.getTimeoutOperation();this._failWithError(a.ERROR_TIMEOUT,"loadCreativeAsset"!==b?"Creative function "+b+" timeout":"load creative asset timeout")},onAdVolumeChange:function(){a.log("VPAIDRenderer: onAdVolumeChange()");
	var b=this.vpaidCreative.getAdVolume();if(0>b||1<b)a.log("Invalid ad volume value");else if(this.isMuted&&2<100*b)this.isMuted=!1,this.rendererController.processEvent({name:a.EVENT_AD_UNMUTE});else if(!this.isMuted&&2>100*b)this.isMuted=!0,this.rendererController.processEvent({name:a.EVENT_AD_MUTE})},onAdExpandedChange:function(){a.log("VPAIDRenderer: onAdExpandedChange()");this.vpaidCreative.getAdExpanded()?this.rendererController.processEvent({name:a.EVENT_AD_EXPAND}):this.rendererController.processEvent({name:a.EVENT_AD_COLLAPSE})},
	onAdDurationChange:function(){a.log("VPAIDRenderer: onAdDurationChange(): duration changed to "+this.vpaidCreative.getAdDuration())},onAdClickThru:function(b,c,d){a.log("VPAIDRenderer: onAdClickThru() with url:"+b+" id:"+c+" playerHandles:"+d);c={name:tv.freewheel.SDK.EVENT_AD_CLICK,info:{}};c.info[a.INFO_KEY_SHOW_BROWSER]=!0===d;!0===d?b?(a.log("onAdClickThru(): open window with overrided url"),c.info[a.INFO_KEY_URL]=b):a.log("onAdClickThru(): open window with url booked in MRM UI or VAST clickthru url"):
	a.log("onAdClickThru(): send click tracking");this.rendererController.processEvent(c)},onCreativeAssetLoaded:function(){a.log("VPAIDRenderer: onCreativeAssetLoaded()");this.vpaidCreative.cancelTimeoutEvent();var b=this,c=function(){var c=b.vpaidCreative.handshakeVersion(b.PLAYER_VPAID_VERSION.toFixed(1));if(c){if(parseFloat(c)<b.SUPPORTED_CREATIVE_VPAID_VERSION_MIN)return b._failWithError(a.ERROR_INVALID_VALUE,"Only support creatives with VPAID version >= "+b.SUPPORTED_CREATIVE_VPAID_VERSION_MIN.toFixed(1)),
	!1}else return b._failWithError(a.ERROR_3P_COMPONENT,"Cannot get VPAID version from the creative"),!1;return!0};if(function(){var c=b.vpaidCreative.checkVPAIDInterface("handshakeVersion,initAd,startAd,stopAd,subscribe,unsubscribe,getAdLinear".split(","));c.passed||b._failWithError(a.ERROR_3P_COMPONENT,"Missing interfaces in the VPAID creative: "+c.missingInterfaces);return c.passed}()&&c()){(function(){if((param=b.rendererController.getParameter(a.PARAMETER_VPAID_CREATIVE_TIMEOUT_DELAY))&&0<Number(param))b.creativeTimeoutDelayInMs=
	Number(param);a.log("initParams(), creative timeout delay in miliseconds:"+b.creativeTimeoutDelayInMs);var c=parseFloat(b.rendererController.getParameter(a.PARAMETER_DESIRED_BITRATE));b.vpaidDesiredBitrate=0<c?c:b.vpaidDesiredBitrate;a.log("initParams(), desired bitrate: "+b.vpaidDesiredBitrate)})();b.creativeEventCallbacks={AdStarted:b.onAdStarted,AdStopped:b.onAdStopped,AdSkipped:b.onAdSkipped,AdLoaded:b.onAdLoaded,AdLinearChange:b.onAdLinearChange,AdSizeChange:b.onAdSizeChange,AdExpandedChange:b.onAdExpandedChange,
	AdDurationChange:b.onAdDurationChange,AdVolumeChange:b.onAdVolumeChange,AdImpression:b.onAdImpression,AdClickThru:b.onAdClickThru,AdVideoFirstQuartile:b.onAdVideoFirstQuartile,AdVideoMidpoint:b.onAdVideoMidpoint,AdVideoThirdQuartile:b.onAdVideoThirdQuartile,AdVideoComplete:b.onAdVideoComplete,AdUserAcceptInvitation:b.onAdUserAcceptInvitation,AdUserMinimize:b.onAdUserMinimize,AdUserClose:b.onAdUserClose,AdPaused:b.onAdPaused,AdPlaying:b.onAdResumed,AdError:b.onAdError,AdLog:b.onAdLog};b.vpaidCreative.setCallbacksForCreative(b.creativeEventCallbacks,
	b);this.rendererController.setCapability(a.EVENT_AD_QUARTILE,a.CAPABILITY_STATUS_ON);this.rendererController.setCapability(a.EVENT_AD_MUTE,a.CAPABILITY_STATUS_ON);this.rendererController.setCapability(a.EVENT_AD_EXPAND,a.CAPABILITY_STATUS_ON);this.rendererController.setCapability(a.EVENT_AD_PAUSE,a.CAPABILITY_STATUS_ON);this.rendererController.setCapability(a.EVENT_AD_CLOSE,a.CAPABILITY_STATUS_ON);this.rendererController.setCapability(a.EVENT_AD_MINIMIZE,a.CAPABILITY_STATUS_ON);this.rendererController.setCapability(a.EVENT_AD_ACCEPT_INVITATION,
	a.CAPABILITY_STATUS_ON);(c=this.rendition?this.rendition.getParameter("VPAID_creativeData"):null)&&(c=a.Util.trim(c));var c={AdParameters:c},d=this.rendererController.getAdInstance().getSlot();this.videoBase.style.width="0px";this.videoBase.style.height="0px";this.videoBase.style.zIndex="100000";this.videoBase.style.position="absolute";this.videoBase.style.left=this.rendererController.getContentVideoElement().style.left;this.videoBase.style.top=this.rendererController.getContentVideoElement().style.top;
	this.videoParent=d.getBase();var f=this.rendererController.getContentVideoElement();if("nodeType"in f&&0<f.nodeType)try{this.videoParent.insertBefore(this.videoBase,this.rendererController.getContentVideoElement())}catch(g){this.videoParent.insertBefore(this.videoBase,this.videoParent.firstChild)}else this.videoParent.insertBefore(this.videoBase,this.videoParent.firstChild);var f={slot:this.videoBase,videoSlot:this.rendererController.getContentVideoElement(),videoSlotCanAutoPlay:!0},h=d.getWidth(),
	d=d.getHeight();if((!h||!d)&&this.rendition)h=this.rendition.getWidth,d=this.rendition.getHeight;this.vpaidCreative.initAd(h,d,this.vpaidViewmode,this.vpaidDesiredBitrate,c,f)}},onAdLoaded:function(){a.log("VPAIDRenderer: onAdLoaded()");this.vpaidCreative.cancelTimeoutEvent();a.log("Ad duration:"+this.getDuration());var b=this,c=function(c,d){a.debug(d.length+" companion slots to fill.");if(!(0===d.length||0===c.length)){var h=(new a.VPAIDRenderer.VastAdSelect).matchAdsWithSlots(c,d);if(0!==h.length){for(var c=
	[],d=[],i=h.length-1;0<=i;i--)c.push(h[i].ad),d.push(h[i].slot);h=b.rendererController.scheduleAdInstances(d);for(i=h.length-1;0<=i;i--)c[i].translateToAdInstance(h[i])}}},d=function(b){if(!b)return a.log("The adCompanions property is empty."),null;a.log("parsing adCompanions: "+b);xmlDoc=null;window.DOMParser?xmlDoc=(new DOMParser).parseFromString(b,"text/xml"):(xmlDoc=new ActiveXObject("Microsoft.XMLDOM"),xmlDoc.async=!1,xmlDoc.loadXML(b));b=a.Util.xmlToJson(xmlDoc);if(!b||!b.CompanionAds||!b.CompanionAds.Companion)return a.log("No companion ads found in parsed xml"),
	[];for(var b=[].concat(b.CompanionAds.Companion),c=[],d=b.length-1;0<=d;d--){var i=b[d];if(i["@attributes"]){var k=i["@attributes"].width,j=i["@attributes"].height;if(!k||!j||0>k||0>j)a.log("Missing width/height for companion.");else{var m=i["@attributes"].apiFramework||"";a.debug("Companion "+k+"x"+j+" api:"+m);i=new a.VPAIDRenderer.VastCompanion(k,j,m,i);i.hasValidRendtions()&&c.push(i)}}}return c}(b.vpaidCreative.getAdCompanions());d&&0<d.length?c(d,this.rendererController.getCompanionSlots()):
	a.log("VPAIDAdRenderer: No companions from VPAID creative.");this.vpaidCreative.startAd()},onVisibilityChange:function(){a.log("onVisibilityChange:"+(document.hidden?"invisible":"visible"));a.log("Current playback state:"+this.adPlaybackState);if(document.hidden&&"playing"==this.adPlaybackState)a.log("Pause the VPAID creative"),this.adPlaybackState="pausing",this.vpaidCreative.pauseAd();else if(!document.hidden&&("paused"==this.adPlaybackState||8>a.PLATFORM_IOS_VERSION))a.log("Resume the VPAID creative"),
	this.adPlaybackState="resuming",this.vpaidCreative.resumeAd()},onAdStarted:function(){a.log("VPAIDRenderer: onAdStarted()");if(this.vpaidCreative.timeoutReached)a.log("VPAID ad has already failed due to timeout. The AdStarted event will not be handled.");else if(this.vpaidCreative.cancelTimeoutEvent(),7<=a.PLATFORM_IOS_VERSION||4.4<=a.PLATFORM_ANDROID_VERSION)this._visibilityChangeListener=this.onVisibilityChange.bind(this),document.addEventListener("visibilitychange",this._visibilityChangeListener,
	!1)},onAdStopped:function(){a.log("VPAIDRenderer: onAdStopped()");this.vpaidCreative.cancelTimeoutEvent();this.timePositionClass===a.TIME_POSITION_CLASS_OVERLAY&&this.vpaidCreative.getAdLinear()&&this.rendererController.requestContentStateChange(!1);this.vpaidCreative&&!this.vpaidCreative.timeoutReached&&(this.rendererController.handleStateTransition(a.RENDERER_STATE_COMPLETED),this.dispose())},onAdImpression:function(){a.log("VPAIDRenderer: onAdImpression()");if(this.vpaidCreative.timeoutReached)a.log("VPAID ad has already failed due to timeout. The AdImpression event will not be handled.");
	else{var b=this.vpaidCreative.getAdVolume();this.isMuted=0<b&&2>=100*b;this.adPlaybackState="playing";this.rendererController.handleStateTransition(a.RENDERER_STATE_STARTED)}},onAdLinearChange:function(){a.log("VPAIDRenderer: onAdLinearChange()");var b=this.vpaidCreative.getAdLinear();b?a.log("onAdLinearChange(): non-linear click to linear -> request content video to pause"):a.log("onAdLinearChange(): linear back to non-linear -> request content video to resume");this.rendererController.requestContentStateChange(b)},
	onAdSizeChange:function(){a.log("VPAIDRenderer: onAdSizeChange()")},onAdPaused:function(){a.log("VPAIDRenderer: onAdPaused()");"playing"===this.adPlaybackState&&this.rendererController.processEvent({name:a.EVENT_AD_PAUSE});this.adPlaybackState="paused"},onAdResumed:function(){a.log("VPAIDRenderer: onAdResumed()");"paused"===this.adPlaybackState&&this.rendererController.processEvent({name:a.EVENT_AD_RESUME});this.adPlaybackState="playing"},onAdSkipped:function(){a.log("VPAIDRenderer: onAdSkipped()");
	this.dispose();this.rendererController.handleStateTransition(a.RENDERER_STATE_COMPLETED)},onAdVideoFirstQuartile:function(){a.log("VPAIDRenderer: onAdVideoFirstQuartile()");this.rendererController.processEvent({name:a.EVENT_AD_FIRST_QUARTILE})},onAdVideoMidpoint:function(){a.log("VPAIDRenderer: onAdVideoMidpoint()");this.rendererController.processEvent({name:a.EVENT_AD_MIDPOINT})},onAdVideoThirdQuartile:function(){a.log("VPAIDRenderer: onAdVideoThirdQuartile()");this.rendererController.processEvent({name:a.EVENT_AD_THIRD_QUARTILE})},
	onAdVideoComplete:function(){a.log("VPAIDRenderer: onAdVideoComplete");this.rendererController.processEvent({name:a.EVENT_AD_COMPLETE})},onAdUserAcceptInvitation:function(){a.log("VPAIDRenderer: onAdUserAcceptInvitation()");this.rendererController.processEvent({name:a.EVENT_AD_ACCEPT_INVITATION})},onAdUserClose:function(){a.log("VPAIDRenderer: onAdUserClose()");this.rendererController.processEvent({name:a.EVENT_AD_CLOSE})},onAdUserMinimize:function(){a.log("VPAIDRenderer: onAdUserMinimize()");this.rendererController.processEvent({name:a.EVENT_AD_MINIMIZE})},
	onAdLog:function(b){a.log("VPAIDRenderer: onAdLog: "+b)},onAdError:function(b){a.log("VPAIDRenderer: onAdError(): "+b);this._failWithError(a.ERROR_3P_COMPONENT,"AdError event:"+b)},start:function(b){var d;a.log("VPAIDRenderer start()");this.rendererController=b;this.timePositionClass=b.getAdInstance().getSlot().getTimePositionClass();if(b=(d=(this.rendition=b.getAdInstance().getActiveCreativeRendition())?this.rendition.getPrimaryCreativeRenditionAsset():null,b=d)?b.getUrl():null){this.vpaidCreative=
	new a.VPAIDWrapper;this.vpaidCreative.setTimeoutValueInMs(this.creativeTimeoutDelayInMs);this.vpaidCreative.addEventListener("timeout",this.onCreativeTimeout.bind(this));this.vpaidCreative.addEventListener("CreativeAssetLoaded",this.onCreativeAssetLoaded.bind(this));try{this.vpaidCreative.loadCreativeAsset(b)}catch(c){this._failWithError(a.ERROR_IO,c)}}else this._failWithError(a.ERROR_NULL_ASSET,"Creative asset url cannot be null")},stop:function(){a.log("VPAIDRenderer stop()");this.vpaidCreative.stopAd()},
	info:function(){return{moduleType:a.MODULE_TYPE_RENDERER}},getPlayheadTime:function(){var a=this.vpaidCreative.getAdDuration(),c=this.vpaidCreative.getAdRemainingTime();if(0<=a&&0<=c)this.playheadTime=a-c;if(0>this.playheadTime)this.playheadTime=-1;return this.playheadTime},getDuration:function(){var a=this.vpaidCreative.getAdDuration();return 0<=a?a:-1},pause:function(){a.log("VPAIDRenderer pause()");this.rendererController.processEvent({name:a.EVENT_AD_PAUSE});if(this.vpaidCreative.canPauseAd()){if("playing"==
	this.vpaidCreative.adPlaybackState)this.adPlaybackState="pausing",this.vpaidCreative.pauseAd()}else a.log("The creative is not able to pause")},resume:function(){a.log("VPAIDRenderer resume()");this.rendererController.processEvent({name:a.EVENT_AD_RESUME});if(this.vpaidCreative.canResumeAd()){if("paused"==this.vpaidCreative.adPlaybackState)this.adPlaybackState="resuming",this.vpaidCreative.resumeAd()}else a.log("The creative is not able to resume")},dispose:function(){a.log("VPAIDRenderer dispose()");
	if(this.vpaidCreative){if(this.videoParent)this.videoParent.removeChild(this.videoBase),this.videoParent=null;this._visibilityChangeListener&&(a.log("remove visibilitychange listener"),document.removeEventListener("visibilitychange",this._visibilityChangeListener,!1));this.vpaidCreative.removeCallbacksForCreative(this.creativeEventCallbacks);this.vpaidCreative.removeEventListener("timeout");this.vpaidCreative=null}},resize:function(){a.log("VPAIDAdRenderer resize()");var b=this.rendererController.getAdInstance().getSlot(),
	c=b.getWidth(),b=b.getHeight();a.log("VPAIDRenderer new size width:"+c+" height:"+b);this.vpaidCreative.resizeAd(c,b,this.vpaidViewmode)}});return a};if(!u.tv.freewheel.SDK)u.tv.freewheel.SDK=u.tv.freewheel[Q]("tv.freewheel.SDK");return u})();


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	/*
	H5P Release v0.5.23
	Built with CoffeeScript Compiler v1.10.0
	VIACOM International Media
	 */

	(function() {
	  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    slice = [].slice,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  $.H5P = {};

	  $.H5P.Base = (function() {
	    function Base(debug1) {
	      this.debug = debug1;
	      this.warn = bind(this.warn, this);
	      this.log = bind(this.log, this);
	      this["throw"] = bind(this["throw"], this);
	      if (!this.pubChannels) {
	        this.pubChannels = {};
	      }
	    }

	    Base.prototype["throw"] = function() {
	      var name, options, ref;
	      name = arguments[0], options = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      this.e = new Error((ref = this.devErrors)[name].apply(ref, options));
	      this.e.name = name;
	      this.handled = this.publish('error', this.e);
	      this.warn(this.e);
	      return this.e;
	    };

	    Base.prototype.subscribe = function(name, callback) {
	      if (this.pubChannels[name] == null) {
	        this.pubChannels[name] = [];
	      }
	      this.pubChannels[name].push({
	        context: this,
	        callback: callback
	      });
	      return this;
	    };

	    Base.prototype.unsubscribe = function(name, callback) {
	      var i, j, len, ref, results, sub;
	      if (this.pubChannels[name] != null) {
	        ref = this.pubChannels[name];
	        results = [];
	        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	          sub = ref[i];
	          if (sub.callback === callback) {
	            results.push(this.pubChannels[name].splice(i, 1));
	          } else {
	            results.push(void 0);
	          }
	        }
	        return results;
	      }
	    };

	    Base.prototype.log = function() {
	      var args;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      if (this.debug) {
	        return console.log.apply(console, args);
	      }
	    };

	    Base.prototype.warn = function() {
	      var args;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      if (this.debug) {
	        if (console.warn) {
	          return console.warn.apply(console, args);
	        } else {
	          return console.log.apply(console, args);
	        }
	      }
	    };

	    Base.prototype.publish = function() {
	      var data, j, len, name, ref, sub;
	      name = arguments[0], data = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      if (this.pubChannels && this.pubChannels[name] && this.pubChannels[name].length > 0) {
	        ref = this.pubChannels[name];
	        for (j = 0, len = ref.length; j < len; j++) {
	          sub = ref[j];
	          sub.callback.apply(sub.context, data);
	        }
	        return true;
	      } else {
	        return false;
	      }
	    };

	    Base.prototype.devErrors = {
	      AdLibraryError: function() {
	        return 'You are trying to setup ads but no Freewheel ad library has been found.';
	      },
	      ApiError: function(error) {
	        return "There's been a problem with one of our APIs. Original error: " + error;
	      },
	      ConfigLoadError: function() {
	        return 'Could not load configuration via ajax.';
	      },
	      ConfigNotYetLoaded: function() {
	        return 'You are trying to load a stream but the config is not loaded yet.';
	      },
	      InvalidContainer: function() {
	        return 'The player must be initialized with a jquery object or selector string.';
	      },
	      NoBlankVideoSet: function() {
	        return 'No blank video has been set';
	      },
	      NoConfigSet: function() {
	        return 'A config url or object is required.';
	      },
	      NoContainerMatches: function() {
	        return 'The specified container does not exist.';
	      },
	      NoRenditionAvailable: function() {
	        return "No rendition is available for the selected video";
	      },
	      NoSuchSetting: function(name) {
	        return "There is no setting named " + name;
	      },
	      TooManyContainerMatches: function() {
	        return 'There must be exactly one element to be used as container.';
	      },
	      VideoNetworkError: function(text) {
	        return text;
	      },
	      VideoTypeNotRecognized: function() {
	        return 'The video type provided is not recognized.';
	      }
	    };

	    return Base;

	  })();

	  $.H5P.Player = (function(superClass) {
	    extend(Player, superClass);

	    Player.prototype.timers = {};

	    function Player(container, startSettings, customVideoAttributes, debug) {
	      var error, error1, tracking_enabled, videoAttributes;
	      if (startSettings == null) {
	        startSettings = null;
	      }
	      if (customVideoAttributes == null) {
	        customVideoAttributes = {};
	      }
	      if (debug == null) {
	        debug = false;
	      }
	      this["throw"] = bind(this["throw"], this);
	      this.track = bind(this.track, this);
	      this.invokeAd = bind(this.invokeAd, this);
	      this.setPoster = bind(this.setPoster, this);
	      this.detectSmartTV = bind(this.detectSmartTV, this);
	      this.sendBeacon = bind(this.sendBeacon, this);
	      this.videoEnded = bind(this.videoEnded, this);
	      this.resetSrc = bind(this.resetSrc, this);
	      this.adRollFinished = bind(this.adRollFinished, this);
	      this.attachVideoEvents = bind(this.attachVideoEvents, this);
	      this.getCurrentSegment = bind(this.getCurrentSegment, this);
	      this.adsEnabledForCurrentVideo = bind(this.adsEnabledForCurrentVideo, this);
	      this._playSegment = bind(this._playSegment, this);
	      this.playCurrentVideo = bind(this.playCurrentVideo, this);
	      this.initializeLogs = bind(this.initializeLogs, this);
	      this.initializeAds = bind(this.initializeAds, this);
	      this.initializeContainer = bind(this.initializeContainer, this);
	      this.isValidContainer = bind(this.isValidContainer, this);
	      this.destroy = bind(this.destroy, this);
	      Player.__super__.constructor.call(this, debug);
	      this.video = null;
	      this.token = null;
	      this.mobileOs = this.detectMobileOs();
	      this.smartTV = this.detectSmartTV();
	      videoAttributes = $.extend({
	        controls: true
	      }, customVideoAttributes);
	      videoAttributes.src = startSettings.blankVideo;
	      this.initializeContainer(container, videoAttributes);
	      this.settings = new $.H5P.Settings;
	      this.optionsCache = new $.H5P.OptionsCache();
	      this.settings.loadInitial(startSettings, this);
	      this.postMidrollTimePosition;
	      tracking_enabled = this.settings.get('reporting', 'enabled') === 'true' || (typeof (this.settings.get('reporting', 'enabled')) === 'boolean' && this.settings.get('reporting', 'enabled').toString() === 'true');
	      if (tracking_enabled) {
	        this.tracking = new $.H5P.Tracking(this, this.debug);
	        this.tracking.subscribe('track', (function(_this) {
	          return function(value) {
	            return _this.publish('track', value);
	          };
	        })(this));
	      } else {
	        console.log('H5P tracking disabled!');
	      }
	      this.initializeLogs();
	      this.initializeAds();
	      this.previousTime = 0;
	      this.seekingDestination = -1;
	      if (this.settings.get('image') != null) {
	        this.setPoster(this.settings.get('image'));
	      }
	      this.log('mobileOs:', this.mobileOs);
	      this.log('smartTV:', this.smartTV);
	      setTimeout((function(_this) {
	        return function() {
	          return _this.publish('ready');
	        };
	      })(this), 100);
	      if (this.smartTV === 'Chromecast') {
	        this.rewriteForChromecast();
	      }
	      try {
	        document.cookie = "_L1Nl9uK_DJGt_RDAVBq_=_L1Nl9uK_DJGt_RDAVBq_; domain=.mtvplay.tv";
	      } catch (error1) {
	        error = error1;
	        this.warn(error);
	      }
	    }

	    Player.prototype.destroy = function() {
	      var call, error, error1, j, key, len, ref, ref1, timer;
	      this.video.pause();
	      this.video.src = '';
	      $(this.video).empty();
	      $(this.video).remove();
	      if (this.ads != null) {
	        this.ads.destroy();
	      }
	      delete this.settings;
	      delete this.ads;
	      ref = this.timers;
	      for (key in ref) {
	        timer = ref[key];
	        clearInterval(timer);
	      }
	      this.pubChannels = [];
	      ref1 = this.optionsCache.apiCalls;
	      for (j = 0, len = ref1.length; j < len; j++) {
	        call = ref1[j];
	        try {
	          call.abort;
	          call = null;
	        } catch (error1) {
	          error = error1;
	          this.warn("Error clearing API calls", error, call);
	          false;
	        }
	      }
	      this.optionsCache.apiCalls = [];
	      return true;
	    };

	    Player.prototype.isValidContainer = function(sel) {
	      var e, error1;
	      if (this.container.length < 1) {
	        this["throw"]('NoContainerMatches');
	      }
	      if (this.container.length > 1) {
	        this["throw"]('TooManyContainerMatches');
	      }
	      try {
	        return this.container[0] instanceof Element;
	      } catch (error1) {
	        e = error1;
	        return false;
	      }
	    };

	    Player.prototype.initializeContainer = function(container, videoAttributes) {
	      if (typeof (this.container = container) === 'string') {
	        this.container = $(container);
	      } else if (typeof container === 'object' && container.hasOwnProperty('selector')) {
	        this.container = $(container.selector);
	      }
	      if (!this.isValidContainer(this.container)) {
	        this["throw"]('InvalidContainer');
	      }
	      if (!this.container[0].id) {
	        this.container[0].id = "video-container-" + (Date.now());
	      }
	      this.container.html("<video>");
	      this.video = this.container.find('video')[0];
	      $(document.body).one('click', (function(_this) {
	        return function() {
	          if (_this.video.src.indexOf(videoAttributes.src) > -1) {
	            _this.video.play();
	            return _this.video.pause();
	          }
	        };
	      })(this));
	      $(this.video).attr(videoAttributes);
	      this.video.play();
	      this.video.pause();
	      this.attachFullscreenEvents();
	      return this.container;
	    };

	    Player.prototype.initializeAds = function() {
	      var adSettings, e, enabled, error1;
	      try {
	        adSettings = this.settings.get('ads');
	      } catch (error1) {
	        e = error1;
	        return;
	      }
	      enabled = !!adSettings.enabled;
	      if (enabled && !this.ads) {
	        this.ads = new $.H5P.ads[adSettings.engine](this);
	        return this.adCountdown = new $.H5P.AdCountdown(this);
	      }
	    };

	    Player.prototype.initializeLogs = function() {
	      var logger, oldLog, oldWarn;
	      logger = this.settings.get('logger');
	      if (typeof logger === "function") {
	        oldLog = this.log;
	        oldWarn = this.warn;
	        this.log = function() {
	          var args, preserveReturn;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          preserveReturn = oldLog.apply(this, arguments);
	          logger.apply(this, arguments);
	          return preserveReturn;
	        };
	        this.warn = function() {
	          var args, preserveReturn;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          preserveReturn = oldWarn.apply(this, arguments);
	          logger.apply(this, arguments);
	          return preserveReturn;
	        };
	        this.log("Successfully registered logger provided with settings");
	        return true;
	      } else {
	        if (logger != null) {
	          this.warn("Failed to register logger, not a function!");
	        }
	        return false;
	      }
	    };

	    Player.prototype.playCurrentVideo = function(options) {
	      var duration, error, error1, startTime;
	      if (options == null) {
	        options = {};
	      }
	      this.videoEndedCalled = false;
	      this.log('playCurrentVideo', options);
	      this.tracked25 = this.tracked50 = this.tracked75 = this.tracked95 = false;
	      if (this.optionsCache.ongoingApiCall()) {
	        this.optionsCache.cacheOptions(options);
	        return;
	      }
	      if (this.adCountdown) {
	        this.adCountdown.hide();
	      }
	      this._playSegment(this.currentVideo.playedSegments);
	      $(this.video).one('canplay', (function(_this) {
	        return function() {
	          return _this.track('video:content:loaded', _this.token);
	        };
	      })(this));
	      duration = (typeof this.getCurrentSegment === "function" ? this.getCurrentSegment().duration : void 0) != null;
	      startTime = 0;
	      if (options.startTime && parseFloat(options.startTime) !== 0) {
	        startTime = options.startTime;
	      }
	      if (this.currentVideo.playedSegments > 0 && (this.tracking != null)) {
	        try {
	          this.tracking.pageName = $(this.tracking.titles[this.currentVideo.playedSegments]).text();
	          this.tracking.franchise = $(this.tracking.franchises[this.currentVideo.playedSegments]).text();
	        } catch (error1) {
	          error = error1;
	          this.warn('error parsing mrss', error);
	        }
	      }
	      this.attachVideoEvents();
	      if (this.adsEnabledForCurrentVideo() && (this.ads != null) && !this.ads.adblocked) {
	        return this.ads.requestAds().then((function(_this) {
	          return function() {
	            if (options.secondScreen && startTime > 0) {
	              return _this.adRollFinished(0, startTime);
	            } else {
	              return _this.playSlots(0, startTime);
	            }
	          };
	        })(this));
	      } else {
	        return this.adRollFinished(0, startTime);
	      }
	    };

	    Player.prototype._playSegment = function(index) {
	      var nextUp;
	      this.currentVideo.playedSegments = index;
	      nextUp = this.getCurrentSegment();
	      if (!nextUp) {
	        return;
	      }
	      this.log("playSegment", index, nextUp.src);
	      if (nextUp.src !== this.currentSrc()) {
	        return this.updateSrc(nextUp.src);
	      }
	    };

	    Player.prototype.adsEnabledForCurrentVideo = function() {
	      return this.settings.get('ads').enabled;
	    };

	    Player.prototype.getCurrentSegment = function() {
	      return this.currentVideo.segments[this.currentVideo.playedSegments];
	    };

	    Player.prototype.attachVideoEvents = function() {
	      var timeUpdateCallback;
	      if (this.eventsAdded) {
	        return;
	      }
	      this.eventsAdded = true;
	      this.log("attachVideoEvents");
	      timeUpdateCallback = (function(_this) {
	        return function(e) {
	          var beacons, currentTime, duration, segment;
	          if ((_this.ads != null) && _this.ads.adsPlaying) {
	            return;
	          }
	          currentTime = _this._getCurrentTime();
	          _this.publish('timeElapsed', {
	            time: currentTime,
	            currentVideo: _this.currentVideo
	          });
	          segment = _this.getCurrentSegment();
	          if (!segment) {
	            return;
	          }
	          duration = parseFloat(segment.duration) - 1.5;
	          if (currentTime > duration * .25 && !_this.tracked25) {
	            _this.tracked25 = true;
	            _this.track('video:content:firstQuartile', _this.token);
	          } else if (currentTime > duration * .50 && !_this.tracked50) {
	            _this.tracked50 = true;
	            _this.track('video:content:midpoint', _this.token);
	          } else if (currentTime > duration * .75 && !_this.tracked75) {
	            _this.tracked75 = true;
	            _this.track('video:content:thirdQuartile', _this.token);
	          } else if (currentTime > duration * .95 && !_this.tracked95) {
	            _this.tracked95 = true;
	            _this.track('video:content:nearend', _this.token);
	          }
	          beacons = segment.beacons;
	          if (beacons[0] && beacons[0].elapsed < currentTime) {
	            _this.sendBeacon(beacons.shift());
	          }
	          if (currentTime >= _this.seekingDestination) {
	            _this.seekingDestination = -1;
	          } else {
	            return;
	          }
	          if ((_this.ads != null) && _this.ads.hasAppropriateRoll(_this.previousTime, currentTime)) {
	            _this.playSlots(_this.previousTime, currentTime);
	          }
	          return _this.previousTime = currentTime;
	        };
	      })(this);
	      $(this.video).on('timeupdate', timeUpdateCallback);
	      $(this.video).trigger('timeupdate');
	      $(this.video).on('ended', this.videoEnded);
	      $(this.video).one('playing', (function(_this) {
	        return function() {
	          _this.publish('playback:started', _this.currentVideo);
	          $(_this.video).on('play', function() {
	            return _this.track('video:ui:play', _this.currentVideo);
	          });
	          return $(_this.video).on('pause', function() {
	            return _this.track('video:ui:pause', _this.currentVideo);
	          });
	        };
	      })(this));
	      return $(this.video).on('seeked', (function(_this) {
	        return function() {
	          _this.track('video:content:seek', _this.currentVideo);
	          return _this.track('video:content:resume', _this.currentVideo);
	        };
	      })(this));
	    };

	    Player.prototype._getCurrentTime = function() {
	      return this.video.currentTime;
	    };

	    Player.prototype.getDuration = function() {
	      return this.video.duration;
	    };

	    Player.prototype.playSlots = function(previousTime, currentTime) {
	      return this.ads.playAppropriateRoll(previousTime, currentTime).then((function(_this) {
	        return function() {
	          return _this.adRollFinished(previousTime, currentTime);
	        };
	      })(this));
	    };

	    Player.prototype.adRollFinished = function(previousTime, currentTime) {
	      this.previousTime = currentTime;
	      if (previousTime === 0) {
	        $(this.video).one('playing', (function(_this) {
	          return function() {
	            if (_this.currentVideo.playedSegments === 0) {
	              _this.publish('contentPlayback:started', _this.currentVideo);
	            }
	            _this.publish('segmentPlayback:started', _this.currentVideo);
	            return _this.track('video:content:started', _this.token);
	          };
	        })(this));
	      }
	      if (currentTime === Infinity) {
	        return this.publish('playback:ended', this.currentVideo);
	      } else {
	        if (currentTime > 0) {
	          this.skipToByTime(currentTime);
	        }
	        return this.video.play();
	      }
	    };

	    Player.prototype.resetSrc = function() {
	      return this.updateSrc(this.getCurrentSegment().src);
	    };

	    Player.prototype.videoEnded = function() {
	      if (this.videoEndedCalled || ((this.ads != null) && this.ads.adsPlaying)) {
	        return;
	      }
	      this.videoEndedCalled = true;
	      this.eventsAdded = false;
	      this.log("videoEnded", this.currentVideo.segments.length, this.currentVideo.playedSegments);
	      this.currentVideo.playedSegments += 1;
	      this.publish('segmentPlayback:ended', this.currentVideo);
	      if (this.currentVideo.segments.length > this.currentVideo.playedSegments) {
	        this.playCurrentVideo();
	        return;
	      }
	      if (this.currentVideo.type === 'simulcast_stream') {
	        return;
	      }
	      this.publish('contentPlayback:ended', this.currentVideo);
	      this.track('video:content:ended', this.token);
	      if (this.ads != null) {
	        return this.playSlots(this.previousTime, Infinity);
	      } else {
	        return this.adRollFinished(this.previousTime, Infinity);
	      }
	    };

	    Player.prototype.sendBeacon = function(beacon) {
	      this.log('sending beacon ' + beacon.url);
	      if (beacon.hasOwnProperty('url' && beacon.url !== "")) {
	        return this.container.append("<img src='" + beacon.url + "></img>'");
	      }
	    };

	    Player.prototype.detectMobileOs = function(userAgent) {
	      if (userAgent == null) {
	        userAgent = null;
	      }
	      userAgent = userAgent || navigator.userAgent || navigator.vendor || window.opera;
	      if (userAgent.match(/IEMobile/)) {
	        return "Windows";
	      } else if (userAgent.match(/Android/i)) {
	        return "Android";
	      } else if (userAgent.match(/(iPad|iPhone|iPod)/i)) {
	        return "iOS";
	      } else {
	        return false;
	      }
	    };

	    Player.prototype.detectSmartTV = function(userAgent) {
	      if (userAgent == null) {
	        userAgent = null;
	      }
	      this.log(userAgent || navigator.userAgent || navigator.vendor || window.opera);
	      userAgent = userAgent || navigator.userAgent || navigator.vendor || window.opera;
	      if (userAgent.match(/Web0S|Netcast/ig)) {
	        return "LG";
	      } else if (userAgent.match(/Smart|Maple/ig)) {
	        return "Samsung";
	      } else if (userAgent.indexOf('CrKey') !== -1) {
	        return "Chromecast";
	      } else {
	        return false;
	      }
	    };

	    Player.prototype.setPoster = function(src) {
	      return $(this.video).attr('poster', src);
	    };

	    Player.prototype.invokeAd = function() {
	      if (!this.ads) {
	        throw "Ads not available";
	      }
	      return this.ads.clickAd();
	    };

	    Player.prototype.track = function() {
	      var args, ref;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      console.log('track:', args[0]);
	      if (this.tracking != null) {
	        return (ref = this.tracking).track.apply(ref, args);
	      }
	    };

	    Player.prototype.subscribe = function(name, callback) {
	      if ((this.ads != null) && name.slice(0, 4) === "ads:") {
	        return this.ads.subscribe(name, callback);
	      } else {
	        return Player.__super__.subscribe.call(this, name, callback);
	      }
	    };

	    Player.prototype.unsubscribe = function(name, callback) {
	      if ((this.ads != null) && name.slice(0, 4) === "ads:") {
	        return this.ads.unsubscribe(name, callback);
	      } else {
	        return Player.__super__.unsubscribe.call(this, name, callback);
	      }
	    };

	    Player.prototype["throw"] = function() {
	      var name, options;
	      name = arguments[0], options = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      Player.__super__["throw"].apply(this, [name].concat(slice.call(options)));
	      this.track('video:error', this.token, {
	        message: this.e.message
	      });
	      throw this.e;
	      return this.e;
	    };

	    return Player;

	  })($.H5P.Base);

	  $.H5P.Player.prototype.rewriteForChromecast = function() {
	    if (!(window.cast.player != null)) {
	      console.log("This appears to be a Chromecast, but there does not seem to be a Media Player Library. Without it, videos will not play reliably. To learn more, have a look at: https://developers.google.com/cast/docs/player.");
	      return;
	    }
	    console.log("Replacing video element proxy methods w/ Chromecast alternatives");
	    $.H5P.Player.prototype.currentSrc = function() {
	      return this.currentSource;
	    };
	    $.H5P.Player.prototype.updateSrc = function(value) {
	      var host, initStart, protocol, url;
	      this.currentSource = value;
	      url = value;
	      host = new cast.player.api.Host({
	        'mediaElement': this.video,
	        'url': url
	      });
	      initStart = 0;
	      protocol = null;
	      this.video.autoplay = true;
	      if (url.lastIndexOf('.m3u8') >= 0) {
	        protocol = cast.player.api.CreateHlsStreamingProtocol(host);
	      } else if (url.lastIndexOf('.mpd') >= 0) {
	        protocol = cast.player.api.CreateDashStreamingProtocol(host);
	      } else if (url.indexOf('.ism/') >= 0) {
	        protocol = cast.player.api.CreateSmoothStreamingProtocol(host);
	      }
	      host.onError = function(errorCode) {
	        this.warn("Error in Chromecast playback (" + errorCode + ")- resetting cast.player.api.Player instance");
	        if (this.chromecastPlayer) {
	          this.chromecastPlayer.unload();
	          this.chromecastPlayer = null;
	        }
	      };
	      if (protocol !== null) {
	        this.chromecastPlayer = new cast.player.api.Player(host);
	        return this.chromecastPlayer.load(protocol, initStart);
	      } else {
	        this.warn("Chromecast does not currently play this. For best results, use HLS.");
	        return this.defaultOnLoad(event);
	      }
	    };
	  };

	  $.H5P.Player.prototype.requestFullscreen = function() {
	    var e, error1, error2;
	    try {
	      if (this.video.webkitEnterFullscreen) {
	        try {
	          this.video.webkitEnterFullscreen();
	        } catch (error1) {
	          e = error1;
	          if (this.video.webkitRequestFullscreen) {
	            this.video.webkitRequestFullscreen();
	          }
	        }
	        return this.track('video:ui:fullscreen', this.token);
	      } else if (this.video.requestFullscreen) {
	        this.video.requestFullscreen();
	        return this.track('video:ui:fullscreen', this.token);
	      } else if (this.video.msRequestFullscreen) {
	        this.video.msRequestFullscreen();
	        return this.track('video:ui:fullscreen', this.token);
	      } else if (this.video.mozRequestFullScreen) {
	        this.video.mozRequestFullScreen();
	        return this.track('video:ui:fullscreen', this.token);
	      } else if (this.video.webkitRequestFullscreen) {
	        this.video.webkitRequestFullscreen();
	        return this.track('video:ui:fullscreen', this.token);
	      } else {
	        return this["throw"]("Could not invoke fullscreen");
	      }
	    } catch (error2) {
	      e = error2;
	      return this.warn('FullScreen is not supported', e);
	    }
	  };

	  $.H5P.Player.prototype.exitFullscreen = function() {
	    var fullscreenMethod;
	    fullscreenMethod = document.webkitExitFullscreen || document.mozCancelFullscreen || document.exitFullscreen;
	    if (fullscreenMethod) {
	      return fullscreenMethod();
	    } else if (this.video.webkitExitFullscreen) {
	      return this.video.webkitExitFullscreen();
	    } else {
	      return this.warn('FullScreen is not supported');
	    }
	  };

	  $.H5P.Player.prototype.attachFullscreenEvents = function() {
	    var fullscreenChange, fullscreenEnd, fullscreenStart;
	    fullscreenChange = (function(_this) {
	      return function(e) {
	        return _this.publish('fullscreenchange', _this.currentVideo);
	      };
	    })(this);
	    fullscreenEnd = (function(_this) {
	      return function(e) {
	        fullscreenChange(e);
	        return _this.publish('fullscreenend', _this.currentVideo);
	      };
	    })(this);
	    fullscreenStart = (function(_this) {
	      return function(e) {
	        fullscreenChange(e);
	        return _this.publish('fullscreenstart', _this.currentVideo);
	      };
	    })(this);
	    $(this.video).on('webkitendfullscreen', this.fullscreenEnded);
	    return $(this.video).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
	      var isFullScreen;
	      isFullScreen = document.webkitIsFullScreen || document.mozFullScreen || document.fullScreen;
	      if (isFullScreen) {
	        return fullscreenStart(e);
	      } else {
	        return fullscreenEnd(e);
	      }
	    });
	  };

	  $.H5P.Player.prototype.timeElapsedWithSegments = function() {
	    var i, previousSegmentsElapsedTime, result;
	    result = 0;
	    if (!((this.video != null) && (this.currentVideo != null) && (this.currentVideo.segments != null) && (this.currentVideo.segments[0] != null))) {
	      return result;
	    }
	    this.currentTime = (this.lastPositionSkippedTo != null) && Math.abs(this.lastPositionSkippedTo - this.video.currentTime) > 3 ? this.lastPositionSkippedTo : this.video.currentTime;
	    if (this.currentVideo.playedSegments > 0) {
	      previousSegmentsElapsedTime = 0;
	      i = 0;
	      while (i < this.currentVideo.playedSegments) {
	        previousSegmentsElapsedTime += this.currentVideo.segments[i++].duration;
	      }
	      result = previousSegmentsElapsedTime + this.currentTime;
	    } else {
	      result = this.currentTime;
	    }
	    if (this.previousTimeElapsed === result) {
	      this.previousTimeElapsed = result;
	      return this.lastPositionSkippedTo;
	    }
	    this.previousTimeElapsed = result;
	    return result;
	  };

	  $.H5P.Player.prototype.skipToByPercentage = function(skipValue) {
	    var ref;
	    this.log('skipToByPercentage', skipValue);
	    if (typeof skipValue !== 'number') {
	      skipValue = parseFloat(skipValue);
	    }
	    if (skipValue < 0 || skipValue > 1) {
	      this.warn('cannot seek to desired position', skipValue);
	      return;
	    }
	    if ((ref = this.ads) != null ? ref.adsPlaying : void 0) {
	      this.warn('cannot seek while playing ads', skipValue);
	      return;
	    }
	    return this._skipToWithoutSegments(this._getStartTimeFromSkipValue(skipValue));
	  };

	  $.H5P.Player.prototype.skipToByTime = function(skipValue) {
	    var ref;
	    this.log('skipTo', skipValue);
	    if (typeof skipValue !== 'number') {
	      skipValue = parseFloat(skipValue);
	    }
	    if (skipValue < 0) {
	      this.warn('cannot seek to desired position', skipValue);
	      return;
	    }
	    if ((ref = this.ads) != null ? ref.adsPlaying : void 0) {
	      this.warn('cannot seek while playing ads', skipValue);
	      return;
	    }
	    return this._skipToWithSegments(skipValue);
	  };

	  $.H5P.Player.prototype.skipTo = function(skipValue) {
	    this.warn('(deprecated) skipTo', skipValue);
	    if (typeof skipValue !== 'number') {
	      skipValue = parseFloat(skipValue);
	    }
	    if (skipValue < 1) {
	      return this.skipToByPercentage(skipValue);
	    } else {
	      return this.skipToByTime(skipValue);
	    }
	  };

	  $.H5P.Player.prototype._skipToWithSegments = function(timeIndex) {
	    var segment;
	    this.log('skipToWithSegments', timeIndex);
	    segment = 0;
	    if (this.currentVideo.segments[segment] == null) {
	      this.warn('cannot seek to desired position', timeIndex);
	      return;
	    }
	    while (timeIndex > this.currentVideo.segments[segment].duration) {
	      timeIndex -= this.currentVideo.segments[segment++].duration;
	      if (this.currentVideo.segments[segment] == null) {
	        this.warn('cannot seek to desired position, pausing video', timeIndex);
	        this.video.pause();
	        return;
	      }
	    }
	    this._playSegment(segment);
	    return this._skipToWithoutSegments(timeIndex);
	  };

	  $.H5P.Player.prototype._skipToWithoutSegments = function(skipValue) {
	    this.log('skipToWithoutSegments', skipValue);
	    if (typeof skipValue !== 'number') {
	      skipValue = parseFloat(skipValue);
	    }
	    if (!isNaN(skipValue)) {
	      return this._playFrom(skipValue);
	    }
	  };

	  $.H5P.Player.prototype._getStartTimeFromSkipValue = function(skipValue) {
	    if (skipValue > 0 && skipValue < 1) {
	      return Math.floor(this.getCurrentDuration() * skipValue);
	    } else {
	      return Math.floor(skipValue);
	    }
	  };

	  $.H5P.Player.prototype.getCurrentDuration = function() {
	    var e, error1;
	    try {
	      return this.video.duration || this.currentVideo.duration || this.currentVideo.segments[this.currentVideo.playedSegments].duration;
	    } catch (error1) {
	      e = error1;
	      return NaN;
	    }
	  };

	  $.H5P.Player.prototype.getDuration = function() {
	    this.log('getDuration');
	    if (!((this.currentVideo != null) && (this.currentVideo.segments != null))) {
	      this.warn('cannot compute duration');
	      return NaN;
	    }
	    return this.currentVideo.segments.reduce((function(prev, object) {
	      return prev + object.duration;
	    }), 0);
	  };

	  $.H5P.Player.prototype._playFrom = function(startTime) {
	    var events, play;
	    this.log('playFrom', startTime);
	    window.clearTimeout(this.timers['seekTimeout']);
	    this.lastPositionSkippedTo = startTime;
	    this.timers['seekTimeout'] = window.setTimeout(((function(_this) {
	      return function() {
	        return _this.lastPositionSkippedTo = null;
	      };
	    })(this)), 3000);
	    if (this.mobileOs === 'Android') {
	      events = 'canplay canplaythrough';
	    } else {
	      events = 'loadedmetadata loadeddata canplay canplaythrough';
	    }
	    play = (function(_this) {
	      return function() {
	        if (_this.video.readyState >= 1 && _this.videoSeekableAt(startTime)) {
	          _this.video.currentTime = startTime;
	          return $(_this.video).off(events, play);
	        }
	      };
	    })(this);
	    this.seekingDestination = startTime;
	    $(this.video).off(events, this.oldPlay);
	    $(this.video).on(events, play);
	    this.oldPlay = play;
	    return play();
	  };

	  $.H5P.Player.prototype.videoSeekableAt = function(time) {
	    var i, j, ref, ref1, timeRangesNum;
	    timeRangesNum = (ref = this.video.seekable) != null ? ref.length : void 0;
	    if (timeRangesNum) {
	      for (i = j = 0, ref1 = timeRangesNum - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
	        if (time >= this.video.seekable.start(i) && time < this.video.seekable.end(i)) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  $.H5P.Player.prototype.loadApiVideo = function(type, token, options, callback, smartTV, mrss) {
	    var _this, apiResponseCallback, callbackWhenLoaded, parsingCompleteCallback, videoSettingsUrl;
	    if (options == null) {
	      options = {};
	    }
	    if (smartTV == null) {
	      smartTV = null;
	    }
	    if (mrss == null) {
	      mrss = null;
	    }
	    this.log('loadApiVideo', type, token, options, callback, smartTV);
	    this.token = token;
	    if (options.image != null) {
	      this.setPoster(options.image);
	    }
	    if (typeof smartTV === 'boolean' || typeof smartTV === 'string') {
	      this.smartTV = smartTV;
	      if (smartTV) {
	        this.log('This was overridden to be considered a smartTV: ', smartTV);
	      } else {
	        this.log('This was overridden to not be considered a smartTV');
	      }
	    }
	    if (this.mobileOs === 'iOS') {
	      this.updateSrc(this.settings.get('blankVideo'));
	      this.video.play();
	    }
	    _this = this;
	    this.optionsCache.ongoingApiCall(true);
	    if ((this.tracking != null) && (this.tracking.omniture_enabled != null)) {
	      this.mrss_ready = null;
	      if ((mrss != null) && mrss !== "") {
	        mrss = mrss.replace("mrss?", "mrss.xml?");
	        this.getMrss(mrss, type);
	      }
	    }
	    callbackWhenLoaded = (function() {
	      var e, error1;
	      this.optionsCache.ongoingApiCall(false);
	      this.playCurrentVideo(this.optionsCache.optionsWithCache(options));
	      if (this.video && this.video.volume <= 0.99) {
	        this.video.volume = this.video.volume + 0.01;
	        this.video.volume = this.video.volume - 0.01;
	      }
	      try {
	        if (typeof callback === 'function') {
	          return callback();
	        }
	      } catch (error1) {
	        e = error1;
	        return this.warn('Callback failed', e);
	      }
	    }).bind(this);
	    if (type === 'simulcast_stream' && typeof options === 'string') {
	      options = {
	        simulcastApiKey: options
	      };
	    }
	    parsingCompleteCallback = (function(_this) {
	      return function(segments) {
	        _this.log('parsingCompleteCallback', segments);
	        _this.currentVideo = {
	          type: type,
	          token: token,
	          segments: segments,
	          playedSegments: 0
	        };
	        if (_this.ads && !_this.ads.ready && !_this.ads.adblocked) {
	          return _this.ads.subscribe('adLibrary:ready', function() {
	            return callbackWhenLoaded();
	          });
	        } else {
	          return callbackWhenLoaded();
	        }
	      };
	    })(this);
	    if (type === 'akamai_httpstream') {
	      parsingCompleteCallback([
	        {
	          src: token,
	          duration: 100,
	          beacons: []
	        }
	      ]);
	      return true;
	    }
	    apiResponseCallback = (function(_this) {
	      return function(response) {
	        return _this.parseVideoResponse(type, response, parsingCompleteCallback);
	      };
	    })(this);
	    videoSettingsUrl = this.buildVideoApiUrl(type, token, options);
	    this.log('ajax call', videoSettingsUrl);
	    this.optionsCache.apiCalls << $.ajax({
	      url: videoSettingsUrl,
	      dataType: 'json',
	      success: apiResponseCallback,
	      error: (function(_this) {
	        return function(e) {
	          return _this["throw"]('ApiError', e);
	        };
	      })(this)
	    });
	    return true;
	  };

	  $.H5P.Player.prototype.getMrss = function(mrss, type) {
	    return $.ajax({
	      method: 'GET',
	      dataType: 'xml',
	      url: mrss,
	      success: (function(_this) {
	        return function(data, status, jqXHR) {
	          var $xml;
	          $xml = $(data);
	          _this.tracking.titles = $xml.find('title');
	          _this.tracking.franchises = type === 'local_playlist' ? $xml.find('category[scheme="urn:mtvn:franchise"]') : $xml.find('category[scheme="urn:mtvn:artist"]');
	          _this.tracking.pageName = $(_this.tracking.titles[0]).text();
	          _this.tracking.mediaid = _this.tracking.mgid = $xml.find('category[scheme="urn:mtvn:playlist_uri"]:eq(0)').text();
	          _this.tracking.franchise = $(_this.tracking.franchises[0]).text();
	          _this.publish('mrss:ready');
	          return _this.mrss_ready = true;
	        };
	      })(this),
	      error: (function(_this) {
	        return function(jqXHR, status, error) {
	          _this.warn('Error fetching MRSS');
	          return _this.unsubscribe('mrss:ready', _this.mrssReady);
	        };
	      })(this)
	    });
	  };

	  $.H5P.Player.prototype.mrssReady = function() {
	    this.log('mrss is ready');
	    this.tracking.sendOmniturePageCall();
	    return this.unsubscribe('mrss:ready', this.mrssReady);
	  };

	  $.H5P.Player.prototype.parseFranchiseTitle = function(pageName) {
	    return pageName.match(/Episode_.[^_]*_shows/)[0].replace("Episode_", "").replace("_shows", "");
	  };

	  $.H5P.Player.prototype.loadSimulcastStream = function(simulcastApiKey, token, callback) {
	    return this.loadApiVideo('simulcast_stream', token, {
	      simulcastApiKey: simulcastApiKey
	    }, callback);
	  };

	  $.H5P.Player.prototype.buildVideoApiUrl = function(type, token, options) {
	    var languageCode;
	    if (options == null) {
	      options = {};
	    }
	    this.log('buildVideoApiUrl', type, token, options);
	    switch (type) {
	      case 'arc':
	      case 'akamai_httpstream':
	        return token;
	      case 'music_video':
	      case 'uma':
	        if (typeof token === 'object') {
	          return token[1];
	        } else {
	          return this.getMediagenUrl(token);
	        }
	        break;
	      case 'local_playlist_video':
	      case 'local_playlist':
	        languageCode = options.languageCode || this.settings.get('localization').language;
	        return this.getSenseiUrl(type, token, languageCode, this.settings.get('localization').country);
	      case 'simulcast_stream':
	        return this.getSimulcastUrl(token, options.simulcastApiKey);
	      case 'riptide_video':
	      case 'riptide':
	        return this.getRiptideUrl(token);
	      default:
	        return this["throw"]('VideoTypeNotRecognized');
	    }
	  };

	  $.H5P.Player.prototype.getSenseiUrl = function(type, token, languageCode, country) {
	    this.log('getSenseiUrl', type, token, languageCode, country);
	    return this.protocolToUse() + ("api.mtvnn.com/v2/" + languageCode + "/" + country + "/" + type + "s/" + token + ".json?video_format=m3u8&callback=?");
	  };

	  $.H5P.Player.prototype.getMediagenUrl = function(umaVideoId) {
	    this.log('getMediagenUrl', umaVideoId, "" + (this.settings.get('domain')), "" + (this.settings.get('tld')));
	    return this.protocolToUse() + "intl.mtvnservices.com/mediagen/mgid:uma:video:" + ((this.settings.get('domain')) + "." + (this.settings.get('tld')) + ":" + umaVideoId + "/?device=iPad&format=json");
	  };

	  $.H5P.Player.prototype.getSimulcastUrl = function(token, apiKey) {
	    this.log('getSimulcastUrl', token, apiKey);
	    return this.protocolToUse() + ("utt.mtvnn.com/api/v1/simulcasts/" + apiKey + "/streams/" + token + "?stream_format=") + this.getSimulcastFormat();
	  };

	  $.H5P.Player.prototype.getRiptideUrl = function(token) {
	    this.log('getRiptideUrl', token);
	    return this.protocolToUse() + ("videos.mtvnn.com/api/v2/" + token + ".js?video_format=") + this.getVideoFormat() + "&callback=?" + this.getClient();
	  };

	  $.H5P.Player.prototype.getVideoFormat = function() {
	    if (this.smartTV === 'Chromecast') {
	      return 'hls';
	    }
	    if (this.smartTV === 'LG') {
	      return 'hls';
	    }
	    if (this.smartTV) {
	      return 'pmd';
	    }
	    if (this.mobileOs === 'Windows') {
	      return 'pmd';
	    }
	    if (this.mobileOs === 'Android') {
	      return 'pmd';
	    }
	    return 'hls';
	  };

	  $.H5P.Player.prototype.getSimulcastFormat = function() {
	    if (this.mobileOs === 'Windows') {
	      return 'mssp';
	    }
	    return 'hls';
	  };

	  $.H5P.Player.prototype.getClient = function() {
	    var ref, ref1;
	    if (((ref = this.mobileOs) === 'Windows' || ref === 'Android') || ((ref1 = this.smartTV) === 'Samsung')) {
	      return '';
	    }
	    return '&client=mtvplay';
	  };

	  $.H5P.Player.prototype.parseMediagenResponse = function(response, suppressErrors) {
	    var beacons, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, video;
	    if (suppressErrors == null) {
	      suppressErrors = false;
	    }
	    this.log('parseMediagenResponse', response, suppressErrors);
	    if (!(response != null ? (ref = response["package"]) != null ? (ref1 = ref.video) != null ? (ref2 = ref1.item) != null ? (ref3 = ref2[0]) != null ? ref3.rendition : void 0 : void 0 : void 0 : void 0 : void 0)) {
	      if (!suppressErrors) {
	        this["throw"]('VideoNetworkError', response != null ? (ref4 = response["package"]) != null ? (ref5 = ref4.video) != null ? (ref6 = ref5.item) != null ? ref6[0].text : void 0 : void 0 : void 0 : void 0);
	      }
	      return null;
	    } else if (!(video = response != null ? (ref7 = response["package"]) != null ? (ref8 = ref7.video) != null ? (ref9 = ref8.item) != null ? (ref10 = ref9[0]) != null ? (ref11 = ref10.rendition) != null ? ref11[0] : void 0 : void 0 : void 0 : void 0 : void 0 : void 0)) {
	      if (!suppressErrors) {
	        this["throw"]('NoRenditionAvailable');
	      }
	      return null;
	    } else {
	      beacons = {};
	      if (response["package"].video.item[0].beacons) {
	        beacons = response["package"].video.item[0].beacons.filter(function(item) {
	          return item.url;
	        });
	      }
	      return {
	        'duration': parseFloat(video.duration),
	        'src': video.src,
	        'beacons': beacons
	      };
	    }
	  };

	  $.H5P.Player.prototype.rewriteVideoSources = function(segments) {
	    var j, len, ref, ref1, segment;
	    for (j = 0, len = segments.length; j < len; j++) {
	      segment = segments[j];
	      segment.src = segment.src.replace(/^http:\/\//, this.protocolToUse());
	      if (((ref = this.smartTV) === 'LG' || ref === 'Chromecast') || ((ref1 = this.mobileOs) === 'Android')) {
	        segment.src = segment.src.replace('vimn_secure_hls-f.', 'univodmtveu-vh.');
	      }
	      segment.src = segment.src.replace('https://pmd.mtvplay.tv', 'http://pmd.mtvplay.tv');
	    }
	    return segments;
	  };

	  $.H5P.Player.prototype.parseVideoResponse = function(type, response, callback) {
	    var parseTrackingType, result, rewriteCallback;
	    this.log('parseVideoResponse', type, response, callback);
	    rewriteCallback = (function(_this) {
	      return function(segments) {
	        return callback(_this.rewriteVideoSources(segments));
	      };
	    })(this);
	    parseTrackingType = (function(_this) {
	      return function() {
	        _this.log('parseTrackingType', response.category);
	        if (response.category != null) {
	          return _this.tracking.type = (function() {
	            switch (response.category) {
	              case 'FullEpisode':
	                return 'episode';
	              case 'ShortClips':
	              case 'ShortForm':
	                return 'short_clip';
	              case 'Trailer':
	                return 'trailer';
	              case 'MusicVideo':
	                return 'music_video';
	              default:
	                return 'episode';
	            }
	          })();
	        } else {
	          return _this.tracking.type = (function() {
	            switch (type) {
	              case 'music_video':
	              case 'arc':
	                return 'music_video';
	              case 'akamai_httpstream':
	              case 'simulcast_stream':
	                return 'livestream';
	              default:
	                return 'episode';
	            }
	          })();
	        }
	      };
	    })(this);
	    if ((this.tracking != null) && (this.tracking.omniture_enabled != null)) {
	      parseTrackingType();
	      this.log('tracking: ', this.tracking);
	    }
	    return result = (function() {
	      switch (type) {
	        case "local_playlist_video":
	          return this.parseLocalPlaylistVideoResponse(response, rewriteCallback);
	        case "local_playlist":
	          return this.parseLocalPlaylistResponse(response, rewriteCallback);
	        case "music_video":
	        case "uma":
	        case "arc":
	          return this.parseMusicVideoResponse(response, rewriteCallback);
	        case "riptide_video":
	        case "riptide":
	          return this.parseRiptideVideoResponse(response, rewriteCallback);
	        case "simulcast_stream":
	          return this.parseSimulcastStreamResponse(response, rewriteCallback);
	      }
	    }).call(this);
	  };

	  $.H5P.Player.prototype.parseLocalPlaylistVideoResponse = function(response, callback) {
	    var localPlaylistResponse;
	    this.log('parseLocalPlaylistVideoResponse', response, callback);
	    localPlaylistResponse = {
	      local_playlist_videos: [response]
	    };
	    return this.parseLocalPlaylistResponse(localPlaylistResponse, callback);
	  };

	  $.H5P.Player.prototype.parseLocalPlaylistResponse = function(response, callback) {
	    var callbackIfFinished, remaining, segments;
	    this.log('parseLocalPlaylistResponse', response, callback);
	    remaining = 0;
	    callbackIfFinished = (function(_this) {
	      return function() {
	        var filteredSegments;
	        if (!(--remaining <= 0)) {
	          return;
	        }
	        filteredSegments = segments.filter(function(v) {
	          return !!v.src;
	        });
	        if (!filteredSegments.length) {
	          _this["throw"]('NoRenditionAvailable');
	        }
	        return callback(filteredSegments);
	      };
	    })(this);
	    segments = [];
	    response.local_playlist_videos.forEach((function(_this) {
	      return function(item) {
	        var segment, src;
	        if (item.url) {
	          src = item.url;
	          return segments.push({
	            duration: item.duration,
	            src: src,
	            beacons: []
	          });
	        } else if (item.uma_video_id) {
	          segment = {};
	          segments.push(segment);
	          ++remaining;
	          return _this.optionsCache.apiCalls << $.ajax({
	            url: _this.getMediagenUrl(item.uma_video_id),
	            dataType: 'json',
	            success: function(response) {
	              var parsedSegment;
	              parsedSegment = _this.parseMediagenResponse(response, true);
	              if (!parsedSegment) {
	                return;
	              }
	              segment.duration = parsedSegment.duration;
	              segment.src = parsedSegment.src;
	              return segment.beacons = parsedSegment.beacons;
	            },
	            error: function(e) {
	              return _this["throw"]('ApiError', e);
	            },
	            complete: callbackIfFinished
	          });
	        }
	      };
	    })(this));
	    if (remaining === 0) {
	      return callback(segments);
	    }
	  };

	  $.H5P.Player.prototype.parseMusicVideoResponse = function(response, callback) {
	    this.log('parseMusicVideoResponse', response, callback);
	    return callback([this.parseMediagenResponse(response)]);
	  };

	  $.H5P.Player.prototype.parseRiptideVideoResponse = function(response, callback) {
	    var segments;
	    this.log('parseRiptideVideoResponse', response, callback);
	    segments = [
	      {
	        src: response.src,
	        duration: parseInt(response.duration),
	        beacons: []
	      }
	    ];
	    return callback(segments);
	  };

	  $.H5P.Player.prototype.parseSimulcastStreamResponse = function(response, callback) {
	    var segments;
	    this.log('parseSimulcastStreamResponse', response, callback);
	    segments = [
	      {
	        src: response.simulcast_stream,
	        duration: 100,
	        beacons: []
	      }
	    ];
	    return callback(segments);
	  };

	  $.H5P.Player.prototype.protocolToUse = function() {
	    var location;
	    location = window.location.href;
	    if (location.indexOf('https://') !== -1) {
	      return 'https://';
	    } else {
	      return 'http://';
	    }
	  };

	  $.H5P.Player.prototype.play = function() {
	    return this.video.play();
	  };

	  $.H5P.Player.prototype.pause = function() {
	    return this.video.pause();
	  };

	  $.H5P.Player.prototype.toggle = function() {
	    if (this.video.paused) {
	      return this.video.play();
	    } else {
	      return this.video.pause();
	    }
	  };

	  $.H5P.Player.prototype.setVolume = function(value) {
	    return this.video.volume = value;
	  };

	  $.H5P.Player.prototype.getVolume = function() {
	    return this.video.volume;
	  };

	  $.H5P.Player.prototype.setAutoPlay = function(value) {
	    return this.video.autoplay = value;
	  };

	  $.H5P.Player.prototype.getAutoPlay = function() {
	    return this.video.autoplay;
	  };

	  $.H5P.Player.prototype.currentSrc = function() {
	    return this.video.src;
	  };

	  $.H5P.Player.prototype.updateSrc = function(value) {
	    return this.video.src = value;
	  };

	  $.H5P.AdCountdown = (function(superClass) {
	    extend(AdCountdown, superClass);

	    function AdCountdown(player) {
	      this.hide = bind(this.hide, this);
	      this.show = bind(this.show, this);
	      this.player = player;
	      this.countdownText = this.player.settings.get('localization', 'translations', 'countdown');
	      if (!this.countdownText) {
	        return;
	      }
	      this.player.subscribe('ads:rollPlaying', this.show);
	      this.player.subscribe('ads:rollEnded', this.hide);
	    }

	    AdCountdown.prototype.show = function(duration) {
	      var adSrc, countdownText, nextDuration;
	      this.hide();
	      adSrc = this.player.video.currentSrc;
	      nextDuration = duration - this.player.video.duration;
	      countdownText = this.countdownText.replace(/%{seconds}|{seconds}/g, parseInt(duration));
	      this.player.container.append('<p class="ad-countdown">' + countdownText + '</p>');
	      this.onTimeUpdate = (function(_this) {
	        return function(e) {
	          if (_this.player.video.currentSrc !== adSrc) {
	            _this.show(nextDuration);
	          }
	          return _this.player.container.find('.seconds').html(parseInt(duration - _this.player.video.currentTime));
	        };
	      })(this);
	      return $(this.player.video).on('timeupdate', this.onTimeUpdate);
	    };

	    AdCountdown.prototype.hide = function() {
	      this.player.container.find('p.ad-countdown').remove();
	      if (this.onTimeUpdate) {
	        return $(this.player.video).off('timeupdate', this.onTimeUpdate);
	      }
	    };

	    return AdCountdown;

	  })($.H5P.Base);

	  if (!$.H5P.ads) {
	    $.H5P.ads = {};
	  }

	  $.H5P.ads.Freewheel = (function(superClass) {
	    extend(Freewheel, superClass);

	    function Freewheel(player1) {
	      this.player = player1;
	      this["throw"] = bind(this["throw"], this);
	      this.track = bind(this.track, this);
	      this.playAppropriateRoll = bind(this.playAppropriateRoll, this);
	      this.hasAppropriateRoll = bind(this.hasAppropriateRoll, this);
	      this.getAppropriateRolls = bind(this.getAppropriateRolls, this);
	      this.onRequestComplete = bind(this.onRequestComplete, this);
	      this.destroy = bind(this.destroy, this);
	      this.clickAd = bind(this.clickAd, this);
	      this.onAdImpression = bind(this.onAdImpression, this);
	      this.requestAds = bind(this.requestAds, this);
	      this.getTimeSlots = bind(this.getTimeSlots, this);
	      this.getTimeSlotsCount = bind(this.getTimeSlotsCount, this);
	      this.initializeManager = bind(this.initializeManager, this);
	      this.loadLibrary = bind(this.loadLibrary, this);
	      this.adblocked = false;
	      this.pubChannels = [];
	      this.settings = this.player.settings.get('ads');
	      if (!(typeof tv !== "undefined" && tv !== null ? tv.freewheel : void 0)) {
	        this.loadLibrary();
	      } else {
	        this.initializeManager();
	      }
	      this.slots = [];
	      Freewheel.__super__.constructor.call(this, this.player.debug);
	    }

	    Freewheel.prototype.typeToTimePosition = function(type) {
	      if (type === "preroll") {
	        return tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL;
	      }
	      if (type === "midroll") {
	        return tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL;
	      }
	      if (type === "postroll") {
	        return tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL;
	      }
	    };

	    Freewheel.prototype.timePositionToType = function(timePosition) {
	      if (timePosition === tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL) {
	        return "preroll";
	      }
	      if (timePosition === tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL) {
	        return "midroll";
	      }
	      if (timePosition === tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL) {
	        return "postroll";
	      }
	    };

	    Freewheel.prototype.loadLibrary = function() {
	      var _this;
	      _this = this;
	      this.player.optionsCache.apiCalls << $.ajax({
	        url: this.settings.library,
	        dataType: "script",
	        success: (function(_this) {
	          return function() {
	            return _this.initializeManager();
	          };
	        })(this),
	        error: function(jqXHR, status, error) {
	          _this.track('video:ad:blocked', _this.player.token);
	          return _this.adblocked = true;
	        }
	      });
	      return true;
	    };

	    Freewheel.prototype.initializeManager = function() {
	      this.ready = true;
	      this.manager = new tv.freewheel.SDK.AdManager();
	      this.manager.setNetwork(this.settings.networkID);
	      this.manager.setServer(this.settings.server);
	      return this.publish('adLibrary:ready');
	    };

	    Freewheel.prototype.getTimeSlotsCount = function() {
	      var duration;
	      duration = this.player.getCurrentSegment().duration;
	      if (duration > 1740) {
	        return 3;
	      }
	      if (duration > 1140) {
	        return 2;
	      }
	      if (duration > 540) {
	        return 1;
	      }
	      return 0;
	    };

	    Freewheel.prototype.getTimeSlots = function(count) {
	      var duration, j, results;
	      if (!count) {
	        return [];
	      }
	      duration = this.player.getCurrentSegment().duration;
	      return (function() {
	        results = [];
	        for (var j = 1; 1 <= count ? j <= count : j >= count; 1 <= count ? j++ : j--){ results.push(j); }
	        return results;
	      }).apply(this).map(function(index) {
	        return duration * index / (count + 1);
	      });
	    };

	    Freewheel.prototype.requestAds = function() {
	      var j, key, len, pairs, ref, requestPromise, value;
	      this.adContext = this.manager.newContext();
	      this.adContext.setProfile(this.settings.profileID);
	      this.adContext.setVideoAsset(this.player.currentVideo.token, this.player.getCurrentDuration(), this.settings.networkID, null, null, null, null, this.settings.fallbackID);
	      this.adContext.addKeyValue('_fw_fss', '_fw_search');
	      this.adContext.addKeyValue('homad', '0');
	      this.adContext.setSiteSection(this.generateSiteSectionID(), this.settings.networkID);
	      if (window.n_pbt) {
	        pairs = n_pbt.split(";");
	        for (j = 0, len = pairs.length; j < len; j++) {
	          value = pairs[j];
	          this.adContext.addKeyValue(value.split("=")[0], value.split("=")[1]);
	        }
	      }
	      if (this.settings.customVariables != null) {
	        ref = this.settings.customVariables;
	        for (key in ref) {
	          value = ref[key];
	          this.adContext.addKeyValue(key, value);
	        }
	      }
	      this.adContext.registerVideoDisplayBase(this.player.container[0].id);
	      this.addSlots();
	      this.attachEventListener();
	      requestPromise = $.H5P.once(this.adContext, tv.freewheel.SDK.EVENT_REQUEST_COMPLETE);
	      this.adContext.submitRequest();
	      return requestPromise.then(this.onRequestComplete);
	    };

	    Freewheel.prototype.attachEventListener = function() {
	      var event;
	      event = tv.freewheel.SDK.EVENT_AD_IMPRESSION;
	      this.adContext.removeEventListener(event, this.onAdImpression);
	      return this.adContext.addEventListener(event, this.onAdImpression);
	    };

	    Freewheel.prototype.addSlots = function() {
	      var index, j, len, ref, timeSlot;
	      this.adContext.addTemporalSlot("Preroll_1", tv.freewheel.SDK.ADUNIT_PREROLL, 0);
	      this.track('video:ad:requested', this.player.token, {
	        type: 'preroll'
	      });
	      ref = this.getTimeSlots(this.getTimeSlotsCount());
	      for (index = j = 0, len = ref.length; j < len; index = ++j) {
	        timeSlot = ref[index];
	        this.adContext.addTemporalSlot("Midroll_" + index, tv.freewheel.SDK.ADUNIT_MIDROLL, timeSlot);
	        this.track('video:ad:requested', this.player.token, {
	          type: 'midroll'
	        });
	      }
	      this.adContext.addTemporalSlot("Postroll_1", tv.freewheel.SDK.ADUNIT_POSTROLL, this.player.currentVideo.duration);
	      return this.track('video:ad:requested', this.player.token, {
	        type: 'postroll'
	      });
	    };

	    Freewheel.prototype.onAdImpression = function(event) {
	      return this.currentAd = event.adInstance;
	    };

	    Freewheel.prototype.clickAd = function() {
	      var clickEvent, controller;
	      if (!this.currentAd) {
	        return false;
	      }
	      clickEvent = {
	        name: tv.freewheel.SDK.EVENT_AD_CLICK
	      };
	      controller = this.currentAd.getRendererController();
	      controller.processEvent(clickEvent);
	      return true;
	    };

	    Freewheel.prototype.destroy = function() {
	      delete this.adContext;
	      delete this.player;
	      delete this.settings;
	      delete this.manager;
	      return true;
	    };

	    Freewheel.prototype.onRequestComplete = function(response) {
	      var freewheelSlots, getFilter, midrolls, postrolls, prerolls;
	      this.adsPlaying = false;
	      freewheelSlots = this.adContext.getTemporalSlots();
	      getFilter = function(type) {
	        return function(el) {
	          return el.getTimePositionClass() === tv.freewheel.SDK[type] && el.getAdCount() > 0;
	        };
	      };
	      prerolls = freewheelSlots.filter(getFilter('TIME_POSITION_CLASS_PREROLL'));
	      midrolls = freewheelSlots.filter(getFilter('TIME_POSITION_CLASS_MIDROLL'));
	      postrolls = freewheelSlots.filter(getFilter('TIME_POSITION_CLASS_POSTROLL'));
	      this.slots = this.getTimeSlots(midrolls.length).map(function(time, index) {
	        return {
	          slot: midrolls[index],
	          time: time
	        };
	      });
	      if (prerolls.length) {
	        this.slots.push({
	          slot: prerolls[0],
	          time: 0
	        });
	      }
	      if (postrolls.length) {
	        this.slots.push({
	          slot: postrolls[0],
	          time: Infinity
	        });
	      }
	      return this.slots.sort(function(a, b) {
	        return a.time - b.time;
	      });
	    };

	    Freewheel.prototype.getAppropriateRolls = function(previousTime, currentTime) {
	      if (previousTime > currentTime) {
	        return [];
	      }
	      return this.slots.filter(function(ad) {
	        return ad.time >= previousTime && ad.time <= currentTime;
	      });
	    };

	    Freewheel.prototype.hasAppropriateRoll = function(previousTime, currentTime) {
	      return !this.adblocked && this.getAppropriateRolls(previousTime, currentTime).length > 0;
	    };

	    Freewheel.prototype.playAppropriateRoll = function(previousTime, currentTime) {
	      var appropriateRolls;
	      if (this.adblocked) {
	        return $.H5P.resolvedPromise();
	      }
	      appropriateRolls = this.getAppropriateRolls(previousTime, currentTime);
	      if (appropriateRolls.length === 0) {
	        return $.H5P.resolvedPromise();
	      }
	      return this.playRoll(appropriateRolls[0]);
	    };

	    Freewheel.prototype.playRoll = function(roll) {
	      var type, video;
	      if (roll.promise) {
	        return roll.promise;
	      }
	      this.adsPlaying = true;
	      type = this.timePositionToType(roll.slot.getTimePositionClass());
	      video = this._getVideoElement();
	      video.attr('controls', true);
	      video.one('playing', (function(_this) {
	        return function() {
	          if (!_this.adsPlaying) {
	            return;
	          }
	          _this.adStarted = true;
	          _this.publish('ads:rollPlaying', roll.slot.getTotalDuration());
	          _this.publish("ads:" + type + "Playing", roll.slot.getTotalDuration());
	          _this.track('video:ad:started', _this.player.token, _this.getInfoObject(type, roll));
	          return video.attr('controls', false);
	        };
	      })(this));
	      roll.promise = $.H5P.once(this.adContext, tv.freewheel.SDK.EVENT_SLOT_ENDED).then((function(_this) {
	        return function() {
	          _this.adsPlaying = false;
	          if (_this.adStarted) {
	            _this.publish('ads:rollEnded');
	            _this.publish("ads:" + type + "Ended");
	            _this.track('video:ad:ended', _this.player.token, _this.getInfoObject(type, roll));
	          }
	          _this.slots = _this.slots.filter(function(slot) {
	            return slot !== roll;
	          });
	          return video.attr('controls', true);
	        };
	      })(this));
	      roll.slot.play();
	      video.attr('controls', true);
	      return roll.promise;
	    };

	    Freewheel.prototype._getVideoElement = function() {
	      return $(this.player.video);
	    };

	    Freewheel.prototype.getInfoObject = function(type, roll) {
	      return {
	        type: type,
	        duration: roll.slot.getTotalDuration(),
	        mediaid: roll.slot.getCustomId(),
	        ad: {
	          file: this._getVideoElement().attr('src'),
	          title: roll.slot.getCustomId(),
	          id: roll.slot.getCustomId()
	        }
	      };
	    };

	    Freewheel.prototype.generateSiteSectionID = function() {
	      if (this.settings.fw_ssid != null) {
	        return this.settings.fw_ssid;
	      }
	      if (this.getLocation().indexOf(".mtvnn.") > -1) {
	        return this.settings.viralSID || 'viral';
	      } else {
	        return this.getLocation().replace(/#[^#]*$/, "").replace(/\?[^\?]*$/, "").replace(/^https:/, "").replace(/^http:/, "").replace(/www./, "").replace(/./, "").replace(/^https:[^https:]*$/, "").replace(/\/\//g, "").replace(/\./g, "").replace(/\//, "").replace(/\s/g, "").replace(/\:/g, "").replace(/\html/g, "").replace(/\htm/g, "");
	      }
	    };

	    Freewheel.prototype.getLocation = function() {
	      return window.location.href;
	    };

	    Freewheel.prototype.track = function() {
	      var args, ref;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return (ref = this.player).track.apply(ref, args);
	    };

	    Freewheel.prototype["throw"] = function() {
	      var name, options;
	      name = arguments[0], options = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      Freewheel.__super__["throw"].apply(this, [name].concat(slice.call(options)));
	      this.track('video:error', this.player.token, {
	        message: this.e.message
	      });
	      if (!this.handled) {
	        throw this.e;
	      }
	      return this.e;
	    };

	    return Freewheel;

	  })($.H5P.Base);

	  $.H5P.OptionsCache = (function(superClass) {
	    extend(OptionsCache, superClass);

	    function OptionsCache() {
	      this.clear = bind(this.clear, this);
	      this.optionsWithCache = bind(this.optionsWithCache, this);
	      this.cacheOptions = bind(this.cacheOptions, this);
	      this.ongoingApiCall = bind(this.ongoingApiCall, this);
	      this.apiCalls = [];
	    }

	    OptionsCache.prototype.ongoingApiCall = function(b) {
	      if (typeof b === 'boolean') {
	        this.apiCallOngoing = b;
	      }
	      return this.apiCallOngoing || false;
	    };

	    OptionsCache.prototype.cacheOptions = function(options) {
	      return this.cache = options;
	    };

	    OptionsCache.prototype.optionsWithCache = function(options) {
	      var key, ref, value;
	      ref = this.cache;
	      for (key in ref) {
	        value = ref[key];
	        options[key] = value;
	      }
	      return options;
	    };

	    OptionsCache.prototype.clear = function() {
	      return delete this.cache;
	    };

	    return OptionsCache;

	  })($.H5P.Base);

	  $.H5P.Settings = (function(superClass) {
	    extend(Settings, superClass);

	    function Settings() {
	      this["throw"] = bind(this["throw"], this);
	      this.track = bind(this.track, this);
	      this.reset = bind(this.reset, this);
	      this.merge = bind(this.merge, this);
	      this.get = bind(this.get, this);
	      return Settings.__super__.constructor.apply(this, arguments);
	    }

	    Settings.prototype.loadInitial = function(data, player1) {
	      this.player = player1;
	      if (!data) {
	        this["throw"]('NoConfigSet');
	      }
	      if (!data.blankVideo) {
	        this["throw"]('NoBlankVideoSet');
	      }
	      this._attributes = data;
	      return this._originalAttributes = $.extend(true, {}, this._attributes);
	    };

	    Settings.prototype.set = function(name, value) {
	      var extension;
	      extension = {};
	      extension[name] = value;
	      return $.extend(true, this._attributes, extension);
	    };

	    Settings.prototype.get = function() {
	      var arg, args, j, len, prop;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      prop = this._attributes;
	      for (j = 0, len = args.length; j < len; j++) {
	        arg = args[j];
	        if (!prop[arg]) {
	          return null;
	        } else {
	          prop = prop[arg];
	        }
	      }
	      return prop;
	    };

	    Settings.prototype.merge = function(overrides) {
	      return $.extend(true, this._attributes, overrides);
	    };

	    Settings.prototype.reset = function(name) {
	      if (name) {
	        if (this._originalAttributes[name].constructor === Object) {
	          return this._attributes[name] = $.extend(true, {}, this._originalAttributes[name]);
	        } else {
	          if (this._originalAttributes[name]) {
	            return this._attributes[name] = this._originalAttributes[name].slice(0);
	          } else {
	            return delete this._attributes[name];
	          }
	        }
	      } else {
	        return this._attributes = $.extend(true, {}, this._originalAttributes);
	      }
	    };

	    Settings.prototype.track = function() {
	      var args, ref;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return (ref = this.player).track.apply(ref, args);
	    };

	    Settings.prototype["throw"] = function() {
	      var name, options;
	      name = arguments[0], options = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      Settings.__super__["throw"].apply(this, [name].concat(slice.call(options)));
	      this.track('video:error', this.player.token, {
	        message: this.e.message
	      });
	      if (!this.handled) {
	        throw this.e;
	      }
	      return this.e;
	    };

	    return Settings;

	  })($.H5P.Base);

	  if (!$.H5P.Tracking) {
	    $.H5P.Tracking = {};
	  }

	  $.H5P.Tracking = (function(superClass) {
	    extend(Tracking, superClass);

	    function Tracking(player1, debug1) {
	      this.player = player1;
	      this.debug = debug1 != null ? debug1 : false;
	      this["throw"] = bind(this["throw"], this);
	      this.track = bind(this.track, this);
	      Tracking.__super__.constructor.call(this, this.debug);
	      this.settings = this.player.settings.get('reporting');
	      this.omniture_enabled = this.player.settings.get('reporting', 'omniture', 'enabled');
	      this.googleanalytics_enabled = this.player.settings.get('reporting', 'googleanalytics', 'enabled');
	      this.domain = this.player.settings.get('domain');
	      this.tld = this.player.settings.get('tld');
	      this.country = this.player.settings.get('localization', 'country');
	      this.titles = null;
	      this.franchises = null;
	      this.pageName = null;
	      this.franchise = null;
	      this.type = null;
	      this.mgid = null;
	      this.playlist_title = null;
	    }

	    Tracking.prototype.track = function(event, asset_id, options) {
	      var reportObject;
	      if (options == null) {
	        options = {};
	      }
	      if (event === 'video:content:started' && this.omniture_enabled) {
	        if ((this.player.mrss_ready != null) || this.type === 'livestream') {
	          if (this.type === 'livestream') {
	            this.pageName = 'livestream' + window.location.href.split("/").pop();
	          }
	          this.sendOmniturePageCall();
	        } else {
	          this.log('subscribing to mrss:ready event');
	          this.player.subscribe('mrss:ready', this.player.mrssReady);
	        }
	      }
	      if (!asset_id) {
	        return;
	      }
	      this.sendGAEventCall(event, asset_id, options);
	      reportObject = {
	        "action": event,
	        "title": asset_id,
	        "duration": this.player.getDuration(),
	        "playheadTime": this.player._getCurrentTime(),
	        "homad": false,
	        "mediaid": this.mgid,
	        "playerid": "(HTML5 Player)"
	      };
	      if (options.type && options.type.match(/roll/)) {
	        reportObject.isad = true;
	      }
	      $.extend(reportObject, options);
	      return this.publish('track', reportObject);
	    };

	    Tracking.prototype.initActionSource = function() {
	      if (!this.s) {
	        return this.s = s_gi(this.settings.omniture.defaults);
	      }
	    };

	    Tracking.prototype.sendOmniturePageCall = function() {
	      var error, error1;
	      this.log('sending Page call for ' + this.pageName);
	      this.initActionSource();
	      try {
	        this.s.pageName = 'video/net/' + this.pageName;
	        this.s.channel = 'videos';
	        this.s.prop12 = this.country;
	        this.s.prop30 = this.mgid;
	        this.s.prop36 = this.franchise;
	        this.s.prop38 = this.domain + '.' + this.tld;
	        this.s.prop43 = this.playlist_title;
	        this.s.prop45 = this.type;
	        this.s.prop48 = 'HTML5 Player';
	        this.s.prop49 = location.host;
	        this.s.prop50 = this.pageName;
	        this.s.hier1 = 'video/net/' + this.pageName + '/play';
	        return this.s.t();
	      } catch (error1) {
	        error = error1;
	        return this.warn('Error sending page call', error);
	      }
	    };

	    Tracking.prototype.sendGAEventCall = function(event, asset_id, options) {
	      var eventMap, gaProps, universalTracker;
	      if (options == null) {
	        options = {};
	      }
	      if (!this.googleanalytics_enabled) {
	        return;
	      }
	      universalTracker = window[this.player.settings.get('reporting', 'googleanalytics', 'variable')] || window['ga'];
	      eventMap = {
	        'video:ad:requested': {
	          type: 'ad',
	          event: options.type + " requested"
	        },
	        'video:ad:started': {
	          type: 'ad',
	          event: options.type + " started"
	        },
	        'video:ad:ended': {
	          type: 'ad',
	          event: options.type + " ended"
	        },
	        'video:content:started': {
	          type: 'video',
	          event: 'started'
	        },
	        'video:content:loaded': {
	          type: 'video',
	          event: 'loaded'
	        },
	        'video:content:ended': {
	          type: 'video',
	          event: 'content ended'
	        },
	        'video:error': {
	          type: 'error',
	          event: options.message
	        },
	        'video:ui:fullscreen': {
	          type: 'video',
	          event: 'fullscreen'
	        }
	      };
	      gaProps = eventMap[event];
	      if (!gaProps) {
	        return;
	      }
	      if (universalTracker != null) {
	        if (gaProps.type === 'ad') {
	          this.log('Tracking ' + gaProps.type + ' with event ' + gaProps.event);
	          return universalTracker('send', 'event', 'Ads', 'Ad ' + gaProps.event + ' (HTML5 Player)', asset_id);
	        } else if (gaProps.type === 'video') {
	          this.log('Tracking ' + gaProps.type + ' with event ' + gaProps.event);
	          return universalTracker('send', 'event', 'Videos', 'Video ' + gaProps.event + ' (HTML5 Player)', asset_id);
	        } else if (gaProps.type === 'error') {
	          this.log('Tracking ' + gaProps.type + ' with event ' + gaProps.event);
	          return universalTracker('send', 'event', 'Video Errors', 'Error: ' + gaProps.event + ' (HTML5 Player)', asset_id);
	        }
	      } else if (typeof _gaq !== "undefined" && _gaq !== null) {
	        if (gaProps.type === 'ad') {
	          this.log('Tracking ' + gaProps.type + ' with event ' + gaProps.event);
	          return _gaq.push(['_trackEvent', 'Ads', 'Ad ' + gaProps.event + ' (HTML5 Player)', asset_id]);
	        } else if (gaProps.type === 'video') {
	          this.log('Tracking ' + gaProps.type + ' with event ' + gaProps.event);
	          return _gaq.push(['_trackEvent', 'Videos', 'Video ' + gaProps.event + ' (HTML5 Player)', asset_id]);
	        } else if (gaProps.type === 'error') {
	          this.log('Tracking ' + gaProps.type + ' with event ' + gaProps.event);
	          return _gaq.push(['_trackEvent', 'Video Errors', 'Error: ' + gaProps.event + ' (HTML5 Player)', asset_id]);
	        }
	      } else {
	        return this.warn('Error sending event call, Google Analytics object is undefined!');
	      }
	    };

	    Tracking.prototype["throw"] = function() {
	      var name, options;
	      name = arguments[0], options = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      Tracking.__super__["throw"].apply(this, [name].concat(slice.call(options)));
	      this.track('video:error', this.player.token, {
	        message: this.e.message
	      });
	      if (!this.handled) {
	        throw this.e;
	      }
	      return this.e;
	    };

	    return Tracking;

	  })($.H5P.Base);

	  (function($) {
	    return $.fn.H5P = function(startSettings, customVideoAttributes, debug) {
	      if (startSettings == null) {
	        startSettings = null;
	      }
	      if (customVideoAttributes == null) {
	        customVideoAttributes = {};
	      }
	      if (debug == null) {
	        debug = false;
	      }
	      return new $.H5P.Player(this, startSettings, customVideoAttributes, debug);
	    };
	  })(jQuery);

	  $.H5P.once = function(obj, eventName, cb) {
	    var dfd, finished;
	    dfd = jQuery.Deferred();
	    finished = function() {
	      var args;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      obj.removeEventListener(eventName, finished);
	      return dfd.resolve.apply(dfd, args);
	    };
	    obj.addEventListener(eventName, finished);
	    return dfd.promise();
	  };

	  $.H5P.resolvedPromise = function() {
	    var dfd;
	    dfd = jQuery.Deferred();
	    dfd.resolve();
	    return dfd.promise();
	  };

	}).call(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var FlashProxy, assets,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	assets = __webpack_require__(8);

	FlashProxy = (function() {
	  function FlashProxy(_container, _settings) {
	    this.initiateConstants = bind(this.initiateConstants, this);
	    this.clearIntervals = bind(this.clearIntervals, this);
	    this.removeSWF = bind(this.removeSWF, this);
	    this.setVolume = bind(this.setVolume, this);
	    this.getVolume = bind(this.getVolume, this);
	    this.volume = bind(this.volume, this);
	    this.deferredPlay = bind(this.deferredPlay, this);
	    this.playheadUpdate = bind(this.playheadUpdate, this);
	    this.initiateConstants();
	    this.initiateContainer(_container);
	    this.initiateSettings(_settings);
	    this.initiateJSInterface();
	    this.timer = 0;
	    this.loadCallback = null;
	    this.adplaying = false;
	    this.eventcallbacks = {};
	    this.currentPlayObject = {};
	    this.clearIntervals();
	    this.embedPlayer();
	  }

	  FlashProxy.prototype.playheadUpdate = function() {
	    return this.triggerEvent("timeElapsed", {
	      "time": this.player().getPlayheadTime()
	    });
	  };

	  FlashProxy.prototype.load = function(type, token, options, callback, mrss) {
	    this.clearIntervals();
	    this.playObject = {};
	    if (options.startTime && !isNaN(options.startTime)) {
	      this.playObject.jump = options.startTime;
	    }
	    if (options.image) {
	      this.playObject.image = options.image;
	    }
	    if (options.callback) {
	      this.loadCallback = options.callback;
	    } else if (callback !== null) {
	      this.loadCallback = callback;
	    }
	    if ((mrss != null) && mrss !== "") {
	      this.playObject.mrss = mrss;
	    }
	    switch (type) {
	      case "akamai_httpstream":
	        this.playObject.hls = token;
	        break;
	      case "arc":
	        this.playObject.feed = token;
	        break;
	      case "local_playlist":
	      case "local_playlist_video":
	        if (!this.playObject.mrss) {
	          if (this.settings.tld == null) {
	            throw "If no mrss is provided for " + type + ", a tld must be provided in the player settings.";
	          }
	          this.playObject.mrss = 'http://api.mtvnn.com/v2/mrss?uri=mgid:sensei:video:mtvnn.com:' + type + '-' + token + '-' + this.settings.tld.toUpperCase();
	        }
	        break;
	      case "simulcast_stream":
	        this.playObject.hds = 'http://utt.mtvnn.com/api/v1/simulcasts/c153f28d950ae49a/streams/' + token + '?stream_format=hds';
	        break;
	      case "riptide_video":
	      case "riptide":
	        this.playObject.mediagen = 'http://riptide.mtvnn.com/mediagen/' + token;
	        break;
	      case "music_video":
	      case "uma":
	        this.playObject.mediagen = 'http://intl.esperanto.mtvi.com/www/xml/media/mediaGen.jhtml?uri=mgid:uma:video:' + this.settings.domain + '.' + this.settings.tld + ':' + token;
	        break;
	      default:
	        return false;
	    }
	    return this.deferredPlay(this.playObject);
	  };

	  FlashProxy.prototype.deferredPlay = function(po) {
	    if (po != null) {
	      this.currentPlayObject = po;
	    }
	    if (this.player().playVideo != null) {
	      return this.player().playVideo(this.currentPlayObject);
	    } else {
	      return this.loadTimeout = window.setTimeout(this.deferredPlay, 100);
	    }
	  };

	  FlashProxy.prototype.play = function() {
	    if ((this.player().getPlayState != null) && this.player().getPlayState() === "idle") {
	      return this.player().startPlayback();
	    } else {
	      if (this.player().resumeVideo != null) {
	        return this.player().resumeVideo();
	      }
	    }
	  };

	  FlashProxy.prototype.pause = function() {
	    if (this.player().pauseVideo != null) {
	      return this.player().pauseVideo();
	    }
	  };

	  FlashProxy.prototype.volume = function(value) {
	    var ref;
	    if (value !== null) {
	      if ((ref = this.player()) != null ? ref.setVolume : void 0) {
	        return this.player().setVolume(value);
	      }
	    } else {
	      if (this.player() != null) {
	        return this.player().getVolume();
	      } else {
	        return NaN;
	      }
	    }
	  };

	  FlashProxy.prototype.getVolume = function() {
	    return this.volume(null);
	  };

	  FlashProxy.prototype.setVolume = function(value) {
	    return this.volume(value);
	  };

	  FlashProxy.prototype.setAutoPlay = function(value) {
	    return this.player().setAutoPlay(value);
	  };

	  FlashProxy.prototype.getAutoPlay = function() {
	    return this.player().getAutoPlay();
	  };

	  FlashProxy.prototype.getDuration = function() {
	    if (this.player().getMetadata != null) {
	      return this.player().getMetadata().duration;
	    }
	  };

	  FlashProxy.prototype.getCurrentTime = function() {
	    var ref;
	    if ((((ref = this.player()) != null ? ref.getPlayState : void 0) != null) && this.player().getPlayState() === "adbreak" && (this.player().getAdPlayheadTime != null)) {
	      return this.player().getAdPlayheadTime();
	    } else {
	      if (this.player().getPlayheadTime != null) {
	        return this.player().getPlayheadTime();
	      } else {
	        return 0;
	      }
	    }
	  };

	  FlashProxy.prototype.setCurrentTime = function(value) {
	    if (this.player().seekTo != null) {
	      return this.player().seekTo(value);
	    }
	  };

	  FlashProxy.prototype.requestFullscreen = function() {
	    return console.log("Not implemented");
	  };

	  FlashProxy.prototype.invokeAd = function() {
	    return console.log("Not implemented");
	  };

	  FlashProxy.prototype.destroy = function() {
	    this.clearIntervals();
	    if (this.player().unload != null) {
	      this.player().unload();
	    }
	    return this.unloadTimeout = window.setTimeout(this.removeSWF, 50);
	  };

	  FlashProxy.prototype.removeSWF = function() {
	    var error, error1;
	    this.clearIntervals();
	    try {
	      swfobject.removeSWF(this.playerID);
	    } catch (error1) {
	      error = error1;
	    }
	    return this.container[0].innerHTML = "";
	  };

	  FlashProxy.prototype.clearIntervals = function() {
	    clearInterval(this.unloadTimeout);
	    clearInterval(this.timer);
	    return clearTimeout(this.loadTimeout);
	  };

	  FlashProxy.prototype.seek = function(value) {
	    if (this.player().seekTo != null) {
	      return this.player().seekTo(value);
	    }
	  };

	  FlashProxy.prototype.addEventListener = function(name, callback) {
	    var base;
	    if ((base = this.eventcallbacks)[name] == null) {
	      base[name] = [];
	    }
	    return this.eventcallbacks[name][this.eventcallbacks[name].length] = callback;
	  };

	  FlashProxy.prototype.removeEventListener = function(name, callback) {
	    var cb, i, ref;
	    if (this.eventcallbacks[name]) {
	      ref = this.eventcallbacks[name];
	      for (i in ref) {
	        cb = ref[i];
	        if (cb === callback) {
	          this.eventcallbacks[name].splice(i, 1);
	        }
	      }
	      return;
	    }
	    return false;
	  };

	  FlashProxy.prototype.triggerEvent = function(name, options) {
	    var fname, j, len, ref, results;
	    if (this.eventcallbacks[name] && this.eventcallbacks[name].length > 0) {
	      ref = this.eventcallbacks[name];
	      results = [];
	      for (j = 0, len = ref.length; j < len; j++) {
	        fname = ref[j];
	        results.push(this.triggerFunction(fname, options));
	      }
	      return results;
	    }
	  };

	  FlashProxy.prototype.triggerFunction = function(value, options) {
	    if (typeof value === 'string') {
	      if (options) {
	        return window[value](options);
	      } else {
	        return window[value]();
	      }
	    } else {
	      if (options) {
	        return value(options);
	      } else {
	        return value();
	      }
	    }
	  };

	  FlashProxy.prototype.player = function() {
	    return document.getElementById(this.playerID);
	  };

	  FlashProxy.prototype.initiateSettings = function(_settings) {
	    var j, len, name, ref;
	    this.settings = _settings;
	    delete this.settings.logger;
	    if (!this.settings.domain) {
	      this.settings.domain = "mtvni";
	    }
	    if (!this.settings.tld) {
	      this.settings.tld = "com";
	    }
	    this.mrssvars = encodeURIComponent("&umaSite=" + (this.settings.uma_site != null ? this.settings.uma_site : this.settings.domain + "." + this.settings.tld));
	    if (this.settings.reporting) {
	      ref = ['comscore', 'gemius', 'nielsen', 'googleanalytics'];
	      for (j = 0, len = ref.length; j < len; j++) {
	        name = ref[j];
	        if (this.settings.reporting[name] && !this.settings.reporting[name].swf) {
	          this.settings.reporting[name].swf = this.assetPath(name + "SwfSrc");
	        }
	      }
	    }
	    if (this.settings.backgroundColor == null) {
	      return this.settings.backgroundColor = "0x000000";
	    }
	  };

	  FlashProxy.prototype.assetPath = function(key, fallback) {
	    var filename;
	    if (fallback == null) {
	      fallback = null;
	    }
	    if ((assets != null) && assets[key]) {
	      filename = assets[key];
	      if ((this.settings.assetPaths != null) && this.settings.assetPaths[filename]) {
	        return this.settings.assetPaths[filename];
	      } else {
	        return filename;
	      }
	    } else {
	      return fallback;
	    }
	  };

	  FlashProxy.prototype.initiateContainer = function(container) {
	    this.container = typeof container === 'string' ? $(container) : container;
	    this.playerID = this.container[0].id + "-flashObject";
	    this.functionPrefix = this.playerID.split("-").join("_");
	    return this.container[0].innerHTML = "<div id='" + this.playerID + "'><p>" + this.flash_install_message + " <a href='https://get.adobe.com/flashplayer/' target='_blank'>Flash Plugin</a></p></div>";
	  };

	  FlashProxy.prototype.initiateJSInterface = function() {
	    if (window.mtvnPlayerLoadedCallbacks == null) {
	      window.mtvnPlayerLoadedCallbacks = [];
	    }
	    window.mtvnPlayerLoadedCallbacks.push(((function(_this) {
	      return function(oid, flvid) {
	        _this.player().addEventListener("READY", _this.functionPrefix + "_isready");
	        _this.player().addEventListener("STATE_CHANGE", _this.functionPrefix + "_stateChanged");
	        _this.player().addEventListener("AD_STATE_CHANGE", _this.functionPrefix + "_stateChanged");
	        return _this.player().addEventListener("TRACKING_EVENT", _this.functionPrefix + "_trackingEventHandler");
	      };
	    })(this)));
	    window[this.functionPrefix + "_isready"] = (function(_this) {
	      return function() {
	        return _this.triggerEvent('ready', _this.playerID);
	      };
	    })(this);
	    window[this.functionPrefix + "_stateChanged"] = (function(_this) {
	      return function(state) {
	        _this.triggerEvent(_this.eventMap[state]);
	        _this.clearIntervals();
	        if (_this.adplaying && state !== "adbreak") {
	          _this.triggerEvent(_this.eventMap["adend"]);
	          _this.adplaying = false;
	        }
	        if (state === "buffering" && _this.loadCallback !== null) {
	          _this.loadCallback();
	          return _this.loadCallback = null;
	        } else if (state === "playing") {
	          return _this.timer = setInterval(_this.playheadUpdate, 100);
	        } else if (state === "adPlaybackStart") {
	          _this.triggerEvent(_this.eventMap["adstart"]);
	          return _this.adplaying = true;
	        }
	      };
	    })(this);
	    return window[this.functionPrefix + "_trackingEventHandler"] = (function(_this) {
	      return function(details) {
	        var ename, key, ref, value;
	        details.playerid = "(Flash Player)";
	        ref = _this.trackingevents;
	        for (key in ref) {
	          value = ref[key];
	          if (key === details.action) {
	            details.action = value;
	            _this.triggerEvent("track", details);
	            return;
	          }
	        }
	        if (details.isad) {
	          ename = "video:ad:";
	        } else {
	          ename = "video:content:";
	        }
	        switch (details.action) {
	          case "pause":
	          case "play":
	          case "fullscreen":
	          case "fullscreenExit":
	          case "mute":
	          case "unmute":
	            ename = "video:ui:";
	        }
	        if (_this.eventMap[details.action]) {
	          ename += _this.eventMap[details.action];
	        } else {
	          ename += details.action;
	        }
	        details.action = ename;
	        return _this.triggerEvent("track", details);
	      };
	    })(this);
	  };

	  FlashProxy.prototype.embedPlayer = function() {
	    var attributes, ff, flashvars, params, swfSrc, windose;
	    swfSrc = this.assetPath('playerSwfSrc', this.settings.swfSrc);
	    this.cleanupSettings();
	    flashvars = {
	      "autoPlay": true,
	      "overscan": true,
	      "configObject": JSON.stringify(this.settings),
	      "debugMode": false,
	      "mrssvars": this.mrssvars,
	      "image": this.settings.image ? this.settings.image : null,
	      "url": window.location.href
	    };
	    if (!(this.settings.ads == null)) {
	      flashvars.adsActive = this.settings.ads.enabled;
	    }
	    if (this.settings.autoplay != null) {
	      flashvars.autoPlay = this.settings.autoplay;
	    }
	    if (this.settings.config != null) {
	      flashvars.config = this.settings.config;
	    }
	    if (!((this.settings.ads == null) || (this.settings.ads.fw_ssid == null))) {
	      flashvars.fw_ssid = this.settings.ads.fw_ssid;
	    }
	    if (this.settings.controls === false) {
	      flashvars.controls = "off";
	      flashvars.chromeless = true;
	    }
	    params = {
	      "allowscriptaccess": "always",
	      "allowfullscreen": "true",
	      "bgcolor": "#000000"
	    };
	    ff = /(Firefox)/g;
	    windose = /(Windows)/g;
	    params.wmode = window.navigator.userAgent.search(ff) && window.navigator.userAgent.search(windose) ? "transparent" : "direct";
	    attributes = {
	      "name": this.playerID,
	      "id": this.playerID
	    };
	    if (window.swfobject != null) {
	      return window.swfobject.embedSWF(swfSrc, this.playerID, "100%", "100%", "11.0.0", "", flashvars, params, attributes);
	    } else {
	      return console.warn('cannot embed swf player, swfobject unavailable: ', window.swfobject);
	    }
	  };

	  FlashProxy.prototype.cleanupSettings = function() {
	    var key, newtranslations, ref, value;
	    delete this.settings.force;
	    delete this.settings.html5smartTVMode;
	    delete this.settings.logger;
	    delete this.settings.blankVideo;
	    delete this.settings.localisation;
	    delete this.settings.swfSrc;
	    delete this.settings.customVideoAttributes;
	    if (this.settings.ads) {
	      delete this.settings.ads.context;
	      delete this.settings.ads.engine;
	      delete this.settings.ads.library;
	      delete this.settings.ads.manager;
	      delete this.settings.ads.midroll_intervals;
	    }
	    if (this.settings.reporting) {
	      delete this.settings.reporting.interval;
	      if (this.settings.reporting.omniture) {
	        delete this.settings.reporting.omniture.label;
	        delete this.settings.reporting.omniture.library;
	        delete this.settings.reporting.omniture.pageNameBase;
	      }
	    }
	    if (this.settings.localization && this.settings.localization.translations) {
	      newtranslations = {};
	      ref = this.settings.localization.translations;
	      for (key in ref) {
	        value = ref[key];
	        switch (key) {
	          case "quality":
	          case "autorendition":
	          case "turnoffadblocker":
	          case "countdown":
	            newtranslations[key] = value;
	        }
	      }
	      return this.settings.localization.translations = newtranslations;
	    }
	  };

	  FlashProxy.prototype.initiateConstants = function() {
	    var flash_install_messages;
	    flash_install_messages = {
	      "en": "For playback of this content, please install the",
	      "de": "Zum Abspielen des Videos benötigst Du das",
	      "fr": "Pour la lecture des videos veuillez installer le",
	      "nl": "Om te spelen video's installeert u",
	      "be": "Om te spelen video's installeert u",
	      "pl": "Aby odtwarzać filmy należy zainstalować",
	      "dk": "For at afspille videoer du installere",
	      "se": "Spela upp videoklipp installera",
	      "no": "For å spille av videoer må du installere",
	      "ja": "このコンテンツの再生にはフラッシュプレイヤーが必要となっております。こちらからダウンロードしてください"
	    };
	    this.flash_install_message = flash_install_messages[window.navigator.language.substr(0, 2)] || flash_install_messages['en'];
	    this.eventMap = {
	      "playing": "play",
	      "complete": "ended",
	      "paused": "paused",
	      "pause": "paused",
	      "buffering": "progress",
	      "error": "error",
	      "geoblocked": "error",
	      "adstart": "ads:rollPlaying",
	      "adend": "ads:rollEnded"
	    };
	    return this.trackingevents = {
	      "ready": "video:content:ready",
	      "adblocked": "video:ad:blocked",
	      "start": "video:ad:started",
	      "creativeView": "video:ad:creativeView",
	      "playbackStart": "video:content:started",
	      "videoViewed": "video:content:nearend",
	      "mrssEnd": "video:content:ended"
	    };
	  };

	  return FlashProxy;

	})();

	if (window.mtvnPlayerLoadedCallbacks == null) {
	  window.mtvnPlayerLoadedCallbacks = [];
	}

	window.mtvnPlayerLoaded = function() {
	  var callback, j, len, results;
	  results = [];
	  for (j = 0, len = mtvnPlayerLoadedCallbacks.length; j < len; j++) {
	    callback = mtvnPlayerLoadedCallbacks[j];
	    results.push(callback.apply(null, arguments));
	  }
	  return results;
	};

	module.exports = FlashProxy;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  comscoreSwfSrc: __webpack_require__(9),
	  playerSwfSrc: __webpack_require__(10),
	  googleanalyticsSwfSrc: __webpack_require__(11),
	  gemiusSwfSrc: __webpack_require__(12),
	  nielsenSwfSrc: __webpack_require__(13)
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "comscore.swf";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "g2player.swf";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ga.swf";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "gemius.swf";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "nielsen.swf";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	console.log("Mediaplayer version: " + ("2.1.4"));

	module.exports = ("2.1.4");


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	*/
	var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

	/*** EXPORTS FROM exports-loader ***/
	module.exports = swfobject;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Mediaplayer;

	Mediaplayer = __webpack_require__(1);

	Mediaplayer.VERSION = __webpack_require__(14);

	window.VIACOM || (window.VIACOM = {});

	window.VIACOM.Mediaplayer = Mediaplayer;


/***/ }
/******/ ])
});
;