function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

console.log(getFlagEmoji('US'));
console.log(getFlagEmoji('CA'));
console.log(getFlagEmoji('VN')); 
