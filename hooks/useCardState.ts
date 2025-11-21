import { useState, useEffect } from 'react';

export interface CardState {
  id: string;
  isExpanded: boolean;
  isBookmarked: boolean;
  isCompleted: boolean;
  progress: number;
}

export interface CardStateHook {
  cardStates: CardState[];
  toggleExpanded: (id: string) => void;
  toggleBookmarked: (id: string) => void;
  toggleCompleted: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  getCardState: (id: string) => CardState | undefined;
 initializeCard: (id: string, initialState?: Partial<CardState>) => void;
  removeCard: (id: string) => void;
}

export const useCardState = (): CardStateHook => {
  const [cardStates, setCardStates] = useState<CardState[]>(() => {
    // Попытка загрузить состояние из localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cardStates');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing card states from localStorage', e);
        }
      }
    }
    return [];
  });

  // Сохранение состояния в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem('cardStates', JSON.stringify(cardStates));
  }, [cardStates]);

  const getCardState = (id: string) => {
    return cardStates.find(card => card.id === id);
  };

  const initializeCard = (id: string, initialState?: Partial<CardState>) => {
    setCardStates(prev => {
      // Проверяем, существует ли уже карточка с таким id
      const existingCard = prev.find(card => card.id === id);
      if (existingCard) {
        return prev; // Не добавляем дубликат
      }
      
      const newCard: CardState = {
        id,
        isExpanded: false,
        isBookmarked: false,
        isCompleted: false,
        progress: 0,
        ...initialState
      };
      
      return [...prev, newCard];
    });
 };

  const toggleExpanded = (id: string) => {
    setCardStates(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isExpanded: !card.isExpanded } : card
      )
    );
  };

  const toggleBookmarked = (id: string) => {
    setCardStates(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
      )
    );
  };

  const toggleCompleted = (id: string) => {
    setCardStates(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isCompleted: !card.isCompleted } : card
      )
    );
  };

  const updateProgress = (id: string, progress: number) => {
    setCardStates(prev => 
      prev.map(card => 
        card.id === id ? { ...card, progress: Math.min(100, Math.max(0, progress)) } : card
      )
    );
  };

  const removeCard = (id: string) => {
    setCardStates(prev => prev.filter(card => card.id !== id));
  };

  return {
    cardStates,
    toggleExpanded,
    toggleBookmarked,
    toggleCompleted,
    updateProgress,
    getCardState,
    initializeCard,
    removeCard
  };
};