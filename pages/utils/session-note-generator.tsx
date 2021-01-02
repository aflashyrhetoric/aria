import { useState, useEffect } from 'react'
import { upperFirst } from 'lodash'
import Head from 'next/head'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Button,
  Form,
  FormGroup,
  MultiSelect,
  RadioButton,
  RadioButtonGroup,
  Select,
  SelectItem,
  TextInput,
  ToggleSmall,
} from 'carbon-components-react'
import { Copy24 } from '@carbon/icons-react'
import {
  PromptLevel,
  PromptType,
  PROMPT_LEVELS,
  PROMPT_TYPES,
  PROMPT_TYPE_SUBTYPE_MAP,
  ReceivedState,
  RECEIVED_STATES,
  TargetedSkill,
  TARGETED_SKILLS,
  PRONOUNS,
  Pronouns,
} from './types'

import { randomColor } from '../utils'
const styles = require('./session-note-generator.module.scss')

// event handler
// storage of values

interface TemplateFields {
  name?: string
  pronouns?: Pronouns
  received: ReceivedState
  
  participated_in: string
  targeted_skills: TargetedSkill[]
  accuracy_level: string // 25, 50, 75, 80, 90, 100 click to populate field

  prompt_level: PromptLevel
  prompt_types: PromptType[]
  prompt_subtypes: object
}

interface SessionActivity {

}

const UNDERSCORE = '___'

const buildCuesString = (types, subtypes: object) => {
  const withoutSubtypes = types.filter(
    type => !Object.keys(subtypes).includes(type)
  )

  const withSubtypes = Object.entries(subtypes).map(entry => {
    const [prompt_type, prompt_subtypes] = entry
    return `${prompt_type} cues (such as ${prompt_subtypes.join(', ')})`
  })

  return [...withoutSubtypes, ...withSubtypes].join(', ')
}

// const COLORS: any = [
//   'name',
//   'pronoun',
//   'received',
//   'participated_in',
//   'targeted_skills',
//   'accuracy_level',
//   'prompt_level',
//   'cuesString',
// ].reduce((COLORS, fieldName) => {
//   COLORS[fieldName] = randomColor()
//   return COLORS
// }, {})

const COLORS = {
  name: '#f5bcbc',
  pronoun: '#f5eebc',
  received: '#c8f5bc',
  participated_in: '#bcf5ee',
  targeted_skills: '#bcbff5',
  accuracy_level: '#f5bcf2',
  prompt_level: '#9296fc',
  cuesString: '#fcb292',
}

const template = (
  {
    name = 'Student',
    pronouns = PRONOUNS.they,
    received = ReceivedState.ENGAGED,
    participated_in = UNDERSCORE,
    targeted_skills = [UNDERSCORE],
    accuracy_level = UNDERSCORE, // TODO ? Pre-populate later based on previous sessions accuracy_level
    prompt_level = UNDERSCORE,
    prompt_types = [],
    prompt_subtypes = {},
  },
  colorize
) => {
  const cuesString =
    Object.keys(prompt_subtypes).length === 0
      ? `${prompt_types.join(', ')} cues`
      : buildCuesString(prompt_types, prompt_subtypes)

  /* 

  if no subtype:

  and gestural, phonetic cues.
 
  if subtype:

  and gestural cues (such as x, y, z), phonetic cues
  
  */

  // Return the populated template data

  return [
    <p
      className={`${styles.cuesString} ${
        !colorize && styles.disableColorization
      }`}
    >
      <span style={{ background: COLORS.name }}>{`${
        name === '' ? 'Student' : name
      }`}</span>
      <span>was received</span>
      <span style={{ background: COLORS.received }}>{`${received}. `}</span>
      <span style={{ background: COLORS.pronoun }}>{`${upperFirst(
        pronouns.he
      )}`}</span>
      {/* <span>participated in</span> */}
      <span
        style={{ background: COLORS.participated_in }}
      >{`${participated_in}`}</span>
      <span>to increase</span>
      <span style={{ background: COLORS.pronoun }}>{`${pronouns.his} `}</span>
      <span
        style={{ background: COLORS.targeted_skills }}
      >{`${targeted_skills.join(', ')} `}</span>
      <span>abilities. </span>
      <span style={{ background: COLORS.pronoun }}>{`${upperFirst(
        pronouns.he
      )}`}</span>
      <span>responded with </span>
      <span
        style={{ background: COLORS.accuracy_level }}
      >{`${accuracy_level}%`}</span>
      <span>accuracy provided</span>
      <span
        style={{ background: COLORS.prompt_level }}
      >{`${prompt_level}%`}</span>
      <span>prompting and </span>
      <span
        className={styles.autoHeight}
        style={{ background: COLORS.cuesString }}
      >
        {cuesString}.
      </span>
    </p>,
    `${name === '' ? 'Student' : name} was received ${received}. ${upperFirst(
      pronouns.he
    )} participated in ${participated_in} to increase ${
      pronouns.his
    } ${targeted_skills.join(', ')}  abilities. ${upperFirst(
      pronouns.he
    )} responded with ${accuracy_level}% accuracy provided ${prompt_level}% prompting and ${cuesString} prompting and ${cuesString}.`,
  ]
}

// const COLORS = {
//   name: 'red',
//   pronoun: 'green',
//   received: 'blue',
//   participated_in: 'pink',
//   targeted_skills: 'salmon',
//   accuracy_level: 'brown',
//   prompt_level: 'orange',
//   cuesString: 'purple',
// }

export default function ReportWriter() {
  const [formState, setFormState] = useState<TemplateFields>(
    {} as TemplateFields
  )
  const [output, setOutput] = useState(null)
  const [copied, setCopied] = useState(false)
  const [colorize, setColorize] = useState(true)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  useEffect(() => {
    setOutput(template(formState, colorize))
  }, [formState])

  return (
    <>
      <Head>
        <title>{`${formState.name || ''} Session Notes`}</title>
      </Head>
      <div
        className={`${styles.container} ${
          !colorize && styles.disableColorization
        }`}
      >
        <div className={styles.left}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <h2>Session Data</h2>
            <div style={{ maxWidth: '70px' }}>
              <ToggleSmall
                id="colorize-toggle"
                defaultToggled
                labelText="Colorize!"
                onToggle={e => setColorize(e)}
              />
            </div>
          </div>

          <Form style={{ width: '100%' }}>
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.name,
                }}
              ></div>
              <TextInput
                light
                id="name-input"
                type="text"
                size="sm"
                labelText="Student Name"
                value={formState && formState.name}
                placeholder="Student"
                onChange={e =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </div>
            <div style={{ marginBottom: '20px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.pronoun,
                }}
              ></div>
              <FormGroup legendText="Pronouns">
                <RadioButtonGroup
                  name="pronoun-selector"
                  defaultSelected={'they'}
                  onChange={e =>
                    setFormState({ ...formState, pronouns: PRONOUNS[e] })
                  }
                >
                  {Object.keys(PRONOUNS).map(p => (
                    <RadioButton key={p} value={p} labelText={p} id={p} />
                  ))}
                </RadioButtonGroup>
              </FormGroup>
            </div>
            <div style={{ marginBottom: '20px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.received,
                }}
              ></div>
              <Select
                light
                id="received"
                labelText="How was the student received?"
                defaultValue={formState && formState.received}
                style={{ width: '100%' }}
                onChange={e =>
                  setFormState({ ...formState, received: e.target.value })
                }
              >
                {/* <SelectItem value="" text={'Select...'} /> */}
                {RECEIVED_STATES.map(received => (
                  <SelectItem key={received} value={received} text={received} />
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: '10px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.participated_in,
                }}
              ></div>
              <TextInput
                light
                id="activity_name"
                type="text"
                size="sm"
                labelText="Activity Name"
                placeholder="Crossword puzzles"
                value={formState && formState.participated_in}
                onChange={e =>
                  setFormState({
                    ...formState,
                    participated_in: e.target.value,
                  })
                }
              />
            </div>
            <div style={{ marginBottom: '10px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.targeted_skills,
                }}
              ></div>
              <MultiSelect
                light
                id="targeted_skills"
                titleText="Targeted Skills"
                label={
                  (formState &&
                    formState.targeted_skills &&
                    formState.targeted_skills.join(', ')) ||
                  'Targeted skills'
                }
                items={TARGETED_SKILLS}
                itemToString={i => i}
                style={{ width: '100%' }}
                onChange={e =>
                  setFormState({
                    ...formState,
                    targeted_skills: e.selectedItems,
                  })
                }
              />
            </div>
            <div style={{ marginBottom: '10px' }} />
            <div style={{ paddingLeft: '1rem' }}>
              {formState &&
                formState.targeted_skills &&
                formState.targeted_skills.length > 0 &&
                formState.targeted_skills.map(skill => (
                  <>
                    <TextInput
                      light
                      id={`targeted_skills-${skill}`}
                      labelText={`${upperFirst(skill)} skills (optional)`}
                      value={
                        formState &&
                        formState.targeted_skills &&
                        formState.targeted_skills[skill]
                      }
                      onChange={e => {
                        setFormState({
                          ...formState,
                          targeted_skills: {
                            ...formState.targeted_skills,
                            [skill]: e.selectedItems,
                          },
                        })
                      }}
                    />
                    <div style={{ marginBottom: '20px' }} />
                  </>
                ))}
            </div>
            <div style={{ marginBottom: '10px' }} />

            <p>
              <strong>Quick-Set Accuracy Level: </strong>
            </p>
            <ul style={{ display: 'inline' }}>
              {[25, 50, 75, 80, 90, 100].map(pc => (
                <Button
                  key={`${pc}-button`}
                  style={{ width: '25px' }}
                  size="sm"
                  kind="secondary"
                  onClick={e =>
                    setFormState({ ...formState, accuracy_level: `${pc}` })
                  }
                >
                  {pc}%
                </Button>
              ))}
            </ul>
            <div style={{ marginBottom: '10px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.accuracy_level,
                }}
              ></div>
              <TextInput
                light
                id="accuracy_level"
                type="text"
                size="sm"
                labelText="Accuracy Level (omit the % symbol)"
                placeholder="25"
                value={formState && formState.accuracy_level}
                onChange={e => {
                  let value = e.target.value
                  value = value.replaceAll(/%/g, '')
                  setFormState({ ...formState, accuracy_level: value })
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.prompt_level,
                }}
              ></div>
              <Select
                light
                id="prompt_level"
                labelText="Prompt Level"
                value={formState && formState.prompt_level}
                onChange={e =>
                  setFormState({ ...formState, prompt_level: e.target.value })
                }
              >
                <SelectItem value="" text={'Select a prompt level'} />
                {PROMPT_LEVELS.map(promptLevel => (
                  <SelectItem
                    key={promptLevel}
                    value={promptLevel}
                    text={promptLevel}
                  />
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: '10px' }} />
            <div className={styles.colorContainer}>
              <div
                style={{
                  background: COLORS.cuesString,
                }}
              ></div>
              <MultiSelect
                light
                id="prompt_types"
                titleText="Prompt Type(s)"
                label={
                  (formState &&
                    formState.prompt_types &&
                    formState.prompt_types.join(', ')) ||
                  'Prompt Type'
                }
                items={PROMPT_TYPES}
                itemToString={i => i}
                onChange={e =>
                  setFormState({ ...formState, prompt_types: e.selectedItems })
                }
              />
            </div>
            <div style={{ marginBottom: '20px' }} />

            <div style={{ paddingLeft: '1rem' }}>
              {formState &&
                formState.prompt_types &&
                formState.prompt_types.length > 0 &&
                formState.prompt_types.map(pt => (
                  <>
                    <MultiSelect
                      light
                      id="prompt_types"
                      titleText={`${upperFirst(pt)} prompts (optional)`}
                      label={
                        (formState &&
                          formState.prompt_subtypes &&
                          formState.prompt_subtypes[pt] &&
                          formState.prompt_subtypes[pt].join(', ')) ||
                        'Select..'
                      }
                      items={PROMPT_TYPE_SUBTYPE_MAP[pt]}
                      itemToString={i => i}
                      onChange={e => {
                        setFormState({
                          ...formState,
                          prompt_subtypes: {
                            ...formState.prompt_subtypes,
                            [pt]: e.selectedItems,
                          },
                        })
                      }}
                    />
                    <div style={{ marginBottom: '20px' }} />
                  </>
                ))}
            </div>
          </Form>
        </div>
        <div className={styles.right}>
          <h2 style={{ userSelect: 'none' }}>
            Report Text{' '}
            <CopyToClipboard
              text={
                output && output.length > 0 ? output[1] : 'Report not completed'
              }
              onCopy={() => setCopied(true)}
            >
              <div
                style={{
                  display: 'inline-block',
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
              >
                <Copy24 />
              </div>
            </CopyToClipboard>
          </h2>
          {copied && (
            <span
              className={`animate__animated animate__fadeOut ${styles.copied}`}
            >
              Copied!
            </span>
          )}
          <CopyToClipboard
            text={
              output && output.length > 0 ? output[1] : 'Report not completed'
            }
            onCopy={() => setCopied(true)}
          >
            <p className={styles.output}>{output && output[0]}</p>
          </CopyToClipboard>
        </div>
      </div>
    </>
  )
}
