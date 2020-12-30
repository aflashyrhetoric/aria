import Link from 'next/Link'
import { toJson } from 'unsplash-js'
import { useState, useEffect } from 'react'

// event handler
// storage of values

enum ReceivedState {
  ENGAGED = 'engaged',
  TIRED = 'tired',
  UPSET = 'upset',

  OTHER = 'other',
}

// suffix all below with "abilities"
enum TargetedSkill {
  RECEPTIVE_LANGUAGE = 'receptive language',
  EXPRESSIVE_LANGUAGE = 'expressive language',
  ARTICULATION = 'articulation',
  PHONOLOGICAL = 'phonological',
  OTHER = 'other',
}

enum PromptLevel {
  Minimal = 'minimal',
  Moderate = 'moderate',
  Maximum = 'maximum',
}

enum PromptType {
  Verbal = 'verbal',
  Phonetic = 'phonetic',
  Written = 'written',
  Visual = 'visual',
  Tactile = 'tactile',
  Gestural = 'gestural',
}

// TODO: verbal = ["x",y]
enum PromptSubtype {}

interface formData {
  name?: string

  received: ReceivedState
  participated_in: string
  targeted_skill: TargetedSkill[]
  accuracy_level: string // 25, 50, 75, 80, 90, 100 click to populate field

  prompt_level: PromptLevel
  prompt_type: PromptType
}

const template = ({
  name = 'Student',
  received = ReceivedState.ENGAGED,
  participated_in,
  targeted_skill,
  accuracy_level, // TODO ? Pre-populate later based on previous sessions accuracy_level
  prompt_level,
  prompt_type,
}) => `

${name} received ${received}. Participated in ${participated_in} to increase ${targeted_skill} abilities. Responded with ${accuracy_level} provided ${prompt_level} prompting and ${prompt_type} cues.

`

export default function startsWithLetter() {
  const [formState, setFormState] = useState<formData>({} as formData)

  return (
    <div className="paper container">
      <h2>Report Writer</h2>

      <p>{template(formState)}</p>

      {/* {loading && <h4>Loading</h4>}

      {images && started ? <ul>hi</ul> : <h4>Press "Start Game" to begin</h4>} */}

      <hr />
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  )
}
