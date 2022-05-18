import React from 'react'

import { View, Text, KeyboardAvoidingView, Button, ActivityIndicator, FlatList, BackHandler } from 'react-native';
import CommonTimePiker from '../CommonDatePiker';
import CommonHeader from '../../common/CommonHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    DIMENS,
    APP_PARAMS,
    DATE_FORMAT
} from '../../constants'
import styles from './styles'
import { colors } from '../../theme';
import WeekEarning from './hoocks/WeekEarning';
import * as utils from '../../utility/Utils';

export default class MyEarning extends React.Component {

    constructor(props) {
        super(props);
        this.getRestroEarning()
    }

    getRestroEarning = async () => {
        const { listMyEarningApi } = this.props
        let reqdata = {
            restro_id: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
        }
        listMyEarningApi(reqdata)
    }

    getPerWeekEarning = (startDate, endDate) => {
        this.props.navigation.navigate('PerWeekEarning', {
            startDate: startDate,
            endDate: endDate
        })
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

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    render() {
        const { loading, listMyEarning } = this.props;
        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding' })}
                style={[styles.topView, { paddingVertical: 0 }]}
            >
                <View>
                    <CommonHeader menuClick={this.menuHandale} title={'My Earning'} />
                    {
                        listMyEarning != undefined && listMyEarning.data != undefined && listMyEarning.data.restroEarningList.map((item, index) => {
                            //alert(JSON.stringify(item))
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => this.getPerWeekEarning(item.week_start_date, item.week_end_date)}>
                                    <WeekEarning
                                        amount={item.order_amount}
                                        start_date={utils.getDateInUtc(item.week_start_date, DATE_FORMAT.DATE_FORMAT_DD_MMM_SHOW)}
                                        end_date={utils.getDateInUtc(item.week_end_date, DATE_FORMAT.DATE_FORMAT_DD_MMM_SHOW)}
                                        week_number={item.week_number}
                                    >
                                    </WeekEarning >
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </KeyboardAvoidingView>
        )
    }
}