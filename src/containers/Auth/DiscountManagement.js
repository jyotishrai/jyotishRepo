import { connect } from 'react-redux'

import DiscountManagement from '../../components/Auth/DiscountManagement'
import {
    callDiscountApi,
    editDiscountApi
} from '../../thunks'

const mapStateToProps = ({ DiscountManagement }) => ({
    loading: DiscountManagement.loading,
    discountDetails: DiscountManagement.discountDetails,
    editDiscount: DiscountManagement.editDiscount


})

const mapDispatchToProps = {
    callDiscountApi: callDiscountApi,
    editDiscountApi: editDiscountApi,

}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManagement);