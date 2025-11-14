// --- Global Initialization ---

// Toast helper (non-blocking)
function showToast(message, {type='info', duration=3500} = {}){
    const container = document.getElementById('toasts') || (function(){
        const el = document.createElement('div'); el.id='toasts'; el.className='toasts'; el.setAttribute('aria-live','polite'); document.body.appendChild(el); return el;
    })();

    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;
    container.appendChild(t);
    // auto remove
    setTimeout(()=>{
        t.style.opacity = '0';
        t.style.transform = 'translateY(8px)';
        setTimeout(()=>t.remove(), 260);
    }, duration);
    return t;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Job Portal loading...');
    console.log('Total jobs loaded:', jobs ? jobs.length : 0);

    // Check initial authentication state and update UI
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    updateNavUI(isAuthenticated, userRole);

    // Load job listings on the homepage
    if (jobs && jobs.length > 0) {
        displayJobListings(jobs);
        console.log('✅ Jobs displayed');
    } else {
        console.error('❌ No jobs found!');
    }

    // Event Listeners for Navigation
    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        showJobSearch();
    });
    document.getElementById('nav-login').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });
    document.getElementById('nav-logout').addEventListener('click', (e) => {
        e.preventDefault();
        simulateLogout();
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
    // start the title animator (non-blocking)
    try{ startTitleAnimator(2800); }catch(e){ /* ignore if animator fails */ }
    // initialize steppers for jobs/internships
    try{ initSteppers(); updateSteppers(); }catch(e){ console.error('Stepper init failed', e); }
     
    // Setup "View All Jobs" button
    const viewAllBtn = document.getElementById('view-all-jobs-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAllJobsPage();
        });
    }
    
    // Setup back to home button on all-jobs page
    const backBtn = document.getElementById('back-to-home');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showJobSearch();
        });
    }
    
    // Setup all-jobs search filters
    const allSearchBtn = document.getElementById('all-search-btn');
    if (allSearchBtn) {
        allSearchBtn.addEventListener('click', () => searchAllJobs());
    }
    
    // Allow Enter key in search inputs on all-jobs page
    const allSearchInput = document.getElementById('all-search-input');
    if (allSearchInput) {
        allSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') searchAllJobs();
        });
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
});

// Prevent default navigation for any anchors using href="#" (global safety)
document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (a && (a.getAttribute('href') === '#' || a.getAttribute('href') === '')) {
        e.preventDefault();
    }
});

// Keep a simple cache key of the last rendered jobs to avoid unnecessary re-renders
let __lastJobsRenderKey = '';

function showJobSearch() {
    // Hide other sections and show the search section
    document.getElementById('job-search-section').style.display = 'block';
    document.getElementById('auth-form-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('all-jobs-section').style.display = 'none';
    // Keep the DOM structure stable. Do not clear `app-container` to avoid
    // removing event listeners or injected script state which can lead to
    // unexpected reload-like behaviour in some environments.
}

function showAllJobsPage() {
    // Show all-jobs section and hide others
    document.getElementById('job-search-section').style.display = 'none';
    document.getElementById('auth-form-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('all-jobs-section').style.display = 'block';
    // Display all jobs on this page
    displayAllJobs(jobs);
}

function displayAllJobs(jobList) {
    const container = document.getElementById('all-jobs-list');
    if (!container) return;
    
    const frag = document.createDocumentFragment();
    
    if (jobList.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No jobs found.';
        frag.appendChild(p);
        container.replaceChildren(frag);
        return;
    }
    
    jobList.forEach(job => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const userRole = localStorage.getItem('userRole');

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
        salary.innerHTML = `<strong>Salary:</strong> ${job.salary}`;
        card.appendChild(salary);

        const desc = document.createElement('p');
        desc.className = 'job-desc';
        desc.textContent = (job.description || '').substring(0, 200) + ((job.description && job.description.length > 200) ? '...' : '');
        card.appendChild(desc);

        const actions = document.createElement('div');
        actions.className = 'job-actions';

        if (isAuthenticated && userRole === 'jobseeker') {
            const apply = document.createElement('button');
            apply.className = 'apply-btn';
            apply.textContent = 'Apply Now';
            apply.addEventListener('click', () => applyForJob(job.id));
            actions.appendChild(apply);
        } else {
            const note = document.createElement('div');
            note.className = 'job-actions-note';
            note.innerHTML = '<small>Login as Job Seeker to apply.</small>';
            actions.appendChild(note);
        }

        const companyBtn = document.createElement('button');
        companyBtn.className = 'view-company-btn';
        companyBtn.textContent = 'View Company';
        companyBtn.addEventListener('click', () => viewCompanyProfile(job.company));
        actions.appendChild(companyBtn);

        card.appendChild(actions);
        frag.appendChild(card);
    });

    container.replaceChildren(frag);
}

function searchAllJobs() {
    const keyword = (document.getElementById('all-search-input')?.value || '').toLowerCase();
    const type = document.getElementById('all-type-filter')?.value || '';
    const location = (document.getElementById('all-location-filter')?.value || '').toLowerCase();

    let filtered = jobs.filter(job => {
        const matchesKeyword = !keyword || 
                               job.title.toLowerCase().includes(keyword) || 
                               job.company.toLowerCase().includes(keyword) ||
                               job.description.toLowerCase().includes(keyword);
        const matchesType = !type || (type === 'jobs' && !/\bintern\b/i.test(job.title)) || (type === 'internships' && /\bintern\b/i.test(job.title));
        const matchesLocation = !location || job.location.toLowerCase().includes(location);
        
        return matchesKeyword && matchesType && matchesLocation;
    });

    displayAllJobs(filtered);
}

// Simple tab title animator: rotates a small set of informative titles.
function startTitleAnimator(interval = 0) {
    const originals = [
        'Job Listing Portal',
        'Find Your Dream Job — Job Listing Portal',
        'Hire Top Talent Quickly — Job Listing Portal'
    ];
    let i = 0;
    // Set initial title (preserve base title if user customized)
    if (!document.__originalTitle) document.__originalTitle = document.title || 'Job Listing Portal';
    document.title = originals[0];

    setInterval(() => {
        i = (i + 1) % originals.length;
        document.title = originals[i];
    }, interval);
}


// --- 4. Job Search & Display ---

function displayJobListings(jobList) {
    const container = document.getElementById('job-listings');

    // build a lightweight key representing the job list state (id + newlyAdded flag)
    const key = (jobList || []).map(j => `${j.id}:${j.newlyAdded?1:0}`).join(',');
    if (key === __lastJobsRenderKey) {
        // nothing changed, avoid DOM update which can feel like a reload
        return;
    }
    __lastJobsRenderKey = key;

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
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const userRole = localStorage.getItem('userRole');

        const card = document.createElement('div');
        card.className = 'job-card' + (job.newlyAdded ? ' new-job' : '');
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

        if (isAuthenticated && userRole === 'jobseeker') {
            const apply = document.createElement('button');
            apply.className = 'apply-btn';
            apply.textContent = 'Apply Now';
            apply.addEventListener('click', () => applyForJob(job.id));
            actions.appendChild(apply);
        } else {
            const note = document.createElement('div');
            note.className = 'job-actions-note';
            note.innerHTML = '<small>Login as Job Seeker to apply.</small>';
            actions.appendChild(note);
        }

        const companyBtn = document.createElement('button');
        companyBtn.className = 'view-company-btn';
        companyBtn.textContent = 'View Company';
        companyBtn.addEventListener('click', () => viewCompanyProfile(job.company));
        actions.appendChild(companyBtn);

        card.appendChild(actions);

        // schedule removal of new-job highlight without forcing a full rerender
        if (job.newlyAdded) {
            setTimeout(() => {
                job.newlyAdded = false;
                // remove highlight if the element still exists
                if (card && card.classList) card.classList.remove('new-job');
            }, 6000);
        }

        frag.appendChild(card);
    });

    // replace children in one operation to reduce flicker
    container.replaceChildren(frag);

    // staggered fade-in-up entrance for visible cards (added after insert)
    const cards = container.querySelectorAll('.job-card');
    cards.forEach((c, i) => {
        c.classList.remove('fade-in-up');
        c.style.animationDelay = `${i * 70}ms`;
        c.classList.add('fade-in-up');
    });
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

// Simulate real-time incoming jobs (adds a new job every interval)
function simulateRealtimeJobs(interval = 10000) {
    const sampleCompanies = ['TechCorp','DataSync','DesignPro','CloudWorks','NovaLabs'];
    setInterval(() => {
        const id = (jobs && jobs.length) ? Math.max(...jobs.map(j=>j.id)) + 1 : Date.now();
        const newJob = {
            id,
            title: ['Fullstack Engineer','Product Manager','QA Engineer','Mobile Developer'][Math.floor(Math.random()*4)],
            company: sampleCompanies[Math.floor(Math.random()*sampleCompanies.length)],
            location: ['Remote','New York','San Francisco','London'][Math.floor(Math.random()*4)],
            salary: `${40 + Math.floor(Math.random()*60)}k-${60 + Math.floor(Math.random()*80)}k`,
            description: 'This role was just posted — apply quickly to be noticed.',
            newlyAdded: true
        };

        if (typeof jobs !== 'undefined') {
            jobs.unshift(newJob);
            // keep job list size reasonable for demo
            if (jobs.length > 300) jobs.pop();
            displayJobListings(jobs);
            // update stepper views as well
            try{ updateSteppers(); }catch(e){/* ignore */}
        }
    }, interval);
}

// Call fetchJobListings on page load
fetchJobListings();
// Feature flag: enable/disable real-time simulated incoming jobs
const USE_REALTIME = false;
// start the simulated real-time feed only when enabled
if (USE_REALTIME) {
    simulateRealtimeJobs(12000);
}

/* --- Stepper (Jobs / Internships) --- */
const PAGE_SIZE = 10;
const steppers = {
    jobs: { items: [], page: 0, pages: 1 },
    interns: { items: [], page: 0, pages: 1 }
};

function classifyJobs() {
    const interns = jobs.filter(j => /\bintern\b/i.test(j.title));
    const others = jobs.filter(j => !/\bintern\b/i.test(j.title));
    return { interns, others };
}

function initSteppers(){
    const jobsPrev = document.getElementById('jobs-prev');
    const jobsNext = document.getElementById('jobs-next');
    const internPrev = document.getElementById('intern-prev');
    const internNext = document.getElementById('intern-next');

    if (jobsPrev) jobsPrev.addEventListener('click', (e) => { e.preventDefault(); stepPrev('jobs'); });
    if (jobsNext) jobsNext.addEventListener('click', (e) => { e.preventDefault(); stepNext('jobs'); });
    if (internPrev) internPrev.addEventListener('click', (e) => { e.preventDefault(); stepPrev('interns'); });
    if (internNext) internNext.addEventListener('click', (e) => { e.preventDefault(); stepNext('interns'); });
}

function updateSteppers(){
    const { interns, others } = classifyJobs();
    steppers.interns.items = interns;
    steppers.jobs.items = others;
    steppers.interns.pages = Math.max(1, Math.ceil(interns.length / PAGE_SIZE));
    steppers.jobs.pages = Math.max(1, Math.ceil(others.length / PAGE_SIZE));
    // clamp pages
    steppers.interns.page = Math.min(steppers.interns.page, steppers.interns.pages - 1);
    steppers.jobs.page = Math.min(steppers.jobs.page, steppers.jobs.pages - 1);
    renderStepper('jobs');
    renderStepper('interns');
}

function stepNext(type){
    const s = type === 'jobs' ? steppers.jobs : steppers.interns;
    if (s.page < s.pages - 1) s.page++;
    renderStepper(type);
}

function stepPrev(type){
    const s = type === 'jobs' ? steppers.jobs : steppers.interns;
    if (s.page > 0) s.page--;
    renderStepper(type);
}

function renderStepper(type){
    const key = type === 'jobs' ? 'jobs' : 'interns';
    const s = type === 'jobs' ? steppers.jobs : steppers.interns;
    const containerId = type === 'jobs' ? 'jobs-step-list' : 'intern-step-list';
    const indicatorId = type === 'jobs' ? 'jobs-step-indicator' : 'intern-step-indicator';
    const container = document.getElementById(containerId);
    const indicator = document.getElementById(indicatorId);
    if (!container) return;

    const start = s.page * PAGE_SIZE;
    const pageItems = s.items.slice(start, start + PAGE_SIZE);

    // build fragment similar to displayJobListings but smaller
    const frag = document.createDocumentFragment();
    if (pageItems.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No items in this section.';
        frag.appendChild(p);
    } else {
        // Render a compact list for steppers to avoid clutter: title — company
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        ul.style.margin = '0';
        pageItems.forEach(job => {
            const li = document.createElement('li');
            li.className = 'mini-item';
            const title = document.createElement('div');
            title.className = 'mini-title';
            title.textContent = job.title;
            const meta = document.createElement('div');
            meta.className = 'mini-meta';
            meta.textContent = job.company + (job.location ? ' • ' + job.location : '');
            const row = document.createElement('div');
            row.appendChild(title);
            row.appendChild(meta);
            // small view button
            const viewBtn = document.createElement('button');
            viewBtn.className = 'view-company-btn';
            viewBtn.textContent = 'View';
            viewBtn.style.fontSize = '12px';
            viewBtn.style.padding = '6px 8px';
            viewBtn.addEventListener('click', ()=>viewCompanyProfile(job.company));
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = 'space-between';
            wrapper.style.alignItems = 'center';
            const left = document.createElement('div');
            left.appendChild(title);
            left.appendChild(meta);
            wrapper.appendChild(left);
            wrapper.appendChild(viewBtn);
            li.appendChild(wrapper);
            ul.appendChild(li);
        });
        frag.appendChild(ul);
    }

    container.replaceChildren(frag);
    if (indicator) indicator.textContent = `Step ${s.page + 1} of ${s.pages}`;
}