import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { bookData,
    AsyncThunkgetBookInfoFromAPI,
    AsyncThunkSortWithRating, 
    addInCart,
 } from '../../app/ecsSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import './home.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Rating from 'react-rating';



const conversion = (strValue) => {
    if (strValue === 'below 1') {
        return '1';
    }
    else if (strValue === 'below 2') {
        return '2';
    }
    else if (strValue === 'below 3') {
        return '3';
    }
    else if (strValue === 'below 4') {
        return '4';
    }
    else {
        return '';
    }

}


function Home() {
    const dispatch = useDispatch();
    const books = useSelector(bookData);
    const [listedBook, setListedBook] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [newCount, setNewCount] = useState(30);
    const [value, setValue] = useState('Sort by star');


    const handleSelect = (e) => {
        console.log(e);
        setValue(e)
        if (e !== 'Filter') {
            dispatch(AsyncThunkSortWithRating(conversion(e))).then(unwrapResult).then(r => {
                console.log(r);
                setSearchResult(r);
                console.log("Sorted ", searchResult);
            });
        } else {
            setSearchResult([]);
        }

    }

    useEffect(() => {
        if (searchResult.length > 0) {
            setListedBook(searchResult.slice(0, newCount))
        } else {
            if (books.bookStore.length > 0) {
                setListedBook(books.bookStore.slice(0, newCount))
            }
        }
    }, [books, newCount, searchResult])

    useEffect(() => {
        dispatch(AsyncThunkgetBookInfoFromAPI())

    }, [dispatch])


    useEffect(()=> {
        setSearchResult(books.searchResult)
    }, [books.searchResult ])


    
    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            setNewCount(nc => nc + 20);
        }
    }
    
    const handleAddToCart=(bookInfo)=> {
        dispatch(addInCart(bookInfo));
        // console.log("itemsInCart ", books.bookInCart.length);
    }

    useEffect(() => {
        window.addEventListener('scroll', loadMore);
        return () => {
            window.removeEventListener('scroll', loadMore);
        }
    })

    
    return (
        <div className="my-1">
            <DropdownButton
                title={value}
                id="dropdown-menu"
                onSelect={handleSelect}
                variant="secondary"
            >
                <Dropdown.Item eventKey="below 1">below 1</Dropdown.Item>
                <Dropdown.Item eventKey="below 2">below 2</Dropdown.Item>
                <Dropdown.Item eventKey="below 3">below 3</Dropdown.Item>
                <Dropdown.Item eventKey="below 4">below 4</Dropdown.Item>
                <Dropdown.Item eventKey="Sort by star">Clear</Dropdown.Item>
            </DropdownButton>

            <div className="container booklist my-2 p-2">
                {listedBook.map((book, idx) => (
                    <div className="card my-1 mx-1 p-3" key={idx}>
                        {book.title.length < 100 ? book.title : book.title.slice(0, 50)}
                        <Rating
                            emptySymbol="fa fa-star-o"
                            fullSymbol="fa fa-star"
                            initialRating={book.average_rating}
                            readonly="true"
                        />
                        <div className="rating-count">{book.ratings_count} Ratings</div>
                        <Button disabled={books.bookInCart.some(bkId => bkId.bookID === book.bookID)} onClick={() => handleAddToCart(book)} >{books.bookInCart.some(bkId => bkId.bookID === book.bookID) ? "Added": "Add cart"}</Button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home
