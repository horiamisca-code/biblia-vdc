let rawBible = [];
let bible = {};
let books = [];

async function loadBible() {

    const response = await fetch("data/cornilescu.json");
    const json = await response.json();

    rawBible = json.verses;

    bible = {};
    books = [];

    rawBible.forEach(item => {

        const book = item.book_name;
        const chapter = item.chapter.toString();
        const verse = item.verse.toString();

        if (!bible[book]) {
            bible[book] = {};
        }

        if (!bible[book][chapter]) {
            bible[book][chapter] = {};
        }

        bible[book][chapter][verse] = item.text;

    });

    Object.keys(bible).forEach(book => {

        books.push({
            name: book,
            chapters: Object.keys(bible[book]).length
        });

    });

}

async function loadBooksData() {
}