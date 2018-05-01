// create a global container for data
window.movies = {
    params: {},
    data: {},
    number:[],
    number2:[],
    number3:[],
    name:[],
    name2:[],
    name3:[],
    all_names:[],
    all_numbers:[]
};


//fetch data and pass data to the list
function fetchData2() {
  $.getJSON('https://raw.githubusercontent.com/aryaswanie/583-final/master/fandango/mysite/data.json', function(data) {
      window.movies.data = data;
      console.log(window.movies.data);
      console.log(window.movies.data[28]["lat"]);

      var movie_number = []
      for (i = 0; i < window.movies.data[0]["theaters"].length; i++){
        try {
        var tempMovieCount = window.movies.data[0]["theaters"][i]["movies"].length;
        movie_number.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }
      window.movies.number = movie_number;


      var movie_number2 = []
      for (i = 0; i < window.movies.data[1]["theaters"].length; i++){
        try {
        var tempMovieCount = window.movies.data[1]["theaters"][i]["movies"].length;
        movie_number2.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }
      window.movies.number2 = movie_number2;


      var movie_number3 = []
      for (i = 0; i < window.movies.data[2]["theaters"].length; i++){
        try {
        var tempMovieCount = window.movies.data[2]["theaters"][i]["movies"].length;
        movie_number3.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }
      window.movies.number3 = movie_number3;

      var theater_number = []
      var Length = window.movies.data[0]["theaters"].length
      for (i = 0; i < Length-1; i++) {
        try {
        var tempMovieCount = window.movies.data[0]["theaters"][i]["name"];
        theater_number.push(tempMovieCount)
        console.log(tempMovieCount);
        }
        catch(err) {
              console.log("error");
          }
      }



      var theater_number2 = []
      for (i = 0; i < window.movies.data[1]["theaters"].length; i++) {
        try {
        var tempMovieCount = window.movies.data[1]["theaters"][i]["name"];
        theater_number2.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }

      var theater_number3 = []
      for (i = 0; i < window.movies.data[2]["theaters"].length; i++) {
        try {
        var tempMovieCount = window.movies.data[2]["theaters"][i]["name"];
        theater_number3.push(tempMovieCount)
        }
        catch(err) {
              console.log("error");
          }
      }

      window.movies.name = theater_number;
      window.movies.name2 = theater_number2;
      window.movies.name3 = theater_number3;


      //remove duplicates
      window.movies.name.splice(2,4)
      window.movies.name.splice(3,1)
      window.movies.name2.splice(9,1)
      window.movies.name2.splice(3,1)
      window.movies.name3.splice(5,1)
      window.movies.name2.splice(2,1)
      window.movies.name2.splice(3,1)
      window.movies.number.splice(2,4)
      window.movies.number.splice(3,1)
      window.movies.number2.splice(9,1)
      window.movies.number2.splice(3,1)
      window.movies.number2.splice(2,1)
      window.movies.number2.splice(3,1)

      //the last one theater that's not playing anything
      window.movies.number3.push(0)

      console.log(window.movies.name3);
      console.log(window.movies.number3);


      window.movies.all_names = window.movies.name.concat(window.movies.name2, window.movies.name3);
      window.movies.all_numbers = window.movies.number.concat(window.movies.number2, window.movies.number3);

      //run functions
      fillMap();
      fillBar();
      fillBar2();
      fillBar3();
      fillPie();
  });
}



//codes from google map api
var map;

function initMap() {
  console.log("initMap function");
  var mid_NC = {lat: 35.900, lng: -78.800};
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: mid_NC
    });
   fetchData2();
}


function init(){
  console.log("init function");
  initMap();
  }




function fillMap() {

//Chapel Hill
//loop to get data from json file
  for (i = 0; i < window.movies.data[0]["theaters"].length; i++){
  var name = window.movies.data[0]["theaters"][i]["name"];
  var id = window.movies.data[0]["theaters"][i]["id"];
  var city = window.movies.data[0]["theaters"][i]["id"];
  var lat = window.movies.data[0]["theaters"][i]["geo"]["latitude"];
  var lng = window.movies.data[0]["theaters"][i]["geo"]["longitude"];
  var address = window.movies.data[0]["theaters"][i]["address1"];
  var phone = window.movies.data[0]["theaters"][i]["phone"];
  var url = "https://www.fandango.com/"+window.movies.data[0]["theaters"][i]["theaterPageUrl"];
  //make markers using the data
  var marker = new google.maps.Marker({
      position: {lat, lng},
      map:map,
      content:'<div id="content" style="font-size: 20px;"><a href="/movies/theaters/' + id + '"><h2>'+name+'</h2>'+address+'<br>'+phone+'</div>',
  })
  var infoWindow = new google.maps.InfoWindow({
      maxWidth: 300,
      maxHeight: 300
    })
  //codes from StackOverflow  H.M.
  //create mouseover effects
  marker.addListener('mouseover', function() {
  infoWindow.setContent(this.content);
  infoWindow.open(this.getMap(), this);
  });

  }

//Durham
for (i = 0; i < window.movies.data[1]["theaters"].length; i++){
  var name = window.movies.data[1]["theaters"][i]["name"];
  var id = window.movies.data[1]["theaters"][i]["id"];
  var city = window.movies.data[1]["theaters"][i]["id"];
  var lat = window.movies.data[1]["theaters"][i]["geo"]["latitude"];
  var lng = window.movies.data[1]["theaters"][i]["geo"]["longitude"];
  var url = "https://www.fandango.com/"+window.movies.data[1]["theaters"][i]["theaterPageUrl"];
  var marker = new google.maps.Marker({
      position: {lat, lng},
      map:map,
      content:'<div id="content" style="font-size: 20px;"><a href="/movies/theaters/' + id + '"><h2>'+name+'</h2>'+address+'<br>'+phone+'</div>',
  })

  var infoWindow = new google.maps.InfoWindow({
      maxWidth: 300,
      maxHeight: 300
    })
  marker.addListener('mouseover', function() {
  infoWindow.setContent(this.content);
  infoWindow.open(this.getMap(), this);
  });

  }

//Raleigh
  for (i = 0; i < window.movies.data[2]["theaters"].length; i++){
    var name = window.movies.data[2]["theaters"][i]["name"];
    var id = window.movies.data[2]["theaters"][i]["id"];
    var city = window.movies.data[2]["theaters"][i]["id"];
    var lat = window.movies.data[2]["theaters"][i]["geo"]["latitude"];
    var lng = window.movies.data[2]["theaters"][i]["geo"]["longitude"];
    var url = "https://www.fandango.com/"+window.movies.data[2]["theaters"][i]["theaterPageUrl"];
    var marker = new google.maps.Marker({
        position: {lat, lng},
        map:map,
        content:'<div id="content" style="font-size: 20px;"><a href="/movies/theaters/' + id + '"><h2>'+name+'</h2>'+address+'<br>'+phone+'</div>',
    })
    var infoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
        maxHeight: 300
      })
    marker.addListener('mouseover', function() {
    infoWindow.setContent(this.content);
    infoWindow.open(this.getMap(), this);
    });

    }
}


///tutorial from D3.js Essential Training for Data Scientists by Emma Saunders on Lynda.com
//Theater Movies
function fillBar(){
  //select the tag
  var svgContainer = d3.select("#movie-bar");
  //append svg
  var svg = d3.select("#movie-bar").append("svg").attr("height","100%").attr("width","100%");
  var chart = svg.append("g");
  //svg size
  svg.attr('width', '100%')
      .attr('height', 300);
  var boundingRect = svgContainer.node().getBoundingClientRect();
  var width = boundingRect.width;
  var height = boundingRect.height;
  //create scales
  var x = d3.scaleLinear()
              .domain([0,18])
              .range([0,290]);

  var y = d3.scaleLinear()
              .domain([0,180])
              .range([0,width]);
  var margin = {left:50,right:50,top:40,bottom:0};
  var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
  var xAxis = d3.axisLeft(y)
  var yAxis = d3.axisBottom(x);

  //draw bars
  svg.selectAll("rect")
        .data(window.movies.number)
        .enter().append("rect")
                  .attr("height",30 )
                  .attr("width",function(d,i){ return d*16;})
                  .attr("fill","#98abc6")
                  .attr("y",function(d,i){ return 100+50*i; })
                  .attr("x",50 );

//append scale
      chartGroup.append("g")
            .attr("class","axis y")
            .call(yAxis);



//create thearter names
      var textArray = window.movies.name;
      svg.append("text").selectAll("tspan")
          .data(textArray)
          .enter().append("tspan")
            .attr("y",function(d,i){ return 115+50*i; })
            .attr("x",400)
            .attr("fill","#8c857d")
            .attr("dominant-baseline","middle")
            .attr("text-anchor","start")
            .attr("font-size","15")
            .text(function(d){ return d; })

//create movie count numbers
          var textArray2 = window.movies.number;
          svg.append("text").selectAll("tspan")
              .data(textArray2)
              .enter().append("tspan")
                .attr("height",30 )
                .attr("width",function(d,i){ return d*16;})
                .attr("y",function(d,i){ return 115+50*i; })
                .attr("x",70 )
                .attr("fill","white")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","start")
                .attr("font-size","15")
                .text(function(d){ return d; });


              }

//make another bar for Durham
function fillBar2(){

  var svgContainer = d3.select("#movie-bar2");
  var svg = d3.select("#movie-bar2").append("svg").attr("height","100%").attr("width","100%");
  var chart = svg.append("g");
  svg.attr('width', '100%')
      .attr('height', 500);
  var boundingRect = svgContainer.node().getBoundingClientRect();
  var width = boundingRect.width;
  var height = boundingRect.height;
  var x = d3.scaleLinear()
              .domain([0,18])
              .range([0,290]);

  var y = d3.scaleLinear()
              .domain([0,180])
              .range([0,width]);
  var margin = {left:50,right:50,top:40,bottom:0};
  var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

  var xAxis = d3.axisLeft(y)
  var yAxis = d3.axisBottom(x);


  svg.selectAll("rect")
        .data(window.movies.number2)
        .enter().append("rect")
                  .attr("height",30 )
                  .attr("width",function(d,i){ return d*16;})
                  .attr("fill","#8a89a6")
                  .attr("y",function(d,i){ return 100+50*i; })
                  .attr("x",50 );


  chartGroup.append("g")
        .attr("class","axis y")
        .call(yAxis);


      var textArray = window.movies.name2;
      svg.append("text").selectAll("tspan")
          .data(textArray)
          .enter().append("tspan")
            .attr("y",function(d,i){ return 115+50*i; })
            .attr("x",400)
            .attr("fill","#8c857d")
            .attr("dominant-baseline","middle")
            .attr("text-anchor","start")
            .attr("font-size","15")
            .text(function(d){ return d; })


          var textArray2 = window.movies.number2;
          svg.append("text").selectAll("tspan")
              .data(textArray2)
              .enter().append("tspan")
                .attr("height",30 )
                .attr("width",function(d,i){ return d*16;})
                .attr("y",function(d,i){ return 115+50*i; })
                .attr("x",70 )
                .attr("fill","white")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","start")
                .attr("font-size","15")
                .text(function(d){ return d; });


              }


//create another bar for Raleigh
function fillBar3(){

  var svgContainer = d3.select("#movie-bar3");
  var svg = d3.select("#movie-bar3").append("svg").attr("height","100%").attr("width","100%");

  var chart = svg.append("g");
  svg.attr('width', '100%')
      .attr('height', 600);
  var boundingRect = svgContainer.node().getBoundingClientRect();
  var width = boundingRect.width;
  var height = boundingRect.height;
  var x = d3.scaleLinear()
              .domain([0,18])
              .range([0,290]);

  var y = d3.scaleLinear()
              .domain([0,180])
              .range([0,width]);
  var margin = {left:50,right:50,top:40,bottom:0};
  var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

  var xAxis = d3.axisLeft(y)
  var yAxis = d3.axisBottom(x);

  chartGroup.append("g")
        .attr("class","axis y")
        .call(yAxis);


  svg.selectAll("rect")
        .data(window.movies.number3)
        .enter().append("rect")
                  .attr("height",30 )
                  .attr("width",function(d,i){ return d*16;})
                  .attr("fill","#7b6787")
                  .attr("y",function(d,i){ return 100+50*i; })
                  .attr("x",50 );


      var textArray = window.movies.name3;
      svg.append("text").selectAll("tspan")
          .data(textArray)
          .enter().append("tspan")
            .attr("y",function(d,i){ return 115+50*i; })
            .attr("x",400)
            .attr("fill","#8c857d")
            .attr("dominant-baseline","middle")
            .attr("text-anchor","start")
            .attr("font-size","15")
            .text(function(d){ return d; })


          var textArray2 = window.movies.number3;
          svg.append("text").selectAll("tspan")
              .data(textArray2)
              .enter().append("tspan")
                .attr("height",30 )
                .attr("width",function(d,i){ return d*16;})
                .attr("y",function(d,i){ return 115+50*i; })
                .attr("x",70 )
                .attr("fill","white")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","start")
                .attr("font-size","15")
                .text(function(d){ return d; });


              }


//create a pie chart showing movie theater counts
  function fillPie(){
    //codes from http://zeroviscosity.com/d3-js-step-by-step/step-1-a-basic-pie-chart
    //codes from Juan Cruz-Benito (juancb)’s Block 1984c7f2b446fffeedde

    var totalCount = window.movies.name.length+window.movies.name2.length+window.movies.name3.length;

    var data = [
  { label: 'Chapel Hill', count: window.movies.name.length, percentage:((window.movies.name.length/totalCount)*100).toPrecision(3)  },
  { label: 'Durham', count: window.movies.name2.length, percentage:((window.movies.name2.length/totalCount)*100).toPrecision(3) },
  { label: 'Raleigh', count: window.movies.name3.length, percentage:((window.movies.name3.length/totalCount)*100).toPrecision(3) },
];

//define the size 
var width = 500;
var height = 500;
var radius = Math.min(width, height) / 3;
var donutWidth = 75;                            // NEW

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var svg = d3.select('#movie-pie')
.append('svg')
.attr('width', width)
.attr('height', height)
.append('g')
.attr('transform', 'translate(' + (width / 2) +
  ',' + (height / 2) + ')');


var arc = d3.arc()
.innerRadius(radius - donutWidth)             // UPDATED
.outerRadius(radius);

var pie = d3.pie()
.value(function(d) { return d.count; })
.sort(null);



var path = svg.selectAll('path')
.data(pie(data))
.enter()
.append('path')
.attr('d', arc)
.attr('fill', function(d, i) {
  return color(d.data.label);
});

var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g");

g.append("text")
    	 .attr("transform", function(d) {
         var _d = arc.centroid(d);
         _d[0] *= 1;	//multiply by a constant factor
         _d[1] *= 1;	//multiply by a constant factor
         return "translate(" + _d + ")";
       })
      .attr("dy", ".50em")
      .attr('fill','white')
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.percentage + '%';
      });


    g.append("text")
	   .attr("text-anchor", "middle")
		 .attr('font-size', '4em')
     .attr('fill','#8c857d')
		 .attr('y', 20)

	   .text(totalCount);




                }
