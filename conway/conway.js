var canvas;  
var context;
var WIDTH;
var HEIGHT;
var mouseDown=false;
var paused=false;

var rows=100;
var columns=100;
var squareArray=new Array();

function init() 
{
	canvas = document.getElementById("full");
	context = canvas.getContext("2d");
	
	canvas.onmousedown=clickeventFunction;
	canvas.onmouseup=mouseUpEventFunction;
	window.onkeydown=keyDownEventFunction;
	canvas.onmousemove=moveEventFunction;
		
	context.canvas.width  = window.innerWidth;
  	context.canvas.height = window.innerHeight;
  	
  	WIDTH=canvas.width;
	HEIGHT=canvas.height;


	
	var squareWidth=WIDTH/columns;
	var squareHeight=HEIGHT/rows;
	for (var i=0;i<columns;i++)
	{
		squareArray[i]=new Array();
		for (var j=0;j<rows;j++)
		{
			var temp= new square();
			temp.width=squareWidth; 
			temp.height=squareHeight; 
			temp.x=squareWidth*i;
			temp.y=squareHeight*j;
			
			if (Math.random()*2>1)
			{
				temp.birth();
				temp.currentStateAlive=true;
			}
			else
			{
				temp.kill();
				temp.currentStateAlive=false;
			}
				
			squareArray[i][j]=temp;
		}
	
	}
	
	////initialize neighbors
	for (var i=0;i<columns;i++)
	{
		for (var j=0;j<rows;j++)
		{
			var li=i;
			var ri=i;
			var tj=j;
			var bj=j;
			
			if (i-1<0)
				li=columns-1;
			else
				li=i-1;
			
			if (i+1>=columns)
				ri=0;
			else 
				ri=i+1;
				
			if (j-1<0)
				bj=rows-1;
			else
				bj=j-1;
			
			if (j+1>=rows)
				tj=0;
			else
				tj=j+1;
			
			squareArray[i][j].neighbors[0]=squareArray[li][tj];
			squareArray[i][j].neighbors[1]=squareArray[i][tj];
			squareArray[i][j].neighbors[2]=squareArray[ri][tj];
			squareArray[i][j].neighbors[3]=squareArray[li][j];
			squareArray[i][j].neighbors[4]=squareArray[ri][j];
			squareArray[i][j].neighbors[5]=squareArray[li][bj];
			squareArray[i][j].neighbors[6]=squareArray[i][bj];
			squareArray[i][j].neighbors[7]=squareArray[ri][bj];
		}
	
	}

	return setInterval(tick, 80);	
}

function square()
{
	this.width;
	this.height;
	this.x;
	this.y;
	this.color;

	//Is it alive? Will it be in the next state?
	this.currentStateAlive;
	this.nextStateAlive;
	
	//All the neighbors top left neighbor to bottom right


	this.neighbors=new Array();

	this.kill = function()
	{
		this.currentStateAlive=false;
		context.fillStyle = "#000000";
		context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = "#000000";
		context.strokeRect(this.x,this.y,this.width,this.height);
	};
	
	this.birth = function()
	{
		this.currentStateAlive=true;
		context.fillStyle = "#ffffff";
		context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = "#000000";
		context.strokeRect(this.x,this.y,this.width,this.height);
	};
}

function randomClear()
{

	for (var i=0;i<columns;i++)
	{
		for (var j=0;j<rows;j++)
		{
			
			if (Math.random()*2>1)
			{
				squareArray[i][j].birth();
				squareArray[i][j].currentStateAlive=true;
			}
			else
			{
				squareArray[i][j].kill();
				squareArray[i][j].currentStateAlive=false;
			}
		}
	
	}
}

function clear()
{

	for (var i=0;i<columns;i++)
	{
		for (var j=0;j<rows;j++)
		{
				squareArray[i][j].kill();
				squareArray[i][j].currentStateAlive=false;
		}
	
	}
}

function rect(x,y,w,h) 
{
	context.fillStyle = "#000000";
	context.fillRect(x, y, w, h);
	
}

function tick()
{
	if (paused)
		return;
		
	for (var i=0;i<columns;i++)
	{
		for (var j=0;j<rows;j++)
		{
			
			//Count number of live neighbors
			var liveCount=0;
			for(var k in squareArray[i][j].neighbors)
			{
				if (squareArray[i][j].neighbors[k].currentStateAlive)
					liveCount++;
			}
			
			//Do the conway
			if(squareArray[i][j].currentStateAlive)
				if(liveCount<2 || liveCount>3)
					squareArray[i][j].nextStateAlive=false;
				else 
					squareArray[i][j].nextStateAlive=true;
			else
				if (liveCount==3)
					squareArray[i][j].nextStateAlive=true;
				else 
					squareArray[i][j].nextStateAlive=false;
					
			
		}
	
	}
	
	//Killing time
	for (var i=0;i<columns;i++)
	{
		for (var j=0;j<rows;j++)
		{
			if (squareArray[i][j].nextStateAlive && !squareArray[i][j].currentStateAlive)
				squareArray[i][j].birth();
			else if (!squareArray[i][j].nextStateAlive && squareArray[i][j].currentStateAlive)
				squareArray[i][j].kill();

			
		}
	
	}
	
}

/////////////////////////
///////////////// EVENTS /////////////////////
function keyDownEventFunction(e)
{
	if(e.keyCode == 82) //r
		randomClear();
	else if (e.keyCode == 67) //c
		clear();
	else if (e.keyCode==32)//space bar
		if (paused)
			paused=false;
		else
			paused=true;

}

function clickeventFunction(e) 
{
	mouseDown=true;
	if (e.touches) 
    {
        // Touch Enabled (loop through all touches)
        for (var i = 1; i <= e.touches.length; i++) 
        {
            var p = getCoords(e.touches[i - 1]); // Get info for finger i
            // ... Do something with point touch p
            var column=Math.floor((p.x*columns)/WIDTH);
			var row=Math.floor((p.y*rows)/HEIGHT);
			squareArray[column][row].birth();
        }
    }
    else 
    {
        // Not touch enabled (get cursor position from single event)
        var p = getCoords(e);
		//alert(p.x);
		//alert(WIDTH);
		var column=Math.floor((p.x*columns)/WIDTH);
		var row=Math.floor((p.y*rows)/HEIGHT);
		squareArray[column][row].birth();
        // ... Do something with cursor point p
    }

    return false; // Stop event bubbling up and doing other stuff (like pinch zoom or scroll)
}

function moveEventFunction(e) 
{
	if (!mouseDown)
		return;
		
	if (e.touches) 
    {
        // Touch Enabled (loop through all touches)
        for (var i = 1; i <= e.touches.length; i++) 
        {
            var p = getCoords(e.touches[i - 1]); // Get info for finger i
            // ... Do something with point touch p
            var column=Math.floor((p.x*columns)/WIDTH);
			var row=Math.floor((p.y*rows)/HEIGHT);
			squareArray[column][row].birth();
        }
    }
    else 
    {
        // Not touch enabled (get cursor position from single event)
        var p = getCoords(e);
		//alert(p.x);
		//alert(WIDTH);
		var column=Math.floor((p.x*columns)/WIDTH);
		var row=Math.floor((p.y*rows)/HEIGHT);
		squareArray[column][row].birth();
        // ... Do something with cursor point p
    }

    return false; // Stop event bubbling up and doing other stuff (like pinch zoom or scroll)
}

function mouseUpEventFunction(e) 
{
	mouseDown=false;
    return false; // Stop event bubbling up and doing other stuff (like pinch zoom or scroll)
}

function getCoords(e) 
{
    if (e.offsetX) 
    {
        // Works in Chrome / Safari (except on iPad/iPhone)
        return { x: e.offsetX, y: e.offsetY };
    }
    else if (e.layerX) 
    {
        // Works in Firefox
        return { x: e.layerX, y: e.layerY };
    }
    else 
    {
        // Works in Safari on iPad/iPhone
        return { x: e.pageX - cb_canvas.offsetLeft, y: e.pageY - cb_canvas.offsetTop };
    }
}


init();