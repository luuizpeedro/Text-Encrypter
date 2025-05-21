// Caesar Cipher (shift by 3)
function caesarCipher(text, encrypt = true) {
  const shift = 3;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return text
    .split("")
    .map((char) => {
      const index = alphabet.indexOf(char);
      if (index === -1) return char;
      const shiftIndex = encrypt
        ? (index + shift) % alphabet.length
        : (index - shift + alphabet.length) % alphabet.length;
      return alphabet[shiftIndex];
    })
    .join("");
}

// Vigenère Cipher (key: "AsmrProg")
function vigenereCipher(text, key = "WhisperingCode", encrypt = true) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textChar = text[i];
    const keyChar = key[i % key.length];
    const textIndex = alphabet.indexOf(textChar);
    const keyIndex = alphabet.indexOf(keyChar);

    if (textIndex === -1 || keyIndex === -1) {
      result += textChar;
    } else {
      let newIndex = encrypt
        ? (textIndex + keyIndex) % alphabet.length
        : (textIndex - keyIndex + alphabet.length) % alphabet.length;
      result += alphabet[newIndex];
    }
  }

  return result;
}

// Base64 Encode/Decode
function base64Cipher(text, encrypt = true) {
  return encrypt ? btoa(text) : atob(text);
}

// Reverse text
function reverseText(text) {
  return text.split("").reverse().join("");
}

// Update result
function updateResult(isEncrypting) {
  const text = document.getElementById("message").value;
  const cipher = document.getElementById("cipher").value;
  let result = "";

  switch (cipher) {
    case "caesar":
      result = caesarCipher(text, isEncrypting);
      break;
    case "vigenere":
      result = vigenereCipher(text, "AsmrProg", isEncrypting);
      break;
    case "base64":
      try {
        result = base64Cipher(text, isEncrypting);
      } catch (e) {
        result = "⚠️ Invalid Base64 input.";
      }
      break;
    case "reverse":
      result = reverseText(text);
      break;
  }

  document.getElementById("result").textContent = result;
}

// Event listeners
document.getElementById("enc-btn").addEventListener("click", () => {
  updateResult(true);
});

document.getElementById("dec-btn").addEventListener("click", () => {
  updateResult(false);
});

// Default encryption on load
document.addEventListener("DOMContentLoaded", () => {
  updateResult(true);
});
