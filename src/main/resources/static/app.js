document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterTypeSelect = document.getElementById('filterType');
    const searchBtn = document.getElementById('searchBtn');
    const resultsSection = document.getElementById('results');
    const bookGrid = document.getElementById('bookGrid');
    const resultCount = document.getElementById('resultCount');
    const loader = document.getElementById('loader');

    const searchBooks = async () => {
        const query = searchInput.value.trim();
        const filterType = filterTypeSelect.value;
        
        if (!query) return;

        // Reset UI
        resultsSection.classList.add('hidden');
        loader.classList.remove('hidden');
        searchBtn.disabled = true;
        searchBtn.textContent = 'Searching...';
        
        try {
            let url = `/api/books/search?`;
            if (filterType === 'all') {
                url += `query=${encodeURIComponent(query)}`;
            } else {
                url += `filterType=${filterType}&filterValue=${encodeURIComponent(query)}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Search failed');
            
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while searching. Please try again.');
        } finally {
            loader.classList.add('hidden');
            searchBtn.disabled = false;
            searchBtn.textContent = 'Deep Search';
        }
    };

    const displayResults = (data) => {
        bookGrid.innerHTML = '';
        resultsSection.classList.remove('hidden');
        
        if (data.books.length === 0) {
            resultCount.textContent = 'No books found';
            return;
        }

        resultCount.textContent = `Found ${data.totalElements} results`;

        data.books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            const authors = book.authors && book.authors.length > 0 
                ? book.authors.join(', ') 
                : 'Unknown Author';
            
            const tags = book.subjects && book.subjects.length > 0
                ? book.subjects.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join('')
                : '';

            const coverUrl = book.coverUrl || 'https://via.placeholder.com/350x500?text=No+Cover';

            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${coverUrl}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/350x500?text=No+Cover'">
                </div>
                <div class="book-info">
                    <h3 title="${book.title}">${book.title}</h3>
                    <p class="author">${authors}</p>
                    <div class="book-tags">
                        ${tags}
                    </div>
                </div>
            `;
            
            bookGrid.appendChild(bookCard);
        });

        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    };

    searchBtn.addEventListener('click', searchBooks);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });
});
