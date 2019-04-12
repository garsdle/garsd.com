function evolver()
{
	this.vy=0;
	this.vx=0;
	
	this.color="rgba(100, 180, 250, .6)";
	
	this.nearby=new Array();
	this.nearbyFriend=new Array();
	this.nodeArray=new Array();
	
	
	this.normalizeNet=function()
	{
		//10(*5) input nodes
		for (var i=0;i<40;i++)
		{
			var temp=new node();
			temp.index=i;
			this.nodeArray.push(temp);
			
		}	
		//4 output nodes
		for (var i=40;i<40+4;i++)
		{
			var temp=new node();
			temp.index=i;
			this.nodeArray.push(temp);
		}	
		//Certain # nodes nodes
		for (var i=0;i<20;i++)
		{
			var temp=new node();
			temp.index=i;
			this.nodeArray.push(temp);
		}
		
		
		var tempConnection=new connection(this.nodeArray[40],this.nodeArray[0]);// (To,From)
		tempConnection.weight=10//(Math.random()*10);
		this.nodeArray[0].connectionArray.push(tempConnection);
		
		var tempConnection=new connection(this.nodeArray[41],this.nodeArray[1]);// (To,From)
		tempConnection.weight=10//(Math.random()*10);
		this.nodeArray[1].connectionArray.push(tempConnection);
		
		var tempConnection=new connection(this.nodeArray[42],this.nodeArray[2]);// (To,From)
		tempConnection.weight=10//(Math.random()*10);
		this.nodeArray[2].connectionArray.push(tempConnection);
		
		var tempConnection=new connection(this.nodeArray[43],this.nodeArray[3]);// (To,From)
		tempConnection.weight=10//(Math.random()*10);
		this.nodeArray[3].connectionArray.push(tempConnection);		
		
////Random Connection Array Creation
		var randomA=new Array();
		var randomB=new Array();
		for (var i=0;i<50;i++)
		{
			randomA[i]=Math.floor(Math.random()*(this.nodeArray.length));
			randomB[i]=Math.floor(Math.random()*(this.nodeArray.length));
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
			var tempConnection=new connection(this.nodeArray[randomB[i]],this.nodeArray[randomA[i]]);// (To,From)
			tempConnection.weight=(Math.random()*10);
			this.nodeArray[randomA[i]].connectionArray.push(tempConnection);
		}
				
		
	

		
	}
	
	this.randomizeNet= function()
	{
		//10(*5) input nodes
		for (var i=0;i<40;i++)
		{
			var temp=new node();
			temp.index=i;
			this.nodeArray.push(temp);
			
		}	
		//4 output nodes
		for (var i=40;i<40+4;i++)
		{
			var temp=new node();
			temp.index=i;
			this.nodeArray.push(temp);
		}	
	
	
		////Random Connection Array Creation
		var randomA=new Array();
		var randomB=new Array();
		for (var i=0;i<50;i++)
		{
			randomA[i]=Math.floor(Math.random()*(this.nodeArray.length));
			randomB[i]=Math.floor(Math.random()*(this.nodeArray.length));
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
			var tempConnection=new connection(this.nodeArray[randomB[i]],this.nodeArray[randomA[i]]);// (To,From)
			tempConnection.weight=(Math.random()*10);
			this.nodeArray[randomA[i]].connectionArray.push(tempConnection);
		}
				
		
	}
		
	this.think=function()
	{
		
		//Order nearby Array
		
		this.nearby.sort(function(a,b){return a[2] - b[2]});
		this.nearbyFriend.sort(function(a,b){return a[2] - b[2]});
		
		//Inputs to the node array
		for (var i=0; i<1&&i<this.nearby.length; i++)
		{		
			if (this.nearby[i][0]<0)
			{
				this.nodeArray[(i*4)].sum=5;
			}
			else
			{
				this.nodeArray[(i*4)+1].sum=5;
			}
			
			if (this.nearby[i][1]<0)
			{
				this.nodeArray[(i*4)+2].sum=5;
			}
			else
			{
				this.nodeArray[(i*4)+3].sum=5;
			}
		}
		
		//Inputs to the node array
		

		for (var i=0; i<2&&i<this.nearbyFriend.length; i++)
		{		
			var j=i+1;
			if (this.nearbyFriend[i][0]<0)
			{
				this.nodeArray[(j*4)].sum=5;
			}
			else if (this.nearbyFriend[i][0]>0)
			{
				this.nodeArray[(j*4)+1].sum=5;
			}
			
			if (this.nearbyFriend[i][1]<0)
			{
				this.nodeArray[(j*4)+2].sum=5;
			}
			else if (this.nearbyFriend[i][1]>0)
			{
				this.nodeArray[(j*4)+3].sum=5;
			}
			
			//Some magic?
			if (this.nearbyFriend[i][0]==0 && this.nearbyFriend[i][1]==0)
			{
				this.nodeArray[(j*4)+0].sum=10*Math.random()-5;
				this.nodeArray[(j*4)+1].sum=10*Math.random()-5;
				this.nodeArray[(j*4)+2].sum=10*Math.random()-5;
				this.nodeArray[(j*4)+3].sum=10*Math.random()-5;
			}
		}

		
		//Let the neural net do its thing for 20 cycles
		for (var i=0;i<10;i++)
		{
		
			//Fire all appropriate nodes in parallel
			for (var j in this.nodeArray)
			{	
				if(this.nodeArray[j].sum>this.nodeArray[j].threshhold)
				{
					//alert(j+","+this.nodeArray[j].connectionArray.length);
					this.nodeArray[j].fire();
				}
			
			}
			
			for (var j in this.nodeArray)
			{	
				this.nodeArray[j].connectionFire();
				
			}
		
		}
		
		
		//Check the output Nodes
		if (this.nodeArray[40].firedSum > this.nodeArray[41].firedSum)
		{
			this.vx=.8;
			this.nodeArray[40].firedSum=0;
			this.nodeArray[41].firedSum=0;
		}
		else if (this.nodeArray[40].firedSum < this.nodeArray[41].firedSum)
		{
			this.vx=-.8;
			this.nodeArray[40].firedSum=0;
			this.nodeArray[41].firedSum=0;
		}
		else 
		{
			this.vx=0;
			this.nodeArray[40].firedSum=0;
			this.nodeArray[41].firedSum=0;
		}
			
		if (this.nodeArray[42].firedSum > this.nodeArray[43].firedSum)
		{
			this.vy=.8;
			this.nodeArray[42].firedSum=0;
			this.nodeArray[43].firedSum=0;
		}	
		else if (this.nodeArray[42].fired < this.nodeArray[43].firedSum)
		{
			this.vy=-.8;
			this.nodeArray[42].firedSum=0;
			this.nodeArray[43].firedSum=0;
		}
		else
		{
			this.vy=0;
			this.nodeArray[42].firedSum=0;
			this.nodeArray[43].firedSum=0;
		}
		
	};

	this.copySelf =function()
	{
		var copy=new evolver();
		//copy.randomizeNet();
		copy.x=this.x+(Math.random()*10);
		copy.y=this.y+(Math.random()*10);
		
		//Create copy
		for (var i in this.nodeArray)
		{	
			var tempNode =new node();
			
			if(Math.random()>.95)
				tempNode.threshhold=(Math.random()*5); //Sometimes the threshhold changes
			else
				tempNode.threshhold=this.nodeArray[i].threshhold;
				
			tempNode.index=this.nodeArray[i].index;
			copy.nodeArray.push(tempNode);
			
			for (var j in this.nodeArray[i].connectionArray)
			{
				
				var tempConnection=new connection();
				
				if(Math.random()>.95)//sometimes the weight is changed
					tempConnection.weight=(Math.random()*4)-2;
				else
					tempConnection.weight=this.nodeArray[i].connectionArray[j].weight;
				
				
				copy.nodeArray[i].connectionArray.push(tempConnection);
				
			}
		
		}
		
		//Transfer connections to copy
		for (var i in copy.nodeArray)
		{	
			for (var j in copy.nodeArray[i].connectionArray)
			{
			
				var toIndex=this.nodeArray[i].connectionArray[j].to.index;
				var fromIndex=this.nodeArray[i].connectionArray[j].from.index;
			
				
				
				copy.nodeArray[i].connectionArray[j].from=copy.nodeArray[fromIndex];
				
				if(Math.random()>.95) //Sometimes the connection is changed
					copy.nodeArray[i].connectionArray[j].to=copy.nodeArray[Math.floor(Math.random()*copy.nodeArray.length)];
				else
					copy.nodeArray[i].connectionArray[j].to=copy.nodeArray[toIndex];
				
				
			}
		/*

			while(Math.random()<.95)//Every so often a connection is deleted
			{
				copy.nodeArray[i].connectionArray.splice(Math.floor(Math.random()*copy.nodeArray.length),1); 
			}
		
		
			while(Math.random()>.95&& copy.nodeArray[i].connectionArray.length<maxConnections) //Sometimes Make a new random connections
			{
				var from=Math.floor(Math.random()*copy.nodeArray.length);
				var to=Math.floor(Math.random()*copy.nodeArray.length);
				var tempConnection=new connection(copy.nodeArray[from],copy.nodeArray[to]);						
				tempConnection.weight=(Math.random()*20)-10;
				copy.nodeArray[i].connectionArray.push(tempConnection);
			}
*/

		}
		
		
		return copy;
		
	}
	
}


function node()
{
	this.index;
	this.sum=0;
	this.threshhold=(Math.random()*10);
	this.connectionArray=new Array();
	this.firedSum=0;
	
	this.fire = function()
	{
		this.fired=true;
		this.firedSum=this.sum;
		for (var i in this.connectionArray)
			this.connectionArray[i].nodeFired();
		
		this.sum=0;
		
	}
	
	this.connectionFire=function()
	{
		for (var i in this.connectionArray)
			if (this.connectionArray[i].fired)
				this.connectionArray[i].connectionFire();
				
		
	}
}

function connection(to,from)
{
	this.from=from;
	this.to=to;
	this.weight=1;
	this.fromSum=0;
	this.fired=false;
	
	this.nodeFired = function()
	{
		this.fired=true;
		this.fromSum=this.from.sum;			
	}
	
	this.connectionFire = function()
	{
		this.to.sum+=this.fromSum*this.weight;	
		
		if(this.to.sum>1000)
			this.to.sum=1000;
		else if (this.to.sum<-1000)
			this.to.sum=-1000;
		
		this.fired=false;

	}
}

