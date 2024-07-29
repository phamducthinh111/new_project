const convertSexToVietnamese = (sex: string): string => {
    switch (sex.toLowerCase()) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      case 'other':
        return 'Khác';
      default:
        return sex;
    }
  };
export default convertSexToVietnamese 