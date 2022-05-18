import { connect } from 'react-redux';

import ProductManagement from '../../components/Auth/ProductManagement';
//import ProductType from '../../components/Auth/ProductType';



import { listProductApi, listProductTypeApi } from '../../thunks'


const mapStateToProps = ({ ProductManagement, ProductType }) => ({
    loading: ProductManagement.loading,
    listProduct: ProductManagement.listProduct,
    listProductType: ProductType.listProductType

})

const mapDispatchToProps = {
    listProductApi: listProductApi,
    listProductTypeApi: listProductTypeApi

}




export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement);