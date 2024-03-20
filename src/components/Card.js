import React, { useState, useRef, useEffect} from 'react'
import { useDispatchCart,useCart } from './ContextProducer';

function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");
let options = props.options;
let priceOptions = Object.keys(options);

const handleAddtoCart = async()=>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
        return;
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return;
      }
      return;
    }
  await dispatch({type:"ADD",id:props.foodItems._id,name:props.foodItems.name,price:finalPrice,qty:qty,size:size,image:props.foodItems.img})
  console.log(data)
}

let finalPrice = qty*parseInt(options[size])
useEffect(()=>{
  setSize(priceRef.current.value)
})

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItems.img} className="card-img-top" alt="..." style={{height:"150px", objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            {/* <p className="card-text">This is some imp. text.</p> */}
            <div className="container w- 100 d-flex align-items-center">
              <select className="m-2 w-30 h-100 bg-success" onChange={(e)=>{setQty(e.target.value)}}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 w-30 h-100 bg-success" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>

              <div className="">${finalPrice}/-</div>
            </div>
              <hr>
              </hr>
              <button className={`btn btn-success justify-center ms-3`} onClick={handleAddtoCart}>Add to  Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

