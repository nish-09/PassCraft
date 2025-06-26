function generatePassword() {
    const useAlphabets = document.getElementById("alphabets").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;
    const length = parseInt(document.getElementById("lengthSlider").value);

    const alphabetChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-_=+[{]}|;:',<.>/?";

    let allChars = "";
    let mustInclude = [];

    if (useAlphabets) {
        allChars += alphabetChars;
        mustInclude.push(getRandomChar(alphabetChars));
    }
    if (useNumbers) {
        allChars += numberChars;
        mustInclude.push(getRandomChar(numberChars));
    }
    if (useSymbols) {
        allChars += symbolChars;
        mustInclude.push(getRandomChar(symbolChars));
    }

    const resultDiv = document.getElementById("result");
    const strengthDiv = document.getElementById("strength");

    if (allChars.length === 0) {
        resultDiv.innerText = "Select at least one option!";
        resultDiv.style.backgroundColor = "transparent";
        strengthDiv.innerText = "";
        return;
    }

    if (length < mustInclude.length) {
        resultDiv.innerText = `Length must be at least ${mustInclude.length} to include all selected types.`;
        resultDiv.style.backgroundColor = "red";
        strengthDiv.innerText = "❌ Invalid Length";
        return;
    }

    let remainingLength = length - mustInclude.length;
    let password = mustInclude;

    for (let i = 0; i < remainingLength; i++) {
        password.push(getRandomChar(allChars));
    }
    password = shuffleArray(password);

    const finalPassword = password.join("");
    resultDiv.innerHTML = `
    <span id="generatedPassword">${finalPassword}</span>
    <button id="copyBtn" onclick="copyPassword()">Copy Password</button>
`;

    let strength = "";
    let bgColor = "";
    let workspaceBG = "";

    if (length >= 4 && length <= 6) {
        strength = "🔴 Bad Password";
        bgColor = "red";
        workspaceBG = "rgba(255, 0, 0, 0.61)";
    } else if (length >= 7 && length <= 10) {
        strength = "🟠 Weak Password";
        bgColor = "orange";
        workspaceBG = "rgba(255, 165, 0, 0.61)";
    } else if (length > 10) {
        strength = "🟢 Strong Password";
        bgColor = "green";
        workspaceBG = "rgba(0, 128, 0, 0.61)";
    }

    strengthDiv.innerText = strength;
    resultDiv.style.backgroundColor = bgColor;
    resultDiv.style.color = "white";
    resultDiv.style.padding = "10px";
    resultDiv.style.marginTop = "10px";
    resultDiv.style.borderRadius = "5px";
    
    const workspaceDiv = document.getElementById("workspace");
if (workspaceDiv) {
    workspaceDiv.style.backgroundColor = workspaceBG;
    workspaceDiv.style.backdropFilter = "blur(10px)";
    workspaceDiv.style.webkitBackdropFilter = "blur(10px)";
}
}
function getRandomChar(str) {
    const index = Math.floor(Math.random() * str.length);
    return str[index];
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function copyPassword() {
    const passwordText = document.getElementById("generatedPassword").innerText;
    if (!passwordText) return;

    navigator.clipboard.writeText(passwordText).then(() => {
        const btn = document.getElementById("copyBtn");
        const notif = document.getElementById("notification");
        btn.innerText = "Copied!";
        notif.innerText = "✅ Password copied to clipboard!";
        notif.style.color = "green";
    }).catch(err => {
        alert("Failed to copy password.");
        console.error(err);
    });
}
function resetCopyUI() {
    const btn = document.getElementById("copyBtn");
    const notif = document.getElementById("notification");

    if (btn) btn.innerText = "Copy Password";
    if (notif) notif.innerText = "";
}
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("lengthSlider").addEventListener("input", function () {
        document.getElementById("lengthValue").innerText = this.value;
        resetCopyUI();
    });

    document.getElementById("alphabets").addEventListener("change", resetCopyUI);
    document.getElementById("numbers").addEventListener("change", resetCopyUI);
    document.getElementById("symbols").addEventListener("change", resetCopyUI);

    generatePassword();
});