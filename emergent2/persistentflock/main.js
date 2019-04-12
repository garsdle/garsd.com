var birdArray=new Array();
var numberOfbirds=20;

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	//canvas.style.backgroundColor = "#000000";

	canvas2 = document.getElementById("bg");
	bg = canvas2.getContext("2d");
	canvas2.height=window.innerHeight;
	canvas2.width=window.innerWidth;
	//canvas.style.backgroundColor = "#000000";
	
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
	clear();
	
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
			var vxDiff=birdArray[j].vx-birdArray[i].vx;
			var vyDiff=birdArray[j].vy-birdArray[i].vy;
			var distance=Math.sqrt( xDiff*xDiff + yDiff*yDiff);
		

			if (distance<=birdArray[i].r+birdArray[j].r+30)
			{
				if (xDiff<0)
					birdArray[j].vx-=.6;
				else if (xDiff>0)
					birdArray[j].vx+=.6 ;
					
				if (yDiff<0)
					birdArray[j].vy-=.6;
				else if (yDiff>0)
					birdArray[j].vy+=.6;
				/*
	
				bg.beginPath();
				bg.moveTo(birdArray[j].x,birdArray[j].y);
				bg.lineTo(birdArray[i].x,birdArray[i].y);
				bg.strokeStyle = "rgba(130, 50, 100, .1)";
				bg.stroke();
				bg.closePath();
*/
			}
			else if (distance<=birdArray[i].r+birdArray[j].r+150)
			{
				if (xDiff<0)
					birdArray[j].vx+=.04;
				else if (xDiff>0)
					birdArray[j].vx-=.04;
					
				if (yDiff<0)
					birdArray[j].vy+=.04;
				else if (yDiff>0)
					birdArray[j].vy-=.04;
					
				if (vxDiff<0)
					birdArray[j].vx+=.2;
				else if (vxDiff>0)
					birdArray[j].vx-=.2;
					
				if (vyDiff<0)
					birdArray[j].vy+=.2;
				else if (vyDiff>0)
					birdArray[j].vy-=.2;
					
				
bg.beginPath();
				bg.moveTo(birdArray[j].x,birdArray[j].y);
				bg.lineTo(birdArray[i].x,birdArray[i].y); 
				bg.strokeStyle = "rgba(30, 70, 150, .1)";
				bg.stroke();
				bg.closePath();

			}	
			else if (distance<=birdArray[i].r+birdArray[j].r+200)
			{
				if (xDiff<0)
					birdArray[j].vx-=.6;
				else if (xDiff>0)
					birdArray[j].vx+=.6 ;
					
				if (yDiff<0)
					birdArray[j].vy-=.6;
				else if (yDiff>0)
					birdArray[j].vy+=.6;
				
	
				
bg.beginPath();
				bg.moveTo(birdArray[j].x,birdArray[j].y);
				bg.lineTo(birdArray[i].x,birdArray[i].y);
				bg.strokeStyle = "rgba(30, 50, 100, .1)";
				bg.stroke();
				bg.closePath();


			}
					
			
		}
		
	}

} 

function moveBird(bird)
{
	var speedLimit=10;
	if (bird.vx<-speedLimit)
		bird.vx=-speedLimit;
	else if (bird.vx>speedLimit)
		bird.vx=speedLimit;
		
	if (bird.vy<-speedLimit)
		bird.vy=-speedLimit;
	else if (bird.vy>speedLimit)
		bird.vy=speedLimit;
	
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
	//bg.fillStyle = "#ffffff";
	//bg.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeEvent()
{
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
}
