let coins = 50000;
let minePositions = [];
let crashInterval;
let crashMultiplier = 1.00;
let isCrashRunning = false;

function updateBalance() {
    document.getElementById('balance').innerText = coins;
}

function openGame(game) {
    closeModals();
    document.getElementById(`modal-${game}`).style.display = 'flex';
    if(game === 'mines') resetMines();
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    clearInterval(crashInterval);
    isCrashRunning = false;
}

// --- MINES LOGIK ---
function resetMines() {
    minePositions = Array(9).fill(false);
    let b1 = Math.floor(Math.random() * 9);
    let b2 = Math.floor(Math.random() * 9);
    while(b1 === b2) { b2 = Math.floor(Math.random() * 9); }
    minePositions[b1] = true;
    minePositions[b2] = true;

    for(let i=0; i<9; i++) {
        let t = document.getElementById(`tile-${i}`);
        t.innerText = '?';
        t.style.background = '#334155';
    }
}

function playMine(id) {
    let bet = parseInt(document.getElementById('mines-bet').value);
    if(coins < bet) return alert("Nicht genug Coins!");

    let tile = document.getElementById(`tile-${id}`);
    if(tile.innerText !== '?') return;

    if(minePositions[id]) {
        tile.innerText = '💣';
        tile.style.background = '#ff3d00';
        coins -= bet;
        alert("Boom! Du hast die Mine getroffen.");
        resetMines();
    } else {
        tile.innerText = '💎';
        tile.style.background = '#1e3a8a';
        coins += Math.floor(bet * 0.2); 
    }
    updateBalance();
}

// --- CRASH LOGIK ---
function startCrash() {
    let bet = parseInt(document.getElementById('crash-bet').value);
    if(coins < bet) return alert("Nicht genug Coins!");

    let btn = document.getElementById('crash-btn');

    if(!isCrashRunning) {
        isCrashRunning = true;
        crashMultiplier = 1.00;
        btn.innerText = "Cashout";
        btn.style.background = "#ff3d00";
        btn.style.color = "white";
        
        let crashPoint = (Math.random() * 5 + 1).toFixed(2); 

        crashInterval = setInterval(() => {
            crashMultiplier += 0.05;
            document.getElementById('crash-multiplier').innerText = crashMultiplier.toFixed(2) + "x";

            if(crashMultiplier >= crashPoint) {
                clearInterval(crashInterval);
                document.getElementById('crash-multiplier').innerText = "Crashed @ " + crashPoint + "x";
                document.getElementById('crash-multiplier').style.color = "#ff3d00";
                coins -= bet;
                updateBalance();
                resetCrashBtn();
            }
        }, 100);
    } else {
        clearInterval(crashInterval);
        let win = Math.floor(bet * crashMultiplier);
        coins += (win - bet);
        alert(`Erfolgreich ausgezahlt bei ${crashMultiplier.toFixed(2)}x! +${win} Coins`);
        updateBalance();
        resetCrashBtn();
    }
}

function resetCrashBtn() {
    isCrashRunning = false;
    let btn = document.getElementById('crash-btn');
    btn.innerText = "Start";
    btn.style.background = "#00e676";
    btn.style.color = "#000";
    setTimeout(() => {
        document.getElementById('crash-multiplier').style.color = "#00e676";
        document.getElementById('crash-multiplier').innerText = "1.00x";
    }, 2000);
}

// --- COINFLIP LOGIK ---
function playCoinflip(choice) {
    let bet = parseInt(document.getElementById('coinflip-bet').value);
    if(coins < bet) return alert("Nicht genug Coins!");

    let sides = ['Kopf', 'Zahl'];
    let result = sides[Math.floor(Math.random() * 2)];
    let resText = document.getElementById('coinflip-result');

    if(choice === result) {
        coins += bet;
        resText.innerText = `🎉 ${result}! Gewonnen!`;
        resText.style.color = "#00e676";
    } else {
        coins -= bet;
        resText.innerText = `❌ ${result}! Verloren!`;
        resText.style.color = "#ff3d00";
    }
    updateBalance();
}
