function plant()
{
	this.gx=1*Math.random()-.5;
	this.gy=1*Math.random()-.5;
	this.vy=0;
	this.vx=0;
	this.color="rgba(0, 255, 20, 1)";
	
	this.think=function()
	{			
		this.vx=this.gx/5+Math.random()-.5;
		this.vy=this.gy/5+Math.random()-.5;
	};
}

function plantTick()
{
	if (plantArray.length==0)
	{
		plant.prototype=new organism();
		plantArray[0]=new plant();
		plantArray[0].r=1;
	}
	else	
		for(var i in plantArray)
		{
			plantArray[i].age++;
			
			plantArray[i].think(); 
			moveOrganism(plantArray[i]);
			
			///Plant grow
			if (plantArray[i].age%10==0)
				if(plantArray[i].r<5)
					plantArray[i].r+=.1;
				
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