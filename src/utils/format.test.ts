import { describe, expect, it } from 'vitest';
import {
  formatDownloadDate,
  formatDownloadSize,
  formatReleaseDate,
  formatReleaseSize,
} from './format';

describe('formatDownloadSize', () => {
  it.each([
    [0, '1 KB'],
    [499, '1 KB'],
    [1_500, '2 KB'],
    [999_999, '1000 KB'],
    [1_000_000, '1.0 MB'],
    [2_550_000, '2.5 MB'],
  ])('formats %i bytes as %s', (bytes, expected) => {
    expect(formatDownloadSize(bytes)).toBe(expected);
  });
});

describe('formatReleaseSize', () => {
  it.each([
    [0, '0 B'],
    [1023, '1023 B'],
    [1024, '1 KB'],
    [1536, '2 KB'],
    [1_048_576, '1.0 MB'],
    [2_621_440, '2.5 MB'],
  ])('formats %i bytes as %s', (bytes, expected) => {
    expect(formatReleaseSize(bytes)).toBe(expected);
  });
});

describe('release dates', () => {
  const date = '2025-02-03T12:00:00.000Z';

  it('formats download dates in UTC for each site language', () => {
    expect(formatDownloadDate(date, 'en')).toBe('Feb 3, 2025');
    expect(formatDownloadDate(date, 'es')).toBe('3 feb 2025');
  });

  it('formats project release dates for each site language', () => {
    expect(formatReleaseDate(date, 'en')).toBe('Feb 3, 2025');
    expect(formatReleaseDate(date, 'es')).toBe('3 feb 2025');
  });
});
