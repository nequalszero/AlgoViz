import AnimationOptions from './animation_options';
import anime from 'animejs';
// console.log(anime.easings);

class QuickSort extends AnimationOptions {
  constructor(options) {
    super(options);
    this.containerWidth = $(window).width();
    this.startElements = [5, 1, 2, 3, 7, 4, 0, 6];
    this.startElIdPrefix = "startEl-";
    this.startElClassName = "layer-0-element";
    this.startPivotEl = 2;
    this.numElements = this.startElements.length;
    this.leftIndent = this.calculateLeftIndent();
    this.idToColorArray = this.generateIdToColorArray();
    this.renderLayers(this.idToColorArray);
    this.renderStartLayer();
    this.renderLayer1();
  }

  generateIdToColorArray() {
    return [
      ["layer0-rect", this.colors.lightGreen2],
      ["layer1-rect", this.colors.lightGreen],
      ["layer2-rect", this.colors.lightBlue2],
      ["layer3-rect", this.colors.lightBlue],
      ["layer4-rect", this.colors.lightBlue3],
      ["layer5-rect", this.colors.lightBlue3],
      ["layer6-rect", this.colors.lightBlue],
      ["layer7-rect", this.colors.lightBlue2],
      ["layer8-rect", this.colors.lightGreen]
    ];
  }

  renderStartLayer() {
    this.renderStartBrackets();
    this.renderStartElements();
  }

  renderStartBrackets() {
    let $svgContainer = $(`#${this.svgContainerId}`);

    let bracketYPos = 10;
    let bracketSize = Math.floor(this.elementRadius * 2 * 1.4);

    let openBracketOptions = {
      type: "open",
      xPos: this.leftIndent - 55,
      yPos: bracketYPos,
      size: bracketSize,
      className: `${this.arrayElClassName(0)} bracket`
    };
    let closeBracketOptions = {
      type: "close",
      xPos: this.leftIndent + this.numElements*this.elementWidth - 30,
      yPos: bracketYPos,
      size: bracketSize,
      className: `${this.arrayElClassName(0)} bracket`
    };

    $svgContainer.append(this.createArrayBracket(openBracketOptions));
    $svgContainer.append(this.createArrayBracket(closeBracketOptions));
    $("body").html($("body").html());
  }

  renderStartElements() {
    let $svgContainer = $(`#${this.svgContainerId}`);
    let elementOptions;

    this.startElements.forEach((el, idx) => {
      elementOptions = {
        val: el,
        xPos: this.leftIndent + idx*this.elementWidth,
        yPos: 0,
        pivot: (el === this.startPivotEl) ? true : false,
        className: this.arrayElClassName(0),
        idName: this.arrayElIdName(0, el)
      };

      if (elementOptions.pivot) elementOptions.className += " pivot";
      $svgContainer.append(this.createSvgArrayElement(elementOptions));
    });

    $("body").html($("body").html());
    $(`.${this.arrayElClassName(0)}`).fadeOut(0);
    $(`.${this.arrayElClassName(0)}`).fadeIn(1500, "linear");
  }

  renderLayer1() {
    window.setTimeout(() => {
      console.log("rendering layer 1 callback 1");
      $(`.${this.arrayElClassName(0)}.pivot`).css({fill: `${this.pivotColor}`});

      let options = {
        oldClassName: `.${this.arrayElClassName(0)}.pivot`,
        dx: 0,
        dy: this.elementHeight,
        newLayerNum: 1
      };

      // this.moveArrayElement(options);
      $("body").html($("body").html());
    }, 3000);
  }

  moveArrayElement(options) {
    let oldElement, oldX, oldY, newX, newY;

    if (options["oldClassName"]) {
      oldElement = $(`.${options.oldClassName}`);
    } else if (options["oldIdName"]) {
      oldElement = $(`#${options.oldIdName}`);
    } else {
      throw `Error in AnimationOptions#moveArrayElement - ` +
            `no oldIdName or oldClassName provided` +
            `options received: ${options}`;
    }
    oldX = oldElement.css("x");
    oldY = oldElement.css("y");
  }

  testFunction() {
    window.setTimeout(() => {
      console.log("can still access");
    }, 5000);
  }

  calculateLeftIndent() {
    let vizAreaWidth = $(`#${this.visAreaId}`).width();
    let startArraySpacing = this.numElements * this.elementWidth;
    let leftIndent = Math.floor((vizAreaWidth - startArraySpacing)/2);
    return leftIndent;
  }
}

module.exports = QuickSort;
