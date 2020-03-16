import React from 'react';
import { StyleSheet, Text, View, Vibration, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  work=25*60;
  rest=5*60;
  modeWork=true;
  timerId;
  state=({count:this.work,
  isRunning:false,
buttonTitle:"Start"});
  timer=()=>{
    if(this.state.count===0){
      Vibration.vibrate(500);
      if(this.modeWork){
        this.setState({count:this.rest});
        this.modeWork=false;
      }
      else{
        this.setState({count:this.work}); 
        this.modeWork=true;
      }
    }
    else{
      this.setState({count:this.state.count-1});
    }
  }

  start = ()=>{
    if(this.state.isRunning==false){
      this.setState({
        isRunning:true,
        buttonTitle:"Pause"
      })
     this.stop();
    this.timerId =setInterval(this.timer,1000);
    }
    else{
      this.setState({
        isRunning:false,
        buttonTitle:"Start"
      })
    this.stop();
    }

  }
  separate= ()=>{
    let min=parseInt(this.state.count/60);
    let sec=parseInt(this.state.count%60);
     if (min < 10) {
  min= '0' + min;
 }
 if (sec < 10) {
   sec= '0' + sec;
    }
    return `${min} : ${sec}`
  }
  stop=()=>{
    clearInterval(this.timerId);
      }
  reset=()=>{
    this.stop();
    this.setState({count:this.work});
    this.modeWork=true;

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>POMODORO TIMER!</Text>
        <Text style={styles.clock}>{this.separate()}</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity  onPress={this.start} style={styles.TouchableOpacityStyle}>
            <Text>{this.state.buttonTitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.reset} style={styles.TouchableOpacityStyle}>
            <Text>Reset</Text>
          </TouchableOpacity>
        
     
      
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:30
  },
  clock:{
    fontWeight:"bold",
    fontSize:44
  },
  buttonView:{
    display:"flex",
    flexDirection:"row"
  },
  TouchableOpacityStyle: {
   
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:50,
    margin:10,
    width:60,
    justifyContent:"center"

  
  },
});
