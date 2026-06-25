let enteredPin = "";
const targetPin = "2026";

const gallery = [
    { id: 1, text: "Your gorgeous smile makes everything better ✨" },
    { id: 2, text: "Throwback to one of the prettiest days! 🌸" },
    { id: 3, text: "Always keeping these memories close to heart ❤️" }
];
let galleryIndex = 0;

// Hint Modal Actions
document.getElementById('hint-trigger').addEventListener('click', () => {
    document.getElementById('hint-modal').classList.remove('hidden-view');
});

document.getElementById('close-hint').addEventListener('click', () => {
    document.getElementById('hint-modal').classList.add('hidden-view');
});

function pressKey(val) {
    if (enteredPin.length < 4) {
        enteredPin += val;
        updatePinDots();
        if (enteredPin.length === 4) {
            setTimeout(checkPinMatch, 250);
        }
    }
}

function clearKey() {
    enteredPin = "";
    updatePinDots();
}

function updatePinDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, idx) => {
        if (idx < enteredPin.length) {
            d.classList.add('bg-red-600', 'border-red-600', 'scale-110');
        } else {
            d.classList.remove('bg-red-600', 'border-red-600', 'scale-110');
        }
    });
}

function checkPinMatch() {
    if (enteredPin === targetPin) {
        // Trigger Curtain Split
        document.getElementById('curtain-wrapper').classList.add('curtain-opened');
        document.getElementById('lock-content').style.display = 'none';
        
        // Load main system
        setTimeout(() => {
            document.getElementById('main-app-content').classList.remove('hidden-view');
            setTimeout(() => {
                changeView('view-loading', 'view-intro');
            }, 2200);
        }, 400);
    } else {
        alert("Wrong Passkey! Check hint.");
        clearKey();
    }
}

function changeView(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden-view');
    const showView = document.getElementById(showId);
    showView.classList.remove('hidden-view');
    showView.classList.add('fade-in-view');

    if(showId === 'view-age') {
        runAgeCounter();
    }
}

function runAgeCounter() {
    let yr = document.getElementById('count-years');
    let dy = document.getElementById('count-days');
    let yVal = 18, dVal = 0;

    let yInterval = setInterval(() => {
        if(yVal < 19) { yVal++; yr.innerText = yVal; } else clearInterval(yInterval);
    }, 800);

    let dInterval = setInterval(() => {
        if(dVal < 19) { dVal++; dy.innerText = dVal; } else clearInterval(dInterval);
    }, 40);
}

function initMemoriesView() {
    changeView('view-age', 'view-memories');
    renderMemory();
}

function nextMemoryCard() {
    galleryIndex = (galleryIndex + 1) % gallery.length;
    renderMemory();
}

function renderMemory() {
    document.getElementById('card-num').innerText = gallery[galleryIndex].id;
    document.getElementById('card-txt').innerText = gallery[galleryIndex].text;
}

function revealLetterText() {
    document.getElementById('envelope-box').classList.add('hidden-view');
    document.getElementById('letter-content-box').classList.remove('hidden-view');
    fireConfetti();
}

function fireConfetti() {
    confetti({ 
        particleCount: 140, 
        spread: 80, 
        origin: { y: 0.6 }, 
        colors: ['#dc2626', '#f43f5e', '#ffffff'] 
    });
}

function resetWholeApp() {
    enteredPin = "";
    galleryIndex = 0;
    updatePinDots();
    
    document.getElementById('curtain-wrapper').classList.remove('curtain-opened');
    document.getElementById('lock-content').style.display = 'flex';
    document.getElementById('main-app-content').classList.add('hidden-view');
    
    document.getElementById('letter-content-box').classList.add('hidden-view');
    document.getElementById('envelope-box').classList.remove('hidden-view');

    const views = ['view-loading', 'view-intro', 'view-age', 'view-memories', 'view-letter'];
    views.forEach(v => document.getElementById(v).classList.add('hidden-view'));
    document.getElementById('view-loading').classList.remove('hidden-view');
}
