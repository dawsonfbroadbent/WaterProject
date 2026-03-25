import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.donationAmount, 0);


    return (
        <div className="container">
            <h2>Cart</h2>
            <div>
                {cart.length === 0 ? <p>Your cart is empty</p> :
                    <ul>
                        {cart.map((item) => (
                            <li key={item.projectId}>
                                {item.projectName}: ${item.donationAmount.toFixed(2)}
                                <button onClick={() => removeFromCart(item.projectId)}>Remove</button>
                            </li>
                        ))}
                    </ul> 
                }
            </div>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/projects')}>Continue Browsing</button>
        </div>
    );
}

export default CartPage;