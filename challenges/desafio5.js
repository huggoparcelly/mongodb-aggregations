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
      $let:
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
  ],
);

// criar uma variável com os atores favoritos
// comparar cast com a nova variável com o setIntersection
// verificar quantos tem dentro de setIntersection com o $size
// retornar o 25 filme, apenas o titulo.
