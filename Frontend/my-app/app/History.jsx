import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

export default function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {transactions.length === 0 ? (
        <Text style={styles.noData}>No transactions yet</Text>
      ) : (
        transactions.map((txn) => (
          <View key={txn.id} style={styles.card}>
            <Text style={styles.cardText}>User: {txn.user_id}</Text>
            <Text style={styles.cardText}>Title: {txn.title}</Text>
            <Text style={styles.cardText}>Amount: ₹{txn.amount}</Text>
            <Text style={styles.cardText}>Category: {txn.category}</Text>
            <Text style={styles.cardText}>Date: {txn.created_at}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f6fa",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
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
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 3,
    color: "#333",
  },
});
