import React , {useContext} from 'react'
import { DataContext } from "../ContextAPI";
import './index.css'

import ProductDisplay from '../../../Components/ProductLayout';



const WishList = () => {

      const {  WishList } = useContext(DataContext);

      const WisList = 0
    return (
      <div className="Wishlist-conatiner">
        {WisList.length === 0 ? (
                      <ProductDisplay products={WishList} />
        ) : (
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
        )}
      </div>
    );
}

export default WishList