import { AllOrders, Cart, FilterCategory, ForgetPass, HomeScreen, loder, OtpVerify, ResetPassword, SignIn, Template, wishlist } from "../Screen";
import AuthGate from "../Screen/Auth/AuthGate";
import DeliveryAddress from "../Screen/DeliveryAddress/DeliveryAddress";
import SeeOrder from "../Screen/GetOrders/SeeOrder";
import { Signup } from "../Screen/Login/Signup";
import Checkout from "../Screen/PlaseOrder/Checkout";
import ProductList from "../Screen/Product/ProductList";

export default {
      Signup:"signup",
      SignIn:"SignIn",
      ForgetPass:"ForgetPass",
      OtpVerify:"OtpVerify",
      loder:"loder",
      ResetPassword:"ResetPassword",
      HomeScreen:"HomeScreen",
     AuthGate: "AuthGate",
     Cart:"Cart",
     ProductList:"ProductList",
     FilterCategory:"FilterCategory",
     wishlist:"wishlist",
     DeliveryAddress:"DeliveryAddress",
     Checkout:"Checkout",
     SeeOrder:"SeeOrder",
     AllOrders:"AllOrders",
     Template:"Template"
}