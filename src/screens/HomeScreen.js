import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/TodoContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import StatsPanel from '../components/StatsPanel';
import TodoItem from '../components/TodoItem';
import TodoFormModal from '../components/TodoFormModal';
import { typography } from '../theme/typography';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { filteredTodos } = useTodo();

  const [showStats, setShowStats] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // slight delay to allow modal close animation before clearing form
    setTimeout(() => setEditingTodo(null), 300);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, { backgroundColor: theme.surfaceHighlight }]}>
        <Feather name="check-circle" size={48} color={theme.textSecondary} />
      </View>
      <Text style={[typography.h2, { color: theme.text, marginTop: 16 }]}>
        All caught up!
      </Text>
      <Text style={[typography.body, { color: theme.textSecondary, marginTop: 8, textAlign: 'center' }]}>
        You have no tasks matching the current filters. Add a new task or modify filters to see more.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title="Tasks"
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
      />
      
      <SearchBar />
      <FilterBar />
      
      {showStats ? <StatsPanel /> : null}

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem item={item} onEdit={handleEdit} />}
        contentContainerStyle={[styles.list, filteredTodos.length === 0 && styles.listEmpty]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={32} color="#FFF" />
      </TouchableOpacity>

      <TodoFormModal
        visible={modalVisible}
        onClose={handleCloseModal}
        editingTodo={editingTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
    paddingBottom: 100, // accommodate FAB
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;
