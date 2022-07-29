import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replace(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      state.changed = true
      const newItem = action.payload;
      const exisitiongItems = state.items.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!exisitiongItems) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exisitiongItems.quantity = exisitiongItems.quantity + 1;
        exisitiongItems.totalPrice = exisitiongItems.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.changed = true
      const id = action.payload;
      const exisitiongItem = state.items.find((item) => item.id === id);
      if (state.totalQuantity > 0) {
        state.totalQuantity--;
        if (exisitiongItem === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          exisitiongItem.quantity--;
          exisitiongItem.totalPrice =
            exisitiongItem.totalPrice - exisitiongItem.price;
        }
      }
    },
  },
});



export const cartActions = cartSlice.actions;

export default cartSlice;
