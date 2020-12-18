export const addItems = (cartItems, newItem) => {
console.log("carts", cartItems)
console.log("newItem", newItem)
  const i = cartItems.findIndex(item => item.product.combo_id ? item.product.combo_id === newItem.combo_id : item.product.product_id === newItem.product_id);

  if (i >= 0) cartItems[i].quantity += 1;
  else {
    cartItems.push({product: newItem, quantity: 1});
  }

  return cartItems;
};
