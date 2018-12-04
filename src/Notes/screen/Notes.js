import React, { Component } from 'react';
import { View, Text , TouchableOpacity, StyleSheet, ListView, FlatList,
Alert, ActivityIndicator} from 'react-native';
import {
  Container, Content, Button, Icon, Header,
  Left, Body, Right, Footer, List
} from 'native-base'
import ListComponent from "../components/ListItem"
import GridComponent from "../components/GridList"


class Notes extends Component {
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
    }
  }
  
//function for show or hidden grid view
  changeGrid(){
    
    this.setState({
      grid : (this.state.grid == false) ? true : false
    })   
   
  }
  
//function delete Item Note from list
  deleteItemNote(data){
    Alert.alert(
      'Yakin Mau Hapus Data ini?',
      null,
      [       
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.props.deleteItemNote(data.id)
         
        },
      ],
      { cancelable: false }
    )
    
  }
  
//function hide renderRightHiddenRow after click
  deleteRow = (secId, rowId, rowMap) => {
    // <<<<<<<<<<<<<<<<<<<<<<<<< CONSOLE LOG LATER FOR FIXs
    rowMap[`${secId}${rowId}`].props.closeRow();
  }

//function cek view grid true or false
  cekGrid = ()=> {
    if(this.state.grid == true){
      return(
          <FlatList style={{ alignItems : 'center' , paddingLeft : 15, paddingRight : 15}}
          data={this.props.data.notes}
          style={{ flex:1, marginVertical :20 }}
          renderItem={({item, index}) => (
            <GridComponent datalist={item}/>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          />
        )
    }else{
      return(
          <List              
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.props.data.notes)}
              renderRow={data => 
                <ListComponent datalist={data}
                deletelist={this.state.deletelist}
                chekall={this.state.chekall}
                />
              }
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger
                  style={{ backgroundColor : '#f0f0f0' }}
                  onPress={_ => {
                      this.deleteItemNote(data);
                      this.deleteRow(secId, rowId, rowMap)
                }}>
                    <Icon name="trash" active style={{ color: '#ef4747' }}/>
                </Button>
                
              }
              
              
            >
              
          </List>
             
      )
    }
  }

//actin edit from enable edit
  enableEdit(){
    this.setState({
      deletelist : !this.state.deletelist
    })
  }

//action edit from disable edit
 disableEdit(){
    this.setState({
      deletelist : false
    })
  }

//action delete All notes
  deletesAllNotes(){
    Alert.alert(
      'Yakin Mau Hapus Semua Data',
      null,
      [       
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.props.data.notes.map((item) => {
            this.props.deleteItemNote(item.id)
          })       
        
        && this.setState({deletelist : false})},
      ],
      { cancelable: false }
    )
  }

//action delete with selected item notes
  deleteSelect(){
    Alert.alert(
      'Yakin Mau Hapus Data Terpilih',
      null,
      [       
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
         this.props.data.itemDelete.map(item => {
           this.props.deleteSelectedNote(item)
         })
        
        && this.setState({deletelist : false})},
      ],
      { cancelable: false }
    )
  }

  componentDidMount(){
     this.props.getNotes()
  }
  render() {
    
    const { navigate } = this.props.navigation
    return (
      <Container> 
        {(this.props.data.isLoding == true)? <ActivityIndicator /> : null}
        <Header style={styles.header} androidStatusBarColor="#d3d3d3">
          <Left>          
              <TouchableOpacity>
                <Icon name="ios-arrow-back" style={styles.IconHeader} />
              </TouchableOpacity>
            
          </Left>
          <Body>
            {
              (this.state.deletelist == true)?
                <Text
                    style={styles.fontHeader}
                >
                  {
                  this.props.data.itemDelete.length+" "
                  }
                  Selected
                </Text>
              :null
            }
            
          </Body>
          <Right>
            {
            
              (this.props.data.notes.length > 0)?
                (this.state.deletelist == false)?
                    <TouchableOpacity
                        onPress ={() => this.setState({deletelist : !this.state.deletelist})}
                    >
                        <Text style={styles.fontHeader}  >
                        Edit
                    </Text>
                    </TouchableOpacity>
                  :
                  <TouchableOpacity
                        onPress ={() => 
                          this.props.cancelSelectedDelete() &
                          this.setState({deletelist : !this.state.deletelist})
                      
                      }
                    >
                        <Text style={styles.fontHeader}  >
                        Batal
                    </Text>
                 </TouchableOpacity>
                :
                <Text style={{color : '#f79854',fontSize : 20,
                  fontWeight :'bold',
                  textAlign : 'center',
                  justifyContent : 'center'}}  >
                  Edit
                </Text>
            }
          </Right>
        </Header>
        <Content style={styles.notes}>
          {
            this.cekGrid()
            
          }
        </Content>
        <Footer style={styles.footer}>
          <Left style={{ alignContent :'center', alignItems :'center', justifyContent : 'center' }}>
            {
              (this.state.deletelist == true)?
               null :
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
                     } style={styles.IconHeader} />
                  </View>
               </TouchableOpacity>
            
            }
          </Left>
          <Body style={{ alignItems : 'center', justifyContent : 'center' }}>
            <Text style={styles.FontFooter}>
               {
                 (this.props.data.notes.length <=1)? this.props.data.notes.length + ' Note' :
                 this.props.data.notes.length+' Notes'
               } 
            </Text>
          </Body>
          <Right style={{ paddingRight : 10 }}>
            {
              (this.state.deletelist == false)?
                <TouchableOpacity
                  onPress=
                  {
                    () => navigate('AddNotes')
                  }
                >
                    <Icon name="ios-add-circle-outline" style={styles.IconHeader} />
                </TouchableOpacity>
              :
              (this.props.data.itemDelete.length >=1) ?
                  <TouchableOpacity
                  onPress ={
                    () => this.deleteSelect()
                  }
                  >
                      <Text style={styles.fontHeader}>
                      Delete
                      </Text>
                  </TouchableOpacity>
                :
                <TouchableOpacity
                onPress ={
                  () => this.deletesAllNotes()
                }
                >
                    <Text style={styles.fontHeader}>
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


const styles= StyleSheet.create({
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

export default Notes