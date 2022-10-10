import React, { setState } from "react";
import Card from '../componets/Card';
import { postsSkeleton } from "../utility/skeleton";
import Drawer from "../componets/Drawer";

import { createRequestBody } from "../utility/tools";
import { getPostsList, deletePost, createUpdatePost, getCommentsList } from "../utility/services"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.SKLETON_COUNTER = 8;
        this.state = {
            isLoading: true,
            showError: false,
            postsList: [],
            showEditDrawer: false,
            postTitle: '',
            postDesc: '',
            postUserId: '',
            postId: '',
            postIdCommentsToDisplay: -1,
            commentList: []
        }
    }

    componentDidMount() {
        this.seInitialState();
    }

    seInitialState = () => {
        getPostsList().then(response => {
            if (response && response.length) {
                this.setState({
                    postsList: response,
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false,
                    showError: true
                })
                console.log('error loading posts');
            }
        })
    }

    deleteSelectedPost = (postId) => {
        const { postsList } = this.state;
        if(postId) {
            deletePost(postId).then((res) => {
                if (res) {
                    // remove post from List
                    this.setState({
                        postsList: postsList.filter(post => post.id != postId)
                    })
                } else {
                    console.log('error deleted post')
                }
            });
        }
    }

    /**
     * This function set post indo to view on edit drawer.
     * @function
     * @param {object} postData
     */
    handleEditPost = (postData) => {
        const {
            userId,
            id,
            title,
            body
        } = postData;
        this.setState({
            postTitle: title,
            postDesc: body,
            postId: id,
            postUserId: userId
        }, () => {
            this.handleDrawer();
        })
    }

    handleDrawer = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                showEditDrawer: !prevState.showEditDrawer
            }
        })
    }

    handleFormSubmit = ( formData ) => {
        const {
            postTitle,
            postText
        } = formData;
        const {
            postUserId,
            postId,
            postsList
        } = this.state;
        const fetchBody = createRequestBody(postTitle, postText, postUserId, postId);
        createUpdatePost('update', fetchBody).then((response) => {
            if (response && Object.keys(response).length > 0) {
                let postListCopy = postsList;
                let postIndex = postsList.findIndex(post => post.id == postId && post.userId == postUserId);
                postListCopy[postIndex].title = postTitle;
                postListCopy[postIndex].body = postText;
                this.setState({
                    postsList: postListCopy
                }, () => {
                    this.handleDrawer();
                })
            }
        });
    }

    /**
     * This function handel show/hide comments drawer and fetch to have postId's comments to render.
     * @function
     * @param {number} postIndex
     * @param {string} postId
     */
    handleShowComments = (postIndex, postId) => {
        const { postIdCommentsToDisplay } = this.state;
        // open drawer and fetch api call
        const haveToHide = postIndex == postIdCommentsToDisplay
        this.setState({
            postIdCommentsToDisplay: haveToHide ? -1 : postIndex
        }, () => {
            // if open drawer we have to make API call to have comments
            if (!haveToHide) {
                getCommentsList(postId).then((response) => {
                    if (response && response.length > 0) {
                        this.setState({
                            commentList: response
                        })
                    } else {
                        console.log('error load comments');
                    }
                })
            }
        })

    }

    render() {
        const { 
            isLoading,
            postsList ,
            showEditDrawer,
            postTitle,
            postDesc,
            postIdCommentsToDisplay,
            commentList
        } = this.state;
        return (
            <div className="post-container house">
                {isLoading ? (
                    <React.Fragment>
                        {postsSkeleton()}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {postsList && postsList.length > 0 && postsList.map((post, postIndex) => {
                            return (
                                <Card
                                    key={postIndex}
                                    postData={post}
                                    index={postIndex}
                                    handleDeletePost={this.deleteSelectedPost}
                                    handleEditPost={this.handleEditPost}
                                    handleShowComments={this.handleShowComments}
                                    showComments={postIdCommentsToDisplay === postIndex}
                                    commentList={postIdCommentsToDisplay === postIndex ? commentList : []}
                                />
                            )
                        })}
                    </React.Fragment>
                )}
                {showEditDrawer && (
                    <Drawer
                        showBg={showEditDrawer}
                        handleDrawer={this.handleDrawer}
                        handleFormSubmit={this.handleFormSubmit}
                        type={'editPost'}
                        postTitle={postTitle}
                        postDesc={postDesc}
                    />
                )}
            </div>
        )
    }
}

export default HomePage;