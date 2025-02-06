import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/index.html';
        return;
    }
    
    document.getElementById('userPhoto').src = user.photoURL;
    document.getElementById('userName').textContent = user.displayName;
});

document.getElementById('chatBtn').addEventListener('click', () => {
    window.location.href = '/chat.html';
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut();
});
