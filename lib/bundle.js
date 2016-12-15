/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _algorithm_visualization = __webpack_require__(1);
	
	var _algorithm_visualization2 = _interopRequireDefault(_algorithm_visualization);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function (event) {
	  // console.log("Creating new AlgorithmVisualization instance");
	  new _algorithm_visualization2.default();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _quicksort = __webpack_require__(2);
	
	var _quicksort2 = _interopRequireDefault(_quicksort);
	
	var _test = __webpack_require__(5);
	
	var _test2 = _interopRequireDefault(_test);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var visAreaId = "visualization-area";
	var svgPathContainerId = "path-container";
	var algorithmTitleId = "vis-area-title";
	var drawingAreaId = "drawing-area";
	var sidebarAreaId = "sidebar-container";
	var titleSizeFactor = 0.05;
	
	var AlgorithmVisualization = function () {
	  function AlgorithmVisualization() {
	    _classCallCheck(this, AlgorithmVisualization);
	
	    this.sizeVisualizationArea();
	    this.options = this.buildOptions();
	
	    // new test(this.options);
	    this.quickSort();
	  }
	
	  // Size visualization area and svg container
	
	
	  _createClass(AlgorithmVisualization, [{
	    key: 'sizeVisualizationArea',
	    value: function sizeVisualizationArea() {
	      $("body").css("overflow", "hidden");
	      var windowWidth = $(window).width();
	      var windowHeight = $(window).innerHeight();
	      var algorithmTitle = $('#' + algorithmTitleId);
	      var sidebarWidth = $('#' + sidebarAreaId).width();
	
	      algorithmTitle.css({
	        "font-size": titleSizeFactor * windowHeight
	      });
	
	      var svgContHeight = windowHeight - titleSizeFactor * windowHeight - parseInt(algorithmTitle.css("padding-top")) - parseInt(algorithmTitle.css("padding-bottom"));
	
	      $('#' + visAreaId).width(windowWidth - sidebarWidth);
	      // $(`#${visAreaId}`).outerHeight(windowHeight);
	      $('#' + svgPathContainerId).width(windowWidth - sidebarWidth);
	      $('#' + svgPathContainerId).height(svgContHeight);
	      $('#' + drawingAreaId).height(svgContHeight);
	    }
	  }, {
	    key: 'quickSort',
	    value: function quickSort() {
	      // console.log("Creating new QuickSort instance");
	      new _quicksort2.default(this.options);
	    }
	  }, {
	    key: 'buildOptions',
	    value: function buildOptions() {
	      return {
	        visAreaId: visAreaId,
	        algorithmTitleId: algorithmTitleId,
	        drawingAreaId: drawingAreaId,
	        svgPathContainerId: svgPathContainerId,
	        sidebarAreaId: sidebarAreaId,
	        arrayElContainerClass: "array-element-container",
	        bracketElClass: "bracket-element",
	        animateElClass: "animate",
	        stationaryElClass: "stationary",
	        arrayElClass: "array-element",
	        plusElClass: "plus-element",
	        spaceElClass: "space-element",
	        layerBackgroundClass: "layer-background",
	        activeElementClass: "active-element",
	        inactiveElementClass: "inactive-element",
	        pivotElementClass: "pivot-element",
	        legendClass: "legend",
	        legendEntryContClass: "legend-entry-cont",
	        legendElContClass: "legend-array-element-container",
	        legendPivotId: "legend-pivot",
	        legendActiveId: "legend-active",
	
	        pivotColor: "yellow",
	        pathColor: "none", // invisible, only need to be visible for testing
	        pathWidth: 3, // also only visible for testing
	        elementHeightFactor: 0.10,
	        elementWidthFactor: 0.045,
	        elementRadiusFactor: 0.35,
	        fontSizeFactor: 0.5,
	        minAnimationDuration: 700,
	
	        colorClasses: {
	          lightBlue1: "light-blue1",
	          lightBlue2: "light-blue2",
	          lightBlue3: "light-blue3",
	          lightBlue4: "light-blue4",
	          lightBlue5: "light-blue5"
	        }
	      };
	    }
	  }]);
	
	  return AlgorithmVisualization;
	}();
	
	module.exports = AlgorithmVisualization;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animation_options = __webpack_require__(3);
	
	var _animation_options2 = _interopRequireDefault(_animation_options);
	
	var _animejs = __webpack_require__(4);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Quicksort = function (_AnimationOptions) {
	  _inherits(Quicksort, _AnimationOptions);
	
	  function Quicksort(options) {
	    _classCallCheck(this, Quicksort);
	
	    var _this = _possibleConstructorReturn(this, (Quicksort.__proto__ || Object.getPrototypeOf(Quicksort)).call(this, options));
	
	    _this.startArray = [5, 1, 2, 3, 7, 4, 0, 6];
	    _this.numElements = _this.startArray.length;
	    _this.leftIndent = _this.calculateLeftIndent();
	    _this.algorithmTitle.html("Quicksort Visualization");
	
	    _this.timeStagger = 150;
	    _this.timingBetweenLayers = 500;
	    _this.fadeInSpeed = 1500;
	    _this.layerLabelClass = "layer-label";
	
	    _this.renderStartLayer();
	    _this.configureLayerOptions();
	    _this.renderBackgrounds();
	    _this.renderLayers();
	    _this.createLegend();
	
	    $("body").html($("body").html());
	
	    _this.hideLayers();
	    _this.configureTimingOptions();
	    _this.fadeInStartLayer();
	    _this.beginAnimations();
	
	    // this.animateLayers();  // test function to make sure all animations work
	    return _this;
	  }
	
	  // create renderOptions for layers 1-8 (after start layer)
	
	
	  _createClass(Quicksort, [{
	    key: 'configureLayerOptions',
	    value: function configureLayerOptions() {
	      var sortLayers = ['L1', 'L2-left', 'L2-right', 'L3', 'L4'];
	      var mergeLayers = ['L5-left', 'L5-right', 'L6-left', 'L6-right-l', 'L6-right-r', 'L7-left', 'L7-mid', 'L7-right', 'L8'];
	
	      this.layers = [].concat(sortLayers).concat(mergeLayers);
	
	      this.fromArrays = {
	        'L1': this.startArray, // layer 0 - 1
	        'L2-left': [1, 0], // layer 1-2 left
	        'L2-right': [5, 3, 7, 4, 6], // layer 1-2 right
	        'L3': [5, 7, 6], // layer 3
	        'L4': [5, 6], // layer 4
	        'L5-left': [5, 6], // layer 5 left
	        'L5-right': [7], // layer 5 right
	        'L6-left': [0, 1],
	        'L6-right-l': [3, 4],
	        'L6-right-r': [5, 6, 7],
	        'L7-left': [0, 1],
	        'L7-mid': [2],
	        'L7-right': [3, 4, 5, 6, 7],
	        'L8': [0, 1, 2, 3, 4, 5, 6, 7]
	      };
	
	      this.sectionCharStrings = {
	        'L1': '[10]+[2]+[53746]', // layer 1
	        'L2-left': '[0]+[1]+[ ]', // layer 2 left
	        'L2-right': '[3]+[4]+[576]', // layer 2 right
	        'L3': '[56]+[7]+[ ]', // layer 3
	        'L4': '[5]+[6]+[ ]', // layer 4
	        'L5-left': '[56]+', // layer 5 left
	        'L5-right': '[7]', // layer 5 right
	        'L6-left': '[0]+[1]+[ ]', // layer 6 left
	        'L6-right-l': '[3]+[4]+', // layer 6 right - left half
	        'L6-right-r': '[567]', // layer 6 right - right half
	        'L7-left': '[01]+',
	        'L7-mid': '[2]+',
	        'L7-right': '[34567]',
	        'L8': '[01234567]'
	      };
	
	      this.fromLayers = {
	        'L1': 0,
	        'L2-left': 1,
	        'L2-right': 1,
	        'L3': 2,
	        'L4': 3,
	        'L5-left': 4,
	        'L5-right': 3,
	        'L6-left': 2,
	        'L6-right-l': 2,
	        'L6-right-r': 5,
	        'L7-left': 6,
	        'L7-mid': 1,
	        'L7-right': 6,
	        'L8': 7
	      };
	
	      this.toLayers = {
	        'L1': 1,
	        'L2-left': 2,
	        'L2-right': 2,
	        'L3': 3,
	        'L4': 4,
	        'L5-left': 5,
	        'L5-right': 5,
	        'L6-left': 6,
	        'L6-right-l': 6,
	        'L6-right-r': 6,
	        'L7-left': 7,
	        'L7-mid': 7,
	        'L7-right': 7,
	        'L8': 8
	      };
	
	      this.referenceEls = {
	        'L1': 2,
	        'L2-left': 1,
	        'L2-right': 4,
	        'L3': 7,
	        'L4': 6,
	        'L5-left': 6,
	        'L5-right': 7,
	        'L6-left': 1,
	        'L6-right-l': 4,
	        'L6-right-r': 5,
	        'L7-left': 0,
	        'L7-mid': 2,
	        'L7-right': 4,
	        'L8': 2
	      };
	
	      // for positioning reference
	      this.customOffset = {
	        'L6-right-r': { dir: 1, offsetChars: '4]+' },
	        'L7-left': { dir: 1, offsetChars: '0]+' },
	        'L7-right': { dir: -1, offsetChars: '[345' }
	      };
	    }
	
	    // hides layers after rendering in preparation for animation
	
	  }, {
	    key: 'hideLayers',
	    value: function hideLayers() {
	      for (var i = 0; i <= 8; i++) {
	        $('.' + this.getLayerClass(i)).fadeOut(0);
	      }
	    }
	
	    // Calculate timings for each layer
	
	  }, {
	    key: 'configureTimingOptions',
	    value: function configureTimingOptions() {
	      var _this2 = this;
	
	      // Animation time of the start layer
	      // this.startAnimationRunTime = this.timingBetweenLayers +
	      //                              (this.startArray.length-1) * this.timeStagger +
	      //                              this.fadeInSpeed;
	      this.startAnimationRunTime = -1 * this.timingBetweenLayers + (this.startArray.length - 1) * this.timeStagger + this.fadeInSpeed;
	
	      this.layerDelays = {};
	
	      var prevLayer = this.layers[0];
	
	      // Layer 0 total delay is time to fade in start array elements + fadeInSpeed
	      //   for the last element + timing between layers
	      this.layerDelays[prevLayer] = {};
	      this.layerDelays[prevLayer] = { base: this.startAnimationRunTime,
	        waitTime: this.fadeInSpeed - 1 * this.timingBetweenLayers,
	        elements: {} };
	
	      var toLayer = void 0,
	          numElements = void 0,
	          pathTime = void 0,
	          referenceEl = void 0,
	          referenceElPathTime = void 0;
	
	      this.layers.forEach(function (layer) {
	        toLayer = _this2.toLayers[layer];
	        numElements = _this2.fromArrays[layer].length;
	
	        if (layer !== _this2.layers[0]) {
	          _this2.layerDelays[layer] = { base: 0, waitTime: 0, elements: {} };
	          _this2.layerDelays[layer].base += _this2.layerDelays[prevLayer].base + _this2.layerDelays[prevLayer].waitTime;
	          _this2.layerDelays[layer].base += _this2.timingBetweenLayers;
	          _this2.layerDelays[layer].waitTime += _this2.timingBetweenLayers;
	        }
	
	        // Add new layer delay time if starting new layer and not just adding
	        // to existing layer
	        // if (this.toLayers[prevLayer] !== toLayer) {
	        //   console.log("Adding layer time delay to layer ", layer);
	        //   this.layerDelays[layer].base += this.timingBetweenLayers;
	        //   this.layerDelays[layer].waitTime += this.timingBetweenLayers;
	        // }
	
	        // toLayers less than 4 are sorting layers that have reference elements
	        //   (pivot elements) that need to be animated first
	        if (toLayer <= 4) {
	          referenceEl = _this2.referenceEls[layer];
	          referenceElPathTime = _this2.getPathTraversalTime({
	            fromLayer: _this2.fromLayers[layer],
	            toLayer: toLayer,
	            val: referenceEl
	          });
	          _this2.layerDelays[layer].elements[referenceEl] = _this2.timeStagger + _this2.layerDelays[layer].waitTime;
	          _this2.layerDelays[layer].waitTime += referenceElPathTime + _this2.timeStagger;
	        }
	
	        _this2.fromArrays[layer].forEach(function (el) {
	          // Pivot elements in the sorting layers have already had animation times
	          //   calculated and should be skipped.
	          if (toLayer <= 4 && el === referenceEl) return;
	
	          pathTime = _this2.getPathTraversalTime({
	            fromLayer: _this2.fromLayers[layer],
	            toLayer: toLayer,
	            val: el
	          });
	
	          //
	          _this2.layerDelays[layer].elements[el] = _this2.timeStagger + _this2.layerDelays[layer].waitTime;
	          _this2.layerDelays[layer].waitTime += pathTime + _this2.timeStagger;
	        });
	        prevLayer = layer;
	      });
	      console.log(this.layerDelays);
	      window.layerDelays = this.layerDelays;
	    }
	  }, {
	    key: 'beginAnimations',
	    value: function beginAnimations() {
	      var _this3 = this;
	
	      var prevLayer = this.layers[0];
	      var prevToLayer = 1;
	      var toLayer = 1;
	
	      var $layerBrackets = void 0,
	          $layerPlusEls = void 0,
	          $prevLayerEls = void 0,
	          $layerBG = void 0;
	      var layerClass = void 0,
	          prevLayerClass = void 0;
	
	      // Render brackets and plus signs for layer 1
	      setTimeout(function () {
	        // console.log("toLayer: ", toLayer);
	        // console.log(this.layerDelays[prevLayer].base);
	        layerClass = _this3.getLayerClass(toLayer);
	        $layerBrackets = $('.' + layerClass + '.' + _this3.bracketElClass);
	        $layerPlusEls = $('.' + layerClass + '.' + _this3.plusElClass);
	        $layerBG = $('.' + layerClass + '.' + _this3.layerBackgroundClass);
	
	        $layerBrackets.fadeIn(_this3.fadeInSpeed);
	        $layerPlusEls.fadeIn(_this3.fadeInSpeed);
	        $layerBG.fadeIn(_this3.fadeInSpeed);
	      }.bind(this), this.layerDelays[prevLayer].base);
	
	      this.layers.forEach(function (layer) {
	        setTimeout(function () {
	          toLayer = _this3.toLayers[layer];
	          if (prevToLayer !== toLayer) {
	            // console.log("toLayer: ", toLayer);
	            // console.log(this.layerDelays[layer].base);
	            layerClass = _this3.getLayerClass(toLayer);
	            prevLayerClass = _this3.getLayerClass(prevToLayer);
	
	            $layerBrackets = $('.' + layerClass + '.' + _this3.bracketElClass);
	            $layerPlusEls = $('.' + layerClass + '.' + _this3.plusElClass);
	            $prevLayerEls = $('.' + prevLayerClass + '.' + _this3.arrayElContainerClass + ('.' + _this3.animateElClass));
	            $layerBG = $('.' + layerClass + '.' + _this3.layerBackgroundClass);
	
	            $layerBrackets.fadeIn(_this3.fadeInSpeed);
	            $layerPlusEls.fadeIn(_this3.fadeInSpeed);
	            $prevLayerEls.fadeIn(_this3.fadeInSpeed);
	            $layerBG.fadeIn(_this3.fadeInSpeed);
	          }
	
	          var referenceEl = _this3.referenceEls[layer];
	          var fromArray = _this3.fromArrays[layer];
	          // console.log("\ntoLayer: ", toLayer);
	          // console.log("fromArray: ", fromArray);
	          // console.log("referenceEl: ", referenceEl);
	
	
	          if (toLayer <= 4) {
	            // console.log("\ntoLayer: ", toLayer);
	            // console.log("referenceEl: ", referenceEl);
	            // console.log("delayTime: ", this.layerDelays[layer].elements[referenceEl]);
	            var elementDelay = _this3.layerDelays[layer].elements[referenceEl];
	
	            setTimeout(function () {
	              _this3.markActivePivot(_this3.fromLayers[layer], referenceEl, true);
	
	              _this3.createAnimation({
	                fromLayer: _this3.fromLayers[layer],
	                toLayer: _this3.toLayers[layer],
	                val: referenceEl
	              });
	            }.bind(_this3), elementDelay);
	          }
	
	          var _loop = function _loop(i) {
	            var el = fromArray[i];
	            if (toLayer <= 4 && el === referenceEl) return 'continue';
	
	            var elementDelay = _this3.layerDelays[layer].elements[el];
	            var deactivateStagger = _this3.getPathTraversalTime({
	              fromLayer: _this3.fromLayers[layer],
	              toLayer: _this3.toLayers[layer],
	              val: el
	            });
	
	            setTimeout(function () {
	              setTimeout(function () {
	                _this3.markInactive(_this3.fromLayers[layer], el, true);
	              }.bind(_this3), deactivateStagger);
	
	              _this3.markActive(_this3.fromLayers[layer], el, true);
	
	              _this3.createAnimation({
	                fromLayer: _this3.fromLayers[layer],
	                toLayer: _this3.toLayers[layer],
	                val: el
	              });
	            }.bind(_this3), elementDelay);
	          };
	
	          for (var i = 0; i < fromArray.length; i++) {
	            var _ret = _loop(i);
	
	            if (_ret === 'continue') continue;
	          }
	
	          prevToLayer = toLayer;
	        }.bind(_this3), _this3.layerDelays[layer].base);
	      });
	    }
	  }, {
	    key: 'fadeInStartLayer',
	    value: function fadeInStartLayer() {
	      var _this4 = this;
	
	      console.log("Beginning animation of layer 0");
	      var layer = 0;
	      // let totalTime = 0;
	
	      // console.log(`totalTime beginning: ${totalTime}`);
	
	      $('.' + this.getLayerClass(0) + '.' + this.layerBackgroundClass).fadeIn(this.fadeInSpeed);
	      $('.' + this.getLayerClass(0) + '.' + this.bracketElClass).fadeIn(this.fadeInSpeed);
	      $('.' + this.getLayerClass(0) + '.' + this.legendClass).fadeIn(this.fadeInSpeed);
	
	      setTimeout(function () {
	        // totalTime += this.timeDelay;
	        // console.log(`totalTime update: ${totalTime}`);
	        _this4.startArray.forEach(function (el, idx) {
	          setTimeout(function () {
	            // if (idx > 0) totalTime += this.timeStagger;
	            // if (idx === this.startArray.length - 1) totalTime += this.fadeInSpeed;
	            // console.log(`totalTime update: ${totalTime}`);
	            $('#' + _this4.createArrayElId(layer, el, false)).fadeIn(_this4.fadeInSpeed);
	            $('#' + _this4.createArrayElId(layer, el, true)).fadeIn(_this4.fadeInSpeed);
	          }.bind(_this4), idx * _this4.timeStagger);
	        });
	      }.bind(this), this.timeDelay);
	
	      // console.log(`totalTime end: ${totalTime}`);
	    }
	  }, {
	    key: 'markActive',
	    value: function markActive(layer, val, animateable) {
	      var $targetEl = $('#' + this.createArrayElId(layer, val, animateable));
	      $targetEl.addClass(this.activeElementClass);
	    }
	  }, {
	    key: 'markInactive',
	    value: function markInactive(layer, val, animateable) {
	      var $targetEl = $('#' + this.createArrayElId(layer, val, animateable));
	      $targetEl.removeClass(this.activeElementClass);
	      $targetEl.addClass(this.inactiveElementClass);
	    }
	  }, {
	    key: 'markActivePivot',
	    value: function markActivePivot(layer, val, animateable) {
	      var $targetEl = $('#' + this.createArrayElId(layer, val, animateable));
	      $targetEl.addClass(this.pivotElementClass);
	    }
	
	    // renders start layer
	
	  }, {
	    key: 'renderStartLayer',
	    value: function renderStartLayer() {
	      var _this5 = this;
	
	      // Create open bracket
	      var openingBracket = this.createArrayBracket({
	        topOffset: 0,
	        leftOffset: this.leftIndent,
	        bracketType: '[',
	        layer: 0
	      });
	      this.drawingArea.append(openingBracket);
	
	      var arrayElementParams = void 0;
	
	      this.startArray.forEach(function (el, idx) {
	        // Create layer 0 array elements.
	        arrayElementParams = {
	          val: el,
	          layer: 0,
	          topOffset: 0,
	          leftOffset: _this5.leftIndent + _this5.bracketWidth + idx * _this5.elementWidth
	        };
	        _this5.drawingArea.append(_this5.createArrayElement(arrayElementParams));
	
	        // Create layer 0 animateable elements.
	        arrayElementParams.animate = true;
	        _this5.drawingArea.append(_this5.createArrayElement(arrayElementParams));
	      });
	
	      // Create closing bracket
	      var closingBracket = this.createArrayBracket({
	        topOffset: 0,
	        leftOffset: this.leftIndent + this.numElements * this.elementWidth + this.bracketWidth,
	        bracketType: ']',
	        layer: 0
	      });
	      this.drawingArea.append(closingBracket);
	    }
	  }, {
	    key: 'renderBackgrounds',
	    value: function renderBackgrounds() {
	      var _this6 = this;
	
	      this.backgroundInfo = {
	        0: { class: this.colorClasses["lightBlue1"], text: 'Base\nLayer' },
	        1: { class: this.colorClasses["lightBlue2"], text: 'Recursion\nLayer 1' },
	        2: { class: this.colorClasses["lightBlue3"], text: 'Recursion\nLayer 2' },
	        3: { class: this.colorClasses["lightBlue4"], text: 'Recursion\nLayer 3' },
	        4: { class: this.colorClasses["lightBlue5"], text: 'Recursion\nLayer 4' },
	        5: { class: this.colorClasses["lightBlue4"], text: 'Recursion\nLayer 3' },
	        6: { class: this.colorClasses["lightBlue3"], text: 'Recursion\nLayer 2' },
	        7: { class: this.colorClasses["lightBlue2"], text: 'Recursion\nLayer 1' },
	        8: { class: this.colorClasses["lightBlue1"], text: 'Base\nLayer' }
	      };
	
	      Object.keys(this.backgroundInfo).forEach(function (layer) {
	        _this6.drawingArea.append(_this6.createBackgroundLayerElement({
	          layer: layer,
	          colorClass: _this6.backgroundInfo[layer].class,
	          text: _this6.backgroundInfo[layer].text
	        }));
	      });
	    }
	
	    // creates layers of elements and svg paths
	
	  }, {
	    key: 'renderLayers',
	    value: function renderLayers() {
	      var _this7 = this;
	
	      this.layers.forEach(function (layer, idx) {
	        console.log('rendering layer ' + idx + ': ' + layer);
	        var renderOptions = {
	          fromArray: _this7.fromArrays[layer],
	          fromLayer: _this7.fromLayers[layer],
	          toLayer: _this7.toLayers[layer],
	          sectionCharString: _this7.sectionCharStrings[layer],
	          referenceEl: _this7.referenceEls[layer],
	          topOffset: _this7.toLayers[layer] * _this7.elementHeight,
	          layerLeftOffset: _this7.computeLayerLeftOffset(_this7.sectionCharStrings[layer], _this7.referenceEls[layer], _this7.customOffset[layer])
	        };
	        // if (layer === 'L6-right-r') debugger
	        _this7.renderSection(renderOptions);
	        renderOptions.animate = true;
	        _this7.renderSection(renderOptions);
	
	        _this7.createPaths(renderOptions);
	      });
	    }
	
	    // Compute left offset for a section of elements
	    // Takes the inputs:
	    //   sectionCharString: string representation of new elements including +, []
	    //   referenceEl: value of element at which the spacing is based on,
	    //                will stop adding element widths when referenceEl is reached,
	    //                ignored if referenceLayer is provided
	    //   referenceLayer: (optional) hash containing a "dir" key that is +- 1,
	    //                   used for computing offsets in the merging layers,
	
	  }, {
	    key: 'computeLayerLeftOffset',
	    value: function computeLayerLeftOffset(sectionCharString, referenceEl, referenceLayer) {
	      var sectionChars = referenceLayer ? referenceLayer["offsetChars"].split("") : sectionCharString.split("");
	      var currentChar = void 0;
	      var leftOffset = 0;
	
	      for (var i = 0; i < sectionChars.length; i++) {
	        currentChar = sectionChars[i];
	
	        if (currentChar === String(referenceEl) && !referenceLayer) break;else if (['[', ']'].includes(currentChar)) leftOffset += this.bracketWidth;else if (currentChar === '+') leftOffset += this.plusWidth;else if (currentChar === ' ') leftOffset += this.spaceWidth;else if (!isNaN(currentChar)) leftOffset += this.elementWidth;else throw 'Error in computeLeftOffset: received ' + currentChar;
	      }
	
	      if (referenceLayer) return referenceLayer["dir"] * leftOffset;
	      return -1 * leftOffset;
	    }
	
	    // Renders a section of a layer
	    // Takes an options object with the keys:
	    //     fromArray, fromLayer, toLayer, sectionCharString, layerLeftOffset,
	    //     topOffset, referenceEl
	
	  }, {
	    key: 'renderSection',
	    value: function renderSection(options) {
	      var _this8 = this;
	
	      var prevElements = {};
	
	      options.fromArray.forEach(function (el) {
	        prevElements[el] = $('#' + _this8.createArrayElId(options.fromLayer, el));
	      });
	      var referenceEl = prevElements[options.referenceEl];
	
	      var sectionChars = options.sectionCharString.split("");
	      var layerLeftOffset = parseInt(referenceEl.css("left")) + options.layerLeftOffset;
	      var topOffset = options.topOffset;
	
	      sectionChars.forEach(function (char) {
	        if (char === '[' || char === ']') {
	          _this8.drawingArea.append(_this8.createArrayBracket({
	            topOffset: topOffset,
	            leftOffset: layerLeftOffset,
	            bracketType: char,
	            layer: options.toLayer
	          }));
	          layerLeftOffset += _this8.bracketWidth;
	        } else if (char === '+') {
	          _this8.drawingArea.append(_this8.createPlusSign({
	            topOffset: topOffset,
	            leftOffset: layerLeftOffset,
	            layer: options.toLayer
	          }));
	          layerLeftOffset += _this8.plusWidth;
	        } else if (char === ' ') {
	          _this8.drawingArea.append(_this8.createSpaceEl({
	            topOffset: topOffset,
	            leftOffset: layerLeftOffset,
	            layer: options.toLayer
	          }));
	          layerLeftOffset += _this8.spaceWidth;
	        } else {
	          // must be an array element at this point
	          var newEl = _this8.createArrayElement({
	            layer: options.toLayer,
	            val: parseInt(char),
	            topOffset: topOffset,
	            leftOffset: layerLeftOffset,
	            animate: options.animate
	          });
	          // console.log(`Created ${newEl.attr('id')}`);
	          _this8.drawingArea.append(newEl);
	          layerLeftOffset += _this8.elementWidth;
	        }
	      });
	    }
	
	    // Renders a set of a paths
	    // Takes an options object with the keys:
	    //     fromArray, fromLayer, toLayer, sectionCharString, layerLeftOffset,
	    //     referenceEl
	
	  }, {
	    key: 'createPaths',
	    value: function createPaths(options) {
	      var _this9 = this;
	
	      var prevElements = {};
	
	      options.fromArray.forEach(function (el) {
	        prevElements[el] = $('#' + _this9.createArrayElId(options.fromLayer, el));
	      });
	
	      var sectionChars = options.sectionCharString.split("");
	      var prevRef = prevElements[options.referenceEl];
	      var layerLeftOffset = parseInt(prevRef.css("left")) + options.layerLeftOffset;
	
	      var prevLeft = void 0,
	          prevElement = void 0,
	          horizontalShift = void 0,
	          verticalShift = void 0,
	          xStart = void 0,
	          yStart = void 0;
	      verticalShift = (options.toLayer - options.fromLayer) * this.elementHeight;
	
	      sectionChars.forEach(function (char) {
	        if (char === '[' || char === ']') {
	          layerLeftOffset += _this9.bracketWidth;
	        } else if (char === '+') {
	          layerLeftOffset += _this9.plusWidth;
	        } else if (char === ' ') {
	          layerLeftOffset += _this9.spaceWidth;
	        } else {
	          // must be an array element at this point
	          prevElement = prevElements[parseInt(char)];
	          xStart = parseInt(prevElement.css("left"));
	          horizontalShift = layerLeftOffset - xStart;
	
	          yStart = parseInt(prevElement.css("top"));
	
	          _this9.createSvgPath({
	            fromLayer: options.fromLayer,
	            toLayer: options.toLayer,
	            val: parseInt(char),
	            xStart: 0,
	            yStart: 0,
	            verticalShift: verticalShift,
	            horizontalShift: horizontalShift
	          });
	          layerLeftOffset += _this9.elementWidth;
	        }
	      });
	    }
	  }, {
	    key: 'createLegend',
	    value: function createLegend() {
	      this.legendWidth = this.legendFontSize * 11;
	      this.legendEntryContWidth = this.legendRadius * 2 + 20;
	      this.legendEntryContHeight = this.legendRadius * 2 + 4;
	      this.legendHeight = this.legendEntryContHeight * 2 + 10;
	
	      var legendOptions = {
	        width: this.legendWidth,
	        height: this.legendHeight,
	        class: this.createLegendClass(),
	        top: (this.elementHeight - this.legendHeight) / 2,
	        left: this.drawingArea.width() - this.legendWidth - 20
	      };
	
	      var legendEntryOptions = {
	        width: this.legendWidth,
	        height: this.legendEntryContHeight,
	        class: this.legendEntryContClass
	      };
	
	      var pivotElementContOptions = {
	        class: this.legendElContClass + ' ' + this.pivotElementClass,
	        width: this.legendEntryContWidth,
	        height: this.legendEntryContHeight,
	        id: this.legendPivotId
	      };
	
	      var activeElementContOptions = {
	        class: this.legendElContClass + ' ' + this.activeElementClass,
	        width: this.legendEntryContWidth,
	        height: this.legendEntryContHeight,
	        id: this.legendActiveId
	      };
	
	      var pivotElementOptions = {
	        class: '' + this.arrayElClass,
	        width: this.legendRadius * 2,
	        height: this.legendRadius * 2
	      };
	
	      var activeElementOptions = {
	        class: '' + this.arrayElClass,
	        width: this.legendRadius * 2,
	        height: this.legendRadius * 2
	      };
	
	      var $legend = $("<div>", legendOptions);
	      $legend.offset({ left: legendOptions.left, top: legendOptions.top });
	
	      var $pivotCont = $("<div>", legendEntryOptions);
	      var $activeCont = $("<div>", legendEntryOptions);
	
	      var $pivotCircleCont = $("<div>", pivotElementContOptions);
	      var $activeCircleCont = $("<div>", activeElementContOptions);
	      var $pivotCircle = $("<div>", pivotElementOptions);
	      var $activeCircle = $("<div>", activeElementOptions);
	
	      var $pivotText = $("<p>", { style: 'font-size:' + this.legendFontSize + 'px' });
	      $pivotText.html("pivot element");
	      var $activeText = $("<p>", { style: 'font-size:' + this.legendFontSize + 'px' });
	      $activeText.html("current element");
	
	      $pivotCircleCont.append($pivotCircle);
	      $pivotCont.append($pivotCircleCont);
	      $pivotCont.append($pivotText);
	
	      $activeCircleCont.append($activeCircle);
	      $activeCont.append($activeCircleCont);
	      $activeCont.append($activeText);
	
	      $legend.append($pivotCont);
	      $legend.append($activeCont);
	      this.drawingArea.append($legend);
	    }
	
	    // test function to make sure all animations work
	
	  }, {
	    key: 'animateLayers',
	    value: function animateLayers() {
	      var _this10 = this;
	
	      this.layers.forEach(function (layer, idx) {
	        var referenceEl = _this10.referenceEls[layer];
	        var fromArray = _this10.fromArrays[layer];
	
	        _this10.createAnimation({
	          fromLayer: _this10.fromLayers[layer],
	          toLayer: _this10.toLayers[layer],
	          val: referenceEl
	        });
	
	        fromArray.forEach(function (el) {
	          if (el === referenceEl) return;
	          _this10.createAnimation({
	            fromLayer: _this10.fromLayers[layer],
	            toLayer: _this10.toLayers[layer],
	            val: el
	          });
	        });
	      });
	    }
	  }]);
	
	  return Quicksort;
	}(_animation_options2.default);
	
	module.exports = Quicksort;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animejs = __webpack_require__(4);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AnimationOptions = function () {
	  function AnimationOptions(options) {
	    _classCallCheck(this, AnimationOptions);
	
	    this.visAreaId = options.visAreaId;
	    this.algorithmTitle = $("#" + options.algorithmTitleId);
	    this.drawingArea = $("#" + options.drawingAreaId);
	    this.arrayElContainerClass = options.arrayElContainerClass;
	    this.pathContainer = $("#" + options.svgPathContainerId);
	    this.arrayElClass = options.arrayElClass;
	    this.bracketElClass = options.bracketElClass;
	    this.animateElClass = options.animateElClass;
	    this.stationaryElClass = options.stationaryElClass;
	    this.plusElClass = options.plusElClass;
	    this.spaceElClass = options.spaceElClass;
	    this.layerBackgroundClass = options.layerBackgroundClass;
	    this.activeElementClass = options.activeElementClass;
	    this.inactiveElementClass = options.inactiveElementClass;
	    this.pivotElementClass = options.pivotElementClass;
	    this.legendClass = options.legendClass;
	    this.legendEntryContClass = options.legendEntryContClass;
	    this.legendElContClass = options.legendElContClass;
	    this.legendPivotId = options.legendPivotId;
	    this.legendActiveId = options.legendActiveId;
	
	    this.pivotColor = options.pivotColor;
	    this.pathColor = options.pathColor; // only time !== none is for testing
	    this.pathWidth = options.pathWidth; // just for testing
	
	    this.elementHeightFactor = options.elementHeightFactor;
	    this.elementWidthFactor = options.elementWidthFactor;
	    this.elementRadiusFactor = options.elementRadiusFactor;
	    this.fontSizeFactor = options.fontSizeFactor;
	
	    this.calibrateSizings();
	
	    this.plusSize = this.fontSize;
	    this.plusWidth = Math.floor(this.elementWidth * 0.5);
	    this.plusHeight = this.elementHeight;
	
	    this.spaceWidth = Math.floor(this.elementWidth * 0.25);
	    this.spaceHeight = this.elementHeight;
	
	    this.animationSpeed = this.configureAnimationSpeed();
	    this.minAnimationDuration = options.minAnimationDuration;
	
	    this.colorClasses = options.colorClasses;
	    // this.printOptions(options);
	    this.bindMethodsToWindow(); // for testing
	  }
	
	  // for testing
	
	
	  _createClass(AnimationOptions, [{
	    key: "bindMethodsToWindow",
	    value: function bindMethodsToWindow() {
	      window.animateElClass = this.animateElClass;
	      window.arrayElContainerClass = this.arrayElContainerClass;
	
	      window.createPathId = this.createPathId;
	      window.createArrayElId = this.createArrayElId;
	      window.createArrayElClass = this.createArrayElClass;
	      window.getPathTraversalTime = this.getPathTraversalTime.bind(this);
	    }
	
	    // for testing
	
	  }, {
	    key: "printOptions",
	    value: function printOptions(options) {
	      var optionKeys = Object.keys(options);
	      optionKeys.forEach(function (optionKey) {
	        console.log(optionKey + ": " + options[optionKey]);
	      });
	    }
	
	    // Set animation speed based on window width
	
	  }, {
	    key: "configureAnimationSpeed",
	    value: function configureAnimationSpeed() {
	      var areaWidth = parseInt(this.drawingArea.css("width"));
	      return (2850 - areaWidth) / (950 / 3); // milli-seconds/length
	    }
	
	    // Size elements based on window dimensions
	
	  }, {
	    key: "calibrateSizings",
	    value: function calibrateSizings() {
	      var drawingAreaHeight = parseInt(this.drawingArea.css("height"));
	
	      this.elementHeight = drawingAreaHeight / 9;
	      this.elementWidth = Math.floor(this.elementWidthFactor * parseInt(this.drawingArea.css("width")));
	      this.elementRadius = Math.min(Math.floor(this.elementRadiusFactor * this.elementHeight), Math.floor(this.elementRadiusFactor * this.elementWidth));
	      this.fontSize = Math.min(Math.floor(this.fontSizeFactor * this.elementHeight), Math.floor(this.fontSizeFactor * this.elementWidth));
	      this.labelFontSize = Math.floor(0.6 * this.fontSize);
	      this.labelPaddingSides = Math.floor(0.4 * this.labelFontSize);
	      this.labelPaddingVert = Math.floor(0.8 * this.labelFontSize);
	
	      this.legendFontSize = this.labelFontSize;
	      this.legendRadius = 0.75 * this.labelFontSize;
	
	      this.bracketSize = Math.floor(this.elementRadius * 2 * 1.3);
	
	      this.bracketWidth = Math.floor(this.elementWidth / 3);
	      this.bracketHeight = this.elementHeight;
	      this.bracketTopOffsetAdjustment = Math.ceil(-0.05 * this.bracketSize);
	    }
	  }, {
	    key: "createPathId",
	    value: function createPathId(fromLayer, toLayer, val) {
	      return "path-l" + fromLayer + "-l" + toLayer + "-v" + val;
	    }
	  }, {
	    key: "getLayerClass",
	    value: function getLayerClass(layer) {
	      return "l" + layer;
	    }
	  }, {
	    key: "createArrayElId",
	    value: function createArrayElId(layer, val, animateable) {
	      var idName = "layer-" + layer + "-v" + val;
	      if (animateable) idName += "-" + this.animateElClass;else idName += "-" + this.stationaryElClass;
	      return idName;
	    }
	  }, {
	    key: "createArrayElClass",
	    value: function createArrayElClass(layer, animateable) {
	      var className = this.arrayElContainerClass + " l" + layer;
	      if (animateable) className += " " + this.animateElClass;else className += " " + this.stationaryElClass;
	      return className;
	    }
	  }, {
	    key: "createBracketClass",
	    value: function createBracketClass(layer) {
	      return this.bracketElClass + " l" + layer;
	    }
	  }, {
	    key: "createPlusClass",
	    value: function createPlusClass(layer) {
	      return this.plusElClass + " l" + layer;
	    }
	  }, {
	    key: "createSpaceClass",
	    value: function createSpaceClass(layer) {
	      return this.spaceElClass + " l" + layer;
	    }
	  }, {
	    key: "createLegendClass",
	    value: function createLegendClass() {
	      return this.legendClass + " l" + 0;
	    }
	  }, {
	    key: "createBackgroundClass",
	    value: function createBackgroundClass(layer) {
	      return this.layerBackgroundClass + " l" + layer;
	    }
	  }, {
	    key: "createBackgroundLayerElement",
	    value: function createBackgroundLayerElement(options) {
	      var backgroundOptions = {
	        class: this.createBackgroundClass(options.layer) + " " + ("" + options.colorClass),
	        height: this.elementHeight
	      };
	
	      var $bg = $("<div>", backgroundOptions);
	      $bg.offset({ top: options.layer * this.elementHeight });
	
	      var $layerLabel = $("<div>", {
	        class: this.layerLabelClass,
	        style: "font-size:" + this.labelFontSize + "px;" + ("padding: " + this.labelPaddingVert + "px " + this.labelPaddingSides + "px;"),
	        height: 1.4 * this.labelFontSize
	      });
	
	      $layerLabel.html("" + options.text);
	
	      $bg.append($layerLabel);
	      return $bg;
	    }
	
	    // Creates div element with array element inside.
	    // Requires options object containing:
	    //   layer, val, topOffset, leftOffset
	    //   ***optional keys: idName, className, animate
	
	  }, {
	    key: "createArrayElement",
	    value: function createArrayElement(options) {
	      // Create container for element that is positioned absolute to the drawing
	      //   area and display:flex to center the array element div.
	      var idName = options.idName || this.createArrayElId(options.layer, options.val, options.animate);
	      var className = options.className || this.createArrayElClass(options.layer, options.animate);
	
	      var containerParams = {
	        class: className,
	        id: idName,
	        width: this.elementWidth,
	        height: this.elementHeight
	      };
	
	      var $arrayElCont = $("<div>", containerParams);
	      $arrayElCont.offset({
	        top: options.topOffset,
	        left: options.leftOffset
	      });
	
	      // Create circular div to house the <p> tag with the element value.
	      // display:flex to center the <p> elementthis.bracketSize.
	      var elementParams = {
	        class: this.arrayElClass,
	        width: this.elementRadius * 2,
	        height: this.elementRadius * 2
	      };
	      var $element = $("<div>", elementParams);
	      $element.width(this.elementRadius * 2);
	      $element.height(this.elementRadius * 2);
	
	      // Create <p> tag with element value
	      var textParams = {
	        style: "font-size:" + this.fontSize + "px"
	      };
	      var $p = $("<p>", textParams);
	      $p.html(options.val);
	
	      // Append <p> tag to circular div and circular div to the element container.
	      $element.append($p);
	      $arrayElCont.append($element);
	
	      return $arrayElCont;
	    }
	
	    // Creates svg element with path element inside.
	    // Requires options object containing:
	    //   fromLayer, toLayer, val, xStart, yStart
	    //   ***optional keys: verticalShift, horizontalShift
	    // Returns <svg><path ></svg>
	
	  }, {
	    key: "createSvgPath",
	    value: function createSvgPath(options) {
	      var idName = options.idName || this.createPathId(options.fromLayer, options.toLayer, options.val);
	      var verticalShift = options.verticalShift || 0;
	      var horizontalShift = options.horizontalShift || 0;
	
	      var pathParams = {
	        fill: "none",
	        stroke: this.pathColor,
	        "stroke-width": this.strokeWidth,
	        id: idName,
	        d: "M" + options.xStart + "," + options.yStart + " " + ("v" + verticalShift + " h" + horizontalShift)
	      };
	
	      // if (horizontalShift !== 0) {
	      //   pathParams.d += ` h15 h-30 h25 h-20 h10`;
	      // }
	
	      var $path = $("<path>", pathParams);
	      this.pathContainer.append($path);
	    }
	
	    // Creates animejs animation
	    // Requires options object with the keys:
	    //     pathIdName, animeTarget, duration, val
	
	  }, {
	    key: "createAnimation",
	    value: function createAnimation(options) {
	      var pathId = "#" + this.createPathId(options.fromLayer, options.toLayer, options.val);
	      var myPath = _animejs2.default.path(pathId);
	      var pathLength = parseInt(myPath.path.getTotalLength());
	      // let duration = options.duration ||
	      //                parseInt(pathLength * this.animationSpeed);
	      var duration = options.duration || this.getPathTraversalTime(options);
	
	      var targetId = "#" + this.createArrayElId(options.fromLayer, options.val, true);
	
	      (0, _animejs2.default)({
	        targets: targetId,
	        translateX: myPath,
	        translateY: myPath,
	        duration: duration,
	        loop: false,
	        easing: 'easeInOutExpo'
	        // easing: 'easeOutExpo'
	      });
	    }
	
	    // Gets path traversal time of an svg path
	    // Requires options object with the keys:
	    //    fromLayer, toLayer, val
	
	  }, {
	    key: "getPathTraversalTime",
	    value: function getPathTraversalTime(options) {
	      var pathId = "#" + this.createPathId(options.fromLayer, options.toLayer, options.val);
	      var myPath = _animejs2.default.path(pathId);
	      var pathLength = parseInt(myPath.path.getTotalLength());
	      var duration = parseInt(pathLength * this.animationSpeed);
	      return Math.max(duration, this.minAnimationDuration);
	    }
	
	    // Create div containing an array bracket.
	    // Takes an options object with the keys:
	    //       topOffset, leftOffset, bracketType, layer
	
	  }, {
	    key: "createArrayBracket",
	    value: function createArrayBracket(options) {
	      var $bracketContainer = $("<div>", {
	        height: this.bracketHeight,
	        width: this.bracketWidth,
	        class: this.createBracketClass(options.layer)
	      });
	
	      $bracketContainer.offset({
	        top: Math.floor(options.topOffset + this.bracketTopOffsetAdjustment),
	        left: Math.floor(options.leftOffset)
	      });
	
	      var $p = $("<p>", { style: "font-size:" + this.bracketSize + "px" });
	      $p.html(options.bracketType);
	      $bracketContainer.append($p);
	      return $bracketContainer;
	    }
	
	    // Create div containing a plus sign.
	    // Takes an options object with the keys:
	    //       topOffset, leftOffset, layer
	
	  }, {
	    key: "createPlusSign",
	    value: function createPlusSign(options) {
	      var $plusContainer = $("<div>", {
	        height: this.plusHeight,
	        width: this.plusWidth,
	        class: this.createPlusClass(options.layer)
	      });
	
	      $plusContainer.offset({
	        top: Math.floor(options.topOffset),
	        left: Math.floor(options.leftOffset)
	      });
	
	      var $p = $("<p>", { style: "font-size:" + this.plusSize + "px" });
	      $p.html('+');
	      $plusContainer.append($p);
	      return $plusContainer;
	    }
	  }, {
	    key: "createSpaceEl",
	    value: function createSpaceEl(options) {
	      var $spaceContainer = $("<div>", {
	        height: this.spaceHeight,
	        width: this.spaceWidth,
	        class: this.createSpaceClass(options.layer)
	      });
	
	      $spaceContainer.offset({
	        top: Math.floor(options.topOffset),
	        left: Math.floor(options.leftOffset)
	      });
	
	      var $p = $("<p>", { style: "font-size:" + this.plusSize + "px" });
	      $p.html(' ');
	      $spaceContainer.append($p);
	      return $spaceContainer;
	    }
	  }, {
	    key: "calculateLeftIndent",
	    value: function calculateLeftIndent() {
	      var vizAreaWidth = $("#" + this.visAreaId).width();
	      var startSpaceOccupied = this.numElements * this.elementWidth + 2 * this.bracketWidth;
	      var leftIndent = Math.floor((vizAreaWidth - startSpaceOccupied) / 2);
	      return leftIndent;
	    }
	  }]);
	
	  return AnimationOptions;
	}();
	
	module.exports = AnimationOptions;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Anime v1.1.1
	 * http://anime-js.com
	 * JavaScript animation engine
	 * Copyright (c) 2016 Julian Garnier
	 * http://juliangarnier.com
	 * Released under the MIT license
	 */
	
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module === 'object' && module.exports) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.anime = factory();
	  }
	}(this, function () {
	
	  var version = '1.1.1';
	
	  // Defaults
	
	  var defaultSettings = {
	    duration: 1000,
	    delay: 0,
	    loop: false,
	    autoplay: true,
	    direction: 'normal',
	    easing: 'easeOutElastic',
	    elasticity: 400,
	    round: false,
	    begin: undefined,
	    update: undefined,
	    complete: undefined
	  }
	
	  // Transforms
	
	  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
	  var transform, transformStr = 'transform';
	
	  // Utils
	
	  var is = {
	    arr: function(a) { return Array.isArray(a) },
	    obj: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
	    svg: function(a) { return a instanceof SVGElement },
	    dom: function(a) { return a.nodeType || is.svg(a) },
	    num: function(a) { return !isNaN(parseInt(a)) },
	    str: function(a) { return typeof a === 'string' },
	    fnc: function(a) { return typeof a === 'function' },
	    und: function(a) { return typeof a === 'undefined' },
	    nul: function(a) { return typeof a === 'null' },
	    hex: function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
	    rgb: function(a) { return /^rgb/.test(a) },
	    hsl: function(a) { return /^hsl/.test(a) },
	    col: function(a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)) }
	  }
	
	  // Easings functions adapted from http://jqueryui.com/
	
	  var easings = (function() {
	    var eases = {};
	    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
	    var functions = {
	      Sine: function(t) { return 1 - Math.cos( t * Math.PI / 2 ); },
	      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
	      Elastic: function(t, m) {
	        if( t === 0 || t === 1 ) return t;
	        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
	        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
	      },
	      Back: function(t) { return t * t * ( 3 * t - 2 ); },
	      Bounce: function(t) {
	        var pow2, bounce = 4;
	        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
	        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
	      }
	    }
	    names.forEach(function(name, i) {
	      functions[name] = function(t) {
	        return Math.pow( t, i + 2 );
	      }
	    });
	    Object.keys(functions).forEach(function(name) {
	      var easeIn = functions[name];
	      eases['easeIn' + name] = easeIn;
	      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
	      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
	      eases['easeOutIn' + name] = function(t, m) { return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2; };
	    });
	    eases.linear = function(t) { return t; };
	    return eases;
	  })();
	
	  // Strings
	
	  var numberToString = function(val) {
	    return (is.str(val)) ? val : val + '';
	  }
	
	  var stringToHyphens = function(str) {
	    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	  }
	
	  var selectString = function(str) {
	    if (is.col(str)) return false;
	    try {
	      var nodes = document.querySelectorAll(str);
	      return nodes;
	    } catch(e) {
	      return false;
	    }
	  }
	
	  // Numbers
	
	  var random = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
	
	  // Arrays
	
	  var flattenArray = function(arr) {
	    return arr.reduce(function(a, b) {
	      return a.concat(is.arr(b) ? flattenArray(b) : b);
	    }, []);
	  }
	
	  var toArray = function(o) {
	    if (is.arr(o)) return o;
	    if (is.str(o)) o = selectString(o) || o;
	    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
	    return [o];
	  }
	
	  var arrayContains = function(arr, val) {
	    return arr.some(function(a) { return a === val; });
	  }
	
	  var groupArrayByProps = function(arr, propsArr) {
	    var groups = {};
	    arr.forEach(function(o) {
	      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
	      groups[group] = groups[group] || [];
	      groups[group].push(o);
	    });
	    return Object.keys(groups).map(function(group) {
	      return groups[group];
	    });
	  }
	
	  var removeArrayDuplicates = function(arr) {
	    return arr.filter(function(item, pos, self) {
	      return self.indexOf(item) === pos;
	    });
	  }
	
	  // Objects
	
	  var cloneObject = function(o) {
	    var newObject = {};
	    for (var p in o) newObject[p] = o[p];
	    return newObject;
	  }
	
	  var mergeObjects = function(o1, o2) {
	    for (var p in o2) o1[p] = !is.und(o1[p]) ? o1[p] : o2[p];
	    return o1;
	  }
	
	  // Colors
	
	  var hexToRgb = function(hex) {
	    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
	    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    var r = parseInt(rgb[1], 16);
	    var g = parseInt(rgb[2], 16);
	    var b = parseInt(rgb[3], 16);
	    return 'rgb(' + r + ',' + g + ',' + b + ')';
	  }
	
	  var hslToRgb = function(hsl) {
	    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
	    var h = parseInt(hsl[1]) / 360;
	    var s = parseInt(hsl[2]) / 100;
	    var l = parseInt(hsl[3]) / 100;
	    var hue2rgb = function(p, q, t) {
	      if (t < 0) t += 1;
	      if (t > 1) t -= 1;
	      if (t < 1/6) return p + (q - p) * 6 * t;
	      if (t < 1/2) return q;
	      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	      return p;
	    }
	    var r, g, b;
	    if (s == 0) {
	      r = g = b = l;
	    } else {
	      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      var p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1/3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - 1/3);
	    }
	    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
	  }
	
	  var colorToRgb = function(val) {
	    if (is.rgb(val)) return val;
	    if (is.hex(val)) return hexToRgb(val);
	    if (is.hsl(val)) return hslToRgb(val);
	  }
	
	  // Units
	
	  var getUnit = function(val) {
	    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
	  }
	
	  var addDefaultTransformUnit = function(prop, val, intialVal) {
	    if (getUnit(val)) return val;
	    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
	    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
	    return val;
	  }
	
	  // Values
	
	  var getCSSValue = function(el, prop) {
	    // First check if prop is a valid CSS property
	    if (prop in el.style) {
	      // Then return the property value or fallback to '0' when getPropertyValue fails
	      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
	    }
	  }
	
	  var getTransformValue = function(el, prop) {
	    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
	    var str = el.style.transform;
	    if (!str) return defaultVal;
	    var rgx = /(\w+)\((.+?)\)/g;
	    var match = [];
	    var props = [];
	    var values = [];
	    while (match = rgx.exec(str)) {
	      props.push(match[1]);
	      values.push(match[2]);
	    }
	    var val = values.filter(function(f, i) { return props[i] === prop; });
	    return val.length ? val[0] : defaultVal;
	  }
	
	  var getAnimationType = function(el, prop) {
	    if ( is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
	    if ( is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
	    if ( is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
	    if (!is.nul(el[prop]) && !is.und(el[prop])) return 'object';
	  }
	
	  var getInitialTargetValue = function(target, prop) {
	    switch (getAnimationType(target, prop)) {
	      case 'transform': return getTransformValue(target, prop);
	      case 'css': return getCSSValue(target, prop);
	      case 'attribute': return target.getAttribute(prop);
	    }
	    return target[prop] || 0;
	  }
	
	  var getValidValue = function(values, val, originalCSS) {
	    if (is.col(val)) return colorToRgb(val);
	    if (getUnit(val)) return val;
	    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
	    if (!unit && originalCSS) unit = getUnit(originalCSS);
	    return unit ? val + unit : val;
	  }
	
	  var decomposeValue = function(val) {
	    var rgx = /-?\d*\.?\d+/g;
	    return {
	      original: val,
	      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
	      strings: numberToString(val).split(rgx)
	    }
	  }
	
	  var recomposeValue = function(numbers, strings, initialStrings) {
	    return strings.reduce(function(a, b, i) {
	      var b = (b ? b : initialStrings[i - 1]);
	      return a + numbers[i - 1] + b;
	    });
	  }
	
	  // Animatables
	
	  var getAnimatables = function(targets) {
	    var targets = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
	    return targets.map(function(t, i) {
	      return { target: t, id: i };
	    });
	  }
	
	  // Properties
	
	  var getProperties = function(params, settings) {
	    var props = [];
	    for (var p in params) {
	      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
	        var prop = is.obj(params[p]) ? cloneObject(params[p]) : {value: params[p]};
	        prop.name = p;
	        props.push(mergeObjects(prop, settings));
	      }
	    }
	    return props;
	  }
	
	  var getPropertiesValues = function(target, prop, value, i) {
	    var values = toArray( is.fnc(value) ? value(target, i) : value);
	    return {
	      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
	      to: (values.length > 1) ? values[1] : values[0]
	    }
	  }
	
	  // Tweens
	
	  var getTweenValues = function(prop, values, type, target) {
	    var valid = {};
	    if (type === 'transform') {
	      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
	      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
	    } else {
	      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
	      valid.from = getValidValue(values, values.from, originalCSS);
	      valid.to = getValidValue(values, values.to, originalCSS);
	    }
	    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
	  }
	
	  var getTweensProps = function(animatables, props) {
	    var tweensProps = [];
	    animatables.forEach(function(animatable, i) {
	      var target = animatable.target;
	      return props.forEach(function(prop) {
	        var animType = getAnimationType(target, prop.name);
	        if (animType) {
	          var values = getPropertiesValues(target, prop.name, prop.value, i);
	          var tween = cloneObject(prop);
	          tween.animatables = animatable;
	          tween.type = animType;
	          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
	          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
	          tween.round = (is.col(values.from) || tween.round) ? 1 : 0;
	          tween.delay = (is.fnc(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
	          tween.duration = (is.fnc(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
	          tweensProps.push(tween);
	        }
	      });
	    });
	    return tweensProps;
	  }
	
	  var getTweens = function(animatables, props) {
	    var tweensProps = getTweensProps(animatables, props);
	    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
	    return splittedProps.map(function(tweenProps) {
	      var tween = cloneObject(tweenProps[0]);
	      tween.animatables = tweenProps.map(function(p) { return p.animatables });
	      tween.totalDuration = tween.delay + tween.duration;
	      return tween;
	    });
	  }
	
	  var reverseTweens = function(anim, delays) {
	    anim.tweens.forEach(function(tween) {
	      var toVal = tween.to;
	      var fromVal = tween.from;
	      var delayVal = anim.duration - (tween.delay + tween.duration);
	      tween.from = toVal;
	      tween.to = fromVal;
	      if (delays) tween.delay = delayVal;
	    });
	    anim.reversed = anim.reversed ? false : true;
	  }
	
	  var getTweensDuration = function(tweens) {
	    if (tweens.length) return Math.max.apply(Math, tweens.map(function(tween){ return tween.totalDuration; }));
	  }
	
	  // will-change
	
	  var getWillChange = function(anim) {
	    var props = [];
	    var els = [];
	    anim.tweens.forEach(function(tween) {
	      if (tween.type === 'css' || tween.type === 'transform' ) {
	        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
	        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
	      }
	    });
	    return {
	      properties: removeArrayDuplicates(props).join(', '),
	      elements: removeArrayDuplicates(els)
	    }
	  }
	
	  var setWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.willChange = willChange.properties;
	    });
	  }
	
	  var removeWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.removeProperty('will-change');
	    });
	  }
	
	  /* Svg path */
	
	  var getPathProps = function(path) {
	    var el = is.str(path) ? selectString(path)[0] : path;
	    return {
	      path: el,
	      value: el.getTotalLength()
	    }
	  }
	
	  var snapProgressToPath = function(tween, progress) {
	    var pathEl = tween.path;
	    var pathProgress = tween.value * progress;
	    var point = function(offset) {
	      var o = offset || 0;
	      var p = progress > 1 ? tween.value + o : pathProgress + o;
	      return pathEl.getPointAtLength(p);
	    }
	    var p = point();
	    var p0 = point(-1);
	    var p1 = point(+1);
	    switch (tween.name) {
	      case 'translateX': return p.x;
	      case 'translateY': return p.y;
	      case 'rotate': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
	    }
	  }
	
	  // Progress
	
	  var getTweenProgress = function(tween, time) {
	    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
	    var percent = elapsed / tween.duration;
	    var progress = tween.to.numbers.map(function(number, p) {
	      var start = tween.from.numbers[p];
	      var eased = easings[tween.easing](percent, tween.elasticity);
	      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
	      val = tween.round ? Math.round(val * tween.round) / tween.round : val;
	      return val;
	    });
	    return recomposeValue(progress, tween.to.strings, tween.from.strings);
	  }
	
	  var setAnimationProgress = function(anim, time) {
	    var transforms;
	    anim.currentTime = time;
	    anim.progress = (time / anim.duration) * 100;
	    for (var t = 0; t < anim.tweens.length; t++) {
	      var tween = anim.tweens[t];
	      tween.currentValue = getTweenProgress(tween, time);
	      var progress = tween.currentValue;
	      for (var a = 0; a < tween.animatables.length; a++) {
	        var animatable = tween.animatables[a];
	        var id = animatable.id;
	        var target = animatable.target;
	        var name = tween.name;
	        switch (tween.type) {
	          case 'css': target.style[name] = progress; break;
	          case 'attribute': target.setAttribute(name, progress); break;
	          case 'object': target[name] = progress; break;
	          case 'transform':
	          if (!transforms) transforms = {};
	          if (!transforms[id]) transforms[id] = [];
	          transforms[id].push(progress);
	          break;
	        }
	      }
	    }
	    if (transforms) {
	      if (!transform) transform = (getCSSValue(document.body, transformStr) ? '' : '-webkit-') + transformStr;
	      for (var t in transforms) {
	        anim.animatables[t].target.style[transform] = transforms[t].join(' ');
	      }
	    }
	    if (anim.settings.update) anim.settings.update(anim);
	  }
	
	  // Animation
	
	  var createAnimation = function(params) {
	    var anim = {};
	    anim.animatables = getAnimatables(params.targets);
	    anim.settings = mergeObjects(params, defaultSettings);
	    anim.properties = getProperties(params, anim.settings);
	    anim.tweens = getTweens(anim.animatables, anim.properties);
	    anim.duration = getTweensDuration(anim.tweens) || params.duration;
	    anim.currentTime = 0;
	    anim.progress = 0;
	    anim.ended = false;
	    return anim;
	  }
	
	  // Public
	
	  var animations = [];
	  var raf = 0;
	
	  var engine = (function() {
	    var play = function() { raf = requestAnimationFrame(step); };
	    var step = function(t) {
	      if (animations.length) {
	        for (var i = 0; i < animations.length; i++) animations[i].tick(t);
	        play();
	      } else {
	        cancelAnimationFrame(raf);
	        raf = 0;
	      }
	    }
	    return play;
	  })();
	
	  var animation = function(params) {
	
	    var anim = createAnimation(params);
	    var time = {};
	
	    anim.tick = function(now) {
	      anim.ended = false;
	      if (!time.start) time.start = now;
	      time.current = Math.min(Math.max(time.last + now - time.start, 0), anim.duration);
	      setAnimationProgress(anim, time.current);
	      var s = anim.settings;
	      if (s.begin && time.current >= s.delay) { s.begin(anim); s.begin = undefined; };
	      if (time.current >= anim.duration) {
	        if (s.loop) {
	          time.start = now;
	          if (s.direction === 'alternate') reverseTweens(anim, true);
	          if (is.num(s.loop)) s.loop--;
	        } else {
	          anim.ended = true;
	          anim.pause();
	          if (s.complete) s.complete(anim);
	        }
	        time.last = 0;
	      }
	    }
	
	    anim.seek = function(progress) {
	      setAnimationProgress(anim, (progress / 100) * anim.duration);
	    }
	
	    anim.pause = function() {
	      removeWillChange(anim);
	      var i = animations.indexOf(anim);
	      if (i > -1) animations.splice(i, 1);
	    }
	
	    anim.play = function(params) {
	      anim.pause();
	      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
	      time.start = 0;
	      time.last = anim.ended ? 0 : anim.currentTime;
	      var s = anim.settings;
	      if (s.direction === 'reverse') reverseTweens(anim);
	      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
	      setWillChange(anim);
	      animations.push(anim);
	      if (!raf) engine();
	    }
	
	    anim.restart = function() {
	      if (anim.reversed) reverseTweens(anim);
	      anim.pause();
	      anim.seek(0);
	      anim.play();
	    }
	
	    if (anim.settings.autoplay) anim.play();
	
	    return anim;
	
	  }
	
	  // Remove one or multiple targets from all active animations.
	
	  var remove = function(elements) {
	    var targets = flattenArray(is.arr(elements) ? elements.map(toArray) : toArray(elements));
	    for (var i = animations.length-1; i >= 0; i--) {
	      var animation = animations[i];
	      var tweens = animation.tweens;
	      for (var t = tweens.length-1; t >= 0; t--) {
	        var animatables = tweens[t].animatables;
	        for (var a = animatables.length-1; a >= 0; a--) {
	          if (arrayContains(targets, animatables[a].target)) {
	            animatables.splice(a, 1);
	            if (!animatables.length) tweens.splice(t, 1);
	            if (!tweens.length) animation.pause();
	          }
	        }
	      }
	    }
	  }
	
	  animation.version = version;
	  animation.speed = 1;
	  animation.list = animations;
	  animation.remove = remove;
	  animation.easings = easings;
	  animation.getValue = getInitialTargetValue;
	  animation.path = getPathProps;
	  animation.random = random;
	
	  return animation;
	
	}));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animation_options = __webpack_require__(3);
	
	var _animation_options2 = _interopRequireDefault(_animation_options);
	
	var _animejs = __webpack_require__(4);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Test = function (_AnimationOptions) {
	  _inherits(Test, _AnimationOptions);
	
	  function Test(options) {
	    _classCallCheck(this, Test);
	
	    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, options));
	
	    _this.startArray = [5, 1, 2, 3, 7, 4, 0, 6];
	    _this.numElements = _this.startArray.length;
	    _this.leftIndent = _this.calculateStartingLeftIndent();
	    _this.bracketWidth = Math.floor(_this.elementWidth * 0.2);
	    _this.bracketSize = Math.floor(options.elementRadius * 2 * 1.4);
	    _this.runTest2();
	    return _this;
	  }
	
	  _createClass(Test, [{
	    key: 'runTest2',
	    value: function runTest2() {
	      var testVal = 5;
	
	      this.drawingArea.append(this.createArrayElement({
	        layer: 0,
	        val: testVal,
	        topOffset: 0,
	        leftOffset: 300,
	        animate: false
	      }));
	
	      this.drawingArea.append(this.createArrayElement({
	        layer: 0,
	        val: testVal,
	        topOffset: 0,
	        leftOffset: 300,
	        animate: true
	      }));
	
	      var animateableEl = $('#' + this.createArrayElId(0, testVal, true));
	      var xStart = parseInt(animateableEl.css("left"));
	
	      this.createSvgPath({
	        fromLayer: 0,
	        toLayer: 1,
	        val: testVal,
	        xStart: 0,
	        yStart: 0,
	        verticalShift: this.elementHeight,
	        horizontalShift: 0
	      });
	
	      $("body").html($("body").html());
	
	      this.createAnimation({
	        fromLayer: 0,
	        toLayer: 1,
	        val: testVal,
	        duration: 2000
	      });
	    }
	  }, {
	    key: 'runTest',
	    value: function runTest() {
	      console.log("running test");
	      var $drawingArea = $("#drawing-area");
	      var $testArrayElCont = $("<div>", { class: "array-element-container",
	        id: "test-source",
	        width: this.elementWidth,
	        height: this.elementHeight });
	
	      var testDivParams = {
	        class: "array-element",
	        width: this.elementRadius * 2,
	        height: this.elementRadius * 2
	      };
	
	      var testTextParams = {
	        style: 'font-size:' + this.fontSize + 'px'
	      };
	
	      var $testElement = $("<div>", testDivParams);
	      $testElement.width(this.elementRadius * 2);
	      $testElement.height(this.elementRadius * 2);
	      $testArrayElCont.offset({ top: Math.floor(this.elementHeight) * 0,
	        left: Math.floor(this.leftIndent + this.elementWidth * 0) });
	      var $p = $("<p>", testTextParams);
	      $p.html(0);
	      $testElement.append($p);
	      $testArrayElCont.append($testElement);
	
	      $drawingArea.append($testArrayElCont);
	
	      // ########################################################################################
	      var svgParams = {
	        height: 103,
	        width: 200,
	        class: "path-container"
	      };
	
	      var $newSvg = $("<svg>", svgParams);
	
	      var xStart = 0;
	      var yStart = 0;
	
	      var pathParams = {
	        fill: "none",
	        stroke: "red",
	        "stroke-width": 3,
	        id: "testPath",
	        d: 'M' + xStart + ',' + yStart + ' v' + 100 + ' h' + 200
	      };
	
	      // pathParams.d += `M${xStart},${yStart}`;
	      // pathParams.d += ` v${options.vertical} h${options.horizontal}`;
	
	      var $path = $("<path>", pathParams);
	      $newSvg.append($path);
	      $newSvg.offset({ top: Math.floor(this.elementHeight / 2),
	        left: Math.floor(this.leftIndent + this.elementWidth / 2) });
	      $drawingArea.append($newSvg);
	      // #########################################################################################
	      //  Move test
	      var $testmoveArrayElCont = $("<div>", { class: "array-element-container",
	        id: "test-move",
	        width: this.elementWidth,
	        height: this.elementHeight });
	
	      var testmoveDivParams = {
	        class: "array-element",
	        width: this.elementRadius * 2,
	        height: this.elementRadius * 2
	      };
	
	      var testmoveTextParams = {
	        style: 'font-size:' + this.fontSize + 'px'
	      };
	
	      var $testmoveElement = $("<div>", testmoveDivParams);
	      $testmoveElement.width(this.elementRadius * 2);
	      $testmoveElement.height(this.elementRadius * 2);
	      $testmoveArrayElCont.offset({ top: Math.floor(this.elementHeight) * 0,
	        left: Math.floor(this.leftIndent + this.elementWidth * 0) });
	      var $pMove = $("<p>", testmoveTextParams);
	      $pMove.html(0);
	      $testmoveElement.append($pMove);
	      $testmoveArrayElCont.append($testmoveElement);
	
	      $drawingArea.append($testmoveArrayElCont);
	      $("body").html($("body").html());
	
	      var myPath = _animejs2.default.path('#testPath');
	
	      (0, _animejs2.default)({
	        targets: '#test-move',
	        translateX: myPath,
	        translateY: myPath,
	        duration: 2500,
	        loop: false,
	        easing: 'easeInOutExpo'
	      });
	
	      console.log(_animejs2.default.easings);
	    }
	  }, {
	    key: 'calculateStartingLeftIndent',
	    value: function calculateStartingLeftIndent() {
	      var vizAreaWidth = $('#' + this.visAreaId).width();
	      var startSpaceOccupied = this.numElements * this.elementWidth + 2 * this.bracketWidth;
	      var leftIndent = Math.floor((vizAreaWidth - startSpaceOccupied) / 2);
	      return leftIndent;
	    }
	  }]);
	
	  return Test;
	}(_animation_options2.default);
	
	module.exports = Test;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map