var evolverArray=new Array();
var maxEvolvers=40;
var numBest=20;

var plantArray=new Array();
var maxPlants=250;

var organismArray=new Array();
var speed=1; //1-10, 10 being the fastest
var evolveTimer=0;
var sizeRatio=.3; //Size of the world

var maxConnections=300;

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	window.onkeydown=keyDownEventFunction;
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	canvas.style.backgroundColor = "#000000";

	init_world();
	return setInterval(tick, 60/speed);
}

function init_world()
{
	/////Evolver////////////////////////////////
	for(var i=0;i<maxEvolvers;i++)
	{
		evolver.prototype=new organism();
		evolverArray[i]=new evolver();
		//evolverArray[i].randomizeNet();
		evolverArray[i].normalizeNet();
	}	
	
	organismArray.push(evolverArray);
	
	/////PLANTS////////////////////////////////
	for(var i=0;i<maxPlants;i++)
	{
		plant.prototype=new organism();
		plantArray[i]=new plant();
		plantArray[i].r=1;
	}	
	
	evolverArray["eats"]= new Array(plantArray);
}

function tick()
{		
	evolveTimer++;
	clear();
	
	if(evolveTimer>2000) 
	{
		evolveTime();
	}
	
	for (var i in organismArray)
	{
		var length=organismArray[i].length;
		for(var j=0; j<length; j++)
		{
			
			organismArray[i][j].think();       //Let it think!
			
			moveOrganism(organismArray[i][j]);
			
			organismArray[i][j].nearby=new Array();
			for (var k in organismArray[i]["eats"])
				checkCollision(organismArray[i][j],organismArray[i]["eats"][k]); //Check to see if collided. Also distances to other.
				
			organismArray[i][j].nearbyFriend=new Array();
			checkFriend(organismArray[i][j],organismArray[i]);
			
			drawOrganism(organismArray[i][j]);

		}
	}

	plantTick();
}

function moveOrganism(o)
{
	/////SPEEED LIMIT
	if (o.vy>5)
	{
		alert(o.vy);
		o.vy=5;
		}
	else if (o.vy<-5)
		o.vy=-5;
		
	if (o.vx>5)
		o.vx=5;
	else if (o.vx<-5)
		o.vx=-5;
		
	/////Cleared to move
	o.x+=o.vx*speed;
	o.y+=o.vy*speed;
	
	/////PHYSICAL BOUNDARIES
	if (o.y>=canvas.height)
		o.y=0;
	else if (o.y<0)
		o.y=canvas.height;
		
	if (o.x>=canvas.width)
		o.x=0;
	else if (o.x<0)
		o.x=canvas.width;
}	

function checkFriend(a,bArray)
{	

	var length = bArray.length;
	var near=new Array();
	for(var i=0;i<length; i++)
	{
		var distance=((a.x-bArray[i].x)*(a.x-bArray[i].x) +(a.y-bArray[i].y)*(a.y-bArray[i].y));

		if (distance <= 150*150)
		{
			a.nearbyFriend.push(new Array(a.x-bArray[i].x,a.y-bArray[i].y,distance));
			
			ctx.beginPath();
			ctx.moveTo(a.x,a.y);
			ctx.lineTo(bArray[i].x,bArray[i].y); 
			ctx.strokeStyle = "#420";
			ctx.stroke();
			ctx.closePath();
		}	
	}
	
	//a.nearby=near;

} 	
	
function checkCollision(a,bArray)
{	

	var length = bArray.length;
	var near=new Array();
	for(var i=0;i<length; i++)
	{
		var distance=((a.x-bArray[i].x)*(a.x-bArray[i].x) +(a.y-bArray[i].y)*(a.y-bArray[i].y));
		
		if( distance <= (a.r + bArray[i].r)*(a.r + bArray[i].r)  )
		{
	 		a.energy+=1;
	 		bArray[i].r--;
	 		if (bArray[i].r<1)
			{
				delete bArray[i];
				bArray.splice(i,1);
				length--;
			}

		}
		else if (distance <= 150*150)
		{
			a.nearby.push(new Array(a.x-bArray[i].x,a.y-bArray[i].y,distance));
			
			ctx.beginPath();
			ctx.moveTo(a.x,a.y);
			ctx.lineTo(bArray[i].x,bArray[i].y); 
			ctx.strokeStyle = "#01a";
			ctx.stroke();
			ctx.closePath();
		}	
	}
	
	//a.nearby=near;

} 	
		
function drawOrganism(o)
{
	ctx.fillStyle = o.color;
	ctx.beginPath();
	ctx.arc(o.x, o.y, o.r, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();	
	
}

function evolveTime()
{
	var bestOrganism=new Array();
	
	for (var i=0;i<numBest;i++)
	{
		bestOrganism[i]=null;

	}
	
	//Find the best one!
	for(var i in evolverArray)
	{
	
		for (var j=0;j<numBest;j++)
		{
				
			if (bestOrganism[j]==null || evolverArray[i].energy>= bestOrganism[j].energy)
			{
				evolverArray[i].color="rgba(100, 180, 250, .6)";
				bestOrganism.splice(j,0,evolverArray[i]);
				break;
			}
		}
			
	}
	
	//Reset energy slight advantage tho
	evolverArray=new Array();
	for (var i=0; i<numBest;i++)
	{
		bestOrganism[i].energy=1;
		evolverArray[i]=bestOrganism[i];
	}
	
/*	
	bestOrganism[0].color="rgba(150, 180, 200, .6)";
	bestOrganism[1].color="rgba(200, 160, 180, .6)";
	bestOrganism[2].color="rgba(250, 140, 160, .6)";
*/

	for(var i in evolverArray)
	{
		evolver.prototype=new organism();
		var temp=bestOrganism[i].copySelf();
		evolverArray.push(temp);
		
	}	
	
	evolverArray["eats"]= new Array(plantArray);
	
		
	
	organismArray=new Array();
	organismArray.push(evolverArray);
	

	evolveTimer=0;
}


function clear()  
{
	ctx.fillStyle = "#ffffff";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//////EVENTS
function keyDownEventFunction(e)
{
	if(e.keyCode == 37)
		cowArray[0].vx=-1.7;
	else if (e.keyCode == 39)
		cowArray[0].vx=1.7;
	else if (e.keyCode == 38)
		cowArray[0].vy=-1.7;
	else if (e.keyCode == 40)
		cowArray[0].vy=1.7;
}

function resizeEvent()
{
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
}
