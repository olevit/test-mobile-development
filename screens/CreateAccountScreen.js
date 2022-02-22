import React, { useState,useRef } from "react";
import Checkbox from 'expo-checkbox';
import { TextInput, ScrollView, Animated, StyleSheet, SafeAreaView, ImageBackground, View, Icon, Text, Image,TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
//import Realm from "realm";



//const initialStateUser = { username: '', password: '' };


export default function CreateAccountScreen() {
    const [colorBorderName, setColorBorderName] = useState('#8F8F8F');
    const [colorBorderEmail, setColorBorderEmail] = useState('#8F8F8F');
    const [colorBorderPhone, setColorBorderPhone] = useState('#8F8F8F');
    const [isChecked, setChecked] = useState(true);
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusEmail, setIsFocusEmail] = useState(false);
    const animatePressName = useRef(new Animated.Value(0)).current;
    const animatePressEmail = useRef(new Animated.Value(0)).current;


    const animateStyleName = [styles.containerTextTitle,
                            {transform: [{ translateY: animatePressName.interpolate({inputRange: [0, 1],
                                                                                outputRange: [25, 0]})}],}]
    const animateStyleEmail = [styles.containerTextTitle,
                                {transform: [{ translateY: animatePressEmail.interpolate({inputRange: [0, 1],
                                                                                    outputRange: [25, 0]})}],}]
    const onChangeTextName = (text) => {
          if (/^(?:[А-Яа-я]+)$/.test(text)|| text === '') {
            setName(text);
          }
          if(text.length < 3) {
            setErrorName(true);
            setColorBorderName('#DE494A');
          }else{
            setErrorName(false);
            setColorBorderName('#00BA06');
         }
    };
    const onChangeTextEmail = (text) => {
          setEmail(text);
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(text) || text.length < 10 ) {
            setErrorEmail(true);
            setColorBorderEmail('#DE494A');
          }
          else {
            setErrorEmail(false);
            setColorBorderEmail('#00BA06');
          }

    };

    const animateTop = (animatePress) => {
        Animated.timing(animatePress, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }).start();
    };
    const onFocusName = () => {
        animateTop(animatePressName);
        setIsFocusName(true);
        setColorBorderName('#0063FF');
    };
    const onFocusEmail = () => {
        animateTop(animatePressEmail);
        setIsFocusEmail(true);
        setColorBorderEmail('#0063FF');
    };

const onSubmit = data =>{
    console.log(data);
}

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView>
       <View style={styles.containerScroll}>
        <View style={styles.containerTop}>
            <Ionicons style={styles.arrow} name="arrow-back" size={24} color="#8F8F8F" />
        </View>
        <View style={styles.containerMain}>
                <Text style={styles.textMain}>Создать аккаунт</Text>
                <View style={{...styles.containerInput, marginTop: 40}}>
                {isFocusName ?
                    <Animated.View style={animateStyleName}>
                       <Text style={styles.textName}>Имя</Text>
                    </Animated.View>
                    : <View style={{height: 10}}/>
                    }
                    <TextInput
                                style={{...styles.input, borderColor: colorBorderName }}
                                onFocus={onFocusName}
                                onChangeText={onChangeTextName}
                                value={name}
                                placeholderTextColor="#8F8F8F"
                                placeholder={isFocusName ? "" : "Имя"}
                                maxLength={10}
                                />
                        <View style={{height:18}}>
                            {errorName ? <Text style={styles.textError}>Введите нормальное имя!</Text> : <></>}
                        </View>
                </View>

                <View style={{...styles.containerInput, marginTop: 10 }}>
                {   isFocusEmail ?
                    <Animated.View style={animateStyleEmail}>
                         <Text style={styles.textName}>E-mail</Text>
                    </Animated.View>
                :
                    <View style={{height: 10}}/>
                }
                   <TextInput
                            style={{...styles.input, borderColor: colorBorderEmail}}
                            onChangeText={onChangeTextEmail}
                            onFocus={onFocusEmail}
                            maxLength={30}
                            placeholderTextColor="#8F8F8F"
                            placeholder={isFocusEmail ? "" : "E-mail"}
                            value={email}
                            />
                    <View style={{height:18}}>
                        {errorEmail ? <Text style={styles.textError}>Введите корректный емэйл!</Text> : <></>}
                    </View>
                </View>
                <View style={styles.containerInput}>
                <TextInput
                        style={{...styles.input, borderColor: colorBorderPhone}}
                        keyboardType='numeric'
                        multiline={false}
                        placeholderTextColor="#8F8F8F"
                        dataDetectorTypes='phoneNumber'
                        maxLength={10}
                        placeholder='+7'
                        />
                </View>
                <TouchableOpacity  activeOpacity={0.5} style={styles.button} onPress={animateTop}>
                                   <Text style={styles.textButton}>Далее</Text>
                </TouchableOpacity>
                <View style={styles.containerConfirm}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.checkbox} onPress={()=> setChecked(!isChecked)}>
                        <Entypo name="check" size={15} color={isChecked ? "#8F8F8F" : 'transparent'} />
                    </TouchableOpacity>
                     <View>
                         <Text style={styles.textConfirm}>Регистрируясь, вы соглашаетесь с нашими</Text>
                         <View style={{flexDirection: 'row'}}>
                             <Text style={{...styles.textConfirm, textDecorationLine: 'underline'}}>Условиями использования</Text>
                             <Text style={styles.textConfirm}> и </Text>
                             <Text style={{...styles.textConfirm, textDecorationLine: 'underline'}}>Политикой</Text>
                         </View>
                         <View style={{flexDirection: 'row'}}>
                            <Text style={{...styles.textConfirm, textDecorationLine: 'underline'}}>конфиденциальности</Text>
                            <Text style={styles.textConfirm}>.</Text>
                         </View>
                     </View>
                </View>
        </View>
        </View>
       </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    //alignItems: "center",
  },
  containerScroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  containerTop:{
    width:'100%',
    alignItems: 'flex-start',
  },
  arrow: {
    marginTop: 37,
    marginLeft: 20
  },
  containerMain: {
    flexGrow: 1,
    alignItems: "flex-start",
    marginTop: 53,
    width: 320
  },
  textMain: {
    fontFamily:'poppins-bold',
    fontSize: 28,
    color: 'white',
  },
  containerTextTitle: {
    marginLeft: 18,
    height: 15,
    backgroundColor:'#1F1F1F',
    zIndex: 99,
    marginBottom: -5,
    paddingHorizontal:2,
  },
  textName:{
    color:'#8F8F8F',
    fontFamily:'poppins',
    fontSize: 14,
  },
  textError:{
    marginLeft:2,
    color:'#DE494A',
    fontFamily:'poppins',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 15,
    //borderColor: "#8F8F8F",
    fontFamily: 'poppins',
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 14,
    color:'#8F8F8F',
    zIndex: 1,
  },
  containerInput:{
    width: '100%',
    alignItems: "flex-start",
  },
    button: {
     backgroundColor: '#8F8F8F',
     borderRadius: 32,
     height: 50,
     width: "100%",
     alignItems: "center",
     justifyContent: "center",
     marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontFamily: 'poppins-semi-bold',
    fontSize: 16,
  },
  containerConfirm: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginTop: 20,

  },
  checkbox: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#8F8F8F",
    marginRight: 15,
  },
  textConfirm: {
    color: '#8F8F8F',
    fontFamily: 'poppins-light',
    fontSize: 12,
    },
});
