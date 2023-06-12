import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from "react-native"
import Btn from "../components/Btn"
import firebase from 'firebase/app';
import "firebase/auth";
import SendMoney from './SendMoney';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cadetblue',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
      },
      balanceContainer: {
        backgroundColor: 'white',
        padding: 20,
        paddingHorizontal: 100,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
      },
      balanceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
            marginBottom: 10,
        color: '#555555',
      },
      balanceAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
      },
      conversionRate: {
        fontSize: 12,
        color: '#777777',
        marginBottom: 10,
      },
})



export default function Loginscreen({navigation}) {
    const [currentBalance, setCurrentBalance] = useState(1500); // Replace with the actual current balance of the user
    const [wemixToPeso, setWemixToPeso] = useState(41.69); // Simulated conversion rate



    const updateCurrentBalance = (amount) => {
    setCurrentBalance((prevBalance) => prevBalance - amount);
  };

  useEffect(() => {
    // Simulated real-time update of the conversion rate
    const interval = setInterval(() => {
      const updatedRate = Math.random() * 41.69 + 0.2; // Generate a random rate between 0.2 and 0.7
      setWemixToPeso(updatedRate.toFixed(2)); // Limit the rate to 2 decimal places
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

    return (
        <View style={styles.container}>
            {/*<Text style={styles.headerText}>Welcome, Anthony</Text>*/}
            <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>₱ {currentBalance}</Text>
            <Text style={styles.conversionRate}>1 Wemix = ₱{wemixToPeso}</Text>
            </View>
            <SendMoney currentBalance={currentBalance} updateCurrentBalance={updateCurrentBalance} />
            <Btn title="Log Out" onClick={() => firebase.auth().signOut()} />
    </View>
    );
}