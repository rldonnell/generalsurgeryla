import { settings as s, Doc, Faq, url } from './content';
import videoTitles from '@/content/videos.json';
import videoDates from '@/content/video-dates.json';

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
        sameAs: [...s.social.map((x) => x.url), ...(s.gbpUrl ? [s.gbpUrl] : [])].length ? [...s.social.map((x) => x.url), ...(s.gbpUrl ? [s.gbpUrl] : [])] : undefined,
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
        knowsAbout: ['Hernia repair', 'Laparoscopic surgery', 'Cholecystectomy (gallbladder removal)', 'Appendectomy'],
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

type Cond = { name: string; alt?: string[]; symptoms: string[]; risks?: string[]; anatomy: string; bodyLocation: string; prep: string; followup: string };
const CONDITIONS: Record<string, Cond> = {
  'hernia-surgery-los-angeles-ca': {
    name: 'Hernia', alt: ['Abdominal wall hernia'],
    symptoms: ['Visible bulge or swelling', 'Pain or discomfort at the site', 'Heaviness or pressure in the abdomen or groin', 'Bulge that is worse when standing or coughing'],
    risks: ['Heavy lifting', 'Chronic coughing', 'Obesity', 'Straining during bowel movements', 'Previous abdominal surgery'],
    anatomy: 'Abdominal wall', bodyLocation: 'Abdominal wall',
    prep: 'Pre-operative evaluation, medication review, and fasting before anesthesia.',
    followup: 'Post-operative check of healing, with lifting restrictions during recovery. Most patients return to full activity in four to six weeks.',
  },
  'inguinal-hernia-surgery-in-los-angeles-ca': {
    name: 'Inguinal hernia', alt: ['Groin hernia'],
    symptoms: ['Bulge in the groin', 'Groin pain or heaviness, worse with lifting or coughing'],
    risks: ['Male sex', 'Family history of hernia', 'Chronic cough', 'Straining'],
    anatomy: 'Groin', bodyLocation: 'Groin',
    prep: 'Pre-operative evaluation, medication review, and fasting before anesthesia.',
    followup: 'Post-operative check of healing. Many patients return to desk work within about a week.',
  },
  'expert-hiatal-hernia-surgery-in-los-angeles': {
    name: 'Hiatal hernia',
    symptoms: ['Heartburn and acid reflux', 'Regurgitation', 'Chest pressure or discomfort', 'Difficulty swallowing', 'Feeling full quickly'],
    anatomy: 'Diaphragm and stomach', bodyLocation: 'Upper abdomen and diaphragm',
    prep: 'Diagnostic testing such as endoscopy and a review of reflux symptoms.',
    followup: 'Gradual return to a normal diet and activity, guided by the surgeon.',
  },
  'laparoscopic-paraesophageal-hernia-surgery-in-los-angeles-ca': {
    name: 'Paraesophageal hernia', alt: ['Type II to IV hiatal hernia'],
    symptoms: ['Chest pain after meals', 'Difficulty swallowing', 'Feeling full quickly', 'Reflux'],
    anatomy: 'Stomach and diaphragm', bodyLocation: 'Upper abdomen and diaphragm',
    prep: 'Diagnostic testing such as endoscopy and imaging, and fasting before anesthesia.',
    followup: 'Gradual return to a normal diet and activity, guided by the surgeon.',
  },
  'gallbladder-surgery-in-los-angeles': {
    name: 'Gallstones', alt: ['Cholelithiasis', 'Gallbladder disease'],
    symptoms: ['Pain in the upper right abdomen, often after fatty meals', 'Nausea', 'Pain that spreads to the back or right shoulder'],
    risks: ['Rapid weight loss', 'Obesity', 'Female sex', 'Family history of gallstones'],
    anatomy: 'Gallbladder', bodyLocation: 'Gallbladder',
    prep: 'Ultrasound or other imaging, and fasting before anesthesia.',
    followup: 'Post-operative check of healing and guidance on returning to a normal diet and activity.',
  },
  'laparoscopic-appendectomy-in-los-angeles': {
    name: 'Appendicitis',
    symptoms: ['Pain that starts near the belly button and moves to the lower right abdomen', 'Nausea', 'Fever', 'Loss of appetite'],
    anatomy: 'Appendix', bodyLocation: 'Appendix',
    prep: 'Urgent evaluation and imaging as needed.',
    followup: 'Post-operative check of healing. Most patients with uncomplicated appendicitis return to light activity within about a week.',
  },
};

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
  const cond = CONDITIONS[doc.slug];

  if (doc.kind === 'procedure') {
    graph.push({
      '@type': 'MedicalWebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: doc.metaTitle,
      description: doc.description,
      isPartOf: { '@id': IDS.website },
      about: { '@id': cond ? `${pageUrl}#condition` : `${pageUrl}#procedure` },
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
      ...(cond ? { bodyLocation: cond.bodyLocation, preparation: cond.prep, followup: cond.followup } : {}),
    });
    if (cond) {
      graph.push({
        '@type': 'MedicalCondition',
        '@id': `${pageUrl}#condition`,
        name: cond.name,
        ...(cond.alt ? { alternateName: cond.alt } : {}),
        url: pageUrl,
        signOrSymptom: cond.symptoms.map((n) => ({ '@type': 'MedicalSymptom', name: n })),
        ...(cond.risks ? { riskFactor: cond.risks.map((n) => ({ '@type': 'MedicalRiskFactor', name: n })) } : {}),
        associatedAnatomy: { '@type': 'AnatomicalStructure', name: cond.anatomy },
        possibleTreatment: { '@id': `${pageUrl}#procedure` },
      });
    }
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
  // VideoObject only when a real upload date is on file (content/video-dates.json). Google requires uploadDate.
  const dates = videoDates as Record<string, string>;
  const titles = videoTitles as Record<string, string>;
  for (const id of doc.videos) {
    if (!dates[id]) continue;
    graph.push({
      '@type': 'VideoObject',
      name: titles[id] || doc.title,
      description: `${titles[id] || doc.title}. Dr. Babak Moein explains.`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      contentUrl: `https://www.youtube.com/watch?v=${id}`,
      uploadDate: dates[id],
      publisher: { '@id': IDS.clinic },
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
