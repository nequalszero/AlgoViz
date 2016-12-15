import anime from 'animejs';

class AnimationOptions {
  constructor(options) {
    this.visAreaId = options.visAreaId;
    this.algorithmTitle = $(`#${options.algorithmTitleId}`);
    this.drawingArea = $(`#${options.drawingAreaId}`);
    this.arrayElContainerClass = options.arrayElContainerClass;
    this.pathContainer = $(`#${options.svgPathContainerId}`);
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

    this.pivotColor = options.pivotColor;
    this.pathColor = options.pathColor;  // only time !== none is for testing
    this.pathWidth = options.pathWidth;  // just for testing

    this.elementHeightFactor = options.elementHeightFactor;
    this.elementWidthFactor = options.elementWidthFactor;
    this.elementRadiusFactor = options.elementRadiusFactor;
    this.fontSizeFactor = options.fontSizeFactor;

    this.calibrateSizings();

    this.plusSize = this.fontSize;
    this.plusWidth = Math.floor(this.elementWidth*0.5);
    this.plusHeight = this.elementHeight;

    this.spaceWidth = Math.floor(this.elementWidth*0.25);
    this.spaceHeight = this.elementHeight;

    this.animationSpeed = this.configureAnimationSpeed();
    this.minAnimationDuration = options.minAnimationDuration;

    this.colorClasses = options.colorClasses;
    // this.printOptions(options);
    this.bindMethodsToWindow();   // for testing
  }

  // for testing
  bindMethodsToWindow() {
      window.animateElClass = this.animateElClass;
      window.arrayElContainerClass = this.arrayElContainerClass;

      window.createPathId = this.createPathId;
      window.createArrayElId = this.createArrayElId;
      window.createArrayElClass = this.createArrayElClass;
      window.getPathTraversalTime = this.getPathTraversalTime.bind(this);
  }

  // for testing
  printOptions(options) {
    const optionKeys = Object.keys(options);
    optionKeys.forEach(optionKey => {
      console.log(`${optionKey}: ${options[optionKey]}`);
    });
  }

  // Set animation speed based on window width
  configureAnimationSpeed() {
    let areaWidth = parseInt(this.drawingArea.css("width"));
    return ((2850 - areaWidth)/(950/3)); // milli-seconds/length
  }

  // Size elements based on window dimensions
  calibrateSizings() {
    let drawingAreaHeight = parseInt(this.drawingArea.css("height"));

    this.elementHeight = drawingAreaHeight/9;
    this.elementWidth = Math.floor(this.elementWidthFactor *
                                    parseInt(this.drawingArea.css("width")));
    this.elementRadius = Math.min(
      Math.floor(this.elementRadiusFactor * this.elementHeight),
      Math.floor(this.elementRadiusFactor * this.elementWidth)
    );
    this.fontSize = Math.min(
      Math.floor(this.fontSizeFactor * this.elementHeight),
      Math.floor(this.fontSizeFactor * this.elementWidth)
    );
    this.labelFontSize = Math.floor(0.6 * this.fontSize);
    this.labelPaddingSides = Math.floor(0.8 * this.labelFontSize);
    this.labelPaddingVert = Math.floor(0.8 * this.labelFontSize);

    this.bracketSize = Math.floor(this.elementRadius * 2 * 1.3);

    this.bracketWidth = Math.floor(this.elementWidth/3);
    this.bracketHeight = this.elementHeight;
    this.bracketTopOffsetAdjustment = Math.ceil(-0.05*this.bracketSize);
  }

  createPathId(fromLayer, toLayer, val) {
    return `path-l${fromLayer}-l${toLayer}-v${val}`;
  }

  getLayerClass(layer) {
    return `l${layer}`;
  }

  createArrayElId(layer, val, animateable) {
    let idName = `layer-${layer}-v${val}`;
    if (animateable) idName += `-${this.animateElClass}`;
    else idName += `-${this.stationaryElClass}`;
    return idName;
  }

  createArrayElClass(layer, animateable) {
    let className = `${this.arrayElContainerClass} l${layer}`;
    if (animateable) className += ` ${this.animateElClass}`;
    else className += ` ${this.stationaryElClass}`;
    return className;
  }

  createBracketClass(layer) {
    return `${this.bracketElClass} l${layer}`;
  }

  createPlusClass(layer) {
    return `${this.plusElClass} l${layer}`;
  }

  createSpaceClass(layer) {
    return `${this.spaceElClass} l${layer}`;
  }

  createBackgroundClass(layer) {
    return `${this.layerBackgroundClass} l${layer}`;
  }

  createBackgroundLayerElement(options) {
    let backgroundOptions = {
      class: `${this.createBackgroundClass(options.layer)} ` +
             `${options.colorClass}`,
      height: this.elementHeight
    };

    let $bg = $("<div>", backgroundOptions);
    $bg.offset({top: options.layer*this.elementHeight});

    let $layerLabel = $("<div>", {
      class: this.layerLabelClass,
      style: `font-size:${this.labelFontSize}px;` +
             `padding: ${this.labelPaddingVert}px ${this.labelPaddingSides}px;`,
      height: 1.4*this.labelFontSize
    });

    $layerLabel.html(`${options.text}`);

    $bg.append($layerLabel);
    return $bg;
  }

  // Creates div element with array element inside.
  // Requires options object containing:
  //   layer, val, topOffset, leftOffset
  //   ***optional keys: idName, className, animate
  createArrayElement(options) {
    // Create container for element that is positioned absolute to the drawing
    //   area and display:flex to center the array element div.
    let idName = options.idName || this.createArrayElId(options.layer,
                                                        options.val,
                                                        options.animate);
    let className = options.className || this.createArrayElClass(options.layer,
                                                                 options.animate);

    let containerParams = {
      class: className,
      id: idName,
      width: this.elementWidth,
      height: this.elementHeight
    };

    let $arrayElCont = $("<div>", containerParams);
    $arrayElCont.offset({
      top: options.topOffset,
      left: options.leftOffset
    });

    // Create circular div to house the <p> tag with the element value.
    // display:flex to center the <p> elementthis.bracketSize.
    let elementParams = {
      class: this.arrayElClass,
      width: this.elementRadius*2,
      height: this.elementRadius*2,
    };
    let $element = $("<div>", elementParams);
    $element.width(this.elementRadius*2);
    $element.height(this.elementRadius*2);

    // Create <p> tag with element value
    let textParams = {
      style: `font-size:${this.fontSize}px`
    };
    let $p = $("<p>", textParams);
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
  createSvgPath(options) {
    let idName = options.idName || this.createPathId(options.fromLayer,
                                                     options.toLayer,
                                                     options.val);
    let verticalShift = options.verticalShift || 0;
    let horizontalShift = options.horizontalShift || 0;

    let pathParams = {
      fill: "none",
      stroke: this.pathColor,
      "stroke-width": this.strokeWidth,
      id: idName,
      d: `M${options.xStart},${options.yStart} ` +
         `v${verticalShift} h${horizontalShift}`
    };

    // if (horizontalShift !== 0) {
    //   pathParams.d += ` h15 h-30 h25 h-20 h10`;
    // }

    let $path = $("<path>", pathParams);
    this.pathContainer.append($path);
  }

  // Creates animejs animation
  // Requires options object with the keys:
  //     pathIdName, animeTarget, duration, val
  createAnimation(options) {
    let pathId = `#${this.createPathId(options.fromLayer, options.toLayer,
                     options.val)}`;
    let myPath = anime.path(pathId);
    let pathLength = parseInt(myPath.path.getTotalLength());
    // let duration = options.duration ||
    //                parseInt(pathLength * this.animationSpeed);
    let duration = options.duration || this.getPathTraversalTime(options);

    let targetId = `#${this.createArrayElId(options.fromLayer, options.val, true)}`;

    anime({
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
  getPathTraversalTime(options) {
    let pathId = `#${this.createPathId(options.fromLayer, options.toLayer,
                     options.val)}`;
    let myPath = anime.path(pathId);
    let pathLength = parseInt(myPath.path.getTotalLength());
    let duration = parseInt(pathLength * this.animationSpeed);
    return Math.max(duration, this.minAnimationDuration);
  }

  // Create div containing an array bracket.
  // Takes an options object with the keys:
  //       topOffset, leftOffset, bracketType, layer
  createArrayBracket(options) {
    let $bracketContainer = $("<div>", {
      height: this.bracketHeight,
      width: this.bracketWidth,
      class: this.createBracketClass(options.layer)
    });

    $bracketContainer.offset({
      top: Math.floor(options.topOffset + this.bracketTopOffsetAdjustment),
      left: Math.floor(options.leftOffset)
    });

    let $p = $("<p>", { style: `font-size:${this.bracketSize}px` });
    $p.html(options.bracketType);
    $bracketContainer.append($p);
    return $bracketContainer;
  }

  // Create div containing a plus sign.
  // Takes an options object with the keys:
  //       topOffset, leftOffset, layer
  createPlusSign(options) {
    let $plusContainer = $("<div>", {
      height: this.plusHeight,
      width: this.plusWidth,
      class: this.createPlusClass(options.layer)
    });

    $plusContainer.offset({
      top: Math.floor(options.topOffset),
      left: Math.floor(options.leftOffset)
    });

    let $p = $("<p>", { style: `font-size:${this.plusSize}px` });
    $p.html('+');
    $plusContainer.append($p);
    return $plusContainer;
  }

  createSpaceEl(options) {
    let $spaceContainer = $("<div>", {
      height: this.spaceHeight,
      width: this.spaceWidth,
      class: this.createSpaceClass(options.layer)
    });

    $spaceContainer.offset({
      top: Math.floor(options.topOffset),
      left: Math.floor(options.leftOffset)
    });

    let $p = $("<p>", { style: `font-size:${this.plusSize}px` });
    $p.html(' ');
    $spaceContainer.append($p);
    return $spaceContainer;
  }

  calculateLeftIndent() {
    let vizAreaWidth = $(`#${this.visAreaId}`).width();
    let startSpaceOccupied = this.numElements * this.elementWidth +
                             2 * this.bracketWidth;
    let leftIndent = Math.floor((vizAreaWidth - startSpaceOccupied)/2);
    return leftIndent;
  }

}

module.exports = AnimationOptions;
