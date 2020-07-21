drop table if exists "events";

create table "events" (
  "eventId"     serial,
  "time"        int not null,
  "description" text not null,
  "date"        date not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("eventId") 
);
