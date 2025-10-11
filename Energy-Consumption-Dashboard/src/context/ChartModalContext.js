import React, { createContext, useContext, useState } from 'react';

const ChartModalContext = createContext();

export function useChartModal() {
  const context = useContext(ChartModalContext);
  if (!context) {
    throw new Error('useChartModal must be used within a ChartModalProvider');
  }
  return context;
}

export function ChartModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    chartConfig: null,
    title: '',
    subtitle: ''
  });

  const openModal = ({ chartConfig, title, subtitle }) => {
    setModalState({
      isOpen: true,
      chartConfig,
      title,
      subtitle
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      chartConfig: null,
      title: '',
      subtitle: ''
    });
  };

  return (
    <ChartModalContext.Provider value={{
      ...modalState,
      openModal,
      closeModal
    }}>
      {children}
    </ChartModalContext.Provider>
  );
}