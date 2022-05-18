import { combineReducers } from 'redux'


import AppUsers from './AppUsers'
import app from './app'
import Dashboard from './Dashboard'
import LocationList from './LocationList'
import DiscountManagement from './DiscountManagement'
import CouponManagement from './CouponManagement'
import AddCoupon from './AddCoupon'
import ProductManagement from './ProductManagement'
import MyEarning from './MyEarning'
import ProductType from './ProductType'
import Order from './Order/Order'
import AddProductType from './AddProductType'
import AddProduct from './AddProduct'
import SignupListCategories from './SignupListCategories'
//import MyProfile from './MyProfile'
import ChangeRestroOnlineStatus from './ChangeRestroOnlineStatus'

export default combineReducers({
  AppUsers,
  app,
  Dashboard,
  LocationList,
  DiscountManagement,
  CouponManagement,
  AddCoupon,
  ProductManagement,
  MyEarning,
  Order,
  ProductType,
  AddProductType,
  AddProduct,
  ChangeRestroOnlineStatus,
  //SignupListCategories,
  //  MyProfile
})