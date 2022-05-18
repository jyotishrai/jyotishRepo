
import React from 'react';
import {

    Button,
    View, Modal,
    Text, TouchableOpacity,

} from 'react-native';
import {
    FONT_FAMILIY,
} from '../../src/constants'
import translate from '../../src/i18n/i18n';
import { colors } from '../../src/theme';
import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Select Avatar',
    //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


const CustomImagePicker = (props) => {

    const selectImagePiker = () => {

        ImagePicker.showImagePicker(options, (response) => {
            //  console.log('Response = ', response);

            if (response.didCancel) {
                //       console.log('User cancelled image picker');
            } else if (response.error) {
                //       console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //         console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                let keyValue = props.selectedImageKey.key;
                let keyShow = props.selectedImageKey.showKeyName;
                var fileNameA = response.path.split('/')
                var fileName = fileNameA[fileNameA.length - 1];
                var tempImageObject = {
                    uri: response.uri,
                    type: response.type,
                    name: fileName,
                    path: response.path,
                }

                //   console.log('visiblaeChange :::::::: ', JSON.stringify(tempImageObject));
                props.visiblaeChange(false, { key: keyValue, keyValue: tempImageObject, showKeyName: keyShow, keyValueShow: response.uri })

            }
        });
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isShowImagePicker}
            onRequestClose={() => {
                props.visiblaeChange(false)
            }}>

            <View style={{
                flex: 1, backgroundColor: colors.transparent_black,
                flexDirection: 'column'
            }}>
                <View style={{ flex: .6 }}></View>

                <View style={{
                    flex: .4, backgroundColor: colors.white,
                    borderTopLeftRadius: 10, borderTopRightRadius: 10
                }}>

                    <TouchableOpacity style={{
                        marginHorizontal: 40, marginVertical: 20, backgroundColor: colors.blue, padding: 10,
                        borderRadius: 5
                    }}
                        onPress={() => {
                            selectImagePiker();
                            props.visiblaeChange(false)
                        }}

                    >
                        <Text style={{
                            color: colors.white, fontSize: 16, fontFamily: FONT_FAMILIY.Roboto_Regular,
                            textAlign: 'center'
                        }}>{translate('SELECTE_IMAGE_TYPE')}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{
                        marginHorizontal: 40, marginVertical: 10, backgroundColor: colors.blue, padding: 10,
                        borderRadius: 5
                    }}>
                        <Text style={{
                            color: colors.white, fontSize: 16, fontFamily: FONT_FAMILIY.Roboto_Regular,
                            textAlign: 'center'
                        }}>{translate('CAMERA')}</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{
                        marginHorizontal: 40, marginVertical: 10, backgroundColor: colors.red, padding: 10,
                        borderRadius: 5
                    }} onPress={() => {
                        props.visiblaeChange(false)

                    }}>
                        <Text style={{
                            color: colors.white, fontSize: 16, fontFamily: FONT_FAMILIY.Roboto_Regular,
                            textAlign: 'center'
                        }}>{translate('CANCEL')}</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </Modal>


    )




}


export default CustomImagePicker;