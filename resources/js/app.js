import axios  from "axios";
import Noty from 'noty';
import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty;

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        // console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza);
        // console.log(pizza);
    })
});


//Remove the alert message
const alertMsg = document.querySelector('#success-alert');
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000)
}

initAdmin();


//Deleting the cart
// let deleteCart = document.querySelector('#deleteCart');
// $(deleteCart).click(function(){
//     alert("Hello")

    // var id = $(this).attr("data-id");
    // $.ajax({
    //     "url" : `http://localhost:3000/delete-cart/${id}`,
    //     "method" : "DELETE"
    // })
// })