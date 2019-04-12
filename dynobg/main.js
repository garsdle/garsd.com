var birdArray=new Array();
var numberOfbirds=100;

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	canvas.style.backgroundColor = "#000000";

	init_world();
	return setInterval(tick, 1000/60);
	animloop();
}

function init_world()
{
	for(var i=0;i<numberOfbirds;i++)
	{
		birdArray[i]=new bird();
		birdArray[i].x=Math.random()*canvas.width;
		birdArray[i].y=Math.random()*canvas.height;
		birdArray[i].vx=1-2*Math.random();
		birdArray[i].vy=1-2*Math.random();
		birdArray[i].r=1+Math.random()*10;
	}
} 

function tick()
{	
	clear();
	
	for(var i in birdArray)
	{
		checkDistance(i);
		moveBird(birdArray[i]);
		drawBird(birdArray[i]);
	}
}

function checkDistance(j)
{	
	var length = birdArray.length;
	for(var i=0;i<length; i++)
	{
		if(i!=j)
		{
			var xDiff=birdArray[j].x-birdArray[i].x;
			var yDiff=birdArray[j].y-birdArray[i].y;
			var distance=Math.sqrt( xDiff*xDiff + yDiff*yDiff);
		
			if (distance<=birdArray[i].r+birdArray[j].r)
			{
				if (xDiff<0)
					birdArray[j].vx-=.1;
				else if (xDiff>0)
					birdArray[j].vx+=.1;
					
				if (yDiff<0)
					birdArray[j].vy-=.1;
				else if (yDiff>0)
					birdArray[j].vy+=.1;
			}
		}
		
	}

} 

function moveBird(bird)
{
	bird.x+=bird.vx;
	bird.y+=bird.vy;
	
	/////PHYSICAL BOUNDARIES
	if (bird.y>=canvas.height)
		bird.y=0;
	else if (bird.y<0)
		bird.y=canvas.height;
		
	if (bird.x>=canvas.width)
		bird.x=0;
	else if (bird.x<0)
		bird.x=canvas.width;
}

function drawBird(bird)
{
	//displayText(bird);
	ctx.fillStyle = bird.color;
	ctx.beginPath();
	ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI*2, true); 
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
}

function resizeEvent()
{
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
}
