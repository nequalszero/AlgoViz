import QuickSort from './quicksort';
import test from './test';

class AlgorithmVisualization {
  constructor() {
    this.sizeVisualizationArea();
    this.quickSort();
    // new test(AlgorithmVisualization.OPTIONS);
  }

  sizeVisualizationArea() {
    let windowWidth = $(window).width();
    $("#visualization-area").width(windowWidth-200);
    // $("#visualization-area").css("width", windowWidth-200);
    // console.log(`Setting viz area to ${windowWidth-200}px`);
  }

  quickSort() {
    // console.log("Creating new QuickSort instance");
    new QuickSort(AlgorithmVisualization.OPTIONS);
  }
}

const elementHeight = 100;
const elementWidth = 80;

AlgorithmVisualization.OPTIONS = {
  visAreaId: "visualization-area",
  algorithmTitleId: "vis-area-title",
  drawingAreaId: "drawing-area",
  svgPathContainerClass: "path-container",
  arrayElContainerClass: "array-element-container",
  bracketElClass: "bracket",
  animateElClass: "animate",
  arrayElClass: "array-element",
  plusElClass: "plus",

  pivotColor: "yellow",
  pathColor: "red",
  pathWidth: 3,
  elementHeightFactor: 0.10,
  elementWidthFactor: 0.045,
  elementRadiusFactor: 0.35,
  fontSizeFactor: 0.5,

  colors: {
    pathColor: "red",
    lightGreen: "#8cff66",
    lightGreen2: "#53ff1a",
    lightBlue: "#66b3ff",
    lightPurple: "#d24dff",
    lightOrange: "#ff9933",
    lightBlue2: "#99ccff",
    lightBlue3: "#3399ff"
  }
};

module.exports = AlgorithmVisualization;
