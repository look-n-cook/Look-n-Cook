import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Ingredients = new Mongo.Collection('Ingredients');

/** Create a schema to constrain the structure of documents associated with this collection. */
const IngredientSchema = new SimpleSchema({
  name: String,
  size: Number,
  price: Number,
  vendor: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ingredients.attachSchema(IngredientSchema);

/** Make the collection and schema available to other code. */
export { Ingredients, IngredientSchema };
