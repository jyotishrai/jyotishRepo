import { connect } from 'react-redux';

import PreParing from '../../../components/Auth/Order/PreParing'
import { listOrderApi, changeOrderStatusApi } from '../../../thunks'

const mapStateToProps = ({ Order }) => ({
    loading: Order.loading,
    preparingListOrder: Order.preparingListOrder,
    changeOrderStatus: Order.changeOrderStatus,
    preparingLoading: Order.preparingLoading,
})

const mapDispatchToProps = {
    listOrderApi: listOrderApi,
    changeOrderStatusApi: changeOrderStatusApi
}

export default connect(mapStateToProps, mapDispatchToProps)(PreParing);