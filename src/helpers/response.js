export const sucessResponse = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        sucess: true,
        message,
        data
    })
}

export const errorResponse = (res, message, error = null, statusCode = 400) => {
    return res.status(statusCode).json({
        sucess: false,
        message,
        error
    })
}