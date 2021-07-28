import React, {Component} from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import Acordion from '../components/Acordion';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../styles/Colors';

export default class Lists extends Component { 
    
  constructor(props) {
    super(props);
    this.state = {
      menu: [
      ]
     }
  }

  componentDidMount() {
    fetch('http://192.168.1.239/api/lapar/faq.php', {  
        method: 'POST',   
        headers: {    
          Accept: 'application/json',    
          'Content-Type': 'application/json' 
        }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log(responseJson);
        console.log(responseJson.result);
        if (responseJson.result) {
            this.setState({ 
              menu: responseJson.data,
            });
        } else {
            alert('masalah pada jaringan, coba beberapa saat lagi!.');
            console.log('null obsku');
            return;
        }
      })
      .catch((error) => {
          alert('cek koneksi internet anda!.');
          console.error(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity>
              <LinearGradient
                  colors={['#bd1c2c', '#bd1c2c']}
                  style={styles.signIn}
              >
                  <Text style={styles.textSign}>LIHAT TUTORIAL</Text>
              </LinearGradient>
          </TouchableOpacity>
        </View> 
        <Text style={styles.title}>
          Frequently Asked Question
        </Text>
        <View style={styles.list}>
          { this.renderAccordians() }
        </View>
      </ScrollView>
    );
  }

  renderAccordians=()=> {
      const items = [];
      for (var item of this.state.menu) {
          items.push(
              <Acordion 
                  title = {item.title}
                  data = {item.content}
              />
          );
      }
      return items;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#d9d9d9',
    // paddingTop:10,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  signIn: {
      width: 375,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row'
  },
  textSign: {
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold'
  },
});