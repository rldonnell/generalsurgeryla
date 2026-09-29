import { settings as s, Doc, Faq, url } from './content';

const base = s.baseUrl;
export const IDS = {
  clinic: `${base}/#clinic`,
  physician: `${base}/#physician`,
  website: `${base}/#website`,
};

const address = {
  '@type': 'PostalAddress',
  streetAddress: s.street,
  addressLocality: s.city,
  addressRegion: s.region,
  postalCode: s.postalCode,
  addressCountry: 'US',
};

export function siteGraph(procedures: Doc[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalClinic', 'MedicalBusiness'],
        '@id': IDS.clinic,
        name: s.siteName,
        url: `${base}/`,
        telephone: s.phoneE164,
        email: s.email,
        image: `${base}${s.doctor.photo}`,
        logo: `${base}/icon.svg`,
        address,
        geo: { '@type': 'GeoCoordinates', latitude: s.latitude, longitude: s.longitude },
        hasMap: `https://www.google.com/maps?q=${encodeURIComponent(`${s.street}, ${s.city}, ${s.region} ${s.postalCode}`)}`,
        openingHoursSpecification: s.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days.split(',').map((d) => DAY[d.trim()]),
          opens: h.opens,
          closes: h.closes,
        })),
        medicalSpecialty: ['Surgical', 'Gastroenterologic'],
        areaServed: { '@type': 'City', name: 'Los Angeles' },
        availableService: procedures.map((p) => ({ '@type': 'MedicalProcedure', name: p.navLabel, url: url(p.slug) })),
        employee: { '@id': IDS.physician },
        founder: { '@id': IDS.physician },
        sameAs: s.social.map((x) => x.url),
      },
      {
        '@type': 'Physician',
        '@id': IDS.physician,
        name: `${s.doctor.name.replace('Dr. ', '')}, ${s.doctor.credentials}`,
        alternateName: [s.doctor.fullName, s.doctor.name],
        honorificPrefix: 'Dr.',
        honorificSuffix: s.doctor.credentials,
        jobTitle: s.doctor.jobTitle,
        url: `${base}/general-surgeon-dr-babak-moein/`,
        image: `${base}${s.doctor.photo}`,
        telephone: s.phoneE164,
        address,
        medicalSpecialty: 'Surgical',
        worksFor: { '@id': IDS.clinic },
        memberOf: { '@type': 'Organization', name: 'American College of Surgeons' },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Board certification',
          recognizedBy: { '@type': 'Organization', name: s.doctor.board },
        },
        alumniOf: s.doctor.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
        sameAs: s.doctor.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': IDS.website,
        url: `${base}/`,
        name: s.siteName,
        publisher: { '@id': IDS.clinic },
        inLanguage: 'en-US',
      },
    ],
  };
}

const DAY: Record<string, string> = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}

export function faqPage(faqs: Faq[], pageUrl: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}


export function docGraph(doc: Doc) {
  const pageUrl = url(doc.slug);
  const graph: Record<string, unknown>[] = [];
  const reviewed = { '@id': IDS.physician };

  if (doc.kind === 'procedure') {
    graph.push({
      '@type': 'MedicalWebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: doc.metaTitle,
      description: doc.description,
      isPartOf: { '@id': IDS.website },
      about: { '@id': `${pageUrl}#procedure` },
      mainEntity: { '@id': `${pageUrl}#procedure` },
      author: reviewed,
      reviewedBy: reviewed,
      lastReviewed: doc.updated,
      dateModified: doc.updated,
      audience: { '@type': 'PeopleAudience', audienceType: 'Patient' },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.quick-answer'] },
      inLanguage: 'en-US',
    });
    graph.push({
      '@type': 'MedicalProcedure',
      '@id': `${pageUrl}#procedure`,
      name: doc.navLabel,
      url: pageUrl,
      description: doc.summary || doc.description,
      procedureType: doc.area === 'colon' ? 'https://schema.org/NoninvasiveProcedure' : 'https://schema.org/SurgicalProcedure',
      howPerformed: doc.summary,
      availableAtOrFrom: { '@id': IDS.clinic },
      performer: reviewed,
    });
    if (doc.faqs?.length) graph.push(faqPage(doc.faqs, pageUrl));
    graph.push(breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Procedures', path: '/#procedures' }, { name: doc.navLabel || doc.title, path: `/${doc.slug}/` }]));
  } else if (doc.kind === 'post') {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: doc.title,
      description: doc.description,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      datePublished: doc.date,
      dateModified: doc.updated || doc.date,
      author: reviewed,
      reviewedBy: reviewed,
      publisher: { '@id': IDS.clinic },
      isPartOf: { '@id': IDS.website },
      image: `${base}${s.doctor.photo}`,
      inLanguage: 'en-US',
    });
    graph.push(breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: doc.title, path: `/${doc.slug}/` }]));
  } else {
    const isAbout = doc.slug === 'general-surgeon-dr-babak-moein';
    graph.push({
      '@type': isAbout ? ['AboutPage', 'ProfilePage'] : 'MedicalWebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: doc.metaTitle,
      description: doc.description,
      isPartOf: { '@id': IDS.website },
      ...(isAbout ? { mainEntity: { '@id': IDS.physician } } : { reviewedBy: reviewed, lastReviewed: doc.updated }),
      dateModified: doc.updated,
      inLanguage: 'en-US',
    });
    graph.push(breadcrumbs([{ name: 'Home', path: '/' }, { name: doc.title, path: `/${doc.slug}/` }]));
  }
  // VideoObject intentionally omitted until real upload dates are confirmed (see README).
  return { '@context': 'https://schema.org', '@graph': graph };
}
