export interface NowBuildingItem {
  title: string;
  sub: string;
  meta: string;
}

export const nowBuilding: readonly NowBuildingItem[] = [
  { title: 'Local AI assistant ecosystem', sub: 'multi-backend proxy + embedding server', meta: 'wip' },
  { title: 'Fuel-price recognition platform', sub: 'end-to-end, beyond the Re-Fuel MVP', meta: 'research' },
  { title: 'Self-hosted AI infrastructure', sub: 'HIP-native builds, draft-model speculation', meta: 'shipping' },
];
