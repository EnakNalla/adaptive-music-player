import { render, screen } from '@test-utils/rtl';
import { songStub } from '@test-utils/stubs/songStub';
import userEvent from '@testing-library/user-event';
import Playlist from './Playlist';

describe('<Playlist />', () => {
  it('should render songs', () => {
    const song = songStub();
    render(<Playlist />, {
      playerStore: {
        song: song,
        songs: [song],
        selectSongs: jest.fn()
      }
    });

    expect(screen.getByText(song.title)).toBeInTheDocument();
  });

  it('should call selectSongs with true when New playlist is clicked', async () => {
    const selectSongs = jest.fn();
    render(<Playlist />, {
      playerStore: {
        selectSongs,
        songs: []
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'New playlist' }));

    expect(selectSongs).toHaveBeenCalledWith(true);
  });

  it('should call selectSongs with false when Add songs is clicked', async () => {
    const selectSongs = jest.fn();
    render(<Playlist />, {
      playerStore: {
        selectSongs,
        songs: []
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Add songs' }));

    expect(selectSongs).toHaveBeenCalledWith(false);
  });

  it('should call setSong when song is clicked', async () => {
    const setSong = jest.fn();
    render(<Playlist />, {
      playerStore: {
        setSong,
        songs: [songStub()]
      }
    });

    await userEvent.click(screen.getByText(songStub().title));

    expect(setSong).toHaveBeenCalled();
  });

  it('should open <Confirm /> when Delete is clicked & call removeSong on confirm', async () => {
    const removeSong = jest.fn();
    render(<Playlist />, {
      playerStore: {
        removeSong,
        setSong: jest.fn(),
        songs: [songStub()]
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(removeSong).toHaveBeenCalled();
  });
});
