import Link from 'next/link';
import ConsultForm from '@/components/ConsultForm';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import ShortVideo from '@/components/ShortVideo';
import { allFaqs, getPosts, settings as s } from '@/lib/content';
import { faqPage } from '@/lib/schema';

export const metadata = {
  title: 'General Surgeon in Los Angeles | Dr. Babak Moein, MD',
  description:
    'Board-certified general surgeon Dr. Babak Moein performs minimally invasive hernia, gallbladder and appendix surgery in Century City, Los Angeles.',
  alternates: { canonical: '/' },
};

const homeQuestions = [
  'Can you heal a hernia without surgery?',
  'How long does it take to recover from hernia surgery?',
  'What is the difference between open and laparoscopic hernia surgery?',
  'What are the symptoms of an inguinal hernia?',
  'What does gallstone pain feel like?',
  'How long does it take to recover from gallbladder surgery?',
];
const homeFaqs = homeQuestions.map((q) => allFaqs.find((f) => f.q === q)!).filter(Boolean);


const shorts = [
  { id: 'Kb_Gk0Bsemo', title: 'What is an inguinal hernia?' },
  { id: 'TVUIxAdJQww', title: 'What is an umbilical hernia and how is it treated?' },
  { id: 'tX0BrRUNn8w', title: 'What is a hiatal hernia and how is it treated?' },
  { id: 'wXeKxpQPlkA', title: 'Is it really acid reflux?' },
];

const guideSlugs = [
  { slug: 'signs-you-need-gallbladder-surgery-and-when-you-can-safely-wait', topic: 'Gallbladder' },
  { slug: 'gallbladder-surgery-recovery-week-by-week', topic: 'Gallbladder' },
  { slug: 'inguinal-hernia-when-surgery-becomes-necessary', topic: 'Hernia' },
  { slug: 'hernia-mesh-vs-non-mesh-repair-2026', topic: 'Hernia' },
];

export default function Home() {
  const posts = getPosts();
  const guides = guideSlugs
    .map((g) => ({ ...g, post: posts.find((p) => p.slug === g.slug) }))
    .filter((g) => g.post);
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...faqPage(homeFaqs, `${s.baseUrl}/`) }} />

      <section className="x-hero">
        <div className="x-panel x-blush x-hero-grid">
          <div className="x-hero-copy">
            <p className="x-pill">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              Over 1 million people have watched Dr. Moein explain gallbladder surgery
            </p>
            <h1>General surgery in Los&nbsp;Angeles, through the <mark>smallest incision</mark> that works.</h1>
            <p className="lede">
              Dr. Babak Moein is a board-certified general surgeon in Century City. His general surgery practice treats
              hernias, gallbladder disease and appendicitis mostly laparoscopically. Most patients go home the same day.
            </p>
            <nav className="x-chooser" aria-labelledby="chooser-title">
              <p id="chooser-title">What brought you here?</p>
              <div>
                <Link className="c-hernia" href="/hernia-surgery-los-angeles-ca/"><strong>A hernia or a bulge</strong><span>Groin, belly button or chest</span></Link>
                <Link className="c-gall" href="/gallbladder-surgery-in-los-angeles/"><strong>Gallbladder pain</strong><span>Gallstones or inflammation</span></Link>
                <Link className="c-appx" href="/laparoscopic-appendectomy-in-los-angeles/"><strong>My appendix</strong><span>Appendicitis is treated as urgent</span></Link>
              </div>
            </nav>
            <div className="actions">
              <Link className="btn btn-marker" href="/contact-us/#request">Request a consultation</Link>
              <a className="btn btn-white" href={`tel:${s.phoneE164}`}>Call {s.phone}</a>
            </div>
          </div>
          <div className="x-hero-video">
            <ShortVideo id="rwLGf0ovWIc" title="How gallbladder surgery is performed" size="hero" />
            <p className="x-views"><strong>1M+ views</strong><span>How gallbladder surgery is performed</span></p>
          </div>
        </div>
      </section>

      <section className="section x-tight-bottom">
        <div className="wrap">
          <div className="x-head">
            <div>
              <h2>Watch before your visit</h2>
              <p>Dr. Moein explains each condition and operation in about a minute.</p>
            </div>
          </div>
          <div className="x-shorts">
            {shorts.map((v) => (
              <figure key={v.id}>
                <ShortVideo id={v.id} title={v.title} />
                <figcaption>{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="procedures">
        <div className="wrap">
          <div className="x-head">
            <div>
              <h2>Surgical services in Los Angeles</h2>
              <p>
                Dr. Moein&rsquo;s surgical services include hernia repair (inguinal, hiatal and paraesophageal), gallbladder
                surgery and laparoscopic appendectomy. Each service page explains the condition, how the operation is done,
                and what recovery looks like, in plain language.
              </p>
            </div>
          </div>
          <div className="x-services">
            <div className="x-svc x-svc-dark">
              <h3>Hernia</h3>
              <p>Most hernias do not heal on their own and tend to grow.</p>
              <ul>
                <li><Link href="/hernia-surgery-los-angeles-ca/">Hernia surgery</Link></li>
                <li><Link href="/inguinal-hernia-surgery-in-los-angeles-ca/">Inguinal hernia</Link></li>
                <li><Link href="/expert-hiatal-hernia-surgery-in-los-angeles/">Hiatal hernia</Link></li>
                <li><Link href="/laparoscopic-paraesophageal-hernia-surgery-in-los-angeles-ca/">Paraesophageal hernia</Link></li>
              </ul>
            </div>
            <Link className="x-svc x-sand" href="/gallbladder-surgery-in-los-angeles/">
              <h3>Gallbladder</h3>
              <p>Removes a gallbladder that is causing pain from gallstones or inflammation.</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/laparoscopic-gallbladder-surgery.webp" alt="Laparoscopic gallbladder surgery illustration" width={768} height={576} loading="lazy" />
              <span className="go">Gallbladder surgery</span>
            </Link>
            <Link className="x-svc x-sky" href="/laparoscopic-appendectomy-in-los-angeles/">
              <h3>Appendix</h3>
              <p>Removes an inflamed appendix through a few small incisions. Appendicitis is treated as urgent.</p>
              <span className="go">Laparoscopic appendectomy</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="x-band-wrap">
        <div className="x-panel x-ink">
          <h2>What to expect, step by step</h2>
          <p className="x-sub">Your surgeon and surgical team, from first visit to final check-up.</p>
          <ol className="x-steps">
            <li><span>Step 1</span><strong>Consultation</strong><p>In person in Century City or by video.</p></li>
            <li><span>Step 2</span><strong>Surgery</strong><p>Mostly laparoscopic, through small incisions.</p></li>
            <li><span>Step 3</span><strong>Home the same day</strong><p>Most patients recover at home.</p></li>
            <li><span>Step 4</span><strong>Follow-up</strong><p>Dr. Moein and his team follow you through recovery.</p></li>
          </ol>
          <Link className="x-link-light" href="/pre-and-post-instructions/">Pre- and post-surgery instructions</Link>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="section x-tight-bottom">
          <div className="wrap">
            <div className="x-head">
              <div><h2>Guides to read before you decide</h2></div>
              <Link href="/blog/" className="x-more">All guides</Link>
            </div>
            <div className="x-guides">
              {guides.map((g) => (
                <Link key={g.slug} href={`/${g.slug}/`} className={g.topic === 'Hernia' ? 'x-sky' : 'x-sand'}>
                  <span className={`x-topic ${g.topic === 'Hernia' ? 't-blue' : 't-amber'}`}>{g.topic}</span>
                  <strong>{g.post!.title}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="x-band-wrap x-gap-top">
        <div className="x-panel x-sand doctor">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dr-moein-3.webp" alt={`${s.doctor.name}, ${s.doctor.credentials}`} width={489} height={630} loading="lazy" />
          <div>
            <h2>Your surgeon and surgical team, from first visit to final check-up</h2>
            <p style={{ marginTop: '1rem', maxWidth: '60ch' }}>
              Dr. Moein is a Los Angeles native and a Fellow of the American College of Surgeons with more than 20 years of surgical
              experience. He focuses on minimally invasive abdominal surgery and he and his surgical team follow each patient through recovery.
            </p>
            <dl className="x-creds">
              {s.doctor.education.map((e) => (
                <div key={e.school}>
                  <dt>{e.school}</dt>
                  <dd>{e.detail}</dd>
                </div>
              ))}
              <div>
                <dt>{s.doctor.board}</dt>
                <dd>Board certified in general surgery</dd>
              </div>
            </dl>
            <Link className="btn btn-ink" href="/general-surgeon-dr-babak-moein/">About Dr. Moein</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="x-head"><div><h2>What patients say</h2></div></div>
          <div className="x-quotes">
            <blockquote>
              <p>Dr. Moein performed my hernia surgery laparoscopically. Recovery was much faster than I expected, and I was back at work in a few days.</p>
              <footer>Michael R., hernia repair</footer>
            </blockquote>
            <blockquote>
              <p>He removed my gallbladder laparoscopically. The whole process was seamless, and his team supported me through recovery.</p>
              <footer>James K., gallbladder surgery</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section x-tight-top">
        <div className="wrap">
          <div className="x-head">
            <div>
              <h2>Minimally invasive or open general surgery?</h2>
              <p>
                Dr. Moein operates laparoscopically whenever they are safe for your case. Open surgery is still the right
                choice for some large or complicated repairs.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="compare">
              <thead>
                <tr><th scope="col">What changes</th><th scope="col">Minimally invasive</th><th scope="col">Open</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Incisions</th><td>A few small incisions</td><td>One longer incision</td></tr>
                <tr><th scope="row">Going home</th><td>Usually the same day</td><td>Sometimes an overnight stay</td></tr>
                <tr><th scope="row">Pain after surgery</th><td>Usually less</td><td>Usually more</td></tr>
                <tr><th scope="row">Back to desk work</th><td>Often within a week</td><td>Often two weeks or more</td></tr>
                <tr><th scope="row">Scarring</th><td>Small, easy to hide</td><td>A longer scar</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section x-tight-top">
        <div className="wrap">
          <div className="x-head">
            <div><h2>Common questions about general surgery</h2></div>
            <Link href="/frequently-asked-question/" className="x-more">See all questions</Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <section className="x-band-wrap x-last" id="contact">
        <div className="x-panel x-ink contact-grid">
          <div>
            <h2>Talk to Dr. Moein&rsquo;s team about your surgery.</h2>
            <p className="x-sub">Century City, Los Angeles. Consultations in person or by video.</p>
            <address className="nap">
              <strong>{s.siteName}</strong>
              {s.street}<br />
              {s.city}, {s.region} {s.postalCode}<br />
              <a href={`tel:${s.phoneE164}`}>{s.phone}</a><br />
              <a href={`mailto:${s.email}`}>{s.email}</a>
            </address>
            <iframe className="map" src={s.mapEmbed} title="Map to General Surgery LA in Century City" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <ConsultForm />
        </div>
      </section>
    </>
  );
}
