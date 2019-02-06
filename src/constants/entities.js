export const CLASSES = {
  WARRIOR: 'Warrior',
  BLACKSMITH: 'BlackSmith',
  MAGE: 'Mage',
  NINJA: 'Ninja',
  ARCHER: 'Archer'
}

export const POST_TYPES = {
  ONLY: 'Item',
  SET: 'Set',
  SORT: 'Combo',
  ACCOUNT: 'Cuenta'
}

export const CLOTHES = {
  HELMET: 'Casco',
  SHOULDER: 'Hombros',
  ARMOR: 'Armadura',
  ARMS: 'Brazos',
  WEAPON_P: 'Arma primaria',
  WEAPON_S: 'Arma secundaria',
  WEAPON_M: 'Arma mejorada'
}

export const ITEM_TYPES = {
  ...CLOTHES,
  CREATURE: 'Criatura',
  RING: 'Anillo',
  NECKLACE: 'Collar'
}

export const CREATURE_MAX_LEVEL = 100
export const ITEM_MAX_LEVEL = 21
export const LEVELS = (maxLevel = ITEM_MAX_LEVEL) =>
  Array.from(Array(maxLevel).keys())
