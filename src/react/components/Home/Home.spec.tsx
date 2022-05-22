import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('<Home />', () => {
  it('should render <Config />', async () => {
    render(<Home />);

    await userEvent.click(screen.getByRole('button', { name: 'Configuration' }));

    expect(screen.getByRole('button', { name: 'Return home' })).toBeInTheDocument();
  });
});
