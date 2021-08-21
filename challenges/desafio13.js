db.trips.aggregate(
  [
    {
      $addFields:
      {
        dateString:
        {
          $dateToString:
          { format: "%Y-%m-%d", date: "$startTime" },
        },
      },
    },
    {
      $match:
      {
        dateString: "2016-03-10",
      },
    },
    {
      $addFields:
      {
        duracaoMinutos:
        {
          $divide:
          [
            { $subtract: ["$stopTime", "$startTime"] },
            1000 * 60,
          ],
        },
      },
    },
    {
      $group:
      {
        _id: null,
        duracaoMedia: { $avg: "$duracaoMinutos" },
      },
    },
    {
      $project:
      {
        _id: 0,
        duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
      },
    },
  ],
);

// contruido com ajuda
// https://stackoverflow.com/questions/38039705/convert-iso-date-to-yyyy-mm-dd-format
