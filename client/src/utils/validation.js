export const validateArticleForm = (formData) => {
    const errors = {};

    if (!formData.title || formData.title.trim() === '') {
        errors.title = 'Title is required.';
    }
    if (!formData.text || formData.text.trim() === '') {
        errors.text = 'Text content is required.';
    }
    if (!formData.link || !formData.link.startsWith('http')) {
        errors.link = 'A valid URL is required.';
    }

    return errors;
};
