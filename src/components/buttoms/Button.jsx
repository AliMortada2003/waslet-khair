export const Button = ({ variant = 'primary', children, className, ...props }) => {
  const variants = {
    // برتقالي متوهج في الدارك
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-500/10",

    // أنديجو عميق
    secondary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20",

    // أوتلاين يتكيف مع الخلفية
    outline: `
      bg-indigo-50 text-indigo-700 border border-indigo-100 
      dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20 
      hover:bg-indigo-100 dark:hover:bg-indigo-500/20
    `
  };

  return (
    <button
      className={`px-6 py-2.5 rounded-2xl font-bold transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};