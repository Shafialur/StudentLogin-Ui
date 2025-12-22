import { memo } from 'react'
import SubjectPage from './SubjectPage'
import { mathsTheme } from '../config/subjectThemes'
import type { PageProps } from '../types/common'

const MathsPage = memo(({ childName = '', classDetails, code }: PageProps) => {
  return (
    <SubjectPage 
      childName={childName}
      classDetails={classDetails}
      code={code}
      theme={mathsTheme}
    />
  )
})

MathsPage.displayName = 'MathsPage'

export default MathsPage

