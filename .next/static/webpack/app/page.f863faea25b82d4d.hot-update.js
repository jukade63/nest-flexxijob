"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./lib/features/counter/Counter.tsx":
/*!******************************************!*\
  !*** ./lib/features/counter/Counter.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Counter: function() { return /* binding */ Counter; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _counter_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./counter.module.css */ \"(app-pages-browser)/./lib/features/counter/counter.module.css\");\n/* harmony import */ var _counter_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_counter_module_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks */ \"(app-pages-browser)/./lib/hooks.ts\");\n/* harmony import */ var _counterSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./counterSlice */ \"(app-pages-browser)/./lib/features/counter/counterSlice.ts\");\n/* __next_internal_client_entry_do_not_use__ Counter auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Counter() {\n    _s();\n    const count = (0,_hooks__WEBPACK_IMPORTED_MODULE_2__.useAppSelector)((state)=>state.counter.value);\n    const dispatch = (0,_hooks__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_counter_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                \"aria-label\": \"Increment value\",\n                onClick: ()=>dispatch((0,_counterSlice__WEBPACK_IMPORTED_MODULE_3__.increment)()),\n                children: \"Increment\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\admin\\\\Desktop\\\\nextjs-demo\\\\lib\\\\features\\\\counter\\\\Counter.tsx\",\n                lineNumber: 15,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: count\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\admin\\\\Desktop\\\\nextjs-demo\\\\lib\\\\features\\\\counter\\\\Counter.tsx\",\n                lineNumber: 21,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                \"aria-label\": \"Decrement value\",\n                onClick: ()=>dispatch((0,_counterSlice__WEBPACK_IMPORTED_MODULE_3__.decrement)()),\n                children: \"Decrement\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\admin\\\\Desktop\\\\nextjs-demo\\\\lib\\\\features\\\\counter\\\\Counter.tsx\",\n                lineNumber: 22,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\admin\\\\Desktop\\\\nextjs-demo\\\\lib\\\\features\\\\counter\\\\Counter.tsx\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n_s(Counter, \"69pYTulermizp4n+q9BDtJH+xs8=\", false, function() {\n    return [\n        _hooks__WEBPACK_IMPORTED_MODULE_2__.useAppSelector,\n        _hooks__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch\n    ];\n});\n_c = Counter;\nvar _c;\n$RefreshReg$(_c, \"Counter\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9mZWF0dXJlcy9jb3VudGVyL0NvdW50ZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFeUI7QUFDaUI7QUFFZ0I7QUFDTDtBQUU5QyxTQUFTTTs7SUFDWixNQUFNQyxRQUFRSixzREFBY0EsQ0FBQyxDQUFDSyxRQUFxQkEsTUFBTUMsT0FBTyxDQUFDQyxLQUFLO0lBQ3RFLE1BQU1DLFdBQVdULHNEQUFjQTtJQUVqQyxxQkFDRSw4REFBQ1U7UUFBSUMsV0FBV1osc0VBQWdCOzswQkFDNUIsOERBQUNjO2dCQUNDQyxjQUFXO2dCQUNYQyxTQUFTLElBQU1OLFNBQVNOLHdEQUFTQTswQkFDbEM7Ozs7OzswQkFHRCw4REFBQ2E7MEJBQUlYOzs7Ozs7MEJBQ0wsOERBQUNRO2dCQUNDQyxjQUFXO2dCQUNYQyxTQUFTLElBQU1OLFNBQVNQLHdEQUFTQTswQkFDbEM7Ozs7Ozs7Ozs7OztBQUtUO0dBckJnQkU7O1FBQ0VILGtEQUFjQTtRQUNYRCxrREFBY0E7OztLQUZuQkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL2ZlYXR1cmVzL2NvdW50ZXIvQ291bnRlci50c3g/Mzg0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9jb3VudGVyLm1vZHVsZS5jc3NcIjsgXHJcbmltcG9ydCB0eXBlIHsgUm9vdFN0YXRlIH0gZnJvbSAnLi4vLi4vc3RvcmUnXHJcbmltcG9ydCB7dXNlQXBwRGlzcGF0Y2gsIHVzZUFwcFNlbGVjdG9yfSBmcm9tICcuLi8uLi9ob29rcydcclxuaW1wb3J0IHsgZGVjcmVtZW50LCBpbmNyZW1lbnQgfSBmcm9tICcuL2NvdW50ZXJTbGljZSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb3VudGVyKCkge1xyXG4gICAgY29uc3QgY291bnQgPSB1c2VBcHBTZWxlY3Rvcigoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gc3RhdGUuY291bnRlci52YWx1ZSlcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlQXBwRGlzcGF0Y2goKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJJbmNyZW1lbnQgdmFsdWVcIlxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gZGlzcGF0Y2goaW5jcmVtZW50KCkpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIEluY3JlbWVudFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxoMT57Y291bnR9PC9oMT5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiRGVjcmVtZW50IHZhbHVlXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKGRlY3JlbWVudCgpKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBEZWNyZW1lbnRcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufSJdLCJuYW1lcyI6WyJSZWFjdCIsInN0eWxlcyIsInVzZUFwcERpc3BhdGNoIiwidXNlQXBwU2VsZWN0b3IiLCJkZWNyZW1lbnQiLCJpbmNyZW1lbnQiLCJDb3VudGVyIiwiY291bnQiLCJzdGF0ZSIsImNvdW50ZXIiLCJ2YWx1ZSIsImRpc3BhdGNoIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiYnV0dG9uIiwiYXJpYS1sYWJlbCIsIm9uQ2xpY2siLCJoMSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/features/counter/Counter.tsx\n"));

/***/ })

});