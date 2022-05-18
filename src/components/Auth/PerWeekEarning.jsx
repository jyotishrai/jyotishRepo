import React from 'react'

import {
    View,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView
} from 'react-native';
import CommonTimePiker from '../CommonDatePiker';
import CommonHeader from '../../common/CommonHeader';
import {
    DIMENS,
    APP_PARAMS,
    DATE_FORMAT
} from '../../constants'
import styles from './styles'
import { colors } from '../../theme';
import WeekEarning from './hoocks/WeekEarning';
import * as utils from '../../utility/Utils';
import * as images from '../../images';
import PerDayEarning from '../../components/Auth/hoocks/perDayEarning'

export default class PerWeekEarning extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tempArray: []
        }
        this.getPerWeekEarning()
    }

    componentDidMount() {
        this.getPerWeekEarning()
    }
    // componentDidMount() {
    //     this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    // }

    // componentWillUnmount() {
    //     this.backHandler.remove()
    // }

    // handleBackPress = () => {
    //     this.props.navigation.navigate('MyEarning'); // works best when the goBack is async
    //     return true;
    // }

    componentWillReceiveProps = async (nextProps) => {
        const tempArray = nextProps.listMyPerWeekEarning.data.restroEarningList;
        var result = tempArray.map(function (el) {
            var o = Object.assign({}, el);
            o.isActive = false;
            return o;
        })
        this.setState({
            tempArray: result
        })
    }

    getPerWeekEarning = async () => {
        let startDate = this.props.navigation.getParam('startDate')
        let endDate = this.props.navigation.getParam('endDate')
        const { listPerWeekEarningApi } = this.props
        let reqdata = {
            restro_id: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID],
            week_start_date: startDate,
            week_end_date: endDate
        }
        listPerWeekEarningApi(reqdata)
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    menuHandale = () => {
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen
        if (isDrawerOpen) {
            this.props.navigation.closeDrawer()
        }
        else {
            this.props.navigation.openDrawer()
        }
    }

    toggleTabs(_id) {

        let tempArray = this.state.tempArray;
        let newtabs = tempArray.map((item, index) => {
            if (item._id == _id) {
                if (item.isActive == true) {
                    item.isActive = false;
                } else {
                    item.isActive = true;
                }
            } else {
                item.isActive = false;
            }
            return item;
        });
        return newtabs;

    }

    handleClick = (_id) => {
        this.setState({
            tempArray: this.toggleTabs(_id),
        });
    }

    render() {
        const { loading, listMyPerWeekEarning } = this.props;
        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding' })}
                style={[styles.topView, { paddingVertical: 0 }]}
            >
                <ScrollView>
                    <CommonHeader menuClick={this.menuHandale} title={'My Earning'} />
                    {this.state.tempArray.map((item, index) => {
                        // const order_amount = item.week_earning_days.map((item, index) => { return item.order_amount })
                        // const order_name = item.week_earning_days.map((item, index) => { return item.product_name_list })
                        const total_orders = item.week_earning_days.length
                        //alert(JSON.stringify(item))
                        return (
                            <PerDayEarning
                                title={utils.getDateInUtc(item.createdAt, DATE_FORMAT.DATE_FORMAT_SEND)}
                                //  order_name={order_name}
                                //  order_time={utils.getDateInUtc(item.createdAt, DATE_FORMAT.DATE_FORMAT_HH_mm__ss_SHOW)}
                                //  order_amount={order_amount}
                                isActive={item.isActive}
                                key={index}
                                handleClick={this.handleClick}
                                id={item._id}
                                totalOrders={total_orders}
                                item={item}
                            />
                        )
                    })}
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}