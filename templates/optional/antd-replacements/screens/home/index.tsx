import { useState } from 'react';
import { Moon, Sun, Github, Zap, Bot, ExternalLink } from 'lucide-react';
import { Button, Card } from 'antd';
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
          <div className="mb-4 flex items-center justify-between">
            <div className="w-40" />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Zap className="h-8 w-8" />
            </div>
            <Button
              type="default"
              href="https://github.com/abhay-rana/create-modern-react"
              target="_blank"
              rel="noopener noreferrer"
              icon={<Github className="h-4 w-4" />}
            >
              View CLI on GitHub
            </Button>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            create-modern-react
          </h1>
          <p className="mt-2 text-muted-foreground">
            Production-ready React + TypeScript + Tailwind in seconds
          </p>
          <div className="mt-4">
            <code className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm">
              npx create-modern-react my-app
            </code>
          </div>
        </div>

        {/* Counter Card */}
        <Card
          title={
            <div className="flex items-center justify-between">
              <span>Interactive Counter</span>
              <Button
                type="text"
                shape="circle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                icon={
                  resolvedTheme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )
                }
              />
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button size="large" onClick={() => setCount((c) => c - 1)}>
                -
              </Button>
              <span className="min-w-[4rem] text-center text-4xl font-bold tabular-nums">
                {count}
              </span>
              <Button size="large" onClick={() => setCount((c) => c + 1)}>
                +
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Click the buttons to update the count
            </p>
          </div>
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
            title="Ant Design"
            description="Enterprise-class UI components"
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

        {/* Projects Showcase */}
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-bold">
            Production Projects created using this boilerplate
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <ProjectCard
              category="AI/Career"
              title="ResumeFreePro"
              description="AI-Powered Resume Builder"
              designStyle="Modern + Glassmorphism"
              url="https://resumefreepro.com?utm_source=starter-template&utm_medium=landing-page&utm_campaign=create-modern-react-demo"
              previewUrl="https://storage.resumefreepro.com/media-files/resumefreepro.webp"
            />
            <ProjectCard
              category="E-Pharmacy"
              title="HealthMug"
              description="Online Pharmacy Platform"
              designStyle="Clean + Professional"
              url="https://healthmug.com?utm_source=starter-template&utm_medium=landing-page&utm_campaign=create-modern-react-demo"
              previewUrl="https://storage.resumefreepro.com/media-files/healthmug.webp"
            />
          </div>
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

function ProjectCard({
  category,
  title,
  description,
  designStyle,
  url,
  previewUrl,
}: {
  category: string;
  title: string;
  description: string;
  designStyle: string;
  url: string;
  previewUrl: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card
        hoverable
        className="overflow-hidden"
        cover={
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={previewUrl}
              alt={`${title} preview`}
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="text-center text-white">
                <ExternalLink className="mx-auto h-8 w-8" />
                <p className="mt-2 text-sm font-medium">View Demo</p>
              </div>
            </div>
          </div>
        }
      >
        <div className="space-y-3">
          {/* Category Badge */}
          <span className="inline-block rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {category}
          </span>

          {/* Title & Description */}
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Design Style */}
          <p className="text-xs text-muted-foreground">{designStyle}</p>
        </div>
      </Card>
    </a>
  );
}
