// utility.js
export const numberToWords = (num) => {
    const singleDigits = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
    ];
    const twoDigits = [
        "", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const thousands = [
        "", "Thousand", "Lakh", "Crore"
    ];

    const words = [];

    if (num === 0) {
        return singleDigits[0];
    }

    // Split into sections (thousands, lakhs, crores)
    let crore = Math.floor(num / 10000000);
    let lakh = Math.floor((num % 10000000) / 100000);
    let thousand = Math.floor((num % 100000) / 1000);
    let remainder = num % 1000;

    if (crore) {
        words.push(numberToWords(crore), "Crore");
    }
    if (lakh) {
        words.push(numberToWords(lakh), "Lakh");
    }
    if (thousand) {
        words.push(numberToWords(thousand), "Thousand");
    }

    if (remainder) {
        if (remainder < 10) {
            words.push(singleDigits[remainder]);
        } else if (remainder < 20) {
            words.push(twoDigits[remainder - 10]);
        } else {
            words.push(tens[Math.floor(remainder / 10)]);
            if (remainder % 10) {
                words.push(singleDigits[remainder % 10]);
            }
        }
    }

    return words.join(" ").trim();
};
