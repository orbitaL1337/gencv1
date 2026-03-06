import { ReactNode } from 'react';
import { SectionId } from '../types/cv';
import { Card } from './ui/card';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { CertificatesForm, InterestsForm, LanguagesForm, LinksForm, ReferencesForm } from './forms/SimpleListForms';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CustomSectionForm } from './forms/CustomSectionForm';

const forms: Record<SectionId, ReactNode> = {
  personalInfo: <PersonalInfoForm />,
  summary: <SummaryForm />,
  experience: <ExperienceForm />,
  education: <EducationForm />,
  skills: <SkillsForm />,
  projects: <ProjectsForm />,
  languages: <LanguagesForm />,
  certificates: <CertificatesForm />,
  links: <LinksForm />,
  interests: <InterestsForm />,
  references: <ReferencesForm />,
  customSections: <CustomSectionForm />,
};

export const SectionEditorRenderer = ({ section }: { section: SectionId }) => (
  <Card className="space-y-3">
    <h2 className="text-lg font-semibold">Edycja sekcji</h2>
    {forms[section]}
  </Card>
);
