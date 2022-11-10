<div id="top"></div>

# 📌MyBookshelf
Bookshelf Apps is a web application that can enter book data into shelves, move book data between shelves, and delete book data from shelves.
This MyBookshelf application implements data management using DOM and Web Storage.

## 🎯MyBookshelf apps Criteria
- Can add new book data. The stored book data is a JavaScript object with the structure:
   ```
   {
    id: number,
    title: string,
    author: string,
    year: number,
    page: number,
    language: string,
    genre: string,
    cover: string,
    isComplete: boolean,
  }
  ```

- Have Two Bookshelves
  - "Unfinished reading" and "Finished reading".
  - The "Unfinished"  MyBookshelf only stores books if the `isComplete` property evaluates to `false`
  - The "Finished read" Mybookshelf only saves books if the `isComplete` property is `true`

## 🎯Features
- Can Move Books Between Shelves
- Can Delete Book Data
- Can edit Book Data
- Book Data search feature
- Dropdown feature according to Book type
- Custom dialog when deleting a Book
- Using localStorage in Storing Book Data

## 🎯User Interface (Screenshot)
- Main view when MyBookshelf is empty
<p align="middle">
<img alt="Homepage" title="Homepage" src="https://user-images.githubusercontent.com/89395541/201111595-2b73c47c-6b48-4675-bc46-5f22ac81f224.jpg" width="750"/>
</p>

- Display when MyBookshelf fills up and by filtering "all books" or "Semua Buku"
<p align="middle">
<img alt="MyBookshelf list" title="MyBookshelf list" src="https://user-images.githubusercontent.com/89395541/201121588-248c62c9-27e8-4deb-851b-a12a6f567b26.jpg" width="750"/>
</p>

- Popup edit Book Data
<p align="middle">
<img alt="Popup edit" title="Popup edit" src="https://user-images.githubusercontent.com/89395541/201123453-a11cd855-2d7a-47f7-a26c-4231719eb6d5.jpg" width="750"/>
</p>

- Popup delete Book Data
<p align="middle">
<img alt="Popup delete" title="Popup delete" src="https://user-images.githubusercontent.com/89395541/201123767-ed46a8bb-2b1f-4f5b-997a-30d7d6afd403.jpg" width="750"/>
</p>

<p align="right"><a href="#top">Back to top</a></p>
