// API endpoint configuration
const API_URL = 'http://localhost:8000';

// Get DOM elements
const analysisForm = document.getElementById('analysisForm');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the results page
    if (window.location.pathname.includes('results.html')) {
        loadResults();
    }
});

// Handle form submission
if (analysisForm) {
    analysisForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(analysisForm);
        const data = {
            niche: formData.get('niche'),
            platform: formData.get('platform'),
            target_audience: formData.get('target_audience'),
            content_style: formData.get('content_style')
        };

        // Validate form
        if (!data.niche || !data.platform || !data.target_audience || !data.content_style) {
            showError('Please fill in all fields');
            return;
        }

        // Show loading state
        showLoading();
        hideError();

        try {
            // Send request to backend
            const response = await fetch(`${API_URL}/api/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const results = await response.json();

            // Store results in sessionStorage
            sessionStorage.setItem('analysisResults', JSON.stringify(results));
            sessionStorage.setItem('analysisInput', JSON.stringify(data));

            // Redirect to results page
            window.location.href = '/results';

        } catch (error) {
            console.error('Error:', error);
            showError(`Failed to analyze: ${error.message}`);
            hideLoading();
        }
    });
}

function showLoading() {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    submitBtn.disabled = true;
    if (btnText) btnText.classList.add('hidden');
    if (btnLoader) {
        btnLoader.classList.remove('hidden');
    }
}

function hideLoading() {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    submitBtn.disabled = false;
    if (btnText) btnText.classList.remove('hidden');
    if (btnLoader) btnLoader.classList.add('hidden');
}

function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
}

function hideError() {
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }
}

// Results page functions
async function loadResults() {
    const resultsState = document.getElementById('resultsState');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');

    try {
        const results = sessionStorage.getItem('analysisResults');
        const input = sessionStorage.getItem('analysisInput');

        if (!results || !input) {
            throw new Error('No analysis data found. Please perform an analysis first.');
        }

        const resultsData = JSON.parse(results);
        const inputData = JSON.parse(input);

        // Hide loading state
        if (loadingState) loadingState.classList.add('hidden');

        // Populate results
        populateTrendingTopics(resultsData.trending_topics);
        populateHashtagStrategy(resultsData.hashtag_strategy);
        populateTemplates(resultsData.content_templates);
        populatePostingTimes(resultsData.best_posting_times);
        populateContentCalendar(resultsData.content_calendar_suggestions);
        populateCompetitorInsights(resultsData.competitor_insights);
        populateTools(resultsData.tools_and_resources);

        // Set analysis date
        const dateEl = document.getElementById('analysisDate');
        if (dateEl) {
            dateEl.textContent = `Analysis for: ${inputData.niche} | ${new Date().toLocaleDateString()}`;
        }

        // Show results state
        if (resultsState) resultsState.classList.remove('hidden');

        // Setup download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => downloadReport(resultsData, inputData));
        }

    } catch (error) {
        console.error('Error loading results:', error);
        if (loadingState) loadingState.classList.add('hidden');
        if (errorState) {
            errorState.classList.remove('hidden');
            const errorMsg = document.getElementById('errorMessage');
            if (errorMsg) errorMsg.textContent = error.message;
        }
    }
}

function populateTrendingTopics(topics) {
    const container = document.getElementById('trendingTopics');
    if (!container) return;

    container.innerHTML = topics.map(topic => `
        <div class="topic-card">
            <div class="topic-name">${escapeHtml(topic.topic)}</div>
            <div class="topic-meta">
                <div class="meta-item">
                    <div class="meta-label">Relevance</div>
                    <div class="meta-value">${topic.relevance_score}%</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Volume</div>
                    <div class="meta-value">${topic.search_volume}</div>
                </div>
            </div>
            <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 8px;">
                <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Trend</div>
                <div style="font-size: 14px; font-weight: 700; color: ${topic.growth_trend === 'increasing' ? '#10b981' : topic.growth_trend === 'stable' ? '#f59e0b' : '#ef4444'};">${topic.growth_trend}</div>
            </div>
            <div class="topic-interest">${escapeHtml(topic.audience_interest)}</div>
        </div>
    `).join('');
}

function populateHashtagStrategy(hashtags) {
    const container = document.getElementById('hashtagStrategy');
    if (!container) return;

    const badgesHtml = hashtags.map(h => `<span class="hashtag-badge">${escapeHtml(h.hashtag)}</span>`).join('');

    const cardsHtml = hashtags.map(h => `
        <div class="hashtag-card">
            <div class="hashtag-card-title">${escapeHtml(h.hashtag)}</div>
            <div class="hashtag-card-type">${escapeHtml(h.type)}</div>
            <div class="hashtag-card-reach">${escapeHtml(h.expected_reach)}</div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="hashtags-container">${badgesHtml}</div>
        <div class="hashtag-info">${cardsHtml}</div>
    `;
}

function populateTemplates(templates) {
    const container = document.getElementById('contentTemplates');
    if (!container) return;

    container.innerHTML = templates.map(template => `
        <div class="template-card">
            <div class="template-name">${escapeHtml(template.template_name)}</div>
            <span class="template-duration">⏱️ ${escapeHtml(template.duration)}</span>
            
            <div class="template-structure">
                <div class="template-structure-title">Structure</div>
                <div class="template-structure-text">${escapeHtml(template.structure)}</div>
            </div>

            <div class="template-hooks">
                <div class="hooks-title">Key Hooks</div>
                <ul class="hooks-list">
                    ${template.key_hooks.map(hook => `<li>${escapeHtml(hook)}</li>`).join('')}
                </ul>
            </div>

            <div class="template-tactics">
                <div class="tactics-title">Engagement Tactics</div>
                <ul class="tactics-list">
                    ${template.engagement_tactics.map(tactic => `<li>${escapeHtml(tactic)}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function populatePostingTimes(times) {
    const container = document.getElementById('postingTimes');
    if (!container) return;

    container.innerHTML = times.map(time => `
        <div class="time-card">
            <div class="time-day">${escapeHtml(time.day)}</div>
            <div class="time-value">${escapeHtml(time.time)}</div>
            <div class="time-engagement">${escapeHtml(time.expected_engagement)}</div>
        </div>
    `).join('');
}

function populateContentCalendar(suggestions) {
    const container = document.getElementById('contentCalendar');
    if (!container) return;

    container.innerHTML = suggestions.map((suggestion, index) => `
        <div class="suggestion-item">${escapeHtml(suggestion)}</div>
    `).join('');
}

function populateCompetitorInsights(insights) {
    const container = document.getElementById('competitorInsights');
    if (!container) return;

    container.innerHTML = `
        <div class="insight-card">
            <div class="insight-title">Top Performing Formats</div>
            <ul class="insight-list">
                ${insights.top_performing_formats.map(format => `<li>${escapeHtml(format)}</li>`).join('')}
            </ul>
        </div>
        <div class="insight-card">
            <div class="insight-title">Common Pain Points</div>
            <ul class="insight-list">
                ${insights.common_pain_points.map(point => `<li>${escapeHtml(point)}</li>`).join('')}
            </ul>
        </div>
        <div class="insight-card">
            <div class="insight-title">Opportunities</div>
            <ul class="insight-list">
                ${insights.opportunities.map(opp => `<li>${escapeHtml(opp)}</li>`).join('')}
            </ul>
        </div>
    `;
}

function populateTools(tools) {
    const container = document.getElementById('toolsResources');
    if (!container) return;

    container.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <div class="tool-name">${escapeHtml(tool.tool_name)}</div>
            <div class="tool-purpose">${escapeHtml(tool.purpose)}</div>
            <span class="tool-cost ${tool.cost.toLowerCase()}">${tool.cost}</span>
        </div>
    `).join('');
}

function downloadReport(results, input) {
    const report = generateReportText(results, input);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TrendMaster_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function generateReportText(results, input) {
    let report = `TRENDMASTER ANALYSIS REPORT\n`;
    report += `${'='.repeat(50)}\n\n`;

    report += `ANALYSIS DETAILS\n`;
    report += `${'-'.repeat(50)}\n`;
    report += `Niche: ${input.niche}\n`;
    report += `Platform: ${input.platform}\n`;
    report += `Target Audience: ${input.target_audience}\n`;
    report += `Content Style: ${input.content_style}\n`;
    report += `Generated: ${new Date().toLocaleString()}\n\n`;

    report += `TRENDING TOPICS\n`;
    report += `${'-'.repeat(50)}\n`;
    results.trending_topics.forEach(topic => {
        report += `\n• ${topic.topic}\n`;
        report += `  Relevance: ${topic.relevance_score}% | Trend: ${topic.growth_trend} | Volume: ${topic.search_volume}\n`;
        report += `  Interest: ${topic.audience_interest}\n`;
    });

    report += `\n\nHASHTAG STRATEGY\n`;
    report += `${'-'.repeat(50)}\n`;
    results.hashtag_strategy.forEach(h => {
        report += `\n${h.hashtag} (${h.type})\n`;
        report += `  Expected Reach: ${h.expected_reach}\n`;
    });

    report += `\n\nCONTENT TEMPLATES\n`;
    report += `${'-'.repeat(50)}\n`;
    results.content_templates.forEach(template => {
        report += `\n${template.template_name} (${template.duration})\n`;
        report += `  Structure: ${template.structure}\n`;
        report += `  Key Hooks: ${template.key_hooks.join(', ')}\n`;
        report += `  Engagement Tactics: ${template.engagement_tactics.join(', ')}\n`;
    });

    report += `\n\nBEST POSTING TIMES\n`;
    report += `${'-'.repeat(50)}\n`;
    results.best_posting_times.forEach(time => {
        report += `\n${time.day} at ${time.time}\n`;
        report += `  Expected Engagement: ${time.expected_engagement}\n`;
    });

    report += `\n\nCONTENT CALENDAR SUGGESTIONS\n`;
    report += `${'-'.repeat(50)}\n`;
    results.content_calendar_suggestions.forEach((suggestion, index) => {
        report += `\n${index + 1}. ${suggestion}\n`;
    });

    report += `\n\nCOMPETITOR INSIGHTS\n`;
    report += `${'-'.repeat(50)}\n`;
    report += `\nTop Performing Formats:\n`;
    results.competitor_insights.top_performing_formats.forEach(format => {
        report += `  • ${format}\n`;
    });
    report += `\nCommon Pain Points:\n`;
    results.competitor_insights.common_pain_points.forEach(point => {
        report += `  • ${point}\n`;
    });
    report += `\nOpportunities:\n`;
    results.competitor_insights.opportunities.forEach(opp => {
        report += `  • ${opp}\n`;
    });

    report += `\n\nRECOMMENDED TOOLS\n`;
    report += `${'-'.repeat(50)}\n`;
    results.tools_and_resources.forEach(tool => {
        report += `\n${tool.tool_name} (${tool.cost})\n`;
        report += `  Purpose: ${tool.purpose}\n`;
    });

    report += `\n\n${'='.repeat(50)}\n`;
    report += `Report generated by TrendMaster\n`;

    return report;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
