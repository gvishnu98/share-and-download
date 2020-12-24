import React from "react";
import {
    View,
    Dimensions,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Share
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import *as FileSystem from 'expo-file-system';
import *as MediaLibrary from 'expo-media-library';
import *as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
    
    backgroundView: {
        flex: 1,
        backgroundColor: "#0C948A",
    },
    bottomView: {
        width: '100%',
        height: "91%",
        backgroundColor: '#F6F6F6',
        position: 'absolute', 
        bottom: 0, 
    },
    button: {
        alignItems: "center",
        height:45,
        padding: 10,
        marginTop:0,
        marginLeft:20,
        marginRight:20,
        marginBottom:25,
        borderRadius:10,
        borderWidth:2,
        borderColor:"#0C948A",
        flexDirection:"row",
        justifyContent: "center" 
      },
     
      text: {
          color:'#0C948A',
          fontSize:16,
          fontWeight:'bold',
          marginLeft:10,
      }
    
});

export default function App() {

    const share = async () => {
        try{
            const result = await Share.share({
                message: 'hjhjh',
                uri:"https://www.schengenvisainfo.com/wp-content/uploads/2020/02/Schengen-Visa-Application-Form-2020.png"
            });

            if(result.action === Share.sharedAction){
                alert('post shared')
            }else if(result.action === Share.dismissedAction){
                alert('post cancelled')
            }
        }catch(error){
            alert(error.message);
        }
    };

    const downloadFile=()=>{
        const uri = "https://www.schengenvisainfo.com/wp-content/uploads/2020/02/Schengen-Visa-Application-Form-2020.png"
        let fileUri = FileSystem.documentDirectory + "Schengen-Visa-Application-Form-2020.png";
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            saveFile(uri);
          })
          .catch(error => {
            console.error(error);
          })
    }
    
    const saveFile = async (fileUri: String) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            alert('downloaded successful')
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }
    return (
             <View style={styles.backgroundView}>
            <View style={{
                //  padding: 10,
                marginLeft: 15,
                //  marginRight: 40,
                marginTop: 20,
                flexDirection: 'row',
            }}>
                <Ionicons name="md-chevron-back-sharp" size={24} color="#fff" />
                <View style={{ marginLeft: 35 }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>Summary Report</Text>
                </View>
                <Ionicons name="share-social-outline" size={24} color="#fff" style={{ marginLeft: 130 }} onPress={share} />

            </View>
            <View style={styles.bottomView}>
                <View style={{ marginLeft: 15, marginRight: 15,marginTop:25 }}>

                      <Image source = { {uri:"https://www.schengenvisainfo.com/wp-content/uploads/2020/02/Schengen-Visa-Application-Form-2020.png"} } style={{width:"100%",height:"80%"}}/>

                    </View>
                    <TouchableOpacity style={ styles.button} onPress={downloadFile}>
                <AntDesign name="download" size={20} color="#0C948A" />
                    <Text style={styles.text}>Download</Text>
                </TouchableOpacity>
            </View>
            </View>
    );
} 