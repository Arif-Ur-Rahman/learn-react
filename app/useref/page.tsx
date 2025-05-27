"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function UseRefPage() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState("")

  // Refs for DOM manipulation
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  // Ref for storing mutable values
  const renderCount = useRef(0)
  const previousCount = useRef<number>(0)

  // Update render count on every render
  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  // Store previous count value
  useEffect(() => {
    previousCount.current = count
  }, [count])

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const scrollToDiv = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const changeBackgroundColor = () => {
    if (divRef.current) {
      const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      divRef.current.className = `p-4 rounded transition-colors ${randomColor}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useRef</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useRef hook returns a mutable ref object whose .current property is initialized to the passed argument.
            It's useful for accessing DOM elements and storing mutable values that don't trigger re-renders.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`const refContainer = useRef(initialValue)
// Access with: refContainer.current`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* DOM Access Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: DOM Access</CardTitle>
              <CardDescription className="text-gray-400">Focus input and manipulate DOM elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Click button to focus me"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Button onClick={focusInput} className="w-full bg-purple-600 hover:bg-purple-700">
                  Focus Input
                </Button>
                <div className="text-gray-300 text-sm">Input value: {inputValue || "Empty"}</div>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const inputRef = useRef(null)

const focusInput = () => {
  inputRef.current?.focus()
}

<input ref={inputRef} />`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Mutable Values Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 2: Mutable Values</CardTitle>
              <CardDescription className="text-gray-400">Store values without triggering re-renders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <div className="text-2xl font-bold text-purple-400">Count: {count}</div>
                <div className="text-gray-300">Render count: {renderCount.current}</div>
                <div className="text-gray-300">Previous count: {previousCount.current ?? "None"}</div>
                <Button onClick={() => setCount(count + 1)} className="bg-purple-600 hover:bg-purple-700">
                  Increment Count
                </Button>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const renderCount = useRef(0)
const previousCount = useRef()

useEffect(() => {
  renderCount.current += 1
  previousCount.current = count
})`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* DOM Manipulation Example */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 3: DOM Manipulation</CardTitle>
            <CardDescription className="text-gray-400">Direct DOM manipulation and styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                onClick={scrollToDiv}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Scroll to Box
              </Button>
              <Button onClick={changeBackgroundColor} className="bg-purple-600 hover:bg-purple-700">
                Change Color
              </Button>
            </div>

            <div style={{ height: "200px", overflowY: "auto" }} className="border border-slate-600 rounded">
              <div style={{ height: "300px" }} className="p-4 text-gray-300">
                Scroll down to see the colored box...
              </div>
              <div
                ref={divRef}
                className="p-4 rounded transition-colors bg-purple-500 text-white text-center font-bold"
              >
                I'm the target div! Click "Change Color" to change my background.
              </div>
              <div style={{ height: "300px" }} className="p-4 text-gray-300">
                More content below...
              </div>
            </div>

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`const divRef = useRef(null)

const changeBackgroundColor = () => {
  if (divRef.current) {
    divRef.current.style.backgroundColor = 'red'
  }
}

<div ref={divRef}>Target element</div>`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* useRef vs useState */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">useRef vs useState</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-purple-400 font-medium mb-3">useRef</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Doesn't trigger re-renders</li>
                  <li>• Mutable .current property</li>
                  <li>• Perfect for DOM access</li>
                  <li>• Stores values between renders</li>
                  <li>• Synchronous updates</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-purple-400 font-medium mb-3">useState</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Triggers re-renders</li>
                  <li>• Immutable state updates</li>
                  <li>• For component state</li>
                  <li>• Causes component updates</li>
                  <li>• Asynchronous updates</li>
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
                useRef returns an object with a .current property that persists across renders
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Changing .current doesn't trigger a re-render
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Perfect for accessing DOM elements imperatively
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Can store any mutable value (timers, previous values, etc.)
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                The ref object is created once and persists for the component's lifetime
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
