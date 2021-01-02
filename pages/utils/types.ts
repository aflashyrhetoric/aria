export enum ReceivedState {
  ENGAGED = 'engaged',
  TIRED = 'tired',
  UPSET = 'upset',

  OTHER = 'other',
}

export const RECEIVED_STATES = [
  ReceivedState.ENGAGED,
  ReceivedState.TIRED,
  ReceivedState.UPSET,
  ReceivedState.OTHER,
]

// suffix all below with "abilities"
export enum TargetedSkill {
  RECEPTIVE_LANGUAGE = 'receptive language',
  EXPRESSIVE_LANGUAGE = 'expressive language',
  ARTICULATION = 'articulation',
  PHONOLOGICAL = 'phonological',
  OTHER = 'other',
}

export const TARGETED_SKILLS = [
  TargetedSkill.RECEPTIVE_LANGUAGE,
  TargetedSkill.EXPRESSIVE_LANGUAGE,
  TargetedSkill.ARTICULATION,
  TargetedSkill.PHONOLOGICAL,
  TargetedSkill.OTHER,
]

export enum PromptLevel {
  Minimal = 'minimal',
  Moderate = 'moderate',
  Maximum = 'maximum',
}

export const PROMPT_LEVELS = [
  PromptLevel.Minimal,
  PromptLevel.Moderate,
  PromptLevel.Maximum,
]

export enum PromptType {
  Verbal = 'verbal',
  Phonetic = 'phonetic',
  Written = 'written',
  Visual = 'visual',
  Tactile = 'tactile',
  Gestural = 'gestural',
}

export const PROMPT_TYPES = [
  PromptType.Verbal,
  PromptType.Phonetic,
  PromptType.Written,
  PromptType.Visual,
  PromptType.Tactile,
  PromptType.Gestural,
]

const { Verbal, Phonetic, Written, Visual, Tactile, Gestural } = PromptType

export const PROMPT_TYPE_SUBTYPE_MAP = {
  [Verbal]: ['a', 'b', 'c'],
  [Phonetic]: ['pa', 'bb', 'cc'],
  [Written]: ['afwea', 'aweb', 'ci3jri'],
  [Visual]: ['a3rj2ij', '32ob', 'cifheif'],
  [Tactile]: ['a', 'bij2oij', 'cfjjfjf'],
  [Gestural]: ['$$a', '000b', 'ch2n2n9939'],
}

// To avoid grammar-technical terms that I don't know, and bc I am a boy, I am going to use the object keys for male pronouns
// I wanted to use female/feminine pronouns (she/her), but because "her/her" is the same, it would not work as object keys, where has "him/his" is more explicit.
// I welcome any future PRs and discussions on this for the sake of inclusivity, but I will do this for now to get the feature out the door.
export interface Pronouns {
  he: string
  him: string
  his: string
}

export const PRONOUNS = {
  he: {
    he: 'he',
    him: 'him',
    his: 'his',
  },
  she: {
    he: 'she',
    him: 'her',
    his: 'her',
  },
  they: {
    he: 'they',
    him: 'them',
    his: 'their',
  },
}

// TODO: verbal = ["x",y]
export enum PromptSubtype {}

export interface SessionActivity {
  participated_in: string
  targeted_skills: TargetedSkill[]
  accuracy_level: string // 25, 50, 75, 80, 90, 100 click to populate field

  prompt_level: PromptLevel
  prompt_types: PromptType[]
  prompt_subtypes: object
}
