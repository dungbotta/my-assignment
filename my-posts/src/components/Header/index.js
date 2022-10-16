import React, { useState } from "react";
import PubSub from "pubsub-js";
import Drawer from "../Drawer";

import { topics } from "../../utility/pubSubTopics";
import { createRequestBody, noSroll } from "../../utility/tools";
import { createUpdatePost, getPostsList } from "../../utility/services";

function Header(props) {
    const {

    } = props;

    const [showDrawer, setShowDrawer] = useState(false);
    
    const handleDrawer = () => {
        setShowDrawer(!showDrawer)
    }

    const handleFormSubmit = ( formData ) => {
        const {
            postTitle,
            postText
        } = formData;
        const randomUserid = Math.floor(Math.random() * 10);
        const fetchBody = createRequestBody(postTitle, postText, randomUserid);
        createUpdatePost('new', fetchBody).then((response) => {
            if (response && Object.keys(response).length > 0) {
                PubSub.publish(topics.POST_LIST, 'reload posts');
                handleDrawer();
                noSroll(false);
            } else {
                console.alert('Error insert new post');
            }
        });
    }

    return(
        <div className="header-wrapper">
            <div className="header-title-wrapper">
                <h3 className="title">Post</h3>
            </div>
            <div className="header-buttons-wrapper">
                <button
                    className="create-post-cta"
                    onClick={() => {
                        handleDrawer();
                        noSroll(true);
                    }}
                    >
                    create new post
                </button>
            </div>
            {showDrawer && (
                <Drawer
                    showBg={showDrawer}
                    handleDrawer={handleDrawer}
                    handleFormSubmit={handleFormSubmit}
                    type={'newPost'}
                />
            )}
        </div>
    )
}

export default Header;