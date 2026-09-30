fetch("speedruns.json")
    .then(response => response.json())
    .then(speedruns => {

        console.log(speedruns);

document.getElementById("speedrunTable").innerHTML = `

<table class="pb-table">

    <thead>
        <tr>
            <th>Game</th>
            <th>Category</th>
            <th>PB</th>
            <th>Goal</th>
            <th>Status</th>
            <th>Achievement</th>
        </tr>
    </thead>

    <tbody>run.achieveme

        ${speedruns.map(run => `

            <tr>

                <td>${run.game}</td>

                <td>${run.category || "-"}</td>

                <td>${run.pb || "-"}</td>

                <td>${run.goal || "-"}</td>

       <td>

    ${
        run.achievement === "World Record"
            ? '<span class="speedrun-achievement wr">👑 World Record</span>'
            : run.achievement === "2nd Place"
            ? '<span class="speedrun-achievement second">🥈 2nd Place</span>'
            : run.achievement === "Top 15"
            ? '<span class="speedrun-achievement top15">🏅 Top 15</span>'
            : "-"
    }

</td>

            </tr>

        `).join("")}

    </tbody>

</table>

`;

    })
    .catch(error => {

        console.error(error);

        document.getElementById("speedrunTable").innerHTML =
            "<p>Failed to load speedruns.</p>";

    });
