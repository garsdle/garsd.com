var cheekyArray=new Array();

var omniArray=new Array();

var wolfArray=new Array();

var cowArray=new Array();

var plantArray=new Array();
var maxPlants=200;

var organismArray=new Array();
var speed=1; //1-10, 10 being the fastest
var sizeRatio=.3; //Size of the world

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	window.onkeydown=keyDownEventFunction;
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	canvas.style.backgroundColor = "#000000";

	init_world();
	return setInterval(tick, 50/speed);
}

function init_world()
{	

	/////Cheeky	///////////////////////////////
	cheeky.prototype=new organism();
	cheekyArray["max"]=1000;
	for(var i=0;i<10;i++)
	{
		cheeky.prototype=new organism();
		cheekyArray[i]=new cheeky();	
	}
	organismArray.push(cheekyArray);
	
	/////OMNI	///////////////////////////////
	omni.prototype=new organism();
	omniArray["max"]=1000;
	for(var i=0;i<20;i++)
	{
		omni.prototype=new organism();
		omniArray[i]=new omni();	
	}
	organismArray.push(omniArray);
	
	
	/////WOLVES	///////////////////////////////
	wolf.prototype=new organism();
	wolfArray["max"]=1000;
	for(var i=0;i<20;i++)
	{
		wolf.prototype=new organism();
		wolfArray[i]=new wolf();	
	}
	organismArray.push(wolfArray);


	/////COWS/////////////////////////////////
	cowArray["max"]=1000;
	for(var i=0;i<40;i++)
	{
		cow.prototype=new organism();
		cowArray[i]=new cow();
	}
	organismArray.push(cowArray);
	
	/////PLANTS////////////////////////////////
	for(var i=0;i<200;i++)
	{
		plant.prototype=new organism();
		plantArray[i]=new plant();
		//plantArray[i].r=1;
	}	
	
	cheekyArray["eats"]=new Array(wolfArray);
	wolfArray["eats"]=new Array(omniArray);
	omniArray["eats"]=new Array(cowArray);
	cowArray["eats"]=new Array(plantArray);
}

function tick()
{	
	clear();
	
	for (var i in organismArray)
	{
		var length=organismArray[i].length;
//if (length==0)
		// alert("extinction");
		for(var j=0; j<length; j++)
		{
			organismArray[i][j].age++;
			organismArray[i][j].r-=(.004*speed);
			
			
			////Make some babies
			if (organismArray[i][j].readyToBirth && organismArray[i].length<organismArray[i]["max"])
			{
				organismArray[i][j].age=0;
				
				var temp=organismArray[i][j].birth();
				temp.x=organismArray[i][j].x;
				temp.y=organismArray[i][j].y;
				temp.r=1.2;
				organismArray[i][j].r*=0.6;
				organismArray[i].push(temp);
			}
			
			organismArray[i][j].think();       //Let it think!
			organismArray[i][j].r-=Math.abs(organismArray[i][j].vx+organismArray[i][j].vy)/(10000/speed);
			

			
			moveOrganism(organismArray[i][j]);
			
			organismArray[i][j].nearby=new Array();
			for (var k in organismArray[i]["eats"])
					checkCollision(organismArray[i][j],organismArray[i]["eats"][k]); //Check to see if collided. Also distances to other.
			
			drawOrganism(organismArray[i][j]);
			
			////Under fed organisms die :(
			if(organismArray[i][j].r<1)
			{
				delete organismArray[i][j];
				organismArray[i].splice(j,1);
				length--;
			}
		}
	}

	//humanCowTick();
	plantTick();
}


function humanCowTick()
{
	cowArray[0].color="rgba(0, 100, 200, 1)";
	cowArray[0].age++;

	cowArray[0].energy-=cowArray[0].vx+cowArray[0].vy;
	
	moveOrganism(cowArray[0]);
	///Cow grow
	if (cowArray[0].age%20==0)
		if(cowArray[0].r<10)
			cowArray[0].r=cowArray[0].energy/100;
	
	
	checkCollision(cowArray[0],plantArray); //Check to see if collided. Also distances to other.
	
	drawOrganism(cowArray[0]);
	
	////Under fed cows die :(
	if(cowArray[0].energy<=0)
	{
		delete cowArray[0];
		cowArray.splice(0,1);
		length--;
	}
}

function plantTick()
{
	for(var i in plantArray)
	{
		plantArray[i].age++;
		
		plantArray[i].think(); 
		moveOrganism(plantArray[i]);
		
		///Plant grow
		if (plantArray[i].age%10==0)
			if(plantArray[i].r<10)
				plantArray[i].r++;
			
		///Plant Reproduce
		if (plantArray[i].age>100 && plantArray.length<maxPlants)
		{
			plantArray[i].age=0;
			plantArray[i].r/=2;
			var temp=new plant();
			temp.x=plantArray[i].x;
			temp.y=plantArray[i].y;
			temp.r=plantArray[i].r;
			plantArray.push(temp);
		}
				
		drawOrganism(plantArray[i]);
	}

}


function moveOrganism(o)
{
	/////SPEEED LIMIT
	if (o.vy>5)
		o.vy=5;
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
	
function checkCollision(a,bArray)
{	
	var length = bArray.length;
	var near=new Array();
	for(var i=0;i<length; i++)
	{
		var distance=((a.x-bArray[i].x)*(a.x-bArray[i].x) +(a.y-bArray[i].y)*(a.y-bArray[i].y));
		
		if( distance <= (a.r + bArray[i].r)*(a.r + bArray[i].r)  )
		{
			//it is edible
			if(a.hungry)
			{
		 		a.r+=.6;
		 		bArray[i].r--;
		 		if (bArray[i].r<1)
				{
					delete bArray[i];
					bArray.splice(i,1);
					length--;
				}
			}
		}
		else if (distance <= 150*150)
		{
			a.nearby.push(new Array(bArray[i].x,bArray[i].y,distance))
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


//init(); //Run the init function from the start
