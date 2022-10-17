import {Pressable, StyleSheet, Text, View, Modal, ScrollView, SafeAreaView, TextInput} from 'react-native';
import { FontAwesome, AntDesign  } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getComments } from '../Util/Services';

function Post(props) {
    const {
        posts = [],
        handleDeletePost,
        handleUpdatePost
    } = props;

    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [postEditData, setPostEditData] = useState({});
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');

    useEffect(() =>{
        if (showModal) {
            setShowModal(!showModal);
        }
    }, [JSON.stringify(posts)])

    async function getCommentsList(postId) {
        const comments = await getComments(postId);
        if (comments && comments.length > 0) {
            setComments(comments);
            setEditMode(false);
            setShowModal(!showModal);
        }
    }

    function editPost(postData) {
        setPostEditData(postData);
        setPostTitle(postData.title);
        setPostDesc(postData.body);
        setEditMode(true);
        setShowModal(!showModal);
    }

    function checkSparse(n)
    {
        let res = n / 2;
        return Number(res) === res && res % 1 !== 0;

    }

    return (
        <View style={{margin: 10}}>
            <Modal
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.commentHeader}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Pressable
                                    onPress={() => {
                                        setShowModal(!showModal);
                                        setEditMode(false);
                                        if(editMode) {
                                            setPostTitle('');
                                            setPostDesc('');
                                        }
                                    }}
                                >
                                    <AntDesign name="closecircleo" size={24} color="black" />
                                </Pressable>
                            </View>
                            <Text style={{fontSize: 22, marginBottom: 10}}>{editMode ? 'Edit post' : "Post's comments"}</Text>
                        </View>
                        {!editMode && <ScrollView>
                            {comments && comments.length > 0 && comments.map((comment, commentIndex) => {
                                return (
                                    <View
                                        key={commentIndex}
                                        style={styles.commentContainer}
                                    >
                                        <Text style={styles.commentTitle}>{comment.name}</Text>
                                        <Text style={styles.commentText}>{comment.body}</Text>
                                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <Text style={styles.commentEmail}>{comment.email}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>}
                        {editMode && <ScrollView style={{width: '100%'}}>
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
                                    style={[styles.inputField, {textAlignVertical: 'top'}]}
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
                                        handleUpdatePost(postEditData, postTitle, postDesc);
                                    }}
                                >
                                    <Text style={{color: 'white'}}>Save change</Text>
                                </Pressable>
                            </View>
                        </ScrollView>}
                    </View>
                </SafeAreaView>
            </Modal>
            {posts.length > 0 && posts.map((post, index) => {
                return (
                    <View key={index} style={[styles.cardWrapper, checkSparse(index) ? {backgroundColor: '#EDEDED'} : '']}>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.postText}>{post.body}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Pressable
                                style={styles.postCommentCTA}
                                onPress={() => {
                                    getCommentsList(post.id);
                                }}
                            >
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome style={{marginRight: 10}} name="comments" size={24} color="#ffffff" />
                                    <Text style={{color: '#ffffff'}}>Comments</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={styles.postEditCTA}
                                onPress={() => {
                                    editPost(post);
                                }}
                            >
                                <AntDesign name="edit" size={22} color="#ffffff" />
                            </Pressable>
                            <Pressable
                                style={styles.deletePostCTA}
                                onPress={() => {
                                    handleDeletePost(post.id);
                                }}
                            >
                                <AntDesign name="delete" size={22} color="#ffffff" />
                            </Pressable>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}   

export default Post;

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#ffffff',
        marginBottom: 10,
        padding: 10
    },
    postTitle: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10
    },
    postText: {
        fontSize: 16,
        marginBottom: 20
    },
    postCommentCTA: {
        backgroundColor: '#2986cc',
        borderRadius: 6,
        padding: 6,
        marginRight: 15
    },
    postEditCTA: {
        backgroundColor: '#F6B26B',
        borderRadius: 6,
        padding: 6,
        marginRight: 15
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(68, 68, 68, 0.9)',
    },
    modalView: {
        height: '100%',
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
    commentContainer: {
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        padding: 10,
        borderRadius: 6
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    commentText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'justify'
    },
    commentEmail: {
        fontStyle: 'italic',
        fontWeight: '700'
    },
    editPostTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    deletePostCTA: {
        backgroundColor: 'red',
        borderRadius: 6,
        padding: 6
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
    
})