var numberOfRows = 24;
var numberOfColumns = 16;
var cells = [];
var currentFigure;
var tableColor = 'black';
var divGame = document.getElementById('game');
var container = document.getElementById('container');
var divResume = document.getElementById('div-resume');
var divGameOver = document.getElementById('game-over');
var buttonStart = document.getElementById('start-game');
var buttonPause = document.getElementById('pause-game');
var buttonExit = document.getElementById('exit-game');
var buttonResume = document.getElementById('resume-game');
var buttonRestartGame = document.getElementById('restart-game');
var tetrisMenu = document.getElementById('tetris-menu');
var nextFigureFirst = document.getElementById('first-figure');
var nextFigureSecond = document.getElementById('second-figure');
var nextFigureThird = document.getElementById('third-figure');
var score = document.getElementById('your-score');
var tetrisImg = document.getElementById('tetris-img')
var question = document.getElementsByClassName('question');
var arrayNextFigures = [];
var over = false;
var pause = false;


function renderNextFigure(divName,idStart) {
    var k=1;
    for(i=0;i<2;i++) {
       var newRow=document.createElement('div');
			newRow.className="row";
			divName.appendChild(newRow);
            
				for(j=0;j<4;j++){
					var newCell=document.createElement('div');
					newCell.className="cell";
                    newCell.id=idStart+k;
                    newRow.appendChild(newCell);
                    k++;
				} 
    }
    
}



//Class Positions
var Position=function(row,column) {
	this.row=row;
	this.column=column;
}

//Class Figure
var Figure=function(positions,color,centre) {
	this.positions=positions;
	this.color=color;
    this.centre=centre;
};

//Move Down Figure Method
Figure.prototype.moveDown=function() {
    var canMove=true;
		for(i=0;i<this.positions.length;i++) {		
					if(cells[createId(this.positions[i].row+1,this.positions[i].column)]==undefined || cells[createId(this.positions[i].row+1,this.positions[i].column)]==true) {
					canMove=false;
			}
		}
    if(canMove){
        for(i=0;i<currentFigure.positions.length;i++) {	
            this.positions[i].row++;
    
        }
        return true;
    } else {
        return false;
    }
	
};

// Move Right Figure Method
Figure.prototype.moveRight=function() {
    var canMove=true;
		for(i=0;i<this.positions.length;i++) {		
					if(cells[createId(this.positions[i].row,this.positions[i].column+1)]==undefined || cells[createId(this.positions[i].row,this.positions[i].column+1)]==true) {
				canMove=false;
			}
		}
    if(canMove){
        for(i=0;i<currentFigure.positions.length;i++) {	
            this.positions[i].column++;
    
        }
        return true;
    } else {
        return false;
    }
	
};

//Move Left Figure  Method
Figure.prototype.moveLeft=function() {
    var canMove=true;
		for(i=0;i<this.positions.length;i++) {		
					if(cells[createId(this.positions[i].row,this.positions[i].column-1)]==undefined || cells[createId(this.positions[i].row,this.positions[i].column-1)]==true) {
				canMove=false;
			}
		}
    if(canMove){
        for(i=0;i<currentFigure.positions.length;i++) {	
            this.positions[i].column--;
    
        }
        return true;
    } else {
        return false;
    }
	
};

//Rotate Figure Method
Figure.prototype.rotate=function() {
    var newPositions=[];
    newPositions[0]=this.centre;
    for(i=1;i<this.positions.length;i++) {
        var coord=newCoordonates(this.centre.row,this.centre.column,this.positions[i].row,this.positions[i].column);
        newPositions[i]=new Position(coord["x"],coord["y"]);
    }
    var free=true;
    for(i=0;i<newPositions.length;i++) {
        if(cells[createId(newPositions[i].row,newPositions[i].column)]==undefined || cells[createId(newPositions[i].row,newPositions[i].column)]==true) {
            free=false;
        }
    }
    if(free) {
        this.positions=newPositions;
    }
}


Figure.prototype.fixDown=function() {
	
	var canMove=true;
	 while(canMove) {
		for(i=0;i<this.positions.length;i++) {		
					if(cells[createId(this.positions[i].row+1,this.positions[i].column)]==undefined || cells[createId(this.positions[i].row+1,this.positions[i].column)]==true) {
					canMove=false;
			}
		}
    if(canMove){
        for(i=0;i<currentFigure.positions.length;i++) {	
            this.positions[i].row++;
    
        }
			}
	 }
	
      
}

function newCoordonates(x0,y0,x1,y1) {
    var i=y1-y0;
    var coord=[];
    coord["x"]=x0+i;
    coord["y"]=(y0-x1)+x0;
    return coord;
}

function createId(row,column) {
   var idString="row"+ row+"-"+"column"+column;
   return idString;
}


function generateNewFigure(){
    var centre;
	var positions;
    var random=Math.floor((Math.random() * 7) + 1);
    var mid=Math.floor(numberOfColumns/2);
    switch(random){
        case 1:
            centre=new Position(1,mid-1);
            positions=[centre,new Position(0,mid-1),new Position(1,mid-2),new Position(1,mid)];
            break;
        case 2:
            centre=new Position(0,mid-1);
            positions=[centre,new Position(0,mid),new Position(1,mid-1),new Position(1,mid)];
            break;
        case 3:
            centre=new Position(0,mid-1);
            positions=[centre,new Position(0,mid-2),new Position(0,mid),new Position(0,mid+1)];
            break;
        case 4:
            centre=new Position(1,mid);
            positions=[centre,new Position(0,mid),new Position(0,mid-1),new Position(1,mid+1)];
            break;
        case 5:
            centre=new Position(1,mid-2);
            positions=[centre,new Position(0,mid-2),new Position(1,mid-1),new Position(1,mid)];
            break;
        case 6:
            centre=new Position(1,mid);
            positions=[centre,new Position(0,mid),new Position(1,mid-1),new Position(1,mid-2)];
            break;
				case 7:
            centre=new Position(1,mid);
            positions=[centre,new Position(0,mid),new Position(0,mid+1),new Position(1,mid-1)];
            break;
        default:
            break;
    }
    
    
    var figure=new Figure(positions,randomColor(),centre);
	return figure;
}


function verifyCompleteRow() {
    var k;
    for(i=0;i<numberOfRows;i++) {
        k=0;
        for(j=0;j<numberOfColumns;j++) {
            if(cells[createId(i,j)]==true) {
                k++;
            } 
           
        }
        if (k==numberOfColumns) {
            score.innerHTML=Number(score.innerHTML)+100;
            removeRow(i);
        }
    }
}

function randomColor() {
    var r=Math.floor((Math.random() * 256) + 0);
    var g=Math.floor((Math.random() * 256) + 0);
    var b=Math.floor((Math.random() * 256) + 0);
    if(g<100 && b<100) {
       g=Math.floor((Math.random() * 256) + 0);
       b=Math.floor((Math.random() * 256) + 0); 
    }
    var color="rgb("+r+", "+g+", "+b+")";
    return color;
}

function gameOver() {
    /*for(j=0;j<numberOfColumns;j++) {
        if(cells[createId(0,j)]==true){
            return true;
        }
    }
    return false;*/
    for(i=0;i<currentFigure.positions.length;i++) {
        if(cells[createId(currentFigure.positions[i].row,currentFigure.positions[i].column)]) {
            return true;
        }
    }
    return false;
}


function setContainer(color) {
    var maxWidth=25*numberOfColumns+"px";
    var height=25*numberOfRows+"px";
    divGame.style.width=maxWidth;
    divGame.style.height=height;
    divGame.style.backgroundColor=color;
    maxWidth=25*numberOfColumns+200+"px";
    container.style.maxWidth=maxWidth;
}

function renderView(numberOfRows,numberOfColumns) {

		for(i=0;i<numberOfRows;i++) {
			var newRow=document.createElement('div');
			newRow.className="row";
			divGame.appendChild(newRow);
				for(j=0;j<numberOfColumns;j++){
					var newCell=document.createElement('div');
					newCell.className="cell";
					newCell.id=createId(i,j);
					cells[newCell.id]=false;
					newRow.appendChild(newCell);
				}
		}

}

function updateTable(tableColor,figureColor) {
  verifyCompleteRow();  
  for(i=0;i<numberOfRows;i++) {
      for(j=0;j<numberOfColumns;j++) {
          var id=createId(i,j);
          var cell=document.getElementById(id);
          if(cells[id]==false) {
              cell.style.backgroundColor=tableColor;
          }   
      }
  }
    for(i=0;i<currentFigure.positions.length;i++) {
			document.getElementById(createId(currentFigure.positions[i].row,
			currentFigure.positions[i].column)).style.backgroundColor=figureColor;
			
		}  
}



function fixFigure() {
    for(i=0;i<currentFigure.positions.length;i++) {
        cells[createId(currentFigure.positions[i].row,
        currentFigure.positions[i].column)]=true;
    }
}

function removeRow(rowIndex) {
   for(i=rowIndex;i>0;i--) {
       for(j=0;j<numberOfColumns;j++) {
           document.getElementById(createId(i,j)).style.backgroundColor=
               document.getElementById(createId(i-1,j)).style.backgroundColor;
           cells[createId(i,j)]=cells[createId(i-1,j)]
       }
       
   } 
}

function restartGame() {
    for(i=0;i<numberOfRows;i++) {
        for(j=0;j<numberOfColumns;j++) {
            document.getElementById(createId(i,j)).style.backgroundColor=tableColor;
            cells[createId(i,j)]=false;
        }
    }
}



//Key events


document.body.onkeydown = function(event){
    event = event || window.event;
    var keycode = event.charCode || event.keyCode;
	  if(over==false && pause==false) {
    if(keycode === 37){
     currentFigure.moveLeft();
     updateTable(tableColor,currentFigure.color);
    } else if (keycode===38) {
			 currentFigure.rotate();
        updateTable(tableColor,currentFigure.color);
		}  else if (keycode===39) {
			  currentFigure.moveRight();
        updateTable(tableColor,currentFigure.color);
		}  else if (keycode===40) {
			  currentFigure.moveDown();
        updateTable(tableColor,currentFigure.color);
		}  else if(keycode===32) {
			currentFigure.fixDown();
			fixFigure();
			updateTable(tableColor,currentFigure.color);
		}
		}
}



function drawNextFigure(fig,idStart) {
    for(i=1;i<=8;i++) {
       document.getElementById(idStart + i).style.backgroundColor='black'; 
    }
   midle=numberOfColumns/2;
   for(i=0;i<fig.positions.length;i++) {
      var index=fig.positions[i].row*4+fig.positions[i].column-midle+3;
      document.getElementById(idStart + index).style.backgroundColor=fig.color;
   } 
}



function drawNextFigures() {
drawNextFigure(arrayNextFigures[0],'first-');
drawNextFigure(arrayNextFigures[1],'second-');
drawNextFigure(arrayNextFigures[2],'third-');
}

function fixLastFigure() {
	var k=true;
	for(i=0;i<currentFigure.positions.length;i++) {
		if(currentFigure.positions[i].row==1 && 
			 cells[createId(0,currentFigure.positions[i].column)]==true ) {
			k=false;
		}
	}
	if(k) {
		for(i=0;i<currentFigure.positions.length;i++) {
			if(currentFigure.positions[i].row==1) {
				document.getElementById(createId(0,currentFigure.positions[i].column)).
				style.backgroundColor=currentFigure.color
			}
		}
	}
}





function game() {
    currentFigure=generateNewFigure();
    arrayNextFigures=[];
    arrayNextFigures.push(generateNewFigure());
    arrayNextFigures.push(generateNewFigure());
    arrayNextFigures.push(generateNewFigure());
    drawNextFigures();
}

//clock

var Clock = {
  
    start: function () {
    var self = this;

    this.interval = setInterval(function () {
        if(over==false) {
     updateTable(tableColor,currentFigure.color);
            var bol=currentFigure.moveDown();
            if(bol==false) {
                fixFigure();
                    currentFigure=arrayNextFigures.shift();
                    arrayNextFigures.push(generateNewFigure());
                    drawNextFigures();
                    if(gameOver()) {
                        divGameOver.style.display="inline";
                        over=true;
											fixLastFigure();
                    }
            }
        }
        
    }, 300);
  },

  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) this.start();
  }
};


// Buttons

buttonPause.addEventListener("click",function() {
Clock.pause();
    divResume.style.display="inline";
    pause = true;
});

buttonStart.addEventListener("click",function() {
	  tetrisImg.style.display="none";
 	  renderView(numberOfRows,numberOfColumns);
    buttonStart.style.display="none";
    buttonRestartGame.style.display="flex";
	  for (i = 0; i < question.length; i++) {
    question[i].style.display = "none";
    }
		renderNextFigure(nextFigureFirst,"first-");
		renderNextFigure(nextFigureSecond,"second-");
		renderNextFigure(nextFigureThird,"third-");
    game();
    Clock.start();
	  
	  
});


buttonRestartGame.addEventListener("click",function() {
    score.innerHTML=0;
    divGameOver.style.display="none";
    over=false;
    restartGame();
    game();
});

buttonResume.addEventListener("click",function() {
    Clock.resume();
     divResume.style.display="none";
    pause = false;
});

 

setContainer(tableColor);



