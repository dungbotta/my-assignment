import React, { useState } from "react";
import Drawer from "../Drawer";

import { createRequestBody } from "../../utility/tools";
import { createUpdatePost } from "../../utility/services";

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
            console.log(JSON.stringify(response))
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