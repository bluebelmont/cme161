



var hist = function(data_in, chart_id, value, chart_title) {

  var margin = {
    "top": 30,
    "right": 30,
    "bottom": 50,
    "left": 30
  },
  width = 600 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;

  var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, width]);

  var y = d3.scale.linear()
  .domain([0, d3.max(data_in, function(d) {
    return d.value[value];
  })])
  .range([height, 0]);

  //get rid of old chart
  d3.select("#" + chart_id).remove();
  //create it again, add title
  var div = d3.select("#baseball").append("div").attr("id", chart_id);
  div.append("h2").text(chart_title);

  var svg = div.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = svg.selectAll(".bar")
  .data(data_in)
  .enter()
  .append("g")
  .attr("class", "bar")
  .attr("transform", function(d, i) {
    return "translate(" + x(i / data_in.length) + "," + y(d.value[value]) + ")";
  });

  bar.append("rect")
  .attr("x", 1)
  .attr("width", width / data_in.length - 1)
  .attr("height", function(d) {
    return height - y(d.value[value]);
  });

  var formatCount = d3.format(",.0f");

  var unique_names = data_in.map(function(d) {
    return d.key;
  });

  var xScale = d3.scale.ordinal().domain(unique_names).rangePoints([0, width]);

  var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

  var xTicks = svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("font-size", 10)
  .attr("transform", function(d) {
    return "rotate(-50)"
  });


  var yAxis = d3.svg.axis()
  .ticks(5)
  .scale(y)
  .orient("left");

  svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0,0)")
  .call(yAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("font-size", 10);
}

//var my_data = [{"team_id": "BL1", "g_all": 13, "player_id": "hastisc01", "year": 1872}, {"team_id": "BL1", "g_all": 42, "player_id": "cummica01", "year": 1873}, {"team_id": "BL4", "g_all": 1, "player_id": "johnsto01", "year": 1873}, {"team_id": "ELI", "g_all": 22, "player_id": "fleetfr01", "year": 1873}, {"team_id": "NY2", "g_all": 65, "player_id": "highadi01", "year": 1874}, {"team_id": "CH2", "g_all": 39, "player_id": "goldemi01", "year": 1875}, {"team_id": "KEO", "g_all": 13, "player_id": "simmojo01", "year": 1875}, {"team_id": "PH3", "g_all": 3, "player_id": "fieldsa01", "year": 1875}, {"team_id": "SL2", "g_all": 13, "player_id": "galvipu01", "year": 1875}, {"team_id": "SL2", "g_all": 70, "player_id": "pearcdi01", "year": 1875}, {"team_id": "CHN", "g_all": 64, "player_id": "hinespa01", "year": 1876}, {"team_id": "LS1", "g_all": 61, "player_id": "devliji01", "year": 1877}, {"team_id": "TRN", "g_all": 6, "player_id": "larkite01", "year": 1880}, {"team_id": "WOR", "g_all": 85, "player_id": "irwinar01", "year": 1880}, {"team_id": "BFN", "g_all": 54, "player_id": "peterjo01", "year": 1881}, {"team_id": "CHN", "g_all": 80, "player_id": "flintsi01", "year": 1881}, {"team_id": "TRN", "g_all": 40, "player_id": "welchmi01", "year": 1881}, {"team_id": "LS2", "g_all": 2, "player_id": "jonesja01", "year": 1883}, {"team_id": "BL2", "g_all": 4, "player_id": "goldsfr01", "year": 1884}, {"team_id": "BLU", "g_all": 6, "player_id": "stanljo01", "year": 1884}, {"team_id": "CL2", "g_all": 9, "player_id": "henryjo01", "year": 1884}, {"team_id": "CNU", "g_all": 29, "player_id": "schwabi01", "year": 1884}, {"team_id": "KCU", "g_all": 5, "player_id": "luffhe01", "year": 1884}, {"team_id": "PHU", "g_all": 67, "player_id": "mccorje01", "year": 1884}, {"team_id": "PT1", "g_all": 8, "player_id": "foxjo01", "year": 1884}, {"team_id": "SL4", "g_all": 40, "player_id": "mcginju01", "year": 1884}, {"team_id": "WSU", "g_all": 20, "player_id": "lockwmi01", "year": 1884}, {"team_id": "PH4", "g_all": 7, "player_id": "vintobi01", "year": 1885}, {"team_id": "BR3", "g_all": 8, "player_id": "schripo01", "year": 1886}, {"team_id": "KCN", "g_all": 122, "player_id": "mcquemo01", "year": 1886}, {"team_id": "IN3", "g_all": 8, "player_id": "leitndo01", "year": 1887}, {"team_id": "LS2", "g_all": 37, "player_id": "chambel01", "year": 1887}, {"team_id": "NY1", "g_all": 1, "player_id": "wiedmst01", "year": 1887}, {"team_id": "CHN", "g_all": 75, "player_id": "sullima01", "year": 1888}, {"team_id": "DTN", "g_all": 45, "player_id": "conwape01", "year": 1888}, {"team_id": "LS2", "g_all": 1, "player_id": "crowebi01", "year": 1888}, {"team_id": "LS2", "g_all": 83, "player_id": "kerinjo01", "year": 1888}, {"team_id": "NY1", "g_all": 90, "player_id": "whitnar01", "year": 1888}, {"team_id": "SL4", "g_all": 63, "player_id": "millijo01", "year": 1888}, {"team_id": "CHN", "g_all": 136, "player_id": "duffyhu01", "year": 1889}, {"team_id": "CN2", "g_all": 135, "player_id": "tebeage01", "year": 1889}, {"team_id": "PH4", "g_all": 131, "player_id": "lyonsde01", "year": 1889}, {"team_id": "BL3", "g_all": 8, "player_id": "orourmi01", "year": 1890}, {"team_id": "BRP", "g_all": 12, "player_id": "hayesja01", "year": 1890}, {"team_id": "CHP", "g_all": 58, "player_id": "kingsi01", "year": 1890}, {"team_id": "NY1", "g_all": 32, "player_id": "sharrja01", "year": 1890}, {"team_id": "SR2", "g_all": 41, "player_id": "orourto01", "year": 1890}, {"team_id": "BL3", "g_all": 8, "player_id": "oconnjo01", "year": 1891}, {"team_id": "BSN", "g_all": 55, "player_id": "clarkjo01", "year": 1891}, {"team_id": "CHN", "g_all": 8, "player_id": "nagleto01", "year": 1891}, {"team_id": "CL4", "g_all": 5, "player_id": "beatied01", "year": 1891}, {"team_id": "CL6", "g_all": 17, "player_id": "donneji01", "year": 1891}, {"team_id": "BLN", "g_all": 56, "player_id": "wardpi01", "year": 1892}, {"team_id": "CIN", "g_all": 12, "player_id": "rhinebi01", "year": 1892}, {"team_id": "BRO", "g_all": 3, "player_id": "craneed01", "year": 1893}, {"team_id": "NY1", "g_all": 1, "player_id": "howesh01", "year": 1893}, {"team_id": "NY1", "g_all": 1, "player_id": "sigsbse01", "year": 1893}, {"team_id": "PIT", "g_all": 2, "player_id": "grayji01", "year": 1893}, {"team_id": "SLN", "g_all": 14, "player_id": "twinear01", "year": 1893}, {"team_id": "BLN", "g_all": 124, "player_id": "mcgrajo01", "year": 1894}, {"team_id": "CL4", "g_all": 125, "player_id": "burkeje01", "year": 1894}, {"team_id": "PIT", "g_all": 30, "player_id": "weavefa01", "year": 1894}, {"team_id": "CIN", "g_all": 37, "player_id": "dwyerfr01", "year": 1895}, {"team_id": "NY1", "g_all": 5, "player_id": "butlefr01", "year": 1895}, {"team_id": "PHI", "g_all": 49, "player_id": "reillch02", "year": 1895}, {"team_id": "SLN", "g_all": 1, "player_id": "donahre01", "year": 1895}, {"team_id": "BLN", "g_all": 118, "player_id": "doyleja01", "year": 1896}, {"team_id": "NY1", "g_all": 64, "player_id": "davisha01", "year": 1896}, {"team_id": "SLN", "g_all": 81, "player_id": "douglkl01", "year": 1896}, {"team_id": "WSN", "g_all": 4, "player_id": "flynnca01", "year": 1896}, {"team_id": "BLN", "g_all": 33, "player_id": "pondar01", "year": 1897}, {"team_id": "PHI", "g_all": 5, "player_id": "johnsyo01", "year": 1897}, {"team_id": "CIN", "g_all": 1, "player_id": "goarjo01", "year": 1898}, {"team_id": "CL4", "g_all": 106, "player_id": "mcaleji01", "year": 1898}, {"team_id": "CHN", "g_all": 39, "player_id": "griffcl01", "year": 1899}, {"team_id": "WSN", "g_all": 2, "player_id": "killefr01", "year": 1899}, {"team_id": "BRO", "g_all": 46, "player_id": "mcginjo01", "year": 1900}, {"team_id": "CIN", "g_all": 87, "player_id": "irwinch01", "year": 1900}, {"team_id": "CHA", "g_all": 133, "player_id": "jonesfi01", "year": 1901}, {"team_id": "CLE", "g_all": 37, "player_id": "connojo03", "year": 1901}, {"team_id": "DET", "g_all": 31, "player_id": "cronija01", "year": 1901}, {"team_id": "NY1", "g_all": 125, "player_id": "selbaki01", "year": 1901}, {"team_id": "PIT", "g_all": 26, "player_id": "pooleed01", "year": 1901}, {"team_id": "PHA", "g_all": 1, "player_id": "bernhbi01", "year": 1902}, {"team_id": "PHA", "g_all": 1, "player_id": "porteod01", "year": 1902}, {"team_id": "PHI", "g_all": 3, "player_id": "sheana01", "year": 1902}, {"team_id": "PIT", "g_all": 42, "player_id": "zimmech01", "year": 1902}, {"team_id": "SLA", "g_all": 14, "player_id": "reidybi01", "year": 1902}, {"team_id": "SLA", "g_all": 133, "player_id": "wallabo01", "year": 1902}, {"team_id": "BSN", "g_all": 122, "player_id": "tennefr02", "year": 1903}, {"team_id": "DET", "g_all": 78, "player_id": "mcallsp01", "year": 1903}, {"team_id": "NY1", "g_all": 12, "player_id": "mcgrajo01", "year": 1903}, {"team_id": "BRO", "g_all": 28, "player_id": "batchem01", "year": 1904}, {"team_id": "CHA", "g_all": 102, "player_id": "donahji02", "year": 1904}, {"team_id": "NYA", "g_all": 97, "player_id": "fultzda01", "year": 1904}, {"team_id": "PHA", "g_all": 36, "player_id": "henlewe01", "year": 1904}, {"team_id": "SLN", "g_all": 3, "player_id": "mcginji01", "year": 1904}, {"team_id": "BOS", "g_all": 1, "player_id": "owensfr01", "year": 1905}, {"team_id": "NY1", "g_all": 34, "player_id": "amesre01", "year": 1905}, {"team_id": "NYA", "g_all": 115, "player_id": "yeagejo01", "year": 1905}];

d3.json("https://tranquil-peak-82564.herokuapp.com/api/v1.0/data/baseball/limit/100/",
  function(error, games_json) {

    var cf = crossfilter(games_json);
    var dim_team = cf.dimension(function(d) {
      return d.team_id;
    });
    var dim_year = cf.dimension(function(d) {
      return d.year;
    });
    var dim_player = cf.dimension(function(d) {
      return d.player_id;
    });
    var dim_ngames = cf.dimension(function(d) {
      return d.g_all;
    });

    var group_team = dim_team.group();
    var group_player = dim_player.group();
    var group_year = dim_year.group();




    var reduce_init = function() {
      return {
        "count": 0,
        "total": 0,
        "min_year": Infinity,
        "max_year": 0,
        "all_years": []
      };
    }

    var reduce_add = function(p, v, nf) {
      ++p.count;
      p.total += v.g_all;
      if (p.max_year < v.year) {
        p.max_year = v.year;
      }
      if (p.min_year > v.year) {
        p.min_year = v.year;
      }
      p.all_years.push(v.year); // store an array
      return p;
    }

    var reduce_remove = function(p, v, nf) {
      --p.count;
      p.total -= v.g_all;
      p.all_years.splice(p.all_years.indexOf(v.year), 1); // remove year
      p.max_year = Math.max.apply(null, p.all_years); // get max over array
      p.min_year = Math.min.apply(null, p.all_years); // get min over array
      return p;
    }

    /* --------------------------------------------------------- */


    group_team.reduce(reduce_add, reduce_remove, reduce_init);
    group_year.reduce(reduce_add, reduce_remove, reduce_init);
    group_player.reduce(reduce_add, reduce_remove, reduce_init);




    var render_plots = function() {
      // count refers to a specific key specified in reduce_init 
      // and updated in reduce_add and reduce_subtract
      // Modify this for the chart to plot the specified variable on the y-axis
      hist(group_team.top(Infinity),
        "cf_appearances_by_team",
        "count",
        "# of Appearances by Team"
        );

      hist(group_team.top(Infinity),
        "cf_total_by_team",
        "total",
        "Total by Team"
        );

      hist(group_year.top(Infinity),
        "cf_appearances_by_year",
        "count",
        "# of Appearances by Year"
        );

      hist(group_year.top(Infinity),
        "cf_total_by_year",
        "total",
        "Total by year"
        );

      /* build more charts here */

    }


    /* --------------------------------------------------------- 
       this is a slider, see the html section above
       */
       var n_games_slider = new Slider(
        "#cf_n_games_slider", {
          "id": "cf_n_games_slider",
          "min": 0,
          "max": 100,
          "range": true,
          "value": [0, 100]
        });

       var year_slider = new Slider(
        "#cf_year_slider", {
          "id": "cf_year_slider",
          "min": 1870,
          "max": 1910,
          "range": true,
          "value": [1870, 1910]
        });

       var player_filter = document.getElementById("cf_playerSearch");
       player_filter.onkeyup = function() {
        dim_player.filter(function(d) {
          return d.includes(player_filter.value);
        })
        render_plots();
      };

      var team_filter = document.getElementById("cf_teamSearch");
      team_filter.onkeyup = function() {
        dim_team.filter(function(d) {
          return d.includes(team_filter.value);
        })
        render_plots();
      };




      /* add at least 3 more sliders here */

    // this is an event handler for a particular slider
    n_games_slider.on("slide", function(e) {
      d3.select("#cf_n_games_slider_txt").text("min: " + e[0] + ", max: " + e[1]);

      // filter based on the UI element
      dim_ngames.filter(e);

      // re-render
      render_plots();

      /* update the other charts here 
       hint: each one of your event handlers needs to update all of the charts
       */

     });

    year_slider.on("slide", function(e) {
      d3.select("#cf_year_slider_text").text("min: " + e[0] + ", max: " + e[1]);

      // filter based on the UI element
      dim_year.filter(e);

      // re-render
      render_plots();

      /* update the other charts here 
       hint: each one of your event handlers needs to update all of the charts
       */

     });

    render_plots(); // this just renders the plots for the first time

  });

console.log("load_success");
