import './CartItem.css'
import {Link} from 'react-router-dom'


const CartItem = ({item , removeFromCart}) => {
    return (
        <div className="cartitem">
            <div className="cartitem__image">
                <img src={item.imageUrl} alt={item.name}/>
            </div>

            <Link to={`/product/${item.product}`} className="cartitem__name">
                <p>{item.name}</p>
            </Link>

            <p className="cartitem__price">LKR{item.price}</p>

            <select className="cartitem__select" value={item.qty} disabled>
                <option>{item.qty}</option>
            </select>

            <button className="cartitem__deleteBtn" onClick={()=>removeFromCart(item.product)}>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default CartItem
