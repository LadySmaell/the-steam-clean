fetch("reviews.json")
    .then(response => response.json())
    .then(reviews => {

        const latest =
            reviews.find(review => review.featured)
            || reviews[0];

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
