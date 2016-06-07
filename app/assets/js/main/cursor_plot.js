var Cursor_Plot = function(i, trial_dict, plot_size, plot_x, plot_y, margin, height, width, filter_trials, unfilter_trials, set_trial_highlight) {

	cursor_radius = 3;

	var trial_num = i;

    var c_xlim = [-120, 100]; //in future this value should be loaded, but this works for now
    var c_ylim = [20, 120]; 

    var start_time = 0;

    var c_x = d3.scale.linear().range([0, width]);
    var c_y = d3.scale.linear().range([height, 0]);

    c_x.domain(c_xlim);
    c_y.domain(c_ylim);

    var cursor_arr = Object.keys(trial_dict["time"]).map(function(k) { 
    	return trial_dict["time"][k] 
    });

    var valueline = d3.svg.line()
    .x(function(d) { 
    	return (c_x(d.c_x)); 
    })
    .y(function(d) {
    	return (c_y(d.c_y)); 
    });

    var svg = d3
    .select("#cursor_matrix")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right);

    var square = svg.append("rect")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .attr("fill-opacity", 0)
    .attr("class", trial_dict["direction"] + "_rect");


    svg.append("g")
    .append("g")
    .attr("transform", 
    	"translate(" + margin.left + "," + margin.top + ")");
    
    var path = svg.append("path")
    .attr("class", trial_dict["direction"] + "_path")
    .attr('d', valueline(cursor_arr));

    
    var circle = svg.append("circle")
    .attr("cx", c_x(cursor_arr[0].c_x))
    .attr("cy", c_y(cursor_arr[0].c_y))
    .attr("r", cursor_radius);    

    this.set_cursor_position = function(time){
    	var floor_x = cursor_arr[Math.floor(time)].c_x;
    	var floor_y = cursor_arr[Math.floor(time)].c_y;
    	var ceil_x = cursor_arr[Math.ceil(time)].c_x;
    	var ceil_y =  cursor_arr[Math.ceil(time)].c_y;
    	var c_x_interp = floor_x + (ceil_x - floor_x)*(time-Math.floor(time));
    	var c_y_interp = floor_y + (ceil_y - floor_y)*(time-Math.floor(time));
    	circle.attr("cx", c_x(c_x_interp))
    	.attr("cy", c_y(c_y_interp));
    }

    var highlighted = false;

    this.set_cursor_highlight = function (value) {
    	highlighted = value;
    }

    svg.on("click", function () {
    	if (!highlighted) {
    		highlighted = true;
    		set_trial_highlight(trial_num, true);
    		filter_trials(trial_num);
    	}
    	else {
    		highlighted = false;
    		set_trial_highlight(trial_num, false);
    		unfilter_trials(trial_num);
    	}
    });

    this.filter_on = function () {
    	if (!highlighted) {
    		path.attr("stroke-opacity", .2);
    		circle.attr("fill-opacity", .2);
    	} 
    	else
    	{
    		circle.attr("fill-opacity", 1);
    		path.attr("stroke-opacity", 1);
    	}
    }

    this.filter_off = function () {
    	circle.attr("fill-opacity", 1);
    	path.attr("stroke-opacity", 1);
    }

    svg.on("mouseenter", function () {
    	square.attr("fill-opacity",.5);
    });

    svg.on("mouseleave", function () {
    	square.attr("fill-opacity",0);
    });

}

