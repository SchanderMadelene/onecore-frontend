
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const SMALL_MOBILE_BREAKPOINT = 480

const MobileOverrideContext = React.createContext<boolean | undefined>(undefined)

export function MobileOverrideProvider({ isMobile, children }: { isMobile: boolean; children: React.ReactNode }) {
  return (
    <MobileOverrideContext.Provider value={isMobile}>
      {children}
    </MobileOverrideContext.Provider>
  )
}

export function useIsMobile() {
  const override = React.useContext(MobileOverrideContext)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (override !== undefined) return
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [override])

  return override !== undefined ? override : !!isMobile
}

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isSmallMobile
}
