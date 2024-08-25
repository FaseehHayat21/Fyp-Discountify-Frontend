import React from 'react';

function Categories({ onSelectCategory }) {
  const categories = [
    'Eateries',
    'Healthcare',
    'Fashion',
    'Accommodations',
    'Retail'
  ];

  return (
    <div>
      <h2>Select a Category</h2>
      <ul>
        {categories.map(category => (
          <li key={category} onClick={() => onSelectCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
