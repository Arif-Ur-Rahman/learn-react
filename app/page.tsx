import { BookOpen, Code, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const hooks = [
    {
      name: "useState",
      description: "Manage state in functional components",
      icon: "🔄",
      difficulty: "Beginner",
    },
    {
      name: "useEffect",
      description: "Handle side effects and lifecycle events",
      icon: "⚡",
      difficulty: "Beginner",
    },
    {
      name: "useRef",
      description: "Access DOM elements and persist values",
      icon: "🎯",
      difficulty: "Intermediate",
    },
    {
      name: "useReducer",
      description: "Manage complex state with reducer pattern",
      icon: "🔧",
      difficulty: "Intermediate",
    },
    {
      name: "useContext",
      description: "Share data across component tree",
      icon: "🌐",
      difficulty: "Intermediate",
    },
    {
      name: "useMemo",
      description: "Optimize performance with memoization",
      icon: "💡",
      difficulty: "Advanced",
    },
    {
      name: "useCallback",
      description: "Memoize functions to prevent re-renders",
      icon: "🚀",
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-6">
              Interactive Learning Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Master React
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Hooks</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Learn React hooks through interactive examples, practical exercises, and comprehensive explanations. From
              basic state management to advanced optimization techniques.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3"
            >
              <Code className="mr-2 h-5 w-5" />
              View Examples
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">7+</div>
              <div className="text-gray-400">React Hooks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Code Examples</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Interactive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hooks Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Explore React Hooks</h2>
            <p className="text-gray-300 text-lg">Click on any hook to start learning with interactive examples</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hooks.map((hook) => (
              <Link key={hook.name} href={`/${hook.name.toLowerCase()}`}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{hook.icon}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          hook.difficulty === "Beginner"
                            ? "bg-green-500/20 text-green-400"
                            : hook.difficulty === "Intermediate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {hook.difficulty}
                      </span>
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                      {hook.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{hook.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-purple-400 text-sm font-medium">
                      Learn more
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Learn Here?</h2>
            <p className="text-gray-300 text-lg">The best way to master React hooks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Examples</h3>
              <p className="text-gray-400">
                Learn by doing with live code examples you can modify and experiment with.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real-world Use Cases</h3>
              <p className="text-gray-400">Understand when and how to use each hook with practical examples.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Progressive Learning</h3>
              <p className="text-gray-400">
                Start with basics and gradually move to advanced concepts at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
