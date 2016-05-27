var Tea = function() {
  this.data = {
    "name": "Tea",
    "children": [{
      "name": "White",
      "children": [{
        "name": "Silver Needle",
        "price": 6.5
      }, {
        "name": "White Peony",
        "price": 5.3
      }, {
        "name": "Long Life Eyebrow",
        "price": 4.1
      }, {
        "name": "Tribute Eyebrow",
        "price": 4.5
      }]
    }, {
      "name": "Green",
      "children": [{
        "name": "Chinese",
        "children": [{
          "name": " Gunpowder",
          "price": 1.3
        }, {
          "name": "Dragonwell",
          "price": 1.3
        }, {
          "name": "Green Snail Spring",
          "price": 1.2
        }, {
          "name": "Snowy Mountain Jian",
          "price": 5.2
        }, {
          "name": "Hyson Lucky Dragon",
          "price": 3.5
        }, {
          "name": "Kai Hua Long Ding",
          "price": 1.2
        }, {
          "name": "Tian Mu Qing Ding",
          "price": 1.2
        }, {
          "name": "Xin Yang Mao Jian",
          "price": 1.1
        }, {
          "name": "Hou Kui",
          "price": 6.4
        }]
      }, {
        "name": "Japanese",
        "children": [{
          "name": "Gyokuro",
          "price": 3.5
        }, {
          "name": "Sencha",
          "price": 2.5
        }, {
          "name": "Bancha",
          "price": 1.4
        }, {
          "name": "Matcha",
          "price": 4.6
        }, {
          "name": "Houjicha",
          "price": 1.2
        }, {
          "name": "Kukicha",
          "price": 7.3
        }, {
          "name": "Genmaicha",
          "price": .75
        }]
      }]
    }, {
      "name": "Oolong",
      "children": [{
        "name": "Ti Kuan Yin",
        "price": 2.4
      }, {
        "name": "Pouchong",
        "price": 4.6
      }, {
        "name": "Tung Ting",
        "price": 1.3
      }, {
        "name": "Formosa Oolong",
        "price": 2.4
      }, {
        "name": "Darjeeling Oolong",
        "price": 4.3
      }]
    }, {
      "name": "Black",
      "children": [{
        "name": "Chinese",
        "children": [{
          "name": "Yunnan",
          "price": 2.4
        }, {
          "name": "Keemun",
          "price": 3.2
        }, {
          "name": "Lapsang Souchong",
          "price": 2.6
        }, {
          "name": "Black Dragon",
          "price": 2.4
        }]
      }, {
        "name": "Indian",
        "children": [{
          "name": "Darjeeling",
          "price": 2.4
        }, {
          "name": "Assam",
          "price": 4.4
        }, {
          "name": "Nilgiri",
          "price": 2.4
        }]
      }, {
        "name": "Sri Lankan",
        "children": [{
          "name": "Ceylon Black Tea",
          "price": 6.5
        }]
      }]
    }]
  };
};


var tea = (new Tea()).data;


var height = 1000,
width = 1000;

var svg = d3
.select("#d3_hierarchy")
.append("svg")
.attr("height", height)
.attr("width", width)
.append("g")
.attr("transform", "translate(50,0)");

var tree = d3
.layout
.tree()
.size([height, width - 150]);

var diagonal = d3
.svg
.diagonal()
.projection(function(d) {
  return [d.y, d.x];
});

var search_price = 2.5;

var depthCount = function(branch) {
  if (!branch.children) {
    return 1;
  }
  return 1 + d3.max(branch.children.map(depthCount));
}

var max_depth = depthCount(tea);

var max_size = 10;

var scale = d3.scale.pow()
.domain([1, max_depth])
.range([max_size, 1]);

function findInPath(source, text) {
  if (source.price && source.price < search_price) {
    return true;
  } else if (source.children || source._children) {
    var c = source.children ? source.children : source._children;
    for (var i = 0; i < c.length; i++) {
      if (findInPath(c[i], text)) {
        return true;
      }
    }
  }
  return false;
}

var linkFilter = function(d) {
  return findInPath(d.target, search_price)
}


tea.x0 = height / 2;
tea.y0 = 0;

var i = 0;
var duration = 750;

update(tea);

function update(source) {

  var nodes = tree.nodes(tea);
  var links = tree.links(nodes);

  var node = svg.selectAll("g.node")
  .data(nodes, function(d) {
    return d.id || (d.id = ++i);
  });

  var nodeEnter = node
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", function(d) {
    return "translate(" + source.y0 + "," + source.x0 + ")";
  })
  .on("click", click);

  nodeEnter.append("circle")
  .attr("r", 1e-6)
  .style("stroke", "steelblue")
  .style("stroke-width", "1.5px");

  nodeEnter.append("text")
  .attr("x", function(d) {
    return d.children || d._children ? -13 : 13;
  })
  .attr("dy", ".35em")
  .attr("text-anchor", function(d) {
    return d.children || d._children ? "end" : "start";
  })
  .text(function(d) {
    return d.name;
  })
  .style("fill-opacity", 1e-6)
  .style("font", "10px sans-serif")
  .style("fill", "black")
  .style("stroke-width", ".01px");



  var nodeUpdate = node.transition()
  .duration(duration)
  .attr("transform", function(d) {
    return "translate(" + d.y + "," + d.x + ")";
  })





  nodeUpdate.select("circle")
  .attr("r", function(d) {
    return scale(d.depth);
  })
  .style("fill", function(d) {
    return d._children ? "lightsteelblue" : "white";
  })
  .style("stroke", "steelblue")
  .style("stroke-width", "1.5px");

  nodeUpdate.select("circle")
  .filter(function(d) {
    return findInPath(d, search_price)
  })
  .style("fill", function(d) {
    return d._children ? "green" : "#98fb98";
  });

  nodeUpdate.select("circle")
  .filter(function(d) {
    return !findInPath(d, search_price)
  })
  .style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
  });

  nodeUpdate.select("text")
  .style("fill-opacity", 1)
  .style("font", "10px sans-serif")
  .style("fill", "black")
  .style("stroke-width", ".01px");


  var nodeExit = node.exit().transition()
  .duration(duration)
  .attr("transform", function(d) {
    return "translate(" + source.y + "," + source.x + ")";
  })
  .remove();

  nodeExit.select("circle")
  .attr("r", 1e-6);

  nodeExit.select("text")
  .style("fill-opacity", 1e-6);


  var link = svg.selectAll("path.link")
  .data(links, function(d) {
    return d.target.id;
  });

  link.enter().insert("path", "g")
  .attr("class", "link")
  .attr("d", function(d) {
    var o = {
      x: source.x0,
      y: source.y0
    };
    return diagonal({
      source: o,
      target: o
    });
  })
  .style("fill", "none")
  .style("stroke-width", "1.5px");

  link.transition()
  .duration(duration)
  .attr("d", diagonal);

  link.exit().transition()
  .duration(duration)
  .attr("d", function(d) {
    var o = {
      x: source.x,
      y: source.y
    };
    return diagonal({
      source: o,
      target: o
    });
  })
  .remove();

  link.filter(linkFilter).style("stroke", "green");
  link.filter(function(d) {
    return !linkFilter(d);
  }).style("stroke", "ccc");

  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
