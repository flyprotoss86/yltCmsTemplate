$(function(){
	$("header span:eq(1)").click(function(e){
		if($(".menu").is(":hidden")){
				$(".menu").show();
				$("body").css({ 
					 "overflow-x":"hidden",
					 "overflow-y":"hidden"       
				 });
		}else{
			$(".menu").hide();
			$("body").css({ 
					 "overflow-x":"auto",
					 "overflow-y":"auto"       
				 });
		}
		
		e.stopPropagation();
	})
			
	$("body").click(function(e){
		$(".menu").hide();
		$("body").css({ 
					 "overflow-x":"auto",
					 "overflow-y":"auto"       
				 });
		e.stopPropagation();
	})
	

 
	$(".danji").click(function(e){
		if($(".menu").is(":hidden")){
				$(".menu").show();
				$("body").css({ 
					 "overflow-x":"hidden",
					 "overflow-y":"hidden"       
				 });
		}else{
			$(".menu").hide();
			$("body").css({ 
					 "overflow-x":"auto",
					 "overflow-y":"auto"       
				 });
		}
		
		e.stopPropagation();
	})
	
})