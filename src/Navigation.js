import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CheckAuth from './containers/CheckAuth'
import Login from './containers/Auth/Login'
import AppDrawer from './navigation/DrawerLayout'
import SignUp from './containers/Auth/SignUp'
import Dashboard from './containers/Auth/Dashboard'
import AddProduct from './containers/Auth/AddProduct'
import MyEarning from './containers/Auth/MyEarning'
import Info from './containers/Info'
import { navigationHeader } from './theme'
import { SCREEN } from './constants';
import AddCoupon from '../src/components/Auth/AddCoupon'

const AppNavigator = createSwitchNavigator({
  // CheckAuth,
  Auth: createStackNavigator({
    Login,
    AppDrawer: {
      screen: AppDrawer,
      navigationOptions: { header: null }
    },
    SignUp,
    // Dashboard,
  },
    {
      initialRouteName: 'Login',
      defaultNavigationOptions: navigationHeader,
      navigationOptions: null
    }
  ),
}, {
  initialRouteName: 'Auth',
})

export default createAppContainer(AppNavigator)
