import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function History() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get");
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Could not fetch history.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
    
      const response = await axios.delete(`http://localhost:5000/api/delete/${id}`);

   
      if (response.status === 200) {
      
        fetchTransactions(); 
     
        
        Alert.alert("Success", "Transaction deleted successfully.");
      } else {
         Alert.alert("Error", "Deletion failed on the server.");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", "Could not delete transaction. Please check the network.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <Text
          style={
            styles.amount}
           
        >
          ₹{item.amount}
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={22} color="#e84118" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      {transactions.length === 0 ? (
        <Text style={styles.noData}>No transactions yet</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2f3640",
  },
  noData: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2f3640",
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  actions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
