import * as migration_20260705_144347_initial from './20260705_144347_initial';
import * as migration_20260705_145948_media from './20260705_145948_media';
import * as migration_20260705_151414_sections from './20260705_151414_sections';

export const migrations = [
  {
    up: migration_20260705_144347_initial.up,
    down: migration_20260705_144347_initial.down,
    name: '20260705_144347_initial',
  },
  {
    up: migration_20260705_145948_media.up,
    down: migration_20260705_145948_media.down,
    name: '20260705_145948_media',
  },
  {
    up: migration_20260705_151414_sections.up,
    down: migration_20260705_151414_sections.down,
    name: '20260705_151414_sections'
  },
];
