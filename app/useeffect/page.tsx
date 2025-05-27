"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UseEffectPage() {
  const [count, setCount] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Effect 1: Document title update
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  // Effect 2: Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    setWindowWidth(window.innerWidth)

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Effect 3: Timer with cleanup
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning])

  const resetTimer = () => {
    setTimer(0)
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useEffect</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useEffect hook lets you perform side effects in functional components. It serves the same purpose as
            componentDidMount, componentDidUpdate, and componentWillUnmount combined.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`useEffect(() => {
  // Side effect logic
  
  return () => {
    // Cleanup logic (optional)
  }
}, [dependencies]) // Dependency array (optional)`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Document Title Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: Document Title</CardTitle>
              <CardDescription className="text-gray-400">Update document title when count changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-4">{count}</div>
                <div className="text-gray-300 mb-4">Check your browser tab title!</div>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => setCount(count - 1)}
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    -1
                  </Button>
                  <Button onClick={() => setCount(count + 1)} className="bg-purple-600 hover:bg-purple-700">
                    +1
                  </Button>
                </div>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Window Resize Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 2: Window Resize</CardTitle>
              <CardDescription className="text-gray-400">Listen to window resize events with cleanup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">{windowWidth}px</div>
                <div className="text-gray-300 mb-4">Resize your browser window to see the width change</div>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Timer Example */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 3: Timer with Cleanup</CardTitle>
            <CardDescription className="text-gray-400">
              Managing intervals and cleanup to prevent memory leaks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-4">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {isRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
                >
                  Reset
                </Button>
              </div>
            </div>

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`useEffect(() => {
  let interval = null
  
  if (isRunning) {
    interval = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }
  
  return () => {
    if (interval) {
      clearInterval(interval)
    }
  }
}, [isRunning])`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Dependency Array Explanation */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Dependency Array Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded">
                <div className="text-purple-400 font-medium mb-2">No dependency array:</div>
                <code className="text-green-400">useEffect(() =&gt; {"{}"}) // Runs after every render</code>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <div className="text-purple-400 font-medium mb-2">Empty dependency array:</div>
                <code className="text-green-400">useEffect(() =&gt; {"{}"}, []) // Runs only once (mount)</code>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <div className="text-purple-400 font-medium mb-2">With dependencies:</div>
                <code className="text-green-400">useEffect(() =&gt; {"{}"}, [count]) // Runs when count changes</code>
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
                useEffect runs after the DOM has been updated
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                The cleanup function prevents memory leaks and cancels subscriptions
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Dependencies control when the effect runs - include all values from component scope
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Multiple useEffect hooks can be used to separate concerns
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Effects run in the order they are defined
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
