import React from 'react'

import {
    View,
    Text
} from 'react-native';
import CommonHeader from '../../../../src/common/CommonHeader';


export default class Detailed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tempArray: []
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    
    render() {
        const { loading, listMyPerWeekEarning } = this.props;
        return (
            <View>
                <View style={{flexDirection:"row"}}>
                <Text>Joun Deo</Text>
                <Text>ORDER ID:</Text>
                <Text>Hii Gargi</Text>
                </View>
            </View>
        )
    }
}