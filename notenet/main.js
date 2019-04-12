var noteArray=new Array();
var organismArray=new Array();
var baseKey=1;
var scale;

var numOrgs=40;
var numConnections=80;
var time=0;

function init() 
{
	canvas = document.getElementById("full");
	ctx = canvas.getContext("2d");
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	canvas.style.backgroundColor = "#000000";
		
	for (var i=0;i<=88;i++)
		noteArray[i]=document.getElementById('audiotag'+i);	
	
	worldInit();
	
	return setInterval(tick,100);
}

function worldInit()
{
	//scale=new Array(0,2,4,5,7,9,11); //White Keys
	scale=new Array(0,4,5,0,4,7,0);  //sounds better...
	
/*

	scale = new Array();
	for (var i=0;i<5;i++)
		scale[i]=Math.floor(Math.random()*12);
	
	scale[5]=scale[0];
	scale[6]=scale[1];
*/

		
	
	for (var i=0;i<numOrgs;i++)
		organismArray.push(new organism( Math.floor(Math.random()*7), 4 ));
	
	////Random Connection Array Creation
	var randomA=new Array();
	var randomB=new Array();
	for (var i=0;i<numConnections;i++)
	{
		randomA[i]=Math.floor(Math.random()*numOrgs);
		randomB[i]=Math.floor(Math.random()*numOrgs);
	}
	
	////Check for self references and duplicate connections
	var length=randomA.length;
	for (var i=0; i<length; i++)	
	{
		if (randomA[i]==randomB[i])
		{
			randomA.splice(i,1);
			randomB.splice(i,1);
			length--;
		}
		else
		{
			for (var j=i+1; j<length; j++)
				if (randomA[i]==randomA[j] && randomB[i]==randomB[j])
				{
					randomA.splice(i,1);
					randomB.splice(i,1);
					length--;
				}
		}	
	}
		
	////Make the connections
	for (var i in randomA)	
	{
		var tempConnection=new connection(organismArray[randomB[i]],organismArray[randomA[i]]);// (To,From)
		organismArray[randomA[i]].connectionArray.push(tempConnection);
		
		if (i==0)
			organismArray[randomA[i]].fire=true;
			
	}
	
	
}

function tick()
{		

	
	clear();
	
	for (var i in organismArray)
	{
		
		organismArray[i].tick();
	}
	
	for (var i in organismArray)
	{
		drawOrganism(organismArray[i]);	
	}
	
}

function drawOrganism(o)
{
	ctx.fillStyle = o.color;
	ctx.beginPath();
	ctx.arc(o.x+Math.random(), o.y+Math.random(), o.r, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();	
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

//init();