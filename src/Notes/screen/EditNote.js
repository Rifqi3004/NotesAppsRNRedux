import React, { Component } from 'react';
import { View, Text , TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
    Container, Content, Form, Textarea, Icon, Header,
    Left, Body, Right, Footer, List, ListItem, Grid, Card
  } from 'native-base'
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {withNavigation} from 'react-navigation'


 class EditNotes extends Component {
nowdate = new Date()


  constructor(props) {
    super(props);
    this.state = {
        id : this.props.navigation.state.params.data.id,
        text : this.props.navigation.state.params.data.notes,
        date : this.nowdate.toDateString(),
        tanggal : ''
        
    };
  }

//function close and/or save with button back
 editNoteButtonClose = () => {    
    if(this.state.text == '' || this.state.text == this.props.navigation.state.params.data.notes){
        this.props.navigation.navigate('Notes') 
    }else{
        let dataNote = {
            id : this.state.id,
            notes : this.state.text,
            date : this.nowdate
        }
           
        this.props.editNote(dataNote).then(() => {
            this.props.navigation.navigate('Notes') 
        })   
        
    }        
    
 }
 
 //function close and/or save with back handler android
 editNoteBackHandler = () => {   
    if(this.state.text == '' || this.state.text == this.props.navigation.state.params.data.notes){
        this.props.navigation.navigate('Notes') 
    }else{
        let dataNote = {
            id : this.state.id,
            notes : this.state.text,
            date : this.nowdate
        }
           
        this.props.editNote(dataNote).then(() => {
            this.props.navigation.navigate('Notes') 
        })   
        
    }  
    
    return true
    
}



  render() {
    const data = this.props.navigation.state.params.data

    return (
        <AndroidBackHandler
         onBackPress={
             ()=> this.editNoteBackHandler()
         }
        >
         {this.props.data.isLoading==true ? <ActivityIndicator /> : null}
            <Container>
                <Header style={Style.header} androidStatusBarColor="#d3d3d3">
                <Left>
                    <TouchableOpacity
                    onPress={
                        () => this.editNoteButtonClose()
                    }
                    >
                    <Icon name="ios-arrow-back" style={Style.IconHeader} />
                    </TouchableOpacity>
                </Left>
                <Right>
                <TouchableOpacity
                    onPress={
                        () => alert('aw aw aw ')
                    }
                >
                    <Icon name="share" style={Style.fontHeader} />
                    </TouchableOpacity>
                </Right>
                </Header>
                <Content>
                    <Form>
                    <Textarea 
                           style={{textAlign : 'left',}}
                            rowSpan={500}
                            value={this.state.text}
                            onChangeText = {
                                (text) => this.setState({
                                    text : text
                                })
                            }
                            autoFocus={true}
                            placeholder={this.state.tanggal}
                            
                        />
                    </Form>
                </Content>
            </Container>
  
        </AndroidBackHandler>
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


  export default withNavigation(EditNotes)