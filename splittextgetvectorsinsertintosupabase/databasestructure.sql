-- Create a table to store your movies
create table movies1 (
  id bigserial primary key,
  content text, -- corresponds to the "text chunk"
  embedding vector(1536) -- 1536 works for OpenAI embeddings
);



create or replace function match_movies1 (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    movies1.id,
    movies1.content,
    1 - (movies1.embedding <=> query_embedding) as similarity
  from movies1
  where 1 - (movies1.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;