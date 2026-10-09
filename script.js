const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Form request automated page refresh-ah stop pannum
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Client-side quick input presence check
    if (!email || !password) {
        errorMessage.innerText = "Please fill all fields.";
        errorMessage.style.display = "block";
        return;
    }
    
    // Core dynamic browser execution check logic trigger popup alert window
    alert("Login button successfully clicked! Attempting authentication for: " + email);
});