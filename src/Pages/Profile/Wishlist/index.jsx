import React , {useContext} from 'react'
import { DataContext } from "../ContextAPI";
import './index.css'

import ProductDisplay from '../../../Components/ProductLayout';



const WishList = () => {

    const { wishlist, loading, error , orders , cart } = useContext(DataContext);


    console.log('check',wishlist.length)

    return (
      <div className="Wishlist-conatiner">
        {wishlist.length === 0 ? (
          <div className="empty-state-wishlist">
            <h3 className="empty-title-wishlist">No Wishlists found</h3>
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
            <ProductDisplay products={wishlist} />
        )}
      </div>
    );
}

export default WishList