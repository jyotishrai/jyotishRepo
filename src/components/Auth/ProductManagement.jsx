import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    Text,
    TouchableOpacity,
    View, Image, Modal, Button
} from 'react-native'
import styles from './styles'
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import { DIMENS, APP_PARAMS, FONT_FAMILIY } from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn'
import CouponRow from './hoocks/CouponRow'
import ProductRow from './hoocks/ProductRow'
import CommonFloatingButton from '../../common/CommonFloatingButton'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import DropDown from '../DropDown';
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default class ProductManagement extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            search: undefined,
            text: ''
        }
        this.getProductList()
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
          // The screen is focused
          // Call any action
          this.getProoductTypeList()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    // componentDidMount = () => {
    //     //this.getProductList()
    //     this.getProoductTypeList()
    // }

    productListmodal = () => {
        const { loading, listProductType } = this.props

        return (
            <Modal
                transparent={true}
                visible={this.state.isVisible}>

                <View style={{
                    flex: 1,
                    backgroundColor: colors.transparent_black,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        margin: 30,
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        height: '80%',
                        width: '80%',
                        borderRadius: 10,
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                height: 35,
                                width: '93%',
                                textAlign: 'center',
                                fontFamily: FONT_FAMILIY.Roboto_Bold,
                                fontSize: 18,
                                marginTop: 10
                            }}>
                                {'Select Product Type'}
                            </Text>
                            <TouchableOpacity style={{
                                height: 25,
                                width: 20,
                                marginRight: 10
                            }}
                                onPress={() => this.setState({ isVisible: false })}
                            >
                                <Image
                                    style={{ flex: 1, justifyContent: 'center', }}
                                    source={require('../../assets/images/diactivate.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        {
                            listProductType != undefined && listProductType.data != undefined ?
                                < FlatList
                                    data={listProductType.data}
                                    renderItem={({ item, index }) => this.productListView(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                /> : null}
                    </View>
                </View>
            </Modal>
        )
    }

    productListView = (item, index) => {
        return (
            <TouchableOpacity style={{
                height: 50,
                flexDirection: 'row',
                alignContent: 'center',
                borderColor: '#eeeeee',
                borderBottomWidth: .5,
                marginHorizontal: 5,
            }}
                onPress={() => {
                    this.getProductList2(item)
                    this.setState({ isVisible: false })
                }}
            >
                <Text style={{
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                    textAlign: 'left',
                    width: '100%',
                }}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getProductList()
        });

        this.getProductList();
    }
    

    // componentWillUnmount() {
    //     this.focusListener.remove();
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

    getProductList = async () => {
        const { listProductApi } = this.props
        //console.log('globaldata:::::::::::', global[APP_PARAMS.USER_DATA]);
        let requestData = {
            [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
            //   [APP_PARAMS.PRODUCT_CATEGORIES_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID]
        }
        listProductApi(requestData)
    }

    getProductList3 = async () => {
        if (this.state.search != undefined && this.state.search != null && this.state.search != "") {

            const { listProductApi } = this.props
            let requestData = {
                [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
                [APP_PARAMS.SEARCH]: this.state.search,
            }

            listProductApi(requestData)

        } else {
            this.getProductList()
        }
        // const { listProductApi } = this.props
        // let requestData = {
        //     [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
        //     [APP_PARAMS.SEARCH]: this.state.search,
        // }

        // listProductApi(requestData)
    }

    getProductList2 = async (item) => {
        const { listProductApi } = this.props
        //console.log('globaldata:::::::::::', global[APP_PARAMS.USER_DATA]);
        let requestData = {
            [APP_PARAMS.RESTRO_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.RESTRO_DETAIL][APP_PARAMS._ID],
            [APP_PARAMS.PRODUCT_CATEGORIES_ID]: item._id
        }
        listProductApi(requestData)
    }

    getProoductTypeList = () => {
        const { listProductTypeApi } = this.props;
        var dataReq = {
            [APP_PARAMS.USER_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID],
        }
        listProductTypeApi(dataReq)
    }

    renderValue = (item, index) => {
        return (
            <ProductRow
                key={index}
                productName={item.name}
                categories={item.product_categories.label}
                price={item.price}
                cookingTime={item.coocking_time_in_minute}
                finalPrice={item.final_price}
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
                action={<Image
                    style={{ flex: 1, justifyContent: "center", }}
                    source={require('../../assets/images/eye.png')}
                />}
                isTitle={false}
                bgColor={colors.transparent}
                item={item}
                navigator={this.props.navigation}
            ></ProductRow>
        )
    }

    submitAndClear = () => {
        this.setState({
            search: ''
        })
        this.getProductList()
    }

    render() {
        const { invalid, pristine } = this.props
        const { loading, listProduct } = this.props
        // {
        //     console.log("listProduct:::::::::::::::::::::::,", listProduct);

        // }
        return (
            <View
                style={[styles.topView, { maginVertical: 0 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Product List'} />


                {/* <View style={{
                    height: 50,
                    backgroundColor: 'white',
                    padding: 4,
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    borderRadius: 5,
                    alignItems: 'center',
                }}>
                    <Image
                        style={{
                            marginLeft: 3,
                            height: 18,
                            width: 18,
                            tintColor: colors.textGrey
                        }}
                        source={require('../../assets/images/search.png')} />

                    <TextInput
                        style={{
                            //flex: 1,
                            height: 40,
                            width: '70%',
                            justifyContent: 'center',
                            marginLeft: 3,
                        }}
                        onSubmitEditing={() => this.getProductList3()}
                        onChangeText={(value) => {
                            this.setState({
                                search: value,
                            })
                        }}
                        placeholder={"Search Product Name"}
                        value={this.state.search}
                    />


                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        height: 40,
                        marginLeft: 5,
                        alignItems: 'center'

                    }}
                        onPress={() => this.submitAndClear()}
                    >
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: colors.primary
                            }}
                            source={require('../../assets/images/deactivate.png')} />
                    </TouchableOpacity>
                    <View style={{
                        height: 30,
                        width: 1,
                        backgroundColor: colors.gray,
                        marginHorizontal: 2
                    }}>

                    </View>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        height: 40,
                        marginHorizontal: 5
                    }}
                        onPress={() => this.setState({ isVisible: true })}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: 'green',
                            fontFamily: FONT_FAMILIY.Roboto_Bold,
                            fontSize: DIMENS.txt_size_medium_14
                        }}
                        >
                            {'Filter'}
                        </Text>
                    </TouchableOpacity>
                </View> */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'center' }}
                    style={[styles.scrollView, { marginVertical: 0, flexGrow: 1, marginTop: 10 }]}
                >
                    <View style={{ paddingHorizontal: 10, paddingBottom: 80 }}>

                        <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 0, flexDirection: 'column' }}>

                            <ProductRow
                                key={-1}
                                productName={translate('PRODUCT_NAME')}
                                categories={translate("CATEGORIES")}
                                price={translate("PRICE")}
                                cookingTime={translate("COOKING_TIME")}
                                finalPrice={translate("FINAL_PRICE")}

                                status={translate("STATUS")}
                                action={translate("ACTION")}
                                isTitle={true}
                                bgColor={colors.transparent}
                            ></ProductRow>

                            {listProduct != undefined && listProduct.data.product_list != undefined ?
                                <FlatList
                                    data={listProduct.data.product_list}
                                    renderItem={({ item, index }) => this.renderValue(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                /> : null}

                        </View>
                    </View>
                </ScrollView>
                <CommonFloatingButton
                    onPress={() =>
                        this.props.navigation.navigate('AddProduct', {})
                    }
                />
                {
                    this.productListmodal()
                }
            </View>
        )
    }
}