db.movies.aggregate(
  [
    {
      $match:
      {
        countries: "USA",
        "tomatoes.viewer.rating": { $gte: 3 },
      },
    },
    {
      $addFields:
      {
        num_favs:
        {
          $size: "$cast",
        },
      },
    },
  ],
);
