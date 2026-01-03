
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null
);


create table users (
  id uuid primary key references auth.users(id),
  email text not null,
  tenant_id uuid references tenants(id),
  role text check (role in ('TREASURER', 'VIEWER')) not null
);


create table transactions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  type text check (type in ('INCOME', 'EXPENSE')) not null,
  amount numeric(12,2) check (amount > 0) not null,
  category text not null,
  description text,
  date date not null default current_date
);


create table documents (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid references transactions(id),
  file_url text not null
);
