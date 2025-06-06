import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Review } from "@/types/models";
import { reviewQueries } from "@/queries/reviewQueries";

export default async function ReviewsPage() {
  let reviews: Review[] = [];
  let fetchError = false;
  try {
    reviews = await reviewQueries.getAll();
  } catch (e) {
    fetchError = true;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Reviews</h1>
      {fetchError ? (
        <div className="text-destructive text-lg font-semibold py-8 text-center">
          Reviews konden niet worden opgehaald. Probeer het later opnieuw.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review: Review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Review #{review.id}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {review.comment}
                </p>
                <Link href={`/reviews/${review.id}`}>
                  <Button variant="outline" className="w-full">
                    View Review
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 