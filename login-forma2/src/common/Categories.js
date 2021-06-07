import React from "react";

const Categories = (props) => {
  const { categories, categoryFilter } = props;
  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className="filter-btn"
            key={index}
            onClick={() => categoryFilter(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
