import React from 'react'
import { upperFirst } from 'lodash'
import { TextInput } from 'carbon-components-react'

interface SpecificSkillEntryProps {
  skill: string
  setFormState: Function
}

const SpecificSkillEntry: React.FC<SpecificSkillEntryProps> = ({
  skill,
  setFormState,
}) => {
  return (
    <>
      <TextInput
        light
        id={`targeted_skills-${skill}`}
        labelText={`${upperFirst(skill)} goals (optional)`}
        value={''}
        onChange={e => setFormState(e.target.value)}
      />
    </>
  )
}

export default SpecificSkillEntry
