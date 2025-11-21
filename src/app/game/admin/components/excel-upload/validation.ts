// validation.ts
export interface QuestionData {
  ID?: any;
  Вопрос?: any;
  'Ответ 1'?: any;
  'Ответ 2'?: any;
  'Ответ 3'?: any;
  'Ответ 4'?: any;
  'Правильный ответ'?: any;
  Бренд?: any;
  Категория?: any;
  Сложность?: any;
}

export interface ValidatedQuestion {
  id?: string;
  question: string;
  answer_1: string | null;
  answer_2: string | null;
  answer_3: string | null;
  answer_4: string | null;
  correct_answer: string | null;
  brand: string | null;
  category: string | null;
  type: string | null;
}

export interface ValidationError {
  rowIndex: number;
  message: string;
}

export interface ValidationResult {
  validData: ValidatedQuestion[];
  invalidData: { row: QuestionData; rowIndex: number }[];
  errors: string[];
  total: number;
}

export const validateExcelData = (data: QuestionData[]): ValidationResult => {
  const validData: ValidatedQuestion[] = [];
  const invalidData: { row: QuestionData; rowIndex: number }[] = [];
  const errors: string[] = [];

  // Define valid question types
  const validQuestionTypes = [
    'EASY',
    'LITE',
    'LITE2',
    'NORMAL',
    'HARD',
    'HARD2',
    'TEST',
  ];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowIndex = i + 2; // +1 for header, +1 for 1-based indexing
    let hasError = false;

    // Check required fields
    if (
      !row['Вопрос'] ||
      typeof row['Вопрос'] !== 'string' ||
      row['Вопрос'].trim() === ''
    ) {
      errors.push(`Строка ${rowIndex}: Пустое поле 'Вопрос'`);
      hasError = true;
    } else if (row['Вопрос'].length > 500) {
      errors.push(`Строка ${rowIndex}: Слишком длинный текст вопроса`);
      hasError = true;
    }

    if (
      !row['Правильный ответ'] ||
      typeof row['Правильный ответ'] !== 'string' ||
      row['Правильный ответ'].trim() === ''
    ) {
      errors.push(`Строка ${rowIndex}: Отсутствует правильный ответ`);
      hasError = true;
    }

    if (
      !row['Бренд'] ||
      typeof row['Бренд'] !== 'string' ||
      row['Бренд'].trim() === ''
    ) {
      errors.push(`Строка ${rowIndex}: Отсутствует бренд`);
      hasError = true;
    }

    if (
      !row['Категория'] ||
      typeof row['Категория'] !== 'string' ||
      row['Категория'].trim() === ''
    ) {
      errors.push(`Строка ${rowIndex}: Отсутствует категория`);
      hasError = true;
    }

    if (
      !row['Сложность'] ||
      typeof row['Сложность'] !== 'string' ||
      !validQuestionTypes.includes(row['Сложность'].toUpperCase())
    ) {
      errors.push(`Строка ${rowIndex}: Неверный формат сложности вопроса`);
      hasError = true;
    }

    // Check for answer options
    const answers = [
      row['Ответ 1'],
      row['Ответ 2'],
      row['Ответ 3'],
      row['Ответ 4'],
    ].filter(
      answer => answer && typeof answer === 'string' && answer.trim() !== ''
    );

    if (answers.length < 2) {
      errors.push(`Строка ${rowIndex}: Неверное количество вариантов ответа`);
      hasError = true;
    }

    // Check if the correct answer is one of the provided answers
    if (
      row['Правильный ответ'] &&
      answers.length > 0 &&
      !answers.includes(row['Правильный ответ'])
    ) {
      errors.push(
        `Строка ${rowIndex}: Правильный ответ не соответствует ни одному из вариантов`
      );
      hasError = true;
    }

    if (hasError) {
      invalidData.push({ row, rowIndex });
    } else {
      validData.push({
        id: row['ID']?.toString().trim() || undefined,
        question: row['Вопрос']?.toString().trim(),
        answer_1: row['Ответ 1']?.toString().trim() || null,
        answer_2: row['Ответ 2']?.toString().trim() || null,
        answer_3: row['Ответ 3']?.toString().trim() || null,
        answer_4: row['Ответ 4']?.toString().trim() || null,
        correct_answer: row['Правильный ответ']?.toString().trim() || null,
        brand: row['Бренд']?.toString().trim() || null,
        category: row['Категория']?.toString().trim() || null,
        type: row['Сложность']?.toUpperCase() || null,
      });
    }
  }

  return {
    total: data.length,
    validData,
    invalidData,
    errors,
  };
};
