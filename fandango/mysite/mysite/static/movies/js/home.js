// fetchData
function fetchData(cb) {
    $.get("/api/?" + $.param(window.mysite.params))
        .done(cb)
        .fail(function(){
            console.log("Could not load data");
            alert("Could not load data");
        });
}

function handleDataLoaded(data) {
    window.mysite.data = data
    $('#raw-json').text(JSON.stringify(data, null, '  '));
    if (window.mysite.mapReady) {
        window.mysite.render();
    }
    if (window.mysite.barReady) {
        window.mysite.renderBar();
    }
}

// watchSelections adds event handlers to track changes users make to selections
// on the page and fetch new data.
function watchSelections() {
    var countrySel = $('#sel-country');
    var categorySel = $('#sel-category');
    var genderSel = $('#sel-gender');

    function updateSelections() {
        var params = window.mysite.params || {};
        params.country = countrySel.val();
        params.category = categorySel.val();
        params.gender = genderSel.val();
        window.mysite.params = params;
        fetchData(handleDataLoaded);
    }

    countrySel.on('change', updateSelections);
    categorySel.on('change', updateSelections);
    genderSel.on('change', updateSelections);
    updateSelections();
}

$(function() {
    // Create a global var to hold our data & state
    window.mysite = {};

    // Update our data based on what's selected
    watchSelections();

    // initMap is from map.js
    initMap(window.mysite);

    // initBar is from bar.js
    initBar(window.mysite);
})
