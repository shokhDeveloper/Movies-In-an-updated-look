import { useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import LikeImage from "../Settings/assets/images/Like.png"
import NotLike from "../Settings/assets/images/Not_Like.png"
export const Like = ({ like, setlike, item }) => {
  const {items, addItem, removeItem} = useCart();
  let inputRef = useRef()
  useEffect(() => {
    for(let i = 0; i<items.length; i++){
        if(items[i].title === item.title){
            setlike(true)
            inputRef.current.checked = true
        }
    }
  },[like])
  return (
    <input ref={inputRef}
      type="checkbox"
      className="like_btn"
      defaultChecked={like}
      style={{backgroundImage: like === true ? LikeImage: NotLike}}
      onChange={(event) => {
        if(event.target.checked === true){
            addItem({...item, price: 1000})
        }else{
            setlike(true)
            removeItem(item.id)
        }
    }}
    ></input>
  );
};