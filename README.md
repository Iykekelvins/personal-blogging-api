# Blog API

A RESTful blog API built with Fastify, TypeScript, Prisma, and PostgreSQL.

This API supports authentication, article management, publishing workflows, validation, and protected admin operations.

## Tech Stack

- Fastify
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Fastify JSON Schema Validation

## Getting Started

### Installation

```bash
npm install

DATABASE_URL=
JWT_SECRET=

npx prisma migrate dev
npx prisma generate
npm run dev
```
