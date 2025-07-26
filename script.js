// Simple tab switching
const tabs = document.querySelectorAll('.tabs li');
const sections = document.querySelectorAll('.tab-content');

tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        sections.forEach((sec, sidx) => {
            sec.style.display = (idx === sidx) ? 'block' : 'none';
        });
    });
});

// Login logic
function login() {
    const password = document.getElementById('login-password').value;
    const encrypted = btoa('101324'); // simple base64 for demo
    if (btoa(password) === encrypted) {
        document.getElementById('login-modal').style.display = 'none';
        // Enable settings, share, checkboxes, etc.
    } else {
        alert('Incorrect password');
    }
}

// Show login modal on load
window.onload = function() {
    document.getElementById('login-modal').style.display = 'flex';
};

// Example database object
const lenderDB = [
    // { name: 'Bank A', rating: 4.5, ... }
];
