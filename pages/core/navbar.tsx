import React from 'react'
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react'
import { Search20, Notification20, AppSwitcher20 } from '@carbon/icons-react'

interface NavbarProps {
  something: string
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <Header aria-label="IBM Platform Name">
      <HeaderName href="#" prefix="Aria">
        [ToolKit]
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Search"
          onClick={() => console.log('search')}
        >
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Notifications"
          onClick={() => console.log('notifications')}
        >
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="App Switcher"
          onClick={() => console.log('switcher')}
        >
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}

export default Navbar
