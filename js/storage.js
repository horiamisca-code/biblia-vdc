function savePosition() {

    localStorage.setItem("book", document.getElementById("book").value);
    localStorage.setItem("chapter", document.getElementById("chapter").value);
    localStorage.setItem("verse", document.getElementById("verse").value);

}

function loadPosition() {

    return {

        book: localStorage.getItem("book"),
        chapter: localStorage.getItem("chapter"),
        verse: localStorage.getItem("verse")

    };

}

function hasSavedPosition() {

    return localStorage.getItem("book") !== null;

}