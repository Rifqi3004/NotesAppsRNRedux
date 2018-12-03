import HomeScreen from "../screen/Home"
import { connect } from 'react-redux'
import {delNotes, delSelect, addItem, delItem} from "../../Public/redux/actions/home"
const homeProps = (state) => ({
    data :state.home,
    cek : "INI PROPS CEK",
    itemdel : state.item
})

const mapDispatchToProps = (dispatch )=> ({    
    addData : () => dispatch(addDatas()),
    getData : () => dispatch(getData()),
    deleteNotes : () => dispatch(delNotes()),
    deleteSelect : (id) => dispatch(delSelect(id)),
    addItem : (id) => dispatch(addItem(id)),
    delItem : (id) => dispatch(delItem(id))

});

export default connect(homeProps, mapDispatchToProps)(HomeScreen)