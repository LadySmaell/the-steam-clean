fetch("reviews.json")
    .then(response => response.json())
    .then(reviews => {

        const latest =
            reviews.find(review => review.featured)
            || reviews[0];
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
