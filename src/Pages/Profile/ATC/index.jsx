import React , {useContext} from 'react'
import { DataContext } from "../ContextAPI";
import './index.css'

import ProductDisplay from '../../../Components/ProductLayout';



const WishList = () => {

    const {  loading, error , cart } = useContext(DataContext);
    return (
      <div className="Wishlist-conatiner">
        {cart.length === 0 ? (
          <div className="empty-state-wishlist">
            <h3 className="empty-title-wishlist">No Leads found</h3>
            <p className="empty-description-wishlist">
              Add your first Lead to get started
            </p>
            <button
              // onClick={() => setIsFormOpen(true)}
              className="add-button"
            >
              Add New Leads
            </button>
          </div>
        ) : (
            <ProductDisplay products={cart} />
        )}
      </div>
    );
}

export default WishList