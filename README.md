# Kanban-projeto

npm create vite *qualquer Nome*
React
  typescript+sw
  
npm install @dnd-kit/core @dnd-kit/sortable

@dnd-kit/core - Essa é a biblioteca principal do DND Kit (Drag and Drop Kit). Ela fornece a funcionalidade central para a implementação de operações de arrastar e soltar. 

@dnd-kit/sortable - Essa biblioteca estende as capacidades do DND Kit para fornecer funcionalidades específicas de ordenação durante a operação de arrastar e soltar.

npm install -D tailwindcss:
  Este comando utiliza o Node Package Manager (npm) para instalar o Tailwind CSS como uma dependência de desenvolvimento

vai pro tailwind.config.js e bota:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

