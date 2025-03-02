import React , {useContext} from 'react';
import './index.css';
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgShoppingBag } from "react-icons/cg";

import {DataContext} from '../ContextAPI'

const Stats = () => {

    const { wishlist, loading, error , orders , cart  } = useContext(DataContext);
    return (

        <div className="stats-grid">
        <div className="stat-card">
            <div className="stat-icon">
                <CgShoppingBag size={22}/>
            </div>
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
        </div>
        <div className="stat-card">
            <div className="stat-icon">
                <AiOutlineDownload size={22}/>
            </div>
            <h3>24</h3>
            <p>Downloads</p>
        </div>
        <div className="stat-card">
            <div className="stat-icon">
                <MdOutlineShoppingCart size={22}/>
            </div>
            <h3>{cart.length}</h3>
            <p>Add to cart</p>
        </div>
        <div className="stat-card">
            <div className="stat-icon">
                <CiHeart size={22}/>
            </div>
            <h3>{wishlist.length}</h3>
            <p>Wishlist</p>
        </div>
    </div>

    );
}

export default Stats;