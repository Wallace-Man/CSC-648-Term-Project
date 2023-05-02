const form = document.querySelector('form.signup');
const usernameInput = form.querySelector('#username');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const password2Input = form.querySelector('#password2');
const agreementCheckbox = form.querySelector('input[type="checkbox"]');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (usernameInput.value.trim() === '') {
        alert('Please enter a username.');
        return;
    }

    if (emailInput.value.trim() === '') {
        alert('Please enter an email address.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        return;
    }

    if (passwordInput.value.trim() === '') {
        alert('Please enter a password.');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(passwordInput.value.trim())) {
        alert('Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, and one number.');
        return;
    }

    if (password2Input.value.trim() === '') {
        alert('Please confirm your password.');
        return;
    }

    if (passwordInput.value.trim() !== password2Input.value.trim()) {
        alert('Passwords do not match.');
        return;
    }

    if (!agreementCheckbox.checked) {
        alert('Please agree to use your Gator Card for payment.');
        return;
    }

    form.submit();
});
