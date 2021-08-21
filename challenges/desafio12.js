db.trips.aggregate(
  [
    {
      $addFields:
      {
        dayStart:
        {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group:
      {
        _id: { day: "$dayStart", stationName: "$startStationName" },
        total: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
    { $limit: 1 },
    {
      $project:
      {
        _id: 0,
        nomeEstacao: "$_id.stationName",
        total: "$total",
      },
    },
  ],
);
