$(document).ready(function () {
    $('#searchForm').submit(function (e) {
        e.preventDefault();
        const searchText = $('#searchText').val();
        const searchPage = $('#searchPage').val();
        getMovies(searchText,searchPage);
    });
});

/*************************************************************************/

function getMovies(searchText,searchPage) {
    $.get(`https://www.omdbapi.com/?apikey=16b8dca2&s=${searchText}&page=${searchPage}`, function (data, textStatus, jqXHR) {

        $('#movies').html('');
        $.each(data.Search, function (i, ele) {
            let card = $(`
             <div class="col-md-3 mb-3">
             <div class="card" style="height:100%">
             <img src="${ele.Poster}" class="card-img-top img-fluid" alt="Poster">
             <div class="card-body">
               <h5 class="card-title">${ele.Title}</h5>
               <a class="btn btn-primary" href="#" onclick="movieSelected('${ele.imdbID}')">Movie Details</a>
             </div>
           </div>
           </div>
             
             `);
            $('#movies').append(card);
        });
    });
}

/********/

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    location.href = `movie.html`;
    return false;
}
/********/
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    $.get(`https://www.omdbapi.com/?apikey=16b8dca2&i=${movieId}`, function (data) {

        $('#movie').html('');

        let movieRow = $(`
        <div class="card-body">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <img src="${data.Poster}" class="img-thumbnail" />
                </div>
                <div class="col-md-8 mb-3">
                    <div class="card">
                        <div class="card-header">
                            <h2>${data.Title}</h2>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Genre:</b> ${data.Genre}</li>
                            <li class="list-group-item"><b>Released:</b> ${data.Released}</li>
                            <li class="list-group-item"><b>Rated:</b> ${data.Rated}</li>
                            <li class="list-group-item"><b>IMDB Rating:</b> ${data.imdbRating}/10</li>
                            <li class="list-group-item"><b>IMDB Votes:</b> ${data.imdbVotes}</li>
                            <li class="list-group-item"><b>BoxOffice:</b> ${data.BoxOffice}</li>
                            <li class="list-group-item"><b>Director:</b> ${data.Director}</li>
                            <li class="list-group-item"><b>Writer:</b> ${data.Writer}</li>
                            <li class="list-group-item"><b>Actors:</b> ${data.Actors}</li>
                            <li class="list-group-item"><b>Awards:</b> ${data.Awards}</li>
                            <li class="list-group-item"><b>Production:</b> ${data.Production}</li>
                            <li class="list-group-item"><b>Language:</b> ${data.Language}</li>
                            <li class="list-group-item"><b>Country:</b> ${data.Country}</li>
                        </ul>
                    </div>
                </div>
           </div>
           <div class="row">
                <div class="card w-100">
                    <div class="card-body">
                        <h3>Plot</h3>
                        <p>${data.Plot}</p>
                        <hr>
                        <a href="https://www.imdb.com/title/${movieId}" class="btn btn-primary" target="_blank">View IMDB</a>
                        <a href="index.html" class="btn btn-success" >Go Back To Search</a>
                    </div>
                </div>
           </div>
        </div>
        `);

        $('#movie').append(movieRow);

    });
}
