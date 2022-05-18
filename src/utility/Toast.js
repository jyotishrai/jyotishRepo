import Toast from 'react-native-tiny-toast';
import { colors } from '../theme';

let toast;

export default function showToast(message, type, duration = 2000) {
    Toast.show(message, {
        position: -1,
        duration: duration,
        textColor: colors.white,
        containerStyle: {
            backGroundColor: colors.transparent_black,
            width: '100%',
            padding: 15,
            borderRadius: 0,
            marginBottom: -1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        }
    })
}

export function hindLoading() {
    Toast.hide(toast);
}

export function showLoading(message = '') {
    toast = Toast.showLoading(message, {
        position: 'absolute',
        containerStyle: {
            backGroundColor: colors.transparent_black,
            padding: 15,
        },
        textColor: colors.white,
        textStyle: { fontSize: 16 }
    })
}

export function showErrorToast(message) {
    Toast.show(message, {
        position: -1,
        duration: 1000,
        textColor: colors.white,
        containerStyle: {
            backgroundColor: colors.primary,
            width: '100%',
            padding: 15,
            borderRadius: 0,
            marginBottom: -1,
        },
    });
}
export function showErrorFailToast(message) {
    alert(message);
}

export function showSuccessToast(message) {
    showToast(message, 'success');
}

export function showInfoToast(message, duration) {
    if (duration != undefined) {
        showToast(message, info, 3000);
    } else {
        showToast(message, info);
    }
}