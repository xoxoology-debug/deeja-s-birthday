// --- GLOBAL STATE ---
let currentPasskey = "";
const CORRECT_PASSKEY = "2026"; //

// --- HINT MODAL LOGIC ---
const hintTrigger = document.getElementById("hint-trigger");
const hintModal = document.getElementById("hint-modal");
const closeHint = document.getElementById("close-hint");

if (hintTrigger && hintModal && closeHint) {
    hintTrigger.addEventListener("click", () => {
        hintModal.classList.remove("hidden-view");
    });
    closeHint.addEventListener("click", () => {
        hintModal.classList.add("hidden-view");
    });
}

// --- LOCKSCREEN KEYPAD FUNCTION ---
function pressKey(num) {
    if (currentPasskey.length >= 4) return;
    
    currentPasskey += num;
    updateDots();

    if (currentPasskey.length === 4) {
        // Choti si delay taaki user ko 4th dot fill hota hua dikhe
        setTimeout(() => {
            if (currentPasskey === CORRECT_PASSKEY) {
                unlockCurtains();
            } else {
                shakeAndResetDots();
            }
        }, 250);
    }
}

function clearKey() {
    currentPasskey = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index < currentPasskey.length) {
            dot.classList.add("bg-red-500", "border-red-500 shadow-glow");
        } else {
            dot.classList.remove("bg-red-500", "border-red-500 shadow-glow");
        }
    });
}

function shakeAndResetDots() {
    const lockContent = document.getElementById("lock-content");
    lockContent.classList.add("animate-shake");
    
    // Reset dots with red error flash
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.add("border-red-600", "bg-red-600/30"));

    setTimeout(() => {
        lockContent.classList.remove("animate-shake");
        dots.forEach(dot => dot.classList.remove("border-red-600", "bg-red-600/30"));
        clearKey();
    }, 500);
}

// --- UNLOCK & SPLIT CURTAINS ANIMATION ---
function unlockCurtains() {
    const curtainWrapper = document.getElementById("curtain-wrapper");
    const lockContent = document.getElementById("lock-content");
    const mainAppContent = document.getElementById("main-app-content");

    // Hide lock screen UI elements smoothly
    if (lockContent) lockContent.style.display = "none";

    // Trigger CSS Side-Split Curtain Animation
    if (curtainWrapper) {
        curtainWrapper.classList.add("curtain-opened");
    }

    // Show Main App Layer after a short delay
    setTimeout(() => {
        if (mainAppContent) {
            mainAppContent.classList.remove("hidden-view");
            // Automatically switch from Loading screen to Intro screen after 2.5 seconds
            setTimeout(() => {
                changeView("view-loading", "view-intro");
                fireConfetti();
            }, 2500);
        }
    }, 400);
}

// --- MULTI-VIEW SCREEN NAVIGATOR ---
function changeView(hideId, showId) {
    const hideElement = document.getElementById(hideId);
    const showElement = document.getElementById(showId);

    if (hideElement) hideElement.classList.add("hidden-view");
    if (showElement) {
        showElement.classList.remove("hidden-view");
        showElement.classList.add("fade-in-view");
    }
}

// --- MEMORIES CARD CAROUSEL DATA ---
const memoriesData = [
    { text: "The day you stepped into my life and made everything beautiful... ✨" },
    { text: "Your beautiful smile that instantly makes my worst days so much better. 😊" },
    { text: "Every little laugh, silly argument, and sweet memory we share. 🐼" },
    { text: "And today, celebrating another amazing year of your beautiful life! 🌸" }
];
let currentMemoryIndex = 0;

function initMemoriesView() {
    currentMemoryIndex = 0;
    updateMemoryCard();
    changeView("view-age", "view-memories");
}

function nextMemoryCard() {
    currentMemoryIndex++;
    if (currentMemoryIndex >= memoriesData.length) {
        // Sab memories khatam hone par Message screen par bhej dein
        changeView("view-memories", "view-letter");
    } else {
        updateMemoryCard();
    }
}

function updateMemoryCard() {
    const cardTxt = document.getElementById("card-txt");
    const cardNum = document.getElementById("card-num");
    
    if (cardTxt) cardTxt.innerText = memoriesData[currentMemoryIndex].text;
    if (cardNum) cardNum.innerText = currentMemoryIndex + 1;
}

// --- FINAL ENVELOPE REVEAL ---
function revealLetterText() {
    changeView("envelope-box", "letter-content-box");
    fireConfetti();
}

// --- PARTY CELEBRATION EFFECT (CONFETTI) ---
function fireConfetti() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#be123c', '#e11d48', '#fda4af', '#ffffff']
        });
    }
}

// --- FULL RESET APPLICATION ---
function resetWholeApp() {
    clearKey();

    // Hide all main screens
    const screens = ["view-loading", "view-intro", "view-age", "view-memories", "letter-content-box"];
    screens.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add("hidden-view");
    });

    // Reset components to initial state
    const curtainWrapper = document.getElementById("curtain-wrapper");
    const lockContent = document.getElementById("lock-content");
    const mainAppContent = document.getElementById("main-app-content");
    const envelopeBox = document.getElementById("envelope-box");
    const loadingView = document.getElementById("view-loading");

    // 👇 یہ نیا کوڈ Add کرنا ہے
    const letterBox = document.getElementById("letter-content-box");

    if (curtainWrapper) curtainWrapper.classList.remove("curtain-opened");
    if (lockContent) lockContent.style.display = "flex";
    if (mainAppContent) mainAppContent.classList.add("hidden-view");
    if (envelopeBox) envelopeBox.classList.remove("hidden-view");
    if (loadingView) loadingView.classList.remove("hidden-view");

    // 👇 یہ بھی Add کرنا ہے
    if (letterBox) {
        letterBox.classList.add("hidden-view");
    }
}
