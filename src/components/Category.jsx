const categories = [
  { id: 1, name: "Vegetables", emoji: "🥦" },
  { id: 2, name: "Fruits", emoji: "🍎" },
  { id: 3, name: "Dairy", emoji: "🥛" },
  { id: 4, name: "Meat", emoji: "🍗" },
  { id: 5, name: "Bakery", emoji: "🍞" },
  { id: 6, name: "Seafood", emoji: "🐟" },
  { id: 7, name: "Snacks", emoji: "🍿" },
  { id: 8, name: "Flour", emoji: "🌾" },
  { id: 9, name: "Dry Fruits", emoji: "🥜" },
  { id: 10, name: "Instant Food", emoji: "🍜" },
  { id: 11, name: "Lentils & Dal", emoji: "🫘" },
  { id: 12, name: "Oil", emoji: "🫒" },
];
export const Category = () => {
  return (
    <div className="px-4 md:px-6 bg-gray-100 w-full py-6">
      <h2 className="px-4 text-lg md:text-xl font-bold mb-6">
        Shop by Category
      </h2>

      <div
        className="
          flex md:grid
          grid-cols-6
          gap-4
          overflow-x-auto md:overflow-visible
          scrollbar-hide
        "
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="
              min-w-[110px] md:min-w-0
              flex flex-col
              items-center
              justify-center
              bg-white
              shadow
              rounded-xl
              p-4
              cursor-pointer
              hover:scale-105
              transition
            "
          >
            <span className="text-3xl">{cat.emoji}</span>
            <p className="mt-2 text-xs md:text-sm font-medium text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
