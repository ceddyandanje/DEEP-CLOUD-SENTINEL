'use client';

import { useState, useTransition } from 'react';
import { summarizeCloudNews, type SummarizeCloudNewsInput, type SummarizeCloudNewsOutput } from '@/ai/flows/summarize-cloud-news';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import NewsArticleCard from './NewsArticleCard';
import { Loader2, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Sample news articles (replace with dynamic fetching or user input if needed)
const sampleArticles: string[] = [
  "Google Cloud Next '24: Key announcements focus on AI-powered infrastructure and Vertex AI enhancements. New generative AI models and tools for developers were unveiled, aiming to simplify AI adoption for businesses. Emphasis was also placed on multi-cloud capabilities and sustainability.",
  "AWS re:Invent Recap: Amazon Web Services highlighted advancements in serverless computing with Lambda SnapStart, and introduced new EC2 instance types optimized for machine learning. Security Hub received updates for better threat detection and automated response.",
  "Microsoft Ignite Highlights: Azure AI Studio was a major focus, offering a unified platform for building, deploying, and managing AI models. Significant updates to Azure Arc enable more robust hybrid cloud scenarios. Microsoft Defender for Cloud also saw new features for comprehensive security management.",
  "Report: Cloud security breaches on the rise due to misconfigurations. A recent study indicates that a significant percentage of cloud security incidents are attributable to user error in configuring cloud services, emphasizing the need for better automation and security posture management tools.",
  "The Future of Edge Computing: Experts predict a surge in edge computing adoption as IoT devices proliferate and demand for low-latency processing increases. Cloud providers are expanding their edge offerings to meet this growing market.",
  "VMware Explore Updates: VMware continues to push its multi-cloud strategy with enhancements to Tanzu for application modernization and Aria for cloud management. Cross-cloud services aim to provide consistent operations across different cloud environments."
];

export default function NewsFeed() {
  const [userInterests, setUserInterests] = useState<string>('AI in cloud, serverless security, hybrid cloud solutions');
  const [newsArticlesInput, setNewsArticlesInput] = useState<string>(sampleArticles.join('\n\n'));
  const [summarizedNews, setSummarizedNews] = useState<SummarizeCloudNewsOutput['summarizedNews'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSummarizedNews(null);

    startTransition(async () => {
      try {
        const articles = newsArticlesInput.split('\n\n').map(a => a.trim()).filter(a => a.length > 0);
        if (articles.length === 0) {
          setError("Please provide at least one news article.");
          return;
        }
        if (!userInterests.trim()) {
          setError("Please specify your interests.");
          return;
        }

        const input: SummarizeCloudNewsInput = {
          newsArticles: articles,
          userInterests: userInterests,
        };
        const result = await summarizeCloudNews(input);
        if (result && result.summarizedNews) {
          // Sort by relevance score descending
          const sortedNews = result.summarizedNews.sort((a, b) => b.relevanceScore - a.relevanceScore);
          setSummarizedNews(sortedNews);
        } else {
          setError('Failed to get news summaries. The AI might have returned an unexpected response.');
        }
      } catch (e) {
        console.error("Error summarizing news:", e);
        setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
      }
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-sm bg-card">
        <div>
          <Label htmlFor="userInterests" className="text-lg font-semibold">Your Interests</Label>
          <Input
            id="userInterests"
            type="text"
            value={userInterests}
            onChange={(e) => setUserInterests(e.target.value)}
            placeholder="e.g., AI in cloud, serverless security, hybrid cloud solutions"
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Describe your interests in cloud and security to tailor the news.
          </p>
        </div>
        <div>
          <Label htmlFor="newsArticlesInput" className="text-lg font-semibold">News Articles</Label>
          <Textarea
            id="newsArticlesInput"
            value={newsArticlesInput}
            onChange={(e) => setNewsArticlesInput(e.target.value)}
            placeholder="Paste news articles here, separated by two newlines..."
            rows={10}
            className="mt-1"
          />
           <p className="text-sm text-muted-foreground mt-1">
            Enter news article texts, separated by a blank line (two newlines). Using sample articles by default.
          </p>
        </div>
        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Get News Insights
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summarizedNews && summarizedNews.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Tailored News Summaries</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {summarizedNews.map((newsItem, index) => (
              <NewsArticleCard
                key={index}
                title={newsItem.title}
                summary={newsItem.summary}
                relevanceScore={newsItem.relevanceScore}
              />
            ))}
          </div>
        </div>
      )}
      {summarizedNews && summarizedNews.length === 0 && !isPending && (
         <Alert>
            <AlertTitle>No Summaries Generated</AlertTitle>
            <AlertDescription>The AI did not return any summaries for the provided articles and interests. Please try adjusting your input.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
