class AnimationOptions {
  constructor(options) {
    this.visAreaId = options.visAreaId;
    this.svgContainerId = options.svgContainerId;
    this.elementHeight = options.elementHeight;
    this.elementWidth = options.elementWidth;
    this.elementRadius = options.elementRadius;
    this.elementCx = options.elementCx;
    this.elementCy = options.elementCy;
    this.fontSize = options.fontSize;
    this.textY = options.textY;
    this.textX = options.textX;
    this.layerHeight = options.layerHeight;

    this.colors = options.colors;
    // this.printOptions(options);
  }

  printOptions(options) {
    const optionKeys = Object.keys(options);
    optionKeys.forEach(optionKey => {
      console.log(optionKey, options[optionKey]);
    });
  }

  createSvgArrayElement(options) {
    let svgParams = {
      height: this.elementHeight,
      width: this.elementWidth,
      x: options.xPos,
      y: options.yPos,
      class: options.className
    };

    let circleParams = {
      "cx": this.elementCx,
      "cy": this.elementCy,
      "r": this.elementRadius,
      "fill": "white",
      "stroke": "black",
      "stroke-width": "3",
      class: options.className
    };

    let textParams = {x: this.textX, y: this.textY, fill: "black",
                      style: `font-size:${this.fontSize}`};

    let $svg = $("<svg>", svgParams);
    let $circle = $("<circle>", circleParams);
    let $text = $("<text>", textParams);
    $text.text(options.val);
    $svg.append($circle);
    $svg.append($text);
    return $svg;
  }

  createArrayBracket(options) {
    let val = options.type === "open" ? "[" : "]";
    let svgParams = {
      height: this.elementHeight,
      width: 20,
      x: options.xPos,
      y: options.yPos,
      class: options.className
    };
    let textParams = {x: this.textX, y: this.textY, fill: "black",
                      style: `font-size:${options.size}`};
    let $svg = $("<svg>", svgParams);
    let $text = $("<text>", textParams);

    $text.text(val);
    $svg.append($text);
    return $svg;
  }

  // idToColorArray is an array of arrays, which each internal array is
  // a [id, class] pair.  Order should be from the first to last layer.
  renderLayers(idToColorArray) {
    let numLayers = idToColorArray.length;
    let $div = $("<div>", {id: "start-layer", "class": "layer",
                           height: this.layerHeight * idToColorArray.length });
    let $svgContainer = $("<svg>", {width: "100%",
                          height: this.elementHeight * idToColorArray.length,
                          id: `${this.svgContainerId}`});
    let newLayer, idName, color, yPosition;

    idToColorArray.forEach((arr, idx) => {
      idName = arr[0];
      color = arr[1];
      yPosition = this.layerHeight * idx;
      // newLayer = this.createLayer(idName, color, layerHeight);
      $svgContainer.append(this.createLayer(idName, color, yPosition));
      // $svgContainer.append(newLayer);
    });

    $div.append($svgContainer);
    $("#visualization-area").append($div);
    $("body").html($("body").html());
  }

  createLayer(idName, color, height) {
    // width and color provided by class
    let svgParams = {
      "height": this.elementHeight,
      "id": idName,
      "x": 0,
      "y": height
    };
    let $svg = $("<svg>", svgParams);
    // return $svg;
    let rectParams = {
      width: "100%",
      height: this.elementHeight,
      "fill": color,
      "stroke-width": 1,
      "stroke": "black"
    };
    let $rect = $("<rect>", rectParams);
    $svg.append($rect);
    return $svg;
  }
}

module.exports = AnimationOptions;
