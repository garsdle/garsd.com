function organism()
{
	this.x=Math.random()*canvas.width;
	this.y=Math.random()*canvas.height;
	this.r=5;
	this.energy=1000;
	this.age=Math.floor(Math.random()*100);
}