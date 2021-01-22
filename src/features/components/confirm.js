import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const randomOrderId = () => {
	return Math.floor(Math.random() * 1000000000);
};

function Confirm() {
	return (
		<div className="container">
			<Card border="success" style={{ textAlign: 'center' }}>
				<Card.Body>
					<i className="fa fa-check-circle" aria-hidden="true" />
					<h5>Order confirmed !</h5>
					<h6>Thankyou for Order</h6>
					<h6>OrderId: {randomOrderId()}</h6>
				</Card.Body>
			</Card>
            <div className="d-flex justify-content-center my-3">
			<Button href="/">make new order ?</Button>
            </div>
		</div>
	);
}

export default Confirm;
