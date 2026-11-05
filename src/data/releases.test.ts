import { describe, expect, it } from 'vitest';
import { parseProjectRepository } from './releases';

describe('parseProjectRepository', () => {
  it('extracts a GitHub repository without a branch', () => {
    expect(parseProjectRepository('https://github.com/octocat/Hello-World')).toEqual({
      path: 'octocat/Hello-World',
      ref: undefined,
    });
  });

  it('preserves branch names that contain slashes', () => {
    expect(
      parseProjectRepository('https://github.com/octocat/Hello-World/tree/feature/dark-mode'),
    ).toEqual({ path: 'octocat/Hello-World', ref: 'feature/dark-mode' });
  });

  it('decodes escaped branch separators', () => {
    expect(
      parseProjectRepository('https://github.com/octocat/Hello-World/tree/feature%2Fdark-mode'),
    ).toEqual({ path: 'octocat/Hello-World', ref: 'feature/dark-mode' });
  });

  it.each([
    undefined,
    'http://github.com/octocat/Hello-World',
    'https://example.com/octocat/Hello-World',
    'https://github.com/octocat',
    'not a URL',
  ])('rejects an invalid repository URL: %s', (url) => {
    expect(parseProjectRepository(url)).toBeNull();
  });
});
