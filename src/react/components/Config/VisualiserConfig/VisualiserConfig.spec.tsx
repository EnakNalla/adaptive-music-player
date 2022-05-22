import { fireEvent, render, screen, within } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import VisualiserConfig from './VisualiserConfig';

describe('<VisualiserConfig />', () => {
  it('should call setVisualiserOption with type shockwave', async () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Type cubes' }));
    const listbox = within(screen.getByRole('listbox', { name: 'Type' }));
    await userEvent.click(listbox.getByText('shockwave'));

    expect(setVisualiserOption).toHaveBeenCalledWith('type', 'shockwave');
  });

  it('should call setVisualiserOption with stroke 4', async () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Stroke 2' }));
    const listbox = within(screen.getByRole('listbox', { name: 'Stroke' }));
    await userEvent.click(listbox.getByText('4'));

    expect(setVisualiserOption).toHaveBeenCalledWith('stroke', 4);
  });

  it('should call setVisualiserOption with primary #eaeaea true', () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.change(screen.getByLabelText('Primary'), { target: { value: '#eaeaea' } });

    expect(setVisualiserOption).toHaveBeenCalledWith('primary', '#eaeaea', true);
  });

  it('should call setVisualiserOption with secondary #eaeaea true', () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.change(screen.getByLabelText('Secondary'), { target: { value: '#eaeaea' } });

    expect(setVisualiserOption).toHaveBeenCalledWith('secondary', '#eaeaea', true);
  });

  it('should call setVisualiserOption with tertiary #eaeaea true', () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.change(screen.getByLabelText('Tertiary'), { target: { value: '#eaeaea' } });

    expect(setVisualiserOption).toHaveBeenCalledWith('tertiary', '#eaeaea', true);
  });

  it('should call setVisualiserOption with quaternary #eaeaea true', () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.change(screen.getByLabelText('Quaternary'), { target: { value: '#eaeaea' } });

    expect(setVisualiserOption).toHaveBeenCalledWith('quaternary', '#eaeaea', true);
  });

  it('should call setVisualiserOption with background #eaeaea true', () => {
    const setVisualiserOption = jest.fn();
    render(<VisualiserConfig />, {
      configStore: {
        setVisualiserOption,
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    fireEvent.change(screen.getByLabelText('Background'), { target: { value: '#eaeaea' } });

    expect(setVisualiserOption).toHaveBeenCalledWith('background', '#eaeaea', true);
  });
});
