function connection(to, from)
{
	this.to=to;
	this.from=from;
	
	this.firing=false;
	this.startX;
	this.startY;
	this.endX;
	this.endY;
	this.signalLength=10;
	
	if(this.note==0)
		this.color="#444";
	else if(this.note==1)
		this.color="#00f";
	else if(this.note==2)
		this.color="#f00";
	else if(this.note==3)
		this.color="#0f0";
	else if(this.note==4)
		this.color="#ff0";
	else if(this.note==5)
		this.color="#0ff";
	else if(this.note==6)
		this.color="#fff";
		
	this.color="#00f";
	
	this.tick = function()
	{
		ctx.beginPath();
		ctx.moveTo(this.from.x+Math.random(),this.from.y+Math.random())
		ctx.lineTo(this.to.x+Math.random(),this.to.y+Math.random()); 
		ctx.strokeStyle = this.color;
		ctx.globalAlpha=.5
		ctx.lineWidth=1;
		ctx.stroke();
		ctx.closePath();
		ctx.globalAlpha=1;
			
		if (this.firing)
		{
			
			var m=(this.to.y-this.from.y)/(this.to.x-this.from.x);
			var k=this.signalLength/Math.sqrt(1+(m*m));
			
			if(this.from.x>this.to.x)	
				this.endX=this.startX-k;
			else 	
				this.endX=this.startX+k;
				
				
			if (this.to.y>this.from.y)
				this.endY=this.startY+(Math.abs(m)*k);
			else
				this.endY=this.startY-(Math.abs(m)*k);
			

			ctx.beginPath();
			ctx.moveTo(this.startX,this.startY)
			ctx.lineTo(this.endX,this.endY); 
			ctx.strokeStyle = "rgba(240,0,0,.5)";
			ctx.lineWidth=1;
			ctx.stroke();
			ctx.closePath();
			
			
			if( ((this.endY-this.to.y)*(this.endY-this.to.y))+((this.endX-this.to.x)*(this.endX-this.to.x))< (this.signalLength*this.signalLength) )
			{
				this.firing=false;
				this.to.fire=true;
			}
			else
			{
				this.startX=this.endX;
				this.startY=this.endY;	
			}
			//alert(m);
			
			
			//this.firing=false;
		}
	}
	
	this.fire = function()
	{
		this.startX=this.from.x;
		this.startY=this.from.y;
		this.firing=true;
	}
}