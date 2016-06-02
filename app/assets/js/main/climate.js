// C3 init

var my_data = [
  //	from http://data.okfn.org/data/core/co2-fossil-global
  ['Year', 'Emissions (million metric tons of C)'],
  [1751, 3],
  [1752, 3],
  [1753, 3],
  [1754, 3],
  [1755, 3],
  [1756, 3],
  [1757, 3],
  [1758, 3],
  [1759, 3],
  [1760, 3],
  [1761, 3],
  [1762, 3],
  [1763, 3],
  [1764, 3],
  [1765, 3],
  [1766, 3],
  [1767, 3],
  [1768, 3],
  [1769, 3],
  [1770, 3],
  [1771, 4],
  [1772, 4],
  [1773, 4],
  [1774, 4],
  [1775, 4],
  [1776, 4],
  [1777, 4],
  [1778, 4],
  [1779, 4],
  [1780, 4],
  [1781, 5],
  [1782, 5],
  [1783, 5],
  [1784, 5],
  [1785, 5],
  [1786, 5],
  [1787, 5],
  [1788, 5],
  [1789, 5],
  [1790, 5],
  [1791, 6],
  [1792, 6],
  [1793, 6],
  [1794, 6],
  [1795, 6],
  [1796, 6],
  [1797, 7],
  [1798, 7],
  [1799, 7],
  [1800, 8],
  [1801, 8],
  [1802, 10],
  [1803, 9],
  [1804, 9],
  [1805, 9],
  [1806, 10],
  [1807, 10],
  [1808, 10],
  [1809, 10],
  [1810, 10],
  [1811, 11],
  [1812, 11],
  [1813, 11],
  [1814, 11],
  [1815, 12],
  [1816, 13],
  [1817, 14],
  [1818, 14],
  [1819, 14],
  [1820, 14],
  [1821, 14],
  [1822, 15],
  [1823, 16],
  [1824, 16],
  [1825, 17],
  [1826, 17],
  [1827, 18],
  [1828, 18],
  [1829, 18],
  [1830, 24],
  [1831, 23],
  [1832, 23],
  [1833, 24],
  [1834, 24],
  [1835, 25],
  [1836, 29],
  [1837, 29],
  [1838, 30],
  [1839, 31],
  [1840, 33],
  [1841, 34],
  [1842, 36],
  [1843, 37],
  [1844, 39],
  [1845, 43],
  [1846, 43],
  [1847, 46],
  [1848, 47],
  [1849, 50],
  [1850, 54],
  [1851, 54],
  [1852, 57],
  [1853, 59],
  [1854, 69],
  [1855, 71],
  [1856, 76],
  [1857, 77],
  [1858, 78],
  [1859, 83],
  [1860, 91],
  [1861, 95],
  [1862, 97],
  [1863, 104],
  [1864, 112],
  [1865, 119],
  [1866, 122],
  [1867, 130],
  [1868, 135],
  [1869, 142],
  [1870, 147],
  [1871, 156],
  [1872, 173],
  [1873, 184],
  [1874, 174],
  [1875, 188],
  [1876, 191],
  [1877, 194],
  [1878, 196],
  [1879, 210],
  [1880, 236],
  [1881, 243],
  [1882, 256],
  [1883, 272],
  [1884, 275],
  [1885, 277],
  [1886, 281],
  [1887, 295],
  [1888, 327],
  [1889, 327],
  [1890, 356],
  [1891, 372],
  [1892, 374],
  [1893, 370],
  [1894, 383],
  [1895, 406],
  [1896, 419],
  [1897, 440],
  [1898, 465],
  [1899, 507],
  [1900, 534],
  [1901, 552],
  [1902, 566],
  [1903, 617],
  [1904, 624],
  [1905, 663],
  [1906, 707],
  [1907, 784],
  [1908, 750],
  [1909, 785],
  [1910, 819],
  [1911, 836],
  [1912, 879],
  [1913, 943],
  [1914, 850],
  [1915, 838],
  [1916, 901],
  [1917, 955],
  [1918, 936],
  [1919, 806],
  [1920, 932],
  [1921, 803],
  [1922, 845],
  [1923, 970],
  [1924, 963],
  [1925, 975],
  [1926, 983],
  [1927, 1062],
  [1928, 1065],
  [1929, 1145],
  [1930, 1053],
  [1931, 940],
  [1932, 847],
  [1933, 893],
  [1934, 973],
  [1935, 1027],
  [1936, 1130],
  [1937, 1209],
  [1938, 1142],
  [1939, 1192],
  [1940, 1299],
  [1941, 1334],
  [1942, 1342],
  [1943, 1391],
  [1944, 1383],
  [1945, 1160],
  [1946, 1238],
  [1947, 1392],
  [1948, 1469],
  [1949, 1419],
  [1950, 1630],
  [1951, 1767],
  [1952, 1795],
  [1953, 1841],
  [1954, 1865],
  [1955, 2042],
  [1956, 2177],
  [1957, 2270],
  [1958, 2330],
  [1959, 2454],
  [1960, 2569],
  [1961, 2580],
  [1962, 2686],
  [1963, 2833],
  [1964, 2995],
  [1965, 3130],
  [1966, 3288],
  [1967, 3393],
  [1968, 3566],
  [1969, 3780],
  [1970, 4053],
  [1971, 4208],
  [1972, 4376],
  [1973, 4614],
  [1974, 4623],
  [1975, 4596],
  [1976, 4864],
  [1977, 5026],
  [1978, 5087],
  [1979, 5369],
  [1980, 5315],
  [1981, 5152],
  [1982, 5113],
  [1983, 5094],
  [1984, 5280],
  [1985, 5439],
  [1986, 5607],
  [1987, 5752],
  [1988, 5965],
  [1989, 6097],
  [1990, 6127],
  [1991, 6217],
  [1992, 6164],
  [1993, 6162],
  [1994, 6266],
  [1995, 6398],
  [1996, 6542],
  [1997, 6651],
  [1998, 6643],
  [1999, 6610],
  [2000, 6765],
  [2001, 6927],
  [2002, 6996],
  [2003, 7416],
  [2004, 7807],
  [2005, 8093],
  [2006, 8370],
  [2007, 8566],
  [2008, 8783],
  [2009, 8740],
  [2010, 9167],
];


var my_chart_parameters = {
  data: {
    x: 'Year',
    "rows": my_data,
    "selection": {
      "enabled": true
    }
  },
  axis: {
    y: {
      label: { // ADD
        text: 'Carbon Emissions (million metric tons of C)',
        position: 'outer-middle'
      }
    },
    x: {
      label: { // ADD
        text: 'Year',
        position: 'center'
      }
    }
  },
  legend: {
    hide: true
  },
  point: {
    r: .01
  }
};

var my_chart_object = c3.generate(my_chart_parameters);

// slides

var slide_0 = function() {
  my_chart_object = c3.generate(my_chart_parameters);
  document.getElementById("c3_message").innerHTML = "We've been emitting a lot of carbon lately.";
};

var slide_1 = function() {
  my_chart_object.transform("area");
  document.getElementById("c3_message").innerHTML = "How much more can we emit?";
};


var slide_2 = function() {

	document.getElementById("c3_message").innerHTML = "Use of industrial fossil fuels, deforestation, and other environmental factors have all contributed to our emmisions so far.";
  my_chart_object = c3.generate({
    data: {
      columns: [
        ['Non-CO2', 770],
        ['Past Industrial Fossil Fuels', 1465],
        ["Past Land Use Change", 533]
      ],
      type: 'bar',
      selection: {
        enabled: true
      }
    },
     
    axis: {
      x: {
        label: 'Source',
				position: 'center'        
      },
      y: {
        label: 'Cumulative emission (GtCO2)',
        position: 'outer-middle'
      }
    }
  });

};

var slide_3 = function() {
	document.getElementById("c3_message").innerHTML = "If we'd like to keep the Earth within 2 degrees Celcius of pre-industrial temperatures, we cannot afford to emit much more.";
};

var slide_4 = function() {

  document.getElementById("c3_message").innerHTML = "The Center for International Climate and Environmental Research estimates modest further allowable emissions.";	

  my_chart_object = c3.generate({
    data: {
      columns: [
        ['Non-CO2', 770],
        ['Past Industrial Fossil Fuels', 1465],
        ["Past Land Use Change", 533],
        ['Future Industrial Fossil Fuels', 765],
        ["Future Land Use Change", 138]
      ],
      type: 'bar',
      selection: {
        enabled: true
      }
    },
     
    axis: {
      x: {
        label: 'Source',
        position: 'center',
      },
      y: {
        label: 'Cumulative emission (GtCO2)',
        position: 'outer-middle',
      }
    }
  });

};

var slide_5 = function() {
document.getElementById("c3_message").innerHTML = "If we pass 3670 GtCO2, we will heat our globe at least 2 degrees Celcius";
			my_chart_object.groups([
        ['Non-CO2', 'Past Industrial Fossil Fuels', "Past Land Use Change", 'Future Industrial Fossil Fuels',"Future Land Use Change"]
      ]);
      
      my_chart_object.ygrids([
  {value: 3670, text:'Total: 3670'}
]);

};

var slide_6 = function() {
	document.getElementById("c3_message").innerHTML = "We've passed the halfway point of our allowable emissions. Will we be able to keep the Earth's temperature from rising too much more?";
};

var slides = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6];

// cycle through slides

var current_slide = 0;

var run = function() {
  slides[current_slide]();
  current_slide += 1;

  if (current_slide === 1) {
    document.getElementById("c3_start_btn").innerHTML = "Start";
  } else if (current_slide === slides.length) {
    current_slide = 0;
    document.getElementById("c3_start_btn").innerHTML = "Replay";
  } else {
    document.getElementById("c3_start_btn").innerHTML = "Continue";
  }
};

// button event handler

document.getElementById('c3_start_btn').addEventListener("click", run);

// init

run();
