import { pgTable, serial, varchar, boolean, timestamp,primaryKey, PgArray, jsonb, real, integer, text, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
   
export const settlements = pgTable('settlements', {
    settlement_id: serial('settlement_id').primaryKey(),
    name: varchar('settlement_name').notNull()
}) 
export const settlement_statistics = pgTable('settlement_statistics', {
  id: serial('id'),
  settlement_id: integer('settlement_id').notNull().references(() => settlements.settlement_id),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  households: integer('house_holds').notNull(),
  population: integer('population').notNull(),
  population_2030: integer('population_2030').notNull(),
  growth_rate: real('growth_rate').notNull()
})

export const projectSettlements = pgTable('project_settlements', {
  project_id: integer('project_id').notNull().references(() => projects.id),
  settlement_id: integer('settlement_id').notNull().references(() => settlements.settlement_id),
  is_main_settlement: boolean('is_main_settlement').default(false),
  budget_allocation: decimal('budget_allocation', { precision: 10, scale: 2 }),
  specific_goals: jsonb('specific_goals'),
  settlement_status: varchar('settlement_status'),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  kinde_id: varchar('kinde_id').notNull().unique(),
  email: varchar('email').notNull().unique(),
  first_name: varchar('first_name'),
  last_name: varchar('last_name'),
  picture: text('picture'),
  role: varchar('role').notNull().default('user'), // 'admin', 'manager', 'user'
  created_at: timestamp('created_at').defaultNow(),
  last_login: timestamp('last_login'),
  is_active: boolean('is_active').default(true)
});

// Project editors table
export const projectEditors = pgTable('project_editors', {
  id: serial('id').primaryKey(),
  project_id: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  editor_id: integer('editor_id')
    .notNull()
    .references(() => users.id),
  added_at: timestamp('added_at').defaultNow(),
  added_by: integer('added_by')
    .notNull()
    .references(() => users.id),  // Must be the project owner
  is_active: boolean('is_active').default(true)
});

// Relations



export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  project_name: varchar('project_name').notNull(),
  owner_id: integer('owner_id').notNull().references(() => users.id),
  description: text('description'),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date'),
  status: varchar('status').notNull(),
  priority: integer('priority'),
  department: varchar('department'),
  contact_email: varchar('contact_email'),
  contact_phone: varchar('contact_phone'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    email: varchar('email').unique().notNull(),
    phone: varchar('phone').unique().notNull(),
    address1: varchar('address1').notNull(),
    address2: varchar('address2'),
    city: varchar('city').notNull(),
    zip: varchar('zip', {length: 10}),
    notes: text('notes'),
    active: boolean('active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
})

export const tickets = pgTable('tickets', {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id').notNull().references(() => customers.id),
    title: varchar('title').notNull(),
    description: text('description'),
    completed: boolean('completed').notNull().default(false),
    tech: varchar('tech').notNull().default('unassigned'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
})


export const settlementRelation = relations(settlements, ({ many }) => ({
  settlement_statistics: many(settlement_statistics)
}))


export const usersRelations = relations(users, 
  ({ many }) => ({
    owned_projects: many(projects, { 
      relationName: 'manager_id' 
    }),
    editable_projects: many(projectEditors, { relationName: 'project_editor' })
  })
);

export const statisticsRelation = relations(settlement_statistics, ({one}) => ({
  settlement: one(settlements, {
    fields: [settlement_statistics.settlement_id],
    references: [settlements.settlement_id]
  })
}))
// Create relations
// 1 Customer -> Many tickets
export const customersRealtions = relations(customers, 
    ({ many }) => ({
        tickets: many(tickets), 
    })
)
// 1 Ticket -> 1 Customer.
export const ticketsRelations = relations(tickets, 
    ({ one }) => ({
        customer: one(customers, {
            fields: [tickets.customerId],
            references: [customers.id]
        })
    })
)
export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.owner_id],
    references: [users.id],
    relationName: 'project_owner'
  }),
  editors: many(projectEditors)
}));
// // יחסים מטבלת projects
// export const projectsRelations = relations(projects, ({ many }) => ({
//   project_settlements: many(projectSettlements)
// }));

// // יחסים מטבלת settlements
// export const settlementsRelations = relations(settlements, ({ many }) => ({
//   project_settlements: many(projectSettlements)
// }));

// // יחסים מטבלת project_settlements
// export const projectSettlementsRelations = relations(projectSettlements, ({ one }) => ({
//   project: one(projects, {
//     fields: [projectSettlements.project_id],
//     references: [projects.id]
//   }),
//   settlement: one(settlements, {
//     fields: [projectSettlements.settlement_id],
//     references: [settlements.settlement_id]
//   })
// }));