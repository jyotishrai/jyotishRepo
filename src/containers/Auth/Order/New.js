import { connect } from 'react-redux';

import New from '../../../components/Auth/Order/New'
import { listOrderApi, changeOrderStatusApi } from '../../../thunks'

const mapStateToProps = ({ Order }) => ({
    newLoading: Order.newLoading,
    newListOrder: Order.newListOrder,
    changeOrderStatus: Order.changeOrderStatus,
    loading: Order.loading
})

const mapDispatchToProps = {
    listOrderApi: listOrderApi,
    changeOrderStatusApi: changeOrderStatusApi
}

export default connect(mapStateToProps, mapDispatchToProps)(New);