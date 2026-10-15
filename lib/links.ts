// One place that decides which posts and procedure pages point at each other.
// Edit the lists here; the pages build their "related" blocks from this map.
// Key = blog post slug. First procedure listed is the main one.
export const postProcedures: Record<string, string[]> = {
  'cholelithiasis-vs-cholecystitis': ['gallbladder-surgery-in-los-angeles'],
  'gallbladder-surgery-recovery-week-by-week': ['gallbladder-surgery-in-los-angeles'],
  'ozempic-and-gallstones-why-glp-1-weight-loss-raises-your-gallbladder-risk': ['gallbladder-surgery-in-los-angeles'],
  'signs-you-need-gallbladder-surgery-and-when-you-can-safely-wait': ['gallbladder-surgery-in-los-angeles'],
  'hernia-mesh-vs-non-mesh-repair-2026': ['hernia-surgery-los-angeles-ca', 'inguinal-hernia-surgery-in-los-angeles-ca'],
  'inguinal-hernia-when-surgery-becomes-necessary': ['inguinal-hernia-surgery-in-los-angeles-ca', 'hernia-surgery-los-angeles-ca'],
  'umbilical-hernia-adults-2026-guide': ['hernia-surgery-los-angeles-ca'],
  'hiatal-hernia-heartburn-surgery': ['expert-hiatal-hernia-surgery-in-los-angeles', 'laparoscopic-paraesophageal-hernia-surgery-in-los-angeles-ca'],
};

export const postsForProcedure = (procSlug: string) =>
  Object.entries(postProcedures).filter(([, procs]) => procs.includes(procSlug)).map(([post]) => post);

// Other posts that share a procedure with this one (fills a post's "keep reading" list).
export const siblingPosts = (postSlug: string) => {
  const mine = postProcedures[postSlug] || [];
  return Object.entries(postProcedures)
    .filter(([p, procs]) => p !== postSlug && procs.some((x) => mine.includes(x)))
    .map(([p]) => p);
};
