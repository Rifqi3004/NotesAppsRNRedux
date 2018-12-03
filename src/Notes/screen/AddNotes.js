import React, { Component } from 'react';
import { View, Text , TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
    Container, Content, Form, Textarea, Icon, Header,
    Left, Body, Right, Footer, List, ListItem, Grid, Card
  } from 'native-base'
import { AndroidBackHandler } from 'react-navigation-backhandler';
import uuid from 'uuid'
import axios from 'axios'

export default class AddNotes extends Component {
nowdate = new Date()

  constructor(props) {
    super(props);
    this.state = {
        id : 1,
        text : '',
        date : this.nowdate.toDateString(),
        tanggal : '',
        inputstyle : 'center'
        
    };
  }

  getdate(){
    var month = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September",
        "Oktober", "November", "Desember"
    ]
    var d = new Date();
    var h = d.getDay()
    var n = month[d.getMonth()]
    var y = d.getFullYear()
    var s = d.getSeconds(), i= d.getMinutes(), h = d.getHours()
    var tgl = `${h} ${n} ${y} ${h}:${i}:${s}`
    this.setState({
        tanggal : (h+" "+n+" "+y+" "+h+":"+i+":"+s)
    })
     
 }
 
 componentDidMount(){
   
    var month = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September",
        "Oktober", "November", "Desember"
    ]
    var d = new Date();
    var h = d.getDay()
    var n = month[d.getMonth()]
    var y = d.getFullYear()
    var s = d.getSeconds(), i= d.getMinutes(), h = d.getHours()
    var tgl = `${h} ${n} ${y} ${h}:${i}:${s}`
    this.setState({
        tanggal : tgl
    })
 }
 

 addNoteButtonClose = () => {    
    if(this.state.text == ''){
        this.props.navigation.navigate('Notes') 
    }else{
        let dataNote = {
            id : uuid(),
            notes : this.state.text,
            date : this.nowdate
        }
        const self =this    
        this.props.addNote(dataNote).then(() => {
            this.props.navigation.navigate('Notes') 
        })   
        
    }        
    
 }
 
 addNoteBackHandler = () => {   
    if(this.state.text == ''){
        this.props.navigation.navigate('Notes') 
    }else{
        let dataNote = {
            id : uuid(),
            notes : this.state.text,
            date : this.nowdate
        }
        const self =this    
        this.props.addNote(dataNote).then(() => {
            this.props.navigation.navigate('Notes') 
        })   
        
    }  
    return true
    
}



  render() {
      
    return (
        
        <AndroidBackHandler
         onBackPress={
             ()=> this.addNoteBackHandler()
         }
        >
            {this.props.data.isLoading==true ? <ActivityIndicator /> : null}
            <Container>
                <Header style={styles.header} androidStatusBarColor="#d3d3d3">
                <TouchableOpacity
                    onPress={
                        () => this.addNoteButtonClose()
                    }
                    >
                    <Left>                  
                        <Icon name="ios-arrow-back" style={styles.IconHeader} />
                        
                    </Left>
                </TouchableOpacity>
                <Right>
                <TouchableOpacity
                    onPress={
                        () => alert('aw aw aw ')
                    }
                >
                    <Icon name="share" style={styles.fontHeader} />
                    </TouchableOpacity>
                </Right>
                </Header>
                <Content>
                    <Form>
                        <Textarea 
                            style={{textAlign : this.state.inputstyle}}
                            onFocus={() => this.setState({inputstyle : 'left', tanggal : ''})}
                            rowSpan={500}
                            onChangeText = {
                                (text) => this.setState({
                                    text : text
                                })
                            }
                            placeholder={this.state.tanggal}
                            
                        />
                    </Form>
                </Content>
            </Container>
  
        </AndroidBackHandler>
    );
  }
}
const styles = StyleSheet.create({
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