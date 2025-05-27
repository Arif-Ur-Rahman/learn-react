"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Child component that re-renders when props change
const ExpensiveChild = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`🔄 ExpensiveChild "${label}" rendered`)

  // Simulate expensive rendering
  const expensiveValue = useMemo(() => {
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += i
    }
    return result
  }, [])

  return (
    <div className="bg-slate-700 p-4 rounded border-l-4 border-purple-500">
      <div className="text-white font-medium mb-2">{label}</div>
      <div className="text-gray-400 text-sm mb-3">Expensive calculation: {expensiveValue.toLocaleString()}</div>
      <Button onClick={onClick} size="sm" className="bg-purple-600 hover:bg-purple-700">
        Click me
      </Button>
    </div>
  )
})

ExpensiveChild.displayName = "ExpensiveChild"

// Todo item component
const TodoItem = memo(
  ({
    todo,
    onToggle,
    onDelete,
  }: {
    todo: { id: number; text: string; completed: boolean }
    onToggle: (id: number) => void
    onDelete: (id: number) => void
  }) => {
    console.log(`📝 TodoItem "${todo.text}" rendered`)

    return (
      <div className="flex items-center justify-between bg-slate-700 p-3 rounded">
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="w-4 h-4" />
          <span className={`text-white ${todo.completed ? "line-through opacity-60" : ""}`}>{todo.text}</span>
        </div>
        <Button
          onClick={() => onDelete(todo.id)}
          variant="outline"
          size="sm"
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
        >
          Delete
        </Button>
      </div>
    )
  },
)

TodoItem.displayName = "TodoItem"

// Search component
const SearchResults = memo(
  ({
    items,
    onSelect,
  }: {
    items: string[]
    onSelect: (item: string) => void
  }) => {
    console.log("🔍 SearchResults rendered")

    return (
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(item)}
            className="p-2 bg-slate-700 rounded cursor-pointer hover:bg-slate-600 text-white"
          >
            {item}
          </div>
        ))}
      </div>
    )
  },
)

SearchResults.displayName = "SearchResults"

export default function UseCallbackPage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn useCallback", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
    { id: 3, text: "Optimize performance", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true)

  const searchItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"]

  // Without useCallback - creates new function on every render
  const handleClickWithoutCallback = () => {
    console.log("Button clicked without useCallback")
  }

  // With useCallback - function is memoized
  const handleClickWithCallback = useCallback(() => {
    console.log("Button clicked with useCallback")
  }, [])

  // Conditional callback based on toggle
  const handleClick = useCallbackEnabled ? handleClickWithCallback : handleClickWithoutCallback

  // Todo functions with useCallback
  const handleToggleTodo = useCallback((id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ])
      setNewTodo("")
    }
  }, [newTodo])

  // Search function with useCallback
  const handleSelectItem = useCallback((item: string) => {
    console.log(`Selected: ${item}`)
    setSearchTerm("")
  }, [])

  // Filtered search results
  const filteredItems = useMemo(() => {
    return searchItems.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  // Function that depends on count (recreated when count changes)
  const handleCountRelatedAction = useCallback(() => {
    console.log(`Current count is: ${count}`)
  }, [count])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useCallback</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useCallback hook memoizes functions to prevent unnecessary re-renders of child components. It's
            particularly useful when passing callbacks to optimized child components.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b]) // Only recreates when a or b changes`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Basic Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: Preventing Re-renders</CardTitle>
              <CardDescription className="text-gray-400">
                Compare child re-renders with and without useCallback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="useCallback"
                  checked={useCallbackEnabled}
                  onChange={(e) => setUseCallbackEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="useCallback" className="text-white text-sm">
                  Use useCallback
                </label>
              </div>

              <div>
                <div className="text-white mb-2">Count: {count}</div>
                <Button onClick={() => setCount(count + 1)} className="bg-purple-600 hover:bg-purple-700 mb-4">
                  Increment Count
                </Button>
              </div>

              <ExpensiveChild
                onClick={handleClick}
                label={useCallbackEnabled ? "With useCallback" : "Without useCallback"}
              />

              <div className="text-gray-400 text-sm">
                Open console to see render logs. When useCallback is enabled, the child component doesn't re-render when
                count changes.
              </div>

              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const handleClick = useCallback(() => {
  console.log('Button clicked')
}, []) // No dependencies = never recreated

<ExpensiveChild onClick={handleClick} />`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Dependencies Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 2: Dependencies</CardTitle>
              <CardDescription className="text-gray-400">Function that depends on state values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Your name:</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-slate-700 border-slate-600 text-white mb-4"
                />
              </div>

              <div>
                <div className="text-white mb-2">Count: {count}</div>
                <div className="flex gap-2 mb-4">
                  <Button onClick={() => setCount(count + 1)} className="bg-purple-600 hover:bg-purple-700">
                    Increment
                  </Button>
                  <Button
                    onClick={handleCountRelatedAction}
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    Log Count
                  </Button>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded">
                <div className="text-purple-400 text-sm">Current state:</div>
                <div className="text-white">Name: {name || "Not set"}</div>
                <div className="text-white">Count: {count}</div>
              </div>

              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const handleCountAction = useCallback(() => {
  console.log(\`Count is: \${count}\`)
}, [count]) // Recreates when count changes`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Todo List Example */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 3: Todo List Optimization</CardTitle>
            <CardDescription className="text-gray-400">Optimized todo list with memoized callbacks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
              />
              <Button onClick={handleAddTodo} className="bg-purple-600 hover:bg-purple-700">
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
              ))}
            </div>

            <div className="text-gray-400 text-sm">
              Each todo item is memoized and only re-renders when its own data changes, thanks to useCallback for the
              event handlers.
            </div>

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`const handleToggleTodo = useCallback((id) => {
  setTodos(prev => prev.map(todo => 
    todo.id === id 
      ? { ...todo, completed: !todo.completed } 
      : todo
  ))
}, [])

const TodoItem = memo(({ todo, onToggle }) => {
  // Only re-renders when todo prop changes
  return <div onClick={() => onToggle(todo.id)}>...</div>
})`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Search Example */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 4: Search with Callbacks</CardTitle>
            <CardDescription className="text-gray-400">
              Search component with memoized selection handler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Search fruits:</label>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            {searchTerm && <SearchResults items={filteredItems} onSelect={handleSelectItem} />}

            <div className="text-gray-400 text-sm">
              The search results component is memoized and only re-renders when the filtered items change, not when
              other state updates.
            </div>

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`const handleSelectItem = useCallback((item) => {
  console.log(\`Selected: \${item}\`)
}, [])

const SearchResults = memo(({ items, onSelect }) => {
  // Only re-renders when items prop changes
  return items.map(item => 
    <div onClick={() => onSelect(item)}>{item}</div>
  )
})`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* useCallback vs useMemo */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">useCallback vs useMemo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-purple-400 font-medium mb-3">useCallback</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Memoizes functions</li>
                  <li>• Prevents function recreation</li>
                  <li>• Used with event handlers</li>
                  <li>• Prevents child re-renders</li>
                  <li>• Returns the function itself</li>
                </ul>
                <pre className="bg-slate-800 p-2 rounded text-xs text-green-400 mt-3">
                  <code>useCallback(fn, deps)</code>
                </pre>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-blue-400 font-medium mb-3">useMemo</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Memoizes values</li>
                  <li>• Prevents expensive calculations</li>
                  <li>• Used with computed values</li>
                  <li>• Optimizes performance</li>
                  <li>• Returns the computed value</li>
                </ul>
                <pre className="bg-slate-800 p-2 rounded text-xs text-green-400 mt-3">
                  <code>useMemo(() =&gt; fn(), deps)</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* When to use useCallback */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">When to use useCallback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-green-400 font-medium mb-3">✅ Use useCallback when:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Passing callbacks to memoized child components</li>
                  <li>• Function is a dependency of other hooks</li>
                  <li>• Preventing expensive child re-renders</li>
                  <li>• Function has expensive closure creation</li>
                  <li>• Working with lists of components</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-red-400 font-medium mb-3">❌ Don't use useCallback for:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Functions passed to non-memoized components</li>
                  <li>• Simple event handlers without dependencies</li>
                  <li>• Functions that change on every render anyway</li>
                  <li>• Premature optimization without measuring</li>
                  <li>• Functions with many dependencies</li>
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
                useCallback is essentially useMemo for functions: useCallback(fn, deps) = useMemo(() =&gt; fn, deps)
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Only useful when passing functions to memoized components or as dependencies
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Include all values from component scope used inside the callback in dependencies
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Combine with React.memo for maximum optimization benefits
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Don't overuse - measure performance impact before and after optimization
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
