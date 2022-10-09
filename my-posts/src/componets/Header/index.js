import React from "react";

function Header(props) {
    const {

    } = props;

    return(
        <div className="header-wrapper">
            <div>
                <h3>Post</h3>
            </div>
            <div>
                <button>
                    create new post
                </button>
            </div>
        </div>
    )
}

export default Header;