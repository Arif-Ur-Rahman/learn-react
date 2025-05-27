"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function UseStatePage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()])
      setNewTodo("")
    }
  }

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useState</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useState hook allows you to add state to functional components. It returns an array with the current
            state value and a function to update it.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`const [state, setState] = useState(initialValue)`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Counter Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: Counter</CardTitle>
              <CardDescription className="text-gray-400">Basic state management with numbers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-4">{count}</div>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => setCount(count - 1)}
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    Decrement
                  </Button>
                  <Button
                    onClick={() => setCount(0)}
                    variant="outline"
                    className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
                  >
                    Reset
                  </Button>
                  <Button onClick={() => setCount(count + 1)} className="bg-purple-600 hover:bg-purple-700">
                    Increment
                  </Button>
                </div>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const [count, setCount] = useState(0)

<button onClick={() => setCount(count + 1)}>
  Increment
</button>`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Input Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 2: Text Input</CardTitle>
              <CardDescription className="text-gray-400">Managing string state with controlled inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <div className="mt-3 text-white">{name ? `Hello, ${name}!` : "Enter your name above"}</div>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const [name, setName] = useState("")

<input 
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Complex Example */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 3: Todo List</CardTitle>
            <CardDescription className="text-gray-400">Managing arrays and complex state updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo} className="bg-purple-600 hover:bg-purple-700">
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {todos.map((todo, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-700 p-3 rounded">
                  <span className="text-white">{todo}</span>
                  <Button
                    onClick={() => removeTodo(index)}
                    variant="outline"
                    size="sm"
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {todos.length === 0 && <div className="text-gray-400 text-center py-4">No todos yet. Add one above!</div>}
            </div>

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`const [todos, setTodos] = useState([])

const addTodo = () => {
  setTodos([...todos, newTodo])
}

const removeTodo = (index) => {
  setTodos(todos.filter((_, i) => i !== index))
}`}</code>
            </pre>
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
                useState returns an array with the current state and a setter function
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                The setter function can accept a new value or a function that receives the previous state
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                State updates are asynchronous and may be batched for performance
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                When updating objects or arrays, always create a new reference (immutable updates)
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                The initial state is only used during the first render
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
