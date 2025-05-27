"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, UserIcon, LogOut, Settings } from "lucide-react"

// Theme Context
interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// User Context
interface UserData {
  id: number
  name: string
  email: string
  role: "admin" | "user"
}

interface UserContextType {
  user: UserData | null
  login: (user: UserData) => void
  logout: () => void
  updateUser: (updates: Partial<UserData>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)

  const login = (userData: UserData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return <UserContext.Provider value={{ user, login, logout, updateUser }}>{children}</UserContext.Provider>
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Theme Demo Component
const ThemeDemo = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      className={`p-6 rounded-lg border transition-all ${
        theme === "light" ? "bg-white border-gray-200 text-gray-900" : "bg-slate-800 border-slate-600 text-white"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Theme Demo Component</h3>
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={
            theme === "light"
              ? "border-gray-300 text-gray-700 hover:bg-gray-100"
              : "border-slate-500 text-slate-300 hover:bg-slate-700"
          }
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </div>
      <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
        Current theme: <strong>{theme}</strong>
      </p>
      <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
        This component automatically updates when the theme changes through context!
      </p>
    </div>
  )
}

// User Profile Component
const UserProfile = () => {
  const { user, logout, updateUser } = useUser()

  if (!user) {
    return (
      <div className="text-center p-6 bg-slate-700 rounded-lg">
        <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-300">No user logged in</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-700 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <Badge className={user.role === "admin" ? "bg-red-500" : "bg-blue-500"}>{user.role}</Badge>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => updateUser({ name: user.name + " (Updated)" })}
          variant="outline"
          size="sm"
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
        >
          <Settings className="h-4 w-4 mr-1" />
          Update Name
        </Button>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    </div>
  )
}

// Login Component
const LoginDemo = () => {
  const { user, login } = useUser()

  const handleLogin = (role: "admin" | "user") => {
    login({
      id: Date.now(),
      name: role === "admin" ? "Admin User" : "Regular User",
      email: role === "admin" ? "admin@example.com" : "user@example.com",
      role,
    })
  }

  if (user) {
    return <UserProfile />
  }

  return (
    <div className="text-center p-6 bg-slate-700 rounded-lg">
      <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-300 mb-4">Choose a user type to login:</p>
      <div className="flex gap-2 justify-center">
        <Button onClick={() => handleLogin("user")} className="bg-blue-600 hover:bg-blue-700">
          Login as User
        </Button>
        <Button onClick={() => handleLogin("admin")} className="bg-red-600 hover:bg-red-700">
          Login as Admin
        </Button>
      </div>
    </div>
  )
}

// Main Page Component
const UseContextContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useContext</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useContext hook allows you to consume context values without wrapping components in Context.Consumer.
            It's perfect for sharing data across the component tree without prop drilling.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`// 1. Create Context
const MyContext = createContext(defaultValue)

// 2. Provide Context
<MyContext.Provider value={contextValue}>
  {children}
</MyContext.Provider>

// 3. Consume Context
const value = useContext(MyContext)`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Theme Context Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: Theme Context</CardTitle>
              <CardDescription className="text-gray-400">Share theme state across components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemeDemo />
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  return useContext(ThemeContext)
}`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* User Context Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 2: User Context</CardTitle>
              <CardDescription className="text-gray-400">Manage user authentication state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LoginDemo />
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  
  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Context Best Practices */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Context Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-green-400 font-medium mb-3">✅ Do:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Use for truly global state (theme, auth, language)</li>
                  <li>• Create custom hooks for context consumption</li>
                  <li>• Split contexts by concern (separate auth from theme)</li>
                  <li>• Provide default values and error handling</li>
                  <li>• Use TypeScript for better type safety</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-red-400 font-medium mb-3">❌ Don't:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Use for all state (causes unnecessary re-renders)</li>
                  <li>• Put frequently changing data in context</li>
                  <li>• Create deeply nested context providers</li>
                  <li>• Use context for component-specific state</li>
                  <li>• Forget to handle undefined context values</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Context vs Props */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Context vs Props vs State Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-blue-400 font-medium mb-3">Props</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Direct parent-child communication</li>
                  <li>• Explicit data flow</li>
                  <li>• Best for component-specific data</li>
                  <li>• Can cause prop drilling</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-purple-400 font-medium mb-3">Context</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Skip intermediate components</li>
                  <li>• Global or semi-global state</li>
                  <li>• Avoid prop drilling</li>
                  <li>• Can cause unnecessary re-renders</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-yellow-400 font-medium mb-3">External State</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Complex state logic</li>
                  <li>• Performance optimizations</li>
                  <li>• Time travel debugging</li>
                  <li>• Middleware support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Key Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                useContext must be used within a component wrapped by the corresponding Provider
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Context value changes cause all consuming components to re-render
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Create custom hooks to encapsulate context logic and provide better error handling
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Use multiple contexts to separate concerns and optimize re-renders
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Context is not a replacement for all state management - use it wisely
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function UseContextPage() {
  return (
    <ThemeProvider>
      <UserProvider>
        <UseContextContent />
      </UserProvider>
    </ThemeProvider>
  )
}
