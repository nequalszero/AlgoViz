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
    this.plusElClass = options.plusElClass;
    this.spaceElClass = options.spaceElClass;

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

    this.animationSpeed = options.animationSpeed;

    this.colors = options.colors;
    // this.printOptions(options);
    this.bindMethodsToWindow();
  }

  bindMethodsToWindow() {
      window.animateElClass = this.animateElClass;
      window.arrayElContainerClass = this.arrayElContainerClass;

      window.createPathId = this.createPathId;
      window.createArrayElId = this.createArrayElId;
      window.createArrayElClass = this.createArrayElClass;
  }

  printOptions(options) {
    const optionKeys = Object.keys(options);
    optionKeys.forEach(optionKey => {
      console.log(`${optionKey}: ${options[optionKey]}`);
    });
  }

  calibrateSizings() {
    let visAreaHeight = $(`#${this.visAreaId}`).height();

    this.elementHeight = Math.floor(this.elementHeightFactor * visAreaHeight);
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

    this.bracketSize = Math.floor(this.elementRadius * 2 * 1.3);

    this.bracketWidth = Math.floor(this.elementWidth/3);
    this.bracketHeight = this.elementHeight;
    this.bracketTopOffsetAdjustment = Math.ceil(-0.05*this.bracketSize);
  }

  createPathId(fromLayer, toLayer, val) {
    return `path-l${fromLayer}-l${toLayer}-v${val}`;
  }

  createArrayElId(layer, val, animateable) {
    let idName = `layer-${layer}-v${val}`;
    if (animateable) idName += `-${this.animateElClass}`;
    return idName;
  }

  createArrayElClass(layer, animateable) {
    let className = `${this.arrayElContainerClass} l${layer}`;
    if (animateable) className += ` ${this.animateElClass}`;
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
    let targetId = `#${this.createArrayElId(options.fromLayer, options.val, true)}`;
    let pathLength = parseInt(myPath.path.getTotalLength());
    let duration = options.duration ||
                   parseInt(pathLength * this.animationSpeed);

    // console.log(duration);

    anime({
      targets: targetId,
      translateX: myPath,
      translateY: myPath,
      duration: duration,
      loop: false,
      easing: 'easeInOutExpo'
    });
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
