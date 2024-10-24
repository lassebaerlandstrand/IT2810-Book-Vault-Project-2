export const mongoCalculateAverageRatingAggregationPipeline = [
  {
    $addFields: {
      totalRatings: {
        $sum: [
          "$ratingsByStars.1",
          "$ratingsByStars.2",
          "$ratingsByStars.3",
          "$ratingsByStars.4",
          "$ratingsByStars.5",
        ],
      },
      totalWeightedRating: {
        $add: [
          {
            $multiply: [1, "$ratingsByStars.1"],
          },
          {
            $multiply: [2, "$ratingsByStars.2"],
          },
          {
            $multiply: [3, "$ratingsByStars.3"],
          },
          {
            $multiply: [4, "$ratingsByStars.4"],
          },
          {
            $multiply: [5, "$ratingsByStars.5"],
          },
        ],
      },
    },
  },
  {
    $addFields: {
      averageRating: {
        $cond: {
          if: { $gt: ["$totalRatings", 0] },
          then: {
            $divide: ["$totalWeightedRating", "$totalRatings"],
          },
          else: 0,
        },
      },
    },
  },
];
