import { useState, useEffect } from 'react'
import { upperFirst } from 'lodash'
import Head from 'next/head'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Form,
  FormGroup,
  RadioButton,
  RadioButtonGroup,
  Select,
  SelectItem,
  TextInput,
  ToggleSmall,
} from 'carbon-components-react'
import { AddAlt32, Copy24 } from '@carbon/icons-react'
import {
  ReceivedState,
  RECEIVED_STATES,
  PRONOUNS,
  Pronouns,
  SessionActivity,
  PROMPT_TYPES,
  PROMPT_LEVELS,
  PromptLevel,
  PromptShape,
} from './types'

import { COLORS } from './shared'
import ActivityEntry from './activity-entry'
const styles = require('./session-note-generator.module.scss')

// event handler
// storage of values
interface TemplateFields {
  name?: string
  pronouns?: Pronouns
  received: ReceivedState

  activities?: SessionActivity[]
}

const UNDERSCORE = '___'

const buildCuesString = (prompts: PromptShape[]) => {
  return 'hi'
  return prompts.reduce((acc, currentPrompt) => {
    if (currentPrompt.specific_prompts.length === 0) {
      return `${currentPrompt.name} cues, ${acc}`
    }
    return `${
      currentPrompt.name
    } cues (such as ${currentPrompt.specific_prompts.join(', ')})`
  }, '')
}

const activityString = (
  pronouns = PRONOUNS.they,
  activity: SessionActivity
) => {
  const {
    targeted_skills = [UNDERSCORE],
    accuracy_level = UNDERSCORE,
    prompt_level = PromptLevel.Minimal,
    prompts = [],
    activity_name = UNDERSCORE,
  } = activity

  // const cuesString =
  //   Object.keys(prompt_subtypes).length === 0
  //     ? `${prompt_types.join(', ')} cues`
  //     : buildCuesString(prompt_types, prompt_subtypes)

  /* 

  if no subtype:

  and gestural, phonetic cues.
 
  if subtype:

  and gestural cues (such as x, y, z), phonetic cues
  
  */

  return (
    <>
      <span style={{ background: COLORS.pronoun }}>{`${upperFirst(
        pronouns.he
      )}`}</span>
      <span
        style={{ background: COLORS.activity_name }}
      >{`${activity_name}`}</span>
      <span>to increase</span>
      <span style={{ background: COLORS.pronoun }}>{`${pronouns.his} `}</span>
      <span style={{ background: COLORS.targeted_skills }}>{`${(
        targeted_skills || []
      ).join(', ')} `}</span>
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
      >{`${prompt_level}`}</span>
      <span>prompting and </span>
      <span
        className={styles.autoHeight}
        style={{ background: COLORS.cuesString }}
      >
        {buildCuesString(prompts)}.
      </span>
    </>
  )
}

const getTemplate = (
  {
    name = 'Student',
    pronouns = PRONOUNS.they,
    received = ReceivedState.ENGAGED,

    activities = [],
  },

  colorize: Boolean = true
): JSX.Element => {
  return (
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
      {activities.map(activity => activityString(pronouns, activity))}
    </p>
  )
}

export default function SessionNoteGenerator() {
  const [formState, setFormState] = useState<TemplateFields>(
    {} as TemplateFields
  )
  const [template, setTemplate] = useState<JSX.Element>(null)
  const [output, setOutput] = useState('')
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
    setTemplate(getTemplate(formState, colorize))
    // setCopied(formState)
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
            <div style={{ marginBottom: '20px' }} />
            {formState &&
              formState.activities &&
              formState.activities.map((activity, index) => (
                <ActivityEntry
                  formState={activity}
                  setFormState={activity => {
                    let updated = formState.activities
                    updated[index] = activity

                    setFormState({ ...formState, activities: updated })
                  }}
                />
              ))}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'column wrap',
              }}
            >
              <hr
                style={{
                  border: '1px solid gray',
                  transform: 'rotateZ(90deg)',
                  width: '20px',
                }}
              />
              <AddAlt32
                style={{ cursor: 'pointer' }}
                color="gray"
                onClick={() => {
                  let arr = formState.activities || []
                  setFormState({
                    ...formState,
                    activities: [...arr, { id: arr.length } as SessionActivity],
                  })
                }}
              />
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
            <p className={styles.output}>{template}</p>
          </CopyToClipboard>
        </div>
      </div>
    </>
  )
}
