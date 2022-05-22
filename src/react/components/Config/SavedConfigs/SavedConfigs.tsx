import Confirm from '@components/Confirm/Confirm';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import SaveConfig from './SaveConfig';

function SavedConfigs() {
  const { configStore } = useStore();

  return (
    <div>
      <Typography variant="subtitle1" component="h2" textAlign="center">
        Saved configs
      </Typography>

      <SaveConfig />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Load on startup</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {configStore.savedConfigs.map((c, i) => (
            <TableRow key={i}>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => configStore.loadConfig(c)}
                >
                  {c.name}
                </Button>
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={c.loadOnInit}
                  onChange={e => configStore.updateLoadOnInit(c.name, e.target.checked)}
                  inputProps={{
                    'aria-label': 'Load on init checkbox'
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  color="success"
                  variant="outlined"
                  onClick={() => configStore.saveConfig(c.name, c.loadOnInit, true)}
                >
                  Update
                </Button>
              </TableCell>
              <TableCell>
                <Confirm onConfirm={() => configStore.removeConfig(c.name)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default observer(SavedConfigs);
