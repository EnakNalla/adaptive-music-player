import Store, { Schema } from 'electron-store';

const schema: Schema<ElectronStore> = {};

const store = new Store({ schema });
