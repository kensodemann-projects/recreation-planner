import { EQUIPMENT } from '@/app/adventure/equipment/__mocks__/data';
import { fetchEquipment } from '@/app/adventure/equipment/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateTodoCollectionForEquipmentPage from '../page';

vi.mock('@/app/adventure/equipment/data');
vi.mock('next/navigation');

describe('Create Todo Collection Page', () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    (fetchEquipment as Mock).mockResolvedValue(EQUIPMENT[1]);
    vi.clearAllMocks();
  });

  it('fetches the equipment', async () => {
    const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
    render(jsx);
    expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(7342);
  });

  it('renders the create todo collection component', async () => {
    const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: `For Equipment: ${EQUIPMENT[1].name}` })).toBeDefined();
  });
});
