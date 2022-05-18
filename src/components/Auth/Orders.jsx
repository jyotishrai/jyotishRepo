import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import styles from './styles'
import CommonHeader from '../../common/CommonHeader';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import translate from '../../i18n/i18n'

import { FONT_FAMILIY, DIMENS, CURRENCY, APP_PARAMS } from '../../constants/index'
import { colors } from '../../theme'

import New from '../../containers/Auth/Order/New'
import PreParing from '../../containers/Auth/Order/PreParing';
import Ready from '../../containers/Auth/Order/Ready';
import Past from '../../containers/Auth/Order/Past';
import Canceled from '../../containers/Auth/Order/Canceled';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RouteConfigs = {
    New: New,
    PreParing: PreParing,
    Ready: Ready,
    Past: Past,
    Canceled: Canceled
}

const TabNavigatorConfig = {

    initialRouteNmae: 'New',

    tabBarOptions: {
        labelStyle: {
            fontSize: 11,
        },
        tabStyle: {
            flex: 1
        },
        style: {
            backgroundColor: colors.primary,
        },
    }
}

const tabNavigation = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TopTabContainer = createAppContainer(tabNavigation);

export default class Orders extends React.Component {

    constructor(props) {
        super(props);
        //this.orderList();
    }

    orderList = async () => {
        const { listOrderApi } = this.props
        let reqdata = {
            [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
            [APP_PARAMS.STATUS]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS.STATUS]
        }
        listOrderApi(reqdata)
    }

    static navigationHeader = ({ navigation }) => ({
        header: (
            null
        )
    });

    menuHandle = () => {
        const isDrawOpen = this.props.navigation.state.isDrawOpen;
        if (isDrawOpen) {
            this.props.navigation.closeDrawer();
        }
        else {
            this.props.navigation.openDrawer();
        }
    }



    render() {
        //alert(JSON.stringify(this.props.listOrder))
        return (
            <View
                style={[styles.topView, { maginVertical: 0 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Manage Orders'} />

                <TopTabContainer

                //ref={(props) => { alert(JSON.stringify(props)) }}
                //{...this.props} 
                >

                </TopTabContainer>

            </View>
        )
    }
}