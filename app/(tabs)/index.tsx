import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Portfolio() {
  const [expandedMobile, setExpandedMobile] = useState(null);
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  const projects = [
    {
      id: 1,
      title: 'Portfolio App Documentation',
      category: 'Technical Documentation',
      summary:
        'Created README documentation for this React Native portfolio app built with Expo. Includes setup instructions, deployment process to Netlify, and technical architecture details. Demonstrates cross-platform development (iOS, Android, web) and responsive design principles.',
      tech: 'React Native, Expo, Netlify, JavaScript, cross-platform development, responsive design',
      link: 'https://github.com/elgee/docs-viewer-react/?tab=readme-ov-file#expo-mobile-app-to-display-my-documentation-portfolio',
    },
    {
      id: 2,
      title: 'Testing Stripe API Endpoints with cURL',
      category: 'API Testing Documentation',
      summary:
        'Created technical guide demonstrating how to use cURL command-line tool to test Stripe payment API endpoints. Documentation written in Markdown with command examples, endpoint descriptions, and payment processing workflows. Covers authentication, request formatting, and response handling.',
      tech: 'Markdown, cURL, Stripe API, REST API testing, command-line tools, payment processing',
      link: 'https://github.com/elgee/docs-viewer-react/blob/main/stripe-api-test-curl.md',
    },
    {
      id: 3,
      title: 'Testing Stripe API Endpoints with Postman',
      category: 'API Testing Documentation',
      summary:
        'Created technical guide demonstrating how to use Postman to test Stripe payment API endpoints. Documentation authored in DITA XML and published to PDF using DITA Open Toolkit. Includes setup instructions, endpoint testing procedures, and example API calls for payment processing workflows.',
      tech: 'DITA XML, DITA-OT, Postman, Stripe API, REST API testing, payment processing',
      link: 'https://storied-semifreddo-5b2900.netlify.app/stripe-api-test.pdf',
      sourceLink: 'https://github.com/elgee/stripe-api-test-docs',
      sourceLabel: 'View DITA source',
    },
    {
      id: 4,
      title: 'CloudBees Platform Actions Reference',
      category: 'API & Developer Documentation',
      summary:
        'Documented 50+ workflow automation actions organized into 15+ hierarchical categories. Use the documentation left navigation to expand categories (Build tools, Deploy tools, Security scanners, etc.) and view individual action pages. Each action includes prerequisites, parameters, and YAML workflow examples.',
      tech: 'CI/CD, YAML, GitHub Actions, Jenkins, AWS, Docker, Helm, Kubernetes, security scanning (including Snyk, Coverity, Trivy)',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/actions',
    },
    {
      id: 5,
      title: 'CloudBees CI and Jenkins Platform Integration',
      category: 'Integration Documentation',
      summary:
        'Created 6-page integration guide enabling enterprise teams to connect Jenkins/CloudBees CI pipelines to CloudBees Platform. Includes step-by-step setup, Jenkinsfile code examples for artifact registration and security scanning (10+ tools including Snyk, Trivy, Grype), test result publishing, and analytics dashboard documentation.',
      tech: 'Jenkins, CloudBees CI, Multibranch Pipelines, GitHub, Jenkinsfile, security scanning tools, VSM dashboards',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/continuous-integration/intro',
    },
    {
      id: 6,
      title: 'CloudBees Platform Lexicon',
      category: 'Reference Documentation',
      summary:
        'Created comprehensive glossary defining 80+ terms used across the CloudBees Platform, organized alphabetically from A-Z. Includes definitions for workflows, CI/CD concepts, feature management, security terms, analytics, integrations, and platform-specific terminology. Each term includes context-specific explanations and links to full documentation.',
      tech: 'CI/CD terminology, DevOps concepts, feature flags, RBAC, DORA metrics, SAML, OIDC, VSM, ASPM',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/lexicon',
    },
    {
      id: 7,
      title: 'GitHub Actions Integration with CloudBees Platform',
      category: 'Integration Documentation',
      summary:
        'Created integration documentation enabling teams to connect GitHub Actions workflows to CloudBees Platform. Includes getting started guide, workflow/run visualization setup, and guides for artifact registration, test result publishing, evidence collection, and security scanning integration with 6 tools (Black Duck, Coverity, Gitleaks, Gosec, Grype, Trivy). Documentation covers supported trigger types, job logs, run details, and analytics dashboard integration.',
      tech: 'GitHub Actions, GitHub App, workflow integration, artifact traceability, security scanning, JUnit, evidence data, analytics dashboards',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/github-actions',
    },
  ];

  const handleLinkPress = (url) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  const ProjectCard = ({ project }) => (
    <View style={[styles.card, isDesktop && styles.cardDesktop]}>
      <View style={styles.cardHeader}>
        <View style={styles.headerText}>
          <Text style={styles.cardTitle}>{project.title}</Text>
          <Text style={styles.cardCategory}>{project.category}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Summary:</Text>
          <Text style={styles.sectionText}>{project.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Technologies:</Text>
          <Text style={styles.sectionText}>{project.tech}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={() => handleLinkPress(project.link)}>
          <Text style={styles.viewButtonText}>View Documentation</Text>
          <Ionicons name='open-outline' size={16} color='#2563eb' />
        </TouchableOpacity>

        {project.sourceLink && (
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleLinkPress(project.sourceLink)}>
            <Text style={styles.viewButtonText}>{project.sourceLabel}</Text>
            <Ionicons name='logo-github' size={16} color='#2563eb' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const ProjectAccordion = ({ project }) => {
    const isExpanded = expandedMobile === project.id;

    return (
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setExpandedMobile(isExpanded ? null : project.id)}>
          <View style={styles.accordionHeaderContent}>
            <View style={styles.accordionTitleContainer}>
              <Text style={styles.accordionTitle}>{project.title}</Text>
              <Text style={styles.accordionCategory}>{project.category}</Text>
            </View>
          </View>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color='#94a3b8' />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.accordionContent}>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Summary:</Text>
              <Text style={styles.sectionText}>{project.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Technologies:</Text>
              <Text style={styles.sectionText}>{project.tech}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleLinkPress(project.link)}>
                <Text style={styles.viewButtonText}>View Documentation</Text>
                <Ionicons name='open-outline' size={16} color='#2563eb' />
              </TouchableOpacity>

              {project.sourceLink && (
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleLinkPress(project.sourceLink)}>
                  <Text style={styles.viewButtonText}>{project.sourceLabel}</Text>
                  <Ionicons name='logo-github' size={16} color='#2563eb' />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>
        {/* Hero Section */}
        <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
          <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
            Technical Documentation Portfolio
          </Text>
          <Text style={[styles.heroSubtitle, isDesktop && styles.heroSubtitleDesktop]}>
            Senior Technical Writer specializing in developer documentation, API references,
            integration guides, and user documentation for enterprise software platforms.
          </Text>
          <View style={[styles.badges, isDesktop && styles.badgesDesktop]}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>API Documentation</Text>
            </View>
            <View style={[styles.badge, styles.badgePurple]}>
              <Text style={styles.badgeTextPurple}>Integration Guides</Text>
            </View>
            <View style={[styles.badge, styles.badgeGreen]}>
              <Text style={styles.badgeTextGreen}>Developer Experience</Text>
            </View>
          </View>
        </View>

        {/* Projects - Desktop Cards or Mobile Accordions */}
        {isDesktop ? (
          <View style={styles.cardsContainer}>
            <View style={styles.cardsGrid}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.accordionList}>
            {projects.map((project) => (
              <ProjectAccordion key={project.id} project={project} />
            ))}
          </View>
        )}

        {/* Call to Action */}
        <View style={styles.cta}>
          <Text style={[styles.ctaTitle, isDesktop && styles.ctaTitleDesktop]}>
            Let's Create Documentation That Works
          </Text>
          <Text style={styles.ctaSubtitle}>
            I help teams build clear, comprehensive documentation that reduces support costs and
            accelerates user adoption.
          </Text>
          <View style={[styles.ctaButtons, isDesktop && styles.ctaButtonsDesktop]}>
            <TouchableOpacity
              style={[styles.ctaButtonPrimary, isDesktop && styles.ctaButtonPrimaryDesktop]}>
              <Text style={styles.ctaButtonPrimaryText}>View Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ctaButtonSecondary, isDesktop && styles.ctaButtonSecondaryDesktop]}>
              <Text style={styles.ctaButtonSecondaryText}>Get in Touch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
    width: '100%',
    alignSelf: 'center',
  },
  contentDesktop: {
    maxWidth: 1200,
    paddingHorizontal: 32,
  },
  hero: {
    marginBottom: 32,
    alignItems: 'center',
  },
  heroDesktop: {
    alignItems: 'flex-start',
    marginBottom: 48,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 36,
  },
  heroTitleDesktop: {
    fontSize: 40,
    textAlign: 'left',
    lineHeight: 48,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  heroSubtitleDesktop: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 28,
    marginBottom: 24,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  badgesDesktop: {
    justifyContent: 'flex-start',
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 20,
  },
  badgeText: {
    color: '#1e40af',
    fontWeight: '600',
    fontSize: 14,
  },
  badgePurple: {
    backgroundColor: '#f3e8ff',
  },
  badgeTextPurple: {
    color: '#7e22ce',
    fontWeight: '600',
    fontSize: 14,
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
  },
  badgeTextGreen: {
    color: '#15803d',
    fontWeight: '600',
    fontSize: 14,
  },
  cardsContainer: {
    marginBottom: 32,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
    width: '100%',
    marginBottom: 16,
  },
  cardDesktop: {
    width: '48%',
    marginBottom: 0,
  },
  cardHeader: {
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  cardCategory: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  cardContent: {
    gap: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButtonText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 14,
  },
  accordionList: {
    gap: 12,
    marginBottom: 32,
  },
  accordion: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  accordionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  accordionTitleContainer: {
    flex: 1,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  accordionCategory: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  accordionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12,
  },
  cta: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 30,
  },
  ctaTitleDesktop: {
    fontSize: 28,
    lineHeight: 36,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  ctaButtons: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  ctaButtonsDesktop: {
    flexDirection: 'row',
    width: 'auto',
    gap: 16,
  },
  ctaButtonPrimary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
  },
  ctaButtonPrimaryDesktop: {
    width: 'auto',
    minWidth: 150,
  },
  ctaButtonPrimaryText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  ctaButtonSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    width: '100%',
  },
  ctaButtonSecondaryDesktop: {
    width: 'auto',
    minWidth: 150,
  },
  ctaButtonSecondaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
