const createRequestBody = (postTitle, postBody, postUserId, postId = '' ) => {
    return {
        title: postTitle,
        body: postBody,
        userId: postUserId,
        ...(postId && {id: postId})
    }
}

export {
    createRequestBody
}