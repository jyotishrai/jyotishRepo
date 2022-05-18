import { connect } from 'react-redux';
import AddProduct from '../../components/Auth/AddProduct';
import { listAddProductTypeApi, addProductApi, updateProductApi } from '../../thunks'

const mapStateToProps = ({ AddProduct }) => ({
    loading: AddProduct.loading,
    productType: AddProduct.productType,
    addProduct: AddProduct.addProduct,
    updateProduct: AddProduct.updateProduct
})

const mapDispatchToProps = {
    listAddProductTypeApi: listAddProductTypeApi,
    addProductApi: addProductApi,
    updateProductApi: updateProductApi
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);