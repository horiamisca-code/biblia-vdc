// Înregistrează Service Worker
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("Service Worker activ."))
            .catch(err => console.log(err));

    });

}

async function startApp() {

    await loadBible();
    await loadBooksData();

    loadBookSelector();

    const saved = loadPosition();

    const book = document.getElementById("book");
    const chapter = document.getElementById("chapter");
    const verse = document.getElementById("verse");
    const continueButton = document.getElementById("continueButton");

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

    function updateContinueButton() {

        const saved = loadPosition();

        if (saved.book && saved.chapter && saved.verse) {

            continueButton.innerHTML =
                `📖 Continuă lectura<br><small>${saved.book} ${saved.chapter}:${saved.verse}</small>`;

        } else {

            continueButton.innerHTML =
                "📖 Continuă de unde ai rămas";

        }

    }

    updateContinueButton();

    continueButton.addEventListener("click", () => {

        const saved = loadPosition();

        if (!saved.book) return;

        book.value = saved.book;

        loadChapters();

        chapter.value = saved.chapter;

        loadVerses();

        verse.value = saved.verse;

        displayChapter();

        setTimeout(() => {

            const element = document.getElementById("verse-" + saved.verse);

            if (element) {

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                element.focus();

            }

        }, 100);

    });

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
        updateContinueButton();

    });

    chapter.addEventListener("change", () => {

        loadVerses();
        displayChapter();
        savePosition();
        updateContinueButton();

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
        updateContinueButton();

    });

    document.getElementById("goButton").addEventListener("click", () => {

        goToReference();
        updateContinueButton();

    });

    document.getElementById("reference").addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            goToReference();
            updateContinueButton();

        }

    });

}

startApp();