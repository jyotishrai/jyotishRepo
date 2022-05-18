
import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'


export default class CommonFloatingButton extends Component {

    // SampleFunction = () => {
    //     alert('this is on click')
    // }


    render() {

        return (

            <View style={styles.MainContainer}>

                <TouchableOpacity activeOpacity={0.5}
                    onPress={this.props.onPress}
                    style={styles.TouchableOpacityStyle} >

                    <Image source={require('../assets/images/add_button.png')}

                        style={styles.FloatingButtonStyle} />

                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 50,
        height: 50,
        right: 30,
        bottom: 30,
        zIndex: 1,
    },

    TouchableOpacityStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    }
});
