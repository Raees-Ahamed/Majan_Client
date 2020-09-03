import React from 'react';
import { useCookies } from 'react-cookie';

const Cookie = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['cartItems']);

     const setFirstCookie = () => {
        setCookie('cartItems', '[]');
    }

    let items = [
            {name:'Item1',qty:'1',price:'100'},
            {name:'Item2',qty:'1',price:'100'},
            {name:'Item3',qty:'1',price:'100'},
    ]

    const setItems = () => {
         let jsonData = JSON.stringify(items);
        setCookie('cartItems', jsonData);
    }

    const deleteCookie = () => {
        removeCookie('cartItems')
    }

    const getCookieData = () => {
        let storedData = cookies.cartItems;
        storedData.map( items => {
            console.log(items.name);
        });
    }

    return(
        <React.Fragment>
            <h1>Hello this is cookie page</h1>
            <button onClick={setFirstCookie}>Set first cookie</button>
            <button onClick={setItems}>Set Items</button>
            <button onClick={getCookieData}>Get Cookie Data</button>
            <button onClick={deleteCookie}>Remove Cookie</button>
        </React.Fragment>
    )
}

export default Cookie;