import React from 'react'
import styles from '../styles'
// import images from '../../../images'
import { DIMENS, APP_PARAMS } from '../../../constants'
import { Image, StyleSheet, View, Text, Button, FlatList } from 'react-native'
// import { FONT_FAMILIY, DIMENS, CURRENCY } from '../../../../constants/index'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n'
import CommonOrder from '../hoocks/CommonOrder'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default class PreParing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customMenuItems: [
                {
                    type: translate('ORDER_STATUS_TYPE_PREPARING'),
                    status: translate('ORDER_STATUS_PREPARED')
                },
                {
                    type: translate('ORDER_STATUS_TYPE_PREPARING'),
                    status: translate('ORDER_STATUS_VIEW')
                }
            ],
            // refereshLoading: false,
        }
        this.orderList()
    }

    orderList = async () => {
        const { listOrderApi } = this.props
        let reqdata = {
            [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
            [APP_PARAMS.STATUS]: APP_PARAMS.STATUS_PREPARIN_ORDER
        }
        listOrderApi(reqdata)
    }

    onMenuItemClick = (item, rowItem) => {
        const { changeOrderStatusApi } = this.props

        if (item.status == translate('ORDER_STATUS_PREPARED')) {
            let reqdata = {
                [APP_PARAMS._ID]: rowItem._id,
                [APP_PARAMS.STATUS]: APP_PARAMS.STATUS_READY_ORDER
            }
            changeOrderStatusApi(reqdata)
            this.orderList()
        }
        else if (item.status == APP_PARAMS.VIEW_ORDER) {
            this.props.navigation.navigate('Detailed')
            //alert('View')
        }
    }

    emptyList = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <Text style={{ textAlign: 'center' }}>{'No Orders Found'}</Text>
            </View>
        );
    };

    render() {
        const { invalid, pristine } = this.props
        const { loading, preparingListOrder, preparingLoading } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderRadius: 5, backgroundColor: colors.white, flexDirection: 'column', flex: 1 }}>
                    <CommonOrder
                        key={-1}
                        phone={translate('PHONE')}
                        price={translate("PRICE")}
                        orderId={translate("ORDER_ID")}
                        orderNo={translate("Order")}
                        create={translate("CREATED")}
                        status={translate("STATUS")}
                        action={translate("ACTION")}
                        isTitle={true}
                        bgColor={colors.transparent}
                    >
                    </CommonOrder>
                    {preparingListOrder != undefined && preparingListOrder.data != undefined &&
                        <FlatList
                            data={preparingListOrder.data.order_list}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={preparingListOrder}
                            refreshing={preparingLoading}
                            onRefresh={() => this.orderList()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={this.emptyList}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                            renderItem={({ item, index }) =>
                                <CommonOrder
                                    key={index}
                                    phone={item.user_detail.phone}
                                    price={item.total_price}
                                    orderNo={item.order_number}
                                    create={item.createdAt}
                                    status={item.status}
                                    action={<Image
                                        style={{ tintColor: colors.primary, resizeMode: 'contain' }}
                                        source={require('../../../assets/images/more.png')}
                                    />}
                                    isTitle={false}
                                    bgColor={colors.transparent}
                                    customMenuItems={this.state.customMenuItems}
                                    onMenuItemClick={this.onMenuItemClick}
                                    rowItem={item}
                                    navigator={this.props.navigation}
                                ></CommonOrder>
                            } />
                    }
                </View>
            </View>
        )
    }
}