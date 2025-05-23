import React from 'react';
import { View, Text } from 'react-native';


interface InvoiceCard {
amount: string;
due_date: string ;
invoice_number: string;
issued_date: string;
status: string;
}

export default function InvoiceCard({ amount, due_date, invoice_number, issued_date, status }:InvoiceCard) {
    
  return (
    <View className="p-4 gap-y-4 bg-white/70 rounded-lg mx-4">
      
      {/* Header */}
      <View className="flex-row justify-between items-start">
        <Text className="text-xl font-bold">Invoice</Text>
        <View className="items-end">
          <Text className="text-xs text-gray-400">{invoice_number}</Text>
          <Text className={`text-sm font-medium ${status?.toLowerCase() == 'overdue' ? 'text-red-500 ': 'text-green-500 '}`}>{status}</Text>
        </View>
      </View>

      
      {/* Details */}
      <View className="gap-y-2">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Issued</Text>
          <Text className="text-black">{issued_date}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Due</Text>
          <Text className="text-black">{due_date}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Amount</Text>
          <Text className="font-bold text-lg text-black">{amount}</Text>
        </View>
      </View>

    </View>
  );
}
