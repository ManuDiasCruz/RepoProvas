import { prisma } from "../source/config/prisma_database.js";

async function main() {
    await prisma.category.createMany({
      data: [
        { name: "Projeto" }, 
        { name: "Prática" }, 
        { name: "Recuperação" }
      ],
      skipDuplicates: true,
    });
  
    await prisma.teacher.createMany({
      data: [
        { name: "Diego M. Pinho" }, // 1
        { name: "Bruna Hamori" }, // 2
        { name: "Maria Fernanda" } // 3
      ],
      skipDuplicates: true,
    });
  
    await prisma.term.createMany({
      data: [
        { number: 1 }, // periodo 1
        { number: 2 }, // periodo 2
        { number: 3 } // periodo 3
      ],
      skipDuplicates: true,
    });
  
    await prisma.discipline.createMany({
      data: [
        { name: "HTML e CSS", termId: 1 },
        { name: "JavaScript", termId: 2 },
        { name: "React", termId: 3 },
        { name: "Humildade", termId: 1 },
        { name: "Planejamento", termId: 2 },
        { name: "Autoconfiança", termId: 3 },
        { name: "Show de bolinhas", termId: 1 },
        { name: "Como ser iradozo", termId: 2 },
      ],
      skipDuplicates: true,
    });
  
    await prisma.teacherDiscipline.createMany({
      data: [
        { disciplineId: 1, teacherId: 1 }, // html e css - didi
        { disciplineId: 2, teacherId: 1 }, // javascript - didi
        { disciplineId: 3, teacherId: 1 }, // react - didi
        
        { disciplineId: 4, teacherId: 2 }, // humildade - bruninha
        { disciplineId: 5, teacherId: 2 }, // planejamento - bruninha
        { disciplineId: 6, teacherId: 2 }, // autoconfiança - bruninha
        
        { disciplineId: 7, teacherId: 3 }, // show de bolinhas - mafê
        { disciplineId: 8, teacherId: 3 }, // show de bolinhas - mafê
        
        { disciplineId: 1, teacherId: 2 }, // html e css - bruninha
      ],
      skipDuplicates: true,
    });
  
    await prisma.test.createMany({
      data: [
        {
          name: "Projeto 1 - Globo.com",
          pdfUrl: "https://globo.com",
          categoryId: 1, // projeto
          teacherDisciplineId: 1, // html e css - didi
        },
        {
          name: "Projeto 3 - Parrot Game",
          pdfUrl: "https://google.com?q=parrots",
          categoryId: 1, // projeto
          teacherDisciplineId: 2,  // javascript - didi
        },
        {
          name: "Projeto 5 - Instragram React",
          pdfUrl: "https://instagram.com",
          categoryId: 1, // projeto
          teacherDisciplineId: 3, // react - didi
        },
        {
          name: "Recuperação de HTML e CSS",
          pdfUrl: "https://google.com?q=recuperacao",
          categoryId: 3, // recuperação
          teacherDisciplineId: 1, // html e css - didi
        },
        {
          name: "Prática - MBTI",
          pdfUrl: "https://google.com?q=mbti",
          categoryId: 2, // projeto
          teacherDisciplineId: 4, // humildade - bruninha
        },
        {
          name: "Prática - BatePapo",
          pdfUrl: "https://google.com?bate-papo",
          categoryId: 2, // projeto
          teacherDisciplineId: 4, // humildade - bruninha
        },
        {
          name: "Prática - Conversas difíceis",
          pdfUrl: "https://google.com?q=conversas",
          categoryId: 2, // prática
          teacherDisciplineId: 5,
        },
        {
          name: "Prática - Conversas difíceis",
          pdfUrl: "https://google.com?q=conversas",
          categoryId: 2, // prática
          teacherDisciplineId: 6,
        },
        {
          name: "Prática - HUB",
          pdfUrl: "https://google.com?q=conversas",
          categoryId: 2, // prática
          teacherDisciplineId: 7,
        },
        {
          name: "Prática - Recuperação",
          pdfUrl: "https://google.com?q=conversas",
          categoryId: 3, // prática
          teacherDisciplineId: 8,
        },
      ],
      skipDuplicates: true,
    });
  }
  
  main()
    .catch((e) => {
      console.log(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });