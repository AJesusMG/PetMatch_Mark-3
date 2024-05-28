// Randon filename genrator based on current timestamp

export default function NameGenerator() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}_${random}`;
}