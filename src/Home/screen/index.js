import React, { Component } from 'react';
import { View, Text , TouchableOpacity, StyleSheet, ListView, FlatList,
Alert} from 'react-native';
import {
  Container, Content, Form, Textarea, Button, Icon, Header,
  Left, Body, Right, Footer, List, ListItem, Grid, Card
} from 'native-base'
import ListComponent from "../components/ListItem"
import GridComponent from "../components/GridList"
import axios from 'axios'


class IndexHome extends Component {
 datt = new Date()
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2});
    this.state = {
      basic : true,
      listViewData : [],
      grid : false,
      deletelist : false,
      chekall : false,
      date : '',
      payload :{
        id : 1,
        data : this.datt,
        notes : 'asdasdasd'
      },
      gtd : []
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

  renderItem = ({item, index}) => {
    const dt = this.formatDate(item.date)    
    return(
      <Card style={{ width : '45%', borderRadius : 20 , padding : 10}} key={index}>
          <View style={{ flex: 1, }} >
            <View style={{ flex: 1,alignItems : 'center', justifyContent : 'center'  }}>
                <Text numberOfLines={4}>
                  {item.notes}
                </Text>
            </View>
            <View style={{ flex: 1 ,alignItems: 'center', justifyContent : 'center', marginTop:10 }}>
                <Text style={{ color : 'grey', fontSize : 12 }}>
                  {
                    dt
                  }
                </Text>
            </View>
          </View>
      </Card> 
    )
  }

  changeGrid(){
    
    this.setState({
      grid : (this.state.grid == false) ? true : false
    })   
   
  }
  
  delOne(data){
    Alert.alert(
      'Yakin Mau Hapus Data ini?',
      null,
      [       
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.props.deleteSelect(data.id)
        },
      ],
      { cancelable: false }
    )
    
  }
  

  cekGrid = ()=> {
    if(this.state.grid == true){
      return(
          <FlatList style={{ alignItems : 'center' }}
          data={this.props.data}
          style={{ flex:1, marginVertical :20 }}
          renderItem={this.renderItem}
          numColumns={2}
          />
        )
    }else{
      return(
          <List              
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.props.data)}
              renderRow={data => 
                <ListComponent datalist={data}
                deletelist={this.state.deletelist}
                chekall={this.state.chekall}
                />
              }
              renderRightHiddenRow ={ (data, secId, rowId, rowMap) => 
                <Button style={{ backgroundColor : '#f0f0f0' }}
                  full onPress={() => this.delOne(data) &&
                    rowMap[`${secId}${rowId}`].props.closeRow()            
                  }
                >
                  <Icon name="trash" active style={{ color: '#ef4747' }}/>
                </Button>
              }
            >
              
          </List>
             
      )
    }
  }

  visedit(){
    this.setState({
      deletelist : true
    })
  }

  desedit(){
    this.setState({
      deletelist : false
    })
  }

  deletesNotes(){
    Alert.alert(
      'Yakin Mau Hapus Semua Data',
      null,
      [       
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.props.deleteNotes() && this.setState({deletelist : false})},
      ],
      { cancelable: false }
    )
  }
  delSelect(){
    Alert.alert(
      'Yakin Mau Hapus Data Terpilih',
      null,
      [       
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
         this.props.itemdel.map(item => {
           this.props.deleteSelect(item.id)
         })
        
        && this.setState({deletelist : false})},
      ],
      { cancelable: false }
    )
  }
  render() {
    
    const ds = new ListView.DataSource({ rowHasChanged : (r1, r2) => r1 !== r2 })
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Header style={Style.header} androidStatusBarColor="#d3d3d3">
          <Left>          
              <TouchableOpacity>
                <Icon name="ios-arrow-back" style={Style.IconHeader} />
              </TouchableOpacity>
            
          </Left>
          <Right>
            {
              (this.state.deletelist == false)?
                <TouchableOpacity
                  onPress={()=>this.visedit()}
                >
                  <Text style={Style.fontHeader}  >
                    Edit
                  </Text>
                </TouchableOpacity>
               :
                <TouchableOpacity
                  onPress={()=>this.desedit()}
                >
                  <Text style={Style.fontHeader}  >
                    Batal
                  </Text>
                </TouchableOpacity>
            }
          </Right>
        </Header>
        <Content style={Style.notes}>
          {
            this.cekGrid()
            
          }
        </Content>
        <Footer style={Style.footer}>
          <Left style={{ alignContent :'center', alignItems :'center', justifyContent : 'center' }}>
            <TouchableOpacity onPress=
            {
              () => this.changeGrid()
            }
            
            >
               <View
                style={{
                  width : 200,
                  alignItems : 'center'
                }}
               >
                <Icon name={
                    (this.state.grid == false) ?
                    'grid' : 'more'
                  } style={Style.IconHeader} />
               </View>
            </TouchableOpacity>
          </Left>
          <Body style={{ alignItems : 'center', justifyContent : 'center' }}>
            <Text style={Style.FontFooter}>
               {
                 (this.props.data.length <=1)? this.props.data.length + ' Note' :
                 this.props.data.length+' Notes'
               } 
            </Text>
          </Body>
          <Right style={{ paddingRight : 10 }}>
            {
              (this.state.deletelist == false)?
                <TouchableOpacity
                  onPress=
                  {
                    () => navigate('NoteScreen')
                  }
                >
                    <Icon name="ios-add-circle-outline" style={Style.IconHeader} />
                </TouchableOpacity>
              :
              (this.props.itemdel.length >=1) ?
                  <TouchableOpacity
                  onPress ={
                    () => this.delSelect()
                  }
                  >
                      <Text style={Style.fontHeader}>
                      Delete
                      </Text>
                  </TouchableOpacity>
                :
                <TouchableOpacity
                onPress ={
                  () => this.deletesNotes()
                }
                >
                    <Text style={Style.fontHeader}>
                    Delete all
                    </Text>
                </TouchableOpacity>
                
            }
          </Right>
        </Footer>
      </Container>
    );
  }
}


const Style = StyleSheet.create({
  header : {
    justifyContent : 'center',
    padding : 5,
    backgroundColor: "#d3d3d3",
  },
  IconHeader : {
    fontSize : 30,
    fontWeight :'bold',
    color : '#ed6a07',
  },
  fontHeader : {
    fontSize : 20,
    fontWeight :'bold',
    color : '#ed6a07',
    textAlign : 'center',
    justifyContent : 'center'
  },
  Content : {
    padding : 10,
    backgroundColor : '#f2f2f2'
  }, 
  FontFooter : { 
    textAlign : 'center',
     fontWeight : 'bold', 
     fontSize : 16
    },
  footer : {
    justifyContent : 'center',
    padding : 5,
    backgroundColor: "#d3d3d3",
    }
})

export default IndexHome