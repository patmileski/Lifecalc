// lib/seo.js

export const SITE_NAME = 'LifeCalc';
export const SITE_URL = 'https://www.yourlifecalc.com';
export const SITE_DESCRIPTION = 'Free financial calculators for mortgage, line of credit, renovation costs, car loans, and recreation purchases. Get instant, accurate results with detailed breakdowns.';

export const CALCULATORS = [
  {
    slug: 'mortgage',
    title: 'Mortgage Calculator',
    shortTitle: 'Mortgage',
    description: 'Calculate your monthly mortgage payment with taxes, insurance, and full amortization breakdown.',
    keywords: 'mortgage calculator with taxes, monthly mortgage payment calculator, home loan calculator, amortization calculator',
    icon: '🏠',
    color: 'blue',
    href: '/mortgage-calculator',
  },
  {
    slug: 'loc',
    title: 'Line of Credit Calculator',
    shortTitle: 'Line of Credit',
    description: 'Find out how long it takes to pay off your line of credit and how much interest you\'ll pay.',
    keywords: 'line of credit payment calculator, HELOC calculator, LOC payoff calculator, credit line interest calculator',
    icon: '💳',
    color: 'purple',
    href: '/line-of-credit-calculator',
  },
  {
    slug: 'car',
    title: 'Car Loan Calculator',
    shortTitle: 'Car Loan',
    description: 'Calculate monthly payments, total interest, and true cost of ownership for new and used vehicles.',
    keywords: 'car loan calculator, auto loan calculator, new car payment calculator, used car loan calculator',
    icon: '🚗',
    color: 'green',
    href: '/car-loan-calculator',
  },
  {
    slug: 'renovation',
    title: 'Renovation Cost Calculator',
    shortTitle: 'Renovation',
    description: 'Estimate renovation financing costs, monthly payments, and total project cost whether you pay cash or finance.',
    keywords: 'renovation cost estimator, home renovation loan calculator, remodel financing calculator, home improvement cost calculator',
    icon: '🔨',
    color: 'orange',
    href: '/renovation-calculator',
  },
  {
    slug: 'recreation',
    title: 'Recreation & Lifestyle Calculator',
    shortTitle: 'Recreation',
    description: 'Calculate the true monthly and yearly cost of boats, RVs, ATVs, and vacation purchases.',
    keywords: 'boat affordability calculator, RV cost calculator, recreation vehicle loan calculator, lifestyle purchase affordability',
    icon: '⛵',
    color: 'teal',
    href: '/recreation-calculator',
  },
];

export function getPageMeta({ title, description, slug, keywords }) {
  const fullTitle = `${title} | ${SITE_NAME} — Free Financial Calculators`;
  return {
    title: fullTitle,
    description,
    keywords,
    canonical: `${SITE_URL}/${slug}`,
    og: {
      title: fullTitle,
      description,
      type: 'website',
      url: `${SITE_URL}/${slug}`,
      siteName: SITE_NAME,
    },
  };
}

export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildCalculatorSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}
