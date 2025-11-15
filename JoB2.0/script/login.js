const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    await simulateLogin(email, password);
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value; // Not used in current registerUser
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    await simulateRegister(email, password, 'jobseeker'); // Default to jobseeker for now
});

// --- Wrapper functions used by UI flows ---

async function simulateRegister(username, password, role) {
    try {
        await registerUser(username, password, role);
        showToast('Registration successful! Please login.', {type:'success'});
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } catch (e) {
        showToast(e.message || 'Registration failed', {type:'error'});
    }
}

async function simulateLogin(username, password) {
    try {
        const res = await loginUser(username, password);
        if (!res.ok) {
            showToast(res.reason || 'Login failed', {type:'error'});
            return;
        }
        window.location.href = 'index.html';
    } catch (e) {
        showToast(e.message || 'Login failed', {type:'error'});
    }
}

// --- Toast Notification System ---
function showToast(message, options = {}) {
    const { type = 'info', duration = 3000 } = options; // type: 'info', 'success', 'error', 'warn'

    let toastsContainer = document.querySelector('.toasts');
    if (!toastsContainer) {
        toastsContainer = document.createElement('div');
        toastsContainer.classList.add('toasts');
        document.body.appendChild(toastsContainer);
    }

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;

    toastsContainer.appendChild(toast);

    // Force reflow to ensure animation plays
    void toast.offsetWidth; 

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}