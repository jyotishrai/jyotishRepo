import { connect } from 'react-redux';

import Order from '../../../components/Auth/Orders'
import { listOrderApi } from '../../../thunks'

const mapStateToProps = ({ Order }) => ({
    loading: Order.loading,
    listOrder: Order.listOrder
})

const mapDispatchToProps = {
    listOrderApi: listOrderApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);