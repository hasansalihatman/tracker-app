import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({item}) {
  return <ExpenseItem {...item} />;
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      key={(item) => {
        item.id;
      }}
    />
  );
}

const styles = StyleSheet.create({});
