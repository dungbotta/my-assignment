const breakPointMax = {
    mobile: 767
}

const VIEWPORT_TYPE = {
    MOBILE: 'mobile'
}

const viewPortBreakPoint = {
    mobile: `(max-width: ${breakPointMax.mobile}px)`
}

const createRequestBody = (postTitle, postBody, postUserId, postId = '' ) => {
    return {
        title: postTitle,
        body: postBody,
        userId: postUserId,
        ...(postId && {id: postId})
    }
}

const watchBreakPoint = (viewPort) => {
    let matchMediaValue = viewPortBreakPoint[viewPort];
    return window.matchMedia(matchMediaValue);
}

const noSroll = (status) => {
    var element = document.querySelector("body");
    if (status) {
        element.classList.add("no-scroll");
    } else {
        element.classList.remove("no-scroll");
    }
}

export {
    createRequestBody,
    watchBreakPoint,
    noSroll,
    VIEWPORT_TYPE
}