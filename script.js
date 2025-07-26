// Simple tab switching
tabs.forEach((tab, idx) => {
const tabs = document.querySelectorAll('.tabs li');
const sections = document.querySelectorAll('.tab-content');

function renderLenders() {
    if (!window.lenderDB) return;
    const lenderList = document.getElementById('lender-list');
    lenderList.innerHTML = '';
    const categories = ['Credit Union', 'Bank', 'Online Lender'];
    categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'lender-category';
        catDiv.innerHTML = `<h3>${cat}s</h3>`;
        window.lenderDB.filter(l => l.type === cat).forEach(lender => {
            const lenderDiv = document.createElement('div');
            lenderDiv.className = 'lender-card';
            lenderDiv.innerHTML = `
                <strong>${lender.name}</strong> (Rating: ${lender.rating})<br>
                <a href="${lender.website}" target="_blank">Website</a><br>
                <span>${lender.about}</span><br>
                <span>Contact: ${lender.contact.officer} (${lender.contact.officerPhone})</span><br>
                <span>Apply: <a href="${lender.applyLink}" target="_blank">HELOC Application</a></span><br>
                <span>Probability: ${lender.probability}</span><br>
                <span>Notes: ${lender.notes}</span><br>
                <span>Questions: ${lender.questions.join(', ')}</span><br>
                <span>Reviews: ${lender.reviews.map(r => r.text + ' (' + r.rating + '⭐)').join(', ')}</span><br>
                <hr>
            `;
            catDiv.appendChild(lenderDiv);
        });
        lenderList.appendChild(catDiv);
    });
}

tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        sections.forEach((sec, sidx) => {
            sec.style.display = (idx === sidx) ? 'block' : 'none';
        });
        // If Lenders tab, render lenders
        if (tab.id === 'tab-lenders') renderLenders();
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
    // Default to login tab
    tabs.forEach(t => t.classList.remove('active'));
    tabs[0].classList.add('active');
    sections.forEach((sec, sidx) => {
        sec.style.display = (sidx === 0) ? 'block' : 'none';
    });
};

// Example database object
const lenderDB = [
// lenderDB is now defined in index.html
