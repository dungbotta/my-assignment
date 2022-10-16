import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function postsSkeleton() {
    return (
        <React.Fragment>
            <div className="card-container">
                <div className="card-wrapper">
                    <div className="card-header">
                        <Skeleton
                            count={1}
                            width="90%"
                            style={{marginBottom: 10}}
                        />
                        <Skeleton
                            count={1}
                            width="20%"
                        />
                    </div>
                    <div className="card-body">
                        <div className="post-content" style={{marginTop: 22}}>
                            <Skeleton
                                count={4}
                                width="100%"
                            />
                            <Skeleton
                                count={1}
                                width="40%"
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <Skeleton
                            count={1}
                            width="30%"
                        />
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="card-wrapper">
                    <div className="card-header">
                        <Skeleton
                            count={1}
                            width="90%"
                            style={{marginBottom: 10}}
                        />
                        <Skeleton
                            count={1}
                            width="20%"
                        />
                    </div>
                    <div className="card-body">
                        <div className="post-content" style={{maringTop: 22}}>
                            <Skeleton
                                count={4}
                                width="100%"
                            />
                            <Skeleton
                                count={1}
                                width="40%"
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <Skeleton
                            count={1}
                            width="30%"
                        />
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="card-wrapper">
                    <div className="card-header">
                        <Skeleton
                            count={1}
                            width="90%"
                            style={{marginBottom: 10}}
                        />
                        <Skeleton
                            count={1}
                            width="20%"
                        />
                    </div>
                    <div className="card-body">
                        <div className="post-content" style={{maringTop: 22}}>
                            <Skeleton
                                count={4}
                                width="100%"
                            />
                            <Skeleton
                                count={1}
                                width="40%"
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <Skeleton
                            count={1}
                            width="30%"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

function commentsSkeleton() {
    return (
        <React.Fragment>
            <div className='comment'>
                <div className='comment-wrapper'>
                    <div className='comment-name'>
                        <Skeleton
                            count={1}
                            width="50%"
                        />
                    </div>
                    <div className='comment-text'>
                        <Skeleton
                            count={3}
                            width="100%"
                        />
                    </div>
                    <div className='comment-footer'>
                        <Skeleton
                            count={1}
                            width="20%"
                        />
                    </div>
                </div>
                <div className='comment-wrapper'>
                    <div className='comment-name'>
                        <Skeleton
                            count={1}
                            width="50%"
                        />
                    </div>
                    <div className='comment-text'>
                        <Skeleton
                            count={3}
                            width="100%"
                        />
                    </div>
                    <div className='comment-footer'>
                        <Skeleton
                            count={1}
                            width="20%"
                        />
                    </div>
                </div>
                <div className='comment-wrapper'>
                    <div className='comment-name'>
                        <Skeleton
                            count={1}
                            width="50%"
                        />
                    </div>
                    <div className='comment-text'>
                        <Skeleton
                            count={3}
                            width="100%"
                        />
                    </div>
                    <div className='comment-footer'>
                        <Skeleton
                            count={1}
                            width="20%"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export {
    postsSkeleton,
    commentsSkeleton
}