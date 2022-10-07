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
const isCheckComplete = document.getElementById('inputBookIsComplete')

function makeBook(bookObject) {
    const {
        id,
        title,
        author,
        year,
        page,
        language,
        genre,
        cover,
        isComplete
    } = bookObject

    const bookTitle = document.createElement('h3')
    bookTitle.innerText = title

    const bookAuthor = document.createElement('p')
    bookAuthor.innerText = author

    const bookYear = document.createElement('p')
    bookYear.innerText = year

    const bookPage = document.createElement('p')
    bookPage.innerText = page

    const bookLanguage = document.createElement('p')
    bookLanguage.innerText = language

    const bookGenre = document.createElement('p')
    bookGenre.innerText = genre

    const bookDetail = document.createElement('div')
    bookDetail.classList.add('book-detail')
    bookDetail.append(bookTitle, bookAuthor, bookYear, bookPage, bookLanguage, bookGenre)

    const linkCover = document.createElement('img')
    linkCover.setAttribute('src', cover)

    const bookCover = document.createElement('div')
    bookCover.classList.add('book-cover')
    bookCover.append(linkCover)

    const iconCheck = document.createElement('i')
    iconCheck.classList.add('fa', 'fa-check')

    const iconDelete = document.createElement('i')
    iconDelete.classList.add('fa', 'fa-trash')

    const iconEdit = document.createElement('i')
    iconEdit.classList.add('fa', 'fa-pencil')

    const iconUndo = document.createElement('i')
    iconUndo.classList.add('fa', 'fa-undo')

    const container = document.createElement('article')
    container.classList.add('book-item')
    container.append(bookCover, bookDetail)
    container.setAttribute('id', `book-${id}`)

    if (isComplete) {
        const undoButton = document.createElement('button')
        undoButton.setAttribute('id', 'undo')
        undoButton.append(iconUndo)
        undoButton.addEventListener('click', function () {
            // TODO: Mengembalikan buku dengan status belum dibaca
        })

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delete')
        deleteButton.append(iconDelete)
        deleteButton.addEventListener('click', function () {
            // TODO: Menghapus Buku
        })

        const actionButtonParent = document.createElement('div')
        actionButtonParent.classList.add('action')
        actionButtonParent.append(undoButton, deleteButton)

        container.append(actionButtonParent)
    } else {
        const checkButton = document.createElement('button')
        checkButton.setAttribute('id', 'check')
        checkButton.append(iconCheck)
        checkButton.addEventListener('click', function () {
            // TODO: Memindahkan Buku ke selesai dibaca
        })

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delete')
        deleteButton.append(iconDelete)
        deleteButton.addEventListener('click', function () {
            // TODO: Menghapus Buku
        })

        const editButton = document.createElement('button')
        editButton.setAttribute('id', 'edit')
        editButton.append(iconEdit)
        editButton.addEventListener('click', function () {
            // TODO: Mengedit Buku
        })

        const actionButtonParent = document.createElement('div')
        actionButtonParent.classList.add('action')
        actionButtonParent.append(checkButton, deleteButton, editButton)

        container.append(actionButtonParent)
    }
    return container
}

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

function checkStatusBook() {
    if (isCheckComplete.checked) {
        return true
    }
    return false
}

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value
    const bookAuthor = document.getElementById('inputBookAuthor').value
    const bookYear = document.getElementById('inputBookYear').value
    const bookPage = document.getElementById('inputBookPage').value
    const bookLanguage = document.getElementById('inputBookLanguage').value
    const bookGenre = document.getElementById('inputBookGenre').value
    const bookCover = document.getElementById('inputBookCover').value
    const bookIsComplete = checkStatusBook()

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
        bookIsComplete)

    books.push(bookObject)

    document.dispatchEvent(new Event(RENDER_EVENT))
}

document.getElementById('inputBookIsComplete').addEventListener('click', function () {
    const changeStatus = document.querySelector('#bookSubmit > span')
    if (isCheckComplete.checked) {
        changeStatus.innerText = 'Selesai dibaca'
    } else {
        changeStatus.innerText = 'Belum selesai dibaca'
    }
})

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook')
    submitForm.addEventListener('submit', function (event) {
        const hiddenSearch = document.querySelector('.search-section')
        const hiddenDropdown = document.querySelector('.dropdown')
        const hiddenFinished = document.querySelector('#finished')
        const hiddenNotFinished = document.querySelector('#notFinished')

        if (isCheckComplete.checked) {
            hiddenSearch.removeAttribute('hidden')
            hiddenDropdown.removeAttribute('hidden')
            hiddenFinished.removeAttribute('hidden')
        } else {
            hiddenSearch.removeAttribute('hidden')
            hiddenDropdown.removeAttribute('hidden')
            hiddenNotFinished.removeAttribute('hidden')
        }

        event.preventDefault()
        addBook()
    })
})

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    const uncompletedBookList = document.getElementById('unfinishedBook')
    uncompletedBookList.innerHTML = ''

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem)
        if (!bookItem.isComplete) {
            uncompletedBookList.append(bookElement)
        }
    }
})