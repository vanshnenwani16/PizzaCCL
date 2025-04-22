import React, { useEffect } from "react";
import {post } from 'axios';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addUserOrder } from "../redux/actions/order.actions";
import { setSnackbar } from "../redux/actions/snackbar.actions";
import { OrderActionTypes } from "../redux/types/order.types";
import { CartActionTypes } from "../redux/types/cart.types";
// Components
import { Loader, Message } from "../containers";
import {
  ShippingAdress1FormControl,
  ShippingAdress2FormControl,
  CountryCityFormControls,
  PhoneFormControl,
} from "../core/form-controls";
// Formik
import { useFormik } from "formik";
import { initialAdressValues, adressSchema } from "../core/formik-validations";
// Material Mui Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ShippinAdress({
  open,
  handleClose,
  subtotalPrice,
  cartItems,
  history,
}) {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.orders.add);
  const { user_login } = useSelector((state) => state.users.login);

  useEffect(() => {
    if (success) {
      const message = "Order placed successfully";
      dispatch(setSnackbar(true, "success", message));
      dispatch({ type: OrderActionTypes.ADD_ORDER.RESET });
      history.push("/");
      // Clear Cart Items
      dispatch({ type: CartActionTypes.CLEAR });
    }

    return () => {
      dispatch({ type: OrderActionTypes.ADD_ORDER.RESET });
    };
  }, [success, dispatch, history]);



  // razorpay
  const displayRazorPay = async (values, userId) =>{
    const res = await loadRazorPay()

    if(!res) {
      alert("Razorpay failed to load")
      return
    }

    const response = await post("http://localhost:5000/api/orders/payment", (data)=> data.json())


    console.log("Response: ",response)
    var options = {
      key_id: "rzp_test_d6nhqRe2IgqGel",
      key_secret:"bhCQB7cSnbh4GrOroRiLMjAq", // Enter the Key ID generated from the Dashboard
      amount: subtotalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      order_id: response.data.id,
      name: "Pizza Shop",
      description: "Test Transaction",
      image: "https://www.tailorbrands.com/wp-content/uploads/2020/07/twitter-logo.jpg",
      handler: function (response) {
        dispatch(
          addUserOrder({ form: values, subtotalPrice, cartItems, userId })
        );
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        //alert("Payment Success, Now you will get your pizza soon.")
      },
      prefill: {
        name: user_login.name,
        email: user_login.email
      },
      notes: {
        address: "Pizza Delivery Store",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      dispatch({
        type: OrderActionTypes.ADD_ORDER.ERROR,
        payload:"Order failed"
      });
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      
    });
    rzp1.open();

    

  }

  const loadRazorPay = () => {

    return new Promise((resolve)=> {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true)
      }
      script.onerror = ()=> {
        resolve(false)
      }
      document.body.appendChild(script);
    })
  };


  const formik = useFormik({
    initialValues: initialAdressValues,
    validationSchema: adressSchema,
    onSubmit: async (values) => {
      const userId = user_login._id;
      await displayRazorPay(values, userId)
      // if(paid){
      //   // dispatch(
      //   //   addUserOrder({ form: values, subtotalPrice, cartItems, userId })
      //   // );
      // }else{
      //   // dispatch({
      //   //   type: OrderActionTypes.ADD_ORDER.ERROR,
      //   //   payload:"Order failed"
      //   // });
      // }
      
    },
  });

  return (
    <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <div>
            Insert Shipping Adress{" "}
            <p className="float-right">Total Price: {subtotalPrice} RS</p>{" "}
          </div>
        </DialogTitle>
        <DialogContent>
          {error && <Message type="error" message={error} />}
          <ShippingAdress1FormControl formik={formik} />
          <ShippingAdress2FormControl formik={formik} />
          <CountryCityFormControls formik={formik} />
          <PhoneFormControl formik={formik} />
        </DialogContent>
        <DialogActions>
          {loading && <Loader />}
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" variant="contained">
            Finish Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ShippinAdress;
