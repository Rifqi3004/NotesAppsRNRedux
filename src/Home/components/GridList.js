import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Grid, Row, Col, Card} from 'native-base'
export default class GridList extends Component {
  
  constructor(){
    super()
    this.state = {
      chekthis : false,
      date : ''
    }
  }
  
  formatDate = (date) => {
    var date = new Date(date);
    var today = new Date();
    // custom date for check
    // var date = new Date("Sat Nov 24 2018 07:00:00 GMT+0700 (WIB)");

    // check if today
    if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "Today"
    }

    // check if less less than 7 days and return day name
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.round(Math.abs((today.getTime() - date.getTime()) / (oneDay)));

    if (diffDays < 7) {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[date.getDay()];

    } else {
        // if more than 6 days return format
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yy = date.getFullYear().toString().substr(-2);

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return dd + '/' + mm + '/' + yy;
    }
}

  componentDidMount(){  
   this.setState({date : this.formatDate(this.props.date)})

 }

render(){
    return(
      <Card style={{ width : '45%', borderRadius : 20 , padding : 10}} >
          <View style={{ flex: 1, }} >
            <View style={{ flex: 1,alignItems : 'center', justifyContent : 'center'  }}>
                <Text numberOfLines={4}>
                  {this.props.notes}
                </Text>
            </View>
            <View style={{ flex: 1 ,alignItems: 'center', justifyContent : 'center', marginTop:10 }}>
                <Text style={{ color : 'grey', fontSize : 12 }}>
                  {this.state.date}
                </Text>
            </View>
          </View>
      </Card> 
    )
}
  
}
