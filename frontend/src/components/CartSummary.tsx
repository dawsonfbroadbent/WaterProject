import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
    const navigate = useNavigate();
    const {cart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.donationAmount, 0);
    
    return (
        <div 
            style={{
                position: 'fixed',
                top: '10px',
                right: '20px',
                background: '#f8f9fa',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                fontSize: '16px',
            }}
            onClick={() => navigate('/cart')}
        >
            🛒 <strong>{totalAmount.toFixed(2)}</strong>
        </div>
    );
};

export default CartSummary;