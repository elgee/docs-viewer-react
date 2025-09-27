import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';

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
    category: '',
    title: 'Continuous integration (CI)',
    content:
      'How to integrate your CI tool with the platform and take advantage of platform features.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/continuous-integration/intro',
  },
  {
    id: 2,
    category: '',
    title: 'GitHub Actions integration',
    content:
      'How to set up an integration with GitHub Actions so that you can view GHA workflows in the platform.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/github-actions/intro',
  },
  {
    id: 3,
    category: '',
    title: 'Actions',
    content:
      'A comprehensive guide to reusable automation, known as actions, including configuration options, prerequisites, and example workflows.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/actions',
  },
  {
    id: 4,
    category: '',
    title: 'Applications',
    content:
      'How to get started building applications with the platform, including deployment and release.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/applications/applications',
  },
  {
    id: 5,
    category: '',
    title: 'Lexicon',
    content: 'Comprehensive glossary of platform terminology.',
    url: 'https://docs.cloudbees.com/lexicon/cloudbees-platform',
  },
  {
    id: 6,
    category: '',
    title: 'Instructions for viewing this portfolio',
    content: 'This is the README.md file from this app.',
    url: 'https://github.com/elgee/docs-viewer-react/blob/main/README.md',
  },
];

export default function DocumentationViewer() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

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

  const groupedDocs = sampleDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Technical documentation authored by Elizabeth Gaudet</Text>
      </View>

      {Object.entries(groupedDocs).map(([category, docs]) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>

          {docs.map((doc) => (
            <View key={doc.id} style={styles.documentCard}>
              <TouchableOpacity
                style={styles.documentHeader}
                onPress={() => toggleExpanded(doc.id)}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <Text style={styles.expandIcon}>{expandedItems.has(doc.id) ? '−' : '+'}</Text>
              </TouchableOpacity>

              {expandedItems.has(doc.id) && (
                <View style={styles.documentContent}>
                  <Text style={styles.contentText}>{doc.content}</Text>

                  {doc.url && (
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => openDocumentLink(doc.url!)}>
                      <Text style={styles.linkButtonText}>View live documentation</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Portfolio showcasing technical documentation and React Native development
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 15,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  categorySection: {
    marginTop: 2,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 2,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 2,
    paddingLeft: 4,
  },
  documentCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  documentTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 12,
  },
  documentContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#495057',
    marginBottom: 16,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});
