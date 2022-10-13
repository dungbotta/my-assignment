import React, { useState } from "react";
import { commentsSkeleton } from "../../utility/skeleton";
import { noSroll } from "../../utility/tools";

import { Transition, animated } from 'react-spring';
import { FaComments, FaEdit, FaTrashAlt, FaRegWindowClose, FaUserAlt } from "react-icons/fa";

function Card(props) {
    const {
        postData = {},
        index,
        handleDeletePost,
        handleEditPost,
        handleShowComments,
        showComments = false,
        commentList = [],
        isMobile
    } = props;

    const renderComments = () => {
        return (
            <Transition
                items={showComments}
                from={{ 
                    opacity: 0,
                    // transform: 'translate3d(0,5%,0)'
                    transform: isMobile ? 'translateY(-100px)' : 'translateY(100px)'
                }}
                enter={{
                    opacity: 1,
                    // transform: 'translate3d(0,0,0)'
                    transform: 'translateY(0px)'
                }}
                leave={{
                    opacity: 0,
                    transform: 'translateY(-20px)'
                }}
                config={{
                    tension: 80,
                    friction: 18,
                    velocity: 5
                }}
            >
            {props => (
                <animated.div style={props} className={`comments-container ${isMobile ? 'mobile-variation' : ''}`}>
                    {isMobile && (
                        <div className="comments-mobile-header">
                            <button
                                style={{background: 'none', border: 'none'}}
                                onClick={() => {
                                    handleShowComments(-1, -1);
                                    noSroll(false);
                                }}
                            >
                                <FaRegWindowClose className="icon"/>
                            </button>
                        </div>
                    )}
                    {commentList.length == 0 ? (
                        <React.Fragment>
                            {commentsSkeleton()}
                        </React.Fragment>
                    ) : (
                        <div className="comment">
                            {commentList.length > 0 && commentList.map((comment, commentIndex) => {
                                return (
                                    <div className="comment-wrapper" key={commentIndex}>
                                        <p className="comment-name">{comment.name}</p>
                                        <p className="comment-text">{comment.body}</p>
                                        <div className="comment-footer">
                                            <p className="comment-email"><FaUserAlt className="icon"/>{comment.email}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </animated.div>
                )}
            </Transition>
        )
    }

    return (
        <div className="card-container">
            <div className={`card-wrapper ${showComments ? 'remove-margin' : ''}`}>
                <div className="card-header">
                    <div className="delete-wrapper">
                        <span className="delete" onClick={() => {handleDeletePost(postData.id)}}><FaTrashAlt className="icon"/></span>    
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
                                if (isMobile) noSroll(true);
                            }}
                        ><FaComments className="icon"/>{` ${showComments ? 'Hide comments' : 'View comments' }`}</button>
                        <button
                            className="card-cta-edit"
                            onClick={() => {
                                handleEditPost(postData);
                                noSroll(true);
                            }}
                        ><FaEdit className="icon"/></button>
                    </div>
                </div>
            </div>
            {showComments && renderComments()}
        </div>
    )
}

export default Card;