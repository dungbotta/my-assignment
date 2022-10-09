const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const METHOD = {
    delete: 'DELETE',
    update: 'PUT',
    create: 'POST'
}
const getPostsList = () => {
    return fetch(BASE_URL)
    .then((response) => response.json())
    .then(reponseData => reponseData)
    .catch(error => console.error(error));
}

const createUpdatePost = (type, body) => {

}

const deletePost = (postId) => {
    return fetch(BASE_URL + '/' + postId, {
        method: METHOD.delete
    })
    .then((response) => response.ok)
    .catch(error => console.error(error));
}

export {
    getPostsList,
    createUpdatePost,
    deletePost
}