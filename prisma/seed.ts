import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

const defaultPassword = bcrypt.hashSync("123456", 10);
const volunteers = [
  {
    name: "Taís de Paiva",
    email: "taisdepaiva@gmail.com",
    password: defaultPassword,
    house: "Arara-Azul",
    department: "Estratégia",
    role: "volunteer",
    isFirstAccess: true
  },
  {
    name: "Filipe Garrote Ramaldes",
    email: "filipe.garrote@gmail.com",
    password: defaultPassword,
    house: "Capivara",
    department: "TI",
    role: "volunteer",
    isFirstAccess: true
  },
  {
    name: "Jorge Couto",
    email: "jorge@jorge.com",
    password: defaultPassword,
    house: "Onça-Pintada",
    department: "Pedagogia",
    role: "volunteer",
    isFirstAccess: true
  },
  {
    name: "Leon Trotsky",
    email: "trotsky@trotsky.com",
    password: defaultPassword,
    house: "Sucuri",
    department: "TI",
    role: "volunteer",
    isFirstAccess: true
  },
]
const activities = [
    {name: "Presença Sábado", category: "Presença", pts: 3},
    {name: "Remoto presente no sábado", category: "Presença", pts: 4},
    {name: "Resolveu caos / problema", category: "Presença", pts: 3},
    {name: "Arrumação das salas", category: "Presença", pts: 2},
    {name: "Falta sem aviso", category: "Presença", pts: -3},
    {name: "Saída do projeto", category: "Presença", pts: -5},
    {name: "Reuniões gerais/Planejamento", category: "Engajamento", pts: 3},
    {name: "Reuniões de equipe", category: "Engajamento", pts: 2},
    {name: "Grupo de trabalho", category: "Engajamento", pts: 3},
    {name: "Presença na Integração", category: "Engajamento", pts: 4},
    {name: "Ações externas", category: "Engajamento", pts: 4},
    {name: "Visitou escola durante a semana", category: "Engajamento", pts: 5},
    {name: "Preencheu painel", category: "Engajamento", pts: 2},
    {name: "Preencheu relatório de aula", category: "Engajamento", pts: 2},
    {name: "Leu e-mail da semana", category: "Engajamento", pts: 2},
    {name: "Respondeu formulário", category: "Engajamento", pts: 3},
    {name: "Publicação no IG/FB/TikTok (feed/reels)", category: "Divulgação", pts: 2},
    {name: "Publicação no IG/FB (stories)", category: "Divulgação", pts: 1},
    {name: "Publicação no LinkedIn", category: "Divulgação", pts: 2},
    {name: "Incluiu o @ na bio do IG/FB", category: "Divulgação", pts: 2},
    {name: "Incluiu cargo no LinkedIn", category: "Divulgação", pts: 2},
    {name: "Conversão novo voluntário", category: "Divulgação", pts: 5},
    {name: "Conversão novo multiplicador", category: "Divulgação", pts: 10},
]

async function mainSeed() {
  //creating admin
  volunteers.forEach(async (volunteer) => {
    const hasVolunteer = await prisma.users.findUnique({
      where: {
        email: volunteer.email
      },
    });
  
    if (!hasVolunteer) {
      await prisma.users.create({
        data: volunteer,
      });
    }
  })

  //creating activities
  activities.forEach(async (activity) => {
    const hasActivity = await prisma.activities.findUnique({
      where: {
        name: activity.name
      },
    });
  
    if (!hasActivity) {
      await prisma.activities.create({
        data: activity,
      });
    }
  })
}

mainSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
