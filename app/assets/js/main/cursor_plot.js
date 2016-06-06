var Cursor_Plot = function(trial_dict, plot_size, plot_x, plot_y, margin, height, width) {

	cursor_radius = 3;

    var c_xlim = [-150, 150]; //in future this value should be loaded, but this works for now
    var c_ylim = [0, 150]; 

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

    this.svg = d3
    .select("#cursor_matrix")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", 
    	"translate(" + margin.left + "," + margin.top + ")");
    


    this.svg.append("path")
    .attr("class", trial_dict["direction"])
    .attr('d', valueline(cursor_arr));

    this.circle = this.svg.append("circle")
    .attr("cx", c_x(cursor_arr[0].c_x))
    .attr("cy", c_y(cursor_arr[0].c_y))
    .attr("r", cursor_radius);    

    // svg.append("g")                // Add the X Axis
    // .attr("class", "x axis")
    // .attr("transform", "translate(0," + height + ")")
    // .call(c_xAxis);

    // svg.append("g")               // Add the Y Axis
    // .attr("class", "y axis")
    // .call(c_yAxis);
    this.set_cursor_position = function(time){
    	var floor_x = cursor_arr[Math.floor(time)].c_x;
        var floor_y = cursor_arr[Math.floor(time)].c_y;
        var ceil_x = cursor_arr[Math.ceil(time)].c_x;
        var ceil_y =  cursor_arr[Math.ceil(time)].c_y;
        var c_x_interp = floor_x + (ceil_x - floor_x)*(time-Math.floor(time));
        var c_y_interp = floor_y + (ceil_y - floor_y)*(time-Math.floor(time));
        this.circle.attr("cx", c_x(c_x_interp))
        .attr("cy", c_y(c_y_interp));
    }
}

