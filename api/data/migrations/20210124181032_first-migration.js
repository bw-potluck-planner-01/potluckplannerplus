exports.up = async (knex) => {
  await knex.schema
    .createTable('organizers', (users) => {
      users.increments('organizer_id')
      users.string('username', 128).unique().notNullable()
      users.string('password', 128).notNullable()
    })
    .createTable('potlucks', (potlucks) => {
      potlucks.increments('potluck_id')
      potlucks.string('potluck_name', 128).unique().notNullable()
      potlucks.string('date', 128).notNullable()
      potlucks.string('time', 128).notNullable()
      potlucks.string('location', 256).notNullable()
      potlucks.integer("organizer_id")
              .unsigned()
              .notNullable()
              .references('organizer_id')
              .inTable('organizers')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
    })
    .createTable('guests', (guests) => {
      guests.increments('guest_id')
      guests.string('guest_name', 128).notNullable()
      guests.boolean('attending').defaultTo(false)
      guests.string('bringing', 128)
      guests.integer('potluck_id')
            .unsigned()
            .notNullable()
            .references('potluck_id')
            .inTable('potlucks')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
    })
    .createTable('food_items', (food_items) => {
      food_items.increments('food_item_id')
      food_items.string('food_item', 128).notNullable()
      food_items.boolean('chosen').defaultTo(false)
      food_items.integer('potluck_id')
                .unsigned()
                .notNullable()
                .references('potluck_id')
                .inTable('potlucks')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
    })
}

exports.down = async (knex) => {
  await knex.schema
            .dropTableIfExists('food_items')
            .dropTableIfExists('guests')
            .dropTableIfExists('potlucks')
            .dropTableIfExists('organizers')
}
