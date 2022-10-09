import React from "react";

function Card(props) {
    const {
        postData = {},
        index,
        handleDeletePost,
        handleEditPost
    } = props;

    return (
        <div className="card-wrapper">
            <div className="card-header">
                <div className="delete-wrapper">
                    <span className="delete" onClick={() => {handleDeletePost(postData.id)}}></span>    
                </div>
                <h3 className="post-title">{postData.title}</h3>
            </div>
            <div className="card-body">
                <p className="post-content">{postData.body}</p>
            </div>
            <div className="card-footer">
                <div className="button-wrapper">
                    <button
                        className="card-cta-comments"
                    >
                        View comments
                    </button>
                    <button
                        className="card-cta-edit"
                        onClick={() => {
                            handleEditPost(postData)
                        }}
                    >
                        Edit post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;