// ---------------------------------------------------------
// Particle (Replaced with Boid) Render Prototype Methods

Boid.prototype.set_parameters = function() {
    this.radius = Math.random() * 40;
}

Boid.prototype.create_geometry = function() {
    this.geometry = new THREE.BoxGeometry(this.radius, this.radius, this.radius); //maybe change the size of this?
}

Boid.prototype.create_material = function() {
    // assign a random color from HSL space
    this.color = new THREE.Color(); // http://threejs.org/docs/#Reference/Math/Color
    this.color.setHSL(Math.random(), .85, Math.random());
    this.material = new THREE.MeshPhongMaterial({
        color: this.color,
        specular: 0x333333,
        shininess: .9,
        transparent: true,
        opacity: .75
    });
}

Boid.prototype.create_mesh = function() {
    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );
    this.mesh.position.set(this.position.x,this.position.y,this.position.z);

    if(typeof(this.mesh) != "undefined" && this.mesh.position.x == 0 && this.mesh.position.y == 0 && this.mesh.position.z == 0) console.log("Action Required: You need to set the mesh position.") // delete this line
}

Boid.prototype.init_mesh_obj = function() {

    this.create_geometry();
    this.create_material();
    this.create_mesh();
}

Boid.prototype.update_mesh = function(range_momentums) {  

    this.mesh.position.set(this.position.x ,this.position.y ,this.position.z);
    if(typeof(this.mesh) != "undefined" && this.mesh.position.x == 0 && this.mesh.position.y == 0 && this.mesh.position.z == 0) console.log("Action Required: You need to update the mesh position.") // delete this line

    var max_momentum = range_momentums[0];
    var min_momentum = range_momentums[1];
    // var momentum = this.velocity.length() * this.radius;
    // range = max_momentum - min_momentum
    // if( momentum > max_momentum){ max_momentum = momentum; range_momentum = max_momentum - min_momentum; }
    // if( momentum < min_momentum){ min_momentum = momentum; range_momentum = max_momentum - min_momentum; }
    // this.mesh.material.color.setHSL(momentum/range * 1.1, .85, momentum/range * 0.9);
    return [max_momentum, min_momentum]
}



