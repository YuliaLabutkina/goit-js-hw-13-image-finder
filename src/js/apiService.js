const baseUrl = 'https://pixabay.com/api/';
const token = '18667081-1f708d4293c59a8f1b4f35978';

const apiService = async (value, page) => {
    const result = await fetch(`${baseUrl}?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${token}`);
    return result.json();;
}

export default apiService;