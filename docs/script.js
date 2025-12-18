// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Smooth scroll
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add subtle parallax to orbs
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const move = (index + 1) * 10;
        orb.style.transform = `translate(${x * move}px, ${y * move}px)`;
    });
});

// Snow control (start/stop)
let _snowInterval = null;
let _snowContainer = null;

function startSnow() {
    if (_snowInterval) return;
    _snowContainer = document.createElement('div');
    _snowContainer.id = 'snow-container';
    _snowContainer.style.position = 'fixed';
    _snowContainer.style.top = '0';
    _snowContainer.style.left = '0';
    _snowContainer.style.width = '100%';
    _snowContainer.style.height = '100%';
    _snowContainer.style.pointerEvents = 'none';
    _snowContainer.style.zIndex = '10000';
    document.body.appendChild(_snowContainer);

    _snowInterval = setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.innerHTML = '❄';
        _snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 6000);
    }, 200);
}

function stopSnow() {
    if (_snowInterval) {
        clearInterval(_snowInterval);
        _snowInterval = null;
    }
    if (_snowContainer) {
        _snowContainer.remove();
        _snowContainer = null;
    }
}

// Theme (dark mode) toggle with persistence
function applyTheme(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        if (toggle) {
            toggle.setAttribute('aria-pressed', 'true');
            toggle.textContent = '☀️';
        }
    } else {
        document.body.classList.remove('dark');
        if (toggle) {
            toggle.setAttribute('aria-pressed', 'false');
            toggle.textContent = '🌙';
        }
    }
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    // Determine initial theme: stored preference > system preference > light
    const stored = localStorage.getItem('theme');
    if (stored) {
        applyTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        applyTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // ignore storage errors
        }
    });
}

// Initialize theme toggle after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// Christmas countdown
function updateCountdown() {
    const now = new Date();
    const christmas = new Date(now.getFullYear(), 11, 25); // December 25
    if (now > christmas) {
        christmas.setFullYear(now.getFullYear() + 1);
    }
    const diff = christmas - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Christmas lights
function createLights() {
    const lights = document.getElementById('lights');
    if (!lights) return;
    lights.innerHTML = '';
    const colors = ['#ffdf00', '#ff3b3b', '#00d1b2', '#ffd1dc', '#9b111e'];
    const count = Math.floor(window.innerWidth / 40);
    for (let i = 0; i < count; i++) {
        const bulb = document.createElement('div');
        bulb.className = 'bulb';
        bulb.style.left = (i * (100 / count)) + '%';
        bulb.style.color = colors[i % colors.length];
        bulb.style.animation = `bulb-flicker ${1 + Math.random() * 2}s infinite`;
        bulb.style.animationDelay = (Math.random() * 1) + 's';
        lights.appendChild(bulb);
    }
}

function removeLights() {
    const lights = document.getElementById('lights');
    if (lights) lights.innerHTML = '';
}

function enableChristmas(on) {
    const btn = document.getElementById('christmas-toggle');
    const banner = document.getElementById('xmas-banner');
    if (on) {
        document.body.classList.add('christmas');
        if (btn) btn.setAttribute('aria-pressed', 'true');
        if (banner) banner.style.display = 'block';
        startSnow();
        createLights();
        localStorage.setItem('christmas', 'on');
    } else {
        document.body.classList.remove('christmas');
        if (btn) btn.setAttribute('aria-pressed', 'false');
        if (banner) banner.style.display = 'none';
        stopSnow();
        removeLights();
        localStorage.setItem('christmas', 'off');
    }
}

// Wire the toggle
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('christmas-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const isOn = document.body.classList.contains('christmas');
        enableChristmas(!isOn);
    });

    const saved = localStorage.getItem('christmas');
    if (saved === 'on') enableChristmas(true);
});

// New Year modal + confetti
function openNewYear() {
    const modal = document.getElementById('newyear-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    // create initial confetti burst
    burstConfetti(60);
}

function closeNewYear() {
    const modal = document.getElementById('newyear-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
}

function createConfettiPiece(x, color) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = color;
    el.style.left = x + '%';
    el.style.top = (-10 - Math.random() * 10) + 'vh';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    el.style.width = (6 + Math.random() * 10) + 'px';
    el.style.height = (10 + Math.random() * 12) + 'px';
    el.style.borderRadius = (Math.random()*3)+'px';
    const duration = 2500 + Math.random()*2000;
    el.style.animation = `confetti-fall ${duration}ms linear forwards`;
    el.style.left = (Math.random()*100) + '%';
    return el;
}

function burstConfetti(amount=40) {
    const root = document.getElementById('confetti-root');
    if (!root) return;
    const colors = ['#ff3b3b','#ffd700','#00d1b2','#9b111e','#ff8a00','#00a3ff'];
    for (let i=0;i<amount;i++){
        const piece = createConfettiPiece(Math.random()*100, colors[i%colors.length]);
        root.appendChild(piece);
        // remove after animation
        setTimeout(()=>{ piece.remove(); }, 6000 + Math.random()*2000);
    }
}

// Wire New Year buttons
document.addEventListener('click', (e)=>{
    if (e.target && e.target.id === 'newyear-toggle') {
        openNewYear();
    }
    if (e.target && e.target.id === 'close-newyear') {
        closeNewYear();
    }
    if (e.target && e.target.id === 'open-confetti') {
        burstConfetti(120);
    }
    if (e.target && e.target.id === 'dismiss-newyear') {
        closeNewYear();
        try{ localStorage.setItem('newyear-dismissed','1'); }catch(e){}
    }
});

// Auto-show unless dismissed
document.addEventListener('DOMContentLoaded', ()=>{
    try{
        const dismissed = localStorage.getItem('newyear-dismissed');
        if (!dismissed) {
            // show once on load
            const now = new Date();
            // Show if within Jan 1-7 or user requested via button anytime
            if ( (now.getMonth()===0 && now.getDate()<=7) || true ) {
                // show small delay so page finishes rendering
                setTimeout(()=>{ openNewYear(); }, 800);
            }
        }
    }catch(e){}
});