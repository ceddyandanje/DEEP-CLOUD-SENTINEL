import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BookingForm from './BookingForm'; // Client Component

export default function BookingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Book a Consultation</h1>
        <p className="text-muted-foreground">
          Schedule a session with our cloud experts to discuss your needs.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>
            Please provide your information and preferred time for the consultation.
            Our team will confirm your booking via email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookingForm />
        </CardContent>
      </Card>
    </div>
  );
}
