export const numberToWords = (num) => {
    if (isNaN(num)) return '';
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
      'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    const convertToWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
      return '';
    };
  
    const numberToIndianWords = (n) => {
      if (n === 0) return 'Zero';
      
      let output = '';
  
      const crore = Math.floor(n / 10000000);
      n %= 10000000;
      const lakh = Math.floor(n / 100000);
      n %= 100000;
      const thousand = Math.floor(n / 1000);
      n %= 1000;
      const hundred = Math.floor(n / 100);
      n %= 100;
  
      if (crore > 0) output += convertToWords(crore) + ' Crore ';
      if (lakh > 0) output += convertToWords(lakh) + ' Lakh ';
      if (thousand > 0) output += convertToWords(thousand) + ' Thousand ';
      if (hundred > 0) output += convertToWords(hundred) + ' Hundred ';
      if (n > 0) output += convertToWords(n);
  
      return output.trim();
    };
  
    return numberToIndianWords(Math.floor(num));
  };
  