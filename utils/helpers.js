module.exports = {
    format_date: date => {
        return `${new Date(date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }

        return word;
    },
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    },
}