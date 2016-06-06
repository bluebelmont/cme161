d3.json("/neural_data/60", function(error, my_data){

    if (error) alert("Could not load data");
    var viz_container_id = "container"; 
    var viz_canvas_id = "pca_plot"; 
    // ------------------------------------------------------------------------------------------------
    // renderer, camera, scene 

    // constants
    var SCENE_WIDTH = SCENE_HEIGHT = 500;

    // bind renderer (THREE.WebGLRenderer ==> GPU!) to canvas, set size, and enable antialiasing
    var canvas = document.getElementById(viz_canvas_id);
    var renderer = new THREE.WebGLRenderer({ 
        "canvas": canvas, 
        "antialias": true 
    });
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);

    // set up a camera and move it to a good viewing place (orbitcontrols overwrites this)
    var camera = new THREE.PerspectiveCamera(45, SCENE_WIDTH / SCENE_HEIGHT, 1, 10000);
    camera.position.set(SCENE_WIDTH, SCENE_HEIGHT / 2, 2000);

    // scene - where we put our meshes
    var scene = new THREE.Scene();

    // container object (like a sub-scene) which we use to store meshes
    var container = new THREE.Object3D();
    scene.add(container);

    // ------------------------------------------------------------------------------------------------
    // helpers

    // orbit controls binds mouse events (over the canvas only) to the camera
    var controls = new THREE.OrbitControls(camera, canvas); // it is super important to add the second arg, it scopes the events to those fired over the canvas and not the entire doc
    controls.addEventListener('change', function(){
        renderer.render(scene, camera);
    });

    // axes
    var axes = new THREE.AxisHelper2(SCENE_WIDTH); //TODO: fix the scale
    axes.update();


    // stats (fps graph)
    var stats = new Stats();
    document.getElementById(viz_container_id).appendChild(stats.domElement); // add stats to the container

    // ------------------------------------------------------------------------------------------------
    // lights

    var ambient_light = new THREE.AmbientLight(0xffffff);
    ambient_light.name = "ambient_light";
    scene.add(ambient_light);

    var directional_light = new THREE.DirectionalLight(0xffffff)
    directional_light.position.set(1,1,1);
    directional_light.name = "directional_light";
    scene.add(directional_light);

    // ------------------------------------------------------------------------------------------------
    // cursor plot

    cursor_radius = 5;

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 270 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var c_xlim = [-150, 150]; //in future this value should be loaded, but this works for now
    var c_ylim = [0, 150]; 

    var c_trial = 0;
    var start_time = 0;

    var c_x = d3.scale.linear().range([0, width]);
    var c_y = d3.scale.linear().range([height, 0]);

    c_x.domain(c_xlim);
    c_y.domain(c_ylim);

    var c_xAxis = d3.svg.axis().scale(c_x)
    .orient("bottom").ticks(5);

    var c_yAxis = d3.svg.axis().scale(c_y)
    .orient("left").ticks(5);

    var cursor_arr = Object.keys(my_data["trial"][c_trial]["time"]).map(function(k) { 
        return my_data["trial"][c_trial]["time"][k] 
    });

    var valueline = d3.svg.line()
    .x(function(d) { 
        return (c_x(d.c_x)); 
    })
    .y(function(d) {
        return (c_y(d.c_y)); 
    });

    var svg = d3
    .select("#cursor_plot")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");
    svg.append("path")
    .attr("class", "line")
    .attr('d', valueline(cursor_arr));

    svg.append("g")                // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(c_xAxis);

    svg.append("g")               // Add the Y Axis
    .attr("class", "y axis")
    .call(c_yAxis);

    var circle = svg.append("circle")
    .attr("cx", c_x(cursor_arr[0].c_x))
    .attr("cy", c_y(cursor_arr[0].c_y))
    .attr("r", cursor_radius);        


    // ------------------------------------------------------------------------------------------------
    // user interface

    var step = .3; //speed of visualization
    var start_time = -my_data['start']; //stored in dict as seconds before start, so flip sign
    var end_time = my_data['end']; 
    var max_time = Math.abs(start_time) + Math.abs(end_time);

    //time slider
    var time_slider = new Slider(
        "#time_slider", {
          "id": "time_slider",
          "min": 0,
          "max": max_time, //for simplicity of logic, have slider go from 0-max_time
          "value": 0,
          "step": step,
          "tooltip": "hide"
      });


    // dat.gui
    var gui = new dat.GUI();
    document.getElementById(viz_container_id).appendChild( gui.domElement );

    var controls_state = {
        "ambient_light": true,
        "directional_light": true,
        "ambient_light_intensity": 1,
        "directional_light_intensity": 1,
        "show_axis": false,
        "step": step,
        "pause": false //TODO: change this to actual button
    };



    gui.add(controls_state, 'ambient_light')
    .onChange(function(on) {
        scene.getObjectByName('ambient_light').intensity = 1 * on;
        renderer.render(scene, camera);
    });

    gui.add(controls_state, 'directional_light')
    .onChange(function(on) {
        scene.getObjectByName('directional_light').intensity = 1 * on;
        renderer.render(scene, camera);
    });

    gui.add(controls_state, 'ambient_light_intensity', 0, 1)
    .onChange(function(value) {
        scene.getObjectByName('ambient_light').intensity = value;
        renderer.render(scene, camera);
    });

    gui.add(controls_state, 'directional_light_intensity', 0, 1)
    .onChange(function(value) {
        scene.getObjectByName('directional_light').intensity = value;
        renderer.render(scene, camera);
    });

    gui.add(controls_state, 'show_axis')
    .onChange(function(on) {
        if (on) { container.add(axes.mesh);    } 
        else    { container.remove(axes.mesh); }
        renderer.render(scene, camera);
    });

    gui.add(controls_state, 'step', 0, 2).step(.1)
    .onChange(function(value) {
        step = value;
        time_slider.setAttribute("step", step);
    });



    // --------------------------------------------------------- 
    // add trials

    var num_trials;
    trials = [];
    
    num_trials = Object.keys(my_data["trial"]).length


    for (var i = 0; i < num_trials; i++) {
        var t = new Trial(i, my_data["trial"][i], num_trials);
        t.set_parameters();
        t.init_mesh_obj(); 
        container.add(t.mesh);
        trials.push(t);
        renderer.render(scene, camera);
    }

    var time = 0;

    function compute_cursor_position(time){
        var floor_x = cursor_arr[Math.floor(time)].c_x;
        var floor_y = cursor_arr[Math.floor(time)].c_y;
        var ceil_x = cursor_arr[Math.ceil(time)].c_x;
        var ceil_y =  cursor_arr[Math.ceil(time)].c_y;
        var c_x = floor_x + (ceil_x - floor_x)*(time-Math.floor(time));
        var c_y = floor_y + (ceil_y - floor_y)*(time-Math.floor(time));
        return [c_x, c_y]
    }   

    function animate() {
        // start stats recording
        stats.begin();

        // render boids
        for (var i = 0; i < num_trials; i++) {
            var t = trials[i];
            t.run(time);
            t.update_mesh();
        }
        // render scene
        renderer.render(scene, camera);

        // end stats recording
        stats.end();

        circle_coordinates = compute_cursor_position(time);

        circle.attr("cx", c_x(circle_coordinates[0]))
        .attr("cy", c_y(circle_coordinates[1]));
        time_slider.setValue(time, false, false);

        time += step;
        

        
        // run again
        if(!controls_state.pause) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    gui.add(controls_state, 'pause')
    .onChange(function(pause_on) {
        if(!pause_on) requestAnimationFrame(animate);
    });

    time_slider.on("slide", function(e) {
        time = e;
        for (var i = 0; i < num_trials; i++) {
            var t = trials[i];
            t.run(time);
            t.update_mesh();
        }
        renderer.render(scene, camera);
    });

    time_slider.on("change", function(e) {
        time = e.newValue;
        for (var i = 0; i < num_trials; i++) {
            var t = trials[i];
            t.run(time);
            t.update_mesh();
        }
        renderer.render(scene, camera);
    });
});
