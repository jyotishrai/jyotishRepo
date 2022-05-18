import { connect } from 'react-redux';
import CouponManagement from '../../components/Auth/CouponManagement'
import { listCouponCodeApi } from '../../thunks'

const mapStateToProps = ({ CouponManagement }) => ({
    loading: CouponManagement.loading,
    listCouponCode: CouponManagement.listCouponCode
})


const mapDispatchToProps = {
    listCouponCodeApi: listCouponCodeApi
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponManagement);