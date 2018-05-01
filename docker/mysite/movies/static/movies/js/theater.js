// Global container for movie data
window.movies = {
    params: {},
    data: {},
    genres:[]

};



function fetchData2() {
  $.getJSON('https://raw.githubusercontent.com/aryaswanie/583-final/master/fandango/mysite/data.json', function(data) {
      window.movies.data = data;

      console.log(window.movies.data[0]["theaters"][0]["movies"][0]["genres"][0]);
