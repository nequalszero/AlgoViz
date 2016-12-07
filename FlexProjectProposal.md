## Algorithms Visualization

### Background

Not sure what I want to do for this project, but I was thinking of potentially
 a simple page for visualizing common algorithms like mergeSort, quickSort,
 BFS, DFS, etc.  Being that I'm not very comfortable with CSS and jQuery
timers, I think this would be a good project for practicing them.  

### Functionality & MVP  

This algorithms visualization should:

- [ ] Be able to show the steps of a sorting algorithm like quickSort, try to get 2 algorithms working
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
start: [5, 1, 2, 3, 7, 4, 0, 6]    choose random pivot el, e.g. 2
layer1: [1, 0] + 2 + [5, 3, 6, 4, 7] recursively call quickSort on left and right halves
                                     random pivots for each side, e.g. 1 and 4
layer2: [0] + 1 + [] | [3] + 4  + [5, 7, 6]    left is sorted and [3] is sorted,
                                               repeat for [5, 7, 6], random pivot 7
layer3: [5, 6] + 7 + []         left side is sorted, random pivot 6 on right
layer4: [5] + 6 + []                           everything is sorted, now recombine
combine1: [5, 6]
combine2: [1, 3] | [5, 6, 7]
combine3:[0, 1] | [3, 4, 5, 6, 7]
combine4: [0, 1, 2, 3, 4, 5, 6, 7]



Events:
1.) Draw layer0 brackets and bring in start elements
2.) Display text: Select random pivot
2.) Layer 1: Display pivot element (2) with brackets
3.) Layer 1: Render brackets for left and right halves
4.) Layer 1: Place elements into left and right halves 1 by 1
5.)
