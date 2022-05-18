import React from 'react'
import {
  ScrollView,
  Text,
  View, Image,
  Keyboard,
  Dimensions,
  FlatList,
  RefreshControl,
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
  DIMENS, APP_PARAMS, DATE_FORMAT, FONT_FAMILIY, CURRENCY
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonLoader from '../../common/CommonLoader'
import DashboardTodayEarning from './hoocks/DashboardTodayEarning';
import RecentOrderRow from './hoocks/RecentOrderRow';

import { Grid, LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import moment from 'moment';
import { Circle } from 'react-native-svg';
import * as utils from '../../utility/Utils';
import Svg from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      restroGraphData: [],
      maxOrderAmount: 0,
      tooltipX: null,
      tooltipY: null,
      tooltipIndex: null,
    }
    this.getRestroRecentData();
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

  getRestroRecentData = async () => {
    const { callDashBoardApi } = this.props
    let dataReq = {
      [APP_PARAMS.USERID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID]
    }
    callDashBoardApi(dataReq)
      .then((res) => {
        let maxOrderAmount;
        let tempArray = []
        for (let i = 0; i < res.data.admin_today_earn_graph.length; i++) {
          tempArray[i] = res.data.admin_today_earn_graph[i].order_amount
        }
        this.setState({
          restroGraphData: res != undefined ? res.data.admin_today_earn_graph : [],
          maxOrderAmount: tempArray.sort(function (a, b) { return b - a })[0]
        })
      })
  }

  closeModel = () => {

  }

  emptyList = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <Text
          style={{
            color: colors.gray,
            fontFamily: FONT_FAMILIY.Roboto_Regular,
            fontSize: DIMENS.txt_size_small_12,
            alignSelf: 'center',
            marginBottom: DIMENS.px_10
          }}
        >
          {translate('NO_ORDER_FOUND')}
        </Text>
      </View>
    );
  };

  render() {
    const { invalid, pristine } = this.props
    const { loading, dashboardData } = this.props
    const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };
    const { restroGraphData, tooltipX, tooltipY, tooltipIndex } = this.state;
    console.log("dashboardData......................",dashboardData);

    const ChartPoints = ({ x, y, color }) =>
      restroGraphData.map((item, index) => (
        <Circle
          key={index}
          cx={x(24 - (24 - moment(item.createdAt).format('H')))}
          cy={y(item.order_amount)}
          r={6}
          fill="#8884d8"
        />
      ));

    return (
      <View
        style={[styles.topView, { maginVertical: 0 }]}
      >
        <CommonHeader menuClick={this.menuHandle} title={'Dashbord'}></CommonHeader>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this.getRestroRecentData()}
            />}
          showsVerticalScrollIndicator={false}
          horizontal={false}>

          <View style={{ padding: 15, elevation: 2 }}>

            <DashboardTodayEarning
              amount={
                dashboardData != undefined &&
                  dashboardData.data.admin_today_earn[0] != undefined ?
                  dashboardData.data.admin_today_earn[0].total_price : 0
              }
              date={utils.getCurrentDate(DATE_FORMAT.DATE_FORMAT_SEND)}
              navigator={this.props.navigation}
            ></DashboardTodayEarning>

            {this.state.restroGraphData != undefined &&
              this.state.restroGraphData != null &&
              this.state.restroGraphData != [] &&
              this.state.restroGraphData != '' &&
              <View style={{
                marginTop: 10,
                borderRadius: 5,
                flexDirection: 'row',
                backgroundColor: colors.white,
                paddingRight: 20,
                paddingLeft: 10,
                alignItems: 'center',
                paddingTop: 20
              }}>

                <YAxis
                  data={[0, Math.ceil(this.state.maxOrderAmount / 100) * 100]}
                  style={{ marginBottom: 55 }}
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fontSize: 10, fill: 'grey' }}
                  numberOfTicks={5}
                  formatLabel={value => `${CURRENCY.RUPEES}${value}`}
                />
                <View style={{
                  flex: 1,
                }}>
                  <LineChart
                    style={{
                      height: 200,
                      backgroundColor: colors.white,
                      borderRadius: 5,
                    }}
                    data={restroGraphData}
                    yAccessor={({ item }) => item.order_amount}
                    xAccessor={({ item }) => 24 - (24 - moment(item.createdAt).format('H'))}
                    contentInset={contentInset}
                    svg={{ stroke: colors.black }}
                    numberOfTicks={5}
                    yMin={0}
                    yMax={Math.ceil(this.state.maxOrderAmount / 100) * 100}
                    xMin={0}
                    xMax={24}
                  >
                    <Grid
                      direction={"BOTH"}
                      svg={{ stroke: colors.lightGray }}
                    />

                    <ChartPoints />

                  </LineChart>

                  <XAxis
                    style={{ marginHorizontal: -10, height: 30 }}
                    data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
                    formatLabel={(value, index) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'grey' }}
                    numberOfTicks={12}
                  />

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>

                    <Text style={{
                      alignSelf: 'center',
                      marginBottom: 10,
                      marginRight: 5
                    }}>
                      {'On Time'}
                    </Text>

                    <Svg height="20" width="20" style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Circle cx="10" cy="10" r="6" fill="#8884d8" />
                    </Svg>

                  </View>
                </View>
              </View>}
            <View style={{ borderRadius: 5, backgroundColor: colors.lightGray, marginTop: 10, flexDirection: 'column' }}>

              <RecentOrderRow
                orderNumber={translate("ORDER_NUMBER")}
                totalPrice={translate("TOTAL_PRICE")}
                date={translate("CREATED_AT")}
                status={translate("STATUS")}
                action={translate("ACTION")}
                isTitle={true}
                bgColor={colors.transparent}
              ></RecentOrderRow>

              {dashboardData != undefined &&
                dashboardData.data != undefined &&
                dashboardData.data.today_orders != undefined &&

                <FlatList
                  data={dashboardData.data.today_orders}
                  keyExtractor={(item, index) => index.toString()}
                  extraData={dashboardData}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={this.emptyList}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  renderItem={({ item, index }) =>
                    <RecentOrderRow
                      orderNumber={item.order_number}
                      totalPrice={item.total_price}
                      date={utils.getTimeInUtc(item.createdAt, DATE_FORMAT.DATE_FORMAT_HH_mm_SHOW)}
                      status={utils.convertOrderStatus(item.status)}
                      action={
                        // <TouchableOpacity onPress={() => this.props.navigation.navigate('Orders')}>
                        <Image
                          style={{ flex: 1, justifyContent: "center", }}
                          source={require('../../assets/images/eye.png')}
                        />
                        // </TouchableOpacity>
                      }
                      isTitle={false}
                      bgColor={colors.transparent}
                      navigation={this.props.navigation}
                    ></RecentOrderRow>
                  } />
              }
            </View>
          </View>
        </ScrollView>
        <CommonLoader modalVisible={this.state.modalVisible}></CommonLoader>
      </View >
    )
  }
}