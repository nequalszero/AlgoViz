import AnimationOptions from './animation_options';
import anime from 'animejs';
// console.log(anime.easings);

class QuickSort extends AnimationOptions {
  constructor(options) {
    super(options);
    this.containerWidth = $(window).width();
    this.startElements = [5, 1, 2, 3, 7, 4, 0, 6];
    this.startElIdPrefix = "startEl-";
    this.startElClassName = "start-element";
    this.startPivotEl = 2;
    this.numElements = this.startElements.length;
    this.leftIndent = this.calculateLeftIndent();
    this.idToColorArray = this.generateIdToColorArray();
    this.renderLayers(this.idToColorArray);
    this.renderStartLayer();
  }

  generateIdToColorArray() {
    return [
      ["layer0", this.colors.lightGreen2],
      ["layer1", this.colors.lightGreen],
      ["layer2", this.colors.lightBlue2],
      ["layer3", this.colors.lightBlue],
      ["layer4", this.colors.lightBlue3],
      ["layer5", this.colors.lightBlue3],
      ["layer6", this.colors.lightBlue],
      ["layer7", this.colors.lightBlue2],
      ["layer8", this.colors.lightGreen]
    ];
  }

  renderStartLayer() {
    let $svgContainer = $(`#${this.svgContainerId}`);

    let bracketYPos = 10;
    let bracketSize = Math.floor(this.elementRadius * 2 * 1.4);

    let openBracketOptions = {
      type: "open",
      xPos: this.leftIndent - 55,
      yPos: bracketYPos,
      size: bracketSize,
      className: `${this.startElClassName} bracket`
    };
    let closeBracketOptions = {
      type: "close",
      xPos: this.leftIndent + this.numElements*this.elementWidth - 30,
      yPos: bracketYPos,
      size: bracketSize,
      className: `${this.startElClassName} bracket`
    };

    let elementOptions, xPos, pivot;

    $svgContainer.append(this.createArrayBracket(openBracketOptions));

    this.startElements.forEach((el, idx) => {
      elementOptions = {
        val: el,
        xPos: this.leftIndent + idx*this.elementWidth,
        yPos: 0,
        pivot: (el === this.startPivotEl) ? true : false,
        className: this.startElClassName
      };

      if (elementOptions.pivot) elementOptions.className += " pivot";
      $svgContainer.append(this.createSvgArrayElement(elementOptions));
    });

    $svgContainer.append(this.createArrayBracket(closeBracketOptions));
    $("body").html($("body").html());
    $(`.${this.startElClassName}`).fadeOut(0);
    $(`.${this.startElClassName}`).fadeIn(1500, "linear");
    // return this.renderLayer1();
  }

  renderLayer1() {
    window.setTimeout(() => {
      console.log("rendering layer 1 callback 1");
      let layerHeight = this.layerHeight*2;
      let $div = $("<div>", {id: "layer1", "class": "layer",
                             height: layerHeight});
      let $svgContainer = $("<svg>", {width: $(`#${this.visAreaId}`).width(),
                                      height: layerHeight,
                                    class: "light-blue"});
      let $dummySvg = $("<svg>", {width: $(`#${this.visAreaId}`).width(),
                                  height: this.layerHeight,
                                  y: this.layerHeight,
                                  class: "light-blue"});
      $svgContainer.append($dummySvg);
      $div.append($svgContainer);
      $(`#${this.visAreaId}`).append($div);
      $("body").html($("body").html());
    }, 2000);
  }

  calculateLeftIndent() {
    let vizAreaWidth = $(`#${this.visAreaId}`).width();
    let startArraySpacing = this.numElements * this.elementWidth;
    let leftIndent = Math.floor((vizAreaWidth - startArraySpacing)/2);
    return leftIndent;
  }
}

module.exports = QuickSort;
