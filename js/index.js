const searchEngine = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    toggleSpinner('block');
    toggleSearchResult('none');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data))
}

const toggleSpinner = displayToggle => {
    document.getElementById('spinner').style.display = displayToggle;
}
const toggleSearchResult = displayToggle => {
    document.getElementById('search-result').style.display = displayToggle;
}

const loadBooks = (data) => {
    const bookList = data.docs
    /* Search Result Number */
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    /* Search Field Validation */
    const searchStatus = document.createElement('h6')
    const emptySearchBox = document.createElement('h6')
    const noResultsFound = document.createElement('h6')
    searchStatus.innerHTML = `<h6 class="text-center my-3">Search Result: ${data.num_found}</h6>`
    emptySearchBox.innerHTML = `<h6 class="text-center my-3">Please enter a book name</h6>`
    noResultsFound.innerHTML = `<h6 class="text-center my-3">No Results Found</h6>`

    if (data.q === '') {
        toggleSpinner('none');
        toggleSearchResult('block');
        searchResult.appendChild(emptySearchBox);/* Shows to enter book name */
    }
    else if (data.num_found === 0) {
        toggleSpinner('none');
        toggleSearchResult('block');
        searchResult.appendChild(noResultsFound);/* Shows No Result found */
    }
    else {
        toggleSpinner('none');
        toggleSearchResult('block');
        searchResult.appendChild(searchStatus);/* Shows Search Result Count */
    }

    /* Show Books in Grid */
    const gridBooks = document.getElementById('grid-books');
    gridBooks.textContent = '';
    bookList.forEach(book => {
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