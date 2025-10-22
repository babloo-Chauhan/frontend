import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_URL}/category`;

export const addCategory = async (category) => {
    if (!category.name || !category.image) {
        console.error('Category name and image are required');
        return;
    }

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("image", category.image);

    try {
        const response = await axios.post(
            `${baseUrl}/add-category`,
            { name: category.name, image: category.image },

        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

export const getCategories = async () => {
    return await axios.get(`${baseUrl}/get`);
};

export const updateCategory = async (category) => {
    console.log("category update ", category);

    return await axios.put(`${baseUrl}/update`, category);
};

export const deleteCategory = async (_id) => {

    return await axios.delete(`${baseUrl}/delete`, { data: { _id: _id } });
};

export const getProductByCategory = async (category) => {
    return await axios.get(`${baseUrl}/category/${category}`);
};

export const getProductBySubCategory = async (subCategory) => {
    return await axios.get(`${baseUrl}/subcategory/${subCategory}`);
};


