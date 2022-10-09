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
const SAVED_EVENT = 'saved_book'
const STORAGE_KEY = 'MY_BOOKSHELF'
const isCheckComplete = document.getElementById('inputBookIsComplete')
const hiddenSearch = document.querySelector('.search-section')
const hiddenDropdown = document.querySelector('.dropdown')
const hiddenFinished = document.querySelector('#finished')
const hiddenNotFinished = document.querySelector('#notFinished')

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
            undoBookFromComplete(id)
        })

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delete')
        deleteButton.append(iconDelete)
        deleteButton.addEventListener('click', function () {
            removeBookFromBookshelf(id)
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
            addBookToComplete(id)
        })

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delete')
        deleteButton.append(iconDelete)
        deleteButton.addEventListener('click', function () {
            removeBookFromBookshelf(id)
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

function addBookToComplete(bookId) {
    const bookTarget = findBook(bookId)

    if (bookTarget.isComplete == false) {
        hiddenFinished.removeAttribute('hidden')
    }

    if (bookTarget == null) return
    bookTarget.isComplete = true

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id == bookId) {
            return bookItem
        }
    }
    return null
}

function removeBookFromBookshelf(bookId) {
    const bookTarget = findBookIndex(bookId)

    if (bookTarget === -1) return
    books.splice(bookTarget, 1)

    if (books.length == 0) {
        hiddenSearch.setAttribute('hidden', true)
        hiddenDropdown.setAttribute('hidden', true)
        hiddenFinished.setAttribute('hidden', true)
        hiddenNotFinished.setAttribute('hidden', true)
    }

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index
        }
    }
    return -1
}

function undoBookFromComplete(bookId) {
    const bookTarget = findBook(bookId)

    if (bookTarget.isComplete == true) {
        hiddenNotFinished.removeAttribute('hidden')
    }

    if (bookTarget == null) return
    bookTarget.isComplete = false

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books)
        localStorage.setItem(STORAGE_KEY, parsed)
        document.dispatchEvent(new Event(SAVED_EVENT))
    }
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser yang kamu gunakan tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
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
    const bookCover = validationCover()
    function validationCover() {
        if (document.getElementById('inputBookCover').value.length <= 15) {
            return document.getElementById('inputBookCover').value.innerText = 'assets/image/dummy-cover.jpg'
        } else {
            return document.getElementById('inputBookCover').value
        }
    }
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
    saveData()
}

document.addEventListener(SAVED_EVENT, function () {
    console.log('Data berhasil disimpan');
})

document.getElementById('inputBookIsComplete').addEventListener('click', function () {
    const changeStatus = document.querySelector('#bookSubmit > span')
    if (isCheckComplete.checked) {
        changeStatus.innerText = 'Selesai dibaca'
    } else {
        changeStatus.innerText = 'Belum selesai dibaca'
    }
})

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('inputBookCover').addEventListener('input', function () {
        const bookCover = document.getElementById('inputBookCover').value.length
        console.log('Jumlah karakter cover ' + bookCover);
    })

    const submitForm = document.getElementById('inputBook')
    submitForm.addEventListener('submit', function (event) {
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

    if (isStorageExist()) {
        loadDataFromStorage()
        if (books.length >= 1) {
            hiddenSearch.removeAttribute('hidden')
            hiddenDropdown.removeAttribute('hidden')
            hiddenFinished.removeAttribute('hidden')
            hiddenNotFinished.removeAttribute('hidden')
        }
    }
})

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    const uncompletedBookList = document.getElementById('unfinishedBook')
    uncompletedBookList.innerHTML = ''

    const completedBookList = document.getElementById('bookFinishedReading')
    completedBookList.innerHTML = ''

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem)
        if (!bookItem.isComplete) {
            uncompletedBookList.append(bookElement)
        } else {
            completedBookList.append(bookElement)
        }
    }
})