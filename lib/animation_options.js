class AnimationOptions {
  constructor(options) {
    this.visAreaId = options.visAreaId;
    this.pivotColor = options.pivotColor;
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

  arrayElClassName(layerNum) {
    return `layer-${layerNum}-element`;
  }

  arrayElIdName(layerNum, val) {
    return `layer-${layerNum}-element-${val}`;
  }


  moveArrayElement(options) {
    let oldElement, val;

    if (options["oldClassName"]) {
      oldElement = $(`.${options.oldClassName}`);
    } else if (options["oldIdName"]) {
      oldElement = $(`#${options.oldIdName}`);
    } else {
      throw `Error in AnimationOptions#moveArrayElement - ` +
            `no oldIdName or oldClassName provided` +
            `options received: ${options}`;
    }

    let oldX, oldY, newX, newY, newHeight, newWidth;

    val = oldElement.find("text").text();
    oldX = oldElement.css("x");
    oldY = oldElement.css("y");
    newX = oldX + options.dx;
    newY = oldY + options.dy;
    newWidth = Math.abs(newX - oldX) + this.elementWidth;
    newHeight = Math.abs(newY - oldY) + this.elementHeight;

    let svgArrayElementParams = {
      height: newHeight,
      width: newWidth,
      xPos: Math.min(oldX, newX),
      y: Math.min(oldY, newY),
      class: this.arrayElClassName(options.newLayerNum),
      id: this.arrayElIdName(options.newLayerNum, val)
    };
  }

  createSvgArrayElement(options) {
    let svgParams = {
      height: options.svgHeight,
      width: options.svgWidth,
      x: options.svgXPos,
      y: options.svgYPos,
      class: options.className,
      id: options.idName
    };

    let circleParams = {
      "cx": this.elementCx + options.svgElXPosOffset,
      "cy": this.elementCy + options.svgElYPosOffset,
      "r": this.elementRadius,
      "fill": "white",
      "stroke": "black",
      "stroke-width": "3",
      class: options.className
    };

    let textParams = {x: this.textX + options.svgElXPosOffset,
                      y: this.textY + options.svgElYPosOffset,
                      fill: "black",
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
