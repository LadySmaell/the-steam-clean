// --------------------
// Steam Clean App
// --------------------
 
let games = [];
let shown = 24;

// Select the first matching page element.
const $ = selector => document.querySelector(selector);

// Escape data before adding it to generated HTML.
const escapeHtml = value =>
    String(value ?? "").replace(/[&<>"']/g, character => ({
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
    .then(response => {
        if (!response.ok) {
            throw new Error(`Unable to load games.json (${response.status})`);
        }

        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error("games.json must contain an array of games.");
        }

        games = data;
        initialisePage();
    })
    .catch(error => {
        console.error("Steam Clean data error:", error);

        const resultCount = $("#resultCount");
        if (resultCount) {
            resultCount.textContent = "Game data could not be loaded.";
        }
    });

// --------------------
// Initial Setup
// --------------------

function initialisePage() {
    updateStatistics();
    fillFilters();
    addEventListeners();
    renderGames();
}

// --------------------
// Automatic Statistics
// --------------------

function updateStatistics() {
    const totalGames = games.length;
    const completedGames = games.filter(game => game.completed === true).length;
    const gamePercentage = totalGames > 0
        ? (completedGames / totalGames) * 100
        : 0;

    let achievementsObtained = 0;
    let totalAchievements = 0;

    games.forEach(game => {
        const achievementText = String(game.achievements ?? "").trim();
        const match = achievementText.match(/^(\d+)\s*\/\s*(\d+)$/);

        if (!match) {
            return;
        }

        achievementsObtained += Number(match[1]);
        totalAchievements += Number(match[2]);
    });

    const achievementPercentage = totalAchievements > 0
        ? (achievementsObtained / totalAchievements) * 100
        : 0;

    const plannedHours = games.reduce((total, game) => {
        const hours = Number(game.recommendedHours);
        return total + (Number.isFinite(hours) ? hours : 0);
    }, 0);

    $("#completedStat").textContent = completedGames.toLocaleString();
    $("#totalStat").textContent = totalGames.toLocaleString();
    $("#pctStat").textContent = gamePercentage.toFixed(1) + "%";
    $("#progressBar").style.width = Math.min(gamePercentage, 100) + "%";
    $("#achievementStat").textContent = achievementsObtained.toLocaleString();
    $("#achievementPctStat").textContent = achievementPercentage.toFixed(1) + "%";
    $("#hoursStat").textContent = Math.round(plannedHours).toLocaleString();

    console.log("Steam Clean statistics", {
        totalGames,
        completedGames,
        gamePercentage,
        achievementsObtained,
        totalAchievements,
        achievementPercentage,
        plannedHours
    });
}

// --------------------
// Filters
// --------------------

function fillFilters() {
    const sizes = [...new Set(games.map(game => game.size).filter(Boolean))].sort();
    const types = [...new Set(games.map(game => game.type).filter(Boolean))].sort();

    fillDropdown("#sizeFilter", sizes);
    fillDropdown("#typeFilter", types);
}

function fillDropdown(selector, values) {
    const dropdown = $(selector);

    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });
}

function getFilteredGames() {
    const search = $("#search").value.trim().toLowerCase();
    const size = $("#sizeFilter").value;
    const type = $("#typeFilter").value;
    const status = $("#statusFilter").value;

    return games.filter(game => {
        const matchesSearch = !search ||
            String(game.name ?? "").toLowerCase().includes(search);

        const matchesSize = !size || game.size === size;
        const matchesType = !type || game.type === type;

        const matchesStatus = !status ||
            (status === "complete"
                ? game.completed === true
                : game.completed !== true);

        return matchesSearch && matchesSize && matchesType && matchesStatus;
    });
}

// --------------------
// Render Game Cards
// --------------------

function renderGames() {
    const list = getFilteredGames();

    $("#resultCount").textContent =
        `${list.length.toLocaleString()} games found`;

    $("#gameGrid").innerHTML = list
        .slice(0, shown)
        .map(game => {
            const hours = game.recommendedHours == null
                ? "?"
                : escapeHtml(game.recommendedHours);

            const completed = game.completed === true;

            return `
                <article class="game-card">
                    <div>
                        <span class="hours">${hours}h</span>
                        <h3>${escapeHtml(game.name)}</h3>
                        <div class="meta">
                            ${escapeHtml(game.achievements)} achievements
                        </div>
                    </div>

                    <div class="pills">
                        <span class="pill ${completed ? "done" : ""}">
                            ${completed ? "COMPLETED" : "BACKLOG"}
                        </span>
                        <span class="pill">${escapeHtml(game.size)}</span>
                        <span class="pill">${escapeHtml(game.type)}</span>
                    </div>
                </article>
            `;
        })
        .join("");

    $("#more").style.display = shown < list.length ? "block" : "none";
}

// --------------------
// Event Listeners
// --------------------

function addEventListeners() {
    [
        "#search",
        "#sizeFilter",
        "#typeFilter",
        "#statusFilter"
    ].forEach(selector => {
        $(selector).addEventListener("input", () => {
            shown = 24;
            renderGames();
        });
    });

    $("#more").addEventListener("click", () => {
        shown += 24;
        renderGames();
    });

    $("#reset").addEventListener("click", () => {
        $("#search").value = "";
        $("#sizeFilter").value = "";
        $("#typeFilter").value = "";
        $("#statusFilter").value = "";
        shown = 24;
        renderGames();
    });
}
