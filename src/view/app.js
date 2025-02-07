document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const movieForm = document.getElementById('movie-form');
    const updateForm = document.getElementById('update-form');
    const searchForm = document.getElementById('search-form');
    const searchResult = document.getElementById('search-result');

    async function fetchMovies() {
        const response = await fetch('/movies');
        const movies = await response.json();
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = `${movie.id} - ${movie.title} (${movie.releaseyear}) - Diirigido por ${movie.director}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deleteMovie(movie.id);
            
            li.appendChild(deleteButton);
            movieList.appendChild(li);
        });
    }

    async function deleteMovie(id) {
        if (confirm('Tem certeza que deseja deletar?')) {
            await fetch(`/movies/${id}`, { method: 'DELETE' });
            fetchMovies();
        }
    }

    movieForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value;
        const releaseYear = document.getElementById('releaseYear').value;
        
        await fetch('/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, releaseYear })
        });
        
        fetchMovies();
        movieForm.reset();
    });

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('update-id').value;
        const title = document.getElementById('update-title').value;
        const director = document.getElementById('update-director').value;
        const releaseYear = document.getElementById('update-releaseYear').value;
        
        await fetch(`/movies/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, releaseYear })
        });
        fetchMovies();
        updateForm.reset();
    });

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('search-id').value;
        const response = await fetch(`/movies/${id}`);
        const movie = await response.json();
        searchResult.innerHTML = movie.id ? `<p>${movie.title} (${movie.releaseyear}) - Dirigido por ${movie.director}</p>` : '<p>Filme não encontrado</p>';
    });

    fetchMovies();
});
