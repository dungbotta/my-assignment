import React, { useState } from "react";
import { commentsSkeleton } from "../../utility/skeleton";

function Card(props) {
    const {
        postData = {},
        index,
        handleDeletePost,
        handleEditPost,
        handleShowComments,
        showComments = false,
        commentList = []
    } = props;

    const renderComments = () => {
        if (showComments) {
            return (
                <div className="comments-container">
                    {commentList.length == 0 ? (
                        <React.Fragment>
                            {commentsSkeleton()}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {commentList.length > 0 && commentList.map((comment, commentIndex) => {
                                return (
                                    <div className="comment-wrapper" key={commentIndex}>
                                        <p className="comment-email">{comment.email}</p>
                                        <p className="comment-text">{comment.body}</p>
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )}
                </div>
            )
        } else {
            return null;
        }
    }

    return (
        <React.Fragment>
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
                            onClick={() => {
                                handleShowComments(index, postData.id);
                            }}
                        >View comments</button>
                        <button
                            className="card-cta-edit"
                            onClick={() => {
                                handleEditPost(postData)
                            }}
                        >Edit post</button>
                    </div>
                </div>
            </div>
            {renderComments()}
        </React.Fragment>
    )
}

export default Card;