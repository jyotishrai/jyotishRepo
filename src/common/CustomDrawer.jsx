import React from 'react'
import { Image, TouchableOpacity, View, Text, Switch } from 'react-native'
import {
    WALLET, PROFILE_IMG, NEXT_GRAY, HOME_ICON_2, HOME_ICON, MENU_ICON_2, IMAGE,
    MENU_ICON_3, MENU_ICON_4, MENU_ICON_5, MENU_ICON_6, MENU_ICON_7, MENU_ICON_8, MENU_ICON_9, SETTING,USER
} from '../images'
import { FONT_FAMILIY, SCREEN, API, BASE_URL_RESTRO, BASE_URL } from '../constants/index'
import { colors } from '../theme'
import { DIMENS, APP_PARAMS, USER_DATA } from '../constants'
import translate from '../i18n/i18n'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import CommonMsgDialog from '../components/Dialogs/CommonMsgDialog';
import { clearData } from "../utility/Utils"
import ProductType from '../components/Auth/ProductType'
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import { changeRestroOnlineStatusApi, myProfileApi } from '../thunks'
import Setting from '../components/Auth/Setting'

import ImagePicker from 'react-native-image-picker';




const drawerListArr = [
    { uri: HOME_ICON_2, title: translate('DASHBOARD'), subTitle: translate('MY_ACCOUNT_SUB_TITLE') },
    { uri: MENU_ICON_2, title: translate('ORDERS'), subTitle: translate('NOTIFICATION_SUB_TITLE') },
    { uri: MENU_ICON_3, title: translate('MY_PROFILE'), subTitle: translate('WISHLIST_SUB_TITLE') },
    { uri: MENU_ICON_4, title: translate('MY_EARNING'), subTitle: translate('MY_CART_SUB_TITLE') },
    { uri: MENU_ICON_5, title: translate('PRODUCT_TYPES'), subTitle: translate('MY_ORDER_SUB_TITLE') },
    { uri: MENU_ICON_6, title: translate('PRODUCT_MANAGEMENT'), subTitle: translate('OFF_ZONE_SUB_TITLE') },
    { uri: MENU_ICON_7, title: translate('COUPON_MANAGEMENT'), subTitle: translate('FAQ_SUB_TITLE') },
    { uri: MENU_ICON_8, title: translate('DISCOUNT_MANAGEMENT'), subTitle: translate('LEGAL_SUB_TITLE') },
    { uri: SETTING, title: translate('SETTING'), subTitle: translate('SETTING') },
    { uri: MENU_ICON_9, title: translate('LOGOUT'), subTitle: translate('LEGAL_SUB_TITLE') }
]

class CustomDrawer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            restroStatus: false,
            filePath: {},
        }
        this.focusListener = null;
        this.initialOnlineStatus()
    }

    initialOnlineStatus = async () => {
        const { myProfileApi } = this.props
        let reqdata = {
            [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
        }
        myProfileApi(reqdata)
            .then((res) => {
                this.setState({
                    restroStatus: res != undefined && res.data.restro_detail.is_online
                })
            })
            console.log("this.props............................",this.props);
    }

    changeRestroOnlineStatus = async () => {
        this.setState({
            restroStatus: !this.state.restroStatus
        }, () => {
            this.updateRestroOnlineStatus()
        })
    }

    updateRestroOnlineStatus = async () => {
        requestData =
        {
            [APP_PARAMS.IS_ONLINE]: this.state.restroStatus,
            [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
        }
        this.props.changeRestroOnlineStatusApi(requestData)
    }

    componentDidMount() {
        console.log("hiii componentDidMount.....................");
        this.focusListener = this.props.navigation.addListener('didFocus', async e => {
            await this.initialOnlineStatus();
          });
        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener('didFocus', () => {
        //     console.log("hiiiiii Gargi.....................");
        //     this.initialOnlineStatus()
        // });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    drawerPress = (item, index) => {
        this.props.navigation.closeDrawer()

        switch (index) {
            case 0:
                this.props.navigation.navigate('Dashboard')
                break;

            case 1: this.props.navigation.navigate('Orders')
                break;

            case 2: this.props.navigation.navigate('MyProfile')
                break;

            case 3: this.props.navigation.navigate('MyEarning')
                break;

            case 4: this.props.navigation.navigate('productTypeNavigator')
                break;

            case 5: this.props.navigation.navigate('productNavigator')
                break;

            case 6:
                this.props.navigation.navigate('couponNavigator')
                break;

            case 7:
                this.props.navigation.navigate('DiscountManagement')
                break;

            case 8: this.props.navigation.navigate('Setting')
                break;

            case 9:
                this.setState({ isVisible: true })
                break;

            default:
                break;
        }
    }
    renderDrawerList = (item, index) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: DIMENS.px_10, justifyContent: 'space-between', alignItems: 'center' }}
                onPress={() => this.drawerPress(item, index)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: .2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={item.uri}
                            style={{
                                width: DIMENS.px_30,
                                height: DIMENS.px_30,
                            }}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        flex: .8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: DIMENS.px_05,
                        borderBottomColor: colors.lightGray,
                        paddingVertical: 15
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', }}>
                            <View style={{ marginLeft: DIMENS.px_5, marginRight: DIMENS.px_5 }}>
                                <Text style={{
                                    color: colors.primary,
                                    fontFamily: FONT_FAMILIY.Roboto_Medium,
                                    fontSize: DIMENS.txt_size_medium_1
                                }}>
                                    {
                                        item.title
                                    }
                                </Text>
                            </View>
                            <Image style={{
                                width: 16,
                                height: 29,
                                right: DIMENS.px_5,
                                position: 'absolute'
                            }}
                                resizeMode={'center'}
                                source={NEXT_GRAY}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    selectFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { 
              name: 'customOptionKey', 
              title: 'Choose file from Custom Option' 
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, res => {
          console.log('Response = ', res);
          if (res.didCancel) {
           console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            this.setState({
              filePath: source,
            });
          } 
        });  
      };

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                bounces={false}
            >
                <View style={{
                    backgroundColor: colors.primary,
                    flexDirection: 'column',
                    paddingHorizontal: DIMENS.px_20,
                    paddingTop: DIMENS.px_30,
                    paddingBottom: DIMENS.px_20,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.selectFile()} 
                    style={{
                        marginBottom: DIMENS.px_10,

                    }}>
                        <Image source={{
                            // uri: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS.IMAGE]
                            uri : this.state.filePath != undefined || this.state.filePath != null ? this.state.filePath.uri : USER
                         } }
                            style={{
                                width: DIMENS.px_70,
                                height: DIMENS.px_70,
                                borderRadius: DIMENS.px_70 / 2,
                                backgroundColor: colors.white
                            }} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: colors.white, fontFamily: FONT_FAMILIY.Roboto_Bold, fontSize: DIMENS.txt_size_large_extra, textAlign: 'left' }}>
                            {
                                global[APP_PARAMS.USER_DATA][APP_PARAMS.NAME]
                            }
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: FONT_FAMILIY.Roboto_Bold,
                            fontSize: DIMENS.txt_size_medium_14,
                            textAlign: 'left',
                            marginHorizontal: 10
                        }}>
                            {
                                this.state.restroStatus ?
                                    translate('RESTRO_ONLINE_STATUS_ONLINE') :
                                    translate('RESTRO_ONLINE_STATUS_OFFLINE')
                            }
                        </Text>
                        <Switch
                            onValueChange={() => this.changeRestroOnlineStatus()}
                            value={this.state.restroStatus}
                            trackColor={{ true: "#556B2F", false: null }}
                            thumbColor={this.state.restroStatus ? '#32CD32' : 'white'}
                        >

                        </Switch>
                    </View>
                </View>
                {/* List */}
                <FlatList
                    data={drawerListArr}
                    renderItem={({ item, index }) => this.renderDrawerList(item, index)}
                    extraData={this.state}
                    keyExtractor={(index) => index.toString()} />
                {
                    <CommonMsgDialog
                        title={translate("App_TITLE")}
                        mzg={translate("LOGOUT_TXT")}
                        yesTxt={translate("YES")}
                        noTxts={translate("NO")}
                        onClosePopover={this.onClosePopover}
                        yesPopverPress={this.yesPopverPress}
                        isVisible={this.state.isVisible}
                    />
                }
            </ScrollView>)
    }
    onClosePopover = () => {
        this.setState({ isVisible: false })
    }
    yesPopverPress = () => {
        this.setState({ isVisible: false })
        clearData(APP_PARAMS.USER_DATA)
        this.props.navigation.navigate(SCREEN.LOGIN)

    }
}

const mapStateToProps = ({ ChangeRestroOnlineStatus, LocationList }) => ({
    loading: ChangeRestroOnlineStatus.loading,
    restoOnlineStatus: ChangeRestroOnlineStatus.restoOnlineStatus,
    myProfile: LocationList.myProfile
})

const mapDispatchToProps = {
    changeRestroOnlineStatusApi: changeRestroOnlineStatusApi,
    myProfileApi: myProfileApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);