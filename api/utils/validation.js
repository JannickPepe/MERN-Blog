export const validateArticleData = (data) => {
    const errors = [];

    if (!data.title || data.title.trim() === '') {
        errors.push('Title is required.');
    }
    if (!data.text || data.text.trim() === '') {
        errors.push('Text content is required.');
    }
    if (!data.link || !/^(http|https):\/\/[^ "]+$/.test(data.link)) {
        errors.push('A valid URL is required.');
    }

    return errors;
};
