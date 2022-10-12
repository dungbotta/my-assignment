function Pagination(props) {
    const {
        page,
        pages,
        handlePageChange
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
                ></a>
                {pageList.map((element, index) => {
                    if (element == separator) {
                        return <span className="page-separator">{separator}</span>
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
                <a className={`page-next ${disableNextPage ? 'hide' : ''}`}
                   disabled={disableNextPage}
                   onClick={(e) => {handlePageChange(e, page + 1)}}
                ></a>
            </div>
        </div>
    )
}

export default Pagination;