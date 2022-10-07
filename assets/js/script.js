/* {
    id: number,
    title: string,
    author: string,
    year: number,
    page: number,
    language: string,
    genre: string,
    cover: string,
    isComplete: boolean,
  } */

const books = []
const RENDER_EVENT = 'render-book'

const generatedId = () => +new Date()

function generatedBookObject(id, title, author, year, page, language, genre, cover, isComplete) {
    return {
        id,
        title,
        author,
        year,
        page,
        language,
        genre,
        language,
        genre,
        cover,
        isComplete
    }
}

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value
    const bookAuthor = document.getElementById('inputBookAuthor').value
    const bookYear = document.getElementById('inputBookYear').value
    const bookPage = document.getElementById('inputBookPage').value
    const bookLanguage = document.getElementById('inputBookLanguage').value
    const bookGenre = document.getElementById('inputBookGenre').value
    const bookCover = document.getElementById('inputBookCover').value

    const generatedID = generatedId()
    const bookObject = generatedBookObject(
        generatedID,
        bookTitle,
        bookAuthor,
        bookYear,
        bookPage,
        bookLanguage,
        bookGenre,
        bookCover,
        false)

    books.push(bookObject)

    document.dispatchEvent(new Event(RENDER_EVENT))
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook')
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault()
        addBook()
    })
})

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
})