// APIS

export const BASE_URL = 'http://139.162.29.56/mypizzeria/api/v1/';

export const BASE_URL_RESTRO = BASE_URL + 'restro/';
export const BASE_URL_DRIVER = BASE_URL + 'driver/';
export const BASE_URL_PRODUCT = BASE_URL + 'product/';
export const BASE_URL_ORDER = BASE_URL + 'order/';
export const BASE_URL_OFFICE = BASE_URL + 'office/';

export const API = {
    SEND_OTP: BASE_URL_RESTRO + 'sendOtp',
    LOGIN_RESTRO: BASE_URL_RESTRO + 'loginRestro',
    SIGNUP_RESTRO: BASE_URL_RESTRO + 'addRestro',
    COUNTRY_LIST: 'listCountry',
    STATE_LIST: 'listState',
    CITY_LIST: 'listCity',
    REGION_LIST: 'listRegion',
    DASHBOARD_RECENT_DATA: BASE_URL_RESTRO + 'reqForRcentDataDaskboard',
    DISCOUNT_DETAILS: BASE_URL + 'detailDiscountRestro',
    EDIT_DISCOUNT: BASE_URL + 'editDiscountRestro',
    LISTCOUPONCODE: BASE_URL + 'listCouponCode',
    ADDCOUPONCODE: BASE_URL + 'addCouponCode',
    EDITCOUPONCODE: BASE_URL + 'editCouponCode',
    MYEARNING: BASE_URL_ORDER + 'listRestroEarning',
    LIST_PRODUCT: BASE_URL_PRODUCT + 'listProduct',
    PERWEEKEARNING: BASE_URL_ORDER + 'listRestroEarningPerWeek',
    // LIST_PRODUCT: BASE_URL_PRODUCT + 'listProduct',
    LIST_CATEGORY: BASE_URL_PRODUCT + 'listCategory',
    ORDER_LIST: BASE_URL_ORDER + 'orderList',
    ADD_CATEGORY: BASE_URL_PRODUCT + 'addCategory',
    ADD_PRODUCT: BASE_URL_PRODUCT + 'addproduct',
    UPDATE_PRODUCT: BASE_URL_PRODUCT + 'editProduct',
    EDIT_CATEGORY: BASE_URL_PRODUCT + 'editCategory',
    CHANGE_ORDER_STATUS: BASE_URL_ORDER + 'changeOrderStatus',
    LIST_SIGNUP_CATEGORIES: BASE_URL + 'listCategory',
    MY_PROFILE: BASE_URL_RESTRO + 'restaurantDetail',
    CHANGE_RESTRO_ONLINE_STATUS: BASE_URL_RESTRO + 'changeRestroOnlineStatus'
}

export const APP_PARAMS = {
    ROLE: "role",
    SUPER_ADMIN: 'superAdmin',
    RESTAURANT_ADMIN: 'restaurant',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm_password',
    RESTAURANT_NAME: 'restaurantName',
    PHONE: 'phone',
    ADDRESS: 'address',
    LANDLINE_NUMBER: 'landline_number',
    WEBSITE_LINK: 'webiste_link',
    MAP: 'map',
    SELECT_COUNTRY: 'selctCountry',
    SELECT_STATE: 'selectState',
    SELECT_REGION: 'selectRegion',
    SELECT_CITY: 'selectCity',
    ADDRESS_LINE_1: 'house_name_and_no',
    ADDRESS_LINE_2: 'street_name',
    ADDRESS_LINE_3: 'area_name',
    ADDRESS_LINE_4: 'landmark',
    ZIP_CODE: 'zip',
    OPENING_TIME: 'opening_time',
    CLOSING_TIME: 'closing_time',
    COST_FOR_TWO: 'cost_for_two',
    SELECT_RESTAURANT_TYPE: 'restaurent_type',
    SUPPORT_DELIVERY: 'support_delivery',
    SELECT_CATEGORIES: 'categories',
    KITCHEN_IMAGE: 'kitchen_img',
    KITCHEN_IMAGE_SHOW: 'kitchen_Image_show',
    KITCHEN_IMAGE_EDIT: 'kitchen_Image_edit',
    SHOP_LICENCE_IMAGE: 'shop_licence_img',
    SHOP_LICENCE_IMAGE_SHOW: 'shopLicenceImage_show',
    SHOP_LICENCE_IMAGE_EDIT: 'shopLicenceImage_edit',
    FSSAI_LICENCE_IMAGE: 'fssai_licence_img',
    FSSAI_LICENCE_IMAGE_SHOW: 'fssaiLicenceImage_show',
    FSSAI_LICENCE_IMAGE_EDIT: 'fssaiLicenceImage_edit',
    GSTN_IMAGE: 'gstn_or_pan_img',
    GSTN_IMAGE_SHOW: 'gstnImage_show',
    GSTN_IMAGE_EDIT: 'gstnImage_edit',
    BUILDING_FRONT_IMAGE: 'building_front_img',
    BUILDING_FRONT_IMAGE_SHOW: 'buildingFontImage_show',
    BUILDING_FRONT_IMAGE_EDIT: 'buildingFontImage_edit',
    DINING_PACKAGING_IMAGE: 'dining_packaging_img',
    DINING_PACKAGING_IMAGE_SHOW: 'diningPackagingImageShow',
    DINING_PACKAGING_IMAGE_EDIT: 'diningPackagingImageEdit',
    LOCALITY_IMAGE: 'locality_image',
    LOCALITY_IMAGE_SHOW: 'locality_Image_show',
    LOCALITY_IMAGE_EDIT: 'locality_Image_edit',
    PRODUCT_CATEGORIES_ID: "product_cate_id",
    USER_DATA: 'user_data',
    _ID: '_id',
    USERID: 'userid',
    COUNTRY_ID: 'country_id',
    STATE_ID: 'state_id',
    CITY_ID: 'city_id',
    REGION_ID: 'region_id',
    SELECT_ITEM: 'Select Item',
    CREATED_BY: 'created_by',
    USER_ID: 'userid',
    CREATED_BY_NAME: 'created_by_name',
    CREATED_BY_USER_TYPE: 'created_by_user_type',
    IS_TOPCOUPON: 'isTopCoupon',
    NAME: 'name',
    SEARCH: 'search',
    RESTRO_ID: 'restro_id',
    RESTRO_DETAILS: 'restro_details',
    RESTRO_DETAIL: 'restro_detail',
    ORDER_LIST: 'order_list',
    STATUS: 'status',
    PRODUCT_LIST: 'product_list',
    IMAGE: 'image',
    ADD_PRODUCT_IMAGE: 'addProductImage',
    ADD_PRODUCT_IMAGE_SHOW: 'addProductImage_show',
    TOKEN: 'token',
    KEY_IMAGES_ARRAY: 'images[',
    KEY_ARRAY_CLOSE: ']',
    ADD_PRODUCT_TYPE_IMAGE: 'addProductTypeImage',
    ADD_PRODUCT_TYPE_IMAGE_SHOW: 'addProductTypeImage_show',
    DISCOUNT_MGMT_IMAGE: 'discountManagementImage',
    DISCOUNT_MGMT_IMAGE_SHOW: 'discountManagementImage_show',
    ADD_COUPON_CODE_LOGO_IMAGE: 'addCouponCodeLogoImage',
    ADD_COUPON_CODE_LOGO_IMAGE_SHOW: 'addCouponCodeLogoImage_show',
    ADD_COUPON_CODE_OFFER_IMAGE: 'addCouponCodeOfferImage',
    ADD_COUPON_CODE_OFFER_IMAGE_SHOW: 'addCouponCodeOfferImage_show',

    LAT: 'lat',
    LONG: 'lng',
    ORDER_STATUS: 'orderStatus',
    STATUS_NEW_ORDER: "P",
    STATUS_PREPARIN_ORDER: 'PR',
    STATUS_READY_ORDER: 'AD_PR',
    STATUS_PAST_ORDER: 'PT',
    STATUS_REJECT_ORDER: 'RC',
    STATUS_DELIVERED_ORDER: 'OD',
    VIEW_ORDER: 'View',


    IS_ONLINE: 'is_online'
}

export const DATE_FORMAT = {

    DATE_FORMAT_SEND: 'DD MMM YYYY',
    DATE_FORMAT_SHOW: 'YYYY-MM-DD',
    DATE_FORMAT_DD_MMM_SHOW: 'DD MMM',
    DATE_FORMAT_HH_mm_SHOW: 'HH:mm',
    DATE_FORMAT_HH_mm__ss_SHOW: 'HH:mm:ss',
    DATE_FORMAT_dddd_DD_MMM_SHOW: 'dddd, DD MMM',
    DATE_FORMAT_MMM_DD_hh_mm_a_SHOW: 'MMM DD, hh: mm A',
    DATE_FORMAT_DD_MMM_YYYY_hh_mm_a_SHOW: 'DD MMM YYYY, hh: mm A',
    DATE_FORMAT_ddd_DD_MMM_SHOW: 'ddd, DD MMM',
    DATE_FORMAT_hh_mm_a_SHOW: 'hh: mm a',
    DATE_FORMAT_YYYY_MMM_DD_SHOW: 'YYYY - MMM - DD',
    DATE_FORMAT_COMING_FROM_SERVER: "YYYY-MM-DDTHH:mm:ss.SSSZ",
}

export const SCREEN = {
    DASHBOARD: "AppDrawer",
    LOGIN: 'Login',
    SETTING: 'Setting'
}

export const LOCALES = {
    ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
    HINDI: { id: 2, name: "hi", label: "हिंदी" }
};
export const FONT_FAMILIY = {
    Roboto_Black: 'Roboto-Black',
    Roboto_Bold: 'Roboto-Bold',
    Roboto_Light: 'Roboto-Light',
    Roboto_Medium: 'Roboto-Medium',
    Roboto_Regular: 'Roboto-Regular',
}


export const DIMENS = {
    px_0: 0,
    px_05: 0.5,
    px_1: 1,
    px_2: 2,
    px_3: 3,
    px_5: 5,
    px_8: 8,
    px_10: 10,
    px_12: 12,
    px_300: 300,
    px_14: 14,
    px_15: 15,
    px_15: 16,
    px_18: 18,
    px_20: 20,
    px_22: 22,
    px_23: 23,
    px_25: 25,
    px_28: 28,
    px_30: 30,
    px_35: 35,
    px_40: 40,
    px_45: 45,
    px_50: 50,
    px_60: 60,
    px_70: 70,
    px_75: 75,
    px_80: 80,
    px_90: 90,
    px_100: 100,
    px_130: 130,
    px_140: 140,
    px_150: 150,

    px_200: 200,
    px_250: 250,

    btn_font_size: 16,
    btn_h: 40,
    devider_h: 1,
    devider_h_half: 0.5,
    devider_h_1: 1,
    txt_size_small_small: 10,
    txt_size_small: 11,
    txt_size_small_12: 12,
    txt_size_min_small: 8,
    txt_size_medium: 13,
    txt_size_medium_14: 14,
    txt_size_medium_1: 15,
    txt_size_large: 16,
    txt_size_large_extra: 18,
    txt_size_large_extra_20: 20,
    row_h: 50,
    minHeight: 50,
    row_img_w: 60,
    row_img_big: 70,
    row_img_w_2: 50,
    tab_width: 24,

    //Category Size
    cat_img_width: 70,
    cat_img_height: 70,
    cat_img_radius: 35,
    reg_img_w: 50,
    reg_img_h: 50,
    reg_img_rad: 30,
    reg_inp_space: 20,

    // all profile image Size
    pro_img_height: 150,
    pro_img_width: 150,
    pro_img_redius: 100,

    // Add Button ..
    add_btn_h: 50,
    add_btn_w: 100,
    final_price_height: 50
}

export const CURRENCY = {
    RUPEES: '\u20B9',
    DOLLER: '\u0024',
    EURO: '\u20AC',
    JAPANES_YEN: '\u00A5',
    POUND_STERLING: '\u00A3'
}

export const APP_LOGIN_RESTRO_REQUEST = 'APP_LOGIN_REQUEST'
export const APP_LOGIN_RESTRO_SUCCESS = 'APP_LOGIN_SUCCESS'
export const APP_LOGIN_RESTRO_FAIL = 'APP_LOGIN_FAIL'

// export const APP_LOGIN_REQUEST = 'APP_LOGIN_REQUEST'
// export const APP_LOGIN_SUCCESS = 'APP_LOGIN_SUCCESS'
// export const APP_LOGIN_FAIL = 'APP_LOGIN_FAIL'

export const APP_SIGN_UP_REQUEST = 'APP_SIGN_UP_REQUEST'
export const APP_SIGN_UP_SUCCESS = 'APP_SIGN_UP_SUCCESS'
export const APP_SIGN_UP_FAIL = 'APP_SIGN_UP_FAIL'

export const APP_UPDATE_REQUEST = 'APP_UPDATE_REQUEST'
export const APP_UPDATE_SUCCESS = 'APP_UPDATE_SUCCESS'

export const APP_DASHBOARD_REQUEST = 'APP_DASHBOARD_REQUEST'
export const APP_DASHBOARD_SUCCESS = 'APP_DASHBOARD_SUCCESS'
export const APP_DASHBOARD_FAIL = 'APP_DASHBOARD_FAIL'

export const APP_COUNTRY_REQUEST = 'APP_COUNTRY_REQUEST'
export const APP_COUNTRY_SUCCESS = 'APP_COUNTRY_SUCCESS'
export const APP_COUNTRY_FAIL = 'APP_COUNTRY_FAIL'
export const APP_COUNTRY_CLEAR = 'APP_COUNTRY_CLEAR'

export const APP_STATE_REQUEST = 'APP_STATE_REQUEST'
export const APP_STATE_SUCCESS = 'APP_STATE_SUCCESS'
export const APP_STATE_FAIL = 'APP_STATE_FAIL'
export const APP_STATE_CLEAR = 'APP_STATE_FAIL_CLEAR'

export const APP_CITY_REQUEST = 'APP_CITY_REQUEST'
export const APP_CITY_SUCCESS = 'APP_CITY_SUCCESS'
export const APP_CITY_FAIL = 'APP_CITY_FAIL'
export const APP_CITY_CLEAR = 'APP_CITY_CLEAR'

export const APP_REGION_REQUEST = 'APP_REGION_REQUEST'
export const APP_REGION_SUCCESS = 'APP_REGION_SUCCESS'
export const APP_REGION_FAIL = 'APP_REGION_FAIL'
export const APP_REGION_CLEAR = 'APP_REGION_CLEAR'

// DISCOUNT MANAGEMENT;:::::::::::

export const APP_DISCOUNT_MANAGEMENT_REQUEST = 'APP_DISCOUNT_MANAGEMENT_REQUEST'
export const APP_DISCOUNT_MANAGEMENT_SUCCESS = 'APP_DISCOUNT_MANAGEMENT_SUCCESS'
export const APP_DISCOUNT_MANAGEMENT_FAIL = 'APP_DISCOUNT_MANAGEMENT_FAIL'

export const APP_EDIT_DISCOUNT_REQUEST = 'APP_EDIT_DISCOUNT_REQUEST'
export const APP_EDIT_DISCOUNT_SUCCESS = 'APP_EDIT_DISCOUNT_SUCCESS'
export const APP_EDIT_DISCOUNT_FAIL = 'APP_EDIT_DISCOUNT_FAIL'

// COUPON MANAGEMENT ::::::::::::

export const APP_LISTCOUPONCODE_REQUEST = 'APP_LISTCOUPONCODE_REQUEST'
export const APP_LISTCOUPONCODE_SUCCESS = 'APP_LISTCOUPONCODE_SUCCESS'
export const APP_LISTCOUPONCODE_FAIL = 'APP_LISTCOUPONCODE_FAIL'

export const APP_ADDCOUPONCODE_REQUEST = 'APP_ADDCOUPONCODE_REQUEST'
export const APP_ADDCOUPONCODE_SUCCESS = 'APP_ADDCOUPONCODE_SUCCESS'
export const APP_ADDCOUPONCODE_FAIL = 'APP_ADDCOUPONCODE_FAIL'

export const APP_EDITCOUPONCODE_REQUEST = 'APP_EDITCOUPONCODE_REQUEST'
export const APP_EDITCOUPONCODE_SUCCESS = 'APP_EDITCOUPONCODE_SUCCESS'
export const APP_EDITCOUPONCODE_FAIL = 'APP_EDITCOUPONCODE_FAIL'

// MY EARNINGS
export const MY_EARNING_REQUEST = 'MY_EARNING_REQUEST'
export const MY_EARNING_SUCCESS = 'MY_EARNING_SUCCESS'
export const MY_EARNING_FAIL = 'MY_EARNING_FAIL'

export const PER_EARNING_REQUEST = 'PER_EARNING_REQUEST'
export const PER_EARNING_SUCCESS = 'PER_EARNING_SUCCESS'
export const PER_EARNING_FAIL = 'PER_EARNING_FAIL'

// PRODUCT MANAGEMENT :::::::::::::::::::::::::::::::::::
export const APP_LIST_PRODUCT_REQUEST = 'APP_LIST_PRODUCT_REQUEST'
export const APP_LIST_PRODUCT_SUCCESS = 'APP_LIST_PRODUCT_SUCCESS'
export const APP_LIST_PRODUCT_FAIL = 'APP_LIST_PRODUCT_FAIL'

//ADD PRODUCT ::::::::
export const APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_REQUEST = 'APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_REQUEST'
export const APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_SUCCESS = 'APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_SUCCESS'
export const APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_FAIL = 'APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_FAIL'

export const APP_ADD_PRODUCT_TYPE_REQUEST = 'APP_ADD_PRODUCT_REQUEST'
export const APP_ADD_PRODUCT_TYPE_SUCCESS = 'APP_ADD_PRODUCT_SUCCESS'
export const APP_ADD_PRODUCT_TYPE_FAIL = 'APP_ADD_PRODUCT_FAIL'

//UPDATE PRODUCT ::::::::
export const APP_UPDATE_PRODUCT_TYPE_REQUEST = 'APP_UPDATE_PRODUCT_REQUEST'
export const APP_UPDATE_PRODUCT_TYPE_SUCCESS = 'APP_UPDATE_PRODUCT_SUCCESS'
export const APP_UPDATE_PRODUCT_TYPE_FAIL = 'APP_UPDATE_PRODUCT_FAIL'


// ADD CATEGORY ::::::::::::
export const APP_ADD_CATEGORY_REQUEST = 'APP_ADD_CATEGORY_REQUEST'
export const APP_ADD_CATEGORY_SUCCESS = 'APP_ADD_CATEGORY_SUCCESS'
export const APP_ADD_CATEGORY_FAIL = 'APP_ADD_CATEGORY_FAIL'

export const APP_EDIT_CATEGORY_REQUEST = 'APP_EDIT_CATEGORY_REQUEST'
export const APP_EDIT_CATEGORY_SUCCESS = 'APP_EDIT_CATEGORY_SUCCESS'
export const APP_EDIT_CATEGORY_FAIL = 'APP_EDIT_CATEGORY_FAIL'

// product Type ::::::::::::::::::
export const APP_LIST_PRODUCT_TYPE_REQUEST = 'APP_LIST_PRODUCT_TYPE_REQUEST'
export const APP_LIST_PRODUCT_TYPE_SUCCESS = 'APP_LIST_PRODUCT_TYPE_SUCCESS'
export const APP_LIST_PRODUCT_TYPE_FAIL = 'APP_LIST_PRODUCT_TYPE_FAIL'

// ORDER LIST ::::::::::::::::::::::::::::::::::::::

export const APP_LIST_ORDER_REQUEST = 'APP_LIST_ORDER_REQUEST'
export const APP_LIST_ORDER_SUCCESS = 'APP_LIST_ORDER_SUCCESS'
export const APP_LIST_ORDER_FAIL = 'APP_LIST_ORDER_FAIL'

export const CHANGE_ORDER_STATUS_REQUEST = 'CHANGE_ORDER_STATUS_REQUEST'
export const CHANGE_ORDER_STATUS_SUCCESS = 'CHANGE_ORDER_STATUS_SUCCESS'
export const CHANGE_ORDER_STATUS_FAIL = 'CHANGE_ORDER_STATUS_FAIL'

// SIGNUP RESTRO CATEGORY

export const LIST_SIGNUP_CATEGORY_REQUEST = 'LIST_SIGNUP_CATEGORY_REQUEST'
export const LIST_SIGNUP_CATEGORY_SUCCESS = 'LIST_SIGNUP_CATEGORY_SUCCESS'
export const LIST_SIGNUP_CATEGORY_FAIL = 'LIST_SIGNUP_CATEGORY_FAIL'

// QB initialization
export const INIT_QB_REQUEST = 'INIT_QB_REQUEST'
export const INIT_QB_REQUEST_SUCCESS = 'INIT_QB_REQUEST_SUCCESS'
export const INIT_QB_REQUEST_FAIL = 'INIT_QB_REQUEST_FAIL'
// Internet connection state
export const CONNECTION_STATE_CHANGE = 'CONNECTION_STATE_CHANGE'
// User authentication
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL'
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL'
export const AUTH_GET_SESSION_REQUEST = 'AUTH_GET_SESSION_REQUEST'
export const AUTH_GET_SESSION_SUCCESS = 'AUTH_GET_SESSION_SUCCESS'
export const AUTH_GET_SESSION_FAIL = 'AUTH_GET_SESSION_FAIL'
// QB chat authentication
export const CHAT_IS_CONNECTED_REQUEST = 'CHAT_IS_CONNECTED_REQUEST'
export const CHAT_IS_CONNECTED_SUCCESS = 'CHAT_IS_CONNECTED_SUCCESS'
export const CHAT_IS_CONNECTED_FAIL = 'CHAT_IS_CONNECTED_FAIL'
export const CHAT_CONNECT_REQUEST = 'CHAT_CONNECT_REQUEST'
export const CHAT_CONNECT_SUCCESS = 'CHAT_CONNECT_SUCCESS'
export const CHAT_CONNECT_FAIL = 'CHAT_CONNECT_FAIL'
export const CHAT_DISCONNECT_REQUEST = 'CHAT_DISCONNECT_REQUEST'
export const CHAT_DISCONNECT_SUCCESS = 'CHAT_DISCONNECT_SUCCESS'
export const CHAT_DISCONNECT_FAIL = 'CHAT_DISCONNECT_FAIL'
export const CHAT_PING_USER_REQUEST = 'CHAT_PING_USER_REQUEST'
export const CHAT_PING_USER_SUCCESS = 'CHAT_PING_USER_SUCCESS'
export const CHAT_PING_USER_FAIL = 'CHAT_PING_USER_FAIL'
export const CHAT_PING_SERVER_REQUEST = 'CHAT_PING_SERVER_REQUEST'
export const CHAT_PING_SERVER_SUCCESS = 'CHAT_PING_SERVER_SUCCESS'
export const CHAT_PING_SERVER_FAIL = 'CHAT_PING_SERVER_FAIL'
// QB Users
export const USERS_CREATE_REQUEST = 'USERS_CREATE_REQUEST'
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS'
export const USERS_CREATE_FAIL = 'USERS_CREATE_FAIL'
export const USERS_UPDATE_REQUEST = 'USERS_UPDATE_REQUEST'
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS'
export const USERS_UPDATE_FAIL = 'USERS_UPDATE_FAIL'
export const USERS_GET_REQUEST = 'USERS_GET_REQUEST'
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS'
export const USERS_GET_FAIL = 'USERS_GET_FAIL'
export const USERS_SELECT = 'USERS_SELECT'
export const USERS_BULK_SELECT = 'USERS_BULK_SELECT'
export const USERS_SET_FILTER = 'USERS_SET_FILTER'
export const USERS_SET_PAGE = 'USERS_SET_PAGE'
// QB Dialogs
export const DIALOGS_SET_FILTER = 'DIALOGS_SET_FILTER'
export const DIALOGS_UNREAD_COUNT_INCREMENT = 'DIALOGS_UNREAD_COUNT_INCREMENT'
export const DIALOGS_UNREAD_COUNT_DECREMENT = 'DIALOGS_UNREAD_COUNT_DECREMENT'
export const DIALOGS_GET_REQUEST = 'DIALOGS_GET_REQUEST'
export const DIALOGS_GET_SUCCESS = 'DIALOGS_GET_SUCCESS'
export const DIALOGS_GET_FAIL = 'DIALOGS_GET_FAIL'
export const DIALOGS_CREATE_REQUEST = 'DIALOGS_CREATE_REQUEST'
export const DIALOGS_CREATE_SUCCESS = 'DIALOGS_CREATE_SUCCESS'
export const DIALOGS_CREATE_FAIL = 'DIALOGS_CREATE_FAIL'
export const DIALOGS_CREATE_CANCEL = 'DIALOGS_CREATE_CANCEL'
export const DIALOGS_EDIT_REQUEST = 'DIALOGS_EDIT_REQUEST'
export const DIALOGS_EDIT_SUCCESS = 'DIALOGS_EDIT_SUCCESS'
export const DIALOGS_EDIT_FAIL = 'DIALOGS_EDIT_FAIL'
export const DIALOGS_EDIT_CANCEL = 'DIALOGS_EDIT_CANCEL'
export const DIALOGS_JOIN_REQUEST = 'DIALOGS_JOIN_REQUEST'
export const DIALOGS_JOIN_SUCCESS = 'DIALOGS_JOIN_SUCCESS'
export const DIALOGS_JOIN_FAIL = 'DIALOGS_JOIN_FAIL'
export const DIALOGS_LEAVE_REQUEST = 'DIALOGS_LEAVE_REQUEST'
export const DIALOGS_LEAVE_SUCCESS = 'DIALOGS_LEAVE_SUCCESS'
export const DIALOGS_LEAVE_FAIL = 'DIALOGS_LEAVE_FAIL'
export const DIALOGS_DELETE_REQUEST = 'DIALOGS_DELETE_REQUEST'
export const DIALOGS_DELETE_SUCCESS = 'DIALOGS_DELETE_SUCCESS'
export const DIALOGS_DELETE_FAIL = 'DIALOGS_DELETE_FAIL'
export const DIALOGS_SELECT = 'DIALOGS_SELECT'
export const DIALOGS_SELECT_RESET = 'DIALOGS_SELECT_RESET'
// QB Messages
export const MESSAGES_GET_REQUEST = 'MESSAGES_GET_REQUEST'
export const MESSAGES_GET_SUCCESS = 'MESSAGES_GET_SUCCESS'
export const MESSAGES_GET_FAIL = 'MESSAGES_GET_FAIL'
export const MESSAGES_MARK_READ_REQUEST = 'MESSAGES_MARK_READ_REQUEST'
export const MESSAGES_MARK_READ_SUCCESS = 'MESSAGES_MARK_READ_SUCCESS'
export const MESSAGES_MARK_READ_FAIL = 'MESSAGES_MARK_READ_FAIL'
export const MESSAGES_MARK_DELIVERED_REQUEST = 'MESSAGES_MARK_DELIVERED_REQUEST'
export const MESSAGES_MARK_DELIVERED_SUCCESS = 'MESSAGES_MARK_DELIVERED_SUCCESS'
export const MESSAGES_MARK_DELIVERED_FAIL = 'MESSAGES_MARK_DELIVERED_FAIL'
export const MESSAGES_SEND_REQUEST = 'MESSAGES_SEND_REQUEST'
export const MESSAGES_SEND_SUCCESS = 'MESSAGES_SEND_SUCCESS'
export const MESSAGES_SEND_FAIL = 'MESSAGES_SEND_FAIL'
export const MESSAGES_SYSTEM_SEND_REQUEST = 'MESSAGES_SYSTEM_SEND_REQUEST'
export const MESSAGES_SYSTEM_SEND_SUCCESS = 'MESSAGES_SYSTEM_SEND_SUCCESS'
export const MESSAGES_SYSTEM_SEND_FAIL = 'MESSAGES_SYSTEM_SEND_FAIL'
// QB file
export const FILE_UPLOAD_REQUEST = 'FILE_UPLOAD_REQUEST'
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS'
export const FILE_UPLOAD_FAIL = 'FILE_UPLOAD_FAIL'
export const FILE_GET_INFO_REQUEST = 'FILE_GET_INFO_REQUEST'
export const FILE_GET_INFO_SUCCESS = 'FILE_GET_INFO_SUCCESS'
export const FILE_GET_INFO_FAIL = 'FILE_GET_INFO_FAIL'
export const FILE_PUBLIC_URL_REQUEST = 'FILE_PUBLIC_URL_REQUEST'
export const FILE_PUBLIC_URL_SUCCESS = 'FILE_PUBLIC_URL_SUCCESS'
export const FILE_PUBLIC_URL_FAIL = 'FILE_PUBLIC_URL_FAIL'
export const FILE_PRIVATE_URL_REQUEST = 'FILE_PRIVATE_URL_REQUEST'
export const FILE_PRIVATE_URL_SUCCESS = 'FILE_PRIVATE_URL_SUCCESS'
export const FILE_PRIVATE_URL_FAIL = 'FILE_PRIVATE_URL_FAIL'
// QB Info
export const GET_INFO_REQUEST = 'GET_INFO_REQUEST'
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS'
export const GET_INFO_FAIL = 'GET_INFO_FAIL'

// Device UDID for Push notifications
export const DEVICE_UDID_SET = 'DEVICE_UDID_SET'
export const DEVICE_UDID_REMOVE = 'DEVICE_UDID_REMOVE'

//My Profile'
export const MY_PROFILE_REQUEST = 'MY_PROFILE_REQUEST'
export const MY_PROFILE_SUCCESS = 'MY_PROFILE_SUCCESS'
export const MY_PROFILE_FAIL = 'MY_PROFILE_FAIL'

//ONLINE STATUS

export const CHANGE_RESTRO_ONLINE_STATUS_REQUEST = 'CHANGE_RESTRO_ONLINE_STATUS_REQUEST'
export const CHANGE_RESTRO_ONLINE_STATUS_SUCCESS = 'CHANGE_RESTRO_ONLINE_STATUS_SUCCESS'
export const CHANGE_RESTRO_ONLINE_STATUS_FAIL = 'CHANGE_RESTRO_ONLINE_STATUS_FAIL'
