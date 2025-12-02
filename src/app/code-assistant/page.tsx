'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Wand2, Loader2, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import CodeBlock from '@/components/code-block';
import { generateCodeSuggestions } from '@/ai/flows/ai-code-assistant-generate-code-suggestions';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  githubRepoUrl: z.string().url({ message: "Please enter a valid GitHub repository URL." }),
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CodeAssistantPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubRepoUrl: '',
      prompt: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setSuggestion(null);
    try {
      const result = await generateCodeSuggestions(data);
      setSuggestion(result.codeSuggestion);
    } catch (error) {
      console.error("Failed to generate code suggestion:", error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a suggestion. Please check the URL and try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/#projects" className="flex items-center gap-2 text-xl font-bold text-primary">
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <Card className="bg-card/50">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl md:text-4xl">AI Code Assistant</CardTitle>
              <CardDescription className="pt-2">
                Get context-aware code suggestions for any public GitHub repository.
              </CardDescription>
               <div className="flex justify-center gap-2 pt-4">
                <Badge variant="secondary">GenAI</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">GitHub API</Badge>
                <Badge variant="secondary">Server Actions</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="githubRepoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Github /> GitHub Repository URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/suryanshsk/personal-portfolio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What code do you need?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., 'A React component for a responsive navbar with a theme toggle button'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isGenerating} className="w-full">
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    Generate Suggestion
                  </Button>
                </form>
              </Form>

              {isGenerating && (
                <div className="mt-8 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-muted-foreground">Analyzing repository and generating code...</p>
                </div>
              )}

              {suggestion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <h3 className="text-lg font-semibold mb-2">Suggested Code:</h3>
                  <CodeBlock code={suggestion} language="typescript" />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
