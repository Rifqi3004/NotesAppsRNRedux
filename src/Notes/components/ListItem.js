import React from 'react'
import {View, Text, } from 'react-native'
import { ListItem, Icon, Left, Body, Switch, Radio , CheckBox} from 'native-base'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import { addSelectedDelete, removeSelectedDelete } from "../../Public/redux/actions/notes"
import {formatDate} from "./functionPublic"
class ListComponent extends React.Component{

    constructor(){
      super()
      this.state = {
        chekthis : false,
        date : ''
      }
    }
        
    componentDidMount(){  
     this.setState({date : formatDate(this.props.datalist.date)})

   }

   selectedDelete(){
      (this.state.chekthis == false)?
        this.setState({chekthis : true }) &
        this.props.dispatch(addSelectedDelete(this.props.datalist.id))
      :
      this.setState({chekthis : false })
      &
        this.props.dispatch(removeSelectedDelete(this.props.datalist.id))
   }
    render(){
        const data = this.props.datalist
        const chek = this.props.chekall
        const {navigate} = this.props.navigation
        const notsplit = data.notes.split('\n');
        const cekline = data.notes.length;
        const self = this
        return(
          <ListItem style={{ backgroundColor:'#f2f2f2' ,  paddingLeft : 15, paddingRight : 15}} 
          onPress={            
            () => 
            (this.props.deletelist == true)? this.selectedDelete() :
            navigate('EditNote',{data})
          }
          >
           
            <View style={{ flex:1,  flexDirection : 'row' }}>
            {
              (this.props.deletelist == true) ?
              (<View style={{ flex : 1, alignItems : 'center'}}>
                <CheckBox checked={
                  (this.props.data.itemDelete.length >0)?
                    this.state.chekthis : false
                } 
                onPress={()=>this.selectedDelete()} />
              </View>)
              :
              (<View />)
              
              
            }
              <View style={{ flex : 5, flexDirection : 'column' }}>
                <View style={{ flex :2 }}>
                  <Text style={{ fontWeight : 'bold' }} numberOfLines={1}>
                    {data.notes}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection : 'row' }}>
                  <View style={{ flex:1, marginTop : 5, marginRight : 10 }}>
                    <Text style={{ fontSize : 12, color: 'grey' }} numberOfLines={1}>
                      {this.state.date}
                    </Text>
                  </View>
                  <View style={{ flex:1, margin : 5 }}>
                    <Text style={{ fontSize : 12, color: 'grey' }} numberOfLines={1}>
                        {
                          (notsplit.length < 1)?
                          'No Adtional Text' :
                          notsplit[1]
                        }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ListItem>
        )
    }
}
const mapStateToProps = (state) => ({
  data : state.notes
})
export default connect(mapStateToProps)(withNavigation(ListComponent))