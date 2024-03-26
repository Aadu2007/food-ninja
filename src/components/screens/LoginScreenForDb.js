/* eslint-disable prettier/prettier */
import React, { useContext, useState } from "react";
import { Text,
    StyleSheet,
    TextInput,Alert,
    TouchableOpacity,
    StatusBar,Image,
    ImageBackground,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect} from "react";
import { CheckDbApproval } from "./CheckDbApproval";
const Section = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left:10px;
`;

export const LoginScreenForDb = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password1, setPassword] = useState("");
    const {onLogin, error,isLoading} = useContext(AuthenticationContext);
    const [data, setData] = useState(null);
    const [countfordb, setCount] = useState(0);
  const getData = () => {
    var key = email.replace("@gmail.com","");
    var database = firebase.database();
    database.ref("/deliveryPerson/" + key + "/"). on("value" ,(snapshot) =>{
      setData(snapshot.val());
      return data;
      });

  };

  if ((countfordb % 2) === 0){
    if (data){
        return <CheckDbApproval data={data} email={email} password1={password1}/>;
    }
    else {
      if (countfordb !== 0){
      Alert.alert(
        "Hello Delivery Person",
        "Please fill the data!!",
      );
    }
  }
}

  return (
      <ImageBackground  style={styles.container}>
      <Image style={styles.glogo} source={require("../../../assets/foodhome1.jpg")} />
      <Text style={styles.txt}> HOMELY DELIGHT</Text>

      <Text style={styles.txt2}> Login To Your Account</Text>

      <TextInput style={styles.tinput}
      placeholder="E-mail"
      placeholderTextColor="#b2beb5"
      value = {email}
      textContentType = "emailAddress"
      keyboardType = "email-address"
      autoCapitalize = "none"
      onChangeText = {(u)=> setEmail(u)}

      />


      <TextInput style={styles.tinput}
      placeholder="Password"
      secureTextEntry={true}
      placeholderTextColor="#b2beb5"
      value= {password1}
      textContentType = "password"
      autoCapitalize ="none"
      onChangeText ={(p)=>setPassword(p)}
      />

      <Text style={{ lineHeight: 30 }}> </Text>
      {error && (
            <Text style={{color:"red"}}>{error}</Text>
        )}
        <TouchableOpacity >
        <Text style={{color:"#1DC47A",textDecorationLine: "underline"}}> Forgot Password? </Text>
      </TouchableOpacity>
        <Text style={{ lineHeight: 20 }}> </Text>
        {!isLoading ? (
          <>
      <TouchableOpacity style={styles.btn} onPress ={() => getData()}>
        <Section>
        <EvilIcons name="unlock" size={30} color="black" />
        <Text style={styles.txt1}> Log in </Text>
        </Section>

      </TouchableOpacity>
      </>) :
      (
        <ActivityIndicator animating={true} color={Colors.blue300} />
      )}
      <Text style={{ lineHeight: 20 }}> </Text>
      <Section>

        <Text>Create Account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate("dbRegister")} >
        <Text style={{color:"#1DC47A",textDecorationLine: "underline"}}> Sign up </Text>
      </TouchableOpacity>
      </Section>
       <Text style={{ lineHeight: 40 }}> </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  txt: {
    marginTop:10,
    fontSize: 35,
    fontWeight: "bold",
    color: "#1DC47A",
    alignSelf: "center",
  },
  txt2: {
    marginTop:1,
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    margin:10,
  },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"white",
      marginTop: StatusBar.currentHeight,
    },
    glogo: {
      height: 50,
      width: 50,
      marginTop:105,
      alignSelf: "center",
    },
    tinput: {
      backgroundColor: "white",
      height: 57,
      width: 300,
      padding: 10,
      borderRadius: 10,
      fontSize: 18,
      marginTop:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,

    },
    txt1: {
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "center",
    },

    btn: {
      borderColor: "rgb(254,218,0)",
      borderRadius: 10,
      height: 50,
      width: 150,
      backgroundColor: "#1DC47A",
      padding: 10,
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
    },
  });
