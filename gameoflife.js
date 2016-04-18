// vars
var size = 50;
var grid = [];

// functions
function printGrid(grid){
  for(y in grid){
    row = "";
    for(x in grid){
      row += " ";
      row += grid[y][x] ? "x" : " ";
    }
    console.log(row);
  }
}

function findNeighbours(itemY,itemX,grid){
  var maxY = grid.length;
  var maxX = grid[0].length;
  var count = 0;

  for(var y = -1; y <= 1; y++){
    for(var x = -1; x <= 1; x++){
      // skip self
      if(y==0 && x==0) continue;

      var gridX = parseInt(x)+parseInt(itemX);
      var gridY = parseInt(y)+parseInt(itemY);

      // skip outside of Grid
      if( gridX < 0 || gridY < 0 || gridX >= maxX || gridY >= maxY ) continue;

      // count it
      if( grid[gridY][gridX] ) count++;
    }
  }
  return count;
}

function step(step){
  var gridOrig = grid;

  // transpone grid
  for(y in grid){
    var row = grid[y];
    for(x in row){
      var cell = grid[y][x];
      neighbors = n = findNeighbours(y,x,gridOrig);

      // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
      if(cell == 1 && n < 2){
        grid[y][x] = 0;
      }

      // Any live cell with two or three live neighbours lives on to the next generation.
      if(cell == 1 && (n == 2 || n == 3)){
        // do nothing
      }

      // Any live cell with more than three live neighbours dies, as if by over-population.
      if(cell == 1 && n > 3){
        grid[y][x] = 0;
      }

      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if(cell == 0 && n == 3){
        grid[y][x] = 1;
      }
    }
  }

  printGrid(grid);
  console.log("Step "+ step);
}

// build initial grid
for( var y = 0; y < size; y++){
  grid[y] = [];
  for( var x = 0; x < size; x++){
    grid[y][x] = Math.round( Math.random() - 0.3 );
  }
}

s = 0;
setInterval(function(){
  s++;
  step(s);
}, 5)

