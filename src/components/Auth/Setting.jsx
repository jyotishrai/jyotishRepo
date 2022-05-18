// import React from 'react'
// import {
//     ActivityIndicator,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     Keyboard,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     View, Image, Modal, Button
// } from 'react-native'
// import styles from './styles'
// import { colors } from '../../theme'
// import { TOGGLE_GREEN, TOGGLE_GRAY } from '../../images'
// import translate from '../../i18n/i18n';
// import { DIMENS, APP_PARAMS, FONT_FAMILIY, USER_DATA } from '../../constants'
// import CommonHeader from '../../common/CommonHeader'
// import CommonSubmitBtn from '../../common/CommonSubmitBtn'
// import CouponRow from './hoocks/CouponRow'
// import ProductRow from './hoocks/ProductRow'
// import CommonFloatingButton from '../../common/CommonFloatingButton'
// import { FlatList, TextInput } from 'react-native-gesture-handler'
// import DropDown from '../DropDown';
// import { changeRestroOnlineStatusApi, myProfileApi } from '../../thunks';
// import { connect } from 'react-redux';

// const design = StyleSheet.create({
//     bg_round: {
//         borderColor: colors.transparent,
//         paddingHorizontal: DIMENS.px_15,
//         paddingVertical: 10,
//         backgroundColor: colors.lightGray,
//         minHeight: 50,
//         // borderWidth: 0,
//         // borderColor: 'red',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },

// })

// class Setting extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isVisibleRestaurant: true,
//             isVisibleDelivery: true,
//             isVisiblePickUp: true,
//             search: undefined,
//             text: '',
//             restroStatus: false,
//         }
//         this.initialOnlineStatus()

//     }

//     initialOnlineStatus = async () => {
//         const { myProfileApi } = this.props
//         let reqdata = {
//             [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
//         }
//         myProfileApi(reqdata)
//             .then((res) => {
//                 this.setState({
//                     restroStatus: res != undefined && res.data.restro_detail.is_online
//                 })
//             })
//             console.log("restroStatus1.................",this.state.restroStatus);
//     }

//     changeRestroOnlineStatus = async () => {
//         this.setState({
//             restroStatus: !this.state.restroStatus
//         }, () => {
//             this.updateRestroOnlineStatus()
//         })
//         console.log("restroStatus2.................",this.state.restroStatus);
//     }

//     updateRestroOnlineStatus = async () => {
//         requestData =
//         {
//             [APP_PARAMS.IS_ONLINE]: this.state.restroStatus,
//             [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
//         }
//         this.props.changeRestroOnlineStatusApi(requestData)
//     }

//     static navigationOptions = ({ navigation }) => ({
//         header: (
//             null
//         ),
//     })

//     // componentDidMount = () => {
//     //     //this.getProductList()
//     //     this.getProoductTypeList()
//     // }

//     menuHandle = () => {
//         console.warn('dsxjhfbjsd')
//         Keyboard.dismiss()
//         const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
//         if (isDrawerOpen) {
//             this.props.navigation.closeDrawer();
//         } else {
//             this.props.navigation.openDrawer();
//         }
//     }

//     // getProductList3 = async () => {
//     //     if (this.state.search != undefined && this.state.search != null && this.state.search != "") {
//     //         const { listProductApi } = this.props
//     //         let requestData = {
//     //             [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
//     //             [APP_PARAMS.SEARCH]: this.state.search,
//     //         }
//     //         listProductApi(requestData)
//     //     } else {
//     //         this.getProductList()
//     //     }


//     onTrue = () => {
//         this.setState({
//             isVisibleRestaurant: !this.state.isVisibleRestaurant
//         })
//     }

//     render() {
//         return (
//             <View style={[styles.topView, { maginVertical: 0 }]} >
//                 <CommonHeader menuClick={this.menuHandle} title={'Setting'} />
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={{ justifyContent: 'center' }}
//                     style={[styles.scrollView, { marginVertical: 0, flexGrow: 1, marginTop: 10 }]}
//                 >
//                     <View style={{ paddingHorizontal: 15, paddingBottom: 80, }}>
//                         <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 10, }}>
//                             <View style={design.bg_round}>
//                                 <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>{
//                                 this.state.restroStatus ?
//                                     translate('RESTRO_ONLINE_STATUS_ONLINE') :
//                                     translate('RESTRO_ONLINE_STATUS_OFFLINE')
//                             }</Text>
//                                 <TouchableOpacity onPress={() => this.changeRestroOnlineStatus()}>
//                                     {
//                                         !this.state.restroStatus ? <Image source={TOGGLE_GRAY} /> : <Image source={TOGGLE_GREEN} />
//                                     }
//                                 </TouchableOpacity>
//                             </View>                          
//                             {/* <FlatList
//                                 data={DATA}
//                                 renderItem={renderItem}
//                                 keyExtractor={item => item.id}
//                             />  */}
//                         </View>

//                         <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 20, flexDirection: 'column' }}>
//                             <View style={design.bg_round}>
//                                 <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>Delivery Open</Text>
//                                 <TouchableOpacity onPress={() => { this.setState({ isVisibleDelivery: !this.state.isVisibleDelivery }) }}>
//                                     {
//                                         !this.state.isVisibleDelivery ? <Image source={TOGGLE_GRAY} /> : <Image source={TOGGLE_GREEN} />
//                                     }
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 20, flexDirection: 'column' }}>
//                             <View style={design.bg_round}>
//                                 <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>Pick Up Open</Text>
//                                 <TouchableOpacity onPress={() => { this.setState({ isVisiblePickUp: !this.state.isVisiblePickUp }) }}>
//                                     {
//                                         !this.state.isVisiblePickUp ? <Image source={TOGGLE_GRAY} /> : <Image source={TOGGLE_GREEN} />
//                                     }
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </ScrollView>
//             </View>
//         )
//     }
// }
// const mapStateToProps = ({ ChangeRestroOnlineStatus, LocationList }) => ({
//     loading: ChangeRestroOnlineStatus.loading,
//     restoOnlineStatus: ChangeRestroOnlineStatus.restoOnlineStatus,
//     myProfile: LocationList.myProfile
// })

// const mapDispatchToProps = {
//     changeRestroOnlineStatusApi: changeRestroOnlineStatusApi,
//     myProfileApi: myProfileApi,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Setting);
// // export default Setting;



import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    Text,
    StyleSheet,
    TouchableOpacity,
    View, Image, Modal, Button
} from 'react-native'
import styles from './styles'
import { colors } from '../../theme'
import { TOGGLE_GREEN, TOGGLE_GRAY } from '../../images'
import translate from '../../i18n/i18n';
import { DIMENS, APP_PARAMS, FONT_FAMILIY, USER_DATA } from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn'
import CouponRow from './hoocks/CouponRow'
import ProductRow from './hoocks/ProductRow'
import CommonFloatingButton from '../../common/CommonFloatingButton'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import DropDown from '../DropDown';
import { changeRestroOnlineStatusApi, myProfileApi } from '../../thunks';
import { connect } from 'react-redux';
import StepIndicator from "react-native-step-indicator";
import images from '../../images'
import { PDF_IMAGE, DROP_DOWN } from '../../images'

const design = StyleSheet.create({
    bg_round: {
        borderColor: colors.transparent,
        paddingHorizontal: DIMENS.px_15,
        paddingVertical: 10,
        backgroundColor: colors.lightGray,
        minHeight: 50,
        // borderWidth: 0,
        // borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

})
const customStyles = {
    stepIndicatorSize: DIMENS.px_15,
    currentStepIndicatorSize: DIMENS.px_20,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 10,
    stepStrokeCurrentColor: colors.lightGreen,
    stepStrokeWidth: 10,
    stepStrokeFinishedColor: colors.lightGreen,
    stepStrokeUnFinishedColor: "gray",
    separatorFinishedColor: colors.lightGreen,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: colors.lightGreen,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: colors.lightGreen,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    // stepIndicatorLabelCurrentColor: "white",
    stepIndicatorLabelFinishedColor: "white",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: colors.black,
};

class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisibleRestaurant: true,
            isVisibleDelivery: true,
            isVisiblePickUp: true,
            search: undefined,
            text: '',
            restroStatus: false,
            currentPosition: 1,
        }
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
        console.log("restroStatus1.................", this.state.restroStatus);
    }

    changeRestroOnlineStatus = async () => {
        this.setState({
            restroStatus: !this.state.restroStatus
        }, () => {
            this.updateRestroOnlineStatus()
        })
        console.log("restroStatus2.................", this.state.restroStatus);
    }

    updateRestroOnlineStatus = async () => {
        requestData =
        {
            [APP_PARAMS.IS_ONLINE]: this.state.restroStatus,
            [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
        }
        this.props.changeRestroOnlineStatusApi(requestData)
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    // componentDidMount = () => {
    //     //this.getProductList()
    //     this.getProoductTypeList()
    // }

    menuHandle = () => {
        console.warn('dsxjhfbjsd')
        Keyboard.dismiss()
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        if (isDrawerOpen) {
            this.props.navigation.closeDrawer();
        } else {
            this.props.navigation.openDrawer();
        }
    }

    // getProductList3 = async () => {
    //     if (this.state.search != undefined && this.state.search != null && this.state.search != "") {
    //         const { listProductApi } = this.props
    //         let requestData = {
    //             [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
    //             [APP_PARAMS.SEARCH]: this.state.search,
    //         }
    //         listProductApi(requestData)
    //     } else {
    //         this.getProductList()
    //     }


    onTrue = () => {
        this.setState({
            isVisibleRestaurant: !this.state.isVisibleRestaurant
        })
    }

    render() {
        return (
            <View style={[styles.topView, { maginVertical: 0 }]} >
                {/* <CommonHeader menuClick={this.menuHandle} title={'Details'}
                imageSource={PDF_IMAGE}
                /> */}

                <View style={{
                    backgroundColor: colors.lightGray,
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    height: 60
                }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', color: colors.black }}> Details</Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 45, height: 45, justifyContent: 'center', alignItems: 'center', marginRight: 5
                    }}>
                        <Image style={{ width: 45, height: 45 }} source={PDF_IMAGE}></Image>
                    </TouchableOpacity>

                </View>


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'center' }}
                    style={[styles.scrollView, { marginVertical: 0, flexGrow: 1, marginTop: 10 }]}
                >
                    <View style={{ borderRadius: 5, margin: 20, borderColor: colors.gray }}>
                        <View style={{ border: 1, borderColor: colors.gray, borderWidth: 1, borderRadius: 2 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: DIMENS.px_20, color: colors.black }}>John Doe</Text>
                                    <Text style={{ alignItems: 'flex-end', fontSize: DIMENS.px_18, color: colors.black, marginLeft: 45 }}>ORDER ID:</Text>
                                    <Text style={{ fontSize: DIMENS.px_18, color: colors.black }}>FGE096KL</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ marginLeft: 20 }}>Delivery</Text>
                                    <Text style={{ marginLeft: 60 }}>Paid Online</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: colors.black }}>Request Delivery Time: </Text>
                                    <Text style={{ color: colors.black }}>12:00 AM</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: colors.black }}>Confirm Delivery Time: </Text>
                                    <Text style={{ color: colors.black }}>12:00 AM</Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingTop: 9 }}>
                                    <Text style={{ color: colors.red }}>Deliver at: </Text>
                                    <Text style={{ color: colors.red }}>12:00 AM</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            stepCount={4}
                            direction="horizontal"
                            labels={["New", "Accepted", "On the Way", "Delivered"]}
                        />
                    </View>
                    <View style={{ width: "100%", height: 2 }}></View>
                    <View style={{ borderRadius: 5, margin: 20, borderColor: colors.gray }}>
                        <View style={{ flexDirection: "row", padding: 12, backgroundColor: colors.lightGray }}>
                            <Text style={{ color: colors.black, fontSize: DIMENS.px_18 }}>Order Details </Text>
                            <Text style={{ color: colors.black, fontSize: DIMENS.px_18 }}>( 1 item )</Text>
                            <Image source={{ uri: images.DROP_DOWN }} style={{ height: 10, width: 55, }} />
                        </View>
                    </View>
                    {/* {
                        listMyEarning != undefined && listMyEarning.data != undefined && listMyEarning.data.restroEarningList.map((item, index) => {
                            //alert(JSON.stringify(item))
                            return ( */}
                                <View style={{ borderRadius: 5, margin: 0, borderColor: colors.gray }}>
                                    <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                                        <Text style={{ fontSize: DIMENS.px_18, color: colors.black }}>1. Pasta Antalya </Text>
                                        <Text style={{ justifyContent: 'flex-end', fontSize: DIMENS.px_18, color: colors.black, marginLeft: 70 }}>EUR 11.46</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                                        <Text style={{ fontSize: DIMENS.px_14, marginHorizontal: 20 }}>+ Morrocan Spice Pasta Pizza </Text>
                                        <Text style={{ fontSize: DIMENS.px_14 }}>EUR 6</Text>
                                    </View>
                                </View>

                            {/* )
                        })
                    } */}
                    <View style={{ width: "85%", height: 0.7, backgroundColor: colors.gray, margin: 20, marginRight: 30 }}></View>
                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                        <Text style={{ fontSize: DIMENS.px_18, color: colors.black, }}>Subtotal </Text>
                        <Text style={{ justifyContent: 'flex-end', fontSize: DIMENS.px_18, color: colors.black, marginLeft: 145 }}>EUR 11.46</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                        <Text style={{ fontSize: DIMENS.px_14 }}>Delivery fee </Text>
                        <Text style={{ fontSize: DIMENS.px_14 }}>EUR 6</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 20 }}>
                        <Text style={{ fontSize: DIMENS.px_20, color: colors.black }}>TOTAL </Text>
                        <Text style={{ justifyContent: 'flex-end', fontSize: DIMENS.px_20, color: colors.black }}>EUR 11.56</Text>
                    </View>
                    {/* <View>
                    <View style={{ width: "85%", height: 0.5, backgroundColor: colors.gray,margin:10,marginRight:20 }}></View>
                    </View> */}
                    <View style={{
                        backgroundColor: colors.lightGray,
                        height: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        height: 55
                    }}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: DIMENS.px_15 }}>ADDRESS & CONTACT</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text>23 New Ganesh Nagar,</Text>
                        <Text>Taraghar Road </Text>
                        <Text>Ajmer</Text>
                        <Text>Contact : 6656454536</Text>
                    </View>
                </ScrollView>
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
// export default Setting;