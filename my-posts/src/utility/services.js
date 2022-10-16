const BASE_URL = 'http://localhost:3001/posts';
const METHOD = {
    delete: 'DELETE',
    update: 'PUT',
    create: 'POST'
}
const getPostsList = () => {
    return fetch(BASE_URL, {
        headers: {'Access-Control-Allow-Origin' : '*'}
    })
    .then((response) => response.json())
    .then(reponseData => reponseData)
    .catch(error => console.error(error));
}

const getCommentsList = (postId) => {
    const url = `${BASE_URL}/${postId}/comments`
    return fetch(url)
    .then((response) => response.json())
    .then(reponseData => reponseData)
    .catch(error => console.error(error));
}

const createUpdatePost = (type, body) => {
    const url = type ? type === 'new' ? BASE_URL : BASE_URL + '/' + body.id : '';
    return fetch(url, {
        method: type ? type === 'new' ? METHOD.create : METHOD.update : '',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then(reponseData => reponseData)
    .catch(error => console.error(error));
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
    deletePost,
    getCommentsList
}