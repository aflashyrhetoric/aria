import React from 'react'
import {
  Header,
  HeaderName,
  HeaderContainer,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  SideNav,
  SkipToContent,
  SideNavItems,
  HeaderSideNavItems,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react'
import { Search20, Notification20, AppSwitcher20 } from '@carbon/icons-react'
import Head from 'next/head'

interface NavbarProps {
  something: string
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="Aria">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="">
              Aria
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem disabled isCurrentPage href="#">
                Students
              </HeaderMenuItem>
              <HeaderMenuItem disabled href="#">
                Sessions
              </HeaderMenuItem>
              {/* <HeaderMenuItem disabled href="/utils/report-writer">
              Report Writer
            </HeaderMenuItem> */}
              {/* <HeaderMenuItem href="#">Utilities</HeaderMenuItem> */}
              <HeaderMenu aria-label="Link 4" menuLinkName="Tools">
                <HeaderMenuItem href="/utils/session-note-generator">
                  Session Note Generator
                </HeaderMenuItem>
                {/* <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem> */}
              </HeaderMenu>
            </HeaderNavigation>
            <HeaderGlobalBar>
              {/* <HeaderGlobalAction
              aria-label="Search"
              onClick={() => console.log('search')}
            >
              <Search20 />
            </HeaderGlobalAction> */}
              <HeaderGlobalAction
                aria-label="Notifications"
                onClick={() => console.log('notifications')}
              >
                <Notification20 />
              </HeaderGlobalAction>
              {/* <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={() => console.log('switcher')}
            >
              <AppSwitcher20 />
            </HeaderGlobalAction> */}
            </HeaderGlobalBar>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                  </HeaderMenu>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        )}
      />
    </>
  )
}

export default Navbar
