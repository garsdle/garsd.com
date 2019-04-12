var birdArray=new Array();
var numberOfbirds=10;

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	canvas.style.backgroundColor = "#000000";

	init_world();
	return setInterval(tick, 60);
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
	//clear();
	
	for(var i in birdArray)//The next two for loops must be parallel
	{
		checkDistance(i);
	}
	
	for(var i in birdArray)
	{
		
		moveBird(birdArray[i]);
		//drawBird(birdArray[i]);
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
		
			if (distance<=birdArray[i].r+birdArray[j].r+30)
			{
				if (xDiff<0)
					birdArray[j].vx-=.04;
				else if (xDiff>0)
					birdArray[j].vx+=.04;
					
				if (yDiff<0)
					birdArray[j].vy-=.04;
				else if (yDiff>0)
					birdArray[j].vy+=.04;
					
				ctx.beginPath();
				ctx.moveTo(birdArray[j].x,birdArray[j].y);
				ctx.lineTo(birdArray[i].x,birdArray[i].y);
				ctx.strokeStyle = "rgba(250, 180, 100, .1)";
				ctx.stroke();
				ctx.closePath();
			}
			else if (distance<=birdArray[i].r+birdArray[j].r+200)
			{
				if (xDiff<0)
					birdArray[j].vx+=.04;
				else if (xDiff>0)
					birdArray[j].vx-=.04;
					
				if (yDiff<0)
					birdArray[j].vy+=.04;
				else if (yDiff>0)
					birdArray[j].vy-=.04;
					
				ctx.beginPath();
				ctx.moveTo(birdArray[j].x,birdArray[j].y);
				ctx.lineTo(birdArray[i].x,birdArray[i].y); 
				ctx.strokeStyle = "rgba(180, 130, 200, .1)";
				ctx.stroke();
				ctx.closePath();
			}
			
			
		}
		
	}

} 

function moveBird(bird)
{
	
	//if (bird.vx>-2 && bird.vx<2)
		bird.x+=bird.vx;
	//if (bird.vy>-2 && bird.vy<2)
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
