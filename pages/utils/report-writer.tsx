import Link from 'next/Link'
import { toJson } from 'unsplash-js'
import { useState, useEffect } from 'react'
import {
  Form,
  TextInput,
  MultiSelect,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from 'carbon-components-react'

// event handler
// storage of values

enum ReceivedState {
  ENGAGED = 'engaged',
  TIRED = 'tired',
  UPSET = 'upset',

  OTHER = 'other',
}

const RECEIVED_STATES = [
  ReceivedState.ENGAGED,
  ReceivedState.TIRED,
  ReceivedState.UPSET,
  ReceivedState.OTHER,
]

// suffix all below with "abilities"
enum TargetedSkill {
  RECEPTIVE_LANGUAGE = 'receptive language',
  EXPRESSIVE_LANGUAGE = 'expressive language',
  ARTICULATION = 'articulation',
  PHONOLOGICAL = 'phonological',
  OTHER = 'other',
}

const TARGETED_SKILLS = [
  TargetedSkill.RECEPTIVE_LANGUAGE,
  TargetedSkill.EXPRESSIVE_LANGUAGE,
  TargetedSkill.ARTICULATION,
  TargetedSkill.PHONOLOGICAL,
  TargetedSkill.OTHER,
]

enum PromptLevel {
  Minimal = 'minimal',
  Moderate = 'moderate',
  Maximum = 'maximum',
}

const PROMPT_LEVELS = [
  PromptLevel.Minimal,
  PromptLevel.Moderate,
  PromptLevel.Maximum,
]

enum PromptType {
  Verbal = 'verbal',
  Phonetic = 'phonetic',
  Written = 'written',
  Visual = 'visual',
  Tactile = 'tactile',
  Gestural = 'gestural',
}

const PROMPT_TYPES = [
  PromptType.Verbal,
  PromptType.Phonetic,
  PromptType.Written,
  PromptType.Visual,
  PromptType.Tactile,
  PromptType.Gestural,
]

// TODO: verbal = ["x",y]
enum PromptSubtype {}

interface formData {
  name?: string

  received: ReceivedState
  participated_in: string
  targeted_skills: TargetedSkill[]
  accuracy_level: string // 25, 50, 75, 80, 90, 100 click to populate field

  prompt_level: PromptLevel
  prompt_type: PromptType
}

const defaultEmptyValue = '___'

const template = ({
  name = 'Student',
  received = ReceivedState.ENGAGED,
  participated_in = defaultEmptyValue,
  targeted_skills = [defaultEmptyValue],
  accuracy_level = defaultEmptyValue, // TODO ? Pre-populate later based on previous sessions accuracy_level
  prompt_level = defaultEmptyValue,
  prompt_type = defaultEmptyValue,
}) => {
  return `
${
  name === '' ? 'Student' : name
} was received ${received}. Participated in ${participated_in} to increase ${targeted_skills.join(
    ' & ',
  )} abilities. Responded with ${accuracy_level} provided ${prompt_level} prompting and ${prompt_type} cues.
`
}

export default function startsWithLetter() {
  const [formState, setFormState] = useState<formData>({} as formData)
  const [output, setOutput] = useState('')

  useEffect(() => {
    setOutput(template(formState))
  }, [formState])

  return (
    <div className="container">
      <div style={{ padding: '3rem' }}>
        <h2>Report Writer</h2>

        <Form style={{ width: '400px' }}>
          <TextInput
            type="text"
            size="sm"
            labelText="Student Name"
            value={formState && formState.name}
            placeholder="Student"
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
          />
          <div style={{ marginBottom: '10px' }} />
          <TextInput
            type="text"
            size="sm"
            labelText="Activity Name"
            placeholder="Crossword puzzles"
            value={formState && formState.participated_in}
            onChange={(e) =>
              setFormState({ ...formState, participated_in: e.target.value })
            }
          />
          <div style={{ marginBottom: '10px' }} />
          <MultiSelect
            label="Targeted Skills"
            items={TARGETED_SKILLS}
            itemToString={(i) => i}
            onChange={(e) =>
              setFormState({ ...formState, targeted_skills: e.selectedItems })
            }
          />
          <div style={{ marginBottom: '10px' }} />
          <TextInput
            type="text"
            size="sm"
            labelText="Accuracy Level"
            placeholder="25%"
            value={formState && formState.accuracy_level}
            onChange={(e) =>
              setFormState({ ...formState, accuracy_level: e.target.value })
            }
          />

          <Select
            value={formState && formState.prompt_level}
            onChange={(e) =>
              setFormState({ ...formState, prompt_level: e.target.value })
            }
          >
            {PROMPT_LEVELS.map((promptLevel) => (
              <SelectItem value={promptLevel} text={promptLevel} />
            ))}
          </Select>
          <div style={{ marginBottom: '10px' }} />
        </Form>

        <p>{output}</p>

        <hr />
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  )
}
