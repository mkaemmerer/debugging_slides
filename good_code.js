$(function(){
	var data1 = [
		  {id: 0, order: 0, text: "GOOD",     color: "#00BE00"}
		, {id: 1, order: 1, text: "code is",  color: "white"}
		, {id: 2, order: 2, text: "EASY",     color: "#00BE00"}
		, {id: 3, order: 3, text: "to debug", color: "white"}
	]
	var data2 = [
		  {id: 0, order: 3, text: "BAD CODE", color: "red"}
		, {id: 1, order: 2, text: "code is",  color: "white"}
		, {id: 2, order: 0, text: "HARD",     color: "red"}
		, {id: 3, order: 1, text: "to debug", color: "white"}
	]


	var main  = d3.select("#main article")
	  , words = main.selectAll("div.word")


	words
		.data(data1)
		.enter()
			.append("div")
				.attr("class", "word")
				.text(function(d){ return d.text })
				.style("color", function(d){ return d.color })

	words = main.selectAll("div.word")


	function update(data1, data2){
		words
			.data(data2)
			.text(function(d){ return d.text })
			.sort(function(a,b){return a.order - b.order})
			.each(function(d, i){ data2[d.id].target_offset = $(this).offset() })
			
		words
			.data(data1)
			.text(function(d){ return d.text })
			.sort(function(a,b){return a.order - b.order})
			.each(function(d, i){ data1[d.id].start_offset = $(this).offset() })

		words
			.style("position", "absolute")

		words
			.data(data1)
			.style("color", function(d){ return d.color })
			.style("top", function(d){ return d.start_offset.top + "px" })
			.style("left", function(d){ return d.start_offset.left + "px" })
			.style("width", function(d){ return d.start_offset.width + "px" })
			.style("height", function(d){ return d.start_offset.height + "px" })
		
		words
			.data(data2)
			.text(function(d){ return d.text })
			.style("width", function(d){ return d.target_offset.width + "px" })
			.style("height", function(d){ return d.target_offset.height + "px" })
			.transition()
			.duration(1000)
			.delay(function(d,i){ return i * 80 })
			.style("color", function(d){ return d.color })
			.style("top", function(d){ return d.target_offset.top + "px" })
			.style("left", function(d){ return d.target_offset.left + "px" })
			.each("end", function(){
				words
					.sort(function(a,b){return a.order - b.order})
					.style("position", "static")
					.style("top", null)
					.style("left", null)
					.style("width", null)
					.style("height", null)
			})

	}

	var d1 = data1
	  , d2 = data2;
	
	$('body').on("click", function(){
		console.log("FOO");
		var tmp;
		
		update(d1, d2);

		tmp = d1;
		d1  = d2;
		d2  = tmp;
	})
})