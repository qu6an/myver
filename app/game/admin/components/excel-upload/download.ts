import * as XLSX from 'xlsx';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

export interface Question {
  id: string;
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correct_answer: string;
  brand: string;
  category: string;
  type: 'EASY' | 'LITE' | 'LITE2' | 'NORMAL' | 'HARD' | 'HARD2';
  logo_url?: string;
  created_at: string;
}

export const downloadQuestionsToExcel = async (questions: Question[]) => {
  try {
    // Prepare data for Excel with proper headers
    const headers = [
      'ID',
      'Вопрос',
      'Ответ 1',
      'Ответ 2',
      'Ответ 3',
      'Ответ 4',
      'Правильный ответ',
      'Бренд',
      'Категория',
      'Сложность',
    ];

    // Map questions to Excel rows
    const excelData = questions.map(question => [
      question.id,
      question.question,
      question.answer_1,
      question.answer_2,
      question.answer_3,
      question.answer_4,
      question.correct_answer,
      question.brand,
      question.category,
      question.type,
    ]);

    // Add headers as first row
    const dataWithHeaders = [headers, ...excelData];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);

    // Set column widths for better readability
    worksheet['!cols'] = [
      { wch: 38 }, // ID
      { wch: 50 }, // Вопрос
      { wch: 20 }, // Ответ 1
      { wch: 20 }, // Ответ 2
      { wch: 20 }, // Ответ 3
      { wch: 20 }, // Ответ 4
      { wch: 20 }, // Правильный ответ
      { wch: 15 }, // Бренд
      { wch: 15 }, // Категория
      { wch: 15 }, // Сложность
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Вопросы');

    // Generate and download file
    XLSX.writeFile(workbook, 'questions_export.xlsx');

    toast.success('Экспорт завершен', {
      description: `Экспортировано ${questions.length} вопросов в Excel файл`,
    });
  } catch (error: any) {
    console.error('Error downloading questions to Excel:', error);
    toast.error('Ошибка экспорта', {
      description: error.message || 'Произошла ошибка при экспорте вопросов',
    });
  }
};

// Function to load all questions from all tables
export const loadAllQuestions = async (): Promise<Question[]> => {
  const supabase = createClient();

  try {
    // Load questions from all tables
    const tablePromises = [
      { table: 'lite_questions', type: 'LITE' },
      { table: 'easy_questions', type: 'EASY' },
      { table: 'normal_questions', type: 'NORMAL' },
      { table: 'hard_questions', type: 'HARD' },
      { table: 'lite_questions2', type: 'LITE2' },
      { table: 'hard_questions2', type: 'HARD2' },
      { table: 'test_questions', type: 'TEST' },
    ].map(async ({ table, type }) => {
      const { data, error } = await supabase
        .schema('game')
        .from(table as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((q: any) => ({
        ...q,
        type,
        tableName: table,
      }));
    });

    const results = await Promise.all(tablePromises);
    const allQuestions = results.flat();
    return allQuestions;
  } catch (error) {
    console.error('Error loading questions:', error);
    toast.error('Ошибка', {
      description: 'Не удалось загрузить вопросы для экспорта',
    });
    throw error;
  }
};
