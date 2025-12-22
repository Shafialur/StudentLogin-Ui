import { memo } from 'react'
import SubjectPage from './SubjectPage'
import { gitaTheme } from '../config/subjectThemes'
import type { PageProps } from '../types/common'

const GitaPage = memo(({ childName = '', classDetails, code }: PageProps) => {
  return (
    <SubjectPage 
      childName={childName}
      classDetails={classDetails}
      code={code}
      theme={gitaTheme}
    />
  )
})

GitaPage.displayName = 'GitaPage'

export default GitaPage

