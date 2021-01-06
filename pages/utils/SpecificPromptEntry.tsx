import React from 'react'
import { PromptType, PROMPT_TYPE_SUBTYPE_MAP } from './types'
import { upperFirst } from 'lodash'
import { MultiSelect } from 'carbon-components-react'

interface SpecificPromptEntryProps {
  prompt: PromptType
  setFormState: Function
}

const SpecificPromptEntry: React.FC<SpecificPromptEntryProps> = ({
  prompt,
  setFormState,
}) => {
  return (
    <>
      <MultiSelect
        light
        id="prompts"
        titleText={`${upperFirst(prompt)} cues (optional)`}
        label={'Select..'}
        items={PROMPT_TYPE_SUBTYPE_MAP[prompt]}
        itemToString={i => i}
        onChange={e => setFormState(e.selectedItems)}
      />
      <div style={{ marginBottom: '20px' }} />
    </>
  )
}

export default SpecificPromptEntry
