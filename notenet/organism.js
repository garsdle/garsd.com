function organism(note, octave)
{
	this.note=note;
	this.octave=octave;
	this.fire=false;
	this.x=Math.random()*canvas.width;
	this.y=Math.random()*canvas.height;
	this.r=10;
	
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
	
	
	this.connectionArray=new Array();
	
	this.tick = function()
	{	
		if(this.fire)
		{
			noteArray[octave*12+scale[note]].currentTime=0;
			noteArray[octave*12+scale[note]].play();
		}
		
		
		for(var i in this.connectionArray)
		{
			if(this.fire && !this.connectionArray[i].firing)
				this.connectionArray[i].fire();
			
			this.connectionArray[i].tick();
		

		}
		
		this.fire=false;
	
	}
}