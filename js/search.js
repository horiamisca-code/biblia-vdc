function goToReference() {

    const input = document.getElementById("reference").value.trim();

    if (input === "") return;

    // Dacă nu conține cifre, facem căutare după cuvânt
    if (!/\d/.test(input)) {

        searchWord(input);
        return;

    }

    const match = input.match(/^(.*?)\s+(\d+)(?::(\d+))?$/);

    if (!match) {

        alert("Exemplu: Ioan 3:16");

        return;

    }

    const book = match[1];
    const chapter = match[2];
    const verse = match[3];

    if (!bible[book]) {

        alert("Cartea nu există.");

        return;

    }

    document.getElementById("book").value = book;

    loadChapters();

    document.getElementById("chapter").value = chapter;

    loadVerses();

    displayChapter();

    if (verse) {

        document.getElementById("verse").value = verse;

        const element = document.getElementById("verse-" + verse);

        if (element) {

            element.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    }

    savePosition();

    document.getElementById("searchResults").innerHTML = "";

}

function searchWord(word) {

    word = word.toLowerCase();

    const results = document.getElementById("searchResults");

    results.innerHTML = "";

    let count = 0;

    rawBible.forEach(item => {

        if (item.text.toLowerCase().includes(word)) {

            count++;

            const div = document.createElement("div");

            div.className = "searchResult";

            div.innerHTML = `
                <strong>${item.book_name} ${item.chapter}:${item.verse}</strong><br>
                ${item.text}
            `;

            div.onclick = () => {

                document.getElementById("book").value = item.book_name;

                loadChapters();

                document.getElementById("chapter").value = item.chapter;

                loadVerses();

                document.getElementById("verse").value = item.verse;

                displayChapter();

                setTimeout(() => {

                    const element = document.getElementById("verse-" + item.verse);

                    if (element) {

                        element.scrollIntoView({

                            behavior: "smooth",
                            block: "start"

                        });

                    }

                }, 50);

                savePosition();

                results.innerHTML = "";

            };

            results.appendChild(div);

        }

    });

    if (count === 0) {

        results.innerHTML = "<p>Niciun rezultat.</p>";

    }

}