import { ReactNode } from 'react';
import { CVData } from '../../types/cv';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-4">
    <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">{title}</h3>
    {children}
  </section>
);

const BodySections = ({ data }: { data: CVData }) => (
  <>
    {data.sectionOrder.map((key) => {
      if (!data.visibilitySettings[key]) return null;
      if (key === 'summary' && data.summary) return <Section key={key} title="Podsumowanie"><p>{data.summary}</p></Section>;
      if (key === 'experience' && data.experience.length) return <Section key={key} title="Doświadczenie">{data.experience.map((x)=><div key={x.id} className="mb-2"><b>{x.position}</b> • {x.company}<p className="text-xs">{x.startDate} - {x.current ? 'Obecnie' : x.endDate}</p><ul className="list-disc pl-4 text-sm">{x.achievements.map((a,i)=><li key={i}>{a}</li>)}</ul></div>)}</Section>;
      if (key === 'education' && data.education.length) return <Section key={key} title="Wykształcenie">{data.education.map((x)=><p key={x.id}><b>{x.degree}</b>, {x.institution}</p>)}</Section>;
      if (key === 'skills' && data.skills.length) return <Section key={key} title="Umiejętności"><p>{data.skills.map((x)=>`${x.name} (${x.level})`).join(' • ')}</p></Section>;
      if (key === 'projects' && data.projects.length) return <Section key={key} title="Projekty">{data.projects.map((x)=><p key={x.id}><b>{x.name}</b> — {x.description}</p>)}</Section>;
      if (key === 'languages' && data.languages.length) return <Section key={key} title="Języki"><p>{data.languages.map((x)=>`${x.name} (${x.level})`).join(', ')}</p></Section>;
      if (key === 'certificates' && data.certificates.length) return <Section key={key} title="Certyfikaty">{data.certificates.map((x)=><p key={x.id}>{x.name} ({x.issuer})</p>)}</Section>;
      if (key === 'links' && data.links.length) return <Section key={key} title="Linki">{data.links.map((x)=><p key={x.id}>{x.label}: {x.url}</p>)}</Section>;
      if (key === 'interests' && data.interests.length) return <Section key={key} title="Zainteresowania"><p>{data.interests.map((x)=>x.name).join(', ')}</p></Section>;
      if (key === 'references' && data.references.length) return <Section key={key} title="Referencje">{data.references.map((x)=><p key={x.id}>{x.name} — {x.contact}</p>)}</Section>;
      if (key === 'customSections' && data.customSections.length) return <Section key={key} title="Sekcje własne">{data.customSections.map((x)=><p key={x.id}><b>{x.sectionTitle}</b>: {x.content}</p>)}</Section>;
      return null;
    })}
  </>
);

export const TemplateRenderer = ({ data }: { data: CVData }) => {
  const style = { fontFamily: data.settings.fontFamily, ['--accent' as string]: data.settings.accentColor };
  const commonHeader = (
    <header className="mb-4 border-b pb-3" style={{ borderColor: data.settings.accentColor }}>
      <h1 className="text-3xl font-bold" style={{ color: data.settings.accentColor }}>{data.personalInfo.fullName || 'Twoje Imię i Nazwisko'}</h1>
      <p className="font-medium">{data.personalInfo.title}</p>
      <p className="text-sm">{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</p>
    </header>
  );

  if (data.settings.template === 'classic') return <div className="cv-page p-10 text-[14px]" style={style}>{commonHeader}<BodySections data={data} /></div>;
  if (data.settings.template === 'minimal') return <div className="cv-page p-8 text-[13px] leading-relaxed" style={style}>{commonHeader}<BodySections data={data} /></div>;
  return (
    <div className="cv-page p-8" style={style}>
      {commonHeader}
      <div className={data.settings.layout === 'two-column' ? 'grid grid-cols-3 gap-6' : ''}>
        {data.settings.layout === 'two-column' ? <aside className="col-span-1 text-sm"><Section title="Kontakt"><p>{data.personalInfo.website}</p></Section><Section title="Umiejętności"><p>{data.skills.map((x)=>x.name).join(', ')}</p></Section></aside> : null}
        <main className={data.settings.layout === 'two-column' ? 'col-span-2 text-sm' : 'text-sm'}><BodySections data={data} /></main>
      </div>
    </div>
  );
};
