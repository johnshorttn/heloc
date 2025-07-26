let loggedIn = false;
// Query DOM elements after DOM is loaded
let tabs, sections;
document.addEventListener('DOMContentLoaded', function() {
    tabs = document.querySelectorAll('.tabs li');
    sections = document.querySelectorAll('.tab-content');
    window.onload();
});

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
                <label><input type="checkbox" disabled="${!loggedIn}"> Applied</label>
                <label><input type="checkbox" disabled="${!loggedIn}"> Skipped</label>
                <br>
                <textarea placeholder="Notes" ${!loggedIn ? 'disabled' : ''}></textarea>
                <hr>
            `;
            catDiv.appendChild(lenderDiv);
        });
        lenderList.appendChild(catDiv);
    });
}

if (tabs && sections) {
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
}

// Login logic
function login() {
    const password = document.getElementById('login-password').value;
    const encrypted = btoa('101324'); // simple base64 for demo
    if (btoa(password) === encrypted) {
        document.getElementById('login-modal').style.display = 'none';
        loggedIn = true;
        // Switch to Lenders tab and render lenders
        tabs.forEach(t => t.classList.remove('active'));
        tabs[1].classList.add('active');
        sections.forEach((sec, sidx) => {
            sec.style.display = (sidx === 1) ? 'block' : 'none';
        });
        renderLenders();
    } else {
        alert('Incorrect password');
    }
}

// Show login modal on load
window.onload = function() {
    document.getElementById('login-modal').style.display = 'flex';
    loggedIn = false;
    // Default to Lenders tab
    if (!tabs || !sections) return;
    tabs.forEach(t => t.classList.remove('active'));
    tabs[1].classList.add('active');
    sections.forEach((sec, sidx) => {
        sec.style.display = (sidx === 1) ? 'block' : 'none';
    });
    renderLenders();
};

