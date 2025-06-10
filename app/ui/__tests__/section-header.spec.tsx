import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SectionHeader from '../section-header';
import SubtitleHeading from '../subtitle-heading';

describe('Section Header', () => {
  afterEach(() => cleanup());

  it('displays the content', () => {
    render(
      <SectionHeader>
        <SubtitleHeading>I am content</SubtitleHeading>
      </SectionHeader>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'I am content' })).toBeDefined();
  });
});
