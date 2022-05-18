import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import React from 'react';
import { colors } from '../../src/theme'


const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const CommonStatusBar = (props) => {
    return (
        <MyStatusBar backgroundColor={colors.primary} />
    );
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})
export default CommonStatusBar;