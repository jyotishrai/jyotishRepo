export const colors = {
  black: '#000000',
  error: '#ff0000',
  gray: '#6c7a92',
  inputShadow: '#d8e5ff',
  label: '#333333',
  lightGray: '#eeeeee',
  textGrey: '#777777',
  lightGreen: '#00cc4c',
  primary: '#DA211E',
  primaryDisabled: '#F28A95',
  greyedBlue: '#d9e3f7',
  transparent: 'transparent',
  transparent_black: 'rgba(0,0,0,0.6)',
  white: '#ffffff',
  whiteBackground: '#f4f6f9',
  green_dark: "#008000",
  yellow_dark: '#F69725',
  blue: 'blue',
  red: 'red'
}
  
export const navigationHeader = {
  headerStyle: {
    backgroundColor: colors.primary,
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: 'bold' },
}

export default {
  colors,
  navigationHeader,
}