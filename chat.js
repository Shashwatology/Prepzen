import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { encrypt, decrypt } from './encryption.js';

const auth = getAuth();
const db = getFirestore();

// Initialize chat
function initializeChat() {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    onSnapshot(q, (snapshot) => {
        const messages = document.getElementById('messages');
        messages.innerHTML = '';
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const decryptedMessage = decrypt(data.message);
            
            const messageEl = createMessageElement(data.sender, decryptedMessage, data.timestamp);
            messages.appendChild(messageEl);
        });
        
        messages.scrollTop = messages.scrollHeight;
    });
}

// Send message
async function sendMessage(text) {
    const encryptedMessage = encrypt(text);
    
    await addDoc(collection(db, 'messages'), {
        sender: auth.currentUser.email,
        message: encryptedMessage,
        timestamp: serverTimestamp()
    });
    
    // Send notification
    sendNotification(auth.currentUser.email);
}

// Initialize notifications
if ('Notification' in window) {
    Notification.requestPermission();
}


// Using AES encryption
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key';

export function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export function sendNotification(senderEmail) {
    if (Notification.permission === 'granted') {
        new Notification('New Message', {
            body: `New message from ${senderEmail}`,
            icon: '/assets/icon.png'
        });
    }
}
