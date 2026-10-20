import { describe, expect, it } from 'vitest';
import { getProject, projects } from './projects';
import { locales, messages } from '../i18n/locales';

describe('project catalog', () => {
  it('has unique slugs and display numbers', () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((project) => project.number)).size).toBe(projects.length);
  });

  it('returns a project by slug and undefined for an unknown slug', () => {
    expect(getProject('spiderfinance')).toBe(
      projects.find((project) => project.slug === 'spiderfinance'),
    );
    expect(getProject('missing-project')).toBeUndefined();
  });

  it('references translated copy that exists in every locale', () => {
    for (const locale of locales) {
      const catalog = messages(locale, 'projects');
      const keys = new Set(Object.keys(catalog));

      for (const project of projects) {
        const prefix = project.slug.replace(/-([a-z])/g, (_, letter: string) =>
          letter.toUpperCase(),
        );
        const references = [
          `${prefix}Summary`,
          `${prefix}Description`,
          `${prefix}Eyebrow`,
          project.statusKey,
          project.contributionKey,
          project.quoteKey,
          project.scopeNoteKey,
          ...(project.featureKeys ?? []),
          ...(project.featureKeys ? [`${prefix}FeaturesTitle`] : []),
          ...(project.contributionSources ? [`${prefix}ContributionEvidence`] : []),
          ...(project.documentation?.map((item) => item.labelKey) ?? []),
          ...(project.screenshots?.map((image) => image.altKey) ?? []),
          ...(project.team?.map((member) => member.roleKey) ?? []),
        ].filter((key): key is string => Boolean(key));

        for (const key of references)
          expect(keys, `${locale}: ${project.slug} -> ${key}`).toContain(key);
      }
    }
  });
});
