function plant()
{
	this.gx=Math.random()-.5;
	this.gy=Math.random()-.5;
	this.vy=0;
	this.vx=0;
	this.color="rgba(0, 255, 0, 1)";
	
	this.think=function()
	{			
		this.vx=this.gx+Math.random()-.5;
		this.vy=this.gy+Math.random()-.5;
	};
}