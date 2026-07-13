// Open nav from hamburger
function toggleNav(e) {
    e.stopPropagation();
    const wrapper = document.getElementById('nav-links-wrapper');
    const isOpen = wrapper.classList.toggle('open');
    document.getElementById('nav-hamburger').setAttribute('aria-expanded', isOpen);
    wrapper.inert = !isOpen;
}

// Close nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links-wrapper').classList.remove('open');
    });
});

// Close nav when clicking outside
document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('nav-links-wrapper');
    const nav = document.querySelector('nav');
    if (!nav.contains(e.target)) {
        document.getElementById('nav-links-wrapper').classList.remove('open');
    }
});

// Check if using touchscreen
const isTouchDevice = () => !window.matchMedia('(hover: hover)').matches;

// Set all card backs to inert on load (nothing starts flipped)
document.querySelectorAll('.projects-card-back').forEach(back => {
    back.inert = true;
});

// Add click listeners to all project cards
document.querySelectorAll('.projects-card').forEach(card => {
    const back = card.querySelector('.projects-card-back');

    card.addEventListener('click', function(e) {
        if (!isTouchDevice()) return;      // do nothing on hover-capable devices
        if (e.target.closest('a')) return; // let links work normally

        const isFlipped = this.classList.toggle('flipped');
        back.inert = !isFlipped;
    });

    // Keep inert in sync with the CSS :hover flip on mouse devices
    if (!isTouchDevice()) {
        card.addEventListener('mouseenter', () => { back.inert = false; });
        card.addEventListener('mouseleave', () => { back.inert = true; });
    }
});

// Screen reader compatibility - button to flip cards
document.querySelectorAll('.projects-card-flip-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.projects-card');
        const isFlipped = card.classList.toggle('flipped');
        this.setAttribute('aria-expanded', isFlipped);
        card.querySelector('.projects-card-back').inert = !isFlipped;
    });
});

// Close any flipped project card when clicking outside it
document.addEventListener('click', function(e) {
    document.querySelectorAll('.projects-card.flipped').forEach(card => {
        if (!card.contains(e.target)) {
            card.classList.remove('flipped');
            card.querySelector('.projects-card-back').inert = true;
            const btn = card.querySelector('.projects-card-flip-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
    });
});

//  Footer icon Easter egg
function wakeIcon(e) {
    const img = document.getElementById('footer-icon-img');
    const duration = 6900; // ms
    img.src = 'images/favicon_footer_click.gif';
    setTimeout(() => {
        img.src = 'images/favicon_footer.gif';
    }, duration);    
}