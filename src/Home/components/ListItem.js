import React from 'react'
import {View, Text, } from 'react-native'
import { ListItem, Icon, Left, Body, Switch, Radio , CheckBox} from 'native-base'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {addItem, delItem} from "../../Public/redux/actions/notes"
class ListComponent extends React.Component{

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
     this.setState({date : this.formatDate(this.props.datalist.date)})

   }

   actionItem(){
      (this.state.chekthis == false)?
        this.setState({chekthis : true }) &
        this.props.dispatch(addItem(this.props.datalist.id))
      :
      this.setState({chekthis : false })
      &
        this.props.dispatch(delItem(this.props.datalist.id))
   }
    render(){
        const data = this.props.datalist
        const chek = this.props.chekall
        const {navigate} = this.props.navigation
        const notsplit = data.notes.split('\n');
        const cekline = data.notes.length;
        const self = this
        return(
          <ListItem style={{ backgroundColor:'#f2f2f2' }} 
          onPress={            
            () => 
            (this.props.deletelist == true)? this.actionItem() :
            navigate('EditScreen',{data})
          }
          >
           
            <View style={{ flex:1,  flexDirection : 'row' }}>
            {
              (this.props.deletelist == true) ?
              (<View style={{ flex : 1, alignItems : 'center'}}>
                <CheckBox checked={
                  (chek == true) ? true                 
                  : this.state.chekthis 
                } 
                onPress={()=>this.actionItem()} />
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
                  <View style={{ flex:1, margin : 5, marginRight : 10 }}>
                    <Text style={{ fontSize : 12, color: 'grey' }} numberOfLines={1}>
                      {this.state.date}
                    </Text>
                  </View>
                  <View style={{ flex:1, margin : 5 }}>
                    <Text style={{ fontSize : 12, color: 'grey' }} numberOfLines={1}>
                        {
                          (cekline > 200)?
                            (notsplit[1] == '' )?
                            'No additional text' :
                             notsplit[1]
                           :
                             'No additional text'
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

export default connect()(withNavigation(ListComponent))