import NewsFeed from './NewsFeed'; // Client Component

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AI-Powered Cloud & Security News</h1>
        <p className="text-muted-foreground">
          Get personalized news insights powered by AI. Enter your interests and let CloudWise summarize and rank relevant articles for you.
        </p>
      </div>
      <NewsFeed />
    </div>
  );
}
