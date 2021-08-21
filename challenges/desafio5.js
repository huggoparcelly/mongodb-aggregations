db.movies.aggregate(
  [
    {
      $match:
      {
        countries: "USA",
        "tomatoes.viewer.rating": { $gte: 3 },
        cast: { $exists: true },
      },
    },
    {
      $addFields:
      {
        favorites:
        [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
      },
    },
    {
      $addFields:
      {
        listaIntersection:
        {
          $setIntersection: ["$cast", "$favorites"],
        },
      },
    },
    {
      $addFields:
      {
        num_favs: { $size: "$listaIntersection" },
      },
    },
    { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
    { $limit: 25 },
    { $skip: 24 },
    { $project:
      {
        _id: 0,
        title: "$title",
      },
    },
  ],
);
