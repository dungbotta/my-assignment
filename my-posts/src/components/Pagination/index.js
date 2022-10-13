import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Pagination(props) {
    const {
        page,
        pages,
        handlePageChange,
        isMobile
    } = props;

    const pageList = [],
          separator = '...',
          disabledPrevPage = page === 0,
          disableNextPage = page + 1 === pages;

    if (pages < 10 ) {
        
    } else {
        pageList.push(1);
        if (page -1 >= 5) pageList.push(separator);
        for (let index = -3; index <= 3; index++) {
            if (page < 5) pageList.push(index + 5);
            else if (pages - page < 4) pageList.push(pages + index - 4);
            else if (page + index > 1 && page + index < pages) pageList.push(page + index);
        }
        if (pages - page >= 5) pageList.push(separator);
        pageList.push(pages);
    }

    return (
        <div className="pagination-wrapper">
            <div className="pagination-container">
                <a className={`page-prev ${disabledPrevPage ? 'hide' : ''}`}
                   disabled={disabledPrevPage}
                   onClick={(e) => {handlePageChange(e, page - 1)}}
                ><FaChevronLeft className='icon'/></a>
                {isMobile ? (
                    <div className='mobile-pagination'>
                        <span className='current-page' key={1}>{`${page + 1} / ${pages}`}</span>
                    </div>
                ) : ( 
                    <React.Fragment>
                        {pageList.map((element, index) => {
                        if (element == separator) {
                            return <span className="page-separator" key={index}>{separator}</span>
                        } else {
                            return (
                                <a key={index}
                                className={`page-button ${page == element - 1 ? 'page-selected' : ''}`}
                                    onClick={(e) => {handlePageChange(e, element - 1)}}
                                >
                                    {element}
                                </a>
                                )
                            }
                        })}
                    </React.Fragment>
                )}
                <a className={`page-next ${disableNextPage ? 'hide' : ''}`}
                   disabled={disableNextPage}
                   onClick={(e) => {handlePageChange(e, page + 1)}}
                ><FaChevronRight className='icon'/></a>
            </div>
        </div>
    )
}

export default Pagination;