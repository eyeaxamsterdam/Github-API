'use strict';

function displayResults(responseJson) {
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    for (let i = 0; i < responseJson.length; i++){
        console.log(responseJson[i].name);
        $('#results-list').append(
        `<li><h3>${responseJson[i].name}</h3>
        <p><a href="${responseJson[i].html_url}" target="_blank">link</a></p></li>`);
    } 
} 





function getRepos(search) {
    fetch(`https://api.github.com/users/${search}/repos?sort=updated`)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}






function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userSearch = $('#js-search-term').val();
      getRepos(userSearch);
    });
  }
  
  $(watchForm);