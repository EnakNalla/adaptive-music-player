import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import SavedConfigs from './SavedConfigs';

describe('<SavedConfigs />', () => {
  it('should call loadConfig with config', async () => {
    const loadConfig = jest.fn();
    const config = { name: 'test', loadOnInit: false };
    render(<SavedConfigs />, {
      configStore: {
        loadConfig,
        savedConfigs: [config]
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'test' }));

    expect(loadConfig).toHaveBeenCalledWith(config);
  });

  it('should call saveConfig with name and update = true', async () => {
    const saveConfig = jest.fn();
    render(<SavedConfigs />, {
      configStore: {
        savedConfigs: [{ name: 'test', loadOnInit: false }],
        saveConfig
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(saveConfig).toHaveBeenCalledWith('test', false, true);
  });

  it('should call updateLoadOnInit', async () => {
    const updateLoadOnInit = jest.fn();
    render(<SavedConfigs />, {
      configStore: {
        savedConfigs: [{ name: 'test', loadOnInit: false }],
        updateLoadOnInit
      }
    });

    await userEvent.click(screen.getByLabelText('Load on init checkbox'));

    expect(updateLoadOnInit).toHaveBeenCalledWith('test', true);
  });

  it('should open <Confirm /> and call removeConfig on confirm', async () => {
    const removeConfig = jest.fn();
    render(<SavedConfigs />, {
      configStore: {
        savedConfigs: [{ name: 'test', loadOnInit: false }],
        removeConfig
      }
    });
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(removeConfig).toHaveBeenCalledWith('test');
  });
});
