function initBar(config) {
    var barContainer = d3.select('#mysite-bar');
    var svg = barContainer.append('svg')
        .attr('width', "100%")
        .attr('height', 200);

    var boundingRect = barContainer.node().getBoundingClientRect();

    var containerWidth = boundingRect.width,
        containerHeight = boundingRect.height;

    var margin = {top: 10, right: 0, bottom: 80, left: 40};
    var height = containerHeight - (margin.top + margin.bottom);
    var width = containerWidth - (margin.left + margin.right);

    config.barReady = true;

    config.renderBar = function () {
        // Sort our data by number of movies
        var countries = config.data.countries.sort(function(x, y){
            return d3.descending(x.movies, y.movies);
        });

        // Get lists of country names and movie counts from the sorted data
        var cnames = config.data.countries.map(function(x){return x.alpha_code});
        var movies = config.data.countries.map(function(x){return x.movies});

        // Create a scale for our country names
        var nameScale = d3.scaleBand()
            .domain(cnames)
            .range([0, width])
            .paddingInner(0.1);

        var maxMovie = d3.max(movies);
        var movieScale = d3.scaleLinear()
            .domain([0, maxMovie])
            .range([height, 0])
            .nice(); // rounding

        var bandwidth = nameScale.bandwidth();

        // Remove the graph if it already exists
        svg.selectAll('g').remove();

        // Create a graph group to contain everything
        var graph = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top +')');

        // Create a bar group to hold the bars
        var barHolder = graph.append('g')
            .classed('bar-holder', true);

        // Draw the bars
        barHolder.selectAll('rect').remove();
        barHolder.selectAll('rect.bar')
            .data(config.data.countries)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', function(d, i) {
                return nameScale(d.alpha_code)
            })
            .attr('width', bandwidth)
            .attr('y', function(d) {
                return movieScale(d.movies);
            })
            .attr('height', function(d) {
                return height - movieScale(d.movies);
            });

        // Create X & Y axes
        var xAxis = d3.axisBottom(nameScale)
            .tickSizeOuter(0);

        var yAxis = d3.axisLeft(movieScale)
            .ticks(Math.min(10, maxMovie));

        // Add the axes to the graph in their own groups
        graph.append("g")
            .classed('x axis', true)
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        graph.append('g')
            .classed('y axis', true)
            .call(yAxis);
    }
}
