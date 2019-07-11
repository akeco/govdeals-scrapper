const removeUnnecessaryCharacters = (text, character) => {
    if(!character) {
        const re = new RegExp('\n|\t|C', 'gi');
        return text.replace(re, '').trim();
    }

    return text.replace(character, '').trim();
};

module.exports = removeUnnecessaryCharacters;
