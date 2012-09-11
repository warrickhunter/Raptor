window.rangy = function() {
  function l(p, u) {
    var w = typeof p[u];
    return w == "function" || !!(w == "object" && p[u]) || w == "unknown"
  }
  function K(p, u) {
    return!!(typeof p[u] == "object" && p[u])
  }
  function H(p, u) {
    return typeof p[u] != "undefined"
  }
  function I(p) {
    return function(u, w) {
      for(var B = w.length;B--;) {
        if(!p(u, w[B])) {
          return false
        }
      }
      return true
    }
  }
  function z(p) {
    return p && A(p, x) && v(p, t)
  }
  function C(p) {
    window.alert("Rangy not supported in your browser. Reason: " + p);
    c.initialized = true;
    c.supported = false
  }
  function N() {
    if(!c.initialized) {
      var p, u = false, w = false;
      if(l(document, "createRange")) {
        p = document.createRange();
        if(A(p, n) && v(p, i)) {
          u = true
        }
        p.detach()
      }
      if((p = K(document, "body") ? document.body : document.getElementsByTagName("body")[0]) && l(p, "createTextRange")) {
        p = p.createTextRange();
        if(z(p)) {
          w = true
        }
      }
      !u && !w && C("Neither Range nor TextRange are implemented");
      c.initialized = true;
      c.features = {implementsDomRange:u, implementsTextRange:w};
      u = k.concat(f);
      w = 0;
      for(p = u.length;w < p;++w) {
        try {
          u[w](c)
        }catch(B) {
          K(window, "console") && l(window.console, "log") && window.console.log("Init listener threw an exception. Continuing.", B)
        }
      }
    }
  }
  function O(p) {
    this.name = p;
    this.supported = this.initialized = false
  }
  var i = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END"], n = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"], t = ["boundingHeight", "boundingLeft", 
  "boundingTop", "boundingWidth", "htmlText", "text"], x = ["collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect"], A = I(l), q = I(K), v = I(H), c = {version:"1.2.3", initialized:false, supported:true, util:{isHostMethod:l, isHostObject:K, isHostProperty:H, areHostMethods:A, areHostObjects:q, areHostProperties:v, isTextRange:z}, features:{}, modules:{}, config:{alertOnWarn:false, 
  preferTextRange:false}};
  c.fail = C;
  c.warn = function(p) {
    p = "Rangy warning: " + p;
    if(c.config.alertOnWarn) {
      window.alert(p)
    }else {
      typeof window.console != "undefined" && typeof window.console.log != "undefined" && window.console.log(p)
    }
  };
  if({}.hasOwnProperty) {
    c.util.extend = function(p, u) {
      for(var w in u) {
        if(u.hasOwnProperty(w)) {
          p[w] = u[w]
        }
      }
    }
  }else {
    C("hasOwnProperty not supported")
  }
  var f = [], k = [];
  c.init = N;
  c.addInitListener = function(p) {
    c.initialized ? p(c) : f.push(p)
  };
  var r = [];
  c.addCreateMissingNativeApiListener = function(p) {
    r.push(p)
  };
  c.createMissingNativeApi = function(p) {
    p = p || window;
    N();
    for(var u = 0, w = r.length;u < w;++u) {
      r[u](p)
    }
  };
  O.prototype.fail = function(p) {
    this.initialized = true;
    this.supported = false;
    throw Error("Module '" + this.name + "' failed to load: " + p);
  };
  O.prototype.warn = function(p) {
    c.warn("Module " + this.name + ": " + p)
  };
  O.prototype.createError = function(p) {
    return Error("Error in Rangy " + this.name + " module: " + p)
  };
  c.createModule = function(p, u) {
    var w = new O(p);
    c.modules[p] = w;
    k.push(function(B) {
      u(B, w);
      w.initialized = true;
      w.supported = true
    })
  };
  c.requireModules = function(p) {
    for(var u = 0, w = p.length, B, V;u < w;++u) {
      V = p[u];
      B = c.modules[V];
      if(!B || !(B instanceof O)) {
        throw Error("Module '" + V + "' not found");
      }
      if(!B.supported) {
        throw Error("Module '" + V + "' not supported");
      }
    }
  };
  var L = false;
  q = function() {
    if(!L) {
      L = true;
      c.initialized || N()
    }
  };
  if(typeof window == "undefined") {
    C("No window found")
  }else {
    if(typeof document == "undefined") {
      C("No document found")
    }else {
      l(document, "addEventListener") && document.addEventListener("DOMContentLoaded", q, false);
      if(l(window, "addEventListener")) {
        window.addEventListener("load", q, false)
      }else {
        l(window, "attachEvent") ? window.attachEvent("onload", q) : C("Window does not have required addEventListener or attachEvent method")
      }
      return c
    }
  }
}();
rangy.createModule("DomUtil", function(l, K) {
  function H(c) {
    for(var f = 0;c = c.previousSibling;) {
      f++
    }
    return f
  }
  function I(c, f) {
    var k = [], r;
    for(r = c;r;r = r.parentNode) {
      k.push(r)
    }
    for(r = f;r;r = r.parentNode) {
      if(v(k, r)) {
        return r
      }
    }
    return null
  }
  function z(c, f, k) {
    for(k = k ? c : c.parentNode;k;) {
      c = k.parentNode;
      if(c === f) {
        return k
      }
      k = c
    }
    return null
  }
  function C(c) {
    c = c.nodeType;
    return c == 3 || c == 4 || c == 8
  }
  function N(c, f) {
    var k = f.nextSibling, r = f.parentNode;
    k ? r.insertBefore(c, k) : r.appendChild(c);
    return c
  }
  function O(c) {
    if(c.nodeType == 9) {
      return c
    }else {
      if(typeof c.ownerDocument != "undefined") {
        return c.ownerDocument
      }else {
        if(typeof c.document != "undefined") {
          return c.document
        }else {
          if(c.parentNode) {
            return O(c.parentNode)
          }else {
            throw Error("getDocument: no document found for node");
          }
        }
      }
    }
  }
  function i(c) {
    if(!c) {
      return"[No node]"
    }
    return C(c) ? '"' + c.data + '"' : c.nodeType == 1 ? "<" + c.nodeName + (c.id ? ' id="' + c.id + '"' : "") + ">[" + c.childNodes.length + "]" : c.nodeName
  }
  function n(c) {
    this._next = this.root = c
  }
  function t(c, f) {
    this.node = c;
    this.offset = f
  }
  function x(c) {
    this.code = this[c];
    this.codeName = c;
    this.message = "DOMException: " + this.codeName
  }
  var A = l.util;
  A.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || K.fail("document missing a Node creation method");
  A.isHostMethod(document, "getElementsByTagName") || K.fail("document missing getElementsByTagName method");
  var q = document.createElement("div");
  A.areHostMethods(q, ["insertBefore", "appendChild", "cloneNode"]) || K.fail("Incomplete Element implementation");
  A.isHostProperty(q, "innerHTML") || K.fail("Element is missing innerHTML property");
  q = document.createTextNode("test");
  A.areHostMethods(q, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"]) || K.fail("Incomplete Text Node implementation");
  var v = function(c, f) {
    for(var k = c.length;k--;) {
      if(c[k] === f) {
        return true
      }
    }
    return false
  };
  n.prototype = {_current:null, hasNext:function() {
    return!!this._next
  }, next:function() {
    var c = this._current = this._next, f;
    if(this._current) {
      if(f = c.firstChild) {
        this._next = f
      }else {
        for(f = null;c !== this.root && !(f = c.nextSibling);) {
          c = c.parentNode
        }
        this._next = f
      }
    }
    return this._current
  }, detach:function() {
    this._current = this._next = this.root = null
  }};
  t.prototype = {equals:function(c) {
    return this.node === c.node & this.offset == c.offset
  }, inspect:function() {
    return"[DomPosition(" + i(this.node) + ":" + this.offset + ")]"
  }};
  x.prototype = {INDEX_SIZE_ERR:1, HIERARCHY_REQUEST_ERR:3, WRONG_DOCUMENT_ERR:4, NO_MODIFICATION_ALLOWED_ERR:7, NOT_FOUND_ERR:8, NOT_SUPPORTED_ERR:9, INVALID_STATE_ERR:11};
  x.prototype.toString = function() {
    return this.message
  };
  l.dom = {arrayContains:v, isHtmlNamespace:function(c) {
    var f;
    return typeof c.namespaceURI == "undefined" || (f = c.namespaceURI) === null || f == "http://www.w3.org/1999/xhtml"
  }, parentElement:function(c) {
    c = c.parentNode;
    return c.nodeType == 1 ? c : null
  }, getNodeIndex:H, getNodeLength:function(c) {
    var f;
    return C(c) ? c.length : (f = c.childNodes) ? f.length : 0
  }, getCommonAncestor:I, isAncestorOf:function(c, f, k) {
    for(f = k ? f : f.parentNode;f;) {
      if(f === c) {
        return true
      }else {
        f = f.parentNode
      }
    }
    return false
  }, getClosestAncestorIn:z, isCharacterDataNode:C, insertAfter:N, splitDataNode:function(c, f) {
    var k = c.cloneNode(false);
    k.deleteData(0, f);
    c.deleteData(f, c.length - f);
    N(k, c);
    return k
  }, getDocument:O, getWindow:function(c) {
    c = O(c);
    if(typeof c.defaultView != "undefined") {
      return c.defaultView
    }else {
      if(typeof c.parentWindow != "undefined") {
        return c.parentWindow
      }else {
        throw Error("Cannot get a window object for node");
      }
    }
  }, getIframeWindow:function(c) {
    if(typeof c.contentWindow != "undefined") {
      return c.contentWindow
    }else {
      if(typeof c.contentDocument != "undefined") {
        return c.contentDocument.defaultView
      }else {
        throw Error("getIframeWindow: No Window object found for iframe element");
      }
    }
  }, getIframeDocument:function(c) {
    if(typeof c.contentDocument != "undefined") {
      return c.contentDocument
    }else {
      if(typeof c.contentWindow != "undefined") {
        return c.contentWindow.document
      }else {
        throw Error("getIframeWindow: No Document object found for iframe element");
      }
    }
  }, getBody:function(c) {
    return A.isHostObject(c, "body") ? c.body : c.getElementsByTagName("body")[0]
  }, getRootContainer:function(c) {
    for(var f;f = c.parentNode;) {
      c = f
    }
    return c
  }, comparePoints:function(c, f, k, r) {
    var L;
    if(c == k) {
      return f === r ? 0 : f < r ? -1 : 1
    }else {
      if(L = z(k, c, true)) {
        return f <= H(L) ? -1 : 1
      }else {
        if(L = z(c, k, true)) {
          return H(L) < r ? -1 : 1
        }else {
          f = I(c, k);
          c = c === f ? f : z(c, f, true);
          k = k === f ? f : z(k, f, true);
          if(c === k) {
            throw Error("comparePoints got to case 4 and childA and childB are the same!");
          }else {
            for(f = f.firstChild;f;) {
              if(f === c) {
                return-1
              }else {
                if(f === k) {
                  return 1
                }
              }
              f = f.nextSibling
            }
            throw Error("Should not be here!");
          }
        }
      }
    }
  }, inspectNode:i, fragmentFromNodeChildren:function(c) {
    for(var f = O(c).createDocumentFragment(), k;k = c.firstChild;) {
      f.appendChild(k)
    }
    return f
  }, createIterator:function(c) {
    return new n(c)
  }, DomPosition:t};
  l.DOMException = x
});
rangy.createModule("DomRange", function(l) {
  function K(a, e) {
    return a.nodeType != 3 && (g.isAncestorOf(a, e.startContainer, true) || g.isAncestorOf(a, e.endContainer, true))
  }
  function H(a) {
    return g.getDocument(a.startContainer)
  }
  function I(a, e, j) {
    if(e = a._listeners[e]) {
      for(var o = 0, E = e.length;o < E;++o) {
        e[o].call(a, {target:a, args:j})
      }
    }
  }
  function z(a) {
    return new Z(a.parentNode, g.getNodeIndex(a))
  }
  function C(a) {
    return new Z(a.parentNode, g.getNodeIndex(a) + 1)
  }
  function N(a, e, j) {
    var o = a.nodeType == 11 ? a.firstChild : a;
    if(g.isCharacterDataNode(e)) {
      j == e.length ? g.insertAfter(a, e) : e.parentNode.insertBefore(a, j == 0 ? e : g.splitDataNode(e, j))
    }else {
      j >= e.childNodes.length ? e.appendChild(a) : e.insertBefore(a, e.childNodes[j])
    }
    return o
  }
  function O(a) {
    for(var e, j, o = H(a.range).createDocumentFragment();j = a.next();) {
      e = a.isPartiallySelectedSubtree();
      j = j.cloneNode(!e);
      if(e) {
        e = a.getSubtreeIterator();
        j.appendChild(O(e));
        e.detach(true)
      }
      if(j.nodeType == 10) {
        throw new S("HIERARCHY_REQUEST_ERR");
      }
      o.appendChild(j)
    }
    return o
  }
  function i(a, e, j) {
    var o, E;
    for(j = j || {stop:false};o = a.next();) {
      if(a.isPartiallySelectedSubtree()) {
        if(e(o) === false) {
          j.stop = true;
          return
        }else {
          o = a.getSubtreeIterator();
          i(o, e, j);
          o.detach(true);
          if(j.stop) {
            return
          }
        }
      }else {
        for(o = g.createIterator(o);E = o.next();) {
          if(e(E) === false) {
            j.stop = true;
            return
          }
        }
      }
    }
  }
  function n(a) {
    for(var e;a.next();) {
      if(a.isPartiallySelectedSubtree()) {
        e = a.getSubtreeIterator();
        n(e);
        e.detach(true)
      }else {
        a.remove()
      }
    }
  }
  function t(a) {
    for(var e, j = H(a.range).createDocumentFragment(), o;e = a.next();) {
      if(a.isPartiallySelectedSubtree()) {
        e = e.cloneNode(false);
        o = a.getSubtreeIterator();
        e.appendChild(t(o));
        o.detach(true)
      }else {
        a.remove()
      }
      if(e.nodeType == 10) {
        throw new S("HIERARCHY_REQUEST_ERR");
      }
      j.appendChild(e)
    }
    return j
  }
  function x(a, e, j) {
    var o = !!(e && e.length), E, T = !!j;
    if(o) {
      E = RegExp("^(" + e.join("|") + ")$")
    }
    var m = [];
    i(new q(a, false), function(s) {
      if((!o || E.test(s.nodeType)) && (!T || j(s))) {
        m.push(s)
      }
    });
    return m
  }
  function A(a) {
    return"[" + (typeof a.getName == "undefined" ? "Range" : a.getName()) + "(" + g.inspectNode(a.startContainer) + ":" + a.startOffset + ", " + g.inspectNode(a.endContainer) + ":" + a.endOffset + ")]"
  }
  function q(a, e) {
    this.range = a;
    this.clonePartiallySelectedTextNodes = e;
    if(!a.collapsed) {
      this.sc = a.startContainer;
      this.so = a.startOffset;
      this.ec = a.endContainer;
      this.eo = a.endOffset;
      var j = a.commonAncestorContainer;
      if(this.sc === this.ec && g.isCharacterDataNode(this.sc)) {
        this.isSingleCharacterDataNode = true;
        this._first = this._last = this._next = this.sc
      }else {
        this._first = this._next = this.sc === j && !g.isCharacterDataNode(this.sc) ? this.sc.childNodes[this.so] : g.getClosestAncestorIn(this.sc, j, true);
        this._last = this.ec === j && !g.isCharacterDataNode(this.ec) ? this.ec.childNodes[this.eo - 1] : g.getClosestAncestorIn(this.ec, j, true)
      }
    }
  }
  function v(a) {
    this.code = this[a];
    this.codeName = a;
    this.message = "RangeException: " + this.codeName
  }
  function c(a, e, j) {
    this.nodes = x(a, e, j);
    this._next = this.nodes[0];
    this._position = 0
  }
  function f(a) {
    return function(e, j) {
      for(var o, E = j ? e : e.parentNode;E;) {
        o = E.nodeType;
        if(g.arrayContains(a, o)) {
          return E
        }
        E = E.parentNode
      }
      return null
    }
  }
  function k(a, e) {
    if(G(a, e)) {
      throw new v("INVALID_NODE_TYPE_ERR");
    }
  }
  function r(a) {
    if(!a.startContainer) {
      throw new S("INVALID_STATE_ERR");
    }
  }
  function L(a, e) {
    if(!g.arrayContains(e, a.nodeType)) {
      throw new v("INVALID_NODE_TYPE_ERR");
    }
  }
  function p(a, e) {
    if(e < 0 || e > (g.isCharacterDataNode(a) ? a.length : a.childNodes.length)) {
      throw new S("INDEX_SIZE_ERR");
    }
  }
  function u(a, e) {
    if(h(a, true) !== h(e, true)) {
      throw new S("WRONG_DOCUMENT_ERR");
    }
  }
  function w(a) {
    if(D(a, true)) {
      throw new S("NO_MODIFICATION_ALLOWED_ERR");
    }
  }
  function B(a, e) {
    if(!a) {
      throw new S(e);
    }
  }
  function V(a) {
    return!!a.startContainer && !!a.endContainer && !(!g.arrayContains(ba, a.startContainer.nodeType) && !h(a.startContainer, true)) && !(!g.arrayContains(ba, a.endContainer.nodeType) && !h(a.endContainer, true)) && a.startOffset <= (g.isCharacterDataNode(a.startContainer) ? a.startContainer.length : a.startContainer.childNodes.length) && a.endOffset <= (g.isCharacterDataNode(a.endContainer) ? a.endContainer.length : a.endContainer.childNodes.length)
  }
  function J(a) {
    r(a);
    if(!V(a)) {
      throw Error("Range error: Range is no longer valid after DOM mutation (" + a.inspect() + ")");
    }
  }
  function ca() {
  }
  function Y(a) {
    a.START_TO_START = ia;
    a.START_TO_END = la;
    a.END_TO_END = ra;
    a.END_TO_START = ma;
    a.NODE_BEFORE = na;
    a.NODE_AFTER = oa;
    a.NODE_BEFORE_AND_AFTER = pa;
    a.NODE_INSIDE = ja
  }
  function W(a) {
    Y(a);
    Y(a.prototype)
  }
  function da(a, e) {
    return function() {
      J(this);
      var j = this.startContainer, o = this.startOffset, E = this.commonAncestorContainer, T = new q(this, true);
      if(j !== E) {
        j = g.getClosestAncestorIn(j, E, true);
        o = C(j);
        j = o.node;
        o = o.offset
      }
      i(T, w);
      T.reset();
      E = a(T);
      T.detach();
      e(this, j, o, j, o);
      return E
    }
  }
  function fa(a, e, j) {
    function o(m, s) {
      return function(y) {
        r(this);
        L(y, $);
        L(d(y), ba);
        y = (m ? z : C)(y);
        (s ? E : T)(this, y.node, y.offset)
      }
    }
    function E(m, s, y) {
      var F = m.endContainer, Q = m.endOffset;
      if(s !== m.startContainer || y !== m.startOffset) {
        if(d(s) != d(F) || g.comparePoints(s, y, F, Q) == 1) {
          F = s;
          Q = y
        }
        e(m, s, y, F, Q)
      }
    }
    function T(m, s, y) {
      var F = m.startContainer, Q = m.startOffset;
      if(s !== m.endContainer || y !== m.endOffset) {
        if(d(s) != d(F) || g.comparePoints(s, y, F, Q) == -1) {
          F = s;
          Q = y
        }
        e(m, F, Q, s, y)
      }
    }
    a.prototype = new ca;
    l.util.extend(a.prototype, {setStart:function(m, s) {
      r(this);
      k(m, true);
      p(m, s);
      E(this, m, s)
    }, setEnd:function(m, s) {
      r(this);
      k(m, true);
      p(m, s);
      T(this, m, s)
    }, setStartBefore:o(true, true), setStartAfter:o(false, true), setEndBefore:o(true, false), setEndAfter:o(false, false), collapse:function(m) {
      J(this);
      m ? e(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : e(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
    }, selectNodeContents:function(m) {
      r(this);
      k(m, true);
      e(this, m, 0, m, g.getNodeLength(m))
    }, selectNode:function(m) {
      r(this);
      k(m, false);
      L(m, $);
      var s = z(m);
      m = C(m);
      e(this, s.node, s.offset, m.node, m.offset)
    }, extractContents:da(t, e), deleteContents:da(n, e), canSurroundContents:function() {
      J(this);
      w(this.startContainer);
      w(this.endContainer);
      var m = new q(this, true), s = m._first && K(m._first, this) || m._last && K(m._last, this);
      m.detach();
      return!s
    }, detach:function() {
      j(this)
    }, splitBoundaries:function() {
      J(this);
      var m = this.startContainer, s = this.startOffset, y = this.endContainer, F = this.endOffset, Q = m === y;
      g.isCharacterDataNode(y) && F > 0 && F < y.length && g.splitDataNode(y, F);
      if(g.isCharacterDataNode(m) && s > 0 && s < m.length) {
        m = g.splitDataNode(m, s);
        if(Q) {
          F -= s;
          y = m
        }else {
          y == m.parentNode && F >= g.getNodeIndex(m) && F++
        }
        s = 0
      }
      e(this, m, s, y, F)
    }, normalizeBoundaries:function() {
      J(this);
      var m = this.startContainer, s = this.startOffset, y = this.endContainer, F = this.endOffset, Q = function(U) {
        var R = U.nextSibling;
        if(R && R.nodeType == U.nodeType) {
          y = U;
          F = U.length;
          U.appendData(R.data);
          R.parentNode.removeChild(R)
        }
      }, qa = function(U) {
        var R = U.previousSibling;
        if(R && R.nodeType == U.nodeType) {
          m = U;
          var sa = U.length;
          s = R.length;
          U.insertData(0, R.data);
          R.parentNode.removeChild(R);
          if(m == y) {
            F += s;
            y = m
          }else {
            if(y == U.parentNode) {
              R = g.getNodeIndex(U);
              if(F == R) {
                y = U;
                F = sa
              }else {
                F > R && F--
              }
            }
          }
        }
      }, ga = true;
      if(g.isCharacterDataNode(y)) {
        y.length == F && Q(y)
      }else {
        if(F > 0) {
          (ga = y.childNodes[F - 1]) && g.isCharacterDataNode(ga) && Q(ga)
        }
        ga = !this.collapsed
      }
      if(ga) {
        if(g.isCharacterDataNode(m)) {
          s == 0 && qa(m)
        }else {
          if(s < m.childNodes.length) {
            (Q = m.childNodes[s]) && g.isCharacterDataNode(Q) && qa(Q)
          }
        }
      }else {
        m = y;
        s = F
      }
      e(this, m, s, y, F)
    }, collapseToPoint:function(m, s) {
      r(this);
      k(m, true);
      p(m, s);
      if(m !== this.startContainer || s !== this.startOffset || m !== this.endContainer || s !== this.endOffset) {
        e(this, m, s, m, s)
      }
    }});
    W(a)
  }
  function ea(a) {
    a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset;
    a.commonAncestorContainer = a.collapsed ? a.startContainer : g.getCommonAncestor(a.startContainer, a.endContainer)
  }
  function ha(a, e, j, o, E) {
    var T = a.startContainer !== e || a.startOffset !== j, m = a.endContainer !== o || a.endOffset !== E;
    a.startContainer = e;
    a.startOffset = j;
    a.endContainer = o;
    a.endOffset = E;
    ea(a);
    I(a, "boundarychange", {startMoved:T, endMoved:m})
  }
  function M(a) {
    this.startContainer = a;
    this.startOffset = 0;
    this.endContainer = a;
    this.endOffset = 0;
    this._listeners = {boundarychange:[], detach:[]};
    ea(this)
  }
  l.requireModules(["DomUtil"]);
  var g = l.dom, Z = g.DomPosition, S = l.DOMException;
  q.prototype = {_current:null, _next:null, _first:null, _last:null, isSingleCharacterDataNode:false, reset:function() {
    this._current = null;
    this._next = this._first
  }, hasNext:function() {
    return!!this._next
  }, next:function() {
    var a = this._current = this._next;
    if(a) {
      this._next = a !== this._last ? a.nextSibling : null;
      if(g.isCharacterDataNode(a) && this.clonePartiallySelectedTextNodes) {
        if(a === this.ec) {
          (a = a.cloneNode(true)).deleteData(this.eo, a.length - this.eo)
        }
        if(this._current === this.sc) {
          (a = a.cloneNode(true)).deleteData(0, this.so)
        }
      }
    }
    return a
  }, remove:function() {
    var a = this._current, e, j;
    if(g.isCharacterDataNode(a) && (a === this.sc || a === this.ec)) {
      e = a === this.sc ? this.so : 0;
      j = a === this.ec ? this.eo : a.length;
      e != j && a.deleteData(e, j - e)
    }else {
      a.parentNode && a.parentNode.removeChild(a)
    }
  }, isPartiallySelectedSubtree:function() {
    return K(this._current, this.range)
  }, getSubtreeIterator:function() {
    var a;
    if(this.isSingleCharacterDataNode) {
      a = this.range.cloneRange();
      a.collapse()
    }else {
      a = new M(H(this.range));
      var e = this._current, j = e, o = 0, E = e, T = g.getNodeLength(e);
      if(g.isAncestorOf(e, this.sc, true)) {
        j = this.sc;
        o = this.so
      }
      if(g.isAncestorOf(e, this.ec, true)) {
        E = this.ec;
        T = this.eo
      }
      ha(a, j, o, E, T)
    }
    return new q(a, this.clonePartiallySelectedTextNodes)
  }, detach:function(a) {
    a && this.range.detach();
    this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
  }};
  v.prototype = {BAD_BOUNDARYPOINTS_ERR:1, INVALID_NODE_TYPE_ERR:2};
  v.prototype.toString = function() {
    return this.message
  };
  c.prototype = {_current:null, hasNext:function() {
    return!!this._next
  }, next:function() {
    this._current = this._next;
    this._next = this.nodes[++this._position];
    return this._current
  }, detach:function() {
    this._current = this._next = this.nodes = null
  }};
  var $ = [1, 3, 4, 5, 7, 8, 10], ba = [2, 9, 11], aa = [1, 3, 4, 5, 7, 8, 10, 11], b = [1, 3, 4, 5, 7, 8], d = g.getRootContainer, h = f([9, 11]), D = f([5, 6, 10, 12]), G = f([6, 10, 12]), P = document.createElement("style"), X = false;
  try {
    P.innerHTML = "<b>x</b>";
    X = P.firstChild.nodeType == 3
  }catch(ta) {
  }
  l.features.htmlParsingConforms = X;
  var ka = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"], ia = 0, la = 1, ra = 2, ma = 3, na = 0, oa = 1, pa = 2, ja = 3;
  ca.prototype = {attachListener:function(a, e) {
    this._listeners[a].push(e)
  }, compareBoundaryPoints:function(a, e) {
    J(this);
    u(this.startContainer, e.startContainer);
    var j = a == ma || a == ia ? "start" : "end", o = a == la || a == ia ? "start" : "end";
    return g.comparePoints(this[j + "Container"], this[j + "Offset"], e[o + "Container"], e[o + "Offset"])
  }, insertNode:function(a) {
    J(this);
    L(a, aa);
    w(this.startContainer);
    if(g.isAncestorOf(a, this.startContainer, true)) {
      throw new S("HIERARCHY_REQUEST_ERR");
    }
    this.setStartBefore(N(a, this.startContainer, this.startOffset))
  }, cloneContents:function() {
    J(this);
    var a, e;
    if(this.collapsed) {
      return H(this).createDocumentFragment()
    }else {
      if(this.startContainer === this.endContainer && g.isCharacterDataNode(this.startContainer)) {
        a = this.startContainer.cloneNode(true);
        a.data = a.data.slice(this.startOffset, this.endOffset);
        e = H(this).createDocumentFragment();
        e.appendChild(a);
        return e
      }else {
        e = new q(this, true);
        a = O(e);
        e.detach()
      }
      return a
    }
  }, canSurroundContents:function() {
    J(this);
    w(this.startContainer);
    w(this.endContainer);
    var a = new q(this, true), e = a._first && K(a._first, this) || a._last && K(a._last, this);
    a.detach();
    return!e
  }, surroundContents:function(a) {
    L(a, b);
    if(!this.canSurroundContents()) {
      throw new v("BAD_BOUNDARYPOINTS_ERR");
    }
    var e = this.extractContents();
    if(a.hasChildNodes()) {
      for(;a.lastChild;) {
        a.removeChild(a.lastChild)
      }
    }
    N(a, this.startContainer, this.startOffset);
    a.appendChild(e);
    this.selectNode(a)
  }, cloneRange:function() {
    J(this);
    for(var a = new M(H(this)), e = ka.length, j;e--;) {
      j = ka[e];
      a[j] = this[j]
    }
    return a
  }, toString:function() {
    J(this);
    var a = this.startContainer;
    if(a === this.endContainer && g.isCharacterDataNode(a)) {
      return a.nodeType == 3 || a.nodeType == 4 ? a.data.slice(this.startOffset, this.endOffset) : ""
    }else {
      var e = [];
      a = new q(this, true);
      i(a, function(j) {
        if(j.nodeType == 3 || j.nodeType == 4) {
          e.push(j.data)
        }
      });
      a.detach();
      return e.join("")
    }
  }, compareNode:function(a) {
    J(this);
    var e = a.parentNode, j = g.getNodeIndex(a);
    if(!e) {
      throw new S("NOT_FOUND_ERR");
    }
    a = this.comparePoint(e, j);
    e = this.comparePoint(e, j + 1);
    return a < 0 ? e > 0 ? pa : na : e > 0 ? oa : ja
  }, comparePoint:function(a, e) {
    J(this);
    B(a, "HIERARCHY_REQUEST_ERR");
    u(a, this.startContainer);
    if(g.comparePoints(a, e, this.startContainer, this.startOffset) < 0) {
      return-1
    }else {
      if(g.comparePoints(a, e, this.endContainer, this.endOffset) > 0) {
        return 1
      }
    }
    return 0
  }, createContextualFragment:X ? function(a) {
    var e = this.startContainer, j = g.getDocument(e);
    if(!e) {
      throw new S("INVALID_STATE_ERR");
    }
    var o = null;
    if(e.nodeType == 1) {
      o = e
    }else {
      if(g.isCharacterDataNode(e)) {
        o = g.parentElement(e)
      }
    }
    o = o === null || o.nodeName == "HTML" && g.isHtmlNamespace(g.getDocument(o).documentElement) && g.isHtmlNamespace(o) ? j.createElement("body") : o.cloneNode(false);
    o.innerHTML = a;
    return g.fragmentFromNodeChildren(o)
  } : function(a) {
    r(this);
    var e = H(this).createElement("body");
    e.innerHTML = a;
    return g.fragmentFromNodeChildren(e)
  }, toHtml:function() {
    J(this);
    var a = H(this).createElement("div");
    a.appendChild(this.cloneContents());
    return a.innerHTML
  }, intersectsNode:function(a, e) {
    J(this);
    B(a, "NOT_FOUND_ERR");
    if(g.getDocument(a) !== H(this)) {
      return false
    }
    var j = a.parentNode, o = g.getNodeIndex(a);
    B(j, "NOT_FOUND_ERR");
    var E = g.comparePoints(j, o, this.endContainer, this.endOffset);
    j = g.comparePoints(j, o + 1, this.startContainer, this.startOffset);
    return e ? E <= 0 && j >= 0 : E < 0 && j > 0
  }, isPointInRange:function(a, e) {
    J(this);
    B(a, "HIERARCHY_REQUEST_ERR");
    u(a, this.startContainer);
    return g.comparePoints(a, e, this.startContainer, this.startOffset) >= 0 && g.comparePoints(a, e, this.endContainer, this.endOffset) <= 0
  }, intersectsRange:function(a, e) {
    J(this);
    if(H(a) != H(this)) {
      throw new S("WRONG_DOCUMENT_ERR");
    }
    var j = g.comparePoints(this.startContainer, this.startOffset, a.endContainer, a.endOffset), o = g.comparePoints(this.endContainer, this.endOffset, a.startContainer, a.startOffset);
    return e ? j <= 0 && o >= 0 : j < 0 && o > 0
  }, intersection:function(a) {
    if(this.intersectsRange(a)) {
      var e = g.comparePoints(this.startContainer, this.startOffset, a.startContainer, a.startOffset), j = g.comparePoints(this.endContainer, this.endOffset, a.endContainer, a.endOffset), o = this.cloneRange();
      e == -1 && o.setStart(a.startContainer, a.startOffset);
      j == 1 && o.setEnd(a.endContainer, a.endOffset);
      return o
    }
    return null
  }, union:function(a) {
    if(this.intersectsRange(a, true)) {
      var e = this.cloneRange();
      g.comparePoints(a.startContainer, a.startOffset, this.startContainer, this.startOffset) == -1 && e.setStart(a.startContainer, a.startOffset);
      g.comparePoints(a.endContainer, a.endOffset, this.endContainer, this.endOffset) == 1 && e.setEnd(a.endContainer, a.endOffset);
      return e
    }else {
      throw new v("Ranges do not intersect");
    }
  }, containsNode:function(a, e) {
    return e ? this.intersectsNode(a, false) : this.compareNode(a) == ja
  }, containsNodeContents:function(a) {
    return this.comparePoint(a, 0) >= 0 && this.comparePoint(a, g.getNodeLength(a)) <= 0
  }, containsRange:function(a) {
    return this.intersection(a).equals(a)
  }, containsNodeText:function(a) {
    var e = this.cloneRange();
    e.selectNode(a);
    var j = e.getNodes([3]);
    if(j.length > 0) {
      e.setStart(j[0], 0);
      a = j.pop();
      e.setEnd(a, a.length);
      a = this.containsRange(e);
      e.detach();
      return a
    }else {
      return this.containsNodeContents(a)
    }
  }, createNodeIterator:function(a, e) {
    J(this);
    return new c(this, a, e)
  }, getNodes:function(a, e) {
    J(this);
    return x(this, a, e)
  }, getDocument:function() {
    return H(this)
  }, collapseBefore:function(a) {
    r(this);
    this.setEndBefore(a);
    this.collapse(false)
  }, collapseAfter:function(a) {
    r(this);
    this.setStartAfter(a);
    this.collapse(true)
  }, getName:function() {
    return"DomRange"
  }, equals:function(a) {
    return M.rangesEqual(this, a)
  }, isValid:function() {
    return V(this)
  }, inspect:function() {
    return A(this)
  }};
  fa(M, ha, function(a) {
    r(a);
    a.startContainer = a.startOffset = a.endContainer = a.endOffset = null;
    a.collapsed = a.commonAncestorContainer = null;
    I(a, "detach", null);
    a._listeners = null
  });
  l.rangePrototype = ca.prototype;
  M.rangeProperties = ka;
  M.RangeIterator = q;
  M.copyComparisonConstants = W;
  M.createPrototypeRange = fa;
  M.inspect = A;
  M.getRangeDocument = H;
  M.rangesEqual = function(a, e) {
    return a.startContainer === e.startContainer && a.startOffset === e.startOffset && a.endContainer === e.endContainer && a.endOffset === e.endOffset
  };
  l.DomRange = M;
  l.RangeException = v
});
rangy.createModule("WrappedRange", function(l) {
  function K(i, n, t, x) {
    var A = i.duplicate();
    A.collapse(t);
    var q = A.parentElement();
    z.isAncestorOf(n, q, true) || (q = n);
    if(!q.canHaveHTML) {
      return new C(q.parentNode, z.getNodeIndex(q))
    }
    n = z.getDocument(q).createElement("span");
    var v, c = t ? "StartToStart" : "StartToEnd";
    do {
      q.insertBefore(n, n.previousSibling);
      A.moveToElementText(n)
    }while((v = A.compareEndPoints(c, i)) > 0 && n.previousSibling);
    c = n.nextSibling;
    if(v == -1 && c && z.isCharacterDataNode(c)) {
      A.setEndPoint(t ? "EndToStart" : "EndToEnd", i);
      if(/[\r\n]/.test(c.data)) {
        q = A.duplicate();
        t = q.text.replace(/\r\n/g, "\r").length;
        for(t = q.moveStart("character", t);q.compareEndPoints("StartToEnd", q) == -1;) {
          t++;
          q.moveStart("character", 1)
        }
      }else {
        t = A.text.length
      }
      q = new C(c, t)
    }else {
      c = (x || !t) && n.previousSibling;
      q = (t = (x || t) && n.nextSibling) && z.isCharacterDataNode(t) ? new C(t, 0) : c && z.isCharacterDataNode(c) ? new C(c, c.length) : new C(q, z.getNodeIndex(n))
    }
    n.parentNode.removeChild(n);
    return q
  }
  function H(i, n) {
    var t, x, A = i.offset, q = z.getDocument(i.node), v = q.body.createTextRange(), c = z.isCharacterDataNode(i.node);
    if(c) {
      t = i.node;
      x = t.parentNode
    }else {
      t = i.node.childNodes;
      t = A < t.length ? t[A] : null;
      x = i.node
    }
    q = q.createElement("span");
    q.innerHTML = "&#feff;";
    t ? x.insertBefore(q, t) : x.appendChild(q);
    v.moveToElementText(q);
    v.collapse(!n);
    x.removeChild(q);
    if(c) {
      v[n ? "moveStart" : "moveEnd"]("character", A)
    }
    return v
  }
  l.requireModules(["DomUtil", "DomRange"]);
  var I, z = l.dom, C = z.DomPosition, N = l.DomRange;
  if(l.features.implementsDomRange && (!l.features.implementsTextRange || !l.config.preferTextRange)) {
    (function() {
      function i(f) {
        for(var k = t.length, r;k--;) {
          r = t[k];
          f[r] = f.nativeRange[r]
        }
      }
      var n, t = N.rangeProperties, x, A;
      I = function(f) {
        if(!f) {
          throw Error("Range must be specified");
        }
        this.nativeRange = f;
        i(this)
      };
      N.createPrototypeRange(I, function(f, k, r, L, p) {
        var u = f.endContainer !== L || f.endOffset != p;
        if(f.startContainer !== k || f.startOffset != r || u) {
          f.setEnd(L, p);
          f.setStart(k, r)
        }
      }, function(f) {
        f.nativeRange.detach();
        f.detached = true;
        for(var k = t.length, r;k--;) {
          r = t[k];
          f[r] = null
        }
      });
      n = I.prototype;
      n.selectNode = function(f) {
        this.nativeRange.selectNode(f);
        i(this)
      };
      n.deleteContents = function() {
        this.nativeRange.deleteContents();
        i(this)
      };
      n.extractContents = function() {
        var f = this.nativeRange.extractContents();
        i(this);
        return f
      };
      n.cloneContents = function() {
        return this.nativeRange.cloneContents()
      };
      n.surroundContents = function(f) {
        this.nativeRange.surroundContents(f);
        i(this)
      };
      n.collapse = function(f) {
        this.nativeRange.collapse(f);
        i(this)
      };
      n.cloneRange = function() {
        return new I(this.nativeRange.cloneRange())
      };
      n.refresh = function() {
        i(this)
      };
      n.toString = function() {
        return this.nativeRange.toString()
      };
      var q = document.createTextNode("test");
      z.getBody(document).appendChild(q);
      var v = document.createRange();
      v.setStart(q, 0);
      v.setEnd(q, 0);
      try {
        v.setStart(q, 1);
        x = true;
        n.setStart = function(f, k) {
          this.nativeRange.setStart(f, k);
          i(this)
        };
        n.setEnd = function(f, k) {
          this.nativeRange.setEnd(f, k);
          i(this)
        };
        A = function(f) {
          return function(k) {
            this.nativeRange[f](k);
            i(this)
          }
        }
      }catch(c) {
        x = false;
        n.setStart = function(f, k) {
          try {
            this.nativeRange.setStart(f, k)
          }catch(r) {
            this.nativeRange.setEnd(f, k);
            this.nativeRange.setStart(f, k)
          }
          i(this)
        };
        n.setEnd = function(f, k) {
          try {
            this.nativeRange.setEnd(f, k)
          }catch(r) {
            this.nativeRange.setStart(f, k);
            this.nativeRange.setEnd(f, k)
          }
          i(this)
        };
        A = function(f, k) {
          return function(r) {
            try {
              this.nativeRange[f](r)
            }catch(L) {
              this.nativeRange[k](r);
              this.nativeRange[f](r)
            }
            i(this)
          }
        }
      }
      n.setStartBefore = A("setStartBefore", "setEndBefore");
      n.setStartAfter = A("setStartAfter", "setEndAfter");
      n.setEndBefore = A("setEndBefore", "setStartBefore");
      n.setEndAfter = A("setEndAfter", "setStartAfter");
      v.selectNodeContents(q);
      n.selectNodeContents = v.startContainer == q && v.endContainer == q && v.startOffset == 0 && v.endOffset == q.length ? function(f) {
        this.nativeRange.selectNodeContents(f);
        i(this)
      } : function(f) {
        this.setStart(f, 0);
        this.setEnd(f, N.getEndOffset(f))
      };
      v.selectNodeContents(q);
      v.setEnd(q, 3);
      x = document.createRange();
      x.selectNodeContents(q);
      x.setEnd(q, 4);
      x.setStart(q, 2);
      n.compareBoundaryPoints = v.compareBoundaryPoints(v.START_TO_END, x) == -1 & v.compareBoundaryPoints(v.END_TO_START, x) == 1 ? function(f, k) {
        k = k.nativeRange || k;
        if(f == k.START_TO_END) {
          f = k.END_TO_START
        }else {
          if(f == k.END_TO_START) {
            f = k.START_TO_END
          }
        }
        return this.nativeRange.compareBoundaryPoints(f, k)
      } : function(f, k) {
        return this.nativeRange.compareBoundaryPoints(f, k.nativeRange || k)
      };
      if(l.util.isHostMethod(v, "createContextualFragment")) {
        n.createContextualFragment = function(f) {
          return this.nativeRange.createContextualFragment(f)
        }
      }
      z.getBody(document).removeChild(q);
      v.detach();
      x.detach()
    })();
    l.createNativeRange = function(i) {
      i = i || document;
      return i.createRange()
    }
  }else {
    if(l.features.implementsTextRange) {
      I = function(i) {
        this.textRange = i;
        this.refresh()
      };
      I.prototype = new N(document);
      I.prototype.refresh = function() {
        var i, n, t = this.textRange;
        i = t.parentElement();
        var x = t.duplicate();
        x.collapse(true);
        n = x.parentElement();
        x = t.duplicate();
        x.collapse(false);
        t = x.parentElement();
        n = n == t ? n : z.getCommonAncestor(n, t);
        n = n == i ? n : z.getCommonAncestor(i, n);
        if(this.textRange.compareEndPoints("StartToEnd", this.textRange) == 0) {
          n = i = K(this.textRange, n, true, true)
        }else {
          i = K(this.textRange, n, true, false);
          n = K(this.textRange, n, false, false)
        }
        this.setStart(i.node, i.offset);
        this.setEnd(n.node, n.offset)
      };
      N.copyComparisonConstants(I);
      var O = function() {
        return this
      }();
      if(typeof O.Range == "undefined") {
        O.Range = I
      }
      l.createNativeRange = function(i) {
        i = i || document;
        return i.body.createTextRange()
      }
    }
  }
  if(l.features.implementsTextRange) {
    I.rangeToTextRange = function(i) {
      if(i.collapsed) {
        return H(new C(i.startContainer, i.startOffset), true)
      }else {
        var n = H(new C(i.startContainer, i.startOffset), true), t = H(new C(i.endContainer, i.endOffset), false);
        i = z.getDocument(i.startContainer).body.createTextRange();
        i.setEndPoint("StartToStart", n);
        i.setEndPoint("EndToEnd", t);
        return i
      }
    }
  }
  I.prototype.getName = function() {
    return"WrappedRange"
  };
  l.WrappedRange = I;
  l.createRange = function(i) {
    i = i || document;
    return new I(l.createNativeRange(i))
  };
  l.createRangyRange = function(i) {
    i = i || document;
    return new N(i)
  };
  l.createIframeRange = function(i) {
    return l.createRange(z.getIframeDocument(i))
  };
  l.createIframeRangyRange = function(i) {
    return l.createRangyRange(z.getIframeDocument(i))
  };
  l.addCreateMissingNativeApiListener(function(i) {
    i = i.document;
    if(typeof i.createRange == "undefined") {
      i.createRange = function() {
        return l.createRange(this)
      }
    }
    i = i = null
  })
});
rangy.createModule("WrappedSelection", function(l, K) {
  function H(b) {
    return(b || window).getSelection()
  }
  function I(b) {
    return(b || window).document.selection
  }
  function z(b, d, h) {
    var D = h ? "end" : "start";
    h = h ? "start" : "end";
    b.anchorNode = d[D + "Container"];
    b.anchorOffset = d[D + "Offset"];
    b.focusNode = d[h + "Container"];
    b.focusOffset = d[h + "Offset"]
  }
  function C(b) {
    b.anchorNode = b.focusNode = null;
    b.anchorOffset = b.focusOffset = 0;
    b.rangeCount = 0;
    b.isCollapsed = true;
    b._ranges.length = 0
  }
  function N(b) {
    var d;
    if(b instanceof k) {
      d = b._selectionNativeRange;
      if(!d) {
        d = l.createNativeRange(c.getDocument(b.startContainer));
        d.setEnd(b.endContainer, b.endOffset);
        d.setStart(b.startContainer, b.startOffset);
        b._selectionNativeRange = d;
        b.attachListener("detach", function() {
          this._selectionNativeRange = null
        })
      }
    }else {
      if(b instanceof r) {
        d = b.nativeRange
      }else {
        if(l.features.implementsDomRange && b instanceof c.getWindow(b.startContainer).Range) {
          d = b
        }
      }
    }
    return d
  }
  function O(b) {
    var d = b.getNodes(), h;
    a:if(!d.length || d[0].nodeType != 1) {
      h = false
    }else {
      h = 1;
      for(var D = d.length;h < D;++h) {
        if(!c.isAncestorOf(d[0], d[h])) {
          h = false;
          break a
        }
      }
      h = true
    }
    if(!h) {
      throw Error("getSingleElementFromRange: range " + b.inspect() + " did not consist of a single element");
    }
    return d[0]
  }
  function i(b, d) {
    var h = new r(d);
    b._ranges = [h];
    z(b, h, false);
    b.rangeCount = 1;
    b.isCollapsed = h.collapsed
  }
  function n(b) {
    b._ranges.length = 0;
    if(b.docSelection.type == "None") {
      C(b)
    }else {
      var d = b.docSelection.createRange();
      if(d && typeof d.text != "undefined") {
        i(b, d)
      }else {
        b.rangeCount = d.length;
        for(var h, D = c.getDocument(d.item(0)), G = 0;G < b.rangeCount;++G) {
          h = l.createRange(D);
          h.selectNode(d.item(G));
          b._ranges.push(h)
        }
        b.isCollapsed = b.rangeCount == 1 && b._ranges[0].collapsed;
        z(b, b._ranges[b.rangeCount - 1], false)
      }
    }
  }
  function t(b, d) {
    var h = b.docSelection.createRange(), D = O(d), G = c.getDocument(h.item(0));
    G = c.getBody(G).createControlRange();
    for(var P = 0, X = h.length;P < X;++P) {
      G.add(h.item(P))
    }
    try {
      G.add(D)
    }catch(ta) {
      throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
    }
    G.select();
    n(b)
  }
  function x(b, d, h) {
    this.nativeSelection = b;
    this.docSelection = d;
    this._ranges = [];
    this.win = h;
    this.refresh()
  }
  function A(b, d) {
    var h = c.getDocument(d[0].startContainer);
    h = c.getBody(h).createControlRange();
    for(var D = 0, G;D < rangeCount;++D) {
      G = O(d[D]);
      try {
        h.add(G)
      }catch(P) {
        throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");
      }
    }
    h.select();
    n(b)
  }
  function q(b, d) {
    if(b.anchorNode && c.getDocument(b.anchorNode) !== c.getDocument(d)) {
      throw new L("WRONG_DOCUMENT_ERR");
    }
  }
  function v(b) {
    var d = [], h = new p(b.anchorNode, b.anchorOffset), D = new p(b.focusNode, b.focusOffset), G = typeof b.getName == "function" ? b.getName() : "Selection";
    if(typeof b.rangeCount != "undefined") {
      for(var P = 0, X = b.rangeCount;P < X;++P) {
        d[P] = k.inspect(b.getRangeAt(P))
      }
    }
    return"[" + G + "(Ranges: " + d.join(", ") + ")(anchor: " + h.inspect() + ", focus: " + D.inspect() + "]"
  }
  l.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
  l.config.checkSelectionRanges = true;
  var c = l.dom, f = l.util, k = l.DomRange, r = l.WrappedRange, L = l.DOMException, p = c.DomPosition, u, w, B = l.util.isHostMethod(window, "getSelection"), V = l.util.isHostObject(document, "selection"), J = V && (!B || l.config.preferTextRange);
  if(J) {
    u = I;
    l.isSelectionValid = function(b) {
      b = (b || window).document;
      var d = b.selection;
      return d.type != "None" || c.getDocument(d.createRange().parentElement()) == b
    }
  }else {
    if(B) {
      u = H;
      l.isSelectionValid = function() {
        return true
      }
    }else {
      K.fail("Neither document.selection or window.getSelection() detected.")
    }
  }
  l.getNativeSelection = u;
  B = u();
  var ca = l.createNativeRange(document), Y = c.getBody(document), W = f.areHostObjects(B, f.areHostProperties(B, ["anchorOffset", "focusOffset"]));
  l.features.selectionHasAnchorAndFocus = W;
  var da = f.isHostMethod(B, "extend");
  l.features.selectionHasExtend = da;
  var fa = typeof B.rangeCount == "number";
  l.features.selectionHasRangeCount = fa;
  var ea = false, ha = true;
  f.areHostMethods(B, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof B.rangeCount == "number" && l.features.implementsDomRange && function() {
    var b = document.createElement("iframe");
    b.frameBorder = 0;
    b.style.position = "absolute";
    b.style.left = "-10000px";
    Y.appendChild(b);
    var d = c.getIframeDocument(b);
    d.open();
    d.write("<html><head></head><body>12</body></html>");
    d.close();
    var h = c.getIframeWindow(b).getSelection(), D = d.documentElement.lastChild.firstChild;
    d = d.createRange();
    d.setStart(D, 1);
    d.collapse(true);
    h.addRange(d);
    ha = h.rangeCount == 1;
    h.removeAllRanges();
    var G = d.cloneRange();
    d.setStart(D, 0);
    G.setEnd(D, 2);
    h.addRange(d);
    h.addRange(G);
    ea = h.rangeCount == 2;
    d.detach();
    G.detach();
    Y.removeChild(b)
  }();
  l.features.selectionSupportsMultipleRanges = ea;
  l.features.collapsedNonEditableSelectionsSupported = ha;
  var M = false, g;
  if(Y && f.isHostMethod(Y, "createControlRange")) {
    g = Y.createControlRange();
    if(f.areHostProperties(g, ["item", "add"])) {
      M = true
    }
  }
  l.features.implementsControlRange = M;
  w = W ? function(b) {
    return b.anchorNode === b.focusNode && b.anchorOffset === b.focusOffset
  } : function(b) {
    return b.rangeCount ? b.getRangeAt(b.rangeCount - 1).collapsed : false
  };
  var Z;
  if(f.isHostMethod(B, "getRangeAt")) {
    Z = function(b, d) {
      try {
        return b.getRangeAt(d)
      }catch(h) {
        return null
      }
    }
  }else {
    if(W) {
      Z = function(b) {
        var d = c.getDocument(b.anchorNode);
        d = l.createRange(d);
        d.setStart(b.anchorNode, b.anchorOffset);
        d.setEnd(b.focusNode, b.focusOffset);
        if(d.collapsed !== this.isCollapsed) {
          d.setStart(b.focusNode, b.focusOffset);
          d.setEnd(b.anchorNode, b.anchorOffset)
        }
        return d
      }
    }
  }
  l.getSelection = function(b) {
    b = b || window;
    var d = b._rangySelection, h = u(b), D = V ? I(b) : null;
    if(d) {
      d.nativeSelection = h;
      d.docSelection = D;
      d.refresh(b)
    }else {
      d = new x(h, D, b);
      b._rangySelection = d
    }
    return d
  };
  l.getIframeSelection = function(b) {
    return l.getSelection(c.getIframeWindow(b))
  };
  g = x.prototype;
  if(!J && W && f.areHostMethods(B, ["removeAllRanges", "addRange"])) {
    g.removeAllRanges = function() {
      this.nativeSelection.removeAllRanges();
      C(this)
    };
    var S = function(b, d) {
      var h = k.getRangeDocument(d);
      h = l.createRange(h);
      h.collapseToPoint(d.endContainer, d.endOffset);
      b.nativeSelection.addRange(N(h));
      b.nativeSelection.extend(d.startContainer, d.startOffset);
      b.refresh()
    };
    g.addRange = fa ? function(b, d) {
      if(M && V && this.docSelection.type == "Control") {
        t(this, b)
      }else {
        if(d && da) {
          S(this, b)
        }else {
          var h;
          if(ea) {
            h = this.rangeCount
          }else {
            this.removeAllRanges();
            h = 0
          }
          this.nativeSelection.addRange(N(b));
          this.rangeCount = this.nativeSelection.rangeCount;
          if(this.rangeCount == h + 1) {
            if(l.config.checkSelectionRanges) {
              if((h = Z(this.nativeSelection, this.rangeCount - 1)) && !k.rangesEqual(h, b)) {
                b = new r(h)
              }
            }
            this._ranges[this.rangeCount - 1] = b;
            z(this, b, aa(this.nativeSelection));
            this.isCollapsed = w(this)
          }else {
            this.refresh()
          }
        }
      }
    } : function(b, d) {
      if(d && da) {
        S(this, b)
      }else {
        this.nativeSelection.addRange(N(b));
        this.refresh()
      }
    };
    g.setRanges = function(b) {
      if(M && b.length > 1) {
        A(this, b)
      }else {
        this.removeAllRanges();
        for(var d = 0, h = b.length;d < h;++d) {
          this.addRange(b[d])
        }
      }
    }
  }else {
    if(f.isHostMethod(B, "empty") && f.isHostMethod(ca, "select") && M && J) {
      g.removeAllRanges = function() {
        try {
          this.docSelection.empty();
          if(this.docSelection.type != "None") {
            var b;
            if(this.anchorNode) {
              b = c.getDocument(this.anchorNode)
            }else {
              if(this.docSelection.type == "Control") {
                var d = this.docSelection.createRange();
                if(d.length) {
                  b = c.getDocument(d.item(0)).body.createTextRange()
                }
              }
            }
            if(b) {
              b.body.createTextRange().select();
              this.docSelection.empty()
            }
          }
        }catch(h) {
        }
        C(this)
      };
      g.addRange = function(b) {
        if(this.docSelection.type == "Control") {
          t(this, b)
        }else {
          r.rangeToTextRange(b).select();
          this._ranges[0] = b;
          this.rangeCount = 1;
          this.isCollapsed = this._ranges[0].collapsed;
          z(this, b, false)
        }
      };
      g.setRanges = function(b) {
        this.removeAllRanges();
        var d = b.length;
        if(d > 1) {
          A(this, b)
        }else {
          d && this.addRange(b[0])
        }
      }
    }else {
      K.fail("No means of selecting a Range or TextRange was found");
      return false
    }
  }
  g.getRangeAt = function(b) {
    if(b < 0 || b >= this.rangeCount) {
      throw new L("INDEX_SIZE_ERR");
    }else {
      return this._ranges[b]
    }
  };
  var $;
  if(J) {
    $ = function(b) {
      var d;
      if(l.isSelectionValid(b.win)) {
        d = b.docSelection.createRange()
      }else {
        d = c.getBody(b.win.document).createTextRange();
        d.collapse(true)
      }
      if(b.docSelection.type == "Control") {
        n(b)
      }else {
        d && typeof d.text != "undefined" ? i(b, d) : C(b)
      }
    }
  }else {
    if(f.isHostMethod(B, "getRangeAt") && typeof B.rangeCount == "number") {
      $ = function(b) {
        if(M && V && b.docSelection.type == "Control") {
          n(b)
        }else {
          b._ranges.length = b.rangeCount = b.nativeSelection.rangeCount;
          if(b.rangeCount) {
            for(var d = 0, h = b.rangeCount;d < h;++d) {
              b._ranges[d] = new l.WrappedRange(b.nativeSelection.getRangeAt(d))
            }
            z(b, b._ranges[b.rangeCount - 1], aa(b.nativeSelection));
            b.isCollapsed = w(b)
          }else {
            C(b)
          }
        }
      }
    }else {
      if(W && typeof B.isCollapsed == "boolean" && typeof ca.collapsed == "boolean" && l.features.implementsDomRange) {
        $ = function(b) {
          var d;
          d = b.nativeSelection;
          if(d.anchorNode) {
            d = Z(d, 0);
            b._ranges = [d];
            b.rangeCount = 1;
            d = b.nativeSelection;
            b.anchorNode = d.anchorNode;
            b.anchorOffset = d.anchorOffset;
            b.focusNode = d.focusNode;
            b.focusOffset = d.focusOffset;
            b.isCollapsed = w(b)
          }else {
            C(b)
          }
        }
      }else {
        K.fail("No means of obtaining a Range or TextRange from the user's selection was found");
        return false
      }
    }
  }
  g.refresh = function(b) {
    var d = b ? this._ranges.slice(0) : null;
    $(this);
    if(b) {
      b = d.length;
      if(b != this._ranges.length) {
        return false
      }
      for(;b--;) {
        if(!k.rangesEqual(d[b], this._ranges[b])) {
          return false
        }
      }
      return true
    }
  };
  var ba = function(b, d) {
    var h = b.getAllRanges(), D = false;
    b.removeAllRanges();
    for(var G = 0, P = h.length;G < P;++G) {
      if(D || d !== h[G]) {
        b.addRange(h[G])
      }else {
        D = true
      }
    }
    b.rangeCount || C(b)
  };
  g.removeRange = M ? function(b) {
    if(this.docSelection.type == "Control") {
      var d = this.docSelection.createRange();
      b = O(b);
      var h = c.getDocument(d.item(0));
      h = c.getBody(h).createControlRange();
      for(var D, G = false, P = 0, X = d.length;P < X;++P) {
        D = d.item(P);
        if(D !== b || G) {
          h.add(d.item(P))
        }else {
          G = true
        }
      }
      h.select();
      n(this)
    }else {
      ba(this, b)
    }
  } : function(b) {
    ba(this, b)
  };
  var aa;
  if(!J && W && l.features.implementsDomRange) {
    aa = function(b) {
      var d = false;
      if(b.anchorNode) {
        d = c.comparePoints(b.anchorNode, b.anchorOffset, b.focusNode, b.focusOffset) == 1
      }
      return d
    };
    g.isBackwards = function() {
      return aa(this)
    }
  }else {
    aa = g.isBackwards = function() {
      return false
    }
  }
  g.toString = function() {
    for(var b = [], d = 0, h = this.rangeCount;d < h;++d) {
      b[d] = "" + this._ranges[d]
    }
    return b.join("")
  };
  g.collapse = function(b, d) {
    q(this, b);
    var h = l.createRange(c.getDocument(b));
    h.collapseToPoint(b, d);
    this.removeAllRanges();
    this.addRange(h);
    this.isCollapsed = true
  };
  g.collapseToStart = function() {
    if(this.rangeCount) {
      var b = this._ranges[0];
      this.collapse(b.startContainer, b.startOffset)
    }else {
      throw new L("INVALID_STATE_ERR");
    }
  };
  g.collapseToEnd = function() {
    if(this.rangeCount) {
      var b = this._ranges[this.rangeCount - 1];
      this.collapse(b.endContainer, b.endOffset)
    }else {
      throw new L("INVALID_STATE_ERR");
    }
  };
  g.selectAllChildren = function(b) {
    q(this, b);
    var d = l.createRange(c.getDocument(b));
    d.selectNodeContents(b);
    this.removeAllRanges();
    this.addRange(d)
  };
  g.deleteFromDocument = function() {
    if(M && V && this.docSelection.type == "Control") {
      for(var b = this.docSelection.createRange(), d;b.length;) {
        d = b.item(0);
        b.remove(d);
        d.parentNode.removeChild(d)
      }
      this.refresh()
    }else {
      if(this.rangeCount) {
        b = this.getAllRanges();
        this.removeAllRanges();
        d = 0;
        for(var h = b.length;d < h;++d) {
          b[d].deleteContents()
        }
        this.addRange(b[h - 1])
      }
    }
  };
  g.getAllRanges = function() {
    return this._ranges.slice(0)
  };
  g.setSingleRange = function(b) {
    this.setRanges([b])
  };
  g.containsNode = function(b, d) {
    for(var h = 0, D = this._ranges.length;h < D;++h) {
      if(this._ranges[h].containsNode(b, d)) {
        return true
      }
    }
    return false
  };
  g.toHtml = function() {
    var b = "";
    if(this.rangeCount) {
      b = k.getRangeDocument(this._ranges[0]).createElement("div");
      for(var d = 0, h = this._ranges.length;d < h;++d) {
        b.appendChild(this._ranges[d].cloneContents())
      }
      b = b.innerHTML
    }
    return b
  };
  g.getName = function() {
    return"WrappedSelection"
  };
  g.inspect = function() {
    return v(this)
  };
  g.detach = function() {
    this.win = this.anchorNode = this.focusNode = this.win._rangySelection = null
  };
  x.inspect = v;
  l.Selection = x;
  l.selectionPrototype = g;
  l.addCreateMissingNativeApiListener(function(b) {
    if(typeof b.getSelection == "undefined") {
      b.getSelection = function() {
        return l.getSelection(this)
      }
    }
    b = null
  })
});
rangy.createModule("Serializer", function(g, n) {
  function o(c, a) {
    a = a || [];
    var b = c.nodeType, e = c.childNodes, d = e.length, f = [b, c.nodeName, d].join(":"), h = "", k = "";
    switch(b) {
      case 3:
        h = c.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        break;
      case 8:
        h = "<\!--" + c.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "--\>";
        break;
      default:
        h = "<" + f + ">";
        k = "</>";
        break
    }
    h && a.push(h);
    for(b = 0;b < d;++b) {
      o(e[b], a)
    }
    k && a.push(k);
    return a
  }
  function j(c) {
    c = o(c).join("");
    return u(c).toString(16)
  }
  function l(c, a, b) {
    var e = [], d = c;
    for(b = b || i.getDocument(c).documentElement;d && d != b;) {
      e.push(i.getNodeIndex(d, true));
      d = d.parentNode
    }
    return e.join("/") + ":" + a
  }
  function m(c, a, b) {
    if(a) {
      b || i.getDocument(a)
    }else {
      b = b || document;
      a = b.documentElement
    }
    c = c.split(":");
    a = a;
    b = c[0] ? c[0].split("/") : [];
    for(var e = b.length, d;e--;) {
      d = parseInt(b[e], 10);
      if(d < a.childNodes.length) {
        a = a.childNodes[parseInt(b[e], 10)]
      }else {
        throw n.createError("deserializePosition failed: node " + i.inspectNode(a) + " has no child with index " + d + ", " + e);
      }
    }
    return new i.DomPosition(a, parseInt(c[1], 10))
  }
  function p(c, a, b) {
    b = b || g.DomRange.getRangeDocument(c).documentElement;
    if(!i.isAncestorOf(b, c.commonAncestorContainer, true)) {
      throw Error("serializeRange: range is not wholly contained within specified root node");
    }
    c = l(c.startContainer, c.startOffset, b) + "," + l(c.endContainer, c.endOffset, b);
    a || (c += "{" + j(b) + "}");
    return c
  }
  function q(c, a, b) {
    if(a) {
      b = b || i.getDocument(a)
    }else {
      b = b || document;
      a = b.documentElement
    }
    c = /^([^,]+),([^,\{]+)({([^}]+)})?$/.exec(c);
    var e = c[4], d = j(a);
    if(e && e !== j(a)) {
      throw Error("deserializeRange: checksums of serialized range root node (" + e + ") and target root node (" + d + ") do not match");
    }
    e = m(c[1], a, b);
    a = m(c[2], a, b);
    b = g.createRange(b);
    b.setStart(e.node, e.offset);
    b.setEnd(a.node, a.offset);
    return b
  }
  function r(c, a, b) {
    if(a) {
      b || i.getDocument(a)
    }else {
      b = b || document;
      a = b.documentElement
    }
    c = /^([^,]+),([^,]+)({([^}]+)})?$/.exec(c)[3];
    return!c || c === j(a)
  }
  function s(c, a, b) {
    c = c || g.getSelection();
    c = c.getAllRanges();
    for(var e = [], d = 0, f = c.length;d < f;++d) {
      e[d] = p(c[d], a, b)
    }
    return e.join("|")
  }
  function t(c, a, b) {
    if(a) {
      b = b || i.getWindow(a)
    }else {
      b = b || window;
      a = b.document.documentElement
    }
    c = c.split("|");
    for(var e = g.getSelection(b), d = [], f = 0, h = c.length;f < h;++f) {
      d[f] = q(c[f], a, b.document)
    }
    e.setRanges(d);
    return e
  }
  g.requireModules(["WrappedSelection", "WrappedRange"]);
  if(typeof encodeURIComponent == "undefined" || typeof decodeURIComponent == "undefined") {
    n.fail("Global object is missing encodeURIComponent and/or decodeURIComponent method")
  }
  var u = function() {
    var c = null;
    return function(a) {
      for(var b = [], e = 0, d = a.length, f;e < d;++e) {
        f = a.charCodeAt(e);
        if(f < 128) {
          b.push(f)
        }else {
          f < 2048 ? b.push(f >> 6 | 192, f & 63 | 128) : b.push(f >> 12 | 224, f >> 6 & 63 | 128, f & 63 | 128)
        }
      }
      a = -1;
      if(!c) {
        e = [];
        d = 0;
        for(var h;d < 256;++d) {
          h = d;
          for(f = 8;f--;) {
            if((h & 1) == 1) {
              h = h >>> 1 ^ 3988292384
            }else {
              h >>>= 1
            }
          }
          e[d] = h >>> 0
        }
        c = e
      }
      e = c;
      d = 0;
      for(f = b.length;d < f;++d) {
        h = (a ^ b[d]) & 255;
        a = a >>> 8 ^ e[h]
      }
      return(a ^ -1) >>> 0
    }
  }(), i = g.dom;
  g.serializePosition = l;
  g.deserializePosition = m;
  g.serializeRange = p;
  g.deserializeRange = q;
  g.canDeserializeRange = r;
  g.serializeSelection = s;
  g.deserializeSelection = t;
  g.canDeserializeSelection = function(c, a, b) {
    var e;
    if(a) {
      e = b ? b.document : i.getDocument(a)
    }else {
      b = b || window;
      a = b.document.documentElement
    }
    c = c.split("|");
    b = 0;
    for(var d = c.length;b < d;++b) {
      if(!r(c[b], a, e)) {
        return false
      }
    }
    return true
  };
  g.restoreSelectionFromCookie = function(c) {
    c = c || window;
    var a;
    a: {
      a = c.document.cookie.split(/[;,]/);
      for(var b = 0, e = a.length, d;b < e;++b) {
        d = a[b].split("=");
        if(d[0].replace(/^\s+/, "") == "rangySerializedSelection") {
          if(d = d[1]) {
            a = decodeURIComponent(d.replace(/\s+$/, ""));
            break a
          }
        }
      }
      a = null
    }
    a && t(a, c.doc)
  };
  g.saveSelectionCookie = function(c, a) {
    c = c || window;
    a = typeof a == "object" ? a : {};
    var b = a.expires ? ";expires=" + a.expires.toUTCString() : "", e = a.path ? ";path=" + a.path : "", d = a.domain ? ";domain=" + a.domain : "", f = a.secure ? ";secure" : "", h = s(g.getSelection(c));
    c.document.cookie = encodeURIComponent("rangySerializedSelection") + "=" + encodeURIComponent(h) + b + e + d + f
  };
  g.getElementChecksum = j
});
rangy.createModule("CssClassApplier", function(i, v) {
  function r(a, b) {
    return a.className && RegExp("(?:^|\\s)" + b + "(?:\\s|$)").test(a.className)
  }
  function s(a, b) {
    if(a.className) {
      r(a, b) || (a.className += " " + b)
    }else {
      a.className = b
    }
  }
  function o(a) {
    return a.split(/\s+/).sort().join(" ")
  }
  function w(a, b) {
    return o(a.className) == o(b.className)
  }
  function x(a) {
    for(var b = a.parentNode;a.hasChildNodes();) {
      b.insertBefore(a.firstChild, a)
    }
    b.removeChild(a)
  }
  function y(a, b) {
    var c = a.cloneRange();
    c.selectNodeContents(b);
    var d = c.intersection(a);
    d = d ? d.toString() : "";
    c.detach();
    return d != ""
  }
  function z(a) {
    return a.getNodes([3], function(b) {
      return y(a, b)
    })
  }
  function A(a, b) {
    if(a.attributes.length != b.attributes.length) {
      return false
    }
    for(var c = 0, d = a.attributes.length, e, f;c < d;++c) {
      e = a.attributes[c];
      f = e.name;
      if(f != "class") {
        f = b.attributes.getNamedItem(f);
        if(e.specified != f.specified) {
          return false
        }
        if(e.specified && e.nodeValue !== f.nodeValue) {
          return false
        }
      }
    }
    return true
  }
  function B(a, b) {
    for(var c = 0, d = a.attributes.length, e;c < d;++c) {
      e = a.attributes[c].name;
      if(!(b && h.arrayContains(b, e)) && a.attributes[c].specified && e != "class") {
        return true
      }
    }
    return false
  }
  function C(a) {
    var b;
    return a && a.nodeType == 1 && ((b = a.parentNode) && b.nodeType == 9 && b.designMode == "on" || k(a) && !k(a.parentNode))
  }
  function D(a) {
    return(k(a) || a.nodeType != 1 && k(a.parentNode)) && !C(a)
  }
  function E(a) {
    return a && a.nodeType == 1 && !M.test(p(a, "display"))
  }
  function N(a) {
    if(a.data.length == 0) {
      return true
    }
    if(O.test(a.data)) {
      return false
    }
    switch(p(a.parentNode, "whiteSpace")) {
      case "pre":
      ;
      case "pre-wrap":
      ;
      case "-moz-pre-wrap":
        return false;
      case "pre-line":
        if(/[\r\n]/.test(a.data)) {
          return false
        }
    }
    return E(a.previousSibling) || E(a.nextSibling)
  }
  function m(a, b, c, d) {
    var e, f = c == 0;
    if(h.isAncestorOf(b, a)) {
      return a
    }
    if(h.isCharacterDataNode(b)) {
      if(c == 0) {
        c = h.getNodeIndex(b);
        b = b.parentNode
      }else {
        if(c == b.length) {
          c = h.getNodeIndex(b) + 1;
          b = b.parentNode
        }else {
          throw v.createError("splitNodeAt should not be called with offset in the middle of a data node (" + c + " in " + b.data);
        }
      }
    }
    var g;
    g = b;
    var j = c;
    g = h.isCharacterDataNode(g) ? j == 0 ? !!g.previousSibling : j == g.length ? !!g.nextSibling : true : j > 0 && j < g.childNodes.length;
    if(g) {
      if(!e) {
        e = b.cloneNode(false);
        for(e.id && e.removeAttribute("id");f = b.childNodes[c];) {
          e.appendChild(f)
        }
        h.insertAfter(e, b)
      }
      return b == a ? e : m(a, e.parentNode, h.getNodeIndex(e), d)
    }else {
      if(a != b) {
        e = b.parentNode;
        b = h.getNodeIndex(b);
        f || b++;
        return m(a, e, b, d)
      }
    }
    return a
  }
  function F(a) {
    var b = a ? "nextSibling" : "previousSibling";
    return function(c, d) {
      var e = c.parentNode, f = c[b];
      if(f) {
        if(f && f.nodeType == 3) {
          return f
        }
      }else {
        if(d) {
          if((f = e[b]) && f.nodeType == 1 && e.tagName == f.tagName && w(e, f) && A(e, f)) {
            return f[a ? "firstChild" : "lastChild"]
          }
        }
      }
      return null
    }
  }
  function t(a) {
    this.firstTextNode = (this.isElementMerge = a.nodeType == 1) ? a.lastChild : a;
    this.textNodes = [this.firstTextNode]
  }
  function q(a, b, c) {
    this.cssClass = a;
    var d, e, f = null;
    if(typeof b == "object" && b !== null) {
      c = b.tagNames;
      f = b.elementProperties;
      for(d = 0;e = P[d++];) {
        if(b.hasOwnProperty(e)) {
          this[e] = b[e]
        }
      }
      d = b.normalize
    }else {
      d = b
    }
    this.normalize = typeof d == "undefined" ? true : d;
    this.attrExceptions = [];
    d = document.createElement(this.elementTagName);
    this.elementProperties = {};
    for(var g in f) {
      if(f.hasOwnProperty(g)) {
        if(G.hasOwnProperty(g)) {
          g = G[g]
        }
        d[g] = f[g];
        this.elementProperties[g] = d[g];
        this.attrExceptions.push(g)
      }
    }
    this.elementSortedClassName = this.elementProperties.hasOwnProperty("className") ? o(this.elementProperties.className + " " + a) : a;
    this.applyToAnyTagName = false;
    a = typeof c;
    if(a == "string") {
      if(c == "*") {
        this.applyToAnyTagName = true
      }else {
        this.tagNames = c.toLowerCase().replace(/^\s\s*/, "").replace(/\s\s*$/, "").split(/\s*,\s*/)
      }
    }else {
      if(a == "object" && typeof c.length == "number") {
        this.tagNames = [];
        d = 0;
        for(a = c.length;d < a;++d) {
          if(c[d] == "*") {
            this.applyToAnyTagName = true
          }else {
            this.tagNames.push(c[d].toLowerCase())
          }
        }
      }else {
        this.tagNames = [this.elementTagName]
      }
    }
  }
  i.requireModules(["WrappedSelection", "WrappedRange"]);
  var h = i.dom, H = function() {
    function a(b, c, d) {
      return c && d ? " " : ""
    }
    return function(b, c) {
      if(b.className) {
        b.className = b.className.replace(RegExp("(?:^|\\s)" + c + "(?:\\s|$)"), a)
      }
    }
  }(), p;
  if(typeof window.getComputedStyle != "undefined") {
    p = function(a, b) {
      return h.getWindow(a).getComputedStyle(a, null)[b]
    }
  }else {
    if(typeof document.documentElement.currentStyle != "undefined") {
      p = function(a, b) {
        return a.currentStyle[b]
      }
    }else {
      v.fail("No means of obtaining computed style properties found")
    }
  }
  var k;
  (function() {
    k = typeof document.createElement("div").isContentEditable == "boolean" ? function(a) {
      return a && a.nodeType == 1 && a.isContentEditable
    } : function(a) {
      if(!a || a.nodeType != 1 || a.contentEditable == "false") {
        return false
      }
      return a.contentEditable == "true" || k(a.parentNode)
    }
  })();
  var M = /^inline(-block|-table)?$/i, O = /[^\r\n\t\f \u200B]/, Q = F(false), R = F(true);
  t.prototype = {doMerge:function() {
    for(var a = [], b, c, d = 0, e = this.textNodes.length;d < e;++d) {
      b = this.textNodes[d];
      c = b.parentNode;
      a[d] = b.data;
      if(d) {
        c.removeChild(b);
        c.hasChildNodes() || c.parentNode.removeChild(c)
      }
    }
    return this.firstTextNode.data = a = a.join("")
  }, getLength:function() {
    for(var a = this.textNodes.length, b = 0;a--;) {
      b += this.textNodes[a].length
    }
    return b
  }, toString:function() {
    for(var a = [], b = 0, c = this.textNodes.length;b < c;++b) {
      a[b] = "'" + this.textNodes[b].data + "'"
    }
    return"[Merge(" + a.join(",") + ")]"
  }};
  var P = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly"], G = {"class":"className"};
  q.prototype = {elementTagName:"span", elementProperties:{}, ignoreWhiteSpace:true, applyToEditableOnly:false, hasClass:function(a) {
    return a.nodeType == 1 && h.arrayContains(this.tagNames, a.tagName.toLowerCase()) && r(a, this.cssClass)
  }, getSelfOrAncestorWithClass:function(a) {
    for(;a;) {
      if(this.hasClass(a, this.cssClass)) {
        return a
      }
      a = a.parentNode
    }
    return null
  }, isModifiable:function(a) {
    return!this.applyToEditableOnly || D(a)
  }, isIgnorableWhiteSpaceNode:function(a) {
    return this.ignoreWhiteSpace && a && a.nodeType == 3 && N(a)
  }, postApply:function(a, b, c) {
    for(var d = a[0], e = a[a.length - 1], f = [], g, j = d, I = e, J = 0, K = e.length, n, L, l = 0, u = a.length;l < u;++l) {
      n = a[l];
      if(L = Q(n, !c)) {
        if(!g) {
          g = new t(L);
          f.push(g)
        }
        g.textNodes.push(n);
        if(n === d) {
          j = g.firstTextNode;
          J = j.length
        }
        if(n === e) {
          I = g.firstTextNode;
          K = g.getLength()
        }
      }else {
        g = null
      }
    }
    if(a = R(e, !c)) {
      if(!g) {
        g = new t(e);
        f.push(g)
      }
      g.textNodes.push(a)
    }
    if(f.length) {
      l = 0;
      for(u = f.length;l < u;++l) {
        f[l].doMerge()
      }
      b.setStart(j, J);
      b.setEnd(I, K)
    }
  }, createContainer:function(a) {
    a = a.createElement(this.elementTagName);
    i.util.extend(a, this.elementProperties);
    s(a, this.cssClass);
    return a
  }, applyToTextNode:function(a) {
    var b = a.parentNode;
    if(b.childNodes.length == 1 && h.arrayContains(this.tagNames, b.tagName.toLowerCase())) {
      s(b, this.cssClass)
    }else {
      b = this.createContainer(h.getDocument(a));
      a.parentNode.insertBefore(b, a);
      b.appendChild(a)
    }
  }, isRemovable:function(a) {
    var b;
    if(b = a.tagName.toLowerCase() == this.elementTagName) {
      if(b = o(a.className) == this.elementSortedClassName) {
        var c;
        a: {
          b = this.elementProperties;
          for(c in b) {
            if(b.hasOwnProperty(c) && a[c] !== b[c]) {
              c = false;
              break a
            }
          }
          c = true
        }
        b = c && !B(a, this.attrExceptions) && this.isModifiable(a)
      }
      b = b
    }
    return b
  }, undoToTextNode:function(a, b, c) {
    if(!b.containsNode(c)) {
      a = b.cloneRange();
      a.selectNode(c);
      if(a.isPointInRange(b.endContainer, b.endOffset)) {
        m(c, b.endContainer, b.endOffset, [b]);
        b.setEndAfter(c)
      }
      if(a.isPointInRange(b.startContainer, b.startOffset)) {
        c = m(c, b.startContainer, b.startOffset, [b])
      }
    }
    this.isRemovable(c) ? x(c) : H(c, this.cssClass)
  }, applyToRange:function(a) {
    a.splitBoundaries();
    var b = z(a);
    if(b.length) {
      for(var c, d = 0, e = b.length;d < e;++d) {
        c = b[d];
        !this.isIgnorableWhiteSpaceNode(c) && !this.getSelfOrAncestorWithClass(c) && this.isModifiable(c) && this.applyToTextNode(c)
      }
      a.setStart(b[0], 0);
      c = b[b.length - 1];
      a.setEnd(c, c.length);
      this.normalize && this.postApply(b, a, false)
    }
  }, applyToSelection:function(a) {
    a = a || window;
    a = i.getSelection(a);
    var b, c = a.getAllRanges();
    a.removeAllRanges();
    for(var d = c.length;d--;) {
      b = c[d];
      this.applyToRange(b);
      a.addRange(b)
    }
  }, undoToRange:function(a) {
    a.splitBoundaries();
    var b = z(a), c, d, e = b[b.length - 1];
    if(b.length) {
      for(var f = 0, g = b.length;f < g;++f) {
        c = b[f];
        (d = this.getSelfOrAncestorWithClass(c)) && this.isModifiable(c) && this.undoToTextNode(c, a, d);
        a.setStart(b[0], 0);
        a.setEnd(e, e.length)
      }
      this.normalize && this.postApply(b, a, true)
    }
  }, undoToSelection:function(a) {
    a = a || window;
    a = i.getSelection(a);
    var b = a.getAllRanges(), c;
    a.removeAllRanges();
    for(var d = 0, e = b.length;d < e;++d) {
      c = b[d];
      this.undoToRange(c);
      a.addRange(c)
    }
  }, getTextSelectedByRange:function(a, b) {
    var c = b.cloneRange();
    c.selectNodeContents(a);
    var d = c.intersection(b);
    d = d ? d.toString() : "";
    c.detach();
    return d
  }, isAppliedToRange:function(a) {
    if(a.collapsed) {
      return!!this.getSelfOrAncestorWithClass(a.commonAncestorContainer)
    }else {
      for(var b = a.getNodes([3]), c = 0, d;d = b[c++];) {
        if(!this.isIgnorableWhiteSpaceNode(d) && y(a, d) && this.isModifiable(d) && !this.getSelfOrAncestorWithClass(d)) {
          return false
        }
      }
      return true
    }
  }, isAppliedToSelection:function(a) {
    a = a || window;
    a = i.getSelection(a).getAllRanges();
    for(var b = a.length;b--;) {
      if(!this.isAppliedToRange(a[b])) {
        return false
      }
    }
    return true
  }, toggleRange:function(a) {
    this.isAppliedToRange(a) ? this.undoToRange(a) : this.applyToRange(a)
  }, toggleSelection:function(a) {
    this.isAppliedToSelection(a) ? this.undoToSelection(a) : this.applyToSelection(a)
  }, detach:function() {
  }};
  q.util = {hasClass:r, addClass:s, removeClass:H, hasSameClasses:w, replaceWithOwnChildren:x, elementsHaveSameNonClassAttributes:A, elementHasNonClassAttributes:B, splitNodeAt:m, isEditableElement:k, isEditingHost:C, isEditable:D};
  i.CssClassApplier = q;
  i.createCssClassApplier = function(a, b, c) {
    return new q(a, b, c)
  }
});
rangy.createModule("SaveRestore", function(h, m) {
  function n(a, g) {
    var e = "selectionBoundary_" + +new Date + "_" + ("" + Math.random()).slice(2), c, f = p.getDocument(a.startContainer), d = a.cloneRange();
    d.collapse(g);
    c = f.createElement("span");
    c.id = e;
    c.style.lineHeight = "0";
    c.style.display = "none";
    c.className = "rangySelectionBoundary";
    c.appendChild(f.createTextNode(q));
    d.insertNode(c);
    d.detach();
    return c
  }
  function o(a, g, e, c) {
    if(a = (a || document).getElementById(e)) {
      g[c ? "setStartBefore" : "setEndBefore"](a);
      a.parentNode.removeChild(a)
    }else {
      m.warn("Marker element has been removed. Cannot restore selection.")
    }
  }
  function r(a, g) {
    return g.compareBoundaryPoints(a.START_TO_START, a)
  }
  function k(a, g) {
    var e = (a || document).getElementById(g);
    e && e.parentNode.removeChild(e)
  }
  h.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
  var p = h.dom, q = "\ufeff";
  h.saveSelection = function(a) {
    a = a || window;
    var g = a.document;
    if(h.isSelectionValid(a)) {
      var e = h.getSelection(a), c = e.getAllRanges(), f = [], d, j;
      c.sort(r);
      for(var b = 0, i = c.length;b < i;++b) {
        d = c[b];
        if(d.collapsed) {
          j = n(d, false);
          f.push({markerId:j.id, collapsed:true})
        }else {
          j = n(d, false);
          d = n(d, true);
          f[b] = {startMarkerId:d.id, endMarkerId:j.id, collapsed:false, backwards:c.length == 1 && e.isBackwards()}
        }
      }
      for(b = i - 1;b >= 0;--b) {
        d = c[b];
        if(d.collapsed) {
          d.collapseBefore((g || document).getElementById(f[b].markerId))
        }else {
          d.setEndBefore((g || document).getElementById(f[b].endMarkerId));
          d.setStartAfter((g || document).getElementById(f[b].startMarkerId))
        }
      }
      e.setRanges(c);
      return{win:a, doc:g, rangeInfos:f, restored:false}
    }else {
      m.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.")
    }
  };
  h.restoreSelection = function(a, g) {
    if(!a.restored) {
      for(var e = a.rangeInfos, c = h.getSelection(a.win), f = [], d = e.length, j = d - 1, b, i;j >= 0;--j) {
        b = e[j];
        i = h.createRange(a.doc);
        if(b.collapsed) {
          if(b = (a.doc || document).getElementById(b.markerId)) {
            b.style.display = "inline";
            var l = b.previousSibling;
            if(l && l.nodeType == 3) {
              b.parentNode.removeChild(b);
              i.collapseToPoint(l, l.length)
            }else {
              i.collapseBefore(b);
              b.parentNode.removeChild(b)
            }
          }else {
            m.warn("Marker element has been removed. Cannot restore selection.")
          }
        }else {
          o(a.doc, i, b.startMarkerId, true);
          o(a.doc, i, b.endMarkerId, false)
        }
        d == 1 && i.normalizeBoundaries();
        f[j] = i
      }
      if(d == 1 && g && h.features.selectionHasExtend && e[0].backwards) {
        c.removeAllRanges();
        c.addRange(f[0], true)
      }else {
        c.setRanges(f)
      }
      a.restored = true
    }
  };
  h.removeMarkerElement = k;
  h.removeMarkers = function(a) {
    for(var g = a.rangeInfos, e = 0, c = g.length, f;e < c;++e) {
      f = g[e];
      if(f.collapsed) {
        k(a.doc, f.markerId)
      }else {
        k(a.doc, f.startMarkerId);
        k(a.doc, f.endMarkerId)
      }
    }
  }
});
(function(jQuery) {
  jQuery.hotkeys = {version:"0.8", specialKeys:{8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"capslock", 27:"esc", 32:"space", 33:"pageup", 34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"del", 96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9", 106:"*", 107:"+", 109:"-", 110:".", 111:"/", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 
  121:"f10", 122:"f11", 123:"f12", 144:"numlock", 145:"scroll", 191:"/", 224:"meta"}, shiftNums:{"`":"~", 1:"!", 2:"@", 3:"#", 4:"$", 5:"%", 6:"^", 7:"&", 8:"*", 9:"(", "0":")", "-":"_", "=":"+", ";":": ", "'":'"', ",":"<", ".":">", "/":"?", "\\":"|"}};
  function keyHandler(handleObj) {
    if(typeof handleObj.data !== "string") {
      return
    }
    var origHandler = handleObj.handler, keys = handleObj.data.toLowerCase().split(" ");
    handleObj.handler = function(event) {
      if(this !== event.target && (/textarea|select/i.test(event.target.nodeName) || event.target.type === "text")) {
        return
      }
      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which], character = String.fromCharCode(event.which).toLowerCase(), key, modif = "", possible = {};
      if(event.altKey && special !== "alt") {
        modif += "alt+"
      }
      if(event.ctrlKey && special !== "ctrl") {
        modif += "ctrl+"
      }
      if(event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+"
      }
      if(event.shiftKey && special !== "shift") {
        modif += "shift+"
      }
      if(special) {
        possible[modif + special] = true
      }else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
        if(modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true
        }
      }
      for(var i = 0, l = keys.length;i < l;i++) {
        if(possible[keys[i]]) {
          return origHandler.apply(this, arguments)
        }
      }
    }
  }
  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {add:keyHandler}
  })
})(jQuery);
function cleanReplaceElements(selector, replacements) {
  for(var find in replacements) {
    var replace = replacements[find];
    var i = 0;
    do {
      var found = $(selector).find(find);
      if(found.length) {
        found = $(found.get(0));
        var clone = $(replace).clone();
        clone.html(found.html());
        clone.attr(elementGetAttributes(found));
        found.replaceWith(clone)
      }
    }while(found.length)
  }
}
function cleanUnwrapElements(selector) {
  $(selector).unwrap()
}
;function elementRemoveComments(parent) {
  parent.contents().each(function() {
    if(this.nodeType == 8) {
      $(this).remove()
    }
  });
  parent.children().each(function() {
    element.removeComments($(this))
  });
  return parent
}
function elementRemoveAttributes(parent, allowedAttributes) {
  parent.children().each(function() {
    var stripAttributes = $.map(this.attributes, function(item) {
      if($.inArray(item.name, allowedAttributes) === -1) {
        return item.name
      }
    });
    var child = $(this);
    $.each(stripAttributes, function(i, attributeName) {
      child.removeAttr(attributeName)
    });
    element.removeAttributes($(this), allowedAttributes)
  });
  return parent
}
function elementBringToTop(element) {
  var zIndex = 1;
  element.siblings().each(function() {
    var z = $(this).css("z-index");
    if(!isNaN(z) && z > zIndex) {
      zIndex = z + 1
    }
  });
  element.css("z-index", zIndex)
}
function elementOuterHtml(element) {
  return element.clone().wrap("<div/>").parent().html()
}
function elementOuterText(element) {
  return element.clone().wrap("<div/>").parent().text()
}
function elementIsBlock(element) {
  return elementDefaultDisplay(element.tagName) === "block"
}
function elementDefaultDisplay(tag) {
  var cStyle, t = document.createElement(tag), gcs = "getComputedStyle" in window;
  document.body.appendChild(t);
  cStyle = (gcs ? window.getComputedStyle(t, "") : t.currentStyle).display;
  document.body.removeChild(t);
  return cStyle
}
function elementIsValid(element, validTags) {
  return-1 !== $.inArray($(element)[0].tagName.toLowerCase(), validTags)
}
function elementVisibleRect(element) {
  element = $(element);
  var rect = {top:Math.round(element.offset().top), left:Math.round(element.offset().left), width:Math.round(element.outerWidth()), height:Math.round(element.outerHeight())};
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var scrollBottom = scrollTop + windowHeight;
  var elementBottom = Math.round(rect.height + rect.top);
  if(scrollTop < rect.top && scrollBottom > elementBottom) {
    return rect
  }
  if(scrollTop > rect.top) {
    rect.top = scrollTop
  }
  if(scrollBottom < elementBottom) {
    rect.height = scrollBottom - rect.top
  }else {
    rect.height = windowHeight - (scrollBottom - elementBottom)
  }
  return rect
}
;function fragmentToHtml(domFragment, tag) {
  var html = "";
  for(var j = 0, l = domFragment.childNodes.length;j < l;j++) {
    var node = domFragment.childNodes.item(j);
    var content = node.nodeType === 3 ? node.nodeValue : elementOuterHtml($(node));
    if(content) {
      html += content
    }
  }
  if(tag) {
    html = $("<" + tag + ">" + html + "</" + tag + ">");
    html.find("p").wrapInner("<" + tag + "/>");
    html.find("p > *").unwrap();
    html = $("<div/>").html(html).html()
  }
  return html
}
function fragmentInsertBefore(domFragment, beforeElement, wrapperTag) {
  for(var j = 0, l = domFragment.childNodes.length;j < l;j++) {
    var node = domFragment.childNodes.item(j);
    var content = node.nodeType === 3 ? node.nodeValue : $(node).html();
    if(content) {
      $("<" + wrapperTag + "/>").html($.trim(content)).insertBefore(beforeElement)
    }
  }
}
;var savedSelection = false;
function selectionSave(overwrite) {
  if(savedSelection && !overwrite) {
    return
  }
  savedSelection = rangy.saveSelection()
}
function selectionRestore() {
  if(savedSelection) {
    rangy.restoreSelection(savedSelection);
    savedSelection = false
  }
}
function selectionDestroy() {
  if(savedSelection) {
    rangy.removeMarkers(savedSelection)
  }
  savedSelection = false
}
function selectionSaved() {
  return savedSelection !== false
}
function selectionEachRange(callback, selection, context) {
  selection = selection || rangy.getSelection();
  var range, i = 0;
  while(range = selection.getAllRanges()[i++]) {
    callback.call(context, range)
  }
}
function selectionSet(mixed) {
  rangy.getSelection().setSingleRange(mixed)
}
function selectionReplace(html, sel) {
  selectionEachRange(function(range) {
    rangeReplace(html, range)
  }, sel, this)
}
function selectionSelectInner(element, selection) {
  selection = selection || rangy.getSelection();
  selection.removeAllRanges();
  $(element).focus().contents().each(function() {
    var range = rangy.createRange();
    range.selectNodeContents(this);
    selection.addRange(range)
  })
}
function selectionSelectOuter(element, selection) {
  selection = selection || rangy.getSelection();
  selection.removeAllRanges();
  $(element).each(function() {
    var range = rangy.createRange();
    range.selectNode(this);
    selection.addRange(range)
  }).focus()
}
function selectionSelectEdge(element, selection, start) {
  selection = selection || rangy.getSelection();
  selection.removeAllRanges();
  $(element).each(function() {
    var range = rangy.createRange();
    range.selectNodeContents(this);
    range.collapse(start);
    selection.addRange(range)
  })
}
function selectionSelectEnd(element, selection) {
  selectionSelectEdge(element, selection, false)
}
function selectionSelectStart(element, selection) {
  selectionSelectEdge(element, selection, true)
}
function selectionGetHtml(selection) {
  selection = selection || rangy.getSelection();
  return selection.toHtml()
}
function selectionGetElement(range) {
  var commonAncestor;
  range = range || rangy.getSelection().getRangeAt(0);
  if(range.commonAncestorContainer.nodeType === 3) {
    commonAncestor = range.commonAncestorContainer.parentNode
  }else {
    commonAncestor = range.commonAncestorContainer
  }
  return $(commonAncestor)
}
function selectionGetElements(selection) {
  var result = new jQuery;
  selectionEachRange(function(range) {
    result.push(selectionGetElement(range)[0])
  }, selection, this);
  return result
}
function selectionGetStartElement() {
  var selection = rangy.getSelection();
  if(selection.anchorNode === null) {
    return null
  }
  if(selection.isBackwards()) {
    return selection.focusNode.nodeType === 3 ? $(selection.focusNode.parentElement) : $(selection.focusNode)
  }
  if(!selection.anchorNode) {
    console.trace()
  }
  return selection.anchorNode.nodeType === 3 ? $(selection.anchorNode.parentElement) : $(selection.anchorNode)
}
function selectionGetEndElement() {
  var selection = rangy.getSelection();
  if(selection.anchorNode === null) {
    return null
  }
  if(selection.isBackwards()) {
    return selection.anchorNode.nodeType === 3 ? $(selection.anchorNode.parentElement) : $(selection.anchorNode)
  }
  return selection.focusNode.nodeType === 3 ? $(selection.focusNode.parentElement) : $(selection.focusNode)
}
function selectionAtEndOfElement() {
  var selection = rangy.getSelection();
  var focusNode = selection.isBackwards() ? selection.anchorNode : selection.focusNode;
  var focusOffset = selection.isBackwards() ? selection.focusOffset : selection.anchorOffset;
  if(focusOffset !== focusNode.textContent.length) {
    return false
  }
  var previous = focusNode.nextSibling;
  if(!previous || $(previous).html() === "") {
    return true
  }else {
    return false
  }
}
function selectionAtStartOfElement() {
  var selection = rangy.getSelection();
  var anchorNode = selection.isBackwards() ? selection.focusNode : selection.anchorNode;
  if(selection.isBackwards() ? selection.focusOffset : selection.anchorOffset !== 0) {
    return false
  }
  var previous = anchorNode.previousSibling;
  if(!previous || $(previous).html() === "") {
    return true
  }else {
    return false
  }
}
function selectionIsEmpty() {
  return rangy.getSelection().toHtml() === ""
}
function selectionToggleWrapper(tag, options) {
  options = options || {};
  var applier = rangy.createCssClassApplier(options.classes || "", {normalize:true, elementTagName:tag, elementProperties:options.attributes || {}});
  selectionEachRange(function(range) {
    if(rangeEmptyTag(range)) {
      var element = $("<" + tag + "/>").addClass(options.classes).attr(options.attributes || {}).append(fragmentToHtml(range.cloneContents()));
      rangeReplace(element, range)
    }else {
      applier.toggleRange(range)
    }
  }, null, this)
}
function selectionWrapTagWithAttribute(tag, attributes, classes) {
  selectionEachRange(function(range) {
    var element = selectionGetElement(range);
    if(element.is(tag)) {
      element.attr(attributes)
    }else {
      selectionToggleWrapper(tag, {classes:classes, attributes:attributes})
    }
  }, null, this)
}
function selectionExists(sel) {
  var selectionExists = false;
  selectionEachRange(function(range) {
    if(!rangeIsEmpty(range)) {
      selectionExists = true
    }
  }, sel, this);
  return selectionExists
}
function selectionReplaceSplittingSelectedElement(html, selection) {
  selection = selection || rangy.getSelection();
  var selectionRange = selection.getRangeAt(0);
  var selectedElement = selectionGetElements()[0];
  var startRange = rangy.createRange();
  startRange.setStartBefore(selectedElement);
  startRange.setEnd(selectionRange.startContainer, selectionRange.startOffset);
  var startFragment = startRange.cloneContents();
  var endRange = rangy.createRange();
  endRange.setStart(selectionRange.endContainer, selectionRange.endOffset);
  endRange.setEndAfter(selectedElement);
  var endFragment = endRange.cloneContents();
  var replacement = elementOuterHtml($(fragmentToHtml(startFragment)));
  replacement += elementOuterHtml($(html));
  replacement += elementOuterHtml($(fragmentToHtml(endFragment)));
  $(selectedElement).replaceWith($(replacement))
}
function selectionReplaceWithinValidTags(html, validTagNames, selection) {
  selection = selection || rangy.getSelection();
  var startElement = selectionGetStartElement()[0];
  var endElement = selectionGetEndElement()[0];
  var selectedElement = selectionGetElements()[0];
  var selectedElementValid = elementIsValid(selectedElement, validTagNames);
  var startElementValid = elementIsValid(startElement, validTagNames);
  var endElementValid = elementIsValid(endElement, validTagNames);
  if(selectedElementValid && startElementValid && endElementValid) {
    selectionReplace(html);
    return
  }
  selectionReplaceSplittingSelectedElement(html, selection);
  return
}
;function rangeExpandToParent(range) {
  range.setStartBefore(range.startContainer);
  range.setEndAfter(range.endContainer)
}
function rangeExpandTo(range, elements) {
  do {
    rangeExpandToParent(range);
    console.log(range.commonAncestorContainer);
    for(var i = 0, l = elements.length;i < l;i++) {
      if($(range.commonAncestorContainer).is(elements[i])) {
        return
      }
    }
  }while(range.commonAncestorContainer)
}
function rangeReplace(html, range) {
  var nodes = $("<div/>").append(html)[0].childNodes;
  range.deleteContents();
  if(nodes.length === undefined || nodes.length === 1) {
    range.insertNode(nodes[0].cloneNode(true))
  }else {
    $.each(nodes, function(i, node) {
      range.insertNodeAtEnd(node.cloneNode(true))
    })
  }
}
function rangeEmptyTag(range) {
  var contents = range.cloneContents();
  var html = fragmentToHtml(contents);
  if(typeof html === "string") {
    html = html.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, "\\$1")
  }
  if($(html).is(":empty")) {
    return true
  }
  return false
}
function rangeGetCommonAncestor(selection) {
  selection = selection || rangy.getSelection();
  var commonAncestor;
  $(selection.getAllRanges()).each(function(i, range) {
    if(this.commonAncestorContainer.nodeType === 3) {
      commonAncestor = $(range.commonAncestorContainer).parent()[0]
    }else {
      commonAncestor = range.commonAncestorContainer
    }
  });
  return commonAncestor
}
function rangeIsEmpty(range) {
  return range.startOffset === range.endOffset && range.startContainer === range.endContainer
}
;function stringStripTags(content, allowedTags) {
  allowed = [];
  for(var allowedTagsIndex = 0;allowedTagsIndex < allowedTags.length;allowedTagsIndex++) {
    if(allowedTags[allowedTagsIndex].match(/[a-z][a-z0-9]{0,}/g)) {
      allowed.push(allowedTags[allowedTagsIndex])
    }
  }
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*\/?>/gi, commentsAndPhpTags = /<\!--[\s\S]*?--\>|<\?(?:php)?[\s\S]*?\?>/gi;
  return content.replace(commentsAndPhpTags, "").replace(tags, function($0, $1) {
    return allowed.indexOf($1.toLowerCase()) > -1 ? $0 : ""
  })
}
;var currentLocale = null;
var locales = {};
var localeNames = {};
function registerLocale(name, nativeName, strings) {
  if(locales[name]) {
    handleError(_('Locale "{{localeName}}" has already been registered, and will be overwritten', {localeName:name}))
  }
  locales[name] = strings;
  localeNames[name] = nativeName;
  if(!currentLocale) {
    currentLocale = name
  }
}
function setLocale(key) {
  if(currentLocale !== key) {
    debug("Changing locale", key);
    currentLocale = key;
    $.ui.editor.eachInstance(function() {
      this.reinit()
    })
  }
}
function _(string, variables) {
  if(currentLocale && locales[currentLocale] && locales[currentLocale][string]) {
    string = locales[currentLocale][string]
  }
  if(!variables) {
    return string
  }else {
    for(var key in variables) {
      string = string.replace("{{" + key + "}}", variables[key])
    }
    return string
  }
}
;var MIN = 100;
var MID = 500;
var MAX = 1E3;
var debugLevel = MIN;
function info() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift("Raptor Editor");
  if(!console.error.apply) {
    for(var i = 0, l = args.length;i < l;i++) {
      console.error(args[i])
    }
    return
  }
  console.info.apply(console, args)
}
function debug() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift("Raptor Editor");
  if(!console.error.apply) {
    for(var i = 0, l = args.length;i < l;i++) {
      console.error(args[i])
    }
    return
  }
  console.debug.apply(console, args)
}
if(debugLevel >= MID) {
  $(function() {
    var result = [];
    for(var key in $.ui.editor.registeredUi) {
      result.push(key)
    }
    info(_("UI loaded: {{ui}} ", {ui:result.join(", ")}));
    result = [];
    for(key in $.ui.editor.plugins) {
      result.push(key)
    }
    info(_("Plugins loaded: {{plugins}} ", {plugins:result.join(", ")}));
    result = [];
    for(key in $.ui.editor.translations) {
      result.push(key)
    }
    info(_("Locales loaded: {{translations}} ", {translations:result.join(", ")}))
  })
}
if(debugLevel >= MAX) {
  info("TODO: dont fire events when editing is disabled");
  info("TODO: make a way to disable all buttons then selectivity enable ones");
  info("TODO: locale switches should affect all instances");
  info("FIXME: remove editor instance from instances array on destroy");
  info("FIXME: updateTagTree click bindings");
  info("FIXME: updateTagTree should filter out duplicates");
  info("FIXME: Check for duplicate elements in selectionGetElements")
}
function handleError(errorMessage) {
  if(console && console.error) {
    var args = Array.prototype.slice.call(arguments);
    if(!console.error.apply) {
      for(var i = 0, l = args.length;i < l;i++) {
        console.error(args[i])
      }
      return
    }
    console.error.apply(console, args)
  }else {
    throw errorMessage;
  }
}
if(!$) {
  handleError(_("jQuery is required"))
}
if(!$.ui) {
  handleError(_("jQuery UI is required"))
}
if(!$.ui.dialog) {
  handleError(_("jQuery UI Dialog is required."))
}
if(!$.ui.position) {
  handleError(_("jQuery UI Position is required."))
}
if(!rangy) {
  handleError(_('Rangy is required. This library should have been included with the file you downloaded. If not, acquire it here: http://code.google.com/p/rangy/"'))
}
$(function() {
  if(!rangy.initialized) {
    rangy.init()
  }
  if(!$.isFunction(rangy.rangePrototype.insertNodeAtEnd)) {
    rangy.rangePrototype.insertNodeAtEnd = function(node) {
      var range = this.cloneRange();
      range.collapse(false);
      range.insertNode(node);
      range.detach();
      this.setEndAfter(node)
    }
  }
});
$("html").click(function(event) {
  $(".ui-editor-selectmenu-visible").removeClass("ui-editor-selectmenu-visible")
});
var domTools = {constrainSelection:function(element, selection) {
  element = $(element)[0];
  selection = selection || rangy.getSelection();
  var commonAncestor;
  $(selection.getAllRanges()).each(function(i, range) {
    if(this.commonAncestorContainer.nodeType === 3) {
      commonAncestor = $(range.commonAncestorContainer).parent()[0]
    }else {
      commonAncestor = range.commonAncestorContainer
    }
    if(element !== commonAncestor && !$.contains(element, commonAncestor)) {
      selection.removeRange(range)
    }
  })
}, unwrapParentTag:function(tag) {
  selectionGetElements().each(function() {
    if($(this).is(tag)) {
      $(this).replaceWith($(this).html())
    }
  })
}, execCommand:function(command, arg1, arg2) {
  try {
    document.execCommand(command, arg1, arg2)
  }catch(exception) {
  }
}, insertTag:function(tagName, sel) {
  selectionEachRange(function(range) {
    range.insertNode($("<" + tagName + "/>")[0])
  }, sel, this)
}, insertTagAtEnd:function(tagName, sel) {
  selectionEachRange(function(range) {
    range.insertNodeAtEnd($("<" + tagName + "/>")[0])
  }, sel, this)
}, insertElement:function(element, clone, sel) {
  selectionEachRange(function(range) {
    $(element).each(function() {
      range.insertNode(clone === false ? this : this.cloneNode(true))
    })
  }, sel, this)
}, insertElementAtEnd:function(element, clone, sel) {
  selectionEachRange(function(range) {
    $(element).each(function() {
      range.insertNodeAtEnd(clone === false ? this : this.cloneNode(true))
    })
  }, sel, this)
}, toggleBlockStyle:function(styles, limit) {
  selectionEachRange(function(range) {
    var parent = $(range.commonAncestorContainer);
    while(parent.length && parent[0] !== limit[0] && (parent[0].nodeType === 3 || parent.css("display") === "inline")) {
      parent = parent.parent()
    }
    if(parent[0] === limit[0]) {
      if(limit.css("display") !== "inline") {
        this.wrapInner(limit, "div");
        parent = limit.children().first()
      }
    }
    this.toggleStyle(parent, styles)
  }, null, this)
}, wrapInner:function(element, tag) {
  selectionSave();
  $(element).each(function() {
    var wrapper = $("<" + tag + "/>").html($(this).html());
    element.html(wrapper)
  });
  selectionRestore()
}, inverseWrapWithTagClass:function(tag1, class1, tag2, class2) {
  selectionSave();
  var id = "domTools" + Math.ceil(Math.random() * 1E7);
  selectionEachRange(function(range) {
    var applier2 = rangy.createCssClassApplier(class2, {elementTagName:tag2});
    if(applier2.isAppliedToRange(range)) {
      applier2.toggleSelection()
    }else {
      rangy.createCssClassApplier(class1, {elementTagName:id}).toggleSelection()
    }
  }, null, this);
  $(id).each(function() {
    $(this).replaceWith($("<" + tag1 + "/>").addClass(class1).html($(this).html()))
  });
  selectionRestore()
}, toggleStyle:function(element, styles) {
  $.each(styles, function(property, value) {
    if($(element).css(property) === value) {
      $(element).css(property, "")
    }else {
      $(element).css(property, value)
    }
  })
}, getStyles:function(element) {
  var result = {};
  var style = window.getComputedStyle(element[0], null);
  for(var i = 0;i < style.length;i++) {
    result[style.item(i)] = style.getPropertyValue(style.item(i))
  }
  return result
}, swapStyles:function(element1, element2, style) {
  for(var name in style) {
    element1.css(name, element2.css(name));
    element2.css(name, style[name])
  }
}};
var supported, ios;
function isSupported(editor) {
  if(supported === undefined) {
    supported = true;
    ios = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
    if(ios) {
      $("html").addClass(editor.options.baseClass + "-ios");
      if(ios) {
        $(document).bind("scroll", function() {
          setInterval(function() {
            $("body").css("height", "+=1").css("height", "-=1")
          }, 0)
        })
      }
    }
    if($.browser.mozilla) {
      $("html").addClass(editor.options.baseClass + "-ff")
    }
    if($.browser.msie && $.browser.version < 9) {
      supported = false;
      var message = $("<div/>").addClass(editor.options.baseClass + "-unsupported").html(editor.getTemplate("unsupported")).appendTo("body");
      elementBringToTop(message);
      message.find("." + editor.options.baseClass + "-unsupported-close").click(function() {
        message.remove()
      })
    }
  }
  return supported
}
;$.widget("ui.editor", {_init:function() {
  if($.inArray(this, $.ui.editor.instances) === -1) {
    $.ui.editor.instances.push(this)
  }
  var currentInstance = this;
  $.ui.editor.eachInstance(function(instance) {
    if(currentInstance != instance && currentInstance.element.closest(instance.element).length) {
      handleError("Nesting editors is unsupported", currentInstance.element, instance.element)
    }
  });
  this.options = $.extend({}, $.ui.editor.defaults, this.options);
  this.options.uiOrder = this.options.uiOrder || [["logo"], ["save", "cancel"], ["dock", "showGuides", "clean"], ["viewSource"], ["undo", "redo"], ["alignLeft", "alignCenter", "alignJustify", "alignRight"], ["textBold", "textItalic", "textUnderline", "textStrike"], ["textSuper", "textSub"], ["listUnordered", "listOrdered"], ["hr", "quoteBlock"], ["fontSizeInc", "fontSizeDec"], ["colorPickerBasic"], ["clearFormatting"], ["link", "unlink"], ["embed"], ["floatLeft", "floatNone", "floatRight"], ["tagMenu"], 
  ["i18n"], ["raptorize"], ["statistics"], ["debugReinit", "debugDestroy"]];
  if(!this.element.attr("id")) {
    this.element.attr("id", this.getUniqueId())
  }
  this.ready = false;
  this.events = {};
  this.ui = {};
  this.plugins = {};
  this.templates = $.extend({}, $.ui.editor.templates);
  this.wrapper = null;
  this.toolbar = null;
  this.toolbarWrapper = null;
  this.path = null;
  this.enabled = false;
  this.visible = false;
  this.uiObjects = {};
  this.hotkeys = {};
  if(this.options.enableHotkeys) {
    this.registerHotkey(this.hotkeys)
  }
  for(var name in this.options.bind) {
    this.bind(name, this.options.bind[name])
  }
  this.history = [];
  this.present = 0;
  this.historyEnabled = true;
  if(!isSupported(this)) {
    return
  }
  this.cloneDomTools();
  this.setOriginalHtml(this.element.is(":input") ? this.element.val() : this.element.html());
  if(this.options.replace) {
    this.replaceOriginal();
    this.options.replace = false
  }
  this.attach();
  this.loadPlugins();
  this.dirty = false;
  this.previousContent = null;
  this.previousSelection = null;
  this.ready = true;
  this.fire("ready");
  if(this.options.autoEnable) {
    $(function() {
      currentInstance.enableEditing();
      currentInstance.showToolbar()
    })
  }
}, attach:function() {
  this.bind("change", this.historyPush);
  this.bind("selectionChange", this.updateTagTree);
  this.bind("show", this.updateTagTree);
  var change = $.proxy(this.checkChange, this);
  this.getElement().find("img").bind("click." + this.widgetName, $.proxy(function(event) {
    selectionSelectOuter(event.target)
  }, this));
  this.getElement().bind("mouseup." + this.widgetName, change);
  this.getElement().bind("keyup." + this.widgetName, change);
  $(window).bind("beforeunload", $.proxy($.ui.editor.unloadWarning, $.ui.editor))
}, reinit:function() {
  if(!this.ready) {
    var reinit;
    reinit = function() {
      this.unbind("ready", reinit);
      this.reinit()
    };
    this.bind("ready", reinit);
    return
  }
  debug("Reinitialising editor", this.getElement());
  var enabled = this.enabled, visible = this.visible;
  this.destruct();
  this._init();
  if(enabled) {
    this.enableEditing()
  }
  if(visible) {
    this.showToolbar()
  }
}, getElement:function() {
  return this.target ? this.target : this.element
}, getOriginalElement:function() {
  return this.element
}, replaceOriginal:function() {
  if(this.target) {
    return
  }
  var target = $("<div/>").html(this.element.is(":input") ? this.element.val() : this.element.html()).insertBefore(this.element).attr("id", this.getUniqueId()).addClass(this.element.attr("class"));
  var style = this.options.domTools.getStyles(this.element);
  for(var i = 0;i < this.options.replaceStyle.length;i++) {
    target.css(this.options.replaceStyle[i], style[this.options.replaceStyle[i]])
  }
  this.element.hide();
  this.bind("change", function() {
    if(this.element.is("input, textarea")) {
      this.element.val(this.getHtml())
    }else {
      this.element.html(this.getHtml())
    }
  });
  this.target = target
}, cloneDomTools:function() {
  for(var i in this.options.domTools) {
    if(!this[i]) {
      this[i] = function(i) {
        return function() {
          this.options.domTools.constrainSelection(this.getElement());
          var html = this.getHtml();
          var result = this.options.domTools[i].apply(this.options.domTools, arguments);
          if(html !== this.getHtml()) {
            if(debugLevel >= MID) {
              debug("Dom tools function (" + i + ") changed content, firing change.")
            }
            this.change()
          }
          return result
        }
      }(i)
    }
  }
}, checkChange:function() {
  var currentSelection = rangy.serializeSelection();
  if(this.previousSelection !== currentSelection) {
    this.fire("selectionChange")
  }
  this.previousSelection = currentSelection;
  var currentHtml = this.getCleanHtml();
  var wasDirty = this.dirty;
  this.dirty = this.getOriginalHtml() !== currentHtml;
  if(this.previousHtml !== currentHtml) {
    this.previousHtml = currentHtml;
    this.change();
    if(wasDirty !== this.dirty) {
      if(this.dirty) {
        this.fire("dirty")
      }else {
        this.fire("cleaned")
      }
    }
  }
}, change:function() {
  this.fire("change")
}, destruct:function() {
  this.hideToolbar();
  this.disableEditing();
  this.fire("destroy", false);
  this.events = {};
  this.getElement().unbind("." + this.widgetName);
  if(this.wrapper) {
    this.wrapper.remove()
  }
}, destroy:function() {
  this.destruct();
  $.Widget.prototype.destroy.call(this)
}, persist:function(key, value) {
  if(!this.options.persistence) {
    return null
  }
  return $.ui.editor.persist(key, value, this.options.namespace)
}, enableEditing:function() {
  if(!this.isToolbarLoaded()) {
    this.loadToolbar()
  }
  if(!this.enabled) {
    this.enabled = true;
    this.getElement().addClass(this.options.baseClass + "-editing");
    if(this.options.partialEdit) {
      this.getElement().find(this.options.partialEdit).attr("contenteditable", true)
    }else {
      this.getElement().attr("contenteditable", true)
    }
    this.execCommand("enableInlineTableEditing", false, false);
    this.execCommand("styleWithCSS", true, true);
    this.bindHotkeys();
    this.fire("enabled");
    this.fire("resize")
  }
}, disableEditing:function() {
  if(this.enabled) {
    this.enabled = false;
    this.getElement().attr("contenteditable", false).removeClass(this.options.baseClass + "-editing");
    rangy.getSelection().removeAllRanges();
    this.fire("disabled")
  }
}, isEditing:function() {
  return this.enabled
}, updateTagTree:function() {
  if(!this.isEditing()) {
    return
  }
  var editor = this;
  var title = "";
  var lists = [];
  var i = 0;
  selectionEachRange(function(range) {
    var node = range.commonAncestorContainer;
    var element;
    if(node.nodeType === 3) {
      element = $(node).parent()
    }else {
      element = $(node)
    }
    var list = [];
    lists.push(list);
    while(element[0] && !editor.isRoot(element) && element[0].tagName.toLowerCase() !== "body") {
      list.push(element);
      element = element.parent()
    }
    list.reverse();
    if(title) {
      title += " | "
    }
    title += this.getTemplate("root");
    for(var j = 0;j < list.length;j++) {
      title += this.getTemplate("tag", {element:list[j][0].tagName.toLowerCase(), data:"[" + i + "," + j + "]"})
    }
    i++
  }, null, this);
  if(!title) {
    title = this.getTemplate("root")
  }
  this.path.html(title).find("a").click(function() {
    var i = $(this).data("ui-editor-selection");
    if(i) {
      selectionSelectOuter(lists[i[0]][i[1]]);
      editor.updateTagTree()
    }else {
      selectionSelectOuter(editor.getElement())
    }
  });
  this.fire("tagTreeUpdated")
}, isRoot:function(element) {
  return this.getElement()[0] === $(element)[0]
}, unify:function(callback, callSelf) {
  if(callSelf !== false) {
    callback(this)
  }
  if(this.options.unify) {
    var instances = $.ui.editor.getInstances();
    for(var i = 0;i < instances.length;i++) {
      if(instances[i] !== this && instances[i].options.unify) {
        callback(instances[i])
      }
    }
  }
}, getUniqueId:function() {
  return $.ui.editor.getUniqueId()
}, loadMessages:function() {
  this.messages = $(this.getTemplate("messages")).appendTo(this.wrapper)
}, showMessage:function(type, message, options) {
  options = $.extend({}, this.options.message, options);
  var messageObject;
  messageObject = {timer:null, editor:this, show:function() {
    this.element.slideDown();
    this.timer = window.setTimeout(function() {
      this.timer = null;
      messageObject.hide()
    }, options.delay, this)
  }, hide:function() {
    if(this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null
    }
    this.element.stop().slideUp($.proxy(function() {
      if($.isFunction(options.hide)) {
        options.hide.call(this)
      }
      this.element.remove()
    }, this))
  }};
  messageObject.element = $(this.getTemplate("message", {type:type, message:message})).hide().appendTo(this.messages).find(".ui-editor-message-close").click(function() {
    messageObject.hide()
  }).end();
  messageObject.show();
  return messageObject
}, showLoading:function(message, options) {
  return this.showMessage("clock", message, options)
}, showInfo:function(message, options) {
  return this.showMessage("info", message, options)
}, showError:function(message, options) {
  return this.showMessage("circle-close", message, options)
}, showConfirm:function(message, options) {
  return this.showMessage("circle-check", message, options)
}, showWarning:function(message, options) {
  return this.showMessage("alert", message, options)
}, loadToolbar:function() {
  if(this.isToolbarLoaded()) {
    handleError("Attempting to reinitialise the toolbar", this.getElement());
    return
  }
  if(debugLevel >= MID) {
    debug("Loading toolbar", this.getElement())
  }
  var toolbar = this.toolbar = $("<div/>").addClass(this.options.baseClass + "-toolbar");
  var toolbarWrapper = this.toolbarWrapper = $("<div/>").addClass(this.options.baseClass + "-toolbar-wrapper").addClass("ui-widget-content").append(toolbar);
  var path = this.path = $("<div/>").addClass(this.options.baseClass + "-path").addClass("ui-widget-header").html(this.getTemplate("root"));
  var wrapper = this.wrapper = $("<div/>").addClass(this.options.baseClass + "-wrapper").css("display", "none").append(path).append(toolbarWrapper);
  if($.fn.draggable && this.options.draggable) {
    if(debugLevel >= MID) {
      debug("Initialising toolbar dragging", this.getElement())
    }
    wrapper.draggable({cancel:"a, button", cursor:"move", containment:"parent", handle:".ui-editor-path", stop:$.proxy(function() {
      var pos = this.persist("position", [wrapper.css("top"), wrapper.css("left")]);
      wrapper.css({top:Math.abs(pos[0]), left:Math.abs(pos[1])});
      if(debugLevel >= MID) {
        debug("Saving toolbar position", this.getElement(), pos)
      }
    }, this)});
    wrapper.css("position", "");
    var pos = this.persist("position") || this.options.dialogPosition;
    if(!pos) {
      pos = [10, 10]
    }
    if(debugLevel >= MID) {
      debug("Restoring toolbar position", this.getElement(), pos)
    }
    if(parseInt(pos[0], 10) + wrapper.outerHeight() > $(window).height()) {
      pos[0] = $(window).height() - wrapper.outerHeight()
    }
    if(parseInt(pos[1], 10) + wrapper.outerWidth() > $(window).width()) {
      pos[1] = $(window).width() - wrapper.outerWidth()
    }
    wrapper.css({top:Math.abs(parseInt(pos[0], 10)), left:Math.abs(parseInt(pos[1], 10))});
    this.loadMessages()
  }
  $(function() {
    wrapper.appendTo("body")
  });
  this.loadUi()
}, isToolbarLoaded:function() {
  return this.wrapper !== null
}, showToolbar:function(range) {
  if(!this.isToolbarLoaded()) {
    this.loadToolbar()
  }
  if(!this.visible) {
    if(debugLevel >= MID) {
      debug("Displaying toolbar", this.getElement())
    }
    if(this.options.unify) {
      this.hideOtherToolbars(true)
    }
    this.visible = true;
    this.wrapper.css("display", "");
    this.fire("resize");
    if(typeof this.getElement().attr("tabindex") === "undefined") {
      this.getElement().attr("tabindex", -1)
    }
    if(range) {
      if(range.select) {
        range.select()
      }else {
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range)
      }
    }
    var editor = this;
    $(function() {
      editor.fire("show");
      editor.getElement().focus()
    })
  }
}, hideToolbar:function() {
  if(this.visible) {
    this.visible = false;
    this.wrapper.hide();
    this.fire("hide");
    this.fire("resize")
  }
}, hideOtherToolbars:function(instant) {
  this.unify(function(editor) {
    editor.hideToolbar(instant)
  }, false)
}, isVisible:function() {
  return this.visible
}, getTemplate:function(name, variables) {
  var template;
  if(!this.templates[name]) {
    template = $.ui.editor.getTemplate(name, this.options.urlPrefix)
  }else {
    template = this.templates[name]
  }
  template = template.replace(/_\(['"]{1}(.*?)['"]{1}\)/g, function(match, string) {
    string = string.replace(/\\(.?)/g, function(s, slash) {
      switch(slash) {
        case "\\":
          return"\\";
        case "0":
          return"\x00";
        case "":
          return"";
        default:
          return slash
      }
    });
    return _(string)
  });
  variables = $.extend({}, this.options, variables || {});
  variables = this.getTemplateVars(variables);
  template = template.replace(/\{\{(.*?)\}\}/g, function(match, variable) {
    return variables[variable]
  });
  return template
}, getTemplateVars:function(variables, prefix, depth) {
  prefix = prefix ? prefix + "." : "";
  var maxDepth = 5;
  if(!depth) {
    depth = 1
  }
  var result = {};
  for(var name in variables) {
    if(typeof variables[name] === "object" && depth < maxDepth) {
      var inner = this.getTemplateVars(variables[name], prefix + name, ++depth);
      for(var innerName in inner) {
        result[innerName] = inner[innerName]
      }
    }else {
      result[prefix + name] = variables[name]
    }
  }
  return result
}, historyPush:function() {
  if(!this.historyEnabled) {
    return
  }
  var html = this.getHtml();
  if(html !== this.historyPeak()) {
    if(this.present !== this.history.length - 1) {
      this.history = this.history.splice(0, this.present + 1)
    }
    this.history.push(this.getHtml());
    this.present = this.history.length - 1
  }
}, historyPeak:function() {
  if(!this.history.length) {
    return null
  }
  return this.history[this.present]
}, historyBack:function() {
  if(this.present > 0) {
    this.present--;
    this.setHtml(this.history[this.present]);
    this.historyEnabled = false;
    this.change();
    this.historyEnabled = true
  }
}, historyForward:function() {
  if(this.present < this.history.length - 1) {
    this.present++;
    this.setHtml(this.history[this.present]);
    this.historyEnabled = false;
    this.change();
    this.historyEnabled = true
  }
}, registerHotkey:function(mixed, actionData, context) {
  if(typeof mixed === "string") {
    if(this.hotkeys[mixed]) {
      handleError(_('Hotkey "{{hotkey}}" has already been registered, and will be overwritten', {hotkey:mixed}))
    }
    this.hotkeys[mixed] = $.extend({}, {context:context, restoreSelection:true}, actionData)
  }else {
    for(var name in mixed) {
      this.registerHotkey(name, mixed[name], context)
    }
  }
}, bindHotkeys:function() {
  for(var keyCombination in this.hotkeys) {
    var editor = this, force = this.hotkeys[keyCombination].force || false;
    if(!this.options.enableHotkeys && !force) {
      continue
    }
    this.getElement().bind("keydown." + this.widgetName, keyCombination, function(event) {
      selectionSave();
      var object = editor.hotkeys[event.data];
      if(object.action.call(object.context) !== true) {
        event.preventDefault()
      }
      if(object.restoreSelection) {
        selectionRestore()
      }
      editor.checkChange()
    })
  }
}, uiEnabled:function(ui) {
  if(this.options.enableUi === false && typeof this.options.ui[ui] === "undefined" || this.options.ui[ui] === false) {
    if(debugLevel >= MID) {
      debug("UI with name " + ui + " has been disabled " + (this.options.enableUi === false ? "by default" : "manually") + $.inArray(ui, this.options.ui))
    }
    return false
  }
  if($.inArray(ui, this.options.disabledUi) !== -1) {
    return false
  }
  return true
}, getUi:function(ui) {
  return this.uiObjects[ui]
}, loadUi:function() {
  for(var i = 0, l = this.options.uiOrder.length;i < l;i++) {
    var uiSet = this.options.uiOrder[i];
    var uiGroup = $("<div/>");
    for(var j = 0, ll = uiSet.length;j < ll;j++) {
      if(!this.uiEnabled(uiSet[j])) {
        continue
      }
      var baseClass = uiSet[j].replace(/([A-Z])/g, function(match) {
        return"-" + match.toLowerCase()
      });
      if($.ui.editor.ui[uiSet[j]]) {
        var uiObject = $.extend({}, $.ui.editor.ui[uiSet[j]]);
        var options = $.extend(true, {}, this.options, {baseClass:this.options.baseClass + "-ui-" + baseClass}, uiObject.options, this.options.ui[uiSet[j]]);
        uiObject.editor = this;
        uiObject.options = options;
        uiObject.ui = uiObject.init(this, options);
        if(uiObject.hotkeys) {
          this.registerHotkey(uiObject.hotkeys, null, uiObject);
          uiObject.ui.title += " (" + $.map(uiObject.hotkeys, function(value, index) {
            return index
          })[0] + ")"
        }
        uiObject.ui.init(uiSet[j], this, options, uiObject).appendTo(uiGroup);
        this.uiObjects[uiSet[j]] = uiObject
      }else {
        handleError(_('UI identified by key "{{ui}}" does not exist', {ui:uiSet[j]}))
      }
    }
    uiGroup.addClass("ui-buttonset").addClass(this.options.baseClass + "-buttonset");
    if(uiGroup.children().length > 0) {
      uiGroup.appendTo(this.toolbar)
    }
  }
  $("<div/>").css("clear", "both").appendTo(this.toolbar)
}, uiButton:function(options) {
  return $.extend({button:null, options:{}, init:function(name, editor, options, object) {
    var baseClass = name.replace(/([A-Z])/g, function(match) {
      return"-" + match.toLowerCase()
    });
    options = $.extend({}, editor.options, {baseClass:editor.options.baseClass + "-" + baseClass + "-button"}, this.options, editor.options.ui[name]);
    if(!this.title) {
      this.title = _("Unnamed Button")
    }
    this.button = $("<div/>").html(this.label || this.title).addClass(options.baseClass).attr("name", name).attr("title", this.title).val(name);
    if(options.classes) {
      this.button.addClass(options.classes)
    }
    this.button.bind("mousedown." + object.editor.widgetName, function(e) {
      e.preventDefault()
    });
    var button = this;
    this.button.bind("mouseup." + object.editor.widgetName, function(e) {
      e.preventDefault();
      button.click.apply(object, arguments)
    });
    editor.bind("destroy", $.proxy(function() {
      this.button.button("destroy").remove()
    }, this));
    this.button.button({icons:{primary:this.icon || "ui-icon-" + baseClass}, disabled:options.disabled ? true : false, text:this.text || false, label:this.label || null});
    this.ready.call(object);
    return this.button
  }, disable:function() {
    this.button.button("option", "disabled", true)
  }, enable:function() {
    this.button.button("option", "disabled", false)
  }, ready:function() {
  }, click:function() {
  }}, options)
}, uiSelectMenu:function(options) {
  return $.extend({select:null, selectMenu:null, button:null, menu:null, options:{}, init:function(name, editor) {
    var ui = this;
    var baseClass = name.replace(/([A-Z])/g, function(match) {
      return"-" + match.toLowerCase()
    });
    var options = $.extend({}, editor.options, {baseClass:editor.options.baseClass + baseClass + "-select-menu"}, ui.options, editor.options.ui[name]);
    if(!ui.title) {
      ui.title = _("Unnamed Select Menu")
    }
    ui.wrapper = $('<div class="ui-editor-selectmenu-wrapper"/>').append(ui.select.hide()).addClass(ui.select.attr("class"));
    ui.selectMenu = $('<div class="ui-editor-selectmenu"/>').appendTo(ui.wrapper);
    ui.menu = $('<div class="ui-editor-selectmenu-menu ui-widget-content ui-corner-bottom ui-corner-tr"/>').appendTo(ui.wrapper);
    ui.select.find("option, .ui-editor-selectmenu-option").each(function() {
      var option = $("<div/>").addClass("ui-editor-selectmenu-menu-item").addClass("ui-corner-all").html($(this).html()).appendTo(ui.menu).bind("mouseenter." + editor.widgetName, function() {
        $(this).addClass("ui-state-focus")
      }).bind("mouseleave." + editor.widgetName, function() {
        $(this).removeClass("ui-state-focus")
      }).bind("mousedown." + editor.widgetName, function() {
        return false
      }).bind("click." + editor.widgetName, function() {
        var option = ui.select.find("option, .ui-editor-selectmenu-option").eq($(this).index());
        var value = option.attr("value") || option.val();
        ui.select.val(value);
        ui.update();
        ui.wrapper.removeClass("ui-editor-selectmenu-visible");
        ui.button.addClass("ui-corner-all").removeClass("ui-corner-top");
        ui.change(value);
        return false
      })
    });
    var text = $("<div/>").addClass("ui-editor-selectmenu-text");
    var icon = $("<div/>").addClass("ui-icon ui-icon-triangle-1-s");
    ui.button = $("<div/>").addClass("ui-editor-selectmenu-button ui-editor-selectmenu-button ui-button ui-state-default").attr("title", ui.title).append(text).append(icon).prependTo(ui.selectMenu);
    ui.button.bind("mousedown." + editor.widgetName, function() {
      return false
    }).bind("click." + editor.widgetName, function() {
      if($(this).hasClass("ui-state-disabled")) {
        return
      }
      if(parseInt(ui.menu.css("min-width"), 10) < ui.button.outerWidth() + 10) {
        ui.menu.css("min-width", ui.button.outerWidth() + 10)
      }
      ui.wrapper.toggleClass("ui-editor-selectmenu-visible");
      return false
    }).bind("mouseenter." + editor.widgetName, function() {
      if(!$(this).hasClass("ui-state-disabled")) {
        $(this).addClass("ui-state-hover", $(this).hasClass("ui-state-disabled"))
      }
    }).bind("mouseleave." + editor.widgetName, function() {
      $(this).removeClass("ui-state-hover")
    });
    var selected = ui.select.find("option[value=" + this.select.val() + "], .ui-editor-selectmenu-option[value=" + this.select.val() + "]").html() || ui.select.find("option, .ui-editor-selectmenu-option").first().html();
    ui.button.find(".ui-editor-selectmenu-text").html(selected);
    return ui.wrapper
  }, update:function(value) {
    var selected = this.select.find("option[value=" + this.select.val() + "], .ui-editor-selectmenu-option[value=" + this.select.val() + "]").html();
    this.button.find(".ui-editor-selectmenu-text").html(selected)
  }, val:function() {
    var result = this.select.val.apply(this.select, arguments);
    this.update();
    return result
  }, change:function() {
  }}, options)
}, getPlugin:function(name) {
  return this.plugins[name]
}, loadPlugins:function() {
  var editor = this;
  if(!this.options.plugins) {
    this.options.plugins = {}
  }
  for(var name in $.ui.editor.plugins) {
    if(this.options.enablePlugins === false && typeof this.options.plugins[name] === "undefined" || this.options.plugins[name] === false) {
      if(debugLevel >= MID) {
        debug("Not loading plugin " + name)
      }
      continue
    }
    if($.inArray(name, this.options.disabledPlugins) !== -1) {
      continue
    }
    var pluginObject = $.extend({}, $.ui.editor.plugins[name]);
    var baseClass = name.replace(/([A-Z])/g, function(match) {
      return"-" + match.toLowerCase()
    });
    var options = $.extend(true, {}, editor.options, {baseClass:editor.options.baseClass + "-" + baseClass}, pluginObject.options, editor.options.plugins[name]);
    pluginObject.editor = editor;
    pluginObject.options = options;
    pluginObject.init(editor, options);
    if(pluginObject.hotkeys) {
      this.registerHotkey(pluginObject.hotkeys, null, pluginObject)
    }
    editor.plugins[name] = pluginObject
  }
}, isDirty:function() {
  return this.dirty
}, getHtml:function() {
  var content = this.getElement().html();
  content = $("<div/>").html(content);
  content.find(".rangySelectionBoundary").remove();
  content = content.html();
  return content
}, getCleanHtml:function() {
  this.fire("clean");
  var content = this.getElement().html();
  this.fire("restore");
  content = $("<div/>").html(content);
  content.find(".rangySelectionBoundary").remove();
  content = content.html();
  return content
}, setHtml:function(html) {
  this.getElement().html(html);
  this.fire("html");
  this.change()
}, resetHtml:function() {
  this.setHtml(this.getOriginalHtml());
  this.fire("cleaned")
}, getOriginalHtml:function() {
  return this.originalHtml
}, save:function() {
  var html = this.getCleanHtml();
  this.fire("save");
  this.setOriginalHtml(html);
  this.fire("saved");
  this.fire("cleaned");
  return html
}, setOriginalHtml:function(html) {
  this.originalHtml = html
}, bind:function(name, callback, context) {
  if(!$.isFunction(callback)) {
    handleError("Must bind a valid callback, " + name + " was a " + typeof callback)
  }
  var events = this.events;
  $.each(name.split(","), function(i, name) {
    name = $.trim(name);
    if(!events[name]) {
      events[name] = []
    }
    events[name].push({context:context, callback:callback})
  })
}, unbind:function(name, callback, context) {
  for(var i = 0, l = this.events[name].length;i < l;i++) {
    if(this.events[name][i] && this.events[name][i].callback === callback && this.events[name][i].context === context) {
      this.events[name].splice(i, 1)
    }
  }
}, fire:function(name, global, sub) {
  if(!sub) {
    this.fire("before:" + name, global, true)
  }
  if(debugLevel === MAX) {
    if(!name.match(/^before:/) && !name.match(/^after:/)) {
      debug("Firing event: " + name)
    }
  }else {
    if(debugLevel > MAX) {
      debug("Firing event: " + name, this.getElement())
    }
  }
  if(this.events[name]) {
    for(var i = 0, l = this.events[name].length;i < l;i++) {
      var event = this.events[name][i];
      if(typeof event.callback !== "undefined") {
        event.callback.call(event.context || this)
      }
    }
  }
  if(global !== false) {
    $.ui.editor.fire(name)
  }
  if(!sub) {
    this.fire("after:" + name, global, true)
  }
}});
$.extend($.ui.editor, {elementRemoveComments:elementRemoveComments, elementRemoveAttributes:elementRemoveAttributes, elementBringToTop:elementBringToTop, elementOuterHtml:elementOuterHtml, elementOuterText:elementOuterText, elementIsBlock:elementIsBlock, elementDefaultDisplay:elementDefaultDisplay, elementIsValid:elementIsValid, fragmentToHtml:fragmentToHtml, fragmentInsertBefore:fragmentInsertBefore, rangeExpandToParent:rangeExpandToParent, rangeGetCommonAncestor:rangeGetCommonAncestor, rangeIsEmpty:rangeIsEmpty, 
selectionSave:selectionSave, selectionRestore:selectionRestore, selectionDestroy:selectionDestroy, selectionEachRange:selectionEachRange, selectionReplace:selectionReplace, selectionSelectInner:selectionSelectInner, selectionSelectOuter:selectionSelectOuter, selectionSelectEdge:selectionSelectEdge, selectionSelectEnd:selectionSelectEnd, selectionSelectStart:selectionSelectStart, selectionGetHtml:selectionGetHtml, selectionGetElements:selectionGetElements, selectionToggleWrapper:selectionToggleWrapper, 
selectionExists:selectionExists, selectionReplaceSplittingSelectedElement:selectionReplaceSplittingSelectedElement, selectionReplaceWithinValidTags:selectionReplaceWithinValidTags, stringStripTags:stringStripTags, defaults:{plugins:{}, ui:{}, bind:{}, domTools:domTools, namespace:null, unify:true, persistence:true, persistenceName:"uiEditor", unloadWarning:true, autoEnable:false, partialEdit:false, enablePlugins:true, disabledPlugins:[], uiOrder:null, enableUi:true, disabledUi:[], message:{delay:5E3}, 
replace:false, replaceStyle:["display", "position", "float", "width", "padding-left", "padding-right", "padding-top", "padding-bottom", "margin-left", "margin-right", "margin-top", "margin-bottom"], baseClass:"ui-editor", cssPrefix:"cms-", draggable:true, enableHotkeys:true, hotkeys:{}, supplementaryClass:"supplementary-element-class"}, events:{}, plugins:{}, ui:{}, instances:[], getInstances:function() {
  return this.instances
}, eachInstance:function(callback) {
  for(var i = 0;i < this.instances.length;i++) {
    callback.call(this.instances[i], this.instances[i])
  }
}, urlPrefix:"/raptor/", templates:{}, getTemplate:function(name, urlPrefix) {
  var template;
  if(!this.templates[name]) {
    var url = urlPrefix || this.urlPrefix;
    var split = name.split(".");
    if(split.length === 1) {
      url += "templates/" + split[0] + ".html"
    }else {
      url += "plugins/" + split[0] + "/templates/" + split.splice(1).join("/") + ".html"
    }
    $.ajax({url:url, type:"GET", async:false, cache:false, timeout:15E3, error:function() {
      template = null
    }, success:function(data) {
      template = data
    }});
    this.templates[name] = template
  }else {
    template = this.templates[name]
  }
  return template
}, getUniqueId:function() {
  var id = $.ui.editor.defaults.baseClass + "-uid-" + (new Date).getTime() + "-" + Math.floor(Math.random() * 1E5);
  while($("#" + id).length) {
    id = $.ui.editor.defaults.baseClass + "-uid-" + (new Date).getTime() + "-" + Math.floor(Math.random() * 1E5)
  }
  return id
}, isDirty:function() {
  var instances = this.getInstances();
  for(var i = 0;i < instances.length;i++) {
    if(instances[i].isDirty()) {
      return true
    }
  }
  return false
}, unloadWarning:function() {
  var instances = this.getInstances();
  for(var i = 0;i < instances.length;i++) {
    if(instances[i].isDirty() && instances[i].isEditing() && instances[i].options.unloadWarning) {
      return _("\nThere are unsaved changes on this page. \nIf you navigate away from this page you will lose your unsaved changes")
    }
  }
}, defaultUi:{ui:null, editor:null, options:null, init:function(editor, options) {
}, persist:function(key, value) {
  return this.editor.persist(key, value)
}, bind:function(name, callback, context) {
  this.editor.bind(name, callback, context || this)
}, unbind:function(name, callback, context) {
  this.editor.unbind(name, callback, context || this)
}}, registerUi:function(mixed, ui) {
  if(typeof mixed === "string") {
    if(this.ui[mixed]) {
      handleError(_('UI "{{name}}" has already been registered, and will be overwritten', {name:mixed}))
    }
    this.ui[mixed] = $.extend({}, this.defaultUi, ui)
  }else {
    for(var name in mixed) {
      this.registerUi(name, mixed[name])
    }
  }
}, defaultPlugin:{editor:null, options:null, init:function(editor, options) {
}, persist:function(key, value) {
  return this.editor.persist(key, value)
}, bind:function(name, callback, context) {
  this.editor.bind(name, callback, context || this)
}, unbind:function(name, callback, context) {
  this.editor.unbind(name, callback, context || this)
}}, registerPlugin:function(mixed, plugin) {
  if(typeof mixed === "string") {
    if(this.plugins[mixed]) {
      handleError(_('Plugin "{{pluginName}}" has already been registered, and will be overwritten', {pluginName:mixed}))
    }
    this.plugins[mixed] = $.extend({}, this.defaultPlugin, plugin)
  }else {
    for(var name in mixed) {
      this.registerPlugin(name, mixed[name])
    }
  }
}, bind:function(name, callback) {
  if(!this.events[name]) {
    this.events[name] = []
  }
  this.events[name].push(callback)
}, unbind:function(callback) {
  $.each(this.events, function(name) {
    for(var i = 0;i < this.length;i++) {
      if(this[i] === callback) {
        this.events[name].splice(i, 1)
      }
    }
  })
}, fire:function(name) {
  if(debugLevel > MAX) {
    debug("Firing global/static event: " + name)
  }
  if(!this.events[name]) {
    return
  }
  for(var i = 0, l = this.events[name].length;i < l;i++) {
    this.events[name][i].call(this)
  }
}, persist:function(key, value, namespace) {
  key = namespace ? namespace + "." + key : key;
  if(localStorage) {
    var storage;
    if(localStorage.uiWidgetEditor) {
      storage = JSON.parse(localStorage.uiWidgetEditor)
    }else {
      storage = {}
    }
    if(value === undefined) {
      return storage[key]
    }
    storage[key] = value;
    localStorage.uiWidgetEditor = JSON.stringify(storage)
  }
  return value
}});
$.ui.editor.registerPlugin("toolbarTip", {init:function(editor, options) {
  if($.browser.msie) {
    return
  }
  this.bind("show, tagTreeUpdated", function() {
    $(".ui-editor-wrapper [title]").each(function() {
      $(this).attr("data-title", $(this).attr("title"));
      $(this).removeAttr("title")
    })
  })
}});
$.ui.editor.registerPlugin("dock", {enabled:false, docked:false, topSpacer:null, bottomSpacer:null, options:{docked:false, dockToElement:false, dockUnder:false, persist:true, persistID:null}, init:function(editor) {
  this.bind("show", this.show);
  this.bind("hide", this.hide);
  this.bind("disabled", this.disable);
  this.bind("destroy", this.destroy, this)
}, show:function() {
  if(!this.enabled) {
    if(this.loadState() || this.options.docked) {
      this.dock()
    }
    this.enabled = true
  }else {
    if(this.isDocked()) {
      this.showSpacers()
    }
  }
}, hide:function() {
  this.hideSpacers();
  this.editor.toolbar.css("width", "auto")
}, showSpacers:function() {
  if(this.options.dockToElement || !this.editor.toolbar.is(":visible")) {
    return
  }
  this.topSpacer = $("<div/>").addClass(this.options.baseClass + "-top-spacer").height(this.editor.toolbar.outerHeight()).prependTo("body");
  this.bottomSpacer = $("<div/>").addClass(this.options.baseClass + "-bottom-spacer").height(this.editor.path.outerHeight()).appendTo("body");
  this.editor.fire("resize")
}, hideSpacers:function() {
  if(this.topSpacer) {
    this.topSpacer.remove();
    this.topSpacer = null
  }
  if(this.bottomSpacer) {
    this.bottomSpacer.remove();
    this.bottomSpacer = null
  }
  this.editor.fire("resize")
}, swapStyle:function(to, from, style) {
  var result = {};
  for(var name in style) {
    to.css(name, from.css(name));
    result[name] = from.css(name);
    from.css(name, style[name])
  }
  return result
}, revertStyle:function(to, style) {
  for(var name in style) {
    to.css(name, style[name])
  }
}, dockToElement:function() {
  var plugin = this;
  if(debugLevel >= MID) {
    debug("Dock to element", plugin.editor.getElement())
  }
  var wrapper = $("<div/>").insertBefore(this.editor.getElement()).addClass(this.options.baseClass + "-docked-to-element-wrapper");
  this.editor.wrapper.appendTo(wrapper);
  this.previousStyle = this.swapStyle(wrapper, this.editor.getElement(), {"display":"block", "float":"none", "clear":"none", "position":"static", "margin-left":0, "margin-right":0, "margin-top":0, "margin-bottom":0, "outline":0, "width":"auto"});
  wrapper.css("width", wrapper.width() + parseInt(this.editor.getElement().css("padding-left"), 10) + parseInt(this.editor.getElement().css("padding-right"), 10));
  this.editor.getElement().appendTo(this.editor.wrapper).addClass(this.options.baseClass + "-docked-element")
}, undockFromElement:function() {
  if(debugLevel >= MID) {
    debug("Undock from element", this.editor.getElement())
  }
  this.editor.getElement().insertAfter(this.editor.wrapper).removeClass(this.options.baseClass + "-docked-element");
  this.editor.wrapper.appendTo("body").removeClass(this.options.baseClass + "-docked-to-element")
}, dockToBody:function() {
  if(debugLevel >= MID) {
    debug("Dock to body")
  }
  var top = 0;
  if($(this.options.dockUnder).length) {
    top = $(this.options.dockUnder).outerHeight()
  }
  this.top = this.editor.toolbarWrapper.css("top");
  this.editor.toolbarWrapper.css("top", top);
  this.editor.wrapper.addClass(this.options.baseClass + "-docked");
  this.editor.messages.css("top", top + this.editor.toolbar.outerHeight())
}, undockFromBody:function() {
  if(debugLevel >= MID) {
    debug("Undock from body")
  }
  this.editor.toolbarWrapper.css("top", this.top);
  this.editor.wrapper.removeClass(this.options.baseClass + "-docked");
  this.hideSpacers()
}, dock:function() {
  if(this.docked) {
    return
  }
  this.docked = this.saveState(true);
  if(this.options.dockToElement) {
    this.dockToElement()
  }else {
    this.dockToBody()
  }
  var button = this.editor.wrapper.find("." + this.options.baseClass + "-button").button({icons:{primary:"ui-icon-pin-w"}});
  if(button.attr("title")) {
    button.attr("title", this.getTitle())
  }else {
    button.attr("data-title", this.getTitle())
  }
  this.editor.toolbar.find("." + this.editor.options.baseClass + "-inner").addClass("ui-widget-header");
  this.showSpacers()
}, undock:function() {
  if(!this.docked) {
    return
  }
  this.docked = this.destroying ? false : this.saveState(false);
  this.editor.toolbar.find("." + this.editor.options.baseClass + "-inner").removeClass("ui-widget-header");
  var button = this.editor.wrapper.find("." + this.options.baseClass + "-button").button({icons:{primary:"ui-icon-pin-s"}});
  if(button.attr("title")) {
    button.attr("title", this.getTitle())
  }else {
    button.attr("data-title", this.getTitle())
  }
  if(this.options.dockToElement) {
    this.undockFromElement()
  }else {
    this.undockFromBody()
  }
  this.editor.fire("resize")
}, isDocked:function() {
  return this.docked
}, getTitle:function() {
  return this.isDocked() ? _("Click to detach the toolbar") : _("Click to dock the toolbar")
}, saveState:function(state) {
  if(!this.persist) {
    return
  }
  if(this.persistID) {
    this.persist("docked:" + this.persistID, state)
  }else {
    this.persist("docked", state)
  }
  return state
}, loadState:function() {
  if(!this.persist) {
    return null
  }
  if(this.persistID) {
    return this.persist("docked:" + this.persistID)
  }
  return this.persist("docked")
}, disable:function() {
  this.hideSpacers()
}, destroy:function() {
  this.destroying = true;
  this.undock()
}});
$.ui.editor.registerUi({dock:{hotkeys:{"ctrl+d":{"action":function() {
  this.ui.click()
}}}, init:function(editor) {
  return editor.uiButton({title:editor.getPlugin("dock").getTitle(), icon:editor.getPlugin("dock").isDocked() ? "ui-icon-pin-w" : "ui-icon-pin-s", click:function() {
    var plugin = editor.getPlugin("dock");
    if(plugin.isDocked()) {
      plugin.undock()
    }else {
      plugin.dock()
    }
    editor.unify(function(editor) {
      if(plugin.isDocked()) {
        editor.getPlugin("dock").dock()
      }else {
        editor.getPlugin("dock").undock()
      }
    })
  }})
}}});
$.ui.editor.registerPlugin("clickToEdit", {init:function(editor, options) {
  var plugin = this;
  var message = $(editor.getTemplate("clicktoedit.message", options)).appendTo("body");
  options = $.extend({}, {obscureLinks:false, position:{at:"center center", of:editor.getElement(), my:"center center", using:function(position) {
    $(this).css({position:"absolute", top:position.top, left:position.left})
  }}}, options);
  this.selection = function() {
    var range;
    if(document.selection) {
      range = document.selection.createRange()
    }else {
      if(document.getSelection().rangeCount) {
        range = document.getSelection().getRangeAt(0)
      }
    }
    return range
  };
  this.show = function() {
    if(editor.isEditing()) {
      return
    }
    editor.getElement().addClass(options.baseClass + "-highlight");
    editor.getElement().addClass(options.baseClass + "-hover");
    message.position(options.position);
    message.addClass(options.baseClass + "-visible")
  };
  this.hide = function() {
    editor.getElement().removeClass(options.baseClass + "-highlight");
    editor.getElement().removeClass(options.baseClass + "-hover");
    message.removeClass(options.baseClass + "-visible")
  };
  this.edit = function() {
    plugin.hide();
    if(!editor.isEditing()) {
      editor.enableEditing()
    }
    if(!editor.isVisible()) {
      editor.showToolbar(plugin.selection())
    }
  };
  message.position(options.position);
  if(!options.obscureLinks) {
    editor.getElement().find("a").bind("mouseenter." + editor.widgetName, plugin.hide);
    editor.getElement().find("a").bind("mouseleave." + editor.widgetName, plugin.show)
  }
  editor.getElement().bind("mouseenter." + editor.widgetName, plugin.show);
  editor.getElement().bind("mouseleave." + editor.widgetName, plugin.hide);
  editor.getElement().bind("click." + editor.widgetName, function(event) {
    if(options.obscureLinks || !$(event.target).is("a") && !$(event.target).parents("a").length) {
      plugin.edit()
    }
  });
  editor.bind("destroy", function() {
    message.remove();
    editor.getElement().unbind("mouseenter." + editor.widgetName, plugin.show);
    editor.getElement().unbind("mouseleave." + editor.widgetName, plugin.hide);
    editor.getElement().unbind("click." + editor.widgetName, plugin.edit)
  })
}});
$.ui.editor.registerUi("colorPickerBasic", {init:function(editor) {
  editor.bind("selectionChange", this.change, this);
  editor.bind("show", this.change, this);
  var ui = this;
  return editor.uiSelectMenu({name:"colorPickerBasic", title:_("Change the color of the selected text."), select:$(editor.getTemplate("color-picker-basic.menu")), change:function(value) {
    if(value === "automatic") {
      selectionGetElements().parents("." + ui.options.cssPrefix + "color").andSelf().each(function() {
        var element = $(this), classes = $(this).attr("class").match(/(cms-(.*?))( |$)/ig);
        $.each(classes, function(i, color) {
          color = $.trim(color);
          element.removeClass(color)
        })
      })
    }else {
      selectionToggleWrapper("span", {classes:ui.options.classes || ui.options.cssPrefix + "color " + ui.options.cssPrefix + value})
    }
  }})
}, change:function() {
  this.ui.val("automatic");
  var tag = selectionGetElements()[0];
  if(!tag) {
    return
  }
  tag = $(tag).closest("." + this.options.cssPrefix + "color");
  if(!tag) {
    return
  }
  var classes = tag.attr("class");
  if(classes) {
    classes = tag.attr("class").replace(new RegExp(this.options.cssPrefix + "color", "g"), "");
    var color = classes.match(/cms-(.*?)( |$)/i)[1];
    if(this.ui.select.find(".ui-editor-selectmenu-option[value=" + color + "]").length) {
      this.ui.val(color)
    }
  }
}});
$.ui.editor.registerPlugin("clean", {options:{stripAttrs:["_moz_dirty"], stripAttrContent:{type:"_moz"}, stripEmptyTags:["span", "h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "u", "strong", "em", "big", "small", "div"], stripEmptyAttrs:["class", "id", "style"], stripDomains:[{selector:"a", attributes:["href"]}, {selector:"img", attributes:["src"]}]}, init:function(editor, options) {
  editor.bind("change", this.clean, this)
}, clean:function() {
  var i;
  var editor = this.editor;
  for(i = 0;i < this.options.stripAttrs.length;i++) {
    editor.getElement().find("[" + this.options.stripAttrs[i] + "]").removeAttr(this.options.stripAttrs[i])
  }
  for(i = 0;i < this.options.stripAttrContent.length;i++) {
    editor.getElement().find("[" + i + '="' + this.options.stripAttrs[i] + '"]').removeAttr(this.options.stripAttrs[i])
  }
  for(i = 0;i < this.options.stripEmptyTags.length;i++) {
    editor.getElement().find(this.options.stripEmptyTags[i]).filter(function() {
      if($(this).hasClass(editor.options.supplementaryClass)) {
        return false
      }
      if($(this).hasClass("rangySelectionBoundary") && selectionSaved() === false) {
        return true
      }
      if($.trim($(this).html()) === "") {
        return true
      }
    }).remove()
  }
  for(i = 0;i < this.options.stripEmptyAttrs.length;i++) {
    var attr = this.options.stripEmptyAttrs[i];
    editor.getElement().find("[" + this.options.stripEmptyAttrs[i] + "]").filter(function() {
      return $.trim($(this).attr(attr)) === ""
    }).removeAttr(this.options.stripEmptyAttrs[i])
  }
  var origin = window.location.protocol + "//" + window.location.host, protocolDomain = "//" + window.location.host;
  for(i = 0;i < this.options.stripDomains.length;i++) {
    var def = this.options.stripDomains[i];
    this.editor.getElement().find(def.selector).each(function() {
      for(var j = 0;j < def.attributes.length;j++) {
        var attr = $(this).attr(def.attributes[j]);
        if(typeof attr === "undefined") {
          continue
        }
        if(attr.indexOf(origin) === 0) {
          $(this).attr(def.attributes[j], attr.substr(origin.length))
        }else {
          if(attr.indexOf(protocolDomain) === 0) {
            $(this).attr(def.attributes[j], attr.substr(protocolDomain.length))
          }
        }
      }
    })
  }
  this.editor.getElement().find("ul, ol").each(function() {
    $(this).find(" > :not(li)").each(function() {
      if(elementDefaultDisplay($(this).attr("tag"))) {
        $(this).replaceWith($("<li>" + $(this).html() + "</li>").appendTo("body"))
      }else {
        $(this).wrap($("<li>"))
      }
    })
  })
}});
$.ui.editor.registerUi({clean:{init:function(editor) {
  return editor.uiButton({title:_("Remove unnecessary markup from editor content"), click:function() {
    editor.getPlugin("clean").clean()
  }})
}}});
$.ui.editor.registerUi({clearFormatting:{init:function(editor, options) {
  return this.editor.uiButton({title:_("Clear Formatting"), click:function() {
    var sel = rangy.getSelection();
    if(sel.rangeCount > 0) {
      var range = sel.getRangeAt(0).cloneRange();
      var content = range.extractContents();
      if(fragmentToHtml(content) == "") {
        editor.expandToParent(range);
        sel.setSingleRange(range);
        content = range.extractContents()
      }
      content = $("<div/>").append(fragmentToHtml(content)).text();
      var parent = range.commonAncestorContainer;
      while(parent && parent.parentNode != editor.getElement().get(0)) {
        parent = parent.parentNode
      }
      if(parent) {
        range.setEndAfter(parent);
        var contentAfterRangeStart = range.extractContents();
        range.collapseAfter(parent);
        range.insertNode(contentAfterRangeStart);
        range.collapseAfter(parent);
        range.insertNode(document.createTextNode(content))
      }else {
        range.insertNode(document.createTextNode(content))
      }
    }
    editor.checkChange()
  }})
}}});
$.ui.editor.registerUi({alignLeft:{init:function(editor) {
  return editor.uiButton({title:_("Left Align"), click:function() {
    editor.toggleBlockStyle({"text-align":"left"}, editor.getElement())
  }})
}}, alignJustify:{init:function(editor) {
  return editor.uiButton({title:_("Justify"), click:function() {
    editor.toggleBlockStyle({"text-align":"justify"}, editor.getElement())
  }})
}}, alignCenter:{init:function(editor) {
  return editor.uiButton({title:_("Center Align"), click:function() {
    editor.toggleBlockStyle({"text-align":"center"}, editor.getElement())
  }})
}}, alignRight:{init:function(editor) {
  return editor.uiButton({title:_("Right Align"), click:function() {
    editor.toggleBlockStyle({"text-align":"right"}, editor.getElement())
  }})
}}});
$.ui.editor.registerUi({textBold:{hotkeys:{"ctrl+b":{"action":function() {
  this.ui.click()
}}}, init:function(editor, options) {
  return this.editor.uiButton({title:_("Bold"), click:function() {
    selectionToggleWrapper("strong", {classes:options.classes || options.cssPrefix + "bold"})
  }})
}}, textItalic:{hotkeys:{"ctrl+i":{"action":function() {
  this.ui.click()
}}}, init:function(editor, options) {
  return editor.uiButton({title:_("Italic"), click:function() {
    selectionToggleWrapper("em", {classes:options.classes || options.cssPrefix + "italic"})
  }})
}}, textUnderline:{hotkeys:{"ctrl+u":{"action":function() {
  this.ui.click()
}}}, init:function(editor, options) {
  return editor.uiButton({title:_("Underline"), click:function() {
    selectionToggleWrapper("u", {classes:options.classes || options.cssPrefix + "underline"})
  }})
}}, textStrike:{hotkeys:{"ctrl+k":{"action":function() {
  this.ui.click()
}}}, init:function(editor, options) {
  return editor.uiButton({title:_("Strikethrough"), click:function() {
    selectionToggleWrapper("del", {classes:options.classes || options.cssPrefix + "strike"})
  }})
}}, textSub:{init:function(editor, options) {
  return editor.uiButton({title:_("Sub script"), click:function() {
    selectionToggleWrapper("sub", {classes:options.classes || options.cssPrefix + "sub"})
  }})
}}, textSuper:{init:function(editor, options) {
  return editor.uiButton({title:_("Super script"), click:function() {
    selectionToggleWrapper("sup", {classes:options.classes || options.cssPrefix + "super"})
  }})
}}});
$.ui.editor.registerUi({undo:{options:{disabled:true}, hotkeys:{"ctrl+z":{"action":function() {
  this.editor.historyBack()
}}}, init:function(editor) {
  editor.bind("change", this.change, this);
  return editor.uiButton({title:_("Step Back"), click:function() {
    editor.historyBack()
  }})
}, change:function() {
  if(this.editor.present === 0) {
    this.ui.disable()
  }else {
    this.ui.enable()
  }
}}, redo:{options:{disabled:true}, hotkeys:{"ctrl+shift+z":{"action":function() {
  this.editor.historyForward()
}}, "ctrl+y":{"action":function() {
  this.editor.historyForward()
}}}, init:function(editor) {
  editor.bind("change", this.change, this);
  return this.ui = editor.uiButton({title:_("Step Forward"), click:function() {
    editor.historyForward()
  }})
}, change:function() {
  if(this.editor.present === this.editor.history.length - 1) {
    this.ui.disable()
  }else {
    this.ui.enable()
  }
}}});
$.ui.editor.registerUi({viewSource:{init:function(editor, options) {
  return editor.uiButton({title:_("View / Edit Source"), click:function() {
    this.show()
  }})
}, show:function() {
  var ui = this;
  var dialog = $(this.editor.getTemplate("viewsource.dialog", {baseClass:ui.options.baseClass, source:ui.editor.getHtml()}));
  var button = this.ui.button;
  $(button).button("option", "disabled", true);
  dialog.dialog({modal:false, width:600, height:400, resizable:true, title:_("View Source"), autoOpen:true, dialogClass:ui.options.baseClass + " " + ui.options.dialogClass, buttons:[{text:_("Apply Source"), click:function() {
    var html = $(this).find("textarea").val();
    ui.editor.setHtml(html);
    $(this).find("textarea").val(ui.editor.getHtml())
  }}, {text:_("Close"), click:function() {
    $(this).dialog("close")
  }}], open:function() {
    var buttons = $(this).parent().find(".ui-dialog-buttonpane");
    buttons.find("button:eq(0)").button({icons:{primary:"ui-icon-circle-check"}});
    buttons.find("button:eq(1)").button({icons:{primary:"ui-icon-circle-close"}})
  }, close:function() {
    $(this).dialog("destroy").remove();
    $(button).button("option", "disabled", false);
    ui.editor.checkChange()
  }})
}}});
$.ui.editor.registerUi({showGuides:{init:function(editor, options) {
  editor.bind("cancel", this.cancel, this);
  editor.bind("destroy", this.cancel, this);
  return editor.uiButton({title:_("Show Guides"), icon:"ui-icon-pencil", click:function() {
    editor.getElement().toggleClass(options.baseClass + "-visible")
  }})
}, cancel:function() {
  this.editor.getElement().removeClass(this.options.baseClass + "-visible")
}}});
$.ui.editor.registerPlugin("paste", {options:{allowedTags:["h1", "h2", "h3", "h4", "h5", "h6", "div", "ul", "ol", "li", "blockquote", "p", "a", "span", "hr", "br"], allowedAttributes:["href", "title"], allowedEmptyTags:["hr", "br"]}, init:function(editor, options) {
  var inProgress = false;
  var dialog = false;
  var selector = ".uiWidgetEditorPasteBin";
  var plugin = this;
  editor.getElement().bind("paste." + editor.widgetName, $.proxy(function(event) {
    if(inProgress) {
      return false
    }
    inProgress = true;
    selectionSave();
    if($(selector).length) {
      $(selector).remove()
    }
    $('<div class="uiWidgetEditorPasteBin" contenteditable="true" style="width: 1px; height: 1px; overflow: hidden; position: fixed; top: -1px;" />').appendTo("body");
    $(selector).focus();
    window.setTimeout(function() {
      var markup = $(selector).html();
      markup = plugin.filterAttributes(markup);
      markup = plugin.filterChars(markup);
      markup = plugin.stripEmpty(markup);
      markup = plugin.stripAttributes(markup);
      markup = stringStripTags(markup, plugin.options.allowedTags);
      var vars = {plain:$("<div/>").html($(selector).html()).text(), markup:markup, html:$(selector).html()};
      dialog = $(editor.getTemplate("paste.dialog", vars));
      $(dialog).dialog({modal:true, width:650, height:500, resizable:true, title:"Paste", position:"center", show:options.dialogShowAnimation, hide:options.dialogHideAnimation, dialogClass:options.baseClass + " " + options.dialogClass, buttons:[{text:_("Insert"), click:function() {
        var html = null;
        var element = $(this).find(".ui-editor-paste-area:visible");
        if(element.hasClass("ui-editor-paste-plain") || element.hasClass("ui-editor-paste-source")) {
          html = element.val()
        }else {
          html = element.html()
        }
        html = plugin.filterAttributes(html);
        html = plugin.filterChars(html);
        selectionRestore();
        selectionReplace(html);
        inProgress = false;
        $(this).dialog("close")
      }}, {text:_("Cancel"), click:function() {
        selectionRestore();
        inProgress = false;
        $(this).dialog("close")
      }}], open:function() {
        var tabs = $(this).find(".ui-editor-paste-panel-tabs");
        tabs.find("ul.ui-tabs-nav li").click(function() {
          tabs.find("ul.ui-tabs-nav li").removeClass("ui-state-active").removeClass("ui-tabs-selected");
          $(this).addClass("ui-state-active").addClass("ui-tabs-selected");
          tabs.children("div").hide().eq($(this).index()).show()
        });
        var buttons = dialog.parent().find(".ui-dialog-buttonpane");
        buttons.find("button:eq(0)").button({icons:{primary:"ui-icon-circle-check"}});
        buttons.find("button:eq(1)").button({icons:{primary:"ui-icon-circle-close"}})
      }, close:function() {
        inProgress = false;
        $(this).dialog("destroy").remove()
      }});
      $(selector).remove()
    }, 0);
    return true
  }, this))
}, filterAttributes:function(content) {
  var filters = [{regexp:/(<meta\s*[^>]*\s*>)|(<\s*link\s* href="file:[^>]*\s*>)|(<\/?\s*\w+:[^>]*\s*>)/gi, handler:""}, {regexp:/(class="Mso[^"]*")|(<\!--(.|\s){1,}?--\>)/gi, handler:""}, {regexp:/(class="Apple-(style|converted)-[a-z]+\s?[^"]+")/, handle:""}, {regexp:/id="internal-source-marker_[^"]+"|dir="[rtl]{3}"/, handle:""}, {regexp:/(<p[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/p[^>]*>)|(<p[^>]*>\s*<font[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/\s*font\s*>\s<\/p[^>]*>)/ig, handler:""}, {regexp:/(style="[^"]*mso-[^;][^"]*")|(style="margin:\s*[^;"]*;")/gi, 
  handler:""}, {regexp:/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi, handler:""}, {regexp:/(<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>)|(<\s*script\b([^<>]|\s)*>?)|(<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>)/ig, handler:""}];
  $.each(filters, function(i, filter) {
    content = content.replace(filter.regexp, filter.handler)
  });
  return content
}, filterChars:function(content) {
  var s = content;
  s = s.replace(/[\u2018|\u2019|\u201A]/g, "'");
  s = s.replace(/[\u201C|\u201D|\u201E]/g, '"');
  s = s.replace(/\u2026/g, "...");
  s = s.replace(/[\u2013|\u2014]/g, "-");
  s = s.replace(/\u02C6/g, "^");
  s = s.replace(/\u2039/g, "<");
  s = s.replace(/\u203A/g, ">");
  s = s.replace(/[\u02DC|\u00A0]/g, " ");
  return s
}, stripAttributes:function(content) {
  content = $("<div/>").html(content);
  var allowedAttributes = this.options.allowedAttributes;
  $(content.find("*")).each(function() {
    var attributes = [];
    $.each(this.attributes, function(index, attribute) {
      if(-1 !== $.inArray(attribute.nodeName, allowedAttributes)) {
        return
      }
      attributes.push(attribute.nodeName)
    });
    for(var attributeIndex = 0;attributeIndex < attributes.length;attributeIndex++) {
      $(this).attr(attributes[attributeIndex], null)
    }
  });
  return content.html()
}, stripEmpty:function(content) {
  var wrapper = $("<div/>").html(content);
  var allowedEmptyTags = this.options.allowedEmptyTags;
  wrapper.find("*").filter(function() {
    if(-1 !== $.inArray(this.tagName.toLowerCase(), allowedEmptyTags)) {
      return false
    }
    if($(this).find(allowedEmptyTags.join(",")).length) {
      return false
    }
    return $.trim($(this).text()) === ""
  }).remove();
  return wrapper.html()
}, updateAreas:function(target, dialog) {
  var content = $(target).is("textarea") ? $(target).val() : $(target).html();
  if(!$(target).hasClass("ui-editor-paste-plain")) {
    dialog.find(".ui-editor-paste-plain").val($("<div/>").html(content).text())
  }
  if(!$(target).hasClass("ui-editor-paste-rich")) {
    dialog.find(".ui-editor-paste-rich").html(content)
  }
  if(!$(target).hasClass("ui-editor-paste-source")) {
    dialog.find(".ui-editor-paste-source").html(content)
  }
  if(!$(target).hasClass("ui-editor-paste-markup")) {
    dialog.find(".ui-editor-paste-markup").html(this.stripAttributes(content))
  }
}});
$.ui.editor.registerPlugin("list", {options:{}, validParents:["blockquote", "body", "button", "center", "dd", "div", "fieldset", "form", "iframe", "li", "noframes", "noscript", "object", "td", "th"], validChildren:["a", "abbr", "acronym", "applet", "b", "basefont", "bdo", "big", "br", "button", "cite", "code", "dfn", "em", "font", "i", "iframe", "img", "input", "kbd", "label", "map", "object", "p", "q", "s", "samp", "select", "small", "span", "strike", "strong", "sub", "sup", "textarea", "tt", "u", 
"var"], toggleList:function(listType) {
  if($(selectionGetElements()).is("li") && $(selectionGetElements()).parent().is(listType)) {
    this.unwrapList()
  }else {
    this.wrapList(listType)
  }
  this.editor.fire("selectionChange");
  this.editor.fire("change")
}, unwrapList:function() {
  selectionSave();
  var listElementsContent = [];
  var listElements = [];
  var startElement = selectionGetStartElement();
  var endElement = selectionGetEndElement();
  listElementsContent.push($(startElement).html());
  listElements.push(startElement);
  if($(startElement)[0] !== $(endElement)[0]) {
    var currentElement = startElement;
    do {
      currentElement = $(currentElement).next();
      listElementsContent.push($(currentElement).html());
      listElements.push(currentElement)
    }while($(currentElement)[0] !== $(endElement)[0])
  }
  var firstLiSelected = $(startElement).prev().length === 0;
  var lastLiSelected = $(endElement).next().length === 0;
  var parentListContainer = $(startElement).parent();
  for(listElementsIndex = 0;listElementsIndex < listElements.length;listElementsIndex++) {
    $(listElements[listElementsIndex]).remove()
  }
  for(var listElementsContentIndex = 0;listElementsContentIndex < listElementsContent.length;listElementsContentIndex++) {
    if(!parentListContainer.parent().is("li")) {
      listElementsContent[listElementsContentIndex] = "<p>" + listElementsContent[listElementsContentIndex] + "</p>"
    }
  }
  if(firstLiSelected && lastLiSelected) {
    parentListContainer.replaceWith(listElementsContent.join(""));
    selectionRestore();
    var selectedElement = selectionGetElements()[0];
    selectionSelectOuter(selectedElement);
    return
  }
  if(firstLiSelected) {
    $(parentListContainer).before(listElementsContent.join(""))
  }else {
    if(lastLiSelected) {
      $(parentListContainer).after(listElementsContent.join(""))
    }else {
      selectionReplaceSplittingSelectedElement(listElementsContent.join(""))
    }
  }
  selectionRestore();
  this.editor.checkChange()
}, wrapList:function(listType) {
  this.editor.constrainSelection(this.editor.getElement());
  if($.trim(selectionGetHtml()) === "") {
    selectionSelectInner(selectionGetElements())
  }
  var selectedHtml = $("<div>").html(selectionGetHtml());
  var listElements = [];
  var plugin = this;
  $(selectedHtml).contents().each(function() {
    var liContent;
    if("block" === elementDefaultDisplay(this.tagName)) {
      liContent = stringStripTags($(this).html(), plugin.validChildren)
    }else {
      liContent = stringStripTags(elementOuterHtml($(this)), plugin.validChildren)
    }
    var listElement = $("<li>" + liContent + "</li>");
    if($.trim(listElement.text()) !== "") {
      listElements.push(elementOuterHtml(listElement))
    }
  });
  var replacementClass = this.options.baseClass + "-selection";
  var replacementHtml = "<" + listType + ' class="' + replacementClass + '">' + listElements.join("") + "</" + listType + ">";
  selectionRestore();
  var selectedElementParent = $(selectionGetElements()[0]).parent();
  var editingElement = this.editor.getElement()[0];
  if(selectedElementParent === editingElement || selectionGetElements()[0] === editingElement) {
    selectionReplace(replacementHtml)
  }else {
    selectionReplaceWithinValidTags(replacementHtml, this.validParents)
  }
  var selectedElement = $(this.editor.getElement().find("." + replacementClass).removeClass(replacementClass));
  selectionSelectInner(selectedElement.find("li:first")[0]);
  this.editor.checkChange()
}, toggleButtonState:function(listType, ui) {
  var toggleState = function(on) {
    ui.button.toggleClass("ui-state-highlight", on).toggleClass("ui-state-default", !on)
  };
  var selectionStart = selectionGetStartElement();
  if(selectionStart === null || !selectionStart.length) {
    selectionStart = this.editor.getElement()
  }
  var selectionEnd = selectionGetEndElement();
  if(selectionEnd === null || !selectionEnd.length) {
    selectionEnd = this.editor.getElement()
  }
  var start = selectionStart[0];
  var end = selectionEnd[0];
  if($(start).is(listType) && $(end).is(listType) && start === end) {
    return toggleState(true)
  }
  var shareParentListType = $(start).parentsUntil(elementSelector, listType).first() && $(end).parentsUntil(elementSelector, listType).first();
  var elementSelector = "#" + this.editor.getElement().attr("id");
  var startIsLiOrInside = $(start).is(listType + " > li") || $(start).parentsUntil(elementSelector, listType + " > li").length;
  var endIsLiOrInside = $(end).is(listType + " > li") || $(end).parentsUntil(elementSelector, listType + " > li").length;
  if(startIsLiOrInside && endIsLiOrInside && shareParentListType) {
    var sharedParentList = $(rangeGetCommonAncestor());
    if(!sharedParentList.is(listType)) {
      sharedParentList = $(sharedParentList).parentsUntil(elementSelector, listType).first()
    }
    var childLists = sharedParentList.find("ul, ol");
    if(!childLists.length) {
      return toggleState(true)
    }
    for(var childListIndex = 0;childListIndex < childLists.length;childListIndex++) {
      if($.contains(childLists[childListIndex], start) && $.contains(childLists[childListIndex], end)) {
        return toggleState(false)
      }
    }
    return toggleState(true)
  }
  return toggleState(false)
}});
$.ui.editor.registerUi({listUnordered:{init:function(editor) {
  var ui = editor.uiButton({title:_("Unordered List"), click:function() {
    editor.getPlugin("list").toggleList("ul")
  }});
  editor.bind("selectionChange", function() {
    editor.getPlugin("list").toggleButtonState("ul", ui)
  });
  return ui
}}, listOrdered:{init:function(editor) {
  var ui = editor.uiButton({title:_("Ordered List"), click:function() {
    editor.getPlugin("list").toggleList("ol")
  }});
  editor.bind("selectionChange", function() {
    editor.getPlugin("list").toggleButtonState("ol", ui)
  });
  return ui
}}});
$.ui.editor.registerUi({fontSizeInc:{init:function(editor, options) {
  return editor.uiButton({title:_("Increase Font Size"), click:function() {
    editor.inverseWrapWithTagClass("big", options.cssPrefix + "big", "small", options.cssPrefix + "small")
  }})
}}, fontSizeDec:{init:function(editor, options) {
  return editor.uiButton({title:_("Decrease Font Size"), click:function() {
    editor.inverseWrapWithTagClass("small", options.cssPrefix + "small", "big", options.cssPrefix + "big")
  }})
}}});
$.ui.editor.registerUi({hr:{init:function(editor) {
  return editor.uiButton({title:_("Insert Horizontal Rule"), click:function() {
    selectionReplace("<hr/>")
  }})
}}});
$.ui.editor.registerUi({quoteBlock:{init:function(editor, options) {
  return editor.uiButton({title:_("Blockquote"), icon:"ui-icon-quote", click:function() {
    selectionToggleWrapper("blockquote", {classes:options.classes || options.cssPrefix + "blockquote"})
  }})
}}});
$.ui.editor.registerUi({tagMenu:{validParents:["blockquote", "body", "button", "center", "dd", "div", "fieldset", "form", "iframe", "li", "noframes", "noscript", "object", "td", "th"], init:function(editor) {
  editor.bind("selectionChange", this.change, this);
  editor.bind("show", this.change, this);
  var ui = this;
  return editor.uiSelectMenu({name:"tagMenu", title:_("Change HTML tag of selected element"), select:$(editor.getTemplate("tagmenu.menu")), change:function(value) {
    if(typeof value === "undefined" || value === "na") {
      return
    }
    var editingElement = editor.getElement()[0];
    var selectedElement = selectionGetElements();
    if(!selectionGetHtml() || selectionGetHtml() === "") {
      if($(selectedElement)[0] === $(editingElement)[0]) {
        return
      }
      selectionSave();
      var replacementElement = $("<" + value + ">").html(selectedElement.html());
      selectedElement.replaceWith(replacementElement);
      selectionRestore()
    }else {
      var selectedElementParent = $(selectionGetElements()[0]).parent();
      var temporaryClass = this.options.baseClass + "-selection";
      var replacementHtml = $("<" + value + ">").html(selectionGetHtml()).addClass(temporaryClass);
      if(selectedElementParent === editingElement || selectionGetElements()[0] === editingElement) {
        selectionReplace(replacementHtml)
      }else {
        selectionReplaceWithinValidTags(replacementHtml, this.validParents)
      }
      selectionSelectInner(editor.getElement().find("." + temporaryClass).removeClass(temporaryClass))
    }
    editor.checkChange()
  }})
}, change:function() {
  var tag = selectionGetElements()[0];
  if(!tag) {
    $(this.ui.button).toggleClass("ui-state-disabled", true);
    return
  }
  tag = tag.tagName.toLowerCase();
  if(this.ui.select.find("option[value=" + tag + "]").length) {
    this.ui.val(tag)
  }else {
    this.ui.val("na")
  }
  $(this.ui.button).toggleClass("ui-state-disabled", this.editor.getElement()[0] === selectionGetElements()[0])
}}});
$.ui.editor.registerPlugin("link", {visible:null, dialog:null, types:{}, defaultLinkTypes:[{type:"internalPage", title:_("Page from my website"), focusSelector:'input[name="location"]', init:function() {
  this.content = this.plugin.editor.getTemplate("link.internal-page", this.options);
  return this
}, show:function(panel, edit) {
  var link = this;
  if(typeof SiteMap !== "undefined") {
    for(x in SiteMap) {
      panel.find('select[name="internal-page-id"]').append("<option value='" + x + "'>" + SiteMap[x] + "</option>")
    }
  }
  if(edit) {
    panel.find('select[name="internal-page-id"]').val(this.plugin.selectedElement.attr("data-cms-pageid")).trigger("click");
    if(this.plugin.selectedElement.attr("target") === "_blank") {
      panel.find('input[name="blank"]').attr("checked", "checked")
    }
  }
  return this
}, attributes:function(panel) {
  var attributes = {href:"#", title:panel.find('select[name="internal-page-id"] option:selected').text(), "data-cms-pageid":panel.find('select[name="internal-page-id"]').val()};
  if(panel.find('input[name="blank"]').is(":checked")) {
    attributes.target = "_blank"
  }
  return attributes
}, validate:function(panel) {
  var isValid = true;
  return isValid
}}, {type:"external", title:_("Page on another website"), focusSelector:'input[name="location"]', init:function() {
  this.content = this.plugin.editor.getTemplate("link.external", this.options);
  return this
}, show:function(panel, edit) {
  var link = this;
  panel.find('input[name="location"]').bind("keyup", function() {
    link.validate(panel)
  });
  if(edit) {
    panel.find('input[name="location"]').val(this.plugin.selectedElement.attr("href")).trigger("keyup");
    if(this.plugin.selectedElement.attr("target") === "_blank") {
      panel.find('input[name="blank"]').attr("checked", "checked")
    }
  }
  return this
}, attributes:function(panel) {
  var attributes = {href:panel.find('input[name="location"]').val()};
  if(panel.find('input[name="blank"]').is(":checked")) {
    attributes.target = "_blank"
  }
  if(!this.options.regexLink.test(attributes.href)) {
    this.plugin.editor.showWarning(_("The url for the link you inserted doesn't look well formed"))
  }
  return attributes
}, validate:function(panel) {
  var href = panel.find('input[name="location"]').val();
  var errorMessageSelector = "." + this.options.baseClass + "-error-message-url";
  var isValid = true;
  if(!this.options.regexLink.test(href)) {
    if(!panel.find(errorMessageSelector).size()) {
      panel.find('input[name="location"]').after(this.plugin.editor.getTemplate("link.error", $.extend({}, this.options, {messageClass:this.options.baseClass + "-error-message-url", message:_("The URL does not look well formed")})))
    }
    panel.find(errorMessageSelector).not(":visible").show();
    isValid = false
  }else {
    panel.find(errorMessageSelector).has(":visible").hide()
  }
  return isValid
}}, {type:"email", title:_("Email address"), focusSelector:'input[name="email"]', init:function() {
  this.content = this.plugin.editor.getTemplate("link.email", this.options);
  return this
}, show:function(panel, edit) {
  var email = this;
  panel.find('input[name="email"]').bind("keyup", function() {
    email.validate(panel)
  });
  if(edit) {
    panel.find('input[name="email"]').val(this.plugin.selectedElement.attr("href").replace(/(mailto:)|(\?Subject.*)/gi, "")).trigger("keyup");
    if(/\?Subject\=/i.test(this.plugin.selectedElement.attr("href"))) {
      panel.find('input[name="subject"]').val(decodeURIComponent(this.plugin.selectedElement.attr("href").replace(/(.*\?Subject=)/i, "")))
    }
  }
  return this
}, attributes:function(panel) {
  var attributes = {href:"mailto:" + panel.find('input[name="email"]').val()}, subject = panel.find('input[name="subject"]').val();
  if(subject) {
    attributes.href = attributes.href + "?Subject=" + encodeURIComponent(subject)
  }
  return attributes
}, validate:function(panel) {
  var email = panel.find('input[name="email"]').val();
  var errorMessageSelector = "." + this.options.baseClass + "-error-message-email";
  var isValid = true;
  if(!this.options.regexEmail.test(email)) {
    if(!panel.find(errorMessageSelector).size()) {
      panel.find('input[name="email"]').after(this.plugin.editor.getTemplate("link.error", $.extend({}, this.options, {messageClass:this.options.baseClass + "-error-message-email", message:_("The email address does not look well formed")})))
    }
    panel.find(errorMessageSelector).not(":visible").show();
    isValid = false
  }else {
    panel.find(errorMessageSelector).has(":visible").hide()
  }
  return isValid
}}], init:function(editor, options) {
  this.options = $.extend({}, {panelAnimation:"fade", replaceTypes:false, customTypes:[], typeDataName:"uiWidgetEditorLinkType", dialogWidth:750, dialogHeight:"auto", dialogMinWidth:670, regexLink:/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i, regexEmail:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/}, options);
  editor.bind("save", this.repairLinks, this);
  editor.bind("cancel", this.cancel, this)
}, initTypes:function(edit) {
  this.types = {};
  var baseLinkType = {type:null, title:null, content:null, plugin:this, options:this.options, attributes:function() {
  }, init:function() {
    return this
  }, show:function() {
  }, editing:function(link) {
    if(link.attr("class")) {
      var classes = this.classes.split(/\s/gi);
      for(var i = 0;i < classes.length;i++) {
        if(classes[i].trim() && $(link).hasClass(classes[i])) {
          return true
        }
      }
    }
    return false
  }, focusSelector:null, focus:function() {
    if(this.focusSelector) {
      var input = $(this.focusSelector);
      var value = input.val();
      input.val("");
      input.focus().val(value)
    }
  }};
  var linkTypes = null;
  if(this.options.replaceTypes) {
    linkTypes = this.options.customTypes
  }else {
    linkTypes = $.merge(this.defaultLinkTypes, this.options.customTypes)
  }
  var link;
  for(var i = 0;i < linkTypes.length;i++) {
    link = $.extend({}, baseLinkType, linkTypes[i], {classes:this.options.baseClass + "-" + linkTypes[i].type}).init();
    this.types[link.type] = link
  }
}, show:function() {
  if(!this.visible) {
    selectionSave();
    this.selectedElement = selectionGetElements().first();
    var edit = this.selectedElement.is("a");
    var options = this.options;
    var plugin = this;
    this.dialog = $(this.editor.getTemplate("link.dialog", options)).appendTo("body");
    var dialog = this.dialog;
    this.initTypes();
    var linkTypesFieldset = this.dialog.find("fieldset");
    for(var type in this.types) {
      $(this.editor.getTemplate("link.label", this.types[type])).appendTo(linkTypesFieldset)
    }
    linkTypesFieldset.find('input[type="radio"]').bind("change." + this.editor.widgetName, function() {
      plugin.typeChange(plugin.types[$(this).val()], edit)
    });
    dialog.dialog({autoOpen:false, modal:true, resizable:true, width:options.dialogWidth, minWidth:options.dialogMinWidth, height:options.dialogHeight, title:edit ? _("Edit Link") : _("Insert Link"), dialogClass:options.baseClass + " " + options.dialogClass, buttons:[{text:edit ? _("Update Link") : _("Insert Link"), click:function() {
      selectionRestore();
      if(plugin.apply(edit)) {
        $(this).dialog("close")
      }
    }}, {text:_("Cancel"), click:function() {
      $(this).dialog("close")
    }}], beforeopen:function() {
      plugin.dialog.find("." + plugin.options.baseClass + "-content").hide()
    }, open:function() {
      plugin.visible = true;
      var buttons = dialog.parent().find(".ui-dialog-buttonpane");
      buttons.find("button:eq(0)").button({icons:{primary:"ui-icon-circle-check"}});
      buttons.find("button:eq(1)").button({icons:{primary:"ui-icon-circle-close"}});
      var radios = dialog.find('.ui-editor-link-menu input[type="radio"]');
      radios.first().attr("checked", "checked");
      var changedType = false;
      if(edit) {
        for(var type in plugin.types) {
          if(changedType = plugin.types[type].editing(plugin.selectedElement)) {
            radios.filter('[value="' + type + '"]').attr("checked", "checked");
            plugin.typeChange(plugin.types[type], edit);
            break
          }
        }
      }
      if(!edit || edit && !changedType) {
        plugin.typeChange(plugin.types[radios.filter(":checked").val()], edit)
      }
      $(this).unbind("keyup." + plugin.editor.widgetName).bind("keyup." + plugin.editor.widgetName, function(event) {
        if(event.keyCode == 13) {
          var linkType = plugin.types[radios.filter(":checked").val()];
          if(!$.isFunction(linkType.validate) || linkType.validate(plugin.dialog.find("." + plugin.options.baseClass + "-content"))) {
            buttons.find("button:eq(0)").trigger("click")
          }
        }
      })
    }, close:function() {
      selectionRestore();
      plugin.visible = false;
      dialog.find("." + options.baseClass + "-content").hide();
      $(this).dialog("destroy")
    }}).dialog("open")
  }
}, apply:function(edit) {
  var linkType = this.types[this.dialog.find('input[type="radio"]:checked').val()];
  var attributes = linkType.attributes(this.dialog.find("." + this.options.baseClass + "-content"), edit);
  if(!attributes) {
    return true
  }
  selectionRestore();
  var link = elementOuterHtml($("<a>" + (attributes.title ? attributes.title : attributes.href) + "</a>").attr($.extend({}, attributes, {target:"_blank"})));
  if(!edit) {
    selectionWrapTagWithAttribute("a", $.extend(attributes, {id:this.editor.getUniqueId()}), linkType.classes);
    this.editor.showConfirm(_("Added link: {{link}}", {link:link}));
    this.selectedElement = $("#" + attributes.id).removeAttr("id").attr(attributes)
  }else {
    this.selectedElement[0].className = this.selectedElement[0].className.replace(new RegExp(this.options.baseClass + "-[a-zA-Z]+", "g"), "");
    this.selectedElement.addClass(linkType.classes).attr(attributes);
    this.editor.showConfirm(_("Updated link: {{link}}", {link:link}))
  }
  this.selectedElement.data(this.options.baseClass + "-href", attributes.href);
  selectionSelectOuter(this.selectedElement);
  selectionSave();
  return true
}, typeChange:function(linkType, edit) {
  var panel = this.dialog.find("." + this.options.baseClass + "-content");
  var wrap = panel.closest("." + this.options.baseClass + "-wrap");
  var ajax = linkType.ajaxUri && !this.types[linkType.type].content;
  if(ajax) {
    wrap.addClass(this.options.baseClass + "-loading")
  }
  var plugin = this;
  panel.hide(this.options.panelAnimation, function() {
    if(!ajax) {
      panel.html(linkType.content);
      linkType.show(panel, edit);
      panel.show(plugin.options.panelAnimation, $.proxy(linkType.focus, linkType))
    }else {
      $.ajax({url:linkType.ajaxUri, type:"get", success:function(data) {
        panel.html(data);
        plugin.types[linkType.type].content = data;
        wrap.removeClass(plugin.options.baseClass + "-loading");
        linkType.show(panel, edit);
        panel.show(plugin.options.panelAnimation, $.proxy(linkType.focus, linkType))
      }})
    }
  })
}, remove:function() {
  this.editor.unwrapParentTag("a")
}, repairLinks:function() {
  var ui = this;
  this.editor.getElement().find('a[class^="' + this.options.baseClass + '"]').each(function() {
    if($(this).data(ui.options.baseClass + "-href")) {
      $(this).attr("href", $(this).data(ui.options.baseClass + "-href"))
    }
  })
}, cancel:function() {
  if(this.dialog) {
    $(this.dialog.dialog("close"))
  }
}});
$.ui.editor.registerUi({link:{hotkeys:{"ctrl+l":{"action":function() {
  this.editor.getPlugin("link").show()
}, restoreSelection:false}}, init:function(editor) {
  editor.bind("selectionChange", this.change, this);
  return editor.uiButton({title:_("Insert Link"), click:function() {
    editor.getPlugin("link").show()
  }})
}, change:function() {
  if(!selectionGetElements().length) {
    this.ui.disable()
  }else {
    this.ui.enable()
  }
}}, unlink:{hotkeys:{"ctrl+shift+l":{"action":function() {
  this.ui.click()
}, restoreSelection:false}}, init:function(editor) {
  editor.bind("selectionChange", this.change, this);
  editor.bind("show", this.change, this);
  return editor.uiButton({title:_("Remove Link"), click:function() {
    editor.getPlugin("link").remove()
  }})
}, change:function() {
  if(!selectionGetElements().is("a")) {
    this.ui.disable()
  }else {
    this.ui.enable()
  }
}}});
$.ui.editor.registerUi({embed:{dialog:null, init:function(editor, options) {
  editor.bind("hide", this.hide, this);
  return editor.uiButton({icon:"ui-icon-youtube", title:_("Embed object"), click:function() {
    this.show()
  }})
}, hide:function() {
  if(this.dialog) {
    $(this.dialog).dialog("destroy").remove()
  }
  this.dialog = null;
  $(this.ui.button).button("option", "disabled", false)
}, show:function() {
  if(!this.dialog) {
    $(this.ui.button).button("option", "disabled", true);
    var ui = this;
    selectionSave();
    this.dialog = $(this.editor.getTemplate("embed.dialog"));
    this.dialog.dialog({modal:false, width:600, height:400, resizable:true, title:_("Paste Embed Code"), autoOpen:true, dialogClass:ui.options.baseClass + " " + ui.options.dialogClass, buttons:[{text:_("Embed Object"), click:function() {
      selectionRestore();
      selectionReplace($(this).find("textarea").val());
      $(this).dialog("close")
    }}, {text:_("Close"), click:function() {
      ui.hide()
    }}], open:function() {
      var buttons = $(this).parent().find(".ui-dialog-buttonpane");
      buttons.find("button:eq(0)").button({icons:{primary:"ui-icon-circle-check"}});
      buttons.find("button:eq(1)").button({icons:{primary:"ui-icon-circle-close"}});
      var tabs = $(this).find(".ui-editor-embed-panel-tabs");
      tabs.find("ul li").click(function() {
        tabs.find("ul li").removeClass("ui-state-active").removeClass("ui-tabs-selected");
        $(this).addClass("ui-state-active").addClass("ui-tabs-selected");
        tabs.children("div").hide().eq($(this).index()).show()
      });
      var preview = $(this).find(".ui-editor-embed-preview");
      $(this).find("textarea").change(function() {
        $(preview).html($(this).val())
      })
    }, close:function() {
      ui.hide()
    }})
  }
}}});
$.ui.editor.registerPlugin("emptyElement", {options:{tag:"<p/>"}, init:function(editor, options) {
  this.bind("change", this.change)
}, change:function() {
  var plugin = this;
  this.textNodes(this.editor.getElement()).each(function() {
    $(this).wrap($(plugin.options.tag));
    selectionSelectEnd(this)
  });
  this.editor.checkChange()
}, textNodes:function(element) {
  return $(element).contents().filter(function() {
    return this.nodeType == 3 && $.trim(this.nodeValue).length
  })
}});
