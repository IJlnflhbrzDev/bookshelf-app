function saveData() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadData() {
  var storedBooks = localStorage.getItem("books");
  if (storedBooks !== null) {
    return JSON.parse(storedBooks);
  }
  return [];
}

function refreshData() {
  var incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  var completeBookshelfList = document.getElementById("completeBookshelfList");

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var bookElement = createBookElement(book);

    if (book.inputBookIsComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  }
}

function createBookElement(book) {
  var bookElement = document.createElement("div");
  bookElement.classList.add("book");

  var titleElement = document.createElement("h3");
  titleElement.innerText = book.inputBookTitle;

  var authorElement = document.createElement("p");
  authorElement.innerText = "Author: " + book.inputBookAuthor;

  var yearElement = document.createElement("p");
  yearElement.innerText = "Year: " + book.inputBookYear;

  var buttonContainer = document.createElement("div");

  var deleteButton = document.createElement("button");
  deleteButton.classList.add('btn');
  deleteButton.classList.add('delete');
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteBook(book.id);
  });

  var moveButton = document.createElement("button");
  moveButton.classList.add('btn')
  moveButton.classList.add('primary')
  moveButton.innerText = book.inputBookIsComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca";
  moveButton.addEventListener("click", function () {
    moveBook(book.id);
  });

  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(moveButton);

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorElement);
  bookElement.appendChild(yearElement);
  bookElement.appendChild(buttonContainer);

  return bookElement;
}

function addBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
  var newBook = {
    id: +new Date(),
    inputBookTitle: inputBookTitle,
    inputBookAuthor: inputBookAuthor,
    inputBookYear: inputBookYear,
    inputBookIsComplete: inputBookIsComplete
  };

  books.push(newBook);
  saveData();
  refreshData();
}

function deleteBook(bookId) {
  var index = -1;
  for (var i = 0; i < books.length; i++) {
    if (books[i].
      id === bookId) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    books.splice(index, 1);
    saveData();
    refreshData();
  }
}

function moveBook(bookId) {
  var index = -1;
  for (var i = 0; i < books.length; i++) {
    if (books[i].id === bookId) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    books[index].inputBookIsComplete = !books[index].inputBookIsComplete;
    saveData();
    refreshData();
  }
}

var books = loadData();
refreshData();

var bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var inputBookTitle = document.getElementById("inputBookTitle").value;
  var inputBookAuthor = document.getElementById("inputBookAuthor").value;
  var inputBookYear = document.getElementById("inputBookYear").value;
  var inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

  addBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

  bookForm.reset();
});

