import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import MissHits from './MissHits';

describe('<MissHits />', () => {
  it('should render missHits', () => {
    render(<MissHits />, {
      playerStore: {
        missHits: { test: ['1 miss hit'] },
        inputOptions: { method: 'switch' }
      }
    });

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should call saveMissHits when save is clicked', async () => {
    const saveMissHits = jest.fn();
    render(<MissHits />, {
      playerStore: {
        missHits: { test: ['1 miss hit'] },
        inputOptions: { method: 'switch' },
        saveMissHits
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(saveMissHits).toHaveBeenCalled();
  });
});
