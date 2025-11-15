// --- 1. User Authentication (Simulated) ---

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

function simulateLogout() {
    // Clear client-side session/token
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    // updateNavUI will be called by main.js after this.
}
