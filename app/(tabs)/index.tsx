import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Document {
  id: number;
  category: string;
  title: string;
  content: string;
  url?: string;
  sourceurl?: string;
  sourcelabel?: string;
}

const sampleDocs: Document[] = [
  {
    id: 1,
    category: '',
    title: 'How to use this app',
    content:
      'This portfolio is a React Native app I built with Expo and deployed to Netlify. Check out the README.md file for detailed instructions.',
    url: 'https://github.com/elgee/docs-viewer-react/?tab=readme-ov-file#expo-mobile-app-to-display-my-documentation-portfolio',
  },
  {
    id: 2,
    category: '',
    title: 'Testing Stripe API endpoints with cURL',
    content:
      "This guide (in Markdown) demonstrates how to use cURL to test Stripe's payment endpoints.",
    url: 'https://github.com/elgee/docs-viewer-react/blob/main/stripe-api-test-curl.md',
  },
  {
    id: 3,
    category: '',
    title: 'Testing Stripe API endpoints with Postman (authored in DITA)',
    content:
      "This PDF documentation created with DITA-OT demonstrates how to use Postman to test Stripe's payment endpoints.",
    url: 'https://storied-semifreddo-5b2900.netlify.app/stripe-api-test.pdf',
    sourceurl: 'https://github.com/elgee/stripe-api-test',
    sourcelabel: 'View DITA source',
  },
  {
    id: 4,
    category: '',
    title: 'Actions',
    content:
      'A comprehensive guide to reusable automation, known as actions, including configuration options, prerequisites, and example workflows.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/actions',
  },
  {
    id: 5,
    category: '',
    title: 'Continuous integration (CI)',
    content:
      'How to integrate your CI tool with the platform and take advantage of platform features.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/continuous-integration/intro',
  },
  {
    id: 6,
    category: '',
    title: 'GitHub Actions integration',
    content:
      'How to set up an integration with GitHub Actions so that you can view GHA workflows in the platform.',
    url: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/github-actions/intro',
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

  const openResume = async () => {
    const resumeUrl = 'https://storied-semifreddo-5b2900.netlify.app/resume.pdf';
    try {
      const supported = await Linking.canOpenURL(resumeUrl);
      if (supported) {
        await Linking.openURL(resumeUrl);
      } else {
        Alert.alert('Error', 'Unable to open resume');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the resume');
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
        <Text style={styles.headerTitle}>Elizabeth Gaudet - Technical writing portfolio</Text>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.mainContent}>
          {/* Left Column - About and Instructions */}
          <View style={styles.leftColumn}>
            <View style={styles.aboutCard}>
              <Text style={styles.sectionTitle}>About this portfolio</Text>
              <Text style={styles.bodyText}>
                I am a technical writer with 14 years of experience creating documentation that
                enables user success. This portfolio showcases both my technical writing expertise
                and web development skills.
              </Text>
            </View>

            <View style={styles.instructionsCard}>
              <Text style={styles.sectionTitle}>How to use this portfolio</Text>
              <Text style={styles.bodyText}>
                The documentation examples on the right showcase technical documentation authored by
                me. Each card represents a major documentation section.
              </Text>
              <Text style={styles.bodyText}>
                <Text style={styles.bold}>To explore:</Text> Select the + icon on any card to read
                the expanded description. Select "View" to display the introduction page for example
                sections of my work. For example, the Actions section includes more than 50 pages of
                my work, accessed through the left navigation.
              </Text>
            </View>
            <TouchableOpacity style={styles.resumeButton} onPress={openResume}>
              <Text style={styles.resumeButtonText}>Download my resume (PDF)</Text>
            </TouchableOpacity>

            <View style={styles.linksCard}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://www.linkedin.com/in/l-b1a37b37')}>
                <Text style={styles.linkText}>LinkedIn profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://github.com/elgee/docs-viewer-react')}>
                <Text style={styles.linkText}>View source code on GitHub</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Column - Documentation Examples */}
          <View style={styles.rightColumn}>
            <Text style={styles.columnTitle}>Documentation examples</Text>
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <View key={category} style={styles.categorySection}>
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
                            <Text style={styles.linkButtonText}>View</Text>
                          </TouchableOpacity>
                        )}
                        {doc.sourceurl && (
                          <TouchableOpacity
                            style={styles.linkButton}
                            onPress={() => openDocumentLink(doc.sourceurl!)}>
                            <Text style={styles.linkButtonText}>View source code</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
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
  contentWrapper: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 20,
  },
  leftColumn: {
    flex: 1,
    minWidth: 280,
    maxWidth: 500,
  },
  rightColumn: {
    flex: 1,
    minWidth: 280,
    maxWidth: 600,
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  aboutCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  linksCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 12,
  },
  bold: {
    fontWeight: '600',
  },
  resumeButton: {
    backgroundColor: '#5B2C6F',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  resumeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 15,
    color: '#007AFF',
    marginBottom: 12,
    textDecorationLine: 'underline',
  },
  categorySection: {
    marginBottom: 2,
  },
  documentCard: {
    backgroundColor: '#fff',
    marginBottom: 12,
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
    backgroundColor: '#8B5FA8',
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
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  inlineLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
