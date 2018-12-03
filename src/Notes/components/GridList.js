import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Grid, Row, Col, Card} from 'native-base'
import {formatDate} from "./functionPublic"
export default class GridList extends Component {
  
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

render(){
    return(
        <Card style={{ width : '45%', borderRadius : 20 , padding : 10, marginLeft : 10, marginRight : 10}}>
            <View style={{ flex: 1, }} >
                <View style={{ flex: 1,alignItems : 'center', justifyContent : 'center'  }}>
                    <Text numberOfLines={1}>
                        {this.props.datalist.notes}
                    </Text>
                </View>
                <View style={{ flex: 1 ,alignItems: 'center', justifyContent : 'center', marginTop:10 }}>
                    <Text style={{ color : 'grey', fontSize : 12 }}>
                        {
                        this.state.date
                        }
                    </Text>
                </View>
            </View>
        </Card> 
    )
}
  
}
