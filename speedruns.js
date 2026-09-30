fetch("speedruns.json")
    .then(response => response.json())
    .then(speedruns => {

        console.log(speedruns);

        document.getElementById("speedrunTable").innerHTML =
            "<p>Speedruns loaded successfully.</p>";

    })
    .catch(error => {

        console.error(error);

        document.getElementById("speedrunTable").innerHTML =
            "<p>Failed to load speedruns.</p>";

    });
