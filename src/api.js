const API_KEY = 'REMOVED_KEY';

export const fetchImages = async (query) => {
    const API_URL = `https://api.pexels.com/v1/search?query=${query}&per_page=6`;

    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.photos.map(photo => photo.src.medium);
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};
