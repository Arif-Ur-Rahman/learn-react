"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

// Expensive calculation function
const expensiveCalculation = (num: number): number => {
  console.log("🔥 Expensive calculation running...")
  let result = 0
  for (let i = 0; i < num * 1000000; i++) {
    result += i
  }
  return result
}

// Fibonacci calculation
const fibonacci = (n: number): number => {
  console.log(`🔢 Calculating fibonacci(${n})`)
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// Memoized fibonacci
const memoizedFibonacci = (() => {
  const cache = new Map<number, number>()
  return (n: number): number => {
    if (cache.has(n)) {
      console.log(`💾 Cache hit for fibonacci(${n})`)
      return cache.get(n)!
    }
    console.log(`🔢 Calculating fibonacci(${n})`)
    if (n <= 1) {
      cache.set(n, n)
      return n
    }
    const result = memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2)
    cache.set(n, result)
    return result
  }
})()

// Filter and sort expensive operations
const processItems = (items: string[], filter: string, sortOrder: "asc" | "desc") => {
  console.log("🔄 Processing items...")
  const filtered = items.filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
  return filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.localeCompare(b)
    }
    return b.localeCompare(a)
  })
}

export default function UseMemoPage() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")
  const [multiplier, setMultiplier] = useState([5])
  const [fibNumber, setFibNumber] = useState(10)
  const [useMemoized, setUseMemoized] = useState(true)
  const [filter, setFilter] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Sample data for filtering
  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon",
  ]

  // Expensive calculation with useMemo
  const expensiveResult = useMemo(() => {
    return expensiveCalculation(multiplier[0])
  }, [multiplier[0]])

  // Without useMemo (recalculates on every render)
  const expensiveResultWithoutMemo = expensiveCalculation(multiplier[0])

  // Fibonacci with conditional memoization
  const fibResult = useMemo(() => {
    if (useMemoized) {
      return memoizedFibonacci(fibNumber)
    }
    return fibonacci(fibNumber)
  }, [fibNumber, useMemoized])

  // Processed items with useMemo
  const processedItems = useMemo(() => {
    return processItems(items, filter, sortOrder)
  }, [filter, sortOrder])

  // Derived state that doesn't need memoization
  const simpleCalculation = count * 2

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useMemo</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useMemo hook memoizes expensive calculations and only recalculates when dependencies change. It's a
            performance optimization tool that should be used judiciously.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b)
}, [a, b]) // Only recalculates when a or b changes`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Expensive Calculation Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: Expensive Calculation</CardTitle>
              <CardDescription className="text-gray-400">
                Compare performance with and without memoization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Multiplier: {multiplier[0]} (affects expensive calculation)
                </label>
                <Slider value={multiplier} onValueChange={setMultiplier} max={10} min={1} step={1} className="mb-4" />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Count: {count} (doesn't affect calculation)
                </label>
                <Button onClick={() => setCount(count + 1)} className="bg-purple-600 hover:bg-purple-700 mb-4">
                  Increment Count
                </Button>
              </div>

              <div className="bg-slate-900 p-3 rounded">
                <div className="text-green-400 text-sm mb-1">With useMemo:</div>
                <div className="text-white">Result: {expensiveResult.toLocaleString()}</div>
              </div>

              <div className="text-gray-400 text-sm">
                Open browser console to see when calculations run. The memoized version only recalculates when the
                multiplier changes, not when count changes.
              </div>

              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const expensiveResult = useMemo(() => {
  return expensiveCalculation(multiplier)
}, [multiplier]) // Only runs when multiplier changes`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Fibonacci Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 2: Fibonacci Sequence</CardTitle>
              <CardDescription className="text-gray-400">Memoization with recursive calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Fibonacci Number: {fibNumber}</label>
                <Slider
                  value={[fibNumber]}
                  onValueChange={(value) => setFibNumber(value[0])}
                  max={35}
                  min={1}
                  step={1}
                  className="mb-4"
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="useMemoized"
                  checked={useMemoized}
                  onChange={(e) => setUseMemoized(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="useMemoized" className="text-white text-sm">
                  Use memoized version
                </label>
              </div>

              <div className="bg-slate-900 p-3 rounded">
                <div className="text-purple-400 text-sm mb-1">
                  fibonacci({fibNumber}) = {fibResult}
                </div>
                <div className="text-gray-400 text-xs">
                  {useMemoized ? "Using memoized calculation" : "Using recursive calculation"}
                </div>
              </div>

              <div className="text-gray-400 text-sm">
                Try values above 30 to see the performance difference! Check the console for calculation logs.
              </div>

              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const fibResult = useMemo(() => {
  return fibonacci(number)
}, [number])`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Complex Data Processing */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 3: Data Processing</CardTitle>
            <CardDescription className="text-gray-400">Memoize filtered and sorted data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Filter items:</label>
                <Input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Type to filter..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Sort order:</label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSortOrder("asc")}
                    variant={sortOrder === "asc" ? "default" : "outline"}
                    size="sm"
                    className={
                      sortOrder === "asc"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    }
                  >
                    A-Z
                  </Button>
                  <Button
                    onClick={() => setSortOrder("desc")}
                    variant={sortOrder === "desc" ? "default" : "outline"}
                    size="sm"
                    className={
                      sortOrder === "desc"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    }
                  >
                    Z-A
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded">
              <div className="text-purple-400 text-sm mb-2">
                Filtered & Sorted Results ({processedItems.length} items):
              </div>
              <div className="flex flex-wrap gap-2">
                {processedItems.map((item, index) => (
                  <Badge key={index} variant="secondary" className="bg-slate-700 text-gray-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              The filtering and sorting only runs when the filter text or sort order changes, not on every render. Check
              the console to see when processing occurs.
            </div>

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`const processedItems = useMemo(() => {
  return items
    .filter(item => item.includes(filter))
    .sort((a, b) => sortOrder === 'asc' 
      ? a.localeCompare(b) 
      : b.localeCompare(a)
    )
}, [filter, sortOrder])`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* When to use useMemo */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">When to use useMemo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-green-400 font-medium mb-3">✅ Use useMemo when:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Expensive calculations that depend on specific props/state</li>
                  <li>• Creating objects/arrays that are passed as props</li>
                  <li>• Filtering/sorting large datasets</li>
                  <li>• Complex transformations of data</li>
                  <li>• Preventing unnecessary re-renders of child components</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-red-400 font-medium mb-3">❌ Don't use useMemo for:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Simple calculations (like count * 2)</li>
                  <li>• Values that change on every render anyway</li>
                  <li>• Premature optimization without measuring</li>
                  <li>• Creating functions (use useCallback instead)</li>
                  <li>• Values with no dependencies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Performance Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-yellow-400 font-medium mb-2">Measure First</h4>
                <p className="text-gray-300 text-sm">
                  Use React DevTools Profiler to identify actual performance bottlenecks before adding memoization.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Dependencies Matter</h4>
                <p className="text-gray-300 text-sm">
                  Include all values from component scope that are used inside useMemo. Missing dependencies can cause
                  bugs.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Memory vs CPU Trade-off</h4>
                <p className="text-gray-300 text-sm">
                  useMemo trades memory for CPU time. Don't overuse it as it can actually hurt performance in some
                  cases.
                </p>
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
                useMemo only recalculates when one of its dependencies changes
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                The memoized value is cached between renders for performance
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Include all dependencies in the dependency array to avoid stale closures
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Don't use useMemo for every calculation - measure performance first
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                useMemo is a hint to React - it may still recalculate in some cases
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
