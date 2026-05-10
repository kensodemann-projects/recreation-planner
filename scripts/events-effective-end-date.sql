create or replace function effective_end_date(event_row events)
returns date as $$
  select coalesce(event_row.end_date, event_row.begin_date);
$$ language sql immutable;
