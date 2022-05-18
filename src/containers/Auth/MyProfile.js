import { connect } from 'react-redux';
import MyProfile from '../../components/Auth/MyProfile'
import {
    myProfileApi,
    countryList,
    stateList,
    cityList,
    regionList,
    stateClearList,
    countryClearList,
    cityClearList,
    regionClearList,
    listSignupCategoryApi
} from '../../thunks'

const mapStateToProps = ({ MyProfile, LocationList }) => ({
    loading: LocationList.loading,
    myProfile: LocationList.myProfile,
    country: LocationList.country,
    stateData: LocationList.stateData,
    city: LocationList.city,
    region: LocationList.region,
    listSignupCategories: LocationList.listSignupCategories,
})

const mapDispatchToProps = {
    myProfileApi: myProfileApi,
    countryList: countryList,
    stateList: stateList,
    cityList: cityList,
    regionList: regionList,
    stateClearList: stateClearList,
    countryClearList: countryClearList,
    cityClearList: cityClearList,
    regionClearList: regionClearList,
    listSignupCategoryApi: listSignupCategoryApi
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);