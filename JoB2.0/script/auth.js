// --- 1. User Authentication (Simulated) ---

// Use Web Crypto (PBKDF2) for client-side key derivation to avoid storing plaintext passwords.
// NOTE: Client-side storage is not a replacement for a secure server-side authentication system.
// This provides a reasonable simulation for local/demo usage.

function bufToBase64(buf) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}
function base64ToBuf(b64) {
    const bin = atob(b64);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
}

function generateSalt(length = 16) {
    const salt = new Uint8Array(length);
    crypto.getRandomValues(salt);
    return bufToBase64(salt.buffer);
}

async function deriveKey(password, saltB64, iterations = 120000) {
    const salt = base64ToBuf(saltB64);
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), {name:'PBKDF2'}, false, ['deriveBits']);
    const derivedBits = await crypto.subtle.deriveBits({name:'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256'}, keyMaterial, 256);
    return bufToBase64(derivedBits);
}

function constantTimeEqual(a, b) {
    // Compare two base64 strings in constant time
    const A = atob(a);
    const B = atob(b);
    if (A.length !== B.length) return false;
    let result = 0;
    for (let i = 0; i < A.length; i++) result |= A.charCodeAt(i) ^ B.charCodeAt(i);
    return result === 0;
}

function _loadUsers() {
    try { return JSON.parse(localStorage.getItem('users') || '{}'); } catch(e){ return {}; }
}
function _saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

async function registerUser(username, password, role = 'jobseeker') {
    username = username.trim().toLowerCase();
    if (!username || !password) throw new Error('Username and password are required.');
    const users = _loadUsers();
    if (users[username]) throw new Error('User already exists.');
    const salt = generateSalt(16);
    const iterations = 120000; // reasonable for demo; tune as needed
    const hash = await deriveKey(password, salt, iterations);
    users[username] = { salt, iterations, hash, role, createdAt: Date.now() };
    _saveUsers(users);
    return true;
}

async function loginUser(username, password) {
    username = username.trim().toLowerCase();
    const users = _loadUsers();
    const entry = users[username];
    if (!entry) return { ok: false, reason: 'User not found' };
    const computed = await deriveKey(password, entry.salt, entry.iterations);
    if (!constantTimeEqual(computed, entry.hash)) return { ok: false, reason: 'Invalid credentials' };
    // success: set client auth state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', entry.role);
    localStorage.setItem('userName', username);
    return { ok: true, role: entry.role };
}

// Wrapper functions used by UI flows
async function simulateRegister(username, password, role) {
    try {
        await registerUser(username, password, role);
        if (typeof showToast === 'function') showToast('Registration successful! Please login.', {type:'success'});
        else alert('Registration successful! Please login.');
        showLoginForm();
    } catch (e) {
        if (typeof showToast === 'function') showToast(e.message || 'Registration failed', {type:'error'});
        else alert(e.message || 'Registration failed');
    }
}

async function simulateLogin(username, password) {
    try {
        const res = await loginUser(username, password);
        if (!res.ok) {
            if (typeof showToast === 'function') showToast(res.reason || 'Login failed', {type:'error'});
            else alert(res.reason || 'Login failed');
            return;
        }
        if (typeof showToast === 'function') showToast(`Welcome, ${username}!`, {type:'success'});
        updateNavUI(true, res.role);
        loadDashboard();
    } catch (e) {
        if (typeof showToast === 'function') showToast(e.message || 'Login failed', {type:'error'});
        else alert(e.message || 'Login failed');
    }
}

function simulateLogout() {
    // Clear client-side session/token
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    
    if (typeof showToast === 'function') showToast("You have been logged out.", {type:'info'});
    else alert("You have been logged out.");
    updateNavUI(false);
    showJobSearch(); // Redirect to job search
}

function showLoginForm() {
    const container = document.getElementById('auth-form-section');
    container.style.display = 'block';
    container.innerHTML = `
        <section id="login-form">
            <h2>User Login</h2>
            <form onsubmit="event.preventDefault(); handleAuthForm('login')">
                <div class="form-group">
                    <label for="login-username">Username/Email:</label>
                    <input type="text" id="login-username" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password:</label>
                    <input type="password" id="login-password" required>
                </div>
                <div class="form-group">
                    <button type="submit">Login</button>
                    <button type="button" class="btn go-back" onclick="hideAuthForm()">Go Back</button>
                </div>
                <p>Don't have an account? <a href="#" onclick="event.preventDefault(); showRegisterForm()">Register here</a></p>
            </form>
        </section>
    `;
    // Hide other sections
    document.getElementById('job-search-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
}

function showRegisterForm() {
    const container = document.getElementById('auth-form-section');
    container.style.display = 'block';
    container.innerHTML = `
        <section id="register-form">
            <h2>User Registration</h2>
            <form onsubmit="event.preventDefault(); handleAuthForm('register')">
                <div class="form-group">
                    <label for="reg-username">Username/Email:</label>
                    <input type="email" id="reg-username" required>
                </div>
                <div class="form-group">
                    <label for="reg-password">Password:</label>
                    <input type="password" id="reg-password" required>
                </div>
                <div class="form-group">
                    <label for="reg-role">I am a:</label>
                    <select id="reg-role" required>
                        <option value="jobseeker">Job Seeker</option>
                        <option value="employer">Employer</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit">Register</button>
                    <button type="button" class="btn go-back" onclick="hideAuthForm()">Go Back</button>
                </div>
                <p>Already have an account? <a href="#" onclick="event.preventDefault(); showLoginForm()">Login here</a></p>
            </form>
        </section>
    `;
    // Hide other sections
    document.getElementById('job-search-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
}

// Hide auth forms and restore the main search/dashboard visibility
function hideAuthForm(){
    // Prefer existing showJobSearch() if available to keep behavior consistent
    if (typeof showJobSearch === 'function') {
        showJobSearch();
        return;
    }
    const container = document.getElementById('auth-form-section');
    if (!container) return;
    container.style.display = 'none';
    container.innerHTML = '';
    const jobSearch = document.getElementById('job-search-section');
    if (jobSearch) jobSearch.style.display = 'block';
    const dashboard = document.getElementById('dashboard-section');
    if (dashboard) dashboard.style.display = 'none';
}

// Update navigation UI based on authentication state
function updateNavUI(isAuthenticated, role) {
    const loginLink = document.getElementById('nav-login');
    const logoutBtn = document.getElementById('nav-logout');
    const dashboardLink = document.getElementById('nav-dashboard');

    if (isAuthenticated) {
        loginLink.style.display = 'none';
        logoutBtn.style.display = 'inline';
        dashboardLink.style.display = 'inline';
        dashboardLink.textContent = role === 'employer' ? 'Employer Dashboard' : 'Job Seeker Dashboard';
    } else {
        loginLink.style.display = 'inline';
        logoutBtn.style.display = 'none';
        dashboardLink.style.display = 'none';
    }
}

// Handler to decide whether to login or register
function handleAuthForm(type) {
    if (type === 'login') {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        simulateLogin(username, password);
    } else if (type === 'register') {
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const role = document.getElementById('reg-role').value;
        simulateRegister(username, password, role);
    }
}