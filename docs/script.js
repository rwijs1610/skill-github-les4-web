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

// Create falling snow effect
function createSnow() {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    snowContainer.style.position = 'fixed';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none';
    snowContainer.style.zIndex = '9999';
    document.body.appendChild(snowContainer);

    setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.innerHTML = '❄';
        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }, 200);
}

createSnow();

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

// Initialize Christmas tree lights and interactions
function initTreeLights() {
    const tree = document.getElementById('christmas-tree');
    if (!tree) return;

    const ornaments = tree.querySelectorAll('.ornament');

    // Give each ornament a random blink delay and color context
    ornaments.forEach((el, i) => {
        const delay = (Math.random() * 1.5).toFixed(2) + 's';
        el.style.animationDelay = delay;
        // allow CSS currentColor to use the --c value
        el.style.color = el.style.getPropertyValue('--c');
        el.classList.add('blink');
    });

    // Toggle lights on click (add/remove blinking)
    let lightsOn = true;
    tree.addEventListener('click', () => {
        lightsOn = !lightsOn;
        if (lightsOn) {
            tree.classList.remove('lights-off');
            ornaments.forEach(el => el.classList.add('blink'));
        } else {
            tree.classList.add('lights-off');
            ornaments.forEach(el => el.classList.remove('blink'));
        }
    });
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initTreeLights);
// In case script is loaded after DOM
initTreeLights();