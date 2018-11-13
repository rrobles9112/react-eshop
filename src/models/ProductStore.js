import React from 'react'
import {Container} from "constate";
import { fetchProducts } from './../helpers/API';
import {navigate} from "@reach/router";
import produce from 'immer'
    
const ProductContainer = props => (
    <Container
        initialState={{ products: [],count:0, cart:[] }}
        actions={{
            loginAction: amount => state => ({ isState: state.count + amount }),
            deleteCart:(payload)=>state=>{
                const newCart = [...state.cart];
                let a = newCart.filter(el=> el.id !== payload.id)
                console.log('A=',a);
                return {cart:a}
            },
            buy: (payload) => state => {
                const newCart = [...state.cart];
                if (state.cart.find(el => el.id === payload.item)) {
                    console.log('state cart')

                    console.log('state=',newCart)
                    const b = newCart.map(el=>{
                        if(payload.item === el.id){
                            el.product.cuantity = el.product.cuantity + payload.cant;
                            return el
                        }
                    })
                    console.log('b=',newCart);
                    return {cart: newCart }

                } else {
                    const p = state.products.find(el => el.id === payload.item);
                    const newItem={...p,
                        product:{...p.product,cuantity:payload.cant}
                    };


                    return {...state.cart, cart: [...state.cart, newItem] }

                }


            }
        }}
        selectors={{
            getQuantity: (id) => state => {
                if(state.cart.find(el => el.id === id)){
                    let a = state.cart.find(el => el.id === id)
                    return state.products.find(el => el.id === id).product.cuantity - state.cart.find(el => el.id === id).product.cuantity
                }else{
                    return state.products.find(el => el.id === id).product.cuantity
                }
            },
            getBadgeTotalBroughtProduct: () => state =>{
                let count=Number(0);
                console.log('asdasdasdasda')
                if(state.cart.length > 0){
                    console.log('count',count);
                    state.cart.forEach(el=>{
                        count = count + Number(el.product.price) * Number(el.product.cuantity)
                    })
                    return count;
                }else{
                    return count;
                }
            },
            getBadgeCuantityTotalProduct: () => state =>{
                let count=Number(0);
                console.log('asdasdasdasda')
                if(state.cart.length > 0){
                    console.log('count',count);
                    state.cart.forEach(el=>{
                        count = count + Number(el.product.cuantity)
                    })
                    return count;
                }else{
                    return count;
                }
            }
            

        }}
        effects={{
            fetchEffect:  (params) => ({ setState }) => {
            
                (async () => {
                    try {
                        const res = await fetchProducts().then(res=> res.data);
                        console.log()
                        setState({
                            products:res.data
                        })
                    }catch (e) {

                        if(e.toString().includes('403')){
                            localStorage.clear();
                            setState({
                                isAuth:false,
                                userToken:null
                            });

                        }
                    }

                    
                })();
                    
                    
            },
        }}
        {...props}
    />
);

export default ProductContainer;