import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { colors } from '../theme'

export default class CustomMenuIcon extends Component {

    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };
    showMenu = () => {
        this._menu.show();
    };
    hideMenu = () => {
        this._menu.hide();
    };
    option1Click = (item) => {
        this._menu.hide();
        this.props.onMenuItemClick(item, this.props.rowItem)
        //alert(item.status)
    };
    render() {
        return (
            <TouchableOpacity style={this.props.menustyle} onPress={() => this.showMenu()}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <Image
                            source={require('../assets/images/more.png')}
                            style={{ tintColor: colors.primary }} />
                    }>
                    {
                        this.props.customMenuItems != undefined &&
                        this.props.customMenuItems.map((item, index) => {
                            return <MenuItem key={index}
                                onPress={() => this.option1Click(item)}>
                                {item.status}
                            </MenuItem>
                        })
                    }
                </Menu>
            </TouchableOpacity>
        );
    }
}