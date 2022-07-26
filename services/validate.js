import Validator from 'validatorjs';
import HttpErrors from 'http-errors';

export default function validate(data, rules, messages) {
  const validation = new Validator(data, rules, messages);
  if (validation.fails()) {
    console.log(validation.errors);
    throw HttpErrors(422, validation.errors);
  }
}

Validator.register('phone', (value, requirement, attribute) => {
  return !value || !!value.match(/\+374(91|99|96|43|33|79|55|95|41|44|66|50|93|94|77|98|49|22)\d{6}/gi);
}, 'The :attribute has invalid value');