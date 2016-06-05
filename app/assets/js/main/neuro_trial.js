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
var axes = new THREE.AxisHelper2(SCENE_WIDTH);
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

var step = .3; //speed of visualization
var max_time = 400;



// ------------------------------------------------------------------------------------------------
// user interface

//time slider
var time_slider = new Slider(
    "#time_slider", {
      "id": "time_slider",
      "min": 0,
      "max": max_time,
      "value": 0,
      "step": step,
      "tooltip": "hide"
  });


// dat.gui
var gui = new dat.GUI();
document.getElementById(viz_container_id).appendChild( gui.domElement );

// this is an object that stores the state of the controls
// when you click on the controls, it changes the values therein
// you can reference this later in the program, for example while rendering
var controls_state = {
    "ambient_light": true,
    "directional_light": true,
    "ambient_light_intensity": 1,
    "directional_light_intensity": 1,
    "show_axis": false,
    "step": step,
    "pause": false
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



d3.json("/neural_data/60", function(error, my_data){
    if (error) alert("Could not load data");
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
        time += step;
        time_slider.setValue(time, false, false);
        
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
