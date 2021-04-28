import React from 'react'
import  {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions  from 'expo-permissions'
export default class TransactionSreen extends React.Component{
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermission = async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      hasCameraPermissions:status==='granted'
    })

   
  }
  handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
  }
    render(){
      const hasCameraPermissions= this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState

      if(buttonState === 'clicked'&&hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        )
      }
      else if(buttonState==='normal'){
    return(
      <View style = {styles.container}>
      <Text style = {styles.displaytext}>
        {hasCameraPermissions===true ? this.state.scannedData : "Request camera Permission"}
      </Text>
      <TouchableOpacity style = {styles.scanbutton}
      onPress={this.getCameraPermission}>
        <Text>SCAN QR CODE</Text>
      </TouchableOpacity>
      </View>
    )
    }
}}

const styles = StyleSheet.create({
  container:{
    flex:1,justifyContent:'center',alignItems:'center'
  },
  displaytext:{
    fontSize:20,
    textDecorationLine:'underline'
  },
  scanbutton:{
    backgroundColor:'red',
    margin:10,
    width:100,
    height:50
  }
})