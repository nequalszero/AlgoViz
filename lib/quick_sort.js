import AnimationOptions from './animation_options';
import anime from 'animejs';

class QuickSort extends AnimationOptions {
  constructor(options) {
    super(options);
    this.containerWidth = $(window).width();
    this.startElements = [5, 1, 2, 3, 7, 4, 0, 6];
    this.startElIdPrefix = "startEl-";
    this.startPivotEl = 2;
    this.numElements = this.startElements.length;
    this.leftIndent = this.calculateLeftIndent();
    this.drawStart();
  }

  drawStart() {
    let $div = $("<div>", {id: "start-layer", "class": "layer",
                           height: this.layerHeight});
    let $svgContainer = $("<svg>", {width: "100%",
                                    height: this.elementHeight,
                                    class: "light-green"});
    this.startElements.forEach((el, idx) => {
      $svgContainer.append(this.createSvg(el, idx));
    });
    $div.append($svgContainer);
    $("#visualization-area").append($div);
    $("body").html($("body").html());
  }

  createSvg(val, idx) {
    let svgParams = {
      height: this.elementHeight,
      width: this.elementWidth,
      x: this.leftIndent + idx*this.elementWidth,
      id: `${this.startElIdPrefix}${val}`
    };

    if (val === this.startPivotEl) svgParams.class = "pivot";

    let circleParams = {
      "cx": this.elementCx,
      "cy": this.elementCy,
      "r": this.elementRadius,
      "fill": "white",
      "stroke": "black",
      "stroke-width": "3"
    };

    let textParams = {
      x: this.textX,
      y: this.textY,
      fill: "black",
      style: `font-size:${this.fontSize}`
    };

    let $svg = $("<svg>", svgParams);
    let $circle = $("<circle>", circleParams);
    let $text = $("<text>", textParams);
    $text.text(val);
    $svg.append($circle);
    $svg.append($text);
    return $svg;
  }



  calculateLeftIndent() {
    let vizAreaWidth = $("#visualization-area").width();
    let startArraySpacing = this.numElements * this.elementWidth;
    let leftIndent = Math.floor((vizAreaWidth - startArraySpacing)/2);
    return leftIndent;
  }
}

module.exports = QuickSort;
