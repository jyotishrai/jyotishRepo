import React, { Component } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    TouchableOpacity,
    CheckBox,
    ScrollView
} from 'react-native';

import { colors } from '../../theme'

const screenWidth = Math.round(Dimensions.get('window').width);

export default class SelectSignupCategoryModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isChecked: false
        }
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    this.props.onClose()
                }}>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: -1,
                }}
                    onPress={() => this.props.onClose()}>

                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: screenWidth - 100,
                        height: screenWidth,
                        zIndex: 2,
                        position: 'absolute',
                        elevation: 5,
                        borderRadius: 5
                    }}
                        activeOpacity={1}
                    >
                        <View style={{
                            flex: 1,
                            width: '100%',
                            padding: 10
                        }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}>{
                                    "Select Categories"
                                }
                            </Text>
                            <ScrollView>
                                {this.props.listData != undefined && this.props.listData.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                            activeOpacity={1}>
                                            <Text>
                                                {
                                                    item.label
                                                }
                                            </Text>
                                            <CheckBox
                                                value={item.isChecked == undefined ? false : item.isChecked ? true : false}
                                                onChange={() => {
                                                    this.props.onChangeCheckBox(item, index)
                                                    this.setState({
                                                        isChecked: !this.state.isChecked
                                                    })
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                            <TouchableOpacity onPress={() => this.props.onClose()}>
                                <Text style={{
                                    color: colors.primary,
                                    fontSize: 16,
                                    alignSelf: 'flex-end',
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                }}>
                                    {
                                        'DONE'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    }
}