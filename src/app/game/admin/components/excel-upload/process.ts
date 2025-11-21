import { createClient } from '@/utils/supabase/client';
import { ValidatedQuestion } from './validation';

export interface ProcessResult {
  successful: number;
  errors: string[];
  preview: any[];
}

export const processQuestionsUpload = async (
  validData: ValidatedQuestion[]
): Promise<ProcessResult> => {
  const successful: any[] = [];
  const errors: string[] = [];
  const preview: any[] = [];

  const supabase = createClient();

  // Define mapping of question types to table names
  const tableMap: Record<string, string> = {
    EASY: 'easy_questions',
    LITE: 'lite_questions',
    LITE2: 'lite_questions2',
    NORMAL: 'normal_questions',
    HARD: 'hard_questions',
    HARD2: 'hard_questions2',
    TEST: 'test_questions',
  };

  // Group questions by type to process them in batches
  const groupedQuestions: Record<string, ValidatedQuestion[]> = {
    EASY: [],
    LITE: [],
    LITE2: [],
    NORMAL: [],
    HARD: [],
    HARD2: [],
    TEST: [],
  };

  // Separate questions with and without IDs
  const questionsWithIds: ValidatedQuestion[] = [];
  const questionsWithoutIds: ValidatedQuestion[] = [];

  for (const question of validData) {
    if (question.id) {
      questionsWithIds.push(question);
    } else {
      questionsWithoutIds.push(question);
    }
  }

  // Group questions by type
  for (const question of questionsWithIds) {
    if (question.type) {
      const table = tableMap[question.type as keyof typeof tableMap];
      if (table) {
        groupedQuestions[question.type].push(question);
      } else {
        errors.push(
          `Неверный тип вопроса: ${question.type} для вопроса "${question.question}"`
        );
      }
    } else {
      errors.push(`Не указан тип вопроса для вопроса "${question.question}"`);
    }
  }

  for (const question of questionsWithoutIds) {
    if (question.type) {
      const table = tableMap[question.type as keyof typeof tableMap];
      if (table) {
        groupedQuestions[question.type].push(question);
      } else {
        errors.push(
          `Неверный тип вопроса: ${question.type} для вопроса "${question.question}"`
        );
      }
    } else {
      errors.push(`Не указан тип вопроса для вопроса "${question.question}"`);
    }
  }

  // Function to process batch of questions in a specific table
  const processBatch = async (
    questions: ValidatedQuestion[],
    table: string
  ) => {
    const batchErrors: string[] = [];
    let successfulCount = 0;

    // Process updates first (questions with IDs)
    const questionsWithIds = questions.filter(q => q.id);
    const questionsWithoutIds = questions.filter(q => !q.id);

    // Update existing questions
    for (const question of questionsWithIds) {
      try {
        const { error: updateError, status } = await supabase
          .schema('game')
          .from(table as any)
          .update({
            question: question.question,
            answer_1: question.answer_1,
            answer_2: question.answer_2,
            answer_3: question.answer_3,
            answer_4: question.answer_4,
            correct_answer: question.correct_answer,
            brand: question.brand,
            category: question.category,
            type: question.type,
          })
          .eq('id', question.id);

        if (updateError) {
          if (status === 404) {
            // Question doesn't exist, insert with provided ID
            const { error: insertError } = await supabase
              .schema('game')
              .from(table as any)
              .insert({
                id: question.id,
                question: question.question,
                answer_1: question.answer_1,
                answer_2: question.answer_2,
                answer_3: question.answer_3,
                answer_4: question.answer_4,
                correct_answer: question.correct_answer,
                brand: question.brand,
                category: question.category,
                type: question.type,
              });

            if (insertError) {
              batchErrors.push(
                `Ошибка при вставке вопроса с ID ${question.id}: ${insertError.message}`
              );
            } else {
              successfulCount++;
            }
          } else {
            batchErrors.push(
              `Ошибка при обновлении вопроса с ID ${question.id}: ${updateError.message}`
            );
          }
        } else {
          successfulCount++;
        }
      } catch (error: any) {
        batchErrors.push(
          `Ошибка при обновлении вопроса с ID ${question.id}: ${error.message}`
        );
      }
    }

    // Insert new questions in batches of 50
    if (questionsWithoutIds.length > 0) {
      const batchSize = 50;
      for (let i = 0; i < questionsWithoutIds.length; i += batchSize) {
        const batch = questionsWithoutIds.slice(i, i + batchSize);
        try {
          const { error: insertError } = await supabase
            .schema('game')
            .from(table as any)
            .insert(
              batch.map(q => ({
                question: q.question,
                answer_1: q.answer_1,
                answer_2: q.answer_2,
                answer_3: q.answer_3,
                answer_4: q.answer_4,
                correct_answer: q.correct_answer,
                brand: q.brand,
                category: q.category,
                type: q.type,
              }))
            );

          if (insertError) {
            batchErrors.push(
              `Ошибка при вставке пакета вопросов в таблицу ${table}: ${insertError.message}`
            );
          } else {
            successfulCount += batch.length;
          }
        } catch (error: any) {
          batchErrors.push(
            `Ошибка при вставке пакета вопросов в таблицу ${table}: ${error.message}`
          );
        }

        // Small delay between batches to prevent overwhelming the server
        if (i + batchSize < questionsWithoutIds.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }

    // Add successful count to main counter
    successful.push(...Array(successfulCount).fill(1));

    return {
      errors: batchErrors,
    };
  };

  // Process each question type in its own table for the main tab
  for (const [type, questions] of Object.entries(groupedQuestions)) {
    if (questions.length > 0) {
      const table = tableMap[type as keyof typeof tableMap];
      if (table) {
        try {
          const result = await processBatch(questions, table);
          errors.push(...result.errors);
        } catch (error: any) {
          errors.push(
            `Критическая ошибка при обработке вопросов типа ${type}: ${error.message}`
          );
        }
      }
    }
  }

  // Create preview with first few questions
  if (validData.length > 0) {
    const sampleQuestions = validData.slice(0, 2);
    preview.push(
      ...sampleQuestions.map(q => ({
        question: q.question,
        brand: q.brand,
        category: q.category,
        type: q.type,
        id: q.id || 'новый',
      }))
    );
  }

  return {
    successful: successful.length,
    errors,
    preview,
  };
};
