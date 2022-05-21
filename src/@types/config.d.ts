type InputMethod = 'mouse' | 'touch' | 'eye gaze' | 'switch';

interface InputOptions {
  method?: InputMethod;
  // size of circle displayed
  size: 'small' | 'medium' | 'large';
  // only for eye-gaze, how long to animate the circle before playing
  dwellTime: number;
}

interface Timer {
  name: string;
  playtime: number;
  isDefault: boolean;
}

type VisualiserTypes =
  | 'cubes'
  | 'bars'
  | 'bars blocks'
  | 'dualbars'
  | 'dualbars blocks'
  | 'fireworks'
  | 'flower'
  | 'flower blocks'
  | 'orbs'
  | 'ring'
  | 'round wave'
  | 'shine'
  | 'shockwave'
  | 'star'
  | 'static'
  | 'stitches'
  | 'web'
  | 'wave';

type VisualiserOptionKeys =
  | 'stroke'
  | 'type'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'background';

interface VisualiserOptions {
  stroke: number;
  type: VisualiserTypes;
  colours: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    background: string;
  };
}

interface SavedConfig {
  name: string;
  songs: Song[];
  visualiserOptions: VisualiserOptions;
  inputOptions: InputOptions;
}
