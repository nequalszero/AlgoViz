class AnimationOptions {
  constructor(options) {
    this.elementHeight = options.elementHeight;
    this.elementWidth = options.elementWidth;
    this.elementRadius = options.elementRadius;
    this.elementCx = options.elementCx;
    this.elementCy = options.elementCy;
    this.fontSize = options.fontSize;
    this.textY = options.textY;
    this.textX = options.textX;
    this.layerHeight = options.layerHeight;
    this.printOptions(options);
  }

  printOptions(options) {
    const optionKeys = Object.keys(options);
    optionKeys.forEach(optionKey => {
      console.log(optionKey, options[optionKey]);
    });
  }
}

module.exports = AnimationOptions;
