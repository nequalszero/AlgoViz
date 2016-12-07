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
    this.renderLayer1();
    this.renderLayer2();
    this.renderLayer3();
    this.renderLayer4();
    this.renderLayer5();
    this.renderLayer6();
    this.renderLayer7();
    this.renderLayer8();
  }

  renderStartLayer() {
    console.log("Rendering start layer");
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

  // Renders a section of a layer
  // Takes an options object with the keys:
  //     fromArray, fromLayer, toLayer, sectionCharString, layerLeftOffset,
  //     topOffset, referenceEl
  renderSection(options) {
    let prevElements = {};
    let elementOffsets = {};

    options.fromArray.forEach(el => {
      prevElements[el] = $(`#${this.createArrayElId(options.fromLayer, el)}`);
    });

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
        }));
        layerLeftOffset += this.spaceWidth;
      }
      else { // must be an array element at this point
        this.drawingArea.append(this.createArrayElement({
          layer: options.toLayer,
          val: parseInt(char),
          topOffset: topOffset,
          leftOffset: layerLeftOffset
        }));
        layerLeftOffset += this.elementWidth;
      }
    });
  }

  // Renders a section of a layer
  // Takes an options object with the keys:
  //     fromArray, fromLayer, toLayer, sectionCharString, layerLeftOffset,
  //     topOffset,
  renderLayer1() {
    let renderOptions = {
      fromArray: this.startArray,
      fromLayer: 0,
      toLayer: 1,
      sectionCharString: '[10]+[2]+[53746]',
      layerLeftOffset: -3 * this.bracketWidth - 2 * this.elementWidth -
                       this.plusWidth,
      topOffset: this.elementHeight,
      referenceEl: 2
    };

    this.renderSection(renderOptions);
  }

  renderLayer2() {
    let leftRenderOptions = {
      fromArray: [1, 0],
      fromLayer: 1,
      toLayer: 2,
      sectionCharString: '[0]+[1]+[ ]',
      layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
                       this.elementWidth,
      referenceEl: 1
    };
    leftRenderOptions.topOffset = leftRenderOptions.toLayer * this.elementHeight;

    this.renderSection(leftRenderOptions);

    let rightRenderOptions = {
      fromArray: [5, 3, 7, 4, 6],
      fromLayer: 1,
      toLayer: 2,
      sectionCharString: '[3]+[4]+[576]',
      layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
                       this.elementWidth,
      referenceEl: 4
    };
    rightRenderOptions.topOffset = rightRenderOptions.toLayer * this.elementHeight;
    this.renderSection(rightRenderOptions);
  }

  renderLayer3() {
    let renderOptions = {
      fromArray: [5, 7, 6],
      fromLayer: 2,
      toLayer: 3,
      sectionCharString: '[56]+[7]+[ ]',
      layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
                       2*this.elementWidth,
      referenceEl: 7
    };
    renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;

    this.renderSection(renderOptions);
  }

  renderLayer4() {
    let renderOptions = {
      fromArray: [5, 6],
      fromLayer: 3,
      toLayer: 4,
      sectionCharString: '[5]+[6]+[ ]',
      layerLeftOffset: -3*this.bracketWidth - this.plusWidth -
                       this.elementWidth,
      topOffset: 4*this.elementHeight,
      referenceEl: 6
    };
    renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;

    this.renderSection(renderOptions);
  }

  renderLayer5() {
    let renderOptions = {
      fromArray: [5, 6],
      fromLayer: 4,
      toLayer: 5,
      sectionCharString: '[56]+[7]+[ ]',
      layerLeftOffset: -this.bracketWidth - this.elementWidth,
      referenceEl: 6
    };
    renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;

    this.renderSection(renderOptions);
  }

  renderLayer6() {
    let leftRenderOptions = {
      fromArray: [0, 1],
      fromLayer: 2,
      toLayer: 6,
      sectionCharString: '[0]+[1]+[ ]',
      layerLeftOffset: -this.bracketWidth,
      referenceEl: 0
    };
    leftRenderOptions.topOffset = leftRenderOptions.toLayer * this.elementHeight;

    this.renderSection(leftRenderOptions);

    let rightRenderOptions = {
      fromArray: [3, 4, 5, 7, 6],
      fromLayer: 2,
      toLayer: 6,
      sectionCharString: '[3]+[4]+[567]',
      layerLeftOffset: -this.bracketWidth,
      referenceEl: 3
    };
    rightRenderOptions.topOffset = rightRenderOptions.toLayer * this.elementHeight;

    this.renderSection(rightRenderOptions);
  }

  renderLayer7() {
    let renderOptions = {
      fromArray: [1, 0, 2, 5, 3, 7, 4, 6],
      fromLayer: 1,
      toLayer: 7,
      sectionCharString: '[01]+[2]+[34567]',
      layerLeftOffset: -this.bracketWidth,
      referenceEl: 1
    };
    renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;

    this.renderSection(renderOptions);
  }

  renderLayer8() {
    let renderOptions = {
      fromArray: [5, 1, 2, 3, 7, 4, 0, 6],
      fromLayer: 0,
      toLayer: 8,
      sectionCharString: '[01234567]',
      layerLeftOffset: -this.bracketWidth,
      referenceEl: 5
    };
    renderOptions.topOffset = renderOptions.toLayer * this.elementHeight;

    this.renderSection(renderOptions);
  }
}


module.exports = Quicksort;
