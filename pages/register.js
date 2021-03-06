import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
const axios = require('axios').default

const JEnum = require('../enum')

export default class App extends Component {
    state = {
        username : "",
        email : "",
        password : "",
        password2 : ""
    }
    register = () => {
        if(this.state.password !== this.state.password2) {
            alert("비밀번호와 확인용 비밀번호가 서로 같지 않습니다.");
            return;
        }
        axios.post(JEnum.register, {
            username : this.state.username,
            email : this.state.email,
            password: this.state.password
        }).then(res => {
            if(!res.data.status) {
                alert(res.data.message);
                return;
            }
            alert(res.data.message);
            this.props.change("login")
        })
        
    }
    render() {
        return (
            <ScrollView>

                <View
                    style={{
                        fontWeight: 'bold',
                        padding : 20,
                        backgroundColor : '#40739e',
                        alignItems : 'center',
                        justifyContent : 'center',
                        alignContent : 'center'
                    }}
                >
                    <Text style={{fontWeight:'bold',fontSize:25,color:'#fff',marginBottom:15}}>Hacker's Diary</Text>
                    <Text style={{ fontSize: 15, color: '#fff' }}>Hacking/Security Blog RSS Viewer</Text>
                </View>

                <View
                    style={{
                        alignContent: 'stretch',
                        padding: 10,
                        backgroundColor: '#fff'
                    }}
                >
                    <View style={styles.obj}>
                        <Text style={styles.label}>EMAIL</Text>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            onChangeText={(value) => {this.setState({email: value})}}
                        />
                    </View>
                    <View style={styles.obj}>
                        <Text style={styles.label}>USERNAME</Text>
                        <TextInput
                            placeholder="Username"
                            style={styles.textInput}
                            onChangeText={(value) => {this.setState({username: value})}}
                        />
                    </View>
                    <View style={styles.obj}>
                        <Text style={styles.label}>PASSWORD</Text>
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            onChangeText={(value) => {this.setState({password: value})}}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.obj}>
                        <Text style={styles.label}>PASSWORD CHECK</Text>
                        <TextInput
                            placeholder="Password Check"
                            style={styles.textInput}
                            onChangeText={(value) => {this.setState({password2: value})}}
                            secureTextEntry
                        />
                    </View>
                    <View style={{marginTop:20}}>
                        <Button
                            large
                            backgroundColor="#192a56"
                            onPress={this.register}
                            title='계정 만들기' />
                    </View>
                    <View style={{marginTop:10}}>
                        <Button
                            large
                            backgroundColor="#273c75"
                            onPress={() => {this.props.change('login')}}
                            title='로그인 하기' />
                    </View>
                </View>
                

                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#fff',
        color : '#313131',
        padding: 10,
        fontSize: 15,
        borderBottomWidth : 1,
        borderBottomColor : '#eee'
    },
    label: {
        fontSize: 11,
        color: '#545454',
    },
    obj: {
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10
    }
});
