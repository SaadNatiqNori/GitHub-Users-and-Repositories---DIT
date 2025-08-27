// Helper to get language color
export const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
        JavaScript: 'bg-yellow-400',
        TypeScript: 'bg-blue-400',
        Python: 'bg-green-400',
        Java: 'bg-orange-400',
        'C#': 'bg-purple-400',
        'C++': 'bg-pink-400',
        PHP: 'bg-indigo-400',
        Ruby: 'bg-red-400',
        Go: 'bg-cyan-400',
        Rust: 'bg-orange-600',
        Swift: 'bg-orange-500',
        Kotlin: 'bg-purple-500',
    };
    return colors[language || ''] || 'bg-gray-400';
};
// Helper to format date
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};