import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/apiClient";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
  profiles?: { display_name: string | null } | null;
}

const ReviewSection = ({ destinationId }: { destinationId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async () => {
    const { data } = await apiFetch<Review[]>(`/reviews/${destinationId}`);
    if (data) setReviews(data);
  };

  useEffect(() => { fetchReviews(); }, [destinationId]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "N/A";

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent: reviews.length > 0 ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Please sign in to write a review", variant: "destructive" }); return; }
    if (rating === 0) { toast({ title: "Please select a rating", variant: "destructive" }); return; }
    setLoading(true);

    const { error } = await apiFetch("/reviews", {
      method: "POST",
      body: JSON.stringify({
        destination_id: destinationId,
        rating,
        comment: comment || null,
      }),
    });

    if (error) {
      toast({ title: "Error submitting review", description: error, variant: "destructive" });
    } else {
      toast({ title: "Review submitted!" });
      setRating(0);
      setComment("");
      fetchReviews();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Rating Analysis */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-4">Rating Analysis</h3>
        <div className="flex gap-8 items-start">
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground">{avgRating}</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-4 w-4 ${s <= Math.round(Number(avgRating)) ? "text-accent fill-accent" : "text-muted-foreground"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDistribution.map(({ star, count, percent }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-muted-foreground">{star}</span>
                <Star className="h-3 w-3 text-accent fill-accent" />
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-accent h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                </div>
                <span className="w-6 text-muted-foreground text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-lg font-bold text-foreground mb-3">Write a Review</h3>
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star className={`h-6 w-6 transition-colors ${s <= (hoverRating || rating) ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Submit Review
            </button>
          </form>
        ) : (
          <p className="text-muted-foreground text-sm">
            <a href="/auth" className="text-primary font-semibold hover:underline">Sign in</a> to write a review.
          </p>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {((review.profiles as any)?.display_name || "U")[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground">{(review.profiles as any)?.display_name || "Anonymous"}</span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                ))}
              </div>
            </div>
            {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
            <p className="text-xs text-muted-foreground/70 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No reviews yet. Be the first to share your experience!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
