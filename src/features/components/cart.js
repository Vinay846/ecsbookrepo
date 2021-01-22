import React, { useState, useEffect } from 'react';
import { bookData } from '../../app/ecsSlice';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { removeFromCart } from '../../app/ecsSlice';
import { useDispatch } from 'react-redux';


function Cart() {
	const books = useSelector(bookData);
	const [ totalAmount, setTotalAmount ] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

	useEffect(
		() => {
			let calPrice = 0;
			if (books.bookInCart.length > 0) {
				books.bookInCart.forEach((eachItem) => {
					calPrice += eachItem.price;
				});
				console.log(calPrice);
			}
			setTotalAmount(calPrice);
		},
		[ books.bookInCart ]
	);

	const HandleConfirmOrder = () => {
        history.push('/confirm');
        dispatch(removeFromCart([]));
	};

	return (
		<div className="container my-2">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Authors</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{books.bookInCart.map((item, idx) => (
						<tr>
							<td>{idx + 1}</td>
							<td>{item.title}</td>
							<td>{item.authors}</td>
							<td>{item.price}</td>
						</tr>
					))}
					<tr>
						<td colSpan="3">Total amount</td>
						<td>{totalAmount}</td>
					</tr>
				</tbody>
			</Table>
        <div className="d-flex justify-content-center my-3">
			<Button disabled={books.bookInCart.length === 0} onClick={HandleConfirmOrder}>Pay now</Button>
        </div>
		</div>
	);
}

export default Cart;
