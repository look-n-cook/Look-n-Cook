import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Recipes = new Mongo.Collection('Recipes');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RecipeSchema = new SimpleSchema({
  name: String,
  image: String,
  description: String,
  vegan: {
    type: Boolean,
    required: false,
  },
  glutenFree: {
    type: Boolean,
    required: false,
  },
  dairyFree: {
    type: Boolean,
    required: false,
  },
  ingredients: {
    type: Array,
    minCount: 1,
  },
  'ingredients.$': {
    type: Object,
  },
  'ingredients.$.name': {
    type: String,
  },
  'ingredients.$.measurement': {
    type: String,
  },
  steps: {
    type: Array,
    minCount: 1,
  },
  'steps.$': {
    type: String,
  },
  owner: String,
  createdAt: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Recipes.attachSchema(RecipeSchema);

/** Make the collection and schema available to other code. */
export { Recipes, RecipeSchema };
