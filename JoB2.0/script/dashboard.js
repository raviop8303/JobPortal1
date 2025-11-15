// --- 2. Profile Management & 6. Dashboard (Simulated) ---

// Dummy data for simulation
let jobs = [
    { id: 1, title: "Frontend Intern", company: "TechNova", location: "Remote", salary: "28k-38k", description: "Assist in building responsive web UIs with React and modern CSS.", applications: [] },
    { id: 2, title: "Backend Intern", company: "ByteWorks", location: "New York", salary: "30k-40k", description: "Work on REST APIs and microservices with Node.js/Express.", applications: [] },
    { id: 3, title: "Full Stack Intern", company: "DataPulse", location: "San Francisco", salary: "32k-45k", description: "Contribute to frontend and backend features in a cloud environment.", applications: [] },
    { id: 4, title: "DevOps Intern", company: "CloudForge", location: "Remote", salary: "30k-42k", description: "Help automate CI/CD and manage container workflows (Docker/K8s).", applications: [] },
    { id: 5, title: "Data Science Intern", company: "NextGen Labs", location: "Boston", salary: "34k-44k", description: "Work with datasets to build ML models and exploratory analysis.", applications: [] },
    { id: 6, title: "Machine Learning Intern", company: "SysWave", location: "Austin", salary: "36k-48k", description: "Experiment with neural models and assist with model deployment.", applications: [] },
    { id: 7, title: "QA Intern", company: "NetCore", location: "Chicago", salary: "26k-36k", description: "Write test cases and automate test suites for web applications.", applications: [] },
    { id: 8, title: "Mobile Dev Intern", company: "QuantumSoft", location: "Seattle", salary: "30k-40k", description: "Develop React Native components and mobile UI flows.", applications: [] },
    { id: 9, title: "UI/UX Intern", company: "AlgoWorks", location: "Remote", salary: "25k-35k", description: "Design interfaces and perform usability testing with users.", applications: [] },
    { id: 10, title: "Security Intern", company: "PixelCraft", location: "Los Angeles", salary: "32k-42k", description: "Assist in vulnerability assessments and secure coding reviews.", applications: [] },
    { id: 11, title: "Database Intern", company: "DevSphere", location: "New York", salary: "34k-44k", description: "Learn database administration tasks for Postgres and MySQL.", applications: [] },
    { id: 12, title: "Systems Intern", company: "CodeCrafters", location: "San Francisco", salary: "33k-43k", description: "Work on system-level tooling and performance profiling.", applications: [] },
    { id: 13, title: "Cloud Engineer Intern", company: "NeuralWay", location: "Remote", salary: "35k-50k", description: "Support cloud infra, IaC with Terraform and AWS.", applications: [] },
    { id: 14, title: "Product Manager Intern", company: "SecureNet", location: "Palo Alto", salary: "28k-38k", description: "Assist product teams with roadmaps and user research.", applications: [] },
    { id: 15, title: "SRE Intern", company: "InfraLogic", location: "Boston", salary: "36k-48k", description: "Monitor production services and improve reliability.", applications: [] },
    { id: 16, title: "Network Engineer Intern", company: "AppTrail", location: "Chicago", salary: "30k-40k", description: "Support networking tasks and infrastructure troubleshooting.", applications: [] },
    { id: 17, title: "AI Research Intern", company: "MobileMint", location: "Remote", salary: "40k-55k", description: "Research on ML algorithms and prototype models.", applications: [] },
    { id: 18, title: "Embedded Systems Intern", company: "GraphixStudios", location: "Los Angeles", salary: "34k-44k", description: "Work on firmware and embedded C/C++ projects.", applications: [] },
    { id: 19, title: "Game Dev Intern", company: "GameCore", location: "Seattle", salary: "30k-42k", description: "Develop game features and graphics rendering code.", applications: [] },
    { id: 20, title: "Site Reliability Intern", company: "AutoAI", location: "Austin", salary: "36k-50k", description: "Improve system availability and incident response processes.", applications: [] },
    { id: 21, title: "Support Engineer Intern", company: "RoboDynamics", location: "Remote", salary: "24k-34k", description: "Provide technical support for onboarding customers.", applications: [] },
    { id: 22, title: "Business Analyst Intern", company: "GridSoft", location: "New York", salary: "28k-38k", description: "Analyze business requirements and assist with reports.", applications: [] },
    { id: 23, title: "Security Analyst Intern", company: "InfoMatrix", location: "Washington DC", salary: "34k-44k", description: "Monitor alerts and assist in SOC operations.", applications: [] },
    { id: 24, title: "DevOps Engineer Intern", company: "CoreStack", location: "San Francisco", salary: "34k-46k", description: "Automate deployments and build CI workflows.", applications: [] },
    { id: 25, title: "Frontend Developer", company: "BlueOcean Tech", location: "Remote", salary: "45k-60k", description: "Build modern web apps using React and TypeScript.", applications: [] },
    { id: 26, title: "Backend Developer", company: "GreenByte", location: "Boston", salary: "48k-65k", description: "Design scalable services and APIs in Node/Python.", applications: [] },
    { id: 27, title: "Full Stack Developer", company: "SilverLine", location: "Chicago", salary: "50k-70k", description: "Work across frontend and backend to deliver features.", applications: [] },
    { id: 28, title: "Data Engineer", company: "Mercury Labs", location: "Seattle", salary: "55k-75k", description: "Develop ETL pipelines and data warehouses.", applications: [] },
    { id: 29, title: "ML Engineer", company: "Orion Systems", location: "Remote", salary: "60k-85k", description: "Productionize ML models and monitoring systems.", applications: [] },
    { id: 30, title: "QA Automation Engineer", company: "HelixSoft", location: "Los Angeles", salary: "42k-58k", description: "Build automated test frameworks and CI integration.", applications: [] },
    { id: 31, title: "Mobile Engineer", company: "ApexCloud", location: "San Francisco", salary: "52k-68k", description: "Develop native and cross-platform mobile apps.", applications: [] },
    { id: 32, title: "Cloud Architect", company: "StellarData", location: "Austin", salary: "80k-110k", description: "Architect cloud solutions on AWS/GCP/Azure.", applications: [] },
    { id: 33, title: "Data Analyst", company: "HorizonTech", location: "New York", salary: "45k-60k", description: "Perform data analysis and build dashboards.", applications: [] },
    { id: 34, title: "Security Engineer", company: "Vertex Solutions", location: "Washington DC", salary: "65k-90k", description: "Implement security controls and SOC tooling.", applications: [] },
    { id: 35, title: "Systems Engineer", company: "NimbusSoft", location: "Remote", salary: "50k-70k", description: "Manage and improve internal systems and tooling.", applications: [] },
    { id: 36, title: "Network Engineer", company: "EchoTech", location: "Boston", salary: "48k-62k", description: "Design and troubleshoot network infrastructure.", applications: [] },
    { id: 37, title: "Database Engineer", company: "Catalyst Systems", location: "Chicago", salary: "55k-75k", description: "Optimize database performance and backups.", applications: [] },
    { id: 38, title: "Graphics Programmer", company: "FusionWorks", location: "Los Angeles", salary: "58k-78k", description: "Work on rendering pipelines and shader development.", applications: [] },
    { id: 39, title: "Embedded Firmware Engineer", company: "VantageAI", location: "Austin", salary: "54k-72k", description: "Develop firmware for embedded devices in C/C++.", applications: [] },
    { id: 40, title: "Robotics Intern", company: "Prism Labs", location: "San Francisco", salary: "36k-50k", description: "Prototype robotic control algorithms and simulation.", applications: [] },
    { id: 41, title: "Site Reliability Engineer", company: "Beacon Tech", location: "Remote", salary: "70k-95k", description: "Improve service reliability and incident response.", applications: [] },
    { id: 42, title: "AI Engineer", company: "Summit Systems", location: "New York", salary: "75k-100k", description: "Build and deploy AI-driven features in production.", applications: [] },
    { id: 43, title: "DevTools Engineer", company: "Pioneer Labs", location: "Seattle", salary: "60k-85k", description: "Create developer tools that boost engineering velocity.", applications: [] },
    { id: 44, title: "Technical Writer Intern", company: "Atlas Solutions", location: "Remote", salary: "26k-36k", description: "Document APIs and developer guides.", applications: [] },
    { id: 45, title: "Platform Engineer", company: "Zenith Technologies", location: "Boston", salary: "68k-92k", description: "Build internal platforms for scalable deployments.", applications: [] },
    { id: 46, title: "Product Analyst Intern", company: "MosaicSoft", location: "New York", salary: "30k-40k", description: "Analyze product metrics and support PMs.", applications: [] },
    { id: 47, title: "Security Research Intern", company: "Parallax", location: "San Francisco", salary: "40k-55k", description: "Research security vulnerabilities and mitigations.", applications: [] },
    { id: 48, title: "Cloud Security Engineer", company: "Synapse Tech", location: "Remote", salary: "72k-98k", description: "Harden cloud environments and secure deployments.", applications: [] },
    { id: 49, title: "Data Platform Engineer", company: "BinaryEdge", location: "Chicago", salary: "66k-88k", description: "Build data ingestion and transformation pipelines.", applications: [] },
    { id: 50, title: "Research Intern (NLP)", company: "CloudBridge", location: "Boston", salary: "38k-52k", description: "Work on natural language processing models and datasets.", applications: [] },
    { id: 51, title: "Visualization Engineer", company: "TerraSoft", location: "Remote", salary: "48k-64k", description: "Build interactive visualizations and dashboards.", applications: [] },
    { id: 52, title: "QA Lead (Junior)", company: "CipherWorks", location: "San Francisco", salary: "46k-62k", description: "Coordinate test plans and automation efforts.", applications: [] },
    { id: 53, title: "Network Security Engineer", company: "OptiData", location: "New York", salary: "68k-92k", description: "Implement network security and IDS/IPS solutions.", applications: [] },
    { id: 54, title: "Firmware Engineer", company: "NovaCore", location: "Austin", salary: "60k-80k", description: "Develop low-level firmware for IoT devices.", applications: [] },
    { id: 55, title: "Systems Programmer", company: "RapidScale", location: "Seattle", salary: "64k-86k", description: "Work on systems software and performance tuning.", applications: [] },
    { id: 56, title: "Cloud Ops Engineer", company: "LumaTech", location: "Remote", salary: "58k-78k", description: "Operate cloud infrastructure and automation scripts.", applications: [] },
    { id: 57, title: "Data Scientist", company: "Arcane Systems", location: "Boston", salary: "70k-95k", description: "Develop predictive models and data-driven insights.", applications: [] },
    { id: 58, title: "Full Stack Engineer", company: "ByteSphere", location: "Chicago", salary: "66k-90k", description: "Ship end-to-end features across web stack.", applications: [] },
    { id: 59, title: "Mobile QA Engineer", company: "Circuit Labs", location: "Los Angeles", salary: "44k-60k", description: "Test mobile applications across platforms.", applications: [] },
    { id: 60, title: "Platform Security Engineer", company: "DriftSoft", location: "Remote", salary: "72k-100k", description: "Secure the platform and implement best practices.", applications: [] },
    { id: 61, title: "AI Ops Engineer", company: "NextCloud", location: "Austin", salary: "62k-85k", description: "Operate ML systems and monitoring pipelines.", applications: [] },
    { id: 62, title: "Game Engine Intern", company: "Skyward Systems", location: "Seattle", salary: "36k-50k", description: "Help develop game engine features and tools.", applications: [] },
    { id: 63, title: "Cloud Developer", company: "Meridian Tech", location: "San Francisco", salary: "58k-80k", description: "Build cloud-native services and APIs.", applications: [] },
    { id: 64, title: "Security Automation Engineer", company: "Quantum Leap", location: "Remote", salary: "68k-92k", description: "Automate security scans and incident response.", applications: [] },
    { id: 65, title: "Big Data Engineer", company: "LogicTree", location: "New York", salary: "70k-98k", description: "Design and maintain large-scale data systems.", applications: [] },
    { id: 66, title: "Computer Vision Intern", company: "ByteShift", location: "Boston", salary: "38k-54k", description: "Work on image/video models and pipelines.", applications: [] },
    { id: 67, title: "Embedded Software Intern", company: "EdgeWare", location: "Los Angeles", salary: "34k-46k", description: "Develop embedded features and drivers.", applications: [] },
    { id: 68, title: "Release Engineer", company: "CoreDynamics", location: "Remote", salary: "60k-82k", description: "Manage release processes and CI tooling.", applications: [] },
    { id: 69, title: "Monitoring Engineer", company: "AlphaSoft", location: "Austin", salary: "56k-76k", description: "Build systems for observability and alerts.", applications: [] },
    { id: 70, title: "IT Support Engineer", company: "BetaWorks", location: "Chicago", salary: "38k-50k", description: "Provide IT support and incident triage.", applications: [] },
    { id: 71, title: "Cloud Cost Engineer", company: "Gamma Labs", location: "Remote", salary: "64k-86k", description: "Analyze cloud spend and optimize costs.", applications: [] },
    { id: 72, title: "AI Researcher", company: "Delta Systems", location: "San Francisco", salary: "85k-120k", description: "Conduct advanced research and publishable work.", applications: [] },
    { id: 73, title: "SRE (Junior)", company: "Epsilon Tech", location: "New York", salary: "60k-82k", description: "Support site reliability and incident management.", applications: [] },
    { id: 74, title: "Database Administrator", company: "Sigma Dynamics", location: "Boston", salary: "62k-84k", description: "Manage DB clusters and backups at scale.", applications: [] },
    { id: 75, title: "Network Ops", company: "Omega Solutions", location: "Washington DC", salary: "54k-70k", description: "Operate network infrastructure and optimize latency.", applications: [] },
    { id: 76, title: "Embedded QA", company: "IonSoft", location: "Austin", salary: "40k-54k", description: "Test embedded systems and hardware integrations.", applications: [] },
    { id: 77, title: "Robotics Software Engineer", company: "Vector Labs", location: "San Francisco", salary: "72k-98k", description: "Develop perception and control software for robots.", applications: [] },
    { id: 78, title: "Cloud Native Developer", company: "PulseTech", location: "Remote", salary: "66k-90k", description: "Build microservices and cloud-native architectures.", applications: [] },
    { id: 79, title: "Platform Reliability Engineer", company: "SignalWorks", location: "Chicago", salary: "68k-92k", description: "Ensure platform stability and resilience.", applications: [] },
    { id: 80, title: "Firmware QA", company: "AeroTech", location: "Los Angeles", salary: "42k-56k", description: "Test firmware releases and hardware interactions.", applications: [] },
    { id: 81, title: "Geospatial Engineer", company: "GeoSoft", location: "Remote", salary: "58k-78k", description: "Work with mapping data and geospatial pipelines.", applications: [] },
    { id: 82, title: "Backend Java Engineer", company: "NeoNet", location: "New York", salary: "68k-95k", description: "Build backend services in Java/Kotlin.", applications: [] },
    { id: 83, title: "Platform Data Engineer", company: "OmniData", location: "Boston", salary: "70k-96k", description: "Build data platforms and streaming pipelines.", applications: [] },
    { id: 84, title: "Hardware Engineer Intern", company: "Hyperion Labs", location: "Austin", salary: "36k-50k", description: "Assist hardware bring-up and testing.", applications: [] },
    { id: 85, title: "Performance Engineer", company: "Flux Systems", location: "San Francisco", salary: "72k-100k", description: "Profile and optimize system performance.", applications: [] },
    { id: 86, title: "Edge Computing Engineer", company: "Ionix", location: "Remote", salary: "64k-88k", description: "Develop edge-native services and deployments.", applications: [] },
    { id: 87, title: "Kubernetes Engineer", company: "KineticSoft", location: "Seattle", salary: "66k-92k", description: "Operate and secure K8s clusters at scale.", applications: [] },
    { id: 88, title: "Observability Engineer", company: "Lumina Labs", location: "New York", salary: "60k-85k", description: "Create observability platforms and dashboards.", applications: [] },
    { id: 89, title: "NLP Engineer", company: "Nexus Systems", location: "Remote", salary: "70k-98k", description: "Work on language models and text pipelines.", applications: [] },
    { id: 90, title: "Platform Test Engineer", company: "Orion Labs", location: "Boston", salary: "52k-70k", description: "Design tests for large distributed systems.", applications: [] },
    { id: 91, title: "Frontend Accessibility Engineer", company: "Phoenix Tech", location: "San Francisco", salary: "62k-84k", description: "Improve web accessibility and component library.", applications: [] },
    { id: 92, title: "Cloud Migration Engineer", company: "Quanta Systems", location: "Remote", salary: "72k-98k", description: "Help migrate legacy workloads to the cloud.", applications: [] },
    { id: 93, title: "Site Reliability Intern", company: "Radian Labs", location: "Austin", salary: "36k-50k", description: "Support on-call rotations and incident drills.", applications: [] },
    { id: 94, title: "Systems Security Engineer", company: "Solstice Tech", location: "Washington DC", salary: "74k-102k", description: "Harden systems against attack vectors and exploits.", applications: [] },
    { id: 95, title: "IoT Developer", company: "TeraWorks", location: "Remote", salary: "58k-80k", description: "Build IoT solutions and device integrations.", applications: [] },
    { id: 96, title: "Platform Engineer Intern", company: "Uplink Systems", location: "Chicago", salary: "34k-46k", description: "Assist platform team with automation and scripts.", applications: [] },
    { id: 97, title: "Hardware Validation Engineer", company: "Volt Labs", location: "Los Angeles", salary: "56k-76k", description: "Validate hardware designs and run test benches.", applications: [] },
    { id: 98, title: "Network Automation Engineer", company: "Windward Tech", location: "Remote", salary: "64k-86k", description: "Automate network configuration and management.", applications: [] },
    { id: 99, title: "Research Intern (Computer Graphics)", company: "Xenon Systems", location: "San Francisco", salary: "38k-52k", description: "Work on rendering research and prototypes.", applications: [] },
    { id: 100, title: "Junior Software Engineer", company: "YieldTech", location: "New York", salary: "48k-68k", description: "Contribute to backend services and API development.", applications: [] }
];

let profiles = {
    jobseekers: {
        'seeker@example.com': {
            name: 'Alex Doe',
            resume: 'path/to/alex_resume.pdf',
            skills: ['HTML', 'CSS', 'JavaScript', 'React'],
            applications: [1, 5] // job IDs
        }
    },
    employers: {
        'employer@example.com': {
            companyName: 'TechNova',
            postedJobs: [1] // job IDs
        }
    }
};

let companyProfiles = {
    'TechNova': { name: 'TechNova', description: 'A leading innovator in cloud solutions and AI.', website: 'technova.example.com', jobs: [1] },
    'ByteWorks': { name: 'ByteWorks', description: 'Pioneering the future of backend services.', website: 'byteworks.example.com', jobs: [2] },
    'DataPulse': { name: 'DataPulse', description: 'We make data insightful and actionable.', website: 'datapulse.example.com', jobs: [3] }
};


// --- 5. Application Tracking (Simulated) ---

function applyForJob(jobId) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('userName');

    if (!isAuthenticated || userRole !== 'jobseeker') {
        showToast('Please login as a job seeker to apply.', {type:'warn'});
        return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) {
        showToast('Job not found.', {type:'error'});
        return;
    }

    // Check if already applied
    if (job.applications.includes(username)) {
        showToast('You have already applied for this job.', {type:'info'});
        return;
    }

    // Simulate application
    job.applications.push(username);
    if (profiles.jobseekers[username]) {
        if (!profiles.jobseekers[username].applications.includes(jobId)) {
            profiles.jobseekers[username].applications.push(jobId);
        }
    }

    showToast(`Successfully applied for ${job.title}.`, {type:'success'});
    
    // Refresh dashboard if it's open
    const dashboardPanel = document.getElementById('dashboard-section');
    if (dashboardPanel && dashboardPanel.classList.contains('open')) {
        loadDashboard();
    }
}


// --- Dashboard Rendering ---

function loadDashboard() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('userName');
    const container = document.getElementById('dashboard-content');

    if (!container) return;

    if (!isAuthenticated) {
        container.innerHTML = '<p>Please login to view your dashboard.</p>';
        return;
    }

    if (userRole === 'jobseeker') {
        renderJobSeekerDashboard(username, container);
    } else if (userRole === 'employer') {
        renderEmployerDashboard(username, container);
    } else {
        container.innerHTML = '<p>Invalid user role.</p>';
    }
}

function renderJobSeekerDashboard(username, container) {
    const profile = profiles.jobseekers[username] || { name: username, applications: [] };
    const appliedJobs = jobs.filter(job => profile.applications.includes(job.id));

    let html = `
        <div class="dashboard-view">
            <h4>Welcome, ${profile.name}</h4>
            <div class="dashboard-section">
                <button class="btn-primary" onclick="showJobSearchInDashboard()">🔍 Search Jobs</button>
                <button class="btn-secondary">Edit Profile</button>
            </div>
            <div class="dashboard-section">
                <h5>Your Profile</h5>
                <p><strong>Email:</strong> ${username}</p>
                <p><strong>Skills:</strong> ${(profile.skills || ['Not specified']).join(', ')}</p>
            </div>
            <div class="dashboard-section">
                <h5>Your Applications (${appliedJobs.length})</h5>
                ${appliedJobs.length > 0 ? `
                    <ul class="dashboard-list">
                        ${appliedJobs.map(job => `
                            <li>
                                <strong>${job.title}</strong> at ${job.company}
                                <span class="app-status">Status: Pending</span>
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p>You have not applied to any jobs yet.</p>'}
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function renderEmployerDashboard(username, container) {
    const profile = profiles.employers[username] || { companyName: 'Your Company', postedJobs: [] };
    const postedJobs = jobs.filter(job => profile.postedJobs.includes(job.id));

    let html = `
        <div class="dashboard-view">
            <h4>Welcome, ${profile.companyName}</h4>
            <div class="dashboard-section">
                <button class="btn-primary" onclick="showPostJobForm()">+ Post a New Job</button>
                <button class="btn-secondary" onclick="showManageJobs()">Manage Jobs</button>
            </div>
            <div class="dashboard-section">
                <h5>Your Job Postings (${postedJobs.length})</h5>
                ${postedJobs.length > 0 ? `
                    <ul class="dashboard-list">
                        ${postedJobs.map(job => `
                            <li>
                                <strong>${job.title}</strong>
                                <span class="app-count">${job.applications.length} applications</span>
                                <button class="btn-secondary" onclick="viewApplicants(${job.id})">View Applicants</button>
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p>You have not posted any jobs yet.</p>'}
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function showPostJobForm() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>Post New Job</h3>
        <form onsubmit="event.preventDefault(); saveNewJob()">
            <div class="form-group"><label>Job Title:</label><input id="job-title" required></div>
            <div class="form-group"><label>Company:</label><input id="job-company" required></div>
            <div class="form-group"><label>Location:</label><input id="job-location" required></div>
            <div class="form-group"><label>Salary Range:</label><input id="job-salary" placeholder="e.g., 50k-70k" required></div>
            <div class="form-group"><label>Description:</label><textarea id="job-desc" required></textarea></div>
            <div class="form-group"><label>Qualifications:</label><textarea id="job-qual"></textarea></div>
            <div class="form-group"><label>Responsibilities:</label><textarea id="job-resp"></textarea></div>
            <div class="form-group">
                <button type="submit" class="btn-primary">Create Job</button>
                <button type="button" class="btn-secondary" onclick="loadDashboard()">Cancel</button>
            </div>
        </form>
    `;
}

function saveNewJob() {
    const newJob = {
        id: jobs.length + 1,
        title: document.getElementById('job-title').value,
        company: document.getElementById('job-company').value,
        location: document.getElementById('job-location').value,
        salary: document.getElementById('job-salary').value,
        description: document.getElementById('job-desc').value,
        qualifications: document.getElementById('job-qual').value,
        responsibilities: document.getElementById('job-resp').value,
        applications: []
    };
    jobs.push(newJob);
    showToast('Job posted successfully!', {type:'success'});
    loadDashboard();
}

function showManageJobs() {
    const container = document.getElementById('dashboard-content');
    const username = localStorage.getItem('userName');
    const profile = profiles.employers[username] || { postedJobs: [] };
    const myJobs = jobs.filter(job => profile.postedJobs.includes(job.id));
    
    container.innerHTML = '<h3>Manage Your Jobs</h3>';
    myJobs.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h4>${job.title}</h4>
                <p>${job.company} • ${job.location}</p>
                <button class="btn-secondary" onclick="editJob(${job.id})">Edit</button>
                <button class="btn-secondary" onclick="deleteJob(${job.id})">Delete</button>
            </div>
        `;
    });
    container.innerHTML += '<button class="btn-primary" onclick="loadDashboard()">Back</button>';
}

function viewApplicants(jobId) {
    const container = document.getElementById('dashboard-content');
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    container.innerHTML = `<h3>Applicants for: ${job.title}</h3>`;
    if (job.applications.length === 0) {
        container.innerHTML += '<p>No applications yet.</p>';
    } else {
        job.applications.forEach(app => {
            container.innerHTML += `<div class="job-card"><p><strong>Candidate:</strong> ${app}</p></div>`;
        });
    }
    container.innerHTML += '<button class="btn-primary" onclick="loadDashboard()">Back</button>';
}

function editJob(jobId) {
    showToast('Edit functionality - Job ID: ' + jobId, {type:'info'});
}

function deleteJob(jobId) {
    if (confirm('Delete this job?')) {
        const index = jobs.findIndex(j => j.id === jobId);
        if (index > -1) jobs.splice(index, 1);
        showManageJobs();
    }
}


// Job Search in Dashboard
function showJobSearchInDashboard() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>🔍 Search Jobs</h3>
        <div class="search-bar" style="margin-bottom:20px;display:flex;gap:10px">
            <input type="text" id="dash-keyword" placeholder="Keywords (e.g., Frontend, Python)" style="flex:1">
            <select id="dash-location" style="flex:1">
                <option value="">Any Location</option>
                <option value="remote">Remote</option>
                <option value="new york">New York</option>
                <option value="boston">Boston</option>
                <option value="san francisco">San Francisco</option>
            </select>
            <button class="btn-primary" onclick="searchJobsInDash()">Search</button>
        </div>
        <div id="dash-results"></div>
    `;
    displayDashJobs(jobs.slice(0, 15));
}

function searchJobsInDash() {
    const keyword = document.getElementById('dash-keyword').value.toLowerCase();
    const location = document.getElementById('dash-location').value.toLowerCase();
    
    const filtered = jobs.filter(job => {
        const matchKey = !keyword || job.title.toLowerCase().includes(keyword) || job.description.toLowerCase().includes(keyword);
        const matchLoc = !location || job.location.toLowerCase().includes(location);
        return matchKey && matchLoc;
    });
    
    displayDashJobs(filtered);
}

function displayDashJobs(jobList) {
    const container = document.getElementById('dash-results');
    if (!container) return;
    
    if (jobList.length === 0) {
        container.innerHTML = '<p>No jobs found.</p>';
        return;
    }
    
    container.innerHTML = `<h4>Found ${jobList.length} jobs</h4>`;
    jobList.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                <p>${job.description.substring(0, 120)}...</p>
                <div class="job-actions">
                    <button class="apply-btn" onclick="applyForJob(${job.id})">Apply Now</button>
                    <button class="view-company-btn" onclick="viewCompanyProfile('${job.company}')">View Company</button>
                </div>
            </div>
        `;
    });
}

function viewCompanyProfile(companyName) {
    const container = document.getElementById('dashboard-content');
    const profile = companyProfiles[companyName] || {};
    const companyJobs = jobs.filter(j => j.company === companyName);
    
    container.innerHTML = `
        <h3>Company: ${companyName}</h3>
        <div class="company-profile">
            <p>${profile.description || 'No description available.'}</p>
            ${profile.website ? `<p><strong>Website:</strong> ${profile.website}</p>` : ''}
        </div>
        <h4>Open Positions (${companyJobs.length})</h4>
    `;
    
    companyJobs.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>Location:</strong> ${job.location} • <strong>Salary:</strong> ${job.salary}</p>
                <p>${job.description}</p>
                <button class="apply-btn" onclick="applyForJob(${job.id})">Apply</button>
            </div>
        `;
    });

    
    container.innerHTML += '<button class="btn-primary" onclick="loadDashboard()">Back to Dashboard</button>';
}

