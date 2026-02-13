// --- CONFIGURATION ---
const CORRECT_PASSWORD = "Boahancock"; // Case insensitive

let attempts = 0;

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const hintMsg = document.getElementById('hint-msg');
    
    // Check password (ignoring capital/small letters)
    if (input.toLowerCase().trim() === CORRECT_PASSWORD.toLowerCase()) {
        // SUCCESS
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('transition-screen').classList.remove('hidden');
        
        // Wait 3 seconds then show gallery
        setTimeout(() => {
            document.getElementById('transition-screen').classList.add('hidden');
            document.getElementById('gallery-section').classList.remove('hidden');
            startScrollAnimation();
        }, 3000);

    } else {
        // FAILURE
        attempts++;
        if (attempts === 1) {
            hintMsg.innerText = "Wrong. You forgot your own name?";
        } else if (attempts === 2) {
            hintMsg.innerText = "Think harder. It’s something I say every day.";
        } else if (attempts >= 3) {
            hintMsg.innerText = "Okay fine… starts with B 😌";
        }
        
        // Shake effect
        const box = document.querySelector('.login-box');
        box.style.transform = 'translateX(10px)';
        setTimeout(() => box.style.transform = 'translateX(0)', 100);
    }
}

// --- SCROLL ANIMATION ---
function startScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.photo-container').forEach(div => {
        observer.observe(div);
    });
}

// --- FALLING HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3-5s
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// --- FINAL BUTTON LOGIC ---
function askLove() {
    // Trigger 30 hearts
    for(let i=0; i<30; i++) {
        setTimeout(createHeart, i * 100);
    }
    
    // Show modal after a brief delay
    setTimeout(() => {
        document.getElementById('custom-modal').classList.remove('hidden');
    }, 1000);
}

function enterSecret() {
    document.getElementById('custom-modal').classList.add('hidden');
    document.getElementById('gallery-section').classList.add('hidden');
    document.getElementById('final-page').classList.remove('hidden');
    
    // Continue hearts in background
    setInterval(createHeart, 300);
}