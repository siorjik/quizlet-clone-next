import { SetContextProvider } from './SetContext'

const RootContextProvider = ({ children }: { children: React.ReactNode }) => (
  <SetContextProvider>
    {children}
  </SetContextProvider>
)

export default RootContextProvider
