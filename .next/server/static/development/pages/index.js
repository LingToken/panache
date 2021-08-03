module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    var resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      var isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router-context.js":
/*!******************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router-context.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function addBasePath(path) {
  // variable is always a string
  const p = "";
  return path.indexOf(p) !== 0 ? p + path : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch(utils_1.formatWithValidation({
      // @ts-ignore __NEXT_DATA__
      pathname: `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`,
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && url_1.parse(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = url_1.parse(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, addBasePath(as), options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, addBasePath(as), options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo);

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      Promise.all([this.pageLoader.prefetchData(url, asPath), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](toRoute(pathname))]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = decodeURIComponent;
    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!*************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/react-accessible-accordion/dist/fancy-example.css":
/*!************************************************************************!*\
  !*** ./node_modules/react-accessible-accordion/dist/fancy-example.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-tabs/style/react-tabs.css":
/*!******************************************************!*\
  !*** ./node_modules/react-tabs/style/react-tabs.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sections_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sections/Navigation */ "./src/sections/Navigation/index.js");
/* harmony import */ var sections_BannerTwo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sections/BannerTwo */ "./src/sections/BannerTwo/index.js");
/* harmony import */ var sections_Service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sections/Service */ "./src/sections/Service/index.js");
/* harmony import */ var sections_CoinFund__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sections/CoinFund */ "./src/sections/CoinFund/index.js");
/* harmony import */ var sections_About__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sections/About */ "./src/sections/About/index.js");
/* harmony import */ var sections_Awards__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sections/Awards */ "./src/sections/Awards/index.js");
/* harmony import */ var sections_UserMap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! sections/UserMap */ "./src/sections/UserMap/index.js");
/* harmony import */ var sections_Wallet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! sections/Wallet */ "./src/sections/Wallet/index.js");
/* harmony import */ var sections_Statistics__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! sections/Statistics */ "./src/sections/Statistics/index.js");
/* harmony import */ var sections_Stack__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! sections/Stack */ "./src/sections/Stack/index.js");
/* harmony import */ var sections_RoadMap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! sections/RoadMap */ "./src/sections/RoadMap/index.js");
/* harmony import */ var sections_Faq__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! sections/Faq */ "./src/sections/Faq/index.js");
/* harmony import */ var sections_Footer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! sections/Footer */ "./src/sections/Footer/index.js");
/* harmony import */ var assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! assets/images/logo-white.png */ "./src/assets/images/logo-white.png");
/* harmony import */ var assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var assets_theme_theme__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! assets/theme/theme */ "./src/assets/theme/theme.js");
/* harmony import */ var assets_theme__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! assets/theme */ "./src/assets/theme/index.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;















 // import FavIcon from "assets/images/fav-icon.png";





const Home = () => {
  return __jsx(styled_components__WEBPACK_IMPORTED_MODULE_2__["ThemeProvider"], {
    theme: assets_theme_theme__WEBPACK_IMPORTED_MODULE_17__["default"],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, __jsx("title", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, "Panache | Your Lifestyle Token"), __jsx("meta", {
    name: "Description",
    content: "Lifestyle marketplace, that will list vendors and allow customers to trade using panache token and earn panache",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "Keywords",
    content: "premium fashion, premium jewelleries, top jeweller, top models, top wrist watch, top designers in amaerica, top footwears, top cars",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "theme-color",
    content: "#280D57",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }), __jsx("link", {
    rel: "shortcut icon",
    type: "image/x-icon",
    href: assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_16___default.a,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }
  })), __jsx(assets_theme__WEBPACK_IMPORTED_MODULE_18__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }), __jsx(sections_Navigation__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }), __jsx(sections_BannerTwo__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }), __jsx(sections_Service__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }), __jsx(sections_CoinFund__WEBPACK_IMPORTED_MODULE_6__["default"], {
    dayCount: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }
  }), __jsx(sections_About__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }), __jsx(sections_Awards__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }), __jsx(sections_Wallet__WEBPACK_IMPORTED_MODULE_10__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }
  }), __jsx(sections_RoadMap__WEBPACK_IMPORTED_MODULE_13__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), __jsx(sections_Stack__WEBPACK_IMPORTED_MODULE_12__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }), __jsx(sections_Footer__WEBPACK_IMPORTED_MODULE_15__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/assets/data/awards/index.js":
/*!*****************************************!*\
  !*** ./src/assets/data/awards/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/assets/data/awards/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

/* harmony default export */ __webpack_exports__["default"] = ({
  awards: [{
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaAward"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6,
        columnNumber: 13
      }
    }),
    count: 1000000000000000,
    body: "Initial Supplies"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaDownload"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 13
      }
    }),
    count: 0,
    body: "Circulating Supplies"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaStar"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 13
      }
    }),
    count: 0,
    body: "Current Market Price"
  } // {
  //   icon: <FaHeart />,
  //   count: 15000,
  //   body: "Loves",
  // },
  ]
});

/***/ }),

/***/ "./src/assets/data/faq/index.js":
/*!**************************************!*\
  !*** ./src/assets/data/faq/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  faq: [{
    name: "Pre-ICO & ICO",
    items: [{
      title: "What is ICO Crypto?",
      body: "Cryptik - is unique platform; that is secure, smart and easy-to-use platform, and completely disrupting the way businesses raise capital. Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others."
    }, {
      title: "What cryptocurrencies can I use to purchase?",
      body: "Cryptik - is unique platform; that is secure, smart and easy-to-use platform, and completely disrupting the way businesses raise capital. Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others."
    }, {
      title: "How can I participate in the ICO Token sale?",
      body: "Cryptik - is unique platform; that is secure, smart and easy-to-use platform, and completely disrupting the way businesses raise capital. Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others."
    }, {
      title: "How do I benefit from the ICO Token?",
      body: "Cryptik - is unique platform; that is secure, smart and easy-to-use platform, and completely disrupting the way businesses raise capital. Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others."
    }]
  }, {
    name: "General",
    items: [{
      title: "How can I participate in the ICO Token sale?",
      body: "Cryptik - is unique platform; that is secure, smart and easy-to-use platform, and completely disrupting the way businesses raise capital. Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others."
    }]
  }, {
    name: "Tokens",
    items: [{
      title: "How can I participate in the ICO Token sale?",
      body: "Cryptik - is unique platform; that is secure, smart and easy-to-use platform, and completely disrupting the way businesses raise capital. Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others."
    }]
  }]
});

/***/ }),

/***/ "./src/assets/data/footer/index.js":
/*!*****************************************!*\
  !*** ./src/assets/data/footer/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/assets/data/footer/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

/* harmony default export */ __webpack_exports__["default"] = ({
  links: [{
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaTwitter"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 19
      }
    }),
    url: "https://twitter.com/PanacheToken"
  }, // {
  //     icon: <FaGooglePlusG />,
  //     url: "#"
  // },
  {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaFacebookF"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 19
      }
    }),
    url: "https://www.facebook.com/panachetoken/"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaInstagramSquare"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 19
      }
    }),
    url: "https://www.instagram.com/panachetoken/"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaRedditSquare"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 19
      }
    }),
    url: "https://www.reddit.com/user/panachetoken"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaMediumM"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 19
      }
    }),
    url: "https://medium.com/@panachetoken"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaTelegramPlane"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 19
      }
    }),
    url: "https://t.me/panachetoken"
  }, // {
  //     icon: <FaSnapchatGhost />,
  //     url: "#"
  // },
  {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaPinterestP"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 19
      }
    }),
    url: "https://www.pinterest.com/panachetoken/"
  }, {
    icon: __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaYoutube"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 19
      }
    }),
    url: "https://www.youtube.com/channel/UCBFEGITbmSWKIjIDVBKVApA"
  }]
});

/***/ }),

/***/ "./src/assets/data/service/index.js":
/*!******************************************!*\
  !*** ./src/assets/data/service/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var assets_images_service_service_icon_1_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/images/service/service-icon-1.svg */ "./src/assets/images/service/service-icon-1.svg");
/* harmony import */ var assets_images_service_service_icon_1_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assets_images_service_service_icon_1_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_service_service_icon_2_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/service/service-icon-2.svg */ "./src/assets/images/service/service-icon-2.svg");
/* harmony import */ var assets_images_service_service_icon_2_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_service_service_icon_2_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var assets_images_service_service_icon_3_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/images/service/service-icon-3.svg */ "./src/assets/images/service/service-icon-3.svg");
/* harmony import */ var assets_images_service_service_icon_3_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_images_service_service_icon_3_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var assets_images_service_service_icon_4_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/images/service/service-icon-4.svg */ "./src/assets/images/service/service-icon-4.svg");
/* harmony import */ var assets_images_service_service_icon_4_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_images_service_service_icon_4_svg__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  services: [{
    icon: assets_images_service_service_icon_1_svg__WEBPACK_IMPORTED_MODULE_0___default.a,
    title: "Brand Ambassadors",
    body: "Panache token vendor partners sponsored Ambassadorship for every panache holders"
  }, {
    icon: assets_images_service_service_icon_4_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
    title: "Vendor Marketplace",
    body: "Every panache token holders can purchase vendors items in the community driven marketplace"
  }, {
    icon: assets_images_service_service_icon_3_svg__WEBPACK_IMPORTED_MODULE_2___default.a,
    title: "PanachePay",
    body: "Token holders can trade with the token assets through panachePay"
  }, {
    icon: assets_images_service_service_icon_2_svg__WEBPACK_IMPORTED_MODULE_1___default.a,
    title: "Exchange Offer",
    body: "Token Holders can exchange their tokens for goods and services"
  }]
});

/***/ }),

/***/ "./src/assets/data/stack/index.js":
/*!****************************************!*\
  !*** ./src/assets/data/stack/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var assets_images_languages_github_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/images/languages/github.png */ "./src/assets/images/languages/github.png");
/* harmony import */ var assets_images_languages_github_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assets_images_languages_github_png__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_languages_javascript_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/languages/javascript.png */ "./src/assets/images/languages/javascript.png");
/* harmony import */ var assets_images_languages_javascript_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_languages_javascript_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var assets_images_languages_python_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/images/languages/python.png */ "./src/assets/images/languages/python.png");
/* harmony import */ var assets_images_languages_python_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_images_languages_python_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var assets_images_languages_react_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/images/languages/react.png */ "./src/assets/images/languages/react.png");
/* harmony import */ var assets_images_languages_react_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_images_languages_react_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var assets_images_languages_ruby_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/images/languages/ruby.png */ "./src/assets/images/languages/ruby.png");
/* harmony import */ var assets_images_languages_ruby_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_images_languages_ruby_png__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = ({
  stack: [{
    name: "gihub",
    url: "#",
    imageSrc: assets_images_languages_github_png__WEBPACK_IMPORTED_MODULE_0___default.a
  }, {
    name: "javascript",
    url: "#",
    imageSrc: assets_images_languages_javascript_png__WEBPACK_IMPORTED_MODULE_1___default.a
  }, {
    name: "python",
    url: "#",
    imageSrc: assets_images_languages_python_png__WEBPACK_IMPORTED_MODULE_2___default.a
  }, {
    name: "reactjs",
    url: "#",
    imageSrc: assets_images_languages_react_png__WEBPACK_IMPORTED_MODULE_3___default.a
  }, {
    name: "ruby",
    url: "#",
    imageSrc: assets_images_languages_ruby_png__WEBPACK_IMPORTED_MODULE_4___default.a
  }]
});

/***/ }),

/***/ "./src/assets/data/wallet/index.js":
/*!*****************************************!*\
  !*** ./src/assets/data/wallet/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  wallet: [{
    count: 0,
    // suffixText: "T+",
    body: "Holders Addresses"
  }, {
    count: 0,
    // suffixText: "+",
    body: "Transfers"
  }, {
    count: 0,
    // suffixText: "M+",
    body: "Markep Cap"
  }]
});

/***/ }),

/***/ "./src/assets/images/about-bg.png":
/*!****************************************!*\
  !*** ./src/assets/images/about-bg.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/about-bg-2c08d0b3a2385927354fe67e14bfc7fa.png";

/***/ }),

/***/ "./src/assets/images/about/about.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/about/about.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/about-cd62bc0292a7dc10fb880734a63b9584.svg";

/***/ }),

/***/ "./src/assets/images/banners/banner-two/cryptik-banner-heart-icon.svg":
/*!****************************************************************************!*\
  !*** ./src/assets/images/banners/banner-two/cryptik-banner-heart-icon.svg ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjQwIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyNDAiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDA3IDU1NCkiIGZpbGw9IiNmZmYiLz4NCiAgICA8L2NsaXBQYXRoPg0KICA8L2RlZnM+DQogIDxnIGlkPSJNYXNrX0dyb3VwXzkiIGRhdGEtbmFtZT0iTWFzayBHcm91cCA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDA3IC01NTQpIiBjbGlwLXBhdGg9InVybCgjY2xpcC1wYXRoKSI+DQogICAgPGcgaWQ9InJlc3BlY3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwNyA1NTQpIj4NCiAgICAgIDxnIGlkPSJHcm91cF82Mzc0IiBkYXRhLW5hbWU9Ikdyb3VwIDYzNzQiPg0KICAgICAgICA8ZyBpZD0iR3JvdXBfNjM3MyIgZGF0YS1uYW1lPSJHcm91cCA2MzczIj4NCiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF80Njk4MyIgZGF0YS1uYW1lPSJQYXRoIDQ2OTgzIiBkPSJNMjIuODQsNC4zYS40ODkuNDg5LDAsMSwwLC4xNDMuMzQ1QS40OTEuNDkxLDAsMCwwLDIyLjg0LDQuM1oiIGZpbGw9IiNmZmYiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPGcgaWQ9Ikdyb3VwXzYzNzYiIGRhdGEtbmFtZT0iR3JvdXAgNjM3NiI+DQogICAgICAgIDxnIGlkPSJHcm91cF82Mzc1IiBkYXRhLW5hbWU9Ikdyb3VwIDYzNzUiPg0KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ2OTg0IiBkYXRhLW5hbWU9IlBhdGggNDY5ODQiIGQ9Ik0xMS42MjUsMTUuOGEuNDg5LjQ4OSwwLDEsMCwuMTQzLjM0NUEuNDkxLjQ5MSwwLDAsMCwxMS42MjUsMTUuOFoiIGZpbGw9IiNmZmYiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPGcgaWQ9Ikdyb3VwXzYzNzgiIGRhdGEtbmFtZT0iR3JvdXAgNjM3OCI+DQogICAgICAgIDxnIGlkPSJHcm91cF82Mzc3IiBkYXRhLW5hbWU9Ikdyb3VwIDYzNzciPg0KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ2OTg1IiBkYXRhLW5hbWU9IlBhdGggNDY5ODUiIGQ9Ik0yNC4wMjMsNS45MjNhLjQ4OC40ODgsMCwxLDAtLjg0OS40ODMsNi41Niw2LjU2LDAsMCwxLTEuMDY1LDcuODYxbC0uMzcuMzdhMS44MjksMS44MjksMCwwLDAtLjQxNy0uNjQ0TDE2LjMsOC45NzZhMy4zNzQsMy4zNzQsMCwwLDAsLjktLjY0M2wuOTYyLS45NjJhLjQ4OC40ODgsMCwxLDAtLjY5MS0uNjkxbC0uOTYyLjk2MmEyLjM3OCwyLjM3OCwwLDAsMS0xLjY5Mi43SDEyLjg5NWEuNDg5LjQ4OSwwLDAsMC0uMzQ1LjE0M0wxMS4wNzcsOS45NTlBMS4xMjIsMS4xMjIsMCwwLDEsOS40OTEsOC4zNzNsMy4zNjItMy4zNjJhNi41NzIsNi41NzIsMCwwLDEsNy44LTEuMS40ODguNDg4LDAsMSwwLC40NzQtLjg1NCw3LjU3NSw3LjU3NSwwLDAsMC00LjY0NC0uODc1QTcuNDQyLDcuNDQyLDAsMCwwLDEyLjUsNCw3LjUyMSw3LjUyMSwwLDAsMCwyLjIsMTQuOTUybC4xODQuMTg0YS40ODguNDg4LDAsMCwwLC4xMDUuMDc5LDEuODM2LDEuODM2LDAsMCwwLDEuODMzLDEuN2wuMDczLDBjMCwuMDI1LDAsLjA0OSwwLC4wNzRhMS44MzksMS44MzksMCwwLDAsMS44NCwxLjgzOWwuMDczLDBjMCwuMDI1LDAsLjA0OSwwLC4wNzRhMS44MzksMS44MzksMCwwLDAsMS44NCwxLjgzOWwuMDc0LDBhMS44MzksMS44MzksMCwwLDAsMy4xMzksMS4zNzZsLjY4Mi0uNjgzLjkyMi45MjJBMS44MzksMS44MzksMCwwLDAsMTYuMSwyMC45NTVsLjA5MiwwYTEuODM3LDEuODM3LDAsMCwwLDEuODM4LTEuOTEzbC4wNzQsMGExLjgzOCwxLjgzOCwwLDAsMCwxLjgzOC0xLjkxNGwuMDc0LDBBMS44MzksMS44MzksMCwwLDAsMjEuNzIsMTZhLjQ4OC40ODgsMCwwLDAsLjEzMi0uMDkzbC45NDctLjk0N0E3LjUzOCw3LjUzOCwwLDAsMCwyNC4wMjMsNS45MjNaTTQuMzI1LDE1LjkzNmEuODY0Ljg2NCwwLDAsMS0uNjExLTEuNDc0bC44NDItLjg0MmEuODY0Ljg2NCwwLDEsMSwxLjIyMSwxLjIyMWwtLjg0Mi44NDJBLjg1OC44NTgsMCwwLDEsNC4zMjUsMTUuOTM2Wm0xLjMsMS42NTlhLjg2My44NjMsMCwwLDEsMC0xLjIyMWwuODQyLS44NDJoMGEuODY0Ljg2NCwwLDAsMSwxLjIyMSwxLjIyMWwtLjg0Mi44NDJBLjg2NS44NjUsMCwwLDEsNS42MjcsMTcuNlptMS45MTIsMS45MTJhLjg2My44NjMsMCwwLDEsMC0xLjIyMWwuODQyLS44NDJoMEEuODY0Ljg2NCwwLDEsMSw5LjYsMTguNjY1bC0uODQyLjg0MkEuODY0Ljg2NCwwLDAsMSw3LjUzOCwxOS41MDdabTMuOTc1LDEuMDctLjg0Mi44NDJBLjg2NC44NjQsMCwwLDEsOS40NSwyMC4ybC44NDItLjg0MmgwYS44NjQuODY0LDAsMCwxLDEuMjIxLDEuMjIxWm05LjExOC00LjY3MmEuODYzLjg2MywwLDAsMS0xLjIyMSwwbC0yLjAzMy0yLjAzM2gwbC0xLjkxMi0xLjkxMmEuNDg4LjQ4OCwwLDAsMC0uNjkxLjY5MUwxOC43MTksMTYuNkEuODY0Ljg2NCwwLDEsMSwxNy41LDE3LjgxN2wtMy45NDQtMy45NDRhLjQ4OC40ODgsMCwwLDAtLjY5MS42OTFsMS45MTEsMS45MTFoMGwyLjAzMywyLjAzM2EuODY0Ljg2NCwwLDEsMS0xLjIyMSwxLjIyMUwxMy41NTQsMTcuN2EuNDg3LjQ4NywwLDAsMC0uMTI1LS4wOWwtLjU4LS41OGEuNDg4LjQ4OCwwLDAsMC0uNjkxLjY5MWwyLjcyLDIuNzJhLjg2NC44NjQsMCwxLDEtMS4yMjEsMS4yMjFsLTEuMDM1LTEuMDM1YTEuODQxLDEuODQxLDAsMCwwLTEuNzItMi41bC0uMDc0LDBhMS44MzgsMS44MzgsMCwwLDAtMS44MzgtMS45MTRsLS4wNzQsMEExLjgzOCwxLjgzOCwwLDAsMCw3LjA3OSwxNC4zTDcsMTQuM0ExLjgzOSwxLjgzOSwwLDAsMCwzLjg2NiwxMi45M2wtLjg0Mi44NDJhMS44MzksMS44MzksMCwwLDAtLjI3MS4zNDVBNi41NDUsNi41NDUsMCwwLDEsMTEuOCw0LjY4MmwtMywzYTIuMSwyLjEsMCwwLDAsMi45NjcsMi45NjdMMTMuMSw5LjMyaDEuNzIxYTMuNDIsMy40MiwwLDAsMCwuNDIyLS4wMjdsNS4zOTEsNS4zOTFBLjg2NS44NjUsMCwwLDEsMjAuNjMxLDE1LjkwNVoiIGZpbGw9IiNmZmYiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./src/assets/images/banners/banner-two/cryptik-banner-key-icon.svg":
/*!**************************************************************************!*\
  !*** ./src/assets/images/banners/banner-two/cryptik-banner-key-icon.svg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjQwIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyNDAiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDA3IDU1NCkiIGZpbGw9IiNmZmYiLz4NCiAgICA8L2NsaXBQYXRoPg0KICA8L2RlZnM+DQogIDxnIGlkPSJNYXNrX0dyb3VwXzciIGRhdGEtbmFtZT0iTWFzayBHcm91cCA3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDA3IC01NTQpIiBjbGlwLXBhdGg9InVybCgjY2xpcC1wYXRoKSI+DQogICAgPGcgaWQ9ImtleSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDA3IDU1NCkiPg0KICAgICAgPGcgaWQ9Ikdyb3VwXzYzNzAiIGRhdGEtbmFtZT0iR3JvdXAgNjM3MCI+DQogICAgICAgIDxnIGlkPSJHcm91cF82MzY5IiBkYXRhLW5hbWU9Ikdyb3VwIDYzNjkiPg0KICAgICAgICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfNDE0MCIgZGF0YS1uYW1lPSJFbGxpcHNlIDQxNDAiIGN4PSIxLjU2MiIgY3k9IjEuNTYyIiByPSIxLjU2MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMjExIDUuMjc2KSIgZmlsbD0iI2ZmZiIvPg0KICAgICAgICA8L2c+DQogICAgICA8L2c+DQogICAgICA8ZyBpZD0iR3JvdXBfNjM3MiIgZGF0YS1uYW1lPSJHcm91cCA2MzcyIj4NCiAgICAgICAgPGcgaWQ9Ikdyb3VwXzYzNzEiIGRhdGEtbmFtZT0iR3JvdXAgNjM3MSI+DQogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDY5NzciIGRhdGEtbmFtZT0iUGF0aCA0Njk3NyIgZD0iTTI0LjczLDguMWExNC4yNDcsMTQuMjQ3LDAsMCwwLTMuMDcyLTQuODNBMTMuOTE4LDEzLjkxOCwwLDAsMCwxNi44NjQuMjYxYTMuOTI2LDMuOTI2LDAsMCwwLTQuMTY1Ljg4M0w4Ljg2NCw0Ljk2MWEzLjkwOCwzLjkwOCwwLDAsMC0uODE1LDQuMzMyYy4yLjQ1My40Mi45LjY1NCwxLjMyM0wuMjg2LDE5LjAzM0EuOTc3Ljk3NywwLDAsMCwwLDE5LjcyM3Y0LjNBLjk3Ny45NzcsMCwwLDAsLjk3NywyNWg0LjNhLjk3Ny45NzcsMCwwLDAsLjk3Ny0uOTc3VjIyLjI2Mkg4LjAwOGEuOTc3Ljk3NywwLDAsMCwuOTc3LS45NzdWMTkuNTI4aDEuNzU4YS45NzcuOTc3LDAsMSwwLDAtMS45NTNIOC4wMDhhLjk3Ny45NzcsMCwwLDAtLjk3Ny45Nzd2MS43NThINS4yNzNhLjk3Ny45NzcsMCwwLDAtLjk3Ny45Nzd2MS43NThIMS45NTNWMjAuMTI4bDguNjYtOC42NmEuOTc3Ljk3NywwLDAsMCwuMTQ0LTEuMkExNS44LDE1LjgsMCwwLDEsOS44MzMsOC41YTEuOTQ0LDEuOTQ0LDAsMCwxLC40MDgtMi4xNTRsMy44MzUtMy44MTdhMS45NywxLjk3LDAsMCwxLDIuMDktLjQ0MywxMS45NTYsMTEuOTU2LDAsMCwxLDQuMTE0LDIuNTcxLDEyLjI4NywxMi4yODcsMCwwLDEsMi42MzIsNC4xNiwxLjkzOSwxLjkzOSwwLDAsMS0uNDM4LDIuMDg0bC0zLjg4MSwzLjg2M2ExLjk2NywxLjk2NywwLDAsMS0yLjE0OS40MTksMTIuNjc2LDEyLjY3NiwwLDAsMS0xLjc1OC0uOS45NzcuOTc3LDAsMCwwLTEuMDIyLDEuNjY1LDE0LjYzNiwxNC42MzYsMCwwLDAsMi4wMjksMS4wMzUsMy45MTQsMy45MTQsMCwwLDAsNC4yNzctLjgzOGwzLjg4MS0zLjg2M0EzLjg5MSwzLjg5MSwwLDAsMCwyNC43Myw4LjFaIiBmaWxsPSIjZmZmIi8+DQogICAgICAgIDwvZz4NCiAgICAgIDwvZz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./src/assets/images/banners/banner-two/cryptik-banner-two-thumb.svg":
/*!***************************************************************************!*\
  !*** ./src/assets/images/banners/banner-two/cryptik-banner-two-thumb.svg ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/cryptik-banner-two-thumb-eaaee878e45afdbe816de3f699c96cf6.svg";

/***/ }),

/***/ "./src/assets/images/banners/banner-two/cryptik-banner-watch-icon.svg":
/*!****************************************************************************!*\
  !*** ./src/assets/images/banners/banner-two/cryptik-banner-watch-icon.svg ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjQwIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyNDAiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDA3IDU1NCkiIGZpbGw9IiNmZmYiLz4NCiAgICA8L2NsaXBQYXRoPg0KICA8L2RlZnM+DQogIDxnIGlkPSJNYXNrX0dyb3VwXzgiIGRhdGEtbmFtZT0iTWFzayBHcm91cCA4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDA3IC01NTQpIiBjbGlwLXBhdGg9InVybCgjY2xpcC1wYXRoKSI+DQogICAgPGcgaWQ9InNwZWVkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MDcgNTU2Ljk3OSkiPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfNDY5NzgiIGRhdGEtbmFtZT0iUGF0aCA0Njk3OCIgZD0iTTguODg3LDEwLjk4NmE4LjA1Nyw4LjA1NywwLDEsMCw4Ljc4OS04LjAyM3YtMS41aDEuNDY1VjBIMTQuNzQ2VjEuNDY1aDEuNDY1djEuNUE4LjA2Nyw4LjA2NywwLDAsMCw4Ljg4NywxMC45ODZabTE0LjY0OCwwYTYuNTkyLDYuNTkyLDAsMSwxLTYuNTkyLTYuNTkyQTYuNiw2LjYsMCwwLDEsMjMuNTM1LDEwLjk4NlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF80Njk3OSIgZGF0YS1uYW1lPSJQYXRoIDQ2OTc5IiBkPSJNMTYuMjExLDUuODU5djUuODU5SDIyLjA3VjEwLjI1NEgxNy42NzZWNS44NTlabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfNDY5ODAiIGRhdGEtbmFtZT0iUGF0aCA0Njk4MCIgZD0iTTAsMTAuMjU0SDUuOTU3djEuNDY1SDBabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfNDY5ODEiIGRhdGEtbmFtZT0iUGF0aCA0Njk4MSIgZD0iTTEuNDY1LDUuODU5SDcuNDIyVjcuMzI0SDEuNDY1Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzQ2OTgyIiBkYXRhLW5hbWU9IlBhdGggNDY5ODIiIGQ9Ik0xLjQ2NSwxNC42NDhINy40MjJ2MS40NjVIMS40NjVabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./src/assets/images/bkg.jpg":
/*!***********************************!*\
  !*** ./src/assets/images/bkg.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/bkg-8c3e27f78974a2ded742ce1cd1f0e4d5.jpg";

/***/ }),

/***/ "./src/assets/images/chart/token-chart-1.png":
/*!***************************************************!*\
  !*** ./src/assets/images/chart/token-chart-1.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiwAAAHSCAIAAABAZQdKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA3LTI0VDIxOjMyOjA2KzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNy0yNFQyMTo0MCswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wNy0yNFQyMTo0MCswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozZDE1ZGU4NC03NjNlLTJkNDktYmRhYS04ODgwMzRhZjZlMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M2QxNWRlODQtNzYzZS0yZDQ5LWJkYWEtODg4MDM0YWY2ZTI3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6M2QxNWRlODQtNzYzZS0yZDQ5LWJkYWEtODg4MDM0YWY2ZTI3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozZDE1ZGU4NC03NjNlLTJkNDktYmRhYS04ODgwMzRhZjZlMjciIHN0RXZ0OndoZW49IjIwMjAtMDctMjRUMjE6MzI6MDYrMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Lb3GeAAAGt0lEQVR4nO3VMQEAIAzAMMC/zumYjB4kCvr1zswBgMKrAwD4lwkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCICMCQGQMSEAMiYEQMaEAMiYEAAZEwIgY0IAZEwIgIwJAZAxIQAyJgRAxoQAyJgQABkTAiBjQgBkTAiAjAkBkDEhADImBEDGhADImBAAGRMCIGNCAGRMCIDMAurJBlbU1MN9AAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/assets/images/chart/token-chart-2.png":
/*!***************************************************!*\
  !*** ./src/assets/images/chart/token-chart-2.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAekAAAGTCAIAAACDFX1nAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA3LTI0VDIxOjMyOjA2KzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNy0yNFQyMTozOTo1OSswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wNy0yNFQyMTozOTo1OSswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiMTE3NzQ3MS1hZWYzLWFmNDEtYWEzYS04ZTlkYTM2NmU5ODMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YjExNzc0NzEtYWVmMy1hZjQxLWFhM2EtOGU5ZGEzNjZlOTgzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjExNzc0NzEtYWVmMy1hZjQxLWFhM2EtOGU5ZGEzNjZlOTgzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMTE3NzQ3MS1hZWYzLWFmNDEtYWEzYS04ZTlkYTM2NmU5ODMiIHN0RXZ0OndoZW49IjIwMjAtMDctMjRUMjE6MzI6MDYrMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SFj/PAAAFoklEQVR4nO3UQQ0AIBDAMMC/ztOBBl5kSatgr+2ZWQCknN8BADzzboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugB7vBujxboAe7wbo8W6AHu8G6PFugJ4L9A8F2NJviqAAAAAASUVORK5CYII="

/***/ }),

/***/ "./src/assets/images/faq-image.png":
/*!*****************************************!*\
  !*** ./src/assets/images/faq-image.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/faq-image-92d61a731c2f4e6a826b3cf6a58588ed.png";

/***/ }),

/***/ "./src/assets/images/footer-bg.png":
/*!*****************************************!*\
  !*** ./src/assets/images/footer-bg.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/footer-bg-dd787ebd4aad55581961fdfa7f924101.png";

/***/ }),

/***/ "./src/assets/images/funds-bg.png":
/*!****************************************!*\
  !*** ./src/assets/images/funds-bg.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/funds-bg-1bceee63f1933088eb08cb46dc08e144.png";

/***/ }),

/***/ "./src/assets/images/languages/github.png":
/*!************************************************!*\
  !*** ./src/assets/images/languages/github.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/images/languages/javascript.png":
/*!****************************************************!*\
  !*** ./src/assets/images/languages/javascript.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAABECAYAAAA/UU2nAAAABHNCSVQICAgIfAhkiAAACcRJREFUaEPdmw2MHGUZx///2Y/Zm7vbPZHGSmpFUAsUiSanoQVqS01ERFOtHBGNlqKlUChIBI0GtaQGSDAgkUIpoWiBGmsiBrXGFHqCtUY9jRIuYgTUQjQN6H3tze7szPua53Kzzs7O3M3Nzl1pn2Rze3fzfvz2eT/+7/O8S631NwF8BNma7rC6+Sh/gFrruwFc32HnjofiuwT2awC2HQ+97bCPtwvsdQDu6bCi46H4TQL7aQB7jofedtjHjQL7IQA/67CiORV3XRfymi/L5/OQV8g+KrDnAjg8Xw1H1Vuv12Hb9rw12dXVBdM0w/WfJ7DvBPD8vLUcUfF8w1qWhWKxGG75DIFdBODoiQTb09MTNYwXCWwBgHMiwfb29iKXywWRFIAi5S9a69cAnLRQwPM9jMvlMgzDCOIcJfkmH3YYwJknCmxfX18Y5VmS5/iwBwGsPhFgSaJSqYRRniT5AR/2+wAuyxD2tsnJyR+F6+vq6rqb5Ep/GOdyOdc0zUu11jKnRPzL5is/5XeltfYC71U+n2/+7j8/XVa5rrvdcZx1MldlzobsMZKf8mG/DWBrhrA3krwrXJ9S6imSawKwjXK53LZHpOlHtVp9wnGcS0RMyGocsrtI3ujDfgWAHPWysi+QlNNUi80z7CHHcVYWCgV0d3eHm/4yyTt82CsBPJgVKYAbSMpomRHWMAy3UqnI1texTUxMDDcajTNFOYmCCtkVJB/2YS8B8ETHLf6/gutJtp2kwp7NGPZIo9FYUiqVIK+QXUxyvw/7XgC/PQawXqVSaVPsafoxPj7+muu6J8VIxX6SQz7sUgD/SNNITBlZ7L5DsiW8EuHZLGGrrutaMl9l3obsLSRf9mFlkE9mCCsBgXsTwKpKpdKi66QPtVptq+M4wQVzqp+UTXTatNb++6mfSilT/haji02STrDwKIByRsDXAtiRFnZycvL2er3+pTR9iZCK/yU5JYWDsH8F8I40DUSUSQqrK5VKi4iVujqBFfUUGABS3V9ITknhIOwzAM7PDnbbfeQ3RAk1LTxnxfN9fX2ZwcZIxadJvj8M+0MA6zOC3QJsu3+hYeWkI8M4ZPtIDoRh7wVwTUaw1wDbdi40bIwull1BFsyWYZxl/PiYwMZIxVtIbg/DXgXg/ow8ezUwsIvcJ6eUBZuzEncSURGyTSR3hWHXAWg7lqWE3wwMPLjQsDFScR3JH4dhVwD4dUq4cLE42IMkVwfDMrIah/fjuK1HnjMMo05ynOSrJF8xDOOlRqNxmed55ZgQ6gqSvwnDngbghXmGbTnPSlt9fX1Fko1gu/V6fX2j0biW5N8Nw3ie5HOmaf6e5L+i+jeLLj6N5EthWDkETmQEexUG1zzENYMtYf/wPjsN202yI6k6NjY26XleV4xUbNbfFBXSsNa6CqBthqf4AOYC20dSpGpqGx0ddZVSuYgQ6gTJZowmDCvDWIZzp7YJg2t2J/TsySQllJvaRkZGJF7FCKn4Asm3+xWHYWWBkoWqU5sL7ClxczFJJ2zbXlqr1aaOpxEh1MMS4IuDla1HtqBO7fMY6v8u+4daFp6YObuU5JG0Ddq2vbZWqx2I0cWPk/xYHOxOAJvSNhwo9zkM9X8vCWxXV9fppVLpxbRt1mq1TbZt74yRijtJbo6DvRXALWkbDpS7EkP9exLCLiuVSnK8bJrMP9u2V5L8oFLqfVrrZUqpxfl8/nHLsj4ZfNa27e21Wu2rMSHUW0l+PQ52i4RTMoDdiKH+R5LAWpa13vM8WRRXKKXOUkotUUp1ByIRze6YprnXsqzLg/2rVqu7HcfZECMVt5DcEQf7CQD7soAdHh54dPnyfS3ZQa31UwCaQfK5tlMsFnd3d3dvDMHudxznopgQ6qUk5eg6ZeHV+AIAT8+1ExHPXzE8PPBY1rCmae6wLEtGX9Oq1ervHMfpj9HFq0hKUCISNjYLX6/XNxcKhcWGYVwIQK4mzJS22DA8PLA3AnYqgZY2ZWma5rcsy/piEHZ8fPxvruueHhNCXUayuR6EPSvpr5Eoz1ar1XN6enqelf9prU/2PG91LpdbC0Dg5UMKWhxs6mEsh4BSqXRdqVSSIEPTxsfHj7quuygmhNqizlpgp0FqANpuX0xMTJzd29v7XPiD0FobjuMsz+fza0leSFKmwg0YXPNohIJqO/XETZnpE86EYRh/zOfzPzBN8yGSbbdOxsbGJjzP646QinI6akkNRMGKGpGgeYvFwUbAixaVk0ybBFRKzQiby+Wc6VPOTyzLui+J2BgdHW0opfIRIdQjJFs4omAlDSLpkFSwcZ6aHjUtc1a8l8/npVMHi8XiA4VCYc7n6Rl0sRwJWziiYCXBJYmuMOzy3t5euY6Q2pRSgxLWDORnnXK53DZlkjagtX7DyMjIf2Kk4k9JtnBEwUrqUlKYmcNqrQcBBGE7SkY7jnNutVo9HBNClTnewhEFKzkWSU63mAgCrfUBwzBkKMoQmfN9PKXUL0mu8j3bScpSrjTZtn1nvV7fGiMVbyPZwhEFKxm4tkRyiP1lAOKlwXq9PlgqlRKFc5RSEp2/IAA7pyxerVb7sFJqg+d553met9iXlDEh1LaEeBSsXCSRCyVJTVIcfwZw0PO8wVwuJ96LjDwopZ4heX4ANjKL5zcsysjzvE2u665VSr1VohFRnYrRxZeT3Bt8PgpWrgjJUE1rEsc6JHU0Go2DhUJhiORU/FgpdSh4W8YwjBZY27ZP1VpvVkpdrJRa5nleosslMVJR9n0RMU2Lgj0LQJt4SEsOQA7mU143DGMryXf7npWtp1gs3qy1/rjnee+KO+3M1nZMCPVsiUrOBvtGAK/O1kAn/0+rjePajJGKiyS2PBuseLsOIJNbLFEdzBo2IoQq06YQDr63DWPpnNb6FQCndOK9mcpmDRshFf9N8s3hPsTB/gHAe44X2IgQ6p9kbUgKux/ARa93WAmyyR4bce/pFxK/Sgr7MIDPvt5gRRb6X3YQyNDdiWB395D8TFLYOwDcfKxhBcb3nkCGbofP1L07Sd6UFFa8+sAsoZfUn8VMC5QACZh4LuLrKknaFFFzNclHEsFOr8iS1ZOwi3zvR+bvqUlaSvJMEFa854MJXOi6e5Lq5BkRD7LOyOtXcsErqmDkahz1oNZa7hIJuLwk9JL6HNpoNOB53hTkHIZmsFvivSd9QJL/TPKpJIYNVqa1Fq9LoM2Hz8zrM3Q6kfdmgk4FG65Qa31GAHxVJ14P1J3Ke/MOG/K6JLODXn9bkiE2/UzH3ltQ2AivLwt4Xa7VBee67z354uPPk869OXx4LY9mMoyTNq61lvOpXAZdAkAudbyYJryTtL3wc/8DIZreuAdZKBwAAAAASUVORK5CYII="

/***/ }),

/***/ "./src/assets/images/languages/python.png":
/*!************************************************!*\
  !*** ./src/assets/images/languages/python.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/images/languages/react.png":
/*!***********************************************!*\
  !*** ./src/assets/images/languages/react.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/images/languages/ruby.png":
/*!**********************************************!*\
  !*** ./src/assets/images/languages/ruby.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/images/logo-white.png":
/*!******************************************!*\
  !*** ./src/assets/images/logo-white.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/logo-white-5b911bfca072040f2dfe354ff587388a.png";

/***/ }),

/***/ "./src/assets/images/panache-banner.png":
/*!**********************************************!*\
  !*** ./src/assets/images/panache-banner.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/panache-banner-c96e67377d04175d9460be4a740f1874.png";

/***/ }),

/***/ "./src/assets/images/particles/banner/particle-bottom-left.png":
/*!*********************************************************************!*\
  !*** ./src/assets/images/particles/banner/particle-bottom-left.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/particle-bottom-left-31f04bb66c0e5d343bc7b23133a1ff8a.png";

/***/ }),

/***/ "./src/assets/images/particles/banner/particle-bottom-right.png":
/*!**********************************************************************!*\
  !*** ./src/assets/images/particles/banner/particle-bottom-right.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/particle-bottom-right-a33c6aca44edb7d79cd3b83380e078b0.png";

/***/ }),

/***/ "./src/assets/images/particles/banner/particle-top-left.png":
/*!******************************************************************!*\
  !*** ./src/assets/images/particles/banner/particle-top-left.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/particle-top-left-71aaa31a4a6781deaab7714a6a76fa42.png";

/***/ }),

/***/ "./src/assets/images/particles/banner/particle-under-logo.png":
/*!********************************************************************!*\
  !*** ./src/assets/images/particles/banner/particle-under-logo.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/images/particles/banner/prticle-top-right.png":
/*!******************************************************************!*\
  !*** ./src/assets/images/particles/banner/prticle-top-right.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/prticle-top-right-7008d66665bf1da1d452b7f43dd0a814.png";

/***/ }),

/***/ "./src/assets/images/particles/crypto-managment-wallet.svg":
/*!*****************************************************************!*\
  !*** ./src/assets/images/particles/crypto-managment-wallet.svg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzMuMjQ3IiBoZWlnaHQ9IjUzMS41OTgiIHZpZXdCb3g9IjAgMCAxNzMuMjQ3IDUzMS41OTgiPg0KICA8ZyBpZD0iR3JvdXBfNjU1NiIgZGF0YS1uYW1lPSJHcm91cCA2NTU2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzAyLjc0OSAtNTE3LjIyMikiPg0KICAgIDxnIGlkPSJHcm91cF82NTU1IiBkYXRhLW5hbWU9Ikdyb3VwIDY1NTUiPg0KICAgICAgPGNpcmNsZSBpZD0iRWxsaXBzZV8zODQiIGRhdGEtbmFtZT0iRWxsaXBzZSAzODQiIGN4PSIyNy41MTEiIGN5PSIyNy41MTEiIHI9IjI3LjUxMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDIwLjk3NCA2NzcuNzY5KSIgZmlsbD0iI2JlYWJkZiIgb3BhY2l0eT0iMC4xIi8+DQogICAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzM4NSIgZGF0YS1uYW1lPSJFbGxpcHNlIDM4NSIgY3g9IjE3LjU0MSIgY3k9IjE3LjU0MSIgcj0iMTcuNTQxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDIuNzQ5IDUxNy4yMjIpIiBmaWxsPSIjMWYyYWQ1IiBvcGFjaXR5PSIwLjUiLz4NCiAgICA8L2c+DQogICAgPHBhdGggaWQ9IlBhdGhfMjMwNzEiIGRhdGEtbmFtZT0iUGF0aCAyMzA3MSIgZD0iTTQ4OS40NTksMzcxLjAwOWEzNy40MTMsMzcuNDEzLDAsMSwxLTUyLjkxLDBBMzcuNDEzLDM3LjQxMywwLDAsMSw0ODkuNDU5LDM3MS4wMDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTEuNzcgNjEzLjk0MykiIGZpbGw9IiM2ZWU4ZmMiLz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./src/assets/images/section-title-bg.png":
/*!************************************************!*\
  !*** ./src/assets/images/section-title-bg.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABuCAYAAACa0WXfAAAABHNCSVQICAgIfAhkiAAADOdJREFUeF7lnX+MFGcZx9+3mvifQOkfVv5oj+O4u937fQdUUbFBJYqKiBEj0WowEokGaSO1wVBq9aJof2Ft7VUBSb3UklJClTRnA0qQGqrHHrc7twfcsVzxTIlWqoBwdzuv2dmZ2fd953ned9692dtd2KTpZefd2ff5vM/3+fHODEuP3/UPxhgjjBDnv9zL+1v+v3OMG8sfhz/HnJOpxomfy88AHO+eJ/R4yB6mOD83nhAyTo8tGXeGa8EAJ8U/x4g7PCSU/MIEoIBQ8UWEoebnAp4fXARn8H56VAVG8g4Tb0JX3l+ZgoGBSbtviOAV4yGopAAkHJTC+W1GttA/QmBuArnkocOemrXtZfQwD0YjF5F8dcsFCx2Escmr9F2z6auL/y7EGFUAloNvNctFsJOLQYSRxP0n72ynfaHAVGd2Ucklv8jBpEMI63mgv2YDfUUJ5kaVC1QS5ONNltnrt52s3UUPSWBuBrkUsl2wrsmyqfj2k3UW/Z0PppLkEpGnInLBshEj5BLrv3PudkJtenDxhVwxi1ecgQqysooxPLvgclHUNX3b+2tW5GDQA4suOOPUZXvlFmNYdlHJBbOXENb9UP/8rQ6YlxZdULQEpexdyiMXvBdzFn/VD07OP+iAeZEDU/jQDS0XsS/0i1rK7El2e3dy/psOmH0umHyBjDSTZe5dopSLp4FAY8noaHeiptZtuwj97aI38Bgz7Va/8uTCS8n7Ow+D9nafrFnng3l+0RtijClTqx9xdkHkEtx+8ODYjG3ekah93AfT64G5GeTCbU/InkOYvfTHiQXHfTDPdeU9RozWimwE1TVR1EGGxZgqu2BygbwybzibuHjplll7MjXXfDB7u7wYU/qdMVAuKFTD+UhbJhAc3gHyx93vYPTEI4n5SzwoTsT5ddeYcmszuDLF74zNSHaRvJ8PsF63LUDLxVRGdz46MH+TAGY3BwZ1T3ebED8uBzWkDiqjXOT+iN+ktwlZ90SitlcA8ysXDGy0+UZypcolH0rgrDTJSP3PB2pPC2Ce7RoL1jGaTXBQXlBxOO06yI0EiEHyIhTmJSYP3juC0iJv7UzUzuWhODGmx5dS9RRjWHZRyQULxpSQQzsTtSsDYH7Rdd7ZdlC04tI1JyRbVEB2Uckl6F1uHGRk25MDCx4OgHmq8zxQx+SHib0T0ktVh1w4e2SZsRVPDdT1BcA82XlesR9TXdkFr12Cdrjexf739jtu3ZOpuRQA8zPXY0RXqyy5+B2xV6OEDsawHZzkTj8zsKBehuIE3yd8MKXclJqR7ILLhW9j+GtIlOx9JrHgHhDMY50ZPMYA112wjWS0+ENKddztg5dOoXQrJwtvPwk8r5QY/DGMbfzlqbqnQTCPdGbEGBNhdgn2JnjbX0K5+J4k1zlZRjp3n6rrB8H81PUYOGWbdNmVKRcodrqArrxz4O05PaRrEgSzoyMvJdE1FdkIrHClFAjctBN0cfE7TOQCeiImF9eyoPTI8d0DdUshKE7w/ZELxl1v9AYiMIa4rYN3TB03PPgckOiyCyoXrEomNnl0z2DdfSiY7o5zijoGiglwYwlBkTXtTxK8mA5txCs8EYUqeSKywW9ns2ufSza8gIL5Yce5cPsxEWQX/oon7l3B2qOQRfJmQNIP7bWupq5N3XLHPqt2DAXzMAcmKJegd1STXPy4IniXA378N6cWzsOgODHmIReMaHB1yQUtCwTJcp5I6YHegbrVSjAP8jEmxL6pLrtUklz42kjISjbb+nyyvlsJZlvHaGDb4QaRCxiPcm9ms/byfamGw0ow32sfFbJS9NkF6Wy9WidkdjGWC1pL0Sybmpi9z4pfVoLZ2j4aKPBuCLm4VssZjDByat/gwlYVFCf4PqD0mMooxhTZBZVLAIiX5hnpeXFw4QYtmO+6HjO9YkwhF65U13oit8rCWCy7hGo9vNrHvZUua2/YbzX2aMFs8T1GMk5pkFjeR9S7BAs3YQ6KTScJkFjsFe4tzL0/xVjrwWTDKS2Y77SPFPZjyti7mMoFWowCEPGKR+F9+t+XButmE0JtLZj72kecpcCarcIEqkgugCTdtw4fGKxfroPiBN972ziPATU7M72Lh121QLCX+JdBhK0TUU55FDYj3S8n652bD3Uv+u22EbCO4W89CwRNSXJo4EY6W89D85/T1Dlo/MDkIu4ISIBWvzxYf0AHxfGYTYLHVL9cVLHn+gSb94fhhvFQYL7leMyNIxcUDGNjv0823BEGiuMx32w7G7hK4LifolQPSAuKTcFW35mTPsjnp+43gEDZAMUPlae4x144NFi/NjSYjW1nCzGm0ooxJLuoUzUUY3KKoPe+Mlj/WGgw38h5DAdEaM/xjWRFMeatte5SiWxA+OwSDowYL23GlvYlG/2bD3WA6IZWzmP8FQppXAXIJQipMHdOcpP//Ne7Z/9t/L1XdUC84/TrrXyMwbOSEB+i7F0ilIsi9vT3DTZ0hoXiBN+vtZ7xY4wuOBYkF24nPjjR0soFA8MYefrVZMNGIzDrW8/AWQncSJrRYgzMYnnjQbnAlS9zHue750gqttcIzFcxj6k+uYhguPh3fYrVH0s3Cjcf6iDRr8ge42eo6pKLV3vJcso9znck2TBHB0I+Tr+c85gyZhc89ZrJBTsPIaTvSLLBeZzP5EW/1OLFGEVbwGUOMD0iTaVphVpM/AixL/P9P6UaHzSB4mSldS2nQ2elgqHlyS6YXLDs5xiWZSuPDsUOGYP5YstpNCuBX1hE71JquRTOL8uPsimWve21VPwtYzBf0HiM796VLBdO6sJiMnL6WKoRvPlQB4qulTymWuQSqpZhtPfPqQb/cT4dDP44/XwAjNnOmL6hiya74HLJmwPNw7btTX+x4jtNgHhj6ed8KYmXGfQG4xMqSXbB5KJ637aXvGbFTxQFZk3LsFTH6AxWHYeLQnBFQwTxUHLB9oQZufYfZs+yrPhEUWA+2zwcSNeeIeG9pnxywWTECDl+ItmI3nyog0VXNw8L6Rr7IqxWCD1em9UMvE0jq9xhm7HHX0/FNusAYMfpZ4zBGBigkEsxwRRahMB7hWVedyIVFx7nM4FEP62QkvillScXz9B8LBDnRyamal8/0zJqAkNI159SgjHwDpeitncpJrsAAdZfNO5eY24h3/xrKvaeYqHkPkc/CYIxAALIJeQ+rPaSqnceTC7y9xSSBj3Yn2pcNS0wK4UYU/lygWAB4Lb2W3HlzYc6aPQTzWmzrDSD2cWHAMvF9zgeTO7vbDa7YiDdHHicTwdDiDEfDwNmBuQS8AQpmIbyFMcymv33lWu3ZTLtgcf5jMCsaE6jBZ64s5c/bdTxAwISHkJhPtzcrEQqFjeBAI2lH4PAVIFcsMBLGNk1YMXWTxvMRz0wnFzwlGsQnBX3xfGpFvJCOWagEIDUz5i9YdBq0t58qANHP9IUJvhGD2SackED7xRj7ZYVT+gM1x2ny1EwBrVMyKItV52itYl0jiI96cpg6uocgjzOp4MhZKW7m+TgG713FGmkGUQni9GjSSu2zAQANpZ+2AcTPZBSycWPOX4F5mYnRnekhmL3RwJmWdMQnq6VNxbD6XsG5OL8S/feiw/Mtm2vSaeb90cC5kNNQ2aVLwerlNlFNtz5LrmDluaSzV6fNzzcEermQx08+sEiwPBAZlwuaKCn42krpnycTwdDCL4fKAZM6bMLKhfQk5yVovvTQ7E1JsarxtL3a2JMpckFK/ZsRrecGYr9JDIw70PAVKJc+LQvlwCM0WVnhmJHIwNzFwamEuUCBX6HBJu8fOnW2eMGNx/qANIlPJiiW32wy0XLdl12MemNXM9JnLXi7TpjTY7TxTkwiHdEWrECtUcU58+dwyakZ8SKax/nMwKzKG4VNsqkVKjSNJodZHdHirHQn+es4UsDfm521l4/Oty8y8Rw3VjaBYCJYiWjlgsE0ntvYoLEx87GLZ2xJscdMKaaRj2phHKRvaUAil0aseJzwzzOZwSmkwNTtKfMgFx4o4Rqm9G+0aGY8c2HOki0AwGjhQT8ozpRxCT5HBgQ/32bdI+k46Ee59PB4I/TdjfGhJZTWeQCm5SbM8uSVeeG485vCUT5om0SGNRTSiQXPHbgMPwjjLDL1+zbL55rdn5LIMoXbVWA4eubKLtoY7lIJQAXeEfPWU3+bwlECqYFqmMqTC6QwY6MCOnNWPGibj7UQaTNPJhKlAtnQaDAY2xzZqjJ/y0BnbEmx2lzLBVdHSN987TihwKId8i27aXn082hH+czAtPEgUEDLzBJLOZEFT9CnGeCXL04K5O52/8tARPDdWNpHAFjAimEEYF5ROBNJzJWXPgtAZ2xJsdpLJYCrxLIxkJ1TpmAOPbZNtk5lo4LvyVgYrhuLG2UwITxlHIC8T3NJuvOp4u/+VAH5v8bg4juyjXyowAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/assets/images/service/service-icon-1.svg":
/*!******************************************************!*\
  !*** ./src/assets/images/service/service-icon-1.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMTAxIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAxMDEiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcng9IjEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NzkgOTY2KSIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvY2xpcFBhdGg+DQogIDwvZGVmcz4NCiAgPGcgaWQ9Ik1hc2tfR3JvdXBfMSIgZGF0YS1uYW1lPSJNYXNrIEdyb3VwIDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzkgLTk2NikiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgpIj4NCiAgICA8ZyBpZD0iYml0Y29pbl8xXyIgZGF0YS1uYW1lPSJiaXRjb2luICgxKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDgyLjE2NyA5NjYpIj4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMTg2IiBkYXRhLW5hbWU9IlBhdGggMjIxODYiIGQ9Ik0zNi44MzMsODBhMzYuODI2LDM2LjgyNiwwLDAsMSwwLTczLjY1MiwxLjI3LDEuMjcsMCwwLDEsMS4yNywxLjI3djUuMDc1YTEuMjcsMS4yNywwLDEsMS0yLjU0LDBWOC45MTFBMzQuMjg2LDM0LjI4NiwwLDEsMCw3MS4xLDQ0LjQ0NEg2Ny4zMWExLjI3LDEuMjcsMCwwLDEsMC0yLjU0aDUuMDc5YTEuMjY5LDEuMjY5LDAsMCwxLDEuMjcsMS4yNjlBMzYuODY5LDM2Ljg2OSwwLDAsMSwzNi44MzMsODBabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIxODciIGRhdGEtbmFtZT0iUGF0aCAyMjE4NyIgZD0iTTM2LjgzMyw3NC45MjFhMzEuNzQ3LDMxLjc0NywwLDEsMSwxNi4xLTU5LjExMywxLjI3LDEuMjcsMCwxLDEtMS4yOSwyLjE4N0EyOS4xNjIsMjkuMTYyLDAsMSwwLDY0LjE5LDMyLjkyMmExLjI3LDEuMjcsMCwwLDEsMi4zNzktLjg5QTMxLjc2NywzMS43NjcsMCwwLDEsMzYuODMzLDc0LjkyMVptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjE4OCIgZGF0YS1uYW1lPSJQYXRoIDIyMTg4IiBkPSJNMjkuMDExLDMwLjkyOGEuMzc4LjM3OCwwLDAsMSwuNC0uNGg5LjY1M2M1LjQ4NywwLDguMjEsMi44LDguMjEsNy4xNjksMCwzLjE2NS0xLjUyMiw1LjA4Ny0zLjY0NCw1LjkyOFY0My43YTYuMjg0LDYuMjg0LDAsMCwxLDQuMTI1LDYuMjg4YzAsNS4wODctMy4yLDcuNzcxLTguODkyLDcuNzcxSDI5LjQxMWEuMzc4LjM3OCwwLDAsMS0uNC0uNFpNMzguOTg0LDQyLjNjMywwLDQuNzY1LTEuNzIxLDQuNzY1LTQuMjQ1LDAtMi42LTEuNzYyLTQuMjg2LTQuNzY1LTQuMjg2SDMyLjgxNGEuMjEzLjIxMywwLDAsMC0uMjQuMjQxdjguMDVhLjIxMi4yMTIsMCwwLDAsLjI0LjI0Wk0zMi44MTUsNTQuNTE5aDYuMzY5YzMuMjQ0LDAsNS4wMDYtMS43NjMsNS4wMDYtNC40ODUsMC0yLjY4NC0xLjc2My00LjQ4Ny01LjAwNi00LjQ4N0gzMi44MTVhLjIxMi4yMTIsMCwwLDAtLjI0LjI0MXY4LjQ5MWEuMjEyLjIxMiwwLDAsMCwuMjQuMjQxWm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMTg5IiBkYXRhLW5hbWU9IlBhdGggMjIxODkiIGQ9Ik0zNC4yOTMsMzEuNzQ2YTEuMjY5LDEuMjY5LDAsMCwxLTEuMjY5LTEuMjd2LTMuODFhMS4yNywxLjI3LDAsMSwxLDIuNTQsMHYzLjgxQTEuMjcsMS4yNywwLDAsMSwzNC4yOTMsMzEuNzQ2Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMTkwIiBkYXRhLW5hbWU9IlBhdGggMjIxOTAiIGQ9Ik0zOC4xLDMxLjc0NmExLjI3LDEuMjcsMCwwLDEtMS4yNy0xLjI3di0zLjgxYTEuMjcsMS4yNywwLDEsMSwyLjU0LDB2My44MUExLjI3LDEuMjcsMCwwLDEsMzguMSwzMS43NDZabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIxOTEiIGRhdGEtbmFtZT0iUGF0aCAyMjE5MSIgZD0iTTM0LjI5Myw2Mi4yMjJhMS4yNjksMS4yNjksMCwwLDEtMS4yNjktMS4yN3YtMy44MWExLjI3LDEuMjcsMCwwLDEsMi41NCwwdjMuODFBMS4yNywxLjI3LDAsMCwxLDM0LjI5Myw2Mi4yMjJabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIxOTIiIGRhdGEtbmFtZT0iUGF0aCAyMjE5MiIgZD0iTTM4LjEsNjIuMjIyYTEuMjcsMS4yNywwLDAsMS0xLjI3LTEuMjd2LTMuODFhMS4yNywxLjI3LDAsMCwxLDIuNTQsMHYzLjgxQTEuMjcsMS4yNywwLDAsMSwzOC4xLDYyLjIyMlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjE5MyIgZGF0YS1uYW1lPSJQYXRoIDIyMTkzIiBkPSJNNTguNDIxLDQ1LjcxNGExLjI3LDEuMjcsMCwwLDEtMS4yNy0xLjI3VjI5LjIwNUg0OC4yNjJhMS4yNjksMS4yNjksMCwwLDEtMS4xNjctMS43NjlMNTguNTI0Ljc2OWExLjI2OSwxLjI2OSwwLDAsMSwyLjQzNi41VjE3Ljc3N0g3Mi4zOUExLjI2OSwxLjI2OSwwLDAsMSw3My41LDE5LjY1OGwtMTMuOTY4LDI1LjRhMS4yNywxLjI3LDAsMCwxLTEuMTEyLjY1OVpNNTAuMTg3LDI2LjY2Nmg4LjIzM2ExLjI3LDEuMjcsMCwwLDEsMS4yNywxLjI3VjM5LjVMNzAuMjQyLDIwLjMxN0g1OS42OTFhMS4yNywxLjI3LDAsMCwxLTEuMjctMS4yN1Y3LjQ1NVptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg=="

/***/ }),

/***/ "./src/assets/images/service/service-icon-2.svg":
/*!******************************************************!*\
  !*** ./src/assets/images/service/service-icon-2.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMTAxIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAxMDEiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcng9IjEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NzkgOTY2KSIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvY2xpcFBhdGg+DQogIDwvZGVmcz4NCiAgPGcgaWQ9Ik1hc2tfR3JvdXBfMyIgZGF0YS1uYW1lPSJNYXNrIEdyb3VwIDMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzkgLTk2NikiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgpIj4NCiAgICA8ZyBpZD0iYml0Y29pbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDg0LjY3MiA5NjYpIj4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjEwIiBkYXRhLW5hbWU9IlBhdGggMjIyMTAiIGQ9Ik0xMi40Miw2NS42NTJsLTEuOTgxLTMuM2E0LjY1NCw0LjY1NCwwLDAsMSw3Ljk3OC00Ljc5M2wzLjkxOSw2LjUyNC0yLjE3OCwxLjMwN0wxNi4yNCw1OC44NjlhMi4xMTUsMi4xMTUsMCwxLDAtMy42MjQsMi4xNzlsMS45ODEsMy4zWm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjExIiBkYXRhLW5hbWU9IlBhdGggMjIyMTEiIGQ9Ik0zNC43NzQsNzYuOTM5Yy01Ljk5NSwwLTguNTY0LS45NTEtOS40MTEtMS4zNzdMMTAuNzIzLDczLjYyOCwyLjQ2Nyw2OS4xODVhNC42NzEsNC42NzEsMCwwLDEtMi4wNDUtNi4wM0wuNDEzLDYzLjE1bC4xNDItLjI2Ny4wMDkuMDA1YTQuNjgyLDQuNjgyLDAsMCwxLDYuMTQ3LTEuNjZsNS40MTYsMi44NTgsMTIuMzI5LS4yMjUsMS44LTEuMTMyYy0yLjMzNy0xLjM0Ni01Ljc3NS0zLjcwOC02LjM0MS02LjIyM2EzLjIxNCwzLjIxNCwwLDAsMSwuNjYyLTIuODA3YzIuOTkxLTMuNzExLDE2LjI2NSwyLjk2MywyMi4xNTQsNi4ybDEzLjg0MS4wMzEtLjAwNiwyLjU0LTE0LjQ5MS0uMDMzLS4yODYtLjE1OEMyOS41MzYsNTUuNTA5LDIzLjE1Myw1NC41NTQsMjIuNTU1LDU1LjNhLjY4OC42ODgsMCwwLDAtLjE2MS42NTNjLjM3OSwxLjY5Miw0LjI5MSw0LjI2Miw2Ljk0OCw1LjU0NWwyLjA2NCwxLTYuMTk0LDMuOS0xMy42OTEuMjQ5TDUuNTI2LDYzLjQ3NWEyLjEzNCwyLjEzNCwwLDAsMC0yLjguNzQzLDIuMTI4LDIuMTI4LDAsMCwwLC45NDIsMi43MzFsNy44NDYsNC4yMjEsMTQuNywxLjk0NC4yNDEuMTU2Yy4wMy4wMTYsNS45MiwzLjIyMSwyOS4zMTItMS4zNGwuNDg2LDIuNDkzYTExNS4xNTMsMTE1LjE1MywwLDAsMS0yMS40OCwyLjUxNlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIxMiIgZGF0YS1uYW1lPSJQYXRoIDIyMjEyIiBkPSJNMzQuMjkxLDI3LjkzN0ExMy45NjgsMTMuOTY4LDAsMSwxLDQ4LjI2LDEzLjk2OCwxMy45ODQsMTMuOTg0LDAsMCwxLDM0LjI5MSwyNy45MzdabTAtMjUuNEExMS40MjksMTEuNDI5LDAsMSwwLDQ1LjcxOSwxMy45NjksMTEuNDQxLDExLjQ0MSwwLDAsMCwzNC4yOTEsMi41NFptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIxMyIgZGF0YS1uYW1lPSJQYXRoIDIyMjEzIiBkPSJNNDMuODE1LDM5LjM2NUgyNC43NjdhNC40NDQsNC40NDQsMCwwLDEsMC04Ljg4OUg0My44MTVhNC40NDQsNC40NDQsMCwxLDEsMCw4Ljg4OVpNMjQuNzY3LDMzLjAxNmExLjksMS45LDAsMCwwLDAsMy44MUg0My44MTVhMS45LDEuOSwwLDAsMCwwLTMuODFabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMTQiIGRhdGEtbmFtZT0iUGF0aCAyMjIxNCIgZD0iTTQzLjgxNSw1Mi4wNjRIMjQuNzY3YTQuNDQ1LDQuNDQ1LDAsMCwxLDAtOC44ODlINDMuODE1YTQuNDQ1LDQuNDQ1LDAsMCwxLDAsOC44ODlaTTI0Ljc2Nyw0NS43MTVhMS45LDEuOSwwLDAsMCwwLDMuODA5SDQzLjgxNWExLjksMS45LDAsMCwwLDAtMy44MDlabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMTUiIGRhdGEtbmFtZT0iUGF0aCAyMjIxNSIgZD0iTTQzLjgxNSw0NS43MTVIMjQuNzY3YTQuNDQ1LDQuNDQ1LDAsMCwxLDAtOC44ODlINDMuODE1YTQuNDQ1LDQuNDQ1LDAsMSwxLDAsOC44ODlabS0xOS4wNDgtNi4zNWExLjksMS45LDAsMCwwLDAsMy44MUg0My44MTVhMS45LDEuOSwwLDAsMCwwLTMuODFabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMTYiIGRhdGEtbmFtZT0iUGF0aCAyMjIxNiIgZD0iTTMwLjYzLDguMDQ2YS4xNjUuMTY1LDAsMCwxLC4xNzQtLjE3NWg0LjQxN2MyLjUxMywwLDMuNywxLjI1NiwzLjcsMy4xNmEyLjY0MywyLjY0MywwLDAsMS0xLjM3OSwyLjUxM3YuMDM1YTIuOCwyLjgsMCwwLDEsMS41ODksMi42NzFjMCwyLjM1Ny0xLjQ4NCwzLjQ5Mi00LjA4NiwzLjQ5MkgzMC44YS4xNjUuMTY1LDAsMCwxLS4xNzQtLjE3NVptNC41MzgsNC43NjVhMS41NjgsMS41NjgsMCwxLDAsMC0zLjEyNUgzMi43OTRhLjA5My4wOTMsMCwwLDAtLjEwNS4xdjIuOTE3YS4wOTIuMDkyLDAsMCwwLC4xMDUuMVptLTIuMzc0LDUuMTE2aDIuNDc4YTEuNjU2LDEuNjU2LDAsMSwwLDAtMy4zSDMyLjc5NGEuMDkzLjA5MywwLDAsMC0uMTA1LjEwNXYzLjA4OWEuMDkzLjA5MywwLDAsMCwuMTA1LjEwNlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIxNyIgZGF0YS1uYW1lPSJQYXRoIDIyMjE3IiBkPSJNMzQuOTI1LDguODg5YS42MzQuNjM0LDAsMCwxLS42MzQtLjYzNFY2Ljk4NGEuNjM1LjYzNSwwLDEsMSwxLjI2OSwwdjEuMjdBLjYzNS42MzUsMCwwLDEsMzQuOTI1LDguODg5Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjE4IiBkYXRhLW5hbWU9IlBhdGggMjIyMTgiIGQ9Ik0zNC45MjUsMjEuNTg4YS42MzUuNjM1LDAsMCwxLS42MzQtLjYzNXYtMS4yN2EuNjM1LjYzNSwwLDEsMSwxLjI2OSwwdjEuMjdBLjYzNS42MzUsMCwwLDEsMzQuOTI1LDIxLjU4OFptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIxOSIgZGF0YS1uYW1lPSJQYXRoIDIyMjE5IiBkPSJNNjcuMzc5LDgwSDU1Ljk1N2ExLjI2OSwxLjI2OSwwLDAsMS0xLjI3LTEuMjY5VjU3LjEyMWExLjI3LDEuMjcsMCwwLDEsMS4yNy0xLjI3SDY3LjM3OWExLjI2OSwxLjI2OSwwLDAsMSwxLjI2OSwxLjI3Vjc4LjczMUExLjI2OSwxLjI2OSwwLDAsMSw2Ny4zNzksODBabS0xMC4xNTItMi41NGg4Ljg4MlY1OC4zOTFINTcuMjI3Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./src/assets/images/service/service-icon-3.svg":
/*!******************************************************!*\
  !*** ./src/assets/images/service/service-icon-3.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMTAxIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAxMDEiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcng9IjEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NzkgOTY2KSIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvY2xpcFBhdGg+DQogIDwvZGVmcz4NCiAgPGcgaWQ9Ik1hc2tfR3JvdXBfNCIgZGF0YS1uYW1lPSJNYXNrIEdyb3VwIDQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzkgLTk2NikiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgpIj4NCiAgICA8ZyBpZD0ibmV0d29yayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDc5IDk2NikiPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMjAiIGRhdGEtbmFtZT0iUGF0aCAyMjIyMCIgZD0iTTQwLDI0LjEzN2ExLjM3OCwxLjM3OCwwLDAsMS0xLjM3OS0xLjM4VjE1LjE3OGExLjM3OSwxLjM3OSwwLDEsMSwyLjc1OCwwdjcuNTc5QTEuMzc5LDEuMzc5LDAsMCwxLDQwLDI0LjEzN1ptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIyMSIgZGF0YS1uYW1lPSJQYXRoIDIyMjIxIiBkPSJNMzMuMSw5LjY1NUgxNS4xNzJhMS4zNzksMS4zNzksMCwxLDEsMC0yLjc1OEgzMy4xYTEuMzc5LDEuMzc5LDAsMSwxLDAsMi43NThabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMjIiIGRhdGEtbmFtZT0iUGF0aCAyMjIyMiIgZD0iTTguMjc2LDM0LjQ3NkExLjM4LDEuMzgsMCwwLDEsNi45LDMzLjFWMTUuMTc0YTEuMzc5LDEuMzc5LDAsMSwxLDIuNzU4LDBWMzMuMUExLjM3OSwxLjM3OSwwLDAsMSw4LjI3NiwzNC40NzZabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMjMiIGRhdGEtbmFtZT0iUGF0aCAyMjIyMyIgZD0iTTIyLjcwNiw0MS4zOEgxNS4xNzNhMS4zNzksMS4zNzksMCwxLDEsMC0yLjc1OGg3LjUzM2ExLjM3OSwxLjM3OSwwLDEsMSwwLDIuNzU4Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjI0IiBkYXRhLW5hbWU9IlBhdGggMjIyMjQiIGQ9Ik04LjI3NiwxNi41NTJhOC4yNzYsOC4yNzYsMCwxLDEsOC4yNzYtOC4yNzZBOC4yODUsOC4yODUsMCwwLDEsOC4yNzYsMTYuNTUyWm0wLTEzLjc5NGE1LjUxNyw1LjUxNywwLDEsMCw1LjUxNyw1LjUxOEE1LjUyMyw1LjUyMywwLDAsMCw4LjI3NiwyLjc1OFptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIyNSIgZGF0YS1uYW1lPSJQYXRoIDIyMjI1IiBkPSJNNDAsMTYuNTUyYTguMjc2LDguMjc2LDAsMSwxLDguMjc2LTguMjc2QTguMjg1LDguMjg1LDAsMCwxLDQwLDE2LjU1MlpNNDAsMi43NThhNS41MTcsNS41MTcsMCwxLDAsNS41MTgsNS41MThBNS41MjMsNS41MjMsMCwwLDAsNDAsMi43NThabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMjYiIGRhdGEtbmFtZT0iUGF0aCAyMjIyNiIgZD0iTTguMjc2LDQ4LjI3NkE4LjI3Niw4LjI3NiwwLDEsMSwxNi41NTIsNDBhOC4yODUsOC4yODUsMCwwLDEtOC4yNzYsOC4yNzZabTAtMTMuNzkzQTUuNTE3LDUuNTE3LDAsMSwwLDEzLjc5Myw0MCw1LjUyMyw1LjUyMywwLDAsMCw4LjI3NiwzNC40ODNabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMjciIGRhdGEtbmFtZT0iUGF0aCAyMjIyNyIgZD0iTTY0LjgyOCw0MS4zOEg1Ni41NTJhMS4zNzksMS4zNzksMCwxLDEsMC0yLjc1OGg4LjI3NWExLjM3OSwxLjM3OSwwLDEsMSwwLDIuNzU4Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjI4IiBkYXRhLW5hbWU9IlBhdGggMjIyMjgiIGQ9Ik00MCw2Ni4yYTEuMzc4LDEuMzc4LDAsMCwxLTEuMzc5LTEuMzc5VjU2LjU1NWExLjM3OSwxLjM3OSwwLDAsMSwyLjc1OCwwdjguMjY2QTEuMzc4LDEuMzc4LDAsMCwxLDQwLDY2LjJabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMjkiIGRhdGEtbmFtZT0iUGF0aCAyMjIyOSIgZD0iTTY0LjgyOCw3My4xSDQ2LjlhMS4zNzksMS4zNzksMCwwLDEsMC0yLjc1OEg2NC44MjhhMS4zNzksMS4zNzksMCwxLDEsMCwyLjc1OFptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIzMCIgZGF0YS1uYW1lPSJQYXRoIDIyMjMwIiBkPSJNNzEuNzI1LDY2LjIwNmExLjM3OCwxLjM3OCwwLDAsMS0xLjM4LTEuMzc5VjQ2LjlhMS4zNzksMS4zNzksMCwxLDEsMi43NTgsMFY2NC44MjdBMS4zNzgsMS4zNzgsMCwwLDEsNzEuNzI1LDY2LjIwNlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIzMSIgZGF0YS1uYW1lPSJQYXRoIDIyMjMxIiBkPSJNNzEuNzI1LDQ4LjI3NkE4LjI3Niw4LjI3NiwwLDEsMSw4MCw0MGE4LjI4NSw4LjI4NSwwLDAsMS04LjI3NSw4LjI3NlptMC0xMy43OTNBNS41MTcsNS41MTcsMCwxLDAsNzcuMjQyLDQwLDUuNTIzLDUuNTIzLDAsMCwwLDcxLjcyNSwzNC40ODNabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMzIiIGRhdGEtbmFtZT0iUGF0aCAyMjIzMiIgZD0iTTQwLDgwYTguMjc2LDguMjc2LDAsMSwxLDguMjc2LTguMjc1QTguMjg1LDguMjg1LDAsMCwxLDQwLDgwWm0wLTEzLjc5M2E1LjUxNyw1LjUxNywwLDEsMCw1LjUxOCw1LjUxOEE1LjUyMyw1LjUyMywwLDAsMCw0MCw2Ni4yMDdabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMzMiIGRhdGEtbmFtZT0iUGF0aCAyMjIzMyIgZD0iTTcxLjcyNSw4MEE4LjI3Niw4LjI3NiwwLDEsMSw4MCw3MS43MjUsOC4yODUsOC4yODUsMCwwLDEsNzEuNzI1LDgwWm0wLTEzLjc5M2E1LjUxNyw1LjUxNywwLDEsMCw1LjUxNyw1LjUxOEE1LjUyMyw1LjUyMywwLDAsMCw3MS43MjUsNjYuMjA3Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjM0IiBkYXRhLW5hbWU9IlBhdGggMjIyMzQiIGQ9Ik00MCw1Ny45MzFBMTcuOTMxLDE3LjkzMSwwLDEsMSw1Ny45MzEsNDAsMTcuOTUxLDE3Ljk1MSwwLDAsMSw0MCw1Ny45MzFabTAtMzMuMUExNS4xNzMsMTUuMTczLDAsMSwwLDU1LjE3Myw0MCwxNS4xOSwxNS4xOSwwLDAsMCw0MCwyNC44MjdabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMzUiIGRhdGEtbmFtZT0iUGF0aCAyMjIzNSIgZD0iTTM1LjUzOCwzMi4zNzdhLjIyOC4yMjgsMCwwLDEsLjI0Mi0uMjQxaDYuMWMzLjQ3MywwLDUuMTEzLDEuNzM2LDUuMTEzLDQuMzY1YTMuNjUsMy42NSwwLDAsMS0xLjksMy40NzN2LjA0OGEzLjg3MSwzLjg3MSwwLDAsMSwyLjE5NCwzLjY5MWMwLDMuMjU1LTIuMDUsNC44MjMtNS42NDQsNC44MjNoLTUuODZhLjIyOC4yMjgsMCwwLDEtLjI0Mi0uMjQxWm02LjI3MSw2LjU4NGEyLjE2NiwyLjE2NiwwLDEsMCwwLTQuMzE3SDM4LjUyOGEuMTI4LjEyOCwwLDAsMC0uMTQ0LjE0NHY0LjAyOWEuMTI4LjEyOCwwLDAsMCwuMTQ0LjE0NFptLTMuMjgxLDcuMDY4aDMuNDI1YTIuMjg4LDIuMjg4LDAsMSwwLDAtNC41NTlIMzguNTI4YS4xMjguMTI4LDAsMCwwLS4xNDQuMTQ1djQuMjY5YS4xMjguMTI4LDAsMCwwLC4xNDQuMTQ1Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjM2IiBkYXRhLW5hbWU9IlBhdGggMjIyMzYiIGQ9Ik00MCwzNC40ODNhMS4zNzgsMS4zNzgsMCwwLDEtMS4zNzktMS4zOFYzMC4zNDVhMS4zNzksMS4zNzksMCwxLDEsMi43NTgsMFYzMy4xQTEuMzc5LDEuMzc5LDAsMCwxLDQwLDM0LjQ4M1ptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIzNyIgZGF0YS1uYW1lPSJQYXRoIDIyMjM3IiBkPSJNNDAsNTEuMDM1YTEuMzc4LDEuMzc4LDAsMCwxLTEuMzc5LTEuMzc5di0xLjM4YTEuMzc5LDEuMzc5LDAsMSwxLDIuNzU4LDB2MS4zOEExLjM3OCwxLjM3OCwwLDAsMSw0MCw1MS4wMzVabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./src/assets/images/service/service-icon-4.svg":
/*!******************************************************!*\
  !*** ./src/assets/images/service/service-icon-4.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMTAxIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAxMDEiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcng9IjEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NzkgOTY2KSIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvY2xpcFBhdGg+DQogIDwvZGVmcz4NCiAgPGcgaWQ9Ik1hc2tfR3JvdXBfMiIgZGF0YS1uYW1lPSJNYXNrIEdyb3VwIDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzkgLTk2NikiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgpIj4NCiAgICA8ZyBpZD0iYml0Y29pbl8yXyIgZGF0YS1uYW1lPSJiaXRjb2luICgyKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDc5IDk2Ny41MykiPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIxOTQiIGRhdGEtbmFtZT0iUGF0aCAyMjE5NCIgZD0iTTU0LjQ1OSw2NS4zNjJhMS4yNywxLjI3LDAsMCwxLS40OS0yLjQ0MWw3LjMzOS0zLjA3MmExLjMsMS4zLDAsMCwxLC41MDktLjFsNi4zLjA5MmExLjI3LDEuMjcsMCwwLDEtLjAxOSwyLjU0aC0uMDE5bC02LjAzNC0uMDg4LTcuMDk1LDIuOTdhMS4yNjcsMS4yNjcsMCwwLDEtLjQ5LjFabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIxOTUiIGRhdGEtbmFtZT0iUGF0aCAyMjE5NSIgZD0iTTEyLjAxMyw0NS44MzZhMS4yNywxLjI3LDAsMCwxLS4wMjktMi41NGwxMC41LS4yMzgsNC4wOTQtMS4xMDVhMS42NjQsMS42NjQsMCwwLDEsLjM0Ny0uMDQ0bDkuNDMzLjEwOCw0LjUtMy42OGExLjI2MiwxLjI2MiwwLDAsMSwuODEzLS4yODZsOC43NzYuMDY4YTEuMjY5LDEuMjY5LDAsMCwxLC42Ni4xOTFsNy43NDUsNC44MDgsOS4yNTcuMDg0YTEuMjcsMS4yNywwLDAsMS0uMDEyLDIuNTRoLS4wMTFsLTkuNjEzLS4wODlhMS4yNjIsMS4yNjIsMCwwLDEtLjY1OC0uMTkxbC03Ljc0NC00LjgwNy03Ljk2LS4wNjItNC41LDMuNjgxYTEuNDY0LDEuNDY0LDAsMCwxLS44MTguMjg2bC05LjcxOC0uMTFMMjMsNDUuNTUxYTEuMzMxLDEuMzMxLDAsMCwxLS4zLjA0NGwtMTAuNjU1LjI0MmgtLjAyOFptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjE5NiIgZGF0YS1uYW1lPSJQYXRoIDIyMTk2IiBkPSJNNTQuMzg1LDY1LjQzMWExLjI2MywxLjI2MywwLDAsMS0uOTI1LS40TDQyLjMxNiw1My4xNjVsLTYuNzU1LDQuNzdhNS43NTUsNS43NTUsMCwwLDEtNS43NjYuNDI5LDEuMjU5LDEuMjU5LDAsMCwxLS44ODMtLjRsLS43MjgtLjc3NmEuMDEzLjAxMywwLDAsMCwwLS4wMDUsMS4yNjMsMS4yNjMsMCwwLDEtLjM0MS0uOTUxLDUuNTIyLDUuNTIyLDAsMCwxLDEtNS41OTRMMzkuNjg1LDM4LjYyNmExLjI3MSwxLjI3MSwwLDAsMSwuOTMtLjQxOWwxMC4xMzktLjFhMS4xNDksMS4xNDksMCwwLDEsLjcuMkw1OSw0My4xNDVsOC41Mi0uMDIyaDBhMS4yNywxLjI3LDAsMCwxLDAsMi41NGwtOC44OTQuMDIzYTEuNzQsMS43NCwwLDAsMS0uNjktLjJMNTAuNCw0MC42NWwtOS4yLjA5LTEwLjQ2OCwxMS42YTIuOTgsMi45OCwwLDAsMC0uMjg1LDMuNDY0LDMuMjc1LDMuMjc1LDAsMCwwLDMuNjUzLjA1Nmw3LjY1Ni01LjQwNWExLjI2OCwxLjI2OCwwLDAsMSwxLjY1Ny4xNjdsMTEuOSwxMi42N2ExLjI3LDEuMjcsMCwwLDEtLjkyNiwyLjEzOVptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjE5NyIgZGF0YS1uYW1lPSJQYXRoIDIyMTk3IiBkPSJNMzguMzUyLDc2LjkzMmE1LjQ3Nyw1LjQ3NywwLDAsMS0zLjU4Ni0xLjI4MkwxOS42NTIsNjIuMTczbC04LjIxOC4wMjVoMGExLjI3LDEuMjcsMCwwLDEsMC0yLjU0bDguNy0uMDI2YTEuMjcsMS4yNywwLDAsMSwuODQ5LjMyM2wxNS40NzcsMTMuOGEzLjA3NiwzLjA3NiwwLDAsMCwyLjg2OS40NTZMNTQuODA4LDY3LjQ4Yy4yMjMtLjEuMzc4LS4yMzIuNC0uMzVhLjY1Mi42NTIsMCwwLDAtLjIzMi0uNDgxTDUzLjQ1OSw2NS4wM2ExLjI3LDEuMjcsMCwxLDEsMS44NTMtMS43MzhsMS41MTksMS42MThhMi45MzMsMi45MzMsMCwwLDEtMS4wMTEsNC45TDQwLjMzOSw3Ni41NDFhNS4wMDksNS4wMDksMCwwLDEtMS45ODcuMzkyWm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMTk4IiBkYXRhLW5hbWU9IlBhdGggMjIxOTgiIGQ9Ik00My4zOCw3NC44YTEuMjY0LDEuMjY0LDAsMCwxLS44MTctLjNsLTYuNDI1LTUuNDE4YTEuMjcsMS4yNywwLDEsMSwxLjYzNy0xLjk0Mkw0NC4yLDcyLjU2MWExLjI3LDEuMjcsMCwwLDEtLjgyLDIuMjQxWm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMTk5IiBkYXRhLW5hbWU9IlBhdGggMjIxOTkiIGQ9Ik00Ny45NzcsNzIuNjE1YTEuMjYzLDEuMjYzLDAsMCwxLS44NDktLjMyNWwtNS45LTUuM2ExLjI3LDEuMjcsMCwwLDEsMS43LTEuODlsNS45LDUuM2ExLjI3LDEuMjcsMCwwLDEtLjg0NywyLjIxNVptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIwMCIgZGF0YS1uYW1lPSJQYXRoIDIyMjAwIiBkPSJNNTIuOTk0LDcwLjQzOGExLjI2NiwxLjI2NiwwLDAsMS0uODQ5LS4zMjVsLTYuMzg1LTUuNzI0YTEuMjcsMS4yNywwLDAsMSwxLjctMS44OWw2LjM4NSw1LjcyNGExLjI3LDEuMjcsMCwwLDEtLjg0OCwyLjIxNVptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIwMSIgZGF0YS1uYW1lPSJQYXRoIDIyMjAxIiBkPSJNMTEuNDI5LDY2LjA0SDEuMjdBMS4yNywxLjI3LDAsMCwxLDAsNjQuNzY5VjQwLjY0MmExLjI2OSwxLjI2OSwwLDAsMSwxLjI3LTEuMjY5SDExLjQyOUExLjI2OCwxLjI2OCwwLDAsMSwxMi43LDQwLjY0MlY2NC43NjlBMS4yNjksMS4yNjksMCwwLDEsMTEuNDI5LDY2LjA0Wk0yLjU0LDYzLjVoNy42MTlWNDEuOTEySDIuNTRabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMDIiIGRhdGEtbmFtZT0iUGF0aCAyMjIwMiIgZD0iTTYuMzQ5LDYyLjIzYTIuNTQsMi41NCwwLDEsMSwyLjU0LTIuNTQsMi41NDMsMi41NDMsMCwwLDEtMi41NCwyLjU0Wm0wLTIuNTQydjBabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMDMiIGRhdGEtbmFtZT0iUGF0aCAyMjIwMyIgZD0iTTc4LjczMSw2Ni4wNEg2OC41NzJhMS4yNywxLjI3LDAsMCwxLTEuMjctMS4yN1Y0MC42NDJhMS4yNjksMS4yNjksMCwwLDEsMS4yNy0xLjI2OUg3OC43MzFBMS4yNjgsMS4yNjgsMCwwLDEsODAsNDAuNjQyVjY0Ljc2OUExLjI2OSwxLjI2OSwwLDAsMSw3OC43MzEsNjYuMDRaTTY5Ljg0MSw2My41SDc3LjQ2VjQxLjkxMkg2OS44NDFabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfMjIyMDQiIGRhdGEtbmFtZT0iUGF0aCAyMjIwNCIgZD0iTTczLjY1MSw2Mi4yM2EyLjU0LDIuNTQsMCwxLDEsMi41NC0yLjU0QTIuNTQzLDIuNTQzLDAsMCwxLDczLjY1MSw2Mi4yM1ptMC0yLjU0MnYwWm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjA1IiBkYXRhLW5hbWU9IlBhdGggMjIyMDUiIGQ9Ik0yMi44NTcsNDAuNjQyYTEuMjY5LDEuMjY5LDAsMCwxLTEuMjY5LTEuMjY5di01LjA4SDIwLjhhNC4zLDQuMywwLDAsMS00LjMtNC4zVjQuM2E0LjMsNC4zLDAsMCwxLDQuMy00LjNINjAuNDY3YTQuMyw0LjMsMCwwLDEsNC4zLDQuM1YzMGE0LjMsNC4zLDAsMCwxLTQuMyw0LjNIMjguMDQ2TDIzLjg5LDQwLjExYTEuMjcxLDEuMjcxLDAsMCwxLTEuMDMzLjUzMlpNMjAuOCwyLjU0N0ExLjc1OCwxLjc1OCwwLDAsMCwxOS4wNDcsNC4zVjMwQTEuNzU4LDEuNzU4LDAsMCwwLDIwLjgsMzEuNzU0aDIuMDUzYTEuMjcsMS4yNywwLDAsMSwxLjI3LDEuMjd2Mi4zODdsMi4yMzItMy4xMjVhMS4yNjgsMS4yNjgsMCwwLDEsMS4wMzMtLjUzMkg2MC40NjdBMS43NTgsMS43NTgsMCwwLDAsNjIuMjIzLDMwVjQuM2ExLjc1OCwxLjc1OCwwLDAsMC0xLjc1Ni0xLjc1NlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIwNiIgZGF0YS1uYW1lPSJQYXRoIDIyMjA2IiBkPSJNNDAuNjM1LDI3Ljk0NEExMS40MjksMTEuNDI5LDAsMSwxLDUyLjA2NCwxNi41MTUsMTEuNDQxLDExLjQ0MSwwLDAsMSw0MC42MzUsMjcuOTQ0Wm0wLTIwLjMxOGE4Ljg4OSw4Ljg4OSwwLDEsMCw4Ljg4OSw4Ljg4OSw4LjksOC45LDAsMCwwLTguODg5LTguODg5Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjA3IiBkYXRhLW5hbWU9IlBhdGggMjIyMDciIGQ9Ik0zNi45NzQsMTAuNTkzYS4xNjQuMTY0LDAsMCwxLC4xNzQtLjE3NGg0LjQxN2MyLjUxNCwwLDMuNywxLjI1NiwzLjcsMy4xNTlhMi42NDMsMi42NDMsMCwwLDEtMS4zNzksMi41MTR2LjAzNGEyLjgsMi44LDAsMCwxLDEuNTksMi42NzFjMCwyLjM1OC0xLjQ4NCwzLjQ5Mi00LjA4NiwzLjQ5MkgzNy4xNDhhLjE2NC4xNjQsMCwwLDEtLjE3NC0uMTc0Wm00LjUzOSw0Ljc2NmExLjU2OCwxLjU2OCwwLDEsMCwwLTMuMTI1SDM5LjEzOGEuMDkyLjA5MiwwLDAsMC0uMTA1LjF2Mi45MTdhLjA5Mi4wOTIsMCwwLDAsLjEwNS4xWm0tMi4zNzUsNS4xMTVoMi40NzlhMS42NTYsMS42NTYsMCwxLDAsMC0zLjNIMzkuMTM4YS4wOTMuMDkzLDAsMCwwLS4xMDUuMTA1djMuMDg5YS4wOTMuMDkzLDAsMCwwLC4xMDUuMTA2Wm0wLDAiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzIyMjA4IiBkYXRhLW5hbWU9IlBhdGggMjIyMDgiIGQ9Ik00MCwxMS40MzZhLjYzNS42MzUsMCwwLDEtLjYzNS0uNjM1VjkuNTMxYS42MzUuNjM1LDAsMCwxLDEuMjcsMFYxMC44QS42MzUuNjM1LDAsMCwxLDQwLDExLjQzNlptMCwwIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF8yMjIwOSIgZGF0YS1uYW1lPSJQYXRoIDIyMjA5IiBkPSJNNDAsMjQuMTM0YS42MzUuNjM1LDAsMCwxLS42MzUtLjYzNVYyMi4yM2EuNjM1LjYzNSwwLDEsMSwxLjI3LDBWMjMuNUEuNjM1LjYzNSwwLDAsMSw0MCwyNC4xMzRabTAsMCIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./src/assets/images/users-map.png":
/*!*****************************************!*\
  !*** ./src/assets/images/users-map.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABS0AAAKMCAIAAACB8ArtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA3LTI0VDIxOjMyOjA1KzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNy0yNFQyMTozOTo1OCswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wNy0yNFQyMTozOTo1OCswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3YWJiZTdjMi0xNzJhLWNiNGItOTY4OC1jMjU4ZmIxNjE2ZjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N2FiYmU3YzItMTcyYS1jYjRiLTk2ODgtYzI1OGZiMTYxNmY3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6N2FiYmU3YzItMTcyYS1jYjRiLTk2ODgtYzI1OGZiMTYxNmY3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YWJiZTdjMi0xNzJhLWNiNGItOTY4OC1jMjU4ZmIxNjE2ZjciIHN0RXZ0OndoZW49IjIwMjAtMDctMjRUMjE6MzI6MDUrMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz44cE/SAAAPZklEQVR4nO3XMQEAIAzAMMC/zunARTlIFPTtnpkFAAAAJM7rAAAAAPiIDwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAICODwcAAIDOBQ2sB8qKpixQAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/assets/images/wallet-image.svg":
/*!********************************************!*\
  !*** ./src/assets/images/wallet-image.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/wallet-image-1f98fd986e48495881590feb237a7fda.svg";

/***/ }),

/***/ "./src/assets/theme/index.js":
/*!***********************************!*\
  !*** ./src/assets/theme/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const GlobalStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__["createGlobalStyle"]`

::selection {
    background: #333333;
    color: #ffffff;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *:focus {
    outline: none;
  }

html{
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
}

body,html {
    
    margin: 0px;

}
body {
  font-size: 16px;
  line-height: 28px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.bodyColor ? props.theme.bodyColor : '#BEABDF'};
  overflow-x: hidden !important;
  font-weight: 400;
  margin: 0;
  padding: 0;

    background: rgb(0, 27, 71);
    background: linear-gradient(167deg, rgba(0, 27, 71,1) 0%, rgba(54,63,159,1) 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.headingColor ? props.theme.headingColor : '#FFFFFF'};  
}

p{
  font-family: sans-serif;
    margin: 0 0 15px 0;
}

a{
    text-decoration: none;
    color: ${props => props.theme.headingColor};
  }
  img{
    max-width: 100%;
  }


section{
    position: relative;
}

.text-center{
  text-align: center;
}

button, .btn{
  display: inline-block;
  width: 170px;
  height: 60px;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

}
`;
/* harmony default export */ __webpack_exports__["default"] = (GlobalStyle);

/***/ }),

/***/ "./src/assets/theme/theme.js":
/*!***********************************!*\
  !*** ./src/assets/theme/theme.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const theme = {
  black: '#333333',
  white: '#ffffff',
  primaryColor: '#004085',
  primaryHoverColor: '#cce5ff',
  secondaryColor: '#383d41',
  headingColor: '#FFFFFF',
  bodyColor: '#BEABDF',
  linkColor: '#1F2AD5',
  NavBG: 'transparent',
  NavBGSolid: '#290E59',
  menuHoverColor: '#1F2AD5'
};
/* harmony default export */ __webpack_exports__["default"] = (theme); // bodyColor: '#BEABDF',

/***/ }),

/***/ "./src/reusecore/Accordion/accordion.style.js":
/*!****************************************************!*\
  !*** ./src/reusecore/Accordion/accordion.style.js ***!
  \****************************************************/
/*! exports provided: AccordionWrapper, AccordionItemWrapper, OpenIcon, CloseIcon, AccordionTitleWrapper, AccordionItemButtonWrapper, AccordionBodyWrapper, IconWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionWrapper", function() { return AccordionWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionItemWrapper", function() { return AccordionItemWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenIcon", function() { return OpenIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloseIcon", function() { return CloseIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionTitleWrapper", function() { return AccordionTitleWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionItemButtonWrapper", function() { return AccordionItemButtonWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionBodyWrapper", function() { return AccordionBodyWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconWrapper", function() { return IconWrapper; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-accessible-accordion */ "react-accessible-accordion");
/* harmony import */ var react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__);


const fadeIn = styled_components__WEBPACK_IMPORTED_MODULE_0__["keyframes"]`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const AccordionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__["Accordion"])``;
const AccordionItemWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__["AccordionItem"])``;
const OpenIcon = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div``;
const CloseIcon = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  opacity: 0;
`;
const AccordionTitleWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__["AccordionItemHeading"])`
  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    &[aria-expanded='false'] {
      ${OpenIcon} {
        opacity: 0;
      }
      ${CloseIcon} {
        opacity: 1;
      }
    }
  }

  &:focus {
    outline: none;
  }
  * {
    flex-grow: 1;
  }
`;
const AccordionItemButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__["AccordionItemButton"])``;
const AccordionBodyWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_1__["AccordionItemPanel"])`
  animation: 0.35s ${fadeIn} ease-in;
  &.accordion__body--hidden {
    animation: 0.35s ${fadeIn} ease-in;
  }
`;
const IconWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  margin-left: 30px;
  width: 40px;
  position: relative;
  ${OpenIcon},
  ${CloseIcon}{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: 0.25s ease-in-out;
    color: white;
  }
`;

/***/ }),

/***/ "./src/reusecore/Accordion/index.js":
/*!******************************************!*\
  !*** ./src/reusecore/Accordion/index.js ***!
  \******************************************/
/*! exports provided: Accordion, AccordionItem, AccordionTitle, AccordionBody, IconWrapper, OpenIcon, CloseIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return Accordion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionItem", function() { return AccordionItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionTitle", function() { return AccordionTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionBody", function() { return AccordionBody; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_accessible_accordion_dist_fancy_example_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-accessible-accordion/dist/fancy-example.css */ "./node_modules/react-accessible-accordion/dist/fancy-example.css");
/* harmony import */ var react_accessible_accordion_dist_fancy_example_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_accessible_accordion_dist_fancy_example_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _accordion_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordion.style */ "./src/reusecore/Accordion/accordion.style.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconWrapper", function() { return _accordion_style__WEBPACK_IMPORTED_MODULE_2__["IconWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpenIcon", function() { return _accordion_style__WEBPACK_IMPORTED_MODULE_2__["OpenIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CloseIcon", function() { return _accordion_style__WEBPACK_IMPORTED_MODULE_2__["CloseIcon"]; });

var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Accordion/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Accordion = ({
  className,
  children,
  allowZeroExpanded,
  preExpanded
}) => {
  // Add all classs to an array
  const addAllClasses = ['reusecore__accordion']; // className prop checking

  if (className) {
    addAllClasses.push(className);
  }

  return __jsx(_accordion_style__WEBPACK_IMPORTED_MODULE_2__["AccordionWrapper"], {
    allowZeroExpanded: allowZeroExpanded,
    className: addAllClasses.join(' '),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 5
    }
  }, children);
};

const AccordionItem = ({
  className,
  children
}) => {
  // Add all classs to an array
  const addAllClasses = ['accordion__item']; // className prop checking

  if (className) {
    addAllClasses.push(className);
  }

  return __jsx(_accordion_style__WEBPACK_IMPORTED_MODULE_2__["AccordionItemWrapper"], {
    className: addAllClasses.join(' '),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }
  }, children);
};

const AccordionTitle = ({
  className,
  children
}) => {
  // Add all classs to an array
  const addAllClasses = ['accordion__header']; // className prop checking

  if (className) {
    addAllClasses.push(className);
  }

  return __jsx(_accordion_style__WEBPACK_IMPORTED_MODULE_2__["AccordionTitleWrapper"], {
    className: addAllClasses.join(' '),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 5
    }
  }, __jsx(_accordion_style__WEBPACK_IMPORTED_MODULE_2__["AccordionItemButtonWrapper"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, children));
};

const AccordionBody = ({
  className,
  children
}) => {
  // Add all classs to an array
  const addAllClasses = ['accordion__body']; // className prop checking

  if (className) {
    addAllClasses.push(className);
  }

  return __jsx(_accordion_style__WEBPACK_IMPORTED_MODULE_2__["AccordionBodyWrapper"], {
    className: addAllClasses.join(' '),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 5
    }
  }, children);
};



/***/ }),

/***/ "./src/reusecore/Badge/index.js":
/*!**************************************!*\
  !*** ./src/reusecore/Badge/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Badge/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const BadgeWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div`
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  ${props => props.textColor && styled_components__WEBPACK_IMPORTED_MODULE_2__["css"]`
      color: ${props.textColor};
    `}
  ${props => props.bg && styled_components__WEBPACK_IMPORTED_MODULE_2__["css"]`
      background-color: ${props.bg};
    `};
  :hover {
    opacity: 0.8;
  }
`;

const Badge = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  return __jsx(BadgeWrapper, _extends({}, props, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 10
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (Badge);
Badge.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired,
  textColor: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  bg: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};

/***/ }),

/***/ "./src/reusecore/Box/index.js":
/*!************************************!*\
  !*** ./src/reusecore/Box/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Box/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const BoxWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div``;

const Box = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["box"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(BoxWrapper, _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }), children);
};

Box.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired,
  as: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["div", "section", "article", "header", "footer", "address", "nav", "main"])
};
/* harmony default export */ __webpack_exports__["default"] = (Box);

/***/ }),

/***/ "./src/reusecore/Button/button.style.js":
/*!**********************************************!*\
  !*** ./src/reusecore/Button/button.style.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const ButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.button`
  /* display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; */

  ${props => props.btnColor ? styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
          color: ${props.btnColor};
        ` : styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
          color: inherit;
        `}
  ${props => props.btnBg ? styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
          background-color: ${props.btnBg};
        ` : styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
          background-color: #ddd;
        `}
`;
/* harmony default export */ __webpack_exports__["default"] = (ButtonWrapper);

/***/ }),

/***/ "./src/reusecore/Button/index.js":
/*!***************************************!*\
  !*** ./src/reusecore/Button/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _button_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button.style */ "./src/reusecore/Button/button.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Button/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Button = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["btn"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(_button_style__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }), children);
};

Button.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired,
  as: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["button", "a", "span", "div"]) //--

};
/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/reusecore/Counter/index.js":
/*!****************************************!*\
  !*** ./src/reusecore/Counter/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-countup */ "react-countup");
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_visibility_sensor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-visibility-sensor */ "react-visibility-sensor");
/* harmony import */ var react_visibility_sensor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_visibility_sensor__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Counter/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Counter = _ref => {
  let {
    className
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["className"]);

  const {
    0: viewPortEntered,
    1: setViewPortEntered
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  return __jsx(react_countup__WEBPACK_IMPORTED_MODULE_1___default.a, _extends({}, rest, {
    start: viewPortEntered ? null : 0,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }), ({
    countUpRef
  }) => {
    return __jsx(react_visibility_sensor__WEBPACK_IMPORTED_MODULE_2___default.a, {
      active: !viewPortEntered,
      onChange: isVisible => {
        if (isVisible) {
          setViewPortEntered(true);
        }
      },
      delayedCall: true,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 11
      }
    }, __jsx("span", {
      className: className,
      ref: countUpRef,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 13
      }
    }));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Counter);

/***/ }),

/***/ "./src/reusecore/Form/Input/index.js":
/*!*******************************************!*\
  !*** ./src/reusecore/Form/Input/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _input_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.style */ "./src/reusecore/Form/Input/input.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Form/Input/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Input = _ref => {
  let {
    //   type,
    placeholder,
    name,
    onChange,
    onBulr,
    onFocus
  } = _ref,
      props = _objectWithoutProperties(_ref, ["placeholder", "name", "onChange", "onBulr", "onFocus"]);

  const AllClasses = ["input__wrapper"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(_input_style__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }, __jsx("input", _extends({
    placeholder: placeholder,
    name: name
  }, props, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  })));
}; // Input.propTypes = {
//     type: PropTypes.oneOf['text', 'email', 'password', 'number'],
//     placeholder: PropTypes.string,
//     name: PropTypes.string,
//     onChange: PropTypes.func,
//     onBulr: PropTypes.func,
//     onFocus: PropTypes.func 
// }
// Input.defaultProps = {
//     type: 'text',   
// }


/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/reusecore/Form/Input/input.style.js":
/*!*************************************************!*\
  !*** ./src/reusecore/Form/Input/input.style.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const InputWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  input {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid transparent;
    border-radius: .25rem;
    ${props => props.BorderColor && styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`  border-color: red `}
  }

  
`;
/* harmony default export */ __webpack_exports__["default"] = (InputWrapper);

/***/ }),

/***/ "./src/reusecore/Heading/index.js":
/*!****************************************!*\
  !*** ./src/reusecore/Heading/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Heading/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const HeadingWrap = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.h1`
  ${props => props.UpperCase && Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["css"])({
  textTransform: "uppercase"
})}
  ${props => props.HeadingColor && Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["css"])({
  color: props.HeadingColor
})}
`;

const Heading = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["heading"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(HeadingWrap, _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 5
    }
  }), children);
};

Heading.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired,
  //--
  as: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"])
};
/* harmony default export */ __webpack_exports__["default"] = (Heading);

/***/ }),

/***/ "./src/reusecore/Image/index.js":
/*!**************************************!*\
  !*** ./src/reusecore/Image/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Image/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const ImageWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.img`
    width: 100%;
    height: auto;
    display: block;
`;

const Image = _ref => {
  let {
    src,
    alt
  } = _ref,
      props = _objectWithoutProperties(_ref, ["src", "alt"]);

  const AllClasses = ["image"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  ;
  return __jsx(ImageWrapper, _extends({
    src: src,
    alt: alt
  }, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Image);

/***/ }),

/***/ "./src/reusecore/Layout/Col/col.style.js":
/*!***********************************************!*\
  !*** ./src/reusecore/Layout/Col/col.style.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const ColWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  position: relative;  
  padding-right: 15px;
  padding-left: 15px; 

  &.p-0{
    padding: 0;
  }

  &.col-1 {
  flex: 0 0 auto;
  width: 8.333333%;
}

  &.col-2 {
  flex: 0 0 auto;
  width: 16.666667%;
}

&.col-3 {
  flex: 0 0 auto;
  width: 25%;
}

&.col-4 {
  flex: 0 0 auto;
  width: 33.333333%;
}

&.col-5 {
  flex: 0 0 auto;
  width: 41.666667%;
}

&.col-6 {
  flex: 0 0 auto;
  width: 50%;
}

&.col-7 {
  flex: 0 0 auto;
  width: 58.333333%;
}

&.col-8 {
  flex: 0 0 auto;
  width: 66.666667%;
}

&.col-9 {
  flex: 0 0 auto;
  width: 75%;
}

&.col-10 {
  flex: 0 0 auto;
  width: 83.333333%;
}

&.col-11 {
  flex: 0 0 auto;
  width: 91.666667%;
}

&.col-12 {
  flex: 0 0 auto;
  width: 100%;
}

&.offset-1 {
  margin-left: 8.333333%;
}

&.offset-2 {
  margin-left: 16.666667%;
}

&.offset-3 {
  margin-left: 25%;
}

&.offset-4 {
  margin-left: 33.333333%;
}

&.offset-5 {
  margin-left: 41.666667%;
}

&.offset-6 {
  margin-left: 50%;
}

&.offset-7 {
  margin-left: 58.333333%;
}

&.offset-8 {
  margin-left: 66.666667%;
}

&.offset-9 {
  margin-left: 75%;
}

&.offset-10 {
  margin-left: 83.333333%;
}

&.offset-11 {
  margin-left: 91.666667%;
}   

@media only screen and (min-width: 320px) {
  &.xs-1 {
      -ms-flex: 0 0 8.333333%;
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    }
    &.xs-2 {
      -ms-flex: 0 0 16.666667%;
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
    }
    &.xs-3 {
      -ms-flex: 0 0 25%;
      flex: 0 0 25%;
      max-width: 25%;
    }
    &.xs-4 {
      -ms-flex: 0 0 33.333333%;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
    }
    &.xs-5 {
      -ms-flex: 0 0 41.666667%;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    }
    &.xs-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
    }
    &.xs-7 {
      -ms-flex: 0 0 58.333333%;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
    }
    &.xs-8 {
      -ms-flex: 0 0 66.666667%;
      flex: 0 0 66.666667%;
      max-width: 66.666667%;
    }
    &.xs-9 {
      -ms-flex: 0 0 75%;
      flex: 0 0 75%;
      max-width: 75%;
    }
    &.xs-10 {
      -ms-flex: 0 0 83.333333%;
      flex: 0 0 83.333333%;
      max-width: 83.333333%;
    }
    &.xs-11 {
      -ms-flex: 0 0 91.666667%;
      flex: 0 0 91.666667%;
      max-width: 91.666667%;
    }
    &.xs-12 {
      -ms-flex: 0 0 100%;
      flex: 0 0 100%;
      max-width: 100%;
    }

    &.order-xs-first {
      -ms-flex-order: -1;
      order: -1;
    }
    &.order-xs-last {
      -ms-flex-order: 13;
      order: 13;
    }
    &.order-xs-0 {
      -ms-flex-order: 0;
      order: 0;
    }
    &.order-xs-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    &.order-xs-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    &.order-xs-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    &.order-xs-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    &.order-xs-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    &.order-xs-6 {
      -ms-flex-order: 6;
      order: 6;
    }
    &.order-xs-7 {
      -ms-flex-order: 7;
      order: 7;
    }
    &.order-xs-8 {
      -ms-flex-order: 8;
      order: 8;
    }
    &.order-xs-9 {
      -ms-flex-order: 9;
      order: 9;
    }
    &.order-xs-10 {
      -ms-flex-order: 10;
      order: 10;
    }
    &.order-xs-11 {
      -ms-flex-order: 11;
      order: 11;
    }
    &.order-xs-12 {
      -ms-flex-order: 12;
      order: 12;
    }
    &.offset-xs-0 {
      margin-left: 0;
    }
    &.offset-xs-1 {
      margin-left: 8.333333%;
    }
    &.offset-xs-2 {
      margin-left: 16.666667%;
    }
    &.offset-xs-3 {
      margin-left: 25%;
    }
    &.offset-xs-4 {
      margin-left: 33.333333%;
    }
    &.offset-xs-5 {
      margin-left: 41.666667%;
    }
    &.offset-xs-6 {
      margin-left: 50%;
    }
    &.offset-xs-7 {
      margin-left: 58.333333%;
    }
    &.offset-xs-8 {
      margin-left: 66.666667%;
    }
    &.offset-xs-9 {
      margin-left: 75%;
    }
    &.offset-xs-10 {
      margin-left: 83.333333%;
    }
    &.offset-xs-11 {
      margin-left: 91.666667%;
    }
  }

  @media (min-width: 576px) {
    &.sm-1 {
      -ms-flex: 0 0 8.333333%;
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    }
    &.sm-2 {
      -ms-flex: 0 0 16.666667%;
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
    }
    &.sm-3 {
      -ms-flex: 0 0 25%;
      flex: 0 0 25%;
      max-width: 25%;
    }
    &.sm-4 {
      -ms-flex: 0 0 33.333333%;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
    }
    &.sm-5 {
      -ms-flex: 0 0 41.666667%;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    }
    &.sm-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
    }
    &.sm-7 {
      -ms-flex: 0 0 58.333333%;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
    }
    &.sm-8 {
      -ms-flex: 0 0 66.666667%;
      flex: 0 0 66.666667%;
      max-width: 66.666667%;
    }
    &.sm-9 {
      -ms-flex: 0 0 75%;
      flex: 0 0 75%;
      max-width: 75%;
    }
    &.sm-10 {
      -ms-flex: 0 0 83.333333%;
      flex: 0 0 83.333333%;
      max-width: 83.333333%;
    }
    &.sm-11 {
      -ms-flex: 0 0 91.666667%;
      flex: 0 0 91.666667%;
      max-width: 91.666667%;
    }
    &.sm-12 {
      -ms-flex: 0 0 100%;
      flex: 0 0 100%;
      max-width: 100%;
    }
    &.order-sm-first {
      -ms-flex-order: -1;
      order: -1;
    }
    &.order-sm-last {
      -ms-flex-order: 13;
      order: 13;
    }
    &.order-sm-0 {
      -ms-flex-order: 0;
      order: 0;
    }
    &.order-sm-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    &.order-sm-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    &.order-sm-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    &.order-sm-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    &.order-sm-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    &.order-sm-6 {
      -ms-flex-order: 6;
      order: 6;
    }
    &.order-sm-7 {
      -ms-flex-order: 7;
      order: 7;
    }
    &.order-sm-8 {
      -ms-flex-order: 8;
      order: 8;
    }
    &.order-sm-9 {
      -ms-flex-order: 9;
      order: 9;
    }
    &.order-sm-10 {
      -ms-flex-order: 10;
      order: 10;
    }
    &.order-sm-11 {
      -ms-flex-order: 11;
      order: 11;
    }
    &.order-sm-12 {
      -ms-flex-order: 12;
      order: 12;
    }
    &.offset-sm-0 {
      margin-left: 0;
    }
    &.offset-sm-1 {
      margin-left: 8.333333%;
    }
    &.offset-sm-2 {
      margin-left: 16.666667%;
    }
    &.offset-sm-3 {
      margin-left: 25%;
    }
    &.offset-sm-4 {
      margin-left: 33.333333%;
    }
    &.offset-sm-5 {
      margin-left: 41.666667%;
    }
    &.offset-sm-6 {
      margin-left: 50%;
    }
    &.offset-sm-7 {
      margin-left: 58.333333%;
    }
    &.offset-sm-8 {
      margin-left: 66.666667%;
    }
    &.offset-sm-9 {
      margin-left: 75%;
    }
    &.offset-sm-10 {
      margin-left: 83.333333%;
    }
    &.offset-sm-11 {
      margin-left: 91.666667%;
    }
  }

  @media (min-width: 768px) {
    &.md-1 {
      -ms-flex: 0 0 8.333333%;
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    }
    &.md-2 {
      -ms-flex: 0 0 16.666667%;
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
    }
    &.md-3 {
      -ms-flex: 0 0 25%;
      flex: 0 0 25%;
      max-width: 25%;
    }
    &.md-4 {
      -ms-flex: 0 0 33.333333%;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
    }
    &.md-5 {
      -ms-flex: 0 0 41.666667%;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    }
    &.md-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
    }
    &.md-7 {
      -ms-flex: 0 0 58.333333%;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
    }
    &.md-8 {
      -ms-flex: 0 0 66.666667%;
      flex: 0 0 66.666667%;
      max-width: 66.666667%;
    }
    &.md-9 {
      -ms-flex: 0 0 75%;
      flex: 0 0 75%;
      max-width: 75%;
    }
    &.md-10 {
      -ms-flex: 0 0 83.333333%;
      flex: 0 0 83.333333%;
      max-width: 83.333333%;
    }
    &.md-11 {
      -ms-flex: 0 0 91.666667%;
      flex: 0 0 91.666667%;
      max-width: 91.666667%;
    }
    &.md-12 {
      -ms-flex: 0 0 100%;
      flex: 0 0 100%;
      max-width: 100%;
    }
    &.order-md-first {
      -ms-flex-order: -1;
      order: -1;
    }
    &.order-md-last {
      -ms-flex-order: 13;
      order: 13;
    }
    &.order-md-0 {
      -ms-flex-order: 0;
      order: 0;
    }
    &.order-md-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    &.order-md-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    &.order-md-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    &.order-md-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    &.order-md-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    &.order-md-6 {
      -ms-flex-order: 6;
      order: 6;
    }
    &.order-md-7 {
      -ms-flex-order: 7;
      order: 7;
    }
    &.order-md-8 {
      -ms-flex-order: 8;
      order: 8;
    }
    &.order-md-9 {
      -ms-flex-order: 9;
      order: 9;
    }
    &.order-md-10 {
      -ms-flex-order: 10;
      order: 10;
    }
    &.order-md-11 {
      -ms-flex-order: 11;
      order: 11;
    }
    &.order-md-12 {
      -ms-flex-order: 12;
      order: 12;
    }
    &.offset-md-0 {
      margin-left: 0;
    }
    &.offset-md-1 {
      margin-left: 8.333333%;
    }
    &.offset-md-2 {
      margin-left: 16.666667%;
    }
    &.offset-md-3 {
      margin-left: 25%;
    }
    &.offset-md-4 {
      margin-left: 33.333333%;
    }
    &.offset-md-5 {
      margin-left: 41.666667%;
    }
    &.offset-md-6 {
      margin-left: 50%;
    }
    &.offset-md-7 {
      margin-left: 58.333333%;
    }
    &.offset-md-8 {
      margin-left: 66.666667%;
    }
    &.offset-md-9 {
      margin-left: 75%;
    }
    &.offset-md-10 {
      margin-left: 83.333333%;
    }
    &.offset-md-11 {
      margin-left: 91.666667%;
    }
  }
  @media (min-width: 992px) {
    &.lg-1 {
      -ms-flex: 0 0 8.333333%;
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    }
    &.lg-2 {
      -ms-flex: 0 0 16.666667%;
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
    }
    &.lg-3 {
      -ms-flex: 0 0 25%;
      flex: 0 0 25%;
      max-width: 25%;
    }
    &.lg-4 {
      -ms-flex: 0 0 33.333333%;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
    }
    &.lg-5 {
      -ms-flex: 0 0 41.666667%;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    }
    &.lg-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
    }
    &.lg-7 {
      -ms-flex: 0 0 58.333333%;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
    }
    &.lg-8 {
      -ms-flex: 0 0 66.666667%;
      flex: 0 0 66.666667%;
      max-width: 66.666667%;
    }
    &.lg-9 {
      -ms-flex: 0 0 75%;
      flex: 0 0 75%;
      max-width: 75%;
    }
    &.lg-10 {
      -ms-flex: 0 0 83.333333%;
      flex: 0 0 83.333333%;
      max-width: 83.333333%;
    }
    &.lg-11 {
      -ms-flex: 0 0 91.666667%;
      flex: 0 0 91.666667%;
      max-width: 91.666667%;
    }
    &.lg-12 {
      -ms-flex: 0 0 100%;
      flex: 0 0 100%;
      max-width: 100%;
    }
    &.order-lg-first {
      -ms-flex-order: -1;
      order: -1;
    }
    &.order-lg-last {
      -ms-flex-order: 13;
      order: 13;
    }
    &.order-lg-0 {
      -ms-flex-order: 0;
      order: 0;
    }
    &.order-lg-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    &.order-lg-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    &.order-lg-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    &.order-lg-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    &.order-lg-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    &.order-lg-6 {
      -ms-flex-order: 6;
      order: 6;
    }
    &.order-lg-7 {
      -ms-flex-order: 7;
      order: 7;
    }
    &.order-lg-8 {
      -ms-flex-order: 8;
      order: 8;
    }
    &.order-lg-9 {
      -ms-flex-order: 9;
      order: 9;
    }
    &.order-lg-10 {
      -ms-flex-order: 10;
      order: 10;
    }
    &.order-lg-11 {
      -ms-flex-order: 11;
      order: 11;
    }
    &.order-lg-12 {
      -ms-flex-order: 12;
      order: 12;
    }
    &.offset-lg-0 {
      margin-left: 0;
    }
    &.offset-lg-1 {
      margin-left: 8.333333%;
    }
    &.offset-lg-2 {
      margin-left: 16.666667%;
    }
    &.offset-lg-3 {
      margin-left: 25%;
    }
    &.offset-lg-4 {
      margin-left: 33.333333%;
    }
    &.offset-lg-5 {
      margin-left: 41.666667%;
    }
    &.offset-lg-6 {
      margin-left: 50%;
    }
    &.offset-lg-7 {
      margin-left: 58.333333%;
    }
    &.offset-lg-8 {
      margin-left: 66.666667%;
    }
    &.offset-lg-9 {
      margin-left: 75%;
    }
    &.offset-lg-10 {
      margin-left: 83.333333%;
    }
    &.offset-lg-11 {
      margin-left: 91.666667%;
    }
  }

  @media (min-width: 1200px) {
    &.xl-1 {
      -ms-flex: 0 0 8.333333%;
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    }
    &.xl-2 {
      -ms-flex: 0 0 16.666667%;
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
    }
    &.xl-3 {
      -ms-flex: 0 0 25%;
      flex: 0 0 25%;
      max-width: 25%;
    }
    &.xl-4 {
      -ms-flex: 0 0 33.333333%;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
    }
    &.xl-5 {
      -ms-flex: 0 0 41.666667%;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    }
    &.xl-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
    }
    &.xl-7 {
      -ms-flex: 0 0 58.333333%;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
    }
    &.xl-8 {
      -ms-flex: 0 0 66.666667%;
      flex: 0 0 66.666667%;
      max-width: 66.666667%;
    }
    &.xl-9 {
      -ms-flex: 0 0 75%;
      flex: 0 0 75%;
      max-width: 75%;
    }
    &.xl-10 {
      -ms-flex: 0 0 83.333333%;
      flex: 0 0 83.333333%;
      max-width: 83.333333%;
    }
    &.xl-11 {
      -ms-flex: 0 0 91.666667%;
      flex: 0 0 91.666667%;
      max-width: 91.666667%;
    }
    &.xl-12 {
      -ms-flex: 0 0 100%;
      flex: 0 0 100%;
      max-width: 100%;
    }
    &.xl-first {
      -ms-flex-order: -1;
      order: -1;
    }
    &.xl-last {
      -ms-flex-order: 13;
      order: 13;
    }
    &.order-xl-0 {
      -ms-flex-order: 0;
      order: 0;
    }
    &.order-xl-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    &.order-xl-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    &.order-xl-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    &.order-xl-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    &.order-xl-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    &.order-xl-6 {
      -ms-flex-order: 6;
      order: 6;
    }
    &.order-xl-7 {
      -ms-flex-order: 7;
      order: 7;
    }
    &.order-xl-8 {
      -ms-flex-order: 8;
      order: 8;
    }
    &.order-xl-9 {
      -ms-flex-order: 9;
      order: 9;
    }
    &.order-xl-10 {
      -ms-flex-order: 10;
      order: 10;
    }
    &.order-xl-11 {
      -ms-flex-order: 11;
      order: 11;
    }
    &.order-xl-12 {
      -ms-flex-order: 12;
      order: 12;
    }
    &.offset-xl-0 {
      margin-left: 0;
    }
    &.offset-xl-1 {
      margin-left: 8.333333%;
    }
    &.offset-xl-2 {
      margin-left: 16.666667%;
    }
    &.offset-xl-3 {
      margin-left: 25%;
    }
    &.offset-xl-4 {
      margin-left: 33.333333%;
    }
    &.offset-xl-5 {
      margin-left: 41.666667%;
    }
    &.offset-xl-6 {
      margin-left: 50%;
    }
    &.offset-xl-7 {
      margin-left: 58.333333%;
    }
    &.offset-xl-8 {
      margin-left: 66.666667%;
    }
    &.offset-xl-9 {
      margin-left: 75%;
    }
    &.offset-xl-10 {
      margin-left: 83.333333%;
    }
    &.offset-xl-11 {
      margin-left: 91.666667%;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (ColWrapper);

/***/ }),

/***/ "./src/reusecore/Layout/Col/index.js":
/*!*******************************************!*\
  !*** ./src/reusecore/Layout/Col/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _col_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./col.style */ "./src/reusecore/Layout/Col/col.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Layout/Col/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Col = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["col"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(_col_style__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 5
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (Col);
Col.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired
};

/***/ }),

/***/ "./src/reusecore/Layout/Container/container.style.js":
/*!***********************************************************!*\
  !*** ./src/reusecore/Layout/Container/container.style.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const ContainerWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  position: relative;

  @media (min-width: 568px) {
    max-width: 100%;
  }
  @media (min-width: 576px) {
    max-width: 95%;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  
  &.fluid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (ContainerWrapper);

/***/ }),

/***/ "./src/reusecore/Layout/Container/index.js":
/*!*************************************************!*\
  !*** ./src/reusecore/Layout/Container/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _container_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container.style */ "./src/reusecore/Layout/Container/container.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Layout/Container/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Container = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["container"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(_container_style__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 5
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (Container);
Container.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired
};

/***/ }),

/***/ "./src/reusecore/Layout/Row/index.js":
/*!*******************************************!*\
  !*** ./src/reusecore/Layout/Row/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _row_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./row.style */ "./src/reusecore/Layout/Row/row.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Layout/Row/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Row = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["row"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(_row_style__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 5
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (Row);
Row.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired
};

/***/ }),

/***/ "./src/reusecore/Layout/Row/row.style.js":
/*!***********************************************!*\
  !*** ./src/reusecore/Layout/Row/row.style.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const RowWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  &.no-gutters {
    margin-right: 0;
    margin-left: 0;
  }

  &.no-gutters > .col,
  &.no-gutters > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (RowWrapper);

/***/ }),

/***/ "./src/reusecore/Layout/index.js":
/*!***************************************!*\
  !*** ./src/reusecore/Layout/index.js ***!
  \***************************************/
/*! exports provided: Container, Row, Col */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ "./src/reusecore/Layout/Container/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _Container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Row */ "./src/reusecore/Layout/Row/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _Row__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Col */ "./src/reusecore/Layout/Col/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Col", function() { return _Col__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/reusecore/List/index.js":
/*!*************************************!*\
  !*** ./src/reusecore/List/index.js ***!
  \*************************************/
/*! exports provided: List, ListItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItem", function() { return ListItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/List/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const ListWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const ListItemWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.li``;
const List = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["list"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(ListWrapper, _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 5
    }
  }), children);
};
const ListItem = _ref2 => {
  let {
    children
  } = _ref2,
      props = _objectWithoutProperties(_ref2, ["children"]);

  const AllClasses = ["list__item"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(ListItemWrapper, _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 5
    }
  }), children);
};

/***/ }),

/***/ "./src/reusecore/SectionTitle/index.js":
/*!*********************************************!*\
  !*** ./src/reusecore/SectionTitle/index.js ***!
  \*********************************************/
/*! exports provided: SectionTitle, SectionBackground */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionTitle", function() { return SectionTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionBackground", function() { return SectionBackground; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Badge */ "./src/reusecore/Badge/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var _sectionTitle_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sectionTitle.style */ "./src/reusecore/SectionTitle/sectionTitle.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/SectionTitle/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









const SectionTitle = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["title__wrapper"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(_sectionTitle_style__WEBPACK_IMPORTED_MODULE_7__["SectionTitleWrapper"], _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }), children);
};
const SectionBackground = ({
  children
}) => {
  return __jsx(_sectionTitle_style__WEBPACK_IMPORTED_MODULE_7__["SectionBgWrapper"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }, children);
};

/***/ }),

/***/ "./src/reusecore/SectionTitle/sectionTitle.style.js":
/*!**********************************************************!*\
  !*** ./src/reusecore/SectionTitle/sectionTitle.style.js ***!
  \**********************************************************/
/*! exports provided: SectionTitleWrapper, SectionBgWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionTitleWrapper", function() { return SectionTitleWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionBgWrapper", function() { return SectionBgWrapper; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_section_title_bg_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/section-title-bg.png */ "./src/assets/images/section-title-bg.png");
/* harmony import */ var assets_images_section_title_bg_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_section_title_bg_png__WEBPACK_IMPORTED_MODULE_1__);


const SectionTitleWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  .heading {
    font-size: 36px;
    font-weight: 700;
    line-height: 46px;
    margin: 0;
  }

  .text {
    margin-top: 27px;
  }
`;
const SectionBgWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`

  // background: url(${assets_images_section_title_bg_png__WEBPACK_IMPORTED_MODULE_1___default.a});
  background-repeat: no-repeat;
  background-size: auto;
  background-position: left;
  .heading {
    // padding: 10px 0 10px 22px;
    padding: 0px 0 10px 22px;
  }
`; // background: url(${SectionBG});

/***/ }),

/***/ "./src/reusecore/Text/index.js":
/*!*************************************!*\
  !*** ./src/reusecore/Text/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/reusecore/Text/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const TextWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.p`
  margin-top: 0;
  margin-bottom: 1rem; 
  ${props => props.FontSize && styled_components__WEBPACK_IMPORTED_MODULE_2__["css"]`
      font-size: ${props.FontSize};
    `}
  ${props => props.TextColor && styled_components__WEBPACK_IMPORTED_MODULE_2__["css"]`
      color: ${props.TextColor};
    `}
`;

const Text = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const AllClasses = ["text"];

  if (props.className) {
    AllClasses.push(props.className);
  }

  return __jsx(TextWrapper, _extends({}, props, {
    className: AllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (Text);
Text.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired,
  as: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["p", "span", "strong", "em"])
};
Text.defaultProps = {
  as: "p"
};

/***/ }),

/***/ "./src/sections/About/about.style.js":
/*!*******************************************!*\
  !*** ./src/sections/About/about.style.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_about_bg_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/about-bg.png */ "./src/assets/images/about-bg.png");
/* harmony import */ var assets_images_about_bg_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_about_bg_png__WEBPACK_IMPORTED_MODULE_1__);


const AboutSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 85px 0;

  background: url(${assets_images_about_bg_png__WEBPACK_IMPORTED_MODULE_1___default.a});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .about-list {
    margin-top: 24px;
    span {
      font-size: 18px;
      display: block;
      position: relative;
      padding-left: 43px;
      color: #fff;
      margin-bottom: 20px;

      &::before {
        position: absolute;
        left: 0;
        top: 0;
        height: 30px;
        width: 30px;
        background: transparent;
        border: 8px solid #c838e7;
        border-radius: 50%;
        content: " ";
      }

      &:nth-child(2) {
        &::before {
          border-color: #6df7fb;
        }
      }
      &:nth-child(3) {
        &::before {
          border-color: #4268db;
        }
      }
    }
  }

  .about-btn-wrapper {
    a + a {
      margin-left: 20px;
    }

    a {
      display: inline-flex;
      border-color: #fff;
      justify-content: center;
      align-items: center;
      margin-top: 53px;
      transition: all 0.3s ease-in;
      &:hover{
        
      }
      svg {
        margin-right: 10px;
        font-size: 23px;
      }

      &:hover,
      &.btn-fill {
        border: none;
        background: rgb(37, 42, 213);
        background: -moz-linear-gradient(
          93deg,
          rgba(37, 42, 213, 1) 0%,
          rgba(122, 49, 222, 1) 52%,
          rgba(196, 56, 231, 1) 100%
        );
        background: -webkit-linear-gradient(
          93deg,
          rgba(37, 42, 213, 1) 0%,
          rgba(122, 49, 222, 1) 52%,
          rgba(196, 56, 231, 1) 100%
        );
        background: linear-gradient(
          93deg,
          rgba(37, 42, 213, 1) 0%,
          rgba(122, 49, 222, 1) 52%,
          rgba(196, 56, 231, 1) 100%
        );
      }
    }
  }

  @media only screen and (max-width: 912px) {
    .about-image {
      margin-top: 70px;
    }
    .title__wrapper {
      .heading {
        font-size: 30px;
      }
    }
    .about-list {
      span {
        font-size: 17px;
        &::before {
          top: 3px;
          width: 25px;
          height: 25px;
        }
      }
    }

    .about-btn-wrapper {
      a {
        width: 155px;
        font-size: 14px;
        margin-top: 40px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .about-image {
      width: 400px;
      margin: 0 auto 50px auto;
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 375px) {
    .title__wrapper .heading {
      font-size: 25px;
      line-height: 35px;
    }
    .about-btn-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      a {
        &:last-child {
          margin: 20px 0 0;
        }
      }
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (AboutSectionWrapper);

/***/ }),

/***/ "./src/sections/About/index.js":
/*!*************************************!*\
  !*** ./src/sections/About/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var assets_images_about_about_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/images/about/about.svg */ "./src/assets/images/about/about.svg");
/* harmony import */ var assets_images_about_about_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(assets_images_about_about_svg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _about_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./about.style */ "./src/sections/About/about.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/About/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;













const About = () => {
  return __jsx(_about_style__WEBPACK_IMPORTED_MODULE_11__["default"], {
    id: "about",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 17
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 21
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "lg-5 md-6 sm-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 25
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_7__["default"], {
    src: assets_images_about_about_svg__WEBPACK_IMPORTED_MODULE_10___default.a,
    className: "about-image",
    alt: "cryptik about image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 29
    }
  })), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "lg-6 offset-lg-1 md-6 sm-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 25
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "about-right-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 29
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_8__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 33
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_8__["SectionBackground"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 37
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__["default"], {
    as: "h1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 41
    }
  }, "Providing investors more than 500% APY")), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 37
    }
  }, "Holders have the oppurtunity to earn up to 500% APY from the activities that happens in the market place. As the token holders buy, sale, refer or hold the Panache Token and as the more liquidity are provided in the Panache trading pool. Trading fee are compounded and distributed ")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "about-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 33
    }
  }, __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 37
    }
  }, "90% Distributed to Community."), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 37
    }
  }, "3% Reserved Funding."), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 37
    }
  }, "7% Founders and Team Management.")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "about-btn-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 33
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 37
    }
  }, __jsx("a", {
    className: "btn btn-fill",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 53
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaGooglePlay"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 82
    }
  }), " Buy Token")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 37
    }
  }, __jsx("a", {
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 52
    }
  }, __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaApple"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 71
    }
  }), "Visit the marketplace"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (About);

/***/ }),

/***/ "./src/sections/Awards/awards.style.js":
/*!*********************************************!*\
  !*** ./src/sections/Awards/awards.style.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const AwardsSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 85px 0;
  .heading {
    padding-right: 103px;
  }
  .col:nth-of-type(odd) {
    .awards-item {
      margin-right: 10px;
    }
  }

  .awards-item-wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .awards-item {
      display: flex;
      width: 100%;
      color: #fff;
      align-items: center;
      padding: 20px 0 20px 10px;
      margin-bottom: 10px;
      background: rgb(0, 27, 71);
      // background: #2b1867;
      border-radius: 5px;
      cursor: pointer;
      &.active,
      &:hover {
        background: rgb(32, 47, 213);
        background: linear-gradient(
          90deg,
          rgba(32, 47, 213, 1) 0%,
          rgba(139, 51, 224, 1) 57%,
          rgba(195, 56, 231, 1) 100%
        );
        box-shadow: 0px 0px 17px #221156;
      }

      .award-icon {
        margin-right: 50px;
        font-size: 30px;
      }

      .counter-text {
        span {
          display: block;

          &:first-child {
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 5px;
          }

          &.text {
            margin: 0;
            color: #beabdf;
            font-family: Open sans;
            font-weight: 700;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    .awards-item-wrapper{
      .awards-item{
        padding: 20px 0 20px 30px;
        .award-icon{
          margin-right: 30px;
        }
      }
    }  
  }
  @media only screen and (max-width: 912px) {
    .awards-item-wrapper{
      .awards-item{
        padding: 20px 0 20px 15px;
        .counter-text {
          span:first-child{
            font-size: 23px;
          }
        }
        .award-icon{
          margin-right: 15px;
        }
      }
    }  
  }
  @media only screen and (max-width: 736px) {
    .title__wrapper{
      margin-bottom: 50px;
    }
    .awards-item-wrapper{
      .awards-item{
        padding: 20px 0 20px 30px;
        .counter-text {
          span:first-child{
            font-size: 30px;
          }
        }
        .award-icon{
          margin-right: 30px;
        }
      }
    }  
  }
  @media only screen and (max-width: 480px) {
    padding: 50px 0;
  }
  @media only screen and (max-width: 480px) {
    .heading{
      padding-right: 0;
      font-size: 30px;
    }
    .awards-col{
      width: 100%;
    }
    .awards-item-wrapper{
      flex-direction: column;
      width: 100%;
      .awards-item{
        width: 100%;
        margin-bottom: 30px;
      }
    }  
  }
  @media only screen and (max-width: 375px) {
    .heading{
      font-size: 25px;
      line-height: 35px;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (AwardsSectionWrapper);

/***/ }),

/***/ "./src/sections/Awards/index.js":
/*!**************************************!*\
  !*** ./src/sections/Awards/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Counter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Counter */ "./src/reusecore/Counter/index.js");
/* harmony import */ var assets_data_awards__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/data/awards */ "./src/assets/data/awards/index.js");
/* harmony import */ var _awards_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./awards.style */ "./src/sections/Awards/awards.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Awards/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;










const Awards = () => {
  return __jsx(_awards_style__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "awards-section",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "md-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "awards-left-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 15
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_1__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_1__["SectionBackground"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 19
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "h1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 21
    }
  }, "Why become a Community Holder?")), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 19
    }
  }, "Panache Token allows you to access and position your lifesteyle giving you the opptunity to live your best life while still earning a living out of it.")))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "md-6 awards-col",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "awards-item-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 15
    }
  }, assets_data_awards__WEBPACK_IMPORTED_MODULE_7__["default"].awards.map((item, index) => __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: `awards-item ${index === 3 ? `active` : ""}`,
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 19
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "counter-text",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 21
    }
  }, " ", __jsx(reusecore_Counter__WEBPACK_IMPORTED_MODULE_6__["default"], {
    end: item.count,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 23
    }
  }), " ", __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_5__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 23
    }
  }, item.body), " ")))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Awards);

/***/ }),

/***/ "./src/sections/BannerTwo/banner.style.js":
/*!************************************************!*\
  !*** ./src/sections/BannerTwo/banner.style.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_bkg_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/bkg.jpg */ "./src/assets/images/bkg.jpg");
/* harmony import */ var assets_images_bkg_jpg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_bkg_jpg__WEBPACK_IMPORTED_MODULE_1__);


const BannerWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  position: relative;
  overflow: hidden;
  width:100vw;
  height:auto;
  padding: 278px 0 150px 0;
  background: #001b47;
  // background: -webkit-linear-gradient(rgba(29, 38, 113, 0.8), rgba(195, 55, 100, 0.8)), url(${assets_images_bkg_jpg__WEBPACK_IMPORTED_MODULE_1___default.a});
  // background: linear-gradient(rgba(29, 38, 113, 0.8), rgba(195, 55, 100, 0.8)), url(${assets_images_bkg_jpg__WEBPACK_IMPORTED_MODULE_1___default.a})); 
  // background-repeat:none;

  .banner__thumb{
    position: absolute;
    right: -4%;
    top: -12%;
    width: 40%;
  }
  .banner-panache{
    background-size:cover;
    width:60%
  }

  .section__particle {
    position: absolute;
    &.top-left {
      left: -98px;
      top: -60px;
      height: 150px;
    }
    &.top-right {
      top: 65px;
      right: 28px;
      height: 74px;
    }
    &.bottom-left {
      bottom: 0px;
      left: 15px;
      height: 150px;
    }
    &.two {
      top: 6px;
      left: 140px;
      height: 87px;
    }
    &.bottom-right {
      right: -40px;
      bottom: 0px;
      height: 200px;
    }
  }

  .banner-content {
    .heading {
      margin: 0 0 38px 0;
      font-size: 55px;
      line-height: 75px;
      font-weight: 900;
    }

    .text {
      margin-bottom: 55px;
    }

    .banner-btn {
      margin-top: 45px;
      display:flex;
      justify-content:space-evenly;
      a {
        width: 235px;
        font-size: 16px;
        color: #ffffff;
        padding: 18px 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        svg{
          margin-right: 10px;
        }
      }

      .btn-fill {
        transition: all 0.3s ease-in;
        background: rgb(37, 42, 213);
        background: linear-gradient(
          93deg,
          rgba(252, 165, 3, 1) 0%,
          rgba(227, 197, 113, 1) 42%,
          rgba(150, 112, 3, 1) 100%
        );
        &:hover{
          background: linear-gradient(
          93deg,
          rgba(150, 3, 3, 1) 0%,
          rgba(232, 128, 128, 1) 52%,
          rgba(255, 0, 0, 1) 100%
        );
        }
      }
    }

    .coin-info {
      display: flex;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        margin: 12px 25px 5px 25px;

        .text {
          margin: 0;
        }

        img {
          width: 25px;
          margin-right: 15px;
        }
      }
    }

    .description {
      position: relative;
      display: block;
      line-height: 28px;
      font-size: 18px;
      padding-left: 30px;
      margin: 0 0 17px 0;

      &:before {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        content: "";
        background: #b096df;
      }
    }
  }

  @keyframes bounce-up-down {
    from {
      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: 200px 200px;
      transform-origin: 200px 200px;
    }
    33% {
      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: 180px 220px;
      transform-origin: 1000px 220px;
    }
    66% {
      -webkit-transform: rotate(1deg);
      -webkit-transform-origin: 200px 200px;
      transform-origin: 1500px 200px;
    }
    to {
      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: 200px 200px;
      transform-origin: 200px 200px;
    }
  }

  @-webkit-keyframes bounce-up-down {
    from {
      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: 200px 200px;
      transform-origin: 200px 200px;
    }
    33% {
      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: 180px 220px;
      transform-origin: 1000px 220px;
    }
    66% {
      -webkit-transform: rotate(1deg);
      -webkit-transform-origin: 200px 200px;
      transform-origin: 1500px 200px;
    }
    to {
      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: 200px 200px;
      transform-origin: 200px 200px;
    }
  }

  @keyframes opacity-controll {
    0%   { opacity: 1; }
    25%  { opacity: 0.8; }
    50%  { opacity: 0.6; }
    75%  { opacity: 0.2; }
    100% { opacity: 0; }
  }
  @-webkit-keyframes opacity-controll {
    0%   { opacity: 1; }
    25%  { opacity: 0.8; }
    50%  { opacity: 0.6; }
    75%  { opacity: 0.2; }
    100% { opacity: 0; }
  }

  #Path_46973{
    animation: opacity-controll 1.5s infinite; /* IE 10+, Fx 29+ */
  }
  #Path_46974{
    animation: opacity-controll 1.7s infinite; /* IE 10+, Fx 29+ */
  }
  #Path_46975{
    animation: opacity-controll 1.9s infinite; /* IE 10+, Fx 29+ */
  }
  #Path_46976{
    animation: opacity-controll 2s infinite; /* IE 10+, Fx 29+ */
  }

  @media only screen and (max-width: 1024px) { 
    .banner__thumb{
      right: 0;
    }
    .banner-content {
      .heading{
        font-size: 45px;
        line-height: 65px;
        font-weight: 600;
      }
    }
  }
  @media only screen and (max-width: 912px) { 
    padding: 215px 0 150px 0;
    .banner__thumb{
      display: none;
    }
    .banner-content {
      .heading{
        font-size: 40px;
        line-height: 60px;
      }
    }
  }
  @media only screen and (max-width: 768px) { 
    padding: 180px 0 120px 0;
    .banner-content {
      .heading{
        font-size: 35px;
        line-height: 50px;
      }
    }
  }
  @media only screen and (max-width: 480px) { 
    .banner-content {
      .heading{
        font-size: 30px;
        line-height: 50px;
        br{
          display: none;
        }
      }
      .text{
        br{
          display: none;
        }
      }
    }
    .section__particle{
      &.bottom-right{
        display: none;
      }
    }
  }
  @media only screen and (max-width: 375px) { 
    .banner-content {
      .heading{
        font-size: 28px;
        line-height: 40px;
      }
      .description{
        font-size: 16px;
        line-height: 26px;
        padding-left: 20px;
      }
      .coin-info{
        div{
          margin: 12px 8px 5px 8px;
          img{
            margin-right: 10px;
          }
        }
      }
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (BannerWrapper);

/***/ }),

/***/ "./src/sections/BannerTwo/index.js":
/*!*****************************************!*\
  !*** ./src/sections/BannerTwo/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Badge */ "./src/reusecore/Badge/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_two_thumb_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/images/banners/banner-two/cryptik-banner-two-thumb.svg */ "./src/assets/images/banners/banner-two/cryptik-banner-two-thumb.svg");
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_two_thumb_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(assets_images_banners_banner_two_cryptik_banner_two_thumb_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var assets_images_particles_banner_particle_top_left_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! assets/images/particles/banner/particle-top-left.png */ "./src/assets/images/particles/banner/particle-top-left.png");
/* harmony import */ var assets_images_particles_banner_particle_top_left_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(assets_images_particles_banner_particle_top_left_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var assets_images_particles_banner_particle_under_logo_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/images/particles/banner/particle-under-logo.png */ "./src/assets/images/particles/banner/particle-under-logo.png");
/* harmony import */ var assets_images_particles_banner_particle_under_logo_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(assets_images_particles_banner_particle_under_logo_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var assets_images_particles_banner_prticle_top_right_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! assets/images/particles/banner/prticle-top-right.png */ "./src/assets/images/particles/banner/prticle-top-right.png");
/* harmony import */ var assets_images_particles_banner_prticle_top_right_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(assets_images_particles_banner_prticle_top_right_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var assets_images_particles_banner_particle_bottom_left_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! assets/images/particles/banner/particle-bottom-left.png */ "./src/assets/images/particles/banner/particle-bottom-left.png");
/* harmony import */ var assets_images_particles_banner_particle_bottom_left_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(assets_images_particles_banner_particle_bottom_left_png__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var assets_images_particles_banner_particle_bottom_right_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! assets/images/particles/banner/particle-bottom-right.png */ "./src/assets/images/particles/banner/particle-bottom-right.png");
/* harmony import */ var assets_images_particles_banner_particle_bottom_right_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(assets_images_particles_banner_particle_bottom_right_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_key_icon_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! assets/images/banners/banner-two/cryptik-banner-key-icon.svg */ "./src/assets/images/banners/banner-two/cryptik-banner-key-icon.svg");
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_key_icon_svg__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(assets_images_banners_banner_two_cryptik_banner_key_icon_svg__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_watch_icon_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! assets/images/banners/banner-two/cryptik-banner-watch-icon.svg */ "./src/assets/images/banners/banner-two/cryptik-banner-watch-icon.svg");
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_watch_icon_svg__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(assets_images_banners_banner_two_cryptik_banner_watch_icon_svg__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_heart_icon_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! assets/images/banners/banner-two/cryptik-banner-heart-icon.svg */ "./src/assets/images/banners/banner-two/cryptik-banner-heart-icon.svg");
/* harmony import */ var assets_images_banners_banner_two_cryptik_banner_heart_icon_svg__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(assets_images_banners_banner_two_cryptik_banner_heart_icon_svg__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var assets_images_panache_banner_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! assets/images/panache-banner.png */ "./src/assets/images/panache-banner.png");
/* harmony import */ var assets_images_panache_banner_png__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(assets_images_panache_banner_png__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _banner_style__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./banner.style */ "./src/sections/BannerTwo/banner.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/BannerTwo/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





















const BannerTwo = () => {
  return __jsx(_banner_style__WEBPACK_IMPORTED_MODULE_19__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_7__["default"], {
    src: assets_images_panache_banner_png__WEBPACK_IMPORTED_MODULE_18___default.a,
    className: "banner__thumb",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 8
    }
  }), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "lg-7 md-10 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "banner-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 15
    }
  }, "PANACHE: Access and ", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 44
    }
  }), "position your lifestyle"), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    className: "description",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 15
    }
  }, "Holders earn passive rewards through static reflection while watching their balance of ", __jsx("b", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 104
    }
  }, "$PANACHE"), " grow indefinitely"), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    className: "description",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 15
    }
  }, "Panache Token allows you to access and position your lifesteyle giving you the opptunity to live your best life while still earning a living out of it."), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    className: "description",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 15
    }
  }, " Holders earn more trading rewards as exchange happen betweeen ", __jsx("b", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 118
    }
  }, "$PANACHE"), "Token and partners wares at the marketplace. "), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "coin-info",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 15
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 17
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_7__["default"], {
    src: assets_images_banners_banner_two_cryptik_banner_key_icon_svg__WEBPACK_IMPORTED_MODULE_15___default.a,
    alt: "crypto banner icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 19
    }
  }), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 19
    }
  }, "Premium Lifestyle")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 17
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_7__["default"], {
    src: assets_images_banners_banner_two_cryptik_banner_watch_icon_svg__WEBPACK_IMPORTED_MODULE_16___default.a,
    alt: "crypto banner icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 19
    }
  }), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 19
    }
  }, "Brand Ambassadors")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 17
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_7__["default"], {
    src: assets_images_banners_banner_two_cryptik_banner_heart_icon_svg__WEBPACK_IMPORTED_MODULE_17___default.a,
    alt: "crypto banner icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 19
    }
  }), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 19
    }
  }, "Model Living"))), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "banner-btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 15
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 17
    }
  }, __jsx("a", {
    className: "btn btn-fill",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 19
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_14__["FaGithub"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 48
    }
  }), "Buy $PANACHE")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 20
    }
  }, __jsx("a", {
    className: "btn ",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 19
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_14__["FaGithub"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 40
    }
  }), " Read our whitepaper"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BannerTwo);

/***/ }),

/***/ "./src/sections/CoinFund/coinFund.style.js":
/*!*************************************************!*\
  !*** ./src/sections/CoinFund/coinFund.style.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_funds_bg_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/funds-bg.png */ "./src/assets/images/funds-bg.png");
/* harmony import */ var assets_images_funds_bg_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_funds_bg_png__WEBPACK_IMPORTED_MODULE_1__);


const CoinFundWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 110px 0 140px 0;
  position: relative;
  background: url(${assets_images_funds_bg_png__WEBPACK_IMPORTED_MODULE_1___default.a});
  background-repeat: no-repeat;
  background-size: inherit;
  background-position: 72% 0px;

  &::before {
    position: absolute;
    right: 0;
    top: 0%;
    width: 100%;
    height: 100%;
    content: " ";
  }

  .btn-wrapper{
    margin-top: 35px;
  }
  .btn-fill {
    width:auto;
    font-size: 16px;
    padding: 18px 35px;
    font-weight:bold;
    background: #ffffff;
    color: ${props => props.theme.linkColor ? props.theme.linkColor : "#1F2AD5"};
  }

  .progressbar-wrapper {
    position: relative;
    height: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    background: #fff;

    span {
      position: absolute;
      right: 0;
      bottom: -42px;
      color: #fff;
      font-size: 18px;
      margin: 0;
    }

    .progressbar {
      position: relative;
      width: ${props => props.dayCount ? props.dayCount + "%" : "1%"};
      height: 30px;
      border-radius: 20px;
      background: rgb(35, 42, 213);
      background: linear-gradient(
        93deg,
        rgba(252, 165, 3, 1) 0%,
        rgba(227, 197, 113, 1) 42%,
        rgba(150, 112, 3, 1) 100%
      );
      span {
        bottom: -38px;
      }
    }
  }

  .payment-getway {
    margin-top: 85px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    span {
      margin-right: 25px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .countBoxItem {
    min-width: 100px;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column-reverse;
  }
  .countdown-wrapper {
    margin-bottom: 40px;
    .text {
      font-size: 14px;
      color: #fff;
      text-align: center;
      margin-bottom: 35px;
    }
    .countBox {
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      .count {
        line-height: 46px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      .label {
       font-size: 14px;
       color: #BEABDF;
      }
      .split {
        font-size: 40px;
        font-weight: 700;
        color: #fff;
        margin: 6px 8px 0 8px;
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    background-size: 36%;
    background-position: 86% 41%;
    .heading {
      font-size: 25px;
      line-height: 40px;
      text-align: left;
    }
    .countdown-wrapper {
      .count {
        font-size: 45px;
      }
    }
  }

  @media only screen and (max-width: 912px) {
    background-position: 86% 70%;
    .coin-fund-content-left{
      text-align: center;
      margin-bottom: 80px;
    }
  }
  @media only screen and (max-width: 768px) {
    .countdown-wrap{
      width: 100%;
    }
  }
  @media only screen and (max-width: 480px) {
    background: none;
    padding: 50px 0;
    .heading {
      font-size: 25px;
      line-height: 40px;
    }
    .countdown-wrapper {
      .split {
        display: none;
      }
      .count {
        font-size: 35px;
      } 
      .countBox{
        flex-direction: column-reverse;
      }
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (CoinFundWrapper);

/***/ }),

/***/ "./src/sections/CoinFund/index.js":
/*!****************************************!*\
  !*** ./src/sections/CoinFund/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_component_countdown_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-component-countdown-timer */ "react-component-countdown-timer");
/* harmony import */ var react_component_countdown_timer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_component_countdown_timer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _coinFund_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./coinFund.style */ "./src/sections/CoinFund/coinFund.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/CoinFund/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }












const CoinFund = ({
  dayCount
}) => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    daySecondsCount: new Date().getUTCSeconds() + 60 * (new Date().getUTCMinutes() + 60 * new Date().getUTCHours()),
    preSaleStartDate: "August, 20 2021",
    preSaleStopDate: "August, 27 2021"
  }); // state.preSaleStartDate ? new Date()

  const tokenpreSaleStopDate = Math.floor(new Date(state.preSaleStartDate) / 1000.0); //2678400;

  const tokenPreSaleStartDate = Math.floor(new Date(state.preSaleStopDate) / 1000.0);
  let preSaleDuration = tokenPreSaleStartDate - tokenpreSaleStopDate;
  let secondsSinceEpoch = Math.round(Date.now() / 1000);
  let displayText = "";
  let daysLeftBeforePreSaleDate = tokenpreSaleStopDate - secondsSinceEpoch;
  console.log(daysLeftBeforePreSaleDate);
  let tokenBuyAction = preSaleDuration != secondsSinceEpoch ? `${Math.floor(daysLeftBeforePreSaleDate % 31536000 % 2628000 / 86400)} days remaining to buy token` : "Buy Token";
  preSaleDuration = preSaleDuration != secondsSinceEpoch ? daysLeftBeforePreSaleDate : preSaleDuration;
  displayText = preSaleDuration != secondsSinceEpoch ? `Countdown to ${Math.floor(preSaleDuration % 31536000 % 2628000 / 86400)} days before presale starts` : `Last moment to grab the token, ${Math.floor(preSaleDuration % 31536000 % 2628000 / 86400)} `;
  const settings = {
    count: preSaleDuration,
    showTitle: true,
    size: 60,
    labelSize: 14,
    responsive: true,
    backgroundColor: "transparent",
    color: "#fff",
    dayTitle: "Days",
    hourTitle: "Hours",
    minuteTitle: "Minutes",
    secondTitle: "Seconds",
    id: "countdownwrap"
  };
  return __jsx(_coinFund_style__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "token",
    dayCount: dayCount,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "lg-6 md-12 ",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "coin-fund-content-left",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 13
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 15
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__["SectionBackground"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 17
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 19
    }
  }, "Get the token, Presale starts: August 20th - 27th, 2021")), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 17
    }
  }, "Panache Token represents all aspects of our social lives, from the type of watches you wear, your dressing appearances, the cars you drive, the houses you live in and all other confidence lifestyles.")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "btn-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 15
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 17
    }
  }, __jsx("a", {
    className: "btn btn-fill",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 19
    }
  }, tokenBuyAction))))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "lg-6 md-12 countdown-wrap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "countdown-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 13
    }
  }, __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 15
    }
  }, " ", __jsx("b", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 22
    }
  }, displayText)), __jsx(react_component_countdown_timer__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({}, settings, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 15
    }
  }))), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "progressbar-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "progressbar",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 15
    }
  }, __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 17
    }
  }, "$0")), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 15
    }
  }, "$1,000,000")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "payment-getway",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 13
    }
  }, __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 15
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__["FaBitcoin"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 17
    }
  }), " "), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 15
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__["FaCcMastercard"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 17
    }
  }), " "), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 15
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__["FaCcVisa"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 17
    }
  }), " "), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 15
    }
  }, " ", __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__["FaCcDiscover"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 17
    }
  }), " "))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CoinFund);

/***/ }),

/***/ "./src/sections/Faq/faq.style.js":
/*!***************************************!*\
  !*** ./src/sections/Faq/faq.style.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const FaqSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 85px 0;

  .title__wrapper {
    .heading {
      padding-right: 106px;
    }
  }

  .faq-content {
    position: relative;
    margin-top: 95px;

    ul.react-tabs__tab-list {
      position: absolute;
      right: -106%;
      top: -160px;
      border: none;

      li {
        padding: 14px 33px;
        border: none;
        border-radius: 5px;

        &.react-tabs__tab--selected {
          background: #280d57;
          color: #fff;
        }
      }
    }
  }

  .accordion__item {
    background: #2b1867;
    border: 1px solid #beabe0;
    border-radius: 5px;
    padding: 30px;

    .heading {
      font-size: 17px;
      font-weight: 300;
      margin: 0;
    }

    > div {
      [aria-expanded="true"] {
        .heading {
          margin-bottom: 10px;
        }
      }
    }
  }

  .accordion__item + .accordion__item {
    margin-top: 30px;
  }

  .faq-image {
    width: 390px;
    margin-top: 67px;
    opacity: 0.7;
  }

  @media only screen and (max-width: 1024px) {
    .faq-content {
      ul.react-tabs__tab-list {
        right: -109%;
        top: -160px;

        li {
          padding: 10px 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 912px) {
    .faq-content {
      ul.react-tabs__tab-list {
        right: -109%;
        top: -188px;

        li {
          padding: 10px 18px;
        }
      }
    }
    .title__wrapper{
      .heading{
        padding-right: 0;
      }
    }
  }
  @media only screen and (max-width: 760px) {
    .faq-content {
      margin-top: 120px;
      ul.react-tabs__tab-list {
        left: 0;
        top: -90px;
        right: 0;
      }
    }
    .faq-image{
      margin: 70px auto 0 auto;
    }
    .title__wrapper{
      .heading{
        padding-right: 0;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .title__wrapper{
      .heading{
        font-size: 30px;
      }
    }
  }
  @media only screen and (max-width: 375px) {
    .title__wrapper{
      .heading{
        font-size: 25px;
        line-height: 35px;
      }
    }
    .faq-content{
      ul.react-tabs__tab-list{
        li{
          padding: 10px 8px;
        }
      }
    }
    .accordion__item {
      .heading {
        font-size: 15px;
        line-height: 25px;
      }
    } 
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (FaqSectionWrapper);

/***/ }),

/***/ "./src/sections/Faq/index.js":
/*!***********************************!*\
  !*** ./src/sections/Faq/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-tabs */ "react-tabs");
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_tabs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Accordion */ "./src/reusecore/Accordion/index.js");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/io */ "react-icons/io");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_io__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var assets_images_faq_image_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/images/faq-image.png */ "./src/assets/images/faq-image.png");
/* harmony import */ var assets_images_faq_image_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(assets_images_faq_image_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var assets_data_faq__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! assets/data/faq */ "./src/assets/data/faq/index.js");
/* harmony import */ var react_tabs_style_react_tabs_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-tabs/style/react-tabs.css */ "./node_modules/react-tabs/style/react-tabs.css");
/* harmony import */ var react_tabs_style_react_tabs_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_tabs_style_react_tabs_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _faq_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./faq.style */ "./src/sections/Faq/faq.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Faq/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;















const Faq = () => {
  return __jsx(_faq_style__WEBPACK_IMPORTED_MODULE_13__["default"], {
    id: "faq",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "md-6 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 11
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_5__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 13
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_5__["SectionBackground"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 15
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 17
    }
  }, "Frequently asked questions")), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }, "Attention in when in just something bread not hundred well, muff value emerge on the known officers.")))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "md-6 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "faq-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  }, __jsx(react_tabs__WEBPACK_IMPORTED_MODULE_1__["Tabs"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 15
    }
  }, __jsx(react_tabs__WEBPACK_IMPORTED_MODULE_1__["TabList"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }, assets_data_faq__WEBPACK_IMPORTED_MODULE_11__["default"].faq.map((tab, i) => __jsx(react_tabs__WEBPACK_IMPORTED_MODULE_1__["Tab"], {
    key: i,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 21
    }
  }, tab.name))), assets_data_faq__WEBPACK_IMPORTED_MODULE_11__["default"].faq.map((tabItem, index) => __jsx(react_tabs__WEBPACK_IMPORTED_MODULE_1__["TabPanel"], {
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 19
    }
  }, __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["Accordion"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 21
    }
  }, tabItem.items.map((item, index) => __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["AccordionItem"], {
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 25
    }
  }, __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["AccordionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 27
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_7__["default"], {
    as: "h4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 29
    }
  }, item.title), __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["IconWrapper"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 29
    }
  }, __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["OpenIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 31
    }
  }, __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_4__["IoIosArrowForward"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 33
    }
  })), __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["CloseIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 31
    }
  }, __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_4__["IoIosArrowDown"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 33
    }
  })))), __jsx(reusecore_Accordion__WEBPACK_IMPORTED_MODULE_3__["AccordionBody"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 27
    }
  }, __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 29
    }
  }, " ", item.body)))))))))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "md-5 offset-md-1 offset-xs-0 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 11
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_9__["default"], {
    src: assets_images_faq_image_png__WEBPACK_IMPORTED_MODULE_10___default.a,
    alt: "cryptik faq image",
    className: "faq-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 13
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Faq);

/***/ }),

/***/ "./src/sections/Footer/footer.style.js":
/*!*********************************************!*\
  !*** ./src/sections/Footer/footer.style.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_images_footer_bg_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/footer-bg.png */ "./src/assets/images/footer-bg.png");
/* harmony import */ var assets_images_footer_bg_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_footer_bg_png__WEBPACK_IMPORTED_MODULE_1__);


const FooterWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  .footer-content-wrapper {
    background: url(${assets_images_footer_bg_png__WEBPACK_IMPORTED_MODULE_1___default.a});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  a {
    &:hover {
      color: #fff;
    }
  }

  

  .footer-widgets { 
    margin-bottom: 60px;

    a {
      color: #beabdf;
      font-size: 18px;
      font-weight: 300;
      line-height: 38px;
    }

    img {
      width: 180px;
      margin-bottom: 27px;
    }

    &.company-desc {
      .text {
        line-height: 26px;
      }
    }

    &.address {
      font-size: 18px;
      p {
        line-height: 38px;
      }
    }

    .heading {
      font-size: 24px;
      font-weight: 500;
      color: #beabdf;
      margin-bottom: 23px;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      a {
        display: flex;
        align-items: center;
        svg {
          margin-right: 15px;
        }
      }
    }
  }

  .footer-social-links {
    padding: 45px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid #4e55aa;
    border-bottom: 0.5px solid #4e55aa;
    a {
      font-size: 36px;
      font-weight: 700;
      color: #beabdf;
      &:hover {
        color: #fff;
      }
    }
  }

  .copyright-text {
    display: flex;
    justify-content: space-between;
    padding: 65px 0 50px 0px;
  }
  @media only screen and (max-width: 480px) {
    .footer-social-links{
      flex-wrap: wrap;
      a{
        max-width: 16%;
        flex: 0 0 16%;
        margin: 15px 0;
      }
    }
    .copyright-text{
      flex-direction: column-reverse;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (FooterWrapper);

/***/ }),

/***/ "./src/sections/Footer/index.js":
/*!**************************************!*\
  !*** ./src/sections/Footer/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var reusecore_List__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reusecore/List */ "./src/reusecore/List/index.js");
/* harmony import */ var sections_Subscribe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! sections/Subscribe */ "./src/sections/Subscribe/index.js");
/* harmony import */ var assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/images/logo-white.png */ "./src/assets/images/logo-white.png");
/* harmony import */ var assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var assets_data_footer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! assets/data/footer */ "./src/assets/data/footer/index.js");
/* harmony import */ var _footer_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./footer.style */ "./src/sections/Footer/footer.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Footer/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;














const Footer = () => {
  return __jsx(_footer_style__WEBPACK_IMPORTED_MODULE_12__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 5
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "footer-content-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }, __jsx(sections_Subscribe__WEBPACK_IMPORTED_MODULE_9__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "footer-social-links",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 15
    }
  }, assets_data_footer__WEBPACK_IMPORTED_MODULE_11__["default"].links.map((item, index) => __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: item.url,
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 19
    }
  }, __jsx("a", {
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 21
    }
  }, " ", item.icon, " ")))), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "copyright-text",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 15
    }
  }, __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 17
    }
  }, "\xA9 Panache | All right rserved 2021"), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: "span",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 17
    }
  }, "Powered By", " ", __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 19
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 21
    }
  }, "Panache Finance")))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/sections/Navigation/index.js":
/*!******************************************!*\
  !*** ./src/sections/Navigation/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/images/logo-white.png */ "./src/assets/images/logo-white.png");
/* harmony import */ var assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utility_data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utility/data.js */ "./src/sections/Navigation/utility/data.js");
/* harmony import */ var _utility_ScrollspyMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utility/ScrollspyMenu */ "./src/sections/Navigation/utility/ScrollspyMenu.js");
/* harmony import */ var _navigation_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navigation.style */ "./src/sections/Navigation/navigation.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Navigation/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









const Navigation = () => {
  const {
    0: expand,
    1: setExpand
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [scrolled, setScrolled] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); //[expand, scroll]

  return __jsx(_navigation_style__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "navbar",
    className: `nav-block`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "navbar-wrap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 11
    }
  }, __jsx("a", {
    className: "logo",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 13
    }
  }, __jsx("img", {
    src: assets_images_logo_white_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    alt: "panache-token logo",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 15
    }
  }))), __jsx("nav", {
    className: "nav",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 11
    }
  }, __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaBars"], {
    className: "mobile-menu-icon",
    onClick: () => setExpand(!expand),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 13
    }
  }), __jsx(_utility_ScrollspyMenu__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: `collapsed ${expand ? "is-expanded" : ""}`,
    menuItems: _utility_data_js__WEBPACK_IMPORTED_MODULE_5__["default"].menuItems,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Navigation);

/***/ }),

/***/ "./src/sections/Navigation/navigation.style.js":
/*!*****************************************************!*\
  !*** ./src/sections/Navigation/navigation.style.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const NavigationWrap = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.header`
    background: ${props => props.theme.NavBG};
    position: fixed;
    width: 100%;
    z-index: 9999;
    top: 0;
    transition: all 0.3s ease 0s;
    border-bottom: 1px solid transparent;
  .navbar-wrap{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #6A598E;
  }
  .mobile-menu-icon {
    display: none;
    color: #1D316C;
    font-size: 24px;
  }
  .nav__button{
    width: 170px;
    height: 60px;
    background: ${props => props.theme.white};
    border-radius: 5px;
    font-size: 18px;
    color: ${props => props.theme.linkColor};
    transition: all 0.3s ease-in;
    &:hover,
    &:focus{
      outline: none;
      border: none;
      background: linear-gradient( 93deg,rgba(196,56,231,1) 0%,rgba(122,49,222,1) 52%,rgba(37,42,213,1) 100% );
      color: ${props => props.theme.white};
    }
  }
  /*Drop down style*/ 
  .dropdown{
    background: #fff;
    visibility: hidden;
    opacity: 0;
    min-width: 200px;
    border: 1px solid #f5f5f5;
    position: absolute;
    margin-top: 1rem;
    left: 20px;
    padding: 15px 0px;
    display: none;
    box-shadow: 0px 30px 70px 0px rgba(137,139,142,0.15);
    -webkit-transform: translateY(20px);
    -ms-transform: translateY(20px);
    transform: translateY(20px);
    transition: all 0.3s ease-in-out;
  }
  ul li:hover > ul,
  ul li ul:hover {
    opacity: 1;
    visibility: visible;
    -webkit-transform: translateY(0px);
    -ms-transform: translateY(0px);
    transform: translateY(0px);
    display: block;
  }
  
  nav {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }
    li{
        position: relative;
        padding: 28px 0px 28px 40px;
        .dropdown{
          li{
            padding: 0;
            a{
              color: #1D316C;
              display: block;
              padding: 5px 15px;
              &:hover{
                color: ${props => props.theme.menuHoverColor ? props.theme.menuHoverColor : '#1F2AD5'} !important;
              }
              &:before{
                content: none;
              }
            }
          }
        }
      
      a, .nav-active{
        position: relative;
        color: #fff;
        font-size: 15px;
        transition: 450ms all;
        padding-bottom: 5px;
        cursor: pointer;
        &:before{
          content: '';
          position: absolute;
          left : 0;
          bottom:0;
          width: 20px;
          height: 1px;
          opacity: 0;
          background: ${props => props.theme.menuHoverColor ? props.theme.menuHoverColor : '#1F2AD5'};
          transition: 450ms all;
        }
        &:hover{
          color: ${props => props.theme.menuHoverColor ? props.theme.menuHoverColor : '#1F2AD5'};
          &:before{
            opacity: 1;
          }
        }
      }
    }
  }
  .logo{
    margin-top: 8px;
    transition: all 0.8s cubic-bezier(0.3, 0.8, 0.2, 1) 0s;
    img{
      width: 210px;
    }
  }
  &.scrolled{ 
    box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 30px;
    background: rgb(0, 27, 71);
    // background: #290E59;
    border-color: ${props => props.theme.NavBGSolid};
    .navbar-wrap{
      border-color: transparent
    }
    .logo{
        width: 200px;
    } 
    .nav{
      li{
        padding: 14px 0px 14px 40px;
        a{ 
          &:hover{
            color: ${props => props.theme.menuHoverColor ? props.theme.menuHoverColor : '#1F2AD5'};
          }
        }
      }
      li{
        .dropdown{
          li{
            padding: 0;
          }
        }
      }
    }
  }


  @media only screen and (max-width: 912px) {
    height: auto;
    min-height: 50px;
    padding: 15px 20px;
    // background: #290E59;
    background: rgb(0, 27, 71);
    &.scrolled{
        padding: 8px 20px;
        border-color: transparent;
        .nav .collapsed {
          li{
            padding: 0;
            a{
              padding: 8px 10px;
              display: block;
            }
          }
          li+li{
            padding-left: 0;
          }
        } 
    }
    .has-dropdown{
      a{
        position: relative;
        &:before{
          content: '';
          
        }
      }
    }
    .dropdown{
      position: relative;
      left: 0;
      margin-top: 0;
      box-shadow: none;
    }
    .navbar-wrap{
        border-color: transparent;
        display: block;
        position: relative;
    }
    .logo {
      width: 100%;
      display: block;
      margin: 7px 0 0 0;
      img{width: 110px;}
    }
    .mobile-menu-icon {
      display: inline-block;
      position: absolute;
      top: 8px;
      right: 3px;
      cursor: pointer;
    }
    .nav{
        width: 100%;
        .mobile-menu-icon{
          color: white;
        }
      .collapsed {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        transition: 450ms all ease-in-out;
        overflow: hidden;
        max-height: 0;

        &.is-expanded {
          padding-top: 15px;
          overflow-y: auto;
          max-height: 250px; /* approximate max height */
        }
        li {
          padding: 0;
          margin: 0px 0px;
          width: 100%;
          .dropdown{
            li{
              a{
                color: #1D316C;
              }
            }
          }
          a{
            padding: 8px 10px;
            display: block;
            color: white;
            &:before{
              content: none;
            }
          }
        }
      }
    }
  }

`;
/* harmony default export */ __webpack_exports__["default"] = (NavigationWrap);

/***/ }),

/***/ "./src/sections/Navigation/utility/ScrollspyMenu.js":
/*!**********************************************************!*\
  !*** ./src/sections/Navigation/utility/ScrollspyMenu.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-scroll */ "react-scroll");
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_scroll__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Navigation/utility/ScrollspyMenu.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const ScrollspyMenu = _ref => {
  let {
    menuItems
  } = _ref,
      props = _objectWithoutProperties(_ref, ["menuItems"]);

  const addAllClasses = [""];

  if (props.className) {
    addAllClasses.push(props.className);
  }

  return __jsx("ul", {
    className: addAllClasses.join(" "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 5
    }
  }, menuItems.map((menu, index) => __jsx("li", {
    key: index,
    className: menu.subItems !== undefined ? "nav-item has-dropdown" : "nav-item",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }, __jsx(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    activeClass: "nav-active",
    to: menu.path,
    spy: true,
    smooth: true,
    offset: parseInt(menu.offset),
    duration: 700,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  }, menu.name), menu.subItems !== undefined && __jsx("ul", {
    key: index,
    className: "dropdown",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 13
    }
  }, menu.subItems.map((subItem, i) => __jsx("li", {
    key: i,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 19
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: subItem.path,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 21
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 23
    }
  }, subItem.name))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ScrollspyMenu);

/***/ }),

/***/ "./src/sections/Navigation/utility/data.js":
/*!*************************************************!*\
  !*** ./src/sections/Navigation/utility/data.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Data = {
  menuItems: [{
    name: "About",
    path: "about",
    offset: "-100"
  }, {
    name: "Features",
    path: "service",
    offset: "-120"
  }, {
    name: "Special Offer",
    path: "token",
    offset: "-100"
  }, {
    name: "Roadmap",
    path: "roadmap",
    offset: "-100"
  }, {
    name: "Blogs",
    path: "/blog-grid" // subItems: [
    //   {
    //     name: "Blog Grid",
    //     path: "/blog-grid"
    //   },
    //   {
    //     name: "Blog List",
    //     path: "/blog-list"
    //   },
    //   {
    //     name: "Blog Full",
    //     path: "/blog-full"
    //   },
    //   {
    //     name: "Blog Single",
    //     path: "/blog-single"
    //   }
    // ]

  }, // {
  //   name: "FAQ",
  //   path: "faq",
  //   offset: "-60"
  // },
  {
    name: "Contact",
    path: "contact",
    offset: "-70"
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (Data);

/***/ }),

/***/ "./src/sections/RoadMap/index.js":
/*!***************************************!*\
  !*** ./src/sections/RoadMap/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _roadmap_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roadmap.style */ "./src/sections/RoadMap/roadmap.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/RoadMap/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const RoadMap = () => {
  return __jsx(_roadmap_style__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: "roadmap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  }, __jsx("h1", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 13
    }
  }, "Our RoadMap"), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }
  }, "we intend to continously improve on the features of panache token, however, the first three quarters below is just our starting point, it will be updated as the community grows"), __jsx("div", {
    className: "roadmap-item-container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "roadmap-item",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 13
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 17
    }
  }, "Third Quarter, 2021"), __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 21
    }
  }, "Deploy Panache token on BSC Main net"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 21
    }
  }, "Launch the panache token official website"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 21
    }
  }, "Invite early adopters for presale on the token asset"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 21
    }
  }, "provide liquidity for the token asset on pancakeswap"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 21
    }
  }, "Lock LP token "))), __jsx("div", {
    className: "roadmap-item",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, "Last Quarter, 2021"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, "Launch Panache token marketplace"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 21
    }
  }, "List panache token on trust wallet"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 21
    }
  }, "List panache token on crypto exchanges"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 21
    }
  }, "List panache token on coinmarketcap, coingecko, coinvote, etc"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 21
    }
  }, "Commence listing vendors for the marketplace")), __jsx("div", {
    className: "roadmap-item",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  }, "First Quarter, 2022"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  }, "Add multiple tokens for marketplace exchanges"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 21
    }
  }, "Consolidate on vendor listing"))));
};

/* harmony default export */ __webpack_exports__["default"] = (RoadMap);

/***/ }),

/***/ "./src/sections/RoadMap/roadmap.style.js":
/*!***********************************************!*\
  !*** ./src/sections/RoadMap/roadmap.style.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const RoadMapHead = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.h1`
    display: flex;
    text-align:center;

`;
const RoadMapWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`

h1{
   text-align:center;
   padding: 1.5em 0 0 0;
}
p{
    text-align:center;
    width:30%;
    margin: 0 auto;
    padding: 1em 0 1em 0;
}

.roadmap-item-container{
display:flex;
width:100%;
justify-content:center;
align-items:center;
background: transparent;

    .roadmap-item{
        width:20%;
        height: 25em;
        flex-wrap:wrap;
        margin:1rem;
        border-radius:5px;
        border: 1px solid #ccc;
        transition: all .7s ease-in-out;
        li{
            list-style:none;
            padding:0.3rem;
            text-align: center;
            text-decoration:underline;
        }
        h2{
            text-align:center;
        }
    
        &:hover{
            transform:scale(1.1);
        }
    }
    @media(max-width: 600px){
        flex-direction:column;

        p{
            width:400px !important;
    
        }
        .roadmap-item{
            width:70%;
            height: auto;
            padding:1em;
        }

    }

}


`;
/* harmony default export */ __webpack_exports__["default"] = (RoadMapWrapper);

/***/ }),

/***/ "./src/sections/Service/index.js":
/*!***************************************!*\
  !*** ./src/sections/Service/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var assets_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/data/service */ "./src/assets/data/service/index.js");
/* harmony import */ var _service_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service.style */ "./src/sections/Service/service.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Service/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









const Service = () => {
  return __jsx(_service_style__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "service",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "md-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "service-item-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 15
    }
  }, assets_data_service__WEBPACK_IMPORTED_MODULE_6__["default"].services.map((service, index) => __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "lg-3 sm-6 xs-12",
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 19
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "service-item text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 21
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
    src: service.icon,
    alt: "panache icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 23
    }
  }), __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    as: "h3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 23
    }
  }, service.title), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 23
    }
  }, service.body))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Service);

/***/ }),

/***/ "./src/sections/Service/service.style.js":
/*!***********************************************!*\
  !*** ./src/sections/Service/service.style.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const ServiceSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`

    padding: 99px 0 100px 0;

    .service-item-wrapper{
        padding: 25px 32px;
        border-radius: 10px;
        background: rgb(0, 27, 71);
        // background-color: #2B1867;

        .service-item {
            padding: 15px 0;
            border-radius: 8px;
            transition: all 0.3s ease-in;
            &:hover{
                background: #002a6e;
            }
            img {
                height: 80px;
                margin-bottom: 20px;
            }

            h3 {
                font-size: 20px;
                font-weight: 500;
                margin: 0 0 14px 0;
            }
        }

        p {
            margin: 0;
        }
    }
    @media only screen and (max-width: 768px) { 
        .service-item{
            margin-bottom: 30px;
        }
        .service-item-wrapper{
            padding: 45px 32px 25px 32px;
        }
    }
    @media only screen and (max-width: 480px) { 
        padding: 55px 0 50px 0;
    }
`;
/* harmony default export */ __webpack_exports__["default"] = (ServiceSectionWrapper);

/***/ }),

/***/ "./src/sections/Stack/index.js":
/*!*************************************!*\
  !*** ./src/sections/Stack/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var assets_data_stack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/data/stack */ "./src/assets/data/stack/index.js");
/* harmony import */ var _stack_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stack.style */ "./src/sections/Stack/stack.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Stack/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











const Stack = () => {
  return __jsx(_stack_style__WEBPACK_IMPORTED_MODULE_9__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "Stack-Wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "offset-lg-3 offset-md-1 lg-6 md-10  sm-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_2__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 15
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, "Our Propectus Partners"), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  }, "Each $PANACHE Token partner provides a liquidity to the trading pool, with a threshold of $5,000. This position from each partners adds to the distributive percentage rate for each token holders and also adds addition percentage to the partners brand ambassadors and trade activities happens in the marketplace")))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    className: "md-8 offset-md-2 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "language-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 15
    }
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Stack);

/***/ }),

/***/ "./src/sections/Stack/stack.style.js":
/*!*******************************************!*\
  !*** ./src/sections/Stack/stack.style.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StackSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 85px 0;

  .Stack-Wrapper {
    .title__wrapper {
      text-align: center;
    }
    .language-image {
      display: flex;
      margin-top: 45px;
      justify-content: space-between;
      a {
        &:hover {
          opacity: 0.7;
        }
        img {
          width: auto;
        }
      }
    }
  }

  @media only screen and (max-width: 568px) {
    .box.language-image a img{
      width: 85%;
    } 
  }

  @media only screen and (max-width: 480px) {
     padding: 20px 0;
    .box.language-image a img{
      width: 70%;
    } 
    .heading{
      font-size: 33px;
      line-height: 40px;
    }
  }
  @media only screen and (max-width:375px) {
    .heading{
      font-size: 28px;
      line-height: 35px;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (StackSectionWrapper);

/***/ }),

/***/ "./src/sections/Statistics/index.js":
/*!******************************************!*\
  !*** ./src/sections/Statistics/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var assets_images_chart_token_chart_1_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/images/chart/token-chart-1.png */ "./src/assets/images/chart/token-chart-1.png");
/* harmony import */ var assets_images_chart_token_chart_1_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(assets_images_chart_token_chart_1_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var assets_images_chart_token_chart_2_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/images/chart/token-chart-2.png */ "./src/assets/images/chart/token-chart-2.png");
/* harmony import */ var assets_images_chart_token_chart_2_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(assets_images_chart_token_chart_2_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _statistics_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./statistics.style */ "./src/sections/Statistics/statistics.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Statistics/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;










const Statistics = () => {
  return __jsx(_statistics_style__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "statistics-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "md-6 sm-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "statistics-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 15
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "h2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, "Funds Allocation"), __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
    src: assets_images_chart_token_chart_1_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "panache statistics image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  }))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "md-6 sm-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "statistics-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 15
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "h2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 17
    }
  }, "Token Distribution"), __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
    src: assets_images_chart_token_chart_2_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "panache statistics image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 17
    }
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Statistics);

/***/ }),

/***/ "./src/sections/Statistics/statistics.style.js":
/*!*****************************************************!*\
  !*** ./src/sections/Statistics/statistics.style.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StatisticsSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  .statistics-wrapper {
    padding: 85px 0;

    .statistics-image {
      text-align: center;
      .heading {
        font-size: 36px;
      }

      img {
        margin-top: 55px;
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    .statistics-wrapper {
      .statistics-image {
        .heading {
          font-size: 32px;
        }
      }
    }
  }
  @media only screen and (max-width: 912px) {
    .statistics-wrapper {
      .statistics-image {
        .heading {
          font-size: 30px;
        }
      }
    }
  }
  @media only screen and (max-width: 760px) {
    .statistics-wrapper {
      .statistics-image {
        text-align: center;
        .heading {
          font-size: 25px;
        }
      }
    }
  }
  @media only screen and (max-width: 568px) {
    .statistics-wrapper {
      .statistics-image {
        text-align: center;
        img {
          margin: 50px auto 0px auto;
          width: 70%;
        }

        &:last-child {
          margin-top: 50px;
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .statistics-wrapper{
      padding: 10px 0;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (StatisticsSectionWrapper);

/***/ }),

/***/ "./src/sections/Subscribe/index.js":
/*!*****************************************!*\
  !*** ./src/sections/Subscribe/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Button */ "./src/reusecore/Button/index.js");
/* harmony import */ var reusecore_Form_Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Form/Input */ "./src/reusecore/Form/Input/index.js");
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var _subscribe_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./subscribe.style */ "./src/sections/Subscribe/subscribe.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Subscribe/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;










const Subscribe = () => {
  return __jsx(_subscribe_style__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "contact",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "col-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "subscribe-box-bg",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 15
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "lg-6 offset-lg-3 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 19
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 21
    }
  }, " Don\u2019t miss out, Stay updated "), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 21
    }
  }, "Sign up for updates and market news. Subscribe to our newsletter and receive update about our PreSale, ICOs and crypto tips.")))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 15
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "lg-8 offset-lg-2 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 17
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "form-box",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 19
    }
  }, __jsx(reusecore_Form_Input__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: "text",
    placeholder: "Enter your email address . . .",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 21
    }
  }), __jsx(reusecore_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 21
    }
  }, "Subscribe")))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Subscribe);

/***/ }),

/***/ "./src/sections/Subscribe/subscribe.style.js":
/*!***************************************************!*\
  !*** ./src/sections/Subscribe/subscribe.style.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const SubscribeWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 100px 0;

  .title__wrapper {
    text-align: center;
  }

  .subscribe-box-bg {
    position: relative;
    padding: 100px 0;

    &:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 43px;
      background: rgb(200, 56, 231);
      background: linear-gradient(
        94deg,
        rgba(200, 56, 231, 0.6) 0%,
        rgba(31, 42, 213, 0.6) 100%
      );
      content: "";
      opacity: 0.65;
    }
  }
  .form-box {
    position: relative;
    margin-top: 70px;
    button {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
      width: 220px;
      border-radius: 10px;
      border: none;
      transition: all 0.3s ease-in;
      background: rgb(200, 56, 231);
      background: linear-gradient(
        270deg,
        rgba(252, 165, 3, 1) 0%,
        rgba(227, 197, 113, 1) 100%
      );
      &:hover {
        background: rgb(200, 56, 231);
        background: linear-gradient(
          270deg,
          rgba(252, 165, 3, 1) 0%,
          rgba(227, 197, 113, 1) 100%
        );
      }
    }
    .input__wrapper {
      input {
        height: 80px;
        padding-left: 28px;
        border-radius: 10px;

        &::placeholder {
          color: #280d57;
        }
      }
    }
  }

  @media only screen and (max-width: 912px) {
    .subscribe-box-wrapper {
      .subscribe-box-bg {
        padding: 100px 30px;
      }
    }
  }
  @media only screen and (max-width: 568px) {
    .subscribe-box-wrapper {
      .subscribe-box-bg {
        padding: 50px 30px;
      }
      .form-box {
        text-align: center;
        margin-top: 35px;
        button {
          position: relative;
          right: 0;
          top: 0;
          margin: 30px auto 0 auto;
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .subscribe-box-wrapper {
      .subscribe-box-bg {
        padding: 50px 18px;
      }
    }
    .heading {
      font-size: 30px;
      line-height: 40px;
    }
  }
  @media only screen and (max-width: 375px) {
    .heading {
      font-size: 25px;
      line-height: 35px;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (SubscribeWrapper);

/***/ }),

/***/ "./src/sections/UserMap/index.js":
/*!***************************************!*\
  !*** ./src/sections/UserMap/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var assets_images_users_map_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/images/users-map.png */ "./src/assets/images/users-map.png");
/* harmony import */ var assets_images_users_map_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(assets_images_users_map_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _userMap_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./userMap.style */ "./src/sections/UserMap/userMap.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/UserMap/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;










const UserMap = () => {
  return __jsx(_userMap_style__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "usermap-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    className: "fluid",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "sm-12 md-10 offset-md-1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_2__["SectionTitle"], {
    className: "text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 15
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, "More than 3 Bilion worldwide use"), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, "Attention in when in just something bread not hundred well, muff value emerge on the known officers. A parameters phase orthographic the can differentiates.")))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 11
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "md-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "usermap-block",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 15
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_6__["default"], {
    src: assets_images_users_map_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "cryptik user map",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 17
    }
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (UserMap);

/***/ }),

/***/ "./src/sections/UserMap/userMap.style.js":
/*!***********************************************!*\
  !*** ./src/sections/UserMap/userMap.style.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const UserMapWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 85px 0;

  .usermap-wrapper {
    img {
      margin-top: 37px;
    }
  }
  
  @media only screen and (max-width: 912px) {
    .heading{
      font-size: 34px;
    }
  }
  @media only screen and (max-width: 568px) {
    .heading{
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 20px 0;
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (UserMapWrapper);

/***/ }),

/***/ "./src/sections/Wallet/index.js":
/*!**************************************!*\
  !*** ./src/sections/Wallet/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reusecore/Layout */ "./src/reusecore/Layout/index.js");
/* harmony import */ var reusecore_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reusecore/Box */ "./src/reusecore/Box/index.js");
/* harmony import */ var reusecore_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reusecore/Heading */ "./src/reusecore/Heading/index.js");
/* harmony import */ var reusecore_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reusecore/Text */ "./src/reusecore/Text/index.js");
/* harmony import */ var reusecore_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reusecore/Image */ "./src/reusecore/Image/index.js");
/* harmony import */ var reusecore_Counter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reusecore/Counter */ "./src/reusecore/Counter/index.js");
/* harmony import */ var reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reusecore/SectionTitle */ "./src/reusecore/SectionTitle/index.js");
/* harmony import */ var assets_images_wallet_image_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/images/wallet-image.svg */ "./src/assets/images/wallet-image.svg");
/* harmony import */ var assets_images_wallet_image_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(assets_images_wallet_image_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var assets_images_particles_crypto_managment_wallet_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! assets/images/particles/crypto-managment-wallet.svg */ "./src/assets/images/particles/crypto-managment-wallet.svg");
/* harmony import */ var assets_images_particles_crypto_managment_wallet_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(assets_images_particles_crypto_managment_wallet_svg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var assets_data_wallet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/data/wallet */ "./src/assets/data/wallet/index.js");
/* harmony import */ var _wallet_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./wallet.style */ "./src/sections/Wallet/wallet.style.js");
var _jsxFileName = "/home/emplugxm3/applications/next-landing/src/sections/Wallet/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;













const Wallet = () => {
  return __jsx(_wallet_style__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 5
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }, __jsx("img", {
    src: assets_images_particles_crypto_managment_wallet_svg__WEBPACK_IMPORTED_MODULE_9___default.a,
    className: "section__particle",
    alt: "cryptik",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }, __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "lg-5 md-4 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "wallet-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 13
    }
  }, __jsx(reusecore_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
    src: assets_images_wallet_image_svg__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "cryptik wallet image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 15
    }
  }))), __jsx(reusecore_Layout__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "lg-6 offset-lg-1 md-8 xs-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 11
    }
  }, __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "wallet-left-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__["SectionTitle"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 15
    }
  }, __jsx(reusecore_SectionTitle__WEBPACK_IMPORTED_MODULE_7__["SectionBackground"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 17
    }
  }, __jsx(reusecore_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 19
    }
  }, " PANACHE MARKET CAP ")), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 17
    }
  }, "This is a Community driven project. Panache is a deflationary meme token with antiwhale mechanism. Each user is in theory an equivalent owner and contributor to the network."), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "span",
    className: "description",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, "Contract Address: 0xcca0e7e445b5f762c1592c7b40c3eeaa88449c37")), __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "wallet-info",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 15
    }
  }, assets_data_wallet__WEBPACK_IMPORTED_MODULE_10__["default"].wallet.map((item, index) => __jsx(reusecore_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "counter-item",
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 19
    }
  }, __jsx(reusecore_Counter__WEBPACK_IMPORTED_MODULE_6__["default"], {
    end: item.count,
    suffix: item.suffixText,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 21
    }
  }), __jsx(reusecore_Text__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 21
    }
  }, item.body)))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Wallet);

/***/ }),

/***/ "./src/sections/Wallet/wallet.style.js":
/*!*********************************************!*\
  !*** ./src/sections/Wallet/wallet.style.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const WalletSectionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  padding: 85px 0;
  .section__particle{
    position: absolute;
    top: 3%;
    left: -5%;
    width: 100px;
  }
  .wallet-info {
    display: flex;
    margin-top: 50px;

    .counter-item {
      padding: 0 24px;
      position: relative;
      span {
        font-size: 30px;
        font-weight: 700;
        color: #fff;
        line-height: 46px;
      }

      .text {
        margin: 5px 0 0 0;
      }

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;

        &:before {
          display: none;
        }
      }

      &:before {
        position: absolute;
        right: 0;
        bottom: 7px;
        width: 1px;
        height: 79%;
        content: "";
        background: #beabdf;
        opacity: 0.3;
      }
    }
  }

  @media only screen and (max-width: 912px) {
    .wallet-image {
      img {
        width: 310px;
        margin: 0 auto 40px auto;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .wallet-left-content {
      .heading {
        font-size: 35px;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 50px 0;
    .wallet-left-content {
      .heading {
        font-size: 30px;
      }
    }
    .wallet-info{
      .counter-item{
        padding: 0 15px;
        span{
          font-size: 24px;
          line-height: 35px;
        }
      }
    } 
  }
  @media only screen and (max-width: 320px) {
    .wallet-left-content {
      .heading {
        font-size: 25px;
        line-height: 35px;
      }
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (WalletSectionWrapper);

/***/ }),

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/emplugxm3/applications/next-landing/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-accessible-accordion":
/*!*********************************************!*\
  !*** external "react-accessible-accordion" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-accessible-accordion");

/***/ }),

/***/ "react-component-countdown-timer":
/*!**************************************************!*\
  !*** external "react-component-countdown-timer" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-component-countdown-timer");

/***/ }),

/***/ "react-countup":
/*!********************************!*\
  !*** external "react-countup" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-countup");

/***/ }),

/***/ "react-icons/fa":
/*!*********************************!*\
  !*** external "react-icons/fa" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/fa");

/***/ }),

/***/ "react-icons/io":
/*!*********************************!*\
  !*** external "react-icons/io" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/io");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-scroll":
/*!*******************************!*\
  !*** external "react-scroll" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-scroll");

/***/ }),

/***/ "react-tabs":
/*!*****************************!*\
  !*** external "react-tabs" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-tabs");

/***/ }),

/***/ "react-visibility-sensor":
/*!******************************************!*\
  !*** external "react-visibility-sensor" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-visibility-sensor");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map