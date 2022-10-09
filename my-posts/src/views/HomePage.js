import React, { setState } from "react";
import Card from '../componets/Card';
import { createRequestBody } from "../utility/tools";
import { getPostsList, deletePost } from "../utility/services"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showError: false,
            postsList: []
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

    render() {
        const { 
            isLoading,
            postsList 
        } = this.state;
        return (
            <div className="post-container house">
                {isLoading ? (
                    <div>
                        <p>loading</p> {/* TO DO SKELETHON*/}
                    </div>
                ) : (
                    <React.Fragment>
                        {postsList && postsList.length > 0 && postsList.map((post, postIndex) => {
                            return (
                                <Card
                                    key={postIndex}
                                    postData={post}
                                    index={postIndex}
                                    handleDeletePost={this.deleteSelectedPost}
                                />
                            )
                        })}
                    </React.Fragment>
                )}
            </div>
        )
    }
}

export default HomePage;