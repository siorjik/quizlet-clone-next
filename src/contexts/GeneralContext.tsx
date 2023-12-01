import { SetContextProvider } from './SetContext'
import { ViewContextProvider } from './ViewContext'

const GeneralContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ViewContextProvider>
    <SetContextProvider>
      {children}
    </SetContextProvider>
  </ViewContextProvider>
)

export default GeneralContextProvider
