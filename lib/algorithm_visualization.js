import QuickSort from './quick_sort';

class AlgorithmVisualization {
  constructor() {
    this.sizeVisualizationArea();
    this.quickSort();
  }

  sizeVisualizationArea() {
    let windowWidth = $(window).width();
    $("#visualization-area").width(windowWidth-200);
    // $("#visualization-area").css("width", windowWidth-200);
    console.log(`Setting viz area to ${windowWidth-200}px`);
  }

  quickSort() {
    console.log("Creating new QuickSort instance");
    new QuickSort(AlgorithmVisualization.OPTIONS);
  }
}

const elementHeight = 100;
const elementWidth = 80;

AlgorithmVisualization.OPTIONS = {
  elementHeight: elementHeight,
  elementWidth: elementWidth,
  elementRadius: Math.floor(elementWidth*0.4),
  elementCx: Math.floor(elementWidth/2),
  elementCy: elementHeight/2,
  fontSize: Math.floor(elementWidth/2),
  textY: Math.floor(0.65*elementHeight),
  textX: Math.floor(0.37*elementWidth),
  layerHeight: elementHeight
};

module.exports = AlgorithmVisualization;
