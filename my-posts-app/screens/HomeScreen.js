import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Pressable, Modal, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native";
import Post from "../component/Post";
import { getPostsList, deletePostById, updatePostData, createNewPost } from "../Util/Services";
import { Ionicons, AntDesign } from '@expo/vector-icons';


function HomeScreen(props) {
    const {

    } = props;

    const [postsList, setPostList] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const [showPostModal, setShowPostModal] = useState(false);

    useEffect(() => {
        initialState();
    }, []);

    async function initialState() {
        const posts = await getPostsList();
        if (posts && posts.length > 0) {
            setPostList(posts);
        }
    }

    async function deletePost(postId) {
        const res = await deletePostById(postId);
        if (res) {
            // remove post from List FAKE
            let newPostList = postsList.filter(post => post.id != postId);
            setPostList(newPostList);
        }
    }

    async function updatePost(postData) {
        const res = await updatePostData(postData);
        if (res) {
            let postListCopy = postsList;
            let postIndex = postsList.findIndex(post => post.id == postData.id && post.userId == postData.userId);
            postListCopy[postIndex].title = postData.title;
            postListCopy[postIndex].body = postData.body;
        }
    }

    function savePostChange(postEditData, postTitle, postDesc) {
        const {
            userId,
            id
        } = postEditData;
        const dataObj = {
            id: id,
            title: postTitle,
            body: postDesc,
            userId: userId,
        }
        updatePost(dataObj);
    }

    async function addNewPost(postTitle, postDesc) {
        const randomUserid = Math.floor(Math.random() * 10);
        const postData = {
            title: postTitle,
            body: postDesc,
            userId: randomUserid
        }
        const res = await createNewPost(postData);
        if (res) {
            let postListCopy = postsList;
            postListCopy.unshift(res);
            setPostList(postListCopy);
            setPostTitle('');
            setPostDesc('');
            setShowPostModal(!showPostModal);
        }
    }

    return (
        <View>
            <Modal
                transparent={true}
                visible={showPostModal}
                onRequestClose={() => {
                    setShowPostModal(!showPostModal);
                }}
            >
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.commentHeader}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Pressable
                                    onPress={() => {
                                        setShowPostModal(!showPostModal);
                                        setPostTitle('');
                                        setPostDesc('');
                                        
                                    }}
                                >
                                    <AntDesign name="closecircleo" size={24} color="black" />
                                </Pressable>
                            </View>
                            <Text style={{fontSize: 22, marginBottom: 10}}>New Post</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <View style={{width: '100%'}}>
                            <View>
                                <Text style={styles.editPostTitle}>Title</Text>
                                <TextInput
                                    style={styles.inputField}
                                    onChangeText={setPostTitle}
                                    value={postTitle}
                                />
                            </View>
                            <View>
                                <Text style={styles.editPostTitle}>Description</Text>
                                <TextInput
                                    style={[styles.inputField, {textAlignVertical: 'top', minHeight: 400}]}
                                    multiline={true}
                                    numberOfLines={1000}
                                    placeholder={'insert text'}
                                    onChangeText={setPostDesc}
                                    value={postDesc}
                                />
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Pressable
                                    style={styles.saveEditedPostCTA}
                                    onPress={() => {
                                        addNewPost(postTitle, postDesc);
                                    }}
                                >
                                    <Text style={{color: 'white'}}>Save change</Text>
                                </Pressable>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView>
            </Modal>
            <ScrollView style={styles.postContainer}>
                <Post
                    posts={postsList}
                    handleDeletePost={deletePost}
                    handleUpdatePost={savePostChange}
                />
            </ScrollView>
            <View style={[styles.addPostCTA, {zIndex: 3}]}>
                <Pressable
                    onPress={() => {
                        setShowPostModal(!showPostModal);
                    }}
                >
                    <Ionicons name="add-circle" size={38} color="white" />
                </Pressable>
            </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#292929'
    },
    addPostCTA: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#E69138',                                    
        position: 'absolute',                                 
        bottom: 10,                                                    
        left: '10%'
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(68, 68, 68, 0.9)',
    },
    modalView: {
        height: 'auto',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    commentHeader: {
        width: '100%'
    },
    editPostTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    inputField: {
        borderColor: '#2D2D2D',
        width: 'auto',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 2,
        padding: 10,
        marginBottom: 10
    },
    saveEditedPostCTA: {
        backgroundColor: '#2986cc',
        borderRadius: 6,
        padding: 6,
        height: 30
    }
});
