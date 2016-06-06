/* 

Based on work by https://github.com/wetmore, https://github.com/mrdoob/
Modified by https://github.com/dderiso (2016) to expose alignment, separation, and cohesion as public properties 

*/

var Trial = function(i, trial_dict, max_time) {

    // depends on Vector3 
    var vector = new Vector3();
    this.position = new Vector3();

    this.direction = trial_dict["direction"];
    
    //initialize positions
    this.position.x = trial_dict["time"][0]["x"];
    this.position.y = trial_dict["time"][0]["y"];
    this.position.z = trial_dict["time"][0]["z"];


    this.run = function(time) {
        this.advance(time);
    }

    this.advance = function(time) {

        floor_x = trial_dict["time"][Math.floor(time)]["x"];
        floor_y = trial_dict["time"][Math.floor(time)]["y"];
        floor_z = trial_dict["time"][Math.floor(time)]["z"];
        ceil_x = trial_dict["time"][Math.ceil(time)]["x"];
        ceil_y = trial_dict["time"][Math.ceil(time)]["y"];
        ceil_z = trial_dict["time"][Math.ceil(time)]["z"];
        this.position.x = floor_x + (ceil_x - floor_x)*(time-Math.floor(time));
        this.position.y = floor_y + (ceil_y - floor_y)*(time-Math.floor(time));
        this.position.z = floor_z + (ceil_z - floor_z)*(time-Math.floor(time));

    }

}
