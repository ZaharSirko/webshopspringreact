import React, {createContext, useContext, useEffect, useState} from 'react';
import { request } from '../../helpers/axios_helper';


const GoodsContext = createContext();

export const useGoods = () => {
    return useContext(GoodsContext);
};

export const GoodsProvider = ({ children }) => {
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const response = await request('GET', '/');
                setGoods(response.data);
            } catch (error) {
                console.error('Error fetching goods:', error);
            }
        };
        fetchGoods();
    }, []);

    return (
        <GoodsContext.Provider value={{goods,setGoods}}>
            {children}
        </GoodsContext.Provider>
    );
};

