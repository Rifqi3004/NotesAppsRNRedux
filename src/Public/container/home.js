import HomeScreen from "../../Home/screen/index"
import { connect } from 'react-redux'
import {getData , addDatas} from "../redux/actions/getdata"
import {delNotes, delSelect, addItem, delItem} from "../redux/actions/notes"
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