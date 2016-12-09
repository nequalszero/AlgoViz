import AnimationOptions from './animation_options';
import anime from 'animejs';


class Test extends AnimationOptions {
  constructor(options) {
    super(options);
    this.startArray = [5, 1, 2, 3, 7, 4, 0 , 6];
    this.numElements = this.startArray.length;
    this.leftIndent = this.calculateStartingLeftIndent();
    this.bracketWidth = Math.floor(this.elementWidth * 0.2);
    this.bracketSize = Math.floor(options.elementRadius * 2 * 1.4);
    this.runTest2();
  }

  runTest2() {
    let testVal = 5;

    this.drawingArea.append(this.createArrayElement({
      layer: 0,
      val: testVal,
      topOffset: 0,
      leftOffset: 300,
      animate: false
    }));

    this.drawingArea.append(this.createArrayElement({
      layer: 0,
      val: testVal,
      topOffset: 0,
      leftOffset: 300,
      animate: true
    }));

    let animateableEl = $(`#${this.createArrayElId(0, testVal, true)}`);
    let xStart = parseInt(animateableEl.css("left"));

    this.createSvgPath({
      fromLayer: 0,
      toLayer: 1,
      val: testVal,
      xStart: 0,
      yStart: 0,
      verticalShift: this.elementHeight,
      horizontalShift: 0
    });

    $("body").html($("body").html());

    this.createAnimation({
      fromLayer: 0,
      toLayer: 1,
      val: testVal,
      duration: 2000
    });
  }

  runTest() {
    console.log("running test");
    let $drawingArea = $("#drawing-area");
    let $testArrayElCont = $("<div>", {class: "array-element-container",
                                       id: "test-source",
                                       width: this.elementWidth,
                                       height: this.elementHeight});

    let testDivParams = {
      class: "array-element",
      width: this.elementRadius*2,
      height: this.elementRadius*2,
      // style: `left:${Math.floor(this.leftIndent + this.elementWidth/2)}px;` +
      //        `top:${Math.floor(this.elementHeight)*0}px`
    };

    let testTextParams = {
      style: `font-size:${this.fontSize}px`
    };

    let $testElement = $("<div>", testDivParams);
    $testElement.width(this.elementRadius*2);
    $testElement.height(this.elementRadius*2);
    $testArrayElCont.offset({top: Math.floor(this.elementHeight)*0,
                         left: Math.floor(this.leftIndent + this.elementWidth * 0)});
    let $p = $("<p>", testTextParams);
    $p.html(0);
    $testElement.append($p);
    $testArrayElCont.append($testElement);

    $drawingArea.append($testArrayElCont);

    // ########################################################################################
    let svgParams = {
      height: 103,
      width: 200,
      class: "path-container"
    };

    let $newSvg = $("<svg>", svgParams);

    let xStart = 0;
    let yStart = 0;

    let pathParams = {
      fill: "none",
      stroke: "red",
      "stroke-width": 3,
      id: "testPath",
      d: `M${xStart},${yStart} v${100} h${200}`
    };

    // pathParams.d += `M${xStart},${yStart}`;
    // pathParams.d += ` v${options.vertical} h${options.horizontal}`;

    let $path = $("<path>", pathParams);
    $newSvg.append($path);
    $newSvg.offset({top: Math.floor(this.elementHeight/2),
                    left: Math.floor(this.leftIndent + this.elementWidth/2)});
    $drawingArea.append($newSvg);
    // #########################################################################################
    //  Move test
    let $testmoveArrayElCont = $("<div>", {class: "array-element-container",
                                           id: "test-move",
                                       width: this.elementWidth,
                                       height: this.elementHeight});

    let testmoveDivParams = {
      class: "array-element",
      width: this.elementRadius*2,
      height: this.elementRadius*2,
      // style: `left:${Math.floor(this.leftIndent + this.elementWidth/2)}px;` +
      //        `top:${Math.floor(this.elementHeight)*0}px`
    };

    let testmoveTextParams = {
      style: `font-size:${this.fontSize}px`
    };

    let $testmoveElement = $("<div>", testmoveDivParams);
    $testmoveElement.width(this.elementRadius*2);
    $testmoveElement.height(this.elementRadius*2);
    $testmoveArrayElCont.offset({top: Math.floor(this.elementHeight)*0,
                         left: Math.floor(this.leftIndent + this.elementWidth * 0)});
    let $pMove = $("<p>", testmoveTextParams);
    $pMove.html(0);
    $testmoveElement.append($pMove);
    $testmoveArrayElCont.append($testmoveElement);

    $drawingArea.append($testmoveArrayElCont);
    $("body").html($("body").html());


    var myPath = anime.path(`#testPath`);

    anime({
      targets: `#test-move`,
      translateX: myPath,
      translateY: myPath,
      duration: 2500,
      loop: false,
      easing: 'easeInOutExpo'
    });

    console.log(anime.easings);
  }

  calculateStartingLeftIndent() {
    let vizAreaWidth = $(`#${this.visAreaId}`).width();
    let startSpaceOccupied = this.numElements * this.elementWidth +
                             2 * this.bracketWidth;
    let leftIndent = Math.floor((vizAreaWidth - startSpaceOccupied)/2);
    return leftIndent;
  }
}

module.exports = Test;
