
export function filterData<T>(data: T[], searchQuery: string): T[] {
  if (!searchQuery) return data;
  
  return data.filter(item => {
    // Search through all properties
    return Object.values(item).some(
      value => String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}

export function sortData<T>(
  data: T[], 
  sortBy: keyof T | null, 
  sortDirection: 'asc' | 'desc'
): T[] {
  if (!sortBy) return data;
  
  return [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (aValue === bValue) return 0;
    
    // Handle different types of values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    
    return sortDirection === 'asc' 
      ? (aValue > bValue ? 1 : -1)
      : (aValue > bValue ? -1 : 1);
  });
}

export function paginateData<T>(
  data: T[], 
  currentPage: number, 
  pageSize: number
): T[] {
  return data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
}
