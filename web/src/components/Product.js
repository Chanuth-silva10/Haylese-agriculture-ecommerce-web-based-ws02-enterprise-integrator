import {Link} from 'react-router-dom';
import './Product.css'
import {connect} from 'react-redux';
import { getProductDetails } from '../actions/productActions'

const Product = (props) => {

    const {imageUrl, name, price, description, date, productId} = props


    const displayProduct = (id) => {
        console.log(id);
        props.getProductDetails(id);
    } 
    
    return (
        <div className="product">
            <img src={imageUrl} alt={name}/>
            <div className="product__info">
                <p className="info__name">{name}</p>
                <p className="info__description">
                    {description.substring(0,100)}...
                </p>
                <p className="info__price">LKR{price}</p>
                <p className="info__date">{date}</p>

                <Link to={`/product/${productId}`} className="info__button" onClick={() => displayProduct(productId)}>View</Link>
            </div>
        </div>
    )
}


const mapsStatetoprops = state => ({
    products: state.products
})
export default connect(mapsStatetoprops, {getProductDetails}) (Product)
