import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../lib/supabase.js';

export default function App() {
  interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      try {
        const { data: todos, error } = await supabase.from('todos').select();

        if (error) {
          console.error('Error fetching todos:', {
            error,
            message: error.message,
            details: error.details
          });
          throw new Error(`Failed to fetch todos: ${error.message}`);
        }

        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error: unknown) {
        console.error('Error fetching todos:', error instanceof Error ? error.message : 'Unknown error');
      }
    };

    getTodos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
      />
    </View>
  );
};


