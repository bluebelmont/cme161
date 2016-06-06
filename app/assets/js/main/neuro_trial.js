d3.json("/neural_data/30", function(error, my_data){

    if (error) alert("Could not load data");
    var viz_container_id = "container"; 
    var viz_canvas_id = "pca_plot"; 
    var num_trials = Object.keys(my_data["trial"]).length;
    // ------------------------------------------------------------------------------------------------
    // renderer, camera, scene 

    // constants
    var SCENE_WIDTH = SCENE_HEIGHT = 500;

    var gui = new dat.GUI();
    document.getElementById("dat").appendChild(gui.domElement);

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
    // data properties

    var num_trials = Object.keys(my_data["trial"]).length;    
    var start_time = -my_data['start']; //stored in dict as seconds before start, so flip sign
    var end_time = my_data['end']; 
    var max_time = Math.abs(start_time) + Math.abs(end_time);

    // ------------------------------------------------------------------------------------------------
    // cursor plot

    var cursor_plots = [];
    var plot_matrix_ncols = Math.ceil(Math.sqrt(num_trials));
    var plot_matrix_nrows = Math.ceil(Math.sqrt(num_trials));


    var plot_size = SCENE_WIDTH/plot_matrix_ncols;
    var plot_count = 0;

    var margin = {top: -10, right: -5, bottom: -10, left: -5},
    width = plot_size - margin.left - margin.right,
    height = plot_size - margin.top - margin.bottom;

    function make_plot_matrix() {
        for (var col = 0; col < plot_matrix_ncols; col++) {
            for (var row = 0; row < plot_matrix_nrows; row++) {
                var plot = new Cursor_Plot(my_data["trial"][plot_count], plot_size, col*plot_size, row*plot_size, margin, width, height);
                cursor_plots.push(plot);
                plot_count++;
                if (plot_count == num_trials) {
                    return;
                }
            }
        }
    }

    make_plot_matrix();




    // ------------------------------------------------------------------------------------------------
    // user interface

    var step = .3; //speed of visualization

    var num_ticks = 4;
    var timer_ticks = [];
    var timer_label = [];
    var tick_interval = max_time/num_ticks;

    for (var tick_time = 0; tick_time <= max_time; tick_time += tick_interval) {
        timer_ticks.push(tick_time);
        if (tick_time + start_time != 0) {
            timer_label.push(tick_time + start_time);
        }
        else {
            timer_label.push("Jump");
        }
    }

    //time slider
    var time_slider = new Slider(
        "#time_slider", {
          "id": "time_slider",
          "min": 0,
          "max": max_time, //for simplicity of logic, have slider go from 0-max_time
          "value": 0,
          "step": step,
          "tooltip": "hide",
          "ticks": timer_ticks,
          "ticks_labels": timer_label,
      });


    // dat.gui
    

    var controls_state = {
        "ambient_light": true,
        "directional_light": true,
        "ambient_light_intensity": 1,
        "directional_light_intensity": 1,
        "show_axis": false,
        "step": step,
        "play": true 
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


    var trials = [];

    for (var i = 0; i < num_trials; i++) {
        var t = new Trial(my_data["trial"][i], max_time);
        t.set_parameters();
        t.init_mesh_obj(); 
        container.add(t.mesh);
        trials.push(t);
        renderer.render(scene, camera);
    }

    var time = 0;

    function animate() {
        // start stats recording

        if (time < max_time) {


        // render boids
        for (var i = 0; i < num_trials; i++) {
            var t = trials[i];
            var p = cursor_plots[i];
            p.set_cursor_position(time);
            t.run(time);
            t.update_mesh();

            //TODO: UPDATE CURSORS ON EACH PLOT
        }
        // render scene
        renderer.render(scene, camera);

        // end stats recording

        time_slider.setValue(time, false, false);

        time += step;
        if(controls_state.play) requestAnimationFrame(animate); // run again
    }
    else {
        controls_state.play = false;
        var btn = document.getElementsByClassName("glyphicon glyphicon-pause");
        btn[0].className = "glyphicon glyphicon-play";
    }
}

requestAnimationFrame(animate);

    //add play/pause functionalty
    document.getElementById('play_btn').addEventListener("click", function (){
        if(controls_state.play){
            controls_state.play = false;
            var btn = document.getElementsByClassName("glyphicon glyphicon-pause");
            btn[0].className = "glyphicon glyphicon-play";
        }
        else {
            controls_state.play = true;
            var btn = document.getElementsByClassName("glyphicon glyphicon-play");
            btn[0].className = "glyphicon glyphicon-pause";
            if (time >= max_time) time = 0; //reset if at end
            requestAnimationFrame(animate);
        }
    });

    time_slider.on("slide", function(e) {
        time = e;
        for (var i = 0; i < num_trials; i++) {
            var t = trials[i];
            var p = cursor_plots[i];
            p.set_cursor_position(time);
            t.run(time);
            t.update_mesh();
        }
        renderer.render(scene, camera);
    });

    time_slider.on("change", function(e) {
        time = e.newValue;
        for (var i = 0; i < num_trials; i++) {
            var t = trials[i];
            var p = cursor_plots[i];
            p.set_cursor_position(time);
            t.run(time);
            t.update_mesh();
        }
        renderer.render(scene, camera);
    });



});
