export const isValidLink = (link) => {
    // Return false if link is empty, null, or undefined
    if (!link) return false;

    try {
        // Try creating a URL object
        const url = new URL(link);

        // Only allow http and https protocols
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return false;
        }

        // Check for valid hostname (must contain domain)
        const parts = url.hostname.split('.');
        if (parts.length < 2 || parts[0].length === 0) {
            return false;
        }

        return true;
    } catch (error) {
        // If URL parsing fails, try adding https://
        if (!link.match(/^[a-zA-Z]+:\/\//)) {
            return isValidLink(`https://${link}`);
        }

        return false;
    }
};