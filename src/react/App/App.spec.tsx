import { render, screen } from '@test-utils/rtl';
import App from './App';

describe('<App />', () => {
  it('should render "App"', () => {
    render(<App />);

    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
