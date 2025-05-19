import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

const optimizationStrategies = [
  {
    icon: TrendingUp,
    title: 'Cost Optimization',
    description: 'Reduce your cloud spending without sacrificing performance. We analyze your usage patterns and identify areas for savings, such as right-sizing instances, leveraging reserved instances, and eliminating waste.',
    benefits: ['Lower monthly bills', 'Improved ROI', 'Better budget allocation'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'finance chart'
  },
  {
    icon: ShieldCheck,
    title: 'Security Enhancement',
    description: 'Strengthen your cloud security posture. Our experts assess your current setup, implement best practices, and help you configure advanced security services to protect your data and applications from threats.',
    benefits: ['Reduced risk of breaches', 'Compliance adherence', 'Enhanced data protection'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'security shield'
  },
  {
    icon: Zap,
    title: 'Performance Efficiency',
    description: 'Boost the speed and responsiveness of your cloud applications. We optimize your architecture, database performance, and content delivery networks to ensure your users have the best possible experience.',
    benefits: ['Faster load times', 'Improved user satisfaction', 'Scalability for growth'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'speed fast'
  },
  {
    icon: CheckCircle,
    title: 'Operational Excellence',
    description: 'Streamline your cloud operations with automation and best practices. We help you implement Infrastructure as Code (IaC), CI/CD pipelines, and monitoring solutions for efficient and reliable management.',
    benefits: ['Automated deployments', 'Increased reliability', 'Reduced manual effort'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'gears automation'
  }
];

export default function OptimizationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Cloud Optimization Strategies</h1>
        <p className="text-muted-foreground">
          Unlock the full potential of your cloud environment with our expert guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {optimizationStrategies.map((strategy) => (
          <Card key={strategy.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image 
                src={strategy.image} 
                alt={strategy.title} 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint={strategy.imageHint}
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <strategy.icon className="h-8 w-8 text-accent" />
                <CardTitle className="text-2xl">{strategy.title}</CardTitle>
              </div>
              <CardDescription>{strategy.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="mb-2 font-semibold text-foreground">Key Benefits:</h4>
              <ul className="space-y-1">
                {strategy.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
