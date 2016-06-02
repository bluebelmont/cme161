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
container.add(axes.mesh);

// bounding box
var bounding_box = new THREE.BoundingBoxHelper(container); // can also be tied to scene but since our objects are in the container we tie it here
bounding_box.update(); // render
container.add(bounding_box);

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
// user interface

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
    "show_axis": true,
    "show_bounding_box": true
};

gui.add(controls_state, 'ambient_light')
.onChange(function(on) {
    scene.getObjectByName('ambient_light').intensity = 1 * on;
});

gui.add(controls_state, 'directional_light')
.onChange(function(on) {
    scene.getObjectByName('directional_light').intensity = 1 * on;
});

gui.add(controls_state, 'ambient_light_intensity', 0, 1)
.onChange(function(value) {
    scene.getObjectByName('ambient_light').intensity = value;
});

gui.add(controls_state, 'directional_light_intensity', 0, 1)
.onChange(function(value) {
    scene.getObjectByName('directional_light').intensity = value;
});

gui.add(controls_state, 'show_axis')
.onChange(function(on) {
    if (on) { container.add(axes.mesh);    } 
    else    { container.remove(axes.mesh); }
});

gui.add(controls_state, 'show_bounding_box')
.onChange(function(on) {
    if (on) { container.add(bounding_box);    } 
    else    { container.remove(bounding_box); }
});




// --------------------------------------------------------- 
// add trials



var n = 64,
trials = [];
var max_time = 400;

var _60data;

d3.json("/neural_data/60", function(error, my_data){
    if (error) alert("Could not load data");
    _60data = my_data;
    for (var i = 0; i < n; i++) {
        var t = new Trial(i, _60data["trial"][i]);
        t.set_parameters();
        t.init_mesh_obj(); 
        container.add(t.mesh);
        trials.push(t);
        renderer.render(scene, camera);
    }

    var step = .3
    var time_slider = new Slider(
        "#time_slider", {
          "id": "time_slider",
          "min": 0,
          "max": max_time,
          "value": 0,
          "step": step,
          "tooltip": "hide"
      });



    time_slider.on("slide", function(e) {
        for (var i = 0; i < n; i++) {
            var t = trials[i];
            t.run(e);
            t.update_mesh();
        }
        renderer.render(scene, camera);
    });
    var time = 0;
    console.log(step);

    function animate() {
        // start stats recording
        stats.begin();

        // render boids
        for (var i = 0; i < n; i++) {
            var t = trials[i];
            t.run(time);
            t.update_mesh();
        }
        // render scene
        renderer.render(scene, camera);

        // end stats recording
        stats.end();
        time += step;
        // run again
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});
