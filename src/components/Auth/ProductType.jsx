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
import { DIMENS, APP_PARAMS } from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn'
import CouponRow from './hoocks/CouponRow'
import ProductRow from './hoocks/ProductRow'
import ProductTypeRow from './hoocks/ProductTypeRow'
import CommonFloatingButton from '../../common/CommonFloatingButton'


export default class ProductType extends React.Component {

    constructor(props) {
        super(props)
        this.getProoductTypeList();
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            console.log("Keshav Product Type Update");
            this.getProoductTypeList();
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

    // getRestroRecentData() {
    //     var dataReq = {
    //         [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS._ID]
    //     }
    // }

    getProoductTypeList = () => {
        const { listProductTypeApi } = this.props;
        var dataReq = {
            [APP_PARAMS.USER_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID],
        }
        listProductTypeApi(dataReq)
    }

    render() {
        const { invalid, pristine } = this.props
        const { loading, listProductType } = this.props
        console.log("Keshav JAngir List Product type", listProductType);
        return (
            <View
                style={[styles.topView, { maginVertical: 0, flex: 1 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Product Type List'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'center' }}
                    style={[styles.scrollView, { marginVertical: 0, flexGrow: 1 }]}
                >
                    <View style={{ paddingHorizontal: 10, paddingBottom: 80 }}>
                        <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 10, flexDirection: 'column' }}>
                            <ProductTypeRow
                                key={-1}
                                name={translate('NAME')}
                                discription={translate("DISCRIPTION")}
                                status={translate("STATUS")}
                                created={translate("CREATED")}
                                action={translate("ACTION")}
                                isTitle={true}
                                bgColor={colors.transparent}
                            ></ProductTypeRow>

                            {
                                listProductType != undefined && listProductType.data != undefined && listProductType.data.map((item, index) => {

                                    return (
                                        <ProductTypeRow
                                            key={index}
                                            name={item.label}
                                            discription={item.description}
                                            status={item.status ?
                                                <Image
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                                                    source={require('../../assets/images/active.png')}
                                                /> :
                                                <Image
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                                                    source={require('../../assets/images/diactivate.png')}
                                                />

                                            }
                                            created={item.createdAt}
                                            action={
                                                <Image
                                                    style={{ justifyContent: 'center', alignItems: 'center' }}
                                                    source={require('../../assets/images/eye.png')}
                                                />
                                            }
                                            isTitle={false}
                                            bgColor={colors.transparent}
                                            navigator={this.props.navigation}
                                            item={item}
                                        ></ProductTypeRow>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>

                <CommonFloatingButton
                    onPress={() => {
                        this.props.navigation.navigate('AddProductType', {})
                    }}
                />
            </View>
        )
    }
}