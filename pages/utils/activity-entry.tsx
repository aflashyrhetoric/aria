import React, { useState } from 'react'
import { upperFirst } from 'lodash'
import {
  TextInput,
  MultiSelect,
  Button,
  Select,
  SelectItem,
} from 'carbon-components-react'
import { COLORS } from './shared'
import {
  PROMPT_LEVELS,
  PROMPT_TYPES,
  PROMPT_TYPE_SUBTYPE_MAP,
  SessionActivity,
  TARGETED_SKILLS,
} from './types'

const styles = require('./session-note-generator.module.scss')

interface ActivityEntryProps {
  formState: SessionActivity
  setFormState: Function
}

const ActivityEntry: React.FC<ActivityEntryProps> = ({
  formState = {} as SessionActivity,
  setFormState,
}: ActivityEntryProps) => {
  return (
    <div className={styles.activityEntry} style={{ padding: '0.5rem' }}>
      <div className={styles.colorContainer}>
        <div
          style={{
            background: COLORS.activity_name,
          }}
        ></div>
        <TextInput
          light
          id="activity_name"
          type="text"
          size="sm"
          labelText="Activity Name"
          placeholder="repeated /r/ sounds"
          value={formState && formState.activity_name}
          onChange={e =>
            setFormState({
              ...formState,
              activity_name: e.target.value,
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

      <div>
        <div></div>
        <div>
          <p>
            <strong>Quick-Set Accuracy Level: </strong>
          </p>
        </div>
      </div>
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
            // (formState && formState.prompts && formState.prompts.join(', ')) ||
            'Prompt Type'
          }
          items={PROMPT_TYPES}
          itemToString={i => i}
          onChange={e => {
            console.log(formState, e.selectedItems)
            setFormState({
              ...formState,
              prompts: e.selectedItems,
            })
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }} />

      <div style={{ marginLeft: '1rem' }}>
        {formState &&
          formState.prompts &&
          formState.prompts.length > 0 &&
          formState.prompts.map((pt, index) => (
            <>
              <MultiSelect
                light
                id="prompts"
                titleText={`${upperFirst(pt)} prompts (optional)`}
                label={
                  (pt &&
                    pt.specific_prompts &&
                    pt.specific_prompts.length > 0 &&
                    pt.specific_prompts.join(', ')) ||
                  'Select..'
                }
                items={pt.specific_prompts}
                itemToString={i => i}
                onChange={e => {
                  let updated = formState.prompts
                  updated[index] = e.selectedItems

                  setFormState({
                    ...formState,
                    prompts: [...formState.prompts],
                  })
                }}
              />
              <div style={{ marginBottom: '20px' }} />
            </>
          ))}
      </div>
    </div>
  )
}

export default ActivityEntry
