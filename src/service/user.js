import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userService = {
  getAll: async () => {
    return await prisma.user.findMany()
  },
  add: async (data) => {
    return await prisma.user.create({ data })
  },
  get: async (id) => {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  },
  update: async (id, data) => {
    try {
      return await prisma.user.update({
        where: {
          id
        },
        data
      })
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      } else {
        throw error;
      }
    }
  },
  delete: async (id) => {
    try {
      return await prisma.user.delete({
        where: {
          id
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      } else {
        throw error;
      }
    }
  }
}

export default userService