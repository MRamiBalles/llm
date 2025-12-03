document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initChart();
    initSliders();
    simulateStartup();
});

// --- Tab Navigation ---
function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });

            // Add active to clicked
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            const targetView = document.getElementById(`view-${tabId}`);
            
            if (targetView) {
                targetView.style.display = 'block';
                setTimeout(() => targetView.classList.add('active'), 10); // Fade in
            }

            // Update Title
            const titles = {
                'dashboard': 'Mission Control',
                'genome': 'Genome Architect',
                'papers': 'Knowledge Base',
                'settings': 'System Settings'
            };
            pageTitle.textContent = titles[tabId] || 'Dashboard';
        });
    });
}

// --- Chart.js Initialization ---
let evolutionChart;

function initChart() {
    const ctx = document.getElementById('evolutionChart').getContext('2d');
    
    // Gradient for the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

    const data = {
        labels: Array.from({length: 20}, (_, i) => i + 1),
        datasets: [{
            label: 'Best Fitness (Loss)',
            data: generateRandomData(20),
            borderColor: '#38bdf8',
            backgroundColor: gradient,
            borderWidth: 2,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#38bdf8',
            fill: true,
            tension: 0.4
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            },
            animation: {
                y: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        }
    };

    evolutionChart = new Chart(ctx, config);
}

function generateRandomData(points) {
    let data = [];
    let val = 5.0;
    for(let i=0; i<points; i++) {
        val = val * 0.9 + (Math.random() * 0.2);
        data.push(val);
    }
    return data;
}

// --- Sliders ---
function initSliders() {
    const sliders = ['layers', 'heads'];
    sliders.forEach(id => {
        const slider = document.getElementById(`${id}-slider`);
        const display = document.getElementById(`${id}-val`);
        
        if(slider && display) {
            slider.addEventListener('input', (e) => {
                display.textContent = e.target.value;
            });
        }
    });
}

// --- Simulation ---
function simulateStartup() {
    const terminal = document.getElementById('terminal-output');
    const logs = [
        "Initializing EvoAI Core...",
        "Loading CUDA drivers... [OK]",
        "Mounting file system... [OK]",
        "Checking for Disruptive Papers... [0 Found]",
        "System Ready. Waiting for Genome configuration."
    ];

    let delay = 500;
    logs.forEach((log, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'log-line';
            div.innerHTML = `<span class="timestamp">[${new Date().toLocaleTimeString()}]</span> ${log}`;
            terminal.appendChild(div);
            terminal.scrollTop = terminal.scrollHeight;
        }, delay * (index + 1));
    });
}
