
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import login from './pages/login';
import register from './pages/register';
import main from './pages/main';
import detail from './pages/detail';
import SideBar from './components/SideBar';
import { SearchBar, Icon } from 'react-native-elements';
const SharedPreferences = require('react-native-shared-preferences');

export default class App extends Component {

    constructor(props) {
        super(props);
        SharedPreferences.getItem("isLogin", (value) => {
            this.changeScreen('main');
        })
        this.state = {
            screens : {
                'login' : login,
                'register' : register,
                'main': main,
                'detail': detail,
            },
            screen: main,
            login : true,
            register : false,
            loginScreen : login,
            registerScreen : register
        }
    }

    changeScreen = (key) => {
        let login = false;
        let register = false;
        if(key === "login") {
            login = true;
        } else if(key === "register") {
            register = true;
        }
        this.setState({
            screen: this.state.screens[key],
            login: login,
            register: register
        })
    }

    render() {
        if(this.state.login) {
            return (
                <View style={styles.view}>
                    <this.state.loginScreen change={this.changeScreen}/>
                </View>
            );    
        } else if(this.state.register) {
            return (
                <View style={styles.view}>
                    <this.state.registerScreen change={this.changeScreen}/>
                </View>
            );    
        } else {
            return (
                <View style={styles.view}>
                    <View style={styles.topMenu}>
                        <View style={styles.topButton}>
                            <Image source={require('./images/logo.png')} style={{width:32,height:32}} resizeMode="contain"/>
                        </View>
                        <View style={styles.logo}>
                            <SearchBar
                                onChangeText={() => { }}
                                onClearText={() => { }}
                                placeholder='검색'
                                lightTheme
                                containerStyle={{
                                    backgroundColor: '#3498d8',
                                    borderColor: '#3498d8',
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0,
                                    padding: 0,
                                    marginTop : -15,
                                    marginBottom : 0,
                                    width: Dimensions.get('window').width - 90
                                }}
                                inputStyle={{
                                    borderWidth: 0,
                                    backgroundColor: '#3498d8',
                                    color: '#fff',
                                    borderBottomColor: "#24648B",
                                    borderBottomWidth: 1,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginBottom : 0
                                }}
                                placeholderTextColor="#eee"
                                icon={{ color: '#145D8B' }}
                            />
                        </View>
                        <View style={styles.topButton}>
                            <Image source={require('./images/logo.png')} style={{width:32,height:32}} resizeMode="contain"/>
                        </View>
                    </View>
                    <View style={styles.contents}>
                        <ScrollView style={{ height: Dimensions.get('window').height - 104 }}>
                            <this.state.screen change={this.changeScreen}/>
                            <View style={styles.footer}>
                                <View>
                                    <Text style={{ color: '#ffffff' }}>Copyright (c) Hacker's Diary & Blogger</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#ffffff' }}>Thanks to kjkwak12@gmail.com</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );    
        }
    }
}

const styles = StyleSheet.create({
    view : {
        backgroundColor : '#f2f2f2',
    },
    topMenu : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        padding : 10,
        backgroundColor : '#3498d8'
    },
    contents : {
        padding : 10,
    },
    logoText : {
        fontSize : 20,
        color : '#fff',
    },
    footer : {
        justifyContent : "center",
        padding : 10,
        marginTop : 10,
        backgroundColor : '#313131',
    }
});
