import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/summary');
      const { totalExpenses, totalBalance } = response.data;
      setTotalExpenses(totalExpenses);
      setTotalBalance(totalBalance);
    } catch (error) {
      console.error('Error fetching summary:', error);
      Alert.alert('Error', 'Failed to fetch summary');
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleAddTransaction = async () => {
    if (!userId || !title || !amount || !category) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/add', {
        user_id: userId,
        title,
        amount: parseFloat(amount),
        category,
      });

      Alert.alert('Success', response.data.message);

      setUserId('');
      setTitle('');
      setAmount('');
      setCategory('');

      fetchSummary();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to connect to server';
      Alert.alert('Error', msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Home Summary</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.expensesText}>Total Expenses</Text>
          <Text style={styles.expensesValue}>₹{totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#dff9f0' }]}>
          <Text style={styles.balanceText}>Total Balance</Text>
          <Text style={styles.balanceValue}>₹{totalBalance.toFixed(2)}</Text>
        </View>
      </View>

      {/* Transaction Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Add Transaction</Text>
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={userId}
          onChangeText={setUserId}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f3f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  summaryContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2f3640',
  },
  summaryBox: {
    backgroundColor: '#ffecec',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expensesText: {
    fontSize: 16,
    color: '#e84118',
    fontWeight: '600',
  },
  expensesValue: {
    fontSize: 16,
    color: '#e84118',
    fontWeight: '600',
  },
  balanceText: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
  },
  balanceValue: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2f3640',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dcdde1',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#f7f8fa',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
