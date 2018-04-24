  // Global container for our movie data
window.movies = {
    params: {}
};

// fetchData
function fetchData() {
    $.get("/api/?" + $.param(window.movies.params))
        .done(function(data) {
            $('#raw-json').text(JSON.stringify(data, null, '  '));
            // Add data to global container
            window.movies.data = data;
            // Re-render the bar chart
            window.movies.bar.render();
        })
        .fail(function(){
            console.log("Could not load data");
            alert("Could not load data");
        });
}

// init wires up watchers on selections and fetches new data
function init(){
    var countrySel = $('#sel-country');
    var categorySel = $('#sel-category');
    var genderSel = $('#sel-gender');

    function updateSelections() {
        var params = window.movies.params || {};
        params.country = countrySel.val();
        params.category = categorySel.val();
        params.gender = genderSel.val();
        fetchData();
    }

    // Initialize bar chart
    initBar(window.movies);

    countrySel.on('change', updateSelections);
    categorySel.on('change', updateSelections);
    genderSel.on('change', updateSelections);
    updateSelections();
}

// Call init on DOMReady
$(init);
