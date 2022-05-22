import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';

function VisualiserConfig() {
  const { configStore } = useStore();

  return (
    <div>
      <Typography variant="subtitle1" component="h2" textAlign="center">
        Visualiser config
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="visualiser-type-label">Type</InputLabel>
        <Select
          labelId="visualiser-type-label"
          id="visualiser-type"
          value={configStore.visualiserOptions.type}
          label="Type"
          onChange={e => configStore.setVisualiserOption('type', e.target.value)}
        >
          <MenuItem value="cubes">cubes</MenuItem>
          <MenuItem value="bars">bars</MenuItem>
          <MenuItem value="bars blocks">bars blocks</MenuItem>
          <MenuItem value="dualbars">dualbars</MenuItem>
          <MenuItem value="dualbars blocks">dualbars blocks</MenuItem>
          <MenuItem value="fireworks">fireworks</MenuItem>
          <MenuItem value="flower">flower</MenuItem>
          <MenuItem value="flower blocks">flower blocks</MenuItem>
          <MenuItem value="orbs">orbs</MenuItem>
          <MenuItem value="ring">ring</MenuItem>
          <MenuItem value="round wave">round wave</MenuItem>
          <MenuItem value="shockwave">shockwave</MenuItem>
          <MenuItem value="shine">shine</MenuItem>
          <MenuItem value="star">star</MenuItem>
          <MenuItem value="static">static</MenuItem>
          <MenuItem value="stitches">stitches</MenuItem>
          <MenuItem value="web">web</MenuItem>
          <MenuItem value="wave">wave</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="visualiser-stroke-label">Stroke</InputLabel>
        <Select
          labelId="visualiser-stroke-label"
          id="visualiser-stroke"
          value={configStore.visualiserOptions.stroke}
          label="Stroke"
          onChange={e => configStore.setVisualiserOption('stroke', e.target.value)}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="space-between">
        <Typography>Colours</Typography>
        <Button variant="contained" color="secondary" onClick={configStore.resetColours}>
          Reset
        </Button>
      </Box>

      <TextField
        margin="normal"
        fullWidth
        id="primary-colour-input"
        label="Primary"
        type="color"
        value={configStore.visualiserOptions.colours.primary}
        onChange={e => configStore.setVisualiserOption('primary', e.target.value, true)}
      />

      <TextField
        margin="normal"
        fullWidth
        id="secondary-colour-input"
        label="Secondary"
        type="color"
        value={configStore.visualiserOptions.colours.secondary}
        onChange={e => configStore.setVisualiserOption('secondary', e.target.value, true)}
      />

      <TextField
        margin="normal"
        fullWidth
        id="tertiary-colour-input"
        label="Tertiary"
        type="color"
        value={configStore.visualiserOptions.colours.tertiary}
        onChange={e => configStore.setVisualiserOption('tertiary', e.target.value, true)}
      />

      <TextField
        margin="normal"
        fullWidth
        id="quaternary-colour-input"
        label="Quaternary"
        type="color"
        value={configStore.visualiserOptions.colours.quaternary}
        onChange={e => configStore.setVisualiserOption('quaternary', e.target.value, true)}
      />

      <TextField
        margin="normal"
        fullWidth
        id="background-colour-input"
        label="Background"
        type="color"
        value={configStore.visualiserOptions.colours.background}
        onChange={e => configStore.setVisualiserOption('background', e.target.value, true)}
      />
    </div>
  );
}

export default observer(VisualiserConfig);
