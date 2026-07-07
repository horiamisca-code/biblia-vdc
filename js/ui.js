function loadBookSelector() {

    const bookSelect = document.getElementById("book");

    bookSelect.innerHTML = "";

    books.forEach(book => {

        const option = document.createElement("option");

        option.value = book.name;
        option.textContent = book.name;

        bookSelect.appendChild(option);

    });

}

function loadChapters() {

    const book = document.getElementById("book").value;

    const chapterSelect = document.getElementById("chapter");

    chapterSelect.innerHTML = "";

    const selectedBook = books.find(
        b => b.name === book
    );

    if (!selectedBook) return;

    for (let i = 1; i <= selectedBook.chapters; i++) {

        const option = document.createElement("option");

        option.value = i;
        option.textContent = i;

        chapterSelect.appendChild(option);

    }

}

function loadVerses() {

    const book = document.getElementById("book").value;
    const chapter = document.getElementById("chapter").value;

    const verseSelect = document.getElementById("verse");

    verseSelect.innerHTML = "";

    if (!bible[book] || !bible[book][chapter]) return;

    const verses = bible[book][chapter];

    for (const number in verses) {

        const option = document.createElement("option");

        option.value = number;
        option.textContent = number;

        verseSelect.appendChild(option);

    }

}

function displayChapter() {

    const book = document.getElementById("book").value;
    const chapter = document.getElementById("chapter").value;

    const reader = document.getElementById("reader");

    reader.innerHTML = "";

    if (!bible[book] || !bible[book][chapter]) {

        reader.innerHTML = "<p>Capitol indisponibil.</p>";

        return;

    }

    const verses = bible[book][chapter];

    for (const number in verses) {

        const article = document.createElement("article");

        article.className = "verse";
        article.id = "verse-" + number;

        // Accesibilitate
        article.tabIndex = 0;
        article.setAttribute("role", "article");

        article.setAttribute(
            "aria-label",
            `${book}, capitolul ${chapter}, versetul ${number}. ${verses[number]}`
        );

        article.innerHTML = `<strong>${number}</strong> ${verses[number]}`;

        reader.appendChild(article);

    }

}