import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API_URL", API_URL);

const baseUrl = `${API_URL}/subcategory`;

export const addSubCategory = async (subCategory) => {
    const category = subCategory.category;
    console.log("SubCategory:", subCategory.category);
    const formData = new FormData();
    formData.append("name", subCategory.name);
    formData.append("image", subCategory.image);
    subCategory.category.forEach((catId, index) => {
        formData.append(`category[${index}]`, catId);
    });
    const result = await axios.post(`${baseUrl}/create`, { name: subCategory.name, image: subCategory.image, category: category });
    console.log("Result:", result); // Log result
    return result;

}
export const getSubCategories = async () => {
    console.log("baseUrl", baseUrl);
    return await axios.post(`${baseUrl}/get`);
};

export const updateSubCategory = async (subCategory) => {
    return await axios.put(`${baseUrl}/update`, subCategory);
};

export const deleteSubCategory = async (subCategory) => {
    console.log("subCategory", subCategory._id);
    return await axios.delete(`${baseUrl}/delete`, { data: { _id: subCategory._id } });
};

export const getProductByCategory = async (category) => {
    return await axios.get(`${baseUrl}/category/${category}`);
};

export const getProductBySubCategory = async (subCategory) => {
    return await axios.get(`${baseUrl}/subcategory/${subCategory}`);
};



export const getSubCategoryByCategory = async (category) => {
    return await axios.get(`${baseUrl}/category/${category}`);
};

export const getSubCategoryBySubCategory = async (subCategory) => {
    return await axios.get(`${API_URL}/subcategory/${subCategory}`);
};

export const getSubCategoryById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const getSubCategoryByName = async (name) => {
    return await axios.get(`${API_URL}/name/${name}`);
};

export const getSubCategoryBySlug = async (slug) => {
    return await axios.get(`${API_URL}/slug/${slug}`);
};




