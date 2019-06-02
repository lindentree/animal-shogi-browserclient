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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/src/index.jsx: Unexpected token (518:11)\\n\\n\\u001b[0m \\u001b[90m 516 | \\u001b[39m          \\u001b[36mreturn\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 517 | \\u001b[39m      } \\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 518 | \\u001b[39m    } \\u001b[36melse\\u001b[39m \\u001b[36mif\\u001b[39m (name \\u001b[33m!==\\u001b[39m \\u001b[36mnull\\u001b[39m \\u001b[33m&&\\u001b[39m mark \\u001b[33m===\\u001b[39m \\u001b[32m'bench'\\u001b[39m \\u001b[33m&&\\u001b[39m \\u001b[33m!\\u001b[39mmoving){\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m           \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 519 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 520 | \\u001b[39m         let currentPiece \\u001b[33m=\\u001b[39m pieces[name]\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 521 | \\u001b[39m\\u001b[0m\\n    at Object.raise (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:6344:17)\\n    at Object.unexpected (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:7659:16)\\n    at Object.parseClassMemberWithIsStatic (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10735:12)\\n    at Object.parseClassMember (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10631:10)\\n    at /Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10586:14\\n    at Object.withTopicForbiddingContext (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:9683:14)\\n    at Object.parseClassBody (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10563:10)\\n    at Object.parseClass (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10537:22)\\n    at Object.parseStatementContent (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:9830:21)\\n    at Object.parseStatement (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:9788:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10364:25)\\n    at Object.parseBlockBody (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:10351:10)\\n    at Object.parseTopLevel (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:9717:10)\\n    at Object.parse (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:11233:17)\\n    at parse (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/parser/lib/index.js:11269:38)\\n    at parser (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\\n    at runSync (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at /Users/lindentree/HackReactor/hrsf107-mvp/react-animal-shogi/node_modules/@babel/core/lib/transform.js:34:34\\n    at processTicksAndRejections (internal/process/task_queues.js:82:9)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanN4LmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.jsx\n");

/***/ })

/******/ });