/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/view/[...slug]",{

/***/ "./pages/view/[...slug].tsx":
/*!**********************************!*\
  !*** ./pages/view/[...slug].tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ViewImage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nvar _jsxFileName = \"/Users/yi/Code/vaccinepassport/client/pages/view/[...slug].tsx\",\n    _s = $RefreshSig$();\n\n\n\nfunction ViewImage() {\n  _s();\n\n  var router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n  var slug = router.query.slug;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),\n      ticketData = _useState[0],\n      setTicketData = _useState[1];\n\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),\n      approved = _useState2[0],\n      setApproved = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),\n      ticketError = _useState3[0],\n      setTicketError = _useState3[1];\n\n  var image = null;\n\n  if (typeof slug === \"object\") {\n    image = slug.join(\"/\");\n  }\n\n  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {\n    (0,_Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.default)( /*#__PURE__*/_Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {\n      var response, ticket;\n      return _Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (image) {\n                _context.next = 2;\n                break;\n              }\n\n              return _context.abrupt(\"return\");\n\n            case 2:\n              _context.next = 4;\n              return fetch(\"https://us-central1-vaccinepassport-dev.cloudfunctions.net/\" + \"getTicket\" + \"?image=\".concat(encodeURIComponent(image)), {\n                method: \"POST\"\n              });\n\n            case 4:\n              response = _context.sent;\n              _context.next = 7;\n              return response.json();\n\n            case 7:\n              ticket = _context.sent;\n\n              if (ticket.error) {\n                setTicketError(ticket.error);\n              } else {\n                setTicketData(ticket);\n              }\n\n            case 9:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }))();\n  }, [image]);\n  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {\n    if (!image) {\n      return;\n    }\n\n    var checkAccess = /*#__PURE__*/function () {\n      var _ref2 = (0,_Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.default)( /*#__PURE__*/_Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {\n        var response, canAccessImage;\n        return _Users_yi_Code_vaccinepassport_client_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                if (!ticketData) {\n                  _context2.next = 9;\n                  break;\n                }\n\n                _context2.next = 3;\n                return fetch(\"https://us-central1-vaccinepassport-dev.cloudfunctions.net/\" + \"canAccessImage\" + \"?image=\".concat(encodeURIComponent(image), \"&hash=\").concat(encodeURIComponent(ticketData.hash)));\n\n              case 3:\n                response = _context2.sent;\n                _context2.next = 6;\n                return response.json();\n\n              case 6:\n                canAccessImage = _context2.sent;\n                setApproved(canAccessImage.approved);\n\n                if (canAccessImage.approved === \"not yet\") {\n                  setTimeout(checkAccess, 5 * 1000);\n                }\n\n              case 9:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2);\n      }));\n\n      return function checkAccess() {\n        return _ref2.apply(this, arguments);\n      };\n    }();\n\n    checkAccess();\n  }, [image, ticketData]);\n\n  if (!image) {\n    return null;\n  }\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n      className: \"bg-blue-500 p-4 text-center text-white text-2xl\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"Vaccine Passport\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 81,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 80,\n      columnNumber: 7\n    }, this), ticketData ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      className: \"text-2xl p-8 text-center\",\n      children: [(!approved || approved === \"not yet\") && ticketData && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n          children: \"Requesting Access.\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 87,\n          columnNumber: 15\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n          children: [\"Your code is \", ticketData.code]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 88,\n          columnNumber: 15\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 86,\n        columnNumber: 13\n      }, this), approved && approved === \"invalid ticket\" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Please rescan the QR code\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 92,\n        columnNumber: 13\n      }, this), approved && approved === \"approved\" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n        src: \"https://us-central1-vaccinepassport-dev.cloudfunctions.net/\" + \"downloadImage\" + \"?image=\".concat(encodeURIComponent(image), \"&hash=\").concat(encodeURIComponent(ticketData.hash))\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 95,\n        columnNumber: 13\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 9\n    }, this) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      children: \"Loading...\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 107,\n      columnNumber: 9\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 79,\n    columnNumber: 5\n  }, this);\n}\n\n_s(ViewImage, \"Rc7k5RZ7ep2JkviHuvFEvnGiqy8=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter];\n});\n\n_c = ViewImage;\n\nvar _c;\n\n$RefreshReg$(_c, \"ViewImage\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdmlldy9bLi4uc2x1Z10udHN4P2Y0NTYiXSwibmFtZXMiOlsiVmlld0ltYWdlIiwicm91dGVyIiwidXNlUm91dGVyIiwic2x1ZyIsInF1ZXJ5IiwidXNlU3RhdGUiLCJ0aWNrZXREYXRhIiwic2V0VGlja2V0RGF0YSIsImFwcHJvdmVkIiwic2V0QXBwcm92ZWQiLCJ0aWNrZXRFcnJvciIsInNldFRpY2tldEVycm9yIiwiaW1hZ2UiLCJqb2luIiwidXNlRWZmZWN0IiwiZmV0Y2giLCJwcm9jZXNzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibWV0aG9kIiwicmVzcG9uc2UiLCJqc29uIiwidGlja2V0IiwiZXJyb3IiLCJjaGVja0FjY2VzcyIsImhhc2giLCJjYW5BY2Nlc3NJbWFnZSIsInNldFRpbWVvdXQiLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBUWUsU0FBU0EsU0FBVCxHQUFxQjtBQUFBOztBQUNsQyxNQUFNQyxNQUFNLEdBQUdDLHNEQUFTLEVBQXhCO0FBRGtDLE1BRTFCQyxJQUYwQixHQUVqQkYsTUFBTSxDQUFDRyxLQUZVLENBRTFCRCxJQUYwQjs7QUFBQSxrQkFHRUUsK0NBQVEsQ0FBYSxJQUFiLENBSFY7QUFBQSxNQUczQkMsVUFIMkI7QUFBQSxNQUdmQyxhQUhlOztBQUFBLG1CQUlGRiwrQ0FBUSxDQUFTLElBQVQsQ0FKTjtBQUFBLE1BSTNCRyxRQUoyQjtBQUFBLE1BSWpCQyxXQUppQjs7QUFBQSxtQkFLSUosK0NBQVEsQ0FBUyxJQUFULENBTFo7QUFBQSxNQUszQkssV0FMMkI7QUFBQSxNQUtkQyxjQUxjOztBQU9sQyxNQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFDQSxNQUFJLE9BQU9ULElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJTLFNBQUssR0FBR1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsR0FBVixDQUFSO0FBQ0Q7O0FBRURDLGtEQUFTLENB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SjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFEUyxnQkF3QlQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUE1Qko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFpQ0Q7O0dBckd1QnhCLFM7VUFDUEUsa0Q7OztLQURPRixTIiwiZmlsZSI6Ii4vcGFnZXMvdmlldy9bLi4uc2x1Z10udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmludGVyZmFjZSBUaWNrZXREYXRhIHtcbiAgaGFzaDogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG4gIGV4cGlyYXRpb246IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlld0ltYWdlKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgeyBzbHVnIH0gPSByb3V0ZXIucXVlcnk7XG4gIGNvbnN0IFt0aWNrZXREYXRhLCBzZXRUaWNrZXREYXRhXSA9IHVzZVN0YXRlPFRpY2tldERhdGE+KG51bGwpO1xuICBjb25zdCBbYXBwcm92ZWQsIHNldEFwcHJvdmVkXSA9IHVzZVN0YXRlPHN0cmluZz4obnVsbCk7XG4gIGNvbnN0IFt0aWNrZXRFcnJvciwgc2V0VGlja2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nPihudWxsKTtcblxuICBsZXQgaW1hZ2UgPSBudWxsO1xuICBpZiAodHlwZW9mIHNsdWcgPT09IFwib2JqZWN0XCIpIHtcbiAgICBpbWFnZSA9IHNsdWcuam9pbihcIi9cIik7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRV9GVU5DVElPTlNfSE9TVCArXG4gICAgICAgICAgXCJnZXRUaWNrZXRcIiArXG4gICAgICAgICAgYD9pbWFnZT0ke2VuY29kZVVSSUNvbXBvbmVudChpbWFnZSl9YCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHRpY2tldCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgaWYgKHRpY2tldC5lcnJvcikge1xuICAgICAgICBzZXRUaWNrZXRFcnJvcih0aWNrZXQuZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGlja2V0RGF0YSh0aWNrZXQpO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH0sIFtpbWFnZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrQWNjZXNzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRpY2tldERhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFX0ZVTkNUSU9OU19IT1NUICtcbiAgICAgICAgICAgIFwiY2FuQWNjZXNzSW1hZ2VcIiArXG4gICAgICAgICAgICBgP2ltYWdlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKX0maGFzaD0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgICAgdGlja2V0RGF0YS5oYXNoXG4gICAgICAgICAgICApfWBcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjYW5BY2Nlc3NJbWFnZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc2V0QXBwcm92ZWQoY2FuQWNjZXNzSW1hZ2UuYXBwcm92ZWQpO1xuXG4gICAgICAgIGlmIChjYW5BY2Nlc3NJbWFnZS5hcHByb3ZlZCA9PT0gXCJub3QgeWV0XCIpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWNjZXNzLCA1ICogMTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tBY2Nlc3MoKTtcbiAgfSwgW2ltYWdlLCB0aWNrZXREYXRhXSk7XG5cbiAgaWYgKCFpbWFnZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMCBwLTQgdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSB0ZXh0LTJ4bFwiPlxuICAgICAgICA8aDE+VmFjY2luZSBQYXNzcG9ydDwvaDE+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIHt0aWNrZXREYXRhID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIHAtOCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIHsoIWFwcHJvdmVkIHx8IGFwcHJvdmVkID09PSBcIm5vdCB5ZXRcIikgJiYgdGlja2V0RGF0YSAmJiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cD5SZXF1ZXN0aW5nIEFjY2Vzcy48L3A+XG4gICAgICAgICAgICAgIDxwPllvdXIgY29kZSBpcyB7dGlja2V0RGF0YS5jb2RlfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAge2FwcHJvdmVkICYmIGFwcHJvdmVkID09PSBcImludmFsaWQgdGlja2V0XCIgJiYgKFxuICAgICAgICAgICAgPGRpdj5QbGVhc2UgcmVzY2FuIHRoZSBRUiBjb2RlPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7YXBwcm92ZWQgJiYgYXBwcm92ZWQgPT09IFwiYXBwcm92ZWRcIiAmJiAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz17XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRV9GVU5DVElPTlNfSE9TVCArXG4gICAgICAgICAgICAgICAgXCJkb3dubG9hZEltYWdlXCIgK1xuICAgICAgICAgICAgICAgIGA/aW1hZ2U9JHtlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpfSZoYXNoPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgdGlja2V0RGF0YS5oYXNoXG4gICAgICAgICAgICAgICAgKX1gXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2PkxvYWRpbmcuLi48L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/view/[...slug].tsx\n");

/***/ })

});