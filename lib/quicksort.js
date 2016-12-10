import AnimationOptions from './animation_options';
import anime from 'animejs';


class Quicksort extends AnimationOptions {
  constructor(options) {
    super(options);
    this.startArray = [5, 1, 2, 3, 7, 4, 0 , 6];
    this.numElements = this.startArray.length;
    this.leftIndent = this.calculateLeftIndent();
    this.algorithmTitle.html("Quicksort");
    this.renderStartLayer();
    this.configureLayerOptions();
    this.renderSortingLayers();
    // this.renderMergingLayers();
    // this.renderLayer1();
    // this.renderLayer2();
    //
    $("body").html($("body").html());
    this.animateLayers();
    // this.animateLayer1();
    // this.animateLayer2();
    // this.renderLayer3();
    // this.renderLayer4();
    // this.renderLayer5();
    // this.renderLayer6();
    // this.renderLayer7();
    // this.renderLayer8();
  }

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
      topOffset: -3,
      leftOffset: this.leftIndent + this.numElements*this.elementWidth
                  + this.bracketWidth,
      bracketType: ']',
      layer: 0
    });
    this.drawingArea.append(closingBracket);
  }

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
        'L6-right-r': [5, 7, 6],
        'L7-left': [0, 1],
        'L7-mid': [2],
        'L7-right': [5, 3, 7, 4, 6],
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

  renderSortingLayers() {
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

      if (idx <= 13) this.createPaths(renderOptions);
    });

  }

  animateLayers() {
    this.layers.forEach((layer, idx) => {
      if (idx <= 13) {
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
      }
    });
  }

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

    // console.log(`fromLayer: ${options.fromLayer}`);
    // console.log(`prevElements: ${prevElements}`);
    // if (options.fromLayer === 5 && options.toLayer === 6) debugger;
    let sectionChars = options.sectionCharString.split("");
    let layerLeftOffset = parseInt(prevElements[options.referenceEl].css("left")) +
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
    // $("body").html($("body").html());
  }

  // animateLayer1() {
  //   let pivotEl = 2;
  //   this.createAnimation({
  //     fromLayer: 0,
  //     toLayer: 1,
  //     val: pivotEl,
  //   });
  //
  //   this.startArray.forEach(el => {
  //     if (el === pivotEl) return;
  //     this.createAnimation({
  //       fromLayer: 0,
  //       toLayer: 1,
  //       val: el,
  //     });
  //   });
  // }
  //
  // renderLayer1() {
  //   console.log("Rendering layer 1");
  //
  //   let renderOptions = {
  //     fromArray: this.startArray,
  //     fromLayer: 0,
  //     toLayer: 1,
  //     sectionCharString: '[10]+[2]+[53746]',
  //     layerLeftOffset: -3 * this.bracketWidth - 2 * this.elementWidth -
  //                      this.plusWidth,
  //     topOffset: this.elementHeight,
  //     referenceEl: 2
  //   };
  //   this.renderSection(renderOptions);
  //
  //   renderOptions.animate = true;
  //   this.renderSection(renderOptions);
  //
  //   this.createPaths(renderOptions);
  //   // this.animateLayer1();
  // }
  //
  // animateLayer2() {
  //   console.log("Animating layer 2");
  //   let leftPivot = 1;
  //
  //   this.createAnimation({
  //     fromLayer: 1,
  //     toLayer: 2,
  //     val: leftPivot,
  //   });
  //
  //   [1, 0].forEach(el => {
  //     console.log("animateLayer2 element: ", el);
  //     if (el === leftPivot) return;
  //     this.createAnimation({
  //       fromLayer: 1,
  //       toLayer: 2,
  //       val: el,
  //     });
  //   });
  //
  //   let rightPivot = 4;
  //
  //   this.createAnimation({
  //     fromLayer: 1,
  //     toLayer: 2,
  //     val: rightPivot,
  //   });
  //
  //   [5, 3, 7, 4, 6].forEach(el => {
  //     if (el === rightPivot) return;
  //     this.createAnimation({
  //       fromLayer: 1,
  //       toLayer: 2,
  //       val: el,
  //     });
  //   });
  // }
  //
  // renderLayer2() {
  //   console.log("Rendering layer 2");
  //   let leftRenderOptions = {
  //     fromArray: [1, 0],
  //     fromLayer: 1,
  //     toLayer: 2,
  //     sectionCharString: '[0]+[1]+[ ]',
  //     layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
  //                      this.elementWidth,
  //     referenceEl: 1
  //   };
  //   leftRenderOptions.topOffset = leftRenderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(leftRenderOptions);
  //   leftRenderOptions.animate = true;
  //   this.renderSection(leftRenderOptions);
  //   this.createPaths(leftRenderOptions);
  //
  //   let rightRenderOptions = {
  //     fromArray: [5, 3, 7, 4, 6],
  //     fromLayer: 1,
  //     toLayer: 2,
  //     sectionCharString: '[3]+[4]+[576]',
  //     layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
  //                      this.elementWidth,
  //     referenceEl: 4
  //   };
  //   rightRenderOptions.topOffset = rightRenderOptions.toLayer * this.elementHeight;
  //   this.renderSection(rightRenderOptions);
  //   rightRenderOptions.animate = true;
  //   this.renderSection(rightRenderOptions);
  //   this.createPaths(rightRenderOptions);
  //
  //   // this.animateLayer2();
  // }
  //
  // renderLayer3() {
  //   let renderOptions = {
  //     fromArray: [5, 7, 6],
  //     fromLayer: 2,
  //     toLayer: 3,
  //     sectionCharString: '[56]+[7]+[ ]',
  //     layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
  //                      2*this.elementWidth,
  //     referenceEl: 7
  //   };
  //   renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(renderOptions);
  // }
  //
  // renderLayer4() {
  //   let renderOptions = {
  //     fromArray: [5, 6],
  //     fromLayer: 3,
  //     toLayer: 4,
  //     sectionCharString: '[5]+[6]+[ ]',
  //     layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
  //                      this.elementWidth,
  //     topOffset: 4*this.elementHeight,
  //     referenceEl: 6
  //   };
  //   renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(renderOptions);
  // }
  //
  // renderLayer5() {
  //   let renderOptions = {
  //     fromArray: [5, 6],
  //     fromLayer: 4,
  //     toLayer: 5,
  //     sectionCharString: '[56]+[7]+[ ]',
  //     layerLeftOffset: -this.bracketWidth - this.elementWidth,
  //     referenceEl: 6
  //   };
  //   renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(renderOptions);
  // }
  //
  // renderLayer6() {
  //   let leftRenderOptions = {
  //     fromArray: [0, 1],
  //     fromLayer: 2,
  //     toLayer: 6,
  //     sectionCharString: '[0]+[1]+[ ]',
  //     layerLeftOffset: -this.bracketWidth,
  //     referenceEl: 0
  //   };
  //   leftRenderOptions.topOffset = leftRenderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(leftRenderOptions);
  //
  //   let rightRenderOptions = {
  //     fromArray: [3, 4, 5, 7, 6],
  //     fromLayer: 2,
  //     toLayer: 6,
  //     sectionCharString: '[3]+[4]+[567]',
  //     layerLeftOffset: -this.bracketWidth,
  //     referenceEl: 3
  //   };
  //   rightRenderOptions.topOffset = rightRenderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(rightRenderOptions);
  // }
  //
  // renderLayer7() {
  //   let renderOptions = {
  //     fromArray: [1, 0, 2, 5, 3, 7, 4, 6],
  //     fromLayer: 1,
  //     toLayer: 7,
  //     sectionCharString: '[01]+[2]+[34567]',
  //     layerLeftOffset: -this.bracketWidth,
  //     referenceEl: 1
  //   };
  //   renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(renderOptions);
  // }
  //
  // renderLayer8() {
  //   let renderOptions = {
  //     fromArray: [5, 1, 2, 3, 7, 4, 0, 6],
  //     fromLayer: 0,
  //     toLayer: 8,
  //     sectionCharString: '[01234567]',
  //     layerLeftOffset: -this.bracketWidth,
  //     referenceEl: 5
  //   };
  //   renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;
  //
  //   this.renderSection(renderOptions);
  // }
}


module.exports = Quicksort;
