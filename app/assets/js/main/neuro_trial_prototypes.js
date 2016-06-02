// ---------------------------------------------------------
// Trial Render Prototype Methods

Trial.prototype.set_parameters = function() {
    this.radius = 20;
}

Trial.prototype.create_geometry = function() {
    this.geometry = new THREE.SphereGeometry(this.radius, 25, 25); //maybe change the size of this?
}

Trial.prototype.create_material = function() {
    // assign a random color from HSL space
    this.color = new THREE.Color(); // http://threejs.org/docs/#Reference/Math/Color
    if (this.direction == "left") {
        this.color.setHSL(1, .8, .2);    
    } 
    else {
        this.color.setHSL(.6, .8, .2);      
    }

    this.material = new THREE.MeshPhongMaterial({
        color: this.color,
        specular: 0x333333,
        shininess: .9,
        transparent: true,
        opacity: .75
    });
}

Trial.prototype.create_mesh = function() {
    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );
    this.mesh.position.set(this.position.x,this.position.y,this.position.z);

}

Trial.prototype.init_mesh_obj = function() {

    this.create_geometry();
    this.create_material();
    this.create_mesh();
}

Trial.prototype.update_mesh = function() {  
    this.mesh.position.set(this.position.x ,this.position.y ,this.position.z);
}



