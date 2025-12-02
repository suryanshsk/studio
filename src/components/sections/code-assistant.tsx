'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Github, Wand2, Loader2, Terminal } from 'lucide-react';

import { generateCodeSuggestions } from '@/ai/flows/ai-code-assistant-generate-code-suggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CodeBlock from '@/components/code-block';

const formSchema = z.object({
  githubRepoUrl: z.string().url({ message: 'Please enter a valid GitHub repository URL.' }),
  prompt: z.string().min(10, { message: 'Prompt must be at least 10 characters long.' }),
});

export default function CodeAssistantSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [codeSuggestion, setCodeSuggestion] = useState('');
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubRepoUrl: '',
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCodeSuggestion('');
    setError('');
    try {
      const result = await generateCodeSuggestions(values);
      setCodeSuggestion(result.codeSuggestion);
    } catch (e) {
      console.error(e);
      setError('Failed to generate code suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="code-assistant" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">AI Code Assistant</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Leverage AI to get code suggestions based on the context of an existing GitHub repository.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-primary" />
                Generate Code
              </CardTitle>
              <CardDescription>Fill in the details below to get a code suggestion.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="githubRepoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Repository URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/user/repo" {...field} />
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
                          <Textarea placeholder="e.g., 'A React component to display user avatars'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Suggestion
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="h-full">
            <Card className="h-full bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-accent" />
                  Suggested Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                )}
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {codeSuggestion && <CodeBlock code={codeSuggestion} />}
                {!isLoading && !codeSuggestion && !error && (
                   <div className="flex items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>Your generated code will appear here.</p>
                   </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
