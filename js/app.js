async function startApp() {

    await loadBible();
    await loadBooksData();

    loadBookSelector();

    const saved = loadPosition();

    const book = document.getElementById("book");
    const chapter = document.getElementById("chapter");
    const verse = document.getElementById("verse");

    if (saved.book && bible[saved.book]) {
        book.value = saved.book;
    }

    loadChapters();

    if (saved.chapter) {
        chapter.value = saved.chapter;
    }

    loadVerses();

    if (saved.verse) {
        verse.value = saved.verse;
    }

    displayChapter();

    setTimeout(() => {

        if (saved.verse) {

            const element = document.getElementById("verse-" + saved.verse);

            if (element) {

                element.scrollIntoView({
                    behavior: "instant",
                    block: "start"
                });

                element.focus();

            }

        }

    }, 100);

    book.addEventListener("change", () => {

        loadChapters();
        loadVerses();
        displayChapter();
        savePosition();

    });

    chapter.addEventListener("change", () => {

        loadVerses();
        displayChapter();
        savePosition();

    });

    verse.addEventListener("change", () => {

        const element = document.getElementById("verse-" + verse.value);

        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            element.focus();

        }

        savePosition();

    });

    document.getElementById("goButton").addEventListener("click", () => {

        goToReference();

    });

    document.getElementById("reference").addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            goToReference();

        }

    });

}

startApp();