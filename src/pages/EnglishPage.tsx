import { memo } from 'react'
import SubjectPage from './SubjectPage'
import { englishTheme } from '../config/subjectThemes'
import type { PageProps } from '../types/common'

const EnglishPage = memo(({ childName = '', classDetails, code }: PageProps) => {
  return (
    <SubjectPage 
      childName={childName}
      classDetails={classDetails}
      code={code}
      theme={englishTheme}
    />
  )
})

EnglishPage.displayName = 'EnglishPage'

export default EnglishPage

