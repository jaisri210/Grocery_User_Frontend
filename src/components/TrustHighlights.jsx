const highlights = [
  {
    id: 1,
    icon: "🥬",
    title: "Farm Fresh",
    desc: "Directly sourced from local farmers",
  },
  {
    id: 2,
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Same-day delivery at your doorstep",
  },
  {
    id: 3,
    icon: "✅",
    title: "Quality Checked",
    desc: "Carefully inspected before delivery",
  },
  {
    id: 4,
    icon: "💳",
    title: "Secure Payments",
    desc: "100% safe and secure transactions",
  },
];

export const TrustHighlights = () => {
  return (
    <div className="px-4 mt-10">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="
                flex flex-col items-center text-center
                rounded-xl p-4
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* ICON */}
              <span className="text-4xl mb-2 transition-transform duration-300 hover:scale-110">
                {item.icon}
              </span>

              {/* TITLE */}
              <h4 className="font-semibold text-sm md:text-base">
                {item.title}
              </h4>

              {/* DESC */}
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
