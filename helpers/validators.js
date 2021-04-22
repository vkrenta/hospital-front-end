export const idValidator = value => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 'Код має бути числом';
  if (numberValue > 999999) return 'Довжина коду 6 цифр';
  if (numberValue < 100000) return 'Значення коду не менше 100000';
  return true;
};

export const titleValidator = value => {
  if (!value) return "Обов'язкове поле";
  if (value.length > 50) return 'Забагато символів';
};

export const addressValidator = value => {
  if (!value) return "Обов'язкове поле";
  if (value.length > 50) return 'Забагато символів';
};
