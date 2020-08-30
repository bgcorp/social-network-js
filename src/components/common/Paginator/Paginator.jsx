import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';


const Paginator = ({ totalItemsCount, pageSize, currentPage, onChangeCurrentPage, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortion = (portionNumber - 1) * portionSize + 1;
    let rightPortion = portionNumber * portionSize;


    return <div className={styles.paginatorBlock}>
        {portionNumber > 1
            && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
        {pages.filter(p => p >= leftPortion && p <= rightPortion)
            .map(p => <span key={p}
                className={cn(styles.pageNumber, { [styles.selectedPage]: p === currentPage })}
                onClick={() => { onChangeCurrentPage(p) }}> {p} </span>)}
        {portionCount > portionNumber
            && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
    </div>
}


export default Paginator;