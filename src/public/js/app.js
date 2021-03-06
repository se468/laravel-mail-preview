/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('email-inbox-component', __webpack_require__(2));

var app = new Vue({
    el: '#app'
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/resources/assets/js/components/EmailInboxComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5cf95312", Component.options)
  } else {
    hotAPI.reload("data-v-5cf95312", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['emails'],
    data: function data() {
        return {
            emailList: [],
            selectedEmail: {}
        };
    },
    ready: function ready() {
        this.prepareComponent();
    },
    mounted: function mounted() {
        this.prepareComponent();
    },


    methods: {
        prepareComponent: function prepareComponent() {
            console.log(moment("20111031", "YYYYMMDD").fromNow());

            this.emailList = this.emails;
        },
        getDate: function getDate(date) {
            return moment(date, "YYYYMMDD").fromNow();
        },
        selectEmail: function selectEmail(email) {
            this.selectedEmail = email;

            this.markread(email);
        },
        markread: function markread(email) {
            var url = "/email-previews";
            var data = email;
            axios.post(url, data).then(function (response) {
                console.log(response);
                email.read = true;
            }).catch(function (error) {
                console.log(error);
            });
        },
        deleteEmail: function deleteEmail(email) {
            var self = this;
            var url = "/email-previews/" + email.id;

            axios.delete(url).then(function (response) {
                console.log(response);

                var index = self.emailList.indexOf(email);
                self.emailList.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.emailList.length > 0
      ? _c("div", { staticClass: "row no-gutters" }, [
          _c("div", { staticClass: "col-4 sidebar" }, [
            _c(
              "ul",
              { staticClass: "list-group" },
              _vm._l(_vm.emailList, function(email) {
                return _c(
                  "li",
                  {
                    staticClass: "list-group-item",
                    class: {
                      "list-group-item-secondary":
                        email.id == _vm.selectedEmail.id
                    },
                    on: {
                      click: function($event) {
                        _vm.selectEmail(email)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "mb-2" }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(email.subject) +
                          " - \n                        "
                      ),
                      _c(
                        "span",
                        {
                          staticClass: "badge",
                          class: {
                            "badge-warning": !email.read,
                            "badge-success": email.read
                          }
                        },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(email.read ? "READ" : "UNREAD") +
                              "\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "close",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm.deleteEmail(email)
                            }
                          }
                        },
                        [
                          _c("span", { attrs: { "aria-hidden": "true" } }, [
                            _vm._v("×")
                          ])
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "small",
                      { staticClass: "text-secondary" },
                      [
                        _vm._v(
                          "\n                        To: \n                        "
                        ),
                        _vm._l(JSON.parse(email.to), function(value, key) {
                          return _c("span", [
                            _vm._v(
                              "\n                            " +
                                _vm._s(key) +
                                " " +
                                _vm._s(value) +
                                "\n                        "
                            )
                          ])
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-secondary float-right" }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.getDate(email.created_at)) +
                          "\n                    "
                      )
                    ])
                  ]
                )
              })
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-8" }, [
            _c("div", { staticClass: "email-content" }, [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-body" },
                  [
                    _vm.selectedEmail.subject
                      ? [
                          _c("h5", { staticClass: "card-title" }, [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.selectedEmail.subject) +
                                " \n                            "
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "small",
                            {
                              staticClass:
                                "card-subtitle mb-2 text-muted float-right"
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(
                                    _vm.getDate(_vm.selectedEmail.created_at)
                                  ) +
                                  "\n                            "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "small",
                            { staticClass: "card-subtitle mb-2 text-muted" },
                            [
                              _c(
                                "div",
                                [
                                  _vm._v(
                                    "\n                                    From: \n                                    "
                                  ),
                                  _vm._l(
                                    JSON.parse(_vm.selectedEmail.from),
                                    function(value, key) {
                                      return _c("span", [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(key) +
                                            " " +
                                            _vm._s(
                                              value ? "<" + value + ">" : ""
                                            ) +
                                            "\n                                    "
                                        )
                                      ])
                                    }
                                  )
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                [
                                  _vm._v(
                                    "\n                                    To: \n                                    "
                                  ),
                                  _vm._l(
                                    JSON.parse(_vm.selectedEmail.to),
                                    function(value, key) {
                                      return _c("span", [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(key) +
                                            " " +
                                            _vm._s(value) +
                                            "\n                                    "
                                        )
                                      ])
                                    }
                                  )
                                ],
                                2
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "card" }, [
                            _c("div", {
                              staticClass: "card-text",
                              domProps: {
                                innerHTML: _vm._s(_vm.selectedEmail.body)
                              }
                            })
                          ])
                        ]
                      : _vm._e(),
                    _vm._v(" "),
                    !_vm.selectedEmail.subject
                      ? [
                          _vm._v(
                            "\n                            Select an email\n                        "
                          )
                        ]
                      : _vm._e()
                  ],
                  2
                )
              ])
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.emailList.length == 0
      ? _c("div", [
          _vm._v(
            "\n        You have no emails sent out yet. Start sending emails!\n    "
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5cf95312", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);