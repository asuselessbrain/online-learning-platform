const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Api not Found",
        error: { ptah: req.originalUrl, errorMessage: "The path is not found that you provided" }
    })
}

export default notFound