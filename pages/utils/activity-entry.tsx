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
  const [activity, setActivity] = useState(formState)

  return (
    <div className={styles.activityEntry} style={{ padding: '0.5rem' }}>
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
          value={activity && activity.participated_in}
          onChange={e =>
            setFormState({
              ...activity,
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
            (activity &&
              activity.targeted_skills &&
              activity.targeted_skills.join(', ')) ||
            'Targeted skills'
          }
          items={TARGETED_SKILLS}
          itemToString={i => i}
          style={{ width: '100%' }}
          onChange={e =>
            setFormState({
              ...activity,
              targeted_skills: e.selectedItems,
            })
          }
        />
      </div>
      <div style={{ marginBottom: '10px' }} />
      <div style={{ paddingLeft: '1rem' }}>
        {activity &&
          activity.targeted_skills &&
          activity.targeted_skills.length > 0 &&
          activity.targeted_skills.map(skill => (
            <>
              <TextInput
                light
                id={`targeted_skills-${skill}`}
                labelText={`${upperFirst(skill)} skills (optional)`}
                value={
                  activity &&
                  activity.targeted_skills &&
                  activity.targeted_skills[skill]
                }
                onChange={e => {
                  setFormState({
                    ...activity,
                    targeted_skills: {
                      ...activity.targeted_skills,
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
              setFormState({ ...activity, accuracy_level: `${pc}` })
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
          value={activity && activity.accuracy_level}
          onChange={e => {
            let value = e.target.value
            value = value.replaceAll(/%/g, '')
            setFormState({ ...activity, accuracy_level: value })
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
          value={activity && activity.prompt_level}
          onChange={e =>
            setFormState({ ...activity, prompt_level: e.target.value })
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
            (activity &&
              activity.prompt_types &&
              activity.prompt_types.join(', ')) ||
            'Prompt Type'
          }
          items={PROMPT_TYPES}
          itemToString={i => i}
          onChange={e =>
            setFormState({
              ...activity,
              prompt_types: e.selectedItems,
            })
          }
        />
      </div>
      <div style={{ marginBottom: '20px' }} />

      <div style={{ marginLeft: '1rem' }}>
        {activity &&
          activity.prompt_types &&
          activity.prompt_types.length > 0 &&
          activity.prompt_types.map(pt => (
            <>
              <MultiSelect
                light
                id="prompt_types"
                titleText={`${upperFirst(pt)} prompts (optional)`}
                label={
                  (activity &&
                    activity.prompt_subtypes &&
                    activity.prompt_subtypes[pt] &&
                    activity.prompt_subtypes[pt].join(', ')) ||
                  'Select..'
                }
                items={PROMPT_TYPE_SUBTYPE_MAP[pt]}
                itemToString={i => i}
                onChange={e => {
                  setFormState({
                    ...activity,
                    prompt_subtypes: {
                      ...activity.prompt_subtypes,
                      [pt]: e.selectedItems,
                    },
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
