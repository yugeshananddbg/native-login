import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/bgWhite.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const [userData, setUserData] = useState({
    displyaName: "",
    email: "",
    mobile: "",
  });
  const [auth, setAuth] = useState(false);

  const loginHandler = () => {
    axios
      .post("https://apiprod.trestle.network/api//auth/access-token", {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.status == true) {
          setAuth(true);
          console.log(result.data.data);
          const newObj = {
            displyaName: result.data.data.displayName,
            email: result.data.data.email,
            mobile: result.data.data.mobile,
          };
          setUserData(newObj);
        }
        else{
          setError('* Incorrect id or password')
        }
      });
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.mainContainer}>
     
      {auth ? (
        <View>
          <Text style={styles.headerText}>You have logged in</Text>
          <Text>Your name is : {userData.displyaName}</Text>
          <Text>Your email is : {userData.email}</Text>
          <Text>Your mobile numer is : {userData.mobile}</Text>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Text style={styles.headerText}>Login</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Enter Your Email</Text>
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Enter Your Password</Text>
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => loginHandler()}
          >
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.errorLabels} >{error}</Text>
        </View>
      )}
      
    </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100vh",
    width: "100%"
  },
  mainContainer: {
    height: "100%",
  
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  headerText: {
    fontSize: 30,
    fontWeight: 800,
    marginBottom: "30vh",
  },
  inputContainer: {
    color: "red",
    marginTop: 20,

    margin: "auto",
    width: "80%",
  },
  labels: {
    color: "#7d7d7d",
    fontFamily: "regular",
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
  },
  errorLabels: {
    color: "red",
    fontFamily: "regular",
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 2,
    fontFamily: "regular",
    fontSize: 18,
  },
  buttonStyle: {
    backgroundColor: "red",
    marginTop: 30,
    margin: "auto",
    borderRadius: 5,
    padding: 10,
    width: "50%",
  },
  buttonLabel: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Login;
