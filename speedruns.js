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
            <th>Achievement</th>
        </tr>
    </thead>

    <tbody>

        ${speedruns.map(run => `

            <tr>

                <td>${run.game}</td>

                <td>${run.category || "-"}</td>

                <td>${run.pb || "-"}</td>

                <td>${run.goal || "-"}</td>

                <td>${run.achievement || "-"}</td>

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
