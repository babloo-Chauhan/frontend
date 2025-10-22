import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_URL}/products`;

export const addProduct = async (product) => {

    const formData = new FormData();
    formData.append("name", product.name);
    product.price.forEach((price, index) => {
        formData.append(`price[${index}]`, price);
    });


    formData.append("description", product.description);
    product.image.forEach((image, index) => {
        formData.append(`image`, image);

    });
    product.features?.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
    });

    product.category.forEach((category, index) => {
        formData.append(`category[${index}]`, category);
    });
    product.subCategory.forEach((subCategory, index) => {
        formData.append(`subCategory[${index}]`, subCategory);
    });

    formData.append("unit", product.unit);
    formData.append("stock", product.stock);

    formData.append("discount", product.discount);

    formData.append("more_details", JSON.stringify(product.more_details));
    formData.append("publish", product.publish);
    product.size.forEach((size, index) => {
        formData.append(`size[${index}]`, size);
    });



    const result = await axios.post(baseUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    console.log("Result:", result); // Log result
    return result;
};

export const getProducts = async () => {
    console.log("baseUrl", baseUrl);
    return await axios.get(baseUrl);
};

export const getProduct = async (id) => {
    return await axios.get(`${baseUrl}/${id}`);
};

export const updateProduct = async (product) => {
    console.log("update" , product)
    const formData = new FormData();
    formData.append("id" , product._id)
    formData.append("name", product.name);
    console.log("form ",formData)
    // formData.append("price", product.price);
    // formData.append("description", product.description);
    // product.image.forEach((image, index) => {
    //     formData.append(`image`, image);
    // });
    // product.features.forEach((feature, index) => {
    //     formData.append(`features[${index}]`, feature);
    // });
    return await axios.put(`${baseUrl}/update-product-details`, product
        );
};

export const deleteProduct = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
    return await axios.delete(`${baseUrl}/delete-product`, {
        data: { _id }
    });
    }
};

export const searchProduct = async (query) => {
    return await axios.post(`${baseUrl}/search-product`, { searchText: query });

};

export const filterProduct = async (query) => {
    return await axios.get(`${baseUrl}/filter?${query}`);
};

export const getProductByCategory = async (category) => {
    return await axios.get(`${baseUrl}/category/${category}`);
};

export const getProductBySubCategory = async (subCategory) => {
    return await axios.get(`${baseUrl}/sub-category/${subCategory}`);
};

export const getProductBySearch = async (search) => {
    return await axios.get(`${baseUrl}/search?name=${search}`);
};



