import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Image
} from 'react-native'
import { Form, Field } from 'react-final-form'
import FormTextInput from '../FormTextInput'
import HeaderButton from '../HeaderButton'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import {
    DIMENS, APP_PARAMS
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import DashboardTodayEarning from './hoocks/DashboardTodayEarning';
import RecentOrderRow from './hoocks/RecentOrderRow';
import CommonSubmitBtn from '../../common/CommonSubmitBtn'
import CouponRow from './hoocks/CouponRow'
import { listCouponCodeApi } from '../../thunks'
import CommonFloatingButton from '../../common/CommonFloatingButton'

export default class CouponManagement extends React.Component {

    constructor(props) {
        super(props)
        this.couponCode()
    }


    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.couponCode()
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    menuHandle = () => {
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        if (isDrawerOpen) {
            this.props.navigation.closeDrawer();
        } else {
            this.props.navigation.openDrawer();
        }
    } 

    couponCode = async () => {
       // alert(1);
        const { listCouponCodeApi } = this.props
        let reqdata = {
            [APP_PARAMS.USER_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID],
            [APP_PARAMS.ROLE]: global[APP_PARAMS.USER_DATA][APP_PARAMS.ROLE]
        }
        listCouponCodeApi(reqdata)
    }

    render() {
        const { invalid, pristine } = this.props
        const { loading, listCouponCode } = this.props
        {
            //  console.warn("listlistCouponCode:::::::::::::::::::::::::::::::::::::::::::::", listCouponCode);
        }
        return (
            <View
                style={[styles.topView, { maginVertical: 0 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Coupon Management'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'center' }}
                    style={[styles.scrollView, { marginVertical: 0, flexGrow: 1 }]}
                >
                    <View style={{ paddingHorizontal: 10, paddingBottom: 80 }}>
                        <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 10, flexDirection: 'column' }}>
                            <CouponRow
                                key={-1}
                                couponCode={translate('COUPON_CODE')}
                                discountInPercentage={translate("DISCOUNT_IN_PERCENTAGE")}
                                validFrom={translate("VALID_FROM")}
                                validTo={translate("VALID_TO")}
                                status={translate("STATUS")}
                                action={translate("ACTION")}
                                isTitle={true}
                                bgColor={colors.transparent}
                            ></CouponRow>
                            {
                                listCouponCode != undefined && listCouponCode.data != undefined && listCouponCode.data.map((item, index) => {

                                    return (<CouponRow
                                        key={index}
                                        couponCode={item.coupon_code}
                                        discountInPercentage={item.coupon_discount_in_percentage+"%"}
                                        validFrom={item.valid_from}
                                        validTo={item.valid_to}
                                        status={item.is_active ?
                                            <Image
                                                style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                                                source={require('../../assets/images/active.png')}
                                            /> :
                                            <Image
                                                style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                                                source={require('../../assets/images/diactivate.png')}
                                            />

                                        }
                                        action={

                                            <Image
                                                style={{ flex: 1, justifyContent: "center", }}
                                                source={require('../../assets/images/eye.png')}
                                            />
                                        }
                                        isTitle={false}
                                        bgColor={colors.transparent}
                                        item={item}
                                        navigator={this.props.navigation}
                                    ></CouponRow>)
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <CommonFloatingButton
                    onPress={() =>
                        this.props.navigation.navigate('AddCoupon', {})
                    }
                />
            </View>

        )
    }

}