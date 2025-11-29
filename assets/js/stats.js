// GitHub API Integration for Stats Page
// Real-time repos, stars, followers, commits

(function() {
    'use strict';

    const GITHUB_USERNAME = 'DenxVil';
    const CACHE_KEY = 'denvil_github_stats';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    async function initGitHubStats() {
        const statsContainer = document.querySelector('.github-stats-container');
        if (!statsContainer) return;

        // Show loading state
        showLoading(statsContainer);

        try {
            const stats = await fetchGitHubStats();
            renderStats(statsContainer, stats);
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            showError(statsContainer);
        }
    }

    async function fetchGitHubStats() {
        // Check cache first
        const cached = getCachedStats();
        if (cached) return cached;

        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
            throw new Error('Failed to fetch GitHub data');
        }

        const user = await userResponse.json();
        const repos = await reposResponse.json();

        // Calculate stats
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        
        // Language statistics
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const stats = {
            user: {
                name: user.name || user.login,
                avatar: user.avatar_url,
                bio: user.bio,
                location: user.location,
                publicRepos: user.public_repos,
                followers: user.followers,
                following: user.following,
                createdAt: user.created_at
            },
            totalStars,
            totalForks,
            languages,
            topRepos: repos.slice(0, 6).map(repo => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                url: repo.html_url,
                updatedAt: repo.updated_at
            })),
            fetchedAt: Date.now()
        };

        // Cache the stats
        cacheStats(stats);
        return stats;
    }

    function getCachedStats() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const stats = JSON.parse(cached);
            if (Date.now() - stats.fetchedAt > CACHE_DURATION) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            return stats;
        } catch (e) {
            return null;
        }
    }

    function cacheStats(stats) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
        } catch (e) {
            console.warn('Could not cache GitHub stats');
        }
    }

    function showLoading(container) {
        container.innerHTML = `
            <div class="stats-loading">
                <div class="loading-spinner"></div>
                <p>Loading GitHub statistics...</p>
            </div>
        `;
    }

    function showError(container) {
        container.innerHTML = `
            <div class="stats-error">
                <p>⚠️ Unable to load GitHub statistics</p>
                <button class="btn-primary" onclick="location.reload()">Retry</button>
            </div>
        `;
    }

    function renderStats(container, stats) {
        // Sort languages by count
        const sortedLanguages = Object.entries(stats.languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        const languageColors = {
            'Python': '#3572A5',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'TypeScript': '#2b7489',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'SQL': '#e38c00'
        };

        container.innerHTML = `
            <!-- Profile Card -->
            <div class="stat-card profile-card glass-card">
                <img src="${stats.user.avatar}" alt="${stats.user.name}" class="profile-avatar">
                <h3>${stats.user.name}</h3>
                <p class="profile-bio">${stats.user.bio || 'Developer & Creator'}</p>
                ${stats.user.location ? `<p class="profile-location">📍 ${stats.user.location}</p>` : ''}
            </div>

            <!-- Main Stats Grid -->
            <div class="stats-grid">
                <div class="stat-item glass-card">
                    <div class="stat-icon">📦</div>
                    <div class="stat-value">${stats.user.publicRepos}</div>
                    <div class="stat-label">Repositories</div>
                </div>
                <div class="stat-item glass-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${stats.totalStars}</div>
                    <div class="stat-label">Total Stars</div>
                </div>
                <div class="stat-item glass-card">
                    <div class="stat-icon">🍴</div>
                    <div class="stat-value">${stats.totalForks}</div>
                    <div class="stat-label">Total Forks</div>
                </div>
                <div class="stat-item glass-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-value">${stats.user.followers}</div>
                    <div class="stat-label">Followers</div>
                </div>
            </div>

            <!-- Language Statistics -->
            <div class="language-section glass-card">
                <h3>Language Statistics</h3>
                <div class="language-bars">
                    ${sortedLanguages.map(([lang, count]) => `
                        <div class="language-bar-item">
                            <div class="language-info">
                                <span class="language-dot" style="background: ${languageColors[lang] || '#888'}"></span>
                                <span class="language-name">${lang}</span>
                                <span class="language-count">${count} repos</span>
                            </div>
                            <div class="language-bar">
                                <div class="language-fill" style="width: ${(count / stats.user.publicRepos * 100).toFixed(1)}%; background: ${languageColors[lang] || '#888'}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Top Repositories -->
            <div class="top-repos-section">
                <h3>Top Repositories</h3>
                <div class="repos-grid">
                    ${stats.topRepos.map(repo => `
                        <a href="${repo.url}" target="_blank" rel="noopener" class="repo-card glass-card">
                            <h4>${repo.name}</h4>
                            <p>${repo.description || 'No description'}</p>
                            <div class="repo-meta">
                                ${repo.language ? `<span class="repo-lang"><span class="language-dot" style="background: ${languageColors[repo.language] || '#888'}"></span>${repo.language}</span>` : ''}
                                <span class="repo-stars">⭐ ${repo.stars}</span>
                                <span class="repo-forks">🍴 ${repo.forks}</span>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <p class="stats-update-time">Last updated: ${new Date(stats.fetchedAt).toLocaleString()}</p>
        `;

        // Animate stats numbers
        animateStatNumbers();
    }

    function animateStatNumbers() {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(el => {
            const target = parseInt(el.textContent, 10);
            if (isNaN(target)) return;

            let current = 0;
            const increment = Math.ceil(target / 30);
            const duration = 1000;
            const stepTime = duration / (target / increment);

            el.textContent = '0';

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(counter);
                } else {
                    el.textContent = current;
                }
            }, stepTime);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGitHubStats);
    } else {
        initGitHubStats();
    }
})();
