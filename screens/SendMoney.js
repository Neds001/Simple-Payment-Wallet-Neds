import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../App";
 
const SendMoney = ({ currentBalance, updateCurrentBalance }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendMoney = () => {
    if (recipient.trim() === '' || amount.trim() === '') {
      alert('Please enter a recipient and amount');
      return;
    }

    // Logic to send money to the recipient with the specified amount
    // You can implement the actual functionality here, such as calling an API or updating a database

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Invalid amount');
      return;
    }

    if (parsedAmount > currentBalance) {
      alert('Insufficient balance');
      return;
    }

    // Update the current balance by subtracting the sent amount
    updateCurrentBalance(parsedAmount);

    alert(`Successfully sent ₱${amount} to ${recipient}`);

    setRecipient('');
    setAmount('');

    //submit data
    setDoc(doc(db, "money", "LA"),{
          currentBalance: amount
    }).then(()=>{
      console.log('data submitted');
    }).catch((error)=>{
      console.log(error);
    });

  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Money</Text>
      <TextInput
        placeholder="Recipient"
        value={recipient}
        onChangeText={setRecipient}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} 
                        onPress={handleSendMoney}
                        //onCLick={sendMoney}
                        >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 30,
    borderRadius: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: '#009688',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default SendMoney;