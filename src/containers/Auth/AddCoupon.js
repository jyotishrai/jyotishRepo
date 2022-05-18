import { connect } from 'react-redux';
import AddCoupon from '../../components/Auth/AddCoupon'
import { addCouponCodeApi, editCouponCodeApi } from '../../thunks'

const mapStateToProps = ({ AddCoupon }) => ({
    loading: AddCoupon.loading,
    addCouponCode: AddCoupon.addCouponCode,
    editCouponCode: AddCoupon.editCouponCode
})

const mapDispatchToProps = {
    addCouponCodeApi: addCouponCodeApi,
    editCouponCodeApi: editCouponCodeApi
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCoupon);