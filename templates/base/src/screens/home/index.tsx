import { useState } from 'react';
import { Moon, Sun, Github, Zap, Bot } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '~/components/ui';
import { useTheme } from '~/providers';

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [count, setCount] = useState(0);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Zap className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            create-modern-react
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-first React + TypeScript + Tailwind in seconds
          </p>
        </div>

        {/* Counter Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Interactive Counter</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCount((c) => c - 1)}
              >
                -
              </Button>
              <span className="min-w-[4rem] text-center text-4xl font-bold tabular-nums">
                {count}
              </span>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCount((c) => c + 1)}
              >
                +
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Click the buttons to update the count
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureCard
            title="Vite + SWC"
            description="Lightning fast builds with Hot Module Replacement"
          />
          <FeatureCard
            title="TypeScript"
            description="Full type safety with strict mode enabled"
          />
          <FeatureCard
            title="Tailwind CSS"
            description="Utility-first CSS with dark mode support"
          />
          <FeatureCard
            title="Shadcn/ui"
            description="Beautiful, accessible components"
          />
        </div>

        {/* AI Skills Highlight */}
        <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 p-4">
          <div className="flex items-start gap-3">
            <Bot className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold">Claude Code AI Skills</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                8 pre-configured skills for React best practices, UI/UX design, browser testing, and spec refinement
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Current theme: {theme} (resolved: {resolvedTheme})
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
