import axios from "axios";

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const HEADERS = {
    "Access-Control-Allow-Origin": "*",
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const getPostsList = async () => {
    const response = await axios.get(BASE_URL, HEADERS);
    return response.data;
}

const getComments = async (postId) => {
    const url = `${BASE_URL}/${postId}/comments`
    const response = await axios.get(url, HEADERS);
    return response.data;
}

const updatePostData = async (postData) => {
    const {
        id,
        title,
        body,
        userId
    } = postData;
    const URL = `${BASE_URL}/${userId}`;
    const BODY = {
        id: id,
        title: title,
        body: body,
        userId: userId,
    };
    const response = await axios.put(URL, BODY);
    return response.data;
}

const deletePostById = async (postId) => {
    const url = `${BASE_URL}/${postId}`;
    const res = await axios.delete(url);
    return res;
}

const createNewPost = async (postData) => {
    const {
        title,
        body,
        userId
    } = postData;
    const URL = `${BASE_URL}/${userId}`;
    const BODY = {
        title: title,
        body: body,
        userId: userId,
    };
    const res = await axios.post(BASE_URL, BODY);
    return res.data;
}

export {
    getPostsList,
    getComments,
    updatePostData,
    deletePostById,
    createNewPost
}
