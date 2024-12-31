// Alphabet constant
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

// Helper function to generate a random key
function generateKey(length) {
    let key = '';
    for (let i = 0; i < length; i++) {
        key += Math.floor(Math.random() * 26) + ' ';
    }
    return key.trim(); // Remove trailing space
}

// Encrypt plaintext using the key
function encrypt(plaintext, key) {
    let ciphertext = '';
    const keyArray = key.split(' ');

    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        if (ALPHABET.includes(char)) {
            const plainIndex = ALPHABET.indexOf(char);
            const shift = parseInt(keyArray[i % keyArray.length], 10);
            const cipherIndex = (plainIndex + shift) % 26;
            ciphertext += ALPHABET[cipherIndex];
        } else {
            ciphertext += char; // Preserve non-alphabet characters
        }
    }
    return ciphertext;
}

// Decrypt ciphertext using the key
function decrypt(ciphertext, key) {
    let plaintext = '';
    const keyArray = key.split(' ');

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (ALPHABET.includes(char)) {
            const cipherIndex = ALPHABET.indexOf(char);
            const shift = parseInt(keyArray[i % keyArray.length], 10);
            const plainIndex = (cipherIndex - shift + 26) % 26;
            plaintext += ALPHABET[plainIndex];
        } else {
            plaintext += char; // Preserve non-alphabet characters
        }
    }
    return plaintext;
}

// Event listeners and DOM interaction

// Generate a random key based on the length of the alphabetic characters in the input
document.getElementById('generate-key').addEventListener('click', () => {
    const input = document.getElementById('input').value;
    const keyField = document.getElementById('key');

    // Check if input exists
    if (!input) {
        alert('Enter a message to generate a key.');
        return;
    }

    // Preserve the existing key if it's already present
    if (keyField.value.trim()) {
        if (!confirm('Key already exists. Do you want to generate a new key?')) {
            return; // Exit without generating a new key
        }
    }

    // Generate a new key if confirmed or the key field is empty
    const key = generateKey(input.replace(/[^a-zA-Z]/g, '').length); // Count only alphabetic characters
    keyField.value = key; // Set the new key
});

// Encrypt the input text using the provided key
document.getElementById('encrypt').addEventListener('click', () => {
    const input = document.getElementById('input').value.toLowerCase();
    const key = document.getElementById('key').value;

    if (!input || !key) {
        alert('Both input and key are required for encryption.');
        return;
    }

    const output = encrypt(input, key);
    document.getElementById('output').value = output;
});

// Decrypt the encrypted text using the provided key
document.getElementById('decrypt').addEventListener('click', () => {
    const output = document.getElementById('output').value.toLowerCase();
    const key = document.getElementById('key').value;

    if (!output || !key) {
        alert('Both encrypted message and key are required for decryption.');
        return;
    }

    const input = decrypt(output, key);
    document.getElementById('input').value = input;
});

// Reset all fields
document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('input').value = '';
    document.getElementById('key').value = '';
    document.getElementById('output').value = '';
});

// Add table for One-Time Pad reference
const createOTPTable = () => {
    const tableContainer = document.createElement('div');
    tableContainer.style.marginTop = '20px';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '10px';

    const row1 = document.createElement('tr');
    const row2 = document.createElement('tr');

    for (let i = 0; i < ALPHABET.length; i++) {
        const th = document.createElement('th');
        th.textContent = ALPHABET[i];
        th.style.border = '1px solid #61dafb';
        th.style.padding = '5px';
        th.style.textAlign = 'center';
        row1.appendChild(th);

        const td = document.createElement('td');
        td.textContent = i;
        td.style.border = '1px solid #61dafb';
        td.style.padding = '5px';
        td.style.textAlign = 'center';
        row2.appendChild(td);
    }

    table.appendChild(row1);
    table.appendChild(row2);
    tableContainer.appendChild(table);

    document.getElementById('capsule').appendChild(tableContainer);
};

createOTPTable();
