import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CheckBox} from 'native-base'
import {withNavigation} from 'react-navigation'
import {formatDate} from "./functionPublic"
import {connect} from 'react-redux'
import { addSelectedDelete, removeSelectedDelete } from "../../Public/redux/actions/notes"

class GridComponent extends Component {
  
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
//function Select Item Notes for Delete
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
    return(
        <Card style={{ width : '45%', borderRadius : 5 , padding : 10, marginLeft : 10, marginRight : 10}}>
            <TouchableOpacity
             onPress={            
                () => 
                (this.props.deletelist == true)? this.selectedDelete() :
                this.props.navigation.navigate('EditNote',{data})
              }
            >
                <View style={{ flex: 1, }} >
                    <View style={{ flex: 1,alignItems : 'center', justifyContent : 'center'  }}>
                        <Text numberOfLines={4}>
                            {this.props.datalist.notes}
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection : 'row' }}>
                        <View style={{ flex: 1 ,alignItems: 'flex-start', justifyContent : 'center', marginTop:10 }}>
                            <Text style={{ color : 'grey', fontSize : 12 }}>
                                {
                                this.state.date
                                }
                            </Text>
                        </View>
                        {
                                (this.props.deletelist == true) ?
                                (<View style={{ flex : 1, alignItems: 'flex-end', justifyContent : 'center', marginTop:10, paddingRight : 15 }}>
                                <CheckBox checked={
                                    (this.props.data.itemDelete.length >0)?
                                    this.state.chekthis : false
                                } 
                                onPress={()=>this.selectedDelete()}
                                style={{backgroundColor : (this.state.chekthis == true)?'#ed6a07':'transparent', borderColor : '#ed6a07'}}
                                />
                                </View>)
                                :
                                (<View />)                            
                                
                            }
                    </View>
                </View>
       
            </TouchableOpacity>
        </Card> 
    )
}
  
}

const mapStateToProps = (state) => ({
    data : state.notes
  })
  export default connect(mapStateToProps)(withNavigation(GridComponent))
