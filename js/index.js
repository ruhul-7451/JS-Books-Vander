const searchEngine = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    // console.log(searchText);
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data))
}

const loadBooks = (data) => {
    // console.log(data);
    const bookList = data.docs
    bookList.forEach(book => {
        console.log(book.title);
        const gridBooks = document.getElementById('grid-books');
        const newDiv = document.createElement('div')
        newDiv.classList.add('col')
        newDiv.innerHTML = `<div class="card h-100">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
        </div>
    </div>`
        gridBooks.appendChild(newDiv);
    });

}