import { uiActions } from "./UI-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.ShowNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-ccdf4-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending vart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.ShowNotification({
          status: "success",
          title: "success...",
          message: "send cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.ShowNotification({
          status: "error",
          title: "error...",
          message: "send cart data fail!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return  async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-ccdf4-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error('could not fetch cart data!')
      }
      const data = await response.json();
      return data
    };
    try {
        const cartData = await fetchData();
        dispatch(cartActions.replace({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
        }))
    } catch (error) {
        dispatch(
          uiActions.ShowNotification({
            status: "error",
            title: "error...",
            message: "fetching cart data fail!",
          })
        );
      }
  };
};
