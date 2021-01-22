import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AsyncThunkSearch, bookData } from '../../app/ecsSlice';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';



function Header() {
    const [state, setState] = useState('');
    const history = useHistory();
    const [cartState, setcartState] = useState();
    const books = useSelector(bookData);
    const dispatch = useDispatch();


    const handleSearch = () => {
        if (state.trim().length > 0) {
            dispatch(AsyncThunkSearch(state))
            history.push('/');
        }
    }


    const gotoCart=()=> {
		setState('');
        history.push('/cart/')
    }
	
    useEffect(()=> {
        setcartState(books.bookInCart.length)
    }, [books.bookInCart.length ])
    
    const gotoHome=()=> {
		history.push('https://vinay846.github.io/ecsbookrepo/');
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand style={{cursor: "pointer", color: "white"}} onClick={gotoHome}>ECS</Navbar.Brand>
			<Nav className="mr-auto" />
			<Form inline>
				<FormControl
					type="text"
					value={state}
					onChange={(e) => setState(e.target.value)}
					placeholder="Search"
					className="mr-sm-2"
				/>
				<Button onClick={handleSearch} variant="outline-info">
					Search
				</Button>
			</Form>
			<div onClick={gotoCart} className="cart">
				<i className="fa fa-shopping-cart fa-2x" aria-hidden="true" />
				<span className="badge badge-warning" id="lblCartCount">
					{cartState}
				</span>
			</div>
		</Navbar>
	);
}

export default Header;
