import { pgTable, uuid, text, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['user', 'assistant']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull().default('New Analysis'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').references(() => sessions.id, { onDelete: 'cascade' }).notNull(),
  role: roleEnum('role').notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'), // URL to image if present
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.sessionId],
    references: [sessions.id],
  }),
}));
