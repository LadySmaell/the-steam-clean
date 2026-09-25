fetch("reviews.json")
    .then(response => response.json())
    .then(reviews => {

        const latest =
            reviews.find(review => review.featured)
            || reviews[0];

        document.getElementById("reviewTotal").textContent =
    reviews.length;

        function renderVerdictSection(
    containerId,
    verdictLabel,
    reviewList = reviews
) {

    const container =
        document.getElementById(containerId);
            const section =
    document.getElementById(
        containerId.replace(
            "Reviews",
            "Section"
        )
    );
const matchingReviews =
    reviewList.filter(
        review =>
            review.verdict === verdictLabel
    );
if (section) {
    section.style.display = "";
}
if (
    matchingReviews.length === 0
) {

    if (section) {
        section.style.display = "none";
    }

    return;

}      
    if (!container) {
        return;
    }

container.innerHTML = "";

matchingReviews.forEach(review => {

            const reviewDate =
                new Date(review.published)
                    .toLocaleDateString(
                        "en-GB",
                        {
                            month: "long",
                            year: "numeric"
                        }
                    );

            container.innerHTML += `

                <article class="archive-card">

                    <span class="tag">
                        ${review.verdict}
                    </span>

                    <h3>
                        <a href="${review.url}">
                            ${review.title}
                        </a>
                    </h3>

                    <ul class="review-meta">
                        <li>🎮 ${review.genre}</li>
                        <li>⏱ ${review.size}</li>
                        <li>🏆 ${review.achievements}</li>
                        <li>📅 ${reviewDate}</li>
                    </ul>

                </article>

            `;
        });
}
     
function renderAllVerdictSections(reviewList = reviews) {
    renderVerdictSection(
        "essentialReviews",
        "Essential",
        reviewList
    );

    renderVerdictSection(
        "outstandingReviews",
        "Outstanding",
        reviewList
    );

    renderVerdictSection(
        "recommendedReviews",
        "Recommended",
        reviewList
    );

    renderVerdictSection(
        "goodReviews",
        "Good",
        reviewList
    );

    renderVerdictSection(
        "mixedReviews",
        "Mixed",
        reviewList
    );

    renderVerdictSection(
        "skipReviews",
        "Skip",
        reviewList
    );
}

renderAllVerdictSections();

        const reviewSearch =
    document.getElementById("reviewSearch");

if (reviewSearch) {

    reviewSearch.addEventListener(
        "input",
        event => {

            const searchTerm =
                event.target.value
                    .toLowerCase()
                    .trim();

            const filteredReviews =
                reviews.filter(review => {

                    return (

                        review.title
                            .toLowerCase()
                            .includes(searchTerm)

                        ||

                        review.genre
                            .toLowerCase()
                            .includes(searchTerm)

                        ||

                        review.verdict
                            .toLowerCase()
                            .includes(searchTerm)

                        ||

                        review.size
                            .toLowerCase()
                            .includes(searchTerm)

                    );

                });

            renderAllVerdictSections(
                filteredReviews
            );

        }
    );

}

const verdictCounts = {
    Essential: 0,
    Outstanding: 0,
    Recommended: 0,
    Good: 0,
    Mixed: 0,
    Skip: 0
};

reviews.forEach(review => {

    if (verdictCounts[review.verdict] !== undefined) {

        verdictCounts[review.verdict]++;

    }

});

document.getElementById("essentialCount").textContent =
    verdictCounts.Essential;

document.getElementById("outstandingCount").textContent =
    verdictCounts.Outstanding;

document.getElementById("recommendedCount").textContent =
    verdictCounts.Recommended;

document.getElementById("goodCount").textContent =
    verdictCounts.Good;

document.getElementById("mixedCount").textContent =
    verdictCounts.Mixed;

document.getElementById("skipCount").textContent =
    verdictCounts.Skip;
        const reviewDate =
            new Date(latest.published)
                .toLocaleDateString(
                    "en-GB",
                    {
                        month: "long",
                        year: "numeric"
                    }
                );

        document.getElementById("latestReview").innerHTML = `

            <div class="latest-review-card">

                <span class="tag">
                    ${latest.verdict}
                </span>

                <h3>
                    <a href ="${latest.url}">
                        ${latest.title}
                    </a>
                </h3>

                <ul class="review-meta">
                    <li>🎮 ${latest.genre}</li>
                    <li>⏱ ${latest.size}</li>
                    <li>🏆 ${latest.achievements} Achievements</li>
                    <li>📅 ${reviewDate}</li>
                </ul>

<a
href="${latest.url}"
class="archive-card-link">
Read Latest Review →
</a>

            </div>

        `;
    })
    .catch(error => {
        console.error(error);

        document.getElementById("latestReview").innerHTML = `
            <p>Unable to load latest review.</p>
        `;
    });
