import { AsyncStorage } from 'react-native';
import {
    APP_PARAMS, SCREEN
} from '../constants';
import * as Constants from '../constants';
import moment from 'moment';
import translate from '../i18n/i18n'


export const storeData = async (key, data) => {
    try {
        // await AsyncStorage.setItem({"key":key, "value":data});
        AsyncStorage.setItem(key, JSON.stringify(data), (dataaaa) => {
            //     console.log("success:::", dataaaa);
        });

    } catch (error) {
        //   console.log("error:::", error);

    }
};

export const retrieveData = async (key, call) => {
    try {
        AsyncStorage.getItem(key, (err, result) => {
            //    console.log("result:::::", result);
            call(JSON.parse(result))
        });
    } catch (error) {
        // Error retrieving data
    }
};

export const clearData = async (key) => {
    try {
        AsyncStorage.removeItem(key, (err, result) => {
            //  console.log("removeItem:::::");
        });
    } catch (error) {
        // console.log("error removeItem:::::", error);
    }
};

export const getUserData = () => {
    retrieveData(APP_PARAMS.USER_DATA, async (data) => {
        if (data) {
            global[APP_PARAMS.USER_DATA] = data
        }
    }
    );
}


export const validateSignUp = (values) => {


    {
        // console.log("values:::::::::::::::::::::::::", values);


    }


    const errors = []
    if (values.email) {
        if (values.email.indexOf('@') > -1) {
            if (!emailRegex.test(values.email)) {
                errors.email = translate('EMAIL_HINT')
            }
        } else {
            if (!/^[a-zA-Z][\w\-\.]{1,48}\w$/.test(values.email)) {
                errors.email = translate('EMAIL_HINT')
            }
        }
    } else {
        errors.email = translate('EMAIL_HINT')
    }



    if (values.restaurantName) {
        if (!/^[a-zA-Z ]+$/.test(values.restaurantName)) {
            errors.restaurantName = translate('RESTAURANT_NAME_HINT')
        }
    } else {
        errors.restaurantName = translate('RESTAURANT_NAME_HINT')
    }


    if (values.phone) {
        if (!/^(0|\+91)?[6789]\d{9}$/.test(values.phone)) {
            errors.phone = translate('PHONE_HINT')
        }
    } else {
        errors.phone = translate('PHONE_HINT')
    }


    if (values.landlineNumber) {
        if (!/^[0-9]\d{2,4}-\d{6,8}$/.test(values.landlineNumber)) {
            errors.landlineNumber = translate('LANDLINE_NUMBER_HINT')
        }
    } else {
        errors.landlineNumber = translate('LANDLINE_NUMBER_HINT')
    }

    if (values.addressLine1) {
        if (values.addressLine1 == '' || values.addressLine1 == undefined) {
            errors.addressLine1 = translate('ADDRESS_LINE_1_HINT')
        }
    } else {
        errors.addressLine1 = translate('ADDRESS_LINE_1_HINT')
    }

    if (values.addressLine4) {
        if (values.addressLine4 == '' || values.addressLine4 == undefined) {
            errors.addressLine4 = translate('ADDRESS_LINE_4_HINT')
        }
    } else {
        errors.addressLine4 = translate('ADDRESS_LINE_4_HINT')
    }

    if (values.zipCode) {
        if (values.zipCode == '' || values.zipCode == undefined) {
            errors.zipCode = translate('ZIP_CODE_HINT')
        }
        else if (!/^[1-9][0-9]{5}$/.test(values.zipCode)) {
            errors.zipCode = translate('ZIP_CODE_HINT')
        }

    } else {
        errors.zipCode = translate('ZIP_CODE_HINT')
    }

    if (values.openingTime) {
        if (values.openingTime == '' || values.openingTime == undefined) {
            errors.openingTime = translate(' OPENING_TIME_HINT')
        }
    } else {
        errors.openingTime = translate(' OPENING_TIME_HINT')
    }

    if (values.password) {
        if (!/^(?=.{3,20}$)(?!.*([\s])\1{2})[\w\s]+$/.test(values.password)) {
            errors.password = translate('PASSWORD_HINT')
        }
    } else {
        errors.password = translate('PASSWORD_HINT')
    }


    if (values.confirmPassword) {
        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = translate('CONFIRM_PASSWORD_HINT')

        }

    } else {
        errors.confirmPassword = translate('CONFIRM_PASSWORD_HINT')

    }

    return errors
}



export const imagePicker = (values) => {



}

// export const convertFromMillisecondToHHmm = (time) => {
//     let showTime = '';
//     if (time > 0) {
//         var min = parseInt(time / (1000 * 60));
//         alert('time in ms 12345:', min);

//         const hr = parseInt(min / 60);
//         min = parseInt(min % 60);
//         showTime = `${hr}h ${min}m`;
//     }
//     //alert('time in ms:', time, showTime + ':', showTime);
//     return showTime;
// }

// export const getFeeWithFormat = (strData) => {
//     if (strData == null || strData == undefined)
//         strData = '';
//     else {
//         strData = 'Rs.' + strData;
//     }
//     return strData;
// }
// export const getExperienceWithFormat = (strData) => {
//     if (strData == null || strData == undefined)
//         strData = '';
//     else {
//         strData = strData;
//     }
//     return strData;
// }

export const convertStrDateFormat = (utcDateTime) => {
    date = new Date(utcDateTime);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return (year + '-' + month + '-' + dt);
}

export const convertStrDateFormatWithTime = (utcDateTime) => {
    date = new Date(utcDateTime);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();
    hr = date.getHours();
    min = date.getMinutes();
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hr < 10) {
        hr = '0' + hr;
    }
    if (min < 10) {
        min = '0' + min;
    }

    return (year + '-' + month + '-' + dt + ' ' + hr + ':' + min);
}

export const getTimeFromUTCDate = (utcDateTime) => {
    hr = date.getHours();
    min = date.getMinutes();

    if (hr < 10) {
        hr = '0' + hr;
    }
    if (min < 10) {
        min = '0' + min;
    }

    return (hr + ':' + min);
}


// export const convertTimeFromMiliseconds = (dateTime, forShowFormat) => {
//     var showDateValue = '';
//     if (dateTime !== null || dateTime !== undefined) {
//         showDateValue = moment(dateTime).format(forShowFormat)
//     }
//     return showDateValue;
// }

export const getCurrentDate = (formt) => {
    return moment(new Date().toISOString()).utc().format(formt)
}

export const getTimeInUtc = (date1, formt) => {
    let date = new Date(date1);
    return moment(date.toISOString()).format(formt);
}

export const getDateInUtc = (date1, formt) => {
    let date = new Date(date1);
    return moment(date.toISOString()).utc().format(formt);
}

export const getFormDataFromObject = (data) => {
    const formData = new FormData();
    for (var key in data) {
        if (typeof data[key] === 'object') {
            var dataValue = data[key];
            if (key == APP_PARAMS.KEY_IMAGES_ARRAY) {
                for (var itemIndex in data[key]) {
                    var keyName = APP_PARAMS.KEY_IMAGES_ARRAY + itemIndex + APP_PARAMS.KEY_ARRAY_CLOSE;
                    formData.append(keyName, data[key][itemIndex]);
                }
            }
            //key === APP_PARAMS.KEY_IMAGES_ARRAY ||
            else if (key == APP_PARAMS.KITCHEN_IMAGE
                || key == APP_PARAMS.BUILDING_FRONT_IMAGE
                || key == APP_PARAMS.DINING_PACKAGING_IMAGE
                || key == APP_PARAMS.LOCALITY_IMAGE) {
                for (var itemIndex in data[key]) {
                    // console.log(' Key name value1 :- ', data[key][itemIndex])
                    if (data[key][itemIndex] != undefined && data[key][itemIndex][APP_PARAMS.NAME] != undefined) {
                        var keyName = key + itemIndex + APP_PARAMS.KEY_ARRAY_CLOSE;
                        //  console.log('key name :- ', keyName, ' Key name value :- ', data[key][itemIndex])
                        formData.append(key, data[key][itemIndex]);
                    }

                }
            }
            else {
                if (dataValue !== null && dataValue.uri !== undefined && dataValue.uri !== null) {
                }
                else {
                    if (dataValue != null) {
                        dataValue = ((JSON.stringify(dataValue)));
                        dataValue = dataValue.replace(/\\/g, '');
                    }
                }
                if (dataValue != undefined && dataValue != null) {
                    formData.append(key, dataValue);
                }
            }
        }
        else {
            if (data[key] != undefined && data[key] != null) {
                formData.append(key, data[key]);
            }
        }
    }
    return formData;
}

export const convertOrderStatus = (status) => {
    if (status == APP_PARAMS.STATUS_DELIVERED_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_DELIVERED')
    }
    else if (status == APP_PARAMS.STATUS_REJECT_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_REJECTED')
    }
    else if (status == APP_PARAMS.STATUS_NEW_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_PENDING')
    }
    else if (status == APP_PARAMS.STATUS_READY_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_PREPARED')
    }
    else if (status == APP_PARAMS.STATUS_PREPARIN_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_PREPARING')
    }
    else if (status == APP_PARAMS.STATUS_PAST_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_PAST')
    }
    else if (status == APP_PARAMS.VIEW_ORDER) {
        return translate('FINAL_ORDER_STATUS_TYPE_VIEW')
    }
}

export const getCategoryName = (restrocategory, allCategory) => {
    //alert(JSON.stringify(restrocategory[1]))
    let categoryNameArray = [];

    for (let i = 0; i < restrocategory.length; i++) {
        for (let j = 0; j < allCategory.length; j++) {
            if (allCategory[j]._id == restrocategory[i]) {

                allCategory[j].isChecked = allCategory[j].isChecked == undefined ? true : !allCategory[j].isChecked
                allCategory.slice(1, allCategory[j])
                //this.setTempArray(item)
                categoryNameArray.push(allCategory[j].label)
            }
        }
    }
    return categoryNameArray;
}

export const getRestroType = (restroType, allType) => {
    let selectedRestroType = {};

    for (let i = 0; i < allType.length; i++) {
        if (restroType == allType[i].name) {
            selectedRestroType = allType[i]
            break;
        }
    }
    return selectedRestroType;
}

export const getSupportDelivery = (supportDelivery, allSupportDelivery) => {
    //alert(allSupportDelivery[2].name + ' ' + supportDelivery)
    let selectedSupportDelivery = {};

    for (let i = 0; i < allSupportDelivery.length; i++) {
        if (supportDelivery + '' == allSupportDelivery[i].name) {
            selectedSupportDelivery = allSupportDelivery[i]
            break;
        }
    }
    return selectedSupportDelivery
}

