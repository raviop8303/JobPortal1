// --- Global Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Load job listings on the homepage
    displayJobListings(jobs);
    console.log('✅ Jobs displayed');

    // Event Listeners for Navigation
    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        showJobSearch();
    });

    document.getElementById('nav-logout').addEventListener('click', (e) => {
        e.preventDefault();
        simulateLogout(); // Call the centralized logout function
        showToast("You have been logged out.", {type:'info'});
        window.location.href = 'login.html'; // Redirect to login page after logout
    });

    document.getElementById('nav-login').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Theme toggle setup: persists choice in localStorage
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });
        // set initial icon
        themeToggle.textContent = document.documentElement.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
    
    const dashboardToggle = document.getElementById('dashboard-toggle');
    const dashboardPanel = document.getElementById('dashboard-section');
    const dashboardClose = document.getElementById('dashboard-close');
    const dashboardOverlay = document.getElementById('dashboard-overlay');
    function openDashboard(){
        if (!dashboardPanel) return;
        loadDashboard();
        dashboardPanel.classList.add('open');
        dashboardPanel.classList.remove('section-hidden');
        dashboardPanel.setAttribute('aria-hidden','false');
        if (dashboardOverlay) dashboardOverlay.classList.add('open');
    }
    function closeDashboard(){
        if (!dashboardPanel) return;
        dashboardPanel.classList.remove('open');
        if (dashboardOverlay) dashboardOverlay.classList.remove('open');
        // hide after transition
        setTimeout(()=> dashboardPanel.classList.add('section-hidden'), 300);
    }
    if (dashboardToggle) dashboardToggle.addEventListener('click', (e)=>{ e.preventDefault(); dashboardPanel.classList.contains('open') ? closeDashboard() : openDashboard(); });
    if (dashboardClose) dashboardClose.addEventListener('click', (e)=>{ e.preventDefault(); closeDashboard(); });
    if (dashboardOverlay) dashboardOverlay.addEventListener('click', ()=> closeDashboard());

    // View All Jobs button
    const viewAllJobsBtn = document.getElementById('view-all-jobs-btn');
    if (viewAllJobsBtn) {
        viewAllJobsBtn.addEventListener('click', () => {
            document.getElementById('job-search-section').style.display = 'none';
            document.getElementById('all-jobs-section').classList.remove('section-hidden');
            displayAllJobs(jobs);
        });
    }

    // Back to home button
    const backToHomeBtn = document.getElementById('back-to-home');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            document.getElementById('all-jobs-section').classList.add('section-hidden');
            document.getElementById('job-search-section').style.display = 'block';
        });
    }
});

// Prevent default navigation for any anchors using href="#" (global safety)
document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (a && (a.getAttribute('href') === '#' || a.getAttribute('href') === '')) {
        e.preventDefault();
    }
});


function showJobSearch() {
    // Hide other sections and show the search section
    document.getElementById('job-search-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
}


// --- 4. Job Search & Display ---

function displayJobListings(jobList) {
    const container = document.getElementById('job-listings');

    // Use a DocumentFragment to build nodes to minimize layout thrashing
    const frag = document.createDocumentFragment();
    
    if (jobList.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No jobs found matching your criteria.';
        frag.appendChild(p);
        container.replaceChildren(frag);
        return;
    }

    jobList.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.setAttribute('data-job-id', job.id);

        const title = document.createElement('h3');
        title.textContent = job.title;
        card.appendChild(title);

        const meta = document.createElement('div');
        meta.className = 'job-meta';
        meta.innerHTML = `<strong>${job.company}</strong> • <span>${job.location}</span>`;
        card.appendChild(meta);

        const salary = document.createElement('p');
        salary.className = 'job-salary';
        salary.style.marginTop = '8px';
        salary.innerHTML = `<strong>Salary:</strong> ${job.salary}`;
        card.appendChild(salary);

        const desc = document.createElement('p');
        desc.className = 'job-desc';
        desc.textContent = (job.description || '').substring(0, 140) + ((job.description && job.description.length > 140) ? '...' : '');
        card.appendChild(desc);

        const actions = document.createElement('div');
        actions.className = 'job-actions';

        const apply = document.createElement('button');
        apply.className = 'apply-btn';
        apply.textContent = 'Apply Now';
        apply.addEventListener('click', () => applyForJob(job.id));
        actions.appendChild(apply);

        const companyBtn = document.createElement('button');
        companyBtn.className = 'view-company-btn';
        companyBtn.textContent = 'View Company';
        companyBtn.addEventListener('click', () => viewCompanyProfile(job.company));
        actions.appendChild(companyBtn);

        card.appendChild(actions);

        frag.appendChild(card);
    });

    // replace children in one operation to reduce flicker
    container.replaceChildren(frag);
}

// Simple client-side search/filter
function searchJobs() {
    const keyword = document.getElementById('keyword-search').value.toLowerCase();
    const location = document.getElementById('location-filter').value.toLowerCase();

    // [Backend Integration Point] In a real app, this would be a single API call to the server:
    // fetch(`/api/jobs?keyword=${keyword}&location=${location}`)
    
    const filteredJobs = jobs.filter(job => {
        const matchesKeyword = !keyword || 
                               job.title.toLowerCase().includes(keyword) || 
                               job.description.toLowerCase().includes(keyword);
        const matchesLocation = !location || job.location.toLowerCase() === location;
        
        return matchesKeyword && matchesLocation;
    });
    
    displayJobListings(filteredJobs);
}

// Enhance job listing functionality
function fetchJobListings() {
    const container = document.getElementById('job-listings');

    // show skeleton placeholders while loading
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const s = document.createElement('div');
        s.className = 'job-card skeleton';
        s.style.height = '84px';
        container.appendChild(s);
    }

    // simulate async fetch
    setTimeout(() => {
        // merge into global `jobs` so other modules see the same list
        if (typeof jobs !== 'undefined') {
            displayJobListings(jobs);
        }
    }, 700);
}


// Call fetchJobListings on page load
fetchJobListings();


function updateNavUI(isAuthenticated, role) {
    const loginLink = document.getElementById('nav-login');
    const logoutBtn = document.getElementById('nav-logout');
    const dashboardLink = document.getElementById('nav-dashboard');

    if (isAuthenticated) {
        loginLink.classList.add('hidden'); // Use class for hiding
        logoutBtn.classList.remove('hidden'); // Use class for showing
        // dashboardLink.style.display = 'inline'; // Assuming dashboardLink is always present but hidden via CSS
        // dashboardLink.textContent = role === 'employer' ? 'Employer Dashboard' : 'Job Seeker Dashboard';
    } else {
        loginLink.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        // dashboardLink.style.display = 'none';
    }
}


function displayAllJobs(jobList) {
    const container = document.getElementById('all-jobs-list');
    if (!container) return;

    if (jobList.length === 0) {
        container.innerHTML = '<p>No jobs found.</p>';
        return;
    }

    container.innerHTML = '';
    jobList.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> • ${job.location}</p>
            <p class="job-salary"><strong>Salary:</strong> ${job.salary}</p>
            <p class="job-desc">${job.description.substring(0, 150)}...</p>
            <div class="job-actions">
                <button class="apply-btn" onclick="applyForJob(${job.id})">Apply Now</button>
                <button class="view-company-btn" onclick="viewCompanyProfile('${job.company}')">View Company</button>
            </div>
        `;
        container.appendChild(card);
    });
}
