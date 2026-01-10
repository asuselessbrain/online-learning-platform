import { blogModel } from "./blogs.model.js";

const createBlogs = async (blogData) => {
    console.log(blogData)
    const result = new blogModel(blogData);
    console.log(result)
    return await result.save();
}

const getAllBlogsForAdmin = async (options) => {
    const filter = {}
    if (options.searchTerm) {
        filter.$or = [
            { title: { $regex: options.searchTerm, $options: 'i' } },
            { subTitle: { $regex: options.searchTerm, $options: 'i' } },
            { tags: { $regex: options.searchTerm, $options: 'i' } },
        ]
    }

    if (options.category) {
        filter.category = options.category;
    }

    if (options.status) {
        filter.status = options.status;
    }

    const sort = {}
    if (options.sortBy && options.sortOrder) {
        sort[options.sortBy] = options.sortOrder === 'asc' ? 1 : -1;
    }
    const limit = options.limit ? parseInt(options.limit, 10) : 10;
    const page = options.page ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const blogs = await blogModel.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await blogModel.countDocuments(filter);
    return {
        meta: {
            total,
            page,
            limit
        },
        data: blogs,
    }
}

const getSingleBlog = async (blogId) => {
    return await blogModel.findById(blogId);
}

export const blogService = {
    createBlogs,
    getAllBlogsForAdmin,
    getSingleBlog,
}