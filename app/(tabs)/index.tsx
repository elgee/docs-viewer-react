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
import PropTypes from 'prop-types';

export default function Portfolio() {
  const [expandedMobile, setExpandedMobile] = useState(null);
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  const projects = [
    {
      id: 1,
      title: 'CloudBees platform actions reference',
      category: 'Workflow automation documentation',
      summary:
        'Documented 50+ pages of workflow automation actions organized into 15+ hierarchical categories. Use the documentation left navigation to expand categories (Build tools, Deploy tools, Security scanners, etc.) and view individual action pages. Each action includes prerequisites, parameters, and YAML workflow examples.',
      tech: 'CI/CD, YAML, GitHub Actions, Jenkins, AWS, Docker, Helm, Kubernetes, security scanning (including Snyk, Coverity, Trivy), AsciiDoc',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/actions',
    },
    {
      id: 2,
      title: 'SAML single sign-on (SSO) configuration guide',
      category: 'Security and authentication documentation',
      summary:
        'Created comprehensive enterprise authentication guide for configuring SAML 2.0 single sign-on in CloudBees platform. Includes domain verification procedures, identity provider integration steps, security requirements checklist, and connection management. Covers admin workflows for enabling strict mode, auto-provisioning, and MFA integration.',
      tech: 'SAML 2.0, SSO, DNS configuration, IdP integration, XML metadata, RSA-OAEP encryption, role-based access control, AsciiDoc',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/secure/single-sign-on',
    },
    {
      id: 3,
      title: 'GitHub Actions integration with CloudBees platform',
      category: 'Integration guide',
      summary:
        'Created 14-page usage guide enabling teams to visualize GitHub Actions workflows in CloudBees platform. Includes onboarding and instructions for artifact registration, test result publishing, evidence collection, and security scanning integration.',
      tech: 'GitHub Actions, GitHub App, workflow integration, artifact traceability, security scanning, JUnit, evidence data, analytics dashboards, AsciiDoc',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/github-actions/intro',
    },
    {
      id: 4,
      title: 'Testing Stripe API endpoints with Postman',
      category: 'API testing documentation',
      summary:
        'Created technical guide demonstrating how to use Postman to test Stripe payment API endpoints. Documentation authored in DITA XML and published to PDF using DITA Open Toolkit. Includes setup instructions, endpoint testing procedures, and example API calls for payment processing workflows.',
      tech: 'DITA XML, DITA-OT, Postman, Stripe API, REST API testing, payment processing',
      link: 'https://technical-writer-portfolio.netlify.app/stripe-api-test.pdf',
      sourceLink: 'https://github.com/elgee/stripe-api-test-docs',
      sourceLabel: 'View DITA source',
    },
    {
      id: 5,
      title: 'CloudBees CI and Jenkins integration with CloudBees platform',
      category: 'Integration guide',
      summary:
        'Created 6-page integration guide enabling enterprise teams to connect Jenkins/CloudBees CI pipelines to CloudBees platform for utilizing its security and analytics features. Includes step-by-step setup and usage examples.',
      tech: 'Jenkins, CloudBees CI, Multibranch Pipelines, GitHub, Jenkinsfile, security scanning tools, VSM dashboards, AsciiDoc',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/continuous-integration/intro',
    },
    {
      id: 6,
      title: 'Testing Stripe API endpoints with cURL',
      category: 'API testing documentation',
      summary:
        'Created technical guide demonstrating how to use cURL to test Stripe payment API endpoints. Documentation written in Markdown with command examples, endpoint descriptions, and payment processing workflows. Covers authentication, request formatting, and response handling.',
      tech: 'Markdown, cURL, Stripe API, REST API testing, command-line tools, payment processing',
      link: 'https://github.com/elgee/docs-viewer-react/blob/main/stripe-api-test-curl.md',
    },
    {
      id: 7,
      title: 'CloudBees platform lexicon',
      category: 'Technical glossary',
      summary:
        'Created comprehensive glossary defining 80+ terms used across the CloudBees platform. Includes definitions for workflows, CI/CD concepts, feature management, security terms, analytics, integrations, and platform-specific terminology. Each term includes context-specific explanations and links to full documentation.',
      tech: 'CI/CD terminology, DevOps concepts, feature flags, RBAC, OIDC, AsciiDoc',
      link: 'https://docs.cloudbees.com/docs/cloudbees-platform/latest/lexicon',
    },
    {
      id: 8,
      title: 'Portfolio app documentation',
      category: 'Mobile app documentation',
      summary:
        'Created README documentation for this React Native portfolio app built with Expo. Includes setup instructions, deployment process to Netlify, and technical architecture details. Demonstrates cross-platform development (iOS, web) and responsive design principles.',
      tech: 'React Native, Expo, Netlify, JavaScript, responsive design',
      link: 'https://github.com/elgee/docs-viewer-react/?tab=readme-ov-file#expo-mobile-app-to-display-my-documentation-portfolio',
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Workflow automation documentation': '#3b82f6', // blue
      'Security and authentication documentation': '#ef4444', // red
      'Integration guide': '#10b981', // green
      'API testing documentation': '#8b5cf6', // purple
      'Technical glossary': '#f59e0b', // amber
      'Mobile app documentation': '#ec4899', // pink
    };
    return colors[category] || '#6b7280'; // gray as default
  };

  const handleLinkPress = (link) => {
    if (Platform.OS === 'web') {
      window.open(link, '_blank');
    } else {
      Linking.openURL(link);
    }
  };

  const ProjectCard = ({ project }) => (
    <View style={[styles.card, isDesktop && styles.cardDesktop]}>
      <View style={styles.cardHeader}>
        <View style={styles.headerText}>
          <Text style={styles.cardTitle}>{project.title}</Text>
          <Text
            style={[styles.cardCategory, { backgroundColor: getCategoryColor(project.category) }]}>
            {project.category}
          </Text>
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
          <Text style={styles.viewButtonTextDesktop}>View documentation</Text>
          <Ionicons name='open-outline' size={18} color='#60a5fa' />
        </TouchableOpacity>

        {project.sourceLink && (
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleLinkPress(project.sourceLink)}>
            <Text style={styles.viewButtonTextDesktop}>{project.sourceLabel}</Text>
            <Ionicons name='logo-github' size={18} color='#60a5fa' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  ProjectCard.propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      tech: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      sourceLink: PropTypes.string,
      sourceLabel: PropTypes.string,
    }).isRequired,
  };

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
              <Text
                style={[
                  styles.accordionCategoryBadge,
                  { backgroundColor: getCategoryColor(project.category) },
                ]}>
                {project.category}
              </Text>
            </View>
          </View>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color='#64748b' />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.accordionContent}>
            <View style={styles.section}>
              <Text style={styles.sectionLabelMobile}>Summary:</Text>
              <Text style={styles.sectionTextMobile}>{project.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabelMobile}>Technologies:</Text>
              <Text style={styles.sectionTextMobile}>{project.tech}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleLinkPress(project.link)}>
                <Text style={styles.viewButtonTextMobile}>View documentation</Text>
                <Ionicons name='open-outline' size={18} color='#1d4ed8' />
              </TouchableOpacity>

              {project.sourceLink && (
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleLinkPress(project.sourceLink)}>
                  <Text style={styles.viewButtonTextMobile}>{project.sourceLabel}</Text>
                  <Ionicons name='logo-github' size={18} color='#1d4ed8' />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  ProjectAccordion.propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      tech: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      sourceLink: PropTypes.string,
      sourceLabel: PropTypes.string,
    }).isRequired,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Hero Section - Full Width */}
      <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
        <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
          <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
            Technical documentation portfolio
          </Text>
          <Text style={[styles.heroSubtitle, isDesktop && styles.heroSubtitleDesktop]}>
            Senior Technical Writer / Documentation Engineer
          </Text>
          <Text style={[styles.heroSubtitle, isDesktop && styles.heroSubtitleDesktop]}>
            I specialize in developer documentation, API references, and integration guides for
            enterprise platforms. This portfolio showcases work authored by me with review and input
            from subject matter experts.
          </Text>
        </View>
      </View>

      {/* Projects - Centered Content */}
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>
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
      </View>

      {/* Call to Action - Full Width */}
      <View style={styles.cta}>
        <View style={[styles.ctaContent, isDesktop && styles.ctaContentDesktop]}>
          <Text style={[styles.ctaTitle, isDesktop && styles.ctaTitleDesktop]}>
            Creating documentation that enables user success
          </Text>
          <Text style={styles.ctaSubtitle}>
            I transform complex technical concepts into documentation that engages users.
          </Text>
          <View style={[styles.ctaButtons, isDesktop && styles.ctaButtonsDesktop]}>
            <TouchableOpacity
              style={[styles.ctaButtonPrimary, isDesktop && styles.ctaButtonPrimaryDesktop]}
              onPress={() =>
                handleLinkPress('https://technical-writer-portfolio.netlify.app/resume.pdf')
              }>
              <Text style={styles.ctaButtonPrimaryText}>View resume</Text>
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
    backgroundColor: '#0f172a',
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
    backgroundColor: '#1e293b',
    width: '100%',
  },
  heroDesktop: {
    marginBottom: 48,
  },
  heroContent: {
    padding: 16,
    width: '100%',
    alignSelf: 'center',
  },
  heroContentDesktop: {
    maxWidth: 1200,
    paddingHorizontal: 32,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 48,
    letterSpacing: -1,
  },
  heroTitleDesktop: {
    fontSize: 56,
    lineHeight: 64,
    textAlign: 'left',
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#94a3b8',
    marginBottom: 17,
    textAlign: 'left',
    lineHeight: 24,
  },
  heroSubtitleDesktop: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 28,
    marginBottom: 24,
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
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: '#334155',
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
    color: '#ffffff',
  },
  cardCategory: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
    fontWeight: '600',
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
    color: '#64748b',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  sectionLabelMobile: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  sectionTextMobile: {
    fontSize: 14,
    color: '#1e293b',
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
  // For desktop cards (dark background) - LIGHT blue
  viewButtonTextDesktop: {
    color: '#60a5fa', // Light blue for dark background
    fontWeight: '600',
    fontSize: 17,
  },

  // For mobile accordions (white background) - DARK blue
  viewButtonTextMobile: {
    color: '#1d4ed8', // Dark blue for white background
    fontWeight: '600',
    fontSize: 17,
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
    color: '#1e293b',
    marginBottom: 6,
  },
  accordionCategoryBadge: {
    fontSize: 11,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: '600',
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
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  ctaContent: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  ctaContentDesktop: {
    maxWidth: 1200,
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
});

