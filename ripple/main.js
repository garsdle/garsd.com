var circleArray= new Array();

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	//canvas.style.backgroundColor = "#000000";
	
	//canvas.onmousedown=clickeventFunction;
	canvas.onmousemove=clickeventFunction;
	canvas.ontouchmove=clickeventFunction;
	
	
	canvas2 = document.getElementById("bg");
	bg = canvas2.getContext("2d");
	canvas2.height=window.innerHeight;
	canvas2.width=window.innerWidth;
	//canvas.style.backgroundColor = "#000000";
	
	init_world();
	return setInterval(tick, 1000/60);
}

function init_world()
{
	circleArray[0]=new ripple();
	circleArray[0].r=1;
	circleArray[0].x=100;
	circleArray[0].y=400;
}

function tick()
{	
	clear();

	length=circleArray.length;
	for (var i=0; i<length; i++)
	{
		if (circleArray[i].alpha<=.01)
		{
			delete circleArray[i];
			circleArray.splice(i,1);
			length--;
		}
		else
		{
			propagate(circleArray[i]);
			//checkDistance(i);
			drawCircle(circleArray[i]);
		}
	}
		
}

function propagate(circle)
{
	circle.r+=2;
	circle.alpha -=.01;
	circle.color= "rgba(170, 180, 240," + circle.alpha +")";
}

function checkDistance(j)
{	
	var length = circleArray.length;
	for(var i=0;i<length; i++)
	{
		if(i!=j)
		{
			var xDiff=circleArray[j].x-circleArray[i].x;
			var yDiff=circleArray[j].y-circleArray[i].y;
			var distance=Math.sqrt( xDiff*xDiff + yDiff*yDiff);
		

			if (Math.abs(distance-(circleArray[i].r+circleArray[j].r) ) <=1)
			{
				var theta=Math.atan(xDiff/yDiff);
				//alert(theta+","+Math.sin(theta));
				var xNew=circleArray[i].r*Math.sin(theta);
				var yNew=circleArray[i].r*Math.cos(theta);
				//alert(xNew);
				
				if(circleArray.length<100)
				{
					var newRipple=new ripple();
					newRipple.x=circleArray[i].x+xNew;
					newRipple.y=circleArray[i].y+yNew;
					newRipple.color="rgba(60, 50, 90,.6)";
					circleArray.push(newRipple);
				}
			}
		}
	}
}

function drawCircle(circle)
{
	//displayText(circle.color);
	ctx.fillStyle = circle.color;
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
}



function displayText(txt)
{	
	ctx.fillStyle = "White";
	ctx.fillText(txt, 10, 50);
}

function clear()  
{
	ctx.fillStyle = "#ffffff";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	bg.fillStyle = "#ffffff";
	bg.clearRect(0, 0, canvas.width, canvas.height);
}

function clickeventFunction(e) 
{
	if(circleArray.length>100)
		return;
	//mouseDown=true;
	if (e.touches) 
    {
        // Touch Enabled (loop through all touches)
        for (var i = 1; i <= e.targetTouches.length; i++) 
        {
        	//alert("!!!");
            var p = getCoords(e);
			//alert(p.x);
			//alert(WIDTH);
			var newRipple=new ripple();
			newRipple.x=p.x;
			newRipple.y=p.y;
			circleArray.push(newRipple);;
        }
    }
    else 
    {
        // Not touch enabled (get cursor position from single event)
        var p = getCoords(e);
		//alert(p.x);
		//alert(WIDTH);
		var newRipple=new ripple();
		newRipple.x=p.x;
		newRipple.y=p.y;
		circleArray.push(newRipple);
		
		
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

function resizeEvent()
{
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
}
