const searchEngine = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data))
}

const loadBooks = (data) => {
    console.log(data);
    const bookList = data.docs
    /* Search Result Number */
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    /* Search Field Validation */
    const searchDiv = document.createElement('h6')
    const nulSearchDiv = document.createElement('h6')
    const noSearchResult = document.createElement('h6')
    searchDiv.innerHTML = `<h6 class="text-center my-3">Search Result: ${data.num_found}</h6>`
    nulSearchDiv.innerHTML = `<h6 class="text-center my-3">Please enter a book name</h6>`
    noSearchResult.innerHTML = `<h6 class="text-center my-3">No Results Found</h6>`
    if (data.q === '') {
        searchResult.appendChild(nulSearchDiv);
    }
    else if (data.num_found === 0) {
        searchResult.appendChild(noSearchResult);
    }
    else {
        /* Show Search Result Count */
        searchResult.appendChild(searchDiv);
    }

    /* Show Books in Grid */
    const gridBooks = document.getElementById('grid-books');
    gridBooks.textContent = '';
    bookList.forEach(book => {
        console.log(book);
        const newDiv = document.createElement('div')
        newDiv.classList.add('col')
        newDiv.innerHTML = `<div class="card h-100 shadow">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 h-75 p-3">
    <div class="card-body">
        <h3 class="card-title">${book.title}</h3>
        <p class="card-text"> <span class="fw-bold">Auhtor Name: </span>${book.author_name}</p>\n
        <p class="card-text"><span class="fw-bold">Publisher: </span>${book.publisher}</p>\n
        <p class="card-text"><span class="fw-bold">First Publish Year: </span>${book.first_publish_year}</p>            
    </div>
</div>`
        gridBooks.appendChild(newDiv);
    });

}