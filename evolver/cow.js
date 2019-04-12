function cow()
{
	this.nearby=new Array();
	this.vy=0;
	this.vx=0;
	this.target=new Array(Math.random()*canvas.width,Math.random()*canvas.height);
	this.birthR=.5;
	this.hungry=true;
	this.readyToBirth=false;
	this.color="rgba(200, 200, 200, 1)";
	
	this.think=function()
	{
		////Check if hungry
		if (this.r<10)
			this.hungry=true;
		else if (this.r>10)
			this.hungry=false
	
		////Check if birth ready
		if (this.age>50 && this.r>10)
			this.readyToBirth=true;
		else
			this.readyToBirth=false;
		
		if (this.nearby.length>0 && this.hungry) ///If there are plants in sight and hungry go for them
		{
			var closest=99999;
			for (var i in this.nearby)
			{
				ctx.beginPath();
				ctx.moveTo(this.x,this.y)
				ctx.lineTo(this.nearby[i][0],this.nearby[i][1]); 
				ctx.strokeStyle = "#333";
				ctx.stroke();
				ctx.closePath();
					
				if (this.nearby[i][2]<closest)
				{
					closest=this.nearby[i][2];
					this.target[0]=this.nearby[i][0];
					this.target[1]=this.nearby[i][1];
				}
			}
			
			ctx.beginPath();
			ctx.moveTo(this.x,this.y)
			ctx.lineTo(this.target[0],this.target[1]); 
			ctx.strokeStyle = "#999";
			ctx.stroke();
			ctx.closePath();
		
		}
		else
		{
			if (Math.abs(this.x-this.target[0])<100 && Math.abs(this.y-this.target[1]<100))
			{
				this.target[0]=Math.random()*canvas.width;
				this.target[1]=Math.random()*canvas.height;
			}
		}
		
		if (this.target[0]>this.x)
			this.vx=2-Math.random();
		else
			this.vx=-2+Math.random();
			
		if (this.target[1]>this.y)
			this.vy=2-Math.random();
		else
			this.vy=-2+Math.random();
	};

	this.birth = function()
	{
		return (new cow());	
	};
}