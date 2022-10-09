import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function postsSkeleton() {
    return (
        <React.Fragment>
            <div className="card-wrapper">
                <div className="card-header">
                    <Skeleton
                        count={1}
                        width="90%"
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
            <div className="card-wrapper">
                <div className="card-header">
                    <Skeleton
                        count={1}
                        width="90%"
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
            <div className="card-wrapper">
                <div className="card-header">
                    <Skeleton
                        count={1}
                        width="90%"
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
        </React.Fragment>
    )
}

export {
    postsSkeleton
}