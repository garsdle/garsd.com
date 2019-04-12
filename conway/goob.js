var canvas;  
var context;
var WIDTH;
var HEIGHT;
var objects=new Array();
var goob1= new Array();

var gravity=1;

function clear() 
{
	context.clearRect(0, 0, WIDTH, HEIGHT);
}

function rect(x,y,w,h) 
{
	context.beginPath();
	context.rect(x,y,w,h);
	context.closePath();
	context.fill();
}

function circle(x,y,r,color) 
{
	
	context.fillStyle = color;
 	context.beginPath();
  	context.arc(x, y, r, 0, Math.PI*2, true);
  	context.fill();
}
 
function init() 
{
	canvas = document.getElementById("full");
	context = canvas.getContext("2d");
	
	window.onkeydown=keyDownEventFunction;
	window.onkeyup=keyUpEventFunction;
	canvas.ontouchmove = moveEventFunction;
	canvas.onmousedown=clickeventFunction;
	//canvas.onmousemove = moveEventFunction;
/*
	WIDTH = $(document).width();
	HEIGHT = $(document).height();
	canvas.width = WIDTH;
	canvas.height = WIDTH;
*/
	//context.canvas.width  = window.innerWidth;
  //context.canvas.height = window.innerHeight;
  
  
	WIDTH=canvas.width;
	HEIGHT=canvas.height;

	goob1.d=5;
	goob1.x=100;
	goob1.y=100;
	goob1.vx=0;
	goob1.vy=0;
	goob1.bounce=.4;
	goob1.color="#fe0100";
	
	return setInterval(tick, 35);
}


function tick()
{
	physics();
	draw();
}

function physics()
{

	goob1.x+=goob1.vx;	
	goob1.y+=goob1.vy;
	
	
	if (goob1.x+goob1.d>WIDTH)
	{
		goob1.x=WIDTH-goob1.d;	
		goob1.vx=-goob1.vx*goob1.bounce;
	}
	else if (goob1.x<0)
	{
		goob1.x=goob1.d;
		goob1.vx=-goob1.vx*goob1.bounce;
	}
	
	if (goob1.y+goob1.d>HEIGHT)
	{
		goob1.y=HEIGHT-goob1.d;
		goob1.vy=-goob1.vy*goob1.bounce;
	}
	else if (goob1.y<0)
	{
		goob1.y=goob1.d;
		goob1.vy=-goob1.vy*goob1.bounce;
	}

	
	goob1.vy+=gravity;
}


function draw() 
{
	clear();
	context.fillStyle = "#e9b900";
	rect(0,0,WIDTH,HEIGHT);
	
	circle(goob1.x, goob1.y, goob1.d , goob1.color);
	
	context.fillStyle = "#000000"
  	context.font = "bold 70px sans-serif"; 
	context.fillText("The Goobs", 0, HEIGHT/2);

}



///////////////// EVENTS /////////////////////

function keyDownEventFunction(e)
{
	
	if(e.keyCode == 37)
		goob1.vx=-3;
	else if (e.keyCode == 39)
		goob1.vx=3;
	else if (e.keyCode == 38)
		if (goob1.y==HEIGHT-goob1.d)
			goob1.vy=30;
}

function keyUpEventFunction(e)
{
	if(e.keyCode == 37 || e.keyCode == 39)
		goob1.vx=0;
}

function clickeventFunction(e) 
{
	if (e.touches) 
    {
        // Touch Enabled (loop through all touches)
        for (var i = 1; i <= e.touches.length; i++) 
        {
            var p = getCoords(e.touches[i - 1]); // Get info for finger i
            // ... Do something with point touch p
        }
    }
    else 
    {
        // Not touch enabled (get cursor position from single event)
        var p = getCoords(e);
        
        // ... Do something with cursor point p
    }

    return false; // Stop event bubbling up and doing other stuff (like pinch zoom or scroll)
}

function moveEventFunction(e) 
{
    if (e.touches) 
    {
        // Touch Enabled (loop through all touches)
        for (var i = 1; i <= e.touches.length; i++) 
        {
            var p = getCoords(e.touches[i - 1]); // Get info for finger i
            // ... Do something with point touch p
        }
    }
    else 
    {
        // Not touch enabled (get cursor position from single event)
        var p = getCoords(e);
        // ... Do something with cursor point p
    }

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