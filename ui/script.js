document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initChart();
    initBlueprintControls();
    simulateResearchActivity();
});

// --- Tab Navigation ---
function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');

            // UI State Update
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));

            item.classList.add('active');
            const targetView = document.getElementById(`view-${tabId}`);
            if (targetView) targetView.classList.add('active');

            // Header Update
            const titles = {
                'dashboard': 'Mission Control',
                'blueprint': 'Model Blueprint',
                'repository': 'Knowledge Base',
                'settings': 'System Parameters'
            };
            pageTitle.textContent = titles[tabId] || 'Dashboard';
        });
    });
}

// --- Chart.js Configuration ---
let evolutionChart;
function initChart() {
    const ctx = document.getElementById('evolutionChart').getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

    const config = {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `E-${i + 1}`),
            datasets: [{
                label: 'System Accuracy (Loss Inverse)',
                data: generateSeedData(30),
                borderColor: '#38bdf8',
                backgroundColor: gradient,
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: 'rgba(148, 163, 184, 0.05)' },
                    ticks: { color: '#64748b' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', maxRotation: 0 }
                }
            }
        }
    };

    evolutionChart = new Chart(ctx, config);
}

function generateSeedData(points) {
    let data = [];
    let val = 0.45;
    for (let i = 0; i < points; i++) {
        val = val * 1.02 + (Math.random() * 0.05 - 0.02);
        data.push(Math.min(0.98, val));
    }
    return data;
}

// --- Blueprint Controls ---
function initBlueprintControls() {
    const ratioSlider = document.getElementById('ratio-slider');
    const ratioVal = document.getElementById('ratio-val');
    const headsSlider = document.getElementById('heads-slider');
    const headsVal = document.getElementById('heads-val');

    if (ratioSlider) {
        ratioSlider.addEventListener('input', (e) => {
            ratioVal.textContent = `${e.target.value}:1`;
            logToTerminal(`Architecture adjusted: Set interleave ratio to ${e.target.value}:1`, 'accent');
        });
    }

    if (headsSlider) {
        headsSlider.addEventListener('input', (e) => {
            headsVal.textContent = e.target.value;
            logToTerminal(`Heads re-calibrated: GQA heads set to ${e.target.value}`, 'accent');
        });
    }
}

// --- Simulation & Telemetry ---
function logToTerminal(message, type = '') {
    const terminal = document.getElementById('terminal-output');
    if (!terminal) return;

    const div = document.createElement('div');
    div.className = 'log-line';
    const timestamp = new Date().toLocaleTimeString();
    div.innerHTML = `<span class="timestamp">[${timestamp}]</span> <span class="${type}">${message}</span>`;

    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
}

function simulateResearchActivity() {
    const logs = [
        "Cortex Kernal Initialized v2.0.1",
        "Loading Hybrid-13 stack (3 Mamba : 1 Transformer)...",
        "CUDA Core Synchronized. Ready for inference.",
        "ArXiv Manifest detected. 0 papers in current pool.",
        "System ready for evolution cycle."
    ];

    logs.forEach((log, i) => {
        setTimeout(() => logToTerminal(log), i * 800);
    });

    // Random telemetry updates
    setInterval(() => {
        if (Math.random() > 0.7) {
            const acc = (0.85 + Math.random() * 0.1).toFixed(4);
            document.getElementById('stat-accuracy').textContent = acc;

            // Update Chart
            if (evolutionChart) {
                evolutionChart.data.datasets[0].data.shift();
                evolutionChart.data.datasets[0].data.push(acc);
                evolutionChart.update('none');
            }
        }
    }, 3000);
}

// Global functions for buttons
async function syncData() {
    logToTerminal('Initializing Knowledge Base synchronization...');
    try {
        // Fetch real data from the scraper's manifest
        const response = await fetch('../manifest.json');
        if (!response.ok) throw new Error('Manifest not found');
        const data = await response.json();

        const knowledgeBase = document.querySelector('#knowledge-base .grid');
        if (!knowledgeBase) return;

        knowledgeBase.innerHTML = ''; // Clear placeholders

        data.forEach(paper => {
            const card = document.createElement('div');
            card.className = 'info-card';
            card.innerHTML = `
                <h4>${paper.title}</h4>
                <p class="summary">${paper.summary}</p>
                <div class="card-meta">
                    <span><i class="fas fa-chart-line"></i> Impact: ${paper.impact_score}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${new Date(paper.added_at).toLocaleDateString()}</span>
                </div>
            `;
            knowledgeBase.appendChild(card);
        });

        logToTerminal(`Sync complete. ${data.length} research papers indexed.`);
    } catch (err) {
        logToTerminal(`Sync failed: ${err.message}. Using simulated data.`);
        // Fallback to simulation if manifest doesn't exist yet
    }
}
window.syncData = syncData;
