import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'; // Example icons

interface NewsArticleCardProps {
  title: string;
  summary: string;
  relevanceScore: number;
  articleLink?: string; // Optional link to the full article
}

// Helper to determine badge variant and icon based on score
const getRelevanceAttributes = (score: number) => {
  if (score >= 7) {
    return { variant: 'default', icon: <TrendingUp className="mr-1 h-3 w-3" />, textClass: 'text-green-400', label: 'Highly Relevant' };
  } else if (score >= 4) {
    return { variant: 'secondary', icon: <CheckCircle className="mr-1 h-3 w-3" />, textClass: 'text-yellow-400', label: 'Relevant' };
  } else {
    return { variant: 'outline', icon: <AlertTriangle className="mr-1 h-3 w-3" />, textClass: 'text-orange-400', label: 'Less Relevant' };
  }
};


export default function NewsArticleCard({ title, summary, relevanceScore, articleLink }: NewsArticleCardProps) {
  const { variant, icon, textClass, label } = getRelevanceAttributes(relevanceScore);
  
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-center pt-1">
          <Badge variant={variant} className="flex items-center">
            {icon}
            <span className={`font-semibold ${textClass}`}>{label} (Score: {relevanceScore}/10)</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base leading-relaxed">{summary}</CardDescription>
      </CardContent>
      {articleLink && (
        <CardFooter>
          <a
            href={articleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            Read full article
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
