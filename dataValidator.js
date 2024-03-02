import Joi from "joi"

const gameSchema = Joi.object({
  _id: Joi.string(),
  GameTitle : Joi.string(),
  ReleaseYear: Joi.number().integer().min(1900).max(9999).required(),
  Platform: Joi.string().required(),
  Genre: Joi.string().required(),
  DeveloperPublisher: Joi.string().required(),
  Description: Joi.string().required(),
  Rating: Joi.number().min(1).max(10).required(),
  __v : Joi.number()
});


export function validateGame(game) {
  const { error, value } = gameSchema.validate(game);
  if (error) {
    throw new Error(`Validation error: ${error.details.map(detail => detail.message).join(', ')}`);
  }
  return value;
}





