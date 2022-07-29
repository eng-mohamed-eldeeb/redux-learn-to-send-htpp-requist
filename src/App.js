import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import {sendCartData, fetchCartData} from './store/cart-action'
import Layout from "./components/Layout/Layout";
import NotFunction from "./components/UI/Notification";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
let isInitioal = true
function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notificationStatuse = useSelector((state) => state.ui.notification);
    useEffect(() => {
      dispatch(fetchCartData())
    },[dispatch])


    useEffect(() => {
    if(isInitioal) {
      isInitioal = false
      return
    }
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch]);
  return (
    <>
      {notificationStatuse && (
        <NotFunction
          status={notificationStatuse.status}
          title={notificationStatuse.title}
          message={notificationStatuse.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
