document.addEventListener('DOMContentLoaded', () => {
    const livroList = document.getElementById('livro-list');
    const livroForm = document.getElementById('livro-form');
    const updateForm = document.getElementById('update-form');
    const searchForm = document.getElementById('search-form');
    const searchResult = document.getElementById('search-result');

    async function fetchlivros() {
        const response = await fetch('/livros');
        const livros = await response.json();
        livroList.innerHTML = '';
        livros.forEach(livro => {
            const li = document.createElement('li');
            li.textContent = `${livro.id} - ${livro.title} (${livro.releaseYear}) - Diirigido por ${livro.director}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deletelivro(livro.id);
            
            li.appendChild(deleteButton);
            livroList.appendChild(li);
        });
    }

    async function deletelivro(id) {
        if (confirm('Tem certeza que deseja deletar?')) {
            await fetch(`/livros/${id}`, { method: 'DELETE' });
            fetchlivros();
        }
    }

    livroForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value;
        const releaseYear = document.getElementById('releaseYear').value;
        
        await fetch('/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, releaseYear })
        });
        
        fetchlivros();
        livroForm.reset();
    });

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('update-id').value;
        const title = document.getElementById('update-title').value;
        const director = document.getElementById('update-director').value;
        const releaseYear = document.getElementById('update-releaseYear').value;
        
        await fetch(`/livros/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, releaseYear })
        });
        fetchlivros();
        updateForm.reset();
    });

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('search-id').value;
        const response = await fetch(`/livros/${id}`);
        const livro = await response.json();
        searchResult.innerHTML = livro.id ? `<p>${livro.title} (${livro.releaseYear}) - Dirigido por ${livro.director}</p>` : '<p>Filme não encontrado</p>';
    });

    fetchlivros();
});
