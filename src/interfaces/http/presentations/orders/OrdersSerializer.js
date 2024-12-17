module.exports = () => ({
  serializeOrders: ({ id, uuid, client_name, longitude, latitude, date, deleted_at, created_at, updated_at }) => ({
    id,
    uuid,
    client_name,
    longitude,
    latitude,
    date,
    deleted_at,
    created_at,
    updated_at
  }),
  paginatedSerialize({ limit, count, rows, total, offset }) {
    return {
      data: rows.map((row) => this.serializeOrders(row)),
      limit,
      offset,
      total_founded: count,
      total
    };
  }
});
