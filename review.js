fetch("reviews.json")
    .then(response => response.json())
    .then(reviews => {

        const latest = reviews[0];

        document.getElementById("latestReview").innerHTML = `

            <div class="latest-review-card">

                <span class="tag">
                    ${latest.verdict}
                </span>

                <h3>
                    ${latest.url}
                        ${latest.title}
                    </a>
                </h3>

                <ul class="review-meta">
                    <li>🎮 ${latest.genre}</li>
                    <li>⏱ ${latest.size}</li>
                    <li>🏆 ${latest.achievements}</li>
                    <li>📅 ${latest.published}</li>
                </ul>

                ${latest.url}

                    Read Latest Review →

                </a>

            </div>

        `;
    });
