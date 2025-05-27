"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const hooks = [
  { name: "useState", href: "/usestate" },
  { name: "useEffect", href: "/useeffect" },
  { name: "useRef", href: "/useref" },
  { name: "useReducer", href: "/usereducer" },
  { name: "useContext", href: "/usecontext" },
  { name: "useMemo", href: "/usememo" },
  { name: "useCallback", href: "/usecallback" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">React Hooks</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {hooks.map((hook) => (
              <Link
                key={hook.name}
                href={hook.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === hook.href
                    ? "text-purple-400 bg-purple-400/10"
                    : "text-gray-300 hover:text-purple-400 hover:bg-slate-800"
                }`}
              >
                {hook.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6">
              Start Learning!
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-slate-800">
                <div className="flex flex-col space-y-4 mt-8">
                  {hooks.map((hook) => (
                    <Link
                      key={hook.name}
                      href={hook.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                        pathname === hook.href
                          ? "text-purple-400 bg-purple-400/10"
                          : "text-gray-300 hover:text-purple-400"
                      }`}
                    >
                      {hook.name}
                    </Link>
                  ))}
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium mt-4">
                    Start Learning!
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
