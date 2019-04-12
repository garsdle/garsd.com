<html> 
	<head> 
		<title>NoteNet</title>
		<style>
			html,body
		    {
		      height: 100%;
		      width: 100%;
		      margin: 0;
		      background-color: #FFF;
		    }
		    canvas#full
		    {
		      margin: 0;
		      background-color: #FFF;
    		}
    	</style>
    	<script type="text/javascript"> var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-11405834-3']); _gaq.push(['_setDomainName', 'garsd.com']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();</script> 
 
	</head> 
	<body onload="init()" onresize="resizeEvent()"> 
		<section> 
			<div> 
				<canvas id="full">
					This text is displayed if your browser 
					does not support HTML5 Canvas. Get with the
					times!
				</canvas> 
				<audio id="audiotag0"></audio>
				<?php for($i=1;$i<=88;$i++):?> 
					<audio id="audiotag<?php echo $i ?>" src="notes/<?php echo $i ?>.wav" preload="auto"> </audio>
				<?php endfor; ?>

			</div>  
			<script src="organism.js"> </script>
			<script src="connection.js"> </script> 
			<script src="main.js"> </script> 
		</section> 
	</body> 
</html>