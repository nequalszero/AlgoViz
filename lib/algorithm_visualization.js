import QuickSort from './quicksort';
import test from './test';

const visAreaId = "visualization-area";
const svgPathContainerId = "path-container";
const algorithmTitleId = "vis-area-title";
const drawingAreaId = "drawing-area";
const sidebarAreaId = "sidebar-container";

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
    let sidebarWidth = $(`#${sidebarAreaId}`).width();

    let windowHeight = $(window).innerHeight();
    console.log(`windowHeight: ${windowHeight}`);
    let svgContHeight = windowHeight - parseInt(algorithmTitle.outerHeight());

    $(`#${visAreaId}`).width(windowWidth-sidebarWidth);
    // $(`#${visAreaId}`).outerHeight(windowHeight);
    $(`#${svgPathContainerId}`).width(windowWidth-sidebarWidth);
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
      sidebarAreaId: sidebarAreaId,
      arrayElContainerClass: "array-element-container",
      bracketElClass: "bracket-element",
      animateElClass: "animate",
      stationaryElClass: "stationary",
      arrayElClass: "array-element",
      plusElClass: "plus-element",
      spaceElClass: "space-element",
      layerBackgroundClass: "layer-background",
      activeElementClass: "active-element",
      inactiveElementClass: "inactive-element",
      pivotElementClass: "pivot-element",

      pivotColor: "yellow",
      pathColor: "none",    // invisible, only need to be visible for testing
      pathWidth: 3,         // also only visible for testing
      elementHeightFactor: 0.10,
      elementWidthFactor: 0.045,
      elementRadiusFactor: 0.35,
      fontSizeFactor: 0.5,

      colorClasses: {
        lightBlue1: "light-blue1",
        lightBlue2: "light-blue2",
        lightBlue3: "light-blue3",
        lightBlue4: "light-blue4",
        lightBlue5: "light-blue5"
      }
    };
  }
}

module.exports = AlgorithmVisualization;
