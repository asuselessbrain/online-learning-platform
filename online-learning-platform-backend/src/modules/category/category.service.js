import Category from "./category.model.js";

const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
}

const getAllCategories = async (queryData) => {

    const filter = {};

    if (queryData.searchTerm) {
        filter.$or = [
            { name: { $regex: new RegExp(queryData.searchTerm, 'i') } },
            { slug: { $regex: new RegExp(queryData.searchTerm, 'i') } },
        ]
    }

    const sort = {};

    if (queryData.sortBy && queryData.sortOrder) {
        sort[queryData.sortBy] = queryData.sortOrder === 'asc' ? 1 : -1;
    }

    const limit = parseInt(queryData.limit) || 10;
    const page = parseInt(queryData.page) || 1;
    const skip = (page - 1) * limit;



    const result = await Category.find(filter).sort(sort).limit(limit).skip(skip);

    const count = await Category.countDocuments(filter);


    return {
        meta: {
            total: count,
            page,
            limit,
        },
        data: result,
    };
}

const getSingleCategoryById = async (id) => {
    return await Category.findById(id);
}

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
}

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
}

const getActiveCategories = async () => {
    return await Category.find({ is_active: true });
}

export const categoryService = {
    createCategory,
    getAllCategories,
    getSingleCategoryById,
    updateCategory,
    deleteCategory,
    getActiveCategories
};