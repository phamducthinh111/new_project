// components/LanguageButton.tsx
import React from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setLanguage } from '@/store/reducer/languageReducer';
import { StyledButtonLanguage } from './langueageButton.style';

interface LanguageButtonProps {
  language: string;
  className?: string;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ language, className }) => {
  const dispatch = useAppDispatch();
  const activeLanguage = useAppSelector((state) => state.languege.language);

  const handleClick = () => {
    dispatch(setLanguage(language));
  };

  return (
    <StyledButtonLanguage
      type="link"
      className={`m-2 ${className} ${language === activeLanguage ? 'text-[#B9913B]' : 'text-gray-500'}`}
      onClick={handleClick}
    >
      {language.toUpperCase()}
    </StyledButtonLanguage>
  );
};

export default LanguageButton;
