import AnimationOptions from './animation_options';
import anime from 'animejs';

class Quicksort extends AnimationOptions {
  constructor(options) {
    super(options);
    this.startArray = [5, 1, 2, 3, 7, 4, 0 , 6];
    this.numElements = this.startArray.length;
    this.leftIndent = this.calculateLeftIndent();
    this.algorithmTitle.html("Quicksort Visualization");

    this.timeStagger = 150;
    this.timingBetweenLayers = 500;
    this.fadeInSpeed = 1500;
    this.layerLabelClass = "layer-label";

    this.renderStartLayer();
    this.configureLayerOptions();
    this.renderBackgrounds();
    this.renderLayers();
    this.createLegend();

    $("body").html($("body").html());

    // this.hideLayers();
    // this.configureTimingOptions();
    // this.fadeInStartLayer();
    // this.beginAnimations();

    // this.animateLayers();  // test function to make sure all animations work
  }

  // create renderOptions for layers 1-8 (after start layer)
  configureLayerOptions() {
    let sortLayers = ['L1', 'L2-left', 'L2-right', 'L3', 'L4'];
    let mergeLayers = ['L5-left', 'L5-right', 'L6-left', 'L6-right-l',
                       'L6-right-r', 'L7-left', 'L7-mid', 'L7-right', 'L8'];

    this.layers = [].concat(sortLayers).concat(mergeLayers);

    this.fromArrays = {
        'L1':       this.startArray,      // layer 0 - 1
        'L2-left':  [1, 0],               // layer 1-2 left
        'L2-right': [5, 3, 7, 4, 6],      // layer 1-2 right
        'L3':       [5, 7, 6],            // layer 3
        'L4':       [5, 6],               // layer 4
        'L5-left':       [5, 6],            // layer 5 left
        'L5-right':       [7],            // layer 5 right
        'L6-left':       [0, 1],
        'L6-right-l':       [3, 4],
        'L6-right-r': [5, 6, 7],
        'L7-left': [0, 1],
        'L7-mid': [2],
        'L7-right': [3, 4, 5, 6, 7],
        'L8': [0, 1, 2, 3, 4, 5, 6, 7],
    };

    this.sectionCharStrings = {
      'L1':       '[10]+[2]+[53746]',   // layer 1
      'L2-left':  '[0]+[1]+[ ]',    // layer 2 left
      'L2-right': '[3]+[4]+[576]',  // layer 2 right
      'L3':       '[56]+[7]+[ ]',   // layer 3
      'L4':       '[5]+[6]+[ ]',    // layer 4
      'L5-left':       '[56]+',       // layer 5 left
      'L5-right':       '[7]',       // layer 5 right
      'L6-left':       '[0]+[1]+[ ]',       // layer 6 left
      'L6-right-l':       '[3]+[4]+',       // layer 6 right - left half
      'L6-right-r':       '[567]',       // layer 6 right - right half
      'L7-left': '[01]+',
      'L7-mid': '[2]+',
      'L7-right': '[34567]',
      'L8': '[01234567]',
    };

    this.fromLayers = {
      'L1':        0,
      'L2-left':   1,
      'L2-right':  1,
      'L3':        2,
      'L4':        3,
      'L5-left':        4,
      'L5-right':        3,
      'L6-left':   2,
      'L6-right-l':  2,
      'L6-right-r':  5,
      'L7-left': 6,
      'L7-mid': 1,
      'L7-right': 6,
      'L8': 7,
    };

    this.toLayers = {
      'L1':         1,
      'L2-left':   2,
      'L2-right':  2,
      'L3':         3,
      'L4':         4,
      'L5-left':         5,
      'L5-right':         5,
      'L6-left':   6,
      'L6-right-l':  6,
      'L6-right-r':  6,
      'L7-left': 7,
      'L7-mid': 7,
      'L7-right': 7,
      'L8': 8,
    };

    this.referenceEls = {
      'L1':         2,
      'L2-left':   1,
      'L2-right':  4,
      'L3':         7,
      'L4':         6,
      'L5-left':         6,
      'L5-right':         7,
      'L6-left':   1,
      'L6-right-l':  4,
      'L6-right-r':  5,
      'L7-left': 0,
      'L7-mid': 2,
      'L7-right': 4,
      'L8': 2,
    };

    // for positioning reference
    this.customOffset = {
      'L6-right-r':  { dir: 1, offsetChars: '4]+' },
      'L7-left': { dir: 1, offsetChars: '0]+' },
      'L7-right': { dir: -1, offsetChars: '[345'}
    };
  }


  // hides layers after rendering in preparation for animation
  hideLayers() {
    for (let i = 0; i <= 8; i ++) {
        $(`.${this.getLayerClass(i)}`).fadeOut(0);
    }
  }

  // Calculate timings for each layer
  configureTimingOptions() {
    // Animation time of the start layer
    // this.startAnimationRunTime = this.timingBetweenLayers +
    //                              (this.startArray.length-1) * this.timeStagger +
    //                              this.fadeInSpeed;
    this.startAnimationRunTime = -1*this.timingBetweenLayers +
                                 (this.startArray.length-1) * this.timeStagger +
                                 this.fadeInSpeed;

    this.layerDelays = {};

    let prevLayer = this.layers[0];

    // Layer 0 total delay is time to fade in start array elements + fadeInSpeed
    //   for the last element + timing between layers
    this.layerDelays[prevLayer] = {};
    this.layerDelays[prevLayer] = {base: this.startAnimationRunTime,
                                   waitTime: this.fadeInSpeed -1*this.timingBetweenLayers,
                                   elements: {}};

    let toLayer, numElements, pathTime, referenceEl, referenceElPathTime;

    this.layers.forEach(layer => {
      toLayer = this.toLayers[layer];
      numElements = this.fromArrays[layer].length;

      if (layer !== this.layers[0]) {
        this.layerDelays[layer] = {base: 0, waitTime: 0, elements: {}};
        this.layerDelays[layer].base += this.layerDelays[prevLayer].base +
                                        this.layerDelays[prevLayer].waitTime;
        this.layerDelays[layer].base += this.timingBetweenLayers;
        this.layerDelays[layer].waitTime += this.timingBetweenLayers;
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
        referenceEl = this.referenceEls[layer];
        referenceElPathTime = this.getPathTraversalTime({
          fromLayer: this.fromLayers[layer],
          toLayer: toLayer,
          val: referenceEl
        });
        this.layerDelays[layer].elements[referenceEl] = this.timeStagger +
                                            this.layerDelays[layer].waitTime;
        this.layerDelays[layer].waitTime += referenceElPathTime +
                                              this.timeStagger;
      }

      this.fromArrays[layer].forEach((el) => {
        // Pivot elements in the sorting layers have already had animation times
        //   calculated and should be skipped.
        if (toLayer <= 4 && el === referenceEl) return;

        pathTime = this.getPathTraversalTime({
          fromLayer: this.fromLayers[layer],
          toLayer: toLayer,
          val: el
        });

        //
        this.layerDelays[layer].elements[el] = this.timeStagger +
                                               this.layerDelays[layer].waitTime;
        this.layerDelays[layer].waitTime += pathTime + this.timeStagger;
      });
      prevLayer = layer;
    });
    console.log(this.layerDelays);
    window.layerDelays = this.layerDelays;
  }

  beginAnimations() {
    let prevLayer = this.layers[0];
    let prevToLayer = 1;
    let toLayer = 1;

    let $layerBrackets, $layerPlusEls, $prevLayerEls, $layerBG;
    let layerClass, prevLayerClass;

    // Render brackets and plus signs for layer 1
    setTimeout((() => {
      // console.log("toLayer: ", toLayer);
      // console.log(this.layerDelays[prevLayer].base);
      layerClass = this.getLayerClass(toLayer);
      $layerBrackets = $(`.${layerClass}.${this.bracketElClass}`);
      $layerPlusEls = $(`.${layerClass}.${this.plusElClass}`);
      $layerBG = $(`.${layerClass}.${this.layerBackgroundClass}`);

      $layerBrackets.fadeIn(this.fadeInSpeed);
      $layerPlusEls.fadeIn(this.fadeInSpeed);
      $layerBG.fadeIn(this.fadeInSpeed);
    }).bind(this), this.layerDelays[prevLayer].base);

    this.layers.forEach(layer => {
      setTimeout((() => {
        toLayer = this.toLayers[layer];
        if (prevToLayer !== toLayer) {
          // console.log("toLayer: ", toLayer);
          // console.log(this.layerDelays[layer].base);
          layerClass = this.getLayerClass(toLayer);
          prevLayerClass = this.getLayerClass(prevToLayer);

          $layerBrackets = $(`.${layerClass}.${this.bracketElClass}`);
          $layerPlusEls = $(`.${layerClass}.${this.plusElClass}`);
          $prevLayerEls = $(`.${prevLayerClass}.${this.arrayElContainerClass}` +
                            `.${this.animateElClass}`);
          $layerBG = $(`.${layerClass}.${this.layerBackgroundClass}`);

          $layerBrackets.fadeIn(this.fadeInSpeed);
          $layerPlusEls.fadeIn(this.fadeInSpeed);
          $prevLayerEls.fadeIn(this.fadeInSpeed);
          $layerBG.fadeIn(this.fadeInSpeed);
        }

        let referenceEl = this.referenceEls[layer];
        let fromArray = this.fromArrays[layer];
        // console.log("\ntoLayer: ", toLayer);
        // console.log("fromArray: ", fromArray);
        // console.log("referenceEl: ", referenceEl);


        if (toLayer <= 4) {
          // console.log("\ntoLayer: ", toLayer);
          // console.log("referenceEl: ", referenceEl);
          // console.log("delayTime: ", this.layerDelays[layer].elements[referenceEl]);
          let elementDelay = this.layerDelays[layer].elements[referenceEl];

          setTimeout((() => {
            this.markActivePivot(this.fromLayers[layer], referenceEl, true);

            this.createAnimation({
              fromLayer: this.fromLayers[layer],
              toLayer: this.toLayers[layer],
              val: referenceEl
            });
          }).bind(this), elementDelay);

        }

        for (let i = 0; i < fromArray.length; i++) {
          let el = fromArray[i];
          if (toLayer <= 4 && el === referenceEl) continue;

          let elementDelay = this.layerDelays[layer].elements[el];
          let deactivateStagger = this.getPathTraversalTime({
            fromLayer: this.fromLayers[layer],
            toLayer: this.toLayers[layer],
            val: el
          });

          setTimeout((() => {
            setTimeout((() => {
              this.markInactive(this.fromLayers[layer], el, true);
            }).bind(this), deactivateStagger);

            this.markActive(this.fromLayers[layer], el, true);

            this.createAnimation({
              fromLayer: this.fromLayers[layer],
              toLayer: this.toLayers[layer],
              val: el
            });
          }).bind(this), elementDelay);
        }

        prevToLayer = toLayer;
      }).bind(this), this.layerDelays[layer].base);
    });
  }

  fadeInStartLayer() {
    console.log("Beginning animation of layer 0");
    let layer = 0;
    // let totalTime = 0;

    // console.log(`totalTime beginning: ${totalTime}`);

    $(`.${this.getLayerClass(0)}.${this.layerBackgroundClass}`).fadeIn(this.fadeInSpeed);
    $(`.${this.getLayerClass(0)}.${this.bracketElClass}`).fadeIn(this.fadeInSpeed);
    $(`.${this.getLayerClass(0)}.${this.legendClass}`).fadeIn(this.fadeInSpeed);

    setTimeout((() => {
      // totalTime += this.timeDelay;
      // console.log(`totalTime update: ${totalTime}`);
      this.startArray.forEach((el, idx) => {
        setTimeout((() => {
          // if (idx > 0) totalTime += this.timeStagger;
          // if (idx === this.startArray.length - 1) totalTime += this.fadeInSpeed;
          // console.log(`totalTime update: ${totalTime}`);
          $(`#${this.createArrayElId(layer, el, false)}`).fadeIn(this.fadeInSpeed);
          $(`#${this.createArrayElId(layer, el, true)}`).fadeIn(this.fadeInSpeed);
        }).bind(this), idx*this.timeStagger);
      });
    }).bind(this), this.timeDelay);

    // console.log(`totalTime end: ${totalTime}`);
  }

  markActive(layer, val, animateable) {
    let $targetEl = $(`#${this.createArrayElId(layer, val, animateable)}`);
    $targetEl.addClass(this.activeElementClass);
  }

  markInactive(layer, val, animateable) {
    let $targetEl = $(`#${this.createArrayElId(layer, val, animateable)}`);
    $targetEl.removeClass(this.activeElementClass);
    $targetEl.addClass(this.inactiveElementClass);
  }

  markActivePivot(layer, val, animateable) {
    let $targetEl = $(`#${this.createArrayElId(layer, val, animateable)}`);
    $targetEl.addClass(this.pivotElementClass);
  }

  // renders start layer
  renderStartLayer() {
    // Create open bracket
    let openingBracket = this.createArrayBracket({
      topOffset: 0,
      leftOffset: this.leftIndent,
      bracketType: '[',
      layer: 0
    });
    this.drawingArea.append(openingBracket);

    let arrayElementParams;

    this.startArray.forEach((el, idx) => {
      // Create layer 0 array elements.
      arrayElementParams = {
        val: el,
        layer: 0,
        topOffset: 0,
        leftOffset: this.leftIndent + this.bracketWidth + idx*this.elementWidth
      };
      this.drawingArea.append(this.createArrayElement(arrayElementParams));

      // Create layer 0 animateable elements.
      arrayElementParams.animate = true;
      this.drawingArea.append(this.createArrayElement(arrayElementParams));
    });

    // Create closing bracket
    let closingBracket = this.createArrayBracket({
      topOffset: 0,
      leftOffset: this.leftIndent + this.numElements*this.elementWidth
                  + this.bracketWidth,
      bracketType: ']',
      layer: 0
    });
    this.drawingArea.append(closingBracket);
  }

  renderBackgrounds() {
    this.backgroundInfo = {
      0: { class: this.colorClasses["lightBlue1"], text: 'Base\nLayer'},
      1: { class: this.colorClasses["lightBlue2"], text: 'Recursion\nLayer 1'},
      2: { class: this.colorClasses["lightBlue3"], text: 'Recursion\nLayer 2'},
      3: { class: this.colorClasses["lightBlue4"], text: 'Recursion\nLayer 3'},
      4: { class: this.colorClasses["lightBlue5"], text: 'Recursion\nLayer 4'},
      5: { class: this.colorClasses["lightBlue4"], text: 'Recursion\nLayer 3'},
      6: { class: this.colorClasses["lightBlue3"], text: 'Recursion\nLayer 2'},
      7: { class: this.colorClasses["lightBlue2"], text: 'Recursion\nLayer 1'},
      8: { class: this.colorClasses["lightBlue1"], text: 'Base\nLayer'},
                              };

    Object.keys(this.backgroundInfo).forEach(layer => {
      this.drawingArea.append(this.createBackgroundLayerElement({
        layer: layer,
        colorClass: this.backgroundInfo[layer].class,
        text: this.backgroundInfo[layer].text
      }));
    });
  }

  // creates layers of elements and svg paths
  renderLayers() {
    this.layers.forEach((layer, idx) => {
      console.log(`rendering layer ${idx}: ${layer}`);
      let renderOptions = {
        fromArray: this.fromArrays[layer],
        fromLayer: this.fromLayers[layer],
        toLayer: this.toLayers[layer],
        sectionCharString: this.sectionCharStrings[layer],
        referenceEl: this.referenceEls[layer],
        topOffset: this.toLayers[layer] * this.elementHeight,
        layerLeftOffset: this.computeLayerLeftOffset(
          this.sectionCharStrings[layer],
          this.referenceEls[layer],
          this.customOffset[layer]
        )
      };
      // if (layer === 'L6-right-r') debugger
      this.renderSection(renderOptions);
      renderOptions.animate = true;
      this.renderSection(renderOptions);

      this.createPaths(renderOptions);
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
  computeLayerLeftOffset(sectionCharString, referenceEl, referenceLayer) {
    let sectionChars = referenceLayer ? referenceLayer["offsetChars"].split("")
                                      : sectionCharString.split("");
    let currentChar;
    let leftOffset = 0;

    for (let i = 0; i < sectionChars.length; i++) {
      currentChar = sectionChars[i];

      if (currentChar === String(referenceEl) && !referenceLayer) break;
      else if ([ '[', ']' ].includes(currentChar))
        leftOffset += this.bracketWidth;
      else if (currentChar === '+') leftOffset += this.plusWidth;
      else if (currentChar === ' ') leftOffset += this.spaceWidth;
      else if (!isNaN(currentChar)) leftOffset += this.elementWidth;
      else throw `Error in computeLeftOffset: received ${currentChar}`;
    }

    if (referenceLayer) return referenceLayer["dir"] * leftOffset;
    return -1*leftOffset;
  }


  // Renders a section of a layer
  // Takes an options object with the keys:
  //     fromArray, fromLayer, toLayer, sectionCharString, layerLeftOffset,
  //     topOffset, referenceEl
  renderSection(options) {
    let prevElements = {};

    options.fromArray.forEach(el => {
      prevElements[el] = $(`#${this.createArrayElId(options.fromLayer, el)}`);
    });
    let referenceEl = prevElements[options.referenceEl];

    let sectionChars = options.sectionCharString.split("");
    let layerLeftOffset = parseInt(referenceEl.css("left")) +
                          options.layerLeftOffset;
    let topOffset = options.topOffset;

    sectionChars.forEach(char => {
      if (char === '[' || char === ']') {
        this.drawingArea.append(this.createArrayBracket({
          topOffset: topOffset,
          leftOffset: layerLeftOffset,
          bracketType: char,
          layer: options.toLayer
        }));
        layerLeftOffset += this.bracketWidth;
      } else if (char === '+') {
        this.drawingArea.append(this.createPlusSign({
          topOffset: topOffset,
          leftOffset: layerLeftOffset,
          layer: options.toLayer
        }));
        layerLeftOffset += this.plusWidth;
      } else if (char === ' ') {
        this.drawingArea.append(this.createSpaceEl({
          topOffset: topOffset,
          leftOffset: layerLeftOffset,
          layer: options.toLayer
        }));
        layerLeftOffset += this.spaceWidth;
      }
      else { // must be an array element at this point
        let newEl = this.createArrayElement({
          layer: options.toLayer,
          val: parseInt(char),
          topOffset: topOffset,
          leftOffset: layerLeftOffset,
          animate: options.animate
        });
        // console.log(`Created ${newEl.attr('id')}`);
        this.drawingArea.append(newEl);
        layerLeftOffset += this.elementWidth;
      }
    });
  }


  // Renders a set of a paths
  // Takes an options object with the keys:
  //     fromArray, fromLayer, toLayer, sectionCharString, layerLeftOffset,
  //     referenceEl
  createPaths(options) {
    let prevElements = {};

    options.fromArray.forEach(el => {
      prevElements[el] = $(`#${this.createArrayElId(options.fromLayer, el)}`);
    });

    let sectionChars = options.sectionCharString.split("");
    let prevRef = prevElements[options.referenceEl];
    let layerLeftOffset = parseInt(prevRef.css("left")) +
                          options.layerLeftOffset;

    let prevLeft, prevElement, horizontalShift, verticalShift, xStart, yStart;
    verticalShift = (options.toLayer - options.fromLayer) *
                     this.elementHeight;

    sectionChars.forEach(char => {
      if (char === '[' || char === ']') {
        layerLeftOffset += this.bracketWidth;
      } else if (char === '+') {
        layerLeftOffset += this.plusWidth;
      } else if (char === ' ') {
        layerLeftOffset += this.spaceWidth;
      }
      else { // must be an array element at this point
        prevElement = prevElements[parseInt(char)];
        xStart = parseInt(prevElement.css("left"));
        horizontalShift = layerLeftOffset - xStart;

        yStart = parseInt(prevElement.css("top"));


        this.createSvgPath({
          fromLayer: options.fromLayer,
          toLayer: options.toLayer,
          val: parseInt(char),
          xStart: 0,
          yStart: 0,
          verticalShift: verticalShift,
          horizontalShift: horizontalShift
        });
        layerLeftOffset += this.elementWidth;
      }
    });
  }

  createLegend() {
    this.legendWidth = this.legendFontSize * 11;
    this.legendEntryContWidth = this.legendRadius * 2 + 20;
    this.legendEntryContHeight = this.legendRadius * 2 + 4;
    this.legendHeight = this.legendEntryContHeight * 2 + 10;

    let legendOptions = {
      width: this.legendWidth,
      height: this.legendHeight,
      class: this.createLegendClass(),
      top: (this.elementHeight - this.legendHeight)/2,
      left: this.drawingArea.width() - this.legendWidth - 20
    };

    let legendEntryOptions = {
      width: this.legendWidth,
      height: this.legendEntryContHeight,
      class: this.legendEntryContClass
    };

    let pivotElementContOptions = {
      class: `${this.legendElContClass} ${this.pivotElementClass}`,
      width: this.legendEntryContWidth,
      height: this.legendEntryContHeight,
      id: this.legendPivotId
    };

    let activeElementContOptions = {
      class: `${this.legendElContClass} ${this.activeElementClass}`,
      width: this.legendEntryContWidth,
      height: this.legendEntryContHeight,
      id: this.legendActiveId
    };

    let pivotElementOptions = {
      class: `${this.arrayElClass}`,
      width: this.legendRadius*2,
      height: this.legendRadius*2,
    };

    let activeElementOptions = {
      class: `${this.arrayElClass}`,
      width: this.legendRadius*2,
      height: this.legendRadius*2,
    };

    let $legend = $("<div>", legendOptions);
    $legend.offset({left: legendOptions.left, top: legendOptions.top});

    let $pivotCont = $("<div>", legendEntryOptions);
    let $activeCont = $("<div>", legendEntryOptions);

    let $pivotCircleCont = $("<div>", pivotElementContOptions);
    let $activeCircleCont = $("<div>", activeElementContOptions);
    let $pivotCircle = $("<div>", pivotElementOptions);
    let $activeCircle = $("<div>", activeElementOptions);

    let $pivotText = $("<p>", {style: `font-size:${this.legendFontSize}px`});
    $pivotText.html("pivot element");
    let $activeText = $("<p>", {style: `font-size:${this.legendFontSize}px`});
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
  animateLayers() {
    this.layers.forEach((layer, idx) => {
      let referenceEl = this.referenceEls[layer];
      let fromArray = this.fromArrays[layer];

      this.createAnimation({
        fromLayer: this.fromLayers[layer],
        toLayer: this.toLayers[layer],
        val: referenceEl
      });

      fromArray.forEach(el => {
        if (el === referenceEl) return;
        this.createAnimation({
          fromLayer: this.fromLayers[layer],
          toLayer: this.toLayers[layer],
          val: el
        });
      });
    });
  }

}


module.exports = Quicksort;
