import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Dashboard from "../containers/Auth/Dashboard"
import { navigationHeader } from '../theme'
import CustomDrawer from '../common/CustomDrawer';
import DiscountManagement from '../containers/Auth/DiscountManagement';
import CouponManagement from '../containers/Auth/CouponManagement'
import AddCoupon from '../containers/Auth/AddCoupon'
import { createStackNavigator } from 'react-navigation-stack'
import ProductManagement from '../containers/Auth/ProductManagement'
import AddProduct from '../containers/Auth/AddProduct'
import ProductType from '../containers/Auth/ProductType'
import AddProductType from '../containers/Auth/AddProductType'
import Orders from '../containers/Auth/Order/Order'
import MyEarning from '../containers/Auth/MyEarning'
import MyProfile from '../containers/Auth/MyProfile'
import PerWeekEarning from '../containers/Auth/PerWeekEarning'
import Setting from '../components/Auth/Setting'
import Detailed from '../components/Auth/hoocks/Detailed'

const couponNavigator = createStackNavigator({
    CouponManagement,
    AddCoupon,
},
    {
        initialRouteName: 'CouponManagement',
        defaultNavigationOptions: navigationHeader,
        navigationOptions: null
    }
);
const productNavigator = createStackNavigator({
    ProductManagement,
    AddProduct
},
    {
        initialRouteName: 'ProductManagement',
        defaultNavigationOptions: navigationHeader,
        navigationOptions: null
    }

)
const productTypeNavigator = createStackNavigator({
    ProductType,
    AddProductType
},
    {
        initialRouteName: 'ProductType',
        defaultNavigationOptions: navigationHeader,
        navigationOptions: null
    }
)
const MyDrawerNavigator = createDrawerNavigator({
    Dashboard,
    DiscountManagement,
    couponNavigator,
    productNavigator,
    productTypeNavigator,
    Orders,
    MyEarning,
    MyProfile,
    PerWeekEarning,
      Setting,
    
    // AddProduct
},
    {
        initialRouteName: 'Dashboard',
        contentComponent: CustomDrawer,
        
    }
)
const OrdersNavigator = createStackNavigator({
        Detailed,
        Orders
    },
    {
        initialRouteName: 'Orders',
        defaultNavigationOptions: navigationHeader,
        navigationOptions: null
    }
);

export default AppDrawer = createAppContainer(MyDrawerNavigator);
