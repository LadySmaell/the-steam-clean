// --------------------
// Steam Clean App
// --------------------

let games = [];

let STATS = {
    achObtained: 924 // Keep this manual for now
};

let shown = 24;

// --------------------
// Helpers
// --------------------

const $ = selector => document.querySelector(selector);

const esc = text =>
    String(text).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);

// --------------------
// Load Game Data
// --------------------

fetch("games.json")
    .then(response => response.json())
    .then(data => {

        games = data;

        // Calculate statistics automatically

        STATS.total = games.length;

        STATS.completed =
            games.filter(game => game.completed).length;

        STATS.gamePct =
            STATS.completed / STATS.total;

        init();
    });

// --------------------
// Initial Setup
// --------------------

function init() {

    $("#completedStat").textContent =
        STATS.completed;

    $("#totalStat").textContent =
        STATS.total;

    $("#pctStat").textContent =
        (STATS.gamePct * 100).toFixed(1) + "%";

    $("#progressBar").style.width =
        (STATS.gamePct * 100) + "%";

    $("#achievementStat").textContent =
        STATS.achObtained.toLocaleString();

    const plannedHours =
        games.reduce(
            (total, game) =>
                total + (game.recommendedHours || 0),
            0
        );

    $("#hoursStat").textContent =
        Math.round(plannedHours).toLocaleString();

    fillDropdown(
        "#sizeFilter",
        [...new Set(games.map(game => game.size))].sort()
    );

    fillDropdown(
        "#typeFilter",
        [...new Set(games.map(game => game.type))].sort()
    );

    render();
}

// --------------------
// Filters
// --------------------

function fillDropdown(selector, values) {

    values.forEach(value => {

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = value;

        $(selector).appendChild(option);
    });
}

function filtered() {

    const search =
        $("#search").value.toLowerCase();

    const size =
        $("#sizeFilter").value;

    const type =
        $("#typeFilter").value;

    const status =
        $("#statusFilter").value;

    return games.filter(game =>

        (!search ||
            game.name.toLowerCase().includes(search))

        &&

        (!size ||
            game.size === size)

        &&

        (!type ||
            game.type === type)

        &&

        (
            !status ||

            (
                status === "complete"
                    ? game.completed
                    : !game.completed
            )
        )
    );
}

// --------------------
// Render Game Cards
// --------------------

function render() {

    const list = filtered();

    $("#resultCount").textContent =
        list.length.toLocaleString() +
        " games found";

    $("#gameGrid").innerHTML =
        list
            .slice(0, shown)
            .map(game => `
                <article class="game-card">
                    <div>

                        <span class="hours">
                            ${game.recommendedHours == null
                                ? "?"
                                : game.recommendedHours}h
                        </span>

                        <h3>${esc(game.name)}</h3>

                        <div class="meta">
                            ${esc(game.achievements)}
                            achievements
                        </div>

                    </div>

                    <div class="pills">

                        <span class="pill ${game.completed ? "done" : ""}">
                            ${game.completed
                                ? "COMPLETED"
                                : "BACKLOG"}
                        </span>

                        <span class="pill">
                            ${esc(game.size)}
                        </span>

                        <span class="pill">
                            ${esc(game.type)}
                        </span>

                    </div>
                </article>
            `)
            .join("");

    $("#more").style.display =
        shown < list.length
            ? "block"
            : "none";
}

// --------------------
// Event Listeners
// --------------------

[
    "#search",
    "#sizeFilter",
    "#typeFilter",
    "#statusFilter"
].forEach(selector => {

    $(selector).addEventListener(
        "input",
        () => {
            shown = 24;
            render();
        }
    );
});

$("#more").onclick = () => {
    shown += 24;
    render();
};

$("#reset").onclick = () => {

    $("#search").value = "";
    $("#sizeFilter").value = "";
    $("#typeFilter").value = "";
    $("#statusFilter").value = "";

    shown = 24;

    render();
};
