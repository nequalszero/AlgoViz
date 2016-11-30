## Algorithms Visualization

### Background

Not sure what I want to do for this project, but I was thinking of potentially
 a simple page for visualizing common algorithms like mergeSort, quickSort,
 BFS, DFS, etc.  Being that I'm not very comfortable with CSS and jQuery
timers, I think this would be a good project for practicing them.  

### Functionality & MVP  

This algorithms visualization should:

- [ ] Be able to show the steps of a sorting algorithm like quickSort, try to get 2 alorithms working
- [ ] Animation of array elements using Anime.js with svg paths
- [ ] Allow user to select algorithm to show

In addition, this project will include:

- [ ] An About modal describing the purpose of the application
- [ ] A production Readme

### Wireframes
Home

![screenshot](./wireframes/AlgorithmVisualizationHome.png)

Algorithm Visualization

![screenshot](./wireframes/AlgorithmVisualization.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and logic - maybe on jQuery
- Might need React.
- Anime.js with svg
- Webpack to bundle and serve up the various scripts.


### Implementation Timeline

- Never really look at this section either, do I need it?

**Day 1**: Learn Anime.js and SVG


**Day 2**: Figure out Jquery/Vanilla JS manipulating DOM elements, Timers


**Day 3**: Work on implementing quickSort visualization


**Day 4**: Work on navigation sidebar




### Bonus features

If there's extra time, the following features could be implemented:

- [ ] More algorithms


### ScratchWork

#### quickSort
start: [5, 1, 4, 3, 2]
layer1: [1, 4, 3, 2] + 5 + []
layer2: [] + 1 + [4, 3, 2]
layer3: [3, 2] + 4 + []
layer4: [2] + 3 + []
combine1: [2, 3]
combine2: [2, 3, 4]
combine3: [1, 2, 3, 4]
combine4: [1, 2, 3, 4, 5]

start: [7, 7, 6, 2, 9, 8, 4]
layer1: [6, 2, 4] + 7 + [7, 9, 8]
layer2: [2, 4] + 6 + []    |    [] + 7 + [9, 8]
layer3: [] + 2 + [4]       |    [8] + 9 + []
combine1: [2, 4]           |    [8, 9]
combine2: [2, 4, 6]        |    [7, 8, 9]
combine3: [2, 4, 6, 7, 7, 8, 9]
