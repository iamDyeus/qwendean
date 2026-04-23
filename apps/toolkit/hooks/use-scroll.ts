import { useEffect, useRef, useState } from "react"

/**
 * Hook to track scroll position and state
 * Returns a ref to attach to scrollable element and scroll state
 */
export function useScroll(threshold: number = 10) {
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    
    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return { scrolled, ref }
}

/**
 * Hook to track active link based on current pathname
 * Returns the active section name
 */
export function useActiveLink() {
  const [activeLink, setActiveLink] = useState<string>("")

  useEffect(() => {
    const updateActiveLink = () => {
      const path = window.location.pathname
      
      if (path === "/") {
        setActiveLink("home")
      } else if (path.startsWith("/products")) {
        setActiveLink("products")
      } else if (path.startsWith("/blog")) {
        setActiveLink("blog")
      } else {
        setActiveLink("")
      }
    }

    // Set initial active link
    updateActiveLink()

    // Listen for route changes (for client-side navigation)
    window.addEventListener("popstate", updateActiveLink)

    return () => {
      window.removeEventListener("popstate", updateActiveLink)
    }
  }, [])

  return activeLink
}