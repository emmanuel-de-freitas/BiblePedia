-- -----------------------------------------------------------------------
-- Translations
-- -----------------------------------------------------------------------
create table if not exists public.translations (
  id                    varchar(50)  primary key,
  name                  varchar(255) not null,
  english_name          varchar(255) not null,
  website               text,
  license_url           text,
  short_name            varchar(50),
  language              varchar(10)  not null,
  language_name         varchar(100) not null,
  language_english_name varchar(100) not null,
  text_direction        varchar(10)  not null default 'ltr',
  available_formats     jsonb,
  number_of_books       integer      not null default 0,
  total_chapters        integer      not null default 0,
  total_verses          integer      not null default 0
);

create table if not exists public.books (
  id                   varchar(100) primary key,
  translation_id       varchar(50)  not null references public.translations (id) on delete cascade,
  name                 varchar(255) not null,
  common_name          varchar(255) not null,
  title                varchar(255),
  "order"              integer      not null,
  number_of_chapters   integer      not null default 0,
  first_chapter_number integer      not null default 1,
  last_chapter_number  integer      not null default 1,
  total_verses         integer      not null default 0,
  is_apocryphal        boolean      not null default false
);
create index if not exists ix_books_translation_id on public.books (translation_id);

create table if not exists public.chapters (
  id               serial       primary key,
  book_id          varchar(100) not null references public.books (id) on delete cascade,
  translation_id   varchar(50)  not null references public.translations (id) on delete cascade,
  chapter_number   integer      not null,
  number_of_verses integer      not null default 0,
  content          jsonb,
  audio_links      jsonb
);
create index if not exists ix_chapters_book_id        on public.chapters (book_id);
create index if not exists ix_chapters_translation_id on public.chapters (translation_id);


-- -----------------------------------------------------------------------
-- Commentaries
-- -----------------------------------------------------------------------
create table if not exists public.commentaries (
  id                    varchar(50)  primary key,
  name                  varchar(255) not null,
  english_name          varchar(255) not null,
  website               text,
  license_url           text,
  short_name            varchar(50),
  language              varchar(10)  not null,
  language_name         varchar(100) not null,
  language_english_name varchar(100) not null,
  text_direction        varchar(10)  not null default 'ltr',
  introduction          text,
  number_of_books       integer      not null default 0,
  total_chapters        integer      not null default 0
);

create table if not exists public.commentary_books (
  id                   varchar(100) primary key,
  commentary_id        varchar(50)  not null references public.commentaries (id) on delete cascade,
  name                 varchar(255) not null,
  common_name          varchar(255) not null,
  title                varchar(255),
  "order"              integer      not null,
  number_of_chapters   integer      not null default 0,
  first_chapter_number integer      not null default 1,
  last_chapter_number  integer      not null default 1,
  is_apocryphal        boolean      not null default false
);
create index if not exists ix_commentary_books_commentary_id on public.commentary_books (commentary_id);

create table if not exists public.commentary_chapters (
  id             serial       primary key,
  book_id        varchar(100) not null references public.commentary_books (id) on delete cascade,
  commentary_id  varchar(50)  not null references public.commentaries (id) on delete cascade,
  chapter_number integer      not null,
  content        jsonb
);
create index if not exists ix_commentary_chapters_book_id       on public.commentary_chapters (book_id);
create index if not exists ix_commentary_chapters_commentary_id on public.commentary_chapters (commentary_id);

create table if not exists public.commentary_profiles (
  id            varchar(100) primary key,
  commentary_id varchar(50)  not null references public.commentaries (id) on delete cascade,
  name          varchar(255) not null,
  introduction  text,
  content       jsonb
);
create index if not exists ix_commentary_profiles_commentary_id on public.commentary_profiles (commentary_id);


-- -----------------------------------------------------------------------
-- Datasets
-- -----------------------------------------------------------------------
create table if not exists public.datasets (
  id                    varchar(50)  primary key,
  name                  varchar(255) not null,
  english_name          varchar(255) not null,
  website               text,
  license_url           text,
  short_name            varchar(50),
  language              varchar(10)  not null,
  language_name         varchar(100) not null,
  language_english_name varchar(100) not null,
  text_direction        varchar(10)  not null default 'ltr',
  number_of_books       integer      not null default 0,
  total_chapters        integer      not null default 0
);

create table if not exists public.dataset_books (
  id                   varchar(100) primary key,
  dataset_id           varchar(50)  not null references public.datasets (id) on delete cascade,
  name                 varchar(255) not null,
  common_name          varchar(255) not null,
  title                varchar(255),
  "order"              integer      not null,
  number_of_chapters   integer      not null default 0,
  first_chapter_number integer      not null default 1,
  last_chapter_number  integer      not null default 1,
  is_apocryphal        boolean      not null default false
);
create index if not exists ix_dataset_books_dataset_id on public.dataset_books (dataset_id);

create table if not exists public.dataset_chapters (
  id             serial       primary key,
  book_id        varchar(100) not null references public.dataset_books (id) on delete cascade,
  dataset_id     varchar(50)  not null references public.datasets (id) on delete cascade,
  chapter_number integer      not null,
  content        jsonb
);
create index if not exists ix_dataset_chapters_book_id    on public.dataset_chapters (book_id);
create index if not exists ix_dataset_chapters_dataset_id on public.dataset_chapters (dataset_id);
