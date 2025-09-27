import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Document {
  id: number;
  category: string;
  title: string;
  content: string;
  url?: string;
}

const sampleDocs: Document[] = [
  {
    id: 1,
    category: 'Continuous Integration docs',
    title: 'Continuous Integration',
    content:
      'This section shows how to configure CloudBees platform to integrate with CloudBees CI and Jenkins®.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/continuous-integration/intro',
  },
  {
    id: 2,
    category: 'CloudBees Platform',
    title: 'GitHub Actions Integration',
    content:
      'CloudBees seamlessly integrates with GitHub Actions to provide enhanced workflow capabilities. Learn how to configure action runners, manage secrets, and implement advanced deployment strategies within the CloudBees ecosystem.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/github-actions/intro',
  },
  {
    id: 3,
    category: 'CloudBees Platform',
    title: 'Actions',
    content:
      'Comprehensive guide to CloudBees Actions, covering configuration, execution, and best practices for implementing automated workflows within your development pipeline.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/actions',
  },
  {
    id: 4,
    category: 'CloudBees Platform',
    title: 'Applications',
    content:
      'The CloudBees platform simplifies application lifecycle management from development to deployment. Configure application environments, manage deployment policies, and monitor application performance across your development pipeline.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/applications/applications',
  },
  {
    id: 5,
    category: 'Platform Reference',
    title: 'CloudBees Platform Lexicon',
    content:
      'Comprehensive glossary of CloudBees platform terminology, including definitions for pipelines, workflows, runners, and deployment concepts. Essential reference for developers and administrators working with CloudBees solutions.',
    url: 'https://docs.cloudbees.com/lexicon/cloudbees-platform',
  },
  {
    id: 6,
    category: 'Developer Resources',
    title: 'SDK Installation Guide',
    content:
      'Get started with CloudBees SDKs for feature management and platform integration. This guide covers installation procedures, authentication setup, and basic implementation patterns for various programming languages.',
  },
];

export default function DocumentationViewer() {
  const [currentView, setCurrentView] = useState<'home' | 'list' | 'document'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const openDocumentLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open this link');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the link');
    }
  };

  const categories = Array.from(new Set(sampleDocs.map((doc) => doc.category)));

  const filteredDocs = sampleDocs.filter(
    (doc) =>
      doc.category === selectedCategory &&
      (searchTerm === '' || doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderHome = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Technical Documentation</Text>
      <Text style={styles.subtitle}>Select a category to browse documents</Text>

      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryButton}
          onPress={() => {
            setSelectedCategory(category);
            setCurrentView('list');
          }}>
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.docCount}>
            {sampleDocs.filter((doc) => doc.category === category).length} documents
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDocumentList = () => (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentView('home')}>
        <Text style={styles.backText}>← Back to Categories</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{selectedCategory}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder='Search documents...'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {filteredDocs.map((doc) => (
        <TouchableOpacity
          key={doc.id}
          style={styles.documentItem}
          onPress={() => {
            setSelectedDoc(doc);
            setCurrentView('document');
          }}>
          <Text style={styles.docTitle}>{doc.title}</Text>
          <Text style={styles.docPreview}>{doc.content.substring(0, 100)}...</Text>
          {selectedDoc.url && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => openDocumentLink(selectedDoc.url!)}>
              <Text style={styles.linkButtonText}>📖 View Live Documentation</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDocument = () => (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentView('list')}>
        <Text style={styles.backText}>← Back to {selectedCategory}</Text>
      </TouchableOpacity>

      {selectedDoc && (
        <>
          <Text style={styles.title}>{selectedDoc.title}</Text>
          
          <Text style={styles.category}>{selectedDoc.category}</Text>

          {selectedDoc.url && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => openDocumentLink(selectedDoc.url!)}>
              <Text style={styles.linkButtonText}>📖 View Live Documentation</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.content}>{selectedDoc.content}</Text>
        </>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.wrapper}>
      {currentView === 'home' && renderHome()}
      {currentView === 'list' && renderDocumentList()}
      {currentView === 'document' && renderDocument()}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  categoryButton: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  docCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  documentItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  docPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
