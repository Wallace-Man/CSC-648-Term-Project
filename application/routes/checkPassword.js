const bcrypt = require('bcrypt');

const hashedPasswords = [
    "$2b$10$.zMUld9Y7QKJPNbFpAvKgencfFAcfnIpE55a.JXZ2PPL3ZzGfUq36",
    "$2b$10$6m92ISUrg9ldumIHfJoGmOUTxByakoDC7Li53reoArhYK0af876.2",
    "$2b$10$lA7qlKoJ1S1JJyVPERt63.9T2Q.LEI0XfHFN4VzYJWAF3e4O8fAIu",
    "$2b$10$GN/1GLcVVq7r26zJC8zp7OXakFWyJ.nspWLYmbp3IaFRGCIfgL2v6",
    "$2b$10$Vp5s7l.OQ/xueN8sO7QEVeAMSjL14Hsu3DbtvBy1hau1fzPLNM2zi",
    "$2b$10$j4dvG3oiS0ZXWBax9uUPJephfho7eRB00ksK9RhoGMTJufbdFHgM2"
];

async function checkPasswords() {
    const passwordToCheck = '1111';

    for (const hashedPassword of hashedPasswords) {
        const match = await bcrypt.compare(passwordToCheck, hashedPassword);

        console.log(`Comparing password '${passwordToCheck}' to hash '${hashedPassword}': ${match ? 'MATCH' : 'NO MATCH'}`);

        if (match) {
            console.log(`Match found for hash: ${hashedPassword}`);
        }
    }
}

checkPasswords().catch(console.error);
