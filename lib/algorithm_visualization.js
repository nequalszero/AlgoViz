import QuickSort from './quicksort';
import test from './test';

const visAreaId = "visualization-area";
const svgPathContainerId = "path-container";
const algorithmTitleId = "vis-area-title";
const drawingAreaId = "drawing-area";

class AlgorithmVisualization {
  constructor() {
    this.sizeVisualizationArea();
    this.visAreaId = visAreaId;
    this.svgPathContainerId = svgPathContainerId;
    this.algorithmTitleId = algorithmTitleId;
    this.drawingAreaId = drawingAreaId;
    this.options = this.buildOptions();

    // new test(this.options);
    this.quickSort();
  }

  sizeVisualizationArea() {
    $("body").css("overflow", "hidden");
    let windowWidth = $(window).width();
    let algorithmTitle = $(`#${algorithmTitleId}`);

    let windowHeight = $(window).innerHeight();
    console.log(`windowHeight: ${windowHeight}`);
    let svgContHeight = windowHeight - parseInt(algorithmTitle.outerHeight());

    $(`#${visAreaId}`).width(windowWidth-200);
    // $(`#${visAreaId}`).outerHeight(windowHeight);
    $(`#${svgPathContainerId}`).width(windowWidth-200);
    $(`#${svgPathContainerId}`).height(svgContHeight);
    $(`#${drawingAreaId}`).height(svgContHeight);
  }

  quickSort() {
    // console.log("Creating new QuickSort instance");
    new QuickSort(this.options);
  }

  buildOptions() {
    return {
      visAreaId: visAreaId,
      algorithmTitleId: algorithmTitleId,
      drawingAreaId: drawingAreaId,
      svgPathContainerId: svgPathContainerId,
      arrayElContainerClass: "array-element-container",
      bracketElClass: "bracket-element",
      animateElClass: "animate",
      arrayElClass: "array-element",
      plusElClass: "plus-element",
      spaceElClass: "space-element",

      pivotColor: "yellow",
      pathColor: "none",
      pathWidth: 3,
      elementHeightFactor: 0.10,
      elementWidthFactor: 0.045,
      elementRadiusFactor: 0.35,
      fontSizeFactor: 0.5,
      animationSpeed: 12, // pixels per milli-second

      colors: {
        lightGreen: "#8cff66",
        lightGreen2: "#53ff1a",
        lightBlue: "#66b3ff",
        lightPurple: "#d24dff",
        lightOrange: "#ff9933",
        lightBlue2: "#99ccff",
        lightBlue3: "#3399ff"
      }
    };
  }
}

module.exports = AlgorithmVisualization;
